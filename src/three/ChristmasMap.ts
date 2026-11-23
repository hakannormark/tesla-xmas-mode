import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { OsmMapSnapshot, OsmPoint2D, OsmRoadRibbon } from '../core/osmWorld';
import { createSnowTextures, createTimberWallTexture } from './pixarMaterials';
import { streetGeometry } from './mappedRoads';

const asphalt = new THREE.MeshStandardMaterial({color: '#33445c', roughness: 0.94});
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
const lightStrings = ['#ffce7f','#ff7376','#b5f3da'].map(color => new THREE.MeshBasicMaterial({color}));
const boxUnit = new THREE.BoxGeometry(1,1,1);
const bulb = new THREE.SphereGeometry(1,6,4);

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
const tree = new THREE.ConeGeometry(1, 1, 10);

function outline(points: OsmPoint2D[]): THREE.Shape {
  return new THREE.Shape(points.map(p => new THREE.Vector2(p.x, -p.z)));
}

function roofGeometry(shape: THREE.Shape, ridgeAlongZ: boolean, rise: number): THREE.BufferGeometry {
  const points = shape.getPoints();
  const axis = (p: THREE.Vector2) => ridgeAlongZ ? p.x : p.y;
  const values = points.map(axis);
  const min = Math.min(...values), max = Math.max(...values);
  const center = (min + max) * 0.5;
  const half = Math.max(0.01, (max - min) * 0.5);
  const height = (p: THREE.Vector2) => 0.22 + rise * Math.max(0, 1 - Math.abs(axis(p)-center)/half);
  const vertices: number[] = [];
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
  const result = new THREE.BufferGeometry();
  result.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
  result.computeVertexNormals();
  return result;
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
      yaw: number, width: number, height: number, depth = 1) {
      transform.position.set(x,y,z);
      transform.rotation.set(0,yaw,0);
      transform.scale.set(width,height,depth);
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
      const rise = home ? THREE.MathUtils.clamp(Math.min(b.widthM,b.depthM)*0.34,1,3.8) : 0;
      batch(roofGeometry(shape,b.widthM < b.depthM,rise).translate(0,height,0), snow);

      // Use an interior triangle to keep the chimney inside even on irregular footprints.
      if (home) {
        const corners = shape.getPoints();
        const face = THREE.ShapeUtils.triangulateShape(corners,[])[0];
        if (face) {
          const center = face.reduce((point,i) => point.add(corners[i]), new THREE.Vector2()).divideScalar(3);
          const size = Math.min(0.85,b.widthM*0.12,b.depthM*0.12);
          addDetail(brick,center.x,height+(rise+0.8)/2,-center.y,0,size,rise+0.8,size);
          addDetail(snow,center.x,height+rise+0.83,-center.y,0,size*1.22,0.16,size*1.22);
        }
      }
      const winding = THREE.ShapeUtils.isClockWise(shape.getPoints()) ? 1 : -1;
      const lengths = b.footprint.map((a,i) => {
        const c = b.footprint[(i+1)%b.footprint.length];
        return Math.hypot(c.x-a.x,c.z-a.z);
      });
      const mainFace = lengths.indexOf(Math.max(...lengths));
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
        if (hasDoor) detail(door,0.5,1.025,1.25,2.05);
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
        const ornaments = Math.min(32,Math.floor(length / 0.68));
        for (let j = 0; j < ornaments; j++) {
          const t = (j+0.5)/ornaments;
          const dip = Math.sin(Math.PI*t)*0.28;
          detail(lightStrings[(j+i)%3],t,height-0.23-dip,0.085,0.105,0.085,0.14);
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
    for (const [material, matrices] of details) {
      const geometry = lightStrings.includes(material as THREE.MeshBasicMaterial) ? bulb :
        [glass,crest,door].includes(material as THREE.MeshBasicMaterial) ? pane : boxUnit;
      const mesh = new THREE.InstancedMesh(geometry, material, matrices.length);
      matrices.forEach((matrix,index) => mesh.setMatrixAt(index,matrix));
      this.instances.push(mesh);
      this.group.add(mesh);
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
    for (const [material, radius, height, y] of [[pine,1.7,5.5,2.9],[snow,1.35,4.3,3.65]] as const) {
      const mesh = new THREE.InstancedMesh(tree, material, planted.length);
      planted.forEach((p,i) => {
        transform.position.set(p.x,y,p.z);
        transform.rotation.set(0,0,0);
        transform.scale.set(radius,height,radius);
        transform.updateMatrix();
        mesh.setMatrixAt(i,transform.matrix);
      });
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
