import * as THREE from 'three';

const ZOOM = 14;
const GRID_COUNT = 1 << ZOOM; // 16384
const TILE_PX = 256;
const METERS_PER_DEG_LAT = 111320;
const MAX_CACHED_TILES = 16;

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

  getVersion(): number {
    return this.version;
  }

  update(lat: number, lon: number, enabled: boolean): void {
    if (!enabled || !Number.isFinite(lat) || !Number.isFinite(lon)) return;
    const { fx, fy } = latLonToTileFloat(lat, lon);
    const tx = Math.floor(fx);
    const ty = Math.floor(fy);

    // Fetch center tile first, plus immediate neighbor tiles if close to tile boundary
    this.ensureTile(tx, ty);
    const localU = fx - tx;
    const localV = fy - ty;
    if (localU < 0.32) this.ensureTile(tx - 1, ty);
    if (localU > 0.68) this.ensureTile(tx + 1, ty);
    if (localV < 0.32) this.ensureTile(tx, ty - 1);
    if (localV > 0.68) this.ensureTile(tx, ty + 1);
    if (localU < 0.32 && localV < 0.32) this.ensureTile(tx - 1, ty - 1);
    if (localU > 0.68 && localV < 0.32) this.ensureTile(tx + 1, ty - 1);
    if (localU < 0.32 && localV > 0.68) this.ensureTile(tx - 1, ty + 1);
    if (localU > 0.68 && localV > 0.68) this.ensureTile(tx + 1, ty + 1);
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

  private sampleMetersAbs(lat: number, lon: number, fallbackTx?: number, fallbackTy?: number): number | undefined {
    const { fx, fy } = latLonToTileFloat(lat, lon);
    const tx = ((Math.floor(fx) % GRID_COUNT) + GRID_COUNT) % GRID_COUNT;
    const ty = THREE.MathUtils.clamp(Math.floor(fy), 0, GRID_COUNT - 1);
    let entry = this.cache.get(`${ZOOM}/${tx}/${ty}`);
    let px = (fx - Math.floor(fx)) * (TILE_PX - 1);
    let py = (fy - Math.floor(fy)) * (TILE_PX - 1);

    if ((!entry || entry.status !== 'ready' || !entry.heights) && fallbackTx !== undefined && fallbackTy !== undefined) {
      entry = this.cache.get(`${ZOOM}/${fallbackTx}/${fallbackTy}`);
      px = THREE.MathUtils.clamp((fx - fallbackTx) * (TILE_PX - 1), 0, TILE_PX - 1);
      py = THREE.MathUtils.clamp((fy - fallbackTy) * (TILE_PX - 1), 0, TILE_PX - 1);
    }

    if (!entry || entry.status !== 'ready' || !entry.heights) return undefined;
    const h = entry.heights;
    const x0 = Math.floor(px);
    const y0 = Math.floor(py);
    const x1 = Math.min(TILE_PX - 1, x0 + 1);
    const y1 = Math.min(TILE_PX - 1, y0 + 1);
    const txFrac = px - x0;
    const tyFrac = py - y0;

    const h00 = h[y0 * TILE_PX + x0];
    const h10 = h[y0 * TILE_PX + x1];
    const h01 = h[y1 * TILE_PX + x0];
    const h11 = h[y1 * TILE_PX + x1];

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
    const datum = this.sampleMetersAbs(originLat, originLon);
    if (datum === undefined) return undefined;

    const lonScale = METERS_PER_DEG_LAT * Math.max(0.15, Math.cos((originLat * Math.PI) / 180));
    const sampleSmoothAbs = (x: number, z: number): number | undefined => {
      const c = this.sampleMetersAbs(originLat - z / METERS_PER_DEG_LAT, originLon + x / lonScale, centerTx, centerTy);
      if (c === undefined) return undefined;
      const d = 7.5;
      const n = this.sampleMetersAbs(originLat - (z - d) / METERS_PER_DEG_LAT, originLon + x / lonScale, centerTx, centerTy) ?? c;
      const s = this.sampleMetersAbs(originLat - (z + d) / METERS_PER_DEG_LAT, originLon + x / lonScale, centerTx, centerTy) ?? c;
      const w = this.sampleMetersAbs(originLat - z / METERS_PER_DEG_LAT, originLon + (x - d) / lonScale, centerTx, centerTy) ?? c;
      const e = this.sampleMetersAbs(originLat - z / METERS_PER_DEG_LAT, originLon + (x + d) / lonScale, centerTx, centerTy) ?? c;
      return c * 0.44 + (n + s + w + e) * 0.14;
    };

    return (x: number, z: number) => {
      const dist = Math.hypot(x, z);
      if (dist > 375) return 0;
      const raw = sampleSmoothAbs(x, z);
      if (raw === undefined) return 0;
      const fade = 1 - THREE.MathUtils.smoothstep(dist, 290, 370);
      return THREE.MathUtils.clamp((raw - datum) * 2.2, -36, 48) * fade;
    };
  }
}
