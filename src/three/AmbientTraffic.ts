import * as THREE from 'three';
import { geoDeltaMeters, type OsmMapSnapshot, type OsmPoint2D, type OsmRoadRibbon } from '../core/osmWorld';
import type { ChristmasMapData } from './ChristmasMap';
import { getSoftGlowTexture } from './pixarMaterials';
import {
  createAccurateCybertruck,
  createAccurateStarmanRoadster,
  createAccurateTeslaSemi,
  type AccurateCybertruckHandle,
  type AccurateSemiHandle,
  type StarmanRoadsterGroup,
} from './teslaModels';
import { createPixarForestAnimal, type PixarAnimalHandle, type WildlifeKind } from './pixarWildlife';

function ptKey(p: OsmPoint2D): string {
  return `${p.x.toFixed(1)},${p.z.toFixed(1)}`;
}

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

type TrafficFlow = 'oncoming' | 'same_dir';

interface MovingVehicle {
  group: THREE.Group;
  groundGlow: THREE.Mesh;
  tailGlow: THREE.Mesh;
  role: FleetRole;
  flow: TrafficFlow;
  isSemi: boolean;
  halfLength: number;
  halfWidth: number;
  laneSlot: number;
  semiHandle?: AccurateSemiHandle;
  cyberHandle?: AccurateCybertruckHandle;
  roadsterHandle?: StarmanRoadsterGroup;
  roadIdx: number;
  dist: number;
  dir: 1 | -1;
  baseSpeed: number;
  currentSpeed: number;
  wheelPhase: number;
  phase: number;
  worldX: number;
  worldZ: number;
  poseTx: number;
  poseTz: number;
  hasPose: boolean;
  coasting: boolean;
  smoothYaw: number;
  smoothPitch: number;
  smoothRoll: number;
  blockedSec: number;
  avoidLat: number;
  turnArc?: TurnArc;
}

const PLAYER_CORRIDOR_HALF_W = 2.05;

interface PlayerFrame {
  px: number;
  pz: number;
  fwdX: number;
  fwdZ: number;
  rightX: number;
  rightZ: number;
}

function makePlayerFrame(playerPos: THREE.Vector3, playerHeading: number): PlayerFrame {
  const fwdX = Math.sin(playerHeading);
  const fwdZ = -Math.cos(playerHeading);
  return {
    px: playerPos.x,
    pz: playerPos.z,
    fwdX,
    fwdZ,
    rightX: -fwdZ,
    rightZ: fwdX,
  };
}

function vehicleDimensions(role: FleetRole): { halfLength: number; halfWidth: number } {
  if (role === 'semi_coca' || role === 'semi_tesla') {
    return { halfLength: 8.6, halfWidth: 1.45 };
  }
  if (role === 'cyber_tree' || role === 'cyber_plow') {
    return { halfLength: 3.1, halfWidth: 1.15 };
  }
  if (role === 'roadster') {
    return { halfLength: 2.4, halfWidth: 1.05 };
  }
  return { halfLength: 5.5, halfWidth: 1.2 };
}

function legalRoadDir(road: OsmRoadRibbon, preferred: 1 | -1): 1 | -1 {
  if (road.oneway === 1) return 1;
  if (road.oneway === -1) return -1;
  return preferred;
}

function isDirLegalOnRoad(road: OsmRoadRibbon, dir: 1 | -1): boolean {
  if (road.oneway === 1) return dir === 1;
  if (road.oneway === -1) return dir === -1;
  return true;
}

function getEffectiveLanes(road: OsmRoadRibbon): number {
  if (road.lanes && road.lanes >= 1) return road.lanes;
  if (road.oneway === 1 || road.oneway === -1) {
    if (road.highway === 'motorway' || road.highway === 'trunk') {
      return Math.max(2, Math.round(road.widthM / 3.5));
    }
    return road.widthM >= 6.6 ? Math.max(2, Math.round(road.widthM / 3.4)) : 1;
  }
  return road.widthM >= 11.5 ? Math.max(4, Math.round(road.widthM / 3.2)) : 2;
}

/**
 * Signed lateral offset along the road's travel-right normal `(nx * dir, nz * dir)`.
 * - Single-lane oneway: 0 (centered in lane).
 * - Multi-lane oneway: spread cleanly across available lanes (negative = left passing lane, positive = right lane).
 * - Two-way road: right-hand carriageway half (positive offset).
 */
function getTravelRightOffset(
  dr: DrivableRoad,
  car: Pick<MovingVehicle, 'isSemi' | 'laneSlot'>,
): number {
  const road = dr.road;
  const isOneway = road.oneway === 1 || road.oneway === -1;
  if (isOneway) {
    const lanes = getEffectiveLanes(road);
    if (lanes <= 1) return 0;
    const usableWidth = Math.min(Math.max(3.2, road.widthM - 1.4), lanes * 3.4);
    const laneIdx = car.isSemi
      ? lanes >= 3
        ? lanes - 1 - (car.laneSlot % 2)
        : lanes - 1
      : car.laneSlot % lanes;
    return ((laneIdx + 0.5) / lanes - 0.5) * usableWidth;
  }

  const lanes = getEffectiveLanes(road);
  const lanesPerDir = Math.max(1, Math.floor(lanes / 2));
  const halfRoad = road.widthM * 0.5;
  if (lanesPerDir >= 2 && road.widthM >= 10.5) {
    const innerEdge = 0.45;
    const outerEdge = Math.max(innerEdge + 2.4, halfRoad - 1.05);
    const laneIdx = car.isSemi ? lanesPerDir - 1 : car.laneSlot % lanesPerDir;
    return innerEdge + ((laneIdx + 0.5) / lanesPerDir) * (outerEdge - innerEdge);
  }
  const maxOnRoad = Math.max(1.35, halfRoad - (car.isSemi ? 1.15 : 0.95));
  const idealLane = Math.max(1.45, Math.min(2.35, road.widthM * 0.27));
  return Math.min(idealLane, maxOnRoad);
}

/**
 * Multi-point full-footprint check (front bumper, center, rear trailer, plus intermediate points
 * for long vehicles like the 17m Tesla Semi) against the player's longitudinal/lateral corridor.
 */
function footprintHitsPlayerCorridor(
  x: number,
  z: number,
  tx: number,
  tz: number,
  halfLength: number,
  halfWidth: number,
  pf: PlayerFrame,
  alongMin: number,
  alongMax: number,
  extraLatPad = 0,
): boolean {
  const latLimit = PLAYER_CORRIDOR_HALF_W + halfWidth + extraLatPad;
  const steps = halfLength >= 5 ? 6 : 2;
  for (let i = 0; i <= steps; i++) {
    const frac = -1 + (2 * i) / steps;
    const wx = x + tx * halfLength * frac;
    const wz = z + tz * halfLength * frac;
    const rx = wx - pf.px;
    const rz = wz - pf.pz;
    const along = rx * pf.fwdX + rz * pf.fwdZ;
    const lat = rx * pf.rightX + rz * pf.rightZ;
    if (along >= alongMin && along <= alongMax && Math.abs(lat) <= latLimit) {
      return true;
    }
  }
  return false;
}

function buildTurnArc(
  poseX: number,
  poseZ: number,
  poseTx: number,
  poseTz: number,
  nextRoadIdx: number,
  nextDr: DrivableRoad,
  nextDist: number,
  nextDir: 1 | -1,
  car: Pick<MovingVehicle, 'isSemi' | 'laneSlot'>,
): TurnArc {
  const nextSample = sampleRoad(nextDr, nextDist);
  const nextOff = getTravelRightOffset(nextDr, car);
  const p0x = poseX;
  const p0z = poseZ;
  const p3x = nextSample.x + nextSample.nx * nextDir * nextOff;
  const p3z = nextSample.z + nextSample.nz * nextDir * nextOff;
  const chord = Math.hypot(p3x - p0x, p3z - p0z);
  const h = THREE.MathUtils.clamp(chord * 0.44, 1.8, 8.5);
  const entryTx = nextSample.tx * nextDir;
  const entryTz = nextSample.tz * nextDir;
  return {
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
    nextRoadIdx,
    nextDist,
    nextDir,
  };
}

function wouldTurnArcCrossPlayer(
  arc: TurnArc,
  nextDr: DrivableRoad,
  car: Pick<MovingVehicle, 'halfLength' | 'halfWidth' | 'isSemi' | 'laneSlot'>,
  pf: PlayerFrame,
): boolean {
  // Check samples along the full cubic Bezier turn (captures Semi nose & swinging rear trailer)
  for (let i = 1; i <= 5; i++) {
    const ev = evalCubicBezier(arc, i / 5);
    if (
      footprintHitsPlayerCorridor(
        ev.x,
        ev.z,
        ev.tx,
        ev.tz,
        car.halfLength,
        car.halfWidth,
        pf,
        -12,
        60,
        0.85,
      )
    ) {
      return true;
    }
  }
  // Also check 16m past turn exit along the destination road
  const postDist = THREE.MathUtils.clamp(arc.nextDist + arc.nextDir * 14, 0, nextDr.totalLen);
  const postS = sampleRoad(nextDr, postDist);
  const postOff = getTravelRightOffset(nextDr, car);
  const px = postS.x + postS.nx * arc.nextDir * postOff;
  const pz = postS.z + postS.nz * arc.nextDir * postOff;
  const ptx = postS.tx * arc.nextDir;
  const ptz = postS.tz * arc.nextDir;
  // Ignore if post-turn is already parallel same-dir cleanly ahead or parallel opposite in another lane
  const postAlign = ptx * pf.fwdX + ptz * pf.fwdZ;
  if (Math.abs(postAlign) < 0.78) {
    if (
      footprintHitsPlayerCorridor(px, pz, ptx, ptz, car.halfLength, car.halfWidth, pf, -12, 60, 0.7)
    ) {
      return true;
    }
  }
  return false;
}

interface ParkedVehicleSlot {
  group: THREE.Group;
  x: number;
  z: number;
  placed: boolean;
  side: 1 | -1;
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
  placed: boolean;
}

const MOVING_ROSTER: Array<{ role: FleetRole; flow: TrafficFlow }> = [
  { role: 'semi_coca', flow: 'oncoming' },
  { role: 'cyber_tree', flow: 'same_dir' },
  { role: 'semi_tesla', flow: 'oncoming' },
  { role: 'roadster', flow: 'oncoming' },
  { role: 'roadster', flow: 'same_dir' },
  { role: 'cyber_tree', flow: 'oncoming' },
];

const PARKED_SLOT_COUNT = 6;

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
    if ((obj as THREE.InstancedMesh).isInstancedMesh) {
      (obj as THREE.InstancedMesh).dispose();
    }
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
  private readonly parkedSlots: ParkedVehicleSlot[] = [];
  private junctionPts: OsmPoint2D[] = [];
  private fleetInitialized = false;
  private walkersInitialized = false;
  private recycleAccum = 0;

  private drivableRoads: DrivableRoad[] = [];
  private endpointLinks = new Map<string, Array<{ roadIdx: number; atEnd: boolean }>>();
  private builtSnapshotVersion?: number;
  private builtElevVersion?: number;
  private builtOriginLat?: number;
  private builtOriginLon?: number;
  private hasBuiltOnce = false;
  private enabled = true;

  // Shared lightweight geometries & materials for festive gift sleighs, walkers, beams & AO shadows
  private readonly beamPlaneGeo = new THREE.PlaneGeometry(4.6, 9.6).rotateX(-Math.PI * 0.5);
  private readonly tailGlowPlaneGeo = new THREE.PlaneGeometry(3.2, 4.2).rotateX(-Math.PI * 0.5);
  private readonly semiTailGlowPlaneGeo = new THREE.PlaneGeometry(4.0, 5.2).rotateX(-Math.PI * 0.5);
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
    opacity: 0.36,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
  private readonly tailGlowMat = new THREE.MeshBasicMaterial({
    map: getSoftGlowTexture(),
    color: '#ff243c',
    transparent: true,
    opacity: 0.26,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
  private readonly tailGlowBrakeMat = new THREE.MeshBasicMaterial({
    map: getSoftGlowTexture(),
    color: '#ff243c',
    transparent: true,
    opacity: 0.54,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
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

    let nonSemiLaneCounter = 0;
    let semiLaneCounter = 0;
    for (let k = 0; k < MOVING_ROSTER.length; k++) {
      const { role, flow } = MOVING_ROSTER[k];
      const root = new THREE.Group();
      const isSemi = role === 'semi_coca' || role === 'semi_tesla';
      const dims = vehicleDimensions(role);
      const laneSlot = isSemi ? semiLaneCounter++ : nonSemiLaneCounter++;

      const ao = new THREE.Mesh(isSemi ? this.semiAoPlaneGeo : this.aoPlaneGeo, this.aoShadowMat);
      ao.position.y = 0.035;
      root.add(ao);

      let semiHandle: AccurateSemiHandle | undefined;
      let cyberHandle: AccurateCybertruckHandle | undefined;
      let roadsterHandle: StarmanRoadsterGroup | undefined;

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
        roadsterHandle = createAccurateStarmanRoadster();
        roadsterHandle.scale.setScalar(0.92);
        roadsterHandle.rotation.y = -Math.PI * 0.5; // +X forward -> +Z forward
        root.add(roadsterHandle);
      } else {
        const sleigh = this.createHolidayGiftSleigh(true);
        sleigh.position.y = 0.18;
        root.add(sleigh);
      }

      const groundGlow = new THREE.Mesh(this.beamPlaneGeo, this.beamMat);
      groundGlow.position.set(0, 0.09, isSemi ? 8.2 : 5.6);
      const tailGlow = new THREE.Mesh(
        isSemi ? this.semiTailGlowPlaneGeo : this.tailGlowPlaneGeo,
        this.tailGlowMat
      );
      tailGlow.position.set(0, 0.09, isSemi ? -7.8 : -3.8);
      root.add(groundGlow, tailGlow);

      this.movingLayer.add(root);
      this.movingFleet.push({
        group: root,
        groundGlow,
        tailGlow,
        role,
        flow,
        isSemi,
        halfLength: dims.halfLength,
        halfWidth: dims.halfWidth,
        laneSlot,
        semiHandle,
        cyberHandle,
        roadsterHandle,
        roadIdx: 0,
        dist: 0,
        dir: k % 2 === 0 ? 1 : -1,
        baseSpeed: isSemi ? 8.2 : 10.2,
        currentSpeed: isSemi ? 8.2 : 10.2,
        wheelPhase: k * 4.5,
        phase: k * 1.4,
        worldX: 0,
        worldZ: 0,
        poseTx: 0,
        poseTz: -1,
        hasPose: false,
        coasting: false,
        smoothYaw: 0,
        smoothPitch: 0,
        smoothRoll: 0,
        blockedSec: 0,
        avoidLat: 0,
      });
    }

    // Build 3 lightweight parked templates & pool 6 recyclable parked vehicle slots
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
    for (let i = 0; i < PARKED_SLOT_COUNT; i++) {
      const parked = this.parkedTemplates[i % this.parkedTemplates.length].clone();
      parked.visible = false;
      this.parkedLayer.add(parked);
      this.parkedSlots.push({
        group: parked,
        x: 0,
        z: 0,
        placed: false,
        side: i % 2 === 0 ? 1 : -1,
      });
    }
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
        placed: false,
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
        radius: Math.max(car.isSemi ? 6.6 : 3.2, car.halfLength),
        height: car.isSemi ? 3.25 : 2.15,
      });
    }
    for (let i = 0; i < this.parkedSlots.length; i++) {
      const ps = this.parkedSlots[i];
      if (!ps.placed) continue;
      out.push({ x: ps.x, z: ps.z, radius: 2.8, height: 2.1 });
    }
    return out;
  }

  private placeTrafficAhead(
    car: MovingVehicle,
    k: number,
    playerPos: THREE.Vector3,
    playerHeading: number,
    targetAheadMin: number,
    targetAheadMax: number,
    convoyPositions: ReadonlyArray<{ x: number; z: number }> = [],
  ): void {
    const pf = makePlayerFrame(playerPos, playerHeading);
    const { fwdX, fwdZ } = pf;
    const desiredAhead = THREE.MathUtils.lerp(targetAheadMin, targetAheadMax, (k * 0.37) % 1);
    const isSameDir = car.flow === 'same_dir';
    const minAheadGate = isSameDir ? 58 : 72;

    let bestScore = Infinity;
    let bestRoadIdx = car.roadIdx;
    let bestDist = 0;
    let bestDir: 1 | -1 = 1;

    for (let rIdx = 0; rIdx < this.drivableRoads.length; rIdx++) {
      const dr = this.drivableRoads[rIdx];
      const isOneway = dr.road.oneway === 1 || dr.road.oneway === -1;
      const step = Math.max(18, Math.min(34, dr.totalLen * 0.25));
      for (let d = 10; d <= dr.totalLen - 10; d += step) {
        const s = sampleRoad(dr, d);
        const rawDx = s.x - playerPos.x;
        const rawDz = s.z - playerPos.z;
        const dotFwd = s.tx * fwdX + s.tz * fwdZ;

        // Strictly enforce oneway direction; never choose illegal reverse direction
        const preferredDir: 1 | -1 = isSameDir
          ? dotFwd >= 0
            ? 1
            : -1
          : dotFwd > 0.08
            ? -1
            : dotFwd < -0.08
              ? 1
              : rawDx * s.tx + rawDz * s.tz >= 0
                ? -1
                : 1;
        const candDir = legalRoadDir(dr.road, preferredDir);
        const travelTx = s.tx * candDir;
        const travelTz = s.tz * candDir;
        const travelDotFwd = travelTx * fwdX + travelTz * fwdZ;

        const rightOff = getTravelRightOffset(dr, car);
        const candX = s.x + s.nx * candDir * rightOff;
        const candZ = s.z + s.nz * candDir * rightOff;
        const dx = candX - playerPos.x;
        const dz = candZ - playerPos.z;
        const ahead = dx * fwdX + dz * fwdZ;
        const effMinAhead = travelDotFwd >= 0.2 ? 58 : minAheadGate;
        if (ahead < effMinAhead || ahead > 240) continue;

        // Never spawn a crossing vehicle whose footprint or immediate path cuts across the player's approaching corridor
        if (Math.abs(travelDotFwd) < 0.6) {
          let crossesPlayer = false;
          for (const probe of [0, 12, 24]) {
            if (
              footprintHitsPlayerCorridor(
                candX + travelTx * probe,
                candZ + travelTz * probe,
                travelTx,
                travelTz,
                car.halfLength,
                car.halfWidth,
                pf,
                -12,
                62,
                1.4,
              )
            ) {
              crossesPlayer = true;
              break;
            }
          }
          if (crossesPlayer) continue;
        } else if (
          footprintHitsPlayerCorridor(
            candX,
            candZ,
            travelTx,
            travelTz,
            car.halfLength,
            car.halfWidth,
            pf,
            -14,
            34,
            0.8,
          )
        ) {
          continue;
        }

        const lateral = Math.abs(dx * pf.rightX + dz * pf.rightZ);
        const alignmentPenalty = Math.abs(travelDotFwd) < (isSameDir ? 0.45 : 0.25) ? 95 : 0;
        // On one-way motorways: oncoming slots prefer a parallel opposite carriageway if one exists,
        // otherwise gracefully fall back to legal same-dir traffic in available lanes (never wrong-way!)
        let flowPenalty = 0;
        if (isOneway) {
          if (isSameDir && travelDotFwd < -0.25) flowPenalty = 135;
          else if (!isSameDir && travelDotFwd > 0.25) flowPenalty = 55;
        }

        let nearMoving = false;
        for (let m = 0; m < this.movingFleet.length; m++) {
          const other = this.movingFleet[m];
          if (other === car) continue;
          const minOtherDist = car.isSemi || other.isSemi ? 34 : 26;
          if (
            (other.roadIdx === rIdx &&
              other.dir === candDir &&
              Math.abs(other.dist - d) < 42 &&
              (!isOneway || getEffectiveLanes(dr.road) <= 1 || other.laneSlot % getEffectiveLanes(dr.road) === car.laneSlot % getEffectiveLanes(dr.road))) ||
            (other.hasPose && Math.hypot(other.worldX - candX, other.worldZ - candZ) < minOtherDist)
          ) {
            nearMoving = true;
            break;
          }
        }
        let nearConvoy = false;
        for (let c = 0; c < convoyPositions.length; c++) {
          if (Math.hypot(convoyPositions[c].x - candX, convoyPositions[c].z - candZ) < 32) {
            nearConvoy = true;
            break;
          }
        }
        let nearParked = false;
        for (let p = 0; p < this.parkedSlots.length; p++) {
          const ps = this.parkedSlots[p];
          if (ps.placed && Math.hypot(ps.x - candX, ps.z - candZ) < 9) {
            nearParked = true;
            break;
          }
        }
        const crowdPenalty = nearMoving || nearConvoy ? 400 : nearParked ? 90 : 0;
        const score = Math.abs(ahead - desiredAhead) + lateral * 0.55 + alignmentPenalty + flowPenalty + crowdPenalty;
        if (score < bestScore) {
          bestScore = score;
          bestRoadIdx = rIdx;
          bestDist = d;
          bestDir = candDir;
        }
      }
    }

    if (bestScore === Infinity) {
      const fallbackIdx = k % this.drivableRoads.length;
      const dr = this.drivableRoads[fallbackIdx];
      bestRoadIdx = fallbackIdx;
      const sMid = sampleRoad(dr, dr.totalLen * 0.5);
      const dotMid = sMid.tx * fwdX + sMid.tz * fwdZ;
      const preferredDir: 1 | -1 = isSameDir ? (dotMid >= 0 ? 1 : -1) : dotMid > 0 ? -1 : 1;
      bestDir = legalRoadDir(dr.road, preferredDir);
      bestDist = bestDir > 0 ? Math.min(dr.totalLen - 8, 12) : Math.max(8, dr.totalLen - 12);
    }

    car.roadIdx = bestRoadIdx;
    car.dist = bestDist;
    car.dir = bestDir;
    car.turnArc = undefined;
    car.hasPose = false;
    car.coasting = false;
    car.blockedSec = 0;
    car.avoidLat = 0;
    const dr = this.drivableRoads[bestRoadIdx];
    const sInit = dr ? sampleRoad(dr, bestDist) : undefined;
    const actualSameDir = sInit ? (sInit.tx * bestDir) * fwdX + (sInit.tz * bestDir) * fwdZ >= 0.2 : isSameDir;
    const isHighway = dr?.road.highway === 'motorway' || dr?.road.highway === 'trunk';
    const speedKmh = isHighway
      ? actualSameDir
        ? 54
        : 60
      : dr?.road.maxspeed && dr.road.maxspeed > 40
        ? 38
        : 28;
    const flowMul = actualSameDir && !isHighway ? 0.95 : 1.0;
    car.baseSpeed = (car.isSemi ? 0.85 : 1.0) * flowMul * (speedKmh / 3.6);
    car.currentSpeed = car.baseSpeed;
  }

  /**
   * Finds a connected road segment (via endpoint link OR nearby T-junction / OSM way split within 14m)
   * while strictly enforcing `road.oneway` and refusing turns that pull across the player's approaching corridor.
   */
  private findRoadContinuation(
    car: MovingVehicle,
    poseX: number,
    poseZ: number,
    poseTx: number,
    poseTz: number,
    pf: PlayerFrame,
    atEnd: boolean,
    dr: DrivableRoad,
    time: number,
    k: number,
    mustAvoidDespawn: boolean,
  ): { roadIdx: number; dist: number; dir: 1 | -1; blockedByPlayer?: false } | { blockedByPlayer: true } | undefined {
    const endPt = dr.road.points[atEnd ? dr.road.points.length - 1 : 0];
    const rawLinks = this.endpointLinks.get(ptKey(endPt));
    let sawPlayerBlockedLegalTurn = false;

    const isCandidateSafe = (
      nextRoadIdx: number,
      nextDr: DrivableRoad,
      nextDist: number,
      nextDir: 1 | -1,
    ): boolean => {
      const arc = buildTurnArc(poseX, poseZ, poseTx, poseTz, nextRoadIdx, nextDr, nextDist, nextDir, car);
      if (wouldTurnArcCrossPlayer(arc, nextDr, car, pf)) {
        sawPlayerBlockedLegalTurn = true;
        return false;
      }
      return true;
    };

    // Pass 1: exact endpoint links (strictly obeying oneway; prefer flow-aligned & player-safe)
    if (rawLinks) {
      for (const enforceFlow of mustAvoidDespawn ? [true, false] : [true]) {
        const candidates: Array<{ roadIdx: number; dist: number; dir: 1 | -1 }> = [];
        for (let li = 0; li < rawLinks.length; li++) {
          const l = rawLinks[li];
          if (l.roadIdx === car.roadIdx) continue;
          const nextDr = this.drivableRoads[l.roadIdx];
          if (!nextDr) continue;
          const dirSign: 1 | -1 = l.atEnd ? -1 : 1;
          // Strictly enforce oneway direction
          if (!isDirLegalOnRoad(nextDr.road, dirSign)) continue;
          const entry = sampleRoad(nextDr, l.atEnd ? nextDr.totalLen : 0);
          const dotTurn = entry.tx * dirSign * poseTx + entry.tz * dirSign * poseTz;
          if (dotTurn <= -0.45) continue;
          const dotFwd = entry.tx * dirSign * pf.fwdX + entry.tz * dirSign * pf.fwdZ;
          const isOnewayNext = nextDr.road.oneway === 1 || nextDr.road.oneway === -1;
          const flowOk =
            !enforceFlow ||
            isOnewayNext ||
            (car.flow === 'same_dir' ? dotFwd >= -0.25 : dotFwd <= 0.25);
          if (!flowOk) continue;
          const inset = Math.min(nextDr.totalLen * 0.22, 5.5);
          const nextDist = l.atEnd ? nextDr.totalLen - inset : inset;
          if (!isCandidateSafe(l.roadIdx, nextDr, nextDist, dirSign)) continue;
          candidates.push({ roadIdx: l.roadIdx, dist: nextDist, dir: dirSign });
        }
        if (candidates.length > 0) {
          const targetPick = Math.floor(time * 7 + car.roadIdx + k) % candidates.length;
          return candidates[targetPick];
        }
      }
    }

    // Pass 2: T-junction / mid-segment / nearby road continuation within 14m (strictly obeying oneway)
    let bestScore = Infinity;
    let bestResult: { roadIdx: number; dist: number; dir: 1 | -1 } | undefined;
    for (let rIdx = 0; rIdx < this.drivableRoads.length; rIdx++) {
      if (rIdx === car.roadIdx) continue;
      const candDr = this.drivableRoads[rIdx];
      for (let si = 0; si < candDr.segs.length; si++) {
        const seg = candDr.segs[si];
        const t = THREE.MathUtils.clamp(
          ((poseX - seg.ax) * seg.dx + (poseZ - seg.az) * seg.dz) / Math.max(seg.len * seg.len, 0.001),
          0,
          1,
        );
        const cx = seg.ax + seg.dx * t;
        const cz = seg.az + seg.dz * t;
        const d = Math.hypot(poseX - cx, poseZ - cz);
        if (d > 14) continue;
        const along = seg.startDist + t * seg.len;
        const rawDot = seg.tx * poseTx + seg.tz * poseTz;
        const dirSign = legalRoadDir(candDr.road, rawDot >= 0 ? 1 : -1);
        const alignedDot = (seg.tx * dirSign) * poseTx + (seg.tz * dirSign) * poseTz;
        // Reject sharp U-turns into opposite one-way segments
        if (alignedDot < -0.35) continue;
        const remain = dirSign > 0 ? candDr.totalLen - along : along;
        if (remain < 8) continue;
        const targetAlong = THREE.MathUtils.clamp(along + dirSign * 4.5, 2, candDr.totalLen - 2);
        if (!isCandidateSafe(rIdx, candDr, targetAlong, dirSign)) continue;
        const score = d + (1 - Math.max(0, alignedDot)) * 7.5;
        if (score < bestScore) {
          bestScore = score;
          bestResult = { roadIdx: rIdx, dist: targetAlong, dir: dirSign };
        }
      }
    }
    if (bestResult) return bestResult;
    if (sawPlayerBlockedLegalTurn) return { blockedByPlayer: true };
    return undefined;
  }

  /**
   * Re-anchors an active visible vehicle onto the closest matching road in a refreshed OsmMapSnapshot
   * without snapping its world position or hiding it, while strictly enforcing `road.oneway`.
   */
  private reanchorVehicleOnSnapshot(car: MovingVehicle): boolean {
    let bestScore = Infinity;
    let bestRoadIdx = -1;
    let bestDist = 0;
    let bestDir: 1 | -1 = 1;

    for (let rIdx = 0; rIdx < this.drivableRoads.length; rIdx++) {
      const dr = this.drivableRoads[rIdx];
      const laneOff = getTravelRightOffset(dr, car);
      for (let si = 0; si < dr.segs.length; si++) {
        const seg = dr.segs[si];
        const t = THREE.MathUtils.clamp(
          ((car.worldX - seg.ax) * seg.dx + (car.worldZ - seg.az) * seg.dz) / Math.max(seg.len * seg.len, 0.001),
          0,
          1,
        );
        const rawDot = seg.tx * car.poseTx + seg.tz * car.poseTz;
        const dirSign = legalRoadDir(dr.road, rawDot >= 0 ? 1 : -1);
        const alignedDot = (seg.tx * dirSign) * car.poseTx + (seg.tz * dirSign) * car.poseTz;
        if (alignedDot < 0.35) continue;
        const cx = seg.ax + seg.dx * t + seg.nx * dirSign * laneOff;
        const cz = seg.az + seg.dz * t + seg.nz * dirSign * laneOff;
        const d = Math.hypot(car.worldX - cx, car.worldZ - cz);
        if (d > 14) continue;
        const score = d + (1 - alignedDot) * 8;
        if (score < bestScore) {
          bestScore = score;
          bestRoadIdx = rIdx;
          bestDist = seg.startDist + t * seg.len;
          bestDir = dirSign;
        }
      }
    }

    if (bestRoadIdx < 0) return false;
    car.roadIdx = bestRoadIdx;
    car.dist = bestDist;
    car.dir = bestDir;
    car.turnArc = undefined;
    car.coasting = false;
    return true;
  }

  /**
   * Full-footprint (front bumper + center + rear trailer) intersection & corridor yield check.
   * Smoothly halts crossing, turning, or approaching-junction vehicles outside the player's lane
   * until the player has passed, without blocking oncoming traffic in separate parallel lanes.
   */
  private shouldYieldForPlayer(
    car: MovingVehicle,
    poseX: number,
    poseZ: number,
    poseTx: number,
    poseTz: number,
    dr: DrivableRoad | undefined,
    pf: PlayerFrame,
  ): boolean {
    const rx = poseX - pf.px;
    const rz = poseZ - pf.pz;
    const cAlong = rx * pf.fwdX + rz * pf.fwdZ;
    const cLat = rx * pf.rightX + rz * pf.rightZ;
    if (Math.abs(cAlong) > 85 && Math.abs(cLat) > 48) return false;

    const carAlign = poseTx * pf.fwdX + poseTz * pf.fwdZ;
    const carLatVel = poseTx * pf.rightX + poseTz * pf.rightZ;

    // 1. Same-direction traffic immediately behind player in same lane: brake instead of rear-ending player
    if (
      carAlign > 0.72 &&
      Math.abs(cLat) < PLAYER_CORRIDOR_HALF_W + car.halfWidth * 0.5 &&
      cAlong < 0 &&
      cAlong + car.halfLength > -15
    ) {
      return true;
    }

    // 2. Parallel oncoming/same-dir traffic cleanly outside player's lane passes unobstructed
    const isCrossingOrTurning = Math.abs(carAlign) < 0.78 || Boolean(car.turnArc);
    if (!isCrossingOrTurning) {
      // Only guard if approaching an intersection near the player's corridor from a curving/merging lane
      return false;
    }

    const headingTowardCorridor =
      (cLat > 0.4 && carLatVel < -0.1) || (cLat < -0.4 && carLatVel > 0.1);
    const currentlyInCorridor = footprintHitsPlayerCorridor(
      poseX,
      poseZ,
      poseTx,
      poseTz,
      car.halfLength,
      car.halfWidth,
      pf,
      -12,
      58,
      0.25,
    );

    // 3. Approaching the player's corridor from either side: yield smoothly BEFORE front bumper enters lane
    if (headingTowardCorridor) {
      const stopLookahead = (car.isSemi ? 16 : 10) + car.currentSpeed * 1.15;
      for (const frac of [0, 0.35, 0.7, 1.0]) {
        const probeD = stopLookahead * frac;
        if (
          footprintHitsPlayerCorridor(
            poseX + poseTx * probeD,
            poseZ + poseTz * probeD,
            poseTx,
            poseTz,
            car.halfLength,
            car.halfWidth,
            pf,
            -12,
            60,
            0.85,
          )
        ) {
          return true;
        }
      }
    }

    // 4. Active turnArc: stop BEFORE the turn swings cab or 17m rear trailer into player's lane
    if (car.turnArc && !currentlyInCorridor) {
      const remStart = car.turnArc.t;
      for (let i = 1; i <= 4; i++) {
        const tt = Math.min(1, remStart + ((1 - remStart) * i) / 4);
        const ev = evalCubicBezier(car.turnArc, tt);
        if (
          footprintHitsPlayerCorridor(
            ev.x,
            ev.z,
            ev.tx,
            ev.tz,
            car.halfLength,
            car.halfWidth,
            pf,
            -12,
            56,
            0.75,
          )
        ) {
          return true;
        }
      }
    }

    // 5. Side-street junction approach: stop before stop line if junction sits in player's approaching path
    if (!car.turnArc && !car.coasting && dr) {
      const remainDist = car.dir > 0 ? dr.totalLen - car.dist : car.dist;
      const junctionLook = (car.isSemi ? 22 : 14) + car.currentSpeed * 0.85;
      if (remainDist <= junctionLook) {
        const endS = sampleRoad(dr, car.dir > 0 ? dr.totalLen : 0);
        const endRx = endS.x - pf.px;
        const endRz = endS.z - pf.pz;
        const endAlong = endRx * pf.fwdX + endRz * pf.fwdZ;
        const endLat = endRx * pf.rightX + endRz * pf.rightZ;
        if (
          endAlong >= -12 &&
          endAlong <= 60 &&
          Math.abs(endLat) <= PLAYER_CORRIDOR_HALF_W + car.halfWidth + 5.5 &&
          Math.abs(cLat) > PLAYER_CORRIDOR_HALF_W + 0.6
        ) {
          return true;
        }
      }
    }

    // 6. Close-range crossing emergency stop if still angled toward player's lane
    if (currentlyInCorridor && headingTowardCorridor && cAlong > -12 && cAlong < 30) {
      return true;
    }

    return false;
  }

  private tryPlaceParkedAhead(
    slot: ParkedVehicleSlot,
    slotIdx: number,
    mapData: ChristmasMapData,
    playerPos: THREE.Vector3,
    playerHeading: number,
    groundAt?: (x: number, z: number) => number,
    minAhead = 46,
    maxAhead = 185,
  ): boolean {
    const pf = makePlayerFrame(playerPos, playerHeading);
    const { fwdX, fwdZ } = pf;
    const desiredAhead = THREE.MathUtils.lerp(minAhead, maxAhead, ((slotIdx * 0.31) + 0.18) % 1);
    let bestScore = Infinity;
    let bestX = 0;
    let bestZ = 0;
    let bestYaw = 0;

    for (let rIdx = 0; rIdx < this.drivableRoads.length; rIdx++) {
      const dr = this.drivableRoads[rIdx];
      const hw = dr.road.highway ?? '';
      if (
        hw === 'motorway' ||
        hw === 'trunk' ||
        hw.endsWith('_link') ||
        (dr.road.oneway && getEffectiveLanes(dr.road) <= 1) ||
        dr.totalLen < 38
      ) {
        continue;
      }
      for (let d = 20; d < dr.totalLen - 16; d += 38) {
        const s = sampleRoad(dr, d);
        const curbOffset = Math.max(3.85, dr.road.widthM * 0.5 + 1.35);
        const px = s.x + s.nx * slot.side * curbOffset;
        const pz = s.z + s.nz * slot.side * curbOffset;
        const dx = px - playerPos.x;
        const dz = pz - playerPos.z;
        const ahead = dx * fwdX + dz * fwdZ;
        if (ahead < minAhead || ahead > maxAhead) continue;
        if (Math.hypot(dx, dz) < 22) continue;
        if (mapData.clearance && !mapData.clearance.clear({ x: px, z: pz }, 1.45)) continue;
        if (footprintHitsPlayerCorridor(px, pz, s.tx, s.tz, 3.2, 1.3, pf, -14, 48, 0.8)) continue;

        let nearJunction = false;
        for (let j = 0; j < this.junctionPts.length; j++) {
          if (Math.hypot(this.junctionPts[j].x - px, this.junctionPts[j].z - pz) < 16) {
            nearJunction = true;
            break;
          }
        }
        if (nearJunction) continue;

        let nearOther = false;
        for (let o = 0; o < this.parkedSlots.length; o++) {
          const other = this.parkedSlots[o];
          if (other !== slot && other.placed && Math.hypot(other.x - px, other.z - pz) < 28) {
            nearOther = true;
            break;
          }
        }
        if (nearOther) continue;

        const lateral = Math.abs(dx * -fwdZ + dz * fwdX);
        const score = Math.abs(ahead - desiredAhead) + lateral * 0.45;
        if (score < bestScore) {
          bestScore = score;
          bestX = px;
          bestZ = pz;
          const faceDir = legalRoadDir(dr.road, slot.side);
          bestYaw = Math.atan2(s.tx * faceDir, s.tz * faceDir);
        }
      }
    }

    if (bestScore === Infinity) return false;
    slot.x = bestX;
    slot.z = bestZ;
    slot.placed = true;
    slot.group.position.set(bestX, groundAt?.(bestX, bestZ) ?? 0, bestZ);
    slot.group.rotation.y = bestYaw;
    slot.group.visible = true;
    return true;
  }

  private tryPlaceWalkerAhead(
    walker: SidewalkWalker,
    walkerIdx: number,
    mapData: ChristmasMapData,
    playerPos: THREE.Vector3,
    playerHeading: number,
    minAhead = 34,
    maxAhead = 148,
  ): boolean {
    const fwdX = Math.sin(playerHeading);
    const fwdZ = -Math.cos(playerHeading);
    const desiredAhead = THREE.MathUtils.lerp(minAhead, maxAhead, ((walkerIdx * 0.27) + 0.12) % 1);
    let bestScore = Infinity;
    let bestRoadIdx = 0;
    let bestDist = 0;
    let bestYaw = 0;

    for (let rIdx = 0; rIdx < this.drivableRoads.length; rIdx++) {
      const dr = this.drivableRoads[rIdx];
      const step = Math.max(18, Math.min(36, dr.totalLen * 0.25));
      for (let d = 6; d <= dr.totalLen - 6; d += step) {
        const s = sampleRoad(dr, d);
        const vergeOffset = dr.road.widthM * 0.5 + 1.95;
        const px = s.x + s.nx * walker.side * vergeOffset;
        const pz = s.z + s.nz * walker.side * vergeOffset;
        const dx = px - playerPos.x;
        const dz = pz - playerPos.z;
        const ahead = dx * fwdX + dz * fwdZ;
        if (ahead < minAhead || ahead > maxAhead) continue;
        if (mapData.clearance && !mapData.clearance.clear({ x: px, z: pz }, 0.45)) continue;
        const lateral = Math.abs(dx * -fwdZ + dz * fwdX);
        const score = Math.abs(ahead - desiredAhead) + lateral * 0.5;
        if (score < bestScore) {
          bestScore = score;
          bestRoadIdx = rIdx;
          bestDist = d;
          bestYaw = Math.atan2(s.tx * walker.dir, s.tz * walker.dir);
        }
      }
    }

    if (bestScore === Infinity) return false;
    walker.roadIdx = bestRoadIdx;
    walker.dist = bestDist;
    walker.smoothYaw = bestYaw;
    walker.placed = true;
    walker.group.visible = true;
    return true;
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

    // Compute exact coordinate-frame shift matching christmasDrive.ts when snapshot origin moves
    let shiftX = 0;
    let shiftZ = 0;
    if (
      this.builtOriginLat !== undefined &&
      this.builtOriginLon !== undefined &&
      (this.builtOriginLat !== snapshot.originLat || this.builtOriginLon !== snapshot.originLon)
    ) {
      const delta = geoDeltaMeters(snapshot.originLat, snapshot.originLon, this.builtOriginLat, this.builtOriginLon);
      shiftX = delta.x;
      shiftZ = delta.z;
    }
    this.builtOriginLat = snapshot.originLat;
    this.builtOriginLon = snapshot.originLon;
    const isInitialBuild = !this.hasBuiltOnce;
    this.hasBuiltOnce = true;

    this.drivableRoads = [];
    this.endpointLinks.clear();
    this.junctionPts = [];

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

    for (const [k, deg] of pointDegree) {
      if (deg >= 2) {
        const [x, z] = k.split(',').map(Number);
        this.junctionPts.push({ x, z });
      }
    }

    const fwdX = Math.sin(playerHeading);
    const fwdZ = -Math.cos(playerHeading);

    const rankedRoads = this.drivableRoads
      .map((dr, i) => ({
        i,
        ...closestDistanceAlongRoad(dr, playerPos),
        totalLen: dr.totalLen,
      }))
      .sort((a, b) => a.dist - b.dist || b.totalLen - a.totalLen);

    // 1. Preserve visible in-view moving vehicles seamlessly across snapshot refreshes; only place hidden/out-of-view ones
    for (let k = 0; k < this.movingFleet.length; k++) {
      const car = this.movingFleet[k];
      if (!isInitialBuild && car.hasPose && car.group.visible) {
        car.worldX += shiftX;
        car.worldZ += shiftZ;
        if (car.turnArc) {
          car.turnArc.p0x += shiftX;
          car.turnArc.p0z += shiftZ;
          car.turnArc.p1x += shiftX;
          car.turnArc.p1z += shiftZ;
          car.turnArc.p2x += shiftX;
          car.turnArc.p2z += shiftZ;
          car.turnArc.p3x += shiftX;
          car.turnArc.p3z += shiftZ;
        }
        const dx = car.worldX - playerPos.x;
        const dz = car.worldZ - playerPos.z;
        const ahead = dx * fwdX + dz * fwdZ;
        const dist = Math.hypot(dx, dz);
        if (ahead > -30 && dist < 200) {
          // Stay visible and re-anchor onto closest matching road (or coast smoothly past camera)
          if (!this.reanchorVehicleOnSnapshot(car)) {
            car.coasting = true;
            car.turnArc = undefined;
          }
          car.group.position.set(car.worldX, groundAt?.(car.worldX, car.worldZ) ?? car.group.position.y, car.worldZ);
          continue;
        }
      }
      const minAhead = isInitialBuild
        ? (car.flow === 'same_dir' ? 46 + (k % 3) * 28 : 84 + k * 28)
        : (car.flow === 'same_dir' ? 115 + (k % 3) * 24 : 138 + k * 18);
      const maxAhead = isInitialBuild
        ? (car.flow === 'same_dir' ? 120 + (k % 3) * 26 : 124 + k * 30)
        : (car.flow === 'same_dir' ? 195 : 225);
      this.placeTrafficAhead(car, k, playerPos, playerHeading, minAhead, maxAhead);
    }

    // 2. Preserve visible in-view parked vehicles; only place/recycle out-of-view parked slots
    for (let i = 0; i < this.parkedSlots.length; i++) {
      const ps = this.parkedSlots[i];
      if (!isInitialBuild && ps.placed && ps.group.visible) {
        ps.x += shiftX;
        ps.z += shiftZ;
        const dx = ps.x - playerPos.x;
        const dz = ps.z - playerPos.z;
        const ahead = dx * fwdX + dz * fwdZ;
        const dist = Math.hypot(dx, dz);
        if (ahead > -28 && dist < 195) {
          ps.group.position.set(ps.x, groundAt?.(ps.x, ps.z) ?? ps.group.position.y, ps.z);
          continue;
        }
      }
      ps.placed = false;
      ps.group.visible = false;
      this.tryPlaceParkedAhead(
        ps,
        i,
        mapData,
        playerPos,
        playerHeading,
        groundAt,
        isInitialBuild ? 26 : 112,
        isInitialBuild ? 175 : 195,
      );
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
        const vergeOffset = dr.road.widthM * 0.5 + 1.95;
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
      walker.placed = placed;
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
    playerSpeedMs = 0,
  ): void {
    const resolvedElev = groundAt ? elevationVersion : -1;
    if (this.builtSnapshotVersion !== snapshot.version) {
      this.builtSnapshotVersion = snapshot.version;
      this.builtElevVersion = resolvedElev;
      this.rebuild(snapshot, mapData, playerPos, playerHeading, groundAt);
    } else if (this.builtElevVersion !== resolvedElev) {
      this.builtElevVersion = resolvedElev;
      for (const ps of this.parkedSlots) {
        if (ps.placed) {
          ps.group.position.y = groundAt?.(ps.x, ps.z) ?? 0;
        }
      }
    }
    if (!this.enabled || !this.drivableRoads.length) return;

    const pf = makePlayerFrame(playerPos, playerHeading);
    const { fwdX: fwdPlayerX, fwdZ: fwdPlayerZ } = pf;

    for (let k = 0; k < this.movingFleet.length; k++) {
      const car = this.movingFleet[k];
      let dr = this.drivableRoads[car.roadIdx];
      if (!dr && !car.coasting) continue;

      let poseX = car.worldX;
      let poseZ = car.worldZ;
      let poseTx = car.poseTx;
      let poseTz = car.poseTz;

      if (!car.hasPose && dr) {
        car.dir = legalRoadDir(dr.road, car.dir);
        const initSample = sampleRoad(dr, car.dist);
        const initOff = getTravelRightOffset(dr, car);
        poseX = initSample.x + initSample.nx * car.dir * initOff;
        poseZ = initSample.z + initSample.nz * car.dir * initOff;
        poseTx = initSample.tx * car.dir;
        poseTz = initSample.tz * car.dir;
        car.worldX = poseX;
        car.worldZ = poseZ;
        car.poseTx = poseTx;
        car.poseTz = poseTz;
        car.smoothYaw = Math.atan2(poseTx, poseTz);
        car.hasPose = true;
      } else if (car.coasting) {
        poseX = car.worldX;
        poseZ = car.worldZ;
        poseTx = car.poseTx;
        poseTz = car.poseTz;
      } else if (car.turnArc) {
        const ev = evalCubicBezier(car.turnArc, car.turnArc.t);
        poseX = ev.x;
        poseZ = ev.z;
        poseTx = ev.tx;
        poseTz = ev.tz;
      } else if (dr) {
        car.dir = legalRoadDir(dr.road, car.dir);
        const curSample = sampleRoad(dr, car.dist);
        const laneOffset = getTravelRightOffset(dr, car);
        poseX = curSample.x + curSample.nx * car.dir * laneOffset;
        poseZ = curSample.z + curSample.nz * car.dir * laneOffset;
        poseTx = curSample.tx * car.dir;
        poseTz = curSample.tz * car.dir;
      }

      const dPlayer = Math.hypot(poseX - playerPos.x, poseZ - playerPos.z);
      const aheadPlayer = (poseX - playerPos.x) * fwdPlayerX + (poseZ - playerPos.z) * fwdPlayerZ;

      // ONLY recycle a vehicle once it is cleanly behind the camera or deep out in the fog
      const outOfView = aheadPlayer < -32 || dPlayer > 205;
      if (outOfView) {
        const minSpawn = car.flow === 'same_dir' ? 115 : 138;
        const maxSpawn = car.flow === 'same_dir' ? 205 : 225;
        this.placeTrafficAhead(car, k, playerPos, playerHeading, minSpawn, maxSpawn, convoyPositions);
        dr = this.drivableRoads[car.roadIdx];
        const s = sampleRoad(dr, car.dist);
        const off = getTravelRightOffset(dr, car);
        poseX = s.x + s.nx * car.dir * off;
        poseZ = s.z + s.nz * car.dir * off;
        poseTx = s.tx * car.dir;
        poseTz = s.tz * car.dir;
        car.worldX = poseX;
        car.worldZ = poseZ;
        car.poseTx = poseTx;
        car.poseTz = poseTz;
        car.smoothYaw = Math.atan2(poseTx, poseTz);
        car.hasPose = true;
      }

      // Direction-aware pairwise spacing + full-footprint player corridor yield
      let shouldYieldTraffic = false;
      for (let m = 0; m < this.movingFleet.length; m++) {
        if (m === k) continue;
        const other = this.movingFleet[m];
        if (!other.hasPose) continue;
        const dx = other.worldX - poseX;
        const dz = other.worldZ - poseZ;
        const sep = Math.hypot(dx, dz);
        const minSep = car.halfLength + other.halfLength + 6;
        if (sep < minSep) {
          // Cars traveling in opposite directions pass cleanly in opposite lanes
          const dirDot = poseTx * other.poseTx + poseTz * other.poseTz;
          if (dirDot < -0.35) continue;
          // Cars in adjacent parallel lanes on multi-lane roads pass cleanly without false braking
          const latSep = Math.abs(dx * -poseTz + dz * poseTx);
          if (dirDot > 0.7 && latSep > car.halfWidth + other.halfWidth + 0.65) continue;
          const fwdDot = sep > 0.01 ? (dx * poseTx + dz * poseTz) / sep : 1;
          if (fwdDot > 0.42) {
            shouldYieldTraffic = true;
          }
        }
      }
      for (let c = 0; c < convoyPositions.length; c++) {
        const cv = convoyPositions[c];
        const dx = cv.x - poseX;
        const dz = cv.z - poseZ;
        const sep = Math.hypot(dx, dz);
        if (sep < car.halfLength + 17) {
          const cvTx = Math.sin(cv.heading);
          const cvTz = -Math.cos(cv.heading);
          const dirDot = poseTx * cvTx + poseTz * cvTz;
          const fwdDot = sep > 0.01 ? (dx * poseTx + dz * poseTz) / sep : 1;
          if (dirDot > -0.35 && fwdDot > 0.35) {
            shouldYieldTraffic = true;
          }
        }
      }

      let yieldForPlayer = this.shouldYieldForPlayer(car, poseX, poseZ, poseTx, poseTz, dr, pf);

      const relRx = poseX - pf.px;
      const relRz = poseZ - pf.pz;
      const relAlong = relRx * pf.fwdX + relRz * pf.fwdZ;
      const relLat = relRx * pf.rightX + relRz * pf.rightZ;
      const relAlign = poseTx * pf.fwdX + poseTz * pf.fwdZ;
      const sameDirAheadInCorridor =
        relAlign > 0.65 &&
        relAlong > -(car.halfLength + 2.5) &&
        relAlong < 46 &&
        Math.abs(relLat) < PLAYER_CORRIDOR_HALF_W + car.halfWidth + 0.85;

      // When yielding for the player, stay cleanly stopped until the player passes (never creep forward into player!)
      // When yielding only for ambient traffic, gently ease forward if deadlocked > 2.2s.
      const effectiveYieldTraffic = shouldYieldTraffic && !(sameDirAheadInCorridor && relAlong < 24);
      car.blockedSec =
        effectiveYieldTraffic && !yieldForPlayer ? car.blockedSec + dt : Math.max(0, car.blockedSec - dt * 2);
      let isBraking = yieldForPlayer || (effectiveYieldTraffic && car.blockedSec <= 2.2);
      let targetSpeed = yieldForPlayer
        ? 0
        : effectiveYieldTraffic
          ? car.blockedSec > 2.2
            ? car.baseSpeed * 0.35
            : 0
          : car.baseSpeed;
      if (sameDirAheadInCorridor && !yieldForPlayer) {
        targetSpeed = Math.max(targetSpeed, playerSpeedMs + 3.8);
        isBraking = false;
      }
      car.currentSpeed = THREE.MathUtils.damp(
        car.currentSpeed,
        targetSpeed,
        yieldForPlayer ? 9.5 : sameDirAheadInCorridor ? 6.8 : effectiveYieldTraffic ? 7.5 : 3.2,
        dt,
      );
      if (yieldForPlayer && car.currentSpeed < 0.25) car.currentSpeed = 0;

      const prevX = poseX;
      const prevZ = poseZ;
      const prevTx = poseTx;
      const prevTz = poseTz;
      const prevDist = car.dist;
      const prevArcT = car.turnArc?.t;
      const prevInCloseBox = footprintHitsPlayerCorridor(
        prevX,
        prevZ,
        prevTx,
        prevTz,
        car.halfLength,
        car.halfWidth,
        pf,
        -11,
        38,
        0.35,
      );

      if (car.coasting) {
        // Smooth straight glide until behind camera / in fog — never glides into player's lane
        poseX += poseTx * car.currentSpeed * dt;
        poseZ += poseTz * car.currentSpeed * dt;
      } else if (car.turnArc) {
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

      if (!car.coasting && !car.turnArc && dr) {
        car.dist += car.dir * car.currentSpeed * dt;
        const exitPad = Math.min(dr.totalLen * 0.12, 3.5);
        if (car.dist > dr.totalLen - exitPad || car.dist < exitPad) {
          const atEnd = car.dist > dr.totalLen * 0.5;
          const inView = aheadPlayer > -30 && dPlayer < 195;
          const cont = this.findRoadContinuation(
            car,
            poseX,
            poseZ,
            poseTx,
            poseTz,
            pf,
            atEnd,
            dr,
            time,
            k,
            inView,
          );
          if (cont && 'blockedByPlayer' in cont && cont.blockedByPlayer) {
            // A legal turn exists, but the player is approaching — hold smoothly before the junction!
            car.dist = atEnd ? dr.totalLen - exitPad : exitPad;
            car.currentSpeed = 0;
            yieldForPlayer = true;
            isBraking = true;
          } else if (cont && !('blockedByPlayer' in cont)) {
            const nextDr = this.drivableRoads[cont.roadIdx];
            car.turnArc = buildTurnArc(
              poseX,
              poseZ,
              poseTx,
              poseTz,
              cont.roadIdx,
              nextDr,
              cont.dist,
              cont.dir,
              car,
            );
          } else if (car.dist > dr.totalLen || car.dist < 0) {
            if (inView) {
              // True dead-end while visible: hold if coasting would cross player's lane, else glide smoothly out of view
              const coastHitsPlayer = footprintHitsPlayerCorridor(
                poseX + poseTx * 12,
                poseZ + poseTz * 12,
                poseTx,
                poseTz,
                car.halfLength,
                car.halfWidth,
                pf,
                -12,
                55,
                0.8,
              );
              if (coastHitsPlayer) {
                car.dist = atEnd ? dr.totalLen - exitPad : exitPad;
                car.currentSpeed = 0;
                yieldForPlayer = true;
                isBraking = true;
              } else {
                car.coasting = true;
                poseX += poseTx * car.currentSpeed * dt;
                poseZ += poseTz * car.currentSpeed * dt;
              }
            } else {
              this.placeTrafficAhead(
                car,
                k,
                playerPos,
                playerHeading,
                car.flow === 'same_dir' ? 115 : 138,
                car.flow === 'same_dir' ? 205 : 225,
                convoyPositions,
              );
              continue;
            }
          }
        }
        if (!car.coasting && !car.turnArc) {
          const nextSample = sampleRoad(dr, car.dist);
          const nextLaneOffset = getTravelRightOffset(dr, car);
          const targetX = nextSample.x + nextSample.nx * car.dir * nextLaneOffset;
          const targetZ = nextSample.z + nextSample.nz * car.dir * nextLaneOffset;
          // Smooth lateral correction if slightly offset after snapshot re-anchor
          const err = Math.hypot(targetX - poseX, targetZ - poseZ);
          if (err > 0.35 && err < 16) {
            const blend = 1 - Math.exp(-4.5 * dt);
            poseX = THREE.MathUtils.lerp(poseX, targetX, blend);
            poseZ = THREE.MathUtils.lerp(poseZ, targetZ, blend);
          } else {
            poseX = targetX;
            poseZ = targetZ;
          }
          poseTx = nextSample.tx * car.dir;
          poseTz = nextSample.tz * car.dir;
        }
      }

      // Predictive multi-point clearance guard (front bumper, center, rear trailer + visual Semi yaw):
      // Guarantees no crossing, turning, or tailgating vehicle (especially a 17m Semi trailer!) ever steps into the player's lane clearance box,
      // while allowing parallel oncoming traffic in the opposite lane to pass smoothly.
      const nextAlign = poseTx * pf.fwdX + poseTz * pf.fwdZ;
      const visAlign = Math.sin(car.smoothYaw) * pf.fwdX + Math.cos(car.smoothYaw) * pf.fwdZ;
      const nextAhead = (poseX - pf.px) * pf.fwdX + (poseZ - pf.pz) * pf.fwdZ;
      const isCrossingOrTurning =
        Math.abs(nextAlign) < 0.78 ||
        Boolean(car.turnArc) ||
        (car.isSemi && Math.abs(visAlign) < 0.78);
      const isTailgatingPlayer = nextAlign > 0.72 && nextAhead <= 2 && nextAhead > -(car.halfLength + 14);
      if (!prevInCloseBox && (isCrossingOrTurning || isTailgatingPlayer)) {
        const nextEntersCloseBox =
          footprintHitsPlayerCorridor(
            poseX,
            poseZ,
            poseTx,
            poseTz,
            car.halfLength,
            car.halfWidth,
            pf,
            -11,
            38,
            0.35,
          ) ||
          (car.isSemi &&
            footprintHitsPlayerCorridor(
              poseX,
              poseZ,
              Math.sin(car.smoothYaw),
              Math.cos(car.smoothYaw),
              car.halfLength,
              car.halfWidth,
              pf,
              -11,
              38,
              0.35,
            ));
        if (nextEntersCloseBox) {
          poseX = prevX;
          poseZ = prevZ;
          poseTx = prevTx;
          poseTz = prevTz;
          car.dist = prevDist;
          if (car.turnArc && prevArcT !== undefined) {
            car.turnArc.t = prevArcT;
          }
          car.currentSpeed = 0;
          yieldForPlayer = true;
          isBraking = true;
        }
      }

      car.wheelPhase += car.currentSpeed * 3.6 * dt;

      if (car.semiHandle) {
        car.semiHandle.update(dt, car.wheelPhase, isBraking, 0.22, time);
      }
      if (car.cyberHandle) {
        car.cyberHandle.update(car.wheelPhase, time);
      }
      if (car.roadsterHandle) {
        car.roadsterHandle.updateWheels?.(car.wheelPhase);
      }

      car.groundGlow.visible = true;
      car.tailGlow.visible = true;
      car.tailGlow.material = isBraking ? this.tailGlowBrakeMat : this.tailGlowMat;
      car.group.visible = true;

      car.worldX = poseX;
      car.worldZ = poseZ;
      car.poseTx = poseTx;
      car.poseTz = poseTz;

      // Fail-safe player-corridor lateral clearance so oncoming or overtaken vehicles never clip the sleigh,
      // clamped tightly so cars remain on the road surface rather than drifting off into yards.
      const finRx = poseX - pf.px;
      const finRz = poseZ - pf.pz;
      const finFwd = finRx * pf.fwdX + finRz * pf.fwdZ;
      const finLat = finRx * pf.rightX + finRz * pf.rightZ;
      const finAlign = poseTx * pf.fwdX + poseTz * pf.fwdZ;
      let desiredAvoidLat = 0;
      if (finFwd > -14 && finFwd < 52) {
        const minClearLat = 1.15 + car.halfWidth + 0.45;
        if (Math.abs(finLat) < minClearLat) {
          if (finAlign < -0.35) {
            const env = THREE.MathUtils.smoothstep(finFwd, -14, -6) * (1 - THREE.MathUtils.smoothstep(finFwd, 32, 52));
            desiredAvoidLat = (-minClearLat - finLat) * env;
          } else if (finAlign > 0.35 && finFwd > -10 && finFwd < 24) {
            const env = THREE.MathUtils.smoothstep(finFwd, -10, -4) * (1 - THREE.MathUtils.smoothstep(finFwd, 15, 24));
            const sideSign = Math.abs(finLat) >= 0.2 ? Math.sign(finLat) : 1;
            desiredAvoidLat = (sideSign * minClearLat - finLat) * env;
          }
        }
      }
      desiredAvoidLat = THREE.MathUtils.clamp(desiredAvoidLat, -1.35, 1.35);
      car.avoidLat = THREE.MathUtils.damp(car.avoidLat, desiredAvoidLat, 7.5, dt);
      const renderX = poseX + pf.rightX * car.avoidLat;
      const renderZ = poseZ + pf.rightZ * car.avoidLat;

      const wy = groundAt?.(renderX, renderZ) ?? 0;
      const hover = car.role === 'gift_sleigh' ? 0.08 * Math.sin(time * 3.1 + car.phase) : 0;
      const targetPitch =
        dPlayer < 150 && groundAt
          ? Math.atan2(
              groundAt(renderX + poseTx * 2.0, renderZ + poseTz * 2.0) -
                groundAt(renderX - poseTx * 2.0, renderZ - poseTz * 2.0),
              4.0
            )
          : 0;
      const targetYaw = Math.atan2(poseTx, poseTz);
      const prevYaw = car.smoothYaw;
      car.smoothYaw = dampAngle(car.smoothYaw, targetYaw, 6.2, dt);
      const yawDelta = Math.atan2(Math.sin(car.smoothYaw - prevYaw), Math.cos(car.smoothYaw - prevYaw));
      const targetRoll = THREE.MathUtils.clamp(-yawDelta * 2.2, -0.07, 0.07);
      car.smoothPitch = THREE.MathUtils.damp(car.smoothPitch, targetPitch, 5.5, dt);
      car.smoothRoll = THREE.MathUtils.damp(car.smoothRoll, targetRoll, 5.5, dt);

      car.group.position.set(renderX, wy + hover, renderZ);
      car.group.rotation.order = 'YXZ';
      car.group.rotation.y = car.smoothYaw;
      car.group.rotation.x = -car.smoothPitch;
      car.group.rotation.z = car.smoothRoll;
    }

    // Periodically recycle parked vehicles ONLY once cleanly behind the camera or deep in fog
    this.recycleAccum += dt;
    if (this.recycleAccum >= 0.4) {
      this.recycleAccum = 0;
      for (let i = 0; i < this.parkedSlots.length; i++) {
        const ps = this.parkedSlots[i];
        const dx = ps.x - playerPos.x;
        const dz = ps.z - playerPos.z;
        const ahead = dx * fwdPlayerX + dz * fwdPlayerZ;
        const dist = Math.hypot(dx, dz);
        if (!ps.placed || ahead < -32 || dist > 195) {
          ps.placed = false;
          ps.group.visible = false;
          this.tryPlaceParkedAhead(ps, i, mapData, playerPos, playerHeading, groundAt, 112, 195);
        }
      }
    }

    for (let p = 0; p < this.walkers.length; p++) {
      const walker = this.walkers[p];
      let dr = this.drivableRoads[walker.roadIdx];
      if (!dr || !walker.placed) {
        if (!this.tryPlaceWalkerAhead(walker, p, mapData, playerPos, playerHeading, 46, 145)) {
          walker.group.visible = false;
          continue;
        }
        dr = this.drivableRoads[walker.roadIdx];
      }
      const cur = sampleRoad(dr, walker.dist);
      const vergeOffset = dr.road.widthM * 0.5 + 1.95;
      const wx = cur.x + cur.nx * walker.side * vergeOffset;
      const wz = cur.z + cur.nz * walker.side * vergeOffset;
      const dx = wx - playerPos.x;
      const dz = wz - playerPos.z;
      const dPlayer = Math.hypot(dx, dz);
      const ahead = dx * fwdPlayerX + dz * fwdPlayerZ;

      // Recycle walkers ahead once passed or far away
      if (ahead < -24 || dPlayer > 175) {
        walker.placed = false;
        if (!this.tryPlaceWalkerAhead(walker, p, mapData, playerPos, playerHeading, 46, 145)) {
          walker.group.visible = false;
          continue;
        }
        dr = this.drivableRoads[walker.roadIdx];
      }

      // Distance & behind-camera culling for walker updates
      if (dPlayer > 115 || ahead < -18) {
        walker.group.visible = false;
        continue;
      }
      walker.group.visible = true;

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
    this.parkedSlots.length = 0;

    for (const w of this.walkers) disposeObjectTree(w.group);
    this.walkers.length = 0;

    this.beamPlaneGeo.dispose();
    this.tailGlowPlaneGeo.dispose();
    this.semiTailGlowPlaneGeo.dispose();
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
    this.tailGlowMat.dispose();
    this.tailGlowBrakeMat.dispose();
    this.aoShadowMat.dispose();
  }
}
