import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { OsmMapSnapshot, OsmPoint2D, OsmRoadRibbon } from '../core/osmWorld';
import { createSnowTextures, createTimberWallTexture, getSoftGlowTexture } from './pixarMaterials';
import { streetGeometry } from './mappedRoads';
import { createWinterRoad } from './winterSurfaces';

const asphalt = createWinterRoad();
const verge = new THREE.MeshStandardMaterial({color: '#d3e6ed', roughness: 0.96});
const snowTexture = createSnowTextures().bumpMap;
snowTexture.wrapS = snowTexture.wrapT = THREE.RepeatWrapping;
const snow = new THREE.MeshStandardMaterial({color: '#fff8f4', roughness: 0.83, bumpMap: snowTexture, bumpScale: 0.12});
const timber = createTimberWallTexture('#d3b8ad');
timber.wrapS = timber.wrapT = THREE.RepeatWrapping;
const factoryWall = new THREE.MeshStandardMaterial({color:'#acb8c3', roughness:0.65, metalness:0.18});
const brick = new THREE.MeshStandardMaterial({color:'#683b43', roughness:0.88});
const trim = new THREE.MeshStandardMaterial({color:'#f4d9af', roughness:0.81});
const eave = new THREE.MeshStandardMaterial({color:'#402b39', roughness:0.83});
const lightStrings = ['#ffe0a0','#e0375c','#6cf6dd','#ae8af5','#ffc64f'].map(color => new THREE.MeshBasicMaterial({color}));
const boxUnit = new THREE.BoxGeometry(1,1,1);
const bulb = new THREE.SphereGeometry(1,7,5);
const lightPool = new THREE.MeshBasicMaterial({
  map:getSoftGlowTexture(),color:'#ffb866',transparent:true,opacity:0.46,
  depthWrite:false,blending:THREE.AdditiveBlending,
});
const floorPlane = new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2);
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
const starGold = new THREE.MeshBasicMaterial({color:'#ffe3a0'});
const greenGarland = new THREE.MeshStandardMaterial({color:'#295645',roughness:0.92});


function illustratedPanel(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d')!);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshBasicMaterial({map:texture, transparent:true, alphaTest:0.3});
}

const crest = illustratedPanel(256,64,ctx => {
  ctx.fillStyle='#ecebdf'; ctx.fillRect(0,0,256,64);
  ctx.fillStyle='#a31131'; ctx.fillRect(0,55,256,9);
  ctx.font='bold 35px system-ui'; ctx.textAlign='center'; ctx.fillText('T E S L A',128,43);
});
const door = illustratedPanel(64,96,ctx => {
  ctx.fillStyle='#fbdbb2'; ctx.fillRect(0,0,64,96);
  ctx.fillStyle='#602738'; ctx.fillRect(5,5,54,91);
  ctx.strokeStyle='#a95c5a'; ctx.lineWidth=2; ctx.strokeRect(10,11,44,77);
  ctx.strokeStyle='#295f40'; ctx.lineWidth=8; ctx.beginPath(); ctx.arc(32,34,13,0,Math.PI*2); ctx.stroke();
  ctx.fillStyle='#f37c73';
  for (const [x,y] of [[26,22],[42,39],[22,41],[32,47]]) ctx.fillRect(x,y,4,4);
  ctx.fillStyle='#ffdc80'; ctx.beginPath(); ctx.arc(46,63,3,0,Math.PI*2); ctx.fill();
});
const cable = new THREE.MeshStandardMaterial({color:'#353f3c', roughness:0.95});
const lake = new THREE.MeshStandardMaterial({color: '#59869e', roughness: 0.5});
const woodland = new THREE.MeshStandardMaterial({color: '#819fa0', roughness: 1});
const pine = new THREE.MeshStandardMaterial({color: '#265854', roughness: 0.9});
const walls = ['#ae4951','#e1a379','#4a7776','#9d756b','#d1b19a'].map(color =>
  new THREE.MeshStandardMaterial({color, map:timber, roughness: 0.84}));
const windowCanvas = document.createElement('canvas');
windowCanvas.width = windowCanvas.height = 64;
const paint = windowCanvas.getContext('2d')!;
paint.fillStyle = '#472b32';
paint.fillRect(0,0,64,64);
const glow = paint.createRadialGradient(32,25,4,32,30,44);
glow.addColorStop(0,'#fff2c1');
glow.addColorStop(1,'#d17638');
paint.fillStyle = glow;
paint.fillRect(7,7,50,50);
paint.fillStyle = '#613631';
paint.fillRect(29,6,5,52);
paint.fillRect(6,32,52,5);
paint.fillStyle = '#f2f2ec';
paint.fillRect(0,57,64,7);
const windowTexture = new THREE.CanvasTexture(windowCanvas);
windowTexture.colorSpace = THREE.SRGBColorSpace;
const glass = new THREE.MeshBasicMaterial({map: windowTexture});
const pane = new THREE.PlaneGeometry(1, 1);
const icicle = new THREE.ConeGeometry(1,1,5).rotateZ(Math.PI);
const trunk = new THREE.CylinderGeometry(0.68,1,1,7);
const bark = new THREE.MeshStandardMaterial({color:'#524145',roughness:0.95});
const icicleMaterial = new THREE.MeshStandardMaterial({color:'#c6e7f1',roughness:0.32,metalness:0.06});
const lantern = new THREE.MeshBasicMaterial({color:'#ffbe66'});

// Scallops give the snow cap the outline of individual laden branches.
function spruceTier(snowCap: boolean): THREE.BufferGeometry {
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  const sides = 18;
  const rings = snowCap ? [{y:0.08,r:0.87},{y:0.25,r:0.82},{y:0.64,r:0.44},{y:0.99,r:0.025}]
    : [{y:0.0,r:0.22},{y:0.02,r:1.0},{y:0.24,r:0.82},{y:0.64,r:0.41},{y:1,r:0.021}];
  rings.forEach(({y,r}, ring) => {
    for (let i = 0; i <= sides; i++) {
      const angle = i / sides * Math.PI * 2;
      const scallop = Math.cos(angle*6);
      const radius = r*(1+scallop*(1-y)*0.12);
      positions.push(radius*Math.cos(angle),y-scallop*r*0.043,radius*Math.sin(angle));
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


function outline(points: OsmPoint2D[]): THREE.Shape {
  return new THREE.Shape(points.map(p => new THREE.Vector2(p.x, -p.z)));
}

function roofGeometry(shape: THREE.Shape, ridgeAlongZ: boolean, rise: number): {snowCap: THREE.BufferGeometry; gables: THREE.BufferGeometry} {
  const points = shape.getPoints();
  const axis = (p: THREE.Vector2) => ridgeAlongZ ? p.x : p.y;
  const values = points.map(axis);
  const min = Math.min(...values), max = Math.max(...values);
  const center = (min + max) * 0.5;
  const half = Math.max(0.01, (max - min) * 0.5);
  const height = (p: THREE.Vector2) => 0.22 + rise * Math.max(0, 1 - Math.abs(axis(p)-center)/half);
  let vertices: number[] = [];
  const add = (p: THREE.Vector2, y = height(p)) => vertices.push(p.x, y, -p.y);
  function ridgePoint(a: THREE.Vector2, b: THREE.Vector2) {
    return a.clone().lerp(b, (center-axis(a))/(axis(b)-axis(a)));
  }
  for (const face of THREE.ShapeUtils.triangulateShape(points, [])) {
    const triangle = face.map(i => points[i]);
    for (const side of [-1,1]) {
      const polygon = triangle.flatMap((a,i) => {
        const b = triangle[(i+1)%3];
        const inside = (axis(a)-center)*side >= 0;
        const crosses = (axis(a)-center)*(axis(b)-center) < 0;
        return [...(inside ? [a] : []), ...(crosses ? [ridgePoint(a,b)] : [])];
      });
      for (let i = 1; i < polygon.length-1; i++) {
        add(polygon[0]); add(polygon[i]); add(polygon[i+1]);
      }
    }
  }
  const capVertices = vertices;
  vertices = [];
  const clockwise = THREE.ShapeUtils.isClockWise(points);
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i+1)%points.length];
    const edge = (axis(a)-center)*(axis(b)-center) < 0 ? [a,ridgePoint(a,b),b] : [a,b];
    if (!clockwise) edge.reverse();
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
  return {snowCap:build(capVertices),gables:build(vertices)};
}

export class ChristmasMap {
  readonly group = new THREE.Group();
  private geometries: THREE.BufferGeometry[] = [];
  private instances: THREE.InstancedMesh[] = [];
  private version?: number;
  private crossings = new Map<OsmRoadRibbon, { name: string; distance: number }[]>();

  private surface(geometry: THREE.BufferGeometry, material: THREE.Material, height = 0): void {
    this.geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = height;
    mesh.receiveShadow = true;
    this.group.add(mesh);
  }

  update(snapshot: OsmMapSnapshot): void {
    if (this.version === snapshot.version) return;
    this.version = snapshot.version;
    this.geometries.forEach(g => g.dispose());
    this.geometries = [];
    this.instances.forEach(mesh => mesh.dispose());
    this.instances = [];
    this.group.clear();
    this.crossings.clear();
    const nodes = new Map<string, Set<OsmRoadRibbon>>();
    const key = (p: OsmPoint2D) => p.x.toFixed(2) + ',' + p.z.toFixed(2);
    for (const road of snapshot.roads) {
      for (const p of road.points) {
        const id = key(p);
        if (!nodes.has(id)) nodes.set(id, new Set());
        nodes.get(id)!.add(road);
      }
    }
    for (const road of snapshot.roads) {
      let distance = 0;
      this.crossings.set(road, road.points.flatMap((point, i) => {
        const prev = road.points[i - 1];
        if (prev) distance += Math.hypot(point.x - prev.x, point.z - prev.z);
        const other = [...(nodes.get(key(point)) ?? [])].find(r => r !== road && r.name && r.name !== road.name);
        return other?.name ? [{ name: other.name, distance }] : [];
      }));
    }
    this.surface(streetGeometry(snapshot.roads.map(r => ({...r, widthM: r.widthM + 1.6}))), verge, -0.012);
    this.surface(streetGeometry(snapshot.roads), asphalt);
    for (const water of snapshot.waters) {
      const geometry = water.isPolygon ? new THREE.ShapeGeometry(outline(water.points)).rotateX(-Math.PI / 2)
        : streetGeometry([{...water, isMajor: false}]);
      this.surface(geometry, lake, water.isPolygon ? 0.019 : -0.024);
    }
    for (const ring of snapshot.woodland ?? []) {
      this.surface(new THREE.ShapeGeometry(outline(ring)).rotateX(-Math.PI / 2), woodland, 0.009);
    }

    const details = new Map<THREE.Material, THREE.Matrix4[]>();
    const transform = new THREE.Object3D();
    function addDetail(material: THREE.Material, x: number, y: number, z: number,
      yaw: number, width: number, height: number, depth = 1, tilt = 0) {
      transform.position.set(x,y,z);
      transform.rotation.set(0,yaw,tilt,'YXZ');
      if (material === lightPool) transform.scale.set(width,1,height);
      else transform.scale.set(width,height,depth);
      transform.updateMatrix();
      const matrices = details.get(material) ?? [];
      matrices.push(transform.matrix.clone());
      details.set(material,matrices);
    }
    const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
    function batch(geometry: THREE.BufferGeometry, material: THREE.Material) {
      const position = geometry.attributes.position;
      const normal = geometry.attributes.normal;
      const uv = [];
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
        uv.push(Math.abs(normal.getX(i)) > 0.65 ? z * 0.48 : x * 0.48,
          Math.abs(normal.getY(i)) > 0.55 ? z * 0.48 : y * 0.48);
      }
      geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
      const geometries = batches.get(material) ?? [];
      geometries.push(geometry);
      batches.set(material,geometries);
    }
    for (const b of snapshot.buildings) {
      const factory = b.tesla === true;
      const home = b.kind === 'small_cottage' || b.kind === 'medium_house';
      const height = home ? THREE.MathUtils.clamp(b.heightM * 0.64, 2.7, 6.2) : THREE.MathUtils.clamp(b.heightM * 0.65, 3, 16);
      const shape = outline(b.footprint);
      const wall = walls[Math.abs(Math.round(b.centerX + b.centerZ)) % walls.length];
      const body = new THREE.ExtrudeGeometry(shape, {depth: height, bevelEnabled: false});
      batch(body.rotateX(-Math.PI / 2), factory ? factoryWall : wall);
      const rise = home ? THREE.MathUtils.clamp(Math.min(b.widthM,b.depthM)*0.49,1.3,5.4) : 0;
      const roof = roofGeometry(shape,b.widthM < b.depthM,rise);
      batch(roof.snowCap.translate(0,height,0),snow);
      batch(roof.gables.translate(0,height,0),factory ? factoryWall : wall);

      // Use an interior triangle to keep the chimney inside even on irregular footprints.
      if (home) {
        const corners = shape.getPoints();
        const face = THREE.ShapeUtils.triangulateShape(corners,[])[0];
        if (face) {
          const center = face.reduce((point,i) => point.add(corners[i]), new THREE.Vector2()).divideScalar(3);
          const size = Math.min(0.85,b.widthM*0.12,b.depthM*0.12);
          addDetail(brick,center.x,height+(rise+0.8)/2,-center.y,0,size,rise+0.8,size);
          addDetail(eave,center.x,height+rise+0.72,-center.y,0,size*1.14,0.16,size*1.14);
          addDetail(snow,center.x,height+rise+0.86,-center.y,0,size*1.28,0.15,size*1.28);
        }
      }
      const winding = THREE.ShapeUtils.isClockWise(shape.getPoints()) ? 1 : -1;
      const lengths = b.footprint.map((a,i) => {
        const c = b.footprint[(i+1)%b.footprint.length];
        return Math.hypot(c.x-a.x,c.z-a.z);
      });
      const mainFace = lengths.indexOf(Math.max(...lengths));
      const ridgeAlongZ = b.widthM < b.depthM;
      const ridgeAxis = (p: OsmPoint2D) => ridgeAlongZ ? p.x : p.z;
      const ridges = b.footprint.map(ridgeAxis);
      const minRidge = Math.min(...ridges), maxRidge = Math.max(...ridges);
      const roofY = (value: number) => height+0.22 + rise*(1-Math.abs(2*(value-minRidge)/Math.max(0.1,maxRidge-minRidge)-1));
      for (let i = 0; i < b.footprint.length; i++) {
        const a = b.footprint[i], c = b.footprint[(i + 1) % b.footprint.length];
        const dx = c.x - a.x, dz = c.z - a.z;
        const length = lengths[i];
        if (length < 0.3) continue;
        const nx = winding*dz/length, nz = -winding*dx/length;
        const yaw = Math.atan2(nx,nz);
        function detail(material: THREE.Material, t: number, y: number, width: number, tall: number, depth = 1, inset = 0.05) {
          addDetail(material,a.x+dx*t+nx*inset,y,a.z+dz*t+nz*inset,yaw,width,tall,depth);
        }
        detail(eave,0.5,height-0.14,length,0.3,0.22);
        detail(snow,0.5,height+0.025,length+0.14,0.14,0.3);
        detail(trim,0.015,height/2,0.16,height,0.115);
        if (factory && length >= 8) {
          detail(crest,0.5,height*0.72,Math.min(11,length*0.8),Math.min(2,height*0.3));
        }
        const hasDoor = home && i === mainFace && length > 2.8;
        if (hasDoor) {
          detail(door,0.5,1.025,1.25,2.05);
          detail(eave,0.5,2.17,1.7,0.14,0.68,0.28);
          detail(snow,0.5,2.25,1.78,0.12,0.76,0.28);
          detail(eave,0.5,0.08,1.38,0.16,0.74,0.3);
          detail(lightPool,0.5,0.073,6.8,5.3,1,1.25);
          detail(greenGarland,0.5,2.13,1.65,0.16,0.22,0.63);
          detail(starGold,0.5,2.47,0.23,0.23,0.65,0.42);
          for (const side of [-1,1]) {
            const position = 0.5 + side*0.94/length;
            detail(eave,position,1.88,0.17,0.37,0.18,0.14);
            detail(lantern,position,1.88,0.13,0.22,0.12,0.235);
          }
        }
        if (home && length > 2.5) {
          // Trace the actual gable slope so the garland and lights follow the roof.
          const mid = (minRidge+maxRidge)*0.5;
          const axisA = ridgeAxis(a), axisB = ridgeAxis(c);
          const ridgeT = (mid-axisA)/(axisB-axisA);
          const stops = ridgeT > 0 && ridgeT < 1 ? [0,ridgeT,1] : [0,1];
          for (let j = 1; j < stops.length; j++) {
            const from = stops[j-1], to = stops[j], t = (from+to)*0.5;
            const y1 = roofY(THREE.MathUtils.lerp(axisA,axisB,from));
            const y2 = roofY(THREE.MathUtils.lerp(axisA,axisB,to));
            const dx = (to-from)*length;
            if (Math.abs(y2-y1) > 0.3) {
              const dy = y2-y1;
              addDetail(greenGarland,a.x+(c.x-a.x)*t+nx*0.115,(y1+y2)*0.5-0.1,
                a.z+(c.z-a.z)*t+nz*0.115,yaw,Math.hypot(dx,dy),0.15,0.16,-winding*Math.atan2(dy,dx));
              const lamps = Math.min(16,Math.ceil(dx*1.65));
              for (let k = 0; k < lamps; k++) {
                const u = (k+0.5)/lamps;
                detail(lightStrings[k%lightStrings.length],THREE.MathUtils.lerp(from,to,u),
                  THREE.MathUtils.lerp(y1,y2,u)-0.12,0.1,0.125,0.1,0.24);
              }
            }
          }
          const gableHeight = roofY((axisA+axisB)*0.5) - height;
          if (gableHeight > 1.35) detail(glass,0.5,height+gableHeight*0.42,0.86,0.92,1,0.08);
        }
        const slots = Math.min(15, Math.floor(length / (factory ? 6 : 2.55)));
        for (let j = 0; j < slots; j++) {
          const t = (j + 0.5) / slots;
          const width = factory ? 2.7 : 1.36;
          if (!hasDoor || Math.abs(t-0.5)*length > 1.5) {
            const y = factory ? Math.min(2.2,height*0.45) : Math.min(1.6,height*0.44);
            detail(glass,t,y,width,1.24);
            detail(snow,t,y-0.59,width+0.17,0.16,0.21);
          }
          if (home && height > 4.4) detail(glass,t,height-1.05,width*0.84,1);
        }
        if (length > 1) detail(cable,0.5,height-0.27,length,0.03,0.03,0.14);
        if (home) {
          detail(eave,0.5,0.17,length,0.32,0.12);
          const icicles = Math.min(9,Math.floor(length/0.83));
          for (let j = 0; j < icicles; j++) {
            const t = (j+0.65)/(icicles+0.5);
            const length = 0.17 + ((j*7+i*3)%8)*0.038;
            detail(icicleMaterial,t,height+0.01-length/2,0.06,length,0.05,0.16);
          }
        }
        const ornaments = Math.min(32,Math.floor(length / 0.68));
        for (let j = 0; j < ornaments; j++) {
          const t = (j+0.5)/ornaments;
          const dip = Math.sin(Math.PI*t)*0.28;
          detail(lightStrings[(j+i)%lightStrings.length],t,height-0.23-dip,0.085,0.105,0.085,0.14);
        }
      }
    }
    for (const [material, parts] of batches) {
      const geometry = mergeGeometries(parts);
      if (geometry) {
        this.surface(geometry,material);
        this.group.children.at(-1)!.castShadow = true;
      }
      parts.forEach(part => part.dispose());
    }
    const planted: OsmPoint2D[] = [];
    const edges = snapshot.roads.flatMap(r => r.points.slice(1).map((b,i) => ({a:r.points[i], b, margin:r.widthM/2+1.5})));
    const besidePavement = (p: OsmPoint2D) => !edges.some(({a,b,margin}) => {
      const dx = b.x-a.x, dz = b.z-a.z;
      const lengthSq = dx*dx+dz*dz;
      if (!lengthSq) return false;
      const t = THREE.MathUtils.clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/lengthSq,0,1);
      return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t) < margin;
    });
    for (const p of snapshot.trees ?? []) {
      if (!besidePavement(p) || snapshot.buildings.some(b =>
        Math.abs(p.x-b.centerX) < b.widthM/2+1.5 && Math.abs(p.z-b.centerZ) < b.depthM/2+1.5)) continue;
      if (planted.some(q => Math.hypot(p.x-q.x,p.z-q.z) < 4)) continue;
      planted.push(p);
    }
    const tiers = [{y:0.84,r:1.75,h:2.05},{y:1.79,r:1.43,h:1.87},
      {y:2.74,r:1.07,h:1.6},{y:3.62,r:0.74,h:1.49}];
    const treeScale = (p: OsmPoint2D) => 0.82 + Math.abs(Math.sin(p.x*16.84+p.z*9.15))*0.36;
    const trunks = new THREE.InstancedMesh(trunk,bark,planted.length);
    const foliage = new THREE.InstancedMesh(spruce,pine,planted.length*tiers.length);
    const caps = new THREE.InstancedMesh(spruceSnow,snow,planted.length*tiers.length);
    planted.forEach((p,i) => {
      const scale = treeScale(p);
      const yaw = (p.x+p.z)*0.7;
      transform.position.set(p.x,0.65*scale,p.z);
      transform.rotation.set(0,yaw,0);
      transform.scale.set(0.15*scale,1.3*scale,0.15*scale);
      transform.updateMatrix();
      trunks.setMatrixAt(i,transform.matrix);
      const festive = i % 3 === 0;
      if (festive) {
        addDetail(starGold,p.x,5.38*scale,p.z,0,0.42*scale,0.42*scale);
        addDetail(starGold,p.x,5.38*scale,p.z,Math.PI/2,0.42*scale,0.42*scale);
        addDetail(lightPool,p.x,0.068,p.z,0,7*scale,7*scale);
        for (const [tier,{y,r}] of tiers.entries()) {
          const bulbs = 11-tier*2;
          for (let k = 0; k < bulbs; k++) {
            const angle = k/bulbs*Math.PI*2 + yaw+tier*0.24;
            const width = (k%3 === 0 ? 0.14 : 0.083)*scale;
            addDetail(lightStrings[(k+tier)%lightStrings.length],
              p.x+Math.cos(angle)*r*scale*0.9,(y+0.36+0.13*Math.sin(angle*3))*scale,
              p.z+Math.sin(angle)*r*scale*0.9,0,width,width,width);
          }
        }
      }
      tiers.forEach(({y,r,h},j) => {
        transform.position.y = y*scale;
        transform.rotation.y = yaw+j*0.24;
        transform.scale.set(r*scale,h*scale,r*scale);
        transform.updateMatrix();
        const index = i*tiers.length+j;
        foliage.setMatrixAt(index,transform.matrix);
        transform.position.y += 0.095*scale;
        transform.scale.x *= 1.05;
        transform.scale.z *= 1.05;
        transform.updateMatrix();
        caps.setMatrixAt(index,transform.matrix);
      });
    });
    for (const mesh of [trunks,foliage,caps]) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.instances.push(mesh);
      this.group.add(mesh);
    }
    for (const [material, matrices] of details) {
      const geometry = material === starGold ? starGeometry : material === lightPool ? floorPlane :
        material === icicleMaterial ? icicle : lightStrings.includes(material as THREE.MeshBasicMaterial) ? bulb :
        [glass,crest,door].includes(material as THREE.MeshBasicMaterial) ? pane : boxUnit;
      const mesh = new THREE.InstancedMesh(geometry, material, matrices.length);
      matrices.forEach((matrix,index) => mesh.setMatrixAt(index,matrix));
      this.instances.push(mesh);
      this.group.add(mesh);
    }

  }

  nextStreet(road: OsmRoadRibbon, car: OsmPoint2D, heading: number): {name: string; meters: number} | undefined {
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
    const closest = this.crossings.get(road)?.map(c => ({name:c.name, meters:(c.distance-along)*direction}))
      .filter(c => c.meters >= 4 && c.meters <= 250).sort((a,b) => a.meters-b.meters)[0];
    return closest && {...closest, meters: Math.round(closest.meters / 5)*5};
  }
}
