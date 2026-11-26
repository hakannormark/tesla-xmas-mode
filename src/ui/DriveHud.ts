import type { AudioMixMode, AudioRouting } from '../core/audioEngine';
import type {
  CalendarPreviewMode,
  EnvironmentState,
  GraphicsQuality,
  HolidayThemeId,
  SkyMood,
} from '../core/environment';
import type { ElonEventType } from '../core/i18n';
import type { TelemetryFrame } from '../core/telemetry';
import type {
  DriveFestivities,
  MagicPowerId,
  MagicUnlockId,
} from '../three/DriveFestivities';
import { MAGIC_POWERS, MAGIC_UNLOCKS } from '../three/DriveFestivities';
import {
  SKY_CINEMA_MODES,
  SKY_CINEMA_SURFACES,
  type SkyCinemaMode,
  type SkyCinemaSurface,
} from '../three/SkyCinema';

export type CameraMode = 'chase' | 'map' | 'cinematic';
export type VehicleKind = 'sleigh' | 'semi' | 'cybertruck' | 'starman';

export interface DriveHudCallbacks {
  onSelectVehicle(vehicle: VehicleKind): void;
  onSelectCamera(mode: CameraMode): void;
  onCycleCamera(): void;
  onFollow(): void;
  onRetryGps(): void;
  onStartTrial(): void;
  onToggleTrialPause(): void;
  onExitTrial(): void;
  onToggleDemo(): void;
  onDemoSpeedChange(kmh: number): void;
  onExitDemo(): void;
  onToggleFsdPath(): boolean;
  onToggleTraffic(): boolean;
  onToggleLiveElevation(): boolean;
  getFsdOptions(): { fsdPath: boolean; traffic: boolean; elevation: boolean };
}

const CAMERA_LABELS: Record<CameraMode, string> = {
  chase: '✦ FSD Vy',
  map: '🗺 Kartvy',
  cinematic: '🎬 Filmisk',
};

export class DriveHud {
  readonly worldEl: HTMLElement;
  private readonly drawerEl: HTMLElement;
  private readonly drawerBackdropEl: HTMLElement;
  private readonly magicPopoverEl: HTMLElement;
  private readonly magicBackdropEl: HTMLElement;
  private readonly magicToggleBtn: HTMLButtonElement;
  private readonly magicPopoverPointsEl: HTMLElement;
  private readonly magicPopoverComboEl: HTMLElement;
  private readonly magicActiveStripEl: HTMLElement;
  private readonly placeEl: HTMLElement;
  private readonly streetEl: HTMLElement;
  private readonly junctionEl: HTMLElement;
  private readonly gpsBtn: HTMLButtonElement;
  private readonly cameraBtn: HTMLButtonElement;
  private readonly followBtn: HTMLButtonElement;
  private readonly cinemaBtn: HTMLButtonElement;
  private readonly cinemaBarEl: HTMLElement;
  private readonly cinemaModeRowEl: HTMLElement;
  private readonly cinemaTitleEl: HTMLElement;
  private readonly cinemaCountEl: HTMLElement;
  private readonly cinemaUnmuteBtn: HTMLButtonElement;
  private readonly soundQuickBtn: HTMLButtonElement;
  private readonly speedEl: HTMLElement;
  private readonly maxspeedEl: HTMLElement;
  private readonly fsdBadgeEl: HTMLElement;
  private readonly northEl: HTMLElement;
  private readonly northArrowEl: HTMLElement;
  private readonly northDistEl: HTMLElement;
  private readonly giftPillEl: HTMLElement;
  private readonly statusEl: HTMLOutputElement;
  private readonly liveLaunchEl: HTMLElement;
  private readonly hohoBannerEl: HTMLElement;

  readonly trialPanelEl: HTMLElement;
  readonly trialPauseBtn: HTMLButtonElement;
  readonly trialElevationEl: HTMLElement;

  readonly demoPanelEl: HTMLElement;
  readonly demoSpeedSlider: HTMLInputElement;
  readonly demoSpeedValEl: HTMLElement;

  private festivities!: DriveFestivities;
  private telemetry!: { setForceTunnel(v: boolean): void; getForceTunnel(): boolean };
  private callbacks!: DriveHudCallbacks;
  private drawerOpen = false;
  private magicOpen = false;
  private micState: 'off' | 'active' | 'denied' = 'off';

  constructor(private readonly root: HTMLElement) {
    this.root.innerHTML = `
      <main class="drive-world" aria-label="Interaktiv julvärld"></main>

      <header class="drive-header">
        <div class="drive-actions">
          <button type="button" class="glass-pill cinema-pill" data-cinema-toggle aria-pressed="false" title="Rymdbio i himlen (V)">🎬 Rymdbio</button>
          <button type="button" class="glass-pill" data-camera-btn title="Växla kamera (C)">✦ FSD Vy</button>
          <button type="button" class="glass-pill follow-recenter-pill" data-follow hidden>◎ Följ släden</button>
          <button type="button" class="glass-pill" data-sound-quick aria-pressed="false" title="Ljud på/av">🔇</button>
          <button type="button" class="glass-pill" data-drawer-toggle aria-expanded="false" aria-label="Inställningar">⚙</button>
        </div>
      </header>

      <aside class="cinema-bar" data-cinema-bar hidden aria-live="polite">
        <div class="cinema-bar-top">
          <span class="cinema-bar-title" data-cinema-title></span>
          <div class="cinema-bar-actions">
            <span class="cinema-bar-count" data-cinema-count></span>
            <button type="button" class="cinema-bar-btn cinema-bar-unmute" data-cinema-unmute hidden>🔊 Ljud</button>
            <button type="button" class="cinema-bar-btn" data-cinema-next title="Nästa klipp">⏭ Nästa</button>
            <button type="button" class="cinema-bar-btn" data-cinema-stop aria-label="Stäng Rymdbio">✕</button>
          </div>
        </div>
        <div class="cinema-surface-row" role="group" aria-label="Visningsyta">
          ${SKY_CINEMA_SURFACES.map(
            s => `<button type="button" class="cinema-mode-btn cinema-surface-btn" data-cinema-surface="${s.id}">${s.shortLabel}</button>`
          ).join('')}
        </div>
        <div class="cinema-mode-row" data-cinema-mode-row role="group" aria-label="Rymdbio-läge">
          ${SKY_CINEMA_MODES.map(
            m => `<button type="button" class="cinema-mode-btn" data-cinema-mode="${m.id}" title="${m.description}">${m.shortLabel}</button>`
          ).join('')}
        </div>
      </aside>

      <aside class="street-board" aria-live="polite">
        <span class="street-meta" data-place></span>
        <strong data-street>Väntar på GPS</strong>
        <span class="street-junction" data-junction hidden></span>
        <button data-gps type="button" hidden>Försök igen GPS</button>
      </aside>

      <aside class="drive-timeline" data-timeline-card hidden>
        <div class="timeline-kicker">Elon-tidslinje <span data-timeline-step></span></div>
        <strong data-timeline-title></strong>
        <span data-timeline-text></span>
        <button data-timeline-next type="button">Nästa ⏭</button>
      </aside>

      <aside class="terrain-trial" data-trial-panel hidden>
        <strong>Höjdtest · Badhausstraße</strong>
        <span data-trial-elevation></span>
        <div class="trial-btns">
          <button data-trial-pause type="button">Pausa</button>
          <button data-trial-exit type="button">Till GPS</button>
        </div>
        <a href="https://earth.jaxa.jp/en/data/policy/" target="_blank" rel="noopener">Höjddata © JAXA · AW3D30</a>
      </aside>

      <aside class="demo-pill" data-demo-panel hidden>
        <div class="demo-pill-head">
          <strong>Demorutt · Lokevägen</strong>
          <button type="button" data-demo-exit>Till GPS</button>
        </div>
        <label class="demo-speed-row">
          <span>Fart: <b data-demo-speed-val>34 km/h</b></span>
          <input type="range" min="0" max="115" step="1" value="34" data-demo-speed />
        </label>
      </aside>

      <footer class="drive-footer">
        <div class="drive-instruments">
          <div class="speed-row">
            <span class="fsd-wheel-badge" data-fsd-badge aria-hidden="true" title="FSD Reality View">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M4.2 10.2h15.6M12 12v8.8M9 12l-3.8 6.4M15 12l3.8 6.4"/>
              </svg>
            </span>
            <strong data-speed>0</strong>
            <span class="speed-unit">km/h</span>
            <span class="speed-limit-sign" data-maxspeed hidden>50</span>
          </div>
          <div class="meta-row">
            <span class="pole-distance" data-north hidden><b data-north-arrow aria-hidden="true">↑</b> Nordpolen <span data-distance></span></span>
            <span class="gift-pill" data-gift-pill hidden></span>
          </div>
        </div>

        <div class="drive-action-dock">
          <div class="dock-float-stack">
            <output class="festive-toast" data-festive-status aria-live="polite"></output>
            <div class="magic-active-strip" data-magic-active-strip hidden></div>
          </div>
          <button type="button" class="dock-btn dock-primary" data-gift>🎁 Julklapp</button>
          <button type="button" class="dock-btn" data-snowball>❄ Snöboll</button>
          <button type="button" class="dock-btn" data-salute>🎺 Tut</button>
          <button type="button" class="dock-btn" data-hohoho>🎅 Ho-Ho</button>
          <button type="button" class="dock-btn" data-light-wave>✨ Ljus</button>
          <button type="button" class="dock-btn dock-magic" data-magic-toggle aria-expanded="false" aria-haspopup="dialog">✨ MAGI · 0</button>
        </div>
      </footer>
      <div class="hoho-banner" data-hoho-banner hidden>🎅 HO! HO! HO! · GOD JUL! ✨</div>

      <div class="magic-backdrop" data-magic-backdrop hidden></div>
      <section class="magic-popover" data-magic-popover hidden role="dialog" aria-label="Julmagi">
        <div class="magic-popover-head">
          <div class="magic-popover-title">
            <strong>✨ Julmagi</strong>
            <span class="magic-points-pill" data-magic-popover-points>0 p</span>
            <span class="magic-combo-pill" data-magic-popover-combo hidden>x2</span>
          </div>
          <button type="button" class="magic-close" data-magic-close aria-label="Stäng Julmagi">✕</button>
        </div>
        <div class="magic-tabs" role="tablist">
          <button type="button" class="magic-tab active" role="tab" aria-selected="true" data-magic-tab="powers">⚡ Fyra av nu</button>
          <button type="button" class="magic-tab" role="tab" aria-selected="false" data-magic-tab="workshop">🎁 Verkstad</button>
        </div>
        <div class="magic-tab-body" data-magic-panel="powers">
          ${MAGIC_POWERS.map(
            p => `
            <button type="button" class="magic-card" data-magic-power="${p.id}">
              <span class="magic-card-icon" aria-hidden="true">${p.icon}</span>
              <span class="magic-card-copy">
                <span class="magic-card-title">${p.label}</span>
                <span class="magic-card-desc">${p.description}</span>
              </span>
              <span class="magic-card-badge" data-power-badge="${p.id}">${p.cost} p</span>
              <span class="magic-card-progress" data-power-progress="${p.id}"></span>
            </button>`
          ).join('')}
        </div>
        <div class="magic-tab-body" data-magic-panel="workshop" hidden>
          ${MAGIC_UNLOCKS.map(
            u => `
            <button type="button" class="magic-card" data-magic-unlock="${u.id}">
              <span class="magic-card-icon" aria-hidden="true">${u.icon}</span>
              <span class="magic-card-copy">
                <span class="magic-card-title">${u.label}</span>
                <span class="magic-card-desc">${u.description}</span>
              </span>
              <span class="magic-card-badge" data-unlock-badge="${u.id}">${u.cost} p</span>
            </button>`
          ).join('')}
        </div>
        <div class="magic-popover-foot">Tjäna Julmagi: ⭐ +25 · 🦌 +20 · 🧝 +15 · 🎁 +10 (Combo upp till x4)</div>
      </section>

      <div class="drawer-backdrop" data-drawer-backdrop hidden></div>
      <aside class="drive-drawer" data-drawer hidden aria-label="Kontrollpanel">
        <div class="drawer-head">
          <h2><span>✦</span> Vintervärlden</h2>
          <button type="button" class="drawer-close" data-drawer-close aria-label="Stäng">✕</button>
        </div>
        <div class="drawer-scroll">
          <section class="drawer-section">
            <div class="drawer-label">Fordon</div>
            <div class="segmented cols-2">
              <button type="button" class="active" data-vehicle="sleigh">🎅 Släde</button>
              <button type="button" data-vehicle="semi">🚛 Semi</button>
              <button type="button" data-vehicle="cybertruck">📐 Cybertruck</button>
              <button type="button" data-vehicle="starman">🚀 Starman</button>
            </div>
          </section>

          <section class="drawer-section">
            <div class="drawer-label">Kamera</div>
            <div class="segmented cols-3">
              <button type="button" class="active" data-cam="chase">✦ FSD Vy</button>
              <button type="button" data-cam="map">Kartvy</button>
              <button type="button" data-cam="cinematic">Filmisk</button>
            </div>
          </section>

          <section class="drawer-section">
            <div class="drawer-label">Grafik & Stämning</div>
            <div class="segmented cols-2">
              <button type="button" data-quality="ultra">✨ Pixar Ultra</button>
              <button type="button" data-quality="eco">Eco (MCU2)</button>
            </div>
            <div class="segmented cols-3">
              <button type="button" data-theme="classic">Klassisk</button>
              <button type="button" data-theme="nordic">Nordisk</button>
              <button type="button" data-theme="cyber2099">Cyber 2099</button>
            </div>
            <div class="segmented cols-4">
              <button type="button" data-sky="auto">Auto</button>
              <button type="button" data-sky="midnight">Midnatt</button>
              <button type="button" data-sky="twilight">Blå</button>
              <button type="button" data-sky="daylight">Dag</button>
            </div>
            <label class="select-row">
              <span>Julkalender</span>
              <select data-calendar aria-label="Julkalender">
                <option value="auto">Automatisk (Riktigt datum)</option>
                <option value="advent1">1:a Advent</option>
                <option value="advent2">2:a Advent</option>
                <option value="advent3">3:e Advent</option>
                <option value="advent4">4:e Advent</option>
                <option value="lucia">13 dec · Lucia</option>
                <option value="xmas_eve">24 dec · Julafton</option>
              </select>
            </label>
            <div class="drawer-row-2">
              <button type="button" class="toggle-chip" data-fsd-path aria-pressed="true">❄ FSD Julbana</button>
              <button type="button" class="toggle-chip" data-traffic aria-pressed="true">🚛 Jul- & Teslatrafik</button>
            </div>
            <div class="drawer-row-2">
              <button type="button" class="toggle-chip" data-frost aria-pressed="true">🌨 Frost på skärmen</button>
              <button type="button" class="toggle-chip" data-live-elevation aria-pressed="true">⛰ Riktig höjddata</button>
            </div>
          </section>

          <section class="drawer-section">
            <div class="drawer-label">Ljud & Bilstereo</div>
            <div class="segmented cols-3">
              <button type="button" data-mix="full">Full</button>
              <button type="button" data-mix="sfx">Effekter</button>
              <button type="button" data-mix="muted">Tyst</button>
            </div>
            <label class="slider-row">
              <span>Volym <b data-vol-val></b></span>
              <input type="range" min="0" max="1" step="0.02" data-vol-slider />
            </label>
            <div class="segmented cols-2">
              <button type="button" data-routing="direct">Direkt</button>
              <button type="button" data-routing="media">Media Player</button>
            </div>
            <div class="drawer-row-2">
              <button type="button" class="toggle-chip" data-mic aria-pressed="false">🎙 Kupémikrofon</button>
              <button type="button" class="toggle-chip" data-sound-test>🔊 Ljudtest</button>
            </div>
          </section>

          <section class="drawer-section">
            <div class="drawer-label">Julmagi & Händelser</div>
            <div class="live-launch-chip" data-live-launch hidden></div>
            <div class="chip-grid">
              <button type="button" data-event="starlink">Starlink</button>
              <button type="button" data-event="starship">Starship</button>
              <button type="button" data-event="starman">Starman</button>
              <button type="button" data-event="supercharger">Supercharger</button>
              <button type="button" data-event="cyberplow">Cybertruck-plog</button>
              <button type="button" data-convoy>Julkaravan</button>
              <button type="button" data-tunnel aria-pressed="false">Boring-tunneln</button>
              <button type="button" data-cinema-drawer>🎬 Rymdbio</button>
              <button type="button" data-giga-cinema-drawer>▣ Giga-bio</button>
            </div>
            <div class="drawer-label">Visningsyta</div>
            <div class="segmented cols-3">
              ${SKY_CINEMA_SURFACES.map(
                s => `<button type="button" data-cinema-surface="${s.id}">${s.shortLabel}</button>`
              ).join('')}
            </div>
            <div class="drawer-label">Rymdbio-läge</div>
            <div class="segmented cols-4">
              ${SKY_CINEMA_MODES.map(
                m => `<button type="button" data-cinema-mode="${m.id}" title="${m.description}">${m.shortLabel}</button>`
              ).join('')}
            </div>
            <div class="drawer-row-2">
              <button type="button" class="toggle-chip" data-auto-magic aria-pressed="true">✨ Automatisk julmagi</button>
              <button type="button" class="toggle-chip" data-timeline aria-pressed="false">📜 Elon-tidslinje</button>
            </div>
          </section>

          <section class="drawer-section">
            <div class="drawer-label">Test & Övrigt</div>
            <div class="drawer-row-2">
              <button type="button" class="toggle-chip" data-demo-toggle aria-pressed="false">🧪 Testa demorutt</button>
              <button type="button" class="toggle-chip" data-terrain>⛰ Test höjdterräng</button>
            </div>
            <a class="classic-link" href="./klassisk.html">Klassiska lägen →</a>
          </section>
        </div>
      </aside>

      <a class="osm-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap contributors</a>
    `;

    const q = <T extends HTMLElement = HTMLElement>(s: string) => this.root.querySelector<T>(s)!;
    this.worldEl = q('.drive-world');
    this.drawerEl = q('[data-drawer]');
    this.drawerBackdropEl = q('[data-drawer-backdrop]');
    this.magicPopoverEl = q('[data-magic-popover]');
    this.magicBackdropEl = q('[data-magic-backdrop]');
    this.magicToggleBtn = q('[data-magic-toggle]');
    this.magicPopoverPointsEl = q('[data-magic-popover-points]');
    this.magicPopoverComboEl = q('[data-magic-popover-combo]');
    this.magicActiveStripEl = q('[data-magic-active-strip]');
    this.placeEl = q('[data-place]');
    this.streetEl = q('[data-street]');
    this.junctionEl = q('[data-junction]');
    this.gpsBtn = q('[data-gps]');
    this.cameraBtn = q('[data-camera-btn]');
    this.followBtn = q('[data-follow]');
    this.cinemaBtn = q('[data-cinema-toggle]');
    this.cinemaBarEl = q('[data-cinema-bar]');
    this.cinemaModeRowEl = q('[data-cinema-mode-row]');
    this.cinemaTitleEl = q('[data-cinema-title]');
    this.cinemaCountEl = q('[data-cinema-count]');
    this.cinemaUnmuteBtn = q('[data-cinema-unmute]');
    this.soundQuickBtn = q('[data-sound-quick]');
    this.speedEl = q('[data-speed]');
    this.maxspeedEl = q('[data-maxspeed]');
    this.fsdBadgeEl = q('[data-fsd-badge]');
    this.northEl = q('[data-north]');
    this.northArrowEl = q('[data-north-arrow]');
    this.northDistEl = q('[data-distance]');
    this.giftPillEl = q('[data-gift-pill]');
    this.statusEl = q('[data-festive-status]');
    this.liveLaunchEl = q('[data-live-launch]');
    this.hohoBannerEl = q('[data-hoho-banner]');
    this.trialPanelEl = q('[data-trial-panel]');
    this.trialPauseBtn = q('[data-trial-pause]');
    this.trialElevationEl = q('[data-trial-elevation]');
    this.demoPanelEl = q('[data-demo-panel]');
    this.demoSpeedSlider = q('[data-demo-speed]');
    this.demoSpeedValEl = q('[data-demo-speed-val]');
  }

  connect(
    festivities: DriveFestivities,
    telemetry: { setForceTunnel(v: boolean): void; getForceTunnel(): boolean },
    callbacks: DriveHudCallbacks
  ): void {
    this.festivities = festivities;
    this.telemetry = telemetry;
    this.callbacks = callbacks;
    this.bindEvents();
    this.syncSettings();
    this.syncMagicUi();
    this.syncCinemaUi();
  }

  private bindEvents(): void {
    const q = <T extends HTMLElement = HTMLElement>(s: string) => this.root.querySelector<T>(s)!;

    for (const sel of ['.drive-drawer', '.magic-popover', '.magic-backdrop', '.drive-action-dock', '.drive-header', '.cinema-bar', '.street-board', '.drive-instruments', '.drive-timeline', '.terrain-trial', '.demo-pill']) {
      this.root.querySelector(sel)?.addEventListener('pointerdown', e => e.stopPropagation());
    }

    this.cameraBtn.onclick = () => this.callbacks.onCycleCamera();
    this.followBtn.onclick = () => this.callbacks.onFollow();
    this.gpsBtn.onclick = () => this.callbacks.onRetryGps();
    this.cinemaBtn.onclick = () => {
      this.festivities.toggleSkyCinema();
      this.syncCinemaUi();
    };
    this.cinemaUnmuteBtn.onclick = () => {
      this.festivities.audio.unlock();
      this.festivities.skyCinema.setMuted(false);
      this.syncCinemaUi();
    };
    q('[data-cinema-next]').onclick = () => {
      this.festivities.nextSkyCinemaClip();
      this.syncCinemaUi();
    };
    q('[data-cinema-stop]').onclick = () => {
      this.festivities.stopSkyCinema();
      this.syncCinemaUi();
    };

    this.soundQuickBtn.onclick = () => {
      const audio = this.festivities.audio;
      audio.unlock();
      audio.setMixMode(audio.getMixMode() === 'muted' ? 'full' : 'muted');
      this.syncSettings();
    };

    q('[data-drawer-toggle]').onclick = () => this.setDrawerOpen(!this.drawerOpen);
    q('[data-drawer-close]').onclick = () => this.setDrawerOpen(false);
    this.drawerBackdropEl.onclick = () => this.setDrawerOpen(false);

    this.magicToggleBtn.onclick = () => this.setMagicOpen(!this.magicOpen);
    q('[data-magic-close]').onclick = () => this.setMagicOpen(false);
    this.magicBackdropEl.onclick = () => this.setMagicOpen(false);

    this.root.querySelectorAll<HTMLButtonElement>('[data-magic-tab]').forEach(btn => {
      btn.onclick = () => {
        this.setMagicTab(btn.dataset.magicTab === 'workshop' ? 'workshop' : 'powers');
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-magic-power]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.magicPower as MagicPowerId;
        this.festivities.audio.unlock();
        if (this.festivities.audio.getMixMode() === 'muted') {
          this.festivities.audio.setMixMode('sfx');
          this.syncSettings();
        }
        const activated = this.festivities.activatePower(id);
        this.syncMagicUi();
    this.syncCinemaUi();
        const status = this.festivities.getStatus();
        if (this.statusEl.textContent !== status) this.statusEl.textContent = status;
        if (activated) this.setMagicOpen(false);
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-magic-unlock]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.magicUnlock as MagicUnlockId;
        this.festivities.audio.unlock();
        if (this.festivities.audio.getMixMode() === 'muted') {
          this.festivities.audio.setMixMode('sfx');
          this.syncSettings();
        }
        this.festivities.activateOrCycleUnlock(id);
        this.syncMagicUi();
    this.syncCinemaUi();
        const status = this.festivities.getStatus();
        if (this.statusEl.textContent !== status) this.statusEl.textContent = status;
      };
    });

    q('[data-gift]').onclick = () => this.festivities.interact(0.5, 0.45);
    q('[data-snowball]').onclick = () => this.festivities.triggerSnowball(0.5);
    q('[data-salute]').onclick = () => {
      this.festivities.audio.unlock();
      this.festivities.triggerConvoySalute();
    };
    q('[data-hohoho]').onclick = () => {
      this.festivities.audio.unlock();
      if (this.festivities.audio.getMixMode() === 'muted') {
        this.festivities.audio.setMixMode('sfx');
        this.syncSettings();
      }
      this.festivities.triggerHoHoHo();
      this.hohoBannerEl.hidden = false;
    };
    q('[data-light-wave]').onclick = () => {
      this.festivities.audio.unlock();
      if (this.festivities.audio.getMixMode() === 'muted') {
        this.festivities.audio.setMixMode('sfx');
        this.syncSettings();
      }
      this.festivities.requestLightWave();
    };

    this.root.querySelectorAll<HTMLButtonElement>('[data-vehicle]').forEach(btn => {
      btn.onclick = () => {
        const v = btn.dataset.vehicle as VehicleKind;
        this.callbacks.onSelectVehicle(v);
        this.root.querySelectorAll<HTMLButtonElement>('[data-vehicle]').forEach(b =>
          b.classList.toggle('active', b === btn)
        );
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-cam]').forEach(btn => {
      btn.onclick = () => {
        this.callbacks.onSelectCamera(btn.dataset.cam as CameraMode);
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-quality]').forEach(btn => {
      btn.onclick = () => {
        this.festivities.environment.setQuality(btn.dataset.quality as GraphicsQuality);
        this.syncSettings();
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach(btn => {
      btn.onclick = () => {
        this.festivities.environment.setTheme(btn.dataset.theme as HolidayThemeId);
        this.syncSettings();
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-sky]').forEach(btn => {
      btn.onclick = () => {
        this.festivities.environment.setSkyMood(btn.dataset.sky as SkyMood);
        this.syncSettings();
      };
    });

    const calSelect = q<HTMLSelectElement>('[data-calendar]');
    calSelect.onchange = () => {
      this.festivities.environment.setCalendarMode(calSelect.value as CalendarPreviewMode);
      this.syncSettings();
    };

    q('[data-frost]').onclick = () => {
      this.festivities.environment.setFrostEnabled(!this.festivities.environment.isFrostEnabled());
      this.syncSettings();
    };
    q('[data-fsd-path]').onclick = () => {
      this.callbacks.onToggleFsdPath();
      this.syncSettings();
    };
    q('[data-traffic]').onclick = () => {
      this.callbacks.onToggleTraffic();
      this.syncSettings();
    };
    q('[data-live-elevation]').onclick = () => {
      this.callbacks.onToggleLiveElevation();
      this.syncSettings();
    };

    this.root.querySelectorAll<HTMLButtonElement>('[data-mix]').forEach(btn => {
      btn.onclick = () => {
        this.festivities.audio.unlock();
        this.festivities.audio.setMixMode(btn.dataset.mix as AudioMixMode);
        this.syncSettings();
      };
    });

    const volSlider = q<HTMLInputElement>('[data-vol-slider]');
    volSlider.oninput = () => {
      this.festivities.audio.unlock();
      this.festivities.audio.setVolume(parseFloat(volSlider.value));
      this.syncSettings();
    };

    this.root.querySelectorAll<HTMLButtonElement>('[data-routing]').forEach(btn => {
      btn.onclick = () => {
        this.festivities.audio.unlock();
        this.festivities.audio.setRouting(btn.dataset.routing as AudioRouting);
        this.syncSettings();
      };
    });

    q('[data-mic]').onclick = () => {
      this.festivities.audio.unlock();
      void this.festivities.audio.setMicReactive(this.micState !== 'active').then(st => {
        this.micState = st;
        this.syncSettings();
      });
    };

    q('[data-sound-test]').onclick = () => {
      this.festivities.audio.unlock();
      if (this.festivities.audio.getMixMode() === 'muted') this.festivities.audio.setMixMode('full');
      this.festivities.audio.testDirect();
      this.syncSettings();
    };

    this.root.querySelectorAll<HTMLButtonElement>('[data-event]').forEach(btn => {
      btn.onclick = () => {
        this.festivities.triggerEvent(btn.dataset.event as ElonEventType);
        this.setDrawerOpen(false);
      };
    });

    q('[data-convoy]').onclick = () => {
      this.festivities.audio.unlock();
      this.festivities.startConvoy();
      this.setDrawerOpen(false);
    };

    q('[data-tunnel]').onclick = () => {
      this.telemetry.setForceTunnel(!this.telemetry.getForceTunnel());
      this.syncSettings();
      this.setDrawerOpen(false);
    };

    q('[data-cinema-drawer]').onclick = () => {
      this.festivities.toggleSkyCinema();
      this.syncCinemaUi();
      this.syncSettings();
      this.setDrawerOpen(false);
    };

    q('[data-giga-cinema-drawer]').onclick = () => {
      this.festivities.startGigaCinema();
      this.syncCinemaUi();
      this.syncSettings();
      this.setDrawerOpen(false);
    };

    this.root.querySelectorAll<HTMLButtonElement>('[data-cinema-surface]').forEach(btn => {
      btn.onclick = () => {
        const surface = btn.dataset.cinemaSurface as SkyCinemaSurface;
        this.festivities.setSkyCinemaSurface(surface);
        if (!this.festivities.skyCinema.isActive() && btn.closest('.drive-drawer')) {
          this.festivities.startSkyCinema(0, false);
        }
        this.syncCinemaUi();
        this.syncSettings();
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-cinema-mode]').forEach(btn => {
      btn.onclick = () => {
        const mode = btn.dataset.cinemaMode as SkyCinemaMode;
        this.festivities.setSkyCinemaMode(mode);
        if (!this.festivities.skyCinema.isActive() && btn.closest('.drive-drawer')) {
          this.festivities.startSkyCinema(0, false);
        }
        this.syncCinemaUi();
        this.syncSettings();
      };
    });

    q('[data-auto-magic]').onclick = () => {
      this.festivities.setAutomaticMagic(!this.festivities.isAutomaticMagic());
      this.syncSettings();
    };

    q('[data-timeline]').onclick = () => {
      this.festivities.timeline.setEnabled(!this.festivities.timeline.isEnabled());
      this.syncSettings();
      this.setDrawerOpen(false);
    };

    q('[data-demo-toggle]').onclick = () => {
      this.callbacks.onToggleDemo();
      this.setDrawerOpen(false);
    };
    q('[data-demo-exit]').onclick = () => this.callbacks.onExitDemo();
    this.demoSpeedSlider.oninput = () => {
      const kmh = parseInt(this.demoSpeedSlider.value, 10);
      this.demoSpeedValEl.textContent = `${kmh} km/h`;
      this.callbacks.onDemoSpeedChange(kmh);
    };

    q('[data-terrain]').onclick = () => {
      this.callbacks.onStartTrial();
      this.setDrawerOpen(false);
    };
    this.trialPauseBtn.onclick = () => this.callbacks.onToggleTrialPause();
    q('[data-trial-exit]').onclick = () => this.callbacks.onExitTrial();
  }

  isDrawerOpen(): boolean {
    return this.drawerOpen;
  }

  setDrawerOpen(open: boolean): void {
    if (open && this.magicOpen) this.setMagicOpen(false);
    this.drawerOpen = open;
    this.drawerEl.hidden = !open;
    this.drawerBackdropEl.hidden = !open;
    this.root.querySelector('[data-drawer-toggle]')?.setAttribute('aria-expanded', String(open));
    if (open) this.syncSettings();
  }

  isMagicOpen(): boolean {
    return this.magicOpen;
  }

  setMagicOpen(open: boolean): void {
    if (open && this.drawerOpen) this.setDrawerOpen(false);
    this.magicOpen = open;
    this.magicPopoverEl.hidden = !open;
    this.magicBackdropEl.hidden = !open;
    this.magicToggleBtn.setAttribute('aria-expanded', String(open));
    if (open) this.syncMagicUi();
  }

  private setMagicTab(tab: 'powers' | 'workshop'): void {
    this.root.querySelectorAll<HTMLButtonElement>('[data-magic-tab]').forEach(btn => {
      const active = btn.dataset.magicTab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    this.root.querySelectorAll<HTMLElement>('[data-magic-panel]').forEach(panel => {
      panel.hidden = panel.dataset.magicPanel !== tab;
    });
  }

  private syncMagicUi(): void {
    if (!this.festivities) return;
    const state = this.festivities.getMagicState();
    const activePowers = this.festivities.getActivePowers();
    const activeById = new Map(activePowers.map(p => [p.id, p]));

    const dockLabel = `✨ MAGI · ${state.points}`;
    if (this.magicToggleBtn.textContent !== dockLabel) {
      this.magicToggleBtn.textContent = dockLabel;
    }
    this.magicToggleBtn.classList.toggle('can-afford', this.festivities.canAffordAnyMagic());

    this.magicActiveStripEl.hidden = activePowers.length === 0 || this.magicOpen;
    if (!this.magicActiveStripEl.hidden) {
      const html = activePowers
        .map(p => `<span class="magic-active-pill">${p.icon} ${Math.ceil(p.remainingSec)}s</span>`)
        .join('');
      if (this.magicActiveStripEl.innerHTML !== html) {
        this.magicActiveStripEl.innerHTML = html;
      }
    }

    const ptsText = `${state.points} p`;
    if (this.magicPopoverPointsEl.textContent !== ptsText) {
      this.magicPopoverPointsEl.textContent = ptsText;
    }
    this.magicPopoverComboEl.hidden = state.combo < 2;
    if (state.combo >= 2) {
      const comboText = `x${state.combo} COMBO`;
      if (this.magicPopoverComboEl.textContent !== comboText) {
        this.magicPopoverComboEl.textContent = comboText;
      }
    }

    if (!this.magicOpen) return;

    for (const spec of MAGIC_POWERS) {
      const card = this.root.querySelector<HTMLButtonElement>(`[data-magic-power="${spec.id}"]`);
      const badge = this.root.querySelector<HTMLElement>(`[data-power-badge="${spec.id}"]`);
      const prog = this.root.querySelector<HTMLElement>(`[data-power-progress="${spec.id}"]`);
      if (!card || !badge) continue;
      const running = activeById.get(spec.id);
      const affordable = state.points >= spec.cost;
      card.classList.toggle('is-running', Boolean(running));
      card.classList.toggle('is-affordable', !running && affordable);
      card.classList.toggle('is-locked-cost', !running && !affordable);
      const badgeText = running ? `⏱ ${Math.ceil(running.remainingSec)}s` : `${spec.cost} p`;
      if (badge.textContent !== badgeText) badge.textContent = badgeText;
      if (prog) {
        const pct = running ? Math.max(0, Math.min(100, (running.remainingSec / running.durationSec) * 100)) : 0;
        prog.style.width = `${pct.toFixed(1)}%`;
      }
    }

    for (const spec of MAGIC_UNLOCKS) {
      const card = this.root.querySelector<HTMLButtonElement>(`[data-magic-unlock="${spec.id}"]`);
      const badge = this.root.querySelector<HTMLElement>(`[data-unlock-badge="${spec.id}"]`);
      if (!card || !badge) continue;
      const unlocked = state.unlocked[spec.id];
      const affordable = state.points >= spec.cost;
      const status = this.festivities.getUnlockStatusLabel(spec.id);
      card.classList.toggle('is-unlocked', unlocked);
      card.classList.toggle('is-off', unlocked && status.isOff);
      card.classList.toggle('is-affordable', !unlocked && affordable);
      card.classList.toggle('is-locked-cost', !unlocked && !affordable);
      if (badge.textContent !== status.label) badge.textContent = status.label;
    }
  }

  setFollowActive(active: boolean): void {
    this.followBtn.hidden = active;
    this.followBtn.setAttribute('aria-pressed', String(active));
  }

  setCameraMode(mode: CameraMode): void {
    this.cameraBtn.textContent = CAMERA_LABELS[mode];
    this.root.querySelectorAll<HTMLButtonElement>('[data-cam]').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.cam === mode)
    );
  }

  setDemoState(active: boolean, speedKmh: number): void {
    this.demoPanelEl.hidden = !active;
    this.demoSpeedSlider.value = String(Math.round(speedKmh));
    this.demoSpeedValEl.textContent = `${Math.round(speedKmh)} km/h`;
    this.root.querySelector('[data-demo-toggle]')?.setAttribute('aria-pressed', String(active));
  }

  syncSettings(): void {
    const env = this.festivities.environment;
    const audio = this.festivities.audio;

    this.root.querySelectorAll<HTMLButtonElement>('[data-quality]').forEach(b =>
      b.classList.toggle('active', b.dataset.quality === env.getQuality())
    );
    this.root.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach(b =>
      b.classList.toggle('active', b.dataset.theme === env.getTheme())
    );
    this.root.querySelectorAll<HTMLButtonElement>('[data-sky]').forEach(b =>
      b.classList.toggle('active', b.dataset.sky === env.getSkyMood())
    );
    this.root.querySelector<HTMLSelectElement>('[data-calendar]')!.value = env.getCalendarMode();
    this.root.querySelector('[data-frost]')?.setAttribute('aria-pressed', String(env.isFrostEnabled()));
    const fsd = this.callbacks.getFsdOptions();
    this.root.querySelector('[data-fsd-path]')?.setAttribute('aria-pressed', String(fsd.fsdPath));
    this.root.querySelector('[data-traffic]')?.setAttribute('aria-pressed', String(fsd.traffic));
    this.root.querySelector('[data-live-elevation]')?.setAttribute('aria-pressed', String(fsd.elevation));

    const mix = audio.getMixMode();
    this.root.querySelectorAll<HTMLButtonElement>('[data-mix]').forEach(b =>
      b.classList.toggle('active', b.dataset.mix === mix)
    );
    this.soundQuickBtn.setAttribute('aria-pressed', String(mix !== 'muted'));
    this.soundQuickBtn.textContent = mix === 'muted' ? '🔇' : '🔊';

    const vol = audio.getVolume();
    this.root.querySelector<HTMLInputElement>('[data-vol-slider]')!.value = String(vol);
    this.root.querySelector('[data-vol-val]')!.textContent = `${Math.round(vol * 100)}%`;

    this.root.querySelectorAll<HTMLButtonElement>('[data-routing]').forEach(b =>
      b.classList.toggle('active', b.dataset.routing === audio.getRouting())
    );

    const micBtn = this.root.querySelector<HTMLButtonElement>('[data-mic]')!;
    micBtn.setAttribute('aria-pressed', String(this.micState === 'active'));
    micBtn.textContent = this.micState === 'active' ? '🎙 Mikrofon PÅ' : this.micState === 'denied' ? '🎙 Nekad' : '🎙 Kupémikrofon';

    this.root.querySelector('[data-tunnel]')?.setAttribute('aria-pressed', String(this.telemetry.getForceTunnel()));
    this.root.querySelector('[data-cinema-drawer]')?.setAttribute('aria-pressed', String(this.festivities.skyCinema.isActive()));
    this.root.querySelector('[data-auto-magic]')?.setAttribute('aria-pressed', String(this.festivities.isAutomaticMagic()));
    this.root.querySelector('[data-timeline]')?.setAttribute('aria-pressed', String(this.festivities.timeline.isEnabled()));
    this.syncCinemaUi();
  }

  private syncCinemaUi(): void {
    if (!this.festivities) return;
    const cinema = this.festivities.skyCinema;
    const active = cinema.isActive();
    const info = cinema.getActiveClip();
    const mode = this.festivities.getSkyCinemaMode();
    const surface = this.festivities.getSkyCinemaSurface();
    this.cinemaBtn.setAttribute('aria-pressed', String(active));
    this.cinemaBarEl.hidden = !active || !info;
    this.cinemaModeRowEl.hidden = surface === 'giga';
    this.root.querySelector('[data-giga-cinema-drawer]')?.setAttribute('aria-pressed', String(active && surface !== 'sky'));
    this.root.querySelectorAll<HTMLButtonElement>('[data-cinema-surface]').forEach(btn => {
      const isCur = btn.dataset.cinemaSurface === surface;
      btn.classList.toggle('active', isCur);
      btn.setAttribute('aria-pressed', String(isCur));
    });
    this.root.querySelectorAll<HTMLButtonElement>('[data-cinema-mode]').forEach(btn => {
      const isCur = btn.dataset.cinemaMode === mode;
      btn.classList.toggle('active', isCur);
      btn.setAttribute('aria-pressed', String(isCur));
    });
    if (active && info) {
      const titleText = `🎬 ${info.clip.titleSv}`;
      if (this.cinemaTitleEl.textContent !== titleText) {
        this.cinemaTitleEl.textContent = titleText;
      }
      const countText = `${info.index + 1}/${info.total}`;
      if (this.cinemaCountEl.textContent !== countText) {
        this.cinemaCountEl.textContent = countText;
      }
      this.cinemaUnmuteBtn.hidden = !cinema.isMuted();
    }
  }

  updateReadout(opts: {
    frame: TelemetryFrame;
    env: EnvironmentState;
    placeName: string;
    streetLabel: string;
    aheadJunction?: { name: string; meters: number; turn?: 'left' | 'right' | 'straight' };
    maxspeedKmh?: number;
    fsdActive?: boolean;
    elevationM?: number;
    gradePct?: number;
    hasWorld: boolean;
    viewHeading: number;
  }): void {
    const {
      frame,
      env,
      placeName,
      streetLabel,
      aheadJunction,
      maxspeedKmh,
      fsdActive,
      elevationM,
      gradePct,
      hasWorld,
      viewHeading,
    } = opts;

    const metaParts: string[] = [];
    if (placeName) metaParts.push(placeName);
    if (hasWorld) metaParts.push(`${env.temperatureC}°C`);
    if (elevationM !== undefined && Number.isFinite(elevationM)) {
      const g = gradePct ? ` (${gradePct > 0 ? '+' : ''}${gradePct}%)` : '';
      metaParts.push(`⛰ ${Math.round(elevationM)} m${g}`);
    }
    if (env.holidayCalendar.badgeSv) metaParts.push(env.holidayCalendar.badgeSv);
    const metaText = metaParts.join(' · ');
    if (this.placeEl.textContent !== metaText) this.placeEl.textContent = metaText;

    if (this.streetEl.textContent !== streetLabel) this.streetEl.textContent = streetLabel;
    this.junctionEl.hidden = !aheadJunction;
    if (aheadJunction) {
      const glyph = aheadJunction.turn === 'left' ? '↰ ' : aheadJunction.turn === 'right' ? '↱ ' : '↑ ';
      this.junctionEl.textContent = `${glyph}${aheadJunction.name} · ${aheadJunction.meters} m`;
    }
    this.gpsBtn.hidden = frame.gpsStatus !== 'error';

    this.speedEl.textContent = String(Math.round(frame.speedKmh));
    this.maxspeedEl.hidden = !maxspeedKmh;
    if (maxspeedKmh) {
      this.maxspeedEl.textContent = String(maxspeedKmh);
      this.maxspeedEl.classList.toggle('is-exceeded', Math.round(frame.speedKmh) > maxspeedKmh + 5);
    }
    this.fsdBadgeEl.classList.toggle('is-active', hasWorld && fsdActive !== false);

    this.northEl.hidden = !hasWorld;
    this.northDistEl.textContent = Math.round(frame.northPoleDistanceKm).toLocaleString('sv-SE') + ' km';
    this.northArrowEl.style.transform = `rotate(${-viewHeading}rad)`;

    const summary = this.festivities.getScoreSummary();
    this.hohoBannerEl.hidden = !summary.hoHoBanner;
    const scoreParts: string[] = [];
    if (summary.gifts > 0) scoreParts.push(`🎁 ${summary.gifts}`);
    if (summary.stars > 0) scoreParts.push(`⭐ ${summary.stars}`);
    if (summary.critters > 0) scoreParts.push(`🦌 ${summary.critters}`);
    if (summary.snowballs > 0) scoreParts.push(`❄ ${summary.snowballs}`);
    this.giftPillEl.hidden = scoreParts.length === 0;
    if (scoreParts.length > 0) {
      this.giftPillEl.textContent = summary.combo >= 2
        ? `${scoreParts.join(' · ')} · ${summary.combo}×`
        : scoreParts.join(' · ');
    }

    this.syncMagicUi();
    this.syncCinemaUi();

    const status = this.festivities.getStatus();
    if (this.statusEl.textContent !== status) this.statusEl.textContent = status;

    const launch = this.festivities.getLaunchText();
    this.liveLaunchEl.hidden = !launch;
    if (launch && this.liveLaunchEl.textContent !== launch) this.liveLaunchEl.textContent = launch;
  }
}
