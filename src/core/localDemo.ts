import { OsmWorldDirector, type OsmPoint2D, type OsmWorldState } from './osmWorld';
import type { TelemetryFrame } from './telemetry';

// The downloadable build supplies the house number locally. The repository
// default can also be personalised using a demoHouse URL fragment.
const house = document.querySelector<HTMLMetaElement>('meta[name="demo-house"]')?.content ||
  new URLSearchParams(location.hash.slice(1)).get('demoHouse') || '';
const street = 'Lokevägen';
const town = 'Djursholm';
export const demoStart = [street, house].filter(Boolean).join(' ');

type DemoMap = { map: OsmWorldState; path: OsmPoint2D[] };

async function geocode(signal: AbortSignal): Promise<[number, number]> {
  const query = new URLSearchParams({ street: [house, street].filter(Boolean).join(' '), city: town,
    countrycodes: 'se', format: 'jsonv2', addressdetails: '1', limit: '5' });
  const response = await fetch('https://nominatim.openstreetmap.org/search?' + query, { signal });
  if (!response.ok) throw new Error('Address lookup failed');
  const results: { lat: string; lon: string; address: { house_number?: string; road?: string } }[] = await response.json();
  const normal = (s = '') => s.toLowerCase().replace(/\s/g, '');
  const hit = results.find(r => normal(r.address.road) === normal(street) &&
    (!house || normal(r.address.house_number) === normal(house)));
  if (!hit || !Number.isFinite(+hit.lat) || !Number.isFinite(+hit.lon)) throw new Error('Address missing');
  return [+hit.lat, +hit.lon];
}

async function locate(): Promise<[number, number]> {
  try {
    return await geocode(AbortSignal.timeout(9000));
  } catch {
    if (!house || !/^[0-9]{1,4}[a-z]?$/i.test(house)) throw new Error('Address missing');
    // Some Swedish addresses are indexed under the municipality rather than
    // the postal town. Search the local OSM address objects directly as well.
    const query = `[out:json][timeout:8];nwr["addr:street"="Lokevägen"]["addr:housenumber"~"^${house}$",i](59.38,18.03,59.43,18.12);out center;`;
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST', body: new URLSearchParams({ data: query }), signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error('Address lookup failed');
    const { elements } = await response.json();
    const hit = elements?.[0]?.center ?? elements?.[0];
    if (!Number.isFinite(hit?.lat) || !Number.isFinite(hit?.lon)) throw new Error('Address missing');
    return [hit.lat, hit.lon];
  }
}

function routeFromDoor(map: OsmWorldState): OsmPoint2D[] {
  let best = Infinity;
  let path: OsmPoint2D[] = [];
  for (const road of map.snapshot.roads.filter(r => r.name === street)) {
    for (let i = 1; i < road.points.length; i++) {
      const a = road.points[i - 1], b = road.points[i];
      const dx = b.x - a.x, dz = b.z - a.z;
      const t = Math.max(0, Math.min(1, -(a.x * dx + a.z * dz) / (dx * dx + dz * dz)));
      const start = { x: a.x + dx * t, z: a.z + dz * t };
      const gap = Math.hypot(start.x, start.z);
      if (!Number.isFinite(gap) || gap >= best || gap > 100) continue;
      const before = [start, ...road.points.slice(0, i).reverse()];
      const after = [start, ...road.points.slice(i)];
      const length = (points: OsmPoint2D[]) => points.slice(1).reduce((d,p,j) =>
        d + Math.hypot(p.x - points[j].x, p.z - points[j].z), 0);
      path = length(after) > length(before) ? after : before;
      best = gap;
    }
  }
  if (path.length < 2) throw new Error('Street missing');
  const distinct = path.filter((p, i) => !i || Math.hypot(p.x - path[i-1].x, p.z - path[i-1].z) > 0.01);
  if (distinct.length < 2) throw new Error('Street too short');
  return distinct;
}

let loaded: Promise<DemoMap> | undefined;
async function loadDemo(): Promise<DemoMap> {
  const key = 'winter-demo-map-v1:' + demoStart;
  try {
    const map = JSON.parse(localStorage.getItem(key) || 'null');
    if (map?.isLiveOsm) return { map, path: routeFromDoor(map) };
  } catch { /* Cache is optional. */ }
  const [lat, lon] = await locate();
  const director = new OsmWorldDirector();
  const map = await director.loadAt(lat, lon);
  const path = routeFromDoor(map);
  map.roadName = street;
  map.placeName = town;
  try { localStorage.setItem(key, JSON.stringify(map)); } catch { /* Private browsing. */ }
  return { map, path };
}

export class LocalDemoDrive {
  data?: DemoMap;
  failed = false;
  private index = 0;
  private offset = 0;
  private previousHeading?: number;
  private distance = 0;

  constructor() {
    loaded ??= loadDemo().catch(error => { loaded = undefined; throw error; });
    loaded.then(data => { this.data = data; }, () => { this.failed = true; });
  }

  advance(frame: TelemetryFrame, dt: number): void {
    const data = this.data;
    if (!data) return;
    const path = data.path;
    const step = frame.speedKmh / 3.6 * dt;
    this.offset += step;
    this.distance += step;
    let a = path[this.index], b = path[this.index + 1];
    let length = Math.hypot(b.x - a.x, b.z - a.z);
    while (this.offset >= length) {
      this.offset -= length;
      this.index = (this.index + 1) % (path.length - 1);
      if (this.index === 0) this.previousHeading = undefined;
      a = path[this.index]; b = path[this.index + 1];
      length = Math.hypot(b.x - a.x, b.z - a.z);
    }
    const t = this.offset / length;
    const { originLat, originLon } = data.map.snapshot;
    frame.latitude = originLat - (a.z + (b.z - a.z) * t) / 110540;
    frame.longitude = originLon + (a.x + (b.x - a.x) * t) / (111320 * Math.cos(originLat * Math.PI / 180));
    const heading = (Math.atan2(b.x - a.x, a.z - b.z) * 180 / Math.PI + 360) % 360;
    const delta = ((heading - (this.previousHeading ?? heading) + 540) % 360) - 180;
    frame.headingDeg = ((this.previousHeading ?? heading) + delta * Math.min(1, dt * 5) + 360) % 360;
    frame.turnRate = Math.max(-1, Math.min(1, delta / 20));
    this.previousHeading = frame.headingDeg;
    frame.tripKm = this.distance / 1000;
    frame.northPoleDistanceKm = (90 - frame.latitude) * 111.32;
    frame.northPoleRelativeBearingDeg = (360 - frame.headingDeg) % 360;
  }
}
