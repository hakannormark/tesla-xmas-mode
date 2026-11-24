import { DriveSource } from './telemetry';

export type OsmBiome = 'village' | 'forest' | 'water' | 'highway' | 'open';
export type OsmBuildingKind =
  | 'small_cottage'
  | 'medium_house'
  | 'large_building'
  | 'gigafactory'
  | 'church';

export interface OsmPoint2D {
  x: number; // +East meters relative to snapshot origin
  z: number; // +South meters relative to snapshot origin (-Z is North)
}

export interface OsmBuilding {
  id: string;
  footprint: OsmPoint2D[];
  centerX: number;
  centerZ: number;
  widthM: number;
  depthM: number;
  areaM2: number;
  heightM: number;
  levels?: number;
  roofShape?: string;
  tesla?: boolean;
  kind: OsmBuildingKind;
  name: string | null;
}

export interface OsmRoadRibbon {
  points: OsmPoint2D[];
  widthM: number;
  isMajor: boolean;
  highway?: string;
  lanes?: number;
  maxspeed?: number;
  tunnel?: boolean;
  name: string | null;
}

export interface OsmWaterFeature {
  points: OsmPoint2D[];
  isPolygon: boolean;
  widthM: number;
  name: string | null;
}

export interface OsmForestPatch {
  centerX: number;
  centerZ: number;
  radiusM: number;
  density: number;
}

export interface OsmPoi {
  x: number;
  z: number;
  kind: 'charger' | 'landmark' | 'church' | 'station';
  tesla?: boolean;
  name: string;
}

export interface OsmMapSnapshot {
  version: number;
  biome: OsmBiome;
  originLat: number;
  originLon: number;
  buildings: OsmBuilding[];
  roads: OsmRoadRibbon[];
  waters: OsmWaterFeature[];
  forests: OsmForestPatch[];
  pois: OsmPoi[];
  trees?: OsmPoint2D[];
  woodland?: OsmPoint2D[][];
  streetLamps?: OsmPoint2D[];
  trafficSignals?: OsmPoint2D[];
  crossings?: OsmPoint2D[];
}

export interface OsmWorldState {
  enabled: boolean;
  isLiveOsm: boolean;
  placeName: string;
  roadName: string;
  biome: OsmBiome;
  nearbyLandmark: string | null;
  nearbyChargerName: string | null;
  isNearRealTunnel: boolean;
  landmarkPulse: number; // 0..1 decays smoothly after place/landmark discovery
  snapshot: OsmMapSnapshot;
  buildingCount: number;
  waterCount: number;
  forestCount: number;
  demoTravelM: number;
}

interface DemoStop {
  placeName: string;
  roadName: string;
  biome: OsmBiome;
  nearbyLandmark: string | null;
  nearbyChargerName: string | null;
  lat: number;
  lon: number;
}

const SWEDISH_WINTER_TOUR: DemoStop[] = [
  {
    placeName: 'Stockholm',
    roadName: 'Strandvägen',
    biome: 'village',
    nearbyLandmark: 'Kungliga Slottet',
    nearbyChargerName: null,
    lat: 59.3322,
    lon: 18.0815,
  },
  {
    placeName: 'Upplandsslätten',
    roadName: 'Landsväg 255',
    biome: 'open',
    nearbyLandmark: 'Vintervidderna',
    nearbyChargerName: null,
    lat: 59.721,
    lon: 17.785,
  },
  {
    placeName: 'Roslagen',
    roadName: 'Nordskogen',
    biome: 'forest',
    nearbyLandmark: 'Glittrande Granskog',
    nearbyChargerName: null,
    lat: 59.685,
    lon: 18.705,
  },
  {
    placeName: 'Giga Nord',
    roadName: 'E4 Express',
    biome: 'highway',
    nearbyLandmark: 'Tesla Gigafactory Nord',
    nearbyChargerName: 'Supercharger Giga Nord',
    lat: 59.506,
    lon: 17.921,
  },
  {
    placeName: 'Sigtuna',
    roadName: 'Stora Gatan',
    biome: 'village',
    nearbyLandmark: 'Mariakyrkan',
    nearbyChargerName: null,
    lat: 59.617,
    lon: 17.723,
  },
  {
    placeName: 'Uppsala',
    roadName: 'Fyrisån',
    biome: 'water',
    nearbyLandmark: 'Uppsala Domkyrka',
    nearbyChargerName: null,
    lat: 59.858,
    lon: 17.634,
  },
];

export function geoDeltaMeters(
  originLat: number,
  originLon: number,
  lat: number,
  lon: number
): OsmPoint2D {
  const cosLat = Math.cos((originLat * Math.PI) / 180);
  return {
    x: (lon - originLon) * 111320 * cosLat,
    z: -(lat - originLat) * 110540,
  };
}

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function rectFootprint(cx: number, cz: number, w: number, d: number, yawRad = 0): OsmPoint2D[] {
  const hw = w * 0.5;
  const hd = d * 0.5;
  const c = Math.cos(yawRad);
  const s = Math.sin(yawRad);
  const corners: [number, number][] = [
    [-hw, -hd],
    [hw, -hd],
    [hw, hd],
    [-hw, hd],
  ];
  return corners.map(([lx, lz]) => ({
    x: cx + lx * c - lz * s,
    z: cz + lx * s + lz * c,
  }));
}

function polygonStats(pts: OsmPoint2D[]): {
  area: number;
  cx: number;
  cz: number;
  widthM: number;
  depthM: number;
} {
  let areaSum = 0;
  let cx = 0;
  let cz = 0;
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    areaSum += a.x * b.z - b.x * a.z;
    cx += a.x;
    cz += a.z;
    minX = Math.min(minX, a.x);
    maxX = Math.max(maxX, a.x);
    minZ = Math.min(minZ, a.z);
    maxZ = Math.max(maxZ, a.z);
  }
  return {
    area: Math.abs(areaSum * 0.5),
    cx: cx / Math.max(1, n),
    cz: cz / Math.max(1, n),
    widthM: Math.max(3, maxX - minX),
    depthM: Math.max(3, maxZ - minZ),
  };
}

function decimatePoints(pts: OsmPoint2D[], maxPts: number): OsmPoint2D[] {
  if (pts.length <= maxPts) return pts;
  const step = pts.length / maxPts;
  const out: OsmPoint2D[] = [];
  for (let i = 0; i < maxPts; i++) {
    out.push(pts[Math.floor(i * step)]);
  }
  return out;
}

function classifyBuilding(tags: Record<string, string>, area: number): {
  kind: OsmBuildingKind;
  heightM: number;
} {
  const bTag = tags.building ?? 'yes';
  const levels = Number.parseFloat(tags['building:levels'] ?? '');
  const amenity = tags.amenity ?? '';
  const name = tags.name ?? '';

  let heightM = 0;
  const rawHeight = Number.parseFloat(tags.height ?? '');
  if (Number.isFinite(rawHeight) && rawHeight > 2) {
    heightM = rawHeight;
  } else if (Number.isFinite(levels) && levels > 0) {
    heightM = levels*3.4+1.5;
  }

  let kind: OsmBuildingKind = 'small_cottage';
  const isIndustrialOrHuge =
    bTag === 'industrial' ||
    bTag === 'warehouse' ||
    bTag === 'factory' ||
    bTag === 'supermarket' ||
    bTag === 'retail' ||
    bTag === 'hangar' ||
    tags.landuse === 'industrial';

  if (
    bTag === 'church' ||
    bTag === 'cathedral' ||
    amenity === 'place_of_worship' ||
    /kyrka|cathedral|chapel/i.test(name)
  ) {
    kind = 'church';
    if (!heightM) heightM = 16;
  } else if (/^(house|detached|semidetached_house|bungalow|cabin|hut|cottage|farm|terrace)$/.test(bTag)) {
    kind = 'small_cottage';
    if (!heightM) heightM = 5;
  } else if (
    (isIndustrialOrHuge && area >= 280) ||
    area >= 660 ||
    /giga|factory|warehouse|hall|center|fabrik/i.test(name)
  ) {
    kind = 'gigafactory';
    if (!heightM) heightM = 13.5 + Math.min(6, area * 0.004);
  } else if (
    area >= 290 ||
    Boolean(tags.tourism === 'attraction' || tags.historic) ||
    heightM >= 14 ||
    /slott|palace|muse|school|skola|hospital/i.test(name)
  ) {
    kind = 'large_building';
    if (!heightM) heightM = 15 + Math.min(14, area * 0.012);
  } else if (bTag === 'apartments' || (Number.isFinite(levels) && levels >= 3)) {
    kind = 'large_building';
    if (!heightM) heightM = 12;
  } else if (area >= 115 || bTag === 'residential') {
    kind = 'medium_house';
    if (!heightM) heightM = 6;
  } else {
    kind = 'small_cottage';
    if (!heightM) heightM = 4.8 + (area > 60 ? 1.5 : 0);
  }

  return {
    kind,
    heightM: Math.max(4.4, Math.min(34, heightM)),
  };
}

function buildDemoSnapshot(stopIndex: number, version: number): OsmMapSnapshot {
  const stop = SWEDISH_WINTER_TOUR[stopIndex % SWEDISH_WINTER_TOUR.length];
  const buildings: OsmBuilding[] = [];
  const roads: OsmRoadRibbon[] = [];
  const waters: OsmWaterFeature[] = [];
  const forests: OsmForestPatch[] = [];
  const pois: OsmPoi[] = [];

  const addBoxBuilding = (
    id: string,
    cx: number,
    cz: number,
    w: number,
    d: number,
    heightM: number,
    kind: OsmBuildingKind,
    name: string | null = null,
    yaw = 0
  ) => {
    buildings.push({
      id,
      footprint: rectFootprint(cx, cz, w, d, yaw),
      centerX: cx,
      centerZ: cz,
      widthM: w,
      depthM: d,
      areaM2: w * d,
      heightM,
      kind,
      name,
    });
  };

  if (stop.placeName === 'Stockholm') {
    // Urban boulevard: medium_house townhouses lining East, frozen Nybroviken bay West, grand Palace landmark
    waters.push({
      points: [
        { x: -16, z: 30 },
        { x: -16, z: -240 },
        { x: -110, z: -240 },
        { x: -110, z: 30 },
      ],
      isPolygon: true,
      widthM: 80,
      name: 'Nybroviken',
    });
    for (let i = 0; i < 8; i++) {
      const bz = -14 - i * 26;
      addBoxBuilding(`sthlm-a-${i}`, 22, bz, 15, 16, 12.5 + (i % 3) * 2.5, 'medium_house');
      if (i % 2 === 0) {
        addBoxBuilding(`sthlm-b-${i}`, 44, bz - 6, 17, 15, 14 + (i % 2) * 3, 'medium_house');
      }
    }
    addBoxBuilding('sthlm-palace', -30, -125, 22, 32, 19, 'large_building', 'Kungliga Slottet');
    pois.push({ x: -13, z: -125, kind: 'landmark', name: 'Kungliga Slottet' });
    roads.push({ points: [{ x: 11, z: -60 }, { x: 75, z: -60 }], widthM: 6, isMajor: false, name: 'Torggatan' });
    roads.push({ points: [{ x: 11, z: -134 }, { x: 75, z: -134 }], widthM: 6, isMajor: false, name: 'Slottsbacken' });
    // Minimal crisp city park accents (no pine wall!)
    forests.push(
      { centerX: -14, centerZ: -45, radiusM: 8, density: 0.35 },
      { centerX: 14, centerZ: -102, radiusM: 8, density: 0.35 }
    );
  } else if (stop.placeName === 'Upplandsslätten') {
    // Wide-open snowy Swedish agricultural countryside! Almost zero trees, vast horizon, one cute red stuga!
    addBoxBuilding('upp-stuga', -22, -92, 7.6, 6.2, 5.2, 'small_cottage', 'Lillstugan', 0.14);
    addBoxBuilding('upp-stuga-2', 26, -158, 7.2, 5.8, 5.0, 'small_cottage', null, -0.18);
    // Just 1 tiny lonely roadside birch/pine grove far off on horizon
    forests.push({ centerX: -48, centerZ: -140, radiusM: 10, density: 0.28 });
    pois.push({ x: 13, z: -88, kind: 'landmark', name: 'Vintervidderna' });
  } else if (stop.placeName === 'Roslagen') {
    // True enchanted deep Nordic winter pine forest with tucked-in warm small timber cottages
    for (let i = 0; i < 9; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const cz = -18 - i * 23;
      forests.push({
        centerX: side * (22 + (i % 3) * 9),
        centerZ: cz,
        radiusM: 18,
        density: 0.85,
      });
      if (i === 2) {
        addBoxBuilding('ros-cottage-1', -20, cz, 8.2, 6.6, 5.4, 'small_cottage', 'Skogstorpet', 0.18);
      } else if (i === 5) {
        addBoxBuilding('ros-cottage-2', 21, cz, 7.8, 6.4, 5.2, 'small_cottage', 'Jägarstugan', -0.2);
      }
    }
    roads.push({ points: [{ x: 11, z: -76 }, { x: 68, z: -92 }], widthM: 4.5, isMajor: false, name: 'Skogsvägen' });
    pois.push({ x: 13, z: -76, kind: 'landmark', name: 'Glittrande Granskog' });
  } else if (stop.placeName === 'Giga Nord') {
    // Open winter highway flanking a massive recognizable Tesla Gigafactory + V4 Supercharger!
    addBoxBuilding(
      'giga-factory-1',
      -34,
      -96,
      26,
      44,
      14.5,
      'gigafactory',
      'Tesla Gigafactory Nord'
    );
    addBoxBuilding('giga-office-2', 28, -148, 22, 18, 12.0, 'large_building', 'Giga Design Hub');
    addBoxBuilding('giga-cottage-gate', 22, -46, 8, 6.5, 5.4, 'small_cottage', 'Entrévakt', -0.15);
    pois.push({ x: 15, z: -96, kind: 'charger', name: 'Supercharger Giga Nord' });
    roads.push({ points: [{ x: -75, z: -64 }, { x: 75, z: -64 }], widthM: 8, isMajor: true, name: 'Giga Allé' });
    forests.push({ centerX: 46, centerZ: -64, radiusM: 14, density: 0.45 });
  } else if (stop.placeName === 'Sigtuna') {
    // Cozy historic Swedish wooden small town: small cottages + medium inns + Mariakyrkan church spire
    waters.push({
      points: [
        { x: -34, z: 30 },
        { x: -38, z: -240 },
        { x: -115, z: -240 },
        { x: -115, z: 30 },
      ],
      isPolygon: true,
      widthM: 70,
      name: 'Sigtunafjärden',
    });
    for (let i = 0; i < 8; i++) {
      const cz = -16 - i * 24;
      addBoxBuilding(
        `sig-l-${i}`,
        -19,
        cz,
        i % 2 === 0 ? 7.8 : 11.2,
        i % 2 === 0 ? 6.4 : 9.0,
        i % 2 === 0 ? 5.4 : 8.5,
        i % 2 === 0 ? 'small_cottage' : 'medium_house'
      );
      addBoxBuilding(
        `sig-r-${i}`,
        19,
        cz - 6,
        i % 2 === 1 ? 8.0 : 12.0,
        i % 2 === 1 ? 6.6 : 9.4,
        i % 2 === 1 ? 5.6 : 9.0,
        i % 2 === 1 ? 'small_cottage' : 'medium_house'
      );
    }
    addBoxBuilding('sig-church', 31, -110, 14, 22, 18, 'church', 'Mariakyrkan');
    pois.push({ x: 13, z: -92, kind: 'landmark', name: 'Sigtuna Julmarknad' });
    roads.push({ points: [{ x: -34, z: -92 }, { x: 64, z: -92 }], widthM: 5, isMajor: false, name: 'Stora Torget' });
    forests.push({ centerX: -30, centerZ: -175, radiusM: 12, density: 0.42 });
  } else {
    // Uppsala: Frozen Fyrisån river + medium townhouses + twin-spire Uppsala Domkyrka!
    waters.push({
      points: [
        { x: -20, z: 30 },
        { x: -22, z: -110 },
        { x: -27, z: -240 },
      ],
      isPolygon: false,
      widthM: 16,
      name: 'Fyrisån',
    });
    for (let i = 0; i < 7; i++) {
      const cz = -18 - i * 28;
      addBoxBuilding(`upp-r-${i}`, 22, cz, 14.5, 13.5, 11.5 + (i % 2) * 3, 'medium_house');
      if (i % 2 === 0) {
        addBoxBuilding(`upp-l-${i}`, -39, cz - 8, 12, 11, 10.5, 'medium_house');
      }
    }
    addBoxBuilding('upp-dom', -40, -116, 20, 32, 26, 'church', 'Uppsala Domkyrka');
    pois.push({ x: -16, z: -116, kind: 'church', name: 'Uppsala Domkyrka' });
    roads.push({ points: [{ x: -65, z: -116 }, { x: 65, z: -116 }], widthM: 6, isMajor: false, name: 'Dombron' });
    forests.push({ centerX: 34, centerZ: -182, radiusM: 14, density: 0.42 });
  }

  return {
    version,
    biome: stop.biome,
    originLat: stop.lat,
    originLon: stop.lon,
    buildings,
    roads,
    waters,
    forests,
    pois,
  };
}

interface OverpassEl {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  nodes?: number[];
  geometry?: { lat: number; lon: number }[];
  tags?: Record<string, string>;
}

async function streetElements(query: string, lat: number, lon: number, signal: AbortSignal): Promise<OverpassEl[]> {
  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST', body: new URLSearchParams({ data: query }),
      signal: AbortSignal.any([signal, AbortSignal.timeout(7500)]),
    });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.elements) && data.elements.some((e: OverpassEl) => e.tags?.highway && e.geometry?.length)) return data.elements;
    }
  } catch (error) {
    if (signal.aborted) throw error;
  }
  // The core OSM API returns node references instead of inline way coordinates.
  const dy = 390 / 110540;
  const dx = 390 / (111320 * Math.max(0.05, Math.cos(lat * Math.PI / 180)));
  const bbox = [lon-dx, lat-dy, lon+dx, lat+dy].map(n => n.toFixed(6)).join(',');
  const response = await fetch('https://api.openstreetmap.org/api/0.6/map.json?bbox=' + bbox, { signal });
  if (!response.ok) throw new Error('OSM map unavailable');
  const elements: OverpassEl[] = (await response.json()).elements;
  const positions = new Map<number, {lat: number; lon: number}>();
  for (const e of elements) {
    if (e.type === 'node' && e.lat !== undefined && e.lon !== undefined) positions.set(e.id, {lat: e.lat, lon: e.lon});
  }
  for (const e of elements) {
    if (e.type === 'way' && e.nodes) e.geometry = e.nodes.flatMap(id => positions.get(id) ?? []);
  }
  return elements.filter(e => e.tags && (!e.tags.highway ||
    /^(motorway|trunk|primary|secondary|tertiary)(_link)?$|^(residential|living_street|unclassified|service|road)$/.test(e.tags.highway)));
}

export class OsmWorldDirector {
  private enabled = true;
  private isLiveOsm = false;
  private placeName = SWEDISH_WINTER_TOUR[0].placeName;
  private roadName = SWEDISH_WINTER_TOUR[0].roadName;
  private biome: OsmBiome = SWEDISH_WINTER_TOUR[0].biome;
  private nearbyLandmark: string | null = SWEDISH_WINTER_TOUR[0].nearbyLandmark;
  private nearbyChargerName: string | null = SWEDISH_WINTER_TOUR[0].nearbyChargerName;
  private isNearRealTunnel = false;
  private landmarkPulse = 0.7;

  private demoIdx = 0;
  private demoTravelM = 0;
  private snapshotVersion = 1;
  private snapshot: OsmMapSnapshot = buildDemoSnapshot(0, 1);

  private lastFetchMs = 0;
  private lastFetchLat = 0;
  private lastFetchLon = 0;
  private retryMap = false;
  private inflightAbort: AbortController | null = null;
  private placeListeners = new Set<(state: OsmWorldState) => void>();

  constructor(liveOnly = false) {
    if (liveOnly) return;
    try {
      const saved = localStorage.getItem('tesla-xmas-osm');
      if (saved === '0') this.enabled = false;
    } catch {
      // Ignore storage access errors
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    try {
      localStorage.setItem('tesla-xmas-osm', enabled ? '1' : '0');
    } catch {
      // Ignore
    }
  }

  onPlaceChange(cb: (state: OsmWorldState) => void): () => void {
    this.placeListeners.add(cb);
    return () => this.placeListeners.delete(cb);
  }

  private emitPlaceChange(): void {
    const snap = this.getState();
    for (const cb of this.placeListeners) {
      cb(snap);
    }
  }

  nextDemoStop(): void {
    this.demoIdx = (this.demoIdx + 1) % SWEDISH_WINTER_TOUR.length;
    this.demoTravelM = 0;
    const stop = SWEDISH_WINTER_TOUR[this.demoIdx];
    this.isLiveOsm = false;
    this.placeName = stop.placeName;
    this.roadName = stop.roadName;
    this.biome = stop.biome;
    this.nearbyLandmark = stop.nearbyLandmark;
    this.nearbyChargerName = stop.nearbyChargerName;
    this.isNearRealTunnel = false;
    this.landmarkPulse = 1.0;
    this.snapshotVersion++;
    this.snapshot = buildDemoSnapshot(this.demoIdx, this.snapshotVersion);
    this.emitPlaceChange();
  }

  update(
    dt: number,
    source: DriveSource,
    lat: number,
    lon: number,
    isMoving: boolean,
    speedKmh = 55,
    gpsReady = true
  ): OsmWorldState {
    if (this.landmarkPulse > 0) {
      this.landmarkPulse = Math.max(0, this.landmarkPulse - dt * 0.25);
    }

    if ((!this.enabled || source !== 'gps') && this.inflightAbort) {
      this.inflightAbort.abort();
      this.inflightAbort = null;
    }
    if (!this.enabled || source !== 'gps') this.lastFetchMs = 0;
    if (!this.enabled || (source === 'gps' && !gpsReady)) {
      return this.getState();
    }

    if (source === 'gps') {
      const now = Date.now();
      const movedM =
        this.lastFetchMs === 0 ? 9999 : haversineMeters(this.lastFetchLat, this.lastFetchLon, lat, lon);

      if (!this.inflightAbort && (this.lastFetchMs === 0 || (now - this.lastFetchMs >= 8000 && movedM >= 120) || (now - this.lastFetchMs >= 30000 && (!this.isLiveOsm || this.retryMap)))) {
        this.lastFetchMs = now;
        this.lastFetchLat = lat;
        this.lastFetchLon = lon;
        void this.fetchLiveOsm(lat, lon);
      }
    } else {
      // Curated offline Swedish Street-View corridors
      if (this.isLiveOsm) {
        this.isLiveOsm = false;
        this.snapshotVersion++;
        this.snapshot = buildDemoSnapshot(this.demoIdx, this.snapshotVersion);
      }
      if (isMoving) {
        this.demoTravelM += (Math.max(12, speedKmh) / 3.6) * dt * 0.65;
        if (this.demoTravelM >= 185) {
          this.nextDemoStop();
        }
      }
    }

    return this.getState();
  }

  private async fetchLiveOsm(lat: number, lon: number): Promise<void> {
    this.inflightAbort?.abort();
    const ctrl = new AbortController();
    this.inflightAbort = ctrl;
    const timer = setTimeout(() => ctrl.abort(), 20000);

    try {
      const nomUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat.toFixed(
        5
      )}&lon=${lon.toFixed(5)}&zoom=18&addressdetails=1`;

      const fLat = lat.toFixed(4);
      const fLon = lon.toFixed(4);
      const streets = `way(around:650,${fLat},${fLon})["highway"~"^(motorway|trunk|primary|secondary|tertiary)(_link)?$|^(residential|living_street|unclassified|service|road)$"]`;
      const overpassQuery = `[out:json][timeout:6];${streets};out body geom;(way(around:460,${fLat},${fLon})["building"];way(around:320,${fLat},${fLon})["natural"~"water|wood|grassland|heath"];way(around:300,${fLat},${fLon})["waterway"~"river|canal|stream"];way(around:300,${fLat},${fLon})["landuse"~"forest|farmland|meadow|field|farmyard|pasture|industrial|commercial|retail|residential|recreation_ground"];way(around:300,${fLat},${fLon})["leisure"="park"];way(around:120,${fLat},${fLon})["tunnel"="yes"];node(around:450,${fLat},${fLon})["amenity"~"charging_station|place_of_worship|cafe|restaurant|school|library"];node(around:450,${fLat},${fLon})["tourism"="attraction"];node(around:450,${fLat},${fLon})["railway"="station"];node(around:450,${fLat},${fLon})["historic"];node(around:350,${fLat},${fLon})["natural"="tree"];node(around:320,${fLat},${fLon})["highway"~"^(traffic_signals|crossing|street_lamp)$"];);out body geom;`;

      const [nomRes, els] = await Promise.all([
        fetch(nomUrl, { signal: AbortSignal.timeout(3500) }).catch(() => null),
        streetElements(overpassQuery, lat, lon, ctrl.signal),
      ]);

      let nextPlace = this.isLiveOsm ? this.placeName : '';
      let nextRoad = this.isLiveOsm ? this.roadName : '';
      if (nomRes?.ok) {
        const nomData = await nomRes.json();
        const addr = nomData?.address ?? {};
        nextPlace = addr.city || addr.town || addr.village || addr.suburb || addr.municipality || nextPlace;
        nextRoad = addr.road || addr.neighbourhood || nextPlace;
      }

      let nextBiome: OsmBiome = 'open';
      let nextLandmark: string | null = null;
      let nextCharger: string | null = null;
      let nextTunnel = false;

      const buildings: OsmBuilding[] = [];
      const roads: OsmRoadRibbon[] = [];
      const waters: OsmWaterFeature[] = [];
      const forests: OsmForestPatch[] = [];
      const pois: OsmPoi[] = [];
      const trees: OsmPoint2D[] = [];
      const woodland: OsmPoint2D[][] = [];
      const streetLamps: OsmPoint2D[] = [];
      const trafficSignals: OsmPoint2D[] = [];
      const crossings: OsmPoint2D[] = [];
      const seenWays = new Set<number>();

      {
        let hasWater = false;
        let hasForest = false;
        let hasUrban = false;
        let hasOpenFields = false;
        let hasHighwayOnly = false;

        for (const el of els) {
          const tags = el.tags;
          if (!tags) continue;

          if (tags.tunnel === 'yes') nextTunnel = true;

          if (el.type === 'node' && el.lat !== undefined && el.lon !== undefined) {
            const pt = geoDeltaMeters(lat, lon, el.lat, el.lon);
            if (tags.natural === 'tree') {
              trees.push(pt);
            } else if (tags.highway === 'street_lamp') {
              streetLamps.push(pt);
            } else if (tags.highway === 'traffic_signals') {
              trafficSignals.push(pt);
            } else if (tags.highway === 'crossing') {
              crossings.push(pt);
            } else if (tags.amenity === 'charging_station') {
              const cname = tags.name || tags.operator || 'Laddstation';
              if (!nextCharger) nextCharger = cname;
              pois.push({ x: pt.x, z: pt.z, kind: 'charger', name: cname, tesla: /tesla|supercharger/i.test([tags.name, tags.brand, tags.operator, tags.network].join(' ')) });
            } else if (tags.amenity === 'place_of_worship' && tags.name) {
              if (!nextLandmark) nextLandmark = tags.name;
              pois.push({ x: pt.x, z: pt.z, kind: 'church', name: tags.name });
            } else if (tags.railway === 'station' && tags.name) {
              if (!nextLandmark) nextLandmark = tags.name;
              pois.push({ x: pt.x, z: pt.z, kind: 'station', name: tags.name });
            } else if (tags.name) {
              if (!nextLandmark) nextLandmark = tags.name;
              pois.push({ x: pt.x, z: pt.z, kind: 'landmark', name: tags.name });
            }
            continue;
          }

          if (el.type !== 'way' || !el.geometry || el.geometry.length < 2) continue;
          if (seenWays.has(el.id)) continue;
          seenWays.add(el.id);
          const pts = el.geometry.map((g) => geoDeltaMeters(lat, lon, g.lat, g.lon));

          if (tags.building) {
            const ring =
              pts.length > 3 &&
              Math.hypot(pts[0].x - pts[pts.length - 1].x, pts[0].z - pts[pts.length - 1].z) < 0.3
                ? pts.slice(0, -1)
                : pts;
            if (ring.length < 3) continue;
            const stats = polygonStats(ring);
            if (stats.area < 8) continue;
            const cls = classifyBuilding(tags, stats.area);
            buildings.push({
              id: `w-${el.id}`,
              footprint: ring,
              centerX: stats.cx,
              centerZ: stats.cz,
              widthM: stats.widthM,
              depthM: stats.depthM,
              areaM2: stats.area,
              heightM: cls.heightM,
              levels: Number.parseFloat(tags['building:levels'] ?? '') || undefined,
              roofShape: tags['roof:shape'],
              kind: cls.kind,
              tesla: /tesla|gigafactory/i.test([tags.name, tags.brand, tags.operator].join(' ')) &&
                /industrial|warehouse|factory|commercial/.test(tags.building + ' ' + tags.landuse) ||
                /gigafactory/i.test(tags.name ?? ''),
              name: tags.name ?? null,
            });
            if (cls.kind === 'church' && tags.name) {
              nextLandmark = tags.name;
            }
          } else if (tags.highway) {
            const hw = tags.highway;
            const isMajor = hw === 'motorway' || hw === 'trunk' || hw === 'primary' || hw === 'secondary';
            if (isMajor) hasHighwayOnly = true;
            const widthM = isMajor ? 8.5 : hw === 'tertiary' || hw === 'residential' ? 6.2 : 4.2;
            const lanes = Number.parseInt(tags.lanes ?? '', 10);
            const maxspeed = Number.parseInt(tags.maxspeed ?? '', 10);
            roads.push({
              points: pts,
              widthM,
              isMajor,
              highway: hw,
              lanes: Number.isFinite(lanes) && lanes > 0 ? lanes : undefined,
              maxspeed: Number.isFinite(maxspeed) && maxspeed >= 10 && maxspeed <= 160 ? maxspeed : undefined,
              tunnel: tags.tunnel === 'yes' || tags.tunnel === 'building_passage',
              name: tags.name ?? tags.ref ?? null,
            });
          } else if (tags.natural === 'water' || tags.waterway) {
            hasWater = true;
            const isClosed =
              pts.length > 3 &&
              Math.hypot(pts[0].x - pts[pts.length - 1].x, pts[0].z - pts[pts.length - 1].z) < 2;
            waters.push({
              points: decimatePoints(isClosed ? pts.slice(0, -1) : pts, 20),
              isPolygon: isClosed && tags.natural === 'water',
              widthM: tags.waterway === 'river' || tags.waterway === 'canal' ? 14 : 7,
              name: tags.name ?? tags.ref ?? null,
            });
          } else if (tags.natural === 'wood' || tags.landuse === 'forest' || tags.leisure === 'park') {
            hasForest = true;
            if (pts.length > 3 && Math.hypot(pts[0].x - pts.at(-1)!.x, pts[0].z - pts.at(-1)!.z) < 1) woodland.push(pts);
            const stats = polygonStats(pts);
            const estRadius = Math.max(8, Math.min(34, Math.sqrt(Math.max(50, stats.area) / Math.PI)));
            forests.push({
              centerX: stats.cx,
              centerZ: stats.cz,
              radiusM: estRadius,
              density: tags.leisure === 'park' ? 0.45 : 0.88,
            });
          } else if (
            tags.landuse === 'farmland' ||
            tags.landuse === 'meadow' ||
            tags.landuse === 'field' ||
            tags.landuse === 'farmyard' ||
            tags.landuse === 'pasture' ||
            tags.natural === 'grassland' ||
            tags.natural === 'heath'
          ) {
            hasOpenFields = true;
          } else if (
            tags.landuse === 'residential' ||
            tags.landuse === 'commercial' ||
            tags.landuse === 'retail'
          ) {
            hasUrban = true;
          }
        }

        // Strict Street-View land-use reflection: NO fake forests injected in open land!
        if (hasWater && waters.length > 0) nextBiome = 'water';
        else if (hasForest && buildings.length < 7) nextBiome = 'forest';
        else if (buildings.length >= 4 || hasUrban) nextBiome = 'village';
        else if (hasOpenFields || (!hasForest && buildings.length <= 3 && !hasHighwayOnly)) nextBiome = 'open';
        else nextBiome = 'highway';
      }

      const distSq = (x: number, z: number) => x * x + z * z;
      buildings.sort((a, b) => distSq(a.centerX, a.centerZ) - distSq(b.centerX, b.centerZ));
      forests.sort((a, b) => distSq(a.centerX, a.centerZ) - distSq(b.centerX, b.centerZ));
      pois.sort((a, b) => distSq(a.x, a.z) - distSq(b.x, b.z));

      const placeChanged =
        nextPlace !== this.placeName || nextBiome !== this.biome || nextLandmark !== this.nearbyLandmark;
      if (ctrl.signal.aborted) return;
      this.retryMap = false;
      this.isLiveOsm = true;
      this.placeName = nextPlace;
      this.roadName = nextRoad;
      this.biome = nextBiome;
      this.nearbyLandmark = nextLandmark;
      this.nearbyChargerName = nextCharger;
      this.isNearRealTunnel = nextTunnel;
      this.snapshotVersion++;
      this.snapshot = {
        version: this.snapshotVersion,
        biome: nextBiome,
        originLat: lat,
        originLon: lon,
        buildings: buildings.slice(0, 350),
        trees,
        woodland,
        streetLamps: streetLamps.slice(0, 120),
        trafficSignals: trafficSignals.slice(0, 24),
        crossings: crossings.slice(0, 32),
        roads,
        waters: waters.slice(0, 10),
        forests: forests.slice(0, 14),
        pois: pois.slice(0, 8),
      };

      if (placeChanged) {
        this.landmarkPulse = 1.0;
        this.emitPlaceChange();
      }
    } catch {
      this.retryMap = true;
    } finally {
      clearTimeout(timer);
      if (this.inflightAbort === ctrl) this.inflightAbort = null;
    }
  }

  getState(): OsmWorldState {
    return {
      enabled: this.enabled,
      isLiveOsm: this.isLiveOsm,
      placeName: this.placeName,
      roadName: this.roadName,
      biome: this.biome,
      nearbyLandmark: this.nearbyLandmark,
      nearbyChargerName: this.nearbyChargerName,
      isNearRealTunnel: this.isNearRealTunnel,
      landmarkPulse: this.landmarkPulse,
      snapshot: this.snapshot,
      buildingCount: this.snapshot.buildings.length,
      waterCount: this.snapshot.waters.length,
      forestCount: this.snapshot.forests.length,
      demoTravelM: this.demoTravelM,
    };
  }
}
