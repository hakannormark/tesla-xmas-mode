import { AudioMixMode, AudioRouting, HolidayAudioEngine } from '../core/audioEngine';
import { ElonEventDirector } from '../core/elonEvents';
import { EnvironmentManager, EnvironmentState, GraphicsQuality, SkyMood } from '../core/environment';
import { ElonEventType, i18n, SceneId } from '../core/i18n';
import { DriveSource, TelemetryEngine, TelemetryFrame } from '../core/telemetry';

export interface HudCallbacks {
  onBackToMenu: () => void;
  onSwitchMode: (id: SceneId) => void;
  onQuickInteract: () => void;
}

const MODE_IDS: SceneId[] = ['express', 'caravan', 'flight3d', 'snowglobe'];
const ELON_TYPES: ElonEventType[] = ['starman', 'starlink', 'starship', 'supercharger', 'cyberplow'];

export class SceneHUD {
  private root: HTMLElement;
  private frostEl: HTMLElement;
  private topBar: HTMLElement;
  private toastEl: HTMLElement;
  private bottomActions: HTMLElement;
  private drawer: HTMLElement;
  private soundModal: HTMLElement;

  // Cached HUD readout elements for zero-allocation frame updates
  private modeNameEl!: HTMLElement;
  private plaidBadgeEl!: HTMLElement;
  private speedEl!: HTMLElement;
  private compassArrowEl!: HTMLElement;
  private npDistEl!: HTMLElement;
  private tempEl!: HTMLElement;
  private statusPillEl!: HTMLElement;
  private actionBtnEl!: HTMLButtonElement;

  // Drawer live elements
  private speedSlider!: HTMLInputElement;
  private speedReadout!: HTMLElement;
  private turnSlider!: HTMLInputElement;
  private tunnelCheckbox!: HTMLInputElement;
  private frostCheckbox!: HTMLInputElement;
  private volSlider!: HTMLInputElement;
  private diagTextEl!: HTMLElement;
  private modalDiagEl!: HTMLElement;

  private activeMode: SceneId = 'express';
  private drawerOpen = false;
  private soundModalOpen = false;
  private idleSeconds = 0;
  private toastTimer = 0;
  private visible = false;

  private telemetry: TelemetryEngine;
  private env: EnvironmentManager;
  private audio: HolidayAudioEngine;
  private elon: ElonEventDirector;
  private callbacks: HudCallbacks;

  constructor(
    container: HTMLElement,
    telemetry: TelemetryEngine,
    env: EnvironmentManager,
    audio: HolidayAudioEngine,
    elon: ElonEventDirector,
    callbacks: HudCallbacks
  ) {
    this.telemetry = telemetry;
    this.env = env;
    this.audio = audio;
    this.elon = elon;
    this.callbacks = callbacks;

    this.root = document.createElement('div');
    this.root.className = 'hud-root is-hidden';

    this.frostEl = document.createElement('div');
    this.frostEl.className = 'frost-vignette';
    this.root.appendChild(this.frostEl);

    this.topBar = document.createElement('div');
    this.topBar.className = 'hud-topbar';
    this.root.appendChild(this.topBar);

    this.toastEl = document.createElement('div');
    this.toastEl.className = 'elon-toast';
    this.root.appendChild(this.toastEl);

    this.bottomActions = document.createElement('div');
    this.bottomActions.className = 'hud-bottom-actions';
    this.root.appendChild(this.bottomActions);

    this.drawer = document.createElement('aside');
    this.drawer.className = 'settings-drawer';
    this.root.appendChild(this.drawer);

    this.soundModal = document.createElement('div');
    this.soundModal.className = 'sound-modal hidden';
    container.appendChild(this.root);
    container.appendChild(this.soundModal);

    this.renderMarkup();
    i18n.onChange(() => this.renderMarkup());

    this.elon.onEventStart((type) => {
      this.showToast(i18n.t().elonEvents[type].toast);
    });
  }

  private renderMarkup(): void {
    const t = i18n.t();
    const locale = i18n.getLocale();
    const curDrive = this.telemetry.getSource();
    const curMix = this.audio.getMixMode();
    const curRoute = this.audio.getRouting();
    const curSky = this.env.getSkyMood();
    const curQuality = this.env.getQuality();

    this.topBar.innerHTML = `
      <div class="hud-left">
        <button type="button" class="hud-btn" data-hud="back">${t.backToMenu}</button>
        <span class="hud-mode-title" data-hud="mode-name">${t.modes[this.activeMode].title}</span>
        <span class="plaid-badge hidden" data-hud="plaid-badge">${t.plaidBadge}</span>
      </div>
      <div class="hud-telemetry-pill">
        <span class="tele-speed"><strong data-hud="speed">0</strong> km/h</span>
        <span class="tele-sep">·</span>
        <span class="tele-np">
          <span class="np-arrow" data-hud="np-arrow">▲</span>
          <span data-hud="np-dist">3410 km</span>
        </span>
        <span class="tele-sep">·</span>
        <span data-hud="temp">-6°C</span>
        <span class="tele-status" data-hud="status">${t.demoActive}</span>
      </div>
    `;

    this.bottomActions.innerHTML = `
      <button type="button" class="hud-pill-action" data-hud="interact">${t.modes[this.activeMode].actionLabel}</button>
      <button type="button" class="hud-pill-action" data-hud="hohoho">${t.hoHoHoBtn}</button>
      <button type="button" class="hud-pill-action hud-gear-btn" data-hud="toggle-drawer">${t.controlsBtn}</button>
    `;

    this.drawer.innerHTML = `
      <div class="drawer-header">
        <h3>${t.drawerTitle}</h3>
        <button type="button" class="drawer-close" data-hud="close-drawer">✕</button>
      </div>
      <div class="drawer-scroll">
        <section class="drawer-section">
          <div class="drawer-label">${t.drawerSwitchMode}</div>
          <div class="mode-switch-grid">
            ${MODE_IDS.map(
              (id) =>
                `<button type="button" class="mini-mode-btn ${id === this.activeMode ? 'active' : ''}" data-switch-mode="${id}">${t.modes[id].title}</button>`
            ).join('')}
          </div>
        </section>

        <section class="drawer-section">
          <div class="drawer-label">${t.drawerDriveSection}</div>
          <div class="segmented full">
            <button type="button" class="${curDrive === 'gps' ? 'active' : ''}" data-drawer-drive="gps">${t.driveGps}</button>
            <button type="button" class="${curDrive === 'demo' ? 'active' : ''}" data-drawer-drive="demo">${t.driveDemo}</button>
            <button type="button" class="${curDrive === 'manual' ? 'active' : ''}" data-drawer-drive="manual">${t.driveManual}</button>
          </div>
          <div class="slider-row">
            <span>${t.drawerSpeedLabel}: <strong data-hud="slider-speed-val">${Math.round(this.telemetry.getManualSpeed())} km/h</strong></span>
            <input type="range" min="0" max="150" step="1" value="${Math.round(this.telemetry.getManualSpeed())}" data-hud="speed-slider" />
          </div>
          <div class="slider-row">
            <span>${t.drawerTurnLabel}: <em>${t.drawerTurnLeft} / ${t.drawerTurnCenter} / ${t.drawerTurnRight}</em></span>
            <input type="range" min="-1" max="1" step="0.05" value="${this.telemetry.getManualTurn()}" data-hud="turn-slider" />
          </div>
          <label class="toggle-row">
            <span>${t.drawerTunnelToggle}</span>
            <input type="checkbox" ${this.telemetry.getForceTunnel() ? 'checked' : ''} data-hud="tunnel-toggle" />
          </label>
        </section>

        <section class="drawer-section">
          <div class="drawer-label">${t.drawerElonSection}</div>
          <div class="elon-pills">
            ${ELON_TYPES.map(
              (et) => `<button type="button" class="chip-btn" data-elon="${et}">${t.elonEvents[et].label}</button>`
            ).join('')}
          </div>
        </section>

        <section class="drawer-section">
          <div class="drawer-label">${t.drawerAudioSection}</div>
          <div class="segmented full">
            <button type="button" class="${curMix === 'full' ? 'active' : ''}" data-drawer-mix="full">${t.audioFull}</button>
            <button type="button" class="${curMix === 'sfx' ? 'active' : ''}" data-drawer-mix="sfx">${t.audioSfx}</button>
            <button type="button" class="${curMix === 'muted' ? 'active' : ''}" data-drawer-mix="muted">${t.audioMuted}</button>
          </div>
          <div class="slider-row">
            <span>${t.drawerVolume}</span>
            <input type="range" min="0" max="1" step="0.02" value="${this.audio.getVolume()}" data-hud="vol-slider" />
          </div>
          <div class="drawer-sublabel">${t.drawerRouting}</div>
          <div class="segmented full">
            <button type="button" class="${curRoute === 'direct' ? 'active' : ''}" data-route="direct">${t.drawerRoutingDirect}</button>
            <button type="button" class="${curRoute === 'media' ? 'active' : ''}" data-route="media">${t.drawerRoutingMedia}</button>
          </div>
          <details class="sound-check-details">
            <summary>${t.drawerSoundCheckTitle}</summary>
            <p class="sound-hint">${t.drawerSoundCheckHint}</p>
            <div class="sound-test-stack">
              <button type="button" class="test-btn" data-test="direct">${t.soundCheckDirect}</button>
              <button type="button" class="test-btn" data-test="media">${t.soundCheckMedia}</button>
              <button type="button" class="test-btn" data-test="wav">${t.soundCheckWav}</button>
            </div>
            <div class="diag-box" data-hud="diag-box">Audio: uninitialized</div>
          </details>
        </section>

        <section class="drawer-section">
          <div class="drawer-label">${t.drawerEnvSection}</div>
          <div class="segmented full">
            <button type="button" class="${curSky === 'midnight' ? 'active' : ''}" data-sky="midnight">${t.skyMidnight}</button>
            <button type="button" class="${curSky === 'twilight' ? 'active' : ''}" data-sky="twilight">${t.skyTwilight}</button>
            <button type="button" class="${curSky === 'auto' ? 'active' : ''}" data-sky="auto">${t.skyAuto}</button>
          </div>
          <div class="drawer-sublabel" style="margin-top: 4px;">${t.qualityLabel}</div>
          <div class="segmented full">
            <button type="button" class="${curQuality === 'ultra' ? 'active' : ''}" data-quality="ultra">${t.qualityUltra}</button>
            <button type="button" class="${curQuality === 'eco' ? 'active' : ''}" data-quality="eco">${t.qualityEco}</button>
          </div>
          <label class="toggle-row">
            <span>${t.frostLabel}</span>
            <input type="checkbox" ${this.env.isFrostEnabled() ? 'checked' : ''} data-hud="frost-toggle" />
          </label>
          <div class="segmented full" style="margin-top: 8px;">
            <button type="button" class="${locale === 'sv' ? 'active' : ''}" data-hud-lang="sv">Svenska (SV)</button>
            <button type="button" class="${locale === 'en' ? 'active' : ''}" data-hud-lang="en">English (EN)</button>
          </div>
        </section>
      </div>
    `;

    // Standalone Sound Check modal (reachable from Menu before picking a mode)
    this.soundModal.innerHTML = `
      <div class="sound-modal-card">
        <div class="drawer-header">
          <h3>${t.soundCheckModalTitle}</h3>
          <button type="button" class="drawer-close" data-close-sound-modal>✕</button>
        </div>
        <p class="sound-hint">${t.drawerSoundCheckHint}</p>
        <div class="sound-test-stack">
          <button type="button" class="test-btn" data-test="direct">${t.soundCheckDirect}</button>
          <button type="button" class="test-btn" data-test="media">${t.soundCheckMedia}</button>
          <button type="button" class="test-btn" data-test="wav">${t.soundCheckWav}</button>
        </div>
        <div class="drawer-sublabel" style="margin-top: 12px;">${t.drawerRouting}</div>
        <div class="segmented full">
          <button type="button" class="${curRoute === 'direct' ? 'active' : ''}" data-route="direct">${t.drawerRoutingDirect}</button>
          <button type="button" class="${curRoute === 'media' ? 'active' : ''}" data-route="media">${t.drawerRoutingMedia}</button>
        </div>
        <div class="diag-box" data-hud="modal-diag">Audio: uninitialized</div>
      </div>
    `;

    // Cache DOM refs
    this.modeNameEl = this.topBar.querySelector('[data-hud="mode-name"]')!;
    this.plaidBadgeEl = this.topBar.querySelector('[data-hud="plaid-badge"]')!;
    this.speedEl = this.topBar.querySelector('[data-hud="speed"]')!;
    this.compassArrowEl = this.topBar.querySelector('[data-hud="np-arrow"]')!;
    this.npDistEl = this.topBar.querySelector('[data-hud="np-dist"]')!;
    this.tempEl = this.topBar.querySelector('[data-hud="temp"]')!;
    this.statusPillEl = this.topBar.querySelector('[data-hud="status"]')!;
    this.actionBtnEl = this.bottomActions.querySelector('[data-hud="interact"]')!;

    this.speedSlider = this.drawer.querySelector('[data-hud="speed-slider"]')!;
    this.speedReadout = this.drawer.querySelector('[data-hud="slider-speed-val"]')!;
    this.turnSlider = this.drawer.querySelector('[data-hud="turn-slider"]')!;
    this.tunnelCheckbox = this.drawer.querySelector('[data-hud="tunnel-toggle"]')!;
    this.frostCheckbox = this.drawer.querySelector('[data-hud="frost-toggle"]')!;
    this.volSlider = this.drawer.querySelector('[data-hud="vol-slider"]')!;
    this.diagTextEl = this.drawer.querySelector('[data-hud="diag-box"]')!;
    this.modalDiagEl = this.soundModal.querySelector('[data-hud="modal-diag"]')!;

    this.wireEvents();
  }

  private wireEvents(): void {
    this.topBar.querySelector('[data-hud="back"]')?.addEventListener('click', () => {
      this.setDrawerOpen(false);
      this.callbacks.onBackToMenu();
    });

    this.actionBtnEl.addEventListener('click', () => {
      this.audio.unlock();
      this.callbacks.onQuickInteract();
    });

    this.bottomActions.querySelector('[data-hud="hohoho"]')?.addEventListener('click', () => {
      this.audio.playHoHoHo();
    });

    this.bottomActions.querySelector('[data-hud="toggle-drawer"]')?.addEventListener('click', () => {
      this.audio.unlock();
      this.setDrawerOpen(!this.drawerOpen);
    });

    this.drawer.querySelector('[data-hud="close-drawer"]')?.addEventListener('click', () => {
      this.setDrawerOpen(false);
    });

    this.drawer.querySelectorAll<HTMLButtonElement>('[data-switch-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.callbacks.onSwitchMode(btn.dataset.switchMode as SceneId);
      });
    });

    this.drawer.querySelectorAll<HTMLButtonElement>('[data-drawer-drive]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const src = btn.dataset.drawerDrive as DriveSource;
        this.telemetry.setSource(src);
        this.syncDrawerButtons();
      });
    });

    this.speedSlider.addEventListener('input', () => {
      const val = Number(this.speedSlider.value);
      this.telemetry.setSource('manual');
      this.telemetry.setManualSpeed(val);
      this.speedReadout.textContent = `${val} km/h`;
      this.syncDrawerButtons();
    });

    this.turnSlider.addEventListener('input', () => {
      const val = Number(this.turnSlider.value);
      this.telemetry.setSource('manual');
      this.telemetry.setManualTurn(val);
      this.syncDrawerButtons();
    });

    this.tunnelCheckbox.addEventListener('change', () => {
      this.telemetry.setForceTunnel(this.tunnelCheckbox.checked);
    });

    this.drawer.querySelectorAll<HTMLButtonElement>('[data-elon]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.unlock();
        this.elon.trigger(btn.dataset.elon as ElonEventType);
      });
    });

    this.drawer.querySelectorAll<HTMLButtonElement>('[data-drawer-mix]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.audio.unlock();
        this.audio.setMixMode(btn.dataset.drawerMix as AudioMixMode);
        this.syncDrawerButtons();
      });
    });

    this.volSlider.addEventListener('input', () => {
      this.audio.unlock();
      this.audio.setVolume(Number(this.volSlider.value));
    });

    const wireSoundTests = (container: HTMLElement) => {
      container.querySelectorAll<HTMLButtonElement>('[data-route]').forEach((btn) => {
        btn.addEventListener('click', () => {
          this.audio.unlock();
          this.audio.setRouting(btn.dataset.route as AudioRouting);
          this.syncDrawerButtons();
        });
      });
      container.querySelector('[data-test="direct"]')?.addEventListener('click', () => this.audio.testDirect());
      container.querySelector('[data-test="media"]')?.addEventListener('click', () => this.audio.testMedia());
      container.querySelector('[data-test="wav"]')?.addEventListener('click', () => this.audio.testAudioFile());
    };

    wireSoundTests(this.drawer);
    wireSoundTests(this.soundModal);

    this.soundModal.querySelector('[data-close-sound-modal]')?.addEventListener('click', () => {
      this.setSoundModalOpen(false);
    });

    this.drawer.querySelectorAll<HTMLButtonElement>('[data-sky]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.env.setSkyMood(btn.dataset.sky as SkyMood);
        this.syncDrawerButtons();
      });
    });

    this.drawer.querySelectorAll<HTMLButtonElement>('[data-quality]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.env.setQuality(btn.dataset.quality as GraphicsQuality);
        this.syncDrawerButtons();
      });
    });

    this.frostCheckbox.addEventListener('change', () => {
      this.env.setFrostEnabled(this.frostCheckbox.checked);
    });

    this.drawer.querySelectorAll<HTMLButtonElement>('[data-hud-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        i18n.setLocale(btn.dataset.hudLang as 'sv' | 'en');
      });
    });
  }

  syncDrawerButtons(): void {
    const src = this.telemetry.getSource();
    const mix = this.audio.getMixMode();
    const route = this.audio.getRouting();
    const sky = this.env.getSkyMood();
    const quality = this.env.getQuality();

    this.drawer.querySelectorAll<HTMLButtonElement>('[data-switch-mode]').forEach((b) => {
      b.classList.toggle('active', b.dataset.switchMode === this.activeMode);
    });
    this.drawer.querySelectorAll<HTMLButtonElement>('[data-drawer-drive]').forEach((b) => {
      b.classList.toggle('active', b.dataset.drawerDrive === src);
    });
    this.drawer.querySelectorAll<HTMLButtonElement>('[data-drawer-mix]').forEach((b) => {
      b.classList.toggle('active', b.dataset.drawerMix === mix);
    });
    [this.drawer, this.soundModal].forEach((container) => {
      container.querySelectorAll<HTMLButtonElement>('[data-route]').forEach((b) => {
        b.classList.toggle('active', b.dataset.route === route);
      });
    });
    this.drawer.querySelectorAll<HTMLButtonElement>('[data-sky]').forEach((b) => {
      b.classList.toggle('active', b.dataset.sky === sky);
    });
    this.drawer.querySelectorAll<HTMLButtonElement>('[data-quality]').forEach((b) => {
      b.classList.toggle('active', b.dataset.quality === quality);
    });
    this.tunnelCheckbox.checked = this.telemetry.getForceTunnel();
    this.frostCheckbox.checked = this.env.isFrostEnabled();
  }

  setActiveMode(mode: SceneId): void {
    this.activeMode = mode;
    const t = i18n.t();
    this.modeNameEl.textContent = t.modes[mode].title;
    this.actionBtnEl.textContent = t.modes[mode].actionLabel;
    this.syncDrawerButtons();
  }

  show(): void {
    this.visible = true;
    this.idleSeconds = 0;
    this.root.classList.remove('is-hidden', 'is-dimmed');
  }

  hide(): void {
    this.visible = false;
    this.setDrawerOpen(false);
    this.root.classList.add('is-hidden');
  }

  setDrawerOpen(open: boolean): void {
    this.drawerOpen = open;
    this.drawer.classList.toggle('open', open);
    this.wake();
  }

  setSoundModalOpen(open: boolean): void {
    this.soundModalOpen = open;
    this.soundModal.classList.toggle('hidden', !open);
  }

  wake(): void {
    this.idleSeconds = 0;
    this.root.classList.remove('is-dimmed');
  }

  showToast(message: string): void {
    this.toastEl.textContent = `✦ ${message}`;
    this.toastEl.classList.add('visible');
    this.toastTimer = 4.5;
  }

  update(dt: number, telemetry: TelemetryFrame, env: EnvironmentState): void {
    // Update sound diagnostics if drawer or modal is open
    if (this.drawerOpen || this.soundModalOpen) {
      const diag = this.audio.getDiagnostics();
      const text = `Audio: ${diag.state} · ${diag.sampleRate || 48000} Hz · ${diag.routing} · ${diag.outputDb} dB`;
      this.diagTextEl.textContent = text;
      this.modalDiagEl.textContent = text;
    }

    if (!this.visible) return;

    const t = i18n.t();
    this.speedEl.textContent = String(Math.round(telemetry.speedKmh));
    this.compassArrowEl.style.transform = `rotate(${Math.round(telemetry.northPoleRelativeBearingDeg)}deg)`;
    this.npDistEl.textContent = `${Math.round(telemetry.northPoleDistanceKm)} km`;
    this.tempEl.textContent = `${env.temperatureC}°C`;
    this.plaidBadgeEl.classList.toggle('hidden', !telemetry.isPlaidSpeed);

    // Status pill text
    let statusText = t.demoActive;
    if (telemetry.inTunnel) statusText = t.tunnelActive;
    else if (telemetry.source === 'manual') statusText = t.manualActive;
    else if (telemetry.source === 'gps') {
      if (telemetry.gpsStatus === 'active') statusText = t.gpsActive;
      else if (telemetry.gpsStatus === 'searching') statusText = t.gpsWaiting;
      else statusText = t.gpsError;
    }
    this.statusPillEl.textContent = statusText;
    this.statusPillEl.classList.toggle('tunnel', telemetry.inTunnel);

    // Corner ice frost vignette
    this.frostEl.style.opacity = String(env.frostAmount * 0.85);

    // Auto-dim HUD gently after 5.5s of untouched driving
    if (!this.drawerOpen && !this.soundModalOpen) {
      this.idleSeconds += dt;
      if (this.idleSeconds > 5.5) {
        this.root.classList.add('is-dimmed');
      }
    } else {
      this.idleSeconds = 0;
    }

    // Toast fade timer
    if (this.toastTimer > 0) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) {
        this.toastEl.classList.remove('visible');
      }
    }
  }
}
