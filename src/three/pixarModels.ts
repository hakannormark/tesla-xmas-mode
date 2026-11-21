import * as THREE from 'three';
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

// Shared lightweight textures lazily created per module load
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
  getTrailOrigin(out: THREE.Vector3): THREE.Vector3;
}

interface ReindeerAnim {
  group: THREE.Group;
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
  breathPuffs: THREE.Mesh[];
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
  sideShape.bezierCurveTo(-1.45, 0.95, -1.25, 1.48, -0.78, 1.48); // curled high backrest
  sideShape.bezierCurveTo(-0.45, 1.48, -0.25, 0.95, 0.05, 0.92); // dip for seat cockpit
  sideShape.bezierCurveTo(0.45, 0.88, 0.78, 1.12, 1.18, 1.24); // sweeping prow
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
  // Rotate so shape X runs along -Z (forward) and shape Y is up
  sideGeo.rotateY(Math.PI * 0.5);

  for (const sx of [-0.88, 0.76]) {
    const sideMesh = new THREE.Mesh(sideGeo, crimsonPaint);
    sideMesh.position.set(sx, 0.15, 0.65);
    sleighBodyGroup.add(sideMesh);
  }

  // Central sleigh floor, backrest & tufted velvet seat
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

  const frontCowl = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.84, 0.55, 16, 1, false, 0, Math.PI), crimsonPaint);
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
    const runnerGeo = new THREE.TubeGeometry(runnerCurve, 28, 0.055, 8, false);
    sleighBodyGroup.add(new THREE.Mesh(runnerGeo, goldMat));

    // Curved gold struts connecting runners to sleigh hull
    for (const sz of [1.4, 0.35, -0.45]) {
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.46, 8), goldMat);
      strut.position.set(rx, 0.34, sz);
      sleighBodyGroup.add(strut);
    }

    // Golden scrollwork rail along upper side edge
    const trimCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(rx * 1.06, 1.62, 1.45),
      new THREE.Vector3(rx * 1.06, 1.08, 0.65),
      new THREE.Vector3(rx * 1.06, 1.4, -0.48),
    ]);
    sleighBodyGroup.add(new THREE.Mesh(new THREE.TubeGeometry(trimCurve, 20, 0.032, 6, false), goldMat));
  }

  // Hanging Front Brass Bow Lantern with blooming warm core
  const lanternArm = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 6, 12, Math.PI), goldMat);
  lanternArm.rotation.y = Math.PI * 0.5;
  lanternArm.position.set(0, 1.38, -0.78);
  sleighBodyGroup.add(lanternArm);

  const lanternGlowMat = new THREE.MeshBasicMaterial({ color: '#fff3c4', toneMapped: false });
  const lanternBulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), lanternGlowMat);
  lanternBulb.position.set(0, 1.24, -0.98);
  sleighBodyGroup.add(lanternBulb);

  const lanternCap = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.16, 6), goldMat);
  lanternCap.position.set(0, 1.38, -0.98);
  sleighBodyGroup.add(lanternCap);

  const sleighLight = new THREE.PointLight('#ffcc75', 6.5, 18);
  sleighLight.position.set(0, 1.35, -1.15);
  sleighBodyGroup.add(sleighLight);

  // Overflowing Burlap Gift Sack + Presents + Candy Canes
  const sackMat = new THREE.MeshStandardMaterial({ color: '#8a5d3b', roughness: 0.92 });
  const sack = new THREE.Mesh(new THREE.SphereGeometry(0.62, 14, 12), sackMat);
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

  // --- Expressive Pixar Santa ---
  const santa = new THREE.Group();
  santa.position.set(0, 1.05, 0.52);

  const santaBelly = new THREE.Mesh(new THREE.SphereGeometry(0.42, 14, 12), crimsonPaint);
  santaBelly.scale.set(1.05, 1.15, 0.95);
  santaBelly.position.y = 0.32;
  santa.add(santaBelly);

  // Fur trim + black belt + gold buckle
  const furHem = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.08, 8, 16), snowFurMat);
  furHem.rotation.x = Math.PI * 0.5;
  furHem.position.y = 0.05;
  santa.add(furHem);

  const belt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.43, 0.43, 0.11, 16),
    new THREE.MeshStandardMaterial({ color: '#17171f', roughness: 0.4 })
  );
  belt.position.y = 0.26;
  santa.add(belt);

  const buckle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.024, 6, 4), goldMat);
  buckle.rotation.z = Math.PI * 0.25;
  buckle.position.set(0, 0.26, -0.43);
  santa.add(buckle);

  // Rosy Face, Glossy Eyes with Specular Catchlights, Beard & Mustache
  const skinMat = new THREE.MeshPhysicalMaterial({ color: '#f7c8ae', roughness: 0.6, sheen: 0.3 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 14), skinMat);
  head.position.set(0, 0.9, -0.02);
  santa.add(head);

  // Rosy cheeks + button nose
  const cheekMat = new THREE.MeshStandardMaterial({ color: '#ef767a', roughness: 0.6 });
  for (const cx of [-0.14, 0.14]) {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), cheekMat);
    cheek.position.set(cx, 0.86, -0.23);
    santa.add(cheek);

    // Glossy eyes + crisp white catchlight
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.036, 8, 8),
      new THREE.MeshPhysicalMaterial({ color: '#14141d', roughness: 0.08, clearcoat: 1 })
    );
    eye.position.set(cx * 0.68, 0.94, -0.26);
    santa.add(eye);

    const glint = new THREE.Mesh(
      new THREE.SphereGeometry(0.012, 6, 6),
      new THREE.MeshBasicMaterial({ color: '#ffffff' })
    );
    glint.position.set(cx * 0.68 + 0.012, 0.955, -0.292);
    santa.add(glint);
  }

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), cheekMat);
  nose.position.set(0, 0.89, -0.3);
  santa.add(nose);

  // Fluffy layered Pixar beard + twin curved mustache puffs
  const beardSpheres = [
    [0, 0.72, -0.22, 0.2],
    [-0.12, 0.77, -0.18, 0.14],
    [0.12, 0.77, -0.18, 0.14],
    [0, 0.6, -0.2, 0.15],
  ];
  for (const [bx, by, bz, br] of beardSpheres) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(br, 10, 10), snowFurMat);
    b.position.set(bx, by, bz);
    santa.add(b);
  }
  for (const mx of [-0.08, 0.08]) {
    const stache = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.07, 4, 8), snowFurMat);
    stache.rotation.z = mx < 0 ? 1.2 : -1.2;
    stache.position.set(mx, 0.83, -0.28);
    santa.add(stache);
  }

  // Animated floppy Santa Hat & Scarf
  const hatGroup = new THREE.Group();
  hatGroup.position.set(0, 1.08, -0.02);
  const hatBrim = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.068, 8, 16), snowFurMat);
  hatBrim.rotation.x = Math.PI * 0.5;
  hatGroup.add(hatBrim);

  const hatCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.02, 0),
    new THREE.Vector3(0, 0.28, 0.08),
    new THREE.Vector3(0.04, 0.38, 0.34),
    new THREE.Vector3(0.08, 0.24, 0.54),
  ]);
  const hatMesh = new THREE.Mesh(new THREE.TubeGeometry(hatCurve, 12, 0.14, 10, false), crimsonPaint);
  hatMesh.scale.set(1.2, 1, 1);
  hatGroup.add(hatMesh);

  const pom = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 10), snowFurMat);
  pom.position.set(0.08, 0.22, 0.56);
  hatGroup.add(pom);
  santa.add(hatGroup);

  const scarfCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.16, 0.65, 0.06),
    new THREE.Vector3(0.24, 0.62, 0.55),
    new THREE.Vector3(0.32, 0.56, 1.05),
  ]);
  const scarfMesh = new THREE.Mesh(new THREE.TubeGeometry(scarfCurve, 12, 0.055, 6, false), goldMat);
  santa.add(scarfMesh);

  // Arms + Red Mittens holding golden reins
  for (const ax of [-0.36, 0.36]) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.32, 6, 8), crimsonPaint);
    arm.position.set(ax, 0.52, -0.24);
    arm.rotation.x = -0.95;
    arm.rotation.z = ax < 0 ? 0.25 : -0.25;
    santa.add(arm);

    const mitten = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), velvetMat);
    mitten.position.set(ax * 0.85, 0.44, -0.48);
    santa.add(mitten);
  }
  sleighBodyGroup.add(santa);

  // --- Sculpted 4-Reindeer Team (2x2 formation, Rudolph front-right!) ---
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

  const deerSlots = [
    { x: -0.78, z: -2.65, phase: 0.4, rudolph: false },
    { x: 0.78, z: -2.65, phase: 1.15, rudolph: false },
    { x: -0.75, z: -5.45, phase: 2.0, rudolph: false },
    { x: 0.75, z: -5.45, phase: 0.0, rudolph: true },
  ];

  const reindeerRigs: ReindeerAnim[] = [];

  for (const slot of deerSlots) {
    const dg = new THREE.Group();
    dg.position.set(slot.x, 0.82, slot.z);

    // Tapered organic body
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.68, 8, 12), furMat);
    torso.rotation.x = Math.PI * 0.5;
    dg.add(torso);

    // Cream chest fluff + bouncy little white tail
    const chestFluff = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), muzzleMat);
    chestFluff.position.set(0, -0.02, -0.34);
    dg.add(chestFluff);

    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.24, 8), snowFurMat);
    tail.rotation.x = 0.85;
    tail.position.set(0, 0.14, 0.52);
    dg.add(tail);

    // Red harness collar with gleaming 3D gold jingle bells!
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.045, 8, 14), crimsonPaint);
    collar.rotation.x = 0.35;
    collar.position.set(0, 0.1, -0.32);
    dg.add(collar);

    for (const bx of [-0.12, 0, 0.12]) {
      const bell = new THREE.Mesh(new THREE.SphereGeometry(0.048, 8, 8), goldMat);
      bell.position.set(bx, -0.08, -0.45);
      dg.add(bell);
    }

    // Expressive Disney-proportioned Head + Neck + Curved Antlers
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.24, -0.38);

    const neck = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.32, 6, 10), furMat);
    neck.rotation.x = -0.45;
    neck.position.set(0, 0.14, -0.08);
    headGroup.add(neck);

    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), furMat);
    cranium.position.set(0, 0.36, -0.2);
    headGroup.add(cranium);

    const snout = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.16, 6, 10), muzzleMat);
    snout.rotation.x = Math.PI * 0.5;
    snout.position.set(0, 0.31, -0.36);
    headGroup.add(snout);

    // Glossy Pixar eyes with white specular catchlights + cute ears
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(
        new THREE.SphereGeometry(0.042, 8, 8),
        new THREE.MeshPhysicalMaterial({ color: '#121218', roughness: 0.05, clearcoat: 1 })
      );
      eye.position.set(side * 0.12, 0.41, -0.31);
      headGroup.add(eye);

      const catchlight = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 6, 6),
        new THREE.MeshBasicMaterial({ color: '#ffffff' })
      );
      catchlight.position.set(side * 0.12 + 0.012, 0.425, -0.345);
      headGroup.add(catchlight);

      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 6), furMat);
      ear.rotation.z = side * -1.1;
      ear.rotation.x = 0.25;
      ear.position.set(side * 0.19, 0.45, -0.14);
      headGroup.add(ear);

      // Multi-tine curved antlers
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

    // Rudolph's Blooming Ruby Red Nose!
    if (slot.rudolph) {
      const noseBulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.088, 12, 12),
        new THREE.MeshBasicMaterial({ color: '#ff2b3d', toneMapped: false })
      );
      noseBulb.position.set(0, 0.34, -0.49);
      headGroup.add(noseBulb);

      const noseGlow = new THREE.PointLight('#ff3b4c', 5.0, 12);
      noseGlow.position.set(0, 0.42, -0.75);
      headGroup.add(noseGlow);
    } else {
      const darkNose = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), hoofMat);
      darkNose.position.set(0, 0.34, -0.47);
      headGroup.add(darkNose);
    }

    dg.add(headGroup);

    // 2-Segment Articulated Legs (upper thigh + pivoting shin + hoof)
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

    // Animated cold breath puffs for stationary idle
    const breathPuffs: THREE.Mesh[] = [];
    for (let p = 0; p < 3; p++) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), puffMat.clone());
      puff.visible = false;
      headGroup.add(puff);
      breathPuffs.push(puff);
    }

    // Golden rein spline connecting back to sleigh prow
    const reinCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(slot.x, 0.92, slot.z + 0.1),
      new THREE.Vector3(slot.x * 0.55, 1.05, slot.z * 0.5),
      new THREE.Vector3(slot.x > 0 ? 0.3 : -0.3, 1.48, 0.04),
    ]);
    root.add(new THREE.Mesh(new THREE.TubeGeometry(reinCurve, 14, 0.014, 5, false), goldMat));

    root.add(dg);
    reindeerRigs.push({
      group: dg,
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
      breathPuffs,
    });
  }

  let gallopAccum = 0;

  return {
    group: root,
    update(dt: number, speedKmh: number, turnRate: number, accel: number, time: number): void {
      const speedNorm = Math.min(1, speedKmh / 110);
      const gallopRate = speedKmh < 2 ? 2.4 : 6.0 + speedNorm * 10.5;
      gallopAccum += gallopRate * dt;

      // Expressive hat pom-pom bounce & scarf flutter
      hatGroup.rotation.x = -0.15 - speedNorm * 0.28 + Math.sin(time * 9) * 0.07;
      hatGroup.rotation.z = -turnRate * 0.25;
      scarfMesh.rotation.y = Math.sin(time * (4 + speedNorm * 8)) * (0.06 + speedNorm * 0.14);

      // Gentle pitch/roll on sleigh body
      sleighBodyGroup.rotation.x = accel * 0.018;
      sleighBodyGroup.rotation.z = -turnRate * 0.09;

      for (const r of reindeerRigs) {
        const p = gallopAccum + r.phaseOffset;
        const amp = 0.12 + speedNorm * 0.72;
        r.group.position.y = 0.82 + Math.sin(p) * (0.04 + speedNorm * 0.24);
        r.group.rotation.x = Math.cos(p) * (0.03 + speedNorm * 0.16);
        r.headGroup.rotation.x = -Math.cos(p) * (0.04 + speedNorm * 0.12);

        const fSwing = Math.sin(p) * amp;
        const bSwing = Math.sin(p + Math.PI * 0.85) * amp;
        r.fl.rotation.x = fSwing;
        r.fr.rotation.x = Math.sin(p + 0.45) * amp;
        r.flShin.rotation.x = Math.max(0, -fSwing) * 0.9;
        r.frShin.rotation.x = Math.max(0, -Math.sin(p + 0.45) * amp) * 0.9;

        r.bl.rotation.x = bSwing;
        r.br.rotation.x = Math.sin(p + Math.PI * 0.85 + 0.4) * amp;
        r.blShin.rotation.x = Math.max(0, bSwing) * 0.65;
        r.brShin.rotation.x = Math.max(0, Math.sin(p + Math.PI * 0.85 + 0.4) * amp) * 0.65;

        // Cold winter breath puffs when standing still (< 5 km/h)
        const showBreath = speedKmh < 5;
        r.breathPuffs.forEach((puff, idx) => {
          puff.visible = showBreath;
          if (!showBreath) return;
          const cyc = (time * 0.6 + r.phaseOffset + idx * 0.33) % 1;
          puff.position.set(
            Math.sin(cyc * 4) * 0.05,
            0.32 + cyc * 0.38,
            -0.52 - cyc * 0.42
          );
          const sc = 0.6 + cyc * 1.65;
          puff.scale.set(sc, sc, sc);
          (puff.material as THREE.MeshBasicMaterial).opacity = (1 - cyc) * 0.38;
        });
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

  // Cozy slightly tapered cabin walls
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.4, 3.3), wallMat);
  cabin.position.y = 1.2;
  group.add(cabin);

  // Steep pitched storybook roof + thick puffy snow eaves overhang
  const roofDarkMat = new THREE.MeshStandardMaterial({ color: '#1b1d32', roughness: 0.85 });
  const roofBase = new THREE.Mesh(new THREE.ConeGeometry(3.3, 2.2, 4), roofDarkMat);
  roofBase.rotation.y = Math.PI * 0.25;
  roofBase.position.y = 3.4;
  group.add(roofBase);

  const roofSnow = new THREE.Mesh(new THREE.ConeGeometry(3.48, 1.9, 4), snowMat);
  roofSnow.rotation.y = Math.PI * 0.25;
  roofSnow.position.y = 3.65;
  group.add(roofSnow);

  // Sculpted puffy corner snow pillows along eaves
  for (const sx of [-1.85, 0, 1.85]) {
    for (const sz of [-1.75, 1.75]) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 8), snowMat);
      puff.scale.set(1.5, 0.7, 1.1);
      puff.position.set(sx, 2.42, sz);
      group.add(puff);
    }
  }

  // Stone chimney + animated billowing 3D smoke puffs
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

  // Warm glowing multi-pane windows (emissive modulated via setLit!)
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

  // Front wooden door with festive evergreen wreath + red bow + porch lantern
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

  // Subtle exterior glow sprite
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

  return {
    group,
    setLit(amount: number): void {
      const a = Math.max(0, Math.min(1, amount));
      winMat.emissiveIntensity = 0.08 + a * 2.1;
      porchLampMat.color.setRGB(0.25 + a * 0.75, 0.2 + a * 0.68, 0.18 + a * 0.44);
      spillSprite.material.opacity = a * 0.36;
    },
    update(_dt: number, time: number): void {
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

  // 5 lush layered evergreen tiers with puffy snow caps
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

  // Lathe-turned Victorian post
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

  // Festive wreath + crimson bow wrapped around pole
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

  // Glowing octagonal lantern glass + cap
  const bulbMat = new THREE.MeshBasicMaterial({ color: '#ffeaad', toneMapped: false });
  const lanternGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.17, 0.52, 6), bulbMat);
  lanternGlass.position.y = 4.68;
  group.add(lanternGlass);

  const lanternCap = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.25, 6), ironMat);
  lanternCap.position.y = 5.05;
  group.add(lanternCap);

  // Dreamy Volumetric Fresnel Light Cone
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

  // Carrot nose, coal eyes & top hat
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

  // Crimson scarf + top hat
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
