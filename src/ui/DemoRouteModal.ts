import {
  FAMOUS_DEMO_ROUTES,
  fetchOsrmRoute,
  geocodeAddress,
  type DemoRoutePreset,
  type LatLon,
} from '../core/demoRoutes';
import { i18n } from '../core/i18n';

export type SelectedDemoRoute =
  | { kind: 'bundled'; preset: DemoRoutePreset }
  | { kind: 'route'; name: string; countryCode: string | null; waypoints: LatLon[] };

const CLOSE_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

function latLonToTileF(lat: number, lon: number, z: number): { x: number; y: number } {
  const n = Math.pow(2, z);
  const clampedLat = Math.max(-85, Math.min(85, lat));
  const rad = (clampedLat * Math.PI) / 180;
  const x = ((lon + 180) / 360) * n;
  const y = ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n;
  return { x, y };
}

function tileFToLatLon(tx: number, ty: number, z: number): LatLon {
  const n = Math.pow(2, z);
  const lon = (tx / n) * 360 - 180;
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * ty) / n)));
  const lat = (latRad * 180) / Math.PI;
  return {
    lat: Math.max(-85, Math.min(85, lat)),
    lon: ((lon + 540) % 360) - 180,
  };
}

export class DemoRouteModal {
  private readonly backdrop: HTMLElement;
  private readonly modal: HTMLElement;
  private readonly statusEl: HTMLElement;
  private readonly addrFromEl: HTMLInputElement;
  private readonly addrToEl: HTMLInputElement;
  private readonly startAddrBtn: HTMLButtonElement;
  private readonly mapCanvas: HTMLCanvasElement;
  private readonly mapCtx: CanvasRenderingContext2D;
  private readonly mapStartBtn: HTMLButtonElement;
  private readonly mapHintEl: HTMLElement;

  private open = false;
  private busy = false;
  private activeTab: 'presets' | 'address' | 'map' = 'presets';

  // Interactive map state (Web Mercator slippy canvas)
  private mapCenter: LatLon = { lat: 59.35, lon: 18.06 };
  private mapZoom = 11;
  private pointA: LatLon | null = null;
  private pointB: LatLon | null = null;
  private readonly tileCache = new Map<string, HTMLImageElement | 'loading' | 'err'>();
  private dragState: { x: number; y: number; startX: number; startY: number; moved: boolean } | null = null;

  constructor(
    private readonly root: HTMLElement,
    private readonly onStartRoute: (route: SelectedDemoRoute) => void
  ) {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'demo-modal-backdrop';
    this.backdrop.hidden = true;

    this.modal = document.createElement('section');
    this.modal.className = 'demo-route-modal';
    this.modal.hidden = true;
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');

    this.modal.innerHTML = `
      <div class="demo-modal-head">
        <h3 data-dm="title">Demorutt A till B</h3>
        <button type="button" class="drawer-close" data-dm="close" aria-label="Stäng">${CLOSE_SVG}</button>
      </div>
      <div class="demo-modal-tabs" role="tablist">
        <button type="button" class="demo-tab active" role="tab" data-dm-tab="presets">Kända rutter</button>
        <button type="button" class="demo-tab" role="tab" data-dm-tab="address">Adresser (A → B)</button>
        <button type="button" class="demo-tab" role="tab" data-dm-tab="map">Välj på karta</button>
      </div>
      <div class="demo-modal-status" data-dm="status" hidden></div>

      <div class="demo-modal-body">
        <div class="demo-panel" data-dm-panel="presets">
          <div class="demo-preset-grid" data-dm="preset-grid"></div>
        </div>

        <div class="demo-panel" data-dm-panel="address" hidden>
          <p class="demo-panel-hint" data-dm="addr-hint"></p>
          <label class="demo-field">
            <span data-dm="lbl-from">Startadress (A)</span>
            <input type="text" data-dm="addr-from" placeholder="t.ex. Strandvägen 1, Stockholm" />
          </label>
          <label class="demo-field">
            <span data-dm="lbl-to">Måladress (B)</span>
            <input type="text" data-dm="addr-to" placeholder="t.ex. Kungsgatan 10, Stockholm" />
          </label>
          <button type="button" class="demo-primary-btn" data-dm="start-addr">Starta rutt A → B</button>
        </div>

        <div class="demo-panel" data-dm-panel="map" hidden>
          <div class="demo-map-toolbar">
            <div class="demo-map-jumps">
              <button type="button" class="demo-mini-btn" data-dm-jump="59.35,18.06,11">SE</button>
              <button type="button" class="demo-mini-btn" data-dm-jump="48.86,2.31,12">EU</button>
              <button type="button" class="demo-mini-btn" data-dm-jump="37.81,-122.47,12">US</button>
              <button type="button" class="demo-mini-btn" data-dm-jump="35.66,139.70,13">JP</button>
            </div>
            <div class="demo-map-zooms">
              <button type="button" class="demo-mini-btn" data-dm="zoom-out">−</button>
              <button type="button" class="demo-mini-btn" data-dm="zoom-in">+</button>
              <button type="button" class="demo-mini-btn" data-dm="map-clear">Rensa</button>
            </div>
          </div>
          <div class="demo-map-wrap">
            <canvas class="demo-map-canvas" data-dm="map-canvas" width="520" height="270"></canvas>
          </div>
          <div class="demo-map-foot">
            <span class="demo-map-hint" data-dm="map-hint"></span>
            <button type="button" class="demo-primary-btn" data-dm="start-map" disabled>Starta rutt</button>
          </div>
        </div>
      </div>
    `;

    this.root.append(this.backdrop, this.modal);

    const q = <T extends HTMLElement = HTMLElement>(sel: string) => this.modal.querySelector<T>(sel)!;
    this.statusEl = q('[data-dm="status"]');
    this.addrFromEl = q('[data-dm="addr-from"]');
    this.addrToEl = q('[data-dm="addr-to"]');
    this.startAddrBtn = q('[data-dm="start-addr"]');
    this.mapCanvas = q('[data-dm="map-canvas"]');
    this.mapCtx = this.mapCanvas.getContext('2d')!;
    this.mapStartBtn = q('[data-dm="start-map"]');
    this.mapHintEl = q('[data-dm="map-hint"]');

    for (const el of [this.backdrop, this.modal]) {
      el.addEventListener('pointerdown', e => e.stopPropagation());
    }

    this.backdrop.onclick = () => {
      if (!this.busy) this.setOpen(false);
    };
    q('[data-dm="close"]').onclick = () => {
      if (!this.busy) this.setOpen(false);
    };

    this.modal.querySelectorAll<HTMLButtonElement>('[data-dm-tab]').forEach(btn => {
      btn.onclick = () => {
        const tab = btn.dataset.dmTab as 'presets' | 'address' | 'map';
        this.setTab(tab);
      };
    });

    this.modal.querySelectorAll<HTMLButtonElement>('[data-dm-jump]').forEach(btn => {
      btn.onclick = () => {
        const [lat, lon, z] = (btn.dataset.dmJump ?? '').split(',').map(Number);
        if (Number.isFinite(lat) && Number.isFinite(lon) && Number.isFinite(z)) {
          this.mapCenter = { lat, lon };
          this.mapZoom = z;
          this.drawMap();
        }
      };
    });

    q('[data-dm="zoom-in"]').onclick = () => {
      this.mapZoom = Math.min(17, this.mapZoom + 1);
      this.drawMap();
    };
    q('[data-dm="zoom-out"]').onclick = () => {
      this.mapZoom = Math.max(3, this.mapZoom - 1);
      this.drawMap();
    };
    q('[data-dm="map-clear"]').onclick = () => {
      this.pointA = null;
      this.pointB = null;
      this.updateMapHint();
      this.drawMap();
    };

    this.startAddrBtn.onclick = () => void this.handleStartAddressRoute();
    this.mapStartBtn.onclick = () => void this.handleStartMapRoute();

    this.bindMapInteractions();
    this.applyLocale();
    i18n.onChange(() => this.applyLocale());
  }

  private bindMapInteractions(): void {
    this.mapCanvas.addEventListener('pointerdown', e => {
      this.dragState = {
        x: e.clientX,
        y: e.clientY,
        startX: e.clientX,
        startY: e.clientY,
        moved: false,
      };
      this.mapCanvas.setPointerCapture(e.pointerId);
    });

    this.mapCanvas.addEventListener('pointermove', e => {
      if (!this.dragState) return;
      const dx = e.clientX - this.dragState.x;
      const dy = e.clientY - this.dragState.y;
      if (Math.hypot(e.clientX - this.dragState.startX, e.clientY - this.dragState.startY) > 6) {
        this.dragState.moved = true;
      }
      this.dragState.x = e.clientX;
      this.dragState.y = e.clientY;
      if (this.dragState.moved) {
        const scaleX = this.mapCanvas.width / Math.max(1, this.mapCanvas.clientWidth);
        const scaleY = this.mapCanvas.height / Math.max(1, this.mapCanvas.clientHeight);
        const cf = latLonToTileF(this.mapCenter.lat, this.mapCenter.lon, this.mapZoom);
        cf.x -= (dx * scaleX) / 256;
        cf.y -= (dy * scaleY) / 256;
        this.mapCenter = tileFToLatLon(cf.x, cf.y, this.mapZoom);
        this.drawMap();
      }
    });

    this.mapCanvas.addEventListener('pointerup', e => {
      const ds = this.dragState;
      this.dragState = null;
      if (this.mapCanvas.hasPointerCapture(e.pointerId)) {
        this.mapCanvas.releasePointerCapture(e.pointerId);
      }
      if (!ds || ds.moved) return;

      const rect = this.mapCanvas.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / Math.max(1, rect.width)) * this.mapCanvas.width;
      const py = ((e.clientY - rect.top) / Math.max(1, rect.height)) * this.mapCanvas.height;
      const cf = latLonToTileF(this.mapCenter.lat, this.mapCenter.lon, this.mapZoom);
      const clickTx = cf.x + (px - this.mapCanvas.width * 0.5) / 256;
      const clickTy = cf.y + (py - this.mapCanvas.height * 0.5) / 256;
      const picked = tileFToLatLon(clickTx, clickTy, this.mapZoom);

      if (!this.pointA || (this.pointA && this.pointB)) {
        this.pointA = picked;
        this.pointB = null;
      } else {
        this.pointB = picked;
      }
      this.updateMapHint();
      this.drawMap();
    });

    this.mapCanvas.addEventListener(
      'wheel',
      e => {
        e.preventDefault();
        this.mapZoom = Math.max(3, Math.min(17, this.mapZoom + (e.deltaY < 0 ? 1 : -1)));
        this.drawMap();
      },
      { passive: false }
    );
  }

  isOpen(): boolean {
    return this.open;
  }

  setOpen(open: boolean): void {
    this.open = open;
    this.backdrop.hidden = !open;
    this.modal.hidden = !open;
    if (open) {
      this.setStatus('');
      this.applyLocale();
      if (this.activeTab === 'map') this.drawMap();
    }
  }

  private setTab(tab: 'presets' | 'address' | 'map'): void {
    this.activeTab = tab;
    this.modal.querySelectorAll<HTMLButtonElement>('[data-dm-tab]').forEach(b => {
      const active = b.dataset.dmTab === tab;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    this.modal.querySelectorAll<HTMLElement>('[data-dm-panel]').forEach(p => {
      p.hidden = p.dataset.dmPanel !== tab;
    });
    this.setStatus('');
    if (tab === 'map') this.drawMap();
  }

  private setStatus(msg: string, isError = false): void {
    this.statusEl.hidden = !msg;
    this.statusEl.textContent = msg;
    this.statusEl.classList.toggle('is-error', isError);
  }

  private renderPresets(): void {
    const isEn = i18n.getLocale() === 'en';
    const grid = this.modal.querySelector<HTMLElement>('[data-dm="preset-grid"]')!;
    grid.innerHTML = FAMOUS_DEMO_ROUTES.map(
      r => `
      <button type="button" class="demo-preset-card" data-preset-id="${r.id}">
        <span class="demo-preset-flag" aria-hidden="true">${r.flag}</span>
        <span class="demo-preset-copy">
          <strong>${isEn ? r.nameEn : r.nameSv}</strong>
          <span>${isEn ? r.subtitleEn : r.subtitleSv}</span>
        </span>
      </button>`
    ).join('');

    grid.querySelectorAll<HTMLButtonElement>('[data-preset-id]').forEach(btn => {
      btn.onclick = () => {
        const preset = FAMOUS_DEMO_ROUTES.find(p => p.id === btn.dataset.presetId);
        if (preset) void this.launchPreset(preset);
      };
    });
  }

  private async launchPreset(preset: DemoRoutePreset): Promise<void> {
    if (this.busy) return;
    if (preset.bundled) {
      this.setOpen(false);
      this.onStartRoute({ kind: 'bundled', preset });
      return;
    }

    const d = i18n.t().drive;
    this.busy = true;
    this.setStatus(`${d.demoRouteLoading} (${i18n.getLocale() === 'en' ? preset.nameEn : preset.nameSv})…`);
    try {
      const waypoints = await fetchOsrmRoute(preset.start, preset.end);
      this.setOpen(false);
      this.onStartRoute({
        kind: 'route',
        name: `${preset.flag} ${i18n.getLocale() === 'en' ? preset.nameEn : preset.nameSv}`,
        countryCode: preset.countryCode,
        waypoints,
      });
    } finally {
      this.busy = false;
      this.setStatus('');
    }
  }

  private async handleStartAddressRoute(): Promise<void> {
    if (this.busy) return;
    const d = i18n.t().drive;
    const qFrom = this.addrFromEl.value.trim();
    const qTo = this.addrToEl.value.trim();
    if (!qFrom || !qTo) {
      this.setStatus(d.demoRouteNeedBothAddr, true);
      return;
    }

    this.busy = true;
    this.startAddrBtn.disabled = true;
    this.setStatus(`${d.demoRouteGeocoding}…`);
    try {
      const [from, to] = await Promise.all([geocodeAddress(qFrom), geocodeAddress(qTo)]);
      if (!from || !to) {
        this.setStatus(d.demoRouteNotFound, true);
        return;
      }
      this.setStatus(`${d.demoRouteLoading} (${from.label} → ${to.label})…`);
      const waypoints = await fetchOsrmRoute(from, to);
      this.setOpen(false);
      this.onStartRoute({
        kind: 'route',
        name: `${from.label} → ${to.label}`,
        countryCode: from.countryCode,
        waypoints,
      });
    } finally {
      this.busy = false;
      this.startAddrBtn.disabled = false;
    }
  }

  private async handleStartMapRoute(): Promise<void> {
    if (this.busy || !this.pointA || !this.pointB) return;
    const d = i18n.t().drive;
    this.busy = true;
    this.mapStartBtn.disabled = true;
    this.setStatus(`${d.demoRouteLoading}…`);
    try {
      const waypoints = await fetchOsrmRoute(this.pointA, this.pointB);
      this.setOpen(false);
      this.onStartRoute({
        kind: 'route',
        name: d.demoRouteCustomMapName,
        countryCode: null,
        waypoints,
      });
    } finally {
      this.busy = false;
      this.updateMapHint();
    }
  }

  private updateMapHint(): void {
    const d = i18n.t().drive;
    if (!this.pointA) {
      this.mapHintEl.textContent = d.demoMapPickA;
      this.mapStartBtn.disabled = true;
    } else if (!this.pointB) {
      this.mapHintEl.textContent = d.demoMapPickB;
      this.mapStartBtn.disabled = true;
    } else {
      this.mapHintEl.textContent = `${this.pointA.lat.toFixed(3)}, ${this.pointA.lon.toFixed(3)} → ${this.pointB.lat.toFixed(3)}, ${this.pointB.lon.toFixed(3)}`;
      this.mapStartBtn.disabled = false;
    }
  }

  private drawMap(): void {
    const ctx = this.mapCtx;
    const w = this.mapCanvas.width;
    const h = this.mapCanvas.height;
    const z = this.mapZoom;
    const maxTile = Math.pow(2, z);

    ctx.fillStyle = '#0b1830';
    ctx.fillRect(0, 0, w, h);

    const cf = latLonToTileF(this.mapCenter.lat, this.mapCenter.lon, z);
    const minTx = Math.floor(cf.x - w / 512);
    const maxTx = Math.floor(cf.x + w / 512);
    const minTy = Math.max(0, Math.floor(cf.y - h / 512));
    const maxTy = Math.min(maxTile - 1, Math.floor(cf.y + h / 512));

    for (let tx = minTx; tx <= maxTx; tx++) {
      for (let ty = minTy; ty <= maxTy; ty++) {
        const wrappedX = ((tx % maxTile) + maxTile) % maxTile;
        const key = `${z}/${wrappedX}/${ty}`;
        const drawX = w * 0.5 + (tx - cf.x) * 256;
        const drawY = h * 0.5 + (ty - cf.y) * 256;

        const cached = this.tileCache.get(key);
        if (cached instanceof HTMLImageElement) {
          ctx.drawImage(cached, drawX, drawY, 256, 256);
        } else {
          ctx.fillStyle = '#122645';
          ctx.fillRect(drawX, drawY, 255, 255);
          if (!cached) {
            this.tileCache.set(key, 'loading');
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              this.tileCache.set(key, img);
              if (this.open && this.activeTab === 'map') this.drawMap();
            };
            img.onerror = () => {
              this.tileCache.set(key, 'err');
            };
            img.src = `https://tile.openstreetmap.org/${key}.png`;
          }
        }
      }
    }

    const toPx = (pt: LatLon) => {
      const f = latLonToTileF(pt.lat, pt.lon, z);
      return {
        x: w * 0.5 + (f.x - cf.x) * 256,
        y: h * 0.5 + (f.y - cf.y) * 256,
      };
    };

    if (this.pointA && this.pointB) {
      const pA = toPx(this.pointA);
      const pB = toPx(this.pointB);
      ctx.save();
      ctx.strokeStyle = '#ffd166';
      ctx.lineWidth = 3.5;
      ctx.setLineDash([7, 5]);
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
      ctx.restore();
    }

    const drawPin = (pt: LatLon, label: string, color: string) => {
      const p = toPx(pt);
      ctx.save();
      ctx.fillStyle = color;
      ctx.strokeStyle = '#071022';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#071022';
      ctx.font = '700 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, p.x, p.y + 0.5);
      ctx.restore();
    };

    if (this.pointA) drawPin(this.pointA, 'A', '#4ff5b4');
    if (this.pointB) drawPin(this.pointB, 'B', '#ff647c');
  }

  private applyLocale(): void {
    const t = i18n.t();
    const d = t.drive;
    const setText = (sel: string, txt: string) => {
      const el = this.modal.querySelector<HTMLElement>(sel);
      if (el) el.textContent = txt;
    };

    this.modal.setAttribute('aria-label', d.demoModalTitle);
    setText('[data-dm="title"]', d.demoModalTitle);
    this.modal.querySelector<HTMLElement>('[data-dm="close"]')?.setAttribute('aria-label', t.closeDrawer);
    setText('[data-dm-tab="presets"]', d.demoTabPresets);
    setText('[data-dm-tab="address"]', d.demoTabAddress);
    setText('[data-dm-tab="map"]', d.demoTabMap);
    setText('[data-dm="addr-hint"]', d.demoAddrHint);
    setText('[data-dm="lbl-from"]', d.demoAddrFromLabel);
    setText('[data-dm="lbl-to"]', d.demoAddrToLabel);
    this.addrFromEl.placeholder = d.demoAddrFromPlaceholder;
    this.addrToEl.placeholder = d.demoAddrToPlaceholder;
    setText('[data-dm="start-addr"]', d.demoStartRouteBtn);
    setText('[data-dm="map-clear"]', d.demoMapClearBtn);
    setText('[data-dm="start-map"]', d.demoStartRouteBtn);

    this.renderPresets();
    this.updateMapHint();
  }
}
