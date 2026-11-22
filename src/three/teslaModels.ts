import * as THREE from 'three';
import { tryLoadOptionalGlb } from './glbModelLoader';
import {
  createCocaColaTrailerTexture,
  createSparklingSnowMaterial,
  createTeslaTrailerTexture,
  createTruckRearDoorTexture,
  createVolumetricBeamMaterial,
  getSoftGlowTexture,
} from './pixarMaterials';

export type SemiLivery = 'coca_cola' | 'tesla';

const sharedSideTex: Partial<Record<SemiLivery, THREE.CanvasTexture>> = {};
const sharedRearTex: Partial<Record<SemiLivery, THREE.CanvasTexture>> = {};
let sharedHeatTileTex: THREE.CanvasTexture | null = null;
let sharedTeslaBadgeTex: THREE.CanvasTexture | null = null;

function getSideTex(livery: SemiLivery): THREE.CanvasTexture {
  if (!sharedSideTex[livery]) {
    sharedSideTex[livery] =
      livery === 'tesla' ? createTeslaTrailerTexture() : createCocaColaTrailerTexture();
  }
  return sharedSideTex[livery]!;
}

function getRearTex(livery: SemiLivery): THREE.CanvasTexture {
  if (!sharedRearTex[livery]) {
    sharedRearTex[livery] = createTruckRearDoorTexture(livery);
  }
  return sharedRearTex[livery]!;
}

function getHeatTileTex(): THREE.CanvasTexture {
  if (sharedHeatTileTex) return sharedHeatTileTex;
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#151820';
  ctx.fillRect(0, 0, size, size);

  const r = 12;
  const dx = r * 1.732;
  const dy = r * 1.5;
  ctx.strokeStyle = '#07080c';
  ctx.lineWidth = 2;
  for (let row = -1; row < size / dy + 2; row++) {
    for (let col = -1; col < size / dx + 2; col++) {
      const cx = col * dx + (row % 2 === 0 ? 0 : dx * 0.5);
      const cy = row * dy;
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
        const px = cx + Math.cos(a) * (r - 0.8);
        const py = cy + Math.sin(a) * (r - 0.8);
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = (row + col) % 3 === 0 ? '#1b1f29' : '#141720';
      ctx.fill();
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 5);
  tex.colorSpace = THREE.SRGBColorSpace;
  sharedHeatTileTex = tex;
  return tex;
}

function getTeslaSignTex(): THREE.CanvasTexture {
  if (sharedTeslaBadgeTex) return sharedTeslaBadgeTex;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#0e1118';
  ctx.fillRect(0, 0, 256, 64);
  ctx.fillStyle = '#ff2a40';
  ctx.font = '700 28px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('T E S L A', 128, 34);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  sharedTeslaBadgeTex = tex;
  return tex;
}

/**
 * Emits a triangle whose winding is guaranteed outward relative to `interiorRef`.
 */
function pushOutwardTri(
  out: number[],
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
  interiorRef: THREE.Vector3
): void {
  const e1 = new THREE.Vector3().subVectors(b, a);
  const e2 = new THREE.Vector3().subVectors(c, a);
  const n = new THREE.Vector3().crossVectors(e1, e2);
  const mid = new THREE.Vector3().addVectors(a, b).add(c).multiplyScalar(1 / 3);
  if (n.dot(mid.sub(interiorRef)) >= 0) {
    out.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
  } else {
    out.push(a.x, a.y, a.z, c.x, c.y, c.z, b.x, b.y, b.z);
  }
}

function pushOutwardQuad(
  out: number[],
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
  d: THREE.Vector3,
  interiorRef: THREE.Vector3
): void {
  pushOutwardTri(out, a, b, c, interiorRef);
  pushOutwardTri(out, a, c, d, interiorRef);
}

/**
 * Builds a smooth multi-station lofted hull with guaranteed outward normals.
 * Each station is an ordered ring of Vector3 points around the perimeter.
 */
function buildLoftedHull(stations: THREE.Vector3[][]): THREE.BufferGeometry {
  const positions: number[] = [];
  const ringLen = stations[0].length;

  for (let s = 0; s < stations.length - 1; s++) {
    const r0 = stations[s];
    const r1 = stations[s + 1];
    const center = new THREE.Vector3();
    for (let i = 0; i < ringLen; i++) {
      center.add(r0[i]).add(r1[i]);
    }
    center.multiplyScalar(1 / (ringLen * 2));

    for (let i = 0; i < ringLen; i++) {
      const next = (i + 1) % ringLen;
      pushOutwardQuad(positions, r0[i], r0[next], r1[next], r1[i], center);
    }
  }

  // Front & back caps
  const capRing = (ring: THREE.Vector3[], offsetZ: number) => {
    const center = new THREE.Vector3();
    for (const p of ring) center.add(p);
    center.multiplyScalar(1 / ring.length);
    const ref = center.clone().add(new THREE.Vector3(0, 0, offsetZ));
    for (let i = 0; i < ring.length; i++) {
      const next = (i + 1) % ring.length;
      pushOutwardTri(positions, center, ring[i], ring[next], ref);
    }
  };
  capRing(stations[0], 1.0);
  capRing(stations[stations.length - 1], -1.0);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

function createSilverTeslaEmblem(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const chrome = new THREE.MeshStandardMaterial({
    color: '#f4f7fc',
    metalness: 0.94,
    roughness: 0.1,
  });

  // Top curved Tesla T crossbar + vertical tapered stem
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.055, 0.04), chrome);
  bar.position.set(0, 0.14, 0);
  const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.045, 0.04), chrome);
  wingL.position.set(-0.15, 0.11, 0);
  wingL.rotation.z = 0.25;
  const wingR = wingL.clone();
  wingR.position.x = 0.15;
  wingR.rotation.z = -0.25;

  const stem = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.34, 4), chrome);
  stem.rotation.z = Math.PI;
  stem.rotation.y = Math.PI * 0.25;
  stem.scale.set(1, 1, 0.45);
  stem.position.set(0, -0.02, 0);

  g.add(bar, wingL, wingR, stem);
  g.scale.setScalar(scale);
  return g;
}

/**
 * 1. ACCURATE TESLA SEMI + HOLIDAY EXPRESS TRAILER (facing -Z)
 */
export interface AccurateSemiHandle {
  group: THREE.Group;
  update(dt: number, wheelPhase: number, isBraking: boolean, rippleBoost: number, time: number): void;
}

export function createAccurateTeslaSemi(livery: SemiLivery = 'coca_cola'): AccurateSemiHandle {
  const group = new THREE.Group();

  const cabPaint = new THREE.MeshPhysicalMaterial({
    color: livery === 'tesla' ? '#f2f6fc' : '#c40d2a',
    metalness: livery === 'tesla' ? 0.28 : 0.42,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });
  const crimsonPaint = new THREE.MeshPhysicalMaterial({
    color: livery === 'tesla' ? '#dc1230' : '#c40d2a',
    metalness: 0.38,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });
  const blackAeroMat = new THREE.MeshStandardMaterial({
    color: '#12151e',
    roughness: 0.65,
    metalness: 0.2,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#060c18',
    metalness: 0.15,
    roughness: 0.14,
    clearcoat: 0.35,
    clearcoatRoughness: 0.15,
    envMapIntensity: 0.35,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: '#dfe7f2',
    metalness: 0.9,
    roughness: 0.15,
  });
  const snowMat = createSparklingSnowMaterial('#b8cee8');

  // --- Lofted Bullet-Nose Aerodynamic Cab (z = -5.85 .. -1.42) ---
  // Each station: [z, halfWidth, botY, beltY, shoulderW, roofY, roofHalfW]
  const cabStationsSpec: [number, number, number, number, number, number, number][] = [
    [-5.86, 0.68, 0.46, 0.88, 0.64, 1.24, 0.52], // Bullet nose bumper tip
    [-5.52, 0.96, 0.42, 1.02, 0.92, 1.54, 0.78], // Sculpted front face & boomerang pockets
    [-4.96, 1.18, 0.39, 1.18, 1.14, 1.78, 1.02], // Lower windshield cowl
    [-3.88, 1.27, 0.38, 1.26, 1.24, 3.08, 1.08], // Top of sweeping panoramic windshield
    [-2.68, 1.28, 0.38, 1.28, 1.26, 3.68, 1.16], // Sloped aero roof fairing midpoint
    [-1.42, 1.28, 0.38, 1.28, 1.27, 4.02, 1.22], // Rear cab wall matching trailer roof height!
  ];

  const stations = cabStationsSpec.map(([z, hw, by, beltY, sw, ry, rw]) => [
    new THREE.Vector3(-hw * 0.88, by, z),
    new THREE.Vector3(-hw, beltY, z),
    new THREE.Vector3(-sw, beltY + (ry - beltY) * 0.48, z),
    new THREE.Vector3(-rw, ry, z),
    new THREE.Vector3(rw, ry, z),
    new THREE.Vector3(sw, beltY + (ry - beltY) * 0.48, z),
    new THREE.Vector3(hw, beltY, z),
    new THREE.Vector3(hw * 0.88, by, z),
  ]);

  const cabMesh = new THREE.Mesh(buildLoftedHull(stations), cabPaint);
  group.add(cabMesh);

  // Dark Sculpted Front Aero Bumper Lip
  const frontLip = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.22, 0.35), blackAeroMat);
  frontLip.position.set(0, 0.48, -5.76);
  group.add(frontLip);

  // Gleaming Chrome Tesla "T" Emblem on Front Nose!
  const emblem = createSilverTeslaEmblem(0.88);
  emblem.position.set(0, 1.38, -5.68);
  emblem.rotation.x = 0.56;
  group.add(emblem);

  // Panoramic Wraparound Dark Glass Greenhouse (front sloped windshield + flush tapered diagonal side windows!)
  const wsPos: number[] = [];
  const cabCenter = new THREE.Vector3(0, 2.2, -3.9);
  pushOutwardQuad(
    wsPos,
    new THREE.Vector3(-0.96, 1.84, -4.99),
    new THREE.Vector3(0.96, 1.84, -4.99),
    new THREE.Vector3(1.04, 3.07, -3.94),
    new THREE.Vector3(-1.04, 3.07, -3.94),
    cabCenter
  );

  // Diagonal Wraparound Side Quarter Glass Panels hugging cab slope seamlessly
  for (const side of [-1, 1]) {
    pushOutwardQuad(
      wsPos,
      new THREE.Vector3(side * 1.19, 1.82, -4.74),
      new THREE.Vector3(side * 1.16, 2.95, -3.86),
      new THREE.Vector3(side * 1.27, 2.95, -2.76),
      new THREE.Vector3(side * 1.31, 1.84, -3.02),
      cabCenter
    );
  }
  const glassGeo = new THREE.BufferGeometry();
  glassGeo.setAttribute('position', new THREE.Float32BufferAttribute(wsPos, 3));
  glassGeo.computeVertexNormals();
  const glassMesh = new THREE.Mesh(glassGeo, glassMat);
  group.add(glassMesh);

  // Recessed Angled Boomerang White LED Headlights inside dark aero pockets!
  const drlMat = new THREE.MeshBasicMaterial({ color: '#fff8e8', toneMapped: false });
  const beamMat = createVolumetricBeamMaterial('#ffdf9e', 0.24);
  for (const side of [-1, 1]) {
    // Dark recessed aero pocket
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.34, 0.38), blackAeroMat);
    pocket.position.set(side * 0.92, 0.88, -5.45);
    pocket.rotation.y = side * 0.42;
    group.add(pocket);

    // Bold swept boomerang LED signature (horizontal blade + upward outer wing)
    const bladeA = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.085, 0.1), drlMat);
    bladeA.position.set(side * 0.92, 0.88, -5.58);
    bladeA.rotation.y = side * 0.45;
    bladeA.rotation.z = side * 0.24;
    const bladeB = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.34, 0.1), drlMat);
    bladeB.position.set(side * 1.12, 0.96, -5.4);
    bladeB.rotation.y = side * 0.35;
    bladeB.rotation.z = side * -0.15;
    group.add(bladeA, bladeB);

    // Volumetric Headlight Beam Cone
    const beam = new THREE.Mesh(new THREE.ConeGeometry(2.6, 14.5, 18, 1, true), beamMat);
    beam.rotation.x = Math.PI * 0.5;
    beam.position.set(side * 0.92, 0.86, -12.8);
    group.add(beam);
  }

  // 5 Warm Amber Cab Roof Clearance Lights above Windshield
  const amberMat = new THREE.MeshBasicMaterial({ color: '#ffad3b', toneMapped: false });
  for (let i = -2; i <= 2; i++) {
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.07), amberMat);
    marker.position.set(i * 0.32, 3.16, -3.82);
    group.add(marker);
  }

  // Signature Tall Vertical Matte-Black Aero Wing Mirrors on forward stalks!
  for (const side of [-1, 1]) {
    const stalk = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.08), blackAeroMat);
    stalk.position.set(side * 1.38, 2.15, -4.32);
    stalk.rotation.y = side * -0.25;
    const mirrorHead = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.82, 0.22), blackAeroMat);
    mirrorHead.position.set(side * 1.54, 2.38, -4.38);
    mirrorHead.rotation.x = -0.08;
    group.add(stalk, mirrorHead);
  }

  // Flush Lower Cab Aero Skirts with clean wheel cutouts
  for (const side of [-1, 1]) {
    const midSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.72, 1.55), crimsonPaint);
    midSkirt.position.set(side * 1.24, 0.74, -3.55);
    const rearSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.65, 2.0), crimsonPaint);
    rearSkirt.position.set(side * 1.24, 0.92, -2.0);
    group.add(midSkirt, rearSkirt);
  }

  // --- 53-ft Illuminated Holiday Express Trailer (z = -1.25 .. +7.85) ---
  const trailer = new THREE.Mesh(new THREE.BoxGeometry(2.62, 3.22, 9.1), crimsonPaint);
  trailer.position.set(0, 2.42, 3.3);
  group.add(trailer);

  // Lower Flush Aero Trailer Skirts
  for (const side of [-1, 1]) {
    const tSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.56, 5.2), crimsonPaint);
    tSkirt.position.set(side * 1.28, 0.68, 1.85);
    group.add(tSkirt);
  }

  // Brushed aluminum vertical frame corner rails
  for (const sx of [-1.31, 1.31]) {
    for (const sz of [-1.25, 7.85]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.26, 0.08), chromeMat);
      rail.position.set(sx, 2.42, sz);
      group.add(rail);
    }
  }

  // Snow Blanket Cap on Trailer Roof
  const roofSnow = new THREE.Mesh(new THREE.BoxGeometry(2.68, 0.16, 9.16), snowMat);
  roofSnow.position.set(0, 4.08, 3.3);
  group.add(roofSnow);

  // Illuminated Side Panels & Glowing Holiday Rear Door Panel
  const sideTex = getSideTex(livery);
  const rearTex = getRearTex(livery);
  const panelMat = new THREE.MeshStandardMaterial({
    map: sideTex,
    emissiveMap: sideTex,
    emissive: new THREE.Color('#ffda99'),
    emissiveIntensity: 0.85,
    roughness: 0.24,
  });
  for (const side of [-1, 1]) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(8.5, 2.75), panelMat);
    panel.rotation.y = side * Math.PI * 0.5;
    panel.position.set(side * 1.33, 2.44, 3.3);
    group.add(panel);
  }
  const rearPanelMat = new THREE.MeshStandardMaterial({
    map: rearTex,
    emissiveMap: rearTex,
    emissive: new THREE.Color('#ffda99'),
    emissiveIntensity: 0.78,
    roughness: 0.24,
  });
  const rearPanel = new THREE.Mesh(new THREE.PlaneGeometry(2.35, 2.55), rearPanelMat);
  rearPanel.position.set(0, 2.55, 7.87);
  group.add(rearPanel);

  // ~76 Blooming 3D Golden Perimeter Fairy Bulbs!
  const bulbGeo = new THREE.SphereGeometry(0.085, 6, 6);
  const bulbMaterials: THREE.MeshBasicMaterial[] = [];
  const addBulb = (bx: number, by: number, bz: number) => {
    const bm = new THREE.MeshBasicMaterial({ color: '#ffdf88', toneMapped: false });
    bulbMaterials.push(bm);
    const m = new THREE.Mesh(bulbGeo, bm);
    m.position.set(bx, by, bz);
    group.add(m);
  };
  for (let i = 0; i <= 16; i++) {
    const bz = -1.1 + (i / 16) * 8.8;
    for (const side of [-1.34, 1.34]) {
      addBulb(side, 3.96, bz);
      addBulb(side, 0.88, bz);
    }
  }
  for (let i = 0; i < 6; i++) {
    const bx = -1.2 + (i / 5) * 2.4;
    addBulb(bx, 3.96, 7.86);
    addBulb(bx, 0.88, 7.86);
  }

  // Crimson Brake Tail Lights on Rear Trailer Door
  const tailMat = new THREE.MeshBasicMaterial({ color: '#c41022', toneMapped: false });
  for (const tx of [-0.98, 0.98]) {
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.22, 0.08), tailMat);
    tail.position.set(tx, 1.04, 7.88);
    group.add(tail);
  }

  // Wheels: Front Steer (-4.60), Tandem Semi Drive Axles (-2.55, -1.65), Tandem Trailer Axles (+5.55, +6.65)
  const wheelGroups: THREE.Group[] = [];
  const tireMat = new THREE.MeshStandardMaterial({ color: '#10141e', roughness: 0.82 });
  const aeroCoverMat = new THREE.MeshStandardMaterial({ color: '#1b202d', metalness: 0.55, roughness: 0.35 });
  const wheelZs = [-4.6, -2.55, -1.62, 5.55, 6.65];

  for (const wz of wheelZs) {
    for (const side of [-1, 1]) {
      const wg = new THREE.Group();
      wg.position.set(side * 1.18, 0.56, wz);
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.36, 18), tireMat);
      tire.rotation.z = Math.PI * 0.5;
      const aeroCover = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.38, 14), aeroCoverMat);
      aeroCover.rotation.z = Math.PI * 0.5;
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.4, 10), chromeMat);
      hub.rotation.z = Math.PI * 0.5;
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.41, 0.06, 0.58), chromeMat);
      wg.add(tire, aeroCover, hub, spoke);
      group.add(wg);
      wheelGroups.push(wg);
    }
  }

  tryLoadOptionalGlb('semi', 14.0, (custom) => {
    group.clear();
    group.add(custom);
  });

  return {
    group,
    update(_dt: number, wheelPhase: number, isBraking: boolean, rippleBoost: number, time: number): void {
      for (const wg of wheelGroups) {
        wg.rotation.x = -wheelPhase;
      }
      bulbMaterials.forEach((bm, idx) => {
        const twinkle = 0.68 + 0.32 * Math.sin(time * 5.2 + idx * 0.45);
        const boost = twinkle + rippleBoost * 1.4;
        bm.color.setRGB(1.28 * boost, 0.98 * boost, 0.45 * boost);
      });
      panelMat.emissiveIntensity = 0.85 + rippleBoost * 0.9;
      rearPanelMat.emissiveIntensity = 0.78 + rippleBoost * 0.85;
      beamMat.uniforms.uOpacity.value = 0.24 + rippleBoost * 0.14;
      tailMat.color.setRGB(isBraking ? 2.3 : 0.9, isBraking ? 0.22 : 0.1, isBraking ? 0.26 : 0.16);
    },
  };
}

/**
 * 2. ACCURATE TESLA CYBERTRUCK — Folded Stainless-Steel Origami Exoskeleton (facing -Z)
 */
export interface AccurateCybertruckHandle {
  group: THREE.Group;
  update(wheelPhase: number, time: number): void;
}

export function createAccurateCybertruck(withTree = true): AccurateCybertruckHandle {
  const group = new THREE.Group();

  const steelMat = new THREE.MeshPhysicalMaterial({
    color: '#bfcbe0',
    metalness: 0.92,
    roughness: 0.22,
    clearcoat: 0.5,
    flatShading: true,
  });
  const blackTrimMat = new THREE.MeshStandardMaterial({ color: '#141720', roughness: 0.8 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#080e1a',
    metalness: 0.2,
    roughness: 0.04,
    clearcoat: 1.0,
  });

  // True 6-Point Planar Exoskeleton (horizontal beltline crease + sharp inward tumblehome!)
  const hw = 1.01;
  const rw = 0.72;
  const hullStations: THREE.Vector3[][] = [
    // Front nose edge (blunt upright crease)
    [
      new THREE.Vector3(-0.92, 0.46, -2.8),
      new THREE.Vector3(-0.98, 1.04, -2.84),
      new THREE.Vector3(-0.96, 1.05, -2.84),
      new THREE.Vector3(0.96, 1.05, -2.84),
      new THREE.Vector3(0.98, 1.04, -2.84),
      new THREE.Vector3(0.92, 0.46, -2.8),
    ],
    // Base of raked single-plane windshield (beltline crease at y = 1.36)
    [
      new THREE.Vector3(-hw * 0.95, 0.44, -1.78),
      new THREE.Vector3(-hw, 1.36, -1.78),
      new THREE.Vector3(-hw, 1.36, -1.78),
      new THREE.Vector3(hw, 1.36, -1.78),
      new THREE.Vector3(hw, 1.36, -1.78),
      new THREE.Vector3(hw * 0.95, 0.44, -1.78),
    ],
    // Sharp Triangular Roof Apex above driver (flat lower door + sloped tumblehome cabin!)
    [
      new THREE.Vector3(-hw * 0.95, 0.44, -0.32),
      new THREE.Vector3(-hw, 1.36, -0.32),
      new THREE.Vector3(-rw, 1.84, -0.32),
      new THREE.Vector3(rw, 1.84, -0.32),
      new THREE.Vector3(hw, 1.36, -0.32),
      new THREE.Vector3(hw * 0.95, 0.44, -0.32),
    ],
    // Rear cab sail crest
    [
      new THREE.Vector3(-hw * 0.95, 0.44, 0.55),
      new THREE.Vector3(-hw, 1.36, 0.55),
      new THREE.Vector3(-rw * 1.08, 1.68, 0.55),
      new THREE.Vector3(rw * 1.08, 1.68, 0.55),
      new THREE.Vector3(hw, 1.36, 0.55),
      new THREE.Vector3(hw * 0.95, 0.44, 0.55),
    ],
  ];

  // Build main body up to cab sail crest (stations 0..3), then separate left/right sail pillars for open vault bed!
  const bodyGeo = buildLoftedHull(hullStations);
  group.add(new THREE.Mesh(bodyGeo, steelMat));

  // Rear Bed Floor + Left/Right Sloped Sail Pillar Walls + Tailgate
  const bedFloor = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.48, 2.25), blackTrimMat);
  bedFloor.position.set(0, 0.68, 1.68);
  group.add(bedFloor);

  for (const side of [-1, 1]) {
    const sailWallStations = [
      [
        new THREE.Vector3(side * 0.78, 0.85, 0.55),
        new THREE.Vector3(side * rw * 1.08, 1.68, 0.55),
        new THREE.Vector3(side * hw, 1.36, 0.55),
        new THREE.Vector3(side * hw * 0.95, 0.44, 0.55),
      ],
      [
        new THREE.Vector3(side * 0.84, 0.85, 2.82),
        new THREE.Vector3(side * 0.96, 1.34, 2.82),
        new THREE.Vector3(side * 0.98, 1.34, 2.82),
        new THREE.Vector3(side * 0.94, 0.48, 2.82),
      ],
    ];
    group.add(new THREE.Mesh(buildLoftedHull(sailWallStations), steelMat));
  }

  const tailgate = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.84, 0.14), steelMat);
  tailgate.position.set(0, 0.92, 2.77);
  group.add(tailgate);

  // Raked Single-Plane Windshield + Iconic Single Vertical Giga-Wiper!
  const wsPos = new Float32Array([
    -0.88, 1.40, -1.78,
     0.88, 1.40, -1.78,
     0.68, 1.82, -0.35,
    -0.88, 1.40, -1.78,
     0.68, 1.82, -0.35,
    -0.68, 1.82, -0.35,
  ]);
  const wsGeo = new THREE.BufferGeometry();
  wsGeo.setAttribute('position', new THREE.BufferAttribute(wsPos, 3));
  wsGeo.computeVertexNormals();
  const ws = new THREE.Mesh(wsGeo, glassMat);
  ws.position.set(0, 0.02, -0.02);
  group.add(ws);

  const gigaWiper = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.04, 1.35), blackTrimMat);
  gigaWiper.position.set(-0.74, 1.63, -1.08);
  gigaWiper.rotation.x = -0.29;
  gigaWiper.rotation.y = -0.14;
  group.add(gigaWiper);

  // Flush Triangular Side Glass Windows along tumblehome cabin angle
  for (const side of [-1, 1]) {
    const swVerts = new Float32Array([
      side * 0.96, 1.36, -1.65,
      side * 0.74, 1.78, -0.32,
      side * 0.84, 1.56, 0.55,
      side * 0.96, 1.36, -1.65,
      side * 0.84, 1.56, 0.55,
      side * 0.96, 1.24, 0.55,
    ]);
    const swGeo = new THREE.BufferGeometry();
    swGeo.setAttribute('position', new THREE.BufferAttribute(swVerts, 3));
    swGeo.computeVertexNormals();
    const swMesh = new THREE.Mesh(swGeo, glassMat);
    swMesh.position.x = side * 0.02;
    group.add(swMesh);
  }

  // Heavy Matte-Black Off-Road Front & Rear Bumpers + Trapezoidal Flared Wheel Arches
  const fBump = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.28, 0.28), blackTrimMat);
  fBump.position.set(0, 0.44, -2.84);
  const rBump = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.28, 0.24), blackTrimMat);
  rBump.position.set(0, 0.46, 2.86);
  group.add(fBump, rBump);

  for (const wz of [-1.72, 1.72]) {
    for (const side of [-1, 1]) {
      const arch = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 1.05), blackTrimMat);
      arch.position.set(side * 1.02, 1.02, wz);
      group.add(arch);
    }
  }

  // Razor-Thin Full-Width Front DRL LED Lightbar & Rear Crimson Tail Lightbar!
  const frontBar = new THREE.Mesh(
    new THREE.BoxGeometry(1.96, 0.065, 0.08),
    new THREE.MeshBasicMaterial({ color: '#f2fbff', toneMapped: false })
  );
  frontBar.position.set(0, 1.04, -2.86);
  group.add(frontBar);

  const beam = new THREE.Mesh(
    new THREE.ConeGeometry(2.2, 11.5, 16, 1, true),
    createVolumetricBeamMaterial('#d8f2ff', 0.22)
  );
  beam.rotation.x = Math.PI * 0.5;
  beam.position.set(0, 0.94, -8.6);
  group.add(beam);

  const rearBar = new THREE.Mesh(
    new THREE.BoxGeometry(1.96, 0.075, 0.08),
    new THREE.MeshBasicMaterial({ color: '#ff2438', toneMapped: false })
  );
  rearBar.position.set(0, 1.30, 2.85);
  group.add(rearBar);

  // Oversized 35" Tires with Matte-Black 7-Spoke Geometric Cybertruck Aero Wheel Covers
  const wheelGroups: THREE.Group[] = [];
  const tireMat = new THREE.MeshStandardMaterial({ color: '#11141c', roughness: 0.88 });
  const coverMat = new THREE.MeshStandardMaterial({ color: '#1e2430', metalness: 0.45, roughness: 0.45 });
  for (const wz of [-1.72, 1.72]) {
    for (const side of [-1, 1]) {
      const wg = new THREE.Group();
      wg.position.set(side * 0.98, 0.48, wz);
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.49, 0.49, 0.34, 16), tireMat);
      tire.rotation.z = Math.PI * 0.5;
      const cover = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.36, 7), coverMat);
      cover.rotation.z = Math.PI * 0.5;
      wg.add(tire, cover);
      group.add(wg);
      wheelGroups.push(wg);
    }
  }

  // Towering Glowing Decorated Christmas Tree inside the open Vault Bed!
  let bedTreeUpdate: ((t: number) => void) | null = null;
  if (withTree) {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.14, 0.5, 6),
      new THREE.MeshStandardMaterial({ color: '#3b2016' })
    );
    trunk.position.set(0, 1.05, 1.72);
    group.add(trunk);

    const gMat = new THREE.MeshStandardMaterial({ color: '#0e3a2f', roughness: 0.8 });
    const sMat = createSparklingSnowMaterial('#b2cae8');
    const bulbs: THREE.MeshBasicMaterial[] = [];

    for (let t = 0; t < 4; t++) {
      const r = 0.88 - t * 0.18;
      const h = 0.85 - t * 0.08;
      const y = 1.45 + t * 0.48;
      const c = new THREE.Mesh(new THREE.ConeGeometry(r, h, 9), gMat);
      c.position.set(0, y, 1.72);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(r * 0.78, h * 0.46, 9), sMat);
      cap.position.set(0, y + h * 0.28, 1.72);
      group.add(c, cap);
    }
    for (let i = 0; i < 10; i++) {
      const f = i / 10;
      const ang = i * 1.4;
      const rad = 0.74 * (1 - f * 0.75);
      const bm = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? '#ffdf78' : '#ff384c', toneMapped: false });
      bulbs.push(bm);
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), bm);
      b.position.set(Math.cos(ang) * rad, 1.35 + f * 1.9, 1.72 + Math.sin(ang) * rad);
      group.add(b);
    }
    const star = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.16, 0),
      new THREE.MeshBasicMaterial({ color: '#ffe588', toneMapped: false })
    );
    star.position.set(0, 3.45, 1.72);
    group.add(star);

    bedTreeUpdate = (time: number) => {
      bulbs.forEach((bm, idx) => {
        const p = 0.75 + 0.25 * Math.sin(time * 5 + idx);
        if (idx % 2 === 0) bm.color.setRGB(1.3 * p, 1.05 * p, 0.45 * p);
        else bm.color.setRGB(1.3 * p, 0.22 * p, 0.28 * p);
      });
    };
  }

  tryLoadOptionalGlb('cybertruck', 5.7, (custom) => {
    group.clear();
    group.add(custom);
  });

  return {
    group,
    update(wheelPhase: number, time: number): void {
      for (const wg of wheelGroups) wg.rotation.x = -wheelPhase;
      bedTreeUpdate?.(time);
    },
  };
}

/**
 * 3. ACCURATE SPACEX STARSHIP + SUPER HEAVY BOOSTER (Tangent-Ogive Nose, TPS Tiles, 4 Flaps, Grid Fins)
 */
export function createAccurateStarshipStack(): THREE.Group {
  const group = new THREE.Group();

  const steelMat = new THREE.MeshPhysicalMaterial({
    color: '#d4dfed',
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 0.55,
    fog: false,
  });
  const tileMat = new THREE.MeshStandardMaterial({
    map: getHeatTileTex(),
    bumpMap: getHeatTileTex(),
    bumpScale: 0.04,
    roughness: 0.85,
    metalness: 0.15,
    fog: false,
  });
  const darkMetal = new THREE.MeshStandardMaterial({
    color: '#1b202b',
    metalness: 0.65,
    roughness: 0.4,
    fog: false,
  });

  const R = 0.92;

  // --- Super Heavy Booster (bottom y = -7.2 .. 0.0) ---
  const booster = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 7.2, 22), steelMat);
  booster.position.y = -3.6;
  group.add(booster);

  // Twin side dark raceway conduits along booster
  for (const side of [-1, 1]) {
    const raceway = new THREE.Mesh(new THREE.BoxGeometry(0.14, 6.8, 0.16), darkMetal);
    raceway.position.set(side * (R + 0.02), -3.6, 0);
    group.add(raceway);
  }

  // 4 Signature Dark Titanium Waffle Grid Fins near top of Super Heavy Booster!
  for (let i = 0; i < 4; i++) {
    const ang = (i / 4) * Math.PI * 2 + Math.PI * 0.25;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.14, 0.88), darkMetal);
    fin.position.set(Math.cos(ang) * (R + 0.42), -0.55, Math.sin(ang) * (R + 0.42));
    fin.rotation.y = -ang + Math.PI * 0.5;
    group.add(fin);
  }

  // Black Vented Hot-Staging Ring (y = 0.0 .. 0.44)
  const hotStage = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.01, R * 1.01, 0.44, 22), darkMetal);
  hotStage.position.y = 0.22;
  group.add(hotStage);

  // --- Starship Upper Stage (y = 0.44 .. +7.4) ---
  const shipBodyH = 4.2;
  const shipBody = new THREE.Mesh(new THREE.CylinderGeometry(R, R, shipBodyH, 22), steelMat);
  shipBody.position.y = 0.44 + shipBodyH * 0.5;
  group.add(shipBody);

  // Windward Hexagonal Black TPS Heatshield Tile Half-Cylinder
  const tileBody = new THREE.Mesh(
    new THREE.CylinderGeometry(R * 1.015, R * 1.015, shipBodyH, 18, 1, true, -Math.PI * 0.5, Math.PI),
    tileMat
  );
  tileBody.position.y = 0.44 + shipBodyH * 0.5;
  group.add(tileBody);

  // True Tangent-Ogive Curved Nosecone via LatheGeometry!
  const ogivePts: THREE.Vector2[] = [];
  const noseH = 2.65;
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const y = t * noseH;
    // Smooth tangent-ogive radius tapering cleanly to hemispherical tip
    const r = Math.max(0.02, R * Math.cos(t * Math.PI * 0.48));
    ogivePts.push(new THREE.Vector2(r, y));
  }
  const ogiveMesh = new THREE.Mesh(new THREE.LatheGeometry(ogivePts, 22), steelMat);
  ogiveMesh.position.y = 0.44 + shipBodyH;
  group.add(ogiveMesh);

  // Windward Heatshield Nose Half-Shell
  const ogiveTiles = new THREE.Mesh(
    new THREE.LatheGeometry(ogivePts, 16, -Math.PI * 0.5, Math.PI),
    tileMat
  );
  ogiveTiles.scale.set(1.015, 1, 1.015);
  ogiveTiles.position.y = 0.44 + shipBodyH;
  group.add(ogiveTiles);

  // 2 Swept Forward Aero Flaps + 2 Flared Aft Flaps!
  const makeFlap = (wTop: number, wBot: number, h: number) => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(wBot, 0.18);
    s.lineTo(wTop, h);
    s.lineTo(0, h);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 });
  };

  const fwdGeo = makeFlap(0.28, 0.72, 1.35);
  const aftGeo = makeFlap(0.55, 1.15, 2.15);

  for (const side of [-1, 1]) {
    const fFlap = new THREE.Mesh(fwdGeo, tileMat);
    fFlap.position.set(side * (R * 0.62), 5.0, 0);
    fFlap.scale.x = side;
    fFlap.rotation.y = side * -0.15;
    group.add(fFlap);

    const aFlap = new THREE.Mesh(aftGeo, tileMat);
    aFlap.position.set(side * (R * 0.88), 0.58, 0);
    aFlap.scale.x = side;
    group.add(aFlap);
  }

  // Iconic Two-Stage Raptor Plume: Bright Sapphire-Violet Mach Core inside Translucent Additive Golden Exhaust!
  const corePlume = new THREE.Mesh(
    new THREE.ConeGeometry(0.9, 6.8, 16),
    new THREE.MeshBasicMaterial({
      color: '#6ec4ff',
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      fog: false,
    })
  );
  corePlume.rotation.x = Math.PI;
  corePlume.position.y = -10.4;
  group.add(corePlume);

  const outerPlume = new THREE.Mesh(
    new THREE.ConeGeometry(1.75, 11.8, 18),
    new THREE.MeshBasicMaterial({
      color: '#ff9d3b',
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      fog: false,
    })
  );
  outerPlume.rotation.x = Math.PI;
  outerPlume.position.y = -12.9;
  group.add(outerPlume);

  tryLoadOptionalGlb('starship', 14.0, (custom) => {
    group.clear();
    group.add(custom);
  });

  return group;
}

/**
 * 4. ACCURATE CHERRY-RED TESLA ROADSTER + STARMAN IN SPACEX SUIT + SANTA HAT (facing +X)
 */
export function createAccurateStarmanRoadster(): THREE.Group {
  const group = new THREE.Group();

  const cherryRed = new THREE.MeshPhysicalMaterial({
    color: '#c80c28',
    metalness: 0.5,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    fog: false,
  });
  const blackMat = new THREE.MeshStandardMaterial({ color: '#11141c', roughness: 0.5, fog: false });
  const alloyMat = new THREE.MeshStandardMaterial({ color: '#dce4f0', metalness: 0.85, roughness: 0.2, fog: false });

  // Sculpted low-slung sports car side profile extruded along width (facing +X)
  const carShape = new THREE.Shape();
  carShape.moveTo(-2.05, 0.26);
  carShape.lineTo(-2.08, 0.62); // rear lip spoiler
  carShape.lineTo(-1.35, 0.72); // rear deck
  carShape.lineTo(-0.55, 0.72); // open cockpit rear
  carShape.lineTo(0.35, 0.64);  // front cowl
  carShape.lineTo(0.85, 0.64);  // hood
  carShape.quadraticCurveTo(1.85, 0.56, 2.08, 0.34); // sleek low nose
  carShape.lineTo(1.98, 0.20);
  carShape.closePath();

  const bodyGeo = new THREE.ExtrudeGeometry(carShape, {
    depth: 1.72,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.08,
    bevelSegments: 3,
  });
  bodyGeo.translate(0, 0, -0.86);
  group.add(new THREE.Mesh(bodyGeo, cherryRed));

  // Raked Convertible Windshield Frame
  const ws = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.52, 1.54),
    new THREE.MeshPhysicalMaterial({ color: '#111a2c', roughness: 0.05, clearcoat: 1, transparent: true, opacity: 0.78 })
  );
  ws.position.set(0.38, 0.85, 0);
  ws.rotation.z = 0.76;
  group.add(ws);

  // Dual Angled LED Headlights & Crimson Taillights
  const hlMat = new THREE.MeshBasicMaterial({ color: '#fff8e2', toneMapped: false, fog: false });
  const tlMat = new THREE.MeshBasicMaterial({ color: '#ff283c', toneMapped: false, fog: false });
  for (const lz of [-0.66, 0.66]) {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.18), hlMat);
    hl.position.set(1.92, 0.45, lz);
    hl.rotation.z = -0.25;
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.34), tlMat);
    tl.position.set(-2.08, 0.56, lz * 0.9);
    group.add(hl, tl);
  }

  // 4 Sporty Multi-Spoke Wheels
  for (const wx of [-1.32, 1.32]) {
    for (const wz of [-0.88, 0.88]) {
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.24, 14), blackMat);
      tire.rotation.x = Math.PI * 0.5;
      tire.position.set(wx, 0.34, wz);
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.26, 8), alloyMat);
      rim.rotation.x = Math.PI * 0.5;
      rim.position.set(wx, 0.34, wz);
      group.add(tire, rim);
    }
  }

  // SpaceX Starman in IVA Suit + Black Helmet Visor + Santa Hat!
  const suitMat = new THREE.MeshPhysicalMaterial({ color: '#f2f5fa', roughness: 0.45, fog: false });
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.36, 6, 10), suitMat);
  torso.position.set(-0.22, 0.9, -0.28);
  torso.rotation.z = 0.16;
  group.add(torso);

  // Signature black shoulder/chest stripes
  const stripe = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 6, 12), blackMat);
  stripe.rotation.x = Math.PI * 0.5;
  stripe.position.set(-0.22, 1.0, -0.28);
  group.add(stripe);

  // Helmet + glossy black visor
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.21, 14, 14), suitMat);
  helmet.position.set(-0.26, 1.32, -0.28);
  const visor = new THREE.Mesh(
    new THREE.SphereGeometry(0.185, 12, 12),
    new THREE.MeshPhysicalMaterial({ color: '#090d16', roughness: 0.05, clearcoat: 1, fog: false })
  );
  visor.position.set(-0.18, 1.32, -0.28);
  group.add(helmet, visor);

  // Cool relaxed left arm resting on door sill
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.42, 4, 8), suitMat);
  leftArm.position.set(-0.15, 0.95, -0.66);
  leftArm.rotation.z = Math.PI * 0.42;
  group.add(leftArm);

  // Fluffy Santa Hat on Starman's helmet!
  const hat = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.44, 10),
    new THREE.MeshStandardMaterial({ color: '#d91632', fog: false })
  );
  hat.position.set(-0.34, 1.62, -0.28);
  hat.rotation.z = 0.35;
  const pom = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), suitMat);
  pom.position.set(-0.46, 1.82, -0.28);
  group.add(hat, pom);

  tryLoadOptionalGlb('roadster', 4.2, (custom) => {
    group.clear();
    group.add(custom);
  });

  return group;
}

/**
 * 5A. ACCURATE TESLA OPTIMUS GEN 2 (Two-Tone Polar White Armor + Glossy Obsidian Face Mask)
 */
export interface AccurateOptimusHandle {
  group: THREE.Group;
  update(time: number): void;
}

export function createAccurateOptimusGen2(): AccurateOptimusHandle {
  const group = new THREE.Group();
  const polarWhite = new THREE.MeshPhysicalMaterial({
    color: '#f2f5fa',
    roughness: 0.22,
    clearcoat: 0.9,
  });
  const matteBlack = new THREE.MeshStandardMaterial({
    color: '#141720',
    roughness: 0.6,
    metalness: 0.25,
  });
  const obsidianMask = new THREE.MeshPhysicalMaterial({
    color: '#070a12',
    roughness: 0.04,
    metalness: 0.15,
    clearcoat: 1.0,
  });
  const redMat = new THREE.MeshStandardMaterial({ color: '#d91632', roughness: 0.6 });

  // Sculpted white chest plate + matte black waist/abdomen
  const waist = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.28, 6, 10), matteBlack);
  waist.position.y = 0.98;
  const chest = new THREE.Mesh(new THREE.CapsuleGeometry(0.23, 0.22, 6, 12), polarWhite);
  chest.scale.set(1.1, 1.0, 0.72);
  chest.position.y = 1.3;
  group.add(waist, chest);

  // Two-tone legs: matte black thighs + glossy white armored shins
  for (const lx of [-0.12, 0.12]) {
    const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.32, 4, 8), matteBlack);
    thigh.position.set(lx, 0.64, 0);
    const shin = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.34, 4, 8), polarWhite);
    shin.position.set(lx, 0.25, 0);
    group.add(thigh, shin);
  }

  // Right arm (matte black upper + white forearm)
  const rArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.44, 4, 8), matteBlack);
  rArm.position.set(0.28, 1.15, 0);
  rArm.rotation.z = -0.18;
  group.add(rArm);

  // Sculpted Contoured Obsidian Oval Face Mask + White Rear Cranium!
  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), polarWhite);
  cranium.scale.set(0.88, 1.12, 0.96);
  cranium.position.set(0, 1.66, -0.02);
  const faceMask = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 14), obsidianMask);
  faceMask.scale.set(0.82, 1.08, 0.65);
  faceMask.position.set(0, 1.66, 0.08);
  group.add(cranium, faceMask);

  // Fluffy Santa Hat + Crimson Scarf
  const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.045, 6, 12), redMat);
  scarf.rotation.x = Math.PI * 0.5;
  scarf.position.y = 1.48;
  const hat = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.38, 10), redMat);
  hat.position.set(0, 1.94, -0.04);
  hat.rotation.x = -0.22;
  group.add(scarf, hat);

  // Articulated Waving Left Arm holding blooming golden brass lantern
  const waveArm = new THREE.Group();
  waveArm.position.set(-0.28, 1.38, 0);
  const upperArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.22, 4, 8), matteBlack);
  upperArm.position.y = 0.1;
  const foreArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.24, 4, 8), polarWhite);
  foreArm.position.y = 0.3;
  const lantern = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 8, 8),
    new THREE.MeshBasicMaterial({ color: '#ffdf7e', toneMapped: false })
  );
  lantern.position.set(-0.04, 0.5, 0.06);
  waveArm.add(upperArm, foreArm, lantern);
  group.add(waveArm);

  tryLoadOptionalGlb('optimus', 1.8, (custom) => {
    group.clear();
    group.add(custom);
  });

  return {
    group,
    update(time: number): void {
      waveArm.rotation.z = 0.35 + Math.sin(time * 5.2) * 0.42;
      group.rotation.y = Math.sin(time * 1.4) * 0.16;
    },
  };
}

/**
 * 5B. ACCURATE TESLA V4 SUPERCHARGER MONOLITHS (Tall Polar-White Slabs + Black Center Channel + Crimson TESLA Badge)
 */
export function createAccurateSuperchargerPlaza(): { group: THREE.Group; update(time: number): void } {
  const group = new THREE.Group();

  const whiteSlabMat = new THREE.MeshPhysicalMaterial({
    color: '#f0f4fa',
    roughness: 0.2,
    clearcoat: 0.9,
  });
  const blackMat = new THREE.MeshStandardMaterial({ color: '#141720', roughness: 0.7 });
  const signMat = new THREE.MeshStandardMaterial({
    map: getTeslaSignTex(),
    emissiveMap: getTeslaSignTex(),
    emissive: new THREE.Color('#ff384c'),
    emissiveIntensity: 1.2,
  });
  const snowMat = createSparklingSnowMaterial('#b8cee8');

  // Snowy concrete base pad
  const pad = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.18, 2.4), snowMat);
  pad.position.set(0, 0.09, 0);
  group.add(pad);

  for (let i = 0; i < 3; i++) {
    const sx = (i - 1.2) * 2.05;
    // Tall sleek V4 Polar-White Monolith
    const monolith = new THREE.Mesh(new THREE.BoxGeometry(0.84, 2.45, 0.34), whiteSlabMat);
    monolith.position.set(sx, 1.32, 0);
    group.add(monolith);

    // Matte-black inner recessed side cable channel & bezel
    const channel = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2.15, 0.36), blackMat);
    channel.position.set(sx + 0.2, 1.3, 0);
    group.add(channel);

    // Glowing Crimson TESLA Header Badge
    const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.68, 0.18), signMat);
    badge.position.set(sx, 2.34, 0.18);
    group.add(badge);

    // Draped curved black NACS cable + docked holster handle
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sx + 0.22, 2.15, 0.14),
      new THREE.Vector3(sx + 0.44, 1.35, 0.26),
      new THREE.Vector3(sx + 0.32, 0.95, 0.16),
    ]);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 12, 0.032, 6, false), blackMat));

    // Puffy snow cap & festive crimson holiday bow on top!
    const snowCap = new THREE.Mesh(new THREE.SphereGeometry(0.46, 10, 8), snowMat);
    snowCap.scale.set(1.05, 0.32, 0.65);
    snowCap.position.set(sx, 2.58, 0);
    group.add(snowCap);

    const bow = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 8, 8),
      new THREE.MeshStandardMaterial({ color: '#d91632' })
    );
    bow.position.set(sx, 2.52, 0.2);
    group.add(bow);
  }

  // Subtle warm halo
  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: getSoftGlowTexture(),
      color: '#ff6678',
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  glow.scale.set(7.5, 4.5, 1);
  glow.position.set(-0.5, 1.6, 0.4);
  group.add(glow);

  const optimus = createAccurateOptimusGen2();
  optimus.group.position.set(2.9, 0.18, 0.45);
  group.add(optimus.group);

  return {
    group,
    update(time: number): void {
      optimus.update(time);
    },
  };
}
