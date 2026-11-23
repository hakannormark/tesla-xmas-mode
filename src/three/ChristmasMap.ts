import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { OsmMapSnapshot, OsmPoint2D, OsmRoadRibbon } from '../core/osmWorld';
import { streetGeometry } from './mappedRoads';

const asphalt = new THREE.MeshStandardMaterial({color: '#33445c', roughness: 0.94});
const verge = new THREE.MeshStandardMaterial({color: '#d3e6ed', roughness: 0.96});
const snow = new THREE.MeshStandardMaterial({color: '#fff8f4', roughness: 0.83});
const lake = new THREE.MeshStandardMaterial({color: '#59869e', roughness: 0.5});
const woodland = new THREE.MeshStandardMaterial({color: '#819fa0', roughness: 1});
const pine = new THREE.MeshStandardMaterial({color: '#265854', roughness: 0.9});
const walls = ['#ae4951','#e1a379','#4a7776','#9d756b','#d1b19a'].map(color =>
  new THREE.MeshStandardMaterial({color, roughness: 0.84}));
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

    const windows: THREE.Matrix4[] = [];
    const transform = new THREE.Object3D();
    const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
    function batch(geometry: THREE.BufferGeometry, material: THREE.Material) {
      geometry.deleteAttribute('uv');
      const geometries = batches.get(material) ?? [];
      geometries.push(geometry);
      batches.set(material,geometries);
    }
    for (const b of snapshot.buildings) {
      const factory = /gigafactory/i.test(b.name ?? '');
      const home = b.kind === 'small_cottage' || b.kind === 'medium_house';
      const height = home ? THREE.MathUtils.clamp(b.heightM * 0.72, 3, 7) : THREE.MathUtils.clamp(b.heightM * 0.65, 3, 16);
      const shape = outline(b.footprint);
      const wall = walls[Math.abs(Math.round(b.centerX + b.centerZ)) % walls.length];
      const body = new THREE.ExtrudeGeometry(shape, {depth: height, bevelEnabled: false});
      batch(body.rotateX(-Math.PI / 2), factory ? walls[4] : wall);
      const roof = roofGeometry(shape, b.widthM < b.depthM, home ? THREE.MathUtils.clamp(Math.min(b.widthM,b.depthM) * 0.23,1,2.8) : 0);
      batch(roof.translate(0,height,0), snow);
      const winding = THREE.ShapeUtils.isClockWise(shape.getPoints()) ? 1 : -1;
      for (let i = 0; i < b.footprint.length; i++) {
        const a = b.footprint[i], c = b.footprint[(i + 1) % b.footprint.length];
        const dx = c.x - a.x, dz = c.z - a.z;
        const length = Math.hypot(dx,dz);
        const slots = Math.min(15, Math.floor(length / (factory ? 6 : 3.1)));
        for (let j = 0; j < slots; j++) {
          const t = (j + 0.5) / slots;
          transform.position.set(a.x + dx*t + winding*dz/length*0.018, Math.min(2.3,height*0.55), a.z + dz*t - winding*dx/length*0.018);
          transform.rotation.y = Math.atan2(winding*dz, -winding*dx);
          transform.scale.set(factory ? 3 : 1.25, factory ? 1.5 : 1.15, 1);
          transform.updateMatrix();
          windows.push(transform.matrix.clone());
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
    const windowMesh = new THREE.InstancedMesh(pane, glass, windows.length);
    windows.forEach((matrix, index) => windowMesh.setMatrixAt(index, matrix));
    this.instances.push(windowMesh);
    this.group.add(windowMesh);
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
