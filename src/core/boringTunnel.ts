import { i18n } from './i18n';
import { TelemetryFrame } from './telemetry';

interface FrostStreak {
  angle: number;
  z: number;
  len: number;
  gold: boolean;
}

export class BoringTunnelRenderer {
  private streaks: FrostStreak[] = [];
  private scrollPhase = 0;

  constructor() {
    for (let i = 0; i < 65; i++) {
      this.streaks.push({
        angle: Math.random() * Math.PI * 2,
        z: Math.random(),
        len: 0.04 + Math.random() * 0.09,
        gold: Math.random() > 0.72,
      });
    }
  }

  render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    dt: number,
    telemetry: TelemetryFrame
  ): void {
    const blend = telemetry.tunnelBlend;
    if (blend <= 0.01) return;

    const effectiveSpeed = telemetry.speedKmh > 3 ? telemetry.speedKmh : 68;
    const speedFactor = 0.55 + (effectiveSpeed / 80) * 1.45;
    this.scrollPhase = (this.scrollPhase + dt * speedFactor * 1.35) % 1;

    ctx.save();
    ctx.globalAlpha = Math.min(1, blend);

    // 1. Deep tunnel backdrop
    const cx = width * 0.5 + telemetry.turnRate * width * 0.08;
    const cy = height * 0.46;

    const bgGrad = ctx.createRadialGradient(cx, cy, 12, cx, cy, Math.max(width, height) * 0.78);
    bgGrad.addColorStop(0, '#fff4dc');
    bgGrad.addColorStop(0.08, '#ffb868');
    bgGrad.addColorStop(0.24, '#5a1324');
    bgGrad.addColorStop(0.65, '#190612');
    bgGrad.addColorStop(1, '#090208');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Rushing Candy-Cane Perspective Rings
    const ringCount = 22;
    const maxRadius = Math.hypot(width, height) * 0.78;
    const minRadius = 18;

    for (let i = ringCount - 1; i >= 0; i--) {
      const z = ((i / ringCount) + this.scrollPhase / ringCount) % 1;
      const zNear = Math.pow(z, 2.35);
      const r = minRadius + zNear * maxRadius;
      const offsetX = (cx - width * 0.5) * (1 - zNear) + telemetry.turnRate * 45 * (1 - zNear);
      const rx = width * 0.5 + offsetX;
      const ry = cy + (1 - zNear) * -10;

      const ringIndex = (i + Math.floor(this.scrollPhase * ringCount)) % 3;
      let strokeColor = '#e6223a'; // Coca-Cola Crimson
      if (ringIndex === 1) strokeColor = '#f7f1e8'; // Peppermint Snow
      if (ringIndex === 2) strokeColor = '#ffcf70'; // Warm Gold

      const lineWidth = 2 + zNear * 24;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(rx, ry, r * 1.18, r * 0.88, 0, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.globalAlpha = blend * (0.18 + zNear * 0.78);
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Inner LED string accents along top arch
      if (zNear > 0.14 && i % 2 === 0) {
        ctx.beginPath();
        ctx.ellipse(rx, ry, r * 1.13, r * 0.84, 0, Math.PI * 1.1, Math.PI * 1.9);
        ctx.strokeStyle = 'rgba(255, 224, 150, 0.65)';
        ctx.lineWidth = 1.5 + zNear * 4;
        ctx.setLineDash([4 + zNear * 12, 10 + zNear * 24]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.restore();
    }

    // 3. Reflective Snowy Tunnel Road Floor
    const floorGrad = ctx.createLinearGradient(0, cy + 20, 0, height);
    floorGrad.addColorStop(0, 'rgba(255, 210, 140, 0.2)');
    floorGrad.addColorStop(0.35, 'rgba(130, 30, 48, 0.35)');
    floorGrad.addColorStop(1, 'rgba(12, 5, 16, 0.88)');
    ctx.fillStyle = floorGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy + 16);
    ctx.lineTo(cx + 28, cy + 16);
    ctx.lineTo(width * 0.96, height);
    ctx.lineTo(width * 0.04, height);
    ctx.closePath();
    ctx.fill();

    // Glowing center guide lights on tunnel floor
    for (let i = 0; i < 12; i++) {
      const z = ((i / 12) + this.scrollPhase) % 1;
      const p = Math.pow(z, 2.2);
      const y = cy + 20 + p * (height - cy - 20);
      const x = cx + telemetry.turnRate * (1 - p) * 26;
      const rad = 2 + p * 8;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 216, 132, 0.85)' : 'rgba(255, 86, 104, 0.85)';
      ctx.beginPath();
      ctx.ellipse(x, y, rad * 1.8, rad * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Sparkling speed frost streaks
    for (const s of this.streaks) {
      s.z += dt * speedFactor * 0.85;
      if (s.z >= 1) s.z -= 1;
      const p1 = Math.pow(s.z, 2.0);
      const p2 = Math.pow(Math.min(1, s.z + s.len), 2.0);
      const r1 = 22 + p1 * maxRadius * 0.95;
      const r2 = 22 + p2 * maxRadius * 0.95;
      const cos = Math.cos(s.angle);
      const sin = Math.sin(s.angle);

      ctx.strokeStyle = s.gold
        ? `rgba(255, 224, 145, ${0.25 + p1 * 0.6})`
        : `rgba(235, 246, 255, ${0.22 + p1 * 0.55})`;
      ctx.lineWidth = 1 + p1 * 2.5;
      ctx.beginPath();
      ctx.moveTo(cx + cos * r1 * 1.15, cy + sin * r1 * 0.85);
      ctx.lineTo(cx + cos * r2 * 1.15, cy + sin * r2 * 0.85);
      ctx.stroke();
    }

    // 5. Arch Portal Banner Sign
    ctx.save();
    ctx.font = `600 ${Math.max(11, Math.round(width * 0.011))}px "Cinzel", Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 232, 182, 0.92)';
    ctx.shadowColor = 'rgba(255, 170, 70, 0.9)';
    ctx.shadowBlur = 14;
    ctx.fillText(i18n.t().tunnelBanner, width * 0.5, Math.max(76, height * 0.14));
    ctx.restore();

    ctx.restore();
  }
}
