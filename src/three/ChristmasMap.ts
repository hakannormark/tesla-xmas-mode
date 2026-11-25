import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { HolidayThemeId } from '../core/environment';
import type { OsmMapSnapshot, OsmPoint2D, OsmRoadRibbon } from '../core/osmWorld';
import {
  createClapboardTextures,
  createGigaAtriumGlassTexture,
  createGigaSignTexture,
  createGigaSolarRoofTexture,
  createGigafactoryWallTexture,
  createPlasterBrickTextures,
  createShingleRoofTextures,
  createSnowTextures,
  createTimberWallTexture,
  getSoftGlowTexture,
} from './pixarMaterials';
import { streetGeometry, roadJunctions, junctionGeometry, snowbankGeometry } from './mappedRoads';
import { mapClearance } from './mapClearance';
import { createWinterRoad, updateWinterRoad } from './winterSurfaces';
import { buildingWallHeight, cottageModel, cottageStyles, roofProjection } from './christmasBuildingStyles';
import { buildCottageBay } from './cottageBay';
import { VillageLights } from './VillageLights';

const asphalt = createWinterRoad();
const verge = new THREE.MeshStandardMaterial({color: '#d3e6ed', roughness: 0.96});
const snowTexture = createSnowTextures().bumpMap;
snowTexture.wrapS = snowTexture.wrapT = THREE.RepeatWrapping;
const snow = new THREE.MeshStandardMaterial({color: '#fff8f4', roughness: 0.83, bumpMap: snowTexture, bumpScale: 0.12});
const logBeam = new THREE.CylinderGeometry(0.5,0.5,1,8).rotateZ(Math.PI/2);
const logWood = new THREE.MeshStandardMaterial({color:'#925d3d',roughness:0.92});
const bayGeometry = buildCottageBay();
const bayWood = new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.79});
const shingleTextures = createShingleRoofTextures();
const roofCap = new THREE.MeshStandardMaterial({
  color: '#e8eef8',
  map: shingleTextures.map,
  bumpMap: shingleTextures.bumpMap,
  bumpScale: 0.2,
  roughness: 0.78,
});
const marketRed = new THREE.MeshStandardMaterial({ color: '#9c202c', roughness: 0.78 });
const marketCream = new THREE.MeshStandardMaterial({ color: '#f5e8cc', roughness: 0.82 });
const timber = createTimberWallTexture('#d3b8ad');
timber.wrapS = timber.wrapT = THREE.RepeatWrapping;
const clapboardTex = createClapboardTextures();
const plasterTex = createPlasterBrickTextures();
const gigaWallTex = createGigafactoryWallTexture();
gigaWallTex.repeat.set(0.14, 0.22);
const gigaSolarTex = createGigaSolarRoofTexture();
const gigaAtriumMat = new THREE.MeshBasicMaterial({ map: createGigaAtriumGlassTexture(), toneMapped: false });
const gigaSignMat = new THREE.MeshBasicMaterial({ map: createGigaSignTexture(), toneMapped: false });
const gigaRedLedMat = new THREE.MeshBasicMaterial({ color: '#ff1e3e', toneMapped: false });
const gigaParapetMat = new THREE.MeshStandardMaterial({ color: '#f4f7fc', roughness: 0.34, metalness: 0.22 });
const gigaRibMat = new THREE.MeshStandardMaterial({ color: '#d5deeb', roughness: 0.45, metalness: 0.18 });
const gigaDockMat = new THREE.MeshStandardMaterial({ color: '#1b2434', roughness: 0.55, metalness: 0.45 });
const gigaCanopyDarkMat = new THREE.MeshStandardMaterial({ color: '#141d2c', roughness: 0.42, metalness: 0.52 });
const cottageWalls = cottageStyles.map(style => new THREE.MeshStandardMaterial({
  color: style.color,
  map: style.finish === 'plaster' ? plasterTex.map : style.finish === 'boards' ? clapboardTex.map : timber,
  bumpMap: style.finish === 'plaster' ? plasterTex.bumpMap : clapboardTex.bumpMap,
  bumpScale: style.finish === 'plaster' ? 0.14 : 0.16,
  roughness: 0.84,
}));
const cottageTrim = cottageStyles.map(style => new THREE.MeshStandardMaterial({color:style.trim,roughness:0.82}));
const foundationStone = new THREE.MeshStandardMaterial({color:'#6f667a', map: plasterTex.map, bumpMap: plasterTex.bumpMap, bumpScale: 0.16, roughness:0.94});
const factoryWall = new THREE.MeshStandardMaterial({
  color: '#f2f6fc',
  map: gigaWallTex,
  roughness: 0.46,
  metalness: 0.14,
});
const gigaSolarMat = new THREE.MeshStandardMaterial({
  map: gigaSolarTex,
  roughness: 0.24,
  metalness: 0.68,
});
const largeBuildingWalls = ['#c8885a', '#b65b4a', '#d4ad74', '#4d6f8c', '#8e6c64'].map((color, idx) =>
  new THREE.MeshStandardMaterial({
    color,
    map: idx % 2 === 0 ? plasterTex.map : clapboardTex.map,
    bumpMap: idx % 2 === 0 ? plasterTex.bumpMap : clapboardTex.bumpMap,
    bumpScale: 0.16,
    roughness: 0.82,
  })
);
const churchWall = new THREE.MeshStandardMaterial({color:'#e4dccd', map: plasterTex.map, bumpMap: plasterTex.bumpMap, bumpScale: 0.14, roughness:0.84});
const spireMat = new THREE.MeshStandardMaterial({color:'#263550', roughness:0.55, metalness:0.28});
const graniteMat = new THREE.MeshStandardMaterial({color:'#4c5566', bumpMap: plasterTex.bumpMap, bumpScale: 0.22, roughness:0.90});
const fenceWoodMat = new THREE.MeshStandardMaterial({color:'#6d472e', roughness:0.90});
const graniteRock = new THREE.DodecahedronGeometry(1, 0);
const brick = new THREE.MeshStandardMaterial({color:'#683b43', map: plasterTex.map, bumpMap: plasterTex.bumpMap, bumpScale: 0.18, roughness:0.88});
const trim = new THREE.MeshStandardMaterial({color:'#f4d9af',roughness:0.81});
const eave = new THREE.MeshStandardMaterial({color:'#402b39',roughness:0.83});
const roofSnow = new THREE.MeshStandardMaterial({color:'#f2edff',roughness:0.84});
const cedar = new THREE.MeshStandardMaterial({color:'#603a30',roughness:0.83});
const shutters = cottageStyles.map(style => new THREE.MeshStandardMaterial({
  color:style.door,map:clapboardTex.map,roughness:0.82,
}));
const lightStringPalette = ['#ffe4a8', '#e84366', '#6cf6dd', '#b692ff', '#ffca57'];
const lightStrings = lightStringPalette.map(color => new THREE.MeshBasicMaterial({color, toneMapped: false}));
const powder = new THREE.MeshStandardMaterial({color:'#e4ecf7',roughness:0.84});
const snowmanSnow = new THREE.MeshStandardMaterial({color:'#fff4ea',roughness:0.76});
const coal = new THREE.MeshStandardMaterial({color:'#342d3c',roughness:0.78});
const hat = coal.clone();
const carrot = new THREE.MeshStandardMaterial({color:'#eb7a43',roughness:0.68});
const scarves = ['#ba344a','#3b8072','#6c5593'].map(color => new THREE.MeshStandardMaterial({color,roughness:0.82}));
const drift = new THREE.SphereGeometry(1,14,7);
const snowBall = new THREE.SphereGeometry(1,12,8);
const topHat = new THREE.CylinderGeometry(1,1,1,10);
const nose = new THREE.ConeGeometry(1,1,8).rotateX(Math.PI/2);
const scarf = new THREE.TorusGeometry(1,0.22,6,13).rotateX(Math.PI/2);
const spireCone = new THREE.ConeGeometry(0.68,1,6);
const smokeMaterial = new THREE.PointsMaterial({
  color:'#e2ebf5', size:2.0, map:getSoftGlowTexture(), transparent:true,
  opacity:0.2, depthWrite:false, sizeAttenuation:true,
});
const boxUnit = new THREE.BoxGeometry(1,1,1);
const bulb = new THREE.IcosahedronGeometry(1,0);
const lightPool = new THREE.MeshBasicMaterial({
  map:getSoftGlowTexture(),color:'#ffb460',transparent:true,opacity:0.49,
  depthWrite:false,
});
const floorPlane = new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2);
const aoShadowMat = new THREE.MeshBasicMaterial({
  map: getSoftGlowTexture(), color: '#050b1c', transparent: true, opacity: 0.44, depthWrite: false,
});
const zebraMat = new THREE.MeshBasicMaterial({
  color: '#dce7f5', transparent: true, opacity: 0.72, depthWrite: false,
});
const curbMat = new THREE.MeshStandardMaterial({ color: '#3b4d68', roughness: 0.82 });
const lampIronMat = new THREE.MeshStandardMaterial({ color: '#1b2638', metalness: 0.65, roughness: 0.42 });
const lampOrbMat = new THREE.MeshBasicMaterial({ color: '#ffd98a', toneMapped: false });
const signalHousingMat = new THREE.MeshStandardMaterial({ color: '#17202d', metalness: 0.5, roughness: 0.45 });
const signalLensGeo = new THREE.SphereGeometry(0.11, 8, 8);
const starShape = new THREE.Shape();
for (let i = 0; i < 10; i++) {
  const angle = Math.PI/2 + i*Math.PI/5;
  const radius = i%2 ? 0.42 : 1;
  const x = Math.cos(angle)*radius, y = Math.sin(angle)*radius;
  if (i === 0) starShape.moveTo(x,y);
  else starShape.lineTo(x,y);
}
starShape.closePath();
const starGeometry = new THREE.ExtrudeGeometry(starShape,{
  depth:0.09,bevelEnabled:true,bevelSegments:1,bevelSize:0.045,bevelThickness:0.045,
});
const starGold = new THREE.MeshBasicMaterial({color:'#ffe3a0', toneMapped: false});
const greenGarland = new THREE.MeshStandardMaterial({color:'#295645',roughness:0.92});
const firWreath = greenGarland.clone();
const fir = new THREE.TorusGeometry(1,0.29,7,16);
const berries = new THREE.MeshBasicMaterial({color:'#ef4658', toneMapped: false});
const canopyShape = new THREE.Shape();
canopyShape.moveTo(-0.5,-0.5);
canopyShape.lineTo(0.5,-0.5);
canopyShape.lineTo(0,0.5);
canopyShape.closePath();
const canopyGeometry = new THREE.ExtrudeGeometry(canopyShape,{
  depth:1,bevelEnabled:true,bevelSegments:2,bevelSize:0.035,bevelThickness:0.035,
}).translate(0,0,-0.5);
const canopyWood = cedar.clone();
const canopySnow = roofSnow.clone();


function illustratedPanel(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d')!);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshBasicMaterial({map:texture, transparent:true, alphaTest:0.3});
}

const cottageDoors = cottageStyles.map(style => illustratedPanel(64,96,ctx => {
  ctx.fillStyle=style.trim; ctx.fillRect(0,0,64,96);
  ctx.fillStyle=style.door; ctx.fillRect(5,5,54,91);
  ctx.strokeStyle='#a95c5a'; ctx.lineWidth=2; ctx.strokeRect(10,11,44,77);
  ctx.strokeRect(14,15,36,34); ctx.strokeRect(14,58,36,22);
  ctx.fillStyle='#ffdc80'; ctx.beginPath(); ctx.arc(46,63,3,0,Math.PI*2); ctx.fill();
}));
const windowRound = illustratedPanel(72,72,ctx => {
  ctx.fillStyle='#eedbb9'; ctx.beginPath(); ctx.arc(36,36,35,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#eab166'; ctx.beginPath(); ctx.arc(36,36,26,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='#6a403a'; ctx.lineWidth=5;
  ctx.beginPath(); ctx.moveTo(36,10); ctx.lineTo(36,62); ctx.moveTo(10,36); ctx.lineTo(62,36); ctx.stroke();
});
const windowArch = illustratedPanel(72,88,ctx => {
  ctx.fillStyle='#f2dbb3'; ctx.beginPath(); ctx.arc(36,33,34,Math.PI,0); ctx.lineTo(70,86); ctx.lineTo(2,86); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#ffd08b'; ctx.beginPath(); ctx.arc(36,36,26,Math.PI,0); ctx.lineTo(62,78); ctx.lineTo(10,78); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#785049'; ctx.fillRect(33,10,6,68); ctx.fillRect(10,52,52,5);
});
const roofLedge = new THREE.MeshStandardMaterial({color:'#b7becb',metalness:0.2,roughness:0.68});
const cable = new THREE.MeshStandardMaterial({color:'#353f3c', roughness:0.95});
function createFrozenLakeTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#5a97cc');
  grad.addColorStop(0.5, '#76b5e4');
  grad.addColorStop(1, '#4b83b8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = 'rgba(235, 248, 255, 0.28)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.arc(30 + (i * 23) % 80, 24 + (i * 37) % 80, 14 + (i % 3) * 8, 0.3, Math.PI * 1.4);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
const lake = new THREE.MeshPhysicalMaterial({
  color: '#6ca8db',
  map: createFrozenLakeTexture(),
  roughness: 0.08,
  metalness: 0.16,
  clearcoat: 1.0,
  clearcoatRoughness: 0.04,
});
const woodland = new THREE.MeshStandardMaterial({
  color: '#d4e4f6',
  bumpMap: snowTexture,
  bumpScale: 0.14,
  roughness: 0.88,
});
const pine = new THREE.MeshStandardMaterial({color: '#21584c', roughness: 0.88});
const walls = ['#ae4951','#e1a379','#4a7776','#9d756b','#d1b19a'].map(color =>
  new THREE.MeshStandardMaterial({color, map:timber, roughness: 0.84}));

function createFestiveWindowMaterial(ornament: 'plain' | 'star' | 'candles' | 'tree'): THREE.MeshBasicMaterial {
  const windowCanvas = document.createElement('canvas');
  windowCanvas.width = windowCanvas.height = 128;
  const paint = windowCanvas.getContext('2d')!;
  paint.fillStyle = '#3d2228';
  paint.fillRect(0, 0, 128, 128);

  const glow = paint.createRadialGradient(64, 52, 8, 64, 62, 86);
  glow.addColorStop(0, '#fff9d8');
  glow.addColorStop(0.55, '#ffc86e');
  glow.addColorStop(1, '#c45b24');
  paint.fillStyle = glow;
  paint.fillRect(12, 12, 104, 104);

  // Cozy crimson draped curtains
  paint.fillStyle = '#9e1c2e';
  paint.beginPath();
  paint.moveTo(12, 12); paint.lineTo(38, 12); paint.quadraticCurveTo(34, 64, 12, 92);
  paint.moveTo(116, 12); paint.lineTo(90, 12); paint.quadraticCurveTo(94, 64, 116, 92);
  paint.fill();

  if (ornament === 'star') {
    paint.fillStyle = '#fffef0';
    paint.beginPath();
    for (let p = 0; p < 10; p++) {
      const ang = (p / 10) * Math.PI * 2 - Math.PI * 0.5;
      const rad = p % 2 === 0 ? 22 : 9.2;
      const px = 64 + Math.cos(ang) * rad;
      const py = 46 + Math.sin(ang) * rad;
      if (p === 0) paint.moveTo(px, py);
      else paint.lineTo(px, py);
    }
    paint.closePath();
    paint.fill();
  } else if (ornament === 'candles') {
    paint.fillStyle = '#7e1c28';
    paint.beginPath();
    paint.moveTo(30, 110);
    paint.lineTo(64, 68);
    paint.lineTo(98, 110);
    paint.closePath();
    paint.fill();
    for (let k = -3; k <= 3; k++) {
      const cx = 64 + k * 9.5;
      const cy = 104 - (3 - Math.abs(k)) * 10;
      paint.fillStyle = '#fff9eb';
      paint.fillRect(cx - 2.4, cy - 6, 4.8, 11);
      paint.fillStyle = '#fffaaf';
      paint.beginPath();
      paint.arc(cx, cy - 10, 4.4, 0, Math.PI * 2);
      paint.fill();
    }
  } else if (ornament === 'tree') {
    paint.fillStyle = '#144c3a';
    paint.beginPath();
    paint.moveTo(64, 24); paint.lineTo(94, 108); paint.lineTo(34, 108);
    paint.closePath();
    paint.fill();
    const dotCols = ['#ffe880', '#ff4058', '#68f0ff'];
    for (let d = 0; d < 7; d++) {
      paint.fillStyle = dotCols[d % 3];
      paint.beginPath();
      paint.arc(64 + ((d % 3) - 1) * 11, 46 + d * 8, 3.6, 0, Math.PI * 2);
      paint.fill();
    }
  }

  // Painted white timber mullions & snow-covered exterior sill
  paint.fillStyle = '#f5f2e8';
  paint.fillRect(60, 12, 8, 104);
  paint.fillRect(12, 62, 104, 8);
  paint.fillStyle = '#ffffff';
  paint.fillRect(0, 114, 128, 14);
  const windowTexture = new THREE.CanvasTexture(windowCanvas);
  windowTexture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshBasicMaterial({ map: windowTexture, toneMapped: false });
}

const glass = createFestiveWindowMaterial('plain');
const glassStar = createFestiveWindowMaterial('star');
const glassCandles = createFestiveWindowMaterial('candles');
const glassTree = createFestiveWindowMaterial('tree');
const pane = new THREE.PlaneGeometry(1, 1);
const icicle = new THREE.ConeGeometry(1,1,5).rotateZ(Math.PI);
const trunk = new THREE.CylinderGeometry(0.68,1,1,7);
const bark = new THREE.MeshStandardMaterial({color:'#524145',roughness:0.95});
const icicleMaterial = new THREE.MeshStandardMaterial({color:'#c6e7f1',roughness:0.32,metalness:0.06});
const lantern = new THREE.MeshBasicMaterial({color:'#ffbe66', toneMapped: false});

function createLandmarkLabelMesh(text: string, isGiga: boolean): { mesh: THREE.Mesh; texture: THREE.CanvasTexture; material: THREE.MeshBasicMaterial } {
  const w = 512, h = 112;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, w, h);
  if (isGiga) {
    grad.addColorStop(0, '#c80c26');
    grad.addColorStop(1, '#10182b');
  } else {
    grad.addColorStop(0, 'rgba(98, 14, 30, 0.94)');
    grad.addColorStop(1, 'rgba(32, 14, 42, 0.94)');
  }
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(6, 6, w - 12, h - 12, 22);
  ctx.fill();
  ctx.strokeStyle = isGiga ? '#ffffff' : '#ffd166';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#fff8eb';
  ctx.font = '700 36px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.slice(0, 26), w * 0.5, h * 0.52, w - 48);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(isGiga ? 10.5 : 7.0, isGiga ? 2.3 : 1.54),
    material
  );
  return { mesh, texture, material };
}

// Scallops give the snow cap the outline of individual laden branches.
function spruceTier(snowCap: boolean): THREE.BufferGeometry {
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  const sides = 32;
  const rings = snowCap ? [{y:0.08,r:0.87},{y:0.25,r:0.82},{y:0.64,r:0.44},{y:0.99,r:0.025}]
    : [{y:0.0,r:0.22},{y:0.02,r:1.0},{y:0.24,r:0.82},{y:0.64,r:0.41},{y:1,r:0.021}];
  rings.forEach(({y,r}, ring) => {
    for (let i = 0; i <= sides; i++) {
      const angle = i / sides * Math.PI * 2;
      const scallop = Math.cos(angle*8+0.48*Math.sin(angle*3)+0.45*y);
      const radius = r*(1+scallop*(1-y)*0.21);
      positions.push(radius*Math.cos(angle),y-scallop*r*(snowCap ? 0.096 : 0.12),radius*Math.sin(angle));
      uvs.push(i/sides,y);
      if (ring && i < sides) {
        const k = ring*(sides+1)+i;
        indices.push(k-sides-1,k,k+1,k-sides-1,k+1,k-sides);
      }
    }
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

const spruce = spruceTier(false);
const spruceSnow = spruceTier(true);


function expandPolygon(points: OsmPoint2D[], amount: number): OsmPoint2D[] {
  if (points.length < 3 || amount <= 0) return points;
  const shape = outline(points);
  const winding = THREE.ShapeUtils.isClockWise(shape.getPoints()) ? 1 : -1;
  const expanded: OsmPoint2D[] = [];
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const cur = points[i];
    const next = points[(i + 1) % n];
    const e1x = cur.x - prev.x, e1z = cur.z - prev.z;
    const e2x = next.x - cur.x, e2z = next.z - cur.z;
    const l1 = Math.hypot(e1x, e1z) || 1;
    const l2 = Math.hypot(e2x, e2z) || 1;
    const n1x = (winding * e1z) / l1, n1z = (-winding * e1x) / l1;
    const n2x = (winding * e2z) / l2, n2z = (-winding * e2x) / l2;
    const mx = n1x + n2x, mz = n1z + n2z;
    const mLen = Math.hypot(mx, mz);
    if (mLen < 0.25) {
      expanded.push({ x: cur.x + n1x * amount, z: cur.z + n1z * amount });
    } else {
      const invDot = Math.min(1.5, Math.max(0.85, 2 / (mLen * mLen)));
      expanded.push({
        x: cur.x + mx * amount * invDot,
        z: cur.z + mz * amount * invDot,
      });
    }
  }
  const origArea = THREE.ShapeUtils.area(shape.getPoints());
  const expShape = outline(expanded);
  const expArea = THREE.ShapeUtils.area(expShape.getPoints());
  if (Math.sign(origArea) !== Math.sign(expArea) || Math.abs(expArea) < Math.abs(origArea)) {
    return points;
  }
  return expanded;
}

function outline(points: OsmPoint2D[]): THREE.Shape {
  return new THREE.Shape(points.map(p => new THREE.Vector2(p.x, -p.z)));
}

function roofGeometry(shape: THREE.Shape, profile: ReturnType<typeof roofProjection>): {snowCap: THREE.BufferGeometry; gables: THREE.BufferGeometry} {
  const points = shape.getPoints();
  const axis = (p: THREE.Vector2) => profile.widthAt({x:p.x,z:-p.y});
  let vertices: number[] = [];
  const add = (p: THREE.Vector2, y = profile.yAt(axis(p))) => vertices.push(p.x,y,-p.y);
  function clip(polygon: THREE.Vector2[], boundary: number, side: number): THREE.Vector2[] {
    return polygon.flatMap((a,i) => {
      const b = polygon[(i+1)%polygon.length];
      const ap = axis(a)-boundary, bp = axis(b)-boundary;
      const inside = ap*side >= 0;
      const crosses = ap*bp < 0;
      return [...(inside ? [a] : []), ...(crosses ? [a.clone().lerp(b,ap/(ap-bp))] : [])];
    });
  }
  for (const face of THREE.ShapeUtils.triangulateShape(points,[])) {
    const triangle = face.map(i => points[i]);
    for (let section = 1; section < profile.sections.length; section++) {
      const polygon = clip(clip(triangle,profile.sections[section-1],1),profile.sections[section],-1);
      for (let i = 1; i < polygon.length-1; i++) {
        add(polygon[0]); add(polygon[i]); add(polygon[i+1]);
      }
    }
  }
  const cap = vertices;
  vertices = [];
  const clockwise = THREE.ShapeUtils.isClockWise(points);
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i+1)%points.length];
    const distance = axis(b)-axis(a);
    const stops = profile.sections.map(p => (p-axis(a))/distance).filter(t => t > 0 && t < 1).sort((x,y) => x-y);
    const edge = [a,...stops.map(t => a.clone().lerp(b,t)),b];
    // Outward winding for the vertical gables in X/Z coordinates.
    if (clockwise) edge.reverse();
    for (let j = 1; j < edge.length; j++) {
      const from = edge[j-1], to = edge[j];
      add(from,0); add(to,0); add(to);
      add(from,0); add(to); add(from);
    }
  }
  function build(positions: number[]): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geometry.computeVertexNormals();
    return geometry;
  }
  return {snowCap:build(cap),gables:build(vertices)};
}

const cyberStringPalette = ['#5cf2ff', '#ff5cc8', '#ffe49e', '#74ffca', '#b88aff'];
const showStringPalette = ['#ff2442', '#ffd84d', '#24ff9c', '#4de8ff', '#ff5ce8'];
const workColor = new THREE.Color();

export function updateChristmasMapAtmosphere(
  time: number,
  daylight: number,
  vehiclePos: THREE.Vector3,
  heading: number,
  braking: number,
  headlight: number,
  theme: HolidayThemeId,
  beat: number,
  lightShow = 0
): void {
  updateWinterRoad(asphalt, time, daylight, vehiclePos, heading, braking, headlight, theme, beat);
  const palette = lightShow > 0.05 ? showStringPalette : theme === 'cyber2099' ? cyberStringPalette : lightStringPalette;
  const shiftIdx = lightShow > 0.05 ? Math.floor(time * 5.5) : 0;
  for (let i = 0; i < lightStrings.length; i++) {
    workColor.set(palette[(i + shiftIdx) % palette.length]);
    if (lightShow <= 0.05 && theme === 'nordic' && i === 1) workColor.set('#7fd8ff');
    const showPulse = lightShow > 0.01 ? lightShow * (0.8 + 0.9 * Math.sin(time * 14 + i * 1.4)) : 0;
    workColor.multiplyScalar(Math.max(0.45, 1 + beat * 0.28 + showPulse));
    lightStrings[i].color.copy(workColor);
  }
}

export interface ChristmasBuildingTarget {
  id: string;
  x: number;
  roofY: number;
  z: number;
  isChurch: boolean;
}

export interface ChristmasMapData {
  snapshot?: OsmMapSnapshot;
  clearance?: ReturnType<typeof mapClearance>;
  churches: { x: number; z: number; name: string | null }[];
  lakes: { x: number; z: number; radius: number }[];
  woodlands: OsmPoint2D[];
  elevation?: (x: number, z: number) => number;
}

function drapeElevation(geometry: THREE.BufferGeometry, offset: number, elevation?: (x: number, z: number) => number): void {
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    pos.setY(i, (elevation?.(x, z) ?? 0) + offset);
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
}

interface ResourceBag {
  geometries: THREE.BufferGeometry[];
  instances: THREE.InstancedMesh[];
  dynamicAssets: Array<{ geometry?: THREE.BufferGeometry; material: THREE.Material; texture?: THREE.Texture }>;
}

function createResourceBag(): ResourceBag {
  return { geometries: [], instances: [], dynamicAssets: [] };
}

function disposeResourceBag(bag: ResourceBag): void {
  bag.geometries.forEach(g => g.dispose());
  bag.instances.forEach(mesh => mesh.dispose());
  for (const asset of bag.dynamicAssets) {
    asset.geometry?.dispose();
    asset.texture?.dispose();
    asset.material.dispose();
  }
  bag.geometries = [];
  bag.instances = [];
  bag.dynamicAssets = [];
}

interface CrossingEntry {
  name: string;
  distance: number;
  roadDx: number;
  roadDz: number;
  branchDx: number;
  branchDz: number;
  isCross: boolean;
}

interface RoadSeg {
  road: OsmRoadRibbon;
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
  widthM: number;
}

interface MapBuildJob {
  key: string;
  snapshot: OsmMapSnapshot;
  elevation?: (x: number, z: number) => number;
  group: THREE.Group;
  resources: ResourceBag;
  phase: 0 | 1 | 2 | 3 | 4;
  junctions: ReturnType<typeof roadJunctions>;
  clearance?: ReturnType<typeof mapClearance>;
  roadSegs: RoadSeg[];
  crossings: Map<OsmRoadRibbon, CrossingEntry[]>;
  churches: ChristmasMapData['churches'];
  lakes: ChristmasMapData['lakes'];
  woodlands: OsmPoint2D[];
  yards: Array<{ x: number; z: number; yaw: number; index: number }>;
  lanterns: THREE.Vector3[];
  vents: THREE.Vector3[];
  buildingTargets: ChristmasBuildingTarget[];
  signalNodes: Array<{ red: THREE.MeshBasicMaterial; amber: THREE.MeshBasicMaterial; green: THREE.MeshBasicMaterial; phase: number }>;
  details: Map<THREE.Material, THREE.Matrix4[]>;
  batches: Map<THREE.Material, THREE.BufferGeometry[]>;
  buildingIndex: number;
  gigaCount: number;
  landmarkSigns: number;
  roadPropsDone: boolean;
  batchKeys?: THREE.Material[];
  batchMergeIdx: number;
  detailKeys?: THREE.Material[];
  detailIdx: number;
  smoke?: THREE.Points;
}

const detailTransform = new THREE.Object3D();

export class ChristmasMap {
  readonly group = new THREE.Group();
  readonly villageLights = new VillageLights();
  readonly mapData: ChristmasMapData = { churches: [], lakes: [], woodlands: [] };
  private activeContent = new THREE.Group();
  private activeResources: ResourceBag = createResourceBag();
  private retiringResources: ResourceBag | null = null;
  private pendingJob: MapBuildJob | null = null;
  private readonly celebrationGroup = new THREE.Group();
  private celebrationNodes: Array<{ star: THREE.Mesh; halo: THREE.Sprite; baseY: number; phase: number }> = [];
  private celebrated = new Set<string>();
  private buildingTargets: ChristmasBuildingTarget[] = [];
  private buildKey?: string;
  private vents: THREE.Vector3[] = [];
  private smoke?: THREE.Points;
  private crossings = new Map<OsmRoadRibbon, CrossingEntry[]>();
  private signalNodes: Array<{ red: THREE.MeshBasicMaterial; amber: THREE.MeshBasicMaterial; green: THREE.MeshBasicMaterial; phase: number }> = [];

  constructor() {
    this.activeContent.add(this.celebrationGroup);
    this.group.add(this.activeContent, this.villageLights.group);
  }

  shiftActiveContent(offset: THREE.Vector3): void {
    this.activeContent.position.add(offset);
    this.villageLights.group.position.add(offset);
  }

  private flushRetiringResources(): void {
    if (!this.retiringResources) return;
    disposeResourceBag(this.retiringResources);
    this.retiringResources = null;
  }

  animate(time: number, center: THREE.Vector3): void {
    const localCenter = center.clone().sub(this.activeContent.position);
    this.villageLights.update(time, localCenter);
    for (const node of this.celebrationNodes) {
      node.star.rotation.y = time * 2.2 + node.phase;
      node.star.position.y = node.baseY + Math.sin(time * 3.4 + node.phase) * 0.16;
      node.halo.material.opacity = 0.62 + 0.18 * Math.sin(time * 4.0 + node.phase);
    }
    for (const sig of this.signalNodes) {
      const cyc = (time + sig.phase) % 12;
      const isGreen = cyc < 5.5;
      const isAmber = cyc >= 5.5 && cyc < 7.0;
      const isRed = cyc >= 7.0;
      sig.green.color.setHex(isGreen ? 0x38f28c : 0x0a2e1a);
      sig.amber.color.setHex(isAmber ? 0xffb838 : 0x332008);
      sig.red.color.setHex(isRed ? 0xff3b52 : 0x320c13);
    }
    if (!this.smoke) return;
    const position = this.smoke.geometry.attributes.position;
    let used = 0;
    for (const [id, vent] of this.vents.entries()) {
      if (Math.hypot(vent.x - localCenter.x, vent.z - localCenter.z) > 155) continue;
      for (let i = 0; i < 4; i++) {
        const age = (time * 0.27 + i * 0.25 + id * 0.43) % 1;
        position.setXYZ(used++, vent.x + age * age * 3.1, vent.y + age * 4.1,
          vent.z + Math.sin(age * 3.4 + id) * age * 0.66);
      }
    }
    this.smoke.geometry.setDrawRange(0, used);
    position.needsUpdate = true;
  }

  celebrateBuilding(id: string, x: number, roofY: number, z: number): boolean {
    const firstTime = !this.celebrated.has(id);
    if (!firstTime) return false;
    this.celebrated.add(id);
    this.spawnCelebrationStar(x - this.activeContent.position.x, roofY, z - this.activeContent.position.z);
    return true;
  }

  private spawnCelebrationStar(x: number, roofY: number, z: number): void {
    const star = new THREE.Mesh(starGeometry, starGold);
    star.scale.setScalar(0.68);
    star.position.set(x, roofY + 0.9, z);
    const haloMat = new THREE.SpriteMaterial({
      map: getSoftGlowTexture(),
      color: '#ffe07d',
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const halo = new THREE.Sprite(haloMat);
    halo.scale.set(6.4, 6.4, 1);
    halo.position.set(x, roofY + 0.65, z);
    this.celebrationGroup.add(star, halo);
    this.activeResources.dynamicAssets.push({ material: haloMat });
    this.celebrationNodes.push({ star, halo, baseY: roofY + 0.9, phase: x * 0.37 + z * 0.21 });
  }

  getGiftTargets(center: OsmPoint2D, heading: number, preferSide?: -1 | 1): ChristmasBuildingTarget[] {
    const east = Math.sin(heading), north = Math.cos(heading);
    const ox = this.activeContent.position.x, oz = this.activeContent.position.z;
    const scored: Array<{ target: ChristmasBuildingTarget; dist: number; sideMatch: boolean }> = [];
    for (const target of this.buildingTargets) {
      const wx = target.x + ox, wz = target.z + oz;
      const dx = wx - center.x, dz = wz - center.z;
      const ahead = dx * east - dz * north;
      const dist = Math.hypot(dx, dz);
      if (ahead < 6 || dist > 92) continue;
      const lateral = dx * north + dz * east;
      const sideMatch = preferSide === undefined || (preferSide < 0 ? lateral <= 2 : lateral >= -2);
      scored.push({ target: { ...target, x: wx, z: wz }, dist, sideMatch });
    }
    scored.sort((a, b) => {
      if (a.sideMatch !== b.sideMatch) return a.sideMatch ? -1 : 1;
      const aLit = this.celebrated.has(a.target.id) ? 1 : 0;
      const bLit = this.celebrated.has(b.target.id) ? 1 : 0;
      if (aLit !== bLit) return aLit - bLit;
      return a.dist - b.dist;
    });
    return scored.map(entry => entry.target);
  }

  private addJobSurface(job: MapBuildJob, geometry: THREE.BufferGeometry, material: THREE.Material, height = 0, castShadow = false): void {
    job.resources.geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = height;
    mesh.receiveShadow = true;
    mesh.castShadow = castShadow;
    job.group.add(mesh);
  }

  private discardPendingJob(): void {
    const job = this.pendingJob;
    if (!job) return;
    disposeResourceBag(job.resources);
    for (const parts of job.batches.values()) {
      parts.forEach(part => part.dispose());
    }
    job.batches.clear();
    job.group.clear();
    this.pendingJob = null;
  }

  dispose(): void {
    this.discardPendingJob();
    this.flushRetiringResources();
    disposeResourceBag(this.activeResources);
    this.celebrationNodes = [];
    this.signalNodes = [];
    this.celebrationGroup.clear();
    this.activeContent.clear();
    this.group.clear();
  }

  private jobAddDetail(
    job: MapBuildJob,
    material: THREE.Material,
    x: number,
    y: number,
    z: number,
    yaw: number,
    width: number,
    height: number,
    depth = 1,
    tilt = 0,
    base?: number
  ): void {
    const gy = base ?? (job.elevation?.(x, z) ?? 0);
    detailTransform.position.set(x, y + gy, z);
    detailTransform.rotation.set(0, yaw, tilt, 'YXZ');
    if (material === lightPool || material === aoShadowMat || material === zebraMat) detailTransform.scale.set(width, 1, height);
    else detailTransform.scale.set(width, height, depth);
    detailTransform.updateMatrix();
    let matrices = job.details.get(material);
    if (!matrices) {
      matrices = [];
      job.details.set(material, matrices);
    }
    matrices.push(detailTransform.matrix.clone());
  }

  private jobBatchGeometry(job: MapBuildJob, geometry: THREE.BufferGeometry, material: THREE.Material): void {
    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    const uv: number[] = [];
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
      uv.push(Math.abs(normal.getX(i)) > 0.65 ? z * 0.48 : x * 0.48,
        Math.abs(normal.getY(i)) > 0.55 ? z * 0.48 : y * 0.48);
    }
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    let geometries = job.batches.get(material);
    if (!geometries) {
      geometries = [];
      job.batches.set(material, geometries);
    }
    geometries.push(geometry);
  }

  private stepPhase0Surfaces(job: MapBuildJob): void {
    const { snapshot, elevation } = job;
    const nodes = new Map<string, Set<OsmRoadRibbon>>();
    const key = (p: OsmPoint2D) => p.x.toFixed(2) + ',' + p.z.toFixed(2);
    for (const road of snapshot.roads) {
      for (const p of road.points) {
        const id = key(p);
        let set = nodes.get(id);
        if (!set) {
          set = new Set();
          nodes.set(id, set);
        }
        set.add(road);
      }
    }
    for (const road of snapshot.roads) {
      let distance = 0;
      job.crossings.set(road, road.points.flatMap((point, i) => {
        const prev = road.points[i - 1];
        const next = road.points[i + 1];
        if (prev) distance += Math.hypot(point.x - prev.x, point.z - prev.z);
        const other = [...(nodes.get(key(point)) ?? [])].find(r => r !== road && r.name && r.name !== road.name);
        if (!other?.name) return [];
        const rA = prev ?? point;
        const rB = next ?? point;
        const rLen = Math.hypot(rB.x - rA.x, rB.z - rA.z) || 1;
        const roadDx = (rB.x - rA.x) / rLen;
        const roadDz = (rB.z - rA.z) / rLen;
        const oi = other.points.findIndex(op => key(op) === key(point));
        const hasPrev = oi > 0;
        const hasNext = oi >= 0 && oi < other.points.length - 1;
        const isCross = hasPrev && hasNext;
        const targetPt = hasNext ? other.points[oi + 1] : hasPrev ? other.points[oi - 1] : point;
        const bLen = Math.hypot(targetPt.x - point.x, targetPt.z - point.z) || 1;
        return [{
          name: other.name,
          distance,
          roadDx,
          roadDz,
          branchDx: (targetPt.x - point.x) / bLen,
          branchDz: (targetPt.z - point.z) / bLen,
          isCross,
        }];
      }));
    }
    this.addJobSurface(job, streetGeometry(snapshot.roads.map(r => ({ ...r, widthM: r.widthM + 1.6 })), elevation), verge, -0.012);
    const junctions = roadJunctions(snapshot.roads);
    job.junctions = junctions;
    this.addJobSurface(job, streetGeometry(snapshot.roads.map(r => ({ ...r, widthM: r.widthM + 0.36 })), elevation, junctions), curbMat, -0.006);
    this.addJobSurface(job, streetGeometry(snapshot.roads, elevation, junctions), asphalt);
    if (junctions.size) {
      this.addJobSurface(job, junctionGeometry(junctions, elevation, 0.8), verge, -0.038);
      this.addJobSurface(job, junctionGeometry(junctions, elevation, 0.18), curbMat, -0.019);
      this.addJobSurface(job, junctionGeometry(junctions, elevation), asphalt);
    }
    this.addJobSurface(job, snowbankGeometry(snapshot.roads, elevation, junctions), powder);
    for (const water of snapshot.waters) {
      if (water.isPolygon) {
        const geometry = new THREE.ShapeGeometry(outline(water.points)).rotateX(-Math.PI / 2);
        drapeElevation(geometry, 0.018, elevation);
        this.addJobSurface(job, geometry, lake, 0);
        const xs = water.points.map(p => p.x), zs = water.points.map(p => p.z);
        const cx = (Math.min(...xs) + Math.max(...xs)) * 0.5;
        const cz = (Math.min(...zs) + Math.max(...zs)) * 0.5;
        const span = Math.min(Math.max(...xs) - Math.min(...xs), Math.max(...zs) - Math.min(...zs));
        if (span >= 14) job.lakes.push({ x: cx, z: cz, radius: span * 0.35 });
      } else {
        this.addJobSurface(job, streetGeometry([{ ...water, isMajor: false }], elevation), lake, -0.029);
      }
    }
    for (const ring of snapshot.woodland ?? []) {
      const geometry = new THREE.ShapeGeometry(outline(ring)).rotateX(-Math.PI / 2);
      drapeElevation(geometry, 0.009, elevation);
      this.addJobSurface(job, geometry, woodland, 0);
    }

    job.clearance = mapClearance(snapshot);
    job.roadSegs = snapshot.roads.flatMap(road =>
      road.points.slice(1).flatMap((b, i) => {
        const a = road.points[i];
        const dx = b.x - a.x, dz = b.z - a.z;
        const len = Math.hypot(dx, dz);
        if (len < 0.5) return [];
        const tx = dx / len, tz = dz / len;
        return [{ road, ax: a.x, az: a.z, bx: b.x, bz: b.z, dx, dz, len, tx, tz, nx: -tz, nz: tx, widthM: road.widthM }];
      }),
    );
    this.crossings = job.crossings;
    this.mapData.clearance = job.clearance;
    this.mapData.elevation = elevation;
    job.phase = 1;
  }

  private stepPhase1Buildings(job: MapBuildJob, tStart: number, budgetMs: number): boolean {
    const { snapshot, elevation } = job;
    const clearance = job.clearance!;
    const groundY = (x: number, z: number) => elevation?.(x, z) ?? 0;

    while (job.buildingIndex < snapshot.buildings.length) {
      const b = snapshot.buildings[job.buildingIndex++];
      const cottage = cottageModel(b);
      const home = !!cottage;
      const church = b.kind === 'church';
      const isGiga =
        !church &&
        (!!b.tesla ||
          b.kind === 'gigafactory' ||
          (b.kind === 'large_building' &&
            b.areaM2 >= 220 &&
            job.gigaCount < 4 &&
            Math.abs(Math.round(b.centerX * 13 + b.centerZ * 7)) % 10 < 5));
      if (isGiga) job.gigaCount++;
      const factory = !church && !isGiga && b.kind === 'large_building';
      const height = church
        ? Math.max(6.5, Math.min(13, buildingWallHeight(b)))
        : isGiga
          ? Math.max(8.2, Math.min(13.2, buildingWallHeight(b)))
          : factory
            ? Math.min(11, buildingWallHeight(b))
            : buildingWallHeight(b);
      const shape = outline(b.footprint);
      const levels = b.footprint.flatMap((a, i) => {
        const bNext = b.footprint[(i + 1) % b.footprint.length];
        return [groundY(a.x, a.z), groundY((a.x + bNext.x) / 2, (a.z + bNext.z) / 2)];
      }).sort((x, y) => x - y);
      const highest = levels[levels.length - 1];
      const base = Math.max(levels[Math.floor(levels.length / 2)], highest - 0.8);
      const foundation = levels[0] - 0.3;
      const largeWallIdx = Math.abs(Math.round(b.centerX * 3 + b.centerZ * 5)) % largeBuildingWalls.length;
      const wall = cottage ? cottageWalls[cottage.index] : church ? churchWall : isGiga ? factoryWall : factory ? largeBuildingWalls[largeWallIdx] : walls[0];
      const frame = cottage ? cottageTrim[cottage.index] : trim;
      if (elevation) {
        const stone = new THREE.ExtrudeGeometry(shape, { depth: base - foundation + 0.06, bevelEnabled: false });
        this.jobBatchGeometry(job, stone.rotateX(-Math.PI / 2).translate(0, foundation, 0), foundationStone);
      }
      const body = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false });
      this.jobBatchGeometry(job, body.rotateX(-Math.PI / 2).translate(0, base, 0), wall);
      const gambrelLarge = [[0, 0], [0.22, 0.72], [0.5, 1], [0.78, 0.72], [1, 0]] as const;
      const roofShape = church ? ([[0, 0], [0.5, 1], [1, 0]] as const) : cottage ? cottage.roof : (!isGiga && b.widthM < 42 && b.depthM < 42 ? gambrelLarge : [[0, 0], [1, 0]] as const);
      const roofPitch = church ? 0.48 : cottage ? cottage.style.pitch : (!isGiga && b.widthM < 42 && b.depthM < 42 ? 0.34 : 0);
      const roofFootprint = expandPolygon(b.footprint, isGiga ? 0.08 : 0.54);
      const roofExpanded = roofFootprint !== b.footprint;
      const roofShapePoly = roofExpanded ? outline(roofFootprint) : shape;
      const profile = roofProjection(roofFootprint, roofShape, roofPitch, church ? 6.5 : 5.8);
      const roof = roofGeometry(roofShapePoly, profile);
      this.jobBatchGeometry(job, roof.snowCap.translate(0, height + base, 0), home || church || roofPitch > 0 ? roofCap : snow);
      this.jobBatchGeometry(job, roof.gables.translate(0, height + base, 0), wall);

      let buildingTopY = base + height + profile.rise;
      const corners = shape.getPoints();
      const interiorFace = THREE.ShapeUtils.triangulateShape(corners, [])[0];

      if (home && interiorFace) {
        const center = interiorFace.reduce((point, i) => point.add(corners[i]), new THREE.Vector2()).divideScalar(3);
        const size = Math.min(0.85, b.widthM * 0.12, b.depthM * 0.12);
        const stackTop = height + profile.yAt(profile.widthAt({ x: center.x, z: -center.y })) + 0.64;
        this.jobAddDetail(job, brick, center.x, (height + stackTop) / 2, -center.y, 0, size, stackTop - height, size, 0, base);
        this.jobAddDetail(job, eave, center.x, stackTop, -center.y, 0, size * 1.17, 0.16, size * 1.17, 0, base);
        this.jobAddDetail(job, snow, center.x, stackTop + 0.12, -center.y, 0, size * 1.28, 0.12, size * 1.28, 0, base);
        if (cottage.variation < 0.57) job.vents.push(new THREE.Vector3(center.x, base + stackTop + 0.18, -center.y));
        buildingTopY = Math.max(buildingTopY, base + stackTop + 0.25);
      }

      if (church) {
        job.churches.push({ x: b.centerX, z: b.centerZ, name: b.name });
        const tc = interiorFace
          ? interiorFace.reduce((pt, idx) => pt.add(corners[idx]), new THREE.Vector2()).divideScalar(3)
          : new THREE.Vector2(b.centerX, -b.centerZ);
        const cx = tc.x, cz = -tc.y;
        const tw = THREE.MathUtils.clamp(Math.min(b.widthM, b.depthM) * 0.42, 2.5, 4.8);
        const towerH = Math.max(4.4, height * 0.46);
        const spireH = Math.min(11.5, height * 0.72 + 2.5);
        const towerStart = height + profile.rise * 0.4;
        this.jobAddDetail(job, churchWall, cx, towerStart + towerH * 0.5, cz, 0, tw, towerH, tw, 0, base);
        for (let f = 0; f < 4; f++) {
          const ang = f * Math.PI * 0.5;
          this.jobAddDetail(
            job,
            windowArch,
            cx + Math.sin(ang) * (tw * 0.51),
            towerStart + towerH * 0.58,
            cz + Math.cos(ang) * (tw * 0.51),
            ang,
            tw * 0.42,
            towerH * 0.45,
            1,
            0,
            base
          );
        }
        const spireBase = towerStart + towerH;
        this.jobAddDetail(job, spireMat, cx, spireBase + spireH * 0.5, cz, 0, tw * 0.78, spireH, tw * 0.78, 0, base);
        this.jobAddDetail(job, starGold, cx, spireBase + spireH + 0.55, cz, 0, 0.55, 0.55, 0.55, 0, base);
        this.jobAddDetail(job, starGold, cx, spireBase + spireH + 0.55, cz, Math.PI * 0.5, 0.55, 0.55, 0.55, 0, base);
        job.lanterns.push(new THREE.Vector3(cx, base + towerStart + towerH * 0.5, cz));
        buildingTopY = base + spireBase + spireH + 1.1;
      }

      if (isGiga && b.widthM >= 8 && b.depthM >= 8) {
        let bestLen = 0;
        let bestYaw = 0;
        for (let i = 0; i < b.footprint.length; i++) {
          const p0 = b.footprint[i], p1 = b.footprint[(i + 1) % b.footprint.length];
          const len = Math.hypot(p1.x - p0.x, p1.z - p0.z);
          if (len > bestLen) {
            bestLen = len;
            bestYaw = Math.atan2(p1.x - p0.x, p1.z - p0.z);
          }
        }
        const solarW = Math.min(26, Math.max(7.2, bestLen * 0.72));
        const perp = b.areaM2 / Math.max(bestLen, 1);
        const solarD = Math.min(14, Math.max(4.5, perp * 0.66));
        if (clearance.inside({ x: b.centerX, z: b.centerZ }, b.footprint)) {
          const solarGeo = new THREE.PlaneGeometry(solarW, solarD).rotateX(-Math.PI * 0.5);
          const solarMesh = new THREE.Mesh(solarGeo, gigaSolarMat);
          solarMesh.position.set(b.centerX, base + height + 0.14, b.centerZ);
          solarMesh.rotation.y = bestYaw - Math.PI * 0.5;
          solarMesh.receiveShadow = true;
          job.group.add(solarMesh);
          job.resources.geometries.push(solarGeo);

          if (solarW >= 10 && solarD >= 6) {
            const hvacX = b.centerX + Math.sin(bestYaw) * (solarD * 0.34);
            const hvacZ = b.centerZ + Math.cos(bestYaw) * (solarD * 0.34);
            if (clearance.inside({ x: hvacX, z: hvacZ }, b.footprint)) {
              this.jobAddDetail(job, gigaRibMat, hvacX, height + 0.48, hvacZ, bestYaw, 1.8, 0.76, 1.4, 0, base);
              this.jobAddDetail(job, roofSnow, hvacX, height + 0.90, hvacZ, bestYaw, 1.9, 0.10, 1.5, 0, base);
            }
          }

          this.jobAddDetail(job, starGold, b.centerX, height + 1.85, b.centerZ, 0, 0.85, 0.85, 0.85, 0, base);
          this.jobAddDetail(job, starGold, b.centerX, height + 1.85, b.centerZ, Math.PI * 0.5, 0.85, 0.85, 0.85, 0, base);
          buildingTopY = Math.max(buildingTopY, base + height + 2.45);
        }
      }

      this.jobAddDetail(job, aoShadowMat, b.centerX, 0.022, b.centerZ, 0, Math.max(4, b.widthM * 1.24), Math.max(4, b.depthM * 1.24));
      job.buildingTargets.push({ id: b.id, x: b.centerX, roofY: buildingTopY, z: b.centerZ, isChurch: church });

      if (job.landmarkSigns < 3 && (isGiga || church)) {
        const text = isGiga ? 'GIGA TEXAS · JUL' : (b.name || 'KYRKA');
        const sign = createLandmarkLabelMesh(text, isGiga);
        sign.mesh.position.set(b.centerX, buildingTopY + 2.1, b.centerZ);
        job.group.add(sign.mesh);
        job.resources.dynamicAssets.push({ geometry: sign.mesh.geometry, material: sign.material, texture: sign.texture });
        job.landmarkSigns++;
      }

      const winding = THREE.ShapeUtils.isClockWise(shape.getPoints()) ? 1 : -1;
      const lengths = b.footprint.map((a, i) => {
        const c = b.footprint[(i + 1) % b.footprint.length];
        return Math.hypot(c.x - a.x, c.z - a.z);
      });
      const longest = Math.max(...lengths);
      const street = clearance.nearestStreet({ x: b.centerX, z: b.centerZ });
      const scores = b.footprint.map((a, i) => {
        const length = lengths[i];
        if (!street || length < 3) return length;
        const c = b.footprint[(i + 1) % b.footprint.length];
        const x = street.x - (a.x + c.x) / 2, z = street.z - (a.z + c.z) / 2;
        const facing = winding * ((c.z - a.z) * x - (c.x - a.x) * z) / (length * (Math.hypot(x, z) || 1));
        return length + facing * Math.min(25, longest * 1.6);
      });
      const mainFace = scores.indexOf(Math.max(...scores));
      const roofY = (value: number) => height + profile.yAt(value);

      for (let i = 0; i < b.footprint.length; i++) {
        const a = b.footprint[i], c = b.footprint[(i + 1) % b.footprint.length];
        const dx = c.x - a.x, dz = c.z - a.z;
        const length = lengths[i];
        if (length < 0.3) continue;
        const nx = winding * dz / length, nz = -winding * dx / length;
        const yaw = Math.atan2(nx, nz);
        const detail = (material: THREE.Material, t: number, y: number, width: number, tall: number, depth = 1, inset = 0.05) => {
          this.jobAddDetail(job, material, a.x + dx * t + nx * inset, y, a.z + dz * t + nz * inset, yaw, width, tall, depth, 0,
            material === lightPool ? undefined : base);
        };
        if (!home && !isGiga) {
          detail(eave, 0.5, height - 0.14, length + 0.4, 0.34, 0.32);
          detail(snow, 0.5, height + 0.06, length + 0.6, 0.22, 0.44);
        }
        if (!isGiga) {
          detail(home && cottage.style.finish === 'plaster' ? cedar : frame, 0.015, height / 2, 0.22, height, 0.20);
        }
        if (home) detail(cottage.style.finish === 'plaster' ? cedar : frame, 0.985, height / 2, 0.22, height, 0.20);
        if (cottage?.style.finish === 'logs' && length > 1) {
          const courses = Math.round(height / 0.29);
          for (let k = 0; k < courses; k++) {
            detail(logWood, 0.5, height * (k + 0.5) / courses, length + (k % 2 ? 0.15 : 0.05),
              height / courses * 1.04, 0.24, -0.075);
          }
        }
        if (isGiga && length >= 3.5) {
          // Authentic minimalist windowless white Giga Texas facade + glowing red LED roofline parapet
          detail(gigaDockMat, 0.5, 0.45, length + 0.10, 0.90, 0.22, 0.04);
          detail(gigaParapetMat, 0.5, height + 0.24, length + 0.24, 0.68, 0.28, 0.06);
          detail(roofSnow, 0.5, height + 0.62, length + 0.34, 0.16, 0.38, 0.06);
          detail(gigaRedLedMat, 0.5, height - 0.18, length + 0.28, 0.24, 0.14, 0.16);
          if (length >= 6) {
            detail(lightPool, 0.5, 0.07, Math.min(length, 28), 8.5, 1, 2.8);
          }

          if (i === mainFace && length >= 7) {
            // Giga Texas West Main Entrance: smoked floor-to-ceiling Cyber-Atrium glass + white cantilever canopy + TESLA sign + Megapack gifts
            const atriumW = Math.min(11.5, Math.max(4.4, length * 0.42));
            const atriumH = Math.max(4.4, height - 2.15);
            const atriumHalfT = (atriumW * 0.5 + 0.4) / length;

            detail(gigaAtriumMat, 0.5, atriumH * 0.5, atriumW, atriumH, 1, 0.09);
            for (const side of [-1, 1]) {
              detail(gigaCanopyDarkMat, 0.5 + side * (atriumW * 0.5 + 0.14) / length, atriumH * 0.5, 0.28, atriumH, 0.24, 0.08);
            }
            detail(gigaCanopyDarkMat, 0.5, atriumH + 0.12, atriumW + 0.56, 0.24, 0.26, 0.08);

            const signW = Math.min(9.0, Math.max(4.4, length * 0.36));
            const signY = height - 1.15;
            detail(gigaCanopyDarkMat, 0.5, signY, signW + 0.16, 1.24, 0.16, 0.08);
            detail(gigaSignMat, 0.5, signY, signW, 1.18, 1, 0.17);

            // Angular Cybertruck-inspired cantilevered overhang with glowing crimson LED leading lip & festive garland
            const canopyW = atriumW + 1.4;
            detail(gigaCanopyDarkMat, 0.5, 4.16, canopyW, 0.14, 2.55, 1.30);
            detail(gigaParapetMat, 0.5, 4.30, canopyW + 0.18, 0.22, 2.68, 1.34);
            detail(roofSnow, 0.5, 4.44, canopyW + 0.26, 0.12, 2.74, 1.34);
            detail(gigaRedLedMat, 0.5, 4.26, canopyW + 0.20, 0.12, 0.08, 2.69);
            detail(greenGarland, 0.5, 4.08, canopyW * 0.92, 0.14, 0.16, 2.52);

            // Precast panel pilasters on windowless outer wings
            const wingRibCount = Math.max(2, Math.floor(length / 6.5));
            for (let r = 1; r < wingRibCount; r++) {
              const rt = r / wingRibCount;
              if (Math.abs(rt - 0.5) < atriumHalfT) continue;
              detail(gigaRibMat, rt, (height - 0.4) * 0.5, 0.24, height - 0.5, 0.16, 0.07);
            }

            // Flanking holiday-wrapped Tesla Megapack battery gift crates on entrance plaza
            if (length >= atriumW + 4.4) {
              for (const side of [-1, 1]) {
                const mpT = 0.5 + side * (atriumW * 0.5 + 1.45) / length;
                detail(gigaParapetMat, mpT, 0.86, 1.25, 1.72, 0.86, 1.05);
                detail(marketRed, mpT, 0.86, 1.30, 0.22, 0.90, 1.05);
                detail(marketRed, mpT, 0.86, 0.22, 1.76, 0.90, 1.05);
                detail(starGold, mpT, 1.88, 0.26, 0.26, 0.26, 1.05);
              }
            }
          } else {
            // Windowless structural precast panel ribs + dark industrial loading dock bays on side/back elevations
            const ribCount = Math.max(2, Math.min(12, Math.floor(length / 6.5)));
            const dockPositions: number[] = [];
            if (length >= 10) {
              const dockCount = Math.min(5, Math.floor((length - 4) / 8.5));
              for (let d = 0; d < dockCount; d++) {
                dockPositions.push((d + 0.5) / dockCount);
              }
            }
            for (let d = 0; d < dockPositions.length; d++) {
              const dtPos = dockPositions[d];
              detail(gigaDockMat, dtPos, 1.50, 2.6, 3.0, 0.14, 0.06);
              detail(gigaCanopyDarkMat, dtPos, 3.12, 3.0, 0.18, 1.15, 0.62);
              detail(roofSnow, dtPos, 3.24, 3.1, 0.12, 1.22, 0.62);
              if (d % 2 === 0 && height >= 4.5) {
                detail(firWreath, dtPos, 3.65, 0.28, 0.28, 0.18, 0.14);
                detail(berries, dtPos, 3.44, 0.10, 0.08, 0.06, 0.19);
              }
            }
            for (let r = 1; r < ribCount; r++) {
              const rt = r / ribCount;
              if (dockPositions.some(dtPos => Math.abs(rt - dtPos) * length < 2.2)) continue;
              detail(gigaRibMat, rt, (height - 0.4) * 0.5, 0.24, height - 0.5, 0.16, 0.07);
            }
          }
        } else if (factory && length >= 6) {
          detail(frame, 0.5, Math.min(3.55, height * 0.52), length + 0.16, 0.18, 0.26);
          detail(roofLedge, 0.5, height - 0.24, length + 0.34, 0.46, 0.38);
          detail(lightPool, 0.5, 0.07, Math.min(length, 30), 9, 1, 2.8);
          const bays = Math.max(2, Math.min(14, Math.floor(length / 4.4)));
          const festivePanes = [glass, glassStar, glassCandles, glassTree];
          for (let bay = 0; bay < bays; bay++) {
            const t = (bay + 0.5) / bays;
            if (height > 5 && i === mainFace) {
              const wide = Math.min(2.8, length / bays * 0.64);
              detail(canopyWood, t, 3.4, wide + 0.5, 0.85, 0.8, 0.26);
              detail(canopySnow, t, 3.52, wide + 0.64, 0.85, 0.92, 0.26);
            }
            detail(frame, t - 0.46 / bays, height * 0.5, 0.20, height, 0.22);
            const paneMat = festivePanes[(i + bay) % festivePanes.length];
            detail(paneMat, t, Math.min(2.0, height * 0.3), Math.min(2.5, length / bays * 0.62), Math.min(2.3, height * 0.42), 1, 0.08);
            detail(frame, t, Math.min(2.0, height * 0.3) - Math.min(1.18, height * 0.22), Math.min(2.7, length / bays * 0.66), 0.14, 0.22, 0.11);
            if (height >= 6.8) {
              const upperPane = festivePanes[(i + bay + 2) % festivePanes.length];
              detail(upperPane, t, 5.3, Math.min(2.1, length / bays * 0.54), 1.75, 1, 0.08);
              detail(frame, t, 4.38, Math.min(2.3, length / bays * 0.58), 0.12, 0.20, 0.11);
            }
            if (height >= 10.2) {
              const topPane = festivePanes[(i + bay + 1) % festivePanes.length];
              detail(topPane, t, 8.3, Math.min(2.0, length / bays * 0.52), 1.65, 1, 0.08);
            }
          }
        }
        const hasDoor = !!cottage && i === mainFace && length > 2.8;
        const doorT = cottage && length > 5 ? (cottage.variation < 0.48 ? 0.24 : 0.74) : 0.5;
        if (hasDoor && cottage) {
          detail(frame, doorT, 0.99, 1.3, 1.99, 0.16);
          detail(cottageDoors[cottage.index], doorT, 0.96, 1.14, 1.88, 1, 0.093);
          const porch = cottage.style.porch;
          const depth = porch === 'porch' ? 0.98 : porch === 'awning' ? 0.65 : 0.42;
          detail(foundationStone, doorT, 0.075, 1.65, 0.15, depth + 0.32, (depth + 0.32) * 0.43);
          detail(cedar, doorT, 0.17, 1.38, 0.13, depth, depth * 0.4);
          {
            const pitch = porch === 'awning' ? 0.31 : 0.53;
            detail(canopyWood, doorT, 2.13 + pitch / 2, 1.65, pitch, depth, depth * 0.46);
            detail(canopySnow, doorT, 2.23 + pitch / 2, 1.78, pitch, depth + 0.13, depth * 0.46);
            detail(greenGarland, doorT, 2.03, 1.56, 0.14, 0.22, depth * 0.82);
            for (let k = -3; k <= 3; k++) {
              detail(lightStrings[k % 2 ? 1 : 0], doorT + k * 0.21 / length, 2.01, 0.065, 0.078, 0.065, depth + 0.03);
            }
          }
          if (porch === 'porch') {
            for (const side of [-1, 1]) {
              detail(frame, doorT + side * 0.72 / length, 1.05, 0.15, 1.98, 0.15, 0.85);
            }
          }
          detail(lightPool, doorT, 0.073, 5.6, 4.2, 1, 1.25);
          detail(firWreath, doorT, 1.26, 0.19, 0.19, 0.15, 0.15);
          detail(berries, doorT, 1.06, 0.095, 0.06, 0.044, 0.19);
          const lampT = doorT + 0.82 / length;
          detail(cedar, lampT, 1.74, 0.26, 0.36, 0.24, 0.16);
          detail(lantern, lampT, 1.74, 0.2, 0.23, 0.23, 0.19);
          detail(cedar, lampT, 1.93, 0.34, 0.065, 0.34, 0.17);
          job.lanterns.push(new THREE.Vector3(a.x + dx * lampT + nx * 0.43, base + 1.74, a.z + dz * lampT + nz * 0.43));
          const yard = doorT < 0.5 ? 0.76 : 0.24;
          job.yards.push({ x: a.x + dx * yard + nx * 2.3, z: a.z + dz * yard + nz * 2.3, yaw, index: cottage.index });
        }
        if (cottage) {
          const eaveOut = roofExpanded ? 0.50 : 0.11;
          const axisA = profile.widthAt(a), axisB = profile.widthAt(c);
          const ridgeStops = profile.sections.map(p => (p - axisA) / (axisB - axisA)).filter(t => t > 0 && t < 1).sort((a, c) => a - c);
          const stops = [0, ...ridgeStops, 1];
          for (let j = 1; j < stops.length; j++) {
            const from = stops[j - 1], to = stops[j], t = (from + to) * 0.5;
            const y1 = roofY(THREE.MathUtils.lerp(axisA, axisB, from));
            const y2 = roofY(THREE.MathUtils.lerp(axisA, axisB, to));
            const run = (to - from) * length, dy = y2 - y1;
            const edgeLength = Math.hypot(run, dy);
            const slope = -winding * Math.atan2(dy, run);
            const x = a.x + dx * t, z = a.z + dz * t, y = (y1 + y2) * 0.5;
            this.jobAddDetail(job, cedar, x + nx * eaveOut, y - 0.14, z + nz * eaveOut, yaw, edgeLength + 0.55, 0.26, 0.44, slope, base);
            this.jobAddDetail(job, frame, x + nx * (eaveOut + 0.16), y - 0.15, z + nz * (eaveOut + 0.16), yaw, edgeLength + 0.58, 0.14, 0.12, slope, base);
            this.jobAddDetail(job, roofSnow, x + nx * eaveOut, y + 0.06, z + nz * eaveOut, yaw, edgeLength + 0.68, 0.28, 0.52, slope, base);
            if (length < 2.5) continue;
            if (i === mainFace || Math.abs(dy) > 0.3) {
              this.jobAddDetail(job, greenGarland, x + nx * (eaveOut + 0.18), y - 0.29, z + nz * (eaveOut + 0.18), yaw, edgeLength + 0.3, 0.17, 0.17, slope, base);
            }
            const lamps = Math.min(12, Math.ceil(edgeLength * 1.15));
            for (let k = 0; k < lamps; k++) {
              const u = (k + 0.5) / lamps;
              const position = THREE.MathUtils.lerp(from, to, u);
              const edgeY = THREE.MathUtils.lerp(y1, y2, u);
              detail(lightStrings[(k + cottage.index) % 7 < 4 ? 0 : (k + cottage.index) % lightStrings.length],
                position, edgeY - 0.32, 0.08, 0.105, 0.08, eaveOut + 0.24);
              if (k % 3 === 0) {
                const drop = 0.22 + (k * 7 + j * 3) % 8 * 0.032;
                detail(icicleMaterial, position, edgeY - drop / 2, 0.052, drop, 0.054, eaveOut + 0.19);
                detail(powder, position, edgeY + 0.10, Math.min(0.85, run / lamps * 1.5), 0.18, 0.28, eaveOut + 0.15);
              }
            }
          }
          const gableHeight = roofY((axisA + axisB) * 0.5) - height;
          if (length > 3 && Math.abs(axisA - axisB) > 0.55 && gableHeight > 1.05) {
            const framed = cottage.style.finish === 'plaster';
            if (framed) {
              detail(cedar, 0.5, height + 0.12, length, 0.15, 0.13);
              for (const t of [0.28, 0.72]) {
                const h = roofY(THREE.MathUtils.lerp(axisA, axisB, t)) - height - 0.28;
                if (h > 0.2) detail(cedar, t, height + 0.18 + h / 2, 0.14, h, 0.13);
              }
            }
            if (cottage.style.attic) detail(windowRound, 0.5, height + gableHeight * 0.48, 0.71, 0.71, 1, 0.10);
          }
          if (cottage.style.attic && profile.rise > 1 && length > 6 && Math.abs(axisA - axisB) < 0.15 &&
            scores[i] > longest * 0.35) {
            const count = length >= 9.5 && cottage.style.windows === 2 ? 2 : 1;
            for (let dormer = 0; dormer < count; dormer++) {
              const t = count === 2 ? 0.32 + dormer * 0.36 : 0.5;
              const x = a.x + dx * t, z = a.z + dz * t;
              const width = Math.min(1.4, length * 0.17);
              const slopePoint = (depth: number, side = 0) => ({
                x: x - nx * depth + dx / length * side, z: z - nz * depth + dz / length * side,
              });
              const fits = [0.42, 1.78].every(depth => [-width * 0.58, width * 0.58].every(side =>
                clearance.inside(slopePoint(depth, side), b.footprint)));
              if (!fits) continue;
              const front = roofY(profile.widthAt(slopePoint(0.45)));
              const back = roofY(profile.widthAt(slopePoint(1.75)));
              const top = Math.max(front + 0.88, back + 0.29);
              detail(wall, t, (height + top) * 0.5, width, top - height, 1.28, -1.1);
              detail(canopyWood, t, top + 0.19, width + 0.2, 0.42, 1.31, -1.08);
              detail(canopySnow, t, top + 0.28, width + 0.34, 0.42, 1.4, -1.08);
              detail(windowRound, t, top - 0.37, 0.61, 0.61, 1, -0.434);
              detail(frame, t, top - 0.7, 0.78, 0.1, 0.19, -0.42);
            }
          }
        }
        if (cottage) {
          const count = length >= 5.8 ? Math.max(2, cottage.style.windows) : 1;
          const wide = cottage.style.finish === 'plaster' ? 1.48 : 1.18;
          const festivePanes = [glass, glassStar, glassCandles, glassTree];
          if (height >= 3.45) {
            detail(frame, 0.5, height * 0.52, length + 0.08, 0.10, 0.16);
          }
          for (let j = 0; j < count; j++) {
            const paneMat = festivePanes[(cottage.index + i + j) % festivePanes.length];
            const window = cottage.style.finish === 'plaster' ? windowArch : paneMat;
            const t = hasDoor
              ? THREE.MathUtils.lerp(doorT < 0.5 ? 0.48 : 0.08, doorT < 0.5 ? 0.92 : 0.52, (j + 0.5) / count)
              : (j + 0.5) / count;
            if (length < wide + 0.8 || (hasDoor && Math.abs(t - doorT) * length < 1.28)) continue;
            const y = 1.45;
            if (i === mainFace && j === 0 && length >= 6 && cottage.style.finish !== 'logs' &&
              cottage.variation > 0.24 && (!hasDoor || Math.abs(t - doorT) * length > 1.85)) {
              detail(bayWood, t, 0, 1, 1, 1, 0.03);
              detail(paneMat, t, 1.37, 0.94, 1.04, 1, 0.48);
              for (const side of [-1, 1]) {
                const angle = side * Math.atan2(0.46, 0.35);
                const offset = side * 0.71;
                this.jobAddDetail(job, glass, a.x + dx * t + Math.cos(yaw) * offset + nx * 0.26, 1.37,
                  a.z + dz * t - Math.sin(yaw) * offset + nz * 0.26, yaw + angle, 0.47, 1.02, 1, 0, base);
              }
              detail(greenGarland, t, 0.74, 1.12, 0.17, 0.19, 0.50);
              detail(lightPool, t, 0.064, 4.4, 3.4, 1, 1.4);
            } else {
              detail(window, t, y, wide, 1.12, 1, 0.09);
              detail(frame, t, y + 0.58, wide + 0.20, 0.11, 0.18, 0.10);
              detail(frame, t, y - 0.56, wide + 0.22, 0.14, 0.26, 0.13);
              detail(powder, t, y - 0.46, (wide + 0.18) / 2, 0.08, 0.18, 0.15);
              if (cottage.style.finish !== 'plaster') {
                for (const side of [-1, 1]) {
                  detail(frame, t + side * (wide * 0.5 + 0.06) / length, y, 0.12, 1.22, 0.14);
                  if (cottage.style.finish === 'boards' && length > 4.5) {
                    const offset = t + side * (wide * 0.5 + 0.26) / length;
                    detail(shutters[cottage.index], offset, y, 0.30, 0.98, 0.11, 0.095);
                    for (const yOffset of [-0.25, 0.25]) {
                      detail(frame, offset, y + yOffset, 0.26, 0.044, 0.034, 0.16);
                    }
                  }
                }
              }
              if (i === mainFace || (cottage.style.finish === 'plaster' && length > 4)) {
                detail(cedar, t, y - 0.70, wide * 0.92, 0.18, 0.28, 0.19);
                detail(greenGarland, t, y - 0.59, wide * 0.91, 0.16, 0.25, 0.28);
                for (const offset of [-0.28, 0, 0.28]) {
                  detail(berries, t + offset * wide / length, y - 0.54, 0.056, 0.06, 0.056, 0.39);
                }
                detail(lightPool, t, 0.063, 4.2, 3.4, 1, 1.25);
              }
            }
            if (height >= 3.55 && (!hasDoor || Math.abs(t - doorT) * length > 1.35)) {
              const upperMat = festivePanes[(cottage.index + i + j + 1) % festivePanes.length];
              const uy = height - 0.92;
              detail(upperMat, t, uy, wide * 0.86, 0.92, 1, 0.085);
              detail(frame, t, uy - 0.48, wide * 0.86 + 0.18, 0.11, 0.22, 0.12);
              for (const side of [-1, 1]) {
                detail(frame, t + side * (wide * 0.43 + 0.05) / length, uy, 0.10, 0.98, 0.12);
              }
            }
          }
        } else if (!factory && !isGiga && !home && !church && length > 3.6) {
          detail(windowArch, 0.5, height * 0.43, 1.5, Math.min(3, height * 0.39));
        }
        if (home) {
          detail(foundationStone, 0.5, 0.24, length + 0.12, 0.48, 0.20);
          continue;
        }
        if (isGiga) continue;
        if (length > 1) detail(cable, 0.5, height - 0.27, length, 0.03, 0.03, 0.14);
        const ornaments = Math.min(20, Math.floor(length / 0.85));
        for (let j = 0; j < ornaments; j++) {
          const t = (j + 0.5) / ornaments;
          const dip = Math.sin(Math.PI * t) * 0.28;
          detail(lightStrings[(j + i) % lightStrings.length], t, height - 0.23 - dip, 0.085, 0.105, 0.085, 0.14);
        }
      }

      if (job.buildingIndex % 6 === 0 && performance.now() - tStart >= budgetMs) {
        return false;
      }
    }

    job.phase = 2;
    return performance.now() - tStart < budgetMs;
  }

  private stepPhase2RoadPropsAndMerge(job: MapBuildJob, tStart: number, budgetMs: number): boolean {
    const { snapshot, elevation, junctions, roadSegs } = job;
    const clearance = job.clearance!;
    const groundY = (x: number, z: number) => elevation?.(x, z) ?? 0;

    if (!job.roadPropsDone) {
      job.roadPropsDone = true;
      const nearestRoadSeg = (x: number, z: number, maxDist = 20) => {
        let best: { seg: RoadSeg; cx: number; cz: number; dist: number } | undefined;
        let bestDist = maxDist;
        for (const seg of roadSegs) {
          const t = THREE.MathUtils.clamp(((x - seg.ax) * seg.dx + (z - seg.az) * seg.dz) / (seg.len * seg.len), 0, 1);
          const cx = seg.ax + seg.dx * t;
          const cz = seg.az + seg.dz * t;
          const dist = Math.hypot(x - cx, z - cz);
          if (dist < bestDist) {
            bestDist = dist;
            best = { seg, cx, cz, dist };
          }
        }
        return best;
      };

      const lampSpots: OsmPoint2D[] = [];
      const placeLamp = (px: number, pz: number, toRoadX: number, toRoadZ: number, armReach = 1.12, minDistSq = 0.22) => {
        if (lampSpots.length >= 88 || Math.hypot(px, pz) > 280) return;
        if (lampSpots.some(q => Math.hypot(q.x - px, q.z - pz) < 16)) return;
        if (!clearance.clear({ x: px, z: pz }, minDistSq)) return;
        lampSpots.push({ x: px, z: pz });
        const rLen = Math.hypot(toRoadX, toRoadZ) || 1;
        const ax = toRoadX / rLen, az = toRoadZ / rLen;
        const yaw = Math.atan2(ax, az);
        this.jobAddDetail(job, aoShadowMat, px, 0.021, pz, 0, 1.35, 1.35);
        this.jobAddDetail(job, lampIronMat, px, 0.25, pz, 0, 0.24, 0.50, 0.24);
        this.jobAddDetail(job, lampIronMat, px, 2.35, pz, 0, 0.11, 4.7, 0.11);
        this.jobAddDetail(job, lampIronMat, px + ax * (armReach * 0.5), 4.62, pz + az * (armReach * 0.5), yaw, 0.09, 0.09, armReach + 0.08);
        this.jobAddDetail(job, lampIronMat, px + ax * armReach, 4.54, pz + az * armReach, 0, 0.28, 0.11, 0.28);
        this.jobAddDetail(job, lampOrbMat, px + ax * armReach, 4.35, pz + az * armReach, 0, 0.14, 0.19, 0.14);
        this.jobAddDetail(job, firWreath, px + ax * 0.11, 3.72, pz + az * 0.11, yaw, 0.22, 0.22, 0.22);
        this.jobAddDetail(job, berries, px + ax * 0.18, 3.92, pz + az * 0.18, 0, 0.06, 0.06, 0.06);
        this.jobAddDetail(job, lightPool, px + ax * (armReach * 0.92), 0.062, pz + az * (armReach * 0.92), 0, 5.2, 5.2);
        job.lanterns.push(new THREE.Vector3(px + ax * armReach, groundY(px, pz) + 4.35, pz + az * armReach));
      };
      for (const lamp of snapshot.streetLamps ?? []) {
        const hit = nearestRoadSeg(lamp.x, lamp.z, 12);
        let lx = lamp.x, lz = lamp.z;
        if (hit && hit.dist < hit.seg.widthM * 0.5 + 1.45) {
          const outX = lamp.x - hit.cx, outZ = lamp.z - hit.cz;
          const outLen = Math.hypot(outX, outZ) || 1;
          const targetOut = hit.seg.widthM * 0.5 + 1.90;
          lx = hit.cx + (outX / outLen) * targetOut;
          lz = hit.cz + (outZ / outLen) * targetOut;
        }
        placeLamp(lx, lz, hit ? hit.cx - lx : 0, hit ? hit.cz - lz : 1, 1.12, 0.08);
      }
      let lampSideIdx = 0;
      for (const road of snapshot.roads) {
        let nextMark = 14;
        let traveled = 0;
        for (let i = 1; i < road.points.length; i++) {
          const a = road.points[i - 1], b = road.points[i];
          const dx = b.x - a.x, dz = b.z - a.z;
          const len = Math.hypot(dx, dz);
          if (len < 1) continue;
          const nx = -dz / len, nz = dx / len;
          while (traveled + len >= nextMark && lampSpots.length < 88) {
            const f = (nextMark - traveled) / len;
            const cx = a.x + dx * f, cz = a.z + dz * f;
            const side = lampSideIdx++ % 2 === 0 ? 1 : -1;
            const shoulder = road.widthM * 0.5 + 1.95;
            placeLamp(cx + nx * side * shoulder, cz + nz * side * shoulder, -nx * side, -nz * side, 1.12);
            nextMark += 34;
          }
          traveled += len;
        }
      }

      const zebraSpots: OsmPoint2D[] = [];
      const zebraCandidates: OsmPoint2D[] = [...(snapshot.crossings ?? [])];
      for (const j of junctions.values()) {
        for (const seg of roadSegs) {
          if (seg.len < j.radius + 4.5) continue;
          const dA = Math.hypot(seg.ax - j.point.x, seg.az - j.point.z);
          const dB = Math.hypot(seg.bx - j.point.x, seg.bz - j.point.z);
          if (dA < 1.2) {
            zebraCandidates.push({ x: seg.ax + seg.tx * (j.radius + 2.4), z: seg.az + seg.tz * (j.radius + 2.4) });
          } else if (dB < 1.2) {
            zebraCandidates.push({ x: seg.bx - seg.tx * (j.radius + 2.4), z: seg.bz - seg.tz * (j.radius + 2.4) });
          }
        }
      }
      for (const cand of zebraCandidates) {
        if (zebraSpots.length >= 36 || Math.hypot(cand.x, cand.z) > 265) continue;
        const hit = nearestRoadSeg(cand.x, cand.z, 6.5);
        if (!hit) continue;
        if (zebraSpots.some(q => Math.hypot(q.x - hit.cx, q.z - hit.cz) < 16)) continue;
        zebraSpots.push({ x: hit.cx, z: hit.cz });
        const { seg, cx, cz } = hit;
        const yaw = Math.atan2(seg.tx, seg.tz);
        const halfSpan = Math.max(1.6, seg.widthM * 0.5 - 0.72);
        const stripes = Math.max(4, Math.min(7, Math.floor((halfSpan * 2) / 0.85)));
        for (let s = 0; s < stripes; s++) {
          const lat = THREE.MathUtils.lerp(-halfSpan, halfSpan, (s + 0.5) / stripes);
          this.jobAddDetail(job, zebraMat, cx + seg.nx * lat, 0.060, cz + seg.nz * lat, yaw, 0.42, 2.45);
        }
      }

      const signalSpots: OsmPoint2D[] = [];
      const signalCandidates: OsmPoint2D[] = [
        ...(snapshot.trafficSignals ?? []),
        ...[...junctions.values()].sort((a, b) => b.radius - a.radius).map(j => j.point),
      ];
      for (const sc of signalCandidates) {
        if (signalSpots.length >= 6 || Math.hypot(sc.x, sc.z) > 255) continue;
        if (signalSpots.some(q => Math.hypot(q.x - sc.x, q.z - sc.z) < 48)) continue;
        const hit = nearestRoadSeg(sc.x, sc.z, 14);
        if (!hit) continue;
        const { seg } = hit;
        let px = sc.x, pz = sc.z;
        let valid = hit.dist >= seg.widthM * 0.5 + 1.4 && clearance.clear({ x: px, z: pz }, 0.25);
        if (!valid) {
          for (const side of [1, -1]) {
            const tx = hit.cx + seg.nx * side * (seg.widthM * 0.5 + 1.85);
            const tz = hit.cz + seg.nz * side * (seg.widthM * 0.5 + 1.85);
            if (clearance.clear({ x: tx, z: tz }, 0.22)) {
              px = tx;
              pz = tz;
              valid = true;
              break;
            }
          }
        }
        if (!valid) continue;
        signalSpots.push({ x: px, z: pz });
        const inX = hit.cx - px, inZ = hit.cz - pz;
        const inLen = Math.hypot(inX, inZ) || 1;
        const yaw = Math.atan2(inX / inLen, inZ / inLen);
        const sigGroup = new THREE.Group();
        sigGroup.position.set(px, groundY(px, pz), pz);
        sigGroup.rotation.y = yaw;
        const mast = new THREE.Mesh(boxUnit, lampIronMat);
        mast.scale.set(0.14, 4.7, 0.14);
        mast.position.y = 2.35;
        mast.castShadow = true;
        const arm = new THREE.Mesh(boxUnit, lampIronMat);
        arm.scale.set(0.10, 0.10, 1.85);
        arm.position.set(0, 4.58, 0.87);
        const housing = new THREE.Mesh(boxUnit, signalHousingMat);
        housing.scale.set(0.32, 0.94, 0.28);
        housing.position.set(0, 4.35, 1.72);
        const wreath = new THREE.Mesh(fir, firWreath);
        wreath.scale.setScalar(0.24);
        wreath.position.set(0, 3.25, 0.08);
        const bow = new THREE.Mesh(starGeometry, starGold);
        bow.scale.setScalar(0.14);
        bow.position.set(0, 3.49, 0.12);
        const redMat = new THREE.MeshBasicMaterial({ color: 0x320c13, toneMapped: false });
        const amberMat = new THREE.MeshBasicMaterial({ color: 0x332008, toneMapped: false });
        const greenMat = new THREE.MeshBasicMaterial({ color: 0x38f28c, toneMapped: false });
        job.resources.dynamicAssets.push({ material: redMat }, { material: amberMat }, { material: greenMat });
        job.signalNodes.push({ red: redMat, amber: amberMat, green: greenMat, phase: (signalSpots.length - 1) * 6.0 });
        const lensDefs: Array<[THREE.MeshBasicMaterial, number]> = [[redMat, 4.63], [amberMat, 4.35], [greenMat, 4.07]];
        for (const [lMat, ly] of lensDefs) {
          for (const sideZ of [-0.145, 0.145]) {
            const lens = new THREE.Mesh(signalLensGeo, lMat);
            lens.position.set(0, ly, 1.72 + sideZ);
            sigGroup.add(lens);
          }
        }
        sigGroup.add(mast, arm, housing, wreath, bow);
        job.group.add(sigGroup);
      }
      job.batchKeys = [...job.batches.keys()];
      job.batchMergeIdx = 0;
      if (performance.now() - tStart >= budgetMs) return false;
    }

    const keys = job.batchKeys ?? [];
    while (job.batchMergeIdx < keys.length) {
      const material = keys[job.batchMergeIdx++];
      const parts = job.batches.get(material);
      if (parts) {
        const geometry = mergeGeometries(parts);
        if (geometry) {
          this.addJobSurface(job, geometry, material);
          job.group.children.at(-1)!.castShadow = true;
        }
        parts.forEach(part => part.dispose());
        job.batches.delete(material);
      }
      if (performance.now() - tStart >= budgetMs) return false;
    }

    job.phase = 3;
    return performance.now() - tStart < budgetMs;
  }

  private stepPhase3Nature(job: MapBuildJob, tStart: number, budgetMs: number): boolean {
    const { snapshot, elevation, roadSegs, yards } = job;
    const clearance = job.clearance!;
    const groundY = (x: number, z: number) => elevation?.(x, z) ?? 0;
    const nearestRoadSeg = (x: number, z: number, maxDist = 60) => {
      let best: { seg: RoadSeg; cx: number; cz: number; dist: number } | undefined;
      let bestDist = maxDist;
      for (const seg of roadSegs) {
        const t = THREE.MathUtils.clamp(((x - seg.ax) * seg.dx + (z - seg.az) * seg.dz) / (seg.len * seg.len), 0, 1);
        const cx = seg.ax + seg.dx * t;
        const cz = seg.az + seg.dz * t;
        const dist = Math.hypot(x - cx, z - cz);
        if (dist < bestDist) {
          bestDist = dist;
          best = { seg, cx, cz, dist };
        }
      }
      return best;
    };

    const planted: OsmPoint2D[] = [];
    const plant = (p: OsmPoint2D) => {
      if (clearance.clear(p, 2.12) && !planted.some(q => Math.hypot(p.x - q.x, p.z - q.z) < 4.4)) planted.push(p);
    };
    for (const p of snapshot.trees ?? []) plant(p);
    for (const ring of snapshot.woodland ?? []) {
      const minX = Math.min(...ring.map(p => p.x)), maxX = Math.max(...ring.map(p => p.x));
      const minZ = Math.min(...ring.map(p => p.z)), maxZ = Math.max(...ring.map(p => p.z));
      for (let i = 1; i <= 27; i++) {
        const x = THREE.MathUtils.lerp(minX, maxX, i * 0.618034 % 1);
        const z = THREE.MathUtils.lerp(minZ, maxZ, i * 0.414214 % 1);
        if (Math.hypot(x, z) < 280 && clearance.inside({ x, z }, ring)) {
          plant({ x, z });
          if (clearance.clear({ x, z }, 1.8) && job.woodlands.length < 12) {
            job.woodlands.push({ x, z });
          }
        }
      }
    }
    if (!job.woodlands.length && snapshot.forests.length) {
      for (const patch of snapshot.forests.slice(0, 6)) {
        const pt = { x: patch.centerX + 3.2, z: patch.centerZ - 2.4 };
        if (clearance.clear(pt, 1.8)) job.woodlands.push(pt);
      }
    }

    let marketStalls = 0;
    let snowLanterns = 0;
    for (const [wIdx, spot] of job.woodlands.entries()) {
      const hit = nearestRoadSeg(spot.x, spot.z, 60);
      const faceYaw = hit ? Math.atan2(hit.cx - spot.x, hit.cz - spot.z) : wIdx * 0.8;
      if (wIdx % 2 === 0 && marketStalls < 8 && clearance.clear(spot, 1.8) &&
        !planted.some(t => Math.hypot(t.x - spot.x, t.z - spot.z) < 3.2)) {
        marketStalls++;
        const sx = spot.x, sz = spot.z;
        const cosY = Math.cos(faceYaw), sinY = Math.sin(faceYaw);
        this.jobAddDetail(job, aoShadowMat, sx, 0.021, sz, faceYaw, 3.6, 2.5);
        this.jobAddDetail(job, cedar, sx, 0.50, sz, faceYaw, 2.35, 1.0, 1.05);
        for (const px of [-1.05, 1.05]) {
          for (const pz of [-0.45, 0.45]) {
            this.jobAddDetail(job, cedar, sx + cosY * px + sinY * pz, 1.15, sz - sinY * px + cosY * pz, faceYaw, 0.11, 2.3, 0.11);
          }
        }
        for (let b = -1; b <= 1; b++) {
          const matStripe = (b + 1) % 2 === 0 ? marketRed : marketCream;
          this.jobAddDetail(job, matStripe, sx + cosY * (b * 0.78), 2.32, sz - sinY * (b * 0.78), faceYaw, 0.78, 0.16, 1.55);
        }
        this.jobAddDetail(job, roofSnow, sx, 2.45, sz, faceYaw, 2.65, 0.14, 1.75);
        this.jobAddDetail(job, lampOrbMat, sx, 1.98, sz + cosY * 0.35, 0, 0.16, 0.16, 0.16);
        this.jobAddDetail(job, lightPool, sx, 0.068, sz, 0, 6.2, 6.2);
        this.jobAddDetail(job, firWreath, sx + sinY * 0.56, 0.58, sz + cosY * 0.56, faceYaw, 0.24, 0.24, 0.24);
      } else if (snowLanterns < 12 && clearance.clear(spot, 0.85)) {
        snowLanterns++;
        this.jobAddDetail(job, aoShadowMat, spot.x, 0.021, spot.z, 0, 1.4, 1.4);
        for (let a = 0; a < 5; a++) {
          const ang = (a / 5) * Math.PI * 2;
          this.jobAddDetail(job, snowmanSnow, spot.x + Math.cos(ang) * 0.32, 0.17, spot.z + Math.sin(ang) * 0.32, 0, 0.22, 0.22, 0.22);
          this.jobAddDetail(job, snowmanSnow, spot.x + Math.cos(ang + 0.3) * 0.19, 0.41, spot.z + Math.sin(ang + 0.3) * 0.19, 0, 0.16, 0.16, 0.16);
        }
        this.jobAddDetail(job, lampOrbMat, spot.x, 0.32, spot.z, 0, 0.16, 0.18, 0.16);
        this.jobAddDetail(job, lightPool, spot.x, 0.066, spot.z, 0, 3.8, 3.8);
      }
    }

    const ornaments: { x: number; z: number; radius: number }[] = [];
    const available = (p: OsmPoint2D, radius: number) => clearance.clear(p, radius) &&
      !planted.some(tree => Math.hypot(p.x - tree.x, p.z - tree.z) < radius + 2.12) &&
      !ornaments.some(q => Math.hypot(p.x - q.x, p.z - q.z) < radius + q.radius);
    for (const [i, yard] of yards.entries()) {
      const { x, z, yaw, index } = yard;
      if (i % 3 !== 1 || ornaments.length >= 22 || !available(yard, 0.83)) continue;
      ornaments.push({ x, z, radius: 0.83 });
      const scale = 0.73 + (index % 4) * 0.09;
      const frontX = Math.sin(yaw), frontZ = Math.cos(yaw);
      this.jobAddDetail(job, aoShadowMat, x, 0.022, z, 0, 1.45 * scale, 1.45 * scale);
      this.jobAddDetail(job, snowmanSnow, x, 0.42 * scale, z, yaw, 0.46 * scale, 0.44 * scale, 0.46 * scale);
      this.jobAddDetail(job, snowmanSnow, x, 0.99 * scale, z, yaw, 0.34 * scale, 0.36 * scale, 0.34 * scale);
      this.jobAddDetail(job, snowmanSnow, x, 1.46 * scale, z, yaw, 0.28 * scale, 0.27 * scale, 0.28 * scale);
      this.jobAddDetail(job, scarves[index % scarves.length], x, 1.25 * scale, z, yaw, 0.26 * scale, 0.19 * scale, 0.26 * scale);
      this.jobAddDetail(job, hat, x, 1.67 * scale, z, yaw, 0.34 * scale, 0.07 * scale, 0.32 * scale);
      this.jobAddDetail(job, hat, x, 1.81 * scale, z, yaw, 0.21 * scale, 0.29 * scale, 0.21 * scale);
      this.jobAddDetail(job, carrot, x + frontX * 0.32 * scale, 1.44 * scale, z + frontZ * 0.32 * scale, yaw, 0.063 * scale, 0.23 * scale, 0.063 * scale);
      for (const side of [-1, 1]) {
        this.jobAddDetail(job, coal, x + (frontX * 0.248 + frontZ * side * 0.085) * scale, 1.52 * scale,
          z + (frontZ * 0.248 - frontX * side * 0.085) * scale, yaw, 0.032 * scale, 0.042 * scale, 0.032 * scale);
      }
    }

    let drifts = 0;
    for (const [i, yard] of yards.entries()) {
      if (drifts >= 62) break;
      const side = i % 2 === 0 ? 1 : -1;
      const distance = 3.1 + i % 4;
      const x = yard.x + Math.cos(yard.yaw) * side * distance + Math.sin(yard.yaw) * 1.1;
      const z = yard.z - Math.sin(yard.yaw) * side * distance + Math.cos(yard.yaw) * 1.1;
      const radius = 1.7 + i % 5 * 0.24;
      if (!available({ x, z }, radius)) continue;
      ornaments.push({ x, z, radius });
      this.jobAddDetail(job, powder, x, -0.03, z, yard.yaw + i * 0.7, radius, 0.21 + i % 5 * 0.065, radius * 0.62);
      drifts++;
    }

    const landscapeOccupied: OsmPoint2D[] = [...planted];
    const landscapeClear = (pt: OsmPoint2D, r: number) =>
      Math.hypot(pt.x, pt.z) < 255 &&
      clearance.clear(pt, r) &&
      !landscapeOccupied.some(q => Math.hypot(q.x - pt.x, q.z - pt.z) < r + 2.4) &&
      !ornaments.some(q => Math.hypot(q.x - pt.x, q.z - pt.z) < r + q.radius);

    let fenceRuns = 0;
    for (let rIdx = 0; rIdx < snapshot.roads.length && fenceRuns < 18; rIdx++) {
      const road = snapshot.roads[rIdx];
      for (let i = 1; i < road.points.length && fenceRuns < 18; i++) {
        const a = road.points[i - 1], b = road.points[i];
        const dx = b.x - a.x, dz = b.z - a.z;
        const len = Math.hypot(dx, dz);
        if (len < 12) continue;
        const tx = dx / len, tz = dz / len;
        const nx = -tz, nz = tx;
        const side = (rIdx + i) % 2 === 0 ? 1 : -1;
        const fx = (a.x + b.x) * 0.5 + nx * side * (road.widthM * 0.5 + 3.4);
        const fz = (a.z + b.z) * 0.5 + nz * side * (road.widthM * 0.5 + 3.4);
        if (!landscapeClear({ x: fx, z: fz }, 2.6)) continue;
        landscapeOccupied.push({ x: fx, z: fz });
        fenceRuns++;
        const yaw = Math.atan2(tx, tz);
        const posts = 4;
        const span = 8.4;
        for (let p = 0; p < posts; p++) {
          const u = (p / (posts - 1) - 0.5) * span;
          this.jobAddDetail(job, fenceWoodMat, fx + tx * u, 0.52, fz + tz * u, yaw, 0.14, 1.04, 0.14);
        }
        this.jobAddDetail(job, fenceWoodMat, fx, 0.42, fz, yaw, 0.10, 0.10, span);
        this.jobAddDetail(job, fenceWoodMat, fx, 0.80, fz, yaw, 0.10, 0.10, span);
        this.jobAddDetail(job, roofSnow, fx, 0.88, fz, yaw, 0.14, 0.08, span);
      }
    }

    let boulderClusters = 0;
    let birchCount = 0;
    let gazebos = 0;
    for (let ring = 14; ring <= 215 && (boulderClusters < 28 || birchCount < 32); ring += 18) {
      for (let step = 0; step < 12; step++) {
        const ang = (step / 12) * Math.PI * 2 + ring * 0.17;
        const px = Math.cos(ang) * ring;
        const pz = Math.sin(ang) * ring;
        if (!landscapeClear({ x: px, z: pz }, 2.4)) continue;
        const hash = Math.abs(Math.sin(px * 12.9898 + pz * 78.233));

        if (gazebos < 4 && ring >= 26 && ring <= 145 && hash > 0.84) {
          gazebos++;
          landscapeOccupied.push({ x: px, z: pz });
          this.jobAddDetail(job, aoShadowMat, px, 0.022, pz, 0, 5.2, 5.2);
          for (const [cx, cz] of [[-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3]]) {
            this.jobAddDetail(job, cedar, px + cx, 1.35, pz + cz, 0, 0.18, 2.7, 0.18);
          }
          this.jobAddDetail(job, cedar, px, 2.95, pz, 0, 3.2, 0.65, 3.2);
          this.jobAddDetail(job, snow, px, 3.28, pz, 0, 3.4, 0.24, 3.4);
          this.jobAddDetail(job, lampOrbMat, px, 2.42, pz, 0, 0.24, 0.24, 0.24);
          this.jobAddDetail(job, lightPool, px, 0.068, pz, 0, 7.2, 7.2);
          this.jobAddDetail(job, starGold, px, 3.68, pz, 0, 0.42, 0.42, 0.42);
        } else if (birchCount < 28 && hash > 0.45) {
          birchCount++;
          landscapeOccupied.push({ x: px, z: pz });
          planted.push({ x: px, z: pz });
        } else if (boulderClusters < 24) {
          boulderClusters++;
          landscapeOccupied.push({ x: px, z: pz });
          const sc = 0.72 + (hash % 0.65);
          this.jobAddDetail(job, aoShadowMat, px, 0.021, pz, 0, 2.8 * sc, 2.4 * sc);
          this.jobAddDetail(job, graniteMat, px, 0.38 * sc, pz, hash * 5.0, 1.15 * sc, 0.72 * sc, 0.92 * sc);
          this.jobAddDetail(job, snow, px, 0.68 * sc, pz, hash * 5.0, 0.96 * sc, 0.28 * sc, 0.78 * sc);
          this.jobAddDetail(job, graniteMat, px + 0.95 * sc, 0.26 * sc, pz + 0.45 * sc, hash * 2.1, 0.65 * sc, 0.46 * sc, 0.58 * sc);
        }
      }
    }

    const tiers = [{ y: 0.84, r: 1.75, h: 2.05 }, { y: 1.79, r: 1.43, h: 1.87 },
      { y: 2.74, r: 1.07, h: 1.6 }, { y: 3.62, r: 0.74, h: 1.49 }];
    const treeScale = (p: OsmPoint2D) => 0.82 + Math.abs(Math.sin(p.x * 16.84 + p.z * 9.15)) * 0.36;
    const trunks = new THREE.InstancedMesh(trunk, bark, planted.length);
    const foliage = new THREE.InstancedMesh(spruce, pine, planted.length * tiers.length);
    const caps = new THREE.InstancedMesh(spruceSnow, snow, planted.length * tiers.length);
    planted.forEach((p, i) => {
      const scale = treeScale(p);
      const yaw = (p.x + p.z) * 0.7;
      this.jobAddDetail(job, aoShadowMat, p.x, 0.021, p.z, 0, 3.8 * scale, 3.8 * scale);
      detailTransform.position.set(p.x, groundY(p.x, p.z) + 0.65 * scale, p.z);
      detailTransform.rotation.set(0, yaw, 0);
      detailTransform.scale.set(0.15 * scale, 1.3 * scale, 0.15 * scale);
      detailTransform.updateMatrix();
      trunks.setMatrixAt(i, detailTransform.matrix);
      const festive = i % 2 === 0;
      if (festive) {
        this.jobAddDetail(job, starGold, p.x, 5.38 * scale, p.z, 0, 0.42 * scale, 0.42 * scale);
        this.jobAddDetail(job, starGold, p.x, 5.38 * scale, p.z, Math.PI / 2, 0.42 * scale, 0.42 * scale);
        this.jobAddDetail(job, lightPool, p.x, 0.068, p.z, 0, 7.5 * scale, 7.5 * scale);
        this.jobAddDetail(job, marketRed, p.x + 0.9 * scale, 0.26, p.z + 0.6 * scale, yaw + 0.4, 0.48, 0.46, 0.48);
        this.jobAddDetail(job, marketCream, p.x - 0.85 * scale, 0.22, p.z + 0.75 * scale, yaw - 0.3, 0.42, 0.38, 0.42);
        for (const [tier, { y, r }] of tiers.entries()) {
          const bulbs = 11 - tier * 2;
          for (let k = 0; k < bulbs; k++) {
            const angle = k / bulbs * Math.PI * 2 + yaw + tier * 0.24;
            const width = (k % 3 === 0 ? 0.14 : 0.083) * scale;
            this.jobAddDetail(job, lightStrings[(k + tier) % lightStrings.length],
              p.x + Math.cos(angle) * r * scale * 0.9, (y + 0.36 + 0.13 * Math.sin(angle * 3)) * scale,
              p.z + Math.sin(angle) * r * scale * 0.9, 0, width, width, width);
          }
        }
      }
      tiers.forEach(({ y, r, h }, j) => {
        detailTransform.position.set(p.x, groundY(p.x, p.z) + y * scale, p.z);
        detailTransform.rotation.y = yaw + j * 0.24;
        detailTransform.scale.set(r * scale, h * scale, r * scale);
        detailTransform.updateMatrix();
        const index = i * tiers.length + j;
        foliage.setMatrixAt(index, detailTransform.matrix);
        detailTransform.position.y += 0.095 * scale;
        detailTransform.scale.x *= 1.05;
        detailTransform.scale.z *= 1.05;
        detailTransform.updateMatrix();
        caps.setMatrixAt(index, detailTransform.matrix);
      });
    });
    for (const mesh of [trunks, foliage, caps]) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      job.resources.instances.push(mesh);
      job.group.add(mesh);
    }

    job.detailKeys = [...job.details.keys()];
    job.detailIdx = 0;
    job.phase = 4;
    return performance.now() - tStart < budgetMs;
  }

  private stepPhase4Finalize(job: MapBuildJob, tStart: number, budgetMs: number): boolean {
    const keys = job.detailKeys ?? [];
    while (job.detailIdx < keys.length) {
      const material = keys[job.detailIdx++];
      const matrices = job.details.get(material);
      if (matrices?.length) {
        const geometry = material === logWood ? logBeam : material === bayWood ? bayGeometry : material === powder ? drift : material === hat ? topHat : material === graniteMat ? graniteRock : material === snowmanSnow || material === coal ? snowBall :
          material === carrot ? nose : scarves.includes(material as THREE.MeshStandardMaterial) ? scarf : material === starGold ? starGeometry : [lightPool, aoShadowMat, zebraMat].includes(material as THREE.MeshBasicMaterial) ? floorPlane :
          material === canopyWood || material === canopySnow ? canopyGeometry : material === firWreath ? fir :
          material === spireMat ? spireCone :
          material === icicleMaterial ? icicle : [lampOrbMat, berries, ...lightStrings].includes(material as THREE.MeshBasicMaterial) ? bulb :
          [glass, glassStar, glassCandles, glassTree, windowRound, windowArch, gigaAtriumMat, gigaSignMat, ...cottageDoors].includes(material as THREE.MeshBasicMaterial) ? pane : boxUnit;
        const mesh = new THREE.InstancedMesh(geometry, material, matrices.length);
        matrices.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
        mesh.castShadow = [powder, snowmanSnow, hat, churchWall, spireMat, lampIronMat, marketRed, graniteMat, fenceWoodMat, gigaParapetMat, gigaCanopyDarkMat].includes(material as THREE.MeshStandardMaterial);
        mesh.receiveShadow = material !== aoShadowMat && mesh.castShadow;
        job.resources.instances.push(mesh);
        job.group.add(mesh);
      }
      if (job.detailIdx % 6 === 0 && performance.now() - tStart >= budgetMs) return false;
    }

    if (job.vents.length) {
      const geometry = new THREE.BufferGeometry();
      const attribute = new THREE.BufferAttribute(new Float32Array(job.vents.length * 12), 3);
      attribute.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute('position', attribute);
      geometry.setDrawRange(0, 0);
      job.resources.geometries.push(geometry);
      const smoke = new THREE.Points(geometry, smokeMaterial);
      smoke.frustumCulled = false;
      job.group.add(smoke);
      job.smoke = smoke;
    }

    // Atomic double-buffered swap into the scene (old resources deferred for 1 frame)
    this.flushRetiringResources();
    this.retiringResources = this.activeResources;

    this.activeContent.remove(this.celebrationGroup);
    this.group.remove(this.activeContent);
    this.celebrationGroup.clear();
    this.celebrationNodes = [];
    this.celebrationGroup.position.set(0, 0, 0);
    job.group.add(this.celebrationGroup);
    job.group.position.set(0, 0, 0);
    this.activeContent = job.group;
    this.group.add(this.activeContent);

    this.villageLights.group.position.set(0, 0, 0);
    this.activeResources = job.resources;
    this.crossings = job.crossings;
    this.vents = job.vents;
    this.smoke = job.smoke;
    this.buildingTargets = job.buildingTargets;
    this.signalNodes = job.signalNodes;
    this.mapData.snapshot = job.snapshot;
    this.mapData.clearance = job.clearance;
    this.mapData.churches = job.churches;
    this.mapData.lakes = job.lakes;
    this.mapData.woodlands = job.woodlands;
    this.mapData.elevation = job.elevation;

    for (const target of this.buildingTargets) {
      if (this.celebrated.has(target.id)) {
        this.spawnCelebrationStar(target.x, target.roofY, target.z);
      }
    }
    this.villageLights.setLanterns(job.lanterns);
    this.pendingJob = null;
    return true;
  }

  private stepPendingJob(budgetMs: number): void {
    const job = this.pendingJob;
    if (!job) return;
    const tStart = performance.now();
    if (job.phase === 0) {
      this.stepPhase0Surfaces(job);
      if (performance.now() - tStart >= budgetMs) return;
    }
    if (job.phase === 1) {
      if (!this.stepPhase1Buildings(job, tStart, budgetMs)) return;
    }
    if (job.phase === 2) {
      if (!this.stepPhase2RoadPropsAndMerge(job, tStart, budgetMs)) return;
    }
    if (job.phase === 3) {
      if (!this.stepPhase3Nature(job, tStart, budgetMs)) return;
    }
    if (job.phase === 4) {
      this.stepPhase4Finalize(job, tStart, budgetMs);
    }
  }

  update(snapshot: OsmMapSnapshot, elevation?: (x: number, z: number) => number, elevationVersion = 0): void {
    this.flushRetiringResources();
    const nextKey = `${snapshot.version}:${elevation ? elevationVersion : 'flat'}`;
    if (this.buildKey !== nextKey) {
      this.buildKey = nextKey;
      this.discardPendingJob();
      this.pendingJob = {
        key: nextKey,
        snapshot,
        elevation,
        group: new THREE.Group(),
        resources: createResourceBag(),
        phase: 0,
        junctions: new Map(),
        roadSegs: [],
        crossings: new Map(),
        churches: [],
        lakes: [],
        woodlands: [],
        yards: [],
        lanterns: [],
        vents: [],
        buildingTargets: [],
        signalNodes: [],
        details: new Map(),
        batches: new Map(),
        buildingIndex: 0,
        gigaCount: 0,
        landmarkSigns: 0,
        roadPropsDone: false,
        batchMergeIdx: 0,
        detailIdx: 0,
      };
    }

    if (this.pendingJob) {
      // Allow up to ~32ms on empty cold boot so the initial world paints rapidly, and 6.5ms per frame afterwards
      const budgetMs = this.activeContent.children.length <= 1 ? 32 : 6.5;
      this.stepPendingJob(budgetMs);
    }
  }

  nextStreet(road: OsmRoadRibbon, car: OsmPoint2D, heading: number): {name: string; meters: number; turn?: 'left' | 'right' | 'straight'} | undefined {
    let nearest = Infinity, along = 0, direction = 1, total = 0;
    for (let i = 1; i < road.points.length; i++) {
      const a = road.points[i-1], b = road.points[i];
      const dx = b.x-a.x, dz = b.z-a.z, length = Math.hypot(dx,dz);
      if (!length) continue;
      const t = THREE.MathUtils.clamp(((car.x-a.x)*dx+(car.z-a.z)*dz)/(length*length),0,1);
      const distance = Math.hypot(car.x-a.x-t*dx,car.z-a.z-t*dz);
      if (distance < nearest) {
        nearest = distance;
        along = total + t*length;
        direction = dx*Math.sin(heading)-dz*Math.cos(heading) >= 0 ? 1 : -1;
      }
      total += length;
    }
    const closest = this.crossings.get(road)?.map(c => {
      let turn: 'left' | 'right' | 'straight' = 'straight';
      if (!c.isCross) {
        const fwdX = c.roadDx * direction;
        const fwdZ = c.roadDz * direction;
        const rightX = -fwdZ;
        const rightZ = fwdX;
        const dot = c.branchDx * rightX + c.branchDz * rightZ;
        if (dot > 0.35) turn = 'right';
        else if (dot < -0.35) turn = 'left';
      }
      return { name: c.name, meters: (c.distance - along) * direction, turn };
    }).filter(c => c.meters >= 4 && c.meters <= 250).sort((a,b) => a.meters-b.meters)[0];
    return closest && {...closest, meters: Math.round(closest.meters / 5)*5};
  }
}
