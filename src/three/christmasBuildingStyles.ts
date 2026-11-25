import type { OsmBuilding, OsmPoint2D } from '../core/osmWorld';

type Roof = readonly (readonly [position: number, height: number])[];

const gabled = [[0,0],[0.5,1],[1,0]] as const;
const gambrel = [[0,0],[0.22,0.72],[0.5,1],[0.78,0.72],[1,0]] as const;
const saltbox = [[0,0],[0.36,1],[1,0]] as const;
const shed = [[0,0.16],[1,1]] as const;
const flat = [[0,0],[1,0]] as const;

export const cottageStyles = [
  { name:'Faluröd Sekelskiftesvilla', color:'#9e232a', finish:'boards', roof:gabled, wall:3.55, pitch:0.62, windows:2, attic:true, porch:'porch', trim:'#f7ebd2', door:'#286448' },
  { name:'Timmerstuga i Fjällen', color:'#82492c', finish:'logs', roof:gambrel, wall:3.35, pitch:0.56, windows:2, attic:true, porch:'porch', trim:'#f0c999', door:'#982230' },
  { name:'Pepparkaksbageri', color:'#b66939', finish:'plaster', roof:gabled, wall:3.85, pitch:0.74, windows:2, attic:true, porch:'awning', trim:'#fff2d6', door:'#a4243b' },
  { name:'Solgul Herrgårdsvilla', color:'#d49a3d', finish:'boards', roof:gambrel, wall:4.35, pitch:0.58, windows:3, attic:true, porch:'porch', trim:'#fcf3db', door:'#23686f' },
  { name:'Vinterblå Saga', color:'#335e86', finish:'boards', roof:gabled, wall:3.65, pitch:0.66, windows:2, attic:true, porch:'canopy', trim:'#f2f6fa', door:'#9e2a45' },
  { name:'Skogsgrön Alpstuga', color:'#255748', finish:'logs', roof:saltbox, wall:3.45, pitch:0.58, windows:2, attic:true, porch:'porch', trim:'#f6dfaa', door:'#b83935' },
  { name:'Polarexpressen Station', color:'#9c2536', finish:'plaster', roof:gambrel, wall:3.95, pitch:0.64, windows:2, attic:true, porch:'awning', trim:'#fff1cb', door:'#2b6b4a' },
  { name:'Gräddvit Drömvilla', color:'#dfd1bc', finish:'boards', roof:gabled, wall:4.15, pitch:0.60, windows:3, attic:true, porch:'porch', trim:'#ffffff', door:'#9e2236' },
] as const;

const osmRoofs: Record<string, Roof | undefined> = {
  gabled, gambrel, saltbox, skillion:shed, flat, mansard:gambrel,
};

export function cottageModel(building: OsmBuilding) {
  if (building.tesla || (building.kind !== 'small_cottage' && building.kind !== 'medium_house')) return undefined;
  let hash = 2166136261;
  for (const char of building.id) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  hash ^= hash >>> 16;
  const index = (hash >>> 0) % cottageStyles.length;
  const style = cottageStyles[index];
  return {
    index,
    style,
    roof: (building.roofShape && osmRoofs[building.roofShape]) || style.roof,
    wallHeight: style.wall + (building.levels !== undefined && building.levels >= 2 ? 0.95 : 0),
    variation: (hash >>> 21) / 2047,
  };
}

// Measure roof width across the longest façade. Axis and distances are invariant when the map origin moves.
export function roofProjection(footprint: OsmPoint2D[], profile: Roof, pitch: number, heightLimit = 5.8) {
  let longest = 0, axis = {x:1,z:0};
  for (let i = 0; i < footprint.length; i++) {
    const a = footprint[i], b = footprint[(i+1)%footprint.length];
    const dx = b.x-a.x, dz = b.z-a.z;
    const length = Math.hypot(dx,dz);
    if (length > longest) {
      longest = length;
      axis = {x:-dz/length,z:dx/length};
      if (axis.x < -0.001 || (Math.abs(axis.x) < 0.001 && axis.z < 0)) {
        axis.x *= -1;
        axis.z *= -1;
      }
    }
  }
  const project = (point: OsmPoint2D) => point.x*axis.x+point.z*axis.z;
  const points = footprint.map(project);
  const min = Math.min(...points);
  const span = Math.max(0.01,Math.max(...points)-min);
  const rise = Math.min(heightLimit,span*pitch);
  const widthAt = (p: OsmPoint2D) => Math.min(1,Math.max(0,(project(p)-min)/span));
  const sections = profile.map(([u]) => u);
  const yAt = (u: number) => {
    const i = Math.max(1,profile.findIndex(([position]) => position >= u));
    const [a,ya] = profile[i-1], [b,yb] = profile[i];
    return 0.24+rise*(ya+(yb-ya)*(u-a)/(b-a));
  };
  return { widthAt, yAt, sections, rise };
}

export function buildingWallHeight(building: OsmBuilding): number {
  return cottageModel(building)?.wallHeight ?? Math.max(4.4, Math.min(18, building.heightM * 0.74));
}
