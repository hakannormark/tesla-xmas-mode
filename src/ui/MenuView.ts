import { AudioMixMode, HolidayAudioEngine } from '../core/audioEngine';
import { i18n, SceneId } from '../core/i18n';
import { DriveSource } from '../core/telemetry';

export interface MenuCallbacks {
  onSelectMode: (id: SceneId) => void;
  onDriveSourceChange: (source: DriveSource) => void;
  onAudioMixChange: (mix: AudioMixMode) => void;
  onSoundCheckOpen: () => void;
}

interface MenuSnow {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
}

const MODE_ORDER: SceneId[] = ['express', 'caravan', 'flight3d', 'snowglobe'];

export class MenuView {
  private root: HTMLElement;
  private bgCanvas: HTMLCanvasElement;
  private bgCtx: CanvasRenderingContext2D;
  private safetyOverlay: HTMLElement;
  private safetyAccepted = false;

  private thumbCanvases = new Map<SceneId, HTMLCanvasElement>();
  private snow: MenuSnow[] = [];
  private visible = true;
  private callbacks: MenuCallbacks;
  private audio: HolidayAudioEngine;

  private currentDriveSource: DriveSource = 'demo';
  private currentAudioMix: AudioMixMode = 'full';

  constructor(
    container: HTMLElement,
    audio: HolidayAudioEngine,
    initialDrive: DriveSource,
    initialMix: AudioMixMode,
    callbacks: MenuCallbacks
  ) {
    this.audio = audio;
    this.currentDriveSource = initialDrive;
    this.currentAudioMix = initialMix;
    this.callbacks = callbacks;

    for (let i = 0; i < 85; i++) {
      this.snow.push({
        x: Math.random(),
        y: Math.random(),
        r: 1 + Math.random() * 2.2,
        speed: 0.03 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
      });
    }

    this.root = document.createElement('div');
    this.root.className = 'menu-view';

    this.bgCanvas = document.createElement('canvas');
    this.bgCanvas.className = 'menu-bg-canvas';
    this.bgCtx = this.bgCanvas.getContext('2d')!;
    this.root.appendChild(this.bgCanvas);

    this.safetyOverlay = document.createElement('div');
    this.safetyOverlay.className = 'safety-overlay';
    this.root.appendChild(this.safetyOverlay);

    container.appendChild(this.root);

    this.renderContent();
    i18n.onChange(() => this.renderContent());
    this.resize(window.innerWidth, window.innerHeight);
  }

  private renderContent(): void {
    const t = i18n.t();
    const locale = i18n.getLocale();

    // Preserve background canvas & safety overlay while updating gallery markup
    const existingGallery = this.root.querySelector('.menu-gallery');
    if (existingGallery) existingGallery.remove();

    const gallery = document.createElement('div');
    gallery.className = 'menu-gallery';

    gallery.innerHTML = `
      <header class="menu-header">
        <div class="menu-brand">
          <div class="menu-logo-crest" aria-hidden="true">✦</div>
          <div>
            <h1 class="menu-title">${t.appTitle}</h1>
            <p class="menu-subtitle">${t.appSubtitle}</p>
          </div>
        </div>
        <div class="menu-header-actions">
          <button type="button" class="pill-btn" data-action="sound-test">🔊 ${t.soundTestBtn}</button>
          <div class="segmented-sm" role="group" aria-label="${t.languageLabel}">
            <button type="button" class="${locale === 'sv' ? 'active' : ''}" data-lang="sv">SV</button>
            <button type="button" class="${locale === 'en' ? 'active' : ''}" data-lang="en">EN</button>
          </div>
        </div>
      </header>

      <main class="mode-grid">
        ${MODE_ORDER.map((id) => {
          const m = t.modes[id];
          return `
            <button type="button" class="mode-card" data-mode="${id}">
              <div class="mode-thumb-wrap">
                <canvas class="mode-thumb" data-thumb="${id}" width="320" height="150"></canvas>
                <span class="mode-badge">${m.badge}</span>
              </div>
              <div class="mode-card-body">
                <h2>${m.title}</h2>
                <p>${m.subtitle}</p>
              </div>
            </button>
          `;
        }).join('')}
      </main>

      <footer class="menu-footer">
        <div class="footer-group">
          <span class="footer-label">${t.menuDriveLabel}</span>
          <div class="segmented">
            <button type="button" class="${this.currentDriveSource === 'gps' ? 'active' : ''}" data-drive="gps">${t.driveGps}</button>
            <button type="button" class="${this.currentDriveSource === 'demo' ? 'active' : ''}" data-drive="demo">${t.driveDemo}</button>
            <button type="button" class="${this.currentDriveSource === 'manual' ? 'active' : ''}" data-drive="manual">${t.driveManual}</button>
          </div>
        </div>
        <div class="footer-group">
          <span class="footer-label">${t.menuAudioLabel}</span>
          <div class="segmented">
            <button type="button" class="${this.currentAudioMix === 'full' ? 'active' : ''}" data-mix="full">${t.audioFull}</button>
            <button type="button" class="${this.currentAudioMix === 'sfx' ? 'active' : ''}" data-mix="sfx">${t.audioSfx}</button>
            <button type="button" class="${this.currentAudioMix === 'muted' ? 'active' : ''}" data-mix="muted">${t.audioMuted}</button>
          </div>
        </div>
      </footer>
    `;

    this.root.insertBefore(gallery, this.safetyOverlay);

    // Grab thumbnail canvases
    this.thumbCanvases.clear();
    gallery.querySelectorAll<HTMLCanvasElement>('canvas[data-thumb]').forEach((c) => {
      const id = c.dataset.thumb as SceneId;
      this.thumbCanvases.set(id, c);
    });

    // Attach event handlers
    gallery.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.unlock();
        this.callbacks.onSelectMode(btn.dataset.mode as SceneId);
      });
    });

    gallery.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        i18n.setLocale(btn.dataset.lang as 'sv' | 'en');
      });
    });

    gallery.querySelector('[data-action="sound-test"]')?.addEventListener('click', () => {
      this.audio.unlock();
      this.callbacks.onSoundCheckOpen();
    });

    gallery.querySelectorAll<HTMLButtonElement>('[data-drive]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const src = btn.dataset.drive as DriveSource;
        this.setDriveSource(src);
        this.callbacks.onDriveSourceChange(src);
      });
    });

    gallery.querySelectorAll<HTMLButtonElement>('[data-mix]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mix = btn.dataset.mix as AudioMixMode;
        this.audio.unlock();
        this.setAudioMix(mix);
        this.callbacks.onAudioMixChange(mix);
      });
    });

    // Safety notice overlay
    this.safetyOverlay.classList.toggle('hidden', this.safetyAccepted);
    this.safetyOverlay.innerHTML = `
      <div class="safety-card">
        <div class="safety-crest">✦ ${t.appTitle} ✦</div>
        <h2>${t.safetyTitle}</h2>
        <ul class="safety-list">
          ${t.safetyRules.map((r) => `<li>${r}</li>`).join('')}
        </ul>
        <p class="safety-disclaimer">${t.safetyDisclaimer}</p>
        <button type="button" class="primary-glow-btn" data-accept-safety>${t.safetyAccept}</button>
      </div>
    `;
    this.safetyOverlay.querySelector('[data-accept-safety]')?.addEventListener('click', () => {
      this.safetyAccepted = true;
      this.safetyOverlay.classList.add('hidden');
      this.audio.unlock();
      this.audio.playSparkleChime();
    });
  }

  setDriveSource(src: DriveSource): void {
    this.currentDriveSource = src;
    this.root.querySelectorAll<HTMLButtonElement>('[data-drive]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.drive === src);
    });
  }

  setAudioMix(mix: AudioMixMode): void {
    this.currentAudioMix = mix;
    this.root.querySelectorAll<HTMLButtonElement>('[data-mix]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mix === mix);
    });
  }

  show(): void {
    this.visible = true;
    this.root.classList.remove('is-hidden');
  }

  hide(): void {
    this.visible = false;
    this.root.classList.add('is-hidden');
  }

  isVisible(): boolean {
    return this.visible;
  }

  resize(width: number, height: number): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.bgCanvas.width = Math.floor(width * dpr);
    this.bgCanvas.height = Math.floor(height * dpr);
    this.bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  update(dt: number, elapsedSec: number): void {
    if (!this.visible) return;
    const w = this.bgCanvas.clientWidth || window.innerWidth;
    const h = this.bgCanvas.clientHeight || window.innerHeight;
    const ctx = this.bgCtx;

    // 1. Deep Coca-Cola Winter Night backdrop + gentle drifting snow
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#040a1d');
    grad.addColorStop(0.55, '#0b193d');
    grad.addColorStop(1, '#18254a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle warm radial glow
    const warm = ctx.createRadialGradient(w * 0.5, h * 0.35, 20, w * 0.5, h * 0.35, w * 0.65);
    warm.addColorStop(0, 'rgba(200, 16, 46, 0.14)');
    warm.addColorStop(0.5, 'rgba(255, 195, 110, 0.06)');
    warm.addColorStop(1, 'rgba(6, 13, 36, 0)');
    ctx.fillStyle = warm;
    ctx.fillRect(0, 0, w, h);

    for (const s of this.snow) {
      s.y += s.speed * dt;
      s.x += Math.sin(elapsedSec + s.phase) * 0.01 * dt;
      if (s.y > 1.02) {
        s.y = -0.02;
        s.x = Math.random();
      }
      ctx.fillStyle = 'rgba(235, 245, 255, 0.52)';
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Render live animated mini-canvas thumbnails inside mode cards!
    this.drawThumbExpress(elapsedSec);
    this.drawThumbCaravan(elapsedSec);
    this.drawThumbFlight3D(elapsedSec);
    this.drawThumbSnowglobe(elapsedSec);
  }

  private drawThumbExpress(t: number): void {
    const c = this.thumbCanvases.get('express');
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const w = c.width;
    const h = c.height;

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#040a1d');
    sky.addColorStop(0.65, '#132856');
    sky.addColorStop(1, '#313254');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Aurora glow
    ctx.strokeStyle = 'rgba(56, 236, 178, 0.36)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 20) {
      const y = h * 0.24 + Math.sin(x * 0.024 + t) * 8;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Moon with warm Pixar halation
    const mx = w * 0.78;
    const my = h * 0.28;
    const halo = ctx.createRadialGradient(mx, my, 4, mx, my, 52);
    halo.addColorStop(0, 'rgba(255, 244, 204, 0.78)');
    halo.addColorStop(0.45, 'rgba(255, 210, 128, 0.25)');
    halo.addColorStop(1, 'rgba(255, 190, 90, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(mx, my, 52, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff8e2';
    ctx.beginPath();
    ctx.arc(mx, my, 20, 0, Math.PI * 2);
    ctx.fill();

    // Alpine peaks & snowy hills
    ctx.fillStyle = '#243a69';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.72);
    ctx.lineTo(65, h * 0.46);
    ctx.lineTo(140, h * 0.68);
    ctx.lineTo(220, h * 0.44);
    ctx.lineTo(w, h * 0.7);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#bfd8f5';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.78);
    ctx.quadraticCurveTo(w * 0.5, h * 0.69, w, h * 0.78);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Cozy Pixar cottage + warm window bloom
    const cotGlow = ctx.createRadialGradient(62, h * 0.74, 4, 62, h * 0.74, 38);
    cotGlow.addColorStop(0, 'rgba(255, 198, 92, 0.55)');
    cotGlow.addColorStop(1, 'rgba(255, 170, 70, 0)');
    ctx.fillStyle = cotGlow;
    ctx.beginPath();
    ctx.arc(62, h * 0.74, 38, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#731724';
    ctx.fillRect(46, h * 0.66, 32, 22);
    ctx.fillStyle = '#eef5ff';
    ctx.beginPath();
    ctx.moveTo(42, h * 0.66);
    ctx.lineTo(62, h * 0.54);
    ctx.lineTo(82, h * 0.66);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffdf88';
    ctx.fillRect(52, h * 0.71, 8, 8);
    ctx.fillRect(65, h * 0.71, 8, 8);

    // Animated sleigh + glowing pixie-dust ribbon
    const sx = ((t * 52) % (w + 100)) - 50;
    const sy = h * 0.38 + Math.sin(t * 3) * 6;
    const trailGrad = ctx.createLinearGradient(sx - 72, sy, sx, sy);
    trailGrad.addColorStop(0, 'rgba(255, 214, 118, 0)');
    trailGrad.addColorStop(1, 'rgba(255, 226, 136, 0.9)');
    ctx.strokeStyle = trailGrad;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(sx - 72, sy + 8);
    ctx.quadraticCurveTo(sx - 30, sy + 14, sx, sy + 4);
    ctx.stroke();

    ctx.fillStyle = '#d91632';
    ctx.beginPath();
    ctx.roundRect(sx - 12, sy - 6, 26, 13, 5);
    ctx.fill();
    ctx.fillStyle = '#ff384c';
    ctx.beginPath();
    ctx.arc(sx + 28, sy - 4, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawThumbCaravan(t: number): void {
    const c = this.thumbCanvases.get('caravan');
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const w = c.width;
    const h = c.height;

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#070f28');
    sky.addColorStop(1, '#261838');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#182442';
    ctx.fillRect(0, h * 0.7, w, h * 0.3);

    // Volumetric dual headlight cone
    const gx = 212 + Math.sin(t * 2) * 8;
    const beam = ctx.createLinearGradient(gx, h * 0.68, w, h * 0.68);
    beam.addColorStop(0, 'rgba(255, 238, 178, 0.78)');
    beam.addColorStop(0.55, 'rgba(255, 206, 118, 0.24)');
    beam.addColorStop(1, 'rgba(255, 190, 95, 0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(gx, h * 0.68);
    ctx.lineTo(w, h * 0.45);
    ctx.lineTo(w, h * 0.88);
    ctx.closePath();
    ctx.fill();

    // Two glossy 3D-shaded crimson Tesla Semis + warm road bloom
    for (const tx of [34, 134]) {
      const roadGlow = ctx.createRadialGradient(tx + 38, h * 0.78, 4, tx + 38, h * 0.78, 46);
      roadGlow.addColorStop(0, 'rgba(255, 120, 72, 0.48)');
      roadGlow.addColorStop(1, 'rgba(200, 16, 46, 0)');
      ctx.fillStyle = roadGlow;
      ctx.beginPath();
      ctx.arc(tx + 38, h * 0.78, 46, 0, Math.PI * 2);
      ctx.fill();

      const bodyGrad = ctx.createLinearGradient(tx, h * 0.48, tx, h * 0.78);
      bodyGrad.addColorStop(0, '#e6223e');
      bodyGrad.addColorStop(1, '#850a1e');
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.roundRect(tx, h * 0.48, 58, 30, 3);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(tx + 58, h * 0.54);
      ctx.lineTo(tx + 72, h * 0.58);
      ctx.lineTo(tx + 82, h * 0.67);
      ctx.lineTo(tx + 82, h * 0.78);
      ctx.lineTo(tx + 58, h * 0.78);
      ctx.closePath();
      ctx.fill();

      for (let i = 0; i < 6; i++) {
        const pulse = 0.55 + 0.45 * Math.sin(t * 6 + i * 0.7);
        ctx.fillStyle = `rgba(255, 228, 136, ${pulse})`;
        ctx.beginPath();
        ctx.arc(tx + 6 + i * 10, h * 0.51, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  private drawThumbFlight3D(t: number): void {
    const c = this.thumbCanvases.get('flight3d');
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const w = c.width;
    const h = c.height;

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#040a1d');
    sky.addColorStop(0.55, '#0e2859');
    sky.addColorStop(1, '#1d3970');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Layered Pixar Aurora Curtains
    for (let layer = 0; layer < 2; layer++) {
      ctx.strokeStyle = layer === 0 ? 'rgba(60, 238, 178, 0.48)' : 'rgba(255, 210, 120, 0.25)';
      ctx.lineWidth = layer === 0 ? 14 : 8;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 16) {
        const y = h * (0.24 + layer * 0.08) + Math.sin(x * 0.03 + t * 1.5 + layer) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Curving 3D winter road
    const vx = w * 0.5 + Math.sin(t * 1.2) * 30;
    ctx.fillStyle = '#20325a';
    ctx.beginPath();
    ctx.moveTo(vx - 12, h * 0.5);
    ctx.lineTo(vx + 12, h * 0.5);
    ctx.lineTo(w * 0.86, h);
    ctx.lineTo(w * 0.14, h);
    ctx.closePath();
    ctx.fill();

    // Glowing center perspective dashes
    ctx.fillStyle = '#ffe59c';
    for (let i = 0; i < 4; i++) {
      const p = ((i / 4 + t * 0.7) % 1);
      const y = h * 0.52 + p * p * (h * 0.48);
      const px = vx + (w * 0.5 - vx) * p;
      ctx.fillRect(px - 2, y, 4, 4 + p * 8);
    }

    // Chase sleigh + golden stardust bloom
    const sy = h * 0.64 + Math.sin(t * 3) * 4;
    const bloom = ctx.createRadialGradient(w * 0.5, sy + 4, 2, w * 0.5, sy + 4, 34);
    bloom.addColorStop(0, 'rgba(255, 216, 118, 0.75)');
    bloom.addColorStop(1, 'rgba(255, 180, 70, 0)');
    ctx.fillStyle = bloom;
    ctx.beginPath();
    ctx.arc(w * 0.5, sy + 4, 34, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d91636';
    ctx.beginPath();
    ctx.roundRect(w * 0.5 - 14, sy - 6, 28, 14, 5);
    ctx.fill();
  }

  private drawThumbSnowglobe(t: number): void {
    const c = this.thumbCanvases.get('snowglobe');
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const w = c.width;
    const h = c.height;

    ctx.fillStyle = '#060e26';
    ctx.fillRect(0, 0, w, h);

    // Flanking vintage brass gauges
    for (const gx of [w * 0.19, w * 0.81]) {
      ctx.strokeStyle = '#f2cc72';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(gx, h * 0.54, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#ff4252';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(gx, h * 0.54);
      ctx.lineTo(gx + Math.cos(t * 2) * 16, h * 0.54 + Math.sin(t * 2) * 16);
      ctx.stroke();
    }

    const cx = w * 0.5;
    const cy = h * 0.45;
    const r = 44;

    // Outer crystal glow
    const glow = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.45);
    glow.addColorStop(0, 'rgba(155, 205, 255, 0.25)');
    glow.addColorStop(1, 'rgba(15, 28, 66, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.45, 0, Math.PI * 2);
    ctx.fill();

    // Velvet crimson pedestal with brass trim
    ctx.fillStyle = '#8b1024';
    ctx.beginPath();
    ctx.roundRect(cx - 28, cy + r - 7, 56, 17, 4);
    ctx.fill();
    ctx.fillStyle = '#f4cf78';
    ctx.fillRect(cx - 29, cy + r - 8, 58, 3);

    // Crystal globe interior
    const sphereGrad = ctx.createRadialGradient(cx - 14, cy - 14, 6, cx, cy, r);
    sphereGrad.addColorStop(0, '#1e3f7e');
    sphereGrad.addColorStop(1, '#0c1c42');
    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Mini glowing Christmas tree inside
    ctx.fillStyle = '#195442';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 10);
    ctx.lineTo(cx - 14, cy + 24);
    ctx.lineTo(cx + 14, cy + 24);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffe082';
    ctx.beginPath();
    ctx.arc(cx, cy - 11, 3, 0, Math.PI * 2);
    ctx.fill();

    // Specular curved glass highlight
    ctx.save();
    ctx.translate(cx - 16, cy - 16);
    ctx.rotate(-0.65);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.34)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = 'rgba(220, 240, 255, 0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Swirling 3D snow & gold motes
    for (let i = 0; i < 18; i++) {
      const a = t * 1.7 + i * 0.7;
      const rad = 8 + ((i * 2.1) % 30);
      ctx.fillStyle = i % 4 === 0 ? '#ffd166' : '#ffffff';
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad * 0.78, 1.9, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
