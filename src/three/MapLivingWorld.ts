import * as THREE from 'three';
import type { GraphicsQuality } from '../core/environment';
import type { OsmPoint2D, OsmRoadRibbon, OsmWorldState } from '../core/osmWorld';
import type { TelemetryFrame } from '../core/telemetry';
import type { ChristmasMapData } from './ChristmasMap';
import { pointAlongStreet } from './mappedRoads';
import { createSparklingSnowMaterial, getSoftGlowTexture } from './pixarMaterials';
import {
  createHolidayRoadSign,
  createPixarSnowman,
  createSwedishRoadSign,
  type HolidayRoadSignHandle,
  type SwedishRoadSignHandle,
} from './pixarModels';
import { createPixarForestAnimal, type PixarAnimalHandle, type WildlifeKind } from './pixarWildlife';

export interface LivingGiftTarget {
  x: number;
  y: number;
  z: number;
  kind: 'town_tree' | 'snowman';
  bonusGifts: number;
  lightUp: () => void;
}

interface SkaterNode {
  group: THREE.Group;
  phase: number;
}

interface CrownSnowman {
  group: THREE.Group;
  crown: THREE.Group;
  broomArm: THREE.Mesh;
  halo: THREE.Sprite;
  side: -1 | 1;
  placed: boolean;
  crowned: boolean;
  bounceTimer: number;
}

export class MapLivingWorld {
  readonly group = new THREE.Group();

  private readonly onTownTreeLit?: () => void;

  // 1. Frozen Lake Ice Skaters on real OSM lakes
  private readonly skateGroup = new THREE.Group();
  private readonly skaters: SkaterNode[] = [];

  // 2. Dynamic Forest Wildlife & Ornament Moose placed on real woodland clearings
  private readonly wildlifeGroup = new THREE.Group();
  private animals: PixarAnimalHandle[] = [];
  private readonly mooseGroup = new THREE.Group();
  private readonly mooseHeadPivot = new THREE.Group();
  private builtVersion?: number;

  // 3. Swooping White Snowy Owl
  private readonly owlGroup = new THREE.Group();
  private readonly owlWingL: THREE.Mesh;
  private readonly owlWingR: THREE.Mesh;
  private owlCycleT = 4.0;

  // 4. Giant 15m Town Tree (anchors to clear village spaces ahead)
  private readonly townTreeGroup = new THREE.Group();
  private townTreePlaced = false;
  private townTreeLit = false;
  private townTreeLitLevel = 0.14;
  private readonly townTreeBulbs: THREE.MeshBasicMaterial[] = [];
  private readonly townTreeStar: THREE.Mesh;
  private readonly townTreeHalo: THREE.Sprite;

  // 5. Interactive Crownable Snowmen
  private readonly snowmen: CrownSnowman[] = [];

  // 6. Authentic Road Signs along mapped street shoulders
  private readonly swedishSign: SwedishRoadSignHandle;
  private swedishSignPlaced = false;
  private readonly holidaySign: HolidayRoadSignHandle;
  private holidaySignPlaced = false;

  constructor(onTownTreeLit?: () => void) {
    this.onTownTreeLit = onTownTreeLit;
    const glowTex = getSoftGlowTexture();

    // --- 1. Ice Skaters ---
    const rinkLightMat = new THREE.MeshBasicMaterial({ color: '#ffde82', toneMapped: false });
    const skatePostMat = new THREE.MeshStandardMaterial({ color: '#3b2418', roughness: 0.85 });
    for (const pz of [-8, 8]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 3.6, 7), skatePostMat);
      post.position.set(0, 1.8, pz);
      this.skateGroup.add(post);
    }
    for (let i = -3; i <= 3; i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.11, 6, 6), rinkLightMat);
      b.position.set(0, 3.3 - Math.cos((i / 3) * 1.1) * 0.45, i * 2.2);
      this.skateGroup.add(b);
    }
    const scarfColors = ['#e01b3a', '#1d8c5a', '#f2b830'];
    for (let i = 0; i < 3; i++) {
      const sg = new THREE.Group();
      const coat = new THREE.Mesh(
        new THREE.ConeGeometry(0.28, 1.05, 8),
        new THREE.MeshStandardMaterial({ color: i === 1 ? '#28529e' : '#7b1a2c', roughness: 0.75 })
      );
      coat.position.y = 0.62;
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 8, 8),
        new THREE.MeshStandardMaterial({ color: '#f7cbb2', roughness: 0.6 })
      );
      head.position.y = 1.24;
      const hat = new THREE.Mesh(
        new THREE.ConeGeometry(0.15, 0.34, 8),
        new THREE.MeshStandardMaterial({ color: scarfColors[i], roughness: 0.65 })
      );
      hat.position.set(0, 1.44, 0);
      const scarf = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.08, 0.55),
        new THREE.MeshStandardMaterial({ color: scarfColors[i], roughness: 0.7 })
      );
      scarf.position.set(0, 1.08, -0.22);
      sg.add(coat, head, hat, scarf);
      this.skateGroup.add(sg);
      this.skaters.push({ group: sg, phase: i * 2.1 });
    }
    this.skateGroup.visible = false;
    this.group.add(this.skateGroup);

    // --- 2. Wildlife Container + Ornament-Antler Moose ---
    this.group.add(this.wildlifeGroup);

    const mooseBrown = new THREE.MeshPhysicalMaterial({ color: '#5c3824', roughness: 0.82, sheen: 0.3 });
    const mooseHorn = new THREE.MeshStandardMaterial({ color: '#e6cda6', roughness: 0.55 });
    const mTorso = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 1.1, 8, 12), mooseBrown);
    mTorso.rotation.x = Math.PI * 0.5;
    mTorso.position.y = 1.48;
    const mShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.48, 10, 10), mooseBrown);
    mShoulder.position.set(0, 1.65, -0.35);
    for (const [lx, lz] of [
      [-0.28, -0.45],
      [0.28, -0.45],
      [-0.28, 0.5],
      [0.28, 0.5],
    ]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 1.25, 7), mooseBrown);
      leg.position.set(lx, 0.62, lz);
      this.mooseGroup.add(leg);
    }
    this.mooseHeadPivot.position.set(0, 1.72, -0.58);
    const mHead = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.42, 6, 8), mooseBrown);
    mHead.rotation.x = Math.PI * 0.35;
    mHead.position.set(0, 0.14, -0.26);
    this.mooseHeadPivot.add(mHead);
    const baubleMatRed = new THREE.MeshPhysicalMaterial({ color: '#e31937', metalness: 0.65, roughness: 0.18 });
    const baubleMatGold = new THREE.MeshPhysicalMaterial({ color: '#ffd166', metalness: 0.78, roughness: 0.15 });
    for (const side of [-1, 1]) {
      const palm = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.32, 0.12), mooseHorn);
      palm.position.set(side * 0.48, 0.46, -0.15);
      palm.rotation.z = side * 0.42;
      palm.rotation.y = side * -0.25;
      const bauble = new THREE.Mesh(
        new THREE.SphereGeometry(0.085, 8, 8),
        side < 0 ? baubleMatRed : baubleMatGold
      );
      bauble.position.set(side * 0.62, 0.25, -0.18);
      this.mooseHeadPivot.add(palm, bauble);
    }
    this.mooseGroup.add(mTorso, mShoulder, this.mooseHeadPivot);
    this.mooseGroup.visible = false;
    this.group.add(this.mooseGroup);

    // --- 3. Swooping Snowy Owl ---
    const owlWhite = new THREE.MeshStandardMaterial({ color: '#f4f8ff', roughness: 0.65 });
    const owlBeak = new THREE.MeshStandardMaterial({ color: '#ffb838', roughness: 0.4 });
    const oBody = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), owlWhite);
    oBody.scale.set(0.9, 0.85, 1.35);
    const oHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), owlWhite);
    oHead.position.set(0, 0.14, -0.28);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 6), owlBeak);
    beak.rotation.x = -Math.PI * 0.5;
    beak.position.set(0, 0.1, -0.48);
    this.owlWingL = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.05, 0.36), owlWhite);
    this.owlWingL.position.set(-0.42, 0.08, 0);
    this.owlWingR = this.owlWingL.clone();
    this.owlWingR.position.x = 0.42;
    this.owlGroup.add(oBody, oHead, beak, this.owlWingL, this.owlWingR);
    this.owlGroup.visible = false;
    this.group.add(this.owlGroup);

    // --- 4. Giant 15m Town Tree ---
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.85, 2.4, 8),
      new THREE.MeshStandardMaterial({ color: '#3b2016', roughness: 0.9 })
    );
    trunk.position.y = 1.2;
    this.townTreeGroup.add(trunk);

    const spruceMat = new THREE.MeshPhysicalMaterial({
      color: '#0c362a',
      roughness: 0.78,
      sheen: 0.3,
      sheenColor: new THREE.Color('#286e58'),
    });
    const snowRoofMat = createSparklingSnowMaterial('#bed6f2');
    for (let t = 0; t < 7; t++) {
      const r = 4.2 - t * 0.52;
      const h = 3.0 - t * 0.2;
      const y = 2.5 + t * 1.65;
      const c = new THREE.Mesh(new THREE.ConeGeometry(r, h, 12), spruceMat);
      c.position.y = y;
      c.rotation.y = t * 0.55;
      const sc = new THREE.Mesh(new THREE.ConeGeometry(r * 0.78, h * 0.44, 12), snowRoofMat);
      sc.position.y = y + h * 0.3;
      sc.rotation.y = t * 0.55;
      this.townTreeGroup.add(c, sc);
    }
    const palette = ['#ffd468', '#ff3b4c', '#5ce6ff', '#ffe99e'];
    for (let i = 0; i < 32; i++) {
      const f = i / 32;
      const ang = i * 1.65;
      const y = 2.1 + f * 10.8;
      const rad = 3.65 * (1 - f * 0.84);
      const bm = new THREE.MeshBasicMaterial({ color: palette[i % palette.length], toneMapped: false });
      this.townTreeBulbs.push(bm);
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.19, 6, 6), bm);
      b.position.set(Math.cos(ang) * rad, y, Math.sin(ang) * rad);
      this.townTreeGroup.add(b);
    }
    this.townTreeStar = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.64, 0),
      new THREE.MeshBasicMaterial({ color: '#ffe888', toneMapped: false })
    );
    this.townTreeStar.position.y = 14.3;
    this.townTreeHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: '#ffd86b',
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.townTreeHalo.scale.set(15, 17, 1);
    this.townTreeHalo.position.y = 8.0;
    this.townTreeGroup.add(this.townTreeStar, this.townTreeHalo);
    this.townTreeGroup.visible = false;
    this.group.add(this.townTreeGroup);

    // --- 5. Interactive Crownable Snowmen ---
    const woodMat = new THREE.MeshStandardMaterial({ color: '#5c3322', roughness: 0.86 });
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#ffd966',
      metalness: 0.82,
      roughness: 0.18,
      emissive: '#8f5e00',
      emissiveIntensity: 0.65,
    });
    for (const side of [-1, 1] as const) {
      const sm = createPixarSnowman();
      sm.scale.setScalar(1.28);
      const broomArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 1.05, 6), woodMat);
      broomArm.position.set(0.45, 1.38, 0.08);
      broomArm.rotation.z = -0.7;
      sm.add(broomArm);

      const crown = new THREE.Group();
      crown.position.set(0, 2.22, 0);
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 6, 12), goldMat);
      band.rotation.x = Math.PI * 0.5;
      crown.add(band);
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 6), goldMat);
        tip.position.set(Math.cos(a) * 0.18, 0.11, Math.sin(a) * 0.18);
        crown.add(tip);
      }
      crown.visible = false;
      sm.add(crown);

      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: '#ffe07d',
          transparent: true,
          opacity: 0.08,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      halo.scale.set(4.2, 4.2, 1);
      halo.position.y = 1.6;
      sm.add(halo);

      sm.visible = false;
      this.group.add(sm);
      this.snowmen.push({
        group: sm,
        crown,
        broomArm,
        halo,
        side,
        placed: false,
        crowned: false,
        bounceTimer: 0,
      });
    }

    // --- 6. Authentic Road Signs ---
    this.swedishSign = createSwedishRoadSign();
    this.swedishSign.group.scale.setScalar(0.82);
    this.swedishSign.group.visible = false;
    this.group.add(this.swedishSign.group);

    this.holidaySign = createHolidayRoadSign();
    this.holidaySign.group.scale.setScalar(0.84);
    this.holidaySign.group.visible = false;
    this.group.add(this.holidaySign.group);
  }

  private clearWildlife(): void {
    this.wildlifeGroup.traverse(obj => {
      const m = obj as THREE.Mesh;
      if (m.geometry && !m.geometry.userData?.shared) m.geometry.dispose();
      const mat = m.material;
      const disposeMat = (x: THREE.Material) => {
        if (!x.userData?.shared) x.dispose();
      };
      if (Array.isArray(mat)) mat.forEach(disposeMat);
      else if (mat) disposeMat(mat);
    });
    this.wildlifeGroup.clear();
    this.animals = [];
  }

  private rebuildForSnapshot(mapData: ChristmasMapData, road: OsmRoadRibbon | undefined, center: THREE.Vector3, heading: number): void {
    const snap = mapData.snapshot;
    if (!snap || this.builtVersion === snap.version) return;
    this.builtVersion = snap.version;
    this.clearWildlife();
    this.townTreePlaced = false;
    this.townTreeGroup.visible = false;
    this.swedishSignPlaced = false;
    this.swedishSign.group.visible = false;
    this.holidaySignPlaced = false;
    this.holidaySign.group.visible = false;
    for (const sm of this.snowmen) {
      sm.placed = false;
      sm.group.visible = false;
    }

    const groundY = (x: number, z: number) => mapData.elevation?.(x, z) ?? 0;
    const clearance = mapData.clearance;

    // Populate forest animals in real OSM woodland clearings
    const spots: OsmPoint2D[] = [...mapData.woodlands];
    if (spots.length < 3 && (snap.biome === 'forest' || snap.biome === 'open') && road && clearance) {
      for (let i = 0; i < 6; i++) {
        const pt = pointAlongStreet(road, center, heading, 24 + i * 22);
        if (!pt) continue;
        const side = i % 2 === 0 ? 1 : -1;
        const lat = road.widthM * 0.5 + 6.5 + (i % 3) * 2.5;
        const cand = { x: pt.x + Math.cos(pt.heading) * side * lat, z: pt.z + Math.sin(pt.heading) * side * lat };
        if (clearance.clear(cand, 2.0)) spots.push(cand);
      }
    }

    const kinds: WildlifeKind[] = ['stag', 'fox', 'owl', 'rabbit', 'stag', 'fox'];
    let moosePlaced = false;
    spots.slice(0, 7).forEach((spot, idx) => {
      const street = clearance?.nearestStreet(spot);
      const yaw = street ? Math.atan2(street.x - spot.x, street.z - spot.z) : 0;
      if (!moosePlaced && idx === spots.length - 1 && (snap.biome === 'forest' || snap.biome === 'open')) {
        moosePlaced = true;
        this.mooseGroup.position.set(spot.x, groundY(spot.x, spot.z), spot.z);
        this.mooseGroup.rotation.y = yaw + 0.35;
        this.mooseGroup.visible = true;
        return;
      }
      const kind = kinds[idx % kinds.length];
      const animal = createPixarForestAnimal(kind, idx + 1);
      const scale = kind === 'stag' ? 1.15 : kind === 'fox' || kind === 'owl' ? 1.25 : 1.35;
      animal.group.scale.setScalar(scale);
      animal.group.position.set(spot.x, groundY(spot.x, spot.z), spot.z);
      animal.group.rotation.y = yaw;
      this.wildlifeGroup.add(animal.group);
      this.animals.push(animal);
    });
    if (!moosePlaced) this.mooseGroup.visible = false;
  }

  private tryPlaceAlongStreet(
    road: OsmRoadRibbon,
    center: THREE.Vector3,
    heading: number,
    distAhead: number,
    side: -1 | 1,
    extraLateral: number,
    radius: number,
    mapData: ChristmasMapData
  ): { x: number; y: number; z: number; heading: number } | undefined {
    const clearance = mapData.clearance;
    if (!clearance) return undefined;
    for (const d of [distAhead, distAhead + 18, distAhead + 34, distAhead - 12]) {
      if (d < 16) continue;
      const pt = pointAlongStreet(road, center, heading, d);
      if (!pt) continue;
      for (const s of [side, -side as -1 | 1]) {
        const offset = road.widthM * 0.5 + extraLateral;
        const x = pt.x + Math.cos(pt.heading) * s * offset;
        const z = pt.z + Math.sin(pt.heading) * s * offset;
        if (clearance.clear({ x, z }, radius)) {
          return { x, y: mapData.elevation?.(x, z) ?? 0, z, heading: pt.heading };
        }
      }
    }
    return undefined;
  }

  getInteractiveTargets(center: THREE.Vector3, heading: number): LivingGiftTarget[] {
    const out: LivingGiftTarget[] = [];
    const east = Math.sin(heading), north = Math.cos(heading);
    if (this.townTreeGroup.visible && !this.townTreeLit) {
      const dx = this.townTreeGroup.position.x - center.x;
      const dz = this.townTreeGroup.position.z - center.z;
      const ahead = dx * east - dz * north;
      if (ahead > 7 && Math.hypot(dx, dz) < 110) {
        out.push({
          x: this.townTreeGroup.position.x,
          y: this.townTreeGroup.position.y + 8.5,
          z: this.townTreeGroup.position.z,
          kind: 'town_tree',
          bonusGifts: 5,
          lightUp: () => {
            this.townTreeLit = true;
            this.townTreeLitLevel = 1.0;
            this.onTownTreeLit?.();
          },
        });
      }
    }
    for (const sm of this.snowmen) {
      if (!sm.group.visible || sm.crowned) continue;
      const dx = sm.group.position.x - center.x;
      const dz = sm.group.position.z - center.z;
      const ahead = dx * east - dz * north;
      if (ahead > 6 && Math.hypot(dx, dz) < 95) {
        out.push({
          x: sm.group.position.x,
          y: sm.group.position.y + 2.2,
          z: sm.group.position.z,
          kind: 'snowman',
          bonusGifts: 2,
          lightUp: () => {
            sm.crowned = true;
            sm.crown.visible = true;
            sm.bounceTimer = 2.6;
          },
        });
      }
    }
    return out;
  }

  update(
    dt: number,
    time: number,
    frame: TelemetryFrame,
    osm: OsmWorldState,
    mapData: ChristmasMapData,
    road: OsmRoadRibbon | undefined,
    center: THREE.Vector3,
    heading: number,
    quality: GraphicsQuality,
    sleighAlert: number
  ): void {
    this.rebuildForSnapshot(mapData, road, center, heading);
    const east = Math.sin(heading), north = Math.cos(heading);
    const aheadDist = (p: THREE.Vector3) => (p.x - center.x) * east - (p.z - center.z) * north;
    const groundY = (x: number, z: number) => mapData.elevation?.(x, z) ?? 0;

    // 1. Ice Skaters on closest real OSM polygon lake
    let nearestLake: { x: number; z: number; radius: number } | undefined;
    let bestLakeDist = 175 * 175;
    for (const lake of mapData.lakes) {
      const d2 = (lake.x - center.x) ** 2 + (lake.z - center.z) ** 2;
      if (d2 < bestLakeDist) {
        bestLakeDist = d2;
        nearestLake = lake;
      }
    }
    this.skateGroup.visible = !!nearestLake;
    if (nearestLake) {
      this.skateGroup.position.set(nearestLake.x, groundY(nearestLake.x, nearestLake.z) + 0.04, nearestLake.z);
      const r = Math.min(4.8, nearestLake.radius * 0.62);
      for (const sk of this.skaters) {
        const ang = time * 0.95 + sk.phase;
        sk.group.position.set(Math.sin(ang) * r, Math.abs(Math.sin(ang * 4)) * 0.05, Math.sin(ang * 2) * r * 1.1);
        sk.group.rotation.y = Math.atan2(Math.cos(ang) * r, Math.cos(ang * 2) * r * 2.2);
        sk.group.rotation.z = Math.sin(ang * 2) * 0.14;
      }
    }

    // 2. Wildlife & Ornament Moose animations
    for (const anim of this.animals) {
      anim.update(dt, time, sleighAlert);
    }
    if (this.mooseGroup.visible) {
      this.mooseHeadPivot.rotation.y = Math.sin(time * 1.1) * 0.35;
    }

    // 3. Swooping White Snowy Owl
    this.owlCycleT = (this.owlCycleT + dt) % 18;
    if (this.owlCycleT < 4.2 && quality === 'ultra' && osm.enabled) {
      const p = this.owlCycleT / 4.2;
      const ahead = THREE.MathUtils.lerp(28, 62, p);
      const lat = THREE.MathUtils.lerp(7.5, -16.5, p);
      this.owlGroup.visible = true;
      this.owlGroup.position.set(
        center.x + east * ahead + north * lat,
        center.y + 5.2 + Math.sin(p * Math.PI) * 5.0 + p * 3.0,
        center.z - north * ahead + east * lat
      );
      this.owlGroup.rotation.y = -heading + 0.72;
      const flap = Math.sin(time * 15) * 0.65;
      this.owlWingL.rotation.z = flap;
      this.owlWingR.rotation.z = -flap;
    } else {
      this.owlGroup.visible = false;
    }

    // 4. Giant 15m Town Tree (anchors ahead on clear village/town spot, recycles once behind)
    if (this.townTreePlaced && (aheadDist(this.townTreeGroup.position) < -24 || this.townTreeGroup.position.distanceTo(center) > 170)) {
      this.townTreePlaced = false;
    }
    if (!this.townTreePlaced && road) {
      const spot = this.tryPlaceAlongStreet(road, center, heading, 64, -1, 6.2, 4.4, mapData);
      if (spot) {
        this.townTreeGroup.position.set(spot.x, spot.y, spot.z);
        this.townTreePlaced = true;
        this.townTreeLit = false;
        this.townTreeLitLevel = 0.14;
      }
    }
    this.townTreeGroup.visible = this.townTreePlaced;
    if (this.townTreeGroup.visible) {
      const targetLvl = this.townTreeLit ? 1.0 : 0.34;
      this.townTreeLitLevel += (targetLvl - this.townTreeLitLevel) * Math.min(1, dt * 6);
      const lvl = this.townTreeLitLevel;
      this.townTreeBulbs.forEach((bm, idx) => {
        const tw = 0.72 + 0.28 * Math.sin(time * 5 + idx);
        const a = lvl * tw;
        if (idx % 4 === 0) bm.color.setRGB(1.4 * a, 1.15 * a, 0.45 * a);
        else if (idx % 4 === 1) bm.color.setRGB(1.4 * a, 0.2 * a, 0.28 * a);
        else if (idx % 4 === 2) bm.color.setRGB(0.35 * a, 1.2 * a, 1.45 * a);
        else bm.color.setRGB(1.4 * a, 1.3 * a, 0.85 * a);
      });
      this.townTreeStar.rotation.y = time * (this.townTreeLit ? 2.4 : 0.6);
      this.townTreeStar.scale.setScalar(0.85 + lvl * 0.55);
      this.townTreeHalo.material.opacity = 0.08 + lvl * 0.62;
    }

    // 5. Interactive Crownable Snowmen
    for (const [idx, sm] of this.snowmen.entries()) {
      if (sm.placed && (aheadDist(sm.group.position) < -20 || sm.group.position.distanceTo(center) > 150)) {
        sm.placed = false;
      }
      if (!sm.placed && road) {
        const spot = this.tryPlaceAlongStreet(road, center, heading, 34 + idx * 36, sm.side, 2.3, 1.4, mapData);
        if (spot) {
          sm.group.position.set(spot.x, spot.y, spot.z);
          sm.group.rotation.y = -spot.heading + (sm.side < 0 ? 0.55 : -0.55);
          sm.placed = true;
          sm.crowned = false;
          sm.crown.visible = false;
          sm.bounceTimer = 0;
        }
      }
      sm.group.visible = sm.placed;
      if (!sm.placed) continue;
      if (sm.bounceTimer > 0) sm.bounceTimer = Math.max(0, sm.bounceTimer - dt);
      const baseY = groundY(sm.group.position.x, sm.group.position.z);
      sm.group.position.y = baseY + (sm.bounceTimer > 0 ? Math.abs(Math.sin(sm.bounceTimer * 9)) * 0.65 : 0);
      sm.broomArm.rotation.z = -0.65 + Math.sin(time * (sm.crowned ? 9 : 3.5) + sm.side) * 0.32;
      sm.halo.material.opacity = sm.crowned ? 0.65 : 0.08;
      if (sm.crowned) sm.crown.rotation.y = time * 1.8;
    }

    // 6. Swedish Trafikverket & Carved Holiday Road Signs
    const roadLabel = road?.name || osm.roadName || 'Vinterväg';
    const placeLabel = osm.placeName || 'Vintervärlden';
    this.swedishSign.setDirections(frame.northPoleDistanceKm, placeLabel, roadLabel);
    this.holidaySign.setText(`GOD JUL, ${placeLabel.toUpperCase()}`, osm.nearbyLandmark || osm.nearbyChargerName || roadLabel);

    if (this.swedishSignPlaced && (aheadDist(this.swedishSign.group.position) < -14 || this.swedishSign.group.position.distanceTo(center) > 160)) {
      this.swedishSignPlaced = false;
    }
    if (!this.swedishSignPlaced && road) {
      const spot = this.tryPlaceAlongStreet(road, center, heading, 44, -1, 2.5, 1.1, mapData);
      if (spot) {
        this.swedishSign.group.position.set(spot.x, spot.y, spot.z);
        this.swedishSign.group.rotation.y = -spot.heading + 0.24;
        this.swedishSignPlaced = true;
      }
    }
    this.swedishSign.group.visible = this.swedishSignPlaced;

    if (this.holidaySignPlaced && (aheadDist(this.holidaySign.group.position) < -14 || this.holidaySign.group.position.distanceTo(center) > 160)) {
      this.holidaySignPlaced = false;
    }
    if (!this.holidaySignPlaced && road) {
      const spot = this.tryPlaceAlongStreet(road, center, heading, 72, 1, 2.4, 1.1, mapData);
      if (spot) {
        this.holidaySign.group.position.set(spot.x, spot.y, spot.z);
        this.holidaySign.group.rotation.y = -spot.heading - 0.34;
        this.holidaySignPlaced = true;
      }
    }
    this.holidaySign.group.visible = this.holidaySignPlaced;
  }

  dispose(): void {
    this.clearWildlife();
    this.group.traverse(obj => {
      const m = obj as THREE.Mesh;
      if (m.geometry && !m.geometry.userData?.shared) m.geometry.dispose();
      const mat = m.material;
      const disposeMat = (x: THREE.Material) => {
        if (!x.userData?.shared) {
          const std = x as THREE.MeshStandardMaterial;
          std.map?.dispose();
          std.emissiveMap?.dispose();
          x.dispose();
        }
      };
      if (Array.isArray(mat)) mat.forEach(disposeMat);
      else if (mat) disposeMat(mat);
    });
  }
}
