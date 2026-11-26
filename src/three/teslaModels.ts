import * as THREE from 'three';
import { tryLoadOptionalGlb } from './glbModelLoader';
import {
  createCocaColaTrailerTexture,
  createGigaSolarRoofTexture,
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

const _tmpMatrix = new THREE.Matrix4();
const _tmpColor = new THREE.Color();

/**
 * Builds a multi-station lofted hull with guaranteed outward normals.
 * When `smooth` is true (Semi cab, Roadster body), shares indexed vertices across the
 * lofted skin so clearcoat gleams smoothly while end caps remain crisp.
 * When `smooth` is false (Cybertruck angular exoskeleton), preserves sharp planar creases.
 */
function buildLoftedHull(stations: THREE.Vector3[][], smooth = true): THREE.BufferGeometry {
  const ringLen = stations[0].length;
  if (!smooth) {
    const positions: number[] = [];
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

  // Smooth indexed loft skin with separate crisp end-cap vertices
  const positions: number[] = [];
  const indices: number[] = [];
  for (let s = 0; s < stations.length; s++) {
    const ring = stations[s];
    for (let i = 0; i < ringLen; i++) {
      const p = ring[i];
      positions.push(p.x, p.y, p.z);
    }
  }

  const e1 = new THREE.Vector3();
  const e2 = new THREE.Vector3();
  const n = new THREE.Vector3();
  const mid = new THREE.Vector3();
  const center = new THREE.Vector3();

  for (let s = 0; s < stations.length - 1; s++) {
    const r0 = stations[s];
    const r1 = stations[s + 1];
    center.set(0, 0, 0);
    for (let i = 0; i < ringLen; i++) {
      center.add(r0[i]).add(r1[i]);
    }
    center.multiplyScalar(1 / (ringLen * 2));

    const base0 = s * ringLen;
    const base1 = (s + 1) * ringLen;
    for (let i = 0; i < ringLen; i++) {
      const next = (i + 1) % ringLen;
      const a = r0[i], b = r0[next], c = r1[next];
      const ia = base0 + i, ib = base0 + next, ic = base1 + next, id = base1 + i;

      // Orient first triangle outward
      e1.subVectors(b, a);
      e2.subVectors(c, a);
      n.crossVectors(e1, e2);
      mid.addVectors(a, b).add(c).multiplyScalar(1 / 3).sub(center);
      if (n.dot(mid) >= 0) {
        indices.push(ia, ib, ic, ia, ic, id);
      } else {
        indices.push(ia, ic, ib, ia, id, ic);
      }
    }
  }

  // Separate crisp front & back caps (unshared with side skin so end normals stay sharp)
  const capRingIndexed = (ring: THREE.Vector3[], interiorStation: THREE.Vector3[]) => {
    const capCenter = new THREE.Vector3();
    const interiorCenter = new THREE.Vector3();
    for (let i = 0; i < ring.length; i++) {
      capCenter.add(ring[i]);
      interiorCenter.add(interiorStation[i]);
    }
    capCenter.multiplyScalar(1 / ring.length);
    interiorCenter.multiplyScalar(1 / ring.length);

    const centerIdx = positions.length / 3;
    positions.push(capCenter.x, capCenter.y, capCenter.z);
    const ringStart = positions.length / 3;
    for (let i = 0; i < ring.length; i++) {
      positions.push(ring[i].x, ring[i].y, ring[i].z);
    }
    for (let i = 0; i < ring.length; i++) {
      const next = (i + 1) % ring.length;
      const p1 = ring[i], p2 = ring[next];
      e1.subVectors(p1, capCenter);
      e2.subVectors(p2, capCenter);
      n.crossVectors(e1, e2);
      mid.addVectors(capCenter, p1).add(p2).multiplyScalar(1 / 3).sub(interiorCenter);
      if (n.dot(mid) >= 0) {
        indices.push(centerIdx, ringStart + i, ringStart + next);
      } else {
        indices.push(centerIdx, ringStart + next, ringStart + i);
      }
    }
  };
  capRingIndexed(stations[0], stations[1]);
  capRingIndexed(stations[stations.length - 1], stations[stations.length - 2]);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
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
  update(
    dt: number,
    wheelPhase: number,
    isBraking: boolean,
    rippleBoost: number,
    time: number,
    hornFlash?: number
  ): void;
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

  // Sculpted Cab A-Pillar Mullions & Dual Heavy-Duty Windshield Wipers
  for (const side of [-1, 1]) {
    const aPillar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.48, 0.08), blackAeroMat);
    aPillar.position.set(side * 1.0, 2.45, -4.46);
    aPillar.rotation.x = 0.72;
    const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.78, 0.04), blackAeroMat);
    wiper.position.set(side * 0.42 - 0.14, 2.18, -4.72);
    wiper.rotation.x = 0.72;
    wiper.rotation.z = -0.35;
    // Recessed aluminum cab entry steps below driver doors
    const stepBoard = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.86), chromeMat);
    stepBoard.position.set(side * 1.29, 0.46, -3.55);
    group.add(aPillar, wiper, stepBoard);
  }

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

  // 80 Blooming 3D Golden Perimeter Fairy Bulbs batched into 1 InstancedMesh!
  const bulbCoords: [number, number, number][] = [];
  for (let i = 0; i <= 16; i++) {
    const bz = -1.1 + (i / 16) * 8.8;
    for (const side of [-1.34, 1.34]) {
      bulbCoords.push([side, 3.96, bz], [side, 0.88, bz]);
    }
  }
  for (let i = 0; i < 6; i++) {
    const bx = -1.2 + (i / 5) * 2.4;
    bulbCoords.push([bx, 3.96, 7.86], [bx, 0.88, 7.86]);
  }
  const bulbGeo = new THREE.SphereGeometry(0.085, 6, 6);
  const bulbMat = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false });
  const bulbInst = new THREE.InstancedMesh(bulbGeo, bulbMat, bulbCoords.length);
  _tmpColor.setRGB(1.28, 0.98, 0.45);
  for (let i = 0; i < bulbCoords.length; i++) {
    const [bx, by, bz] = bulbCoords[i];
    _tmpMatrix.makeTranslation(bx, by, bz);
    bulbInst.setMatrixAt(i, _tmpMatrix);
    bulbInst.setColorAt(i, _tmpColor);
  }
  bulbInst.instanceMatrix.needsUpdate = true;
  if (bulbInst.instanceColor) bulbInst.instanceColor.needsUpdate = true;
  bulbInst.computeBoundingSphere();
  group.add(bulbInst);

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

  const bulbCount = bulbCoords.length;
  return {
    group,
    update(
      _dt: number,
      wheelPhase: number,
      isBraking: boolean,
      rippleBoost: number,
      time: number,
      hornFlash = 0
    ): void {
      for (const wg of wheelGroups) {
        wg.rotation.x = -wheelPhase;
      }
      const boostBase = rippleBoost * 1.4 + hornFlash * 1.1;
      for (let idx = 0; idx < bulbCount; idx++) {
        const twinkle = 0.68 + 0.32 * Math.sin(time * 5.2 + idx * 0.45);
        const boost = twinkle + boostBase;
        _tmpColor.setRGB(1.28 * boost, 0.98 * boost, 0.45 * boost);
        bulbInst.setColorAt(idx, _tmpColor);
      }
      if (bulbInst.instanceColor) bulbInst.instanceColor.needsUpdate = true;
      panelMat.emissiveIntensity = 0.85 + rippleBoost * 0.9 + hornFlash * 0.8;
      rearPanelMat.emissiveIntensity = 0.78 + rippleBoost * 0.85 + hornFlash * 0.8;
      beamMat.uniforms.uOpacity.value = 0.24 + rippleBoost * 0.14 + hornFlash * 0.46;
      drlMat.color.setRGB(1.0 + hornFlash * 0.7, 0.97 + hornFlash * 0.6, 0.91 + hornFlash * 0.5);
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

export function createAccurateCybertruck(withTree = true, withPlow = false): AccurateCybertruckHandle {
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
  const bodyGeo = buildLoftedHull(hullStations, false);
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
    group.add(new THREE.Mesh(buildLoftedHull(sailWallStations, false), steelMat));
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
      const arch = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 1.14), blackTrimMat);
      arch.position.set(side * 1.03, 1.02, wz);
      group.add(arch);
    }
  }
  // Angular Origami Cybertruck Side Mirrors & Bed Tonneau Trim Rails
  for (const side of [-1, 1]) {
    const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.13, 0.12), blackTrimMat);
    mirror.position.set(side * 1.12, 1.38, -1.62);
    mirror.rotation.y = side * -0.25;
    const bedRail = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.08, 2.25), blackTrimMat);
    bedRail.position.set(side * 0.94, 1.38, 1.70);
    group.add(mirror, bedRail);
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

    for (let t = 0; t < 5; t++) {
      const r = 0.90 - t * 0.16;
      const h = 0.72 - t * 0.05;
      const y = 1.40 + t * 0.40;
      const c = new THREE.Mesh(new THREE.ConeGeometry(r, h, 14), gMat);
      c.position.set(0, y, 1.72);
      c.rotation.y = t * 0.55;
      const cap = new THREE.Mesh(new THREE.ConeGeometry(r * 0.80, h * 0.44, 14), sMat);
      cap.position.set(0, y + h * 0.28, 1.72);
      cap.rotation.y = t * 0.55;
      group.add(c, cap);
    }
    const bedBulbCount = 10;
    const bedBulbGeo = new THREE.SphereGeometry(0.06, 6, 6);
    const bedBulbMat = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false });
    const bedBulbInst = new THREE.InstancedMesh(bedBulbGeo, bedBulbMat, bedBulbCount);
    for (let i = 0; i < bedBulbCount; i++) {
      const f = i / bedBulbCount;
      const ang = i * 1.4;
      const rad = 0.74 * (1 - f * 0.75);
      _tmpMatrix.makeTranslation(Math.cos(ang) * rad, 1.35 + f * 1.9, 1.72 + Math.sin(ang) * rad);
      bedBulbInst.setMatrixAt(i, _tmpMatrix);
      if (i % 2 === 0) _tmpColor.setRGB(1.3, 1.05, 0.45);
      else _tmpColor.setRGB(1.3, 0.22, 0.28);
      bedBulbInst.setColorAt(i, _tmpColor);
    }
    bedBulbInst.instanceMatrix.needsUpdate = true;
    if (bedBulbInst.instanceColor) bedBulbInst.instanceColor.needsUpdate = true;
    bedBulbInst.computeBoundingSphere();
    group.add(bedBulbInst);
    const star = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.16, 0),
      new THREE.MeshBasicMaterial({ color: '#ffe588', toneMapped: false })
    );
    star.position.set(0, 3.45, 1.72);
    group.add(star);

    bedTreeUpdate = (time: number) => {
      for (let idx = 0; idx < bedBulbCount; idx++) {
        const p = 0.75 + 0.25 * Math.sin(time * 5 + idx);
        if (idx % 2 === 0) _tmpColor.setRGB(1.3 * p, 1.05 * p, 0.45 * p);
        else _tmpColor.setRGB(1.3 * p, 0.22 * p, 0.28 * p);
        bedBulbInst.setColorAt(idx, _tmpColor);
      }
      if (bedBulbInst.instanceColor) bedBulbInst.instanceColor.needsUpdate = true;
    };
  }

  let plowUpdate: ((t: number) => void) | null = null;
  if (withPlow) {
    const plowGroup = new THREE.Group();
    const plowYellowMat = new THREE.MeshStandardMaterial({
      color: '#ffbe2e',
      metalness: 0.45,
      roughness: 0.35,
    });
    const plowRedMat = new THREE.MeshStandardMaterial({
      color: '#d41630',
      metalness: 0.35,
      roughness: 0.4,
    });
    for (const side of [-1, 1]) {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.72, 0.14), plowYellowMat);
      wing.position.set(side * 0.64, 0.42, -3.28 - 0.16);
      wing.rotation.y = side * 0.28;
      plowGroup.add(wing);

      const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.16, 0.16), plowRedMat);
      stripe.position.set(side * 0.64, 0.7, -3.28 - 0.16);
      stripe.rotation.y = side * 0.28;
      plowGroup.add(stripe);

      const strut = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.6), blackTrimMat);
      strut.position.set(side * 0.45, 0.46, -2.98);
      plowGroup.add(strut);
    }
    const snowEdge = new THREE.Mesh(
      new THREE.BoxGeometry(2.65, 0.12, 0.2),
      createSparklingSnowMaterial('#d2e4fa')
    );
    snowEdge.position.set(0, 0.8, -3.42);
    plowGroup.add(snowEdge);

    // Flashing roof holiday lightbar (amber + festive red)
    const barHousing = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.08, 0.22), blackTrimMat);
    barHousing.position.set(0, 1.88, -0.35);
    plowGroup.add(barHousing);

    const amberMat = new THREE.MeshBasicMaterial({ color: '#ffaa22', toneMapped: false });
    const beaconRedMat = new THREE.MeshBasicMaterial({ color: '#ff2442', toneMapped: false });
    const leftBeacon = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.24), amberMat);
    leftBeacon.position.set(-0.34, 1.93, -0.35);
    const rightBeacon = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.24), beaconRedMat);
    rightBeacon.position.set(0.34, 1.93, -0.35);
    plowGroup.add(leftBeacon, rightBeacon);

    group.add(plowGroup);

    plowUpdate = (time: number) => {
      const pulseA = Math.sin(time * 14) > 0 ? 1.7 : 0.22;
      const pulseB = Math.sin(time * 14) <= 0 ? 1.7 : 0.22;
      amberMat.color.setRGB(1.0 * pulseA, 0.68 * pulseA, 0.12 * pulseA);
      beaconRedMat.color.setRGB(1.0 * pulseB, 0.15 * pulseB, 0.24 * pulseB);
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
      plowUpdate?.(time);
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

export type StarmanRoadsterGroup = THREE.Group & {
  updateWheels?: (wheelPhase: number) => void;
};

/**
 * 4. ACCURATE 2ND-GEN CHERRY-RED TESLA ROADSTER + STARMAN IN EVA SUIT + COLD-GAS THRUSTERS (facing +X)
 */
export function createAccurateStarmanRoadster(options?: { forSky?: boolean }): StarmanRoadsterGroup {
  const forSky = !!options?.forSky;
  const group = new THREE.Group() as StarmanRoadsterGroup;

  const cherryRed = new THREE.MeshPhysicalMaterial({
    color: '#d40d2a',
    metalness: 0.52,
    roughness: 0.11,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    fog: !forSky ? undefined : false,
  });
  const blackCarbonMat = new THREE.MeshStandardMaterial({
    color: '#11151f',
    metalness: 0.35,
    roughness: 0.42,
    fog: !forSky ? undefined : false,
  });
  const alloyMat = new THREE.MeshStandardMaterial({
    color: '#e6eef8',
    metalness: 0.9,
    roughness: 0.16,
    fog: !forSky ? undefined : false,
  });

  // Sculpted 7-station lofted supercar wedge along +X: front splitter -> fenders -> cockpit waist -> rear haunches -> Kammback tail!
  // Station: [x, halfWidth, botY, fenderY, deckY, innerW]
  const carStationsSpec: [number, number, number, number, number, number][] = [
    [-2.14, 0.78, 0.25, 0.64, 0.76, 0.56], // Sculpted Kammback tail
    [-1.45, 0.93, 0.20, 0.68, 0.76, 0.72], // Muscular rear fender haunches
    [-0.68, 0.88, 0.18, 0.65, 0.72, 0.68], // Sculpted waist behind cockpit
    [0.24, 0.87, 0.18, 0.63, 0.67, 0.68],  // Door sills & front fender crown
    [1.08, 0.90, 0.19, 0.61, 0.64, 0.66],  // Sculpted front wheel arches
    [1.78, 0.80, 0.21, 0.48, 0.51, 0.56],  // Diving nose cone
    [2.16, 0.56, 0.23, 0.34, 0.36, 0.38],  // Sharp front aero nose tip
  ];

  const roadsterStations = carStationsSpec.map(([x, hw, by, fy, dy, iw]) => [
    new THREE.Vector3(x, by, -hw * 0.9),
    new THREE.Vector3(x, fy, -hw),
    new THREE.Vector3(x, dy, -iw),
    new THREE.Vector3(x, dy + 0.02, iw),
    new THREE.Vector3(x, fy, hw),
    new THREE.Vector3(x, by, hw * 0.9),
  ]);
  group.add(new THREE.Mesh(buildLoftedHull(roadsterStations), cherryRed));

  // Recessed cockpit tub interior & glossy front carbon splitter + aggressive rear diffuser
  const cockpitTub = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.18, 1.32), blackCarbonMat);
  cockpitTub.position.set(-0.22, 0.62, 0);
  const splitter = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.07, 1.76), blackCarbonMat);
  splitter.position.set(1.98, 0.18, 0);
  const rearDiffuser = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.19, 1.62), blackCarbonMat);
  rearDiffuser.position.set(-2.06, 0.24, 0);
  group.add(cockpitTub, splitter, rearDiffuser);

  // Sculpted curved dark tinted Roadster frameless wraparound windshield & A-pillars
  const wsMat = new THREE.MeshPhysicalMaterial({
    color: '#0e192c',
    roughness: 0.04,
    clearcoat: 1.0,
    transparent: true,
    opacity: 0.82,
    fog: !forSky ? undefined : false,
  });
  const wsGeo = new THREE.CylinderGeometry(0.84, 0.92, 0.54, 16, 1, true, -Math.PI * 0.34, Math.PI * 0.68);
  const wsMesh = new THREE.Mesh(wsGeo, wsMat);
  wsMesh.rotation.order = 'YXZ';
  wsMesh.rotation.y = Math.PI * 0.5;
  wsMesh.rotation.x = 0.72;
  wsMesh.scale.set(1.0, 1.0, 0.78);
  wsMesh.position.set(0.25, 0.78, 0);
  group.add(wsMesh);

  // Active Aero Rear Roll Hoops behind Starman & passenger
  for (const rz of [-0.36, 0.36]) {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.036, 6, 12, Math.PI), blackCarbonMat);
    hoop.position.set(-0.78, 0.72, rz);
    group.add(hoop);
  }

  // Sculpted Angular LED Headlight Blades & Full-Width Crimson LED Taillight Bar + Tesla Rear Badge
  const hlMat = new THREE.MeshBasicMaterial({ color: '#fff9e6', toneMapped: false, fog: false });
  const tlMat = new THREE.MeshBasicMaterial({ color: '#ff233c', toneMapped: false, fog: false });
  for (const lz of [-0.66, 0.66]) {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.065, 0.22), hlMat);
    hl.position.set(1.94, 0.44, lz);
    hl.rotation.z = -0.26;
    hl.rotation.y = lz > 0 ? 0.22 : -0.22;
    group.add(hl);
  }
  const tailBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.075, 1.48), tlMat);
  tailBar.position.set(-2.15, 0.62, 0);
  group.add(tailBar);

  // SpaceX Cold-Gas Thruster Package behind Rear Plate + Soft Ice-Blue Exhaust Cones!
  const thrusterMat = new THREE.MeshBasicMaterial({
    color: '#6ff0ff',
    transparent: true,
    opacity: forSky ? 0.85 : 0.42,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
    fog: false,
  });
  for (const tz of [-0.28, 0.28]) {
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.085, 0.14, 10), alloyMat);
    nozzle.rotation.z = Math.PI * 0.5;
    nozzle.position.set(-2.17, 0.43, tz);
    group.add(nozzle);

    const plume = new THREE.Mesh(new THREE.ConeGeometry(forSky ? 0.24 : 0.11, forSky ? 1.85 : 0.65, 12, 1, true), thrusterMat);
    plume.rotation.z = Math.PI * 0.5;
    plume.position.set(forSky ? -3.12 : -2.52, 0.43, tz);
    group.add(plume);
  }

  if (forSky) {
    const starGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: getSoftGlowTexture(),
        color: '#ffe29c',
        transparent: true,
        opacity: 0.24,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );
    starGlow.scale.set(3.2, 3.2, 1);
    starGlow.position.set(-0.4, 0.55, 0);
    group.add(starGlow);
  }

  if (!forSky) {
    const beamMat = createVolumetricBeamMaterial('#fff2d2', 0.18);
    for (const lz of [-0.62, 0.62]) {
      const beam = new THREE.Mesh(new THREE.ConeGeometry(1.55, 9.5, 14, 1, true), beamMat);
      beam.rotation.z = Math.PI * 0.5;
      beam.position.set(6.7, 0.46, lz);
      group.add(beam);
    }
  }

  // 4 Sporty Low-Profile Tires with 5-Spoke Turbine Alloys & Crimson Brake Calipers (rotating wheel groups)
  const wheelGroups: THREE.Group[] = [];
  const roadsterTireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.25, 16);
  const roadsterRimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.26, 12);
  const roadsterSpokeGeo = !forSky ? new THREE.BoxGeometry(0.38, 0.045, 0.27) : null;
  const roadsterCaliperGeo = !forSky ? new THREE.BoxGeometry(0.14, 0.16, 0.16) : null;
  for (const wx of [-1.34, 1.34]) {
    for (const wz of [-0.90, 0.90]) {
      const wg = new THREE.Group();
      wg.position.set(wx, 0.35, wz);
      const tire = new THREE.Mesh(roadsterTireGeo, blackCarbonMat);
      tire.rotation.x = Math.PI * 0.5;
      const rim = new THREE.Mesh(roadsterRimGeo, alloyMat);
      rim.rotation.x = Math.PI * 0.5;
      wg.add(tire, rim);
      if (!forSky && roadsterSpokeGeo) {
        for (let sp = 0; sp < 5; sp++) {
          const spoke = new THREE.Mesh(roadsterSpokeGeo, alloyMat);
          spoke.rotation.z = (sp / 5) * Math.PI;
          wg.add(spoke);
        }
      }
      group.add(wg);
      wheelGroups.push(wg);

      if (!forSky && roadsterCaliperGeo) {
        const caliper = new THREE.Mesh(roadsterCaliperGeo, tlMat);
        caliper.position.set(wx - 0.12, 0.36, wz * 0.96);
        group.add(caliper);
      }
    }
  }
  group.userData.wheelGroups = wheelGroups;
  group.updateWheels = (wheelPhase: number): void => {
    for (const wg of wheelGroups) {
      wg.rotation.z = -wheelPhase;
    }
  };

  // Detailed SpaceX Starman in IVA Suit + Steering Yoke + Gold-Black Helmet + Fur-Trimmed Santa Hat & Flowing Scarf!
  const suitMat = new THREE.MeshPhysicalMaterial({ color: '#f5f8fd', roughness: 0.42, fog: !forSky ? undefined : false });
  const redVelvetMat = new THREE.MeshStandardMaterial({ color: '#d81632', roughness: 0.62, fog: !forSky ? undefined : false });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.38, 6, 12), suitMat);
  torso.position.set(-0.24, 0.90, -0.28);
  torso.rotation.z = 0.18;
  group.add(torso);

  const chestBadge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.14, 0.22), blackCarbonMat);
  chestBadge.position.set(-0.10, 0.98, -0.28);
  const collarRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.032, 6, 12), blackCarbonMat);
  collarRing.rotation.x = Math.PI * 0.5;
  collarRing.position.set(-0.26, 1.13, -0.28);
  group.add(chestBadge, collarRing);

  // Starman Helmet with Contoured Gold-Black Reflective Visor
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.21, 16, 14), suitMat);
  helmet.position.set(-0.26, 1.33, -0.28);
  const visor = new THREE.Mesh(
    new THREE.SphereGeometry(0.188, 14, 14),
    new THREE.MeshPhysicalMaterial({ color: '#141c28', metalness: 0.78, roughness: 0.04, clearcoat: 1.0, fog: !forSky ? undefined : false })
  );
  visor.position.set(-0.17, 1.33, -0.28);
  group.add(helmet, visor);

  // Iconic Left Elbow on Door Sill + Right Arm Holding Roadster Yoke
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.062, 0.44, 4, 8), suitMat);
  leftArm.position.set(-0.16, 0.92, -0.68);
  leftArm.rotation.z = Math.PI * 0.44;
  const rightArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.058, 0.42, 4, 8), suitMat);
  rightArm.position.set(-0.02, 0.94, -0.06);
  rightArm.rotation.z = Math.PI * 0.38;
  rightArm.rotation.y = -0.35;
  const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.34), blackCarbonMat);
  yoke.position.set(0.16, 0.88, -0.28);
  group.add(leftArm, rightArm, yoke);

  // Fur-Trimmed Santa Hat & Streaming Red Scarf!
  const hatBrim = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.048, 6, 14), suitMat);
  hatBrim.rotation.x = Math.PI * 0.5;
  hatBrim.position.set(-0.28, 1.48, -0.28);
  const hat = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.46, 12), redVelvetMat);
  hat.position.set(-0.37, 1.66, -0.28);
  hat.rotation.z = 0.42;
  const pom = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), suitMat);
  pom.position.set(-0.52, 1.86, -0.28);
  const scarf = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.05, 0.13), redVelvetMat);
  scarf.position.set(-0.55, 1.15, -0.36);
  scarf.rotation.z = -0.14;
  scarf.rotation.y = 0.18;
  group.add(hatBrim, hat, pom, scarf);

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
 * 5B. FESTIVE TESLA V4 SUPERCHARGER WINTER PLAZA (0 PointLights — GPU-shared geometry & textures)
 * Local coordinates:
 * - X: width along the street (-7.25 .. +7.25, 14.5m total)
 * - Z: depth perpendicular to the street (-3.75 .. +3.75, 7.5m total); +Z faces the street!
 * - Y: ground = 0 (pad foundation extends down to -0.35m for clean anchoring on slopes)
 */
export interface SuperchargerPlazaHandle {
  group: THREE.Group;
  update(time: number, lightShow?: number, daylight?: number): void;
  dispose(): void;
}

let sharedScPadTex: THREE.CanvasTexture | null = null;
let sharedScTotemTex: THREE.CanvasTexture | null = null;
let sharedScValanceTex: THREE.CanvasTexture | null = null;

function drawSuperchargerCrest(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = '#e81b38';
  ctx.beginPath();
  ctx.moveTo(-size * 0.68, -size * 0.28);
  ctx.quadraticCurveTo(0, -size * 0.46, size * 0.68, -size * 0.28);
  ctx.lineTo(size * 0.56, -size * 0.16);
  ctx.quadraticCurveTo(0, -size * 0.31, -size * 0.56, -size * 0.16);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-size * 0.52, -size * 0.08);
  ctx.quadraticCurveTo(0, -size * 0.21, size * 0.52, -size * 0.08);
  ctx.lineTo(size * 0.14, size * 0.04);
  ctx.lineTo(0, size * 0.68);
  ctx.lineTo(-size * 0.14, size * 0.04);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function getHeatedPadTex(): THREE.CanvasTexture {
  if (sharedScPadTex) return sharedScPadTex;
  const w = 512;
  const h = 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#181f2b');
  grad.addColorStop(0.5, '#1e2736');
  grad.addColorStop(1, '#151c27');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle heated concrete expansion joints & winter asphalt micro-grain
  ctx.strokeStyle = 'rgba(8, 12, 20, 0.48)';
  ctx.lineWidth = 2;
  for (let x = 64; x < w; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 64; y < h; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (let i = 0; i < 650; i++) {
    const px = ((i * 73) % w);
    const py = ((i * 41) % h);
    ctx.fillStyle = i % 3 === 0 ? 'rgba(150, 175, 210, 0.06)' : 'rgba(6, 10, 16, 0.16)';
    ctx.fillRect(px, py, 2, 2);
  }
  // Subtle perimeter frost rim
  ctx.strokeStyle = 'rgba(205, 224, 248, 0.18)';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, w - 8, h - 8);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  sharedScPadTex = tex;
  return tex;
}

function getSuperchargerTotemTex(): THREE.CanvasTexture {
  if (sharedScTotemTex) return sharedScTotemTex;
  const w = 256;
  const h = 512;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0c121e');
  bg.addColorStop(0.55, '#141d2e');
  bg.addColorStop(1, '#090e18');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle brushed aluminum frame & left vertical crimson accent bar
  ctx.strokeStyle = 'rgba(195, 212, 236, 0.28)';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, w - 16, h - 16);
  ctx.fillStyle = '#ff1f3d';
  ctx.fillRect(14, 24, 10, h - 48);

  // Red Tesla T-crest medallion at top
  drawSuperchargerCrest(ctx, w * 0.54, 132, 74);

  // Glowing crimson divider
  ctx.fillStyle = '#ff2442';
  ctx.fillRect(46, 228, w - 72, 5);

  // Crisp SUPERCHARGER wordmark
  ctx.fillStyle = '#f6f9ff';
  ctx.font = '800 26px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SUPERCHARGER', w * 0.54, 276);

  ctx.fillStyle = '#b9cbe4';
  ctx.font = '600 18px Inter, system-ui, sans-serif';
  ctx.fillText('V4 · 250 kW', w * 0.54, 316);

  // Festive winter badge at bottom
  ctx.fillStyle = 'rgba(255, 224, 146, 0.92)';
  ctx.font = '600 15px Inter, system-ui, sans-serif';
  ctx.fillText('✦  WINTER LOUNGE  ✦', w * 0.54, 384);

  ctx.fillStyle = '#ff2442';
  ctx.fillRect(46, 442, w - 72, 6);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  sharedScTotemTex = tex;
  return tex;
}

function getCanopyFrontValanceTex(): THREE.CanvasTexture {
  if (sharedScValanceTex) return sharedScValanceTex;
  const w = 1024;
  const h = 96;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#0f1624');
  bg.addColorStop(1, '#192336');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'rgba(206, 222, 245, 0.25)';
  ctx.fillRect(0, 0, w, 4);

  drawSuperchargerCrest(ctx, 210, 48, 30);

  ctx.fillStyle = '#f5f8ff';
  ctx.font = '700 34px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('T E S L A   S U P E R C H A R G E R', w * 0.54, 50);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  sharedScValanceTex = tex;
  return tex;
}

interface SuperchargerSharedAssets {
  // Static materials
  padMat: THREE.MeshStandardMaterial;
  curbMat: THREE.MeshStandardMaterial;
  stripeMat: THREE.MeshStandardMaterial;
  wheelStopMat: THREE.MeshStandardMaterial;
  wheelStopRedMat: THREE.MeshBasicMaterial;
  graphiteMat: THREE.MeshStandardMaterial;
  solarRoofMat: THREE.MeshStandardMaterial;
  valanceMat: THREE.MeshBasicMaterial;
  snowMat: THREE.MeshStandardMaterial;
  icicleMat: THREE.MeshStandardMaterial;
  v4WhiteMat: THREE.MeshPhysicalMaterial;
  v4BlackGlassMat: THREE.MeshStandardMaterial;
  v4CableMat: THREE.MeshStandardMaterial;
  v4BadgeMat: THREE.MeshBasicMaterial;
  wreathMat: THREE.MeshStandardMaterial;
  crimsonMat: THREE.MeshStandardMaterial;
  goldMat: THREE.MeshBasicMaterial;
  santaFurMat: THREE.MeshStandardMaterial;
  totemFaceMat: THREE.MeshBasicMaterial;
  pineMat: THREE.MeshStandardMaterial;
  trunkMat: THREE.MeshStandardMaterial;
  megapackMat: THREE.MeshStandardMaterial;
  cyberSteelMat: THREE.MeshPhysicalMaterial;
  cyberGlassMat: THREE.MeshStandardMaterial;
  cyberTrimMat: THREE.MeshStandardMaterial;
  cyberDrlMat: THREE.MeshBasicMaterial;
  cyberTailMat: THREE.MeshBasicMaterial;
  // Shared geometries
  padGeo: THREE.BoxGeometry;
  curbGeo: THREE.BoxGeometry;
  snowRimGeo: THREE.SphereGeometry;
  bayLineGeo: THREE.BoxGeometry;
  entryLineGeo: THREE.BoxGeometry;
  wheelStopGeo: THREE.BoxGeometry;
  wheelStopRedGeo: THREE.BoxGeometry;
  glowPlaneGeo: THREE.PlaneGeometry;
  colPlinthGeo: THREE.BoxGeometry;
  colShaftGeo: THREE.BoxGeometry;
  colBeamGeo: THREE.BoxGeometry;
  roofDeckGeo: THREE.BoxGeometry;
  roofSolarGeo: THREE.PlaneGeometry;
  valanceGeo: THREE.PlaneGeometry;
  canopyRedBarGeo: THREE.BoxGeometry;
  soffitStripGeo: THREE.BoxGeometry;
  snowRidgeLobeGeo: THREE.SphereGeometry;
  icicleGeo: THREE.ConeGeometry;
  fairyBulbGeo: THREE.SphereGeometry;
  stallBodyGeo: THREE.BoxGeometry;
  stallGlassGeo: THREE.BoxGeometry;
  stallLedSlitGeo: THREE.BoxGeometry;
  stallLedTopGeo: THREE.BoxGeometry;
  stallBadgeGeo: THREE.PlaneGeometry;
  stallCableGeo: THREE.TubeGeometry;
  connectedCableGeo: THREE.TubeGeometry;
  wreathGeo: THREE.TorusGeometry;
  bowGeo: THREE.BoxGeometry;
  santaBrimGeo: THREE.TorusGeometry;
  santaConeGeo: THREE.ConeGeometry;
  santaPomGeo: THREE.SphereGeometry;
  totemPlinthGeo: THREE.BoxGeometry;
  totemBodyGeo: THREE.BoxGeometry;
  totemFaceGeo: THREE.PlaneGeometry;
  totemRedStripGeo: THREE.BoxGeometry;
  totemSnowGeo: THREE.SphereGeometry;
  treeTrunkGeo: THREE.CylinderGeometry;
  treeTierGeos: THREE.ConeGeometry[];
  treeStarGeo: THREE.OctahedronGeometry;
  megapackGeo: THREE.BoxGeometry;
  megaRibbonHGeo: THREE.BoxGeometry;
  megaRibbonVGeo: THREE.BoxGeometry;
  cyberHullGeo: THREE.BufferGeometry;
  cyberGlassGeo: THREE.BufferGeometry;
  cyberArchGeo: THREE.BoxGeometry;
  cyberWheelGeo: THREE.CylinderGeometry;
  cyberDrlGeo: THREE.BoxGeometry;
  cyberTailGeo: THREE.BoxGeometry;
  chargePortBarGeo: THREE.BoxGeometry;
}

let cachedScAssets: SuperchargerSharedAssets | null = null;

function buildLightweightCybertruckGeos(): { hull: THREE.BufferGeometry; glass: THREE.BufferGeometry } {
  // Compact parked Cybertruck facing +Z (rear toward -Z V4 stall at z = -2.25)
  const hw = 0.94;
  const rw = 0.66;
  const stations: THREE.Vector3[][] = [
    // Rear tailgate (z = -2.42)
    [
      new THREE.Vector3(-0.88, 0.42, -2.42),
      new THREE.Vector3(-0.94, 1.24, -2.42),
      new THREE.Vector3(-0.88, 1.28, -2.42),
      new THREE.Vector3(0.88, 1.28, -2.42),
      new THREE.Vector3(0.94, 1.24, -2.42),
      new THREE.Vector3(0.88, 0.42, -2.42),
    ],
    // Roof apex behind cab (z = +0.15)
    [
      new THREE.Vector3(-hw * 0.94, 0.40, 0.15),
      new THREE.Vector3(-hw, 1.28, 0.15),
      new THREE.Vector3(-rw, 1.74, 0.15),
      new THREE.Vector3(rw, 1.74, 0.15),
      new THREE.Vector3(hw, 1.28, 0.15),
      new THREE.Vector3(hw * 0.94, 0.40, 0.15),
    ],
    // Windshield base (z = +1.48)
    [
      new THREE.Vector3(-hw * 0.94, 0.40, 1.48),
      new THREE.Vector3(-hw, 1.26, 1.48),
      new THREE.Vector3(-0.84, 1.28, 1.48),
      new THREE.Vector3(0.84, 1.28, 1.48),
      new THREE.Vector3(hw, 1.26, 1.48),
      new THREE.Vector3(hw * 0.94, 0.40, 1.48),
    ],
    // Blunt front nose (z = +2.44)
    [
      new THREE.Vector3(-0.86, 0.42, 2.44),
      new THREE.Vector3(-0.92, 0.98, 2.44),
      new THREE.Vector3(-0.88, 1.00, 2.44),
      new THREE.Vector3(0.88, 1.00, 2.44),
      new THREE.Vector3(0.92, 0.98, 2.44),
      new THREE.Vector3(0.86, 0.42, 2.44),
    ],
  ];
  const hull = buildLoftedHull(stations, false);

  // Sloped windshield + side windows with outward normals
  const gPos: number[] = [];
  const interior = new THREE.Vector3(0, 1.0, 0.4);
  pushOutwardQuad(
    gPos,
    new THREE.Vector3(-0.82, 1.30, 1.48),
    new THREE.Vector3(0.82, 1.30, 1.48),
    new THREE.Vector3(0.64, 1.75, 0.18),
    new THREE.Vector3(-0.64, 1.75, 0.18),
    interior
  );
  for (const s of [-1, 1]) {
    pushOutwardQuad(
      gPos,
      new THREE.Vector3(s * 0.95, 1.26, 1.32),
      new THREE.Vector3(s * 0.70, 1.69, 0.15),
      new THREE.Vector3(s * 0.78, 1.54, -0.78),
      new THREE.Vector3(s * 0.95, 1.24, -0.78),
      interior
    );
  }
  const glass = new THREE.BufferGeometry();
  glass.setAttribute('position', new THREE.Float32BufferAttribute(gPos, 3));
  glass.computeVertexNormals();
  return { hull, glass };
}

function getSuperchargerSharedAssets(): SuperchargerSharedAssets {
  if (cachedScAssets) return cachedScAssets;

  const solarTex = createGigaSolarRoofTexture();
  const { hull: cyberHullGeo, glass: cyberGlassGeo } = buildLightweightCybertruckGeos();

  const stallCableCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.24, 2.12, 0.04),
    new THREE.Vector3(0.39, 1.42, 0.14),
    new THREE.Vector3(0.27, 0.88, 0.06),
  ]);
  // Cable arcing from bay #2 stall (z = -2.25) to parked Cybertruck rear-left fender charge port
  const connectedCableCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.24, 2.10, 0.05),
    new THREE.Vector3(0.56, 1.25, 0.42),
    new THREE.Vector3(0.82, 0.74, 0.92),
    new THREE.Vector3(0.95, 0.96, 1.18),
  ]);

  cachedScAssets = {
    padMat: new THREE.MeshStandardMaterial({
      map: getHeatedPadTex(),
      roughness: 0.74,
      metalness: 0.08,
      envMapIntensity: 0.35,
    }),
    curbMat: new THREE.MeshStandardMaterial({
      color: '#2d3748',
      roughness: 0.84,
      metalness: 0.12,
    }),
    stripeMat: new THREE.MeshStandardMaterial({
      color: '#e8effa',
      roughness: 0.65,
      metalness: 0.05,
    }),
    wheelStopMat: new THREE.MeshStandardMaterial({
      color: '#19202d',
      roughness: 0.78,
      metalness: 0.15,
    }),
    wheelStopRedMat: new THREE.MeshBasicMaterial({ color: '#e81f3c', toneMapped: false }),
    graphiteMat: new THREE.MeshStandardMaterial({
      color: '#161e2c',
      roughness: 0.38,
      metalness: 0.56,
      envMapIntensity: 0.42,
    }),
    solarRoofMat: new THREE.MeshStandardMaterial({
      map: solarTex,
      roughness: 0.42,
      metalness: 0.20,
      envMapIntensity: 0.35,
    }),
    valanceMat: new THREE.MeshBasicMaterial({
      map: getCanopyFrontValanceTex(),
      toneMapped: false,
    }),
    snowMat: createSparklingSnowMaterial('#c2d6f0'),
    icicleMat: new THREE.MeshStandardMaterial({
      color: '#cceaff',
      roughness: 0.14,
      metalness: 0.10,
      transparent: true,
      opacity: 0.78,
    }),
    v4WhiteMat: new THREE.MeshPhysicalMaterial({
      color: '#f2f6fc',
      roughness: 0.22,
      metalness: 0.10,
      clearcoat: 0.65,
      clearcoatRoughness: 0.16,
      envMapIntensity: 0.5,
    }),
    v4BlackGlassMat: new THREE.MeshStandardMaterial({
      color: '#0d121c',
      roughness: 0.16,
      metalness: 0.32,
      envMapIntensity: 0.45,
    }),
    v4CableMat: new THREE.MeshStandardMaterial({
      color: '#12161f',
      roughness: 0.82,
      metalness: 0.1,
    }),
    v4BadgeMat: new THREE.MeshBasicMaterial({
      map: getTeslaSignTex(),
      toneMapped: false,
    }),
    wreathMat: new THREE.MeshStandardMaterial({ color: '#1b583f', roughness: 0.88 }),
    crimsonMat: new THREE.MeshStandardMaterial({ color: '#d81632', roughness: 0.52 }),
    goldMat: new THREE.MeshBasicMaterial({ color: '#ffe38c', toneMapped: false }),
    santaFurMat: new THREE.MeshStandardMaterial({ color: '#f6f9ff', roughness: 0.85 }),
    totemFaceMat: new THREE.MeshBasicMaterial({
      map: getSuperchargerTotemTex(),
      toneMapped: false,
    }),
    pineMat: new THREE.MeshStandardMaterial({ color: '#154d3c', roughness: 0.86 }),
    trunkMat: new THREE.MeshStandardMaterial({ color: '#4a2e22', roughness: 0.92 }),
    megapackMat: new THREE.MeshStandardMaterial({ color: '#eef3fa', roughness: 0.42, metalness: 0.16 }),
    cyberSteelMat: new THREE.MeshPhysicalMaterial({
      color: '#b8c6dc',
      metalness: 0.86,
      roughness: 0.26,
      clearcoat: 0.42,
      flatShading: true,
      envMapIntensity: 0.55,
    }),
    cyberGlassMat: new THREE.MeshStandardMaterial({
      color: '#121d2e',
      emissive: new THREE.Color('#ffaa55'),
      emissiveIntensity: 0.34,
      roughness: 0.12,
      metalness: 0.35,
    }),
    cyberTrimMat: new THREE.MeshStandardMaterial({ color: '#12161e', roughness: 0.82 }),
    cyberDrlMat: new THREE.MeshBasicMaterial({ color: '#d8e8ff', toneMapped: false }),
    cyberTailMat: new THREE.MeshBasicMaterial({ color: '#c4182e', toneMapped: false }),

    padGeo: new THREE.BoxGeometry(14.5, 0.18, 7.5),
    curbGeo: new THREE.BoxGeometry(14.88, 0.45, 7.88),
    snowRimGeo: new THREE.SphereGeometry(0.95, 10, 7),
    bayLineGeo: new THREE.BoxGeometry(0.11, 0.015, 4.75),
    entryLineGeo: new THREE.BoxGeometry(11.1, 0.015, 0.11),
    wheelStopGeo: new THREE.BoxGeometry(1.62, 0.11, 0.18),
    wheelStopRedGeo: new THREE.BoxGeometry(1.18, 0.025, 0.07),
    glowPlaneGeo: new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI * 0.5),
    colPlinthGeo: new THREE.BoxGeometry(0.76, 0.24, 0.88),
    colShaftGeo: new THREE.BoxGeometry(0.38, 4.35, 0.52),
    colBeamGeo: new THREE.BoxGeometry(0.34, 0.28, 5.15),
    roofDeckGeo: new THREE.BoxGeometry(13.6, 0.26, 5.8),
    roofSolarGeo: new THREE.PlaneGeometry(13.0, 4.7).rotateX(-Math.PI * 0.5),
    valanceGeo: new THREE.PlaneGeometry(11.6, 0.36),
    canopyRedBarGeo: new THREE.BoxGeometry(13.5, 0.11, 0.09),
    soffitStripGeo: new THREE.BoxGeometry(11.6, 0.045, 0.16),
    snowRidgeLobeGeo: new THREE.SphereGeometry(1.0, 10, 7),
    icicleGeo: new THREE.ConeGeometry(0.036, 0.38, 5).rotateZ(Math.PI),
    fairyBulbGeo: new THREE.SphereGeometry(0.068, 6, 6),
    stallBodyGeo: new THREE.BoxGeometry(0.54, 2.38, 0.26),
    stallGlassGeo: new THREE.BoxGeometry(0.36, 1.92, 0.04),
    stallLedSlitGeo: new THREE.BoxGeometry(0.032, 1.88, 0.045),
    stallLedTopGeo: new THREE.BoxGeometry(0.42, 0.04, 0.045),
    stallBadgeGeo: new THREE.PlaneGeometry(0.34, 0.09),
    stallCableGeo: new THREE.TubeGeometry(stallCableCurve, 10, 0.028, 6, false),
    connectedCableGeo: new THREE.TubeGeometry(connectedCableCurve, 12, 0.030, 6, false),
    wreathGeo: new THREE.TorusGeometry(0.145, 0.042, 6, 12),
    bowGeo: new THREE.BoxGeometry(0.11, 0.06, 0.05),
    santaBrimGeo: new THREE.TorusGeometry(0.19, 0.048, 6, 12).rotateX(Math.PI * 0.5),
    santaConeGeo: new THREE.ConeGeometry(0.18, 0.44, 10),
    santaPomGeo: new THREE.SphereGeometry(0.06, 8, 8),
    totemPlinthGeo: new THREE.BoxGeometry(1.14, 0.24, 0.46),
    totemBodyGeo: new THREE.BoxGeometry(0.96, 3.72, 0.24),
    totemFaceGeo: new THREE.PlaneGeometry(0.90, 3.58),
    totemRedStripGeo: new THREE.BoxGeometry(0.06, 3.55, 0.27),
    totemSnowGeo: new THREE.SphereGeometry(0.48, 10, 6),
    treeTrunkGeo: new THREE.CylinderGeometry(0.10, 0.14, 0.55, 7),
    treeTierGeos: [
      new THREE.ConeGeometry(0.84, 1.05, 10),
      new THREE.ConeGeometry(0.64, 0.92, 10),
      new THREE.ConeGeometry(0.42, 0.78, 10),
    ],
    treeStarGeo: new THREE.OctahedronGeometry(0.16, 0),
    megapackGeo: new THREE.BoxGeometry(1.16, 1.38, 0.78),
    megaRibbonHGeo: new THREE.BoxGeometry(1.20, 0.18, 0.82),
    megaRibbonVGeo: new THREE.BoxGeometry(0.18, 1.42, 0.82),
    cyberHullGeo,
    cyberGlassGeo,
    cyberArchGeo: new THREE.BoxGeometry(0.14, 0.22, 1.02),
    cyberWheelGeo: new THREE.CylinderGeometry(0.42, 0.42, 0.28, 14).rotateZ(Math.PI * 0.5),
    cyberDrlGeo: new THREE.BoxGeometry(1.80, 0.055, 0.06),
    cyberTailGeo: new THREE.BoxGeometry(1.82, 0.065, 0.06),
    chargePortBarGeo: new THREE.BoxGeometry(0.05, 0.16, 0.26),
  };

  return cachedScAssets;
}

const _scLightShowPalette = [
  new THREE.Color('#ff1e3e'),
  new THREE.Color('#ffd84d'),
  new THREE.Color('#24ff9c'),
  new THREE.Color('#4de8ff'),
  new THREE.Color('#ff5ce8'),
];

export function createAccurateSuperchargerPlaza(): SuperchargerPlazaHandle {
  const group = new THREE.Group();
  const a = getSuperchargerSharedAssets();
  const ownedMaterials: THREE.Material[] = [];
  const ownedInstanced: THREE.InstancedMesh[] = [];

  const trackMat = <T extends THREE.Material>(m: T): T => {
    ownedMaterials.push(m);
    return m;
  };

  // --- 1. HEATED SNOW-FREE PAD (14.5m x 7.5m) + CURB + BAY STRIPES + WHEEL STOPS ---
  const curb = new THREE.Mesh(a.curbGeo, a.curbMat);
  curb.position.set(0, -0.125, 0);
  curb.receiveShadow = true;
  group.add(curb);

  const pad = new THREE.Mesh(a.padGeo, a.padMat);
  pad.position.set(0, 0.05, 0);
  pad.receiveShadow = true;
  group.add(pad);

  // Subtle snow drift shoulders tucked against rear & side outer curb corners
  for (const [sx, sz, rx, rz] of [
    [-6.6, -3.95, 1.4, 0.65],
    [-2.2, -4.02, 2.2, 0.55],
    [2.6, -4.00, 2.1, 0.58],
    [6.7, -3.92, 1.3, 0.68],
    [-7.55, -1.6, 0.6, 1.7],
    [7.55, -1.5, 0.6, 1.7],
  ] as const) {
    const rim = new THREE.Mesh(a.snowRimGeo, a.snowMat);
    rim.position.set(sx, 0.02, sz);
    rim.scale.set(rx, 0.34, rz);
    group.add(rim);
  }

  // 5 charging bay stall stripes (6 divider lines) + front entry edge line
  const stallXs = [-4.4, -2.2, 0, 2.2, 4.4];
  for (let i = 0; i <= 5; i++) {
    const lx = -5.5 + i * 2.2;
    const stripe = new THREE.Mesh(a.bayLineGeo, a.stripeMat);
    stripe.position.set(lx, 0.148, 0.85);
    group.add(stripe);
  }
  const entryLine = new THREE.Mesh(a.entryLineGeo, a.stripeMat);
  entryLine.position.set(0, 0.148, 3.22);
  group.add(entryLine);

  // 5 crimson-accented wheel stops
  for (const sx of stallXs) {
    const stop = new THREE.Mesh(a.wheelStopGeo, a.wheelStopMat);
    stop.position.set(sx, 0.195, -1.48);
    const stopRed = new THREE.Mesh(a.wheelStopRedGeo, a.wheelStopRedMat);
    stopRed.position.set(sx, 0.258, -1.48);
    group.add(stop, stopRed);
  }

  // Warm-gold + subtle crimson additive ground-glow decals illuminating surrounding snow (0 PointLights!)
  const goldGlowMat = trackMat(
    new THREE.MeshBasicMaterial({
      map: getSoftGlowTexture(),
      color: '#ffbe62',
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  const goldGlow = new THREE.Mesh(a.glowPlaneGeo, goldGlowMat);
  goldGlow.position.set(0, 0.165, 0.35);
  goldGlow.scale.set(17.8, 1, 10.6);
  group.add(goldGlow);

  const redGlowMat = trackMat(
    new THREE.MeshBasicMaterial({
      map: getSoftGlowTexture(),
      color: '#ff2848',
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  const redGlow = new THREE.Mesh(a.glowPlaneGeo, redGlowMat);
  redGlow.position.set(0, 0.172, -1.2);
  redGlow.scale.set(15.0, 1, 5.4);
  group.add(redGlow);

  // --- 2. ARCHITECTURAL DARK CYBER-CANOPY (TWIN ANGLED COLUMNS + PV SOLAR ROOF) ---
  for (const cx of [-3.75, 3.75]) {
    const plinth = new THREE.Mesh(a.colPlinthGeo, a.curbMat);
    plinth.position.set(cx, 0.24, -2.65);
    const shaft = new THREE.Mesh(a.colShaftGeo, a.graphiteMat);
    shaft.position.set(cx, 2.26, -2.22);
    shaft.rotation.x = 0.21;
    shaft.castShadow = true;
    const beam = new THREE.Mesh(a.colBeamGeo, a.graphiteMat);
    beam.position.set(cx, 4.18, -0.25);
    beam.rotation.x = -0.07;
    beam.castShadow = true;
    group.add(plinth, shaft, beam);
  }

  // Cantilevered roof assembly pitched cleanly backward (-0.07 rad) so front lip welcomes the street
  const canopyPivot = new THREE.Group();
  canopyPivot.position.set(0, 4.40, -0.35);
  canopyPivot.rotation.x = -0.07;
  group.add(canopyPivot);

  const roofDeck = new THREE.Mesh(a.roofDeckGeo, a.graphiteMat);
  roofDeck.castShadow = true;
  roofDeck.receiveShadow = true;
  canopyPivot.add(roofDeck);

  const roofSolar = new THREE.Mesh(a.roofSolarGeo, a.solarRoofMat);
  roofSolar.position.set(0, 0.145, 0.28);
  roofSolar.receiveShadow = true;
  canopyPivot.add(roofSolar);

  // Front fascia valance with TESLA SUPERCHARGER wordmark
  const valance = new THREE.Mesh(a.valanceGeo, a.valanceMat);
  valance.position.set(0, 0.02, 2.915);
  canopyPivot.add(valance);

  // Crisp glowing crimson Tesla LED accent bar along front canopy lip
  const canopyRedLedMat = trackMat(
    new THREE.MeshBasicMaterial({ color: '#ff1e3e', toneMapped: false })
  );
  const canopyRedBar = new THREE.Mesh(a.canopyRedBarGeo, canopyRedLedMat);
  canopyRedBar.position.set(0, -0.14, 2.91);
  canopyPivot.add(canopyRedBar);

  // 3 warm-white glowing recessed soffit downlight strips underneath
  const soffitMat = trackMat(
    new THREE.MeshBasicMaterial({ color: '#ffe9be', toneMapped: false })
  );
  for (const sz of [-1.35, 0.05, 1.45]) {
    const strip = new THREE.Mesh(a.soffitStripGeo, soffitMat);
    strip.position.set(0, -0.142, sz);
    canopyPivot.add(strip);
  }

  // Sculpted snow drift ridge along the lower back slope of the canopy (keeps front PV panels clean!)
  for (let i = 0; i < 7; i++) {
    const lx = -5.6 + i * 1.86;
    const lobe = new THREE.Mesh(a.snowRidgeLobeGeo, a.snowMat);
    lobe.position.set(lx, 0.24, -2.42 + (i % 2) * 0.14);
    lobe.scale.set(1.28, 0.24 + (i % 3) * 0.05, 0.56);
    canopyPivot.add(lobe);
  }

  // Delicate translucent icicles along front & rear eaves (1 InstancedMesh)
  const icicleCoords: Array<[number, number, number, number]> = [];
  for (let i = 0; i < 15; i++) {
    const ix = -6.3 + (i / 14) * 12.6;
    const lenScale = 0.72 + ((i * 7) % 5) * 0.18;
    icicleCoords.push([ix, -0.22 - lenScale * 0.12, 2.86, lenScale]);
  }
  for (let i = 0; i < 11; i++) {
    const ix = -5.8 + (i / 10) * 11.6;
    const lenScale = 0.85 + ((i * 5) % 4) * 0.2;
    icicleCoords.push([ix, -0.22 - lenScale * 0.12, -2.86, lenScale]);
  }
  const icicleInst = new THREE.InstancedMesh(a.icicleGeo, a.icicleMat, icicleCoords.length);
  for (let i = 0; i < icicleCoords.length; i++) {
    const [ix, iy, iz, sc] = icicleCoords[i];
    _tmpMatrix.makeTranslation(ix, iy, iz);
    _tmpMatrix.scale(new THREE.Vector3(1, sc, 1));
    icicleInst.setMatrixAt(i, _tmpMatrix);
  }
  icicleInst.instanceMatrix.needsUpdate = true;
  icicleInst.computeBoundingSphere();
  canopyPivot.add(icicleInst);
  ownedInstanced.push(icicleInst);

  // --- 3. FIVE TALL SLEEK WHITE V4 SUPERCHARGER STALLS ---
  const stallLedMats: THREE.MeshBasicMaterial[] = [];
  for (let i = 0; i < stallXs.length; i++) {
    const sx = stallXs[i];
    const stallGroup = new THREE.Group();
    stallGroup.position.set(sx, 0.14, -2.25);

    const body = new THREE.Mesh(a.stallBodyGeo, a.v4WhiteMat);
    body.position.set(0, 1.19, 0);
    body.castShadow = true;
    const faceplate = new THREE.Mesh(a.stallGlassGeo, a.v4BlackGlassMat);
    faceplate.position.set(0, 1.16, 0.125);
    const badge = new THREE.Mesh(a.stallBadgeGeo, a.v4BadgeMat);
    badge.position.set(0, 2.22, 0.138);

    // Per-stall crimson vertical LED light slits + crown bar (enables wave chase during Light Show!)
    const ledMat = trackMat(new THREE.MeshBasicMaterial({ color: '#ff1e3e', toneMapped: false }));
    stallLedMats.push(ledMat);
    const slitL = new THREE.Mesh(a.stallLedSlitGeo, ledMat);
    slitL.position.set(-0.20, 1.16, 0.132);
    const slitR = new THREE.Mesh(a.stallLedSlitGeo, ledMat);
    slitR.position.set(0.20, 1.16, 0.132);
    const slitTop = new THREE.Mesh(a.stallLedTopGeo, ledMat);
    slitTop.position.set(0, 2.11, 0.132);

    // Draped black NACS cable (bay #1 / index 1 connects to the parked Cybertruck!)
    const cable = new THREE.Mesh(i === 1 ? a.connectedCableGeo : a.stallCableGeo, a.v4CableMat);

    // Mini green holiday wreath with crimson bow on every V4 stall
    const wreath = new THREE.Mesh(a.wreathGeo, a.wreathMat);
    wreath.position.set(0, 1.76, 0.165);
    const bow = new THREE.Mesh(a.bowGeo, a.crimsonMat);
    bow.position.set(0, 1.61, 0.205);

    stallGroup.add(body, faceplate, badge, slitL, slitR, slitTop, cable, wreath, bow);

    // Playful tiny Santa hat perched on the end stall!
    if (i === stallXs.length - 1) {
      const brim = new THREE.Mesh(a.santaBrimGeo, a.santaFurMat);
      brim.position.set(0.02, 2.40, 0.02);
      const hatCone = new THREE.Mesh(a.santaConeGeo, a.crimsonMat);
      hatCone.position.set(0.09, 2.60, 0.0);
      hatCone.rotation.z = -0.34;
      const pom = new THREE.Mesh(a.santaPomGeo, a.santaFurMat);
      pom.position.set(0.18, 2.81, 0.0);
      stallGroup.add(brim, hatCone, pom);
    }

    group.add(stallGroup);
  }

  // --- 4. DARK ANODIZED TESLA SUPERCHARGER ENTRY TOTEM SIGN ---
  const totemGroup = new THREE.Group();
  totemGroup.position.set(-6.55, 0.14, 2.72);
  const totemPlinth = new THREE.Mesh(a.totemPlinthGeo, a.curbMat);
  totemPlinth.position.y = 0.12;
  const totemBody = new THREE.Mesh(a.totemBodyGeo, a.graphiteMat);
  totemBody.position.y = 2.08;
  totemBody.castShadow = true;
  const totemFront = new THREE.Mesh(a.totemFaceGeo, a.totemFaceMat);
  totemFront.position.set(0, 2.08, 0.126);
  const totemBack = new THREE.Mesh(a.totemFaceGeo, a.totemFaceMat);
  totemBack.position.set(0, 2.08, -0.126);
  totemBack.rotation.y = Math.PI;
  const totemStrip = new THREE.Mesh(a.totemRedStripGeo, canopyRedLedMat);
  totemStrip.position.set(-0.46, 2.08, 0);
  const totemSnow = new THREE.Mesh(a.totemSnowGeo, a.snowMat);
  totemSnow.position.set(0, 3.98, 0);
  totemSnow.scale.set(1.06, 0.28, 0.36);
  totemGroup.add(totemPlinth, totemBody, totemFront, totemBack, totemStrip, totemSnow);
  group.add(totemGroup);

  // --- 5. MINI GLOWING CHRISTMAS TREE + HOLIDAY-WRAPPED MEGAPACK GIFT CRATE ---
  const treeX = 6.32;
  const treeZ = -0.55;
  const treeTrunk = new THREE.Mesh(a.treeTrunkGeo, a.trunkMat);
  treeTrunk.position.set(treeX, 0.42, treeZ);
  group.add(treeTrunk);
  for (let t = 0; t < a.treeTierGeos.length; t++) {
    const tier = new THREE.Mesh(a.treeTierGeos[t], a.pineMat);
    tier.position.set(treeX, 1.05 + t * 0.64, treeZ);
    tier.rotation.y = t * 0.52;
    tier.castShadow = true;
    const snowCap = new THREE.Mesh(a.treeTierGeos[t], a.snowMat);
    snowCap.position.set(treeX, 1.18 + t * 0.64, treeZ);
    snowCap.scale.set(0.84, 0.42, 0.84);
    snowCap.rotation.y = t * 0.52;
    group.add(tier, snowCap);
  }
  const treeStar = new THREE.Mesh(a.treeStarGeo, a.goldMat);
  treeStar.position.set(treeX, 2.86, treeZ);
  group.add(treeStar);

  // Holiday-wrapped Tesla Megapack battery gift crate on the right apron
  const megaX = 6.32;
  const megaZ = 1.62;
  const megapack = new THREE.Mesh(a.megapackGeo, a.megapackMat);
  megapack.position.set(megaX, 0.83, megaZ);
  megapack.castShadow = true;
  const megaRibH = new THREE.Mesh(a.megaRibbonHGeo, a.crimsonMat);
  megaRibH.position.set(megaX, 0.83, megaZ);
  const megaRibV = new THREE.Mesh(a.megaRibbonVGeo, a.crimsonMat);
  megaRibV.position.set(megaX, 0.83, megaZ);
  const megaBow = new THREE.Mesh(a.treeStarGeo, a.goldMat);
  megaBow.position.set(megaX, 1.62, megaZ);
  megaBow.scale.set(1.25, 0.85, 1.25);
  group.add(megapack, megaRibH, megaRibV, megaBow);

  // --- 6. PARKED CHARGING TESLA (LIGHTWEIGHT SCULPTED CYBERTRUCK IN BAY #2) ---
  const parkedCar = new THREE.Group();
  parkedCar.position.set(-2.2, 0.14, 0.42);
  const cyberHull = new THREE.Mesh(a.cyberHullGeo, a.cyberSteelMat);
  cyberHull.castShadow = true;
  const cyberGlass = new THREE.Mesh(a.cyberGlassGeo, a.cyberGlassMat);
  const cyberDrl = new THREE.Mesh(a.cyberDrlGeo, a.cyberDrlMat);
  cyberDrl.position.set(0, 0.96, 2.46);
  const cyberTail = new THREE.Mesh(a.cyberTailGeo, a.cyberTailMat);
  cyberTail.position.set(0, 1.23, -2.44);
  parkedCar.add(cyberHull, cyberGlass, cyberDrl, cyberTail);

  for (const wz of [-1.52, 1.52]) {
    for (const side of [-1, 1]) {
      const arch = new THREE.Mesh(a.cyberArchGeo, a.cyberTrimMat);
      arch.position.set(side * 0.94, 0.92, wz);
      const wheel = new THREE.Mesh(a.cyberWheelGeo, a.cyberTrimMat);
      wheel.position.set(side * 0.90, 0.42, wz);
      parkedCar.add(arch, wheel);
    }
  }

  // Pulsing emerald-green charge-port LED glow on rear-left fender (facing stall #2 cable)
  const chargePortMat = trackMat(
    new THREE.MeshBasicMaterial({ color: '#18ff7a', toneMapped: false })
  );
  const chargePortBar = new THREE.Mesh(a.chargePortBarGeo, chargePortMat);
  chargePortBar.position.set(0.96, 0.94, -1.48);
  parkedCar.add(chargePortBar);

  const portHaloMat = trackMat(
    new THREE.SpriteMaterial({
      map: getSoftGlowTexture(),
      color: '#22ff88',
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  const portHalo = new THREE.Sprite(portHaloMat);
  portHalo.position.set(1.06, 0.94, -1.48);
  portHalo.scale.set(1.35, 1.35, 1);
  parkedCar.add(portHalo);
  group.add(parkedCar);

  // --- 7. WARM-WHITE FAIRY-LIGHT BULBS ALONG CANOPY EAVES + MINI TREE (1 InstancedMesh) ---
  const bulbPoints: Array<{ x: number; y: number; z: number; isTree: boolean }> = [];
  // Front canopy eave (world-space coordinates matching pitched canopyPivot at y=4.40, z=-0.35, rotX=-0.07)
  const cosP = Math.cos(-0.07);
  const sinP = Math.sin(-0.07);
  const pushCanopyBulb = (lx: number, ly: number, lz: number) => {
    const wy = 4.40 + ly * cosP - lz * sinP;
    const wz = -0.35 + ly * sinP + lz * cosP;
    bulbPoints.push({ x: lx, y: wy, z: wz, isTree: false });
  };
  for (let i = 0; i < 24; i++) {
    const bx = -6.6 + (i / 23) * 13.2;
    pushCanopyBulb(bx, -0.18, 2.86);
  }
  for (const side of [-1, 1]) {
    for (let i = 1; i <= 8; i++) {
      const bz = 2.86 - (i / 9) * 5.72;
      pushCanopyBulb(side * 6.76, -0.18, bz);
    }
  }
  // Mini Christmas tree fairy ornaments batched into the same InstancedMesh!
  for (let i = 0; i < 12; i++) {
    const f = i / 12;
    const ang = i * 1.55;
    const rad = 0.72 * (1 - f * 0.70);
    bulbPoints.push({
      x: treeX + Math.cos(ang) * rad,
      y: 0.92 + f * 1.65,
      z: treeZ + Math.sin(ang) * rad,
      isTree: true,
    });
  }

  const fairyMat = trackMat(new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }));
  const fairyInst = new THREE.InstancedMesh(a.fairyBulbGeo, fairyMat, bulbPoints.length);
  for (let i = 0; i < bulbPoints.length; i++) {
    const b = bulbPoints[i];
    _tmpMatrix.makeTranslation(b.x, b.y, b.z);
    fairyInst.setMatrixAt(i, _tmpMatrix);
    _tmpColor.setRGB(1.25, 0.98, 0.56);
    fairyInst.setColorAt(i, _tmpColor);
  }
  fairyInst.instanceMatrix.needsUpdate = true;
  if (fairyInst.instanceColor) fairyInst.instanceColor.needsUpdate = true;
  fairyInst.computeBoundingSphere();
  group.add(fairyInst);
  ownedInstanced.push(fairyInst);

  const bulbCount = bulbPoints.length;

  return {
    group,
    update(time: number, lightShow = 0, daylight = 0): void {
      const nightFactor = Math.max(0.22, 1 - daylight * 0.72);
      const show = Math.max(0, lightShow);

      // 1. V4 Stall vertical crimson LEDs (calm breathing at idle, festive wave chase in Light Show!)
      for (let i = 0; i < stallLedMats.length; i++) {
        if (show > 0.04) {
          const wave = 0.55 + 0.45 * Math.sin(time * 9.5 - i * 1.15);
          const palIdx = (Math.floor(time * 3.8) + i) % _scLightShowPalette.length;
          _tmpColor.setRGB(1.0, 0.12, 0.24).lerp(_scLightShowPalette[palIdx], Math.min(0.75, show * 0.75));
          const boost = (0.75 + wave * 0.95) * (0.65 + nightFactor * 0.65);
          stallLedMats[i].color.copy(_tmpColor).multiplyScalar(boost);
        } else {
          const pulse = 0.78 + 0.22 * Math.sin(time * 2.2 + i * 0.55);
          const scale = pulse * (0.62 + nightFactor * 0.62);
          stallLedMats[i].color.setRGB(1.05 * scale, 0.12 * scale, 0.24 * scale);
        }
      }

      // 2. Front canopy crimson LED bar & warm soffit strips
      const canopyPulse = show > 0.04
        ? 0.9 + 0.65 * Math.sin(time * 11.0)
        : 0.88 + 0.12 * Math.sin(time * 1.8);
      const cScale = canopyPulse * (0.65 + nightFactor * 0.60);
      canopyRedLedMat.color.setRGB(1.05 * cScale, 0.12 * cScale, 0.24 * cScale);

      const soffitScale = (0.52 + nightFactor * 0.68) * (1 + show * 0.22 * Math.sin(time * 7.5));
      soffitMat.color.setRGB(1.0 * soffitScale, 0.91 * soffitScale, 0.74 * soffitScale);

      // 3. Additive ground-glow decals modulated cleanly by daylight & Light Show
      goldGlowMat.opacity = (0.08 + nightFactor * 0.36) * (1 + show * 0.25);
      redGlowMat.opacity = (0.05 + nightFactor * 0.20) * (1 + show * (0.45 + 0.35 * Math.sin(time * 8.0)));

      // 4. Parked Cybertruck pulsing emerald-green charge-port LED glow
      const portWave = 0.55 + 0.45 * Math.sin(time * 3.2);
      const portScale = (0.65 + portWave * 0.85) * (0.68 + nightFactor * 0.52);
      chargePortMat.color.setRGB(0.12 * portScale, 1.05 * portScale, 0.48 * portScale);
      portHaloMat.opacity = (0.28 + portWave * 0.48) * (0.35 + nightFactor * 0.75);
      const haloSc = 1.05 + portWave * 0.45;
      portHalo.scale.set(haloSc, haloSc, 1);

      // 5. Eave & mini-tree fairy lights twinkle + Light Show wave
      const bulbDayScale = 0.42 + nightFactor * 0.78;
      for (let idx = 0; idx < bulbCount; idx++) {
        const b = bulbPoints[idx];
        const twinkle = 0.72 + 0.28 * Math.sin(time * 4.4 + idx * 0.68);
        if (show > 0.04) {
          const chase = 0.55 + 0.75 * Math.max(0, Math.sin(time * 10.5 - idx * 0.42));
          const col = _scLightShowPalette[(idx + Math.floor(time * 4.2)) % _scLightShowPalette.length];
          _tmpColor.copy(col).multiplyScalar(bulbDayScale * (0.85 + show * chase));
        } else if (b.isTree && idx % 3 === 0) {
          _tmpColor.setRGB(1.25 * twinkle * bulbDayScale, 0.22 * twinkle * bulbDayScale, 0.30 * twinkle * bulbDayScale);
        } else {
          _tmpColor.setRGB(1.26 * twinkle * bulbDayScale, 0.99 * twinkle * bulbDayScale, 0.58 * twinkle * bulbDayScale);
        }
        fairyInst.setColorAt(idx, _tmpColor);
      }
      if (fairyInst.instanceColor) fairyInst.instanceColor.needsUpdate = true;

      treeStar.rotation.y = time * 1.4;
    },
    dispose(): void {
      for (const inst of ownedInstanced) inst.dispose();
      for (const mat of ownedMaterials) mat.dispose();
      ownedInstanced.length = 0;
      ownedMaterials.length = 0;
    },
  };
}
