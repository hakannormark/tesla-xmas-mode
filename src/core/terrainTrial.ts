import data from './iglsTerrain.json';
import type { OsmMapSnapshot, OsmPoint2D, OsmWorldState } from './osmWorld';
import type { TelemetryFrame } from './telemetry';

const points = (coords: number[][]): OsmPoint2D[] => coords.map(([x,z]) => ({x,z}));
const [latitude,longitude] = data.origin;
const metersPerLon = 111320*Math.cos(latitude*Math.PI/180);
const path = points(data.path);
const buildings: OsmMapSnapshot['buildings'] = data.buildings.map((item,i) => {
  const footprint = points(item.ring);
  const xs = footprint.map(p => p.x), zs = footprint.map(p => p.z);
  const widthM = Math.max(...xs)-Math.min(...xs), depthM = Math.max(...zs)-Math.min(...zs);
  return { id:`igls-${i}`, footprint, centerX:Math.min(...xs)+widthM/2, centerZ:Math.min(...zs)+depthM/2,
    widthM,depthM,areaM2:widthM*depthM,heightM:item.height,kind:'small_cottage',name:null };
});
const snapshot: OsmMapSnapshot = {
  version:-4,originLat:latitude,originLon:longitude,biome:'village',buildings,trees:[],
  waters:[],forests:[],pois:[],
  roads:data.roads.map(r => ({name:r.name,points:points(r.points),widthM:r.width,isMajor:r.width>6})),
};
export const terrainMap: OsmWorldState = {
  enabled:true,isLiveOsm:true,placeName:'Igls · Höjdtest',roadName:'Badhausstraße',biome:'village',
  nearbyLandmark:null,nearbyChargerName:null,isNearRealTunnel:false,landmarkPulse:0,
  snapshot,buildingCount:buildings.length,waterCount:0,forestCount:0,demoTravelM:0,
};

export const terrainDatum = data.datum;
const {minX,minZ,cols,rows,spacing,heights} = data.grid;
export const terrainFloor = Math.min(...heights)/10-2;
export const terrainBounds = {minX,minZ,maxX:minX+(cols-1)*spacing,maxZ:minZ+(rows-1)*spacing};
const clamp = (n: number, min: number, max: number) => Math.min(max,Math.max(min,n));
function interpolate(a: number,b: number,c: number,d: number,t: number): number {
  const t2 = t*t;
  return 0.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t2*t);
}
const getHeight = (x: number,z: number) => heights[clamp(z,0,rows-1)*cols+clamp(x,0,cols-1)]/10;
function sourceHeight(x: number,z: number): number {
  const gx = (x-minX)/spacing, gz = (z-minZ)/spacing;
  const edge = Math.min(gx,gz,cols-1-gx,rows-1-gz);
  if (edge <= 0) return terrainFloor;
  const ix = Math.floor(gx), iz = Math.floor(gz);
  const h = (row: number) => interpolate(getHeight(ix-1,row),getHeight(ix,row),getHeight(ix+1,row),getHeight(ix+2,row),gx-ix);
  const height = interpolate(h(iz-1),h(iz),h(iz+1),h(iz+2),gz-iz);
  const t = clamp(edge/6,0,1);
  return terrainFloor+(height-terrainFloor)*t*t*(3-2*t);
}

const distance = [0];
for (let i = 1; i < path.length; i++) {
  distance.push(distance[i-1]+Math.hypot(path[i].x-path[i-1].x,path[i].z-path[i-1].z));
}
const routeLength = distance[distance.length-1];
function pointAt(offset: number): OsmPoint2D {
  const index = Math.max(1,distance.findIndex(d => d >= offset));
  const a = path[index-1],b = path[index];
  const t = (offset-distance[index-1])/(distance[index]-distance[index-1]);
  return {x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t};
}

// These surface-model tiles include trees and roof tops. Smooth the road grade
// locally and feather the correction into the surrounding terrain.
const spacingAlong = 5;
const stations = Array.from({length:Math.ceil(routeLength/spacingAlong)+1},(_,i) => {
  const offset = Math.min(routeLength,i*spacingAlong);
  return {...pointAt(offset),offset,height:0};
});
const rawHeights = stations.map(point => sourceHeight(point.x,point.z));
for (let i = 0; i < stations.length; i++) {
  let weighted = 0,weightSum = 0;
  for (let j = Math.max(0,i-6); j <= Math.min(stations.length-1,i+6); j++) {
    const weight = Math.exp(-Math.pow((stations[j].offset-stations[i].offset)/16,2));
    weighted += rawHeights[j]*weight;
    weightSum += weight;
  }
  stations[i].height = weighted/weightSum;
}
const maxGrade = 0.185;
const first = rawHeights[0], last = rawHeights[rawHeights.length-1];
for (const station of stations) {
  const fromStart = station.offset*maxGrade;
  const fromEnd = (routeLength-station.offset)*maxGrade;
  station.height = clamp(station.height,Math.max(first-fromStart,last-fromEnd),Math.min(first+fromStart,last+fromEnd));
}
const riseAt = (i: number,j: number) => Math.abs(stations[i].offset-stations[j].offset)*maxGrade;
for (let i = 1; i < stations.length; i++) {
  const previous = stations[i-1].height;
  stations[i].height = clamp(stations[i].height,previous-riseAt(i,i-1),previous+riseAt(i,i-1));
}
const segments = stations.slice(1).map((b,i) => {
  const a = stations[i];
  return {a,b,dx:b.x-a.x,dz:b.z-a.z};
});

export function trialHeight(x: number,z: number): number {
  const raw = sourceHeight(x,z);
  const verge = 27;
  let squared = verge*verge;
  let roadY = raw;
  for (const {a,b,dx,dz} of segments) {
    if (x < Math.min(a.x,b.x)-verge || x > Math.max(a.x,b.x)+verge ||
        z < Math.min(a.z,b.z)-verge || z > Math.max(a.z,b.z)+verge) continue;
    const lengthSq = dx*dx+dz*dz;
    if (!lengthSq) continue;
    const t = clamp(((x-a.x)*dx+(z-a.z)*dz)/lengthSq,0,1);
    const error = (x-a.x-t*dx)**2+(z-a.z-t*dz)**2;
    if (error < squared) {
      squared = error;
      roadY = a.height+(b.height-a.height)*t;
    }
  }
  const t = clamp((verge-Math.sqrt(squared))/(verge-4),0,1);
  return raw+(roadY-raw)*t*t*(3-2*t);
}

export class TerrainTrial {
  traveled = 0;
  paused = false;
  get complete(): boolean { return this.traveled >= routeLength; }

  update(dt: number, original: TelemetryFrame): TelemetryFrame {
    const speedKmh = this.paused || this.complete ? 0 : 26;
    this.traveled = Math.min(routeLength,this.traveled+dt*speedKmh/3.6);
    const point = pointAt(this.traveled);
    const ahead = pointAt(Math.min(routeLength,this.traveled+6));
    const behind = pointAt(Math.max(0,this.traveled-5));
    const headingDeg = (Math.atan2(ahead.x-behind.x,behind.z-ahead.z)*180/Math.PI+360)%360;
    const lat = latitude-point.z/110540;
    return {...original, source:'demo',gpsStatus:'active',latitude:lat,longitude:longitude+point.x/metersPerLon,
      speedKmh,headingDeg,rawSpeedKmh:speedKmh,isMoving:speedKmh>0,acceleration:0,turnRate:0,isBraking:false,
      northPoleDistanceKm:(90-lat)*111.32,northPoleRelativeBearingDeg:(360-headingDeg)%360};
  }
}
