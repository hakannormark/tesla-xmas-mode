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
import type { DriveFestivities } from '../three/DriveFestivities';

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

const GEAR_LABELS: Record<TelemetryFrame['reindeerGearKey'], string> = {
  park: 'PARK',
  trot: 'TROT',
  dash: 'DASH',
  prance: 'PRANCE',
  comet: 'COMET',
  blitzen: 'BLITZEN',
  plaid: 'PLAID',
};

export class DriveHud {
  readonly worldEl: HTMLElement;
  private readonly drawerEl: HTMLElement;
  private readonly drawerBackdropEl: HTMLElement;
  private readonly placeEl: HTMLElement;
  private readonly streetEl: HTMLElement;
  private readonly junctionEl: HTMLElement;
  private readonly gpsBtn: HTMLButtonElement;
  private readonly cameraBtn: HTMLButtonElement;
  private readonly followBtn: HTMLButtonElement;
  private readonly soundQuickBtn: HTMLButtonElement;
  private readonly speedEl: HTMLElement;
  private readonly maxspeedEl: HTMLElement;
  private readonly fsdBadgeEl: HTMLElement;
  private readonly gearEl: HTMLElement;
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
  private micState: 'off' | 'active' | 'denied' = 'off';

  constructor(private readonly root: HTMLElement) {
    this.root.innerHTML = `
      <main class="drive-world" aria-label="Interaktiv julvärld"></main>

      <header class="drive-header">
        <div class="drive-brand"><span aria-hidden="true">✦</span> Vintervärlden</div>
        <div class="drive-actions">
          <button type="button" class="glass-pill" data-camera-btn title="Växla kamera (C)">✦ FSD Vy</button>
          <button type="button" class="glass-pill" data-follow aria-pressed="true">◎ Följ</button>
          <button type="button" class="glass-pill" data-sound-quick aria-pressed="false" title="Ljud på/av">🔇</button>
          <button type="button" class="glass-pill" data-drawer-toggle aria-expanded="false" aria-label="Inställningar">⚙</button>
        </div>
      </header>

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
            <span class="gear-pill" data-gear>PARK</span>
          </div>
          <div class="meta-row">
            <span class="pole-distance" data-north hidden><b data-north-arrow aria-hidden="true">↑</b> Nordpolen <span data-distance></span></span>
            <span class="gift-pill" data-gift-pill hidden></span>
          </div>
        </div>

        <div class="drive-action-dock">
          <output class="festive-toast" data-festive-status aria-live="polite"></output>
          <button type="button" class="dock-btn dock-primary" data-gift>🎁 Julklapp</button>
          <button type="button" class="dock-btn" data-snowball>❄ Snöboll</button>
          <button type="button" class="dock-btn" data-salute>🎺 Tut</button>
          <button type="button" class="dock-btn" data-hohoho>🎅 Ho-Ho</button>
          <button type="button" class="dock-btn" data-light-wave>✨ Ljus</button>
        </div>
      </footer>
      <div class="hoho-banner" data-hoho-banner hidden>🎅 HO! HO! HO! · GOD JUL! ✨</div>

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
    this.placeEl = q('[data-place]');
    this.streetEl = q('[data-street]');
    this.junctionEl = q('[data-junction]');
    this.gpsBtn = q('[data-gps]');
    this.cameraBtn = q('[data-camera-btn]');
    this.followBtn = q('[data-follow]');
    this.soundQuickBtn = q('[data-sound-quick]');
    this.speedEl = q('[data-speed]');
    this.maxspeedEl = q('[data-maxspeed]');
    this.fsdBadgeEl = q('[data-fsd-badge]');
    this.gearEl = q('[data-gear]');
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
  }

  private bindEvents(): void {
    const q = <T extends HTMLElement = HTMLElement>(s: string) => this.root.querySelector<T>(s)!;

    for (const sel of ['.drive-drawer', '.drive-action-dock', '.drive-header', '.street-board', '.drive-instruments', '.drive-timeline', '.terrain-trial', '.demo-pill']) {
      this.root.querySelector(sel)?.addEventListener('pointerdown', e => e.stopPropagation());
    }

    this.cameraBtn.onclick = () => this.callbacks.onCycleCamera();
    this.followBtn.onclick = () => this.callbacks.onFollow();
    this.gpsBtn.onclick = () => this.callbacks.onRetryGps();

    this.soundQuickBtn.onclick = () => {
      const audio = this.festivities.audio;
      audio.unlock();
      audio.setMixMode(audio.getMixMode() === 'muted' ? 'full' : 'muted');
      this.syncSettings();
    };

    q('[data-drawer-toggle]').onclick = () => this.setDrawerOpen(!this.drawerOpen);
    q('[data-drawer-close]').onclick = () => this.setDrawerOpen(false);
    this.drawerBackdropEl.onclick = () => this.setDrawerOpen(false);

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
    q('[data-light-wave]').onclick = () => this.festivities.requestLightWave();

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
    this.drawerOpen = open;
    this.drawerEl.hidden = !open;
    this.drawerBackdropEl.hidden = !open;
    this.root.querySelector('[data-drawer-toggle]')?.setAttribute('aria-expanded', String(open));
    if (open) this.syncSettings();
  }

  setFollowActive(active: boolean): void {
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
    this.root.querySelector('[data-auto-magic]')?.setAttribute('aria-pressed', String(this.festivities.isAutomaticMagic()));
    this.root.querySelector('[data-timeline]')?.setAttribute('aria-pressed', String(this.festivities.timeline.isEnabled()));
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
    this.gearEl.textContent = GEAR_LABELS[frame.reindeerGearKey];
    this.gearEl.classList.toggle('is-plaid', frame.isPlaidSpeed);

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

    const status = this.festivities.getStatus();
    if (this.statusEl.textContent !== status) this.statusEl.textContent = status;

    const launch = this.festivities.getLaunchText();
    this.liveLaunchEl.hidden = !launch;
    if (launch && this.liveLaunchEl.textContent !== launch) this.liveLaunchEl.textContent = launch;
  }
}
