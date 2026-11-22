import * as THREE from 'three';
import { ELON_MILESTONES, TimelineDioramaKind } from '../core/elonTimelineData';
import { i18n } from '../core/i18n';
import {
  createSparklingSnowMaterial,
  createVolumetricBeamMaterial,
  getSoftGlowTexture,
} from './pixarMaterials';
import { createPixarCottage } from './pixarModels';
import {
  createAccurateCybertruck,
  createAccurateOptimusGen2,
  createAccurateStarmanRoadster,
  createAccurateStarshipStack,
  createAccurateSuperchargerPlaza,
  createAccurateTeslaSemi,
} from './teslaModels';

let sharedGoldMat: THREE.MeshStandardMaterial | null = null;
let sharedSteelMat: THREE.MeshPhysicalMaterial | null = null;
let sharedBulbMat: THREE.MeshBasicMaterial | null = null;
let sharedSnowApronMat: THREE.MeshPhysicalMaterial | null = null;

function markShared<T extends THREE.Material>(m: T): T {
  m.userData.shared = true;
  return m;
}

function getMats() {
  if (!sharedGoldMat) {
    sharedGoldMat = markShared(
      new THREE.MeshStandardMaterial({ color: '#ffd166', metalness: 0.88, roughness: 0.2 })
    );
  }
  if (!sharedSteelMat) {
    sharedSteelMat = markShared(
      new THREE.MeshPhysicalMaterial({ color: '#dce6f5', metalness: 0.9, roughness: 0.2 })
    );
  }
  if (!sharedBulbMat) {
    sharedBulbMat = markShared(
      new THREE.MeshBasicMaterial({ color: '#fff3c4', toneMapped: false })
    );
  }
  if (!sharedSnowApronMat) {
    sharedSnowApronMat = markShared(createSparklingSnowMaterial('#9ab7df'));
  }
  return {
    gold: sharedGoldMat,
    steel: sharedSteelMat,
    bulb: sharedBulbMat,
    snow: sharedSnowApronMat,
  };
}

export function createTimelineSignPlane(
  text: string,
  bgHex: string,
  fgHex: string,
  w = 512,
  h = 160,
  worldWidth = 4.6
): THREE.Mesh {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = fgHex;
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, w - 16, h - 16);
  ctx.fillStyle = fgHex;
  ctx.font = `700 ${Math.round(h * 0.4)}px "Cinzel", Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, w * 0.5, h * 0.52, w - 44);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData.ownedByTimeline = true;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(worldWidth, (worldWidth * h) / w),
    new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      toneMapped: false,
      side: THREE.DoubleSide,
    })
  );
}

export interface RoadsideMilestoneSlot {
  milestoneIndex: number;
  root: THREE.Group;
  spectacle: THREE.Group;
  side: -1 | 1;
  isOverhead: boolean;
  zOffset: number;
  announced: boolean;
  updater?: (time: number, dt: number, approachProgress: number) => void;
}

export function disposeTimelineGroup(group: THREE.Group): void {
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry && !mesh.geometry.userData?.shared) {
      mesh.geometry.dispose();
    }
    const mat = mesh.material;
    const disposeMat = (m: THREE.Material) => {
      if (m.userData?.shared) return;
      const std = m as THREE.MeshStandardMaterial;
      if (std.map?.userData?.ownedByTimeline) std.map.dispose();
      if (std.emissiveMap?.userData?.ownedByTimeline) std.emissiveMap.dispose();
      m.dispose();
    };
    if (Array.isArray(mat)) mat.forEach(disposeMat);
    else if (mat) disposeMat(mat);
  });
  group.clear();
}

function formatMarqueeText(year: string, title: string, maxChars = 28): string {
  const clean = title.trim();
  if (clean.length <= maxChars) return `${year} · ${clean}`;
  const cut = clean.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > 10 ? cut.slice(0, lastSpace) : cut;
  return `${year} · ${trimmed}…`;
}

export function createRoadsideMilestoneEvent(
  milestoneIndex: number,
  zOffset: number,
  getRoadX: (z: number) => number,
  lateralOffset = 13.4,
  sideOverride?: -1 | 1
): RoadsideMilestoneSlot {
  const m = ELON_MILESTONES[milestoneIndex];
  const side: -1 | 1 = sideOverride ?? (milestoneIndex % 2 === 0 ? -1 : 1);
  const isOverhead = m.diorama === 'starman' || m.diorama === 'dragon_starlink';

  const root = new THREE.Group();
  const mats = getMats();

  // 1. Wide Sparkling Golden Holiday Archway Portal straddling the highway cleanly
  const portalRadius = 5.2;
  const archGroup = new THREE.Group();
  const torus = new THREE.Mesh(new THREE.TorusGeometry(portalRadius, 0.17, 10, 30, Math.PI), mats.gold);
  torus.position.y = 1.65;
  archGroup.add(torus);

  for (const px of [-portalRadius, portalRadius]) {
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.54, 0.5, 10), mats.snow);
    plinth.position.set(px, 0.24, 0);
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 1.85, 8), mats.gold);
    col.position.set(px, 0.9, 0);
    archGroup.add(plinth, col);
  }
  for (let b = 0; b <= 10; b++) {
    const ang = (b / 10) * Math.PI;
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.15, 6, 6), mats.bulb);
    bulb.position.set(Math.cos(ang) * portalRadius, 1.65 + Math.sin(ang) * portalRadius, 0.14);
    archGroup.add(bulb);
  }

  const headerSign = createTimelineSignPlane(
    formatMarqueeText(m.year, m[i18n.getLocale()].title, 28),
    '#2c0d1c',
    '#ffd87a',
    640,
    128,
    6.2
  );
  headerSign.position.set(0, portalRadius + 2.25, 0.15);
  archGroup.add(headerSign);
  root.add(archGroup);

  // 2. Sculpted Roadside Snow-Mound Stage or Overhead Celestial Spectacle
  const spec = new THREE.Group();
  let updater: ((time: number, dt: number, approachProgress: number) => void) | undefined;

  if (isOverhead) {
    spec.position.set(0, 0, -2);
  } else {
    // Anchored at local z = 0 perpendicular to curving road so turns NEVER swing stage onto asphalt!
    spec.position.set(side * lateralOffset, 0, 0);
    spec.scale.setScalar(1.42);
    spec.rotation.y = side > 0 ? -0.45 : 0.45;

    // Pillowy Pixar snow mound apron with soft colored holiday rim glow
    const mound = new THREE.Mesh(
      new THREE.SphereGeometry(5.2, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mats.snow
    );
    mound.scale.set(1.0, 0.08, 1.0);
    mound.position.y = -0.02;
    spec.add(mound);

    const glowRing = new THREE.Mesh(
      new THREE.RingGeometry(4.6, 5.15, 28),
      new THREE.MeshBasicMaterial({
        color: m.accentHex,
        transparent: true,
        opacity: 0.62,
        side: THREE.DoubleSide,
        toneMapped: false,
      })
    );
    glowRing.rotation.x = -Math.PI * 0.5;
    glowRing.position.y = 0.06;
    spec.add(glowRing);

    // Tall skyward volumetric spotlight beacon visible from 160m down the highway!
    const beaconBeam = new THREE.Mesh(
      new THREE.ConeGeometry(3.4, 24, 16, 1, true),
      createVolumetricBeamMaterial(m.accentHex, 0.18)
    );
    beaconBeam.rotation.x = Math.PI;
    beaconBeam.position.set(0, 12.2, 0);
    spec.add(beaconBeam);

    // Tall Illuminated Roadside Monument Billboard next to stage for instant readability ahead
    const postMat = mats.gold;
    for (const bx of [-1.8, 1.8]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 4.6, 8), postMat);
      p.position.set(bx, 2.3, -2.9);
      spec.add(p);
    }
    const monumentBoard = createTimelineSignPlane(
      formatMarqueeText(m.year, m[i18n.getLocale()].title, 26),
      '#1e0918',
      m.accentHex,
      640,
      192,
      4.6
    );
    monumentBoard.position.set(0, 4.9, -2.9);
    spec.add(monumentBoard);
  }

  const kind: TimelineDioramaKind = m.diorama;
  if (kind === 'masterplan') {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 3.2, 16), mats.gold);
    pillar.position.y = 1.6;
    const plaque = createTimelineSignPlane('SECRET MASTER PLAN', '#3d101c', '#ffd166', 512, 160, 4.4);
    plaque.position.set(0, 2.5, 0.75);
    const star = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.85, 0),
      new THREE.MeshBasicMaterial({ color: '#ffe588', toneMapped: false })
    );
    star.position.y = 4.2;
    spec.add(pillar, plaque, star);
    updater = (t) => {
      star.rotation.y = t * 1.8;
      star.position.y = 4.2 + Math.sin(t * 2.8) * 0.25;
    };
  } else if (kind === 'roadster_f1') {
    const roadster = createAccurateStarmanRoadster();
    roadster.scale.setScalar(1.05);
    roadster.position.set(-0.9, 0.12, 0.6);
    const f1Body = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 4.2, 12), mats.steel);
    f1Body.position.set(1.8, 2.1, -0.8);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.8, 12), mats.steel);
    nose.position.set(1.8, 4.6, -0.8);
    spec.add(roadster, f1Body, nose);
  } else if (kind === 'models_supercharger') {
    const sc = createAccurateSuperchargerPlaza();
    sc.group.scale.setScalar(1.0);
    sc.group.position.y = 0.1;
    spec.add(sc.group);
    updater = (t) => sc.update(t);
  } else if (kind === 'falcon_landing') {
    const lzPad = createTimelineSignPlane('LZ-1', '#1a2236', '#6edcff', 256, 128, 3.6);
    lzPad.rotation.x = -Math.PI * 0.5;
    lzPad.position.y = 0.18;
    const rocketGroup = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 5.2, 14), mats.steel);
    body.position.y = 2.6;
    const interstage = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 1.0, 14),
      new THREE.MeshStandardMaterial({ color: '#141720' })
    );
    interstage.position.y = 4.8;
    rocketGroup.add(body, interstage);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 1.25, 0.18),
        new THREE.MeshStandardMaterial({ color: '#1b202e' })
      );
      leg.position.set(Math.cos(a) * 0.72, 0.45, Math.sin(a) * 0.72);
      leg.rotation.z = Math.cos(a) * -0.55;
      leg.rotation.x = Math.sin(a) * 0.55;
      rocketGroup.add(leg);
    }
    const burn = new THREE.Mesh(
      new THREE.ConeGeometry(0.5, 2.0, 12),
      new THREE.MeshBasicMaterial({ color: '#ffbd55', transparent: true, opacity: 0.85, toneMapped: false })
    );
    burn.rotation.x = Math.PI;
    burn.position.y = -0.9;
    rocketGroup.add(burn);
    spec.add(lzPad, rocketGroup);
    updater = (_t, _dt, approach) => {
      const remain = Math.max(0, 1 - approach * 1.15);
      rocketGroup.position.y = 0.22 + remain * remain * 9.5;
      burn.visible = remain > 0.06;
    };
  } else if (kind === 'boring') {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.48, 12, 24),
      new THREE.MeshPhysicalMaterial({ color: '#d91632', clearcoat: 0.9 })
    );
    ring.position.y = 2.8;
    const cutter = new THREE.Group();
    cutter.position.y = 2.8;
    for (let i = 0; i < 6; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.32, 4.6, 0.24), mats.gold);
      blade.rotation.z = (i / 6) * Math.PI;
      cutter.add(blade);
    }
    spec.add(ring, cutter);
    updater = (t) => {
      cutter.rotation.z = t * 1.9;
    };
  } else if (kind === 'prod_hell') {
    const cot = createPixarCottage(7);
    cot.group.scale.setScalar(1.0);
    cot.group.position.y = 0.08;
    cot.setLit(1);
    spec.add(cot.group);
    updater = (t, dt) => cot.update(dt, t);
  } else if (kind === 'starman') {
    const sm = createAccurateStarmanRoadster();
    sm.scale.setScalar(1.25);
    sm.position.set(0, 8.8, 0);
    spec.add(sm);
    updater = (t, _dt, approach) => {
      const arc = (approach - 0.5) * 18;
      sm.position.set(arc, 8.6 + Math.cos(approach * Math.PI - Math.PI * 0.5) * 2.2, 0);
      sm.rotation.z = 0.22;
      sm.rotation.y = Math.sin(t * 0.6) * 0.15;
    };
  } else if (kind === 'funding_420') {
    const sign = createTimelineSignPlane('$420 · FUNDING SECURED', '#0e3a28', '#48e59b', 512, 176, 4.8);
    sign.position.set(0, 3.6, 0);
    const bell = new THREE.Mesh(new THREE.SphereGeometry(0.95, 16, 16), mats.gold);
    bell.position.y = 1.3;
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: getSoftGlowTexture(),
        color: '#48e59b',
        transparent: true,
        opacity: 0.58,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    halo.scale.set(8.5, 6.2, 1);
    halo.position.y = 3.2;
    const chartPts = [
      new THREE.Vector3(-3.4, 0.7, 0.5),
      new THREE.Vector3(-1.7, 1.8, 0.5),
      new THREE.Vector3(0.0, 3.9, 0.5),
      new THREE.Vector3(1.7, 3.1, 0.5),
      new THREE.Vector3(3.4, 5.1, 0.5),
    ];
    const chartLine = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(chartPts), 24, 0.14, 8, false),
      new THREE.MeshBasicMaterial({ color: '#48e59b', toneMapped: false })
    );
    spec.add(sign, bell, halo, chartLine);
    updater = (t) => {
      bell.position.y = 1.3 + Math.sin(t * 4) * 0.2;
    };
  } else if (kind === 'armor_glass') {
    const ct = createAccurateCybertruck(false);
    ct.group.scale.setScalar(1.1);
    ct.group.position.y = 0.08;
    const steelBall = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), mats.steel);
    const crackStar = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.28, 0),
      new THREE.MeshBasicMaterial({ color: '#d8f4ff', wireframe: true, toneMapped: false })
    );
    crackStar.position.set(1.25, 1.72, -0.85);
    spec.add(ct.group, steelBall, crackStar);
    updater = (t) => {
      ct.update(t * 4, t);
      steelBall.position.set(1.75 + Math.abs(Math.sin(t * 3.5)) * 1.4, 1.72, -0.85);
    };
  } else if (kind === 'dragon_starlink') {
    const capsule = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.2, 16), mats.steel);
    capsule.position.set(-4.5, 8.6, 0);
    capsule.rotation.z = -0.35;
    const train = new THREE.Group();
    train.position.set(0, 10.2, 0);
    for (let i = 0; i < 16; i++) {
      const sat = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.1, 0.25),
        new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? '#ffe082' : '#9ee8ff', toneMapped: false })
      );
      sat.position.set(-9 + i * 1.25, Math.sin(i * 0.45) * 0.65, 0);
      train.add(sat);
    }
    spec.add(capsule, train);
    updater = (t) => {
      train.position.y = 10.0 + Math.sin(t * 1.4) * 0.35;
    };
  } else if (kind === 'semi_x') {
    const semi = createAccurateTeslaSemi('coca_cola');
    semi.group.scale.setScalar(0.62);
    semi.group.position.set(-0.4, 0.08, -0.4);
    const xMat = new THREE.MeshBasicMaterial({ color: '#eef6ff', toneMapped: false });
    const x1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 3.2, 0.32), xMat);
    x1.rotation.z = 0.72;
    const x2 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 3.2, 0.32), xMat);
    x2.rotation.z = -0.72;
    const xGroup = new THREE.Group();
    xGroup.add(x1, x2);
    xGroup.position.set(2.4, 4.2, 0);
    spec.add(semi.group, xGroup);
    updater = (t, dt) => {
      semi.update(dt, t * 8, false, 0, t);
      xGroup.rotation.y = t * 1.2;
    };
  } else if (kind === 'cyber_starship') {
    const ct = createAccurateCybertruck(true);
    ct.group.scale.setScalar(0.95);
    ct.group.position.set(-1.6, 0.08, 0.8);
    const ss = createAccurateStarshipStack();
    ss.scale.setScalar(0.4);
    ss.position.set(2.1, 4.2, -0.8);
    spec.add(ct.group, ss);
    updater = (t) => ct.update(t * 4, t);
  } else if (kind === 'mechazilla') {
    const towerMat = new THREE.MeshStandardMaterial({ color: '#2b3242', metalness: 0.7, roughness: 0.4 });
    const tower = new THREE.Mesh(new THREE.BoxGeometry(1.15, 7.6, 1.15), towerMat);
    tower.position.set(-1.9, 3.8, 0);
    const armL = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.24, 0.28), mats.gold);
    const armR = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.24, 0.28), mats.gold);
    armL.position.set(-0.3, 6.0, -0.58);
    armR.position.set(-0.3, 6.0, 0.58);
    const booster = createAccurateStarshipStack();
    booster.scale.setScalar(0.34);
    booster.position.set(0.5, 3.6, 0);
    spec.add(tower, armL, armR, booster);
    updater = (t, _dt, approach) => {
      const hover = Math.sin(t * 2.2) * 0.35 + (1 - Math.min(1, approach * 1.2)) * 2.6;
      booster.position.y = 3.6 + hover;
      const pinch = Math.sin(t * 1.6) * 0.16;
      armL.rotation.y = pinch;
      armR.rotation.y = -pinch;
    };
  } else {
    const opt = createAccurateOptimusGen2();
    opt.group.scale.setScalar(1.65);
    opt.group.position.set(-1.9, 0.08, 0.8);
    const cab = new THREE.Mesh(new THREE.CapsuleGeometry(0.88, 2.0, 6, 12), mats.gold);
    cab.rotation.z = Math.PI * 0.5;
    cab.scale.set(0.8, 1, 1.15);
    cab.position.set(0.9, 0.96, 0.6);
    const mars = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 18, 18),
      new THREE.MeshStandardMaterial({ color: '#d85432', emissive: '#942812', emissiveIntensity: 0.65 })
    );
    mars.position.set(1.5, 4.6, -1.6);
    spec.add(opt.group, cab, mars);
    updater = (t) => opt.update(t);
  }

  root.add(spec);
  root.position.set(getRoadX(zOffset), 0, zOffset);

  return {
    milestoneIndex,
    root,
    spectacle: spec,
    side,
    isOverhead,
    zOffset,
    announced: false,
    updater,
  };
}
