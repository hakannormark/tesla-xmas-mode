import * as THREE from 'three';
import type { OsmMapSnapshot, OsmPoint2D, OsmRoadRibbon } from '../core/osmWorld';
import type { ChristmasMapData } from './ChristmasMap';
import { getSoftGlowTexture } from './pixarMaterials';
import {
  createAccurateCybertruck,
  createAccurateStarmanRoadster,
  createAccurateTeslaSemi,
  type AccurateCybertruckHandle,
  type AccurateSemiHandle,
} from './teslaModels';
import { createPixarForestAnimal, type PixarAnimalHandle, type WildlifeKind } from './pixarWildlife';

interface RoadSeg {
  ax: number;
  az: number;
  bx: number;
  bz: number;
  dx: number;
  dz: number;
  len: number;
  tx: number;
  tz: number;
  nx: number;
  nz: number;
  startDist: number;
}

interface DrivableRoad {
  road: OsmRoadRibbon;
  segs: RoadSeg[];
  totalLen: number;
}

type FleetRole =
  | 'semi_coca'
  | 'cyber_tree'
  | 'semi_tesla'
  | 'cyber_plow'
  | 'roadster'
  | 'gift_sleigh';

interface TurnArc {
  t: number;
  durationDist: number;
  p0x: number;
  p0z: number;
  p1x: number;
  p1z: number;
  p2x: number;
  p2z: number;
  p3x: number;
  p3z: number;
  nextRoadIdx: number;
  nextDist: number;
  nextDir: 1 | -1;
}

interface MovingVehicle {
  group: THREE.Group;
  groundGlow: THREE.Mesh;
  role: FleetRole;
  isSemi: boolean;
  semiHandle?: AccurateSemiHandle;
  cyberHandle?: AccurateCybertruckHandle;
  roadIdx: number;
  dist: number;
  dir: 1 | -1;
  baseSpeed: number;
  currentSpeed: number;
  wheelPhase: number;
  phase: number;
  worldX: number;
  worldZ: number;
  hasPose: boolean;
  smoothYaw: number;
  smoothPitch: number;
  smoothRoll: number;
  blockedSec: number;
  turnArc?: TurnArc;
}

interface SidewalkWalker {
  id: string;
  kind: 'rudolf' | 'reindeer' | 'elf';
  group: THREE.Group;
  animalHandle: PixarAnimalHandle;
  roadIdx: number;
  dist: number;
  dir: 1 | -1;
  side: 1 | -1;
  speed: number;
  phase: number;
  smoothYaw: number;
}

const MOVING_ROSTER: FleetRole[] = [
  'semi_coca',
  'cyber_tree',
  'semi_tesla',
  'roadster',
];

const WALKER_ROSTER: Array<'rudolf' | 'reindeer' | 'elf'> = [
  'rudolf',
  'elf',
  'reindeer',
  'elf',
  'reindeer',
  'elf',
  'rudolf',
  'elf',
  'reindeer',
  'elf',
];

function smoothRoadPolyline(points: OsmPoint2D[]): OsmPoint2D[] {
  if (points.length < 3) return points;
  const out: OsmPoint2D[] = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1];
    const p = points[i];
    const b = points[i + 1];
    const d1 = Math.hypot(p.x - a.x, p.z - a.z);
    const d2 = Math.hypot(b.x - p.x, b.z - p.z);
    if (d1 < 2 || d2 < 2) {
      out.push(p);
      continue;
    }
    const u1x = (p.x - a.x) / d1;
    const u1z = (p.z - a.z) / d1;
    const u2x = (b.x - p.x) / d2;
    const u2z = (b.z - p.z) / d2;
    const dot = u1x * u2x + u1z * u2z;
    if (dot > 0.992) {
      out.push(p);
      continue;
    }
    const fillet = Math.min(d1 * 0.36, d2 * 0.36, 7.5);
    const sx = p.x - u1x * fillet;
    const sz = p.z - u1z * fillet;
    const ex = p.x + u2x * fillet;
    const ez = p.z + u2z * fillet;
    for (let k = 0; k <= 4; k++) {
      const t = k / 4;
      const mt = 1 - t;
      out.push({
        x: mt * mt * sx + 2 * mt * t * p.x + t * t * ex,
        z: mt * mt * sz + 2 * mt * t * p.z + t * t * ez,
      });
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

function evalCubicBezier(arc: TurnArc, t: number): { x: number; z: number; tx: number; tz: number } {
  const mt = 1 - t;
  const x =
    mt * mt * mt * arc.p0x +
    3 * mt * mt * t * arc.p1x +
    3 * mt * t * t * arc.p2x +
    t * t * t * arc.p3x;
  const z =
    mt * mt * mt * arc.p0z +
    3 * mt * mt * t * arc.p1z +
    3 * mt * t * t * arc.p2z +
    t * t * t * arc.p3z;
  const dx =
    3 * mt * mt * (arc.p1x - arc.p0x) +
    6 * mt * t * (arc.p2x - arc.p1x) +
    3 * t * t * (arc.p3x - arc.p2x);
  const dz =
    3 * mt * mt * (arc.p1z - arc.p0z) +
    6 * mt * t * (arc.p2z - arc.p1z) +
    3 * t * t * (arc.p3z - arc.p2z);
  const len = Math.hypot(dx, dz) || 1;
  return { x, z, tx: dx / len, tz: dz / len };
}

function dampAngle(current: number, target: number, lambda: number, dt: number): number {
  const delta = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + delta * (1 - Math.exp(-lambda * dt));
}

function sampleRoad(
  drivable: DrivableRoad,
  dist: number,
): { x: number; z: number; tx: number; tz: number; nx: number; nz: number } {
  const d = THREE.MathUtils.clamp(dist, 0, drivable.totalLen);
  for (let i = 0; i < drivable.segs.length; i++) {
    const seg = drivable.segs[i];
    if (d <= seg.startDist + seg.len || i === drivable.segs.length - 1) {
      const local = THREE.MathUtils.clamp(d - seg.startDist, 0, seg.len);
      const frac = local / Math.max(seg.len, 0.001);
      return {
        x: seg.ax + seg.dx * frac,
        z: seg.az + seg.dz * frac,
        tx: seg.tx,
        tz: seg.tz,
        nx: seg.nx,
        nz: seg.nz,
      };
    }
  }
  const last = drivable.segs[drivable.segs.length - 1];
  return { x: last.bx, z: last.bz, tx: last.tx, tz: last.tz, nx: last.nx, nz: last.nz };
}

function closestDistanceAlongRoad(drivable: DrivableRoad, p: THREE.Vector3): { along: number; dist: number } {
  let bestDist = Infinity;
  let bestAlong = drivable.totalLen * 0.5;
  for (const seg of drivable.segs) {
    const t = THREE.MathUtils.clamp(
      ((p.x - seg.ax) * seg.dx + (p.z - seg.az) * seg.dz) / Math.max(seg.len * seg.len, 0.001),
      0,
      1,
    );
    const cx = seg.ax + seg.dx * t;
    const cz = seg.az + seg.dz * t;
    const d = Math.hypot(p.x - cx, p.z - cz);
    if (d < bestDist) {
      bestDist = d;
      bestAlong = seg.startDist + t * seg.len;
    }
  }
  return { along: bestAlong, dist: bestDist };
}

function disposeObjectTree(root: THREE.Object3D): void {
  const seenGeo = new Set<THREE.BufferGeometry>();
  const seenMat = new Set<THREE.Material>();
  root.traverse(obj => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry && !mesh.geometry.userData?.shared && !seenGeo.has(mesh.geometry)) {
      seenGeo.add(mesh.geometry);
      mesh.geometry.dispose();
    }
    const mat = mesh.material;
    if (Array.isArray(mat)) {
      for (const m of mat) {
        if (!m.userData?.shared && !seenMat.has(m)) {
          seenMat.add(m);
          m.dispose();
        }
      }
    } else if (mat && !mat.userData?.shared && !seenMat.has(mat)) {
      seenMat.add(mat);
      mat.dispose();
    }
  });
}

export class AmbientTraffic {
  readonly group = new THREE.Group();
  private readonly movingLayer = new THREE.Group();
  private readonly parkedLayer = new THREE.Group();
  private readonly pedLayer = new THREE.Group();

  private readonly movingFleet: MovingVehicle[] = [];
  private readonly walkers: SidewalkWalker[] = [];
  private readonly parkedTemplates: THREE.Group[] = [];
  private readonly parkedBounds: Array<{ x: number; z: number; radius: number; height: number }> = [];
  private fleetInitialized = false;
  private walkersInitialized = false;

  private drivableRoads: DrivableRoad[] = [];
  private endpointLinks = new Map<string, Array<{ roadIdx: number; atEnd: boolean }>>();
  private builtKey?: string;
  private enabled = true;

  // Shared lightweight geometries & materials for festive gift sleighs, walkers, beams & AO shadows
  private readonly beamPlaneGeo = new THREE.PlaneGeometry(4.4, 9.0).rotateX(-Math.PI * 0.5);
  private readonly aoPlaneGeo = new THREE.PlaneGeometry(2.7, 5.4).rotateX(-Math.PI * 0.5);
  private readonly semiAoPlaneGeo = new THREE.PlaneGeometry(3.2, 11.4).rotateX(-Math.PI * 0.5);
  private readonly sleighBodyGeo = new THREE.BoxGeometry(1.42, 0.56, 2.75);
  private readonly sleighRunnerGeo = new THREE.BoxGeometry(0.11, 0.10, 3.05);
  private readonly sleighPostGeo = new THREE.BoxGeometry(0.08, 0.28, 0.08);
  private readonly giftBoxGeo = new THREE.BoxGeometry(0.46, 0.42, 0.46);
  private readonly sleighLampGeo = new THREE.SphereGeometry(0.12, 8, 8);

  private readonly sleighRedMat = new THREE.MeshPhysicalMaterial({
    color: '#b6142c',
    roughness: 0.24,
    metalness: 0.28,
    clearcoat: 0.9,
  });
  private readonly sleighGoldMat = new THREE.MeshStandardMaterial({
    color: '#f2c15c',
    roughness: 0.28,
    metalness: 0.78,
  });
  private readonly sleighLampMat = new THREE.MeshBasicMaterial({
    color: '#fff2be',
    toneMapped: false,
  });
  private readonly sleighTailMat = new THREE.MeshBasicMaterial({
    color: '#ff2b46',
    toneMapped: false,
  });
  private readonly giftMats: THREE.MeshStandardMaterial[] = [0x1c7c54, 0x26569e, 0xd8334a, 0xe8b23c].map(
    hex => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.42 }),
  );
  private readonly beamMat = new THREE.MeshBasicMaterial({
    map: getSoftGlowTexture(),
    color: '#fff2cc',
    transparent: true,
    opacity: 0.34,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  private readonly aoShadowMat = new THREE.MeshBasicMaterial({
    map: getSoftGlowTexture(),
    color: '#040916',
    transparent: true,
    opacity: 0.52,
    depthWrite: false,
  });

  constructor() {
    this.group.add(this.movingLayer, this.parkedLayer, this.pedLayer);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.group.visible = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  private createHolidayGiftSleigh(withHeadGlow = false): THREE.Group {
    const sleigh = new THREE.Group();
    const body = new THREE.Mesh(this.sleighBodyGeo, this.sleighRedMat);
    body.position.set(0, 0.48, 0);
    body.castShadow = true;
    sleigh.add(body);

    for (const sx of [-0.62, 0.62]) {
      const runner = new THREE.Mesh(this.sleighRunnerGeo, this.sleighGoldMat);
      runner.position.set(sx, 0.08, 0);
      sleigh.add(runner);
      for (const pz of [-0.85, 0.85]) {
        const post = new THREE.Mesh(this.sleighPostGeo, this.sleighGoldMat);
        post.position.set(sx, 0.24, pz);
        sleigh.add(post);
      }
    }

    const giftOffsets: Array<[number, number, number, number]> = [
      [-0.32, 0.94, -0.45, 0.14],
      [0.30, 0.96, -0.35, -0.18],
      [0.0, 0.98, 0.25, 0.08],
      [-0.24, 1.32, -0.25, 0.28],
    ];
    giftOffsets.forEach(([gx, gy, gz, rotY], idx) => {
      const box = new THREE.Mesh(this.giftBoxGeo, this.giftMats[idx % this.giftMats.length]);
      box.position.set(gx, gy, gz);
      box.rotation.y = rotY;
      box.castShadow = true;
      sleigh.add(box);
    });

    if (withHeadGlow) {
      const starLamp = new THREE.Mesh(this.sleighLampGeo, this.sleighLampMat);
      starLamp.position.set(0, 0.72, 1.42);
      const rearLamp = new THREE.Mesh(this.sleighLampGeo, this.sleighTailMat);
      rearLamp.scale.set(1.6, 0.7, 0.6);
      rearLamp.position.set(0, 0.56, -1.42);
      sleigh.add(starLamp, rearLamp);
    }

    return sleigh;
  }

  private ensureFleetInitialized(): void {
    if (this.fleetInitialized) return;
    this.fleetInitialized = true;

    for (let k = 0; k < MOVING_ROSTER.length; k++) {
      const role = MOVING_ROSTER[k];
      const root = new THREE.Group();
      const isSemi = role === 'semi_coca' || role === 'semi_tesla';

      const ao = new THREE.Mesh(isSemi ? this.semiAoPlaneGeo : this.aoPlaneGeo, this.aoShadowMat);
      ao.position.y = 0.035;
      root.add(ao);

      let semiHandle: AccurateSemiHandle | undefined;
      let cyberHandle: AccurateCybertruckHandle | undefined;

      if (role === 'semi_coca' || role === 'semi_tesla') {
        semiHandle = createAccurateTeslaSemi(role === 'semi_coca' ? 'coca_cola' : 'tesla');
        semiHandle.group.scale.setScalar(0.72);
        semiHandle.group.rotation.y = Math.PI; // -Z forward -> +Z forward
        root.add(semiHandle.group);
      } else if (role === 'cyber_tree' || role === 'cyber_plow') {
        cyberHandle = createAccurateCybertruck(role === 'cyber_tree', role === 'cyber_plow');
        cyberHandle.group.scale.setScalar(0.94);
        cyberHandle.group.rotation.y = Math.PI; // -Z forward -> +Z forward
        root.add(cyberHandle.group);
      } else if (role === 'roadster') {
        const roadster = createAccurateStarmanRoadster();
        roadster.scale.setScalar(0.92);
        roadster.rotation.y = -Math.PI * 0.5; // +X forward -> +Z forward
        root.add(roadster);
      } else {
        const sleigh = this.createHolidayGiftSleigh(true);
        sleigh.position.y = 0.18;
        root.add(sleigh);
      }

      const groundGlow = new THREE.Mesh(this.beamPlaneGeo, this.beamMat);
      groundGlow.position.set(0, 0.08, isSemi ? 8.2 : 5.6);
      root.add(groundGlow);

      this.movingLayer.add(root);
      this.movingFleet.push({
        group: root,
        groundGlow,
        role,
        isSemi,
        semiHandle,
        cyberHandle,
        roadIdx: 0,
        dist: 0,
        dir: k % 2 === 0 ? 1 : -1,
        baseSpeed: isSemi ? 8.2 : 10.2,
        currentSpeed: isSemi ? 8.2 : 10.2,
        wheelPhase: k * 4.5,
        phase: k * 1.4,
        worldX: 0,
        worldZ: 0,
        hasPose: false,
        smoothYaw: 0,
        smoothPitch: 0,
        smoothRoll: 0,
        blockedSec: 0,
      });
    }

    // Build 3 lightweight parked templates (Cybertruck w/ tree, Starman Roadster, Gift Sleigh)
    const ctWrap = new THREE.Group();
    const ctAo = new THREE.Mesh(this.aoPlaneGeo, this.aoShadowMat);
    ctAo.position.y = 0.03;
    const ctParked = createAccurateCybertruck(true, false);
    ctParked.group.scale.setScalar(0.92);
    ctParked.group.rotation.y = Math.PI;
    ctWrap.add(ctAo, ctParked.group);

    const rdWrap = new THREE.Group();
    const rdAo = new THREE.Mesh(this.aoPlaneGeo, this.aoShadowMat);
    rdAo.position.y = 0.03;
    const rdParked = createAccurateStarmanRoadster();
    rdParked.scale.setScalar(0.90);
    rdParked.rotation.y = -Math.PI * 0.5;
    rdWrap.add(rdAo, rdParked);

    const slWrap = new THREE.Group();
    const slAo = new THREE.Mesh(this.aoPlaneGeo, this.aoShadowMat);
    slAo.position.y = 0.03;
    slWrap.add(slAo, this.createHolidayGiftSleigh(false));

    this.parkedTemplates.push(ctWrap, rdWrap, slWrap);
  }

  private ensureWalkersInitialized(): void {
    if (this.walkersInitialized) return;
    this.walkersInitialized = true;

    for (let p = 0; p < WALKER_ROSTER.length; p++) {
      const kind = WALKER_ROSTER[p];
      const group = new THREE.Group();
      const animalHandle = createPixarForestAnimal(kind as WildlifeKind, p + 31);
      animalHandle.group.scale.setScalar(kind === 'elf' ? 1.16 : 1.12);
      group.add(animalHandle.group);

      this.pedLayer.add(group);
      this.walkers.push({
        id: `street-${kind}-${p}`,
        kind,
        group,
        animalHandle,
        roadIdx: 0,
        dist: 0,
        dir: p % 2 === 0 ? 1 : -1,
        side: p % 2 === 0 ? 1 : -1,
        speed: kind === 'elf' ? 1.25 + (p % 3) * 0.14 : 1.55 + (p % 3) * 0.18,
        phase: p * 1.65,
        smoothYaw: 0,
      });
    }
  }

  getTappableCritters(center: THREE.Vector3): Array<{
    id: string;
    kind: 'rudolf' | 'reindeer' | 'elf';
    x: number;
    y: number;
    z: number;
    onTap: () => void;
  }> {
    const out: Array<{
      id: string;
      kind: 'rudolf' | 'reindeer' | 'elf';
      x: number;
      y: number;
      z: number;
      onTap: () => void;
    }> = [];
    for (const w of this.walkers) {
      if (!w.group.visible) continue;
      const p = w.group.position;
      if (Math.hypot(p.x - center.x, p.z - center.z) > 95) continue;
      out.push({
        id: w.id,
        kind: w.kind,
        x: p.x,
        y: p.y + 1.0,
        z: p.z,
        onTap: () => w.animalHandle.triggerJoyJump?.(),
      });
    }
    return out;
  }

  getVehicleBounds(): Array<{ x: number; z: number; radius: number; height: number }> {
    const out: Array<{ x: number; z: number; radius: number; height: number }> = [];
    if (!this.enabled) return out;
    for (const car of this.movingFleet) {
      if (!car.group.visible || !car.hasPose) continue;
      out.push({
        x: car.worldX,
        z: car.worldZ,
        radius: car.isSemi ? 6.6 : 3.2,
        height: car.isSemi ? 3.25 : 2.15,
      });
    }
    for (const pb of this.parkedBounds) {
      out.push(pb);
    }
    return out;
  }

  private placeOncomingAhead(
    car: MovingVehicle,
    k: number,
    playerPos: THREE.Vector3,
    playerHeading: number,
    targetAheadMin: number,
    targetAheadMax: number,
    convoyPositions: ReadonlyArray<{ x: number; z: number }> = [],
  ): void {
    const fwdX = Math.sin(playerHeading);
    const fwdZ = -Math.cos(playerHeading);
    const desiredAhead = THREE.MathUtils.lerp(targetAheadMin, targetAheadMax, (k * 0.37) % 1);

    let bestScore = Infinity;
    let bestRoadIdx = car.roadIdx;
    let bestDist = 0;
    let bestDir: 1 | -1 = -1;

    for (let rIdx = 0; rIdx < this.drivableRoads.length; rIdx++) {
      const dr = this.drivableRoads[rIdx];
      const step = Math.max(18, Math.min(34, dr.totalLen * 0.25));
      for (let d = 10; d <= dr.totalLen - 10; d += step) {
        const s = sampleRoad(dr, d);
        const dx = s.x - playerPos.x;
        const dz = s.z - playerPos.z;
        const ahead = dx * fwdX + dz * fwdZ;
        if (ahead < 72 || ahead > 240) continue;
        const lateral = Math.abs(dx * -fwdZ + dz * fwdX);
        const dotFwd = s.tx * fwdX + s.tz * fwdZ;
        const alignmentPenalty = Math.abs(dotFwd) < 0.25 ? 85 : 0;
        const nearMoving = this.movingFleet.some(
          other =>
            other !== car &&
            ((other.roadIdx === rIdx && Math.abs(other.dist - d) < 42) ||
              (other.hasPose && Math.hypot(other.worldX - s.x, other.worldZ - s.z) < 28)),
        );
        const nearConvoy = convoyPositions.some(c => Math.hypot(c.x - s.x, c.z - s.z) < 32);
        const nearParked = this.parkedBounds.some(p => Math.hypot(p.x - s.x, p.z - s.z) < 9);
        const crowdPenalty = nearMoving || nearConvoy ? 400 : nearParked ? 90 : 0;
        const score = Math.abs(ahead - desiredAhead) + lateral * 0.55 + alignmentPenalty + crowdPenalty;
        if (score < bestScore) {
          bestScore = score;
          bestRoadIdx = rIdx;
          bestDist = d;
          bestDir = dotFwd > 0.08 ? -1 : dotFwd < -0.08 ? 1 : dx * s.tx + dz * s.tz >= 0 ? -1 : 1;
        }
      }
    }

    if (bestScore === Infinity) {
      const fallbackIdx = k % this.drivableRoads.length;
      const dr = this.drivableRoads[fallbackIdx];
      bestRoadIdx = fallbackIdx;
      const sMid = sampleRoad(dr, dr.totalLen * 0.5);
      const dotMid = sMid.tx * fwdX + sMid.tz * fwdZ;
      bestDir = dotMid > 0 ? -1 : 1;
      bestDist = bestDir < 0 ? Math.max(8, dr.totalLen - 12) : Math.min(dr.totalLen - 8, 12);
    }

    car.roadIdx = bestRoadIdx;
    car.dist = bestDist;
    car.dir = bestDir;
    car.turnArc = undefined;
    car.hasPose = false;
    car.blockedSec = 0;
    const dr = this.drivableRoads[bestRoadIdx];
    const speedKmh = dr?.road.maxspeed && dr.road.maxspeed > 40 ? 38 : 28;
    car.baseSpeed = (car.isSemi ? 0.85 : 1.0) * (speedKmh / 3.6);
    car.currentSpeed = car.baseSpeed;
  }

  private rebuild(
    snapshot: OsmMapSnapshot,
    mapData: ChristmasMapData,
    playerPos: THREE.Vector3,
    playerHeading: number,
    groundAt?: (x: number, z: number) => number,
  ): void {
    this.ensureFleetInitialized();
    this.ensureWalkersInitialized();

    this.parkedLayer.clear();
    this.parkedBounds.length = 0;
    this.drivableRoads = [];
    this.endpointLinks.clear();

    const ptKey = (p: OsmPoint2D) => `${p.x.toFixed(1)},${p.z.toFixed(1)}`;
    const pointDegree = new Map<string, number>();

    for (const road of snapshot.roads) {
      if (road.points.length < 2) continue;
      for (const p of road.points) {
        const k = ptKey(p);
        pointDegree.set(k, (pointDegree.get(k) ?? 0) + 1);
      }
      const smoothed = smoothRoadPolyline(road.points);
      const segs: RoadSeg[] = [];
      let totalLen = 0;
      for (let i = 1; i < smoothed.length; i++) {
        const a = smoothed[i - 1];
        const b = smoothed[i];
        const dx = b.x - a.x;
        const dz = b.z - a.z;
        const len = Math.hypot(dx, dz);
        if (len < 0.6) continue;
        const tx = dx / len;
        const tz = dz / len;
        segs.push({
          ax: a.x,
          az: a.z,
          bx: b.x,
          bz: b.z,
          dx,
          dz,
          len,
          tx,
          tz,
          nx: -tz,
          nz: tx,
          startDist: totalLen,
        });
        totalLen += len;
      }
      if (totalLen >= 28 && segs.length > 0) {
        const idx = this.drivableRoads.length;
        this.drivableRoads.push({ road, segs, totalLen });
        const startK = ptKey(road.points[0]);
        const endK = ptKey(road.points[road.points.length - 1]);
        this.endpointLinks.set(startK, [...(this.endpointLinks.get(startK) ?? []), { roadIdx: idx, atEnd: false }]);
        this.endpointLinks.set(endK, [...(this.endpointLinks.get(endK) ?? []), { roadIdx: idx, atEnd: true }]);
      }
    }

    if (!this.drivableRoads.length) {
      this.movingLayer.visible = false;
      this.pedLayer.visible = false;
      return;
    }
    this.movingLayer.visible = true;
    this.pedLayer.visible = true;

    const junctionPts: OsmPoint2D[] = [];
    for (const [k, deg] of pointDegree) {
      if (deg >= 2) {
        const [x, z] = k.split(',').map(Number);
        junctionPts.push({ x, z });
      }
    }

    const rankedRoads = this.drivableRoads
      .map((dr, i) => ({
        i,
        ...closestDistanceAlongRoad(dr, playerPos),
        totalLen: dr.totalLen,
      }))
      .sort((a, b) => a.dist - b.dist || b.totalLen - a.totalLen);

    // 1. Place the 4 spaced Hero Moving Vehicles strictly oncoming ahead of the player
    this.movingFleet.forEach((car, k) => {
      const minAhead = 84 + k * 34;
      const maxAhead = 112 + k * 36;
      this.placeOncomingAhead(car, k, playerPos, playerHeading, minAhead, maxAhead);
    });

    // 2. Place up to 5 well-spaced Parked Tesla/Holiday Vehicles
    const parkedPts: OsmPoint2D[] = [];
    for (let r = 0; r < rankedRoads.length && parkedPts.length < 5; r++) {
      const dr = this.drivableRoads[rankedRoads[r].i];
      if (dr.road.highway === 'motorway' || dr.road.highway === 'trunk' || dr.totalLen < 38) continue;
      for (let d = 22; d < dr.totalLen - 16 && parkedPts.length < 5; d += 48) {
        const side = (parkedPts.length % 2 === 0 ? 1 : -1) as 1 | -1;
        const s = sampleRoad(dr, d);
        const curbOffset = Math.max(1.5, dr.road.widthM * 0.5 - 0.85);
        const px = s.x + s.nx * side * curbOffset;
        const pz = s.z + s.nz * side * curbOffset;
        if (Math.hypot(px - playerPos.x, pz - playerPos.z) < 20) continue;
        if (junctionPts.some(j => Math.hypot(j.x - px, j.z - pz) < 16)) continue;
        if (parkedPts.some(p => Math.hypot(p.x - px, p.z - pz) < 30)) continue;
        parkedPts.push({ x: px, z: pz });

        const template = this.parkedTemplates[(parkedPts.length - 1) % this.parkedTemplates.length];
        const parked = template.clone();
        const y = groundAt?.(px, pz) ?? 0;
        parked.position.set(px, y, pz);
        parked.rotation.y = Math.atan2(s.tx * side, s.tz * side);
        this.parkedLayer.add(parked);
        this.parkedBounds.push({ x: px, z: pz, radius: 2.8, height: 2.1 });
      }
    }

    // 3. Place the 10 Street Reindeer (incl. Rudolf) & Elves strolling sidewalks
    this.walkers.forEach((walker, p) => {
      const rank = rankedRoads[p % rankedRoads.length];
      const dr = this.drivableRoads[rank.i];
      walker.roadIdx = rank.i;
      let placed = false;

      const candidateFracs =
        p < 2
          ? [THREE.MathUtils.clamp((rank.along + 24 + p * 18) / Math.max(dr.totalLen, 1), 0.14, 0.86), 0.35, 0.65]
          : [0.14 + ((p * 0.23) % 0.72), 0.28, 0.72, 0.5];

      for (const f of candidateFracs) {
        const testDist = THREE.MathUtils.clamp(dr.totalLen * f, 4, Math.max(5, dr.totalLen - 4));
        const sample = sampleRoad(dr, testDist);
        const vergeOffset = dr.road.widthM * 0.5 + 1.5;
        const pt = {
          x: sample.x + sample.nx * walker.side * vergeOffset,
          z: sample.z + sample.nz * walker.side * vergeOffset,
        };
        if (!mapData.clearance || mapData.clearance.clear(pt, 0.45)) {
          walker.dist = testDist;
          walker.smoothYaw = Math.atan2(sample.tx * walker.dir, sample.tz * walker.dir);
          placed = true;
          break;
        }
      }
      walker.group.visible = placed;
    });
  }

  update(
    dt: number,
    time: number,
    snapshot: OsmMapSnapshot,
    mapData: ChristmasMapData,
    playerPos: THREE.Vector3,
    playerHeading: number,
    groundAt?: (x: number, z: number) => number,
    elevationVersion = 0,
    convoyPositions: ReadonlyArray<{ x: number; y: number; z: number; heading: number }> = [],
    sleighAlert = 0,
  ): void {
    const nextKey = `${snapshot.version}:${groundAt ? elevationVersion : 'flat'}`;
    if (this.builtKey !== nextKey) {
      this.builtKey = nextKey;
      this.rebuild(snapshot, mapData, playerPos, playerHeading, groundAt);
    }
    if (!this.enabled || !this.drivableRoads.length) return;

    const fwdPlayerX = Math.sin(playerHeading);
    const fwdPlayerZ = -Math.cos(playerHeading);
    const ptKey = (p: OsmPoint2D) => `${p.x.toFixed(1)},${p.z.toFixed(1)}`;

    for (let k = 0; k < this.movingFleet.length; k++) {
      const car = this.movingFleet[k];
      let dr = this.drivableRoads[car.roadIdx];
      if (!dr) continue;

      let poseX = car.worldX;
      let poseZ = car.worldZ;
      let poseTx = 0;
      let poseTz = -1;

      if (!car.hasPose) {
        const initSample = sampleRoad(dr, car.dist);
        const initOff = Math.max(2.05, Math.min(2.65, dr.road.widthM * 0.34));
        poseX = initSample.x + initSample.nx * car.dir * initOff;
        poseZ = initSample.z + initSample.nz * car.dir * initOff;
        poseTx = initSample.tx * car.dir;
        poseTz = initSample.tz * car.dir;
        car.worldX = poseX;
        car.worldZ = poseZ;
        car.smoothYaw = Math.atan2(poseTx, poseTz);
        car.hasPose = true;
      } else if (car.turnArc) {
        const ev = evalCubicBezier(car.turnArc, car.turnArc.t);
        poseX = ev.x;
        poseZ = ev.z;
        poseTx = ev.tx;
        poseTz = ev.tz;
      } else {
        const curSample = sampleRoad(dr, car.dist);
        const laneOffset = Math.max(2.05, Math.min(2.65, dr.road.widthM * 0.34));
        poseX = curSample.x + curSample.nx * car.dir * laneOffset;
        poseZ = curSample.z + curSample.nz * car.dir * laneOffset;
        poseTx = curSample.tx * car.dir;
        poseTz = curSample.tz * car.dir;
      }

      const dPlayer = Math.hypot(poseX - playerPos.x, poseZ - playerPos.z);
      const aheadPlayer = (poseX - playerPos.x) * fwdPlayerX + (poseZ - playerPos.z) * fwdPlayerZ;

      if (aheadPlayer < -48 || dPlayer > 250) {
        this.placeOncomingAhead(car, k, playerPos, playerHeading, 132, 220, convoyPositions);
        dr = this.drivableRoads[car.roadIdx];
        const s = sampleRoad(dr, car.dist);
        const off = Math.max(2.05, Math.min(2.65, dr.road.widthM * 0.34));
        poseX = s.x + s.nx * car.dir * off;
        poseZ = s.z + s.nz * car.dir * off;
        poseTx = s.tx * car.dir;
        poseTz = s.tz * car.dir;
        car.worldX = poseX;
        car.worldZ = poseZ;
        car.smoothYaw = Math.atan2(poseTx, poseTz);
        car.hasPose = true;
      }

      // Pairwise collision avoidance across all ambient vehicles AND convoy trucks
      let shouldYield = false;
      let forceRelocate = false;
      for (let m = 0; m < this.movingFleet.length; m++) {
        if (m === k) continue;
        const other = this.movingFleet[m];
        if (!other.hasPose) continue;
        const dx = other.worldX - poseX;
        const dz = other.worldZ - poseZ;
        const sep = Math.hypot(dx, dz);
        const minSep = car.isSemi || other.isSemi ? 24 : 15;
        if (sep < 9.5 && m < k) {
          forceRelocate = true;
          break;
        }
        if (sep < minSep) {
          const fwdDot = sep > 0.01 ? (dx * poseTx + dz * poseTz) / sep : 1;
          if (fwdDot > 0.22 || (sep < 12.5 && m < k)) {
            shouldYield = true;
          }
        }
      }
      if (!forceRelocate) {
        for (const cv of convoyPositions) {
          const sep = Math.hypot(cv.x - poseX, cv.z - poseZ);
          if (sep < 18) {
            forceRelocate = true;
            break;
          }
          if (sep < 28) shouldYield = true;
        }
      }

      if (forceRelocate) {
        this.placeOncomingAhead(car, k, playerPos, playerHeading, 136, 225, convoyPositions);
        car.group.visible = false;
        continue;
      }

      car.blockedSec = shouldYield ? car.blockedSec + dt : Math.max(0, car.blockedSec - dt * 2);
      if (car.blockedSec > 2.2) {
        this.placeOncomingAhead(car, k, playerPos, playerHeading, 136, 225, convoyPositions);
        car.group.visible = false;
        continue;
      }

      const targetSpeed = shouldYield ? 0 : car.baseSpeed;
      car.currentSpeed = THREE.MathUtils.damp(car.currentSpeed, targetSpeed, shouldYield ? 7.5 : 3.2, dt);
      car.wheelPhase += car.currentSpeed * 3.6 * dt;

      if (car.semiHandle) {
        car.semiHandle.update(dt, car.wheelPhase, shouldYield, 0.22, time);
      }
      if (car.cyberHandle) {
        car.cyberHandle.update(car.wheelPhase, time);
      }

      car.groundGlow.visible = true;
      car.group.visible = true;

      if (car.turnArc) {
        car.turnArc.t += (car.currentSpeed * dt) / Math.max(4, car.turnArc.durationDist);
        if (car.turnArc.t >= 1) {
          car.roadIdx = car.turnArc.nextRoadIdx;
          car.dist = car.turnArc.nextDist;
          car.dir = car.turnArc.nextDir;
          car.turnArc = undefined;
          dr = this.drivableRoads[car.roadIdx];
        } else {
          const ev = evalCubicBezier(car.turnArc, car.turnArc.t);
          poseX = ev.x;
          poseZ = ev.z;
          poseTx = ev.tx;
          poseTz = ev.tz;
        }
      }

      if (!car.turnArc) {
        car.dist += car.dir * car.currentSpeed * dt;
        const exitPad = Math.min(dr.totalLen * 0.12, 3.5);
        if (car.dist > dr.totalLen - exitPad || car.dist < exitPad) {
          const atEnd = car.dist > dr.totalLen * 0.5;
          const endPt = dr.road.points[atEnd ? dr.road.points.length - 1 : 0];
          const links = (this.endpointLinks.get(ptKey(endPt)) ?? []).filter(l => {
            if (l.roadIdx === car.roadIdx) return false;
            const nextDr = this.drivableRoads[l.roadIdx];
            if (!nextDr) return false;
            const dirSign = l.atEnd ? -1 : 1;
            const entry = sampleRoad(nextDr, l.atEnd ? nextDr.totalLen : 0);
            const dotTurn = entry.tx * dirSign * poseTx + entry.tz * dirSign * poseTz;
            const dotFwd = entry.tx * dirSign * fwdPlayerX + entry.tz * dirSign * fwdPlayerZ;
            return dotTurn > -0.35 && dotFwd <= 0.25;
          });
          if (links.length && aheadPlayer > -10) {
            const pick = links[Math.floor(time * 7 + car.roadIdx + k) % links.length];
            const nextDr = this.drivableRoads[pick.roadIdx];
            const nextDir: 1 | -1 = pick.atEnd ? -1 : 1;
            const inset = Math.min(nextDr.totalLen * 0.22, 5.5);
            const nextDist = pick.atEnd ? nextDr.totalLen - inset : inset;
            const nextSample = sampleRoad(nextDr, nextDist);
            const nextOff = Math.max(2.05, Math.min(2.65, nextDr.road.widthM * 0.34));
            const p0x = poseX;
            const p0z = poseZ;
            const p3x = nextSample.x + nextSample.nx * nextDir * nextOff;
            const p3z = nextSample.z + nextSample.nz * nextDir * nextOff;
            const chord = Math.hypot(p3x - p0x, p3z - p0z);
            const h = THREE.MathUtils.clamp(chord * 0.44, 1.8, 8.5);
            const entryTx = nextSample.tx * nextDir;
            const entryTz = nextSample.tz * nextDir;
            car.turnArc = {
              t: 0,
              durationDist: Math.max(5.5, chord * 1.15),
              p0x,
              p0z,
              p1x: p0x + poseTx * h,
              p1z: p0z + poseTz * h,
              p2x: p3x - entryTx * h,
              p2z: p3z - entryTz * h,
              p3x,
              p3z,
              nextRoadIdx: pick.roadIdx,
              nextDist,
              nextDir,
            };
          } else if (car.dist > dr.totalLen || car.dist < 0) {
            this.placeOncomingAhead(car, k, playerPos, playerHeading, 132, 220, convoyPositions);
            car.group.visible = false;
            continue;
          }
        }
        if (!car.turnArc) {
          const nextSample = sampleRoad(dr, car.dist);
          const nextLaneOffset = Math.max(2.05, Math.min(2.65, dr.road.widthM * 0.34));
          poseX = nextSample.x + nextSample.nx * car.dir * nextLaneOffset;
          poseZ = nextSample.z + nextSample.nz * car.dir * nextLaneOffset;
          poseTx = nextSample.tx * car.dir;
          poseTz = nextSample.tz * car.dir;
        }
      }

      car.worldX = poseX;
      car.worldZ = poseZ;
      const wy = groundAt?.(poseX, poseZ) ?? 0;
      const hover = car.role === 'gift_sleigh' ? 0.08 * Math.sin(time * 3.1 + car.phase) : 0;
      const aheadY = groundAt?.(poseX + poseTx * 2.0, poseZ + poseTz * 2.0) ?? wy;
      const behindY = groundAt?.(poseX - poseTx * 2.0, poseZ - poseTz * 2.0) ?? wy;
      const targetPitch = Math.atan2(aheadY - behindY, 4.0);
      const targetYaw = Math.atan2(poseTx, poseTz);
      const prevYaw = car.smoothYaw;
      car.smoothYaw = dampAngle(car.smoothYaw, targetYaw, 6.2, dt);
      const yawDelta = Math.atan2(Math.sin(car.smoothYaw - prevYaw), Math.cos(car.smoothYaw - prevYaw));
      const targetRoll = THREE.MathUtils.clamp(-yawDelta * 2.2, -0.07, 0.07);
      car.smoothPitch = THREE.MathUtils.damp(car.smoothPitch, targetPitch, 5.5, dt);
      car.smoothRoll = THREE.MathUtils.damp(car.smoothRoll, targetRoll, 5.5, dt);

      car.group.position.set(poseX, wy + hover, poseZ);
      car.group.rotation.order = 'YXZ';
      car.group.rotation.y = car.smoothYaw;
      car.group.rotation.x = -car.smoothPitch;
      car.group.rotation.z = car.smoothRoll;
    }

    for (const walker of this.walkers) {
      if (!walker.group.visible) continue;
      const dr = this.drivableRoads[walker.roadIdx];
      if (!dr) continue;
      const cur = sampleRoad(dr, walker.dist);
      const vergeOffset = dr.road.widthM * 0.5 + 1.5;
      const wx = cur.x + cur.nx * walker.side * vergeOffset;
      const wz = cur.z + cur.nz * walker.side * vergeOffset;
      const dPlayer = Math.hypot(wx - playerPos.x, wz - playerPos.z);

      const moveSpeed = dPlayer < 9 ? 0.2 : walker.speed;
      walker.dist += walker.dir * moveSpeed * dt;
      if (walker.dist >= dr.totalLen - 3 || walker.dist <= 3) {
        walker.dir = walker.dir === 1 ? -1 : 1;
        walker.dist = THREE.MathUtils.clamp(walker.dist, 3, dr.totalLen - 3);
      }

      const next = sampleRoad(dr, walker.dist);
      const px = next.x + next.nx * walker.side * vergeOffset;
      const pz = next.z + next.nz * walker.side * vergeOffset;
      const py = groundAt?.(px, pz) ?? 0;

      const targetYaw =
        dPlayer < 10
          ? Math.atan2(playerPos.x - px, playerPos.z - pz)
          : Math.atan2(next.tx * walker.dir, next.tz * walker.dir);
      walker.smoothYaw = dampAngle(walker.smoothYaw, targetYaw, 5.5, dt);

      walker.group.position.set(px, py, pz);
      walker.group.rotation.y = walker.smoothYaw;
      walker.animalHandle.update(dt, time, dPlayer < 14 ? Math.max(0.6, sleighAlert) : sleighAlert);
    }
  }

  dispose(): void {
    this.movingLayer.clear();
    this.parkedLayer.clear();
    this.pedLayer.clear();

    for (const car of this.movingFleet) disposeObjectTree(car.group);
    this.movingFleet.length = 0;

    for (const tpl of this.parkedTemplates) disposeObjectTree(tpl);
    this.parkedTemplates.length = 0;

    for (const w of this.walkers) disposeObjectTree(w.group);
    this.walkers.length = 0;

    this.beamPlaneGeo.dispose();
    this.aoPlaneGeo.dispose();
    this.semiAoPlaneGeo.dispose();
    this.sleighBodyGeo.dispose();
    this.sleighRunnerGeo.dispose();
    this.sleighPostGeo.dispose();
    this.giftBoxGeo.dispose();
    this.sleighLampGeo.dispose();
    this.sleighRedMat.dispose();
    this.sleighGoldMat.dispose();
    this.sleighLampMat.dispose();
    this.sleighTailMat.dispose();
    this.giftMats.forEach(m => m.dispose());
    this.beamMat.dispose();
    this.aoShadowMat.dispose();
  }
}
