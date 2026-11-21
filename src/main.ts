import './styles/main.css';
import { AudioMixMode, HolidayAudioEngine } from './core/audioEngine';
import { BoringTunnelRenderer } from './core/boringTunnel';
import { ElonEventDirector } from './core/elonEvents';
import { EnvironmentManager } from './core/environment';
import { SceneId } from './core/i18n';
import { DriveSource, TelemetryEngine } from './core/telemetry';
import { ElectricCaravanScene } from './scenes/ElectricCaravanScene';
import { NorthPole3DScene } from './scenes/NorthPole3DScene';
import { SnowglobeScene } from './scenes/SnowglobeScene';
import { HolidayScene } from './scenes/types';
import { WinterExpressScene } from './scenes/WinterExpressScene';
import { MenuView } from './ui/MenuView';
import { SceneHUD } from './ui/SceneHUD';

function createSceneById(id: SceneId): HolidayScene {
  switch (id) {
    case 'express':
      return new WinterExpressScene();
    case 'caravan':
      return new ElectricCaravanScene();
    case 'flight3d':
      return new NorthPole3DScene();
    case 'snowglobe':
      return new SnowglobeScene();
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
  private tunnelRenderer = new BoringTunnelRenderer();

  private menu: MenuView;
  private hud: SceneHUD;

  private activeScene: HolidayScene | null = null;
  private wakeLockSentinel: WakeLockSentinel | null = null;
  private lastTimeMs = performance.now();

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
        onSelectMode: (id) => this.enterScene(id),
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

    this.hud = new SceneHUD(this.appRoot, this.telemetry, this.env, this.audio, this.elon, {
      onBackToMenu: () => this.returnToMenu(),
      onSwitchMode: (id) => this.enterScene(id),
      onQuickInteract: () => this.triggerSceneInteract(0.5, 0.42),
    });

    // Tapping anywhere on the canvas stage triggers scene interaction & wakes HUD
    this.stageEl.addEventListener('pointerdown', (e) => {
      this.hud.wake();
      if (!this.activeScene) return;
      const nx = e.clientX / Math.max(1, window.innerWidth);
      const ny = e.clientY / Math.max(1, window.innerHeight);
      this.triggerSceneInteract(nx, ny);
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
    if (this.activeScene.id === 'caravan') {
      this.audio.playLightWaveChime();
    } else if (this.activeScene.id === 'snowglobe') {
      this.audio.playGlobeShake();
    } else {
      this.audio.playSparkleChime();
    }
  }

  enterScene(id: SceneId): void {
    this.audio.unlock();
    if (this.activeScene) {
      this.activeScene.dispose();
      this.activeScene = null;
    }
    this.stageEl.innerHTML = '';

    const scene = createSceneById(id);
    scene.mount(this.stageEl);
    this.activeScene = scene;

    this.elon.reset();
    this.menu.hide();
    this.hud.setActiveMode(id);
    this.hud.show();
    this.requestWakeLock();
  }

  returnToMenu(): void {
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
    } else if (e.key === ' ' && this.activeScene) {
      e.preventDefault();
      this.triggerSceneInteract(0.5, 0.42);
    } else if (e.key.toLowerCase() === 't' && this.activeScene) {
      this.telemetry.setForceTunnel(!this.telemetry.getForceTunnel());
      this.hud.syncDrawerButtons();
    } else if (e.key.toLowerCase() === 'e' && this.activeScene) {
      this.elon.triggerNext();
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
    this.env.maybeRefreshWeather(frame.latitude, frame.longitude);
    const envState = this.env.getState();

    if (this.menu.isVisible()) {
      this.menu.update(dt, frame.elapsedSec);
    }

    if (this.activeScene) {
      const activeEvent = this.elon.update(dt, frame.isMoving);
      this.audio.update(dt, frame, activeEvent?.type ?? null);

      this.activeScene.update(dt, {
        telemetry: frame,
        env: envState,
        elonEvent: activeEvent,
        audio: this.audio,
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

    this.hud.update(dt, frame, envState);
    requestAnimationFrame((t) => this.tick(t));
  }
}

new TeslaXmasApp();
