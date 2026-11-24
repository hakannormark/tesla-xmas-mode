import * as THREE from 'three';

const ZOOM = 14;
const GRID_COUNT = 1 << ZOOM; // 16384
const TILE_PX = 256;
const METERS_PER_DEG_LAT = 110540;
const METERS_PER_DEG_LON_EQ = 111320;
const MAX_CACHED_TILES = 25;

interface TileEntry {
  status: 'loading' | 'ready' | 'failed';
  heights?: Float32Array;
}

function latLonToTileFloat(lat: number, lon: number): { fx: number; fy: number } {
  const clampedLat = THREE.MathUtils.clamp(lat, -85.05, 85.05);
  const rad = (clampedLat * Math.PI) / 180;
  const fx = ((lon + 180) / 360) * GRID_COUNT;
  const fy = ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * GRID_COUNT;
  return { fx, fy };
}

function decodeTerrariumTile(img: ImageBitmap | HTMLImageElement): Float32Array | null {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = TILE_PX;
    canvas.height = TILE_PX;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, TILE_PX, TILE_PX);
    const { data } = ctx.getImageData(0, 0, TILE_PX, TILE_PX);
    const heights = new Float32Array(TILE_PX * TILE_PX);
    for (let i = 0, p = 0; i < heights.length; i++, p += 4) {
      heights[i] = data[p] * 256 + data[p + 1] + data[p + 2] / 256 - 32768;
    }
    return heights;
  } catch {
    return null;
  }
}

export class LiveElevationManager {
  private readonly cache = new Map<string, TileEntry>();
  private version = 0;
  private anchorDatumM: number | undefined;

  getVersion(): number {
    return this.version;
  }

  update(lat: number, lon: number, enabled: boolean): void {
    if (!enabled || !Number.isFinite(lat) || !Number.isFinite(lon)) return;
    const { fx, fy } = latLonToTileFloat(lat, lon);
    const tx = Math.floor(fx);
    const ty = Math.floor(fy);

    // Fetch center tile first + generous adjacent tiles covering +-500m around the car
    this.ensureTile(tx, ty);
    const localU = fx - tx;
    const localV = fy - ty;
    if (localU < 0.45) this.ensureTile(tx - 1, ty);
    if (localU > 0.55) this.ensureTile(tx + 1, ty);
    if (localV < 0.45) this.ensureTile(tx, ty - 1);
    if (localV > 0.55) this.ensureTile(tx, ty + 1);
    if (localU < 0.45 && localV < 0.45) this.ensureTile(tx - 1, ty - 1);
    if (localU > 0.55 && localV < 0.45) this.ensureTile(tx + 1, ty - 1);
    if (localU < 0.45 && localV > 0.55) this.ensureTile(tx - 1, ty + 1);
    if (localU > 0.55 && localV > 0.55) this.ensureTile(tx + 1, ty + 1);
  }

  private ensureTile(rawX: number, rawY: number): void {
    const tx = ((rawX % GRID_COUNT) + GRID_COUNT) % GRID_COUNT;
    const ty = THREE.MathUtils.clamp(rawY, 0, GRID_COUNT - 1);
    const key = `${ZOOM}/${tx}/${ty}`;
    if (this.cache.has(key)) return;

    if (this.cache.size >= MAX_CACHED_TILES) {
      const oldest = this.cache.keys().next().value;
      if (oldest !== undefined) this.cache.delete(oldest);
    }

    const entry: TileEntry = { status: 'loading' };
    this.cache.set(key, entry);

    const url = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${ZOOM}/${tx}/${ty}.png`;
    this.fetchTile(url)
      .then(heights => {
        if (!heights) {
          entry.status = 'failed';
          return;
        }
        entry.heights = heights;
        entry.status = 'ready';
        this.version += 1;
      })
      .catch(() => {
        entry.status = 'failed';
      });
  }

  private async fetchTile(url: string): Promise<Float32Array | null> {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 4500);
    try {
      const response = await fetch(url, { mode: 'cors', signal: controller.signal });
      if (!response.ok) return null;
      const blob = await response.blob();
      if (typeof createImageBitmap === 'function') {
        const bitmap = await createImageBitmap(blob);
        try {
          return decodeTerrariumTile(bitmap);
        } finally {
          bitmap.close();
        }
      }
      const objectUrl = URL.createObjectURL(blob);
      try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const el = new Image();
          el.crossOrigin = 'anonymous';
          el.onload = () => resolve(el);
          el.onerror = () => reject(new Error('Tile image decode failed'));
          el.src = objectUrl;
        });
        return decodeTerrariumTile(img);
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    } catch {
      return null;
    } finally {
      window.clearTimeout(timer);
    }
  }

  private sampleGlobalPixel(gx: number, gy: number): number | undefined {
    const tx = ((Math.floor(gx / TILE_PX) % GRID_COUNT) + GRID_COUNT) % GRID_COUNT;
    const ty = THREE.MathUtils.clamp(Math.floor(gy / TILE_PX), 0, GRID_COUNT - 1);
    const entry = this.cache.get(`${ZOOM}/${tx}/${ty}`);
    if (!entry || entry.status !== 'ready' || !entry.heights) return undefined;
    const px = ((gx % TILE_PX) + TILE_PX) % TILE_PX;
    const py = THREE.MathUtils.clamp(gy - ty * TILE_PX, 0, TILE_PX - 1);
    return entry.heights[py * TILE_PX + px];
  }

  private sampleMetersAbs(lat: number, lon: number, fallbackTx?: number, fallbackTy?: number): number | undefined {
    const { fx, fy } = latLonToTileFloat(lat, lon);
    const gpx = fx * TILE_PX - 0.5;
    const gpy = fy * TILE_PX - 0.5;
    const x0 = Math.floor(gpx);
    const y0 = Math.floor(gpy);
    const x1 = x0 + 1;
    const y1 = y0 + 1;
    const txFrac = gpx - x0;
    const tyFrac = gpy - y0;

    let h00 = this.sampleGlobalPixel(x0, y0);
    if (h00 === undefined && fallbackTx !== undefined && fallbackTy !== undefined) {
      const fb = this.cache.get(`${ZOOM}/${fallbackTx}/${fallbackTy}`);
      if (!fb || fb.status !== 'ready' || !fb.heights) return undefined;
      const cx = THREE.MathUtils.clamp(Math.round(fx * TILE_PX - fallbackTx * TILE_PX), 0, TILE_PX - 1);
      const cy = THREE.MathUtils.clamp(Math.round(fy * TILE_PX - fallbackTy * TILE_PX), 0, TILE_PX - 1);
      return fb.heights[cy * TILE_PX + cx];
    }
    if (h00 === undefined) return undefined;

    const h10 = this.sampleGlobalPixel(x1, y0) ?? h00;
    const h01 = this.sampleGlobalPixel(x0, y1) ?? h00;
    const h11 = this.sampleGlobalPixel(x1, y1) ?? h10;

    const top = THREE.MathUtils.lerp(h00, h10, txFrac);
    const bot = THREE.MathUtils.lerp(h01, h11, txFrac);
    return THREE.MathUtils.lerp(top, bot, tyFrac);
  }

  getAbsoluteElevationM(lat: number, lon: number): number | undefined {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return undefined;
    return this.sampleMetersAbs(lat, lon);
  }

  getSampler(originLat: number, originLon: number): ((x: number, z: number) => number) | undefined {
    if (!Number.isFinite(originLat) || !Number.isFinite(originLon)) return undefined;
    const center = latLonToTileFloat(originLat, originLon);
    const centerTx = ((Math.floor(center.fx) % GRID_COUNT) + GRID_COUNT) % GRID_COUNT;
    const centerTy = THREE.MathUtils.clamp(Math.floor(center.fy), 0, GRID_COUNT - 1);
    const localCenterDatum = this.sampleMetersAbs(originLat, originLon, centerTx, centerTy);
    if (localCenterDatum === undefined) return undefined;

    if (this.anchorDatumM === undefined || Math.abs(localCenterDatum - this.anchorDatumM) > 45) {
      this.anchorDatumM = localCenterDatum;
    }
    const datum = this.anchorDatumM;

    const lonScale = METERS_PER_DEG_LON_EQ * Math.max(0.15, Math.cos((originLat * Math.PI) / 180));
    const sampleSmoothAbs = (x: number, z: number): number | undefined => {
      const c = this.sampleMetersAbs(originLat - z / METERS_PER_DEG_LAT, originLon + x / lonScale, centerTx, centerTy);
      if (c === undefined) return undefined;
      const d = 4.5;
      const n = this.sampleMetersAbs(originLat - (z - d) / METERS_PER_DEG_LAT, originLon + x / lonScale, centerTx, centerTy) ?? c;
      const s = this.sampleMetersAbs(originLat - (z + d) / METERS_PER_DEG_LAT, originLon + x / lonScale, centerTx, centerTy) ?? c;
      const w = this.sampleMetersAbs(originLat - z / METERS_PER_DEG_LAT, originLon + (x - d) / lonScale, centerTx, centerTy) ?? c;
      const e = this.sampleMetersAbs(originLat - z / METERS_PER_DEG_LAT, originLon + (x + d) / lonScale, centerTx, centerTy) ?? c;
      return c * 0.52 + (n + s + w + e) * 0.12;
    };

    return (x: number, z: number) => {
      const dist = Math.hypot(x, z);
      if (dist > 395) return 0;
      const raw = sampleSmoothAbs(x, z);
      if (raw === undefined) return 0;
      const fade = 1 - THREE.MathUtils.smoothstep(dist, 315, 390);
      return THREE.MathUtils.clamp((raw - datum) * 1.05, -45, 75) * fade;
    };
  }
}
