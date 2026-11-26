import * as THREE from 'three';
import type { HolidayThemeId } from '../core/environment';
import {
  resolveSkyCinemaUrl,
  SKY_CINEMA_TEST_CLIPS,
  type SkyCinemaClip,
} from '../core/skyCinemaClips';

type CinemaState = 'idle' | 'entering' | 'playing' | 'exiting';

const SCREEN_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SCREEN_FRAG = /* glsl */ `
  uniform sampler2D uVideo;
  uniform float uTime;
  uniform float uReveal;
  uniform float uDaylight;
  uniform float uThemeMode;
  uniform float uHasVideo;
  varying vec2 vUv;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 centered = vUv - 0.5;
    float edgeRipple =
      sin(vUv.x * 16.0 + uTime * 1.4) * 0.008 +
      cos(vUv.y * 12.0 - uTime * 1.1) * 0.008;

    float boxDist = sdRoundedBox(centered, vec2(0.455, 0.445), 0.045) + edgeRipple;

    // Soft organic aurora-feathered outer mask
    float innerMask = 1.0 - smoothstep(-0.045, 0.028, boxDist);
    float rimBand = exp(-pow(boxDist / 0.036, 2.0));
    float outerHalo = exp(-max(0.0, boxDist) * 16.0) * 0.55;

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

    // Subtle holographic scanline shimmer (2.5%) without hurting face legibility
    float scan = 0.975 + 0.025 * sin(vUv.y * 240.0 + uTime * 3.0);
    videoCol *= scan * 0.92;

    float luma = dot(videoCol, vec3(0.299, 0.587, 0.114));
    // Deep blacks turn semi-translucent so stars & northern lights glimmer softly through shadows
    float contentAlpha = mix(0.54, 0.96, smoothstep(0.03, 0.32, luma));

    // Gentle aurora tint along outer feathered margin
    float edgeTintMix = smoothstep(-0.06, 0.02, boxDist);
    vec3 screenCol = mix(videoCol, auroraRim * 1.15, edgeTintMix * 0.58);
    screenCol += auroraRim * rimBand * (0.72 + 0.22 * sin(uTime * 1.8 + vUv.x * 7.0));
    screenCol += auroraRim * outerHalo * 0.52;
    screenCol += mix(emerald, vec3(1.0, 0.88, 0.54), 0.45) * revealCrest * 1.1;

    float dayFade = mix(1.0, 0.78, uDaylight);
    float alpha = (innerMask * contentAlpha + rimBand * 0.65 + outerHalo * 0.38) * curtainWave * uReveal * dayFade;
    alpha = clamp(alpha, 0.0, 0.98);
    if (alpha < 0.004) discard;

    gl_FragColor = vec4(screenCol, alpha);
  }
`;

const VEIL_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const VEIL_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform float uDaylight;
  uniform float uThemeMode;
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
    float alpha = radialX * vertical * curtains * shimmer * 0.42 * uReveal * nightVis;
    if (alpha < 0.003) discard;

    gl_FragColor = vec4(col * 1.18, alpha);
  }
`;

function curveGeometryHorizontally(geo: THREE.PlaneGeometry, radius: number): void {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const zOffset = (x * x) / (2 * radius);
    pos.setZ(i, pos.getZ(i) + zOffset);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

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

  private state: CinemaState = 'idle';
  private reveal = 0;
  private activeIndex = 0;
  private hasPlaced = false;
  private cinemaHeading = 0;
  private hasVideoFrame = false;
  private playToken = 0;
  private hasRequestedPlayback = false;

  constructor() {
    this.group.name = 'Elonverse Sky Cinema';
    this.group.visible = false;

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
    const veilGeo = new THREE.PlaneGeometry(124, 78, 24, 12);
    curveGeometryHorizontally(veilGeo, 240);
    this.veilMat = new THREE.ShaderMaterial({
      vertexShader: VEIL_VERT,
      fragmentShader: VEIL_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0 },
        uDaylight: { value: 0 },
        uThemeMode: { value: 0 },
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

    // Layer 1: Curved luminous holographic screen
    const screenGeo = new THREE.PlaneGeometry(68, 38.25, 36, 12);
    curveGeometryHorizontally(screenGeo, 195);
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
      },
      transparent: true,
      depthWrite: false,
      fog: false,
      side: THREE.FrontSide,
    });
    const screenMesh = new THREE.Mesh(screenGeo, this.screenMat);
    screenMesh.renderOrder = 2;
    screenMesh.frustumCulled = false;

    // Layer 3: Floating caption plate directly beneath screen
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
    const captionMesh = new THREE.Mesh(new THREE.PlaneGeometry(48, 6.0), this.captionMat);
    captionMesh.position.set(0, -21.0, 0.8);
    captionMesh.renderOrder = 3;
    captionMesh.frustumCulled = false;

    this.group.add(veilMesh, screenMesh, captionMesh);
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

    if (!this.hasPlaced) {
      this.cinemaHeading = heading;
      this.hasPlaced = true;
    } else {
      const dHead = Math.atan2(
        Math.sin(heading - this.cinemaHeading),
        Math.cos(heading - this.cinemaHeading)
      );
      this.cinemaHeading += dHead * (1 - Math.exp(-dt * 1.8));
    }

    const east = Math.sin(this.cinemaHeading);
    const north = Math.cos(this.cinemaHeading);
    const dist = 152;
    const floatY = center.y + 34.5 + Math.sin(time * 0.55) * 0.65;

    this.group.position.set(center.x + east * dist, floatY, center.z - north * dist);
    this.group.rotation.order = 'YXZ';
    this.group.rotation.y = -this.cinemaHeading;
    this.group.rotation.x = 0.07;
    this.group.rotation.z = Math.sin(time * 0.35) * 0.014 + 0.012;

    const themeMode = theme === 'cyber2099' ? 2.0 : theme === 'nordic' ? 1.0 : 0.0;
    const smoothReveal = THREE.MathUtils.smoothstep(this.reveal, 0, 1);

    this.screenMat.uniforms.uTime.value = time;
    this.screenMat.uniforms.uReveal.value = smoothReveal;
    this.screenMat.uniforms.uDaylight.value = daylightFactor;
    this.screenMat.uniforms.uThemeMode.value = themeMode;
    this.screenMat.uniforms.uHasVideo.value = this.hasVideoFrame || this.video.readyState >= 2 ? 1 : 0;

    this.veilMat.uniforms.uTime.value = time;
    this.veilMat.uniforms.uReveal.value = smoothReveal;
    this.veilMat.uniforms.uDaylight.value = daylightFactor;
    this.veilMat.uniforms.uThemeMode.value = themeMode;

    this.captionMat.opacity = smoothReveal * (1 - daylightFactor * 0.16);
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
