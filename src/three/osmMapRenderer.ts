import { streetGeometry } from './mappedRoads';
import * as THREE from 'three';
import { GraphicsQuality, HolidayThemeId } from '../core/environment';
import {
  geoDeltaMeters,
  OsmBuilding,
  OsmMapSnapshot,
  OsmWorldState,
} from '../core/osmWorld';
import { TelemetryFrame } from '../core/telemetry';
import { createSparklingSnowMaterial, getSoftGlowTexture } from './pixarMaterials';
import {
  createHolidayRoadSign,
  createPixarCottage,
  createPixarPineTree,
  PixarCottageHandle,
} from './pixarModels';
import { createAccurateSuperchargerPlaza } from './teslaModels';
import { createPixarForestAnimal, PixarAnimalHandle, WildlifeKind } from './pixarWildlife';

interface FacadePalette {
  wall: string;
  trim: string;
  shutter: string;
}

const FACADE_PALETTES: FacadePalette[] = [
  { wall: '#7c1e26', trim: '#f2e8da', shutter: '#194534' }, // Swedish Falu red
  { wall: '#c78c48', trim: '#fff1db', shutter: '#2e4663' }, // Nordic Gamla Stan ochre
  { wall: '#c8bea8', trim: '#6b1822', shutter: '#1c4032' }, // Classical cream stone
];

let sharedFacadeMats: THREE.MeshStandardMaterial[] | null = null;
let sharedSnowRoofMat: THREE.MeshStandardMaterial | null = null;
let sharedWaterMat: THREE.MeshPhysicalMaterial | null = null;
let sharedSecondaryRoadMat: THREE.MeshStandardMaterial | null = null;
let sharedGoldFairyMat: THREE.MeshBasicMaterial | null = null;
let sharedSpireMat: THREE.MeshStandardMaterial | null = null;
let sharedChurchGlassMat: THREE.MeshBasicMaterial | null = null;
let sharedGigaWallMat: THREE.MeshPhysicalMaterial | null = null;
let sharedGigaRedBandMat: THREE.MeshPhysicalMaterial | null = null;
let sharedGigaGlassMat: THREE.MeshStandardMaterial | null = null;
let sharedSolarMat: THREE.MeshStandardMaterial | null = null;
let sharedFenceWoodMat: THREE.MeshStandardMaterial | null = null;
let sharedIcicleMat: THREE.MeshPhysicalMaterial | null = null;
let sharedContactMat: THREE.MeshBasicMaterial | null = null;

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

  cCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  for (let y = 0; y < h; y += 16) {
    cCtx.fillRect(0, y, w, 2);
  }

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

      cCtx.fillStyle = pal.shutter;
      cCtx.fillRect(wx - 7, wy, 6, wh);
      cCtx.fillRect(wx + ww + 1, wy, 6, wh);
      cCtx.fillStyle = pal.trim;
      cCtx.fillRect(wx - 3, wy - 4, ww + 6, wh + 8);

      const grad = cCtx.createLinearGradient(wx, wy, wx, wy + wh);
      grad.addColorStop(0, '#ffe8a3');
      grad.addColorStop(1, '#ffaf47');
      cCtx.fillStyle = grad;
      cCtx.fillRect(wx, wy, ww, wh);

      eCtx.fillStyle = (r + c) % 4 === 0 ? '#ffd078' : '#ffbd58';
      eCtx.fillRect(wx + 2, wy + 2, ww - 4, wh - 4);

      // Swedish 5-point Adventsstjärnor & 7-candle Adventsljusstakar glowing in windows!
      if ((r + c) % 2 === 0) {
        const sx = wx + ww * 0.5;
        const sy = wy + wh * 0.36;
        cCtx.fillStyle = '#fff9d6';
        eCtx.fillStyle = '#fff5b8';
        for (const tCtx of [cCtx, eCtx]) {
          tCtx.beginPath();
          for (let p = 0; p < 10; p++) {
            const ang = (p / 10) * Math.PI * 2 - Math.PI * 0.5;
            const rad = p % 2 === 0 ? 7.5 : 3.2;
            const px = sx + Math.cos(ang) * rad;
            const py = sy + Math.sin(ang) * rad;
            if (p === 0) tCtx.moveTo(px, py);
            else tCtx.lineTo(px, py);
          }
          tCtx.closePath();
          tCtx.fill();
        }
      } else {
        for (let k = -2; k <= 2; k++) {
          const cx = wx + ww * 0.5 + k * 5.2;
          const cy = wy + wh * 0.8 - (2 - Math.abs(k)) * 3.8;
          cCtx.fillStyle = '#fffbe0';
          eCtx.fillStyle = '#ffe990';
          cCtx.fillRect(cx - 1, cy - 3, 2, 3);
          eCtx.fillRect(cx - 1.2, cy - 3.5, 2.4, 3.5);
        }
      }

      cCtx.fillStyle = pal.trim;
      cCtx.fillRect(wx + ww * 0.5 - 1.5, wy, 3, wh);
      cCtx.fillRect(wx, wy + wh * 0.48 - 1.5, ww, 3);
      eCtx.fillStyle = '#000000';
      eCtx.fillRect(wx + ww * 0.5 - 1.5, wy, 3, wh);
      eCtx.fillRect(wx, wy + wh * 0.48 - 1.5, ww, 3);

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
  if (!sharedSnowRoofMat) sharedSnowRoofMat = markShared(createSparklingSnowMaterial('#a6c0e4'));
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
    sharedSecondaryRoadMat = markShared(new THREE.MeshStandardMaterial({ color: '#222f52', roughness: 0.78 }));
  }
  if (!sharedGoldFairyMat) {
    sharedGoldFairyMat = markShared(new THREE.MeshBasicMaterial({ color: '#ffdf88', toneMapped: false }));
  }
  if (!sharedSpireMat) {
    sharedSpireMat = markShared(new THREE.MeshStandardMaterial({ color: '#21314d', roughness: 0.55, metalness: 0.3 }));
  }
  if (!sharedChurchGlassMat) {
    sharedChurchGlassMat = markShared(new THREE.MeshBasicMaterial({ color: '#ffcf70', toneMapped: false }));
  }
  if (!sharedGigaWallMat) {
    sharedGigaWallMat = markShared(
      new THREE.MeshPhysicalMaterial({
        color: '#eef3fa',
        roughness: 0.28,
        metalness: 0.2,
        clearcoat: 0.8,
      })
    );
  }
  if (!sharedGigaRedBandMat) {
    sharedGigaRedBandMat = markShared(
      new THREE.MeshPhysicalMaterial({
        color: '#dc1230',
        emissive: '#540612',
        emissiveIntensity: 0.45,
        roughness: 0.22,
        clearcoat: 0.9,
      })
    );
  }
  if (!sharedGigaGlassMat) {
    sharedGigaGlassMat = markShared(
      new THREE.MeshStandardMaterial({
        color: '#1b3358',
        emissive: '#89d4ff',
        emissiveIntensity: 0.55,
        roughness: 0.15,
        metalness: 0.6,
      })
    );
  }
  if (!sharedSolarMat) {
    sharedSolarMat = markShared(
      new THREE.MeshStandardMaterial({ color: '#14203d', metalness: 0.72, roughness: 0.24 })
    );
  }
  if (!sharedFenceWoodMat) {
    sharedFenceWoodMat = markShared(new THREE.MeshStandardMaterial({ color: '#7a1c24', roughness: 0.84 }));
  }
  if (!sharedIcicleMat) {
    sharedIcicleMat = markShared(
      new THREE.MeshPhysicalMaterial({
        color: '#d4ecff',
        emissive: '#356090',
        emissiveIntensity: 0.35,
        roughness: 0.08,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.82,
      })
    );
  }
  if (!sharedContactMat) {
    sharedContactMat = markShared(
      new THREE.MeshBasicMaterial({
        color: '#060c1f',
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
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
    gigaWall: sharedGigaWallMat,
    gigaRed: sharedGigaRedBandMat,
    gigaGlass: sharedGigaGlassMat,
    solar: sharedSolarMat,
    fenceWood: sharedFenceWoodMat,
    icicle: sharedIcicleMat,
    contact: sharedContactMat,
  };
}

function createLandmarkLabel(text: string, isGiga = false): THREE.Mesh {
  const w = 512;
  const h = 112;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, w, h);
  if (isGiga) {
    grad.addColorStop(0, '#c80c26');
    grad.addColorStop(1, '#10182b');
  } else {
    grad.addColorStop(0, 'rgba(98, 14, 30, 0.94)');
    grad.addColorStop(1, 'rgba(32, 14, 42, 0.94)');
  }
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(6, 6, w - 12, h - 12, 22);
  ctx.fill();
  ctx.strokeStyle = isGiga ? '#ffffff' : '#ffd166';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = '#fff8eb';
  ctx.font = '700 36px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.slice(0, 26), w * 0.5, h * 0.52, w - 48);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData.ownedByOsmLayer = true;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(isGiga ? 11.5 : 7.2, isGiga ? 2.5 : 1.58),
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
  topY: number;
  isChurch: boolean;
  litBoost: number;
  cottage?: PixarCottageHandle;
  celebrateHalo: THREE.Sprite;
  celebrateStar: THREE.Mesh;
  label?: THREE.Mesh;
}

export interface GiftTargetInfo {
  x: number;
  y: number;
  z: number;
  lightUp: () => void;
}

interface CorridorPlacedItem {
  obj: THREE.Object3D;
  baseX: number;
  baseZ: number;
  baseYaw: number;
}

export class OsmMapLayer {
  readonly group = new THREE.Group();
  private mapPivot = new THREE.Group();
  private mapInner = new THREE.Group();

  private builtVersion = -1;
  private builtQuality: GraphicsQuality = 'ultra';
  private builtIsLiveOsm = false;
  private originLat = 59.3322;
  private originLon = 18.0815;
  private wasLiveOsm = false;

  private smoothCarX = 0;
  private smoothCarZ = 0;
  private smoothHeadingDeg = 0;

  private buildingRefs: BuiltBuildingRef[] = [];
  private corridorItems: CorridorPlacedItem[] = [];
  private animals: PixarAnimalHandle[] = [];
  private pineItems: Array<{ group: THREE.Group; phase: number }> = [];
  private nordicTorches: THREE.Group[] = [];
  private cottageUpdaters: Array<(dt: number, time: number) => void> = [];
  private plazaUpdaters: Array<(time: number) => void> = [];
  private beatEnergy = 0;
  private windX = 0;
  private theme: HolidayThemeId = 'classic';
  private targetVec = new THREE.Vector3();

  constructor(private readonly mappedStreets = false) {
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
    this.corridorItems = [];
    this.animals = [];
    this.pineItems = [];
    this.nordicTorches = [];
    this.cottageUpdaters = [];
    this.plazaUpdaters = [];
  }

  setVisualMood(beatEnergy: number, windX: number, theme: HolidayThemeId): void {
    this.beatEnergy = beatEnergy;
    this.windX = windX;
    this.theme = theme;
  }

  hasPassingChurch(): boolean {
    for (const b of this.buildingRefs) {
      if (!b.isChurch || !b.group.visible) continue;
      b.group.updateWorldMatrix(true, false);
      this.targetVec.set(0, 0, 0).applyMatrix4(b.group.matrixWorld);
      if (this.targetVec.z > -38 && this.targetVec.z < 10) {
        return true;
      }
    }
    return false;
  }

  lightUpNeighborhood(): void {
    for (const b of this.buildingRefs) {
      b.litBoost = 1.0;
      b.cottage?.setLit(1.0);
    }
  }

  getGiftTargets(): GiftTargetInfo[] {
    const out: GiftTargetInfo[] = [];
    for (const b of this.buildingRefs) {
      if (!b.group.visible) continue;
      b.group.updateWorldMatrix(true, false);
      this.targetVec.set(0, Math.min(18, b.topY * 0.9), 0).applyMatrix4(b.group.matrixWorld);
      if (this.targetVec.z < -8 && this.targetVec.z > -125 && Math.abs(this.targetVec.x) < 75) {
        out.push({
          x: this.targetVec.x,
          y: this.targetVec.y,
          z: this.targetVec.z,
          lightUp: () => {
            b.litBoost = 1.0;
            b.cottage?.setLit(1.0);
          },
        });
      }
    }
    return out;
  }

  private createBuildingMesh(
    b: OsmBuilding,
    idx: number,
    mats: ReturnType<typeof getSharedEnvMaterials>
  ): BuiltBuildingRef {
    const fgMats = getFacadeMats();
    const g = new THREE.Group();
    g.position.set(b.centerX, 0, b.centerZ);

    const spanX = Math.max(4, b.widthM);
    const spanZ = Math.max(4, b.depthM);
    let topY = b.heightM;
    let cottageHandle: PixarCottageHandle | undefined;

    if (b.kind === 'small_cottage') {
      // Handcrafted Cozy Pixar Snow Cottage (lights up brilliantly when a gift lands down the chimney!)
      const cot = createPixarCottage(idx + 1);
      cot.setLit(0.48);
      cottageHandle = cot;
      const sx = THREE.MathUtils.clamp(spanX / 4.2, 0.85, 1.85);
      const sy = THREE.MathUtils.clamp(b.heightM / 4.0, 0.9, 1.55);
      const sz = THREE.MathUtils.clamp(spanZ / 3.8, 0.85, 1.85);
      cot.group.scale.set(sx, sy, sz);
      cot.group.rotation.y = b.centerX >= 0 ? -Math.PI * 0.45 : Math.PI * 0.45;
      g.add(cot.group);
      this.cottageUpdaters.push((dt, t) => cot.update(dt, t));
      topY = 5.0 * sy;
    } else if (b.kind === 'gigafactory') {
      // Handcrafted Holiday Tesla Gigafactory!
      const h = Math.max(12, b.heightM);
      const body = new THREE.Mesh(new THREE.BoxGeometry(spanX, h, spanZ), mats.gigaWall);
      body.position.y = h * 0.5;
      g.add(body);

      const band = new THREE.Mesh(
        new THREE.BoxGeometry(spanX + 0.35, 1.3, spanZ + 0.35),
        mats.gigaRed
      );
      band.position.y = h - 1.5;
      g.add(band);

      const glassBand = new THREE.Mesh(
        new THREE.BoxGeometry(spanX + 0.25, h * 0.36, spanZ + 0.25),
        mats.gigaGlass
      );
      glassBand.position.y = h * 0.45;
      g.add(glassBand);

      const roofSnow = new THREE.Mesh(
        new THREE.BoxGeometry(spanX + 0.6, 0.55, spanZ + 0.6),
        mats.snowRoof
      );
      roofSnow.position.y = h + 0.28;
      g.add(roofSnow);

      // Rooftop solar panel arrays dusted around perimeter
      const panelCols = Math.max(2, Math.floor(spanX / 8));
      const panelRows = Math.max(2, Math.floor(spanZ / 10));
      for (let px = 0; px < panelCols; px++) {
        for (let pz = 0; pz < panelRows; pz++) {
          const sp = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.25, 6.2), mats.solar);
          sp.rotation.x = 0.14;
          sp.position.set(
            -spanX * 0.34 + px * (spanX * 0.68 / Math.max(1, panelCols - 1)),
            h + 0.72,
            -spanZ * 0.34 + pz * (spanZ * 0.68 / Math.max(1, panelRows - 1))
          );
          g.add(sp);
        }
      }

      // Golden Holiday Fairy Rim around Gigafactory parapet
      const rimPts = [
        new THREE.Vector3(-spanX * 0.51, h + 0.62, -spanZ * 0.51),
        new THREE.Vector3(spanX * 0.51, h + 0.62, -spanZ * 0.51),
        new THREE.Vector3(spanX * 0.51, h + 0.62, spanZ * 0.51),
        new THREE.Vector3(-spanX * 0.51, h + 0.62, spanZ * 0.51),
        new THREE.Vector3(-spanX * 0.51, h + 0.62, -spanZ * 0.51),
      ];
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rimPts), mats.fairy));
      topY = h + 1.8;
    } else {
      // Extruded OSM Footprint Architecture: medium_house, large_building, church
      const relPts = b.footprint.map((p) => ({ x: p.x - b.centerX, z: p.z - b.centerZ }));
      const shape = new THREE.Shape();
      relPts.forEach((p, i) => {
        if (i === 0) shape.moveTo(p.x, -p.z);
        else shape.lineTo(p.x, -p.z);
      });
      shape.closePath();

      const h = b.heightM;
      const extGeo = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false });
      extGeo.rotateX(-Math.PI * 0.5);

      const wallMat =
        b.kind === 'church' || b.kind === 'large_building'
          ? fgMats[2]
          : fgMats[idx % fgMats.length];

      const bodyMesh = new THREE.Mesh(extGeo, [mats.snowRoof, wallMat]);
      g.add(bodyMesh);

      if (b.kind === 'church') {
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

          for (const wz of [-towerW * 0.51, towerW * 0.51]) {
            const wPane = new THREE.Mesh(
              new THREE.PlaneGeometry(towerW * 0.34, h * 0.24),
              mats.churchGlass
            );
            wPane.position.set(sx, h + h * 0.24, -spanZ * 0.12 + wz);
            if (wz < 0) wPane.rotation.y = Math.PI;
            g.add(wPane);
          }

          g.add(towerBase, spire, star);
          topY = Math.max(topY, star.position.y + 1);
        }
      } else {
        // Storybook European snow-blanketed Mansard roof + festive cupola for large_building
        if (spanX < 42 && spanZ < 42) {
          const roofGeo = new THREE.CylinderGeometry(0.22, 0.707, 1, 4);
          roofGeo.rotateY(Math.PI * 0.25);
          const roofMesh = new THREE.Mesh(roofGeo, mats.spire);
          const roofH = Math.min(3.8, Math.max(1.8, Math.min(spanX, spanZ) * 0.17));
          roofMesh.scale.set(spanX * 1.03, roofH, spanZ * 1.03);
          roofMesh.position.y = h + roofH * 0.5;

          const snowRoofMesh = new THREE.Mesh(roofGeo.clone(), mats.snowRoof);
          snowRoofMesh.scale.set(spanX * 1.05, roofH * 0.85, spanZ * 1.05);
          snowRoofMesh.position.y = h + roofH * 0.55 + 0.14;
          g.add(roofMesh, snowRoofMesh);
          topY = h + roofH + 0.6;

          // 3D eaves, crystal icicles & cozy roof dormers under ultra quality!
          const eaveRim = new THREE.Mesh(
            new THREE.BoxGeometry(spanX * 1.06, 0.24, spanZ * 1.06),
            mats.snowRoof
          );
          eaveRim.position.y = h + 0.08;
          g.add(eaveRim);

          if (this.builtQuality === 'ultra') {
            const icicleCols = Math.min(8, Math.max(3, Math.floor(spanZ / 3.5)));
            const faceX = (b.centerX >= 0 ? -1 : 1) * (spanX * 0.52);
            for (let ic = 0; ic < icicleCols; ic++) {
              const iz = -spanZ * 0.42 + (ic / Math.max(1, icicleCols - 1)) * spanZ * 0.84;
              const icicle = new THREE.Mesh(
                new THREE.ConeGeometry(0.11, 0.55 + (ic % 3) * 0.22, 5),
                mats.icicle
              );
              icicle.rotation.x = Math.PI;
              icicle.position.set(faceX, h - 0.24, iz);
              g.add(icicle);
            }
          }

          if (b.kind === 'large_building') {
            // Grand palace festive cupola + star crest + glowing dormer gables
            for (const dz of [-spanZ * 0.25, spanZ * 0.25]) {
              const dormerX = (b.centerX >= 0 ? -1 : 1) * (spanX * 0.42);
              const dormer = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.3, 1.5), wallMat);
              dormer.position.set(dormerX, h + 1.05, dz);
              const dormerCap = new THREE.Mesh(new THREE.ConeGeometry(1.15, 0.85, 4), mats.snowRoof);
              dormerCap.rotation.y = Math.PI * 0.25;
              dormerCap.position.set(dormerX, h + 2.05, dz);
              g.add(dormer, dormerCap);
            }
            const cupBase = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.7, 2.8, 10), wallMat);
            cupBase.position.y = h + roofH + 1.2;
            const cupDome = new THREE.Mesh(new THREE.SphereGeometry(1.55, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), mats.spire);
            cupDome.position.y = h + roofH + 2.55;
            const cupStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), mats.churchGlass);
            cupStar.position.y = h + roofH + 4.35;
            g.add(cupBase, cupDome, cupStar);
            topY = h + roofH + 4.9;
          }
        } else {
          const roofGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.48, bevelEnabled: false });
          roofGeo.rotateX(-Math.PI * 0.5);
          const roofCap = new THREE.Mesh(roofGeo, mats.snowRoof);
          roofCap.position.y = h + 0.02;
          g.add(roofCap);
          topY = h + 0.9;
        }

        const rimPts = relPts.map((p) => new THREE.Vector3(p.x, h + 0.18, p.z));
        if (rimPts.length > 0) rimPts.push(rimPts[0].clone());
        g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rimPts), mats.fairy));
      }
    }

    let label: THREE.Mesh | undefined;
    if (b.name || b.kind === 'gigafactory') {
      const text = b.name ?? 'TESLA GIGAFACTORY';
      label = createLandmarkLabel(text, b.kind === 'gigafactory');
      label.position.set(0, topY + 2.4, 0);
      g.add(label);
    }

    // Interactive Holiday Roof Glow & Celebration Star (ignites on Gift Cannon chimney hit!)
    const celebrateHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: getSoftGlowTexture(),
        color: '#ffdf78',
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    celebrateHalo.scale.set(Math.min(20, spanX * 1.45), Math.min(20, spanX * 1.45), 1);
    celebrateHalo.position.set(0, topY * 0.72, 0);
    g.add(celebrateHalo);

    const celebrateStar = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.65, 0),
      new THREE.MeshBasicMaterial({ color: '#ffe57e', toneMapped: false })
    );
    celebrateStar.position.set(0, topY + 0.85, 0);
    celebrateStar.visible = false;
    g.add(celebrateStar);

    // Soft dark snow-ground contact shadow grounding building into the snowpack
    const shadowPlane = new THREE.Mesh(
      new THREE.CircleGeometry(Math.max(3.5, Math.max(spanX, spanZ) * 0.72), 18),
      mats.contact
    );
    shadowPlane.rotation.x = -Math.PI * 0.5;
    shadowPlane.position.y = 0.03;
    g.add(shadowPlane);

    this.mapInner.add(g);
    const rad = Math.min(28, Math.hypot(spanX * 0.5, spanZ * 0.5) + 1.5);
    this.corridorItems.push({ obj: g, baseX: b.centerX, baseZ: b.centerZ, baseYaw: 0 });
    return {
      group: g,
      centerX: b.centerX,
      centerZ: b.centerZ,
      radius: rad,
      topY,
      isChurch: b.kind === 'church',
      litBoost: 0,
      cottage: cottageHandle,
      celebrateHalo,
      celebrateStar,
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
    if (Math.abs(x) < 11.4 && z > -245 && z < 45) return true; // Keep snowbanks + 2-lane road 100% clear
    for (const b of snapshot.buildings) {
      const rx = b.widthM * 0.5 + 3 + padM;
      const rz = b.depthM * 0.5 + 3 + padM;
      if (Math.abs(x - b.centerX) < rx && Math.abs(z - b.centerZ) < rz) return true;
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

  private rebuildFromSnapshot(
    snapshot: OsmMapSnapshot,
    quality: GraphicsQuality,
    isLiveOsm: boolean
  ): void {
    this.clearInner();
    this.builtVersion = snapshot.version;
    this.builtQuality = quality;
    this.builtIsLiveOsm = isLiveOsm;
    this.wasLiveOsm = false;
    this.originLat = snapshot.originLat;
    this.originLon = snapshot.originLon;

    const mats = getSharedEnvMaterials();

    // 1. Frozen Mirror-Ice Waters (segmented along highway curve in Demo mode so lakeside never touches road!)
    for (const wf of snapshot.waters) {
      if (wf.isPolygon && wf.points.length >= 3) {
        if (!isLiveOsm) {
          let minX = Infinity;
          let maxX = -Infinity;
          let minZ = Infinity;
          let maxZ = -Infinity;
          wf.points.forEach((p) => {
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minZ = Math.min(minZ, p.z);
            maxZ = Math.max(maxZ, p.z);
          });
          const cx = (minX + maxX) * 0.5;
          const spanX = Math.max(12, maxX - minX);
          const segLen = 22;
          const slices = Math.max(1, Math.ceil((maxZ - minZ) / segLen));
          for (let s = 0; s < slices; s++) {
            const cz = minZ + (s + 0.5) * segLen;
            const tile = new THREE.Mesh(new THREE.PlaneGeometry(spanX, segLen + 1.5), mats.water);
            tile.rotation.x = -Math.PI * 0.5;
            tile.position.set(cx, 0.025, cz);
            this.mapInner.add(tile);
            this.corridorItems.push({ obj: tile, baseX: cx, baseZ: cz, baseYaw: 0 });
          }
        } else {
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
        }
      } else if (wf.points.length >= 2) {
        for (let i = 0; i < wf.points.length - 1; i++) {
          const a = wf.points[i];
          const b = wf.points[i + 1];
          const len = Math.hypot(b.x - a.x, b.z - a.z);
          if (len < 0.5) continue;
          const cx = (a.x + b.x) * 0.5;
          const cz = (a.z + b.z) * 0.5;
          const yaw = Math.atan2(a.x - b.x, a.z - b.z);
          const seg = new THREE.Mesh(new THREE.PlaneGeometry(wf.widthM, len + 2), mats.water);
          seg.rotation.x = -Math.PI * 0.5;
          seg.rotation.z = yaw;
          if (!isLiveOsm) {
            const wrap = new THREE.Group();
            wrap.position.set(cx, 0.025, cz);
            wrap.add(seg);
            this.mapInner.add(wrap);
            this.corridorItems.push({ obj: wrap, baseX: cx, baseZ: cz, baseYaw: 0 });
          } else {
            seg.position.set(cx, 0.025, cz);
            this.mapInner.add(seg);
          }
        }
      }
    }

    // 2. Secondary OSM Cross-Streets & Neighborhood Roads
    const roadLimit = quality === 'eco' ? 14 : 26;
    const renderNetwork = this.mappedStreets && isLiveOsm;
    if (renderNetwork) {
      this.mapInner.add(new THREE.Mesh(streetGeometry(snapshot.roads), mats.road));
    }
    for (const road of renderNetwork ? [] : snapshot.roads.slice(0, roadLimit)) {
      for (let i = 0; i < road.points.length - 1; i++) {
        const a = road.points[i];
        const b = road.points[i + 1];
        const len = Math.hypot(b.x - a.x, b.z - a.z);
        if (len < 1) continue;
        const cx = (a.x + b.x) * 0.5;
        const cz = (a.z + b.z) * 0.5;
        const yaw = Math.atan2(a.x - b.x, a.z - b.z);
        const seg = new THREE.Mesh(new THREE.PlaneGeometry(road.widthM, len + 1.2), mats.road);
        seg.rotation.x = -Math.PI * 0.5;
        seg.rotation.z = yaw;
        if (!isLiveOsm) {
          const wrap = new THREE.Group();
          wrap.position.set(cx, 0.035, cz);
          wrap.add(seg);
          this.mapInner.add(wrap);
          this.corridorItems.push({ obj: wrap, baseX: cx, baseZ: cz, baseYaw: 0 });
        } else {
          seg.position.set(cx, 0.035, cz);
          this.mapInner.add(seg);
        }
      }
    }

    // 3. Handcrafted OSM Pixar Cottages, Townhouses, Palaces, Churches & Tesla Gigafactories
    const maxBuildings = quality === 'eco' ? 22 : 40;
    snapshot.buildings.slice(0, maxBuildings).forEach((b, idx) => {
      const ref = this.createBuildingMesh(b, idx, mats);
      this.buildingRefs.push(ref);
    });

    // 4. POIs (Tesla Supercharger Plazas & Carved Holiday Road Signs)
    for (const poi of snapshot.pois.slice(0, 6)) {
      if (poi.kind === 'charger') {
        const safeX = (poi.x >= 0 ? 1 : -1) * Math.max(13.8, Math.abs(poi.x));
        const yaw = safeX >= 0 ? -Math.PI * 0.5 : Math.PI * 0.5;
        const sc = createAccurateSuperchargerPlaza();
        sc.group.scale.setScalar(0.85);
        sc.group.position.set(safeX, 0, poi.z);
        sc.group.rotation.y = yaw;
        this.mapInner.add(sc.group);
        this.corridorItems.push({ obj: sc.group, baseX: safeX, baseZ: poi.z, baseYaw: yaw });
        this.plazaUpdaters.push((t) => sc.update(t));
      } else {
        const sign = createHolidayRoadSign();
        sign.setText(poi.name.toUpperCase(), poi.kind === 'church' ? 'Julstämning' : 'Nordpolen Rutt');
        const yaw = poi.x >= 0 ? -0.45 : 0.45;
        sign.group.position.set(poi.x, 0, poi.z);
        sign.group.rotation.y = yaw;
        this.mapInner.add(sign.group);
        this.corridorItems.push({ obj: sign.group, baseX: poi.x, baseZ: poi.z, baseYaw: yaw });
      }
    }

    // 5. Open Countryside Rustic Winter Timber Fences when biome is `open`
    if (snapshot.biome === 'open' && !isLiveOsm) {
      for (let i = 0; i < 10; i++) {
        const side = i % 2 === 0 ? -1 : 1;
        const fz = -24 - i * 19;
        const fx = side * 12.6;
        const fg = new THREE.Group();
        const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.0, 6), mats.fenceWood);
        post1.position.set(0, 0.5, -2.5);
        const post2 = post1.clone();
        post2.position.z = 2.5;
        const rail1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 5.2), mats.fenceWood);
        rail1.position.set(0, 0.78, 0);
        const rail2 = rail1.clone();
        rail2.position.y = 0.42;
        const snowStrip = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 5.2), mats.snowRoof);
        snowStrip.position.set(0, 0.85, 0);
        fg.add(post1, post2, rail1, rail2, snowStrip);
        fg.position.set(fx, 0, fz);
        this.mapInner.add(fg);
        this.corridorItems.push({ obj: fg, baseX: fx, baseZ: fz, baseYaw: 0 });
      }
    }

    // 6. Natural Street-View Trees (organic sparse groves ONLY where `forests` patches exist!)
    const maxTrees =
      snapshot.biome === 'forest'
        ? quality === 'eco'
          ? 16
          : 28
        : snapshot.biome === 'open'
          ? 3
          : quality === 'eco'
            ? 8
            : 12;

    let treesPlaced = 0;
    snapshot.forests.forEach((patch, pIdx) => {
      const targetForPatch = Math.max(1, Math.round(patch.density * (snapshot.biome === 'forest' ? 4 : 2)));
      for (let t = 0; t < targetForPatch && treesPlaced < maxTrees; t++) {
        // Golden-angle organic scatter instead of rows!
        const ang = pIdx * 2.399 + t * 2.399;
        const rad = (0.3 + ((t * 0.31 + pIdx * 0.17) % 0.65)) * patch.radiusM;
        const tx = patch.centerX + Math.cos(ang) * rad;
        const tz = patch.centerZ + Math.sin(ang) * rad;
        if (this.pointNearOccupied(tx, tz, snapshot, 3.0)) continue;

        const pine = createPixarPineTree((treesPlaced + t) % 2 === 0, treesPlaced);
        pine.setLit(1);
        pine.group.scale.setScalar(0.85 + ((treesPlaced * 0.29) % 0.65));
        pine.group.position.set(tx, 0, tz);
        this.mapInner.add(pine.group);
        this.corridorItems.push({ obj: pine.group, baseX: tx, baseZ: tz, baseYaw: ang });
        this.pineItems.push({ group: pine.group, phase: treesPlaced * 0.8 });
        treesPlaced++;
      }
    });

    // 6C. Stockholm / Drottninggatan Overhead Catenary Holiday Light Canopies in town/water biomes!
    if (!isLiveOsm && (snapshot.biome === 'village' || snapshot.biome === 'water')) {
      const canopyCount = quality === 'eco' ? 3 : 5;
      const glowTex = getSoftGlowTexture();
      for (let c = 0; c < canopyCount; c++) {
        const cz = -16 - c * 38;
        const cg = new THREE.Group();
        const spanPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 14; i++) {
          const u = i / 14;
          const x = -6.2 + u * 12.4;
          const y = 9.4 - Math.sin(u * Math.PI) * 1.35;
          spanPts.push(new THREE.Vector3(x, y, 0));
          if (i % 2 === 1) {
            const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 6, 6), mats.fairy);
            bulb.position.set(x, y, 0);
            cg.add(bulb);
          }
        }
        cg.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(spanPts), mats.fairy));

        // Central golden Stockholm holiday star/crown suspended over the street!
        const crownHalo = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTex,
            color: '#ffe07d',
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        crownHalo.scale.set(4.5, 4.5, 1);
        crownHalo.position.set(0, 7.9, 0);
        const crownRing = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.08, 6, 14), mats.fairy);
        crownRing.position.set(0, 7.9, 0);
        const crownCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), mats.churchGlass);
        crownCore.position.set(0, 7.9, 0);
        cg.add(crownHalo, crownRing, crownCore);

        cg.position.set(0, 0, cz);
        this.mapInner.add(cg);
        this.corridorItems.push({ obj: cg, baseX: 0, baseZ: cz, baseYaw: 0 });
      }
    }
    if (!isLiveOsm) {
      const torchWood = mats.fenceWood;
      const flameMat = new THREE.MeshBasicMaterial({ color: '#ffae38', toneMapped: false });
      for (let i = 0; i < 8; i++) {
        const side = i % 2 === 0 ? -1 : 1;
        const fx = side * 6.8;
        const fz = -18 - i * 24;
        const tg = new THREE.Group();
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.4, 6), torchWood);
        post.position.y = 0.7;
        const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.12, 0.22, 8), torchWood);
        bowl.position.y = 1.42;
        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.45, 7), flameMat);
        flame.position.y = 1.72;
        const halo = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: getSoftGlowTexture(),
            color: '#ff9e3d',
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        halo.scale.set(4.0, 4.0, 1);
        halo.position.y = 1.75;
        tg.add(post, bowl, flame, halo);
        tg.position.set(fx, 0, fz);
        tg.visible = this.theme === 'nordic';
        this.mapInner.add(tg);
        this.corridorItems.push({ obj: tg, baseX: fx, baseZ: fz, baseYaw: 0 });
        this.nordicTorches.push(tg);
      }
    }

    // 7. Animated Forest Wildlife across clearings, parks & open plains
    const kinds: WildlifeKind[] = ['stag', 'fox', 'owl', 'rabbit', 'stag', 'fox', 'rabbit', 'owl'];
    const maxAnimals =
      snapshot.biome === 'open' || snapshot.biome === 'forest'
        ? quality === 'eco'
          ? 5
          : 8
        : quality === 'eco'
          ? 3
          : 5;
    let placedAnimals = 0;

    for (let i = 0; i < 14 && placedAnimals < maxAnimals; i++) {
      const patch = snapshot.forests[i % Math.max(1, snapshot.forests.length)];
      const baseX = patch ? patch.centerX : (i % 2 === 0 ? -15 : 15);
      const baseZ = patch ? patch.centerZ : -26 - i * 24;
      const ang = i * 2.25;
      const ax = baseX + Math.cos(ang) * 5.8;
      const az = baseZ + Math.sin(ang) * 5.8;
      if (this.pointNearOccupied(ax, az, snapshot, 1.8)) continue;

      const kind = kinds[placedAnimals % kinds.length];
      const animal = createPixarForestAnimal(kind, i + 1);
      const scale = kind === 'stag' ? 1.15 : kind === 'fox' || kind === 'owl' ? 1.25 : 1.35;
      const yaw = Math.atan2(-ax, 4);
      animal.group.scale.setScalar(scale);
      animal.group.position.set(ax, 0, az);
      animal.group.rotation.y = yaw;
      this.mapInner.add(animal.group);
      this.corridorItems.push({ obj: animal.group, baseX: ax, baseZ: az, baseYaw: yaw });
      this.animals.push(animal);
      placedAnimals++;
    }
  }

  update(
    dt: number,
    telemetry: TelemetryFrame,
    osm: OsmWorldState,
    quality: GraphicsQuality,
    sleighAlert: number,
    getRoadCurveX: (z: number) => number = () => 0
  ): void {
    this.group.visible = osm.enabled;
    if (!osm.enabled) return;

    if (
      this.builtVersion !== osm.snapshot.version ||
      this.builtQuality !== quality ||
      this.builtIsLiveOsm !== osm.isLiveOsm
    ) {
      this.rebuildFromSnapshot(osm.snapshot, quality, osm.isLiveOsm);
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

      // Keep curved road & snowbank corridor completely safe from overlapping buildings!
      const cosP = Math.cos(pivotRad);
      const sinP = Math.sin(pivotRad);
      for (const b of this.buildingRefs) {
        const lx = b.centerX - this.smoothCarX;
        const lz = b.centerZ - this.smoothCarZ;
        const wx = lx * cosP + lz * sinP;
        const wz = -lx * sinP + lz * cosP;
        const curveX = getRoadCurveX(wz);
        const nearRoad = Math.abs(wx - curveX) < b.radius + 7.5 && wz > -185 && wz < 22;
        b.group.visible = this.mappedStreets || !nearRoad;
        if (b.label) b.label.rotation.y = -pivotRad;
      }
    } else {
      // Curve-locked corridor update: objects track the curving road Z->X tangent and NEVER slide into traffic!
      this.wasLiveOsm = false;
      this.mapPivot.rotation.y = 0;
      this.mapInner.position.set(0, 0, 0);

      for (const item of this.corridorItems) {
        const wz = item.baseZ + osm.demoTravelM;
        const roadX = getRoadCurveX(wz);
        const nextRoadX = getRoadCurveX(wz - 5);
        const tangentYaw = Math.atan2(roadX - nextRoadX, 5);
        item.obj.position.set(roadX + item.baseX, item.obj.position.y, wz);
        item.obj.rotation.y = item.baseYaw + tangentYaw;
      }

      for (const b of this.buildingRefs) {
        b.group.visible = true;
        if (b.label) b.label.rotation.y = -b.group.rotation.y;
      }
    }

    const time = telemetry.elapsedSec;
    const pulse = this.beatEnergy;

    // Audio-reactive glow & theme palette accents across facades + fairy trim
    if (sharedFacadeMats) {
      const targetEmissive = this.theme === 'cyber2099' ? '#a66bff' : '#ffbd58';
      for (const fm of sharedFacadeMats) {
        fm.emissive.set(targetEmissive);
        fm.emissiveIntensity = 0.85 + pulse * 0.85;
      }
    }
    if (sharedGoldFairyMat) {
      sharedGoldFairyMat.color.set(
        this.theme === 'cyber2099' ? '#4df3ff' : this.theme === 'nordic' ? '#ffd978' : '#ffdf88'
      );
    }
    if (sharedGigaGlassMat) {
      sharedGigaGlassMat.emissiveIntensity = 0.55 + pulse * 0.75;
    }

    for (const torch of this.nordicTorches) {
      torch.visible = this.theme === 'nordic';
    }

    // Real wind gently sways pine trees
    const windStrength = THREE.MathUtils.clamp(this.windX * 0.045, -0.14, 0.14);
    for (const p of this.pineItems) {
      p.group.rotation.z = windStrength + Math.sin(time * 2.1 + p.phase) * (0.015 + Math.abs(windStrength) * 0.4);
    }

    // Building Gift Cannon celebration illumination & sparkle beat response
    for (const b of this.buildingRefs) {
      if (b.litBoost > 0.02) {
        b.celebrateStar.visible = true;
        b.celebrateStar.rotation.y = time * 2.5;
        b.celebrateStar.position.y = b.topY + 0.9 + Math.sin(time * 4) * 0.18;
        (b.celebrateHalo.material as THREE.SpriteMaterial).opacity =
          Math.min(0.98, 0.52 + b.litBoost * 0.45 + pulse * 0.25);
        b.litBoost = Math.max(0.25, b.litBoost - dt * 0.06);
      } else {
        b.celebrateStar.visible = false;
        (b.celebrateHalo.material as THREE.SpriteMaterial).opacity = 0.08 + pulse * 0.22;
      }
    }

    for (const anim of this.animals) {
      anim.update(dt, time, sleighAlert);
    }
    for (const upd of this.cottageUpdaters) {
      upd(dt, time);
    }
    for (const upd of this.plazaUpdaters) {
      upd(time);
    }
  }

  dispose(): void {
    this.clearInner();
  }
}
