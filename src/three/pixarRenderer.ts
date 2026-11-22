import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GraphicsQuality } from '../core/environment';
import { i18n } from '../core/i18n';

export interface PixarStageOptions {
  fov?: number;
  near?: number;
  far?: number;
  fogColor?: string;
  fogDensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  exposure?: number;
  initialQuality?: GraphicsQuality;
}

/**
 * Unified 3D Pixar Cinema rendering pipeline:
 * WebGLRenderer + ACES Filmic Tone Mapping + PMREM studio reflections +
 * EffectComposer + UnrealBloomPass (for soft photographic Disney/Coca-Cola halation).
 */
export class PixarStage {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;

  private composer: EffectComposer;
  private bloomPass: UnrealBloomPass;
  private hemiLight: THREE.HemisphereLight;
  private moonKeyLight: THREE.DirectionalLight;
  private rimLight: THREE.DirectionalLight;
  private baseBloomStrength: number;
  private baseExposure: number;
  private fogTargetColor = new THREE.Color('#0c1b42');
  private envRenderTarget: THREE.WebGLRenderTarget;
  private quality: GraphicsQuality = 'ultra';
  private curWidth: number;
  private curHeight: number;

  constructor(container: HTMLElement, opts: PixarStageOptions = {}) {
    this.curWidth = Math.max(1, container.clientWidth || window.innerWidth);
    this.curHeight = Math.max(1, container.clientHeight || window.innerHeight);
    this.quality = opts.initialQuality ?? 'ultra';

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    const dpr = this.getTargetDpr();
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.curWidth, this.curHeight);
    this.baseExposure = opts.exposure ?? 1.02;
    this.baseBloomStrength = opts.bloomStrength ?? 0.42;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = this.baseExposure;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.className = 'scene-canvas';
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#050b1f');
    if (opts.fogDensity && opts.fogDensity > 0) {
      this.scene.fog = new THREE.FogExp2(opts.fogColor ?? '#081436', opts.fogDensity);
    }

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    this.envRenderTarget = pmrem.fromScene(roomEnv, 0.04);
    this.scene.environment = this.envRenderTarget.texture;
    this.scene.environmentIntensity = 0.36;
    roomEnv.dispose();
    pmrem.dispose();

    this.camera = new THREE.PerspectiveCamera(
      opts.fov ?? 50,
      this.curWidth / this.curHeight,
      opts.near ?? 0.2,
      opts.far ?? 450
    );

    this.hemiLight = new THREE.HemisphereLight('#7ba8ef', '#111b3a', 0.56);
    this.scene.add(this.hemiLight);

    this.moonKeyLight = new THREE.DirectionalLight('#ffdfae', 0.88);
    this.moonKeyLight.position.set(28, 42, -32);
    this.scene.add(this.moonKeyLight);

    this.rimLight = new THREE.DirectionalLight('#54d8c5', 0.42);
    this.rimLight.position.set(-28, 18, -45);
    this.scene.add(this.rimLight);

    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(dpr);
    this.composer.setSize(this.curWidth, this.curHeight);

    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(
        Math.max(1, Math.floor(this.curWidth * 0.5)),
        Math.max(1, Math.floor(this.curHeight * 0.5))
      ),
      this.baseBloomStrength,
      opts.bloomRadius ?? 0.50,
      opts.bloomThreshold ?? 0.80
    );
    this.composer.addPass(this.bloomPass);

    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);

    this.setQuality(this.quality);
  }

  setAtmosphere(daylightFactor: number, blueHourFactor: number, fogHex: string): void {
    const d = THREE.MathUtils.clamp(daylightFactor, 0, 1);
    const b = THREE.MathUtils.clamp(blueHourFactor, 0, 1);

    this.hemiLight.intensity = 0.56 + d * 0.72 + b * 0.16;
    this.moonKeyLight.intensity = 0.88 + d * 0.95 + b * 0.25;
    if (d > 0.65) {
      this.moonKeyLight.color.set('#fff3db');
    } else if (b > 0.4) {
      this.moonKeyLight.color.set('#ffb88c');
    } else {
      this.moonKeyLight.color.set('#ffdfae');
    }
    this.rimLight.intensity = 0.42 + b * 0.24 - d * 0.15;

    if (this.scene.fog instanceof THREE.FogExp2) {
      this.fogTargetColor.set(fogHex);
      this.scene.fog.color.lerp(this.fogTargetColor, 0.12);
    }
    this.bloomPass.strength = Math.max(0.18, this.baseBloomStrength * (1 - d * 0.52));
    this.renderer.toneMappingExposure = this.baseExposure + d * 0.08;
  }

  private getTargetDpr(): number {
    const cap = this.quality === 'eco' ? 1.1 : 1.5;
    return Math.min(window.devicePixelRatio || 1, cap);
  }

  setQuality(quality: GraphicsQuality): void {
    if (this.quality === quality && this.bloomPass.enabled === (quality === 'ultra')) {
      return;
    }
    this.quality = quality;
    const dpr = this.getTargetDpr();
    this.renderer.setPixelRatio(dpr);
    this.composer.setPixelRatio(dpr);
    this.bloomPass.enabled = quality === 'ultra';
    this.resize(this.curWidth, this.curHeight);
  }

  resize(width: number, height: number): void {
    this.curWidth = Math.max(1, width);
    this.curHeight = Math.max(1, height);
    this.camera.aspect = this.curWidth / this.curHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.curWidth, this.curHeight);
    this.composer.setSize(this.curWidth, this.curHeight);
    this.bloomPass.resolution.set(
      Math.max(1, Math.floor(this.curWidth * 0.5)),
      Math.max(1, Math.floor(this.curHeight * 0.5))
    );
  }

  render(): void {
    if (this.quality === 'ultra') {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  dispose(): void {
    this.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      const mat = mesh.material;
      if (Array.isArray(mat)) {
        mat.forEach((m) => m.dispose());
      } else if (mat) {
        mat.dispose();
      }
    });
    this.envRenderTarget.dispose();
    this.bloomPass.dispose();
    this.composer.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

export function createPixarStageOrFallback(
  container: HTMLElement,
  opts: PixarStageOptions = {}
): { stage: PixarStage | null; fallbackEl: HTMLElement | null } {
  try {
    const stage = new PixarStage(container, opts);
    return { stage, fallbackEl: null };
  } catch {
    const t = i18n.t();
    const div = document.createElement('div');
    div.className = 'webgl-fallback';
    div.innerHTML = `<div class="webgl-fallback-card"><h2>${t.webglFallbackTitle}</h2><p>${t.webglFallbackText}</p></div>`;
    container.appendChild(div);
    return { stage: null, fallbackEl: div };
  }
}
