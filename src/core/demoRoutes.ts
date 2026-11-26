import type { TelemetryFrame } from './telemetry';

export interface LatLon {
  lat: number;
  lon: number;
}

export interface DemoRoutePreset {
  id: string;
  flag: string;
  nameSv: string;
  nameEn: string;
  subtitleSv: string;
  subtitleEn: string;
  countryCode: string;
  bundled?: boolean;
  start: LatLon;
  end: LatLon;
}

export const FAMOUS_DEMO_ROUTES: readonly DemoRoutePreset[] = [
  {
    id: 'djursholm',
    flag: '🇸🇪',
    nameSv: 'Lokevägen · Djursholm',
    nameEn: 'Lokevägen · Stockholm',
    subtitleSv: 'Snöig vinteridyll (direktstart offline)',
    subtitleEn: 'Snowy Swedish village (instant offline)',
    countryCode: 'se',
    bundled: true,
    start: { lat: 59.3972, lon: 18.0846 },
    end: { lat: 59.4015, lon: 18.0912 },
  },
  {
    id: 'hwy101',
    flag: '🇺🇸',
    nameSv: 'Highway 101 · Golden Gate',
    nameEn: 'Highway 101 · Golden Gate',
    subtitleSv: 'San Francisco → Sausalito över bron',
    subtitleEn: 'San Francisco → Sausalito across the bridge',
    countryCode: 'us',
    start: { lat: 37.8078, lon: -122.475 },
    end: { lat: 37.8591, lon: -122.4853 },
  },
  {
    id: 'bigsur',
    flag: '🇺🇸',
    nameSv: 'Pacific Coast Hwy · Big Sur',
    nameEn: 'Pacific Coast Hwy · Big Sur',
    subtitleSv: 'Bixby Creek Bridge längs kusten',
    subtitleEn: 'Bixby Creek Bridge along the ocean cliffs',
    countryCode: 'us',
    start: { lat: 36.3748, lon: -121.9032 },
    end: { lat: 36.331, lon: -121.8895 },
  },
  {
    id: 'vegas',
    flag: '🇺🇸',
    nameSv: 'Las Vegas Strip',
    nameEn: 'Las Vegas Strip',
    subtitleSv: 'Las Vegas Blvd · Neon & Superchargers',
    subtitleEn: 'Las Vegas Blvd · Neon & Resorts',
    countryCode: 'us',
    start: { lat: 36.0985, lon: -115.1729 },
    end: { lat: 36.1365, lon: -115.1636 },
  },
  {
    id: 'nyc',
    flag: '🇺🇸',
    nameSv: '5th Ave · Manhattan, NYC',
    nameEn: '5th Ave · Manhattan, NYC',
    subtitleSv: 'Times Square → Central Park South',
    subtitleEn: 'Times Square → Central Park South',
    countryCode: 'us',
    start: { lat: 40.758, lon: -73.9855 },
    end: { lat: 40.7681, lon: -73.9819 },
  },
  {
    id: 'stelvio',
    flag: '🇮🇹',
    nameSv: 'Stelviopasset · Alperna',
    nameEn: 'Stelvio Pass · Italian Alps',
    subtitleSv: 'Klassiska hårnålskurvor på 2 757 m höjd',
    subtitleEn: 'Iconic alpine switchbacks at 2,757 m',
    countryCode: 'it',
    start: { lat: 46.5287, lon: 10.453 },
    end: { lat: 46.5446, lon: 10.4832 },
  },
  {
    id: 'atlantic',
    flag: '🇳🇴',
    nameSv: 'Atlanterhavsveien · Norge',
    nameEn: 'Atlantic Ocean Road · Norway',
    subtitleSv: 'Hav & broar längs norska kusten',
    subtitleEn: 'Island bridges over the Norwegian Sea',
    countryCode: 'no',
    start: { lat: 63.0145, lon: 7.3455 },
    end: { lat: 63.0218, lon: 7.4295 },
  },
  {
    id: 'paris',
    flag: '🇫🇷',
    nameSv: 'Champs-Élysées · Paris',
    nameEn: 'Champs-Élysées · Paris',
    subtitleSv: 'Triumfbågen → Place de la Concorde',
    subtitleEn: 'Arc de Triomphe → Place de la Concorde',
    countryCode: 'fr',
    start: { lat: 48.8738, lon: 2.295 },
    end: { lat: 48.8656, lon: 2.3212 },
  },
  {
    id: 'london',
    flag: '🇬🇧',
    nameSv: 'Westminster · London',
    nameEn: 'Westminster · London',
    subtitleSv: 'Big Ben → Trafalgar Square',
    subtitleEn: 'Westminster Bridge → Trafalgar Square',
    countryCode: 'gb',
    start: { lat: 51.5008, lon: -0.1185 },
    end: { lat: 51.508, lon: -0.1281 },
  },
  {
    id: 'tokyo',
    flag: '🇯🇵',
    nameSv: 'Shibuya · Tokyo',
    nameEn: 'Shibuya · Tokyo',
    subtitleSv: 'Shibuya Crossing → Omotesando',
    subtitleEn: 'Shibuya Crossing → Omotesando',
    countryCode: 'jp',
    start: { lat: 35.6595, lon: 139.7004 },
    end: { lat: 35.6652, lon: 139.7125 },
  },
];

function interpolateLine(a: LatLon, b: LatLon, steps = 24): LatLon[] {
  const out: LatLon[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    out.push({
      lat: a.lat + (b.lat - a.lat) * t,
      lon: a.lon + (b.lon - a.lon) * t,
    });
  }
  return out;
}

export async function fetchOsrmRoute(a: LatLon, b: LatLon): Promise<LatLon[]> {
  const url = `https://router.project-osrm.org/route/v1/driving/${a.lon.toFixed(6)},${a.lat.toFixed(6)};${b.lon.toFixed(6)},${b.lat.toFixed(6)}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error('OSRM HTTP error');
    const json = await res.json();
    const coords = json?.routes?.[0]?.geometry?.coordinates;
    if (Array.isArray(coords) && coords.length >= 2) {
      return coords.map(([lon, lat]: [number, number]) => ({ lat, lon }));
    }
  } catch {
    // Fall back to direct great-circle interpolation
  }
  return interpolateLine(a, b, 24);
}

export async function geocodeAddress(
  query: string
): Promise<{ lat: number; lon: number; label: string; countryCode: string | null } | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encodeURIComponent(trimmed)}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(7000) });
    if (!res.ok) return null;
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return null;
    const top = rows[0];
    const lat = Number(top.lat);
    const lon = Number(top.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    const cc = typeof top.address?.country_code === 'string' ? top.address.country_code.toLowerCase() : null;
    return {
      lat,
      lon,
      label: typeof top.display_name === 'string' ? top.display_name.split(',')[0] : trimmed,
      countryCode: cc,
    };
  } catch {
    return null;
  }
}

export class RouteDemoDrive {
  readonly name: string;
  readonly countryCode: string | null;
  private readonly waypoints: LatLon[];
  private readonly segLens: number[] = [];
  private index = 0;
  private offset = 0;
  private distance = 0;
  private previousHeading?: number;

  constructor(opts: { name: string; countryCode?: string | null; waypoints: LatLon[] }) {
    this.name = opts.name;
    this.countryCode = opts.countryCode ?? null;
    this.waypoints = opts.waypoints.length >= 2 ? opts.waypoints : interpolateLine(FAMOUS_DEMO_ROUTES[1].start, FAMOUS_DEMO_ROUTES[1].end, 20);
    for (let i = 0; i < this.waypoints.length - 1; i++) {
      const a = this.waypoints[i];
      const b = this.waypoints[i + 1];
      const dLatM = (b.lat - a.lat) * 110540;
      const dLonM = (b.lon - a.lon) * 111320 * Math.max(0.08, Math.cos((a.lat * Math.PI) / 180));
      this.segLens.push(Math.max(0.5, Math.hypot(dLonM, dLatM)));
    }
  }

  getInitialPosition(): { lat: number; lon: number; headingDeg: number } {
    const a = this.waypoints[0];
    const b = this.waypoints[1];
    const dLatM = (b.lat - a.lat) * 110540;
    const dLonM = (b.lon - a.lon) * 111320 * Math.max(0.08, Math.cos((a.lat * Math.PI) / 180));
    const headingDeg = ((Math.atan2(dLonM, dLatM) * 180) / Math.PI + 360) % 360;
    return { lat: a.lat, lon: a.lon, headingDeg };
  }

  advance(frame: TelemetryFrame, dt: number): void {
    const step = (frame.speedKmh / 3.6) * dt;
    this.offset += step;
    this.distance += step;

    const segCount = this.waypoints.length - 1;
    let len = this.segLens[this.index] ?? 1;
    while (this.offset >= len) {
      this.offset -= len;
      this.index = (this.index + 1) % segCount;
      if (this.index === 0) this.previousHeading = undefined;
      len = this.segLens[this.index] ?? 1;
    }

    const a = this.waypoints[this.index];
    const b = this.waypoints[this.index + 1];
    const t = Math.min(1, Math.max(0, this.offset / len));
    frame.latitude = a.lat + (b.lat - a.lat) * t;
    frame.longitude = a.lon + (b.lon - a.lon) * t;

    const dLatM = (b.lat - a.lat) * 110540;
    const dLonM = (b.lon - a.lon) * 111320 * Math.max(0.08, Math.cos((frame.latitude * Math.PI) / 180));
    const targetHeading = ((Math.atan2(dLonM, dLatM) * 180) / Math.PI + 360) % 360;
    const delta = ((targetHeading - (this.previousHeading ?? targetHeading) + 540) % 360) - 180;
    frame.headingDeg = ((this.previousHeading ?? targetHeading) + delta * Math.min(1, dt * 5) + 360) % 360;
    frame.turnRate = Math.max(-1, Math.min(1, delta / 20));
    this.previousHeading = frame.headingDeg;
    frame.tripKm = this.distance / 1000;
    frame.northPoleDistanceKm = (90 - frame.latitude) * 111.32;
    frame.northPoleRelativeBearingDeg = (360 - frame.headingDeg) % 360;
  }
}
