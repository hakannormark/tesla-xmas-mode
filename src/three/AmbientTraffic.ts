import * as THREE from 'three';
import type { OsmMapSnapshot, OsmPoint2D, OsmRoadRibbon } from '../core/osmWorld';
import type { ChristmasMapData } from './ChristmasMap';
import { getSoftGlowTexture } from './pixarMaterials';
import {
  createAccurateCybertruck,
  createAccurateOptimusGen2,
  createAccurateStarmanRoadster,
  createAccurateTeslaSemi,
  type AccurateCybertruckHandle,
  type AccurateOptimusHandle,
  type AccurateSemiHandle,
} from './teslaModels';

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
}

interface SidewalkWalker {
  group: THREE.Group;
  optimusHandle?: AccurateOptimusHandle;
  dog?: THREE.Group;
  roadIdx: number;
  dist: number;
  dir: 1 | -1;
  side: 1 | -1;
  speed: number;
  phase: number;
}

const MOVING_ROSTER: FleetRole[] = [
  'semi_coca',
  'cyber_tree',
  'semi_tesla',
  'cyber_plow',
  'roadster',
  'gift_sleigh',
  'cyber_tree',
  'semi_coca',
];

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
    if (mesh.geometry && !seenGeo.has(mesh.geometry)) {
      seenGeo.add(mesh.geometry);
      mesh.geometry.dispose();
    }
    const mat = mesh.material;
    if (Array.isArray(mat)) {
      for (const m of mat) {
        if (!seenMat.has(m)) {
          seenMat.add(m);
          m.dispose();
        }
      }
    } else if (mat && !seenMat.has(mat)) {
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

  private readonly pedBodyGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.92, 8);
  private readonly pedHeadGeo = new THREE.SphereGeometry(0.16, 8, 8);
  private readonly pedHatGeo = new THREE.ConeGeometry(0.17, 0.24, 8);
  private readonly lanternGeo = new THREE.SphereGeometry(0.08, 6, 6);
  private readonly dogBodyGeo = new THREE.BoxGeometry(0.24, 0.22, 0.52);

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
  private readonly pedSkinMat = new THREE.MeshStandardMaterial({
    color: '#f2cbb0',
    roughness: 0.72,
  });
  private readonly pedLanternMat = new THREE.MeshBasicMaterial({
    color: '#ffd278',
    toneMapped: false,
  });
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
  private readonly coatMats: THREE.MeshStandardMaterial[] = [0x9a2638, 0x245e55, 0x354d7a, 0x7a2b52].map(
    hex => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.82 }),
  );
  private readonly dogMats: THREE.MeshStandardMaterial[] = [0xc88b4e, 0xe8edf4].map(
    hex => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.8 }),
  );

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

    for (let p = 0; p < 8; p++) {
      const group = new THREE.Group();
      let optimusHandle: AccurateOptimusHandle | undefined;
      let dog: THREE.Group | undefined;

      if (p % 2 === 0) {
        // Optimus Gen 2 Santa Elf (already wears red Santa hat, crimson scarf & lantern, faces +Z)
        optimusHandle = createAccurateOptimusGen2();
        optimusHandle.group.scale.setScalar(0.98);
        group.add(optimusHandle.group);
      } else {
        const coatIdx = Math.floor(p / 2) % this.coatMats.length;
        const body = new THREE.Mesh(this.pedBodyGeo, this.coatMats[coatIdx]);
        body.position.y = 0.64;
        body.castShadow = true;
        const head = new THREE.Mesh(this.pedHeadGeo, this.pedSkinMat);
        head.position.y = 1.24;
        const hat = new THREE.Mesh(this.pedHatGeo, this.coatMats[(coatIdx + 1) % this.coatMats.length]);
        hat.position.y = 1.42;
        const lantern = new THREE.Mesh(this.lanternGeo, this.pedLanternMat);
        lantern.position.set(0.28, 0.78, 0.22);
        group.add(body, head, hat, lantern);
      }

      if (p === 1 || p === 2) {
        dog = new THREE.Group();
        const dMat = this.dogMats[p % this.dogMats.length];
        const dBody = new THREE.Mesh(this.dogBodyGeo, dMat);
        dBody.position.y = 0.24;
        const dHead = new THREE.Mesh(this.pedHeadGeo, dMat);
        dHead.scale.setScalar(0.62);
        dHead.position.set(0, 0.36, 0.25);
        dog.add(dBody, dHead);
        dog.position.set(0.55, 0, 0.9);
        group.add(dog);
      }

      this.pedLayer.add(group);
      this.walkers.push({
        group,
        optimusHandle,
        dog,
        roadIdx: 0,
        dist: 0,
        dir: p % 2 === 0 ? 1 : -1,
        side: p % 2 === 0 ? 1 : -1,
        speed: 1.15 + (p % 3) * 0.16,
        phase: p * 1.9,
      });
    }
  }

  private rebuild(
    snapshot: OsmMapSnapshot,
    mapData: ChristmasMapData,
    playerPos: THREE.Vector3,
    groundAt?: (x: number, z: number) => number,
  ): void {
    this.ensureFleetInitialized();
    this.ensureWalkersInitialized();

    this.parkedLayer.clear();
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
      const segs: RoadSeg[] = [];
      let totalLen = 0;
      for (let i = 1; i < road.points.length; i++) {
        const a = road.points[i - 1];
        const b = road.points[i];
        const dx = b.x - a.x;
        const dz = b.z - a.z;
        const len = Math.hypot(dx, dz);
        if (len < 0.8) continue;
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

    // Prioritize roads closest to the player so holiday semis, Cybertrucks & Optimus appear nearby first
    const rankedRoads = this.drivableRoads
      .map((dr, i) => ({
        i,
        ...closestDistanceAlongRoad(dr, playerPos),
        totalLen: dr.totalLen,
      }))
      .sort((a, b) => a.dist - b.dist || b.totalLen - a.totalLen);

    // 1. Place the 8 Hero Tesla/Christmas Moving Vehicles
    this.movingFleet.forEach((car, k) => {
      const rank = rankedRoads[k % rankedRoads.length];
      const dr = this.drivableRoads[rank.i];
      car.roadIdx = rank.i;

      if (k === 0) {
        // Coca-Cola Jul-Tesla Semi ahead in oncoming / visible stretch along current street
        const target = rank.along + (dr.totalLen - rank.along > 45 ? 54 : -48);
        car.dist = THREE.MathUtils.clamp(target, 10, dr.totalLen - 10);
        car.dir = dr.totalLen - rank.along > 45 ? -1 : 1;
      } else if (k === 1) {
        // Cybertruck with Christmas Tree ahead along the same or next street
        const target = rank.along + (dr.totalLen - rank.along > 32 ? 32 : -32);
        car.dist = THREE.MathUtils.clamp(target, 8, dr.totalLen - 8);
        car.dir = dr.totalLen - rank.along > 32 ? 1 : -1;
      } else {
        const frac = ((k * 0.37 + 0.16) % 0.8) + 0.1;
        let d = dr.totalLen * frac;
        const s = sampleRoad(dr, d);
        if (Math.hypot(s.x - playerPos.x, s.z - playerPos.z) < 20) {
          d = (d + dr.totalLen * 0.48) % dr.totalLen;
        }
        car.dist = d;
        car.dir = k % 2 === 0 ? 1 : -1;
      }

      const speedKmh = dr.road.maxspeed && dr.road.maxspeed > 40 ? 38 : 28;
      car.baseSpeed = (car.isSemi ? 0.82 : 1.0) * (speedKmh / 3.6) * (0.88 + (k % 3) * 0.1);
      car.currentSpeed = car.baseSpeed;
    });

    // 2. Place up to 10 Parked Tesla/Christmas Vehicles (Cybertruck w/ tree, Roadster, Gift Sleigh)
    const parkedPts: OsmPoint2D[] = [];
    for (let r = 0; r < rankedRoads.length && parkedPts.length < 10; r++) {
      const dr = this.drivableRoads[rankedRoads[r].i];
      if (dr.road.highway === 'motorway' || dr.road.highway === 'trunk' || dr.totalLen < 34) continue;
      for (let d = 16; d < dr.totalLen - 14 && parkedPts.length < 10; d += 36) {
        const side = (parkedPts.length % 2 === 0 ? 1 : -1) as 1 | -1;
        const s = sampleRoad(dr, d);
        const curbOffset = Math.max(1.5, dr.road.widthM * 0.5 - 0.92);
        const px = s.x + s.nx * side * curbOffset;
        const pz = s.z + s.nz * side * curbOffset;
        if (Math.hypot(px - playerPos.x, pz - playerPos.z) < 16) continue;
        if (junctionPts.some(j => Math.hypot(j.x - px, j.z - pz) < 13)) continue;
        if (parkedPts.some(p => Math.hypot(p.x - px, p.z - pz) < 15)) continue;
        parkedPts.push({ x: px, z: pz });

        const template = this.parkedTemplates[(parkedPts.length - 1) % this.parkedTemplates.length];
        const parked = template.clone();
        const y = groundAt?.(px, pz) ?? 0;
        parked.position.set(px, y, pz);
        parked.rotation.y = Math.atan2(s.tx * side, s.tz * side);
        this.parkedLayer.add(parked);
      }
    }

    // 3. Place the 8 Sidewalk Walkers (4 Optimus Santa Elves + 4 Lantern Walkers w/ 2 snow dogs)
    this.walkers.forEach((walker, p) => {
      const rank = rankedRoads[p % rankedRoads.length];
      const dr = this.drivableRoads[rank.i];
      walker.roadIdx = rank.i;
      let placed = false;

      const candidateFracs =
        p === 0
          ? [THREE.MathUtils.clamp((rank.along + 28) / Math.max(dr.totalLen, 1), 0.15, 0.85), 0.35, 0.65]
          : [0.16 + ((p * 0.27) % 0.68), 0.28, 0.72, 0.5];

      for (const f of candidateFracs) {
        const testDist = THREE.MathUtils.clamp(dr.totalLen * f, 4, Math.max(5, dr.totalLen - 4));
        const sample = sampleRoad(dr, testDist);
        const vergeOffset = dr.road.widthM * 0.5 + 1.45;
        const pt = {
          x: sample.x + sample.nx * walker.side * vergeOffset,
          z: sample.z + sample.nz * walker.side * vergeOffset,
        };
        if (!mapData.clearance || mapData.clearance.clear(pt, 0.45)) {
          walker.dist = testDist;
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
    groundAt?: (x: number, z: number) => number,
    elevationVersion = 0,
  ): void {
    const nextKey = `${snapshot.version}:${groundAt ? elevationVersion : 'flat'}`;
    if (this.builtKey !== nextKey) {
      this.builtKey = nextKey;
      this.rebuild(snapshot, mapData, playerPos, groundAt);
    }
    if (!this.enabled || !this.drivableRoads.length) return;

    const ptKey = (p: OsmPoint2D) => `${p.x.toFixed(1)},${p.z.toFixed(1)}`;
    for (const car of this.movingFleet) {
      let dr = this.drivableRoads[car.roadIdx];
      if (!dr) continue;
      const curSample = sampleRoad(dr, car.dist);
      const laneOffset = Math.min(1.85, Math.max(1.25, dr.road.widthM * 0.25));
      const rx = curSample.x + curSample.nx * car.dir * laneOffset;
      const rz = curSample.z + curSample.nz * car.dir * laneOffset;
      const dPlayer = Math.hypot(rx - playerPos.x, rz - playerPos.z);

      const yieldDist = car.isSemi ? 19 : 15;
      const slowDist = car.isSemi ? 29 : 24;
      let targetSpeed = car.baseSpeed;
      if (dPlayer < yieldDist) targetSpeed = 0;
      else if (dPlayer < slowDist) targetSpeed = car.baseSpeed * 0.42;

      const accel = targetSpeed < car.currentSpeed ? 9.5 : 3.5;
      car.currentSpeed = THREE.MathUtils.damp(car.currentSpeed, targetSpeed, accel, dt);
      const isBraking = car.currentSpeed < car.baseSpeed * 0.5;
      car.wheelPhase += car.currentSpeed * 3.6 * dt;

      if (car.semiHandle) {
        car.semiHandle.update(dt, car.wheelPhase, isBraking, 0.22, time);
      }
      if (car.cyberHandle) {
        car.cyberHandle.update(car.wheelPhase, time);
      }

      car.groundGlow.visible = dPlayer > 11;
      car.group.visible = dPlayer > (car.isSemi ? 5.2 : 3.6);

      car.dist += car.dir * car.currentSpeed * dt;
      if (car.dist > dr.totalLen || car.dist < 0) {
        const atEnd = car.dist > dr.totalLen;
        const endPt = dr.road.points[atEnd ? dr.road.points.length - 1 : 0];
        const links = (this.endpointLinks.get(ptKey(endPt)) ?? []).filter(l => l.roadIdx !== car.roadIdx);
        if (links.length) {
          const pick = links[Math.floor(time * 7 + car.roadIdx) % links.length];
          car.roadIdx = pick.roadIdx;
          dr = this.drivableRoads[car.roadIdx];
          car.dir = pick.atEnd ? -1 : 1;
          car.dist = pick.atEnd ? dr.totalLen : 0;
        } else {
          car.dir = car.dir === 1 ? -1 : 1;
          car.dist = THREE.MathUtils.clamp(car.dist, 0, dr.totalLen);
        }
      }

      const nextSample = sampleRoad(dr, car.dist);
      const wx = nextSample.x + nextSample.nx * car.dir * laneOffset;
      const wz = nextSample.z + nextSample.nz * car.dir * laneOffset;
      const fwdX = nextSample.tx * car.dir;
      const fwdZ = nextSample.tz * car.dir;
      const wy = groundAt?.(wx, wz) ?? 0;
      const hover = car.role === 'gift_sleigh' ? 0.08 * Math.sin(time * 3.1 + car.phase) : 0;
      const aheadY = groundAt?.(wx + fwdX * 1.8, wz + fwdZ * 1.8) ?? wy;
      const behindY = groundAt?.(wx - fwdX * 1.8, wz - fwdZ * 1.8) ?? wy;
      const pitch = Math.atan2(aheadY - behindY, 3.6);

      car.group.position.set(wx, wy + hover, wz);
      car.group.rotation.order = 'YXZ';
      car.group.rotation.y = Math.atan2(fwdX, fwdZ);
      car.group.rotation.x = -pitch;
    }

    for (const walker of this.walkers) {
      if (!walker.group.visible) continue;
      const dr = this.drivableRoads[walker.roadIdx];
      if (!dr) continue;
      const cur = sampleRoad(dr, walker.dist);
      const vergeOffset = dr.road.widthM * 0.5 + 1.45;
      const wx = cur.x + cur.nx * walker.side * vergeOffset;
      const wz = cur.z + cur.nz * walker.side * vergeOffset;
      const dPlayer = Math.hypot(wx - playerPos.x, wz - playerPos.z);

      const moveSpeed = dPlayer < 8 ? 0.15 : walker.speed;
      walker.dist += walker.dir * moveSpeed * dt;
      if (walker.dist >= dr.totalLen - 3 || walker.dist <= 3) {
        walker.dir = walker.dir === 1 ? -1 : 1;
        walker.dist = THREE.MathUtils.clamp(walker.dist, 3, dr.totalLen - 3);
      }

      const next = sampleRoad(dr, walker.dist);
      const px = next.x + next.nx * walker.side * vergeOffset;
      const pz = next.z + next.nz * walker.side * vergeOffset;
      const py = groundAt?.(px, pz) ?? 0;
      const bob = Math.abs(Math.sin(time * 5.2 + walker.phase)) * 0.07;

      walker.group.position.set(px, py + bob, pz);
      walker.group.rotation.y = Math.atan2(next.tx * walker.dir, next.tz * walker.dir);
      if (walker.optimusHandle) {
        walker.optimusHandle.update(time + walker.phase);
      }
      if (walker.dog) {
        walker.dog.position.y = Math.abs(Math.sin(time * 9.5 + walker.phase)) * 0.09;
      }
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
    this.pedBodyGeo.dispose();
    this.pedHeadGeo.dispose();
    this.pedHatGeo.dispose();
    this.lanternGeo.dispose();
    this.dogBodyGeo.dispose();
    this.sleighRedMat.dispose();
    this.sleighGoldMat.dispose();
    this.sleighLampMat.dispose();
    this.sleighTailMat.dispose();
    this.giftMats.forEach(m => m.dispose());
    this.pedSkinMat.dispose();
    this.pedLanternMat.dispose();
    this.beamMat.dispose();
    this.aoShadowMat.dispose();
    this.coatMats.forEach(m => m.dispose());
    this.dogMats.forEach(m => m.dispose());
  }
}
