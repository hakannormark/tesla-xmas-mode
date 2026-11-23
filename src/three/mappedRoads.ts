import * as THREE from 'three';
import { geoDeltaMeters, OsmMapSnapshot, OsmRoadRibbon } from '../core/osmWorld';
import type { TelemetryFrame } from '../core/telemetry';

// Preserve each OSM vertex, including the common node where two streets meet.
export function streetGeometry(roads: OsmRoadRibbon[], elevation?: (x: number,z: number) => number): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  for (const road of roads) {
    const vertices = road.points.filter((p, i, all) => !i || p.x !== all[i - 1].x || p.z !== all[i - 1].z);
    if (vertices.length < 2) continue;
    const points = elevation ? vertices.flatMap((b,i) => {
      if (!i) return [b];
      const a = vertices[i-1];
      const steps = Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/2.5);
      return Array.from({length:steps},(_,j) => {
        const t = (j+1)/steps;
        return {x:THREE.MathUtils.lerp(a.x,b.x,t),z:THREE.MathUtils.lerp(a.z,b.z,t)};
      });
    }) : vertices;
    let traveled = 0;
    const across = elevation ? 4 : 1;
    const stride = across+1;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const prev = points[Math.max(0, i - 1)];
      const next = points[Math.min(points.length - 1, i + 1)];
      const length = Math.hypot(next.x - prev.x, next.z - prev.z) || 1;
      const dx = (next.z - prev.z) * road.widthM / (2 * length);
      const dz = (prev.x - next.x) * road.widthM / (2 * length);
      if (i) traveled += Math.hypot(p.x-prev.x,p.z-prev.z);
      const start = positions.length/3;
      for (let lane = 0; lane <= across; lane++) {
        const side = 1-2*lane/across;
        const x = p.x+dx*side,z = p.z+dz*side;
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
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
  geometry.computeVertexNormals();
  return geometry;
}

export function streetAtCar(snapshot: OsmMapSnapshot, car: TelemetryFrame): OsmRoadRibbon | undefined {
  const pos = geoDeltaMeters(snapshot.originLat, snapshot.originLon, car.latitude, car.longitude);
  const angle = car.headingDeg * Math.PI / 180;
  let bestScore = Infinity;
  let match: OsmRoadRibbon | undefined;
  for (const road of snapshot.roads) {
    for (let i = 1; i < road.points.length; i++) {
      const a = road.points[i - 1], b = road.points[i];
      const dx = b.x - a.x, dz = b.z - a.z;
      const length = Math.hypot(dx, dz);
      if (!length) continue;
      const t = THREE.MathUtils.clamp(((pos.x - a.x) * dx + (pos.z - a.z) * dz) / (length * length), 0, 1);
      const distance = Math.hypot(a.x + t * dx - pos.x, a.z + t * dz - pos.z);
      if (distance > road.widthM / 2 + 12) continue;
      const alignment = Math.abs((dx * Math.sin(angle) - dz * Math.cos(angle)) / length);
      const score = distance + (1 - alignment) * 5;
      if (score < bestScore) { bestScore = score; match = road; }
    }
  }
  return match;
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
