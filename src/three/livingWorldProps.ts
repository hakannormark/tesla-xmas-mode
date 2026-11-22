import * as THREE from 'three';
import { GraphicsQuality } from '../core/environment';
import { OsmWorldState } from '../core/osmWorld';
import { createSparklingSnowMaterial, getSoftGlowTexture } from './pixarMaterials';
import { createPixarSnowman } from './pixarModels';

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
  scarfColor: string;
}

interface InteractiveSnowmanNode {
  group: THREE.Group;
  crown: THREE.Group;
  broomArm: THREE.Mesh;
  halo: THREE.Sprite;
  side: -1 | 1;
  z: number;
  crowned: boolean;
  bounceTimer: number;
}

export class LivingWorldRig {
  readonly group = new THREE.Group();

  private onTownTreeLit?: () => void;

  // 1. Frozen Lake Ice Skaters
  private skateGroup = new THREE.Group();
  private skateZ = -58;
  private skaters: SkaterNode[] = [];

  // 2. Christmas Market Stalls (Julmarknadsstånd)
  private stalls: Array<{ group: THREE.Group; side: -1 | 1; z: number }> = [];

  // 3. Interactive Snowmen with Broom & Crown Reward
  private snowmen: InteractiveSnowmanNode[] = [];

  // 4. Giant 15-meter Light-Up Town Christmas Tree
  private townTreeGroup = new THREE.Group();
  private townTreeZ = -96;
  private townTreeLit = false;
  private townTreeLitLevel = 0.12;
  private townTreeBulbs: THREE.MeshBasicMaterial[] = [];
  private townTreeStar!: THREE.Mesh;
  private townTreeHalo!: THREE.Sprite;

  // 5. Swooping Snowy Owl crossing the road from a lamppost
  private owlGroup = new THREE.Group();
  private owlWingL!: THREE.Mesh;
  private owlWingR!: THREE.Mesh;
  private owlCycleT = 4.0;

  // 6. Ornament-Antler Moose at forest clearing
  private mooseGroup = new THREE.Group();
  private mooseHeadPivot = new THREE.Group();
  private mooseZ = -132;

  // 7. Trotting Arctic Fox racing alongside the left snowbank
  private foxGroup = new THREE.Group();
  private foxTail = new THREE.Group();
  private foxRunT = 0;

  constructor(onTownTreeLit?: () => void) {
    this.onTownTreeLit = onTownTreeLit;
    const glowTex = getSoftGlowTexture();

    // --- 1. Ice Skaters on Frozen Lake ---
    const rinkLightMat = new THREE.MeshBasicMaterial({ color: '#ffde82', toneMapped: false });
    const skatePostMat = new THREE.MeshStandardMaterial({ color: '#3b2418', roughness: 0.85 });
    for (const pz of [-9, 9]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 3.8, 7), skatePostMat);
      post.position.set(0, 1.9, pz);
      this.skateGroup.add(post);
    }
    for (let i = -3; i <= 3; i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.11, 6, 6), rinkLightMat);
      b.position.set(0, 3.5 - Math.cos((i / 3) * 1.1) * 0.45, i * 2.5);
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
      this.skaters.push({ group: sg, phase: i * 2.1, scarfColor: scarfColors[i] });
    }
    this.skateGroup.visible = false;
    this.group.add(this.skateGroup);

    // --- 2. Christmas Market Stalls ---
    const woodMat = new THREE.MeshStandardMaterial({ color: '#5c3322', roughness: 0.86 });
    const redStripeMat = new THREE.MeshStandardMaterial({ color: '#c8122f', roughness: 0.55 });
    const whiteStripeMat = new THREE.MeshStandardMaterial({ color: '#f7f5f0', roughness: 0.5 });
    const counterGlow = new THREE.MeshBasicMaterial({ color: '#ffd984', toneMapped: false });

    for (const [idx, spec] of [
      { side: -1 as const, z: -42 },
      { side: 1 as const, z: -102 },
    ].entries()) {
      const st = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.1, 2.0), woodMat);
      base.position.y = 0.55;
      for (const px of [-1.45, 1.45]) {
        for (const pz of [-0.85, 0.85]) {
          const p = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.4, 0.14), woodMat);
          p.position.set(px, 1.2, pz);
          st.add(p);
        }
      }
      // Striped red & white market awning
      for (let k = 0; k < 5; k++) {
        const sl = new THREE.Mesh(
          new THREE.BoxGeometry(0.68, 0.16, 2.55),
          k % 2 === 0 ? redStripeMat : whiteStripeMat
        );
        sl.position.set(-1.32 + k * 0.66, 2.52, 0.05);
        sl.rotation.x = 0.16;
        st.add(sl);
      }
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), counterGlow);
      lamp.position.set(0, 2.12, 0.5);
      const stallHalo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: '#ffbf5e',
          transparent: true,
          opacity: 0.48,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      stallHalo.scale.set(6.5, 5.0, 1);
      stallHalo.position.set(0, 1.6, 0.7);
      st.add(base, lamp, stallHalo);
      st.rotation.y = spec.side < 0 ? Math.PI * 0.38 : -Math.PI * 0.38;
      this.group.add(st);
      this.stalls.push({ group: st, side: spec.side, z: spec.z - idx * 6 });
    }

    // --- 3. Interactive Snowmen with Gold Crown Reward ---
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#ffd966',
      metalness: 0.82,
      roughness: 0.18,
      emissive: '#8f5e00',
      emissiveIntensity: 0.65,
    });
    for (const spec of [
      { side: -1 as const, z: -56 },
      { side: 1 as const, z: -124 },
    ]) {
      const sm = createPixarSnowman();
      sm.scale.setScalar(1.32);

      // Waving stick arm
      const broomArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 1.05, 6), woodMat);
      broomArm.position.set(0.45, 1.38, 0.08);
      broomArm.rotation.z = -0.7;
      sm.add(broomArm);

      // Hidden Crown perched atop snowman head -> illuminates on Gift Cannon hit!
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
      halo.scale.set(4.5, 4.5, 1);
      halo.position.y = 1.6;
      sm.add(halo);

      sm.rotation.y = spec.side < 0 ? 0.45 : -0.45;
      this.group.add(sm);
      this.snowmen.push({
        group: sm,
        crown,
        broomArm,
        halo,
        side: spec.side,
        z: spec.z,
        crowned: false,
        bounceTimer: 0,
      });
    }

    // --- 4. Giant 15m Town Square Light-Up Christmas Tree ---
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
      const r = 4.6 - t * 0.58;
      const h = 3.2 - t * 0.22;
      const y = 2.6 + t * 1.75;
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
      const y = 2.2 + f * 11.4;
      const rad = 4.0 * (1 - f * 0.84);
      const bm = new THREE.MeshBasicMaterial({ color: palette[i % palette.length], toneMapped: false });
      this.townTreeBulbs.push(bm);
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 6), bm);
      b.position.set(Math.cos(ang) * rad, y, Math.sin(ang) * rad);
      this.townTreeGroup.add(b);
    }

    this.townTreeStar = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.68, 0),
      new THREE.MeshBasicMaterial({ color: '#ffe888', toneMapped: false })
    );
    this.townTreeStar.position.y = 15.2;
    this.townTreeHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: '#ffd86b',
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.townTreeHalo.scale.set(16, 18, 1);
    this.townTreeHalo.position.y = 8.5;
    this.townTreeGroup.add(this.townTreeStar, this.townTreeHalo);
    this.group.add(this.townTreeGroup);

    // --- 5. Swooping White Snowy Owl ---
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

    // --- 6. Nordic Ornament-Antler Moose ---
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
    this.mooseGroup.rotation.y = 0.62;
    this.group.add(this.mooseGroup);

    // --- 7. Trotting White Arctic Fox in Snowbank ---
    const foxWhite = new THREE.MeshPhysicalMaterial({ color: '#f5f8fc', roughness: 0.75, sheen: 0.65 });
    const fBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.42, 6, 8), foxWhite);
    fBody.rotation.x = Math.PI * 0.5;
    fBody.position.y = 0.38;
    const fHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), foxWhite);
    fHead.position.set(0, 0.5, -0.26);
    const fTail = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.34, 5, 8), foxWhite);
    fTail.rotation.x = -0.9;
    fTail.position.set(0, 0.08, 0.22);
    this.foxTail.position.set(0, 0.4, 0.22);
    this.foxTail.add(fTail);
    this.foxGroup.add(fBody, fHead, this.foxTail);
    this.foxGroup.scale.setScalar(1.15);
    this.group.add(this.foxGroup);
  }

  getInteractiveTargets(): LivingGiftTarget[] {
    const out: LivingGiftTarget[] = [];
    if (this.townTreeGroup.visible && !this.townTreeLit && this.townTreeZ < -8 && this.townTreeZ > -125) {
      out.push({
        x: this.townTreeGroup.position.x,
        y: 8.5,
        z: this.townTreeZ,
        kind: 'town_tree',
        bonusGifts: 5,
        lightUp: () => {
          this.townTreeLit = true;
          this.townTreeLitLevel = 1.0;
          this.onTownTreeLit?.();
        },
      });
    }
    for (const sm of this.snowmen) {
      if (sm.group.visible && !sm.crowned && sm.z < -8 && sm.z > -115) {
        out.push({
          x: sm.group.position.x,
          y: 2.3,
          z: sm.z,
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
    forwardStep: number,
    osm: OsmWorldState,
    quality: GraphicsQuality,
    getRoadCurveX: (z: number) => number
  ): void {
    const biome = osm.biome;
    const hasTown = osm.enabled && (biome === 'village' || biome === 'water');
    const hasOpenOrForest = osm.enabled && (biome === 'forest' || biome === 'open');

    // 1. Frozen Lake Skaters ('water' biome)
    this.skateGroup.visible = osm.enabled && biome === 'water';
    if (this.skateGroup.visible) {
      this.skateZ += forwardStep;
      if (this.skateZ > 26) this.skateZ -= 160;
      const rx = getRoadCurveX(this.skateZ);
      const nextRx = getRoadCurveX(this.skateZ - 5);
      this.skateGroup.position.set(rx + 25, 0.08, this.skateZ);
      this.skateGroup.rotation.y = Math.atan2(rx - nextRx, 5);
      this.skaters.forEach((sk) => {
        const ang = time * 0.95 + sk.phase;
        const sx = Math.sin(ang) * 4.5;
        const sz = Math.sin(ang * 2) * 5.2;
        sk.group.position.set(sx, Math.abs(Math.sin(ang * 4)) * 0.05, sz);
        sk.group.rotation.y = Math.atan2(Math.cos(ang) * 4.5, Math.cos(ang * 2) * 10.4);
        sk.group.rotation.z = Math.sin(ang * 2) * 0.14;
      });
    }

    // 2. Christmas Market Stalls ('village' biome)
    for (const st of this.stalls) {
      st.group.visible = osm.enabled && biome === 'village' && quality === 'ultra';
      if (!st.group.visible) continue;
      st.z += forwardStep;
      if (st.z > 20) st.z -= 160;
      const rx = getRoadCurveX(st.z);
      const nextRx = getRoadCurveX(st.z - 5);
      st.group.position.set(rx + st.side * 11.4, 0, st.z);
      st.group.rotation.y = Math.atan2(rx - nextRx, 5) + (st.side < 0 ? Math.PI * 0.38 : -Math.PI * 0.38);
    }

    // 3. Interactive Snowmen along road shoulder
    for (const sm of this.snowmen) {
      sm.group.visible = osm.enabled && biome !== 'open';
      if (!sm.group.visible) continue;
      sm.z += forwardStep;
      if (sm.z > 20) {
        sm.z -= 170;
        sm.crowned = false;
        sm.crown.visible = false;
      }
      if (sm.bounceTimer > 0) sm.bounceTimer = Math.max(0, sm.bounceTimer - dt);
      const hop = sm.bounceTimer > 0 ? Math.abs(Math.sin(sm.bounceTimer * 9)) * 0.65 : 0;
      const rx = getRoadCurveX(sm.z);
      const nextRx = getRoadCurveX(sm.z - 5);
      sm.group.position.set(rx + sm.side * 10.8, hop, sm.z);
      sm.group.rotation.y = Math.atan2(rx - nextRx, 5) + (sm.side < 0 ? 0.45 : -0.45);
      sm.broomArm.rotation.z = -0.65 + Math.sin(time * (sm.crowned ? 9 : 3.5) + sm.side) * 0.32;
      sm.halo.material.opacity = sm.crowned ? 0.65 : 0.08;
    }

    // 4. Giant 15m Town Tree (resets cleanly on each pass so player can light it every block!)
    this.townTreeGroup.visible = osm.enabled && (hasTown || biome === 'highway');
    if (this.townTreeGroup.visible) {
      this.townTreeZ += forwardStep;
      if (this.townTreeZ > 24) {
        this.townTreeZ -= 185;
        this.townTreeLit = false;
        this.townTreeLitLevel = 0.14;
      }
      const rx = getRoadCurveX(this.townTreeZ);
      this.townTreeGroup.position.set(rx - 15.2, 0, this.townTreeZ);
      const targetLvl = this.townTreeLit ? 1.0 : 0.14;
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

    // 5. Swooping White Snowy Owl crossing from lamppost into sky
    this.owlCycleT = (this.owlCycleT + dt) % 18;
    if (this.owlCycleT < 4.2 && quality === 'ultra') {
      const p = this.owlCycleT / 4.2;
      const z = THREE.MathUtils.lerp(-32, -68, p);
      const x = getRoadCurveX(z) + THREE.MathUtils.lerp(6.0, -17.5, p);
      const y = 4.9 + Math.sin(p * Math.PI) * 5.2 + p * 3.5;
      this.owlGroup.visible = true;
      this.owlGroup.position.set(x, y, z);
      this.owlGroup.rotation.y = 0.65;
      const flap = Math.sin(time * 15) * 0.65;
      this.owlWingL.rotation.z = flap;
      this.owlWingR.rotation.z = -flap;
    } else {
      this.owlGroup.visible = false;
    }

    // 6. Ornament-Antler Moose in forest/open clearings
    this.mooseGroup.visible = hasOpenOrForest;
    if (this.mooseGroup.visible) {
      this.mooseZ += forwardStep;
      if (this.mooseZ > 22) this.mooseZ -= 175;
      const rx = getRoadCurveX(this.mooseZ);
      this.mooseGroup.position.set(rx + 14.2, 0, this.mooseZ);
      this.mooseHeadPivot.rotation.y = Math.sin(time * 1.1) * 0.35;
    }

    // 7. Trotting White Arctic Fox in left snowbank ('forest' | 'open')
    this.foxGroup.visible = hasOpenOrForest && quality === 'ultra';
    if (this.foxGroup.visible) {
      this.foxRunT += dt;
      const cyc = (this.foxRunT * 0.09) % 1;
      const z = THREE.MathUtils.lerp(-42, -8, Math.sin(cyc * Math.PI));
      const rx = getRoadCurveX(z);
      this.foxGroup.position.set(
        rx - 7.3 - (cyc > 0.78 ? (cyc - 0.78) * 28 : 0),
        0.58 + Math.abs(Math.sin(time * 9)) * 0.14,
        z
      );
      this.foxGroup.rotation.y = cyc > 0.78 ? 1.1 : 0.08;
      this.foxTail.rotation.y = Math.sin(time * 8) * 0.45;
    }
  }

  dispose(): void {
    this.group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        m.geometry?.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mm) => mm.dispose());
        else m.material?.dispose();
      }
    });
  }
}
