import * as THREE from 'three';
import type { HolidayThemeId } from '../core/environment';
import {
  resolveSkyCinemaUrl,
  SKY_CINEMA_TEST_CLIPS,
  type SkyCinemaClip,
} from '../core/skyCinemaClips';

export type SkyCinemaMode = 'skyvault' | 'aurora' | 'oblique' | 'classic';
export type SkyCinemaSurface = 'sky' | 'giga' | 'both';

export const SKY_CINEMA_SURFACES: ReadonlyArray<{
  id: SkyCinemaSurface;
  label: string;
  shortLabel: string;
}> = [
  { id: 'sky', label: 'Himmel', shortLabel: '✦ Himmel' },
  { id: 'giga', label: 'Giga-fasad', shortLabel: '▣ Giga-fasad' },
  { id: 'both', label: 'Båda', shortLabel: '◈ Båda' },
];

export interface SkyCinemaModeSpec {
  id: SkyCinemaMode;
  label: string;
  shortLabel: string;
  description: string;
  radius: number;
  elevation: number;
  azimuth: number;
  roll: number;
  heightRad: number;
  widthRad: number;
  domeWrap: number;
  edgeSoftness: number;
  ovalMix: number;
  frameStrength: number;
  minAlpha: number;
  maxAlpha: number;
  vibrance: number;
  veilOpacity: number;
  captionOpacity: number;
}

export const SKY_CINEMA_MODES: readonly SkyCinemaModeSpec[] = [
  {
    id: 'skyvault',
    label: 'Himlavalv',
    shortLabel: 'Himlavalv',
    description: 'Stor duk på själva himlavalvet bakom bergen, lätt vinklad',
    radius: 670,
    elevation: 0.215,
    azimuth: 0.08,
    roll: -0.055,
    heightRad: 0.265,
    widthRad: 0.472,
    domeWrap: 1.0,
    edgeSoftness: 0.92,
    ovalMix: 0.34,
    frameStrength: 0.05,
    minAlpha: 0.24,
    maxAlpha: 0.95,
    vibrance: 1.08,
    veilOpacity: 0.42,
    captionOpacity: 0.0,
  },
  {
    id: 'aurora',
    label: 'Norrsken',
    shortLabel: 'Norrsken',
    description: 'Tydligare norrskensbio rakt fram på himlavalvet',
    radius: 670,
    elevation: 0.21,
    azimuth: 0.0,
    roll: 0.012,
    heightRad: 0.255,
    widthRad: 0.454,
    domeWrap: 0.95,
    edgeSoftness: 0.78,
    ovalMix: 0.24,
    frameStrength: 0.09,
    minAlpha: 0.3,
    maxAlpha: 0.96,
    vibrance: 1.12,
    veilOpacity: 0.48,
    captionOpacity: 0.0,
  },
  {
    id: 'oblique',
    label: 'Sned sky',
    shortLabel: 'Sned sky',
    description: 'Längre åt sidan och snett krökt över natthimlen',
    radius: 670,
    elevation: 0.225,
    azimuth: -0.165,
    roll: 0.115,
    heightRad: 0.26,
    widthRad: 0.463,
    domeWrap: 1.15,
    edgeSoftness: 1.05,
    ovalMix: 0.5,
    frameStrength: 0.04,
    minAlpha: 0.22,
    maxAlpha: 0.94,
    vibrance: 1.08,
    veilOpacity: 0.38,
    captionOpacity: 0.0,
  },
  {
    id: 'classic',
    label: 'Klassisk ram',
    shortLabel: 'Ram',
    description: 'Närmare bioduk med tydlig norrskensram',
    radius: 155,
    elevation: 0.19,
    azimuth: 0.0,
    roll: 0.012,
    heightRad: 0.235,
    widthRad: 0.418,
    domeWrap: 0.22,
    edgeSoftness: 0.22,
    ovalMix: 0.0,
    frameStrength: 0.72,
    minAlpha: 0.5,
    maxAlpha: 0.96,
    vibrance: 0.96,
    veilOpacity: 0.4,
    captionOpacity: 1.0,
  },
];

const MODE_STORAGE_KEY = 'tesla-xmas-cinema-mode';

function getModeSpec(mode: SkyCinemaMode): SkyCinemaModeSpec {
  return SKY_CINEMA_MODES.find((m) => m.id === mode) ?? SKY_CINEMA_MODES[0];
}

export function normalizeSkyCinemaMode(raw: string | null | undefined): SkyCinemaMode | null {
  if (raw === 'skyvault' || raw === 'aurora' || raw === 'oblique' || raw === 'classic') {
    return raw;
  }
  if (raw === 'celestial') return 'skyvault';
  if (raw === 'mist') return 'oblique';
  return null;
}

function loadSavedMode(): SkyCinemaMode {
  try {
    const normalized = normalizeSkyCinemaMode(localStorage.getItem(MODE_STORAGE_KEY));
    if (normalized) return normalized;
  } catch {
    // Ignore storage errors
  }
  return 'skyvault';
}

type CinemaState = 'idle' | 'entering' | 'playing' | 'exiting';

const SKY_PATCH_VERT = /* glsl */ `
  uniform float uRadius;
  uniform float uElevation;
  uniform float uAzimuth;
  uniform float uRoll;
  uniform vec2 uAngularSize;
  uniform float uDomeWrap;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec2 ang = position.xy * uAngularSize;
    float cr = cos(uRoll);
    float sr = sin(uRoll);
    vec2 rotAng = vec2(ang.x * cr - ang.y * sr, ang.x * sr + ang.y * cr);
    float az = uAzimuth + rotAng.x;
    float el = uElevation + rotAng.y;

    float cosEl = cos(el);
    vec3 spherePos = vec3(sin(az) * cosEl, sin(el), -cos(az) * cosEl) * uRadius;

    vec3 centerDir = vec3(
      sin(uAzimuth) * cos(uElevation),
      sin(uElevation),
      -cos(uAzimuth) * cos(uElevation)
    );
    vec3 rightDir = normalize(vec3(cos(uAzimuth), 0.0, sin(uAzimuth)));
    vec3 upDir = normalize(cross(rightDir, centerDir));
    vec3 planePos = centerDir * uRadius + rightDir * (rotAng.x * uRadius) + upDir * (rotAng.y * uRadius);

    vec3 finalPos = mix(planePos, spherePos, uDomeWrap);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
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
  uniform float uVibrance;
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
    shapeDist += auroraWisp * (0.015 + 0.052 * uEdgeSoftness);

    float softNorm = clamp(uEdgeSoftness, 0.0, 1.35) / 1.35;
    float featherIn = mix(-0.045, -0.175, softNorm);
    float featherOut = mix(0.025, 0.055, softNorm);
    float innerMask = 1.0 - smoothstep(featherIn, featherOut, shapeDist);

    float rimBand = exp(-pow(shapeDist / 0.036, 2.0)) * uFrameStrength;
    float outerHalo = exp(-max(0.0, shapeDist) * 14.0) * (0.24 + 0.34 * uFrameStrength);

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

    // Subtle holographic scanline shimmer (2%) + clear vibrant sky projection
    float scan = 0.98 + 0.02 * sin(vUv.y * 240.0 + uTime * 3.0);
    videoCol = min(pow(max(videoCol, vec3(0.0)), vec3(0.95)) * uVibrance * scan, vec3(1.05));

    float luma = dot(videoCol, vec3(0.299, 0.587, 0.114));
    float contentAlpha = mix(uMinAlpha, uMaxAlpha, smoothstep(0.04, 0.34, luma));

    // Gentle aurora tint blending along outer feathered margin so edges melt into sky
    float edgeTintMix = smoothstep(featherIn * 0.85, featherOut, shapeDist);
    vec3 screenCol = mix(videoCol, auroraRim * 0.95, edgeTintMix * (0.34 + 0.24 * uFrameStrength));
    screenCol += auroraRim * rimBand * (0.72 + 0.22 * sin(uTime * 1.8 + vUv.x * 7.0));
    screenCol += auroraRim * outerHalo * 0.36;
    screenCol += mix(emerald, vec3(1.0, 0.88, 0.54), 0.45) * revealCrest * 0.95;

    float dayFade = mix(1.0, 0.78, uDaylight);
    float alpha = (innerMask * contentAlpha + rimBand * 0.65 + outerHalo * 0.26) * curtainWave * uReveal * dayFade;
    alpha = clamp(alpha, 0.0, 0.98);
    if (alpha < 0.004) discard;

    gl_FragColor = vec4(screenCol, alpha);
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
  private skyVisible = true;

  private mode: SkyCinemaMode = loadSavedMode();
  private curRadius: number;
  private curElevation: number;
  private curAzimuth: number;
  private curRoll: number;
  private curHeightRad: number;
  private curWidthRad: number;
  private curDomeWrap: number;
  private curEdgeSoftness: number;
  private curOvalMix: number;
  private curFrameStrength: number;
  private curMinAlpha: number;
  private curMaxAlpha: number;
  private curVibrance: number;
  private curVeilOpacity: number;
  private curCaptionOpacity: number;

  constructor() {
    this.group.name = 'Elonverse Sky Cinema';
    this.group.visible = false;

    const initial = getModeSpec(this.mode);
    this.curRadius = initial.radius;
    this.curElevation = initial.elevation;
    this.curAzimuth = initial.azimuth;
    this.curRoll = initial.roll;
    this.curHeightRad = initial.heightRad;
    this.curWidthRad = initial.widthRad;
    this.curDomeWrap = initial.domeWrap;
    this.curEdgeSoftness = initial.edgeSoftness;
    this.curOvalMix = initial.ovalMix;
    this.curFrameStrength = initial.frameStrength;
    this.curMinAlpha = initial.minAlpha;
    this.curMaxAlpha = initial.maxAlpha;
    this.curVibrance = initial.vibrance;
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

    // Layer 2: Rising aurora projection veil curved behind the sky-vault patch
    const veilGeo = new THREE.PlaneGeometry(1, 1, 32, 16);
    this.veilMat = new THREE.ShaderMaterial({
      vertexShader: SKY_PATCH_VERT,
      fragmentShader: VEIL_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0 },
        uDaylight: { value: 0 },
        uThemeMode: { value: 0 },
        uRadius: { value: this.curRadius + 12 },
        uElevation: { value: this.curElevation - 0.025 },
        uAzimuth: { value: this.curAzimuth },
        uRoll: { value: this.curRoll * 0.7 },
        uAngularSize: { value: new THREE.Vector2(this.curWidthRad * 1.75, this.curHeightRad * 1.85) },
        uDomeWrap: { value: this.curDomeWrap },
        uVeilOpacity: { value: this.curVeilOpacity },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
      side: THREE.FrontSide,
    });
    const veilMesh = new THREE.Mesh(veilGeo, this.veilMat);
    veilMesh.renderOrder = 1;
    veilMesh.frustumCulled = false;

    // Layer 1: Curved spherical sky-vault cinema patch
    const screenGeo = new THREE.PlaneGeometry(1, 1, 48, 24);
    this.screenMat = new THREE.ShaderMaterial({
      vertexShader: SKY_PATCH_VERT,
      fragmentShader: SCREEN_FRAG,
      uniforms: {
        uVideo: { value: this.videoTex },
        uTime: { value: 0 },
        uReveal: { value: 0 },
        uDaylight: { value: 0 },
        uThemeMode: { value: 0 },
        uHasVideo: { value: 0 },
        uRadius: { value: this.curRadius },
        uElevation: { value: this.curElevation },
        uAzimuth: { value: this.curAzimuth },
        uRoll: { value: this.curRoll },
        uAngularSize: { value: new THREE.Vector2(this.curWidthRad, this.curHeightRad) },
        uDomeWrap: { value: this.curDomeWrap },
        uEdgeSoftness: { value: this.curEdgeSoftness },
        uOvalMix: { value: this.curOvalMix },
        uFrameStrength: { value: this.curFrameStrength },
        uMinAlpha: { value: this.curMinAlpha },
        uMaxAlpha: { value: this.curMaxAlpha },
        uVibrance: { value: this.curVibrance },
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
    this.curRadius = spec.radius;
    this.curElevation = spec.elevation;
    this.curAzimuth = spec.azimuth;
    this.curRoll = spec.roll;
    this.curHeightRad = spec.heightRad;
    this.curWidthRad = spec.widthRad;
    this.curDomeWrap = spec.domeWrap;
    this.curEdgeSoftness = spec.edgeSoftness;
    this.curOvalMix = spec.ovalMix;
    this.curFrameStrength = spec.frameStrength;
    this.curMinAlpha = spec.minAlpha;
    this.curMaxAlpha = spec.maxAlpha;
    this.curVibrance = spec.vibrance;
    this.curVeilOpacity = spec.veilOpacity;
    this.curCaptionOpacity = spec.captionOpacity;
  }

  private dampModeParams(dt: number, spec: SkyCinemaModeSpec): void {
    const k = 4.2;
    this.curRadius = THREE.MathUtils.damp(this.curRadius, spec.radius, k, dt);
    this.curElevation = THREE.MathUtils.damp(this.curElevation, spec.elevation, k, dt);
    this.curAzimuth = THREE.MathUtils.damp(this.curAzimuth, spec.azimuth, k, dt);
    this.curRoll = THREE.MathUtils.damp(this.curRoll, spec.roll, k, dt);
    this.curHeightRad = THREE.MathUtils.damp(this.curHeightRad, spec.heightRad, k, dt);
    this.curWidthRad = THREE.MathUtils.damp(this.curWidthRad, spec.widthRad, k, dt);
    this.curDomeWrap = THREE.MathUtils.damp(this.curDomeWrap, spec.domeWrap, k, dt);
    this.curEdgeSoftness = THREE.MathUtils.damp(this.curEdgeSoftness, spec.edgeSoftness, k, dt);
    this.curOvalMix = THREE.MathUtils.damp(this.curOvalMix, spec.ovalMix, k, dt);
    this.curFrameStrength = THREE.MathUtils.damp(this.curFrameStrength, spec.frameStrength, k, dt);
    this.curMinAlpha = THREE.MathUtils.damp(this.curMinAlpha, spec.minAlpha, k, dt);
    this.curMaxAlpha = THREE.MathUtils.damp(this.curMaxAlpha, spec.maxAlpha, k, dt);
    this.curVibrance = THREE.MathUtils.damp(this.curVibrance, spec.vibrance, k, dt);
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

  setSkyVisible(visible: boolean): void {
    this.skyVisible = visible;
    if (!visible) {
      this.group.visible = false;
    } else if (this.state !== 'idle') {
      this.group.visible = true;
    }
  }

  getVideoTexture(): THREE.VideoTexture {
    return this.videoTex;
  }

  getHasVideoFrame(): boolean {
    return this.hasVideoFrame || this.video.readyState >= 2;
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

    this.group.visible = this.skyVisible;
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
      this.cinemaHeading += dHead * (1 - Math.exp(-dt * 1.4));
      this.dampModeParams(dt, targetSpec);
    }

    // Center the sky-vault dome around the viewer so the projection truly sits on the celestial sphere
    this.group.position.copy(center);
    this.group.rotation.set(0, -this.cinemaHeading, 0);
    this.group.scale.setScalar(1);

    const driftEl = Math.sin(time * 0.42) * 0.003;
    const driftRoll = Math.sin(time * 0.3) * 0.008;
    const themeMode = theme === 'cyber2099' ? 2.0 : theme === 'nordic' ? 1.0 : 0.0;
    const smoothReveal = THREE.MathUtils.smoothstep(this.reveal, 0, 1);

    this.screenMat.uniforms.uTime.value = time;
    this.screenMat.uniforms.uReveal.value = smoothReveal;
    this.screenMat.uniforms.uDaylight.value = daylightFactor;
    this.screenMat.uniforms.uThemeMode.value = themeMode;
    this.screenMat.uniforms.uHasVideo.value = this.hasVideoFrame || this.video.readyState >= 2 ? 1 : 0;
    this.screenMat.uniforms.uRadius.value = this.curRadius;
    this.screenMat.uniforms.uElevation.value = this.curElevation + driftEl;
    this.screenMat.uniforms.uAzimuth.value = this.curAzimuth;
    this.screenMat.uniforms.uRoll.value = this.curRoll + driftRoll;
    this.screenMat.uniforms.uAngularSize.value.set(this.curWidthRad, this.curHeightRad);
    this.screenMat.uniforms.uDomeWrap.value = this.curDomeWrap;
    this.screenMat.uniforms.uEdgeSoftness.value = this.curEdgeSoftness;
    this.screenMat.uniforms.uOvalMix.value = this.curOvalMix;
    this.screenMat.uniforms.uFrameStrength.value = this.curFrameStrength;
    this.screenMat.uniforms.uMinAlpha.value = this.curMinAlpha;
    this.screenMat.uniforms.uMaxAlpha.value = this.curMaxAlpha;
    this.screenMat.uniforms.uVibrance.value = this.curVibrance;

    this.veilMat.uniforms.uTime.value = time;
    this.veilMat.uniforms.uReveal.value = smoothReveal;
    this.veilMat.uniforms.uDaylight.value = daylightFactor;
    this.veilMat.uniforms.uThemeMode.value = themeMode;
    this.veilMat.uniforms.uRadius.value = this.curRadius + 12.0;
    this.veilMat.uniforms.uElevation.value = this.curElevation - 0.025 + driftEl;
    this.veilMat.uniforms.uAzimuth.value = this.curAzimuth;
    this.veilMat.uniforms.uRoll.value = (this.curRoll + driftRoll) * 0.7;
    this.veilMat.uniforms.uAngularSize.value.set(this.curWidthRad * 1.75, this.curHeightRad * 1.85);
    this.veilMat.uniforms.uDomeWrap.value = this.curDomeWrap;
    this.veilMat.uniforms.uVeilOpacity.value = this.curVeilOpacity;

    const showCap = this.curCaptionOpacity > 0.02;
    this.captionMesh.visible = showCap;
    if (showCap) {
      const elCap = this.curElevation - this.curHeightRad * 0.58 + driftEl;
      const rCap = this.curRadius - 1.0;
      const cosElCap = Math.cos(elCap);
      this.captionMesh.position.set(
        Math.sin(this.curAzimuth) * cosElCap * rCap,
        Math.sin(elCap) * rCap,
        -Math.cos(this.curAzimuth) * cosElCap * rCap
      );
      this.captionMesh.rotation.order = 'YXZ';
      this.captionMesh.rotation.set(elCap, -this.curAzimuth, this.curRoll + driftRoll);
      this.captionMat.opacity = smoothReveal * this.curCaptionOpacity * (1 - daylightFactor * 0.16);
    }
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
