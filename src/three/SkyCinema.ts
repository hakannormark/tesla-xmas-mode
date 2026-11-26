import * as THREE from 'three';
import type { HolidayThemeId } from '../core/environment';
import {
  resolveSkyCinemaUrl,
  SKY_CINEMA_TEST_CLIPS,
  type SkyCinemaClip,
} from '../core/skyCinemaClips';

export type SkyCinemaMode = 'aurora' | 'celestial' | 'mist' | 'classic';

export interface SkyCinemaModeSpec {
  id: SkyCinemaMode;
  label: string;
  shortLabel: string;
  description: string;
  dist: number;
  height: number;
  scale: number;
  tiltX: number;
  curveH: number;
  curveV: number;
  edgeSoftness: number;
  ovalMix: number;
  frameStrength: number;
  minAlpha: number;
  maxAlpha: number;
  veilOpacity: number;
  captionOpacity: number;
}

export const SKY_CINEMA_MODES: readonly SkyCinemaModeSpec[] = [
  {
    id: 'aurora',
    label: 'Norrsken',
    shortLabel: 'Norrsken',
    description: 'Högt i himlen, mjukt integrerad i norrskenet',
    dist: 235,
    height: 59,
    scale: 1.18,
    tiltX: 0.34,
    curveH: 1.0,
    curveV: 0.75,
    edgeSoftness: 1.05,
    ovalMix: 0.38,
    frameStrength: 0.06,
    minAlpha: 0.14,
    maxAlpha: 0.88,
    veilOpacity: 0.34,
    captionOpacity: 0.0,
  },
  {
    id: 'celestial',
    label: 'Hög himmel',
    shortLabel: 'Hög himmel',
    description: 'Längre bort och högre upp, vinklad ned mot dig',
    dist: 285,
    height: 74,
    scale: 1.28,
    tiltX: 0.45,
    curveH: 1.35,
    curveV: 1.15,
    edgeSoftness: 1.28,
    ovalMix: 0.55,
    frameStrength: 0.03,
    minAlpha: 0.09,
    maxAlpha: 0.84,
    veilOpacity: 0.28,
    captionOpacity: 0.0,
  },
  {
    id: 'mist',
    label: 'Stjärndimma',
    shortLabel: 'Stjärndimma',
    description: 'Mjuk oval utan hörn som smälter in i skyn',
    dist: 215,
    height: 53,
    scale: 1.14,
    tiltX: 0.26,
    curveH: 0.9,
    curveV: 0.65,
    edgeSoftness: 1.2,
    ovalMix: 0.96,
    frameStrength: 0.02,
    minAlpha: 0.11,
    maxAlpha: 0.9,
    veilOpacity: 0.36,
    captionOpacity: 0.0,
  },
  {
    id: 'classic',
    label: 'Klassisk ram',
    shortLabel: 'Ram',
    description: 'Närmare bioduk med tydlig norrskensram',
    dist: 152,
    height: 34.5,
    scale: 1.0,
    tiltX: 0.08,
    curveH: 0.55,
    curveV: 0.0,
    edgeSoftness: 0.22,
    ovalMix: 0.0,
    frameStrength: 0.72,
    minAlpha: 0.5,
    maxAlpha: 0.96,
    veilOpacity: 0.42,
    captionOpacity: 1.0,
  },
];

const MODE_STORAGE_KEY = 'tesla-xmas-cinema-mode';

function getModeSpec(mode: SkyCinemaMode): SkyCinemaModeSpec {
  return SKY_CINEMA_MODES.find((m) => m.id === mode) ?? SKY_CINEMA_MODES[0];
}

function loadSavedMode(): SkyCinemaMode {
  try {
    const raw = localStorage.getItem(MODE_STORAGE_KEY);
    if (raw === 'aurora' || raw === 'celestial' || raw === 'mist' || raw === 'classic') {
      return raw;
    }
  } catch {
    // Ignore storage errors
  }
  return 'aurora';
}

type CinemaState = 'idle' | 'entering' | 'playing' | 'exiting';

const SCREEN_VERT = /* glsl */ `
  uniform float uCurveH;
  uniform float uCurveV;
  uniform vec2 uPlaneSize;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    vec2 n = (uv - 0.5) * 2.0;
    pos.z += (n.x * n.x) * uPlaneSize.x * 0.08 * uCurveH + (n.y * n.y) * uPlaneSize.y * 0.12 * uCurveV;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const SCREEN_FRAG = /* glsl */ `
  uniform sampler2D uVideo;
  uniform float uTime;
  uniform float uReveal;
  uniform float uDaylight;
  uniform float uThemeMode;
  uniform float uHasVideo;
  uniform float uEdgeSoftness;
  uniform float uOvalMix;
  uniform float uFrameStrength;
  uniform float uMinAlpha;
  uniform float uMaxAlpha;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float vNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 centered = vUv - 0.5;
    float wispA = vNoise(vec2(vUv.x * 5.2 + uTime * 0.12, vUv.y * 4.4 - uTime * 0.08));
    float wispB = vNoise(vec2(vUv.x * 10.5 - uTime * 0.18, vUv.y * 9.0 + uTime * 0.14));
    float auroraWisp = (wispA * 0.65 + wispB * 0.35) - 0.5;

    float boxDist = sdRoundedBox(centered, vec2(0.455, 0.445), 0.045);
    float ovalDist = length(centered * vec2(2.08, 2.12)) * 0.48 - 0.415;
    float shapeDist = mix(boxDist, ovalDist, clamp(uOvalMix, 0.0, 1.0));
    shapeDist += auroraWisp * (0.015 + 0.055 * uEdgeSoftness);

    float softNorm = clamp(uEdgeSoftness, 0.0, 1.35) / 1.35;
    float featherIn = mix(-0.045, -0.23, softNorm);
    float featherOut = mix(0.025, 0.055, softNorm);
    float innerMask = 1.0 - smoothstep(featherIn, featherOut, shapeDist);

    float rimBand = exp(-pow(shapeDist / 0.036, 2.0)) * uFrameStrength;
    float outerHalo = exp(-max(0.0, shapeDist) * 14.0) * (0.28 + 0.32 * uFrameStrength);

    // Curtain reveal sweep from center outward
    float curtainDist = abs(centered.y) * 1.15 + abs(centered.x) * 0.25;
    float curtainWave = smoothstep(curtainDist - 0.14, curtainDist + 0.02, uReveal * 1.18);
    float revealCrest = exp(-pow((curtainDist - uReveal * 1.08) * 9.0, 2.0)) * step(0.02, uReveal) * (1.0 - smoothstep(0.88, 1.0, uReveal));

    vec3 emerald = uThemeMode > 1.5 ? vec3(0.15, 0.92, 1.0) : vec3(0.14, 0.96, 0.68);
    vec3 cyan = vec3(0.24, 0.84, 1.0);
    vec3 violet = uThemeMode > 1.5 ? vec3(1.0, 0.28, 0.78) : vec3(0.62, 0.40, 1.0);

    float flow = 0.5 + 0.5 * sin(vUv.x * 6.28318 * 1.5 - uTime * 0.9 + vUv.y * 2.2);
    vec3 auroraRim = mix(mix(emerald, cyan, flow), violet, 0.35 + 0.35 * cos(vUv.y * 5.0 + uTime * 0.7));

    vec3 videoCol = vec3(0.04, 0.09, 0.18);
    if (uHasVideo > 0.5) {
      videoCol = texture2D(uVideo, vUv).rgb;
    }

    // Subtle holographic scanline shimmer (2%) without hurting face legibility
    float scan = 0.98 + 0.02 * sin(vUv.y * 240.0 + uTime * 3.0);
    videoCol *= scan * 0.92;

    float luma = dot(videoCol, vec3(0.299, 0.587, 0.114));
    float contentAlpha = mix(uMinAlpha, uMaxAlpha, smoothstep(0.04, 0.36, luma));

    // Gentle aurora tint blending along outer feathered margin so edges melt into sky
    float edgeTintMix = smoothstep(featherIn * 0.85, featherOut, shapeDist);
    vec3 screenCol = mix(videoCol, auroraRim * 0.95, edgeTintMix * (0.36 + 0.22 * uFrameStrength));
    screenCol += auroraRim * rimBand * (0.72 + 0.22 * sin(uTime * 1.8 + vUv.x * 7.0));
    screenCol += auroraRim * outerHalo * 0.36;
    screenCol += mix(emerald, vec3(1.0, 0.88, 0.54), 0.45) * revealCrest * 0.95;

    float dayFade = mix(1.0, 0.78, uDaylight);
    float alpha = (innerMask * contentAlpha + rimBand * 0.65 + outerHalo * 0.28) * curtainWave * uReveal * dayFade;
    alpha = clamp(alpha, 0.0, 0.98);
    if (alpha < 0.004) discard;

    gl_FragColor = vec4(screenCol, alpha);
  }
`;

const VEIL_VERT = /* glsl */ `
  uniform float uCurveH;
  uniform float uCurveV;
  uniform vec2 uPlaneSize;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    vec2 n = (uv - 0.5) * 2.0;
    pos.z += (n.x * n.x) * uPlaneSize.x * 0.08 * uCurveH + (n.y * n.y) * uPlaneSize.y * 0.12 * uCurveV;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const VEIL_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform float uDaylight;
  uniform float uThemeMode;
  uniform float uVeilOpacity;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;
    float radialX = exp(-pow(p.x / 0.34, 2.0));
    // Rising shafts from below the screen up through the aurora canopy
    float vertical = smoothstep(-0.49, -0.05, p.y) * exp(-max(0.0, p.y - 0.04) * 4.4);
    float curtains =
      0.55 +
      0.28 * sin(vUv.x * 22.0 + uTime * 0.9 + sin(vUv.y * 5.0)) +
      0.17 * cos(vUv.x * 38.0 - uTime * 1.3);
    float shimmer = 0.72 + 0.28 * sin(vUv.y * 9.0 - uTime * 1.6 + vUv.x * 4.0);

    vec3 emerald = uThemeMode > 1.5 ? vec3(0.12, 0.90, 1.0) : vec3(0.10, 0.95, 0.64);
    vec3 cyan = vec3(0.22, 0.80, 1.0);
    vec3 violet = uThemeMode > 1.5 ? vec3(0.95, 0.24, 0.76) : vec3(0.56, 0.34, 0.98);

    float mixT = clamp(vUv.y * 1.1 + 0.18 * sin(vUv.x * 5.0 + uTime * 0.4), 0.0, 1.0);
    vec3 col = mix(emerald, cyan, smoothstep(0.15, 0.62, mixT));
    col = mix(col, violet, smoothstep(0.55, 0.95, mixT));

    float nightVis = mix(1.0, 0.42, uDaylight);
    float alpha = radialX * vertical * curtains * shimmer * uVeilOpacity * uReveal * nightVis;
    if (alpha < 0.003) discard;

    gl_FragColor = vec4(col * 1.12, alpha);
  }
`;

export class SkyCinema {
  readonly group = new THREE.Group();

  private readonly video: HTMLVideoElement;
  private readonly videoTex: THREE.VideoTexture;
  private readonly screenMat: THREE.ShaderMaterial;
  private readonly veilMat: THREE.ShaderMaterial;
  private readonly captionCanvas: HTMLCanvasElement;
  private readonly captionCtx: CanvasRenderingContext2D;
  private readonly captionTex: THREE.CanvasTexture;
  private readonly captionMat: THREE.MeshBasicMaterial;
  private readonly captionMesh: THREE.Mesh;

  private state: CinemaState = 'idle';
  private reveal = 0;
  private activeIndex = 0;
  private hasPlaced = false;
  private cinemaHeading = 0;
  private hasVideoFrame = false;
  private playToken = 0;
  private hasRequestedPlayback = false;

  private mode: SkyCinemaMode = loadSavedMode();
  private curDist: number;
  private curHeight: number;
  private curScale: number;
  private curTiltX: number;
  private curCurveH: number;
  private curCurveV: number;
  private curEdgeSoftness: number;
  private curOvalMix: number;
  private curFrameStrength: number;
  private curMinAlpha: number;
  private curMaxAlpha: number;
  private curVeilOpacity: number;
  private curCaptionOpacity: number;

  constructor() {
    this.group.name = 'Elonverse Sky Cinema';
    this.group.visible = false;

    const initial = getModeSpec(this.mode);
    this.curDist = initial.dist;
    this.curHeight = initial.height;
    this.curScale = initial.scale;
    this.curTiltX = initial.tiltX;
    this.curCurveH = initial.curveH;
    this.curCurveV = initial.curveV;
    this.curEdgeSoftness = initial.edgeSoftness;
    this.curOvalMix = initial.ovalMix;
    this.curFrameStrength = initial.frameStrength;
    this.curMinAlpha = initial.minAlpha;
    this.curMaxAlpha = initial.maxAlpha;
    this.curVeilOpacity = initial.veilOpacity;
    this.curCaptionOpacity = initial.captionOpacity;

    this.video = document.createElement('video');
    this.video.playsInline = true;
    this.video.setAttribute('playsinline', '');
    this.video.preload = 'auto';
    this.video.crossOrigin = 'anonymous';
    this.video.loop = false;
    this.video.muted = false;
    this.video.volume = 0.9;

    this.video.addEventListener('loadeddata', () => {
      if (this.video.readyState >= 2) {
        this.hasVideoFrame = true;
        this.screenMat.uniforms.uHasVideo.value = 1;
      }
    });
    this.video.addEventListener('playing', () => {
      this.hasVideoFrame = true;
      this.screenMat.uniforms.uHasVideo.value = 1;
    });
    this.video.addEventListener('ended', () => {
      if (this.state === 'entering' || this.state === 'playing') {
        this.state = 'exiting';
      }
    });

    this.videoTex = new THREE.VideoTexture(this.video);
    this.videoTex.colorSpace = THREE.SRGBColorSpace;
    this.videoTex.minFilter = THREE.LinearFilter;
    this.videoTex.magFilter = THREE.LinearFilter;
    this.videoTex.generateMipmaps = false;

    // Layer 2: Rising aurora projection veil behind & beneath screen
    const veilGeo = new THREE.PlaneGeometry(132, 86, 28, 16);
    this.veilMat = new THREE.ShaderMaterial({
      vertexShader: VEIL_VERT,
      fragmentShader: VEIL_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0 },
        uDaylight: { value: 0 },
        uThemeMode: { value: 0 },
        uCurveH: { value: this.curCurveH },
        uCurveV: { value: this.curCurveV },
        uPlaneSize: { value: new THREE.Vector2(132, 86) },
        uVeilOpacity: { value: this.curVeilOpacity },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
      side: THREE.FrontSide,
    });
    const veilMesh = new THREE.Mesh(veilGeo, this.veilMat);
    veilMesh.position.set(0, -6, -4.5);
    veilMesh.renderOrder = 1;
    veilMesh.frustumCulled = false;

    // Layer 1: Curved luminous sky-integrated screen
    const screenGeo = new THREE.PlaneGeometry(68, 38.25, 40, 16);
    this.screenMat = new THREE.ShaderMaterial({
      vertexShader: SCREEN_VERT,
      fragmentShader: SCREEN_FRAG,
      uniforms: {
        uVideo: { value: this.videoTex },
        uTime: { value: 0 },
        uReveal: { value: 0 },
        uDaylight: { value: 0 },
        uThemeMode: { value: 0 },
        uHasVideo: { value: 0 },
        uCurveH: { value: this.curCurveH },
        uCurveV: { value: this.curCurveV },
        uPlaneSize: { value: new THREE.Vector2(68, 38.25) },
        uEdgeSoftness: { value: this.curEdgeSoftness },
        uOvalMix: { value: this.curOvalMix },
        uFrameStrength: { value: this.curFrameStrength },
        uMinAlpha: { value: this.curMinAlpha },
        uMaxAlpha: { value: this.curMaxAlpha },
      },
      transparent: true,
      depthWrite: false,
      fog: false,
      side: THREE.FrontSide,
    });
    const screenMesh = new THREE.Mesh(screenGeo, this.screenMat);
    screenMesh.renderOrder = 2;
    screenMesh.frustumCulled = false;

    // Layer 3: Floating caption plate (shown in 'classic' framed mode)
    this.captionCanvas = document.createElement('canvas');
    this.captionCanvas.width = 1024;
    this.captionCanvas.height = 128;
    this.captionCtx = this.captionCanvas.getContext('2d')!;
    this.captionTex = new THREE.CanvasTexture(this.captionCanvas);
    this.captionTex.colorSpace = THREE.SRGBColorSpace;
    this.captionMat = new THREE.MeshBasicMaterial({
      map: this.captionTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      fog: false,
      toneMapped: false,
    });
    this.captionMesh = new THREE.Mesh(new THREE.PlaneGeometry(48, 6.0), this.captionMat);
    this.captionMesh.position.set(0, -21.0, 0.8);
    this.captionMesh.renderOrder = 3;
    this.captionMesh.frustumCulled = false;
    this.captionMesh.visible = this.curCaptionOpacity > 0.02;

    this.group.add(veilMesh, screenMesh, this.captionMesh);
  }

  getMode(): SkyCinemaMode {
    return this.mode;
  }

  setMode(mode: SkyCinemaMode): void {
    this.mode = mode;
    try {
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      // Ignore storage errors
    }
    if (!this.hasPlaced) {
      this.snapToModeSpec(getModeSpec(mode));
    }
  }

  cycleMode(): SkyCinemaMode {
    const idx = SKY_CINEMA_MODES.findIndex((m) => m.id === this.mode);
    const next = SKY_CINEMA_MODES[(idx + 1) % SKY_CINEMA_MODES.length].id;
    this.setMode(next);
    return next;
  }

  private snapToModeSpec(spec: SkyCinemaModeSpec): void {
    this.curDist = spec.dist;
    this.curHeight = spec.height;
    this.curScale = spec.scale;
    this.curTiltX = spec.tiltX;
    this.curCurveH = spec.curveH;
    this.curCurveV = spec.curveV;
    this.curEdgeSoftness = spec.edgeSoftness;
    this.curOvalMix = spec.ovalMix;
    this.curFrameStrength = spec.frameStrength;
    this.curMinAlpha = spec.minAlpha;
    this.curMaxAlpha = spec.maxAlpha;
    this.curVeilOpacity = spec.veilOpacity;
    this.curCaptionOpacity = spec.captionOpacity;
  }

  private dampModeParams(dt: number, spec: SkyCinemaModeSpec): void {
    const k = 4.5;
    this.curDist = THREE.MathUtils.damp(this.curDist, spec.dist, k, dt);
    this.curHeight = THREE.MathUtils.damp(this.curHeight, spec.height, k, dt);
    this.curScale = THREE.MathUtils.damp(this.curScale, spec.scale, k, dt);
    this.curTiltX = THREE.MathUtils.damp(this.curTiltX, spec.tiltX, k, dt);
    this.curCurveH = THREE.MathUtils.damp(this.curCurveH, spec.curveH, k, dt);
    this.curCurveV = THREE.MathUtils.damp(this.curCurveV, spec.curveV, k, dt);
    this.curEdgeSoftness = THREE.MathUtils.damp(this.curEdgeSoftness, spec.edgeSoftness, k, dt);
    this.curOvalMix = THREE.MathUtils.damp(this.curOvalMix, spec.ovalMix, k, dt);
    this.curFrameStrength = THREE.MathUtils.damp(this.curFrameStrength, spec.frameStrength, k, dt);
    this.curMinAlpha = THREE.MathUtils.damp(this.curMinAlpha, spec.minAlpha, k, dt);
    this.curMaxAlpha = THREE.MathUtils.damp(this.curMaxAlpha, spec.maxAlpha, k, dt);
    this.curVeilOpacity = THREE.MathUtils.damp(this.curVeilOpacity, spec.veilOpacity, k, dt);
    this.curCaptionOpacity = THREE.MathUtils.damp(this.curCaptionOpacity, spec.captionOpacity, k, dt);
  }

  private drawCaption(clip: SkyCinemaClip, index: number, total: number): void {
    const w = this.captionCanvas.width;
    const h = this.captionCanvas.height;
    const ctx = this.captionCtx;
    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, 'rgba(6, 16, 36, 0.10)');
    grad.addColorStop(0.18, 'rgba(8, 22, 48, 0.84)');
    grad.addColorStop(0.82, 'rgba(8, 22, 48, 0.84)');
    grad.addColorStop(1, 'rgba(6, 16, 36, 0.10)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(16, 10, w - 32, h - 20, 26);
    ctx.fill();

    ctx.strokeStyle = 'rgba(104, 240, 200, 0.58)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#7fffe0';
    ctx.font = '700 20px Inter, sans-serif';
    ctx.fillText(
      `✦ ELONVERSE · RYMDBIO (${index + 1}/${total}) · ${clip.source} ${clip.year}`,
      w * 0.5,
      38,
      w - 84
    );

    ctx.fillStyle = '#fff9ec';
    ctx.font = '700 32px "Cinzel", Georgia, serif';
    ctx.fillText(`“${clip.titleSv}”`, w * 0.5, 84, w - 76);

    this.captionTex.needsUpdate = true;
  }

  async playClip(index: number, opts?: { allowMutedFallback?: boolean }): Promise<void> {
    const total = SKY_CINEMA_TEST_CLIPS.length;
    if (total === 0) return;

    const safeIdx = ((index % total) + total) % total;
    const clip = SKY_CINEMA_TEST_CLIPS[safeIdx];
    const token = ++this.playToken;

    this.activeIndex = safeIdx;
    this.hasRequestedPlayback = true;
    this.state = 'entering';
    this.group.visible = true;
    this.hasVideoFrame = false;
    this.screenMat.uniforms.uHasVideo.value = 0;
    this.drawCaption(clip, safeIdx, total);

    const url = resolveSkyCinemaUrl(clip.file);
    this.video.pause();
    this.video.src = url;
    this.video.currentTime = 0;
    this.video.muted = false;
    this.video.load();

    try {
      await this.video.play();
      if (token !== this.playToken) return;
      this.hasVideoFrame = true;
      this.screenMat.uniforms.uHasVideo.value = 1;
    } catch {
      if (token !== this.playToken) return;
      if (opts?.allowMutedFallback) {
        this.video.muted = true;
        try {
          await this.video.play();
          if (token !== this.playToken) return;
          this.hasVideoFrame = true;
          this.screenMat.uniforms.uHasVideo.value = 1;
        } catch {
          // Keep visual frame ready or stay softly visible if blocked
        }
      }
    }
  }

  toggle(): void {
    if (this.isActive()) {
      this.stop();
    } else {
      void this.playClip(this.activeIndex);
    }
  }

  nextClip(): void {
    void this.playClip(this.activeIndex + 1);
  }

  stop(): void {
    this.playToken++;
    if (this.state !== 'idle') {
      this.state = 'exiting';
    }
  }

  isActive(): boolean {
    return this.state === 'entering' || this.state === 'playing';
  }

  getIntensity(): number {
    return this.reveal;
  }

  getActiveClip(): { clip: SkyCinemaClip; index: number; total: number } | null {
    if (!this.isActive() && this.reveal <= 0.01) return null;
    const clip = SKY_CINEMA_TEST_CLIPS[this.activeIndex];
    if (!clip) return null;
    return { clip, index: this.activeIndex, total: SKY_CINEMA_TEST_CLIPS.length };
  }

  isMuted(): boolean {
    return this.video.muted;
  }

  setMuted(muted: boolean): void {
    this.video.muted = muted;
    if (!muted && this.isActive() && this.video.paused) {
      void this.video.play().catch(() => {});
    }
  }

  setVolume(vol: number): void {
    this.video.volume = Math.max(0, Math.min(1, vol));
  }

  shift(offset: THREE.Vector3): void {
    if (this.hasPlaced) {
      this.group.position.add(offset);
    }
  }

  update(
    dt: number,
    time: number,
    center: THREE.Vector3,
    heading: number,
    daylightFactor: number,
    theme: HolidayThemeId
  ): void {
    if (this.state === 'entering') {
      this.reveal = Math.min(1, this.reveal + dt / 1.15);
      if (this.reveal >= 1) this.state = 'playing';
    } else if (this.state === 'playing') {
      this.reveal = 1;
    } else if (this.state === 'exiting') {
      this.reveal = Math.max(0, this.reveal - dt / 0.9);
      if (this.reveal <= 0.001) {
        this.reveal = 0;
        this.state = 'idle';
        this.group.visible = false;
        this.hasPlaced = false;
        this.video.pause();
        if (this.hasRequestedPlayback) {
          this.video.removeAttribute('src');
          this.video.load();
          this.hasRequestedPlayback = false;
        }
        return;
      }
    }

    if (this.state === 'idle') {
      this.group.visible = false;
      return;
    }

    this.group.visible = true;
    const targetSpec = getModeSpec(this.mode);

    if (!this.hasPlaced) {
      this.cinemaHeading = heading;
      this.hasPlaced = true;
      this.snapToModeSpec(targetSpec);
    } else {
      const dHead = Math.atan2(
        Math.sin(heading - this.cinemaHeading),
        Math.cos(heading - this.cinemaHeading)
      );
      this.cinemaHeading += dHead * (1 - Math.exp(-dt * 1.8));
      this.dampModeParams(dt, targetSpec);
    }

    const east = Math.sin(this.cinemaHeading);
    const north = Math.cos(this.cinemaHeading);
    const floatY = center.y + this.curHeight + Math.sin(time * 0.55) * 0.65;

    this.group.scale.setScalar(this.curScale);
    this.group.position.set(center.x + east * this.curDist, floatY, center.z - north * this.curDist);
    this.group.rotation.order = 'YXZ';
    this.group.rotation.y = -this.cinemaHeading;
    this.group.rotation.x = this.curTiltX;
    this.group.rotation.z = Math.sin(time * 0.35) * 0.014 + 0.012;

    const themeMode = theme === 'cyber2099' ? 2.0 : theme === 'nordic' ? 1.0 : 0.0;
    const smoothReveal = THREE.MathUtils.smoothstep(this.reveal, 0, 1);

    this.screenMat.uniforms.uTime.value = time;
    this.screenMat.uniforms.uReveal.value = smoothReveal;
    this.screenMat.uniforms.uDaylight.value = daylightFactor;
    this.screenMat.uniforms.uThemeMode.value = themeMode;
    this.screenMat.uniforms.uHasVideo.value = this.hasVideoFrame || this.video.readyState >= 2 ? 1 : 0;
    this.screenMat.uniforms.uCurveH.value = this.curCurveH;
    this.screenMat.uniforms.uCurveV.value = this.curCurveV;
    this.screenMat.uniforms.uEdgeSoftness.value = this.curEdgeSoftness;
    this.screenMat.uniforms.uOvalMix.value = this.curOvalMix;
    this.screenMat.uniforms.uFrameStrength.value = this.curFrameStrength;
    this.screenMat.uniforms.uMinAlpha.value = this.curMinAlpha;
    this.screenMat.uniforms.uMaxAlpha.value = this.curMaxAlpha;

    this.veilMat.uniforms.uTime.value = time;
    this.veilMat.uniforms.uReveal.value = smoothReveal;
    this.veilMat.uniforms.uDaylight.value = daylightFactor;
    this.veilMat.uniforms.uThemeMode.value = themeMode;
    this.veilMat.uniforms.uCurveH.value = this.curCurveH;
    this.veilMat.uniforms.uCurveV.value = this.curCurveV;
    this.veilMat.uniforms.uVeilOpacity.value = this.curVeilOpacity;

    this.captionMesh.visible = this.curCaptionOpacity > 0.02;
    this.captionMat.opacity = smoothReveal * this.curCaptionOpacity * (1 - daylightFactor * 0.16);
  }

  dispose(): void {
    this.playToken++;
    this.video.pause();
    this.video.removeAttribute('src');
    this.video.load();
    this.videoTex.dispose();
    this.captionTex.dispose();
    this.group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material?.dispose();
        }
      }
    });
  }
}
