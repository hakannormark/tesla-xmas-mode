import * as THREE from 'three';
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
  fsdContrast?: boolean;
}

export interface KeyShadowOptions {
  mapSize?: number;
  extent?: number;
  near?: number;
  far?: number;
  normalBias?: number;
  bias?: number;
  type?: THREE.ShadowMapType;
}

/**
 * Procedural Nordic winter twilight / aurora + cool snow-bounce environment scene
 * baked once via PMREMGenerator so metallic/clearcoat vehicles and snow catch authentic
 * moonlight, northern lights, distant village warmth, and upward snow bounce instead of
 * indoor studio boxes.
 */
function createWinterEnvironmentScene(): { envScene: THREE.Scene; dispose: () => void } {
  const envScene = new THREE.Scene();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const domeGeo = new THREE.SphereGeometry(30, 32, 20);
  const domeMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    toneMapped: false,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float y = d.y;
        float az = atan(d.z, d.x);

        // Upper hemisphere: deep arctic zenith -> twilight cobalt -> soft horizon glow
        vec3 zenith = vec3(0.05, 0.11, 0.27);
        vec3 midSky = vec3(0.14, 0.28, 0.56);
        vec3 horizon = vec3(0.46, 0.56, 0.78);
        vec3 upper = mix(horizon, midSky, smoothstep(0.0, 0.34, max(0.0, y)));
        upper = mix(upper, zenith, smoothstep(0.28, 0.92, max(0.0, y)));

        // Subtle warm Nordic twilight dusk blush along western horizon (pole-safe normalize)
        vec2 horiz = vec2(d.x, d.z);
        float horizLen = length(horiz);
        vec2 horizDir = horizLen > 0.0001 ? horiz / horizLen : vec2(1.0, 0.0);
        float duskArc = pow(max(0.0, dot(horizDir, normalize(vec2(-0.7, 0.5)))), 2.5);
        upper += vec3(0.58, 0.34, 0.28) * duskArc * exp(-abs(y - 0.04) * 11.0) * 0.65;

        // Emerald / cyan / violet aurora ribbons for crisp clearcoat reflections
        float wave1 = 0.28 + 0.07 * sin(az * 3.0 + 0.5);
        float wave2 = 0.44 + 0.06 * cos(az * 4.0 - 0.8);
        float a1 = exp(-pow((y - wave1) * 7.5, 2.0));
        float a2 = exp(-pow((y - wave2) * 8.5, 2.0));
        upper += vec3(0.18, 1.15, 0.82) * a1 * 0.72;
        upper += vec3(0.28, 0.72, 1.25) * a2 * 0.52;

        // Bright crisp moonlight key specular lobe (HDR > 1 for vivid metallic glint)
        vec3 moonDir = normalize(vec3(-0.62, 0.52, 0.38));
        float moonDot = max(0.0, dot(d, moonDir));
        upper += vec3(1.0, 0.94, 0.82) * (pow(moonDot, 42.0) * 3.6 + pow(moonDot, 6.0) * 0.35);

        // Cool cyan-silver rim lobe opposite moon for car silhouette separation
        vec3 rimDir = normalize(vec3(0.58, 0.36, -0.73));
        float rimDot = max(0.0, dot(d, rimDir));
        upper += vec3(0.52, 0.88, 1.0) * pow(rimDot, 16.0) * 1.45;

        // Lower hemisphere: bright cool snow-ground bounce (grounds metallic lower panels)
        vec3 snowHorizon = vec3(0.46, 0.58, 0.78);
        vec3 snowNadir = vec3(0.20, 0.28, 0.44);
        vec3 lower = mix(snowHorizon, snowNadir, smoothstep(0.0, 0.85, max(0.0, -y)));

        vec3 col = mix(lower, upper, smoothstep(-0.06, 0.06, y));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  geometries.push(domeGeo);
  materials.push(domeMat);
  envScene.add(new THREE.Mesh(domeGeo, domeMat));

  // Distant warm village/streetlamp reflection accents around the horizon ring
  const lampGeo = new THREE.PlaneGeometry(3.2, 1.6);
  const lampMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1.9, 1.32, 0.74),
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  geometries.push(lampGeo);
  materials.push(lampMat);

  const lampAngles = [0.35, 1.45, 2.55, 3.85, 5.1];
  for (const ang of lampAngles) {
    const card = new THREE.Mesh(lampGeo, lampMat);
    const r = 24;
    card.position.set(Math.cos(ang) * r, 1.1, Math.sin(ang) * r);
    card.lookAt(0, 1.1, 0);
    envScene.add(card);
  }

  return {
    envScene,
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
  };
}

/**
 * Unified 3D Pixar Cinema rendering pipeline:
 * WebGLRenderer + ACES Filmic Tone Mapping + Winter Sky/Aurora/Snow-Bounce PMREM IBL +
 * MSAA EffectComposer + Quarter-Res UnrealBloomPass (soft photographic halation).
 */
export class PixarStage {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly keyLight: THREE.DirectionalLight;

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
  private fsdContrast: boolean;
  private baseFogDensity: number;
  private curWidth: number;
  private curHeight: number;
  private shadowExtent = 60;
  private shadowMapSize = 1024;
  private readonly shadowFwd = new THREE.Vector3();
  private readonly shadowRight = new THREE.Vector3();
  private readonly shadowUp = new THREE.Vector3();
  private readonly shadowSnapped = new THREE.Vector3();
  private readonly shadowWorldUp = new THREE.Vector3(0, 1, 0);

  constructor(container: HTMLElement, opts: PixarStageOptions = {}) {
    this.curWidth = Math.max(1, container.clientWidth || window.innerWidth);
    this.curHeight = Math.max(1, container.clientHeight || window.innerHeight);
    this.quality = opts.initialQuality ?? 'ultra';
    this.fsdContrast = !!opts.fsdContrast;
    this.baseFogDensity = opts.fogDensity ?? 0;

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
    const winterEnv = createWinterEnvironmentScene();
    this.envRenderTarget = pmrem.fromScene(winterEnv.envScene, 0.03);
    this.scene.environment = this.envRenderTarget.texture;
    this.scene.environmentIntensity = 0.58;
    winterEnv.dispose();
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
    this.keyLight = this.moonKeyLight;
    this.scene.add(this.moonKeyLight, this.moonKeyLight.target);

    this.rimLight = new THREE.DirectionalLight('#54d8c5', 0.42);
    this.rimLight.position.set(-28, 18, -45);
    this.scene.add(this.rimLight);

    const maxSamples = this.renderer.capabilities.isWebGL2
      ? Math.min(4, this.renderer.capabilities.maxSamples || 0)
      : 0;
    const composerTarget = new THREE.WebGLRenderTarget(this.curWidth, this.curHeight, {
      type: THREE.HalfFloatType,
      samples: maxSamples,
    });
    this.composer = new EffectComposer(this.renderer, composerTarget);
    this.composer.setPixelRatio(dpr);
    this.composer.setSize(this.curWidth, this.curHeight);

    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(
        Math.max(1, Math.floor(this.curWidth * 0.25)),
        Math.max(1, Math.floor(this.curHeight * 0.25))
      ),
      this.baseBloomStrength,
      opts.bloomRadius ?? 0.50,
      opts.bloomThreshold ?? 0.80
    );
    this.composer.addPass(this.bloomPass);

    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);

    this.applyBloomQuarterResolution();
    this.setQuality(this.quality);
  }

  /**
   * Enables shadow casting on the unified key directional light so scenes do not need
   * an extra shadow-only DirectionalLight (keeping total global lights at 3).
   */
  enableKeyShadow(opts: KeyShadowOptions = {}): THREE.DirectionalLight {
    const mapSize = opts.mapSize ?? 1024;
    const extent = opts.extent ?? 60;
    this.shadowMapSize = mapSize;
    this.shadowExtent = extent;

    this.moonKeyLight.castShadow = true;
    this.moonKeyLight.shadow.mapSize.set(mapSize, mapSize);
    this.moonKeyLight.shadow.camera.left = -extent;
    this.moonKeyLight.shadow.camera.right = extent;
    this.moonKeyLight.shadow.camera.top = extent;
    this.moonKeyLight.shadow.camera.bottom = -extent;
    this.moonKeyLight.shadow.camera.near = opts.near ?? 1;
    this.moonKeyLight.shadow.camera.far = opts.far ?? 165;
    this.moonKeyLight.shadow.normalBias = opts.normalBias ?? 0.08;
    this.moonKeyLight.shadow.bias = opts.bias ?? -0.0004;
    this.moonKeyLight.shadow.camera.updateProjectionMatrix();

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = opts.type ?? THREE.PCFSoftShadowMap;
    return this.moonKeyLight;
  }

  /**
   * Moves the key shadow frustum with the camera/target while snapping its anchor onto
   * light-space shadow-map texel increments to eliminate shadow-edge crawling while driving.
   */
  updateKeyShadowFocus(targetPos: THREE.Vector3, offset: THREE.Vector3): void {
    const texelSize = (this.shadowExtent * 2) / Math.max(1, this.shadowMapSize);
    this.shadowFwd.copy(offset).normalize();
    this.shadowRight.crossVectors(this.shadowWorldUp, this.shadowFwd);
    if (this.shadowRight.lengthSq() < 1e-6) {
      this.shadowRight.set(1, 0, 0);
    } else {
      this.shadowRight.normalize();
    }
    this.shadowUp.crossVectors(this.shadowFwd, this.shadowRight).normalize();

    const u = Math.floor(targetPos.dot(this.shadowRight) / texelSize) * texelSize;
    const v = Math.floor(targetPos.dot(this.shadowUp) / texelSize) * texelSize;
    const w = targetPos.dot(this.shadowFwd);

    this.shadowSnapped
      .set(0, 0, 0)
      .addScaledVector(this.shadowRight, u)
      .addScaledVector(this.shadowUp, v)
      .addScaledVector(this.shadowFwd, w);

    this.moonKeyLight.target.position.copy(this.shadowSnapped);
    this.moonKeyLight.position.copy(this.shadowSnapped).add(offset);
    this.moonKeyLight.target.updateMatrixWorld();
  }

  private applyBloomQuarterResolution(): void {
    const dpr = this.getTargetDpr();
    // UnrealBloomPass.setSize(w, h) internally halves (w, h) for renderTargetBright & mip 0,
    // so passing 0.5x framebuffer size yields exact quarter-res (0.25x) bloom targets (~75% less fill-rate).
    const halfFbW = Math.max(2, Math.floor(this.curWidth * dpr * 0.5));
    const halfFbH = Math.max(2, Math.floor(this.curHeight * dpr * 0.5));
    this.bloomPass.resolution.set(
      Math.max(1, Math.floor(this.curWidth * 0.25)),
      Math.max(1, Math.floor(this.curHeight * 0.25))
    );
    this.bloomPass.setSize(halfFbW, halfFbH);
  }

  setAtmosphere(daylightFactor: number, blueHourFactor: number, fogHex: string): void {
    const d = THREE.MathUtils.clamp(daylightFactor, 0, 1);
    const b = THREE.MathUtils.clamp(blueHourFactor, 0, 1);

    if (this.fsdContrast) {
      if (this.moonKeyLight.castShadow) {
        // Unified shadow-casting key light carries both moonlight/sunlight & cozy warmth
        this.hemiLight.intensity = 0.36 + d * 0.72 + b * 0.18;
        this.moonKeyLight.intensity = 1.24 + d * 0.72 + b * 0.3;
      } else {
        this.hemiLight.intensity = 0.28 + d * 0.86 + b * 0.2;
        this.moonKeyLight.intensity = 0.44 + d * 1.15 + b * 0.24;
      }
      this.scene.environmentIntensity = 0.42 + d * 0.42 + b * 0.14;
      if (this.scene.fog instanceof THREE.FogExp2 && this.baseFogDensity > 0) {
        this.scene.fog.density = this.baseFogDensity * (1.06 - d * 0.42);
      }
    } else {
      this.hemiLight.intensity = 0.56 + d * 0.72 + b * 0.16;
      this.moonKeyLight.intensity = 0.88 + d * 0.95 + b * 0.25;
      this.scene.environmentIntensity = 0.58 + d * 0.24;
    }
    if (d > 0.65) {
      this.moonKeyLight.color.set('#fff2dc');
    } else if (b > 0.4) {
      this.moonKeyLight.color.set(this.moonKeyLight.castShadow ? '#ffc9a6' : '#ffb88c');
    } else {
      this.moonKeyLight.color.set(
        this.fsdContrast ? (this.moonKeyLight.castShadow ? '#ede2d2' : '#b4d0ff') : '#ffdfae'
      );
    }
    this.rimLight.intensity = (this.fsdContrast ? 0.36 : 0.42) + b * 0.24 - d * 0.15;

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
    this.applyBloomQuarterResolution();
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
    this.moonKeyLight.shadow.map?.dispose();
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
