import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { OsmMapSnapshot, OsmPoint2D, OsmRoadRibbon } from '../core/osmWorld';
import { createSnowTextures, createTimberWallTexture, getSoftGlowTexture } from './pixarMaterials';
import { streetGeometry, roadJunctions, junctionGeometry } from './mappedRoads';
import { mapClearance } from './mapClearance';
import { createWinterRoad } from './winterSurfaces';
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
const roofCap = new THREE.MeshStandardMaterial({color:'#e6e6f5',roughness:0.87,bumpMap:snowTexture,bumpScale:0.095});
const timber = createTimberWallTexture('#d3b8ad');
timber.wrapS = timber.wrapT = THREE.RepeatWrapping;
const boards = timber.clone();
boards.rotation = Math.PI/2;
boards.repeat.set(0.55,1.15);
boards.needsUpdate = true;
const cottageWalls = cottageStyles.map(style => new THREE.MeshStandardMaterial({
  color:style.color, map:style.finish === 'plaster' ? null : style.finish === 'boards' ? boards : timber, roughness:0.86,
}));
const cottageTrim = cottageStyles.map(style => new THREE.MeshStandardMaterial({color:style.trim,roughness:0.82}));
const foundationStone = new THREE.MeshStandardMaterial({color:'#827687',roughness:0.94});
const factoryWall = new THREE.MeshStandardMaterial({color:'#acb8c3', roughness:0.65, metalness:0.18});
const brick = new THREE.MeshStandardMaterial({color:'#683b43', roughness:0.88});
const trim = new THREE.MeshStandardMaterial({color:'#f4d9af', roughness:0.81});
const eave = new THREE.MeshStandardMaterial({color:'#402b39', roughness:0.83});
const roofSnow = new THREE.MeshStandardMaterial({color:'#f2edff',roughness:0.84});
const cedar = new THREE.MeshStandardMaterial({color:'#603a30',roughness:0.83});
const shutters = cottageStyles.map(style => new THREE.MeshStandardMaterial({
  color:style.door,map:boards,roughness:0.82,
}));
const lightStrings = ['#ffe0a0','#e0375c','#6cf6dd','#ae8af5','#ffc64f'].map(color => new THREE.MeshBasicMaterial({color}));
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
const firWreath = greenGarland.clone();
const fir = new THREE.TorusGeometry(1,0.29,7,16);
const berries = new THREE.MeshBasicMaterial({color:'#ef4658'});
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

const crest = illustratedPanel(256,64,ctx => {
  ctx.fillStyle='#ecebdf'; ctx.fillRect(0,0,256,64);
  ctx.fillStyle='#a31131'; ctx.fillRect(0,55,256,9);
  ctx.font='bold 35px system-ui'; ctx.textAlign='center'; ctx.fillText('T E S L A',128,43);
});
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
const factoryCandy = new THREE.MeshStandardMaterial({color:'#8e243b',roughness:0.52});
const roofLedge = new THREE.MeshStandardMaterial({color:'#b7becb',metalness:0.2,roughness:0.68});
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
paint.fillStyle = '#bf6c40';
paint.beginPath();
paint.moveTo(7,7); paint.lineTo(20,7); paint.quadraticCurveTo(19,32,7,46);
paint.moveTo(57,7); paint.lineTo(44,7); paint.quadraticCurveTo(45,32,57,46);
paint.fill();
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

export class ChristmasMap {
  readonly group = new THREE.Group();
  readonly villageLights = new VillageLights();
  private geometries: THREE.BufferGeometry[] = [];
  private instances: THREE.InstancedMesh[] = [];
  private version?: number;
  private vents: THREE.Vector3[] = [];
  private smoke?: THREE.Points;

  animate(time: number, center: THREE.Vector3): void {
    this.villageLights.update(time,center);
    if (!this.smoke) return;
    const position = this.smoke.geometry.attributes.position;
    let used = 0;
    for (const [id, vent] of this.vents.entries()) {
      if (Math.hypot(vent.x-center.x,vent.z-center.z) > 155) continue;
      for (let i = 0; i < 4; i++) {
        const age = (time*0.27+i*0.25+id*0.43)%1;
        position.setXYZ(used++,vent.x+age*age*3.1,vent.y+age*4.1,
          vent.z+Math.sin(age*3.4+id)*age*0.66);
      }
    }
    this.smoke.geometry.setDrawRange(0,used);
    position.needsUpdate = true;
  }
  private crossings = new Map<OsmRoadRibbon, { name: string; distance: number }[]>();

  private surface(geometry: THREE.BufferGeometry, material: THREE.Material, height = 0): void {
    this.geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = height;
    mesh.receiveShadow = true;
    this.group.add(mesh);
  }

  update(snapshot: OsmMapSnapshot, elevation?: (x: number,z: number) => number): void {
    if (this.version === snapshot.version) return;
    this.version = snapshot.version;
    this.geometries.forEach(g => g.dispose());
    this.geometries = [];
    this.instances.forEach(mesh => mesh.dispose());
    this.instances = [];
    this.group.clear();
    this.group.add(this.villageLights.group);
    this.crossings.clear();
    this.vents = [];
    this.smoke = undefined;
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
    this.surface(streetGeometry(snapshot.roads.map(r => ({...r,widthM:r.widthM+1.6})),elevation),verge,-0.012);
    const junctions = roadJunctions(snapshot.roads);
    this.surface(streetGeometry(snapshot.roads,elevation,junctions),asphalt);
    if (junctions.size) {
      this.surface(junctionGeometry(junctions,elevation,0.8),verge,-0.038);
      this.surface(junctionGeometry(junctions,elevation),asphalt);
    }
    const groundY = (x: number,z: number) => elevation?.(x,z) ?? 0;
    for (const water of snapshot.waters) {
      const geometry = water.isPolygon ? new THREE.ShapeGeometry(outline(water.points)).rotateX(-Math.PI / 2)
        : streetGeometry([{...water, isMajor: false}]);
      this.surface(geometry, lake, water.isPolygon ? 0.019 : -0.024);
    }
    for (const ring of snapshot.woodland ?? []) {
      this.surface(new THREE.ShapeGeometry(outline(ring)).rotateX(-Math.PI / 2), woodland, 0.009);
    }

    const yards: { x: number; z: number; yaw: number; index: number }[] = [];
    const lanterns: THREE.Vector3[] = [];
    const clearance = mapClearance(snapshot);
    const details = new Map<THREE.Material, THREE.Matrix4[]>();
    const transform = new THREE.Object3D();
    function addDetail(material: THREE.Material, x: number, y: number, z: number,
      yaw: number, width: number, height: number, depth = 1, tilt = 0, base?: number) {
      transform.position.set(x,y+(base ?? groundY(x,z)),z);
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
      const cottage = cottageModel(b);
      const home = !!cottage;
      const factory = b.tesla || b.kind === 'gigafactory' || b.kind === 'large_building';
      const height = factory ? Math.min(11,buildingWallHeight(b)) : buildingWallHeight(b);
      const shape = outline(b.footprint);
      const levels = b.footprint.flatMap((a,i) => {
        const bNext = b.footprint[(i+1)%b.footprint.length];
        return [groundY(a.x,a.z),groundY((a.x+bNext.x)/2,(a.z+bNext.z)/2)];
      }).sort((x,y) => x-y);
      const highest = levels[levels.length-1];
      const base = Math.max(levels[Math.floor(levels.length/2)],highest-0.8);
      const foundation = levels[0]-0.3;
      const wall = cottage ? cottageWalls[cottage.index] : factory ? factoryWall : walls[0];
      const frame = cottage ? cottageTrim[cottage.index] : trim;
      if (elevation) {
        const stone = new THREE.ExtrudeGeometry(shape,{depth:base-foundation+0.06,bevelEnabled:false});
        batch(stone.rotateX(-Math.PI/2).translate(0,foundation,0),foundationStone);
      }
      const body = new THREE.ExtrudeGeometry(shape,{depth:height,bevelEnabled:false});
      batch(body.rotateX(-Math.PI/2).translate(0,base,0),wall);
      const profile = roofProjection(b.footprint,cottage?.roof ?? [[0,0],[1,0]],cottage?.style.pitch ?? 0);
      const roof = roofGeometry(shape,profile);
      batch(roof.snowCap.translate(0,height+base,0),home ? roofCap : snow);
      batch(roof.gables.translate(0,height+base,0),wall);

      // Use an interior triangle to keep the chimney inside even on irregular footprints.
      if (home) {
        const corners = shape.getPoints();
        const face = THREE.ShapeUtils.triangulateShape(corners,[])[0];
        if (face) {
          const center = face.reduce((point,i) => point.add(corners[i]), new THREE.Vector2()).divideScalar(3);
          const size = Math.min(0.85,b.widthM*0.12,b.depthM*0.12);
          const stackTop = height+profile.yAt(profile.widthAt({x:center.x,z:-center.y}))+0.64;
          addDetail(brick,center.x,(height+stackTop)/2,-center.y,0,size,stackTop-height,size,0,base);
          addDetail(eave,center.x,stackTop,-center.y,0,size*1.17,0.16,size*1.17,0,base);
          addDetail(snow,center.x,stackTop+0.12,-center.y,0,size*1.28,0.12,size*1.28,0,base);
          if (cottage.variation < 0.57) this.vents.push(new THREE.Vector3(center.x,base+stackTop+0.18,-center.y));
        }
      }
      const winding = THREE.ShapeUtils.isClockWise(shape.getPoints()) ? 1 : -1;
      const lengths = b.footprint.map((a,i) => {
        const c = b.footprint[(i+1)%b.footprint.length];
        return Math.hypot(c.x-a.x,c.z-a.z);
      });
      const longest = Math.max(...lengths);
      const street = clearance.nearestStreet({x:b.centerX,z:b.centerZ});
      const scores = b.footprint.map((a,i) => {
        const length = lengths[i];
        if (!street || length < 3) return length;
        const c = b.footprint[(i+1)%b.footprint.length];
        const x = street.x-(a.x+c.x)/2, z = street.z-(a.z+c.z)/2;
        const facing = winding*((c.z-a.z)*x-(c.x-a.x)*z)/(length*(Math.hypot(x,z)||1));
        return length+facing*Math.min(25,longest*1.6);
      });
      const mainFace = scores.indexOf(Math.max(...scores));
      const roofY = (value: number) => height+profile.yAt(value);
      for (let i = 0; i < b.footprint.length; i++) {
        const a = b.footprint[i], c = b.footprint[(i + 1) % b.footprint.length];
        const dx = c.x - a.x, dz = c.z - a.z;
        const length = lengths[i];
        if (length < 0.3) continue;
        const nx = winding*dz/length, nz = -winding*dx/length;
        const yaw = Math.atan2(nx,nz);
        function detail(material: THREE.Material, t: number, y: number, width: number, tall: number, depth = 1, inset = 0.05) {
          addDetail(material,a.x+dx*t+nx*inset,y,a.z+dz*t+nz*inset,yaw,width,tall,depth,0,
            material === lightPool ? undefined : base);
        }
        if (!home) {
          detail(eave,0.5,height-0.14,length,0.3,0.22);
          detail(snow,0.5,height+0.025,length+0.14,0.14,0.3);
        }
        detail(home && cottage.style.finish === 'plaster' ? cedar : frame,0.015,height/2,0.17,height,0.16);
        if (cottage?.style.finish === 'logs' && length > 1) {
          const courses = Math.round(height/0.29);
          for (let k = 0; k < courses; k++) {
            detail(logWood,0.5,height*(k+0.5)/courses,length+(k%2 ? 0.15 : 0.05),
              height/courses*1.04,0.24,-0.075);
          }
        }
        if (factory && length >= 8) {
          detail(factoryCandy,0.5,height*0.56,length,0.28,0.18);
          detail(trim,0.5,height*0.56-0.25,length,0.09,0.24);
          detail(roofLedge,0.5,height-0.34,length,0.55,0.35);
          detail(lightPool,0.5,0.07,Math.min(length,30),9,1,2.8);
          if (b.tesla && i === mainFace) detail(crest,0.5,height*0.77,Math.min(11,length*0.8),Math.min(2,height*0.3));
          const bays = Math.max(1,Math.min(14,Math.floor(length/6)));
          for (let bay = 0; bay < bays; bay++) {
            const t = (bay+0.5)/bays;
            if (height > 5 && i === mainFace && (!b.tesla || Math.abs(t-0.5)*length > 7)) {
              const wide = Math.min(3.2,length/bays*0.68);
              detail(canopyWood,t,height*0.77,wide+0.54,1.2,0.85,0.28);
              detail(canopySnow,t,height*0.77+0.12,wide+0.68,1.2,0.95,0.28);
              detail(windowRound,t,height*0.77-0.08,0.55,0.55,1,0.73);
            }
            detail(roofLedge,t-0.43/bays,height*0.25,0.24,height*0.5,0.34);
            detail(windowArch,t,Math.min(2.15,height*0.32),Math.min(3.6,length/bays*0.66), Math.min(3.1,height*0.49));
          }
        }
        const hasDoor = !!cottage && i === mainFace && length > 2.8;
        const doorT = cottage && length > 5 ? (cottage.variation < 0.48 ? 0.24 : 0.74) : 0.5;
        if (hasDoor && cottage) {
          detail(frame,doorT,0.99,1.3,1.99,0.16);
          detail(cottageDoors[cottage.index],doorT,0.96,1.14,1.88,1,0.093);
          const porch = cottage.style.porch;
          const depth = porch === 'porch' ? 0.98 : porch === 'awning' ? 0.65 : 0.42;
          detail(foundationStone,doorT,0.075,1.65,0.15,depth+0.32,(depth+0.32)*0.43);
          detail(cedar,doorT,0.17,1.38,0.13,depth,depth*0.4);
          if (porch !== 'stoop') {
            const pitch = porch === 'awning' ? 0.31 : 0.53;
            detail(canopyWood,doorT,2.13+pitch/2,1.65,pitch,depth,depth*0.46);
            detail(canopySnow,doorT,2.23+pitch/2,1.78,pitch,depth+0.13,depth*0.46);
            detail(greenGarland,doorT,2.03,1.56,0.14,0.22,depth*0.82);
            for (let k = -3; k <= 3; k++) {
              detail(lightStrings[k%2 ? 1 : 0],doorT+k*0.21/length,2.01,0.065,0.078,0.065,depth+0.03);
            }
          }
          if (porch === 'porch') {
            for (const side of [-1,1]) {
              detail(frame,doorT+side*0.72/length,1.05,0.15,1.98,0.15,0.85);
            }
          }
          detail(lightPool,doorT,0.073,5.6,4.2,1,1.25);
          detail(firWreath,doorT,1.26,0.19,0.19,0.15,0.15);
          detail(berries,doorT,1.06,0.095,0.06,0.044,0.19);
          const lampT = doorT+0.82/length;
          detail(cedar,lampT,1.74,0.26,0.36,0.24,0.16);
          detail(lantern,lampT,1.74,0.2,0.23,0.23,0.19);
          detail(cedar,lampT,1.93,0.34,0.065,0.34,0.17);
          lanterns.push(new THREE.Vector3(a.x+dx*lampT+nx*0.43,base+1.74,a.z+dz*lampT+nz*0.43));
          const yard = doorT < 0.5 ? 0.76 : 0.24;
          yards.push({x:a.x+dx*yard+nx*2.3,z:a.z+dz*yard+nz*2.3,yaw,index:cottage.index});
        }
        if (cottage) {
          const axisA = profile.widthAt(a), axisB = profile.widthAt(c);
          const ridgeStops = profile.sections.map(p => (p-axisA)/(axisB-axisA)).filter(t => t > 0 && t < 1).sort((a,c) => a-c);
          const stops = [0,...ridgeStops,1];
          for (let j = 1; j < stops.length; j++) {
            const from = stops[j-1], to = stops[j], t = (from+to)*0.5;
            const y1 = roofY(THREE.MathUtils.lerp(axisA,axisB,from));
            const y2 = roofY(THREE.MathUtils.lerp(axisA,axisB,to));
            const run = (to-from)*length, dy = y2-y1;
            const edgeLength = Math.hypot(run,dy);
            const slope = -winding*Math.atan2(dy,run);
            const x = a.x+dx*t, z = a.z+dz*t, y = (y1+y2)*0.5;
            addDetail(cedar,x+nx*0.10,y-0.13,z+nz*0.10,yaw,edgeLength+0.09,0.23,0.39,slope,base);
            addDetail(frame,x+nx*0.24,y-0.14,z+nz*0.24,yaw,edgeLength+0.10,0.12,0.10,slope,base);
            addDetail(roofSnow,x+nx*0.11,y+0.02,z+nz*0.11,yaw,edgeLength+0.15,0.19,0.42,slope,base);
            if (length < 2.5) continue;
            if (i === mainFace || Math.abs(dy) > 0.3) {
              addDetail(greenGarland,x+nx*0.26,y-0.27,z+nz*0.26,yaw,edgeLength,0.16,0.16,slope,base);
            }
            const lamps = Math.min(15,Math.ceil(edgeLength*1.6));
            for (let k = 0; k < lamps; k++) {
              const u = (k+0.5)/lamps;
              const position = THREE.MathUtils.lerp(from,to,u);
              const edgeY = THREE.MathUtils.lerp(y1,y2,u);
              detail(lightStrings[(k+cottage.index)%7 < 4 ? 0 : (k+cottage.index)%lightStrings.length],
                position,edgeY-0.30,0.073,0.098,0.073,0.32);
              if (k%4 === 0) {
                const drop = 0.16+(k*7+j*3)%8*0.026;
                detail(icicleMaterial,position,edgeY-drop/2,0.044,drop,0.048,0.27);
                detail(powder,position,edgeY+0.08,Math.min(0.75,run/lamps*1.4),0.15,0.24,0.23);
              }
            }
          }
          const gableHeight = roofY((axisA+axisB)*0.5) - height;
          if (length > 3 && Math.abs(axisA-axisB) > 0.55 && gableHeight > 1.05) {
            const framed = cottage.style.finish === 'plaster';
            if (framed) {
              detail(cedar,0.5,height+0.12,length,0.15,0.13);
              for (const t of [0.28,0.72]) {
                const h = roofY(THREE.MathUtils.lerp(axisA,axisB,t))-height-0.28;
                if (h > 0.2) detail(cedar,t,height+0.18+h/2,0.14,h,0.13);
              }
            }
            if (cottage.style.attic) detail(windowRound,0.5,height+gableHeight*0.48,0.71,0.71,1,0.10);
          }
          // Set dormers into the sloping roof and keep their full footprint inside the mapped building.
          if (cottage.style.attic && profile.rise > 1 && length > 6 && Math.abs(axisA-axisB) < 0.15 &&
              scores[i] > longest*0.35) {
            const count = length >= 9.5 && cottage.style.windows === 2 ? 2 : 1;
            for (let dormer = 0; dormer < count; dormer++) {
              const t = count === 2 ? 0.32+dormer*0.36 : 0.5;
              const x = a.x+dx*t, z = a.z+dz*t;
              const width = Math.min(1.4,length*0.17);
              const slopePoint = (depth: number,side = 0) => ({
                x:x-nx*depth+dx/length*side,z:z-nz*depth+dz/length*side,
              });
              const fits = [0.42,1.78].every(depth => [-width*0.58,width*0.58].every(side =>
                clearance.inside(slopePoint(depth,side),b.footprint)));
              if (!fits) continue;
              const front = roofY(profile.widthAt(slopePoint(0.45)));
              const back = roofY(profile.widthAt(slopePoint(1.75)));
              const top = Math.max(front+0.88,back+0.29);
              detail(wall,t,(height+top)*0.5,width,top-height,1.28,-1.1);
              detail(canopyWood,t,top+0.19,width+0.2,0.42,1.31,-1.08);
              detail(canopySnow,t,top+0.28,width+0.34,0.42,1.4,-1.08);
              detail(windowRound,t,top-0.37,0.61,0.61,1,-0.434);
              detail(frame,t,top-0.7,0.78,0.1,0.19,-0.42);
            }
          }
        }
        if (cottage) {
          const count = i === mainFace && length >= 7 ? cottage.style.windows : 1;
          const wide = cottage.style.finish === 'plaster' ? 1.45 : 1.14;
          const window = cottage.style.finish === 'plaster' ? windowArch : glass;
          for (let j = 0; j < count; j++) {
            const t = hasDoor
              ? THREE.MathUtils.lerp(doorT < 0.5 ? 0.48 : 0.08,doorT < 0.5 ? 0.92 : 0.52,(j+0.5)/count)
              : 0.5;
            if (length < wide + 0.8 || (hasDoor && Math.abs(t-doorT)*length < 1.28)) continue;
            const y = 1.42;
            if (i === mainFace && j === 0 && length >= 6 && cottage.style.finish !== 'logs' &&
                cottage.variation > 0.24 && (!hasDoor || Math.abs(t-doorT)*length > 1.85)) {
              detail(bayWood,t,0,1,1,1,0.03);
              detail(glass,t,1.37,0.94,1.04,1,0.48);
              for (const side of [-1,1]) {
                const angle = side*Math.atan2(0.46,0.35);
                const offset = side*0.71;
                addDetail(glass,a.x+dx*t+Math.cos(yaw)*offset+nx*0.26,1.37,
                  a.z+dz*t-Math.sin(yaw)*offset+nz*0.26,yaw+angle,0.47,1.02,1,0,base);
              }
              detail(greenGarland,t,0.74,1.12,0.17,0.19,0.50);
              detail(lightPool,t,0.064,4.1,3.1,1,1.4);
              continue;
            }
            detail(window,t,y,wide,1.06,1,0.084);
            detail(frame,t,y-0.54,wide+0.19,0.13,0.24,0.12);
            detail(powder,t,y-0.45,(wide+0.18)/2,0.075,0.17,0.14);
            if (cottage.style.finish !== 'plaster') {
              for (const side of [-1,1]) {
                detail(frame,t+side*(wide*0.5+0.055)/length,y,0.11,1.13,0.12);
                if (cottage.style.finish === 'boards' && length > 4.5) {
                  const offset = t+side*(wide*0.5+0.25)/length;
                  detail(shutters[cottage.index],offset,y,0.29,0.96,0.11,0.09);
                  for (const yOffset of [-0.25,0.25]) {
                    detail(frame,offset,y+yOffset,0.26,0.044,0.034,0.158);
                  }
                }
              }
            }
            if (i === mainFace || (cottage.style.finish === 'plaster' && length > 4)) {
              detail(cedar,t,y-0.67,wide*0.90,0.17,0.28,0.18);
              detail(greenGarland,t,y-0.57,wide*0.89,0.16,0.25,0.27);
              for (const offset of [-0.28,0,0.28]) {
                detail(berries,t+offset*wide/length,y-0.53,0.054,0.057,0.055,0.38);
              }
              detail(lightPool,t,0.063,3.8,3.0,1,1.2);
            }
          }
        } else if (!factory && !home && length > 3.6) {
          detail(windowArch,0.5,height*0.43,1.5,Math.min(3,height*0.39));
        }
        if (home) {
          detail(foundationStone,0.5,0.15,length,0.28,0.13);
          continue;
        }
        if (length > 1) detail(cable,0.5,height-0.27,length,0.03,0.03,0.14);
        const ornaments = Math.min(32,Math.floor(length / 0.68));
        for (let j = 0; j < ornaments; j++) {
          const t = (j+0.5)/ornaments;
          const dip = Math.sin(Math.PI*t)*0.28;
          detail(lightStrings[(j+i)%lightStrings.length],t,height-0.23-dip,0.085,0.105,0.085,0.14);
        }
      }
    }
    this.villageLights.setLanterns(lanterns);
    for (const [material, parts] of batches) {
      const geometry = mergeGeometries(parts);
      if (geometry) {
        this.surface(geometry,material);
        this.group.children.at(-1)!.castShadow = true;
      }
      parts.forEach(part => part.dispose());
    }
    const planted: OsmPoint2D[] = [];
    const plant = (p: OsmPoint2D) => {
      if (clearance.clear(p,2.12) && !planted.some(q => Math.hypot(p.x-q.x,p.z-q.z) < 4.4)) planted.push(p);
    };
    for (const p of snapshot.trees ?? []) plant(p);
    for (const ring of snapshot.woodland ?? []) {
      const minX = Math.min(...ring.map(p => p.x)), maxX = Math.max(...ring.map(p => p.x));
      const minZ = Math.min(...ring.map(p => p.z)), maxZ = Math.max(...ring.map(p => p.z));
      for (let i = 1; i <= 27; i++) {
        const x = THREE.MathUtils.lerp(minX,maxX,i*0.618034%1);
        const z = THREE.MathUtils.lerp(minZ,maxZ,i*0.414214%1);
        if (Math.hypot(x,z) < 280 && clearance.inside({x,z},ring)) plant({x,z});
      }
    }
    const ornaments: {x: number; z: number; radius: number}[] = [];
    const available = (p: OsmPoint2D,radius: number) => clearance.clear(p,radius) &&
      !planted.some(tree => Math.hypot(p.x-tree.x,p.z-tree.z) < radius+2.12) &&
      !ornaments.some(q => Math.hypot(p.x-q.x,p.z-q.z) < radius+q.radius);
    for (const [i,yard] of yards.entries()) {
      const {x,z,yaw,index} = yard;
      if (i%3 !== 1 || ornaments.length >= 22 || !available(yard,0.83)) continue;
      ornaments.push({x,z,radius:0.83});
      const scale = 0.73+(index%4)*0.09;
      const frontX = Math.sin(yaw), frontZ = Math.cos(yaw);
      addDetail(snowmanSnow,x,0.42*scale,z,yaw,0.46*scale,0.44*scale,0.46*scale);
      addDetail(snowmanSnow,x,0.99*scale,z,yaw,0.34*scale,0.36*scale,0.34*scale);
      addDetail(snowmanSnow,x,1.46*scale,z,yaw,0.28*scale,0.27*scale,0.28*scale);
      addDetail(scarves[index%scarves.length],x,1.25*scale,z,yaw,0.26*scale,0.19*scale,0.26*scale);
      addDetail(hat,x,1.67*scale,z,yaw,0.34*scale,0.07*scale,0.32*scale);
      addDetail(hat,x,1.81*scale,z,yaw,0.21*scale,0.29*scale,0.21*scale);
      addDetail(carrot,x+frontX*0.32*scale,1.44*scale,z+frontZ*0.32*scale,yaw,0.063*scale,0.23*scale,0.063*scale);
      for (const side of [-1,1]) {
        addDetail(coal,x+(frontX*0.248+frontZ*side*0.085)*scale,1.52*scale,
          z+(frontZ*0.248-frontX*side*0.085)*scale,yaw,0.032*scale,0.042*scale,0.032*scale);
      }
    }
    // Snow drifts add low relief in mapped open space. Keep their full radius off the road and buildings.
    let drifts = 0;
    for (const [i,yard] of yards.entries()) {
      if (drifts >= 62) break;
      const side = i%2 === 0 ? 1 : -1;
      const distance = 3.1 + i%4;
      const x = yard.x+Math.cos(yard.yaw)*side*distance + Math.sin(yard.yaw)*1.1;
      const z = yard.z-Math.sin(yard.yaw)*side*distance + Math.cos(yard.yaw)*1.1;
      const radius = 1.7+i%5*0.24;
      if (!available({x,z},radius)) continue;
      ornaments.push({x,z,radius});
      addDetail(powder,x,-0.03,z,yard.yaw+i*0.7,radius,0.21 + i%5*0.065,radius*0.62);
      drifts++;
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
      transform.position.set(p.x,groundY(p.x,p.z)+0.65*scale,p.z);
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
        transform.position.set(p.x,groundY(p.x,p.z)+y*scale,p.z);
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
      const geometry = material === logWood ? logBeam : material === bayWood ? bayGeometry : material === powder ? drift : material === hat ? topHat : material === snowmanSnow || material === coal ? snowBall :
        material === carrot ? nose : scarves.includes(material as THREE.MeshStandardMaterial) ? scarf : material === starGold ? starGeometry : material === lightPool ? floorPlane :
        material === canopyWood || material === canopySnow ? canopyGeometry : material === firWreath ? fir :
        material === icicleMaterial ? icicle : material === berries || lightStrings.includes(material as THREE.MeshBasicMaterial) ? bulb :
        [glass,crest,windowRound,windowArch,...cottageDoors].includes(material as THREE.MeshBasicMaterial) ? pane : boxUnit;
      const mesh = new THREE.InstancedMesh(geometry, material, matrices.length);
      matrices.forEach((matrix,index) => mesh.setMatrixAt(index,matrix));
      mesh.castShadow = [powder,snowmanSnow,hat].includes(material as THREE.MeshStandardMaterial);
      mesh.receiveShadow = mesh.castShadow;
      this.instances.push(mesh);
      this.group.add(mesh);
    }
    if (this.vents.length) {
      const geometry = new THREE.BufferGeometry();
      const attribute = new THREE.BufferAttribute(new Float32Array(this.vents.length*12),3);
      attribute.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute('position',attribute);
      geometry.setDrawRange(0,0);
      this.geometries.push(geometry);
      this.smoke = new THREE.Points(geometry,smokeMaterial);
      this.smoke.frustumCulled = false;
      this.group.add(this.smoke);
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
