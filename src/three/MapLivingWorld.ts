import * as THREE from 'three';
import type { GraphicsQuality } from '../core/environment';
import type { OsmPoint2D, OsmRoadRibbon, OsmWorldState } from '../core/osmWorld';
import type { TelemetryFrame } from '../core/telemetry';
import type { ChristmasMapData } from './ChristmasMap';
import { pointAlongStreet } from './mappedRoads';
import { createSparklingSnowMaterial, getSoftGlowTexture } from './pixarMaterials';
import {
  createMagicalFloatingSign,
  createPixarSnowman,
  type MagicalFloatingSignHandle,
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

const TOWN_TREE_BULB_COUNT = 48;
const WILDLIFE_CULL_DIST_SQ = 110 * 110;
const WILDLIFE_CULL_BEHIND = -18;
const _tmpBulbMat = new THREE.Matrix4();
const _tmpBulbCol = new THREE.Color();

function dampAngle(current: number, target: number, lambda: number, dt: number): number {
  const delta = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + delta * (1 - Math.exp(-lambda * dt));
}

interface RoamingCritter {
  id: string;
  handle: PixarAnimalHandle;
  anchorX: number;
  anchorZ: number;
  x: number;
  z: number;
  targetX: number;
  targetZ: number;
  yaw: number;
  radius: number;
  speed: number;
  phase: number;
  state: 'wander' | 'pause';
  stateTimer: number;
  wanderStep: number;
}

interface PlacedWildAnimal {
  handle: PixarAnimalHandle;
  x: number;
  z: number;
  baseYaw: number;
  placed: boolean;
}

export class MapLivingWorld {
  readonly group = new THREE.Group();

  private readonly onTownTreeLit?: () => void;

  // 1. Frozen Lake Ice Skaters on real OSM lakes
  private readonly skateGroup = new THREE.Group();
  private readonly skaters: SkaterNode[] = [];

  // 2. Dynamic Forest Wildlife & Ornament Moose placed on real woodland clearings
  private readonly wildlifeGroup = new THREE.Group();
  private wildlifePooled = false;
  private holidayPool: PixarAnimalHandle[] = [];
  private wildPool: PixarAnimalHandle[] = [];
  private roamingCritters: RoamingCritter[] = [];
  private placedWild: PlacedWildAnimal[] = [];
  private readonly mooseGroup = new THREE.Group();
  private readonly mooseHeadPivot = new THREE.Group();
  private moosePlaced = false;
  private mooseX = 0;
  private mooseZ = 0;
  private builtVersion?: number;

  // 3. Swooping White Snowy Owl (sculpted feathered wings, enabled on all quality tiers)
  private readonly owlGroup = new THREE.Group();
  private readonly owlWingL = new THREE.Group();
  private readonly owlWingR = new THREE.Group();
  private readonly owlTipL = new THREE.Group();
  private readonly owlTipR = new THREE.Group();
  private owlCycleT = 4.0;

  // 4. Giant 15m Town Tree (anchors to clear village spaces ahead)
  private readonly townTreeGroup = new THREE.Group();
  private townTreePlaced = false;
  private townTreeLit = false;
  private townTreeLitLevel = 0.14;
  private readonly townTreeBulbInst: THREE.InstancedMesh;
  private readonly townTreeGroundGlow: THREE.Mesh;
  private readonly townTreeStar: THREE.Mesh;
  private readonly townTreeHalo: THREE.Sprite;

  // 5. Interactive Crownable Snowmen
  private readonly snowmen: CrownSnowman[] = [];

  // 6. Rarer Magical Floating Holiday Sign along mapped street shoulders
  private readonly magicalSign: MagicalFloatingSignHandle;
  private magicalSignPlaced = false;
  private signCooldownM = 18;
  private lastSignPos = new THREE.Vector3();

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

    // --- 2. Wildlife Container + Sculpted Ornament-Antler Moose ---
    this.group.add(this.wildlifeGroup);

    const mooseBrown = new THREE.MeshPhysicalMaterial({ color: '#5c3824', roughness: 0.82, sheen: 0.35 });
    const mooseSnoutMat = new THREE.MeshPhysicalMaterial({ color: '#452819', roughness: 0.78 });
    const mooseHorn = new THREE.MeshStandardMaterial({ color: '#e6cda6', roughness: 0.52 });
    const mooseDark = new THREE.MeshPhysicalMaterial({ color: '#14151c', roughness: 0.12, clearcoat: 0.95 });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    const mTorso = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 1.1, 8, 12), mooseBrown);
    mTorso.rotation.x = Math.PI * 0.5;
    mTorso.position.y = 1.48;
    const mShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.48, 10, 10), mooseBrown);
    mShoulder.position.set(0, 1.65, -0.35);
    const legGeo = new THREE.CylinderGeometry(0.08, 0.06, 1.25, 7);
    const hoofGeo = new THREE.CylinderGeometry(0.065, 0.075, 0.1, 7);
    for (const [lx, lz] of [
      [-0.28, -0.45],
      [0.28, -0.45],
      [-0.28, 0.5],
      [0.28, 0.5],
    ]) {
      const leg = new THREE.Mesh(legGeo, mooseBrown);
      leg.position.set(lx, 0.62, lz);
      const hoof = new THREE.Mesh(hoofGeo, mooseDark);
      hoof.position.set(lx, 0.05, lz);
      this.mooseGroup.add(leg, hoof);
    }
    this.mooseHeadPivot.position.set(0, 1.72, -0.58);
    const mHead = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.42, 6, 8), mooseBrown);
    mHead.rotation.x = Math.PI * 0.35;
    mHead.position.set(0, 0.14, -0.26);
    const mBell = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), mooseSnoutMat);
    mBell.scale.set(0.7, 1.4, 0.8);
    mBell.position.set(0, -0.05, -0.15);
    const mMuzzle = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), mooseSnoutMat);
    mMuzzle.scale.set(0.95, 0.85, 1.25);
    mMuzzle.position.set(0, 0.06, -0.52);
    this.mooseHeadPivot.add(mHead, mBell, mMuzzle);
    const baubleMatRed = new THREE.MeshPhysicalMaterial({ color: '#e31937', metalness: 0.65, roughness: 0.18 });
    const baubleMatGold = new THREE.MeshPhysicalMaterial({ color: '#ffd166', metalness: 0.78, roughness: 0.15 });
    const eyeGeo = new THREE.SphereGeometry(0.044, 8, 8);
    const glintGeo = new THREE.SphereGeometry(0.015, 6, 6);
    const earGeo = new THREE.ConeGeometry(0.065, 0.22, 6);
    const baubleGeo = new THREE.SphereGeometry(0.085, 8, 8);
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(eyeGeo, mooseDark);
      eye.position.set(side * 0.15, 0.24, -0.32);
      const glint = new THREE.Mesh(glintGeo, catchlightMat);
      glint.position.set(side * 0.015, 0.014, -0.034);
      eye.add(glint);
      const ear = new THREE.Mesh(earGeo, mooseBrown);
      ear.position.set(side * 0.22, 0.34, -0.14);
      ear.rotation.z = side * -1.05;
      this.mooseHeadPivot.add(eye, ear);

      // Sculpted organic curved palmate antler beam + 4 branching tines
      const mainBeam = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.12, 0.34, -0.16),
        new THREE.Vector3(side * 0.38, 0.44, -0.14),
        new THREE.Vector3(side * 0.68, 0.62, -0.10),
        new THREE.Vector3(side * 0.88, 0.78, -0.02),
      ]);
      this.mooseHeadPivot.add(new THREE.Mesh(new THREE.TubeGeometry(mainBeam, 12, 0.045, 6, false), mooseHorn));

      const palmCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.34, 0.44, -0.14),
        new THREE.Vector3(side * 0.58, 0.56, -0.22),
        new THREE.Vector3(side * 0.78, 0.70, -0.18),
      ]);
      this.mooseHeadPivot.add(new THREE.Mesh(new THREE.TubeGeometry(palmCurve, 8, 0.055, 6, false), mooseHorn));

      const tineSpecs: Array<[number, number, number, number, number, number]> = [
        [0.44, 0.48, -0.18, 0.46, 0.72, -0.30],
        [0.58, 0.56, -0.18, 0.64, 0.86, -0.26],
        [0.72, 0.66, -0.12, 0.82, 0.94, -0.18],
        [0.82, 0.74, -0.06, 0.96, 0.98, -0.02],
      ];
      for (const [x0, y0, z0, x1, y1, z1] of tineSpecs) {
        const tineCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * x0, y0, z0),
          new THREE.Vector3(side * ((x0 + x1) * 0.5), (y0 + y1) * 0.5 + 0.04, (z0 + z1) * 0.5),
          new THREE.Vector3(side * x1, y1, z1),
        ]);
        this.mooseHeadPivot.add(new THREE.Mesh(new THREE.TubeGeometry(tineCurve, 6, 0.024, 5, false), mooseHorn));
      }

      const bauble = new THREE.Mesh(baubleGeo, side < 0 ? baubleMatRed : baubleMatGold);
      bauble.position.set(side * 0.66, 0.38, -0.18);
      this.mooseHeadPivot.add(bauble);
    }
    this.mooseGroup.add(mTorso, mShoulder, this.mooseHeadPivot);
    this.mooseGroup.visible = false;
    this.group.add(this.mooseGroup);

    // --- 3. Swooping White Snowy Owl (Sculpted Articulated Feathered Wings) ---
    const owlWhite = new THREE.MeshPhysicalMaterial({ color: '#f4f8ff', roughness: 0.62, sheen: 0.55 });
    const owlFeatherTip = new THREE.MeshStandardMaterial({ color: '#d4dfef', roughness: 0.72 });
    const owlBeak = new THREE.MeshStandardMaterial({ color: '#ffb838', roughness: 0.4 });
    const owlIrisMat = new THREE.MeshBasicMaterial({ color: '#ffcf48', toneMapped: false });
    const oBody = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), owlWhite);
    oBody.scale.set(0.88, 0.82, 1.45);
    const oHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), owlWhite);
    oHead.position.set(0, 0.14, -0.32);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.048, 0.13, 6), owlBeak);
    beak.rotation.x = -Math.PI * 0.5;
    beak.position.set(0, 0.1, -0.52);
    for (const side of [-1, 1]) {
      const oEye = new THREE.Mesh(new THREE.SphereGeometry(0.042, 8, 8), owlIrisMat);
      oEye.position.set(side * 0.09, 0.17, -0.47);
      const oPupil = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), mooseDark);
      oPupil.position.set(0, 0, -0.028);
      oEye.add(oPupil);
      this.owlGroup.add(oEye);
    }
    // Fanned tail feathers
    const tailShape = new THREE.Shape();
    tailShape.moveTo(-0.08, 0);
    tailShape.lineTo(-0.24, 0.48);
    tailShape.quadraticCurveTo(0, 0.58, 0.24, 0.48);
    tailShape.lineTo(0.08, 0);
    tailShape.closePath();
    const tailGeo = new THREE.ExtrudeGeometry(tailShape, { depth: 0.025, bevelEnabled: false });
    tailGeo.rotateX(Math.PI * 0.5);
    const oTail = new THREE.Mesh(tailGeo, owlFeatherTip);
    oTail.position.set(0, 0.02, 0.28);
    this.owlGroup.add(oTail);

    // Sculpted airfoil inner wing + tapered feathered primary wingtip
    const buildWingShape = (span: number, rootChord: number, tipChord: number): THREE.BufferGeometry => {
      const s = new THREE.Shape();
      s.moveTo(0, -rootChord * 0.5);
      s.quadraticCurveTo(span * 0.5, -rootChord * 0.55, span, -tipChord * 0.42);
      s.quadraticCurveTo(span * 1.08, 0, span, tipChord * 0.55);
      s.quadraticCurveTo(span * 0.5, rootChord * 0.52, 0, rootChord * 0.45);
      s.closePath();
      const g = new THREE.ExtrudeGeometry(s, { depth: 0.032, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 });
      g.rotateX(Math.PI * 0.5);
      return g;
    };
    const innerWingGeo = buildWingShape(0.62, 0.42, 0.34);
    const outerWingGeo = buildWingShape(0.56, 0.34, 0.14);

    const innerMeshR = new THREE.Mesh(innerWingGeo, owlWhite);
    this.owlWingR.position.set(0.14, 0.08, -0.04);
    this.owlWingR.add(innerMeshR);
    this.owlTipR.position.set(0.60, 0, 0.02);
    this.owlTipR.add(new THREE.Mesh(outerWingGeo, owlFeatherTip));
    this.owlWingR.add(this.owlTipR);

    const innerMeshL = new THREE.Mesh(innerWingGeo, owlWhite);
    innerMeshL.scale.x = -1;
    this.owlWingL.position.set(-0.14, 0.08, -0.04);
    this.owlWingL.add(innerMeshL);
    const outerMeshL = new THREE.Mesh(outerWingGeo, owlFeatherTip);
    outerMeshL.scale.x = -1;
    this.owlTipL.position.set(-0.60, 0, 0.02);
    this.owlTipL.add(outerMeshL);
    this.owlWingL.add(this.owlTipL);

    this.owlGroup.add(oBody, oHead, beak, this.owlWingL, this.owlWingR);
    this.owlGroup.visible = false;
    this.group.add(this.owlGroup);

    // --- 4. Giant 15m Organic Pixar Spruce Tree (Multi-tier sculpted drooping boughs + helical garland) ---
    const skirt = new THREE.Mesh(
      new THREE.CylinderGeometry(2.8, 3.6, 0.22, 24),
      new THREE.MeshStandardMaterial({ color: '#9c172e', roughness: 0.85 })
    );
    skirt.position.y = 0.11;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.92, 3.0, 12),
      new THREE.MeshStandardMaterial({ color: '#3b2016', roughness: 0.9 })
    );
    trunk.position.y = 1.5;
    this.townTreeGroup.add(skirt, trunk);

    const buildBoughTier = (snowCap: boolean): THREE.BufferGeometry => {
      const pos: number[] = [];
      const uvs: number[] = [];
      const idx: number[] = [];
      const segs = 36;
      const rings = snowCap
        ? [{ y: 0.14, r: 0.96 }, { y: 0.34, r: 0.84 }, { y: 0.68, r: 0.45 }, { y: 0.98, r: 0.03 }]
        : [{ y: 0.0, r: 0.20 }, { y: 0.06, r: 1.02 }, { y: 0.32, r: 0.85 }, { y: 0.66, r: 0.44 }, { y: 1.0, r: 0.025 }];
      rings.forEach(({ y, r }, rIdx) => {
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          const boughLobe =
            Math.cos(a * 9 + Math.sin(a * 3) * 0.6) * 0.18 +
            Math.sin(a * 18 + y * 2.2) * 0.07;
          const droop = (1 - y) * Math.abs(boughLobe) * (snowCap ? 0.32 : 0.42);
          const rad = r * (1 + boughLobe * (1 - y * 0.72));
          pos.push(Math.cos(a) * rad, y - droop, Math.sin(a) * rad);
          uvs.push(i / segs, y);
          if (rIdx > 0 && i < segs) {
            const k = rIdx * (segs + 1) + i;
            idx.push(k - segs - 1, k, k + 1, k - segs - 1, k + 1, k - segs);
          }
        }
      });
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      g.setIndex(idx);
      g.computeVertexNormals();
      return g;
    };

    const organicSpruceGeo = buildBoughTier(false);
    const organicSnowGeo = buildBoughTier(true);
    const spruceMat = new THREE.MeshPhysicalMaterial({
      color: '#0e4232',
      roughness: 0.76,
      sheen: 0.45,
      sheenColor: new THREE.Color('#2c8c68'),
    });
    const snowRoofMat = createSparklingSnowMaterial('#cce2fc');
    for (let t = 0; t < 11; t++) {
      const frac = t / 10;
      const r = 4.35 * (1 - frac * 0.79);
      const h = 2.45 - frac * 0.85;
      const y = 2.0 + frac * 9.8;
      const c = new THREE.Mesh(organicSpruceGeo, spruceMat);
      c.scale.set(r, h, r);
      c.position.y = y;
      c.rotation.y = t * 0.62;
      const sc = new THREE.Mesh(organicSnowGeo, snowRoofMat);
      sc.scale.set(r * 0.94, h * 0.86, r * 0.94);
      sc.position.y = y + 0.14;
      sc.rotation.y = t * 0.62;
      this.townTreeGroup.add(c, sc);
    }

    // Helical golden light garland spiraling up the tree
    const garlandPts: THREE.Vector3[] = [];
    for (let s = 0; s <= 90; s++) {
      const f = s / 90;
      const ang = f * Math.PI * 10;
      const rad = THREE.MathUtils.lerp(4.05, 0.45, f);
      garlandPts.push(new THREE.Vector3(Math.cos(ang) * rad, 2.2 + f * 10.6, Math.sin(ang) * rad));
    }
    const garlandTube = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(garlandPts), 96, 0.085, 6, false),
      new THREE.MeshBasicMaterial({ color: '#ffd978', toneMapped: false })
    );
    this.townTreeGroup.add(garlandTube);

    // 48 Town Tree Bulbs batched into 1 InstancedMesh!
    const bulbGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const bulbMat = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false });
    this.townTreeBulbInst = new THREE.InstancedMesh(bulbGeo, bulbMat, TOWN_TREE_BULB_COUNT);
    for (let i = 0; i < TOWN_TREE_BULB_COUNT; i++) {
      const f = i / TOWN_TREE_BULB_COUNT;
      const ang = i * 1.48;
      const y = 2.15 + f * 10.7;
      const rad = 3.88 * (1 - f * 0.82);
      const sc = i % 3 === 0 ? 1.22 : 0.89;
      _tmpBulbMat.makeScale(sc, sc, sc);
      _tmpBulbMat.setPosition(Math.cos(ang) * rad, y, Math.sin(ang) * rad);
      this.townTreeBulbInst.setMatrixAt(i, _tmpBulbMat);
      _tmpBulbCol.setRGB(1.0, 0.85, 0.45);
      this.townTreeBulbInst.setColorAt(i, _tmpBulbCol);
    }
    this.townTreeBulbInst.instanceMatrix.needsUpdate = true;
    if (this.townTreeBulbInst.instanceColor) this.townTreeBulbInst.instanceColor.needsUpdate = true;
    this.townTreeBulbInst.computeBoundingSphere();
    this.townTreeGroup.add(this.townTreeBulbInst);

    this.townTreeGroundGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(12.5, 12.5).rotateX(-Math.PI * 0.5),
      new THREE.MeshBasicMaterial({
        map: glowTex,
        color: '#ffcf6b',
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.townTreeGroundGlow.position.y = 0.08;
    this.townTreeGroup.add(this.townTreeGroundGlow);

    // Wrapped gift boxes around base skirt
    const giftColors = ['#e01b3a', '#1b7a52', '#2662c8', '#f2b830'];
    const ribbonGoldMat = new THREE.MeshStandardMaterial({ color: '#ffd872', metalness: 0.72, roughness: 0.22 });
    for (let g = 0; g < 8; g++) {
      const a = (g / 8) * Math.PI * 2 + 0.3;
      const sz = 0.65 + (g % 3) * 0.16;
      const gx = Math.cos(a) * (2.15 + (g % 2) * 0.65);
      const gz = Math.sin(a) * (2.15 + (g % 2) * 0.65);
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(sz, sz * 0.8, sz),
        new THREE.MeshPhysicalMaterial({ color: giftColors[g % giftColors.length], roughness: 0.32, clearcoat: 0.55 })
      );
      box.position.set(gx, sz * 0.4, gz);
      box.rotation.y = a;
      const rib = new THREE.Mesh(new THREE.BoxGeometry(sz * 1.05, sz * 0.84, sz * 0.18), ribbonGoldMat);
      rib.position.copy(box.position);
      rib.rotation.y = a;
      this.townTreeGroup.add(box, rib);
    }

    this.townTreeStar = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.76, 0),
      new THREE.MeshBasicMaterial({ color: '#ffe888', toneMapped: false })
    );
    this.townTreeStar.position.y = 14.3;
    this.townTreeHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: '#ffd86b',
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.townTreeHalo.scale.set(14, 16, 1);
    this.townTreeHalo.position.y = 8.2;
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

    // --- 6. Rarer Compact Floating Magical Sign ---
    this.magicalSign = createMagicalFloatingSign();
    this.magicalSign.group.visible = false;
    this.group.add(this.magicalSign.group);
  }

  private ensureWildlifePooled(): void {
    if (this.wildlifePooled) return;
    this.wildlifePooled = true;
    const holidayRoster: WildlifeKind[] = [
      'rudolf', 'elf', 'reindeer', 'elf', 'reindeer', 'elf', 'rudolf', 'elf', 'reindeer', 'elf',
    ];
    for (let idx = 0; idx < 24; idx++) {
      const kind = holidayRoster[idx % holidayRoster.length];
      const critter = createPixarForestAnimal(kind, idx + 11);
      critter.group.scale.setScalar(kind === 'elf' ? 1.18 : 1.16);
      critter.group.visible = false;
      this.wildlifeGroup.add(critter.group);
      this.holidayPool.push(critter);
    }
    const kinds: WildlifeKind[] = ['stag', 'fox', 'owl', 'rabbit', 'stag', 'fox'];
    for (let idx = 0; idx < kinds.length; idx++) {
      const kind = kinds[idx];
      const animal = createPixarForestAnimal(kind, idx + 1);
      const scale = kind === 'stag' ? 1.15 : kind === 'fox' || kind === 'owl' ? 1.25 : 1.35;
      animal.group.scale.setScalar(scale);
      animal.group.visible = false;
      this.wildlifeGroup.add(animal.group);
      this.wildPool.push(animal);
    }
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
    this.wildlifePooled = false;
    this.holidayPool = [];
    this.wildPool = [];
    this.roamingCritters = [];
    this.placedWild = [];
  }

  private rebuildForSnapshot(mapData: ChristmasMapData, road: OsmRoadRibbon | undefined, center: THREE.Vector3, heading: number): void {
    const snap = mapData.snapshot;
    if (!snap || this.builtVersion === snap.version) return;
    this.builtVersion = snap.version;
    this.ensureWildlifePooled();
    for (const h of this.holidayPool) h.group.visible = false;
    for (const w of this.wildPool) w.group.visible = false;
    this.roamingCritters = [];
    this.placedWild = [];
    this.moosePlaced = false;
    this.mooseGroup.visible = false;
    this.townTreePlaced = false;
    this.townTreeGroup.visible = false;
    this.magicalSignPlaced = false;
    this.magicalSign.group.visible = false;
    this.signCooldownM = 18;
    for (const sm of this.snowmen) {
      sm.placed = false;
      sm.group.visible = false;
    }

    const groundY = (x: number, z: number) => mapData.elevation?.(x, z) ?? 0;
    const clearance = mapData.clearance;

    // 2A. Roaming Pixar Reindeer (incl. glowing-nose Rudolfs!) & Santa's Holiday Elves across yards, parks & verges
    const holidaySpots: OsmPoint2D[] = [];
    const tryAddHolidaySpot = (x: number, z: number, minGap = 11) => {
      if (holidaySpots.length >= this.holidayPool.length || Math.hypot(x, z) > 260) return;
      if (clearance && !clearance.clear({ x, z }, 1.25)) return;
      if (holidaySpots.some(p => Math.hypot(p.x - x, p.z - z) < minGap)) return;
      holidaySpots.push({ x, z });
    };

    for (const wp of mapData.woodlands) {
      tryAddHolidaySpot(wp.x, wp.z, 9);
    }
    for (const r of snap.roads) {
      let traveled = 0;
      let nextSpawn = 12;
      for (let i = 1; i < r.points.length && holidaySpots.length < this.holidayPool.length; i++) {
        const a = r.points[i - 1], b = r.points[i];
        const dx = b.x - a.x, dz = b.z - a.z;
        const segLen = Math.hypot(dx, dz);
        if (segLen < 1) continue;
        const nx = -dz / segLen, nz = dx / segLen;
        while (traveled + segLen >= nextSpawn && holidaySpots.length < this.holidayPool.length) {
          const f = (nextSpawn - traveled) / segLen;
          const bx = a.x + dx * f, bz = a.z + dz * f;
          const side = holidaySpots.length % 2 === 0 ? 1 : -1;
          const lateral = r.widthM * 0.5 + 3.4 + (holidaySpots.length % 3) * 1.4;
          tryAddHolidaySpot(bx + nx * side * lateral, bz + nz * side * lateral, 12);
          nextSpawn += 26;
        }
        traveled += segLen;
      }
    }

    holidaySpots.forEach((spot, idx) => {
      const critter = this.holidayPool[idx];
      const radius = 1.65 + (idx % 3) * 0.55;
      const initAng = idx * 1.93;
      const tx = spot.x + Math.cos(initAng) * radius * 0.7;
      const tz = spot.z + Math.sin(initAng) * radius * 0.7;
      critter.group.position.set(spot.x, groundY(spot.x, spot.z), spot.z);
      critter.group.rotation.y = initAng;
      critter.group.visible = false;
      this.roamingCritters.push({
        id: `${critter.kind}-${idx}`,
        handle: critter,
        anchorX: spot.x,
        anchorZ: spot.z,
        x: spot.x,
        z: spot.z,
        targetX: tx,
        targetZ: tz,
        yaw: initAng,
        radius,
        speed: critter.kind === 'elf' ? 0.95 : 0.75,
        phase: idx * 1.37,
        state: idx % 2 === 0 ? 'wander' : 'pause',
        stateTimer: 1.4 + (idx % 4) * 0.85,
        wanderStep: idx + 1,
      });
    });

    // 2B. Woodland Wildlife & Ornament Moose
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

    let wildIdx = 0;
    spots.slice(0, 7).forEach((spot, idx) => {
      const street = clearance?.nearestStreet(spot);
      const yaw = street ? Math.atan2(street.x - spot.x, street.z - spot.z) : 0;
      if (!this.moosePlaced && idx === spots.length - 1 && (snap.biome === 'forest' || snap.biome === 'open')) {
        this.moosePlaced = true;
        this.mooseX = spot.x;
        this.mooseZ = spot.z;
        this.mooseGroup.position.set(spot.x, groundY(spot.x, spot.z), spot.z);
        this.mooseGroup.rotation.y = yaw + 0.35;
        this.mooseGroup.visible = false;
        return;
      }
      if (wildIdx >= this.wildPool.length) return;
      const animal = this.wildPool[wildIdx++];
      animal.group.position.set(spot.x, groundY(spot.x, spot.z), spot.z);
      animal.group.rotation.y = yaw;
      animal.group.visible = false;
      this.placedWild.push({
        handle: animal,
        x: spot.x,
        z: spot.z,
        baseYaw: yaw,
        placed: true,
      });
    });
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
    for (const c of this.roamingCritters) {
      if (!c.handle.group.visible) continue;
      const p = c.handle.group.position;
      if (Math.hypot(p.x - center.x, p.z - center.z) > 95) continue;
      if (c.handle.kind !== 'rudolf' && c.handle.kind !== 'reindeer' && c.handle.kind !== 'elf') continue;
      out.push({
        id: c.id,
        kind: c.handle.kind,
        x: p.x,
        y: p.y + 1.1,
        z: p.z,
        onTap: () => c.handle.triggerJoyJump?.(),
      });
    }
    return out;
  }

  celebrateCritterNear(x: number, z: number, radius = 14): boolean {
    let hit = false;
    for (const c of this.roamingCritters) {
      if (!c.handle.group.visible) continue;
      const p = c.handle.group.position;
      if (Math.hypot(p.x - x, p.z - z) <= radius) {
        c.handle.triggerJoyJump?.();
        hit = true;
      }
    }
    return hit;
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
    _quality: GraphicsQuality,
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

    // 2. Wildlife, Natural Wandering Reindeer/Elves & Ornament Moose (distance & behind-camera culled)
    for (let i = 0; i < this.roamingCritters.length; i++) {
      const rc = this.roamingCritters[i];
      const dx = rc.x - center.x;
      const dz = rc.z - center.z;
      const distSq = dx * dx + dz * dz;
      const ahead = dx * east - dz * north;
      const inView = distSq <= WILDLIFE_CULL_DIST_SQ && ahead >= WILDLIFE_CULL_BEHIND;
      rc.handle.group.visible = inView;
      if (!inView) continue;

      const nearSleigh = distSq < 26 * 26;
      if (nearSleigh) {
        // Pause and turn curiously toward approaching sleigh!
        const watchYaw = Math.atan2(center.x - rc.x, center.z - rc.z);
        rc.yaw = dampAngle(rc.yaw, watchYaw, 4.5, dt);
        rc.handle.group.position.set(rc.x, groundY(rc.x, rc.z), rc.z);
        rc.handle.group.rotation.y = rc.yaw;
        rc.handle.update(dt, time, Math.max(sleighAlert, 0.72));
        continue;
      }

      rc.stateTimer -= dt;
      if (rc.state === 'wander') {
        const tx = rc.targetX - rc.x;
        const tz = rc.targetZ - rc.z;
        const distToTarget = Math.hypot(tx, tz);
        if (distToTarget < 0.25 || rc.stateTimer <= 0) {
          rc.state = 'pause';
          rc.stateTimer = 1.8 + ((rc.wanderStep * 1.37 + rc.phase) % 2.6);
        } else {
          const step = Math.min(distToTarget, rc.speed * dt);
          rc.x += (tx / distToTarget) * step;
          rc.z += (tz / distToTarget) * step;
          const moveYaw = Math.atan2(tx, tz);
          rc.yaw = dampAngle(rc.yaw, moveYaw, 5.2, dt);
        }
      } else if (rc.stateTimer <= 0) {
        rc.wanderStep += 1;
        const nextAng = (rc.wanderStep * 2.39996 + rc.phase) % (Math.PI * 2);
        const nextRad = (0.35 + ((rc.wanderStep * 0.43) % 0.65)) * rc.radius;
        rc.targetX = rc.anchorX + Math.cos(nextAng) * nextRad;
        rc.targetZ = rc.anchorZ + Math.sin(nextAng) * nextRad;
        rc.state = 'wander';
        rc.stateTimer = 2.6 + ((rc.wanderStep * 0.91) % 2.4);
      }

      rc.handle.group.position.set(rc.x, groundY(rc.x, rc.z), rc.z);
      rc.handle.group.rotation.y = rc.yaw;
      rc.handle.update(dt, time, rc.state === 'wander' ? Math.max(sleighAlert, 0.2) : sleighAlert * 0.35);
    }

    for (let i = 0; i < this.placedWild.length; i++) {
      const pw = this.placedWild[i];
      if (!pw.placed) continue;
      const dx = pw.x - center.x;
      const dz = pw.z - center.z;
      const distSq = dx * dx + dz * dz;
      const ahead = dx * east - dz * north;
      const inView = distSq <= WILDLIFE_CULL_DIST_SQ && ahead >= WILDLIFE_CULL_BEHIND;
      pw.handle.group.visible = inView;
      if (!inView) continue;
      if (distSq < 28 * 28) {
        const lookYaw = Math.atan2(center.x - pw.x, center.z - pw.z);
        pw.handle.group.rotation.y = dampAngle(pw.handle.group.rotation.y, lookYaw, 3.2, dt);
      }
      pw.handle.update(dt, time, distSq < 28 * 28 ? Math.max(sleighAlert, 0.68) : sleighAlert);
    }

    if (this.moosePlaced) {
      const mdx = this.mooseX - center.x;
      const mdz = this.mooseZ - center.z;
      const mInView = mdx * mdx + mdz * mdz <= WILDLIFE_CULL_DIST_SQ && mdx * east - mdz * north >= WILDLIFE_CULL_BEHIND;
      this.mooseGroup.visible = mInView;
      if (mInView) {
        this.mooseHeadPivot.rotation.y = Math.sin(time * 1.1) * 0.35;
      }
    }

    // 3. Swooping White Snowy Owl (unconditionally enabled on all tiers!)
    this.owlCycleT = (this.owlCycleT + dt) % 18;
    if (this.owlCycleT < 4.2 && osm.enabled) {
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
      this.owlGroup.rotation.z = Math.sin(p * Math.PI) * 0.24;
      const flap = Math.sin(time * 13) * 0.52;
      const tipLag = Math.sin(time * 13 - 0.75) * 0.42;
      this.owlWingL.rotation.z = flap;
      this.owlWingR.rotation.z = -flap;
      this.owlTipL.rotation.z = tipLag;
      this.owlTipR.rotation.z = -tipLag;
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
      for (let idx = 0; idx < TOWN_TREE_BULB_COUNT; idx++) {
        const tw = 0.72 + 0.28 * Math.sin(time * 5 + idx);
        const a = lvl * tw;
        if (idx % 4 === 0) _tmpBulbCol.setRGB(1.4 * a, 1.15 * a, 0.45 * a);
        else if (idx % 4 === 1) _tmpBulbCol.setRGB(1.4 * a, 0.2 * a, 0.28 * a);
        else if (idx % 4 === 2) _tmpBulbCol.setRGB(0.35 * a, 1.2 * a, 1.45 * a);
        else _tmpBulbCol.setRGB(1.4 * a, 1.3 * a, 0.85 * a);
        this.townTreeBulbInst.setColorAt(idx, _tmpBulbCol);
      }
      if (this.townTreeBulbInst.instanceColor) this.townTreeBulbInst.instanceColor.needsUpdate = true;
      this.townTreeStar.rotation.y = time * (this.townTreeLit ? 2.4 : 0.6);
      this.townTreeStar.scale.setScalar(0.85 + lvl * 0.55);
      this.townTreeHalo.material.opacity = 0.08 + lvl * 0.62;
      (this.townTreeGroundGlow.material as THREE.MeshBasicMaterial).opacity = 0.12 + lvl * 0.58;
    }

    // 5. Interactive Crownable Snowmen
    for (const [idx, sm] of this.snowmen.entries()) {
      if (sm.placed && (aheadDist(sm.group.position) < -20 || sm.group.position.distanceTo(center) > 150)) {
        sm.placed = false;
      }
      if (!sm.placed && road) {
        const spot = this.tryPlaceAlongStreet(road, center, heading, 34 + idx * 36, sm.side, 3.1, 1.4, mapData);
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

    // 6. Rarer Levitating Aurora-Crystal Magical Sign (no cluttering oversized street posts)
    const roadLabel = road?.name || osm.roadName || 'Vinterväg';
    const placeLabel = osm.placeName || 'Vintervärlden';
    this.magicalSign.setDirections(frame.northPoleDistanceKm, placeLabel, roadLabel);

    const movedStep = Math.hypot(center.x - this.lastSignPos.x, center.z - this.lastSignPos.z);
    if (movedStep < 50 && this.lastSignPos.lengthSq() > 0.01) {
      this.signCooldownM = Math.max(0, this.signCooldownM - movedStep);
    }
    this.lastSignPos.copy(center);

    if (
      this.magicalSignPlaced &&
      (aheadDist(this.magicalSign.group.position) < -12 || this.magicalSign.group.position.distanceTo(center) > 165)
    ) {
      this.magicalSignPlaced = false;
      this.signCooldownM = 185;
    }
    if (!this.magicalSignPlaced && this.signCooldownM <= 0 && road) {
      const spot = this.tryPlaceAlongStreet(road, center, heading, 58, -1, 3.8, 1.0, mapData);
      if (spot) {
        this.magicalSign.group.position.set(spot.x, spot.y, spot.z);
        this.magicalSign.group.rotation.y = -spot.heading + 0.14;
        this.magicalSignPlaced = true;
      }
    }
    this.magicalSign.group.visible = this.magicalSignPlaced;
    if (this.magicalSignPlaced) {
      this.magicalSign.group.position.y =
        groundY(this.magicalSign.group.position.x, this.magicalSign.group.position.z) + Math.sin(time * 2.1) * 0.24;
    }
  }

  dispose(): void {
    this.clearWildlife();
    const sharedGlowTex = getSoftGlowTexture();
    this.townTreeBulbInst.dispose();
    this.group.traverse(obj => {
      const m = obj as THREE.Mesh;
      if (m.geometry && !m.geometry.userData?.shared) m.geometry.dispose();
      const mat = m.material;
      const disposeMat = (x: THREE.Material) => {
        if (!x.userData?.shared) {
          const std = x as THREE.MeshStandardMaterial;
          if (std.map && std.map !== sharedGlowTex) std.map.dispose();
          if (std.emissiveMap && std.emissiveMap !== sharedGlowTex) std.emissiveMap.dispose();
          x.dispose();
        }
      };
      if (Array.isArray(mat)) mat.forEach(disposeMat);
      else if (mat) disposeMat(mat);
    });
  }
}
