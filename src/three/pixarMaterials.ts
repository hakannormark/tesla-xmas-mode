import * as THREE from 'three';

/**
 * Shared procedural PBR textures, custom shaders, and Pixar-grade lighting assets.
 * Everything is 100% self-contained (zero external asset URLs that could 404 in a car).
 */

let cachedGlowTex: THREE.CanvasTexture | null = null;
let cachedSnowflakeTex: THREE.CanvasTexture | null = null;
let cachedStarSpriteTex: THREE.CanvasTexture | null = null;
let cachedAnamorphicFlareTex: THREE.CanvasTexture | null = null;

export function getAnamorphicFlareTexture(): THREE.CanvasTexture {
  if (cachedAnamorphicFlareTex) return cachedAnamorphicFlareTex;
  const w = 256;
  const h = 32;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const hGrad = ctx.createLinearGradient(0, 0, w, 0);
  hGrad.addColorStop(0, 'rgba(255, 224, 150, 0)');
  hGrad.addColorStop(0.28, 'rgba(255, 224, 150, 0.25)');
  hGrad.addColorStop(0.5, 'rgba(255, 248, 224, 0.92)');
  hGrad.addColorStop(0.72, 'rgba(255, 224, 150, 0.25)');
  hGrad.addColorStop(1, 'rgba(255, 224, 150, 0)');

  const vGrad = ctx.createLinearGradient(0, 0, 0, h);
  vGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  vGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
  vGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = hGrad;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, w, h);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedAnamorphicFlareTex = tex;
  return tex;
}

export function getSoftGlowTexture(): THREE.CanvasTexture {
  if (cachedGlowTex) return cachedGlowTex;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.22, 'rgba(255, 248, 224, 0.85)');
  grad.addColorStop(0.55, 'rgba(255, 224, 155, 0.28)');
  grad.addColorStop(1, 'rgba(255, 200, 120, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedGlowTex = tex;
  return tex;
}

export function getSnowflakeTexture(): THREE.CanvasTexture {
  if (cachedSnowflakeTex) return cachedSnowflakeTex;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const c = size / 2;

  const halo = ctx.createRadialGradient(c, c, 2, c, c, c);
  halo.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
  halo.addColorStop(0.36, 'rgba(235, 246, 255, 0.66)');
  halo.addColorStop(0.76, 'rgba(210, 232, 255, 0.16)');
  halo.addColorStop(1, 'rgba(210, 232, 255, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.translate(c, c);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -28);
    ctx.moveTo(0, -14);
    ctx.lineTo(7, -21);
    ctx.moveTo(0, -14);
    ctx.lineTo(-7, -21);
    ctx.stroke();
  }
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedSnowflakeTex = tex;
  return tex;
}

export function getStarSpriteTexture(): THREE.CanvasTexture {
  if (cachedStarSpriteTex) return cachedStarSpriteTex;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const c = size / 2;

  const halo = ctx.createRadialGradient(c, c, 1, c, c, c);
  halo.addColorStop(0, 'rgba(255, 252, 230, 1)');
  halo.addColorStop(0.25, 'rgba(255, 224, 130, 0.75)');
  halo.addColorStop(0.6, 'rgba(255, 190, 80, 0.2)');
  halo.addColorStop(1, 'rgba(255, 180, 70, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = '#fff9df';
  ctx.beginPath();
  ctx.ellipse(c, c, c * 0.88, 4.5, 0, 0, Math.PI * 2);
  ctx.ellipse(c, c, 4.5, c * 0.88, 0, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedStarSpriteTex = tex;
  return tex;
}

export function createSnowTextures(): { bumpMap: THREE.CanvasTexture; roughnessMap: THREE.CanvasTexture } {
  const size = 256;
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d')!;

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, size, size);
  rCtx.fillStyle = '#d4d4d4';
  rCtx.fillRect(0, 0, size, size);

  for (let i = 0; i < 65; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const rad = 18 + Math.random() * 44;
    const g = bCtx.createRadialGradient(x, y, 2, x, y, rad);
    const bright = Math.random() > 0.5 ? 215 : 55;
    g.addColorStop(0, `rgba(${bright},${bright},${bright},0.22)`);
    g.addColorStop(1, 'rgba(128,128,128,0)');
    bCtx.fillStyle = g;
    bCtx.beginPath();
    bCtx.arc(x, y, rad, 0, Math.PI * 2);
    bCtx.fill();
  }

  for (let i = 0; i < 520; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    rCtx.fillStyle = Math.random() > 0.35 ? '#1c1c1c' : '#555555';
    rCtx.fillRect(x, y, 2, 2);
  }

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(16, 16);

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(22, 22);

  return { bumpMap, roughnessMap };
}

export function createSparklingSnowMaterial(tint = '#94b0d8'): THREE.MeshPhysicalMaterial {
  const { bumpMap, roughnessMap } = createSnowTextures();
  return new THREE.MeshPhysicalMaterial({
    color: tint,
    roughness: 0.82,
    metalness: 0.02,
    clearcoat: 0.14,
    clearcoatRoughness: 0.48,
    bumpMap,
    bumpScale: 0.16,
    roughnessMap,
    sheen: 0.2,
    sheenColor: new THREE.Color('#9ec0ee'),
    sheenRoughness: 0.7,
  });
}

export function createTimberWallTexture(baseHex = '#7c1a28'): THREE.CanvasTexture {
  const w = 256;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, w, h);

  const rows = 8;
  const rowH = h / rows;
  for (let i = 0; i < rows; i++) {
    const y = i * rowH;
    const g = ctx.createLinearGradient(0, y, 0, y + rowH);
    g.addColorStop(0, 'rgba(255, 220, 190, 0.14)');
    g.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    g.addColorStop(1, 'rgba(20, 4, 8, 0.38)');
    ctx.fillStyle = g;
    ctx.fillRect(0, y, w, rowH);

    ctx.strokeStyle = 'rgba(255, 235, 210, 0.07)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y + rowH * 0.45);
    ctx.bezierCurveTo(w * 0.3, y + rowH * 0.3, w * 0.7, y + rowH * 0.65, w, y + rowH * 0.48);
    ctx.stroke();
  }

  ctx.fillStyle = '#efe6d8';
  ctx.fillRect(0, 0, 14, h);
  ctx.fillRect(w - 14, 0, 14, h);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createWarmWindowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(size * 0.5, size * 0.62, 6, size * 0.5, size * 0.5, size * 0.72);
  grad.addColorStop(0, '#fff7cf');
  grad.addColorStop(0.42, '#ffbe55');
  grad.addColorStop(0.82, '#e87a24');
  grad.addColorStop(1, '#7c2b12');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = 'rgba(84, 30, 12, 0.32)';
  ctx.beginPath();
  ctx.moveTo(size * 0.68, size * 0.34);
  ctx.lineTo(size * 0.52, size * 0.88);
  ctx.lineTo(size * 0.84, size * 0.88);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#381512';
  ctx.lineWidth = 9;
  ctx.strokeRect(4, 4, size - 8, size - 8);
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(size * 0.5, 0);
  ctx.lineTo(size * 0.5, size);
  ctx.moveTo(0, size * 0.5);
  ctx.lineTo(size, size * 0.5);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createCocaColaTrailerTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 192;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#8d081e');
  bg.addColorStop(0.5, '#d91234');
  bg.addColorStop(1, '#780618');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Classic holiday swirling white & gold dynamic ribbons
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(-10, h * 0.76);
  ctx.bezierCurveTo(w * 0.25, h * 0.2, w * 0.68, h * 1.05, w + 10, h * 0.26);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 224, 140, 0.85)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-10, h * 0.84);
  ctx.bezierCurveTo(w * 0.28, h * 0.34, w * 0.65, h * 1.1, w + 10, h * 0.36);
  ctx.stroke();

  for (let i = 0; i < 24; i++) {
    const sx = (i * 53) % w;
    const sy = ((i * 37) % (h - 32)) + 16;
    ctx.fillStyle = 'rgba(255, 244, 200, 0.6)';
    ctx.beginPath();
    ctx.arc(sx, sy, 2.2 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#fff9ee';
  ctx.shadowColor = 'rgba(255, 210, 115, 0.9)';
  ctx.shadowBlur = 16;
  ctx.font = 'italic 700 46px Georgia, "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Coca-Cola', w * 0.5, h * 0.41);

  ctx.shadowBlur = 8;
  ctx.fillStyle = '#ffe29c';
  ctx.font = '700 17px Inter, sans-serif';
  ctx.fillText('✦  HOLIDAY EXPRESS · JULKARAVAN  ✦', w * 0.5, h * 0.74);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function drawTeslaCrestPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = '#e31937';
  // Signature curved top bar
  ctx.beginPath();
  ctx.moveTo(-size * 0.68, -size * 0.28);
  ctx.quadraticCurveTo(0, -size * 0.46, size * 0.68, -size * 0.28);
  ctx.lineTo(size * 0.56, -size * 0.16);
  ctx.quadraticCurveTo(0, -size * 0.31, -size * 0.56, -size * 0.16);
  ctx.closePath();
  ctx.fill();
  // T body & tapered stem
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

export function createTeslaTrailerTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 192;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#a80c24');
  bg.addColorStop(0.5, '#dc1230');
  bg.addColorStop(1, '#84081a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Sleek pearlescent winter-white top & bottom holiday stripe + golden trim
  ctx.fillStyle = 'rgba(244, 248, 255, 0.94)';
  ctx.fillRect(0, 0, w, 12);
  ctx.fillRect(0, h - 12, w, 12);
  ctx.strokeStyle = '#ffd878';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 14, w - 20, h - 28);

  // Sparkling snowflakes
  for (let i = 0; i < 22; i++) {
    const sx = (i * 47 + 22) % w;
    const sy = ((i * 31 + 19) % (h - 48)) + 24;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 246, 210, 0.72)' : 'rgba(255, 255, 255, 0.62)';
    ctx.beginPath();
    ctx.arc(sx, sy, 2.0 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }

  // Glowing frosted white rounded Tesla crest medallion on left
  const bx = 38;
  const by = 38;
  const bw = 114;
  const bh = 102;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 20);
  ctx.fill();
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 3;
  ctx.stroke();

  drawTeslaCrestPath(ctx, bx + bw * 0.5, by + bh * 0.52, 46);

  ctx.fillStyle = '#fff9eb';
  ctx.shadowColor = 'rgba(255, 218, 125, 0.75)';
  ctx.shadowBlur = 14;
  ctx.font = '700 42px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('T E S L A', w * 0.64, h * 0.41);

  ctx.shadowBlur = 6;
  ctx.fillStyle = '#ffe099';
  ctx.font = '600 16px Inter, sans-serif';
  ctx.fillText('✦  ELECTRIC HOLIDAY EXPRESS · GOD JUL  ✦', w * 0.64, h * 0.72);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createTruckRearDoorTexture(livery: 'coca_cola' | 'tesla'): THREE.CanvasTexture {
  const s = 256;
  const canvas = document.createElement('canvas');
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, s);
  grad.addColorStop(0, livery === 'tesla' ? '#dc1230' : '#c40d28');
  grad.addColorStop(1, '#7a0616');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, s, s);

  ctx.strokeStyle = '#ffe08a';
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, s - 20, s - 20);

  if (livery === 'tesla') {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(58, 36, 140, 104, 20);
    ctx.fill();
    drawTeslaCrestPath(ctx, 128, 90, 48);
    ctx.fillStyle = '#fff6de';
    ctx.font = '700 26px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TESLA · GOD JUL!', 128, 186);
  } else {
    ctx.fillStyle = '#fff8ee';
    ctx.font = 'italic 700 44px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Coca-Cola', 128, 92);
    ctx.fillStyle = '#ffe29c';
    ctx.font = '700 26px "Cinzel", Georgia, serif';
    ctx.fillText('GOD JUL!', 128, 172);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createTrailerBillboardTexture(): THREE.CanvasTexture {
  return createCocaColaTrailerTexture();
}

export function createMoonSurfaceTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const g = ctx.createRadialGradient(size * 0.38, size * 0.38, 12, size * 0.5, size * 0.5, size * 0.55);
  g.addColorStop(0, '#fffdf2');
  g.addColorStop(0.65, '#fae9c4');
  g.addColorStop(1, '#dfc08b');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  const craters = [
    [0.3, 0.35, 0.14],
    [0.62, 0.28, 0.1],
    [0.54, 0.62, 0.16],
    [0.26, 0.68, 0.08],
    [0.74, 0.54, 0.09],
    [0.44, 0.22, 0.07],
  ];
  for (const [cx, cy, cr] of craters) {
    const cg = ctx.createRadialGradient(cx * size, cy * size, 2, cx * size, cy * size, cr * size);
    cg.addColorStop(0, 'rgba(170, 140, 96, 0.28)');
    cg.addColorStop(0.75, 'rgba(182, 152, 108, 0.14)');
    cg.addColorStop(1, 'rgba(255, 240, 200, 0)');
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(cx * size, cy * size, cr * size, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

let cachedClapboard: { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null = null;
let cachedPlasterBrick: { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null = null;
let cachedShingleRoof: { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null = null;
let cachedGigaWall: THREE.CanvasTexture | null = null;
let cachedGigaAtrium: THREE.CanvasTexture | null = null;
let cachedGigaSign: THREE.CanvasTexture | null = null;
let cachedGigaSolarRoof: THREE.CanvasTexture | null = null;
let cachedMarsTex: THREE.CanvasTexture | null = null;

function pseudoRand(seed: number): number {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Crisp Nordic horizontal beveled clapboard siding (neutral grayscale/warm base tinted by material.color) */
export function createClapboardTextures(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  if (cachedClapboard) return cachedClapboard;
  const s = 256;
  const mapC = document.createElement('canvas');
  mapC.width = mapC.height = s;
  const mCtx = mapC.getContext('2d')!;

  const bumpC = document.createElement('canvas');
  bumpC.width = bumpC.height = s;
  const bCtx = bumpC.getContext('2d')!;

  const planks = 10;
  const ph = s / planks;
  for (let i = 0; i < planks; i++) {
    const y = i * ph;
    const tone = 218 + Math.round((pseudoRand(i + 1) - 0.5) * 26);
    const g = mCtx.createLinearGradient(0, y, 0, y + ph);
    g.addColorStop(0, `rgb(${Math.min(255, tone + 16)},${Math.min(255, tone + 14)},${Math.min(255, tone + 12)})`);
    g.addColorStop(0.75, `rgb(${tone},${tone - 3},${tone - 6})`);
    g.addColorStop(0.92, `rgb(${tone - 28},${tone - 30},${tone - 32})`);
    g.addColorStop(1, 'rgb(110,104,100)');
    mCtx.fillStyle = g;
    mCtx.fillRect(0, y, s, ph);

    const bg = bCtx.createLinearGradient(0, y, 0, y + ph);
    bg.addColorStop(0, '#c8c8c8');
    bg.addColorStop(0.84, '#f0f0f0');
    bg.addColorStop(0.93, '#404040');
    bg.addColorStop(1, '#262626');
    bCtx.fillStyle = bg;
    bCtx.fillRect(0, y, s, ph);

    // Subtle woodgrain lines
    mCtx.strokeStyle = 'rgba(70, 50, 40, 0.10)';
    mCtx.lineWidth = 1;
    for (let k = 0; k < 3; k++) {
      const gy = y + (0.22 + k * 0.24) * ph;
      mCtx.beginPath();
      mCtx.moveTo(0, gy);
      mCtx.bezierCurveTo(s * 0.3, gy + (pseudoRand(i * 9 + k) - 0.5) * 4, s * 0.7, gy - (pseudoRand(i * 13 + k) - 0.5) * 4, s, gy);
      mCtx.stroke();
    }
    const jointX = ((i * 89 + 44) % (s - 40)) + 20;
    mCtx.fillStyle = 'rgba(60,48,42,0.22)';
    mCtx.fillRect(jointX, y, 2, ph);
    bCtx.fillStyle = '#383838';
    bCtx.fillRect(jointX, y, 2, ph);
  }

  const map = new THREE.CanvasTexture(mapC);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  const bumpMap = new THREE.CanvasTexture(bumpC);
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  cachedClapboard = { map, bumpMap };
  return cachedClapboard;
}

/** Realistic European stucco/brick masonry texture with weathered variation & bump map */
export function createPlasterBrickTextures(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  if (cachedPlasterBrick) return cachedPlasterBrick;
  const s = 256;
  const mapC = document.createElement('canvas');
  mapC.width = mapC.height = s;
  const mCtx = mapC.getContext('2d')!;

  const bumpC = document.createElement('canvas');
  bumpC.width = bumpC.height = s;
  const bCtx = bumpC.getContext('2d')!;

  mCtx.fillStyle = '#dad4cc';
  mCtx.fillRect(0, 0, s, s);
  bCtx.fillStyle = '#606060';
  bCtx.fillRect(0, 0, s, s);

  const rows = 16;
  const cols = 8;
  const rh = s / rows;
  const cw = s / cols;
  for (let r = 0; r < rows; r++) {
    const offset = (r % 2) * (cw * 0.5);
    for (let c = -1; c <= cols; c++) {
      const bx = c * cw + offset + 1.5;
      const by = r * rh + 1.5;
      const v = 205 + Math.round((pseudoRand(r * 31 + c * 17) - 0.5) * 42);
      mCtx.fillStyle = `rgb(${v},${v - 5},${v - 9})`;
      mCtx.fillRect(bx, by, cw - 3, rh - 3);
      const bv = 175 + Math.round((pseudoRand(r * 19 + c * 23) - 0.5) * 30);
      bCtx.fillStyle = `rgb(${bv},${bv},${bv})`;
      bCtx.fillRect(bx, by, cw - 3, rh - 3);
    }
  }
  for (let i = 0; i < 420; i++) {
    const x = pseudoRand(i * 3.1) * s;
    const y = pseudoRand(i * 7.3) * s;
    mCtx.fillStyle = i % 2 === 0 ? 'rgba(255,252,246,0.16)' : 'rgba(90,82,78,0.10)';
    mCtx.fillRect(x, y, 4, 3);
  }

  const map = new THREE.CanvasTexture(mapC);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  const bumpMap = new THREE.CanvasTexture(bumpC);
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  cachedPlasterBrick = { map, bumpMap };
  return cachedPlasterBrick;
}

/** Layered Nordic slate/shingle roof tiles with snow-dusted pockets & ridge bump */
export function createShingleRoofTextures(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  if (cachedShingleRoof) return cachedShingleRoof;
  const s = 256;
  const mapC = document.createElement('canvas');
  mapC.width = mapC.height = s;
  const mCtx = mapC.getContext('2d')!;

  const bumpC = document.createElement('canvas');
  bumpC.width = bumpC.height = s;
  const bCtx = bumpC.getContext('2d')!;

  mCtx.fillStyle = '#6d7b92';
  mCtx.fillRect(0, 0, s, s);
  bCtx.fillStyle = '#646464';
  bCtx.fillRect(0, 0, s, s);

  const rows = 10;
  const cols = 8;
  const rh = s / rows;
  const cw = s / cols;
  for (let r = 0; r < rows; r++) {
    const off = (r % 2) * (cw * 0.5);
    for (let c = -1; c <= cols; c++) {
      const x = c * cw + off;
      const y = r * rh;
      const baseL = 88 + Math.round((pseudoRand(r * 29 + c * 11) - 0.5) * 28);
      mCtx.fillStyle = `rgb(${baseL},${baseL + 8},${baseL + 22})`;
      mCtx.fillRect(x + 1, y + 1, cw - 2, rh - 2);
      mCtx.fillStyle = 'rgba(18, 25, 40, 0.45)';
      mCtx.fillRect(x, y + rh - 3, cw, 3);

      const snowChance = pseudoRand(r * 41 + c * 13);
      if (snowChance > 0.34) {
        const sg = mCtx.createLinearGradient(0, y, 0, y + rh * 0.72);
        sg.addColorStop(0, 'rgba(240, 246, 255, 0.92)');
        sg.addColorStop(0.55, 'rgba(218, 232, 250, 0.65)');
        sg.addColorStop(1, 'rgba(200, 220, 246, 0.0)');
        mCtx.fillStyle = sg;
        mCtx.fillRect(x + 1, y + 1, cw - 2, rh * 0.72);
      }

      const bg = bCtx.createLinearGradient(0, y, 0, y + rh);
      bg.addColorStop(0, '#787878');
      bg.addColorStop(0.82, '#ebebeb');
      bg.addColorStop(1, '#262626');
      bCtx.fillStyle = bg;
      bCtx.fillRect(x + 1, y, cw - 2, rh);
    }
  }

  const map = new THREE.CanvasTexture(mapC);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  const bumpMap = new THREE.CanvasTexture(bumpC);
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  cachedShingleRoof = { map, bumpMap };
  return cachedShingleRoof;
}

/** Authentic Giga Texas exterior: clean minimalist windowless white precast concrete & vertical architectural panels */
export function createGigafactoryWallTexture(): THREE.CanvasTexture {
  if (cachedGigaWall) return cachedGigaWall;
  const w = 512;
  const h = 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  ctx.fillStyle = '#e7edf6';
  ctx.fillRect(0, 0, w, h);

  // Subtle vertical precast architectural panels (seamless X and Y wrapping across terrain elevations)
  const colW = 64;
  for (let x = 0; x < w; x += colW) {
    const shade = 228 + Math.round((pseudoRand(x * 0.37 + 3) - 0.5) * 14);
    const pg = ctx.createLinearGradient(x, 0, x + colW, 0);
    pg.addColorStop(0, `rgb(${shade + 8},${shade + 11},${shade + 15})`);
    pg.addColorStop(0.08, `rgb(${shade},${shade + 4},${shade + 9})`);
    pg.addColorStop(0.92, `rgb(${shade - 6},${shade - 2},${shade + 4})`);
    pg.addColorStop(1, `rgb(${shade - 24},${shade - 19},${shade - 12})`);
    ctx.fillStyle = pg;
    ctx.fillRect(x, 0, colW, h);

    // Crisp panel joint seam & inner flute highlight
    ctx.fillStyle = 'rgba(72, 92, 122, 0.24)';
    ctx.fillRect(x, 0, 2, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.34)';
    ctx.fillRect(x + 2, 0, 2, h);
  }

  // Two delicate horizontal concrete reveal grooves
  for (const ry of [0, 128]) {
    ctx.fillStyle = 'rgba(76, 94, 124, 0.22)';
    ctx.fillRect(0, ry, w, 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.fillRect(0, ry + 2, w, 2);
  }

  // Subtle matte precast concrete micro-variation
  for (let i = 0; i < 320; i++) {
    const gx = pseudoRand(i * 5.7) * w;
    const gy = pseudoRand(i * 9.3) * h;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(92,110,138,0.06)';
    ctx.fillRect(gx, gy, 5, 3);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedGigaWall = tex;
  return tex;
}

/** Giga Texas West Main Entrance smoked architectural curtain-wall atrium with subtle interior holiday lobby tree glow */
export function createGigaAtriumGlassTexture(): THREE.CanvasTexture {
  if (cachedGigaAtrium) return cachedGigaAtrium;
  const w = 512;
  const h = 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  const glassGrad = ctx.createLinearGradient(0, 0, 0, h);
  glassGrad.addColorStop(0, '#0a1628');
  glassGrad.addColorStop(0.45, '#132847');
  glassGrad.addColorStop(1, '#091423');
  ctx.fillStyle = glassGrad;
  ctx.fillRect(0, 0, w, h);

  // Subtle futuristic aurora / winter sky diagonal reflection across curtain glass
  ctx.fillStyle = 'rgba(130, 198, 255, 0.11)';
  ctx.beginPath();
  ctx.moveTo(w * 0.08, 0);
  ctx.lineTo(w * 0.34, 0);
  ctx.lineTo(w * 0.18, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(180, 232, 255, 0.08)';
  ctx.beginPath();
  ctx.moveTo(w * 0.56, 0);
  ctx.lineTo(w * 0.68, 0);
  ctx.lineTo(w * 0.50, h);
  ctx.lineTo(w * 0.38, h);
  ctx.closePath();
  ctx.fill();

  // Warm understated showroom holiday tree silhouette & festive glow inside atrium floor
  const lobbyGlow = ctx.createRadialGradient(w * 0.5, h * 0.82, 8, w * 0.5, h * 0.78, 128);
  lobbyGlow.addColorStop(0, 'rgba(255, 224, 158, 0.42)');
  lobbyGlow.addColorStop(0.55, 'rgba(227, 45, 72, 0.16)');
  lobbyGlow.addColorStop(1, 'rgba(10, 22, 40, 0)');
  ctx.fillStyle = lobbyGlow;
  ctx.fillRect(w * 0.22, h * 0.28, w * 0.56, h * 0.72);

  ctx.fillStyle = 'rgba(26, 76, 56, 0.45)';
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.42);
  ctx.lineTo(w * 0.57, h * 0.94);
  ctx.lineTo(w * 0.43, h * 0.94);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 226, 145, 0.65)';
  for (let d = 0; d < 7; d++) {
    ctx.beginPath();
    ctx.arc(w * 0.5 + ((d % 3) - 1) * 14, h * (0.56 + d * 0.05), 3.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sleek dark anodized structural mullions (4 columns x 3 rows)
  ctx.fillStyle = '#070c14';
  const cols = 4;
  const rows = 3;
  for (let i = 0; i <= cols; i++) {
    const mx = Math.round((i / cols) * (w - 6));
    ctx.fillRect(mx, 0, 6, h);
  }
  for (let j = 0; j <= rows; j++) {
    const my = Math.round((j / rows) * (h - 5));
    ctx.fillRect(0, my, w, 5);
  }
  ctx.strokeStyle = 'rgba(170, 204, 240, 0.22)';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, w - 4, h - 4);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedGigaAtrium = tex;
  return tex;
}

/** Clean architectural Giga Texas TESLA signage with Tesla crest & glowing red trim */
export function createGigaSignTexture(): THREE.CanvasTexture {
  if (cachedGigaSign) return cachedGigaSign;
  const w = 512;
  const h = 112;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#0c1320');
  bg.addColorStop(1, '#182236');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'rgba(220, 232, 248, 0.45)';
  ctx.fillRect(0, 0, w, 4);
  ctx.fillStyle = '#e31937';
  ctx.fillRect(0, h - 8, w, 8);

  drawTeslaCrestPath(ctx, 74, 52, 34);

  ctx.fillStyle = '#f6f9ff';
  ctx.font = '700 48px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('T E S L A', w * 0.59, h * 0.49);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedGigaSign = tex;
  return tex;
}

/** Giga Texas iconic photovoltaic solar array roof with bright frosted negative-space "TESLA" lettering */
export function createGigaSolarRoofTexture(): THREE.CanvasTexture {
  if (cachedGigaSolarRoof) return cachedGigaSolarRoof;
  const w = 512;
  const h = 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  // Clean winter white TPO roof perimeter
  ctx.fillStyle = '#eef4fc';
  ctx.fillRect(0, 0, w, h);

  const stepX = 16;
  const stepY = 16;
  for (let y = 16; y < h - 16; y += stepY) {
    for (let x = 16; x < w - 16; x += stepX) {
      ctx.fillStyle = ((x + y) / 16) % 2 === 0 ? '#0f2042' : '#162d58';
      ctx.fillRect(x + 1, y + 1, stepX - 2, stepY - 2);
      ctx.fillStyle = 'rgba(155, 202, 255, 0.14)';
      ctx.fillRect(x + 2, y + 2, stepX - 4, 2);
    }
  }

  // Crisp negative-space white TESLA cutout on roof solar array
  ctx.fillStyle = '#f7faff';
  ctx.fillRect(58, 72, w - 116, 112);
  ctx.strokeStyle = '#d4deec';
  ctx.lineWidth = 3;
  ctx.strokeRect(58, 72, w - 116, 112);

  ctx.fillStyle = '#142648';
  ctx.font = '900 72px Inter, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('T E S L A', w * 0.5, h * 0.51);

  // Subtle festive crimson & gold corner markers on the rooftop TPO border
  for (const [cx, cy] of [[10, 10], [w - 18, 10], [10, h - 18], [w - 18, h - 18]]) {
    ctx.fillStyle = '#d81834';
    ctx.fillRect(cx, cy, 8, 8);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(cx + 2, cy + 2, 4, 4);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedGigaSolarRoof = tex;
  return tex;
}

/** Red Planet Mars equatorial map for festive SpaceX sky easter egg */
export function createMarsSurfaceTexture(): THREE.CanvasTexture {
  if (cachedMarsTex) return cachedMarsTex;
  const w = 256;
  const h = 128;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;

  const base = ctx.createLinearGradient(0, 0, 0, h);
  base.addColorStop(0, '#f4ece8');
  base.addColorStop(0.14, '#d96e3c');
  base.addColorStop(0.5, '#c64c26');
  base.addColorStop(0.86, '#ad3f1f');
  base.addColorStop(1, '#e8ddd6');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  const patches: [number, number, number, string][] = [
    [0.32, 0.48, 0.24, 'rgba(72, 24, 14, 0.42)'],
    [0.64, 0.56, 0.28, 'rgba(84, 28, 16, 0.36)'],
    [0.52, 0.38, 0.16, 'rgba(240, 140, 82, 0.34)'],
    [0.18, 0.62, 0.18, 'rgba(68, 22, 12, 0.38)'],
  ];
  for (const [px, py, pr, col] of patches) {
    const g = ctx.createRadialGradient(px * w, py * h, 2, px * w, py * h, pr * w);
    g.addColorStop(0, col);
    g.addColorStop(1, 'rgba(180, 70, 34, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(px * w, py * h, pr * w, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedMarsTex = tex;
  return tex;
}

export function createVolumetricBeamMaterial(colorHex = '#ffdf9e', opacity = 0.28): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(colorHex) },
      uOpacity: { value: opacity },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewPos;
      void main() {
        vUv = uv;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewPos = -mvPos.xyz;
        vNormalView = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewPos;
      void main() {
        vec3 viewDir = normalize(vViewPos);
        float edge = pow(abs(dot(vNormalView, viewDir)), 1.65);
        float verticalFade = smoothstep(0.0, 0.72, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
        float alpha = edge * verticalFade * uOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

const PIXAR_SKY_VERT = `
  varying vec3 vWorldDir;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldDir = normalize(position);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const PIXAR_SKY_FRAG = `
  varying vec3 vWorldDir;
  uniform float uTime;
  uniform float uAuroraBoost;
  uniform float uThemeMode;
  uniform float uDaylight;
  uniform vec3 uTopColor;
  uniform vec3 uMidColor;
  uniform vec3 uHorizonColor;

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  void main() {
    vec3 dir = normalize(vWorldDir);
    float y = clamp(dir.y, -0.2, 1.0);
    float h = clamp(y, 0.0, 1.0);

    vec3 col = mix(uHorizonColor, uMidColor, smoothstep(0.0, 0.32, h));
    col = mix(col, uTopColor, smoothstep(0.28, 0.92, h));

    float nightVis = 1.0 - clamp(uDaylight * 1.15, 0.0, 0.92);
    float horizonGlow = exp(-abs(y - 0.03) * 10.5);
    vec3 glowTint = uThemeMode > 1.5
      ? vec3(0.75, 0.14, 0.56)
      : (uThemeMode > 0.5 ? vec3(0.22, 0.42, 0.58) : mix(vec3(0.48, 0.21, 0.14), vec3(0.95, 0.72, 0.48), uDaylight));
    col += glowTint * horizonGlow * 0.58;

    // Soft Milky Way diagonal stardust band across upper zenith in winter night
    if (y > 0.06 && nightVis > 0.08) {
      float mwCoord = dir.x * 0.78 + dir.y * 0.62 - 0.32;
      float mwBand = exp(-mwCoord * mwCoord * 18.0);
      float mwCloud = 0.55 + 0.45 * sin(dir.z * 9.0 + dir.x * 7.0) * cos(dir.y * 11.0);
      col += vec3(0.22, 0.32, 0.58) * mwBand * mwCloud * smoothstep(0.06, 0.28, y) * 0.32 * nightVis;
    }

    float az = atan(dir.z, dir.x);
    float w1 = sin(az * 3.0 + uTime * 0.26) * 0.08 + cos(az * 5.0 - uTime * 0.18) * 0.04;
    float w2 = cos(az * 4.0 - uTime * 0.32 + 1.4) * 0.07 + sin(az * 7.0 + uTime * 0.22) * 0.03;

    float band1 = exp(-pow((y - (0.31 + w1)) * 7.8, 2.0));
    float band2 = exp(-pow((y - (0.43 + w2)) * 9.0, 2.0));
    float rays1 = 0.58 + 0.42 * sin(az * 24.0 + uTime * 0.85 + y * 8.0);
    float rays2 = 0.55 + 0.45 * cos(az * 18.0 - uTime * 0.65);

    vec3 emerald = uThemeMode > 1.5
      ? vec3(0.12, 0.95, 1.0)
      : vec3(0.14, 0.96, 0.72);
    vec3 goldTint = uThemeMode > 1.5
      ? vec3(1.0, 0.24, 0.78)
      : vec3(1.0, 0.8, 0.42);
    vec3 violetTint = uThemeMode > 1.5
      ? vec3(0.72, 0.32, 1.0)
      : vec3(0.55, 0.42, 0.98);

    col += mix(emerald, goldTint, 0.28 + 0.22 * sin(az * 2.0 + uTime * 0.3)) * band1 * rays1 * (0.48 * uAuroraBoost * nightVis);
    col += mix(vec3(0.22, 0.82, 1.0), violetTint, 0.4) * band2 * rays2 * (0.34 * uAuroraBoost * nightVis);

    if (y > 0.04 && nightVis > 0.08) {
      vec2 starGrid = vec2(az * 38.0, y * 74.0);
      vec2 cell = floor(starGrid);
      vec2 f = fract(starGrid) - 0.5;
      float rnd = hash21(cell);
      if (rnd > 0.925) {
        float d = length(f);
        float star = smoothstep(0.24, 0.0, d);
        float tw = 0.55 + 0.45 * sin(uTime * (1.8 + rnd * 4.5) + rnd * 62.0);
        vec3 sCol = rnd > 0.97 ? vec3(1.25, 1.08, 0.82) : vec3(0.95, 1.05, 1.25);
        col += sCol * star * tw * smoothstep(0.04, 0.22, y) * 1.15 * nightVis;
      }
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function createPixarSkyDome(radius = 300): { mesh: THREE.Mesh; material: THREE.ShaderMaterial } {
  const geo = new THREE.SphereGeometry(radius, 36, 24);
  const material = new THREE.ShaderMaterial({
    vertexShader: PIXAR_SKY_VERT,
    fragmentShader: PIXAR_SKY_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uAuroraBoost: { value: 1.0 },
      uThemeMode: { value: 0.0 },
      uDaylight: { value: 0.0 },
      uTopColor: { value: new THREE.Color('#040a1e') },
      uMidColor: { value: new THREE.Color('#0c1e4a') },
      uHorizonColor: { value: new THREE.Color('#1d3364') },
    },
    side: THREE.BackSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, material);
  return { mesh, material };
}

export function createPixarMoon(radius = 10): THREE.Group {
  const group = new THREE.Group();
  const moonTex = createMoonSurfaceTexture();
  const discMat = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: moonTex },
      uSunDir: { value: new THREE.Vector3(0.25, 0.15, 0.96).normalize() },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormalView;
      void main() {
        vUv = uv;
        vNormalView = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uMap;
      uniform vec3 uSunDir;
      varying vec2 vUv;
      varying vec3 vNormalView;
      void main() {
        vec3 texCol = texture2D(uMap, vUv).rgb * vec3(1.0, 0.97, 0.91);
        float ndotl = dot(normalize(vNormalView), normalize(uSunDir));
        float lit = smoothstep(-0.18, 0.24, ndotl);
        vec3 shadowCol = texCol * vec3(0.18, 0.24, 0.42);
        vec3 finalCol = mix(shadowCol, texCol, max(0.08, lit));
        gl_FragColor = vec4(finalCol, 1.0);
      }
    `,
    fog: false,
  });
  const disc = new THREE.Mesh(new THREE.SphereGeometry(radius, 28, 28), discMat);
  group.add(disc);

  const haloMat = new THREE.SpriteMaterial({
    map: getSoftGlowTexture(),
    color: '#ffdf9a',
    transparent: true,
    opacity: 0.72,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: false,
  });
  const haloSprite = new THREE.Sprite(haloMat);
  haloSprite.scale.set(radius * 5.8, radius * 5.8, 1);
  group.add(haloSprite);

  // Subtle horizontal anamorphic lens flare streak across bright winter moon!
  const flareMat = new THREE.SpriteMaterial({
    map: getAnamorphicFlareTexture(),
    color: '#ffe8b8',
    transparent: true,
    opacity: 0.34,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: false,
  });
  const flareSprite = new THREE.Sprite(flareMat);
  flareSprite.scale.set(radius * 12.5, radius * 1.2, 1);
  group.add(flareSprite);

  let moonFullness = 1.0;
  group.userData.setMoonPhase = (phase: number) => {
    const theta = (0.5 - phase) * Math.PI * 2;
    discMat.uniforms.uSunDir.value.set(Math.sin(theta), 0.12, Math.cos(theta)).normalize();
    moonFullness = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2);
    haloMat.opacity = 0.28 + moonFullness * 0.48;
  };
  group.userData.setDaylight = (d: number) => {
    const fade = 1 - Math.min(0.8, d * 0.8);
    haloMat.opacity = (0.28 + moonFullness * 0.48) * fade;
    flareMat.opacity = (0.14 + moonFullness * 0.26) * fade;
  };

  return group;
}

export interface BokehSnowBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

export interface BokehSnowField {
  group: THREE.Group;
  update(dt: number, windX: number, windZ: number, fallSpeed: number): void;
}

/**
 * Dual-layer soft bokeh 3D snowfall particle field using crystalline snowflake textures.
 */
export function createBokehSnowField(count: number, bounds: BokehSnowBounds): BokehSnowField {
  const group = new THREE.Group();
  const smallCount = Math.floor(count * 0.72);
  const bokehCount = Math.max(20, count - smallCount);

  const buildLayer = (n: number, size: number, opacity: number) => {
    const pos = new Float32Array(n * 3);
    const seeds = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
      pos[i * 3 + 1] = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);
      pos[i * 3 + 2] = bounds.minZ + Math.random() * (bounds.maxZ - bounds.minZ);
      seeds[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      map: getSnowflakeTexture(),
      color: '#f2f8ff',
      size,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const pts = new THREE.Points(geo, mat);
    group.add(pts);
    return { pts, pos, seeds, count: n };
  };

  const fine = buildLayer(smallCount, 0.52, 0.85);
  const big = buildLayer(bokehCount, 1.35, 0.45);
  let elapsed = 0;

  const updateLayer = (
    layer: ReturnType<typeof buildLayer>,
    dt: number,
    wx: number,
    wz: number,
    fy: number,
    mul: number
  ) => {
    const { pos, seeds, count: n } = layer;
    for (let i = 0; i < n; i++) {
      const ix = i * 3;
      const sway = Math.sin(elapsed * 1.4 + seeds[i]) * 0.65;
      pos[ix] += (wx * mul + sway) * dt;
      pos[ix + 1] -= fy * mul * dt;
      pos[ix + 2] += wz * mul * dt;

      if (pos[ix + 1] < bounds.minY) pos[ix + 1] = bounds.maxY;
      if (pos[ix + 1] > bounds.maxY) pos[ix + 1] = bounds.minY;
      if (pos[ix] < bounds.minX) pos[ix] += bounds.maxX - bounds.minX;
      if (pos[ix] > bounds.maxX) pos[ix] -= bounds.maxX - bounds.minX;
      if (pos[ix + 2] < bounds.minZ) pos[ix + 2] += bounds.maxZ - bounds.minZ;
      if (pos[ix + 2] > bounds.maxZ) pos[ix + 2] -= bounds.maxZ - bounds.minZ;
    }
    layer.pts.geometry.attributes.position.needsUpdate = true;
  };

  return {
    group,
    update(dt: number, windX: number, windZ: number, fallSpeed: number): void {
      elapsed += dt;
      updateLayer(fine, dt, windX, windZ, fallSpeed, 1.0);
      updateLayer(big, dt, windX, windZ, fallSpeed, 1.38);
    },
  };
}
