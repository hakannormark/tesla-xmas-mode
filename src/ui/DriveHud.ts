import type { AudioMixMode, AudioRouting } from '../core/audioEngine';
import type {
  CalendarPreviewMode,
  EnvironmentState,
  GraphicsQuality,
  HolidayThemeId,
  SkyMood,
} from '../core/environment';
import type { ElonEventType } from '../core/i18n';
import { i18n, type Locale } from '../core/i18n';
import type { TelemetryFrame } from '../core/telemetry';
import { units, type TempPreference, type UnitPreference } from '../core/units';
import type {
  DriveFestivities,
  MagicPowerId,
  MagicUnlockId,
} from '../three/DriveFestivities';
import {
  MAGIC_POWERS,
  MAGIC_UNLOCKS,
  SKY_CINEMA_INTERVALS,
  type SkyCinemaInterval,
} from '../three/DriveFestivities';
import {
  SKY_CINEMA_MODES,
  SKY_CINEMA_SURFACES,
  type SkyCinemaMode,
  type SkyCinemaSurface,
} from '../three/SkyCinema';
import { DemoRouteModal, type SelectedDemoRoute } from './DemoRouteModal';

export type CameraMode = 'chase' | 'map' | 'cinematic';
export type VehicleKind = 'sleigh' | 'semi' | 'cybertruck' | 'starman';

const ICON_SPARKLE =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2l2.3 7.2L22 12l-7.7 2.8L12 22l-2.3-7.2L2 12l7.7-2.8z"/></svg>';
const ICON_GEAR =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
const ICON_CLOSE =
  '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const ICON_NEXT =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M5 5l10 7-10 7V5zm11 0h3v14h-3V5z"/></svg>';
const ICON_CHEVRON_DOWN =
  '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
const ICON_CHEVRON_UP =
  '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>';

export interface DriveHudCallbacks {
  onSelectVehicle(vehicle: VehicleKind): void;
  onSelectCamera(mode: CameraMode): void;
  onCycleCamera(): void;
  onFollow(): void;
  onRetryGps(): void;
  onStartTrial(): void;
  onToggleTrialPause(): void;
  onExitTrial(): void;
  onStartDemoRoute(route: SelectedDemoRoute): void;
  onDemoSpeedChange(kmh: number): void;
  onExitDemo(): void;
  onToggleFsdPath(): boolean;
  onToggleTraffic(): boolean;
  onToggleLiveElevation(): boolean;
  getFsdOptions(): { fsdPath: boolean; traffic: boolean; elevation: boolean };
}

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
  private readonly cinemaOptionsEl: HTMLElement;
  private readonly cinemaExpandBtn: HTMLButtonElement;
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
  private readonly demoModal: DemoRouteModal;
  private drawerOpen = false;
  private magicOpen = false;
  private cinemaOptionsOpen = false;
  private wasCinemaBarActive = false;
  private lastNonMutedMix: 'sfx' | 'full' = 'sfx';
  private activeDemoTitle: string | null = null;
  private micState: 'off' | 'active' | 'denied' = 'off';
  private currentCameraMode: CameraMode = 'chase';
  private lastDemoSpeedKmh = 34;

  constructor(private readonly root: HTMLElement) {
    this.root.innerHTML = `
      <main class="drive-world" aria-label="Interaktiv julvärld"></main>

      <header class="drive-header">
        <div class="drive-actions">
          <button type="button" class="glass-pill cinema-pill" data-cinema-toggle aria-pressed="false" title="Rymdbio i himlen (V)">🎬 Rymdbio</button>
          <button type="button" class="glass-pill" data-camera-btn title="Växla kamera (C)">${ICON_SPARKLE}<span>FSD Vy</span></button>
          <button type="button" class="glass-pill follow-recenter-pill" data-follow hidden>🎯 Följ släden</button>
          <button type="button" class="glass-pill" data-sound-quick aria-pressed="false" title="Ljud på/av">🔇</button>
          <button type="button" class="glass-pill" data-drawer-toggle aria-expanded="false" aria-label="Inställningar">${ICON_GEAR}</button>
        </div>
      </header>

      <aside class="cinema-bar" data-cinema-bar hidden aria-live="polite">
        <div class="cinema-bar-top">
          <span class="cinema-bar-title" data-cinema-title></span>
          <div class="cinema-bar-actions">
            <span class="cinema-bar-count" data-cinema-count></span>
            <button type="button" class="cinema-bar-btn cinema-bar-unmute" data-cinema-unmute hidden>🔊 Ljud</button>
            <button type="button" class="cinema-bar-btn" data-cinema-next title="Nästa klipp">${ICON_NEXT}<span data-lbl="cinema-next-txt">Nästa</span></button>
            <button type="button" class="cinema-bar-btn" data-cinema-expand aria-expanded="false" title="Visa fler val">${ICON_CHEVRON_DOWN}</button>
            <button type="button" class="cinema-bar-btn" data-cinema-stop aria-label="Stäng Rymdbio">${ICON_CLOSE}</button>
          </div>
        </div>
        <div class="cinema-bar-options" data-cinema-options hidden>
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
        </div>
      </aside>

      <aside class="street-board" aria-live="polite">
        <span class="street-meta" data-place></span>
        <strong data-street>Väntar på GPS</strong>
        <span class="street-junction" data-junction hidden></span>
        <button data-gps type="button" hidden>Försök igen GPS</button>
      </aside>

      <aside class="drive-timeline" data-timeline-card hidden>
        <div class="timeline-kicker"><span data-lbl="timeline-kicker">Elon-tidslinje</span> <span data-timeline-step></span></div>
        <strong data-timeline-title></strong>
        <span data-timeline-text></span>
        <button data-timeline-next type="button"><span data-lbl="timeline-next-txt">Nästa</span> ${ICON_NEXT}</button>
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
          <div class="demo-pill-actions">
            <button type="button" data-demo-route>Byt rutt</button>
            <button type="button" data-demo-exit>Till GPS</button>
          </div>
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
            <span class="pole-distance" data-north hidden><b data-north-arrow aria-hidden="true">↑</b> <span data-north-label>Nordpolen</span> <span data-distance></span></span>
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
          <button type="button" class="magic-close" data-magic-close aria-label="Stäng Julmagi">${ICON_CLOSE}</button>
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
          <h2><span>${ICON_SPARKLE}</span> Vintervärlden</h2>
          <button type="button" class="drawer-close" data-drawer-close aria-label="Stäng">${ICON_CLOSE}</button>
        </div>
        <div class="drawer-scroll">
          <section class="drawer-section">
            <div class="drawer-label" data-lbl="vehicle">Fordon</div>
            <div class="segmented cols-2">
              <button type="button" class="active" data-vehicle="sleigh">🎅 Släde</button>
              <button type="button" data-vehicle="semi">🚛 Semi</button>
              <button type="button" data-vehicle="cybertruck">📐 Cybertruck</button>
              <button type="button" data-vehicle="starman">🚀 Starman</button>
            </div>
          </section>

          <section class="drawer-section">
            <div class="drawer-label" data-lbl="camera">Kamera</div>
            <div class="segmented cols-3">
              <button type="button" class="active" data-cam="chase">FSD Vy</button>
              <button type="button" data-cam="map">Kartvy</button>
              <button type="button" data-cam="cinematic">Filmisk</button>
            </div>
          </section>

          <section class="drawer-section">
            <div class="drawer-label" data-lbl="graphics-mood">Grafik & Stämning</div>
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
              <span data-lbl="calendar">Julkalender</span>
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
            <div class="drawer-label" data-lbl="audio">Ljud & Bilstereo</div>
            <div class="segmented cols-3">
              <button type="button" data-mix="full">Full</button>
              <button type="button" data-mix="sfx">Effekter</button>
              <button type="button" data-mix="muted">Tyst</button>
            </div>
            <label class="slider-row">
              <span><span data-lbl="vol">Volym</span> <b data-vol-val></b></span>
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
            <div class="drawer-label" data-lbl="magic-events">Julmagi & Händelser</div>
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
              <button type="button" data-giga-cinema-drawer>🏢 Giga-bio</button>
            </div>
            <div class="drawer-label" data-lbl="surface">Visningsyta</div>
            <div class="segmented cols-3">
              ${SKY_CINEMA_SURFACES.map(
                s => `<button type="button" data-cinema-surface="${s.id}">${s.shortLabel}</button>`
              ).join('')}
            </div>
            <div class="drawer-label" data-lbl="cinema-mode">Rymdbio-läge</div>
            <div class="segmented cols-4">
              ${SKY_CINEMA_MODES.map(
                m => `<button type="button" data-cinema-mode="${m.id}" title="${m.description}">${m.shortLabel}</button>`
              ).join('')}
            </div>
            <div class="drawer-label" data-lbl="cinema-auto">Auto Rymdbio</div>
            <div class="segmented cols-4">
              ${SKY_CINEMA_INTERVALS.map(
                iv => `<button type="button" data-cinema-interval="${iv.id}">${iv.label}</button>`
              ).join('')}
            </div>
            <div class="drawer-row-2">
              <button type="button" class="toggle-chip" data-auto-magic aria-pressed="true">✨ Automatisk julmagi</button>
              <button type="button" class="toggle-chip" data-timeline aria-pressed="false">📜 Elon-tidslinje</button>
            </div>
          </section>

          <section class="drawer-section">
            <div class="drawer-label" data-lbl="lang-units">Språk &amp; Enheter</div>
            <div class="segmented cols-2">
              <button type="button" data-lang="sv">🇸🇪 Svenska</button>
              <button type="button" data-lang="en">🇬🇧 English</button>
            </div>
            <div class="drawer-label" data-lbl="units-dist">Hastighet &amp; Avstånd</div>
            <div class="segmented cols-3">
              <button type="button" data-unit-dist="auto">Auto</button>
              <button type="button" data-unit-dist="metric">km/h · km</button>
              <button type="button" data-unit-dist="imperial">mph · mi</button>
            </div>
            <div class="drawer-label" data-lbl="units-temp">Temperatur</div>
            <div class="segmented cols-3">
              <button type="button" data-unit-temp="auto">Auto</button>
              <button type="button" data-unit-temp="C">°C</button>
              <button type="button" data-unit-temp="F">°F</button>
            </div>
          </section>

          <section class="drawer-section">
            <div class="drawer-label" data-lbl="test-more">Test & Övrigt</div>
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
    this.cinemaOptionsEl = q('[data-cinema-options]');
    this.cinemaExpandBtn = q('[data-cinema-expand]');
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
    this.demoModal = new DemoRouteModal(this.root, route => this.callbacks.onStartDemoRoute(route));
    this.applyLocaleAndUnits();
  }

  connect(
    festivities: DriveFestivities,
    telemetry: { setForceTunnel(v: boolean): void; getForceTunnel(): boolean },
    callbacks: DriveHudCallbacks
  ): void {
    this.festivities = festivities;
    this.telemetry = telemetry;
    this.callbacks = callbacks;
    const initMix = this.festivities.audio.getMixMode();
    if (initMix === 'sfx' || initMix === 'full') {
      this.lastNonMutedMix = initMix;
    }
    this.bindEvents();
    i18n.onChange(() => this.applyLocaleAndUnits());
    units.onChange(() => this.applyLocaleAndUnits());
    this.applyLocaleAndUnits();
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
    this.cinemaExpandBtn.onclick = () => {
      this.cinemaOptionsOpen = !this.cinemaOptionsOpen;
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
      const cur = audio.getMixMode();
      if (cur === 'muted') {
        audio.setMixMode(this.lastNonMutedMix);
      } else {
        this.lastNonMutedMix = cur;
        audio.setMixMode('muted');
      }
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
        const mode = btn.dataset.mix as AudioMixMode;
        if (mode === 'sfx' || mode === 'full') {
          this.lastNonMutedMix = mode;
        }
        this.festivities.audio.setMixMode(mode);
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
          this.festivities.startSkyCinema(undefined, false);
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
          this.festivities.startSkyCinema(undefined, false);
        }
        this.syncCinemaUi();
        this.syncSettings();
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-cinema-interval]').forEach(btn => {
      btn.onclick = () => {
        const iv = btn.dataset.cinemaInterval as SkyCinemaInterval;
        this.festivities.setSkyCinemaInterval(iv);
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

    this.root.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach(btn => {
      btn.onclick = () => {
        i18n.setLocale(btn.dataset.lang as Locale);
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-unit-dist]').forEach(btn => {
      btn.onclick = () => {
        units.setDistancePref(btn.dataset.unitDist as UnitPreference);
      };
    });

    this.root.querySelectorAll<HTMLButtonElement>('[data-unit-temp]').forEach(btn => {
      btn.onclick = () => {
        units.setTempPref(btn.dataset.unitTemp as TempPreference);
      };
    });

    q('[data-demo-toggle]').onclick = () => {
      this.setDrawerOpen(false);
      this.demoModal.setOpen(true);
    };
    q('[data-demo-route]').onclick = () => {
      this.demoModal.setOpen(true);
    };
    q('[data-demo-exit]').onclick = () => this.callbacks.onExitDemo();
    this.demoSpeedSlider.oninput = () => {
      const kmh = parseInt(this.demoSpeedSlider.value, 10);
      this.lastDemoSpeedKmh = kmh;
      this.demoSpeedValEl.textContent = units.formatSpeed(kmh);
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

  private getCameraLabel(mode: CameraMode): string {
    const d = i18n.t().drive;
    return mode === 'chase' ? d.camChase : mode === 'map' ? d.camMap : d.camCinematic;
  }

  private applyLocaleAndUnits(): void {
    const t = i18n.t();
    const d = t.drive;
    const isEn = i18n.getLocale() === 'en';
    const setText = (sel: string, txt: string) => {
      const el = this.root.querySelector<HTMLElement>(sel);
      if (el && el.textContent !== txt) el.textContent = txt;
    };

    if (typeof document !== 'undefined') {
      document.title = d.pageTitle;
    }
    this.worldEl.setAttribute('aria-label', d.worldAria);

    this.cinemaBtn.textContent = d.cinemaPill;
    this.cinemaBtn.title = d.cinemaPillTitle;
    this.cameraBtn.innerHTML = `${ICON_SPARKLE}<span>${this.getCameraLabel(this.currentCameraMode)}</span>`;
    this.cameraBtn.title = d.cameraTitle;
    this.followBtn.textContent = `🎯 ${d.followBtn}`;
    this.soundQuickBtn.title = d.soundTitle;
    this.root.querySelector<HTMLElement>('[data-drawer-toggle]')?.setAttribute('aria-label', d.settingsAria);

    this.cinemaUnmuteBtn.textContent = d.cinemaSoundBtn;
    setText('[data-lbl="cinema-next-txt"]', d.cinemaNextBtn);
    this.root.querySelector<HTMLElement>('[data-cinema-next]')?.setAttribute('title', d.cinemaNextTitle);
    this.cinemaExpandBtn.title = d.cinemaExpandTitle;
    this.root.querySelector<HTMLElement>('[data-cinema-stop]')?.setAttribute('aria-label', d.cinemaCloseAria);
    this.root.querySelector<HTMLElement>('.cinema-surface-row')?.setAttribute('aria-label', d.cinemaSurfaceAria);
    this.cinemaModeRowEl.setAttribute('aria-label', d.cinemaModeAria);

    for (const s of SKY_CINEMA_SURFACES) {
      const text = isEn ? s.shortLabelEn : s.shortLabel;
      this.root.querySelectorAll<HTMLElement>(`[data-cinema-surface="${s.id}"]`).forEach(el => {
        el.textContent = text;
      });
    }
    for (const m of SKY_CINEMA_MODES) {
      const text = isEn ? m.shortLabelEn : m.shortLabel;
      const desc = isEn ? m.descriptionEn : m.description;
      this.root.querySelectorAll<HTMLElement>(`[data-cinema-mode="${m.id}"]`).forEach(el => {
        el.textContent = text;
        el.title = desc;
      });
    }

    if (this.streetEl.textContent === 'Väntar på GPS' || this.streetEl.textContent === 'Waiting for GPS') {
      this.streetEl.textContent = d.waitingGps;
    }
    this.gpsBtn.textContent = d.retryGps;
    setText('[data-lbl="timeline-kicker"]', d.timelineKicker);
    setText('[data-lbl="timeline-next-txt"]', d.timelineNext);
    setText('[data-trial-panel] strong', d.trialTitle);
    setText('[data-trial-exit]', d.trialToGps);
    setText('[data-trial-panel] a', d.trialCredit);
    if (this.trialPauseBtn.textContent === 'Kör igen' || this.trialPauseBtn.textContent === 'Replay') {
      this.trialPauseBtn.textContent = d.trialReplay;
    } else if (this.trialPauseBtn.textContent === 'Fortsätt' || this.trialPauseBtn.textContent === 'Resume') {
      this.trialPauseBtn.textContent = d.trialResume;
    } else {
      this.trialPauseBtn.textContent = d.trialPause;
    }
    setText('[data-demo-panel] strong', this.activeDemoTitle ?? d.demoTitle);
    setText('[data-demo-route]', d.demoChangeRouteBtn);
    setText('[data-demo-exit]', d.trialToGps);
    const demoLabelSpan = this.root.querySelector<HTMLElement>('.demo-speed-row > span');
    if (demoLabelSpan) {
      const speedVal = units.formatSpeed(this.lastDemoSpeedKmh);
      if (demoLabelSpan.firstChild && demoLabelSpan.firstChild.nodeType === Node.TEXT_NODE) {
        demoLabelSpan.firstChild.textContent = `${d.speedPrefix}: `;
      }
      this.demoSpeedValEl.textContent = speedVal;
    }

    setText('.speed-unit', units.speedUnit());
    setText('[data-north-label]', t.northPoleShort);
    setText('[data-gift]', d.dockGift);
    setText('[data-snowball]', d.dockSnowball);
    setText('[data-salute]', d.dockSalute);
    setText('[data-hohoho]', d.dockHoHoHo);
    setText('[data-light-wave]', d.dockLights);
    this.hohoBannerEl.textContent = d.hohoBanner;

    this.magicPopoverEl.setAttribute('aria-label', d.magicDialogAria);
    setText('.magic-popover-title strong', d.magicTitle);
    this.root.querySelector<HTMLElement>('[data-magic-close]')?.setAttribute('aria-label', t.closeDrawer);
    setText('[data-magic-tab="powers"]', d.magicTabPowers);
    setText('[data-magic-tab="workshop"]', d.magicTabWorkshop);
    setText('.magic-popover-foot', d.magicFoot);
    for (const p of MAGIC_POWERS) {
      const card = this.root.querySelector<HTMLElement>(`[data-magic-power="${p.id}"]`);
      if (!card) continue;
      const titleEl = card.querySelector<HTMLElement>('.magic-card-title');
      const descEl = card.querySelector<HTMLElement>('.magic-card-desc');
      if (titleEl) titleEl.textContent = isEn ? p.labelEn : p.label;
      if (descEl) descEl.textContent = isEn ? p.descriptionEn : p.description;
    }
    for (const u of MAGIC_UNLOCKS) {
      const card = this.root.querySelector<HTMLElement>(`[data-magic-unlock="${u.id}"]`);
      if (!card) continue;
      const titleEl = card.querySelector<HTMLElement>('.magic-card-title');
      const descEl = card.querySelector<HTMLElement>('.magic-card-desc');
      if (titleEl) titleEl.textContent = isEn ? u.labelEn : u.label;
      if (descEl) descEl.textContent = isEn ? u.descriptionEn : u.description;
    }

    this.drawerEl.setAttribute('aria-label', d.drawerAria);
    const drawerTitle = this.drawerEl.querySelector<HTMLElement>('.drawer-head h2');
    if (drawerTitle) drawerTitle.innerHTML = `<span>${ICON_SPARKLE}</span> ${d.drawerTitle}`;
    this.drawerEl.querySelector<HTMLElement>('[data-drawer-close]')?.setAttribute('aria-label', t.closeDrawer);

    setText('[data-lbl="vehicle"]', d.vehicleLabel);
    setText('[data-vehicle="sleigh"]', d.vehicleSleigh);
    setText('[data-vehicle="semi"]', d.vehicleSemi);
    setText('[data-vehicle="cybertruck"]', d.vehicleCybertruck);
    setText('[data-vehicle="starman"]', d.vehicleStarman);

    setText('[data-lbl="camera"]', d.cameraLabel);
    setText('[data-cam="chase"]', d.camChase);
    setText('[data-cam="map"]', d.camMapShort);
    setText('[data-cam="cinematic"]', d.camCinematicShort);

    setText('[data-lbl="graphics-mood"]', d.graphicsMoodLabel);
    setText('[data-theme="classic"]', d.themeClassic);
    setText('[data-theme="nordic"]', d.themeNordic);
    setText('[data-theme="cyber2099"]', d.themeCyber);
    setText('[data-sky="auto"]', d.skyAuto);
    setText('[data-sky="midnight"]', d.skyMidnight);
    setText('[data-sky="twilight"]', d.skyBlue);
    setText('[data-sky="daylight"]', d.skyDay);

    setText('[data-lbl="calendar"]', d.calendarLabel);
    const calSel = this.root.querySelector<HTMLSelectElement>('[data-calendar]');
    if (calSel) {
      calSel.setAttribute('aria-label', d.calendarLabel);
      const mapOpt: Record<string, string> = {
        auto: d.calAuto,
        advent1: d.calAdv1,
        advent2: d.calAdv2,
        advent3: d.calAdv3,
        advent4: d.calAdv4,
        lucia: d.calLucia,
        xmas_eve: d.calXmasEve,
      };
      for (const opt of Array.from(calSel.options)) {
        if (mapOpt[opt.value]) opt.textContent = mapOpt[opt.value];
      }
    }

    setText('[data-fsd-path]', d.fsdPathChip);
    setText('[data-traffic]', d.trafficChip);
    setText('[data-frost]', d.frostChip);
    setText('[data-live-elevation]', d.elevationChip);

    setText('[data-lbl="audio"]', d.audioLabel);
    setText('[data-mix="full"]', d.mixFull);
    setText('[data-mix="sfx"]', d.mixSfx);
    setText('[data-mix="muted"]', d.mixMuted);
    setText('[data-lbl="vol"]', d.volLabel);
    setText('[data-routing="direct"]', d.routeDirect);
    setText('[data-routing="media"]', d.routeMedia);
    setText('[data-sound-test]', d.soundTestChip);

    setText('[data-lbl="magic-events"]', d.magicEventsLabel);
    setText('[data-event="cyberplow"]', d.eventCyberplow);
    setText('[data-convoy]', d.eventConvoy);
    setText('[data-tunnel]', d.eventTunnel);
    setText('[data-cinema-drawer]', d.eventCinema);
    setText('[data-giga-cinema-drawer]', d.eventGigaCinema);
    setText('[data-lbl="surface"]', d.surfaceLabel);
    setText('[data-lbl="cinema-mode"]', d.cinemaModeLabel);
    setText('[data-lbl="cinema-auto"]', d.cinemaAutoLabel);
    for (const iv of SKY_CINEMA_INTERVALS) {
      setText(`[data-cinema-interval="${iv.id}"]`, isEn ? iv.labelEn : iv.label);
    }
    setText('[data-auto-magic]', d.autoMagicChip);
    setText('[data-timeline]', d.timelineChip);

    setText('[data-lbl="lang-units"]', d.langUnitsLabel);
    setText('[data-lbl="units-dist"]', t.unitsDistanceLabel);
    setText('[data-lbl="units-temp"]', t.unitsTempLabel);
    const countryTag = units.getDetectedCountry()?.toUpperCase();
    const autoText = countryTag ? `${t.unitsAuto} (${countryTag})` : t.unitsAuto;
    setText('[data-unit-dist="auto"]', autoText);
    setText('[data-unit-dist="metric"]', t.unitsMetric);
    setText('[data-unit-dist="imperial"]', t.unitsImperial);
    setText('[data-unit-temp="auto"]', autoText);
    setText('[data-unit-temp="C"]', t.unitsCelsius);
    setText('[data-unit-temp="F"]', t.unitsFahrenheit);

    setText('[data-lbl="test-more"]', d.testMoreLabel);
    setText('[data-demo-toggle]', d.testDemoBtn);
    setText('[data-terrain]', d.testTerrainBtn);
    setText('.classic-link', d.classicModesLink);

    if (this.festivities) {
      this.syncSettings();
      this.syncMagicUi();
      this.syncCinemaUi();
    }
  }

  private syncMagicUi(): void {
    if (!this.festivities) return;
    const d = i18n.t().drive;
    const state = this.festivities.getMagicState();
    const activePowers = this.festivities.getActivePowers();
    const activeById = new Map(activePowers.map(p => [p.id, p]));

    const dockLabel = `${d.dockMagicPrefix} · ${state.points}`;
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

    const ptsText = `${state.points} ${d.magicPtsUnit}`;
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
      const badgeText = running ? `⏱ ${Math.ceil(running.remainingSec)}s` : `${spec.cost} ${d.magicPtsUnit}`;
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
    this.currentCameraMode = mode;
    this.cameraBtn.innerHTML = `${ICON_SPARKLE}<span>${this.getCameraLabel(mode)}</span>`;
    this.root.querySelectorAll<HTMLButtonElement>('[data-cam]').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.cam === mode)
    );
  }

  setDemoState(active: boolean, speedKmh: number, routeName?: string): void {
    this.lastDemoSpeedKmh = speedKmh;
    this.activeDemoTitle = active ? (routeName ?? null) : null;
    this.demoPanelEl.hidden = !active;
    const titleEl = this.demoPanelEl.querySelector<HTMLElement>('strong');
    if (titleEl) {
      titleEl.textContent = this.activeDemoTitle ?? i18n.t().drive.demoTitle;
    }
    this.demoSpeedSlider.value = String(Math.round(speedKmh));
    this.demoSpeedValEl.textContent = units.formatSpeed(speedKmh);
    this.root.querySelector('[data-demo-toggle]')?.setAttribute('aria-pressed', String(active));
  }

  syncSettings(): void {
    const env = this.festivities.environment;
    const audio = this.festivities.audio;
    const d = i18n.t().drive;
    const locale = i18n.getLocale();

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
    micBtn.textContent = this.micState === 'active' ? d.micOnBtn : this.micState === 'denied' ? d.micDeniedBtn : d.micBtn;

    this.root.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === locale)
    );
    this.root.querySelectorAll<HTMLButtonElement>('[data-unit-dist]').forEach(b =>
      b.classList.toggle('active', b.dataset.unitDist === units.getDistancePref())
    );
    this.root.querySelectorAll<HTMLButtonElement>('[data-unit-temp]').forEach(b =>
      b.classList.toggle('active', b.dataset.unitTemp === units.getTempPref())
    );

    this.root.querySelector('[data-tunnel]')?.setAttribute('aria-pressed', String(this.telemetry.getForceTunnel()));
    this.root.querySelector('[data-cinema-drawer]')?.setAttribute('aria-pressed', String(this.festivities.skyCinema.isActive()));
    const cinemaInterval = this.festivities.getSkyCinemaInterval();
    this.root.querySelectorAll<HTMLButtonElement>('[data-cinema-interval]').forEach(b =>
      b.classList.toggle('active', b.dataset.cinemaInterval === cinemaInterval)
    );
    this.root.querySelector('[data-auto-magic]')?.setAttribute('aria-pressed', String(this.festivities.isAutomaticMagic()));
    this.root.querySelector('[data-timeline]')?.setAttribute('aria-pressed', String(this.festivities.timeline.isEnabled()));
    this.syncCinemaUi();
  }

  private syncCinemaUi(): void {
    if (!this.festivities) return;
    const isEn = i18n.getLocale() === 'en';
    const cinema = this.festivities.skyCinema;
    const active = cinema.isActive();
    const info = cinema.getActiveClip();
    const mode = this.festivities.getSkyCinemaMode();
    const surface = this.festivities.getSkyCinemaSurface();
    this.cinemaBtn.setAttribute('aria-pressed', String(active));
    const showBar = active && Boolean(info);
    if (!showBar && this.wasCinemaBarActive) {
      this.cinemaOptionsOpen = false;
    }
    this.wasCinemaBarActive = showBar;
    this.cinemaBarEl.hidden = !showBar;
    this.cinemaOptionsEl.hidden = !this.cinemaOptionsOpen;
    this.cinemaExpandBtn.setAttribute('aria-expanded', String(this.cinemaOptionsOpen));
    const desiredChevron = this.cinemaOptionsOpen ? ICON_CHEVRON_UP : ICON_CHEVRON_DOWN;
    if (this.cinemaExpandBtn.innerHTML !== desiredChevron) {
      this.cinemaExpandBtn.innerHTML = desiredChevron;
    }
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
      const titleText = `🎬 ${isEn ? info.clip.title : (info.clip.titleSv ?? info.clip.title)}`;
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

    const locale = i18n.getLocale();
    const metaParts: string[] = [];
    if (placeName) metaParts.push(placeName);
    if (hasWorld) metaParts.push(units.formatTemp(env.temperatureC));
    if (elevationM !== undefined && Number.isFinite(elevationM)) {
      const g = gradePct ? ` (${gradePct > 0 ? '+' : ''}${gradePct}%)` : '';
      metaParts.push(`⛰ ${units.formatElevation(elevationM)}${g}`);
    }
    const calBadge = locale === 'en' ? env.holidayCalendar.badgeEn : env.holidayCalendar.badgeSv;
    if (calBadge) metaParts.push(calBadge);
    const metaText = metaParts.join(' · ');
    if (this.placeEl.textContent !== metaText) this.placeEl.textContent = metaText;

    if (this.streetEl.textContent !== streetLabel) this.streetEl.textContent = streetLabel;
    this.junctionEl.hidden = !aheadJunction;
    if (aheadJunction) {
      const glyph = aheadJunction.turn === 'left' ? '← ' : aheadJunction.turn === 'right' ? '→ ' : '↑ ';
      this.junctionEl.textContent = `${glyph}${aheadJunction.name} · ${units.formatShortDistance(aheadJunction.meters)}`;
    }
    this.gpsBtn.hidden = frame.gpsStatus !== 'error';

    const dispSpeed = units.speedValue(frame.speedKmh);
    const speedUnitStr = units.speedUnit();
    const speedUnitEl = this.root.querySelector<HTMLElement>('.speed-unit');
    if (speedUnitEl && speedUnitEl.textContent !== speedUnitStr) speedUnitEl.textContent = speedUnitStr;
    this.speedEl.textContent = String(dispSpeed);
    this.maxspeedEl.hidden = !maxspeedKmh;
    if (maxspeedKmh) {
      this.maxspeedEl.textContent = String(units.speedLimitValue(maxspeedKmh));
      this.maxspeedEl.classList.toggle('is-exceeded', Math.round(frame.speedKmh) > maxspeedKmh + 5);
    }
    this.fsdBadgeEl.classList.toggle('is-active', hasWorld && fsdActive !== false);

    this.northEl.hidden = !hasWorld;
    this.northDistEl.textContent = units.formatLongDistance(frame.northPoleDistanceKm, locale);
    this.northArrowEl.style.transform = `rotate(${-viewHeading}rad)`;

    const summary = this.festivities.getScoreSummary();
    this.hohoBannerEl.hidden = !summary.hoHoBanner;
    const scoreParts: string[] = [];
    if (summary.gifts > 0) scoreParts.push(`🎁 ${summary.gifts}`);
    if (summary.stars > 0) scoreParts.push(`⭐ ${summary.stars}`);
    if (summary.reindeer > 0) scoreParts.push(`🦌 ${summary.reindeer}`);
    if (summary.elves > 0) scoreParts.push(`🧝 ${summary.elves}`);
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
