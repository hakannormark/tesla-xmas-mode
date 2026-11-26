import * as THREE from 'three';
import { geoDeltaMeters, OsmMapSnapshot, OsmRoadRibbon } from '../core/osmWorld';
import type { TelemetryFrame } from '../core/telemetry';

type Point = {x:number; z:number};
type Arm = {angle:number; half:number; length:number};
type Junction = {point:Point; arms:Arm[]; radius:number};
const pointKey = (p:Point) => p.x.toFixed(3)+','+p.z.toFixed(3);

export function roadJunctions(roads: OsmRoadRibbon[]) {
  const nodes = new Map<string,Junction>();
  for (const road of roads) {
    for (const [i,p] of road.points.entries()) {
      const key = pointKey(p);
      const node = nodes.get(key) ?? {point:p,arms:[],radius:0};
      for (const next of [road.points[i-1],road.points[i+1]]) {
        if (!next) continue;
        const dx = next.x-p.x, dz = next.z-p.z;
        const length = Math.hypot(dx,dz);
        if (length < 0.01) continue;
        const angle = Math.atan2(dz,dx);
        const same = node.arms.find(a => Math.cos(a.angle-angle)>0.99999);
        if (same) same.half = Math.max(same.half,road.widthM/2);
        else node.arms.push({angle,half:road.widthM/2,length});
      }
      nodes.set(key,node);
    }
  }
  for (const [key,node] of nodes) {
    if (node.arms.length < 3) nodes.delete(key);
    else {
      node.arms.sort((a,b) => a.angle-b.angle);
      node.radius = Math.max(...node.arms.map(a => a.half))*2.4;
    }
  }
  return nodes;
}

// Fill each corner between adjacent approach edges with a rounded ploughed apron.
export function junctionGeometry(nodes: Map<string,Junction>, elevation?: (x:number,z:number)=>number, shoulder = 0) {
  const positions:number[] = [], indices:number[] = [], uvs:number[] = [], widths:number[] = [];
  for (const {point,arms,radius} of nodes.values()) {
    const primary = arms[0];
    const pCos = primary ? Math.cos(primary.angle) : 1;
    const pSin = primary ? Math.sin(primary.angle) : 0;
    const roadW = Math.max(4, radius / 1.2);
    const invRadius = 1 / Math.max(1, radius + shoulder);
    const vertex = (x:number,z:number) => {
      positions.push(x,(elevation?.(x,z) ?? 0)+0.064,z);
      const dx = x - point.x;
      const dz = z - point.z;
      const radial = Math.min(1, Math.hypot(dx, dz) * invRadius);
      // Map center -> u=0.5 (across=0) and apron rim -> u~0.94 so slush/shoulder blends cleanly
      uvs.push(0.5 + radial * 0.44, dx * pCos + dz * pSin);
      widths.push(roadW);
      return positions.length/3-1;
    };
    const center = vertex(point.x,point.z);
    for (let i=0;i<arms.length;i++) {
      const a=arms[i], b=arms[(i+1)%arms.length];
      const gap=(b.angle-a.angle+Math.PI*2)%(Math.PI*2);
      if (gap >= Math.PI-0.03 || gap < 0.12) continue;
      const ax=Math.cos(a.angle), az=Math.sin(a.angle), bx=Math.cos(b.angle), bz=Math.sin(b.angle);
      const halfA=a.half+shoulder, halfB=b.half+shoulder;
      const runA=(halfB+halfA*Math.cos(gap))/Math.sin(gap);
      const runB=(halfA+halfB*Math.cos(gap))/Math.sin(gap);
      if (Math.max(runA,runB)>radius || Math.min(runA,runB)<0) continue;
      const fillet=Math.min(2.2,a.length-runA,b.length-runB,radius-Math.max(runA,runB));
      if (fillet <= 0) continue;
      const x=point.x-az*halfA+ax*runA, z=point.z+ax*halfA+az*runA;
      let last=vertex(x+ax*fillet,z+az*fillet);
      for (let j=1;j<=8;j++) {
        const t=j/8;
        const next=vertex(x+fillet*(ax*(1-t)**2+bx*t*t),z+fillet*(az*(1-t)**2+bz*t*t));
        indices.push(center,next,last);
        last=next;
      }
    }
  }
  const geometry=new THREE.BufferGeometry();
  const count=positions.length/3;
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
  geometry.setAttribute('junctionBlend',new THREE.Float32BufferAttribute(new Float32Array(count).fill(1),1));
  geometry.setAttribute('roadWidth',new THREE.Float32BufferAttribute(widths,1));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

// Preserve each OSM vertex, including the common node where two streets meet.
export function streetGeometry(roads: OsmRoadRibbon[], elevation?: (x: number,z: number) => number, junctions?: Map<string,Junction>): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  const blends: number[] = [];
  const widths: number[] = [];
  for (const road of roads) {
    const vertices = road.points.filter((p, i, all) => !i || p.x !== all[i - 1].x || p.z !== all[i - 1].z);
    if (vertices.length < 2) continue;
    const localNodes = junctions ? vertices.flatMap(p => junctions.get(pointKey(p)) ?? []) : [];
    const points = elevation || localNodes.length ? vertices.flatMap((b,i) => {
      if (!i) return [b];
      const a = vertices[i-1];
      const near = elevation || junctions?.has(pointKey(a)) || junctions?.has(pointKey(b));
      const steps = !near ? 1 : Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/5.0);
      return Array.from({length:steps},(_,j) => {
        const t = (j+1)/steps;
        return {x:THREE.MathUtils.lerp(a.x,b.x,t),z:THREE.MathUtils.lerp(a.z,b.z,t)};
      });
    }) : vertices;
    let traveled = 0;
    const across = elevation ? 2 : 1;
    const stride = across+1;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const prev = points[Math.max(0, i - 1)];
      const next = points[Math.min(points.length - 1, i + 1)];
      const incoming = Math.hypot(p.x-prev.x,p.z-prev.z) || 1;
      const outgoing = Math.hypot(next.x-p.x,next.z-p.z) || 1;
      const inX=(p.z-prev.z)/incoming, inZ=(prev.x-p.x)/incoming;
      const outX=(next.z-p.z)/outgoing, outZ=(p.x-next.x)/outgoing;
      const sumX=inX+outX, sumZ=inZ+outZ;
      const span=Math.hypot(sumX,sumZ);
      const nx=span>0.001 ? sumX/span : outX, nz=span>0.001 ? sumZ/span : outZ;
      const alignment=i===0 || i===points.length-1 ? 1 : Math.max(0.5,nx*outX+nz*outZ);
      const dx=nx*road.widthM/(2*alignment), dz=nz*road.widthM/(2*alignment);
      if (i) traveled += Math.hypot(p.x-prev.x,p.z-prev.z);
      const blend = localNodes.reduce((value,node) => Math.max(value,1-THREE.MathUtils.smoothstep(
        Math.hypot(p.x-node.point.x,p.z-node.point.z),node.radius*1.2,node.radius*2.2)),0);
      const start = positions.length/3;
      for (let lane = 0; lane <= across; lane++) {
        const side = 1-2*lane/across;
        const x = p.x+dx*side,z = p.z+dz*side;
        blends.push(blend);
        widths.push(road.widthM);
        uvs.push(lane/across,traveled);
        positions.push(x,(elevation?.(x,z) ?? 0)+0.047,z);
        if (i && lane > 0) {
          const j = start+lane;
          indices.push(j-stride-1,j-stride,j-1,j-1,j-stride,j);
        }
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.setAttribute('junctionBlend',new THREE.Float32BufferAttribute(blends,1));
  geometry.setAttribute('roadWidth',new THREE.Float32BufferAttribute(widths,1));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
  geometry.computeVertexNormals();
  return geometry;
}

// Soft wind-drifted snowbanks along both edges of each mapped street, tapering cleanly at junctions.
export function snowbankGeometry(roads: OsmRoadRibbon[], elevation?: (x: number, z: number) => number, junctions?: Map<string, Junction>): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  const junctionList = junctions ? [...junctions.values()] : [];

  for (const road of roads) {
    if (road.tunnel) continue;
    const vertices = road.points.filter((p, i, all) => !i || p.x !== all[i - 1].x || p.z !== all[i - 1].z);
    if (vertices.length < 2) continue;
    const points = vertices.flatMap((b, i) => {
      if (!i) return [b];
      const a = vertices[i - 1];
      const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 5.0));
      return Array.from({ length: steps }, (_, j) => {
        const t = (j + 1) / steps;
        return { x: THREE.MathUtils.lerp(a.x, b.x, t), z: THREE.MathUtils.lerp(a.z, b.z, t) };
      });
    });

    const half = road.widthM * 0.5;
    for (const sideSign of [1, -1] as const) {
      let traveled = 0;
      const cols = 4;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const prev = points[Math.max(0, i - 1)];
        const next = points[Math.min(points.length - 1, i + 1)];
        const incoming = Math.hypot(p.x - prev.x, p.z - prev.z) || 1;
        const outgoing = Math.hypot(next.x - p.x, next.z - p.z) || 1;
        const inX = (p.z - prev.z) / incoming, inZ = (prev.x - p.x) / incoming;
        const outX = (next.z - p.z) / outgoing, outZ = (p.x - next.x) / outgoing;
        const sumX = inX + outX, sumZ = inZ + outZ;
        const span = Math.hypot(sumX, sumZ);
        const nx = span > 0.001 ? sumX / span : outX;
        const nz = span > 0.001 ? sumZ / span : outZ;
        const alignment = i === 0 || i === points.length - 1 ? 1 : Math.max(0.5, nx * outX + nz * outZ);
        if (i) traveled += Math.hypot(p.x - prev.x, p.z - prev.z);

        const endTaper = i === 0 || i === points.length - 1 ? 0.15 : (i === 1 || i === points.length - 2 ? 0.72 : 1);
        const bankSampleX = p.x + nx * sideSign * (half + 0.85);
        const bankSampleZ = p.z + nz * sideSign * (half + 0.85);
        let junctionClear = 1;
        for (const node of junctionList) {
          const dist = Math.hypot(bankSampleX - node.point.x, bankSampleZ - node.point.z);
          if (dist < node.radius * 2.25) {
            const clear = THREE.MathUtils.smoothstep(dist, node.radius * 1.15, node.radius * 2.25);
            if (clear < junctionClear) junctionClear = clear;
          }
        }
        const scale = endTaper * junctionClear;
        const wave = 0.86 + 0.18 * Math.sin(traveled * 0.24 + sideSign * 1.7) + 0.08 * Math.cos(traveled * 0.43);
        const driftWobble = Math.sin(traveled * 0.19 + sideSign * 2.3) * 0.16 * scale;
        const profile = sideSign === 1
          ? [
              { offset: half + 1.92 + driftWobble * 1.2, y: -0.05 },
              { offset: half + 1.18 + driftWobble, y: THREE.MathUtils.lerp(-0.04, 0.26 * wave, scale) },
              { offset: half + 0.64 + driftWobble * 0.55, y: THREE.MathUtils.lerp(-0.04, 0.34 * wave, scale) },
              { offset: half + 0.05, y: THREE.MathUtils.lerp(-0.04, 0.015, scale) },
            ]
          : [
              { offset: -(half + 0.05), y: THREE.MathUtils.lerp(-0.04, 0.015, scale) },
              { offset: -(half + 0.64 + driftWobble * 0.55), y: THREE.MathUtils.lerp(-0.04, 0.34 * wave, scale) },
              { offset: -(half + 1.18 + driftWobble), y: THREE.MathUtils.lerp(-0.04, 0.26 * wave, scale) },
              { offset: -(half + 1.92 + driftWobble * 1.2), y: -0.05 },
            ];

        const start = positions.length / 3;
        for (let k = 0; k < cols; k++) {
          const { offset, y } = profile[k];
          const x = p.x + (nx * offset) / alignment;
          const z = p.z + (nz * offset) / alignment;
          positions.push(x, (elevation?.(x, z) ?? 0) + y, z);
          uvs.push(k / (cols - 1), traveled * 0.15);
          if (i && k > 0) {
            const j = start + k;
            indices.push(j - cols - 1, j - cols, j - 1, j - 1, j - cols, j);
          }
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export interface RoadProjection {
  road: OsmRoadRibbon;
  centerX: number;
  centerZ: number;
  tx: number;
  tz: number;
  rightX: number;
  rightZ: number;
  distance: number;
  signedLateral: number;
  alignment: number;
}

export function projectOntoRoad(
  snapshot: OsmMapSnapshot,
  pos: { x: number; z: number },
  headingDeg: number
): RoadProjection | undefined {
  const angle = (headingDeg * Math.PI) / 180;
  const carFwdX = Math.sin(angle);
  const carFwdZ = -Math.cos(angle);
  let bestScore = Infinity;
  let match: RoadProjection | undefined;
  for (const road of snapshot.roads) {
    for (let i = 1; i < road.points.length; i++) {
      const a = road.points[i - 1], b = road.points[i];
      const dx = b.x - a.x, dz = b.z - a.z;
      const length = Math.hypot(dx, dz);
      if (!length) continue;
      const t = THREE.MathUtils.clamp(((pos.x - a.x) * dx + (pos.z - a.z) * dz) / (length * length), 0, 1);
      const cx = a.x + t * dx;
      const cz = a.z + t * dz;
      const distance = Math.hypot(cx - pos.x, cz - pos.z);
      if (distance > road.widthM * 0.5 + 11.5) continue;
      const segTx = dx / length;
      const segTz = dz / length;
      const rawDot = segTx * carFwdX + segTz * carFwdZ;
      const alignment = Math.abs(rawDot);
      // On divided dual-carriageway highways, strongly prefer the carriageway whose legal oneway direction matches player heading
      const onewayPenalty = road.oneway && rawDot * road.oneway < -0.25 ? 14 : 0;
      const score = distance + (1 - alignment) * 6.5 + onewayPenalty;
      if (score < bestScore) {
        bestScore = score;
        const sign = rawDot >= 0 ? 1 : -1;
        const tx = segTx * sign;
        const tz = segTz * sign;
        const rightX = -tz;
        const rightZ = tx;
        const signedLateral = (pos.x - cx) * rightX + (pos.z - cz) * rightZ;
        match = { road, centerX: cx, centerZ: cz, tx, tz, rightX, rightZ, distance, signedLateral, alignment };
      }
    }
  }
  return match;
}

export function streetAtCar(snapshot: OsmMapSnapshot, car: TelemetryFrame): OsmRoadRibbon | undefined {
  const pos = geoDeltaMeters(snapshot.originLat, snapshot.originLon, car.latitude, car.longitude);
  return projectOntoRoad(snapshot, pos, car.headingDeg)?.road;
}

// Project onto the current OSM way and walk its actual vertices, without extrapolating past its ends.
export function pointAlongStreet(road: OsmRoadRibbon, car: {x: number; z: number}, heading: number, ahead: number) {
  let nearest = Infinity;
  let progress = 0;
  let direction = 1;
  let length = 0;
  const segments = road.points.slice(1).flatMap((b,i) => {
    const a = road.points[i];
    const dx = b.x-a.x, dz = b.z-a.z, meters = Math.hypot(dx,dz);
    if (!meters) return [];
    const project = THREE.MathUtils.clamp(((car.x-a.x)*dx+(car.z-a.z)*dz)/(meters*meters),0,1);
    const distance = Math.hypot(car.x-a.x-project*dx,car.z-a.z-project*dz);
    if (distance < nearest) {
      nearest = distance;
      progress = length + project*meters;
      direction = dx*Math.sin(heading)-dz*Math.cos(heading) >= 0 ? 1 : -1;
    }
    length += meters;
    return [{a,dx,dz,meters,end:length}];
  });
  const target = progress + ahead*direction;
  if (target < 0 || target > length) return undefined;
  const segment = segments.find(s => s.end >= target);
  if (!segment) return undefined;
  const {a,dx,dz,meters,end} = segment;
  const t = 1 - (end-target)/meters;
  return {x:a.x+t*dx, z:a.z+t*dz, heading:Math.atan2(direction*dx,-direction*dz)};
}
