import * as THREE from 'three';
import {
  addMorphTargets,
  evaluateReindeerGait,
  SpringDamper,
  WindChain,
} from './pixarAnimation';
import {
  createSparklingSnowMaterial,
  createTimberWallTexture,
  createVolumetricBeamMaterial,
  createWarmWindowTexture,
  getSoftGlowTexture,
} from './pixarMaterials';
import {
  createAccurateCybertruck,
  createAccurateOptimusGen2,
  createAccurateTeslaSemi,
} from './teslaModels';

let timberWallTex: THREE.CanvasTexture | null = null;
let warmWinTex: THREE.CanvasTexture | null = null;

function getTimberTex(): THREE.CanvasTexture {
  if (!timberWallTex) timberWallTex = createTimberWallTexture('#7a1826');
  return timberWallTex;
}

function getWinTex(): THREE.CanvasTexture {
  if (!warmWinTex) warmWinTex = createWarmWindowTexture();
  return warmWinTex;
}

export interface PixarSleighHandle {
  group: THREE.Group;
  update(dt: number, speedKmh: number, turnRate: number, accel: number, time: number): void;
  triggerReaction(kind: 'hohoho' | 'landmark' | 'gift'): void;
  getTrailOrigin(out: THREE.Vector3): THREE.Vector3;
}

interface ReindeerAnim {
  group: THREE.Group;
  slotX: number;
  slotZ: number;
  torsoMesh: THREE.Mesh;
  craniumMesh: THREE.Mesh;
  eyes: THREE.Mesh[];
  ears: THREE.Mesh[];
  fl: THREE.Group;
  flShin: THREE.Group;
  fr: THREE.Group;
  frShin: THREE.Group;
  bl: THREE.Group;
  blShin: THREE.Group;
  br: THREE.Group;
  brShin: THREE.Group;
  headGroup: THREE.Group;
  phaseOffset: number;
  blinkTimer: number;
  blinkVal: number;
  breathPuffs: THREE.Mesh[];
  reinSegA: THREE.Mesh;
  reinSegB: THREE.Mesh;
}

const _segDir = new THREE.Vector3();
const _zAxis = new THREE.Vector3(0, 0, 1);

function orientSegmentBetween(
  mesh: THREE.Mesh,
  a: THREE.Vector3,
  b: THREE.Vector3
): void {
  mesh.position.addVectors(a, b).multiplyScalar(0.5);
  _segDir.subVectors(b, a);
  const len = _segDir.length();
  mesh.scale.set(1, 1, Math.max(0.01, len));
  if (len > 0.0001) {
    _segDir.multiplyScalar(1 / len);
    mesh.quaternion.setFromUnitVectors(_zAxis, _segDir);
  }
}

export function createPixarSantaSleigh(): PixarSleighHandle {
  const root = new THREE.Group();

  const crimsonPaint = new THREE.MeshPhysicalMaterial({
    color: '#c80e2b',
    metalness: 0.35,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const velvetMat = new THREE.MeshPhysicalMaterial({
    color: '#8f0a20',
    roughness: 0.85,
    sheen: 0.85,
    sheenColor: new THREE.Color('#ff5e73'),
    sheenRoughness: 0.45,
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: '#ffd166',
    metalness: 0.88,
    roughness: 0.2,
  });

  const snowFurMat = new THREE.MeshPhysicalMaterial({
    color: '#f8f5ef',
    roughness: 0.85,
    sheen: 0.65,
    sheenColor: new THREE.Color('#ffffff'),
  });

  const sleighBodyGroup = new THREE.Group();
  root.add(sleighBodyGroup);

  // Sculpted Baroque / Disney side profiles using THREE.Shape + beveled ExtrudeGeometry
  const sideShape = new THREE.Shape();
  sideShape.moveTo(-1.35, 0.35);
  sideShape.bezierCurveTo(-1.45, 0.95, -1.25, 1.48, -0.78, 1.48);
  sideShape.bezierCurveTo(-0.45, 1.48, -0.25, 0.95, 0.05, 0.92);
  sideShape.bezierCurveTo(0.45, 0.88, 0.78, 1.12, 1.18, 1.24);
  sideShape.bezierCurveTo(1.42, 1.3, 1.48, 0.95, 1.24, 0.62);
  sideShape.bezierCurveTo(0.95, 0.32, 0.35, 0.3, -1.35, 0.35);

  const sideGeo = new THREE.ExtrudeGeometry(sideShape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 3,
    curveSegments: 18,
  });
  sideGeo.rotateY(Math.PI * 0.5);

  for (const sx of [-0.88, 0.76]) {
    const sideMesh = new THREE.Mesh(sideGeo, crimsonPaint);
    sideMesh.position.set(sx, 0.15, 0.65);
    sleighBodyGroup.add(sideMesh);
  }

  const floorMesh = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.18, 2.35), crimsonPaint);
  floorMesh.position.set(0, 0.56, 0.62);
  sleighBodyGroup.add(floorMesh);

  const backrestMesh = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.82, 0.24), crimsonPaint);
  backrestMesh.position.set(0, 1.08, 1.72);
  backrestMesh.rotation.x = -0.24;
  sleighBodyGroup.add(backrestMesh);

  const seatCushion = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.92, 8, 12), velvetMat);
  seatCushion.rotation.z = Math.PI * 0.5;
  seatCushion.position.set(0, 0.85, 0.88);
  sleighBodyGroup.add(seatCushion);

  const frontCowl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.84, 0.84, 0.55, 16, 1, false, 0, Math.PI),
    crimsonPaint
  );
  frontCowl.rotation.z = Math.PI * 0.5;
  frontCowl.rotation.x = -0.35;
  frontCowl.position.set(0, 1.05, -0.38);
  sleighBodyGroup.add(frontCowl);

  // Curved Golden Runners via TubeGeometry splines
  for (const rx of [-0.82, 0.82]) {
    const runnerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(rx, 0.16, 2.02),
      new THREE.Vector3(rx, 0.12, 0.95),
      new THREE.Vector3(rx, 0.12, -0.45),
      new THREE.Vector3(rx, 0.42, -1.05),
      new THREE.Vector3(rx, 0.85, -1.16),
      new THREE.Vector3(rx, 0.98, -0.92),
    ]);
    sleighBodyGroup.add(new THREE.Mesh(new THREE.TubeGeometry(runnerCurve, 28, 0.055, 8, false), goldMat));

    for (const sz of [1.4, 0.35, -0.45]) {
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.46, 8), goldMat);
      strut.position.set(rx, 0.34, sz);
      sleighBodyGroup.add(strut);
    }

    const trimCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(rx * 1.06, 1.62, 1.45),
      new THREE.Vector3(rx * 1.06, 1.08, 0.65),
      new THREE.Vector3(rx * 1.06, 1.4, -0.48),
    ]);
    sleighBodyGroup.add(new THREE.Mesh(new THREE.TubeGeometry(trimCurve, 20, 0.032, 6, false), goldMat));
  }

  // Spring-Physics Swinging Brass Bow Lantern
  const lanternArm = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 6, 12, Math.PI), goldMat);
  lanternArm.rotation.y = Math.PI * 0.5;
  lanternArm.position.set(0, 1.38, -0.78);
  sleighBodyGroup.add(lanternArm);

  const lanternPivot = new THREE.Group();
  lanternPivot.position.set(0, 1.36, -0.98);
  const lanternBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 10, 10),
    new THREE.MeshBasicMaterial({ color: '#fff3c4', toneMapped: false })
  );
  lanternBulb.position.y = -0.14;
  const lanternCap = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.16, 6), goldMat);
  lanternCap.position.y = -0.02;
  const sleighLight = new THREE.PointLight('#ffcc75', 6.0, 18);
  sleighLight.position.set(0, -0.05, -0.15);
  lanternPivot.add(lanternBulb, lanternCap, sleighLight);
  sleighBodyGroup.add(lanternPivot);

  // Overflowing Burlap Gift Sack + Presents
  const sack = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, 14, 12),
    new THREE.MeshStandardMaterial({ color: '#8a5d3b', roughness: 0.92 })
  );
  sack.scale.set(1.05, 0.92, 0.85);
  sack.position.set(0, 1.26, 1.35);
  sleighBodyGroup.add(sack);

  const giftSpecs = [
    { x: -0.36, y: 1.66, z: 1.25, col: '#1f8a52', rib: '#ffd166', s: 0.42 },
    { x: 0.34, y: 1.72, z: 1.38, col: '#e62e3d', rib: '#fff6e0', s: 0.38 },
    { x: 0.02, y: 1.84, z: 1.2, col: '#2c68c9', rib: '#ffd166', s: 0.35 },
  ];
  for (const gp of giftSpecs) {
    const gift = new THREE.Group();
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(gp.s, gp.s, gp.s),
      new THREE.MeshPhysicalMaterial({ color: gp.col, roughness: 0.35, clearcoat: 0.5 })
    );
    const ribMat = new THREE.MeshStandardMaterial({ color: gp.rib, metalness: 0.6, roughness: 0.25 });
    const r1 = new THREE.Mesh(new THREE.BoxGeometry(gp.s * 1.05, gp.s * 1.05, gp.s * 0.18), ribMat);
    const r2 = new THREE.Mesh(new THREE.BoxGeometry(gp.s * 0.18, gp.s * 1.05, gp.s * 1.05), ribMat);
    gift.add(box, r1, r2);
    gift.position.set(gp.x, gp.y, gp.z);
    gift.rotation.set(0.2, gp.x, -0.15);
    sleighBodyGroup.add(gift);
  }

  // --- Expressive Pixar Santa with GPU Blend Shapes (Morph Targets!) ---
  const santa = new THREE.Group();
  santa.position.set(0, 1.05, 0.52);

  const santaTorsoPivot = new THREE.Group();
  santa.add(santaTorsoPivot);

  const bellyGeo = new THREE.SphereGeometry(0.42, 20, 16);
  addMorphTargets(bellyGeo, {
    laughJiggle: (x, y, z, out) => {
      if (y < 0.1) {
        const w = (0.1 - y) * 1.6;
        out.set(x * (1 + w * 0.14), y - w * 0.05, z * (1 + w * 0.14) - w * 0.05);
      }
    },
  });
  const santaBelly = new THREE.Mesh(bellyGeo, crimsonPaint);
  santaBelly.scale.set(1.05, 1.15, 0.95);
  santaBelly.position.y = 0.32;
  santaBelly.updateMorphTargets();
  santaTorsoPivot.add(santaBelly);

  const furHem = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.08, 8, 16), snowFurMat);
  furHem.rotation.x = Math.PI * 0.5;
  furHem.position.y = 0.05;
  santaTorsoPivot.add(furHem);

  const belt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.43, 0.43, 0.11, 16),
    new THREE.MeshStandardMaterial({ color: '#17171f', roughness: 0.4 })
  );
  belt.position.y = 0.26;
  santaTorsoPivot.add(belt);

  const buckle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.024, 6, 4), goldMat);
  buckle.rotation.z = Math.PI * 0.25;
  buckle.position.set(0, 0.26, -0.43);
  santaTorsoPivot.add(buckle);

  // Articulated Santa Head Group + 5 GPU Blend Shapes
  const santaHeadPivot = new THREE.Group();
  santaHeadPivot.position.set(0, 0.88, -0.02);
  santaTorsoPivot.add(santaHeadPivot);

  const headGeo = new THREE.SphereGeometry(0.28, 22, 18);
  addMorphTargets(headGeo, {
    smile: (x, y, z, out) => {
      if (z < -0.1 && Math.abs(x) > 0.06 && y < 0.03) {
        out.y += 0.026;
        out.z -= 0.016;
      }
    },
    hoHoHo: (x, y, z, out) => {
      if (z < -0.15 && Math.abs(x) < 0.095 && y < -0.02) {
        out.z += 0.048;
        out.y -= 0.032;
      }
      if (z < -0.1 && Math.abs(x) > 0.07) {
        out.y += 0.022;
        out.x *= 1.07;
      }
    },
    blink: (x, y, z, out) => {
      if (z < -0.15 && y > 0.01 && y < 0.1 && Math.abs(x) > 0.035) {
        out.y -= 0.018;
      }
    },
    windSquint: (x, y, z, out) => {
      if (z < -0.14 && Math.abs(x) > 0.05 && y > -0.03 && y < 0.05) {
        out.y += 0.022;
        out.z -= 0.014;
      }
    },
    surprise: (_x, y, z, out) => {
      if (z < -0.12 && y > 0.07) out.y += 0.028;
      if (z < -0.14 && y < -0.08) out.y -= 0.024;
    },
  });

  const skinMat = new THREE.MeshPhysicalMaterial({ color: '#f7c8ae', roughness: 0.6, sheen: 0.3 });
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headMesh.updateMorphTargets();
  santaHeadPivot.add(headMesh);

  const cheekMat = new THREE.MeshStandardMaterial({ color: '#ef767a', roughness: 0.55 });
  const santaCheeks: THREE.Mesh[] = [];
  const santaEyes: THREE.Mesh[] = [];
  for (const cx of [-0.14, 0.14]) {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 10), cheekMat);
    cheek.position.set(cx, -0.04, -0.23);
    santaHeadPivot.add(cheek);
    santaCheeks.push(cheek);

    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.038, 10, 10),
      new THREE.MeshPhysicalMaterial({ color: '#14141d', roughness: 0.08, clearcoat: 1 })
    );
    eye.position.set(cx * 0.68, 0.05, -0.255);
    const glint = new THREE.Mesh(
      new THREE.SphereGeometry(0.013, 6, 6),
      new THREE.MeshBasicMaterial({ color: '#ffffff' })
    );
    glint.position.set(0.01, 0.014, -0.032);
    eye.add(glint);
    santaHeadPivot.add(eye);
    santaEyes.push(eye);
  }

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), cheekMat);
  nose.position.set(0, 0.01, -0.29);
  santaHeadPivot.add(nose);

  const beardSpheres = [
    [0, -0.16, -0.21, 0.2],
    [-0.12, -0.11, -0.17, 0.14],
    [0.12, -0.11, -0.17, 0.14],
    [0, -0.28, -0.19, 0.15],
  ];
  for (const [bx, by, bz, br] of beardSpheres) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(br, 10, 10), snowFurMat);
    b.position.set(bx, by, bz);
    santaHeadPivot.add(b);
  }
  for (const mx of [-0.08, 0.08]) {
    const stache = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.07, 4, 8), snowFurMat);
    stache.rotation.z = mx < 0 ? 1.2 : -1.2;
    stache.position.set(mx, -0.05, -0.27);
    santaHeadPivot.add(stache);
  }

  // Dynamic WindChain Floppy Hat Tail + Pom-Pom!
  const hatBrim = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.068, 8, 16), snowFurMat);
  hatBrim.rotation.x = Math.PI * 0.5;
  hatBrim.position.y = 0.19;
  santaHeadPivot.add(hatBrim);

  const hatWindChain = new WindChain(5, 0.16, new THREE.Vector3(0, 0.22, 0));
  const hatSegs: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const r0 = 0.22 - i * 0.045;
    const r1 = 0.17 - i * 0.04;
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, 1, 10), crimsonPaint);
    seg.geometry.rotateX(Math.PI * 0.5);
    santaHeadPivot.add(seg);
    hatSegs.push(seg);
  }
  const pom = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 10), snowFurMat);
  santaHeadPivot.add(pom);

  // Dynamic WindChain Flowing Scarf!
  const scarfWindChain = new WindChain(6, 0.22, new THREE.Vector3(0.16, 0.65, 0.06));
  const scarfSegs: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.055 - i * 0.005, 0.06 - i * 0.005, 1, 8), goldMat);
    seg.geometry.rotateX(Math.PI * 0.5);
    santaTorsoPivot.add(seg);
    scarfSegs.push(seg);
  }

  // Arms + Mittens (with local anchors for dynamic live reins!)
  const leftMittenPos = new THREE.Vector3(-0.31, 0.44, -0.48);
  const rightMittenPos = new THREE.Vector3(0.31, 0.44, -0.48);
  for (const ax of [-0.36, 0.36]) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.32, 6, 8), crimsonPaint);
    arm.position.set(ax, 0.52, -0.24);
    arm.rotation.x = -0.95;
    arm.rotation.z = ax < 0 ? 0.25 : -0.25;
    santaTorsoPivot.add(arm);

    const mitten = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), velvetMat);
    mitten.position.set(ax * 0.85, 0.44, -0.48);
    santaTorsoPivot.add(mitten);
  }
  sleighBodyGroup.add(santa);

  // --- Sculpted 4-Reindeer Team with GPU Blend Shapes & Dynamic Live Reins ---
  const furMat = new THREE.MeshPhysicalMaterial({
    color: '#8c5330',
    roughness: 0.72,
    sheen: 0.55,
    sheenColor: new THREE.Color('#c9956b'),
  });
  const muzzleMat = new THREE.MeshPhysicalMaterial({ color: '#d8b490', roughness: 0.75 });
  const antlerMat = new THREE.MeshStandardMaterial({ color: '#e6caa2', roughness: 0.55 });
  const hoofMat = new THREE.MeshStandardMaterial({ color: '#1b1614', roughness: 0.35 });
  const puffMat = new THREE.MeshBasicMaterial({ color: '#eef7ff', transparent: true, opacity: 0.42 });

  const reinSegGeo = new THREE.CylinderGeometry(0.015, 0.015, 1, 5);
  reinSegGeo.rotateX(Math.PI * 0.5);

  const deerSlots = [
    { x: -0.78, z: -2.65, phase: 0.35, rudolph: false },
    { x: 0.78, z: -2.65, phase: 1.25, rudolph: false },
    { x: -0.75, z: -5.45, phase: 2.1, rudolph: false },
    { x: 0.75, z: -5.45, phase: 0.0, rudolph: true },
  ];

  const reindeerRigs: ReindeerAnim[] = [];

  for (const slot of deerSlots) {
    const dg = new THREE.Group();
    dg.position.set(slot.x, 0.82, slot.z);

    // Torso with 3 GPU Morph Targets: archSpine, extendSpine, breathe
    const torsoGeo = new THREE.CapsuleGeometry(0.24, 0.68, 10, 16);
    addMorphTargets(torsoGeo, {
      archSpine: (_x, y, z, out) => {
        const mid = Math.max(0, 1 - Math.abs(y) * 2.2);
        out.z = z - mid * 0.075; // lifts spine upward after +90deg X rotation!
      },
      extendSpine: (x, y, z, out) => {
        out.y = y * 1.1;
        out.x = x * 0.94;
        out.z = z * 0.96;
      },
      breathe: (x, y, z, out) => {
        if (y < 0.05) {
          out.x = x * 1.07;
          out.z = z * 1.07;
        }
      },
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, furMat);
    torsoMesh.rotation.x = Math.PI * 0.5;
    torsoMesh.updateMorphTargets();
    dg.add(torsoMesh);

    const chestFluff = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), muzzleMat);
    chestFluff.position.set(0, -0.02, -0.34);
    dg.add(chestFluff);

    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.24, 8), snowFurMat);
    tail.rotation.x = 0.85;
    tail.position.set(0, 0.14, 0.52);
    dg.add(tail);

    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.045, 8, 14), crimsonPaint);
    collar.rotation.x = 0.35;
    collar.position.set(0, 0.1, -0.32);
    dg.add(collar);

    for (const bx of [-0.12, 0, 0.12]) {
      const bell = new THREE.Mesh(new THREE.SphereGeometry(0.048, 8, 8), goldMat);
      bell.position.set(bx, -0.08, -0.45);
      dg.add(bell);
    }

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.24, -0.38);

    const neck = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.32, 6, 10), furMat);
    neck.rotation.x = -0.45;
    neck.position.set(0, 0.14, -0.08);
    headGroup.add(neck);

    // Cranium with 3 GPU Morph Targets: blink, earPerk, snoutFlare
    const craniumGeo = new THREE.SphereGeometry(0.18, 16, 14);
    addMorphTargets(craniumGeo, {
      blink: (_x, y, z, out) => {
        if (z < -0.05 && y > 0.01 && y < 0.09) out.y -= 0.016;
      },
      earPerk: (_x, y, z, out) => {
        if (y > 0.06) out.z = z - 0.025;
      },
      snoutFlare: (x, y, z, out) => {
        if (z < -0.1 && y < 0) {
          out.x = x * 1.1;
          out.z = z - 0.018;
        }
      },
    });
    const craniumMesh = new THREE.Mesh(craniumGeo, furMat);
    craniumMesh.position.set(0, 0.36, -0.2);
    craniumMesh.updateMorphTargets();
    headGroup.add(craniumMesh);

    const snout = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.16, 6, 10), muzzleMat);
    snout.rotation.x = Math.PI * 0.5;
    snout.position.set(0, 0.31, -0.36);
    headGroup.add(snout);

    const eyes: THREE.Mesh[] = [];
    const ears: THREE.Mesh[] = [];
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(
        new THREE.SphereGeometry(0.042, 8, 8),
        new THREE.MeshPhysicalMaterial({ color: '#121218', roughness: 0.05, clearcoat: 1 })
      );
      eye.position.set(side * 0.12, 0.41, -0.31);
      const catchlight = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 6, 6),
        new THREE.MeshBasicMaterial({ color: '#ffffff' })
      );
      catchlight.position.set(0.012, 0.015, -0.035);
      eye.add(catchlight);
      headGroup.add(eye);
      eyes.push(eye);

      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 6), furMat);
      ear.rotation.z = side * -1.1;
      ear.rotation.x = 0.25;
      ear.position.set(side * 0.19, 0.45, -0.14);
      headGroup.add(ear);
      ears.push(ear);

      const mainAntlerCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.07, 0.5, -0.16),
        new THREE.Vector3(side * 0.19, 0.72, -0.12),
        new THREE.Vector3(side * 0.24, 0.92, -0.02),
      ]);
      headGroup.add(new THREE.Mesh(new THREE.TubeGeometry(mainAntlerCurve, 10, 0.024, 6, false), antlerMat));

      const tineCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.17, 0.68, -0.13),
        new THREE.Vector3(side * 0.11, 0.84, -0.25),
      ]);
      headGroup.add(new THREE.Mesh(new THREE.TubeGeometry(tineCurve, 6, 0.018, 5, false), antlerMat));
    }

    if (slot.rudolph) {
      const noseBulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.088, 12, 12),
        new THREE.MeshBasicMaterial({ color: '#ff2b3d', toneMapped: false })
      );
      noseBulb.position.set(0, 0.34, -0.49);
      headGroup.add(noseBulb);
      const noseGlow = new THREE.PointLight('#ff3b4c', 4.5, 11);
      noseGlow.position.set(0, 0.42, -0.75);
      headGroup.add(noseGlow);
    } else {
      const darkNose = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), hoofMat);
      darkNose.position.set(0, 0.34, -0.47);
      headGroup.add(darkNose);
    }

    dg.add(headGroup);

    const makeLeg = (lx: number, lz: number) => {
      const upper = new THREE.Group();
      upper.position.set(lx, -0.1, lz);
      const uMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.058, 0.28, 4, 8), furMat);
      uMesh.position.y = -0.16;
      upper.add(uMesh);

      const shin = new THREE.Group();
      shin.position.set(0, -0.32, 0);
      const sMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.044, 0.26, 4, 8), furMat);
      sMesh.position.y = -0.14;
      const hoof = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.062, 0.07, 8), hoofMat);
      hoof.position.y = -0.3;
      shin.add(sMesh, hoof);
      upper.add(shin);

      dg.add(upper);
      return { upper, shin };
    };

    const fl = makeLeg(-0.15, -0.28);
    const fr = makeLeg(0.15, -0.28);
    const bl = makeLeg(-0.15, 0.32);
    const br = makeLeg(0.15, 0.32);

    const breathPuffs: THREE.Mesh[] = [];
    for (let p = 0; p < 3; p++) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), puffMat.clone());
      puff.visible = false;
      headGroup.add(puff);
      breathPuffs.push(puff);
    }

    // Two-segment live dynamic golden rein (zero GC per frame)
    const reinSegA = new THREE.Mesh(reinSegGeo, goldMat);
    const reinSegB = new THREE.Mesh(reinSegGeo, goldMat);
    root.add(reinSegA, reinSegB);

    root.add(dg);
    reindeerRigs.push({
      group: dg,
      slotX: slot.x,
      slotZ: slot.z,
      torsoMesh,
      craniumMesh,
      eyes,
      ears,
      fl: fl.upper,
      flShin: fl.shin,
      fr: fr.upper,
      frShin: fr.shin,
      bl: bl.upper,
      blShin: bl.shin,
      br: br.upper,
      brShin: br.shin,
      headGroup,
      phaseOffset: slot.phase,
      blinkTimer: 1.5 + Math.random() * 3.0,
      blinkVal: 0,
      breathPuffs,
      reinSegA,
      reinSegB,
    });
  }

  // Animation state & SpringDampers
  let gallopAccum = 0;
  const lanternPitchSpring = new SpringDamper(0, 95, 7);
  const lanternRollSpring = new SpringDamper(0, 95, 7);
  const santaLeanSpring = new SpringDamper(0, 85, 11);
  const santaHeadYawSpring = new SpringDamper(0, 75, 10);

  let santaBlinkTimer = 2.6;
  let santaBlink = 0;
  let hoHoHoTimer = 0;
  let landmarkTimer = 0;
  let giftTimer = 0;

  const windVec = new THREE.Vector3();
  const hatAnchor = new THREE.Vector3(0, 0.22, 0);
  const scarfAnchor = new THREE.Vector3(0.16, 0.65, 0.06);
  const reinStart = new THREE.Vector3();
  const reinMid = new THREE.Vector3();
  const reinEnd = new THREE.Vector3();

  return {
    group: root,
    triggerReaction(kind: 'hohoho' | 'landmark' | 'gift'): void {
      if (kind === 'hohoho') {
        hoHoHoTimer = 2.6;
        lanternPitchSpring.impulse(3.2);
        santaLeanSpring.impulse(-1.4);
      } else if (kind === 'landmark') {
        landmarkTimer = 2.2;
        santaHeadYawSpring.impulse(1.8);
      } else if (kind === 'gift') {
        giftTimer = 1.6;
        lanternPitchSpring.impulse(-2.2);
      }
    },
    update(dt: number, speedKmh: number, turnRate: number, accel: number, time: number): void {
      const speedNorm = Math.min(1, speedKmh / 110);
      const gallopRate = speedKmh < 2 ? 2.2 : 5.8 + speedNorm * 10.5;
      gallopAccum += gallopRate * dt;

      if (hoHoHoTimer > 0) hoHoHoTimer = Math.max(0, hoHoHoTimer - dt);
      if (landmarkTimer > 0) landmarkTimer = Math.max(0, landmarkTimer - dt);
      if (giftTimer > 0) giftTimer = Math.max(0, giftTimer - dt);

      // Santa automatic organic blink
      santaBlinkTimer -= dt;
      if (santaBlinkTimer <= 0) {
        santaBlinkTimer = 2.8 + Math.random() * 2.5;
        santaBlink = 1.0;
      }
      santaBlink = Math.max(0, santaBlink - dt * 7.5);

      // Spring-driven hanging bow lantern & Santa torso/head expressiveness
      lanternPitchSpring.update(dt, -accel * 0.08 + Math.sin(gallopAccum) * (0.04 + speedNorm * 0.1));
      lanternRollSpring.update(dt, turnRate * 0.35);
      lanternPivot.rotation.x = lanternPitchSpring.value;
      lanternPivot.rotation.z = lanternRollSpring.value;

      santaLeanSpring.update(dt, -accel * 0.045 - speedNorm * 0.12 + (hoHoHoTimer > 0 ? -0.14 : 0));
      santaTorsoPivot.rotation.x = santaLeanSpring.value;

      const targetYaw = hoHoHoTimer > 0 ? Math.sin(time * 3.5) * 0.28 + 0.25 : -turnRate * 0.36;
      santaHeadYawSpring.update(dt, targetYaw);
      santaHeadPivot.rotation.y = santaHeadYawSpring.value;
      santaHeadPivot.rotation.x = hoHoHoTimer > 0 ? Math.sin(time * 12) * 0.09 : speedNorm * 0.06;

      // Update Santa GPU Blend Shapes!
      const laughPulse = hoHoHoTimer > 0 ? Math.max(0, Math.sin(time * 13)) : 0;
      const smileW = Math.min(1, 0.35 + (landmarkTimer > 0 ? 0.65 : 0) + (hoHoHoTimer > 0 ? 0.6 : 0));
      const squintW = Math.max(0, speedNorm - 0.55) * 1.4;
      const surpriseW = Math.max(giftTimer > 0 ? 0.85 : 0, accel < -1.5 ? 0.75 : 0);

      if (headMesh.morphTargetInfluences) {
        headMesh.morphTargetInfluences[0] = smileW;
        headMesh.morphTargetInfluences[1] = laughPulse;
        headMesh.morphTargetInfluences[2] = santaBlink;
        headMesh.morphTargetInfluences[3] = squintW;
        headMesh.morphTargetInfluences[4] = surpriseW;
      }
      if (santaBelly.morphTargetInfluences) {
        santaBelly.morphTargetInfluences[0] = hoHoHoTimer > 0 ? 0.45 + laughPulse * 0.55 : 0;
      }

      // Sync Santa eyes & rosy cheeks cleanly with blend shapes
      const eyeSquash = Math.max(0.12, 1 - santaBlink * 0.88 - squintW * 0.32);
      for (const eye of santaEyes) eye.scale.y = eyeSquash;
      for (const cheek of santaCheeks) cheek.position.y = -0.04 + smileW * 0.022;

      // Secondary cloth/wind simulation for Hat Tail & Scarf!
      windVec.set(-turnRate * 4.5, 0.6 + speedNorm * 1.6, 3.2 + speedNorm * 14.0);
      hatWindChain.update(dt, hatAnchor, windVec, -3.2);
      for (let i = 0; i < hatSegs.length; i++) {
        orientSegmentBetween(hatSegs[i], hatWindChain.points[i], hatWindChain.points[i + 1]);
      }
      pom.position.copy(hatWindChain.points[hatWindChain.points.length - 1]);

      scarfWindChain.update(dt, scarfAnchor, windVec, -2.8);
      for (let i = 0; i < scarfSegs.length; i++) {
        orientSegmentBetween(scarfSegs[i], scarfWindChain.points[i], scarfWindChain.points[i + 1]);
      }

      // Update all 4 Reindeer with 4-beat gallop kinematics, GPU blend shapes & live reins!
      for (let idx = 0; idx < reindeerRigs.length; idx++) {
        const r = reindeerRigs[idx];
        const pose = evaluateReindeerGait(gallopAccum + r.phaseOffset, speedNorm);

        r.group.position.y = 0.82 + pose.bodyY;
        r.group.rotation.x = pose.bodyPitch;
        r.group.rotation.y = -turnRate * (idx >= 2 ? 0.22 : 0.1);
        r.headGroup.rotation.x = pose.headPitch;

        r.fl.rotation.x = pose.flUpper;
        r.flShin.rotation.x = pose.flShin;
        r.fr.rotation.x = pose.frUpper;
        r.frShin.rotation.x = pose.frShin;
        r.bl.rotation.x = pose.blUpper;
        r.blShin.rotation.x = pose.blShin;
        r.br.rotation.x = pose.brUpper;
        r.brShin.rotation.x = pose.brShin;

        // Torso blend shapes (archSpine, extendSpine, idle breathe)
        const breatheW = speedKmh < 5 ? 0.5 + 0.5 * Math.sin(time * 2.1 + r.phaseOffset) : 0;
        if (r.torsoMesh.morphTargetInfluences) {
          r.torsoMesh.morphTargetInfluences[0] = pose.spineArch;
          r.torsoMesh.morphTargetInfluences[1] = pose.spineExtend;
          r.torsoMesh.morphTargetInfluences[2] = breatheW;
        }

        // Reindeer independent blink + earPerk + snoutFlare blend shapes
        r.blinkTimer -= dt;
        if (r.blinkTimer <= 0) {
          r.blinkTimer = 2.6 + Math.random() * 3.4;
          r.blinkVal = 1.0;
        }
        r.blinkVal = Math.max(0, r.blinkVal - dt * 8);

        const earPerkW = landmarkTimer > 0 || hoHoHoTimer > 0 ? 1.0 : 0.25;
        const flareW = speedKmh < 5 ? breatheW * 0.7 : 0;
        if (r.craniumMesh.morphTargetInfluences) {
          r.craniumMesh.morphTargetInfluences[0] = r.blinkVal;
          r.craniumMesh.morphTargetInfluences[1] = earPerkW;
          r.craniumMesh.morphTargetInfluences[2] = flareW;
        }
        for (const eye of r.eyes) eye.scale.y = Math.max(0.12, 1 - r.blinkVal * 0.88);
        r.ears.forEach((ear, eIdx) => {
          ear.rotation.x = 0.25 - earPerkW * 0.35 + speedNorm * 0.28 + (eIdx === 0 ? 0.04 : -0.04);
        });

        // Cold breath puffs when standing still (< 5 km/h)
        const showBreath = speedKmh < 5;
        r.breathPuffs.forEach((puff, pIdx) => {
          puff.visible = showBreath;
          if (!showBreath) return;
          const cyc = (time * 0.6 + r.phaseOffset + pIdx * 0.33) % 1;
          puff.position.set(Math.sin(cyc * 4) * 0.05, 0.32 + cyc * 0.38, -0.52 - cyc * 0.42);
          const sc = 0.6 + cyc * 1.65;
          puff.scale.set(sc, sc, sc);
          (puff.material as THREE.MeshBasicMaterial).opacity = (1 - cyc) * 0.38;
        });

        // Dynamic sagging leather/gold reins connecting Santa's mittens to each reindeer's collar!
        const hand = r.slotX < 0 ? leftMittenPos : rightMittenPos;
        reinStart.set(hand.x, 1.05 + hand.y, 0.52 + hand.z);
        reinEnd.set(r.group.position.x, r.group.position.y + 0.14, r.slotZ - 0.32);
        const sag = 0.32 - speedNorm * 0.18 + Math.sin(gallopAccum + r.phaseOffset) * 0.05;
        reinMid.addVectors(reinStart, reinEnd).multiplyScalar(0.5);
        reinMid.y -= sag;
        orientSegmentBetween(r.reinSegA, reinStart, reinMid);
        orientSegmentBetween(r.reinSegB, reinMid, reinEnd);
      }
    },
    getTrailOrigin(out: THREE.Vector3): THREE.Vector3 {
      out.set(0, 0.32, 2.05);
      return root.localToWorld(out);
    },
  };
}

export interface PixarCottageHandle {
  group: THREE.Group;
  setLit(amount: number): void;
  update(dt: number, time: number): void;
}

export function createPixarCottage(seed = 0): PixarCottageHandle {
  const group = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({
    map: getTimberTex(),
    roughness: 0.78,
  });
  const snowMat = createSparklingSnowMaterial('#b2cae8');

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.4, 3.3), wallMat);
  cabin.position.y = 1.2;
  group.add(cabin);

  const roofDarkMat = new THREE.MeshStandardMaterial({ color: '#1b1d32', roughness: 0.85 });
  const roofBase = new THREE.Mesh(new THREE.ConeGeometry(3.3, 2.2, 4), roofDarkMat);
  roofBase.rotation.y = Math.PI * 0.25;
  roofBase.position.y = 3.4;
  group.add(roofBase);

  const roofSnow = new THREE.Mesh(new THREE.ConeGeometry(3.48, 1.9, 4), snowMat);
  roofSnow.rotation.y = Math.PI * 0.25;
  roofSnow.position.y = 3.65;
  group.add(roofSnow);

  for (const sx of [-1.85, 0, 1.85]) {
    for (const sz of [-1.75, 1.75]) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 8), snowMat);
      puff.scale.set(1.5, 0.7, 1.1);
      puff.position.set(sx, 2.42, sz);
      group.add(puff);
    }
  }

  const chim = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 1.35, 0.55),
    new THREE.MeshStandardMaterial({ color: '#4c383d', roughness: 0.9 })
  );
  chim.position.set(1.05, 3.85, 0.65);
  group.add(chim);

  const smokePuffs: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const sm = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 8, 8),
      new THREE.MeshBasicMaterial({ color: '#dbe8fa', transparent: true, opacity: 0.26 })
    );
    group.add(sm);
    smokePuffs.push(sm);
  }

  const winMat = new THREE.MeshStandardMaterial({
    map: getWinTex(),
    emissiveMap: getWinTex(),
    emissive: new THREE.Color('#ffbd59'),
    emissiveIntensity: 1.85,
    roughness: 0.3,
  });

  const winGeo = new THREE.PlaneGeometry(0.9, 0.95);
  const frameMat = new THREE.MeshStandardMaterial({ color: '#efe5d6', roughness: 0.7 });
  const winPlacements: [number, number, number, number][] = [
    [-0.98, 1.25, 1.67, 0],
    [0.98, 1.25, 1.67, 0],
    [-0.98, 1.25, -1.67, Math.PI],
    [0.98, 1.25, -1.67, Math.PI],
    [-1.92, 1.25, 0, -Math.PI * 0.5],
    [1.92, 1.25, 0, Math.PI * 0.5],
  ];
  for (const [wx, wy, wz, ry] of winPlacements) {
    const wf = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.1, 0.08), frameMat);
    wf.position.set(wx, wy, wz);
    wf.rotation.y = ry;
    group.add(wf);

    const wp = new THREE.Mesh(winGeo, winMat);
    wp.position.set(wx + Math.sin(ry) * 0.05, wy, wz + Math.cos(ry) * 0.05);
    wp.rotation.y = ry;
    group.add(wp);
  }

  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 1.4, 0.1),
    new THREE.MeshStandardMaterial({ color: '#3b1c14', roughness: 0.8 })
  );
  door.position.set(0, 0.7, 1.67);
  group.add(door);

  const wreath = new THREE.Mesh(
    new THREE.TorusGeometry(0.2, 0.06, 6, 12),
    new THREE.MeshStandardMaterial({ color: '#14452f', roughness: 0.8 })
  );
  wreath.position.set(0, 1.05, 1.74);
  group.add(wreath);

  const bow = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 6, 6),
    new THREE.MeshStandardMaterial({ color: '#d91632' })
  );
  bow.position.set(0, 0.88, 1.78);
  group.add(bow);

  const porchLampMat = new THREE.MeshBasicMaterial({ color: '#ffe49e', toneMapped: false });
  const porchLamp = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), porchLampMat);
  porchLamp.position.set(0.55, 1.55, 1.78);
  group.add(porchLamp);

  const spillSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: getSoftGlowTexture(),
      color: '#ffba52',
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  spillSprite.scale.set(5.5, 4.0, 1);
  spillSprite.position.set(0, 1.2, 2.0);
  group.add(spillSprite);

  let litLevel = 1.0;

  return {
    group,
    setLit(amount: number): void {
      litLevel = Math.max(0, Math.min(1, amount));
      porchLampMat.color.setRGB(0.25 + litLevel * 0.75, 0.2 + litLevel * 0.68, 0.18 + litLevel * 0.44);
    },
    update(_dt: number, time: number): void {
      // Cozy fireplace hearth flicker inside cabin windows
      const flicker = 0.92 + 0.08 * Math.sin(time * 5.1 + seed) + 0.04 * Math.sin(time * 11.3 + seed * 2);
      winMat.emissiveIntensity = 0.08 + litLevel * 2.1 * flicker;
      spillSprite.material.opacity = litLevel * 0.36 * flicker;

      smokePuffs.forEach((puff, idx) => {
        const p = (time * 0.34 + idx * 0.25 + seed * 0.13) % 1;
        puff.position.set(
          1.05 + Math.sin(p * 4 + seed) * 0.25 - p * 0.35,
          4.6 + p * 2.4,
          0.65 + Math.cos(p * 3) * 0.18
        );
        const s = 0.7 + p * 2.0;
        puff.scale.set(s, s, s);
        (puff.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.26;
      });
    },
  };
}

export interface PixarPineHandle {
  group: THREE.Group;
  setLit(amount: number): void;
}

export function createPixarPineTree(lit = true, seed = 0): PixarPineHandle {
  const group = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.38, 1.3, 8),
    new THREE.MeshStandardMaterial({ color: '#3b2016', roughness: 0.9 })
  );
  trunk.position.y = 0.65;
  group.add(trunk);

  const greenMat = new THREE.MeshPhysicalMaterial({
    color: '#0e3a2f',
    roughness: 0.78,
    sheen: 0.25,
    sheenColor: new THREE.Color('#286e58'),
  });
  const snowMat = createSparklingSnowMaterial('#b2cae8');

  for (let t = 0; t < 5; t++) {
    const r = 2.15 - t * 0.36;
    const h = 2.05 - t * 0.16;
    const y = 1.65 + t * 1.15;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 10), greenMat);
    cone.position.y = y;
    cone.rotation.y = t * 0.4 + seed;
    group.add(cone);

    const cap = new THREE.Mesh(new THREE.ConeGeometry(r * 0.78, h * 0.48, 10), snowMat);
    cap.position.y = y + h * 0.3;
    cap.rotation.y = t * 0.4 + seed;
    group.add(cap);
  }

  const bulbMats: THREE.MeshBasicMaterial[] = [];
  let topperMat: THREE.MeshBasicMaterial | null = null;

  if (lit) {
    const palette = ['#ffd468', '#ff3b4c', '#fff4cc'];
    for (let i = 0; i < 12; i++) {
      const f = i / 12;
      const angle = i * 1.45 + seed;
      const y = 1.45 + f * 5.0;
      const rad = 1.65 * (1 - f * 0.76);
      const bm = new THREE.MeshBasicMaterial({
        color: palette[i % palette.length],
        toneMapped: false,
      });
      bulbMats.push(bm);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), bm);
      bulb.position.set(Math.cos(angle) * rad, y, Math.sin(angle) * rad);
      group.add(bulb);
    }

    topperMat = new THREE.MeshBasicMaterial({ color: '#ffe588', toneMapped: false });
    const topper = new THREE.Mesh(new THREE.OctahedronGeometry(0.26, 0), topperMat);
    topper.position.y = 7.35;
    group.add(topper);
  }

  return {
    group,
    setLit(amount: number): void {
      const a = Math.max(0.06, Math.min(1, amount));
      bulbMats.forEach((m, idx) => {
        if (idx % 3 === 1) m.color.setRGB(a * 1.35, a * 0.2, a * 0.26);
        else m.color.setRGB(a * 1.35, a * 1.08, a * 0.48);
      });
      if (topperMat) {
        topperMat.color.setRGB(a * 1.4, a * 1.2, a * 0.55);
      }
    },
  };
}

export interface PixarStreetLampHandle {
  group: THREE.Group;
  setLit(amount: number): void;
}

export function createPixarStreetLamp(): PixarStreetLampHandle {
  const group = new THREE.Group();
  const ironMat = new THREE.MeshStandardMaterial({
    color: '#1b2030',
    metalness: 0.75,
    roughness: 0.35,
  });

  const pts = [
    new THREE.Vector2(0.28, 0),
    new THREE.Vector2(0.24, 0.35),
    new THREE.Vector2(0.14, 0.9),
    new THREE.Vector2(0.09, 1.3),
    new THREE.Vector2(0.075, 4.3),
    new THREE.Vector2(0.18, 4.42),
  ];
  const post = new THREE.Mesh(new THREE.LatheGeometry(pts, 12), ironMat);
  group.add(post);

  const wreath = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.045, 6, 12),
    new THREE.MeshStandardMaterial({ color: '#14452f', roughness: 0.8 })
  );
  wreath.position.set(0, 3.2, 0.1);
  group.add(wreath);
  const bow = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 6, 6),
    new THREE.MeshStandardMaterial({ color: '#d91632' })
  );
  bow.position.set(0, 3.05, 0.14);
  group.add(bow);

  const bulbMat = new THREE.MeshBasicMaterial({ color: '#ffeaad', toneMapped: false });
  const lanternGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.17, 0.52, 6), bulbMat);
  lanternGlass.position.y = 4.68;
  group.add(lanternGlass);

  const lanternCap = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.25, 6), ironMat);
  lanternCap.position.y = 5.05;
  group.add(lanternCap);

  const coneMat = createVolumetricBeamMaterial('#ffdc92', 0.26);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(2.3, 4.6, 18, 1, true), coneMat);
  cone.position.y = 2.35;
  group.add(cone);

  const poolMat = new THREE.MeshBasicMaterial({
    map: getSoftGlowTexture(),
    color: '#ffcf76',
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const pool = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 4.4), poolMat);
  pool.rotation.x = -Math.PI * 0.5;
  pool.position.y = 0.03;
  group.add(pool);

  return {
    group,
    setLit(amount: number): void {
      const a = Math.max(0.04, Math.min(1, amount));
      bulbMat.color.setRGB(0.2 + a * 1.15, 0.18 + a * 0.98, 0.22 + a * 0.52);
      coneMat.uniforms.uOpacity.value = a * 0.26;
      poolMat.opacity = a * 0.45;
    },
  };
}

export function createPixarSnowman(): THREE.Group {
  const g = new THREE.Group();
  const snowMat = createSparklingSnowMaterial('#f4f9ff');
  const radii = [0.55, 0.4, 0.28];
  const ys = [0.52, 1.3, 1.88];
  radii.forEach((r, idx) => {
    const s = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), snowMat);
    s.position.y = ys[idx];
    g.add(s);
  });

  const carrot = new THREE.Mesh(
    new THREE.ConeGeometry(0.06, 0.26, 8),
    new THREE.MeshStandardMaterial({ color: '#ff7a29', roughness: 0.5 })
  );
  carrot.rotation.x = Math.PI * 0.5;
  carrot.position.set(0, 1.88, 0.34);
  g.add(carrot);

  const coalMat = new THREE.MeshStandardMaterial({ color: '#17171f', roughness: 0.4 });
  for (const ex of [-0.1, 0.1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 8), coalMat);
    eye.position.set(ex, 1.97, 0.25);
    g.add(eye);
  }

  const scarfMat = new THREE.MeshStandardMaterial({ color: '#d91632', roughness: 0.8 });
  const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.07, 8, 14), scarfMat);
  scarf.rotation.x = Math.PI * 0.5;
  scarf.position.y = 1.62;
  g.add(scarf);

  const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 14), coalMat);
  hatBrim.position.y = 2.13;
  const hatTop = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.21, 0.32, 14), coalMat);
  hatTop.position.y = 2.3;
  g.add(hatBrim, hatTop);

  return g;
}

export interface HolidayRoadSignHandle {
  group: THREE.Group;
  setText(title: string, subtitle: string): void;
}

/**
 * Charming carved wooden North Pole signpost showing the live OpenStreetMap city & landmark!
 */
export function createHolidayRoadSign(): HolidayRoadSignHandle {
  const group = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: '#4d281a', roughness: 0.85 });
  const snowMat = createSparklingSnowMaterial('#b8cee8');

  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 3.6, 8), woodMat);
  post.position.y = 1.8;
  group.add(post);

  const board = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.25, 0.18), woodMat);
  board.position.set(0, 2.75, 0);
  group.add(board);

  // Snow cap & mini glowing brass lantern on signpost top
  const snowCap = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.16, 0.26), snowMat);
  snowCap.position.set(0, 3.44, 0);
  group.add(snowCap);

  const lantern = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 8, 8),
    new THREE.MeshBasicMaterial({ color: '#ffe59c', toneMapped: false })
  );
  lantern.position.set(-1.5, 3.62, 0.15);
  group.add(lantern);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext('2d')!;
  const signTex = new THREE.CanvasTexture(canvas);
  signTex.colorSpace = THREE.SRGBColorSpace;

  const signFaceMat = new THREE.MeshStandardMaterial({
    map: signTex,
    emissiveMap: signTex,
    emissive: new THREE.Color('#ffd990'),
    emissiveIntensity: 0.65,
    roughness: 0.4,
  });
  for (const side of [-1, 1]) {
    const face = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.12), signFaceMat);
    face.position.set(0, 2.75, side * 0.1);
    if (side < 0) face.rotation.y = Math.PI;
    group.add(face);
  }

  let lastKey = '';
  const setText = (title: string, subtitle: string) => {
    const key = `${title}|${subtitle}`;
    if (key === lastKey) return;
    lastKey = key;

    const grad = ctx.createLinearGradient(0, 0, 512, 192);
    grad.addColorStop(0, '#5e1020');
    grad.addColorStop(1, '#360914');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 192);
    ctx.strokeStyle = '#f6cf78';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 492, 172);

    ctx.fillStyle = '#fff6df';
    ctx.font = '700 40px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title.slice(0, 22), 256, 72, 468);

    ctx.fillStyle = '#ffcf76';
    ctx.font = '600 24px Inter, sans-serif';
    ctx.fillText(subtitle.slice(0, 32), 256, 130, 468);
    signTex.needsUpdate = true;
  };

  setText('NORTH POLE', 'Stockholm');

  return { group, setText };
}

/**
 * Gleaming clearcoat frozen mirror-ice lake plane for OSM `water` biomes!
 */
export function createFrozenLakePlane(width = 80, length = 80): THREE.Mesh {
  const mat = new THREE.MeshPhysicalMaterial({
    color: '#1b3a6b',
    roughness: 0.08,
    metalness: 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    transparent: true,
    opacity: 0,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, length), mat);
  mesh.rotation.x = -Math.PI * 0.5;
  return mesh;
}

export interface PixarOptimusHandle {
  group: THREE.Group;
  update(time: number): void;
}

export function createPixarOptimusElf(): PixarOptimusHandle {
  return createAccurateOptimusGen2();
}

export interface PixarTeslaSemiHandle {
  group: THREE.Group;
  update(dt: number, wheelPhase: number, isBraking: boolean, rippleBoost: number, time: number): void;
}

export function createPixarTeslaSemi(): PixarTeslaSemiHandle {
  return createAccurateTeslaSemi();
}

export interface PixarCybertruckHandle {
  group: THREE.Group;
  update(wheelPhase: number, time: number): void;
}

export function createPixarCybertruck(): PixarCybertruckHandle {
  return createAccurateCybertruck(true);
}
