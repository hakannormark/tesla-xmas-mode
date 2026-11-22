import './styles/main.css';
import { LocalDemoDrive } from './core/localDemo';
import { AudioMixMode, HolidayAudioEngine } from './core/audioEngine';
import { BoringTunnelRenderer } from './core/boringTunnel';
import { ElonEventDirector } from './core/elonEvents';
import { EnvironmentManager } from './core/environment';
import { SceneId } from './core/i18n';
import { LiveWorldDataManager } from './core/liveWorldData';
import { OsmWorldDirector } from './core/osmWorld';
import { DriveSource, TelemetryEngine } from './core/telemetry';
import { ElectricCaravanScene } from './scenes/ElectricCaravanScene';
import { ElonTimelineScene } from './scenes/ElonTimelineScene';
import { NorthPole3DScene } from './scenes/NorthPole3DScene';
import { SnowglobeScene } from './scenes/SnowglobeScene';
import { HolidayScene } from './scenes/types';
import { WinterExpressScene } from './scenes/WinterExpressScene';
import { MenuView } from './ui/MenuView';
import { SceneHUD } from './ui/SceneHUD';

function createSceneById(id: SceneId, winterLight: boolean): HolidayScene {
  switch (id) {
    case 'express':
      return new WinterExpressScene();
    case 'caravan':
      return new ElectricCaravanScene();
    case 'flight3d':
      return new NorthPole3DScene(winterLight);
    case 'snowglobe':
      return new SnowglobeScene();
    case 'timeline':
      return new ElonTimelineScene();
  }
}

class TeslaXmasApp {
  private appRoot: HTMLElement;
  private stageEl: HTMLElement;
  private tunnelCanvas: HTMLCanvasElement;
  private tunnelCtx: CanvasRenderingContext2D;

  private telemetry = new TelemetryEngine('demo');
  private env = new EnvironmentManager();
  private audio = new HolidayAudioEngine();
  private elon = new ElonEventDirector();
  private osm = new OsmWorldDirector();
  private live = new LiveWorldDataManager();
  private tunnelRenderer = new BoringTunnelRenderer();

  private menu: MenuView;
  private hud: SceneHUD;

  private winterLight = false;
  private localDemo?: LocalDemoDrive;
  private activeScene: HolidayScene | null = null;
  private wakeLockSentinel: WakeLockSentinel | null = null;
  private lastTimeMs = performance.now();
  private pointerStart: { x: number; y: number; dragged: boolean } | null = null;

  constructor() {
    const root = document.getElementById('app');
    if (!root) throw new Error('Missing #app container');
    this.appRoot = root;

    this.stageEl = document.createElement('div');
    this.stageEl.className = 'scene-stage';
    this.appRoot.appendChild(this.stageEl);

    this.tunnelCanvas = document.createElement('canvas');
    this.tunnelCanvas.className = 'tunnel-overlay';
    this.tunnelCtx = this.tunnelCanvas.getContext('2d')!;
    this.appRoot.appendChild(this.tunnelCanvas);

    this.menu = new MenuView(
      this.appRoot,
      this.audio,
      this.telemetry.getSource(),
      this.audio.getMixMode(),
      {
        onSelectMode: (id, winterLight) => this.enterScene(id, winterLight),
        onDriveSourceChange: (src: DriveSource) => {
          this.telemetry.setSource(src);
          this.hud.syncDrawerButtons();
        },
        onAudioMixChange: (mix: AudioMixMode) => {
          this.audio.setMixMode(mix);
          this.hud.syncDrawerButtons();
        },
        onSoundCheckOpen: () => this.hud.setSoundModalOpen(true),
      }
    );

    this.hud = new SceneHUD(this.appRoot, this.telemetry, this.env, this.audio, this.elon, this.osm, {
      onBackToMenu: () => this.returnToMenu(),
      onSwitchMode: (id) => this.enterScene(id),
      onQuickInteract: () => this.triggerSceneInteract(0.5, 0.42),
      onHoHoHo: () => this.activeScene?.triggerReaction?.('hohoho'),
      onLandmarkReaction: () => this.activeScene?.triggerReaction?.('landmark'),
      onConvoyHorn: () => this.activeScene?.triggerConvoySalute?.(),
    });

    // Tapping anywhere fires scene interaction & Gift Cannon; dragging across frosted borders wipes frost!
    this.stageEl.addEventListener('pointerdown', (e) => {
      this.hud.wake();
      this.pointerStart = { x: e.clientX, y: e.clientY, dragged: false };
    });

    this.stageEl.addEventListener('pointermove', (e) => {
      if (!this.pointerStart) return;
      const dist = Math.hypot(e.clientX - this.pointerStart.x, e.clientY - this.pointerStart.y);
      if (dist >= 14) {
        this.pointerStart.dragged = true;
        if (this.hud.wipeFrost(e.clientX, e.clientY)) {
          this.audio.unlock();
          this.audio.playIceScrape();
        }
      }
    });

    const endPointer = (e: PointerEvent) => {
      const start = this.pointerStart;
      this.pointerStart = null;
      if (!start || start.dragged || !this.activeScene) return;
      const nx = e.clientX / Math.max(1, window.innerWidth);
      const ny = e.clientY / Math.max(1, window.innerHeight);
      this.triggerSceneInteract(nx, ny);
    };
    this.stageEl.addEventListener('pointerup', endPointer);
    this.stageEl.addEventListener('pointercancel', () => {
      this.pointerStart = null;
    });

    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('keydown', (e) => this.handleKeydown(e));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.activeScene) {
        this.requestWakeLock();
      }
    });

    this.handleResize();
    requestAnimationFrame((now) => this.tick(now));
  }

  private triggerSceneInteract(nx: number, ny: number): void {
    if (!this.activeScene) return;
    this.audio.unlock();
    this.activeScene.interact(nx, ny);

    // Tapping Flight Deck (or panorama/caravan) also fires an exciting Elon sky event if none just started!
    if (
      this.activeScene.id === 'flight3d' ||
      this.activeScene.id === 'express' ||
      this.activeScene.id === 'caravan'
    ) {
      const curEv = this.elon.getActiveEvent();
      if (!curEv || curEv.elapsed > 2.4) {
        this.elon.triggerNext();
      }
    }

    if (this.activeScene.id === 'caravan') {
      this.audio.playLightWaveChime();
    } else if (this.activeScene.id === 'snowglobe') {
      this.audio.playGlobeShake();
    } else {
      this.audio.playSparkleChime();
    }
  }

  enterScene(id: SceneId, winterLight = false): void {
    this.audio.unlock();
    if (this.activeScene) {
      this.activeScene.dispose();
      this.activeScene = null;
    }
    this.stageEl.innerHTML = '';

    this.winterLight = winterLight;
    this.localDemo = undefined;
    const scene = createSceneById(id, winterLight);
    scene.mount(this.stageEl);
    this.activeScene = scene;

    this.elon.reset();
    this.hud.setGiftsDelivered(0);
    this.menu.hide();
    this.hud.setActiveMode(id);
    this.hud.show();
    this.requestWakeLock();
  }

  returnToMenu(): void {
    this.winterLight = false;
    this.localDemo = undefined;
    if (this.activeScene) {
      this.activeScene.dispose();
      this.activeScene = null;
    }
    this.stageEl.innerHTML = '';
    this.hud.hide();
    this.menu.setDriveSource(this.telemetry.getSource());
    this.menu.setAudioMix(this.audio.getMixMode());
    this.menu.show();
    this.releaseWakeLock();
  }

  private handleResize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.tunnelCanvas.width = Math.floor(w * dpr);
    this.tunnelCanvas.height = Math.floor(h * dpr);
    this.tunnelCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.menu.resize(w, h);
    this.hud.resize(w, h);
    if (this.activeScene) {
      this.activeScene.resize(w, h);
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.activeScene) {
      this.returnToMenu();
    } else if (e.key === '1') {
      this.enterScene('express');
    } else if (e.key === '2') {
      this.enterScene('caravan');
    } else if (e.key === '3') {
      this.enterScene('flight3d');
    } else if (e.key === '4') {
      this.enterScene('snowglobe');
    } else if (e.key === '5') {
      this.enterScene('timeline');
    } else if (e.key === ' ' && this.activeScene) {
      e.preventDefault();
      this.triggerSceneInteract(0.5, 0.42);
    } else if (e.key.toLowerCase() === 't' && this.activeScene) {
      this.telemetry.setForceTunnel(!this.telemetry.getForceTunnel());
      this.hud.syncDrawerButtons();
    } else if (e.key.toLowerCase() === 'e' && this.activeScene) {
      this.elon.triggerNext();
    } else if (e.key.toLowerCase() === 'h' && this.activeScene) {
      this.activeScene.triggerConvoySalute?.();
    }
  }

  private requestWakeLock(): void {
    if ('wakeLock' in navigator && !this.wakeLockSentinel) {
      navigator.wakeLock
        .request('screen')
        .then((sentinel) => {
          this.wakeLockSentinel = sentinel;
          sentinel.addEventListener('release', () => {
            this.wakeLockSentinel = null;
          });
        })
        .catch(() => {
          // Ignore wakeLock rejections cleanly
        });
    }
  }

  private releaseWakeLock(): void {
    if (this.wakeLockSentinel) {
      this.wakeLockSentinel.release().catch(() => {});
      this.wakeLockSentinel = null;
    }
  }

  private tick(nowMs: number): void {
    const dt = Math.min(0.05, Math.max(0.001, (nowMs - this.lastTimeMs) / 1000));
    this.lastTimeMs = nowMs;

    const frame = this.telemetry.update(dt);
    if (this.winterLight && frame.source === 'demo' && this.osm.isEnabled()) {
      this.localDemo ??= new LocalDemoDrive();
      this.localDemo.advance(frame, dt);
    } else {
      this.localDemo = undefined;
    }
    this.env.maybeRefreshWeather(frame.latitude, frame.longitude);
    const envState = this.env.getState();
    this.audio.setMusicStyle(envState.theme);
    const osmState = this.localDemo?.map ?? this.osm.update(dt, frame.source, frame.latitude, frame.longitude, frame.isMoving, frame.speedKmh, frame.gpsStatus === 'active');
    this.live.update(frame.latitude, frame.longitude);
    const liveState = this.live.getState();

    if (this.menu.isVisible()) {
      this.menu.update(dt, frame.elapsedSec);
    }

    if (this.activeScene) {
      const activeEvent = this.elon.update(dt, frame.isMoving);
      this.audio.update(dt, frame, activeEvent?.type ?? null);

      this.activeScene.update(dt, {
        localDemo: !!this.localDemo,
        telemetry: frame,
        env: envState,
        elonEvent: activeEvent,
        audio: this.audio,
        osm: osmState,
        live: liveState,
        onGiftDelivered: (total, combo, bonusMsg) => this.hud.setGiftsDelivered(total, combo, bonusMsg),
      });

      // Render Boring Tunnel seamless perspective overlay if active
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.tunnelCtx.clearRect(0, 0, w, h);
      if (frame.tunnelBlend > 0.01) {
        this.tunnelRenderer.render(this.tunnelCtx, w, h, dt, frame);
      }
    } else {
      this.tunnelCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    this.hud.update(dt, frame, envState, osmState, liveState);
    requestAnimationFrame((t) => this.tick(t));
  }
}

new TeslaXmasApp();
