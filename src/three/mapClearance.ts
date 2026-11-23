import type { OsmMapSnapshot, OsmPoint2D } from '../core/osmWorld';

function segmentDistance(point: OsmPoint2D, a: OsmPoint2D, b: OsmPoint2D): number {
  const dx = b.x-a.x, dz = b.z-a.z;
  const lengthSq = dx*dx+dz*dz;
  if (!lengthSq) return Math.hypot(point.x-a.x,point.z-a.z);
  const t = Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.z-a.z)*dz)/lengthSq));
  return Math.hypot(point.x-a.x-t*dx,point.z-a.z-t*dz);
}

function inside(point: OsmPoint2D, ring: OsmPoint2D[]): boolean {
  let enclosed = false;
  for (let i = 0,j = ring.length-1; i < ring.length; j = i++) {
    const a = ring[i], b = ring[j];
    if ((a.z > point.z) !== (b.z > point.z) &&
      point.x < (b.x-a.x)*(point.z-a.z)/(b.z-a.z)+a.x) enclosed = !enclosed;
  }
  return enclosed;
}

export function mapClearance(snapshot: OsmMapSnapshot) {
  const roads = snapshot.roads.flatMap(r => r.points.slice(1).map((b,i) => ({a:r.points[i],b,width:r.widthM/2})));
  const ribbons = snapshot.waters.filter(w => !w.isPolygon)
    .flatMap(w => w.points.slice(1).map((b,i) => ({a:w.points[i],b,width:w.widthM/2})));
  const outlines = [...snapshot.buildings.map(b => b.footprint), ...snapshot.waters.filter(w => w.isPolygon).map(w => w.points)]
    .map(ring => ({
      ring, minX:Math.min(...ring.map(p => p.x)), maxX:Math.max(...ring.map(p => p.x)),
      minZ:Math.min(...ring.map(p => p.z)), maxZ:Math.max(...ring.map(p => p.z)),
    }));
  const segments = [...roads,...ribbons];
  const clear = (point: OsmPoint2D, radius: number) => {
    for (const {a,b,width} of segments) {
      const margin = width+radius;
      if (point.x < Math.min(a.x,b.x)-margin || point.x > Math.max(a.x,b.x)+margin ||
          point.z < Math.min(a.z,b.z)-margin || point.z > Math.max(a.z,b.z)+margin) continue;
      if (segmentDistance(point,a,b) < margin) return false;
    }
    for (const outline of outlines) {
      if (point.x < outline.minX-radius || point.x > outline.maxX+radius ||
          point.z < outline.minZ-radius || point.z > outline.maxZ+radius) continue;
      if (inside(point,outline.ring) || outline.ring.some((a,i) =>
        segmentDistance(point,a,outline.ring[(i+1)%outline.ring.length]) < radius)) return false;
    }
    return true;
  };
  return {clear,inside};
}
