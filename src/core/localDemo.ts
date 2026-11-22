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
  return {
    id: 'djursholm-' + index, footprint, name: null, kind: 'small_cottage',
    centerX: Math.min(...xs) + widthM / 2, centerZ: Math.min(...zs) + depthM / 2,
    widthM, depthM, heightM: height, areaM2: widthM * depthM,
  };
});

const map: OsmWorldState = {
  enabled: true, isLiveOsm: true, placeName: 'Djursholm', roadName: 'Lokevägen',
  biome: 'village', nearbyLandmark: null, nearbyChargerName: null, isNearRealTunnel: false,
  landmarkPulse: 0, buildingCount: buildings.length, waterCount: 0, forestCount: 0, demoTravelM: 0,
  snapshot: {
    version: -1, biome: 'village', originLat: district.origin[0], originLon: district.origin[1],
    roads: district.roads.map(road => ({
      name: road.name, points: points(road.points), widthM: road.width, isMajor: road.width >= 7,
    })),
    buildings, waters: [], forests: [], pois: [],
  },
};

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
