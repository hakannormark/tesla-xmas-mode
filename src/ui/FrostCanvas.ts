import { EnvironmentState } from '../core/environment';

export class FrostCanvasOverlay {
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private baseCanvas: HTMLCanvasElement;
  private baseCtx: CanvasRenderingContext2D;
  private w = 640;
  private h = 360;
  private scale = 0.5;
  private seeded = false;
  private lastEnabled = false;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'frost-canvas';
    this.ctx = this.canvas.getContext('2d')!;

    this.baseCanvas = document.createElement('canvas');
    this.baseCtx = this.baseCanvas.getContext('2d')!;
  }

  resize(viewWidth: number, viewHeight: number): void {
    const scale = Math.min(0.55, Math.max(0.35, 640 / Math.max(1, viewWidth)));
    const nw = Math.max(240, Math.round(viewWidth * scale));
    const nh = Math.max(160, Math.round(viewHeight * scale));
    if (nw === this.w && nh === this.h && this.seeded) return;

    this.scale = nw / Math.max(1, viewWidth);
    this.w = nw;
    this.h = nh;
    this.canvas.width = nw;
    this.canvas.height = nh;
    this.baseCanvas.width = nw;
    this.baseCanvas.height = nh;
    this.buildBaseFrostPattern();
    this.ctx.clearRect(0, 0, nw, nh);
    this.ctx.drawImage(this.baseCanvas, 0, 0);
    this.seeded = true;
  }

  private buildBaseFrostPattern(): void {
    const { baseCtx: ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);

    // 1. Soft icy vignette strongest in the 4 windshield corners
    const cx = w * 0.5;
    const cy = h * 0.5;
    const maxR = Math.hypot(cx, cy);
    const vig = ctx.createRadialGradient(cx, cy, maxR * 0.44, cx, cy, maxR);
    vig.addColorStop(0, 'rgba(220, 242, 255, 0)');
    vig.addColorStop(0.58, 'rgba(210, 236, 255, 0.08)');
    vig.addColorStop(0.84, 'rgba(225, 245, 255, 0.34)');
    vig.addColorStop(1, 'rgba(242, 252, 255, 0.72)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);

    // 2. Delicate crystalline frost fern strokes anchored along corners & edges
    const corners: [number, number][] = [
      [0, 0],
      [w, 0],
      [0, h],
      [w, h],
    ];
    ctx.lineCap = 'round';
    corners.forEach(([ox, oy], cIdx) => {
      for (let i = 0; i < 16; i++) {
        const ang =
          Math.atan2(cy - oy, cx - ox) + ((i - 7.5) / 15) * 1.35 + ((cIdx * 0.13) % 0.2);
        const len = (0.14 + ((i * 37) % 10) * 0.018) * Math.min(w, h);
        const ex = ox + Math.cos(ang) * len;
        const ey = oy + Math.sin(ang) * len;

        ctx.strokeStyle = 'rgba(240, 250, 255, 0.36)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        // Feather barbs along frost crystal spine
        for (let b = 0.35; b <= 0.85; b += 0.25) {
          const bx = ox + (ex - ox) * b;
          const by = oy + (ey - oy) * b;
          const bl = len * 0.24 * (1.15 - b);
          for (const side of [-0.65, 0.65]) {
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(bx + Math.cos(ang + side) * bl, by + Math.sin(ang + side) * bl);
            ctx.stroke();
          }
        }
      }
    });
  }

  wipeAt(clientX: number, clientY: number, radiusPx = 58): boolean {
    if (!this.seeded || !this.lastEnabled) return false;
    const x = clientX * this.scale;
    const y = clientY * this.scale;
    const r = radiusPx * this.scale;

    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r);
    g.addColorStop(0, 'rgba(0, 0, 0, 0.92)');
    g.addColorStop(0.65, 'rgba(0, 0, 0, 0.55)');
    g.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Only report an audible scrape when wiping near frosted rim zones
    const nx = clientX / Math.max(1, this.w / this.scale);
    const ny = clientY / Math.max(1, this.h / this.scale);
    return Math.hypot(nx - 0.5, ny - 0.5) > 0.28;
  }

  update(dt: number, env: EnvironmentState): void {
    this.lastEnabled = env.frostEnabled && env.frostAmount > 0.02;
    this.canvas.style.opacity = this.lastEnabled ? String(Math.min(0.92, env.frostAmount * 0.92)) : '0';
    if (!this.lastEnabled || !this.seeded) return;

    // Slowly regrow frosted rim crystals over time (faster in snowy storms)
    const regrowAlpha = Math.min(0.08, dt * (env.isSnowingReal ? 0.075 : 0.038));
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.globalAlpha = regrowAlpha;
    this.ctx.drawImage(this.baseCanvas, 0, 0);
    this.ctx.restore();
  }
}
