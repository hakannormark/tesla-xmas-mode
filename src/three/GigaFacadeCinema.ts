import * as THREE from 'three';
import { getSoftGlowTexture } from './pixarMaterials';
import type { GigaFacadeSlot } from './ChristmasMap';

const GIGA_SCREEN_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GIGA_SCREEN_FRAG = /* glsl */ `
  uniform sampler2D uVideo;
  uniform float uTime;
  uniform float uReveal;
  uniform float uDaylight;
  uniform float uHasVideo;
  varying vec2 vUv;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 centered = vUv - 0.5;
    float boxDist = sdRoundedBox(centered, vec2(0.478, 0.468), 0.024);
    float innerMask = 1.0 - smoothstep(-0.014, 0.008, boxDist);
    if (innerMask < 0.004) discard;

    // Smooth vertical power-on curtain wipe with crisp ice-cyan scanline edge
    float wipePos = 1.0 - uReveal;
    float curtain = smoothstep(wipePos - 0.06, wipePos + 0.02, vUv.y);
    float scanLine = exp(-pow((vUv.y - wipePos) * 34.0, 2.0)) * step(0.01, uReveal) * (1.0 - smoothstep(0.92, 1.0, uReveal));

    vec3 col = vec3(0.03, 0.06, 0.12);
    if (uHasVideo > 0.5) {
      col = texture2D(uVideo, vUv).rgb;
    }

    // Crisp architectural micro-LED playback + ultra-subtle panel seam sheen + diagonal glass sweep
    float panelGrid = 0.985 + 0.015 * sin(vUv.x * 96.0);
    float ledPitch = 0.99 + 0.01 * sin(vUv.y * 180.0);
    float glossSweep = exp(-pow(((vUv.x * 0.72 + vUv.y * 0.45) - fract(uTime * 0.09) * 1.6 + 0.25) * 9.0, 2.0)) * 0.075;

    col = min(pow(max(col, vec3(0.0)), vec3(0.96)) * panelGrid * ledPitch * mix(1.04, 1.12, uDaylight), vec3(0.96));
    col += vec3(0.58, 0.92, 1.0) * glossSweep * (1.0 - uDaylight * 0.45);
    col += vec3(0.45, 0.95, 1.0) * scanLine * 0.95;

    // Subtle dark glass vignette at very outer bezel edge
    float bezelShade = 1.0 - smoothstep(-0.035, 0.005, boxDist) * 0.35;
    col *= bezelShade;

    float alpha = innerMask * clamp(curtain + scanLine * 0.8, 0.0, 1.0) * uReveal;
    if (alpha < 0.004) discard;

    gl_FragColor = vec4(col, alpha);
  }
`;

interface SlotVisual {
  root: THREE.Group;
  bezel: THREE.Mesh;
  topAccent: THREE.Mesh;
  bottomAccent: THREE.Mesh;
  screen: THREE.Mesh;
  halo: THREE.Mesh;
  haloMat: THREE.MeshBasicMaterial;
}

const POOL_SIZE = 10;

export class GigaFacadeCinema {
  readonly group = new THREE.Group();

  private readonly pool: SlotVisual[] = [];
  private activeSlotIds = new Set<string>();
  private readonly screenMat: THREE.ShaderMaterial;
  private readonly bezelGeo = new THREE.BoxGeometry(1, 1, 0.2);
  private readonly accentGeo = new THREE.BoxGeometry(1, 0.08, 0.06);
  private readonly planeGeo = new THREE.PlaneGeometry(1, 1);
  private readonly bezelMat = new THREE.MeshStandardMaterial({
    color: '#131924',
    metalness: 0.78,
    roughness: 0.26,
  });
  private readonly accentMat = new THREE.MeshBasicMaterial({
    color: '#e81e3c',
    toneMapped: false,
  });
  private visibleCount = 0;

  constructor() {
    this.group.name = 'Elonverse Giga Facade Cinema';
    this.group.visible = false;

    this.screenMat = new THREE.ShaderMaterial({
      vertexShader: GIGA_SCREEN_VERT,
      fragmentShader: GIGA_SCREEN_FRAG,
      uniforms: {
        uVideo: { value: null },
        uTime: { value: 0 },
        uReveal: { value: 0 },
        uDaylight: { value: 0 },
        uHasVideo: { value: 0 },
      },
      transparent: true,
      depthTest: true,
      depthWrite: false,
      side: THREE.FrontSide,
    });

    const glowTex = getSoftGlowTexture();
    for (let i = 0; i < POOL_SIZE; i++) {
      const root = new THREE.Group();
      root.visible = false;

      const bezel = new THREE.Mesh(this.bezelGeo, this.bezelMat);
      bezel.position.z = 0;
      bezel.castShadow = true;
      bezel.receiveShadow = true;

      const topAccent = new THREE.Mesh(this.accentGeo, this.accentMat);
      topAccent.position.z = 0.09;

      const bottomAccent = new THREE.Mesh(this.accentGeo, this.accentMat);
      bottomAccent.position.z = 0.09;

      const screen = new THREE.Mesh(this.planeGeo, this.screenMat);
      screen.position.z = 0.115;

      const haloMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        color: '#8ee6ff',
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const halo = new THREE.Mesh(this.planeGeo, haloMat);
      halo.position.z = 0.03;

      root.add(bezel, topAccent, bottomAccent, halo, screen);
      this.group.add(root);
      this.pool.push({ root, bezel, topAccent, bottomAccent, screen, halo, haloMat });
    }
  }

  getVisibleCount(): number {
    return this.visibleCount;
  }

  update(
    time: number,
    center: THREE.Vector3,
    heading: number,
    daylightFactor: number,
    reveal: number,
    hasVideoFrame: boolean,
    videoTex: THREE.VideoTexture | null,
    slots: GigaFacadeSlot[]
  ): void {
    if (reveal <= 0.002 || slots.length === 0) {
      this.group.visible = false;
      this.visibleCount = 0;
      this.activeSlotIds.clear();
      for (const item of this.pool) {
        item.root.visible = false;
      }
      return;
    }

    const fwdX = Math.sin(heading);
    const fwdZ = -Math.cos(heading);
    const scored: Array<{ slot: GigaFacadeSlot; score: number }> = [];

    for (const slot of slots) {
      const dx = slot.x - center.x;
      const dz = slot.z - center.z;
      const dist = Math.hypot(dx, dz);
      // Must face toward the viewer so we don't allocate slots to back walls
      const faceDot = -dx * slot.nx - dz * slot.nz;
      if (faceDot <= -2.5) continue;

      const ahead = dx * fwdX + dz * fwdZ;
      const aheadBonus = ahead > -10 ? -ahead * 0.45 : 60;
      const mainBonus = slot.isMainFace ? -8 : 0;
      const stickyBonus = this.activeSlotIds.has(slot.id) ? -18 : 0;
      const score = dist + aheadBonus + mainBonus + stickyBonus - Math.min(20, slot.width * 1.1);
      scored.push({ slot, score });
    }

    scored.sort((a, b) => a.score - b.score);

    const activeCount = Math.min(POOL_SIZE, scored.length);
    this.visibleCount = activeCount;
    this.group.visible = activeCount > 0;
    this.activeSlotIds.clear();
    for (let i = 0; i < activeCount; i++) {
      this.activeSlotIds.add(scored[i].slot.id);
    }

    this.screenMat.uniforms.uVideo.value = videoTex;
    this.screenMat.uniforms.uTime.value = time;
    this.screenMat.uniforms.uReveal.value = reveal;
    this.screenMat.uniforms.uDaylight.value = daylightFactor;
    this.screenMat.uniforms.uHasVideo.value = hasVideoFrame && videoTex ? 1 : 0;

    const haloOpacity = reveal * (1 - daylightFactor * 0.72) * 0.26;

    for (let i = 0; i < POOL_SIZE; i++) {
      const item = this.pool[i];
      if (i >= activeCount) {
        item.root.visible = false;
        continue;
      }

      const slot = scored[i].slot;
      item.root.visible = true;
      item.root.position.set(slot.x, slot.y, slot.z);
      item.root.rotation.set(0, slot.yaw, 0);

      item.bezel.scale.set(slot.width + 0.44, slot.height + 0.36, 1);
      item.topAccent.scale.set(slot.width + 0.48, 1, 1);
      item.topAccent.position.y = slot.height * 0.5 + 0.16;
      item.bottomAccent.scale.set(slot.width + 0.48, 1, 1);
      item.bottomAccent.position.y = -(slot.height * 0.5 + 0.16);
      item.screen.scale.set(slot.width, slot.height, 1);
      item.halo.scale.set(slot.width * 1.48, slot.height * 1.48, 1);
      item.haloMat.opacity = haloOpacity;
    }
  }

  dispose(): void {
    this.bezelGeo.dispose();
    this.accentGeo.dispose();
    this.planeGeo.dispose();
    this.bezelMat.dispose();
    this.accentMat.dispose();
    this.screenMat.dispose();
    for (const item of this.pool) {
      item.haloMat.dispose();
    }
  }
}
