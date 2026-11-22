import { DriveSource } from './telemetry';

export type OsmBiome = 'village' | 'forest' | 'water' | 'highway';
export type OsmBuildingKind = 'house' | 'apartment' | 'church' | 'commercial' | 'landmark';

export interface OsmPoint2D {
  x: number; // +East meters relative to snapshot origin
  z: number; // +South meters relative to snapshot origin (-Z is North)
}

export interface OsmBuilding {
  id: string;
  footprint: OsmPoint2D[];
  centerX: number;
  centerZ: number;
  heightM: number;
  kind: OsmBuildingKind;
  name: string | null;
}

export interface OsmRoadRibbon {
  points: OsmPoint2D[];
  widthM: number;
  isMajor: boolean;
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
  name: string;
}

export interface OsmMapSnapshot {
  version: number;
  originLat: number;
  originLon: number;
  buildings: OsmBuilding[];
  roads: OsmRoadRibbon[];
  waters: OsmWaterFeature[];
  forests: OsmForestPatch[];
  pois: OsmPoi[];
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
    placeName: 'Mälaren',
    roadName: 'Riddarfjärden',
    biome: 'water',
    nearbyLandmark: 'Spegelblank Vintervik',
    nearbyChargerName: null,
    lat: 59.322,
    lon: 18.042,
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
    placeName: 'Upplands Väsby',
    roadName: 'E4 Norr',
    biome: 'highway',
    nearbyLandmark: null,
    nearbyChargerName: 'Supercharger InfraCity',
    lat: 59.506,
    lon: 17.921,
  },
  {
    placeName: 'Sigtuna',
    roadName: 'Stora Gatan',
    biome: 'village',
    nearbyLandmark: 'Sigtuna Julmarknad',
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

function polygonStats(pts: OsmPoint2D[]): { area: number; cx: number; cz: number } {
  let areaSum = 0;
  let cx = 0;
  let cz = 0;
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    areaSum += a.x * b.z - b.x * a.z;
    cx += a.x;
    cz += a.z;
  }
  return {
    area: Math.abs(areaSum * 0.5),
    cx: cx / Math.max(1, n),
    cz: cz / Math.max(1, n),
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
  const amenity = tags.amenity ?? '';
  const name = tags.name ?? '';

  let heightM = 0;
  const rawHeight = Number.parseFloat(tags.height ?? '');
  if (Number.isFinite(rawHeight) && rawHeight > 2) {
    heightM = rawHeight;
  } else if (tags['building:levels']) {
    const lv = Number.parseFloat(tags['building:levels']);
    if (Number.isFinite(lv) && lv > 0) heightM = lv * 3.4 + 1.5;
  }

  let kind: OsmBuildingKind = 'house';
  if (bTag === 'church' || bTag === 'cathedral' || amenity === 'place_of_worship' || /kyrka|cathedral/i.test(name)) {
    kind = 'church';
    if (!heightM) heightM = 16;
  } else if (tags.tourism === 'attraction' || tags.historic || /slott|palace|muse/i.test(name)) {
    kind = 'landmark';
    if (!heightM) heightM = 18;
  } else if (bTag === 'commercial' || bTag === 'retail' || bTag === 'office' || bTag === 'industrial' || bTag === 'supermarket') {
    kind = 'commercial';
    if (!heightM) heightM = 10 + Math.min(12, area * 0.012);
  } else if (bTag === 'apartments' || bTag === 'residential' || area > 220) {
    kind = 'apartment';
    if (!heightM) heightM = 11 + Math.min(16, area * 0.015);
  } else {
    kind = 'house';
    if (!heightM) heightM = 6.2 + (area > 95 ? 2.8 : 0);
  }

  return {
    kind,
    heightM: Math.max(4.5, Math.min(36, heightM)),
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
      heightM,
      kind,
      name,
    });
  };

  if (stop.placeName === 'Stockholm') {
    // Waterfront boulevard: historic Nordic mansions on East (+X), frozen Riddarfjärden bay on West (-X)
    waters.push({
      points: [
        { x: -17, z: 30 },
        { x: -17, z: -240 },
        { x: -110, z: -240 },
        { x: -110, z: 30 },
      ],
      isPolygon: true,
      widthM: 80,
      name: 'Nybroviken',
    });
    for (let i = 0; i < 9; i++) {
      const bz = -8 - i * 24;
      addBoxBuilding(`sthlm-a-${i}`, 21, bz, 15, 16, 15 + (i % 3) * 3, 'apartment');
      addBoxBuilding(`sthlm-b-${i}`, 43, bz - 6, 18, 16, 17 + ((i + 1) % 3) * 3, 'apartment');
    }
    addBoxBuilding('sthlm-palace', -28, -125, 22, 34, 21, 'landmark', 'Kungliga Slottet');
    pois.push({ x: -13, z: -125, kind: 'landmark', name: 'Kungliga Slottet' });
    roads.push({ points: [{ x: 10, z: -56 }, { x: 75, z: -56 }], widthM: 6, isMajor: false, name: 'Torggatan' });
    roads.push({ points: [{ x: 10, z: -128 }, { x: 75, z: -128 }], widthM: 6, isMajor: false, name: 'Slottsbacken' });
    forests.push(
      { centerX: -14, centerZ: -35, radiusM: 12, density: 0.75 },
      { centerX: 13, centerZ: -90, radiusM: 14, density: 0.85 },
      { centerX: -14, centerZ: -175, radiusM: 9, density: 0.9 },
      { centerX: 32, centerZ: -195, radiusM: 16, density: 0.85 }
    );
  } else if (stop.placeName === 'Mälaren') {
    waters.push(
      {
        points: [
          { x: -15, z: 30 },
          { x: -17, z: -240 },
          { x: -105, z: -240 },
          { x: -105, z: 30 },
        ],
        isPolygon: true,
        widthM: 80,
        name: 'Mälaren Väst',
      },
      {
        points: [
          { x: 15, z: 30 },
          { x: 17, z: -240 },
          { x: 105, z: -240 },
          { x: 105, z: 30 },
        ],
        isPolygon: true,
        widthM: 80,
        name: 'Riddarfjärden',
      }
    );
    for (let i = 0; i < 6; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const cz = -24 - i * 32;
      addBoxBuilding(`mal-cot-${i}`, side * 26, cz, 8.5, 7, 6.2, 'house', i === 2 ? 'Ekerö Brygga' : null, side * 0.2);
      forests.push({ centerX: side * 36, centerZ: cz - 6, radiusM: 14, density: 0.9 });
    }
    pois.push({ x: -13, z: -88, kind: 'landmark', name: 'Spegelblank Vintervik' });
  } else if (stop.placeName === 'Roslagen') {
    // Deep enchanting Nordic winter forest with winding side forest lanes & warm cabins
    for (let i = 0; i < 10; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const cz = -15 - i * 21;
      forests.push({ centerX: side * (18 + (i % 3) * 8), centerZ: cz, radiusM: 18, density: 1.0 });
      if (i % 3 === 1) {
        addBoxBuilding(`ros-cabin-${i}`, side * 21, cz, 8, 6.8, 5.8, 'house', i === 4 ? 'Skogstorpet' : null, side * -0.15);
      }
    }
    roads.push({ points: [{ x: 10, z: -72 }, { x: 68, z: -88 }], widthM: 4.5, isMajor: false, name: 'Skogsvägen' });
    pois.push({ x: 13, z: -72, kind: 'landmark', name: 'Glittrande Granskog' });
  } else if (stop.placeName === 'Upplands Väsby') {
    // Highway + Supercharger plaza + Nordic commercial hubs wrapped in snowy pines
    for (let i = 0; i < 7; i++) {
      const cz = -20 - i * 28;
      if (i !== 2) {
        addBoxBuilding(`uv-com-${i}`, i % 2 === 0 ? -26 : 28, cz, 19, 14, 11.5, 'commercial');
      }
      forests.push({ centerX: i % 2 === 0 ? 20 : -22, centerZ: cz, radiusM: 15, density: 0.85 });
    }
    addBoxBuilding('uv-mall', -26, -76, 22, 18, 12.5, 'commercial', 'InfraCity Julcenter');
    pois.push({ x: 15, z: -76, kind: 'charger', name: 'Supercharger InfraCity' });
    roads.push({ points: [{ x: -75, z: -76 }, { x: 75, z: -76 }], widthM: 8, isMajor: true, name: 'E4 Avfart' });
  } else if (stop.placeName === 'Sigtuna') {
    // Historic Swedish wooden town + Mariakyrkan church spire + waterfront
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
    for (let i = 0; i < 11; i++) {
      const cz = -10 - i * 18;
      addBoxBuilding(`sig-l-${i}`, -18, cz, 9.2, 8.4, 6.8 + (i % 2) * 1.4, 'house');
      addBoxBuilding(`sig-r-${i}`, 18, cz - 5, 9.6, 8.4, 7.0 + ((i + 1) % 2) * 1.6, 'house');
    }
    addBoxBuilding('sig-church', 28, -110, 14, 22, 18, 'church', 'Mariakyrkan');
    pois.push({ x: 13, z: -92, kind: 'landmark', name: 'Sigtuna Julmarknad' });
    roads.push({ points: [{ x: -34, z: -92 }, { x: 64, z: -92 }], widthM: 5, isMajor: false, name: 'Stora Torget' });
    forests.push(
      { centerX: -28, centerZ: -46, radiusM: 13, density: 0.9 },
      { centerX: 32, centerZ: -165, radiusM: 16, density: 0.9 }
    );
  } else {
    // Uppsala: Frozen Fyrisån river + University halls + Twin-spire Uppsala Domkyrka!
    waters.push({
      points: [
        { x: -18, z: 30 },
        { x: -20, z: -110 },
        { x: -25, z: -240 },
      ],
      isPolygon: false,
      widthM: 16,
      name: 'Fyrisån',
    });
    for (let i = 0; i < 8; i++) {
      const cz = -14 - i * 25;
      addBoxBuilding(`upp-r-${i}`, 21, cz, 15, 14, 13.5 + (i % 2) * 3, 'apartment');
      if (i % 2 === 0) {
        addBoxBuilding(`upp-l-${i}`, -38, cz - 8, 13, 12, 11.5, 'house');
      }
    }
    addBoxBuilding('upp-dom', -38, -116, 20, 32, 26, 'church', 'Uppsala Domkyrka');
    pois.push({ x: -17, z: -116, kind: 'church', name: 'Uppsala Domkyrka' });
    roads.push({ points: [{ x: -65, z: -116 }, { x: 65, z: -116 }], widthM: 6, isMajor: false, name: 'Dombron' });
    forests.push(
      { centerX: 14, centerZ: -45, radiusM: 13, density: 0.85 },
      { centerX: 30, centerZ: -180, radiusM: 16, density: 0.9 },
      { centerX: -46, centerZ: -185, radiusM: 18, density: 0.9 }
    );
  }

  return {
    version,
    originLat: stop.lat,
    originLon: stop.lon,
    buildings,
    roads,
    waters,
    forests,
    pois,
  };
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
  private inflightAbort: AbortController | null = null;
  private placeListeners = new Set<(state: OsmWorldState) => void>();

  constructor() {
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
    speedKmh = 55
  ): OsmWorldState {
    if (this.landmarkPulse > 0) {
      this.landmarkPulse = Math.max(0, this.landmarkPulse - dt * 0.25);
    }

    if (!this.enabled) {
      return this.getState();
    }

    if (source === 'gps') {
      const now = Date.now();
      const movedM =
        this.lastFetchMs === 0 ? 9999 : haversineMeters(this.lastFetchLat, this.lastFetchLon, lat, lon);

      if ((this.lastFetchMs === 0 || (now - this.lastFetchMs >= 25000 && movedM >= 110))) {
        this.lastFetchMs = now;
        this.lastFetchLat = lat;
        this.lastFetchLon = lon;
        void this.fetchLiveOsm(lat, lon);
      }
    } else {
      // Offline curated Swedish winter cityscape corridor (zero external network calls)
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
    const timer = setTimeout(() => ctrl.abort(), 7500);

    try {
      const nomUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat.toFixed(
        5
      )}&lon=${lon.toFixed(5)}&zoom=14&addressdetails=1`;

      const fLat = lat.toFixed(4);
      const fLon = lon.toFixed(4);
      const overpassQuery = `[out:json][timeout:6];(way(around:230,${fLat},${fLon})["building"];way(around:250,${fLat},${fLon})["highway"~"motorway|trunk|primary|secondary|tertiary|residential|unclassified|service"];way(around:320,${fLat},${fLon})["natural"~"water|wood"];way(around:300,${fLat},${fLon})["waterway"~"river|canal|stream"];way(around:300,${fLat},${fLon})["landuse"~"forest|meadow|grass|recreation_ground"];way(around:300,${fLat},${fLon})["leisure"="park"];way(around:120,${fLat},${fLon})["tunnel"="yes"];node(around:450,${fLat},${fLon})["amenity"~"charging_station|place_of_worship|cafe|restaurant|school|library"];node(around:450,${fLat},${fLon})["tourism"="attraction"];node(around:450,${fLat},${fLon})["railway"="station"];node(around:450,${fLat},${fLon})["historic"];);out body geom 160;`;

      const [nomRes, ovRes] = await Promise.all([
        fetch(nomUrl, { signal: ctrl.signal }),
        fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: `data=${encodeURIComponent(overpassQuery)}`,
          signal: ctrl.signal,
        }),
      ]);

      let nextPlace = this.placeName;
      let nextRoad = this.roadName;
      if (nomRes.ok) {
        const nomData = await nomRes.json();
        const addr = nomData?.address ?? {};
        nextPlace = addr.city || addr.town || addr.village || addr.suburb || addr.municipality || nextPlace;
        nextRoad = addr.road || addr.neighbourhood || nextPlace;
      }

      let nextBiome: OsmBiome = 'village';
      let nextLandmark: string | null = null;
      let nextCharger: string | null = null;
      let nextTunnel = false;

      const buildings: OsmBuilding[] = [];
      const roads: OsmRoadRibbon[] = [];
      const waters: OsmWaterFeature[] = [];
      const forests: OsmForestPatch[] = [];
      const pois: OsmPoi[] = [];

      if (ovRes.ok) {
        const ovData = await ovRes.json();
        interface OverpassEl {
          type: 'node' | 'way' | 'relation';
          id: number;
          lat?: number;
          lon?: number;
          geometry?: { lat: number; lon: number }[];
          tags?: Record<string, string>;
        }
        const els: OverpassEl[] = ovData?.elements ?? [];
        let hasWater = false;
        let hasForest = false;
        let hasResidential = false;

        for (const el of els) {
          const tags = el.tags;
          if (!tags) continue;

          if (tags.tunnel === 'yes') nextTunnel = true;

          if (el.type === 'node' && el.lat !== undefined && el.lon !== undefined) {
            const pt = geoDeltaMeters(lat, lon, el.lat, el.lon);
            if (tags.amenity === 'charging_station') {
              const cname = tags.name || tags.operator || 'Tesla Supercharger';
              if (!nextCharger) nextCharger = cname;
              pois.push({ x: pt.x, z: pt.z, kind: 'charger', name: cname });
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
          const pts = el.geometry.map((g) => geoDeltaMeters(lat, lon, g.lat, g.lon));

          if (tags.building) {
            hasResidential = true;
            const ring = pts.length > 3 && Math.hypot(pts[0].x - pts[pts.length - 1].x, pts[0].z - pts[pts.length - 1].z) < 0.3
              ? pts.slice(0, -1)
              : pts;
            if (ring.length < 3) continue;
            const stats = polygonStats(ring);
            if (stats.area < 8) continue;
            const cls = classifyBuilding(tags, stats.area);
            buildings.push({
              id: `w-${el.id}`,
              footprint: decimatePoints(ring, 16),
              centerX: stats.cx,
              centerZ: stats.cz,
              heightM: cls.heightM,
              kind: cls.kind,
              name: tags.name ?? null,
            });
            if (cls.kind === 'church' && tags.name) {
              nextLandmark = tags.name;
            }
          } else if (tags.highway) {
            const hw = tags.highway;
            const isMajor = hw === 'motorway' || hw === 'trunk' || hw === 'primary' || hw === 'secondary';
            const widthM = isMajor ? 8.5 : hw === 'tertiary' || hw === 'residential' ? 6.2 : 4.2;
            roads.push({
              points: decimatePoints(pts, 18),
              widthM,
              isMajor,
              name: tags.name ?? null,
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
              name: tags.name ?? null,
            });
          } else if (
            tags.natural === 'wood' ||
            tags.landuse === 'forest' ||
            tags.landuse === 'meadow' ||
            tags.landuse === 'grass' ||
            tags.landuse === 'recreation_ground' ||
            tags.leisure === 'park'
          ) {
            hasForest = true;
            const stats = polygonStats(pts);
            const estRadius = Math.max(8, Math.min(34, Math.sqrt(Math.max(50, stats.area) / Math.PI)));
            forests.push({
              centerX: stats.cx,
              centerZ: stats.cz,
              radiusM: estRadius,
              density: tags.natural === 'wood' || tags.landuse === 'forest' ? 1.0 : 0.72,
            });
          }
        }

        if (hasWater) nextBiome = 'water';
        else if (hasForest && !hasResidential) nextBiome = 'forest';
        else if (hasResidential) nextBiome = 'village';
        else nextBiome = 'highway';
      }

      // Sort by closest proximity to car and cap counts cleanly for MCU/WebGL performance
      const distSq = (x: number, z: number) => x * x + z * z;
      buildings.sort((a, b) => distSq(a.centerX, a.centerZ) - distSq(b.centerX, b.centerZ));
      forests.sort((a, b) => distSq(a.centerX, a.centerZ) - distSq(b.centerX, b.centerZ));
      pois.sort((a, b) => distSq(a.x, a.z) - distSq(b.x, b.z));

      // Always weave enchanting forest perimeter rings around recognizable OSM neighborhoods!
      const cappedForests = forests.slice(0, 14);
      if (cappedForests.length < 6) {
        const ringAngles = [0.4, 1.3, 2.2, 3.1, 4.1, 5.2];
        for (const a of ringAngles) {
          cappedForests.push({
            centerX: Math.cos(a) * 62,
            centerZ: Math.sin(a) * 62,
            radiusM: 18,
            density: 0.85,
          });
        }
      }

      const placeChanged =
        nextPlace !== this.placeName || nextBiome !== this.biome || nextLandmark !== this.nearbyLandmark;
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
        originLat: lat,
        originLon: lon,
        buildings: buildings.slice(0, 42),
        roads: roads.slice(0, 26),
        waters: waters.slice(0, 10),
        forests: cappedForests,
        pois: pois.slice(0, 8),
      };

      if (placeChanged) {
        this.landmarkPulse = 1.0;
        this.emitPlaceChange();
      }
    } catch {
      // Offline / rate-limited / blocked: keep last snapshot quietly
    } finally {
      clearTimeout(timer);
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
