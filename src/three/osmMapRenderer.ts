import * as THREE from 'three';
import { GraphicsQuality } from '../core/environment';
import {
  geoDeltaMeters,
  OsmBuilding,
  OsmMapSnapshot,
  OsmWorldState,
} from '../core/osmWorld';
import { TelemetryFrame } from '../core/telemetry';
import { createSparklingSnowMaterial } from './pixarMaterials';
import {
  createHolidayRoadSign,
  createPixarPineTree,
} from './pixarModels';
import { createAccurateSuperchargerPlaza } from './teslaModels';
import { createPixarForestAnimal, PixarAnimalHandle, WildlifeKind } from './pixarWildlife';

interface FacadePalette {
  wall: string;
  trim: string;
  shutter: string;
}

const FACADE_PALETTES: FacadePalette[] = [
  { wall: '#7c1e26', trim: '#f2e8da', shutter: '#194534' }, // Swedish Falu red cottage/townhouse
  { wall: '#c78c48', trim: '#fff1db', shutter: '#2e4663' }, // Nordic Gamla Stan warm ochre
  { wall: '#c8bea8', trim: '#6b1822', shutter: '#1c4032' }, // Classical Stockholm cream plaster
];

let sharedFacadeMats: THREE.MeshStandardMaterial[] | null = null;
let sharedSnowRoofMat: THREE.MeshStandardMaterial | null = null;
let sharedWaterMat: THREE.MeshPhysicalMaterial | null = null;
let sharedSecondaryRoadMat: THREE.MeshStandardMaterial | null = null;
let sharedGoldFairyMat: THREE.MeshBasicMaterial | null = null;
let sharedSpireMat: THREE.MeshStandardMaterial | null = null;
let sharedChurchGlassMat: THREE.MeshBasicMaterial | null = null;

function markShared<T extends THREE.Material>(m: T): T {
  m.userData.shared = true;
  return m;
}

function makeFacadeTextures(pal: FacadePalette): {
  map: THREE.CanvasTexture;
  emissive: THREE.CanvasTexture;
} {
  const w = 256;
  const h = 256;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = w;
  colorCanvas.height = h;
  const cCtx = colorCanvas.getContext('2d')!;

  const emCanvas = document.createElement('canvas');
  emCanvas.width = w;
  emCanvas.height = h;
  const eCtx = emCanvas.getContext('2d')!;

  cCtx.fillStyle = pal.wall;
  cCtx.fillRect(0, 0, w, h);
  eCtx.fillStyle = '#000000';
  eCtx.fillRect(0, 0, w, h);

  // Subtle horizontal clapboard / masonry bands
  cCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  for (let y = 0; y < h; y += 16) {
    cCtx.fillRect(0, y, w, 2);
  }

  // Warm glowing Nordic windows (2 rows x 3 columns per tile)
  const cols = 3;
  const rows = 2;
  const cw = w / cols;
  const rh = h / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = c * cw + 20;
      const wy = r * rh + 24;
      const ww = cw - 40;
      const wh = rh - 52;

      // Window frame + shutters
      cCtx.fillStyle = pal.shutter;
      cCtx.fillRect(wx - 7, wy, 6, wh);
      cCtx.fillRect(wx + ww + 1, wy, 6, wh);
      cCtx.fillStyle = pal.trim;
      cCtx.fillRect(wx - 3, wy - 4, ww + 6, wh + 8);

      // Warm backlit amber pane
      const grad = cCtx.createLinearGradient(wx, wy, wx, wy + wh);
      grad.addColorStop(0, '#ffe8a3');
      grad.addColorStop(1, '#ffaf47');
      cCtx.fillStyle = grad;
      cCtx.fillRect(wx, wy, ww, wh);

      eCtx.fillStyle = (r + c) % 4 === 0 ? '#ffd078' : '#ffbd58';
      eCtx.fillRect(wx + 2, wy + 2, ww - 4, wh - 4);

      // Window mullions
      cCtx.fillStyle = pal.trim;
      cCtx.fillRect(wx + ww * 0.5 - 1.5, wy, 3, wh);
      cCtx.fillRect(wx, wy + wh * 0.48 - 1.5, ww, 3);
      eCtx.fillStyle = '#000000';
      eCtx.fillRect(wx + ww * 0.5 - 1.5, wy, 3, wh);
      eCtx.fillRect(wx, wy + wh * 0.48 - 1.5, ww, 3);

      // Snowy sill
      cCtx.fillStyle = '#e2eefc';
      cCtx.fillRect(wx - 6, wy + wh + 2, ww + 12, 6);
    }
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(0.08, 0.11);
  map.colorSpace = THREE.SRGBColorSpace;

  const emissive = new THREE.CanvasTexture(emCanvas);
  emissive.wrapS = emissive.wrapT = THREE.RepeatWrapping;
  emissive.repeat.set(0.08, 0.11);
  emissive.colorSpace = THREE.SRGBColorSpace;

  return { map, emissive };
}

function getFacadeMats(): THREE.MeshStandardMaterial[] {
  if (sharedFacadeMats) return sharedFacadeMats;
  sharedFacadeMats = FACADE_PALETTES.map((pal) => {
    const tex = makeFacadeTextures(pal);
    return markShared(
      new THREE.MeshStandardMaterial({
        map: tex.map,
        emissiveMap: tex.emissive,
        emissive: new THREE.Color('#ffbd58'),
        emissiveIntensity: 0.9,
        roughness: 0.72,
      })
    );
  });
  return sharedFacadeMats;
}

function getSharedEnvMaterials() {
  if (!sharedSnowRoofMat) {
    sharedSnowRoofMat = markShared(createSparklingSnowMaterial('#a6c0e4'));
  }
  if (!sharedWaterMat) {
    sharedWaterMat = markShared(
      new THREE.MeshPhysicalMaterial({
        color: '#1b3e72',
        roughness: 0.08,
        metalness: 0.25,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 0.9,
      })
    );
  }
  if (!sharedSecondaryRoadMat) {
    sharedSecondaryRoadMat = markShared(
      new THREE.MeshStandardMaterial({
        color: '#222f52',
        roughness: 0.78,
      })
    );
  }
  if (!sharedGoldFairyMat) {
    sharedGoldFairyMat = markShared(
      new THREE.MeshBasicMaterial({
        color: '#ffdf88',
        toneMapped: false,
      })
    );
  }
  if (!sharedSpireMat) {
    sharedSpireMat = markShared(
      new THREE.MeshStandardMaterial({
        color: '#21314d',
        roughness: 0.55,
        metalness: 0.3,
      })
    );
  }
  if (!sharedChurchGlassMat) {
    sharedChurchGlassMat = markShared(
      new THREE.MeshBasicMaterial({
        color: '#ffcf70',
        toneMapped: false,
      })
    );
  }
  return {
    snowRoof: sharedSnowRoofMat,
    water: sharedWaterMat,
    road: sharedSecondaryRoadMat,
    fairy: sharedGoldFairyMat,
    spire: sharedSpireMat,
    churchGlass: sharedChurchGlassMat,
  };
}

function createLandmarkLabel(text: string): THREE.Mesh {
  const w = 512;
  const h = 112;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, 'rgba(98, 14, 30, 0.94)');
  grad.addColorStop(1, 'rgba(32, 14, 42, 0.94)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(6, 6, w - 12, h - 12, 22);
  ctx.fill();
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = '#fff6de';
  ctx.font = '700 36px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.slice(0, 26), w * 0.5, h * 0.52, w - 48);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData.ownedByOsmLayer = true;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 1.58),
    new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      toneMapped: false,
      side: THREE.DoubleSide,
    })
  );
}

interface BuiltBuildingRef {
  group: THREE.Group;
  centerX: number;
  centerZ: number;
  radius: number;
  label?: THREE.Mesh;
}

export class OsmMapLayer {
  readonly group = new THREE.Group();
  private mapPivot = new THREE.Group();
  private mapInner = new THREE.Group();

  private builtVersion = -1;
  private builtQuality: GraphicsQuality = 'ultra';
  private originLat = 59.3322;
  private originLon = 18.0815;
  private wasLiveOsm = false;

  private smoothCarX = 0;
  private smoothCarZ = 0;
  private smoothHeadingDeg = 0;

  private buildingRefs: BuiltBuildingRef[] = [];
  private animals: PixarAnimalHandle[] = [];
  private plazaUpdaters: Array<(time: number) => void> = [];

  constructor() {
    this.mapPivot.add(this.mapInner);
    this.group.add(this.mapPivot);
  }

  private clearInner(): void {
    this.mapInner.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry && !mesh.geometry.userData?.shared) {
        mesh.geometry.dispose();
      }
      const mat = mesh.material;
      const disposeMat = (m: THREE.Material) => {
        if (m.userData?.shared) return;
        const std = m as THREE.MeshStandardMaterial;
        if (std.map?.userData?.ownedByOsmLayer) std.map.dispose();
        if (std.emissiveMap?.userData?.ownedByOsmLayer) std.emissiveMap.dispose();
        m.dispose();
      };
      if (Array.isArray(mat)) mat.forEach(disposeMat);
      else if (mat) disposeMat(mat);
    });
    this.mapInner.clear();
    this.buildingRefs = [];
    this.animals = [];
    this.plazaUpdaters = [];
  }

  private createBuildingMesh(b: OsmBuilding, idx: number, mats: ReturnType<typeof getSharedEnvMaterials>): BuiltBuildingRef {
    const fgMats = getFacadeMats();
    const g = new THREE.Group();
    g.position.set(b.centerX, 0, b.centerZ);

    const relPts = b.footprint.map((p) => ({ x: p.x - b.centerX, z: p.z - b.centerZ }));
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    let maxR = 2;

    const shape = new THREE.Shape();
    relPts.forEach((p, i) => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minZ = Math.min(minZ, p.z);
      maxZ = Math.max(maxZ, p.z);
      maxR = Math.max(maxR, Math.hypot(p.x, p.z));
      if (i === 0) shape.moveTo(p.x, -p.z);
      else shape.lineTo(p.x, -p.z);
    });
    shape.closePath();

    const h = b.heightM;
    const extGeo = new THREE.ExtrudeGeometry(shape, {
      depth: h,
      bevelEnabled: false,
    });
    extGeo.rotateX(-Math.PI * 0.5);

    // Choose authentic facade tone based on building kind & deterministic index
    const wallMat =
      b.kind === 'house'
        ? fgMats[idx % 2]
        : b.kind === 'church' || b.kind === 'landmark'
          ? fgMats[2]
          : fgMats[(idx + 1) % fgMats.length];

    const bodyMesh = new THREE.Mesh(extGeo, [mats.snowRoof, wallMat]);
    g.add(bodyMesh);

    const spanX = Math.max(3, maxX - minX);
    const spanZ = Math.max(3, maxZ - minZ);

    let topY = h;
    if (b.kind === 'church') {
      // Nordic pitched roof + tall snow-dusted spire(s) with starlight lantern!
      const isTwin = /domkyrka/i.test(b.name ?? '');
      const spireOffsets = isTwin ? [-spanX * 0.24, spanX * 0.24] : [0];
      const towerW = Math.min(5.2, spanX * 0.42);
      for (const sx of spireOffsets) {
        const towerBase = new THREE.Mesh(
          new THREE.BoxGeometry(towerW, h * 0.45, towerW),
          wallMat
        );
        towerBase.position.set(sx, h + h * 0.22, -spanZ * 0.12);
        const coneH = Math.min(18, h * 0.72);
        const spire = new THREE.Mesh(
          new THREE.ConeGeometry(Math.min(3.1, spanX * 0.28), coneH, 6),
          mats.spire
        );
        spire.position.set(sx, h + h * 0.45 + coneH * 0.5, -spanZ * 0.12);
        const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 0), mats.churchGlass);
        star.position.set(sx, h + h * 0.45 + coneH + 0.55, -spanZ * 0.12);

        // Glowing stained-glass lancet windows around tower sides
        for (const wz of [-towerW * 0.51, towerW * 0.51]) {
          const wPane = new THREE.Mesh(new THREE.PlaneGeometry(towerW * 0.34, h * 0.24), mats.churchGlass);
          wPane.position.set(sx, h + h * 0.24, -spanZ * 0.12 + wz);
          if (wz < 0) wPane.rotation.y = Math.PI;
          g.add(wPane);
        }

        g.add(towerBase, spire, star);
        topY = Math.max(topY, star.position.y + 1);
      }
    } else if (b.kind === 'house' && spanX < 16 && spanZ < 16) {
      // Cozy pitched snow roof!
      const rCone = new THREE.Mesh(
        new THREE.ConeGeometry(Math.max(spanX, spanZ) * 0.76, Math.min(4.2, spanX * 0.45), 4),
        mats.snowRoof
      );
      rCone.rotation.y = Math.PI * 0.25;
      rCone.position.y = h + Math.min(4.2, spanX * 0.45) * 0.5;
      g.add(rCone);
      topY = h + 3.2;
    } else {
      // Snow blanket parapet + warm golden roof-edge fairy-light trim
      const roofGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.48, bevelEnabled: false });
      roofGeo.rotateX(-Math.PI * 0.5);
      const roofCap = new THREE.Mesh(roofGeo, mats.snowRoof);
      roofCap.position.y = h + 0.02;
      g.add(roofCap);

      const rimPts = relPts.map((p) => new THREE.Vector3(p.x, h + 0.52, p.z));
      if (rimPts.length > 0) rimPts.push(rimPts[0].clone());
      const rimGeo = new THREE.BufferGeometry().setFromPoints(rimPts);
      const rimLine = new THREE.Line(rimGeo, mats.fairy);
      g.add(rimLine);
      topY = h + 0.9;
    }

    let label: THREE.Mesh | undefined;
    if (b.name) {
      label = createLandmarkLabel(b.name);
      label.position.set(0, topY + 2.5, 0);
      g.add(label);
    }

    this.mapInner.add(g);
    return {
      group: g,
      centerX: b.centerX,
      centerZ: b.centerZ,
      radius: Math.min(26, maxR + 1.5),
      label,
    };
  }

  private pointInPolygon(x: number, z: number, pts: { x: number; z: number }[]): boolean {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const xi = pts[i].x;
      const zi = pts[i].z;
      const xj = pts[j].x;
      const zj = pts[j].z;
      const intersect =
        zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi || 1e-6) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  private pointNearOccupied(x: number, z: number, snapshot: OsmMapSnapshot, padM: number): boolean {
    if (Math.abs(x) < 6.8 && z > -245 && z < 45) return true; // Keep center hero sleigh corridor clear
    for (const b of snapshot.buildings) {
      if (Math.hypot(x - b.centerX, z - b.centerZ) < 10 + padM) return true;
    }
    for (const r of snapshot.roads) {
      for (const p of r.points) {
        if (Math.hypot(x - p.x, z - p.z) < r.widthM * 0.65 + padM) return true;
      }
    }
    for (const w of snapshot.waters) {
      if (w.isPolygon && w.points.length >= 3 && this.pointInPolygon(x, z, w.points)) {
        return true;
      }
      for (const p of w.points) {
        if (Math.hypot(x - p.x, z - p.z) < (w.isPolygon ? 10 : w.widthM * 0.6) + padM) return true;
      }
    }
    return false;
  }

  private rebuildFromSnapshot(snapshot: OsmMapSnapshot, quality: GraphicsQuality): void {
    this.clearInner();
    this.builtVersion = snapshot.version;
    this.builtQuality = quality;
    this.originLat = snapshot.originLat;
    this.originLon = snapshot.originLon;

    const mats = getSharedEnvMaterials();

    // 1. Frozen Mirror-Ice Waters (polygons + river ribbons)
    for (const wf of snapshot.waters) {
      if (wf.isPolygon && wf.points.length >= 3) {
        const shape = new THREE.Shape();
        wf.points.forEach((p, idx) => {
          if (idx === 0) shape.moveTo(p.x, -p.z);
          else shape.lineTo(p.x, -p.z);
        });
        shape.closePath();
        const geo = new THREE.ShapeGeometry(shape);
        geo.rotateX(-Math.PI * 0.5);
        const mesh = new THREE.Mesh(geo, mats.water);
        mesh.position.y = 0.025;
        this.mapInner.add(mesh);
      } else if (wf.points.length >= 2) {
        for (let i = 0; i < wf.points.length - 1; i++) {
          const a = wf.points[i];
          const b = wf.points[i + 1];
          const len = Math.hypot(b.x - a.x, b.z - a.z);
          if (len < 0.5) continue;
          const seg = new THREE.Mesh(new THREE.PlaneGeometry(wf.widthM, len + 2), mats.water);
          seg.rotation.x = -Math.PI * 0.5;
          seg.rotation.z = Math.atan2(a.x - b.x, a.z - b.z);
          seg.position.set((a.x + b.x) * 0.5, 0.025, (a.z + b.z) * 0.5);
          this.mapInner.add(seg);
        }
      }
    }

    // 2. Secondary OSM Cross-Streets & Neighborhood Roads
    const roadLimit = quality === 'eco' ? 14 : 26;
    for (const road of snapshot.roads.slice(0, roadLimit)) {
      for (let i = 0; i < road.points.length - 1; i++) {
        const a = road.points[i];
        const b = road.points[i + 1];
        const len = Math.hypot(b.x - a.x, b.z - a.z);
        if (len < 1) continue;
        const seg = new THREE.Mesh(new THREE.PlaneGeometry(road.widthM, len + 1.2), mats.road);
        seg.rotation.x = -Math.PI * 0.5;
        seg.rotation.z = Math.atan2(a.x - b.x, a.z - b.z);
        seg.position.set((a.x + b.x) * 0.5, 0.035, (a.z + b.z) * 0.5);
        this.mapInner.add(seg);
      }
    }

    // 3. Recognizable Extruded Holiday Buildings & Churches
    const maxBuildings = quality === 'eco' ? 22 : 40;
    snapshot.buildings.slice(0, maxBuildings).forEach((b, idx) => {
      const ref = this.createBuildingMesh(b, idx, mats);
      this.buildingRefs.push(ref);
    });

    // 4. POIs (Tesla Supercharger Plazas & Carved Holiday Road Signs)
    for (const poi of snapshot.pois.slice(0, 6)) {
      if (poi.kind === 'charger') {
        const sc = createAccurateSuperchargerPlaza();
        sc.group.scale.setScalar(0.85);
        sc.group.position.set(poi.x, 0, poi.z);
        this.mapInner.add(sc.group);
        this.plazaUpdaters.push((t) => sc.update(t));
      } else {
        const sign = createHolidayRoadSign();
        sign.setText(poi.name.toUpperCase(), poi.kind === 'church' ? 'Julstämning' : 'Nordpolen Rutt');
        sign.group.position.set(poi.x, 0, poi.z);
        sign.group.rotation.y = poi.x >= 0 ? -0.45 : 0.45;
        this.mapInner.add(sign.group);
      }
    }

    // 5. Enchanted Forest Pine Groves & Animated Wildlife Creatures!
    const treeBudget = quality === 'eco' ? 22 : 42;
    let treesPlaced = 0;
    snapshot.forests.forEach((patch, pIdx) => {
      const targetForPatch = Math.max(2, Math.round(patch.density * 5));
      for (let t = 0; t < targetForPatch && treesPlaced < treeBudget; t++) {
        const ang = (pIdx * 2.17 + t * 1.618) * 2.4;
        const dist = (0.25 + ((t * 0.37) % 0.72)) * patch.radiusM;
        const tx = patch.centerX + Math.cos(ang) * dist;
        const tz = patch.centerZ + Math.sin(ang) * dist;
        if (this.pointNearOccupied(tx, tz, snapshot, 3.2)) continue;

        const pine = createPixarPineTree((treesPlaced + t) % 2 === 0, treesPlaced);
        pine.setLit(1);
        pine.group.scale.setScalar(0.95 + (treesPlaced % 4) * 0.25);
        pine.group.position.set(tx, 0, tz);
        this.mapInner.add(pine.group);
        treesPlaced++;
      }
    });

    // Place 10 lively forest animals (stags, foxes, snowy owls, arctic rabbits) across clearings!
    const kinds: WildlifeKind[] = ['stag', 'fox', 'owl', 'rabbit', 'stag', 'fox', 'rabbit', 'owl', 'stag', 'fox'];
    const maxAnimals = quality === 'eco' ? 6 : 10;
    let placedAnimals = 0;

    for (let i = 0; i < Math.max(snapshot.forests.length * 2, 12) && placedAnimals < maxAnimals; i++) {
      const patch = snapshot.forests[i % Math.max(1, snapshot.forests.length)];
      const baseX = patch ? patch.centerX : (i % 2 === 0 ? -13 : 13);
      const baseZ = patch ? patch.centerZ : -22 - i * 18;
      const ang = i * 2.15;
      const ax = baseX + Math.cos(ang) * 5.2;
      const az = baseZ + Math.sin(ang) * 5.2;
      if (this.pointNearOccupied(ax, az, snapshot, 1.8)) continue;

      const kind = kinds[placedAnimals % kinds.length];
      const animal = createPixarForestAnimal(kind, i + 1);
      const scale = kind === 'stag' ? 1.15 : kind === 'fox' || kind === 'owl' ? 1.25 : 1.35;
      animal.group.scale.setScalar(scale);
      animal.group.position.set(ax, 0, az);
      animal.group.rotation.y = Math.atan2(-ax, -az + 4);
      this.mapInner.add(animal.group);
      this.animals.push(animal);
      placedAnimals++;
    }
  }

  update(
    dt: number,
    telemetry: TelemetryFrame,
    osm: OsmWorldState,
    quality: GraphicsQuality,
    sleighAlert: number
  ): void {
    this.group.visible = osm.enabled;
    if (!osm.enabled) return;

    if (this.builtVersion !== osm.snapshot.version || this.builtQuality !== quality) {
      this.rebuildFromSnapshot(osm.snapshot, quality);
    }

    if (osm.isLiveOsm) {
      const targetPos = geoDeltaMeters(
        this.originLat,
        this.originLon,
        telemetry.latitude,
        telemetry.longitude
      );
      if (!this.wasLiveOsm) {
        this.smoothCarX = targetPos.x;
        this.smoothCarZ = targetPos.z;
        this.smoothHeadingDeg = telemetry.headingDeg;
        this.wasLiveOsm = true;
      } else {
        // Gentle velocity dead-reckoning + smooth correction to raw GPS fix
        const speedMs = telemetry.speedKmh / 3.6;
        const hRad = (this.smoothHeadingDeg * Math.PI) / 180;
        this.smoothCarX += Math.sin(hRad) * speedMs * dt;
        this.smoothCarZ -= Math.cos(hRad) * speedMs * dt;

        const blend = Math.min(1, dt * 2.2);
        this.smoothCarX += (targetPos.x - this.smoothCarX) * blend;
        this.smoothCarZ += (targetPos.z - this.smoothCarZ) * blend;

        const dHdg = ((telemetry.headingDeg - this.smoothHeadingDeg + 540) % 360) - 180;
        this.smoothHeadingDeg = (this.smoothHeadingDeg + dHdg * Math.min(1, dt * 4.5) + 360) % 360;
      }

      const pivotRad = (this.smoothHeadingDeg * Math.PI) / 180;
      this.mapPivot.rotation.y = pivotRad;
      this.mapInner.position.set(-this.smoothCarX, 0, -this.smoothCarZ);

      // Keep sleigh/camera corridor safe from overlapping building walls
      const cosP = Math.cos(pivotRad);
      const sinP = Math.sin(pivotRad);
      for (const b of this.buildingRefs) {
        const lx = b.centerX - this.smoothCarX;
        const lz = b.centerZ - this.smoothCarZ;
        const wx = lx * cosP + lz * sinP;
        const wz = -lx * sinP + lz * cosP;
        const nearCamera = Math.abs(wx) < b.radius + 3.2 && wz > -14 && wz < 14;
        b.group.visible = !nearCamera;
      }
    } else {
      this.wasLiveOsm = false;
      this.mapPivot.rotation.y = -telemetry.turnRate * 0.08;
      this.mapInner.position.set(0, 0, osm.demoTravelM);
      for (const b of this.buildingRefs) {
        b.group.visible = true;
      }
    }

    // Billboard landmark banners smoothly toward camera!
    for (const b of this.buildingRefs) {
      if (b.label) {
        b.label.rotation.y = -this.mapPivot.rotation.y;
      }
    }

    const time = telemetry.elapsedSec;
    for (const anim of this.animals) {
      anim.update(dt, time, sleighAlert);
    }
    for (const upd of this.plazaUpdaters) {
      upd(time);
    }
  }

  dispose(): void {
    this.clearInner();
  }
}
