import type { OsmBuilding, OsmPoint2D } from '../core/osmWorld';

type Roof = readonly (readonly [position: number, height: number])[];

const gabled = [[0,0],[0.5,1],[1,0]] as const;
const gambrel = [[0,0],[0.22,0.69],[0.5,1],[0.78,0.69],[1,0]] as const;
const saltbox = [[0,0],[0.36,1],[1,0]] as const;
const shed = [[0,0.12],[1,1]] as const;
const flat = [[0,0],[1,0]] as const;

export const cottageStyles = [
  { name:'Falu torp', color:'#ac3d38', finish:'boards', roof:gabled, wall:2.55, pitch:0.38, windows:2, attic:false, porch:'canopy', trim:'#f5d9a6', door:'#467953' },
  { name:'Skogsstuga', color:'#93593c', finish:'logs', roof:saltbox, wall:2.3, pitch:0.30, windows:1, attic:false, porch:'stoop', trim:'#d9a578', door:'#663631' },
  { name:'Julbageri', color:'#d39b64', finish:'plaster', roof:gambrel, wall:2.85, pitch:0.37, windows:2, attic:true, porch:'awning', trim:'#fbe2b4', door:'#a93746' },
  { name:'Ängsvilla', color:'#e9c380', finish:'boards', roof:gabled, wall:3.25, pitch:0.30, windows:2, attic:true, porch:'porch', trim:'#fcf1d5', door:'#2d7881' },
  { name:'Norrskenstorp', color:'#417c83', finish:'boards', roof:saltbox, wall:2.65, pitch:0.36, windows:1, attic:true, porch:'canopy', trim:'#cde8eb', door:'#793b56' },
  { name:'Älvstuga', color:'#587942', finish:'logs', roof:shed, wall:2.4, pitch:0.24, windows:2, attic:false, porch:'stoop', trim:'#f5d59a', door:'#c45742' },
  { name:'Pepparkakshus', color:'#ab765d', finish:'plaster', roof:gabled, wall:2.48, pitch:0.52, windows:1, attic:true, porch:'awning', trim:'#fff0cc', door:'#357755' },
  { name:'Skymningsvilla', color:'#7578a0', finish:'boards', roof:gambrel, wall:3.05, pitch:0.34, windows:2, attic:true, porch:'porch', trim:'#e4dbec', door:'#a64855' },
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
  return { index, style, roof:(building.roofShape && osmRoofs[building.roofShape]) || style.roof,
    wallHeight: style.wall + (building.levels !== undefined && building.levels >= 2 ? 0.15 : 0),
    variation: (hash >>> 21) / 2047 };
}

// Measure roof width across the longest façade. Axis and distances are invariant when the map origin moves.
export function roofProjection(footprint: OsmPoint2D[], profile: Roof, pitch: number, heightLimit = 3.25) {
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
    return 0.21+rise*(ya+(yb-ya)*(u-a)/(b-a));
  };
  return { widthAt, yAt, sections, rise };
}

export function buildingWallHeight(building: OsmBuilding): number {
  return cottageModel(building)?.wallHeight ?? Math.max(3,Math.min(16,building.heightM*0.65));
}
