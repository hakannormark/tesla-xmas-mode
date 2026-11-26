import { streetAtCar } from '../three/mappedRoads';
import district from './lokevagen.json';
import type { OsmBuilding, OsmPoint2D, OsmWorldState } from './osmWorld';
import type { TelemetryFrame } from './telemetry';

const points = (coordinates: number[][]): OsmPoint2D[] =>
  coordinates.map(([x, z]) => ({ x, z }));
const path = points(district.path);

const buildings: OsmBuilding[] = district.buildings.map(({ ring, height }, index) => {
  const footprint = points(ring);
  const xs = ring.map(([x]) => x);
  const zs = ring.map(([, z]) => z);
  const widthM = Math.max(...xs) - Math.min(...xs);
  const depthM = Math.max(...zs) - Math.min(...zs);
  const areaM2 = widthM * depthM;
  const isLarge = areaM2 >= 215 || index % 9 === 3 || index === 5 || index === 11;
  const isGiga = isLarge && (index === 5 || index === 11 || index % 18 === 3);
  return {
    id: 'djursholm-' + index,
    footprint,
    name: isGiga ? 'Tesla Giga Djursholm' : null,
    kind: isGiga ? 'gigafactory' : isLarge ? 'large_building' : 'small_cottage',
    tesla: isGiga || undefined,
    centerX: Math.min(...xs) + widthM / 2,
    centerZ: Math.min(...zs) + depthM / 2,
    widthM,
    depthM,
    heightM: isGiga ? Math.max(height, 9.2) : height,
    areaM2,
  };
});

const map: OsmWorldState = {
  enabled: true, isLiveOsm: true, placeName: 'Djursholm', roadName: 'Lokevägen',
  biome: 'village', nearbyLandmark: null, nearbyChargerName: 'Supercharger Djursholm', isNearRealTunnel: false,
  landmarkPulse: 0, buildingCount: buildings.length, waterCount: 0, forestCount: 0, demoTravelM: 0,
  snapshot: {
    version: -1, biome: 'village', originLat: district.origin[0], originLon: district.origin[1],
    roads: district.roads.map(road => ({
      name: road.name,
      points: points(road.points),
      widthM: road.width,
      isMajor: road.width >= 7,
      highway: road.width >= 7 ? 'secondary' : 'residential',
      maxspeed: road.width >= 7 ? 50 : 30,
    })),
    buildings,
    waters: [],
    forests: [],
    pois: [
      {
        x: 39.6,
        z: 64.3,
        kind: 'charger',
        chargerSource: 'charging_station',
        tesla: true,
        name: 'Supercharger Djursholm',
      },
    ],
    trafficSignals: [
      { x: 82.7, z: 116.4 },
      { x: 264.5, z: 366.3 },
    ],
    crossings: [
      { x: 36.2, z: 40.6 },
      { x: 82.7, z: 116.4 },
      { x: 264.5, z: 366.3 },
    ],
  },
};

// Use the bundled geometry for a real GPS fix only where a mapped road is nearby.
let lastFix = { lat: NaN, lon: NaN, covered: false };
export function districtAtFix(frame: TelemetryFrame): OsmWorldState | undefined {
  if (frame.latitude !== lastFix.lat || frame.longitude !== lastFix.lon) {
    lastFix = { lat: frame.latitude, lon: frame.longitude, covered:
      Math.abs(frame.latitude - district.origin[0]) < 0.012 &&
      Math.abs(frame.longitude - district.origin[1]) < 0.025 &&
      !!streetAtCar(map.snapshot, frame) };
  }
  return lastFix.covered ? map : undefined;
}

export class LocalDemoDrive {
  readonly map = map;
  private index = 0;
  private offset = 0;
  private previousHeading?: number;
  private distance = 0;

  advance(frame: TelemetryFrame, dt: number): void {
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
    const { originLat, originLon } = this.map.snapshot;
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
