import * as THREE from 'three';
import { HolidayAudioEngine } from '../core/audioEngine';
import { BoringTunnelRenderer } from '../core/boringTunnel';
import { ElonEventDirector } from '../core/elonEvents';
import { EnvironmentManager, type EnvironmentState } from '../core/environment';
import { i18n, type ElonEventType } from '../core/i18n';
import type { LiveWorldState } from '../core/liveWorldData';
import { geoDeltaMeters, type OsmMapSnapshot } from '../core/osmWorld';
import type { TelemetryFrame } from '../core/telemetry';
import { FrostCanvasOverlay } from '../ui/FrostCanvas';
import type { ChristmasMap } from './ChristmasMap';
import { DriveTimeline } from './DriveTimeline';
import { LiveSkyRig } from './liveSkyRig';
import { MapLivingWorld } from './MapLivingWorld';
import { pointAlongStreet, streetAtCar } from './mappedRoads';
import { PixarElonRig } from './pixarElonEvents';
import { getSoftGlowTexture } from './pixarMaterials';
import type { PixarSleighHandle } from './pixarModels';
import {
  createAccurateCybertruck,
  createAccurateOptimusGen2,
  createAccurateTeslaSemi,
} from './teslaModels';
import { moonDirection } from './winterSurfaces';

const BURST_COUNT = 160;
const CHIMNEY_SPARK_COUNT = 72;
const PLOW_SPRAY_COUNT = 96;
const RING_POOL_COUNT = 8;
const ELON_CYCLE: ElonEventType[] = ['starlink', 'starship', 'starman', 'supercharger', 'cyberplow'];
const ZERO_ELEV = () => 0;

const FESTIVE_PARTICLE_VERT = /* glsl */ `
  attribute float aLife;
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uPixelRatio;
  uniform float uGrowOut;
  varying float vLife;
  varying vec3 vColor;

  void main() {
    vLife = aLife;
    vColor = aColor;
    if (aLife <= 0.001) {
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      gl_PointSize = 0.0;
      return;
    }
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float life = clamp(aLife, 0.0, 1.0);
    float curve = mix(
      mix(0.32, 1.18, sin(life * 3.14159265)),
      mix(1.5, 0.5, life),
      uGrowOut
    );
    float dist = max(1.5, -mvPosition.z);
    gl_PointSize = clamp((aSize * curve * 260.0 * uPixelRatio) / dist, 1.5, 96.0);
  }
`;

const FESTIVE_PARTICLE_FRAG = /* glsl */ `
  uniform float uOpacity;
  uniform float uStarMix;
  uniform vec3 uCoolTint;
  varying float vLife;
  varying vec3 vColor;

  void main() {
    if (vLife <= 0.001) discard;
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv) * 2.0;
    if (r > 1.0) discard;
    float radial = pow(max(0.0, 1.0 - r), 2.0);
    float spikeX = exp(-abs(uv.y) * 20.0) * max(0.0, 1.0 - abs(uv.x) * 2.1);
    float spikeY = exp(-abs(uv.x) * 20.0) * max(0.0, 1.0 - abs(uv.y) * 2.1);
    float star = (spikeX + spikeY) * 0.68;
    float shape = mix(radial, max(radial, star), uStarMix);
    float life = clamp(vLife, 0.0, 1.0);
    float fadeIn = 1.0 - smoothstep(0.92, 1.0, life);
    float fadeOut = smoothstep(0.0, 0.34, life);
    float alpha = shape * fadeIn * fadeOut * uOpacity;
    if (alpha < 0.004) discard;
    vec3 hot = mix(vColor, vec3(1.0, 0.99, 0.92), smoothstep(0.68, 1.0, life) * (0.5 * uStarMix + 0.15));
    vec3 col = mix(uCoolTint, hot, smoothstep(0.0, 0.72, life));
    gl_FragColor = vec4(col, alpha);
  }
`;

interface GiftProjectile {
  mesh: THREE.Group;
  active: boolean;
  t: number;
  start: THREE.Vector3;
  end: THREE.Vector3;
  bonusGifts: number;
  bonusKind?: 'town_tree' | 'snowman';
  onLand?: () => void;
}

interface SnowballProjectile {
  mesh: THREE.Mesh;
  active: boolean;
  t: number;
  start: THREE.Vector3;
  end: THREE.Vector3;
  onLand?: () => void;
}

interface WishStarTarget {
  id: string;
  mesh: THREE.Group;
  active: boolean;
  placed: boolean;
  worldX: number;
  worldZ: number;
  respawnTimer: number;
  aheadOffset: number;
  latOffset: number;
  heightOffset: number;
}

interface ExpandingRing {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  active: boolean;
  age: number;
  velocity: THREE.Vector3;
}

export class DriveFestivities {
  readonly environment = new EnvironmentManager();
  readonly audio = new HolidayAudioEngine();
  readonly director = new ElonEventDirector();
  readonly timeline: DriveTimeline;
  readonly livingWorld: MapLivingWorld;
  readonly frost = new FrostCanvasOverlay();

  private readonly sky = new LiveSkyRig();
  private readonly events = new PixarElonRig();
  private readonly tunnel = new BoringTunnelRenderer();
  private readonly tunnelCanvas = document.createElement('canvas');
  private readonly tunnelContext = this.tunnelCanvas.getContext('2d')!;
  private readonly effects = new THREE.Group();

  private readonly convoy = [
    { handle: createAccurateTeslaSemi('coca_cola'), dir: -1 as const, baseOffset: 98 },
    { handle: createAccurateTeslaSemi('tesla'), dir: -1 as const, baseOffset: 152 },
  ];
  readonly convoyPositions: Array<{ x: number; y: number; z: number; heading: number }> = [];
  private readonly convoyPosPool = [
    { x: 0, y: 0, z: 0, heading: 0 },
    { x: 0, y: 0, z: 0, heading: 0 },
  ];

  private readonly redLightOptimus = createAccurateOptimusGen2();
  private optimusAnchorPos: THREE.Vector3 | null = null;
  private optimusAnchorYaw = 0;
  private readonly redLightPlow = createAccurateCybertruck(true, true);
  private stoppedSec = 0;
  private plowActive = false;
  private plowProgress = 90;
  private plowCooldown = 0;

  private readonly giftPool: GiftProjectile[] = [];
  private readonly snowballPool: SnowballProjectile[] = [];
  private readonly wishStars: WishStarTarget[] = [];

  private readonly chimneyPts: THREE.Points;
  private readonly chimneyMat: THREE.ShaderMaterial;
  private readonly chimneyPos = new Float32Array(CHIMNEY_SPARK_COUNT * 3);
  private readonly chimneyVel = new Float32Array(CHIMNEY_SPARK_COUNT * 3);
  private readonly chimneyLife = new Float32Array(CHIMNEY_SPARK_COUNT);
  private readonly chimneyPosAttr: THREE.BufferAttribute;
  private readonly chimneyLifeAttr: THREE.BufferAttribute;
  private chimneyCursor = 0;
  private chimneyWasActive = false;

  private readonly burstPts: THREE.Points;
  private readonly burstMat: THREE.ShaderMaterial;
  private readonly burstPos = new Float32Array(BURST_COUNT * 3);
  private readonly burstVel = new Float32Array(BURST_COUNT * 3);
  private readonly burstLife = new Float32Array(BURST_COUNT);
  private readonly burstPosAttr: THREE.BufferAttribute;
  private readonly burstLifeAttr: THREE.BufferAttribute;
  private burstWasActive = false;

  private readonly plowSprayPts: THREE.Points;
  private readonly plowSprayMat: THREE.ShaderMaterial;
  private readonly plowSprayPos = new Float32Array(PLOW_SPRAY_COUNT * 3);
  private readonly plowSprayVel = new Float32Array(PLOW_SPRAY_COUNT * 3);
  private readonly plowSprayLife = new Float32Array(PLOW_SPRAY_COUNT);
  private readonly plowSprayPosAttr: THREE.BufferAttribute;
  private readonly plowSprayLifeAttr: THREE.BufferAttribute;
  private plowSprayCursor = 0;
  private plowSprayWasActive = false;

  private readonly rings: ExpandingRing[] = [];
  private readonly ringGeo = new THREE.TorusGeometry(1.15, 0.055, 8, 28);

  private readonly starmanAnchor = new THREE.Vector3();
  private readonly vertical = new THREE.Vector3(0, 1, 0);
  private readonly starshipOrigin = new THREE.Vector3(33, 27, -130);
  private readonly tmpSupercharger = new THREE.Vector3();
  private readonly tmpOptimusPos = new THREE.Vector3();
  private readonly tunnelFrame = {} as TelemetryFrame & { tunnelBlend: number };
  private activePlowSpot: { x: number; z: number; heading: number } | false | undefined = false;
  private activeGroundAt: (x: number, z: number) => number = ZERO_ELEV;
  private readonly eventRoadPointAt = (_progress: number, side: number, out: THREE.Vector3): THREE.Vector3 => {
    const plow = this.activePlowSpot;
    if (!plow) return out.set(0, 0, 0);
    out.set(plow.x + Math.cos(plow.heading) * side, 0, plow.z + Math.sin(plow.heading) * side);
    out.y = this.activeGroundAt(out.x, out.z);
    return this.effects.worldToLocal(out);
  };

  private automatic = true;
  private nextMagicMeters = 48;
  private automaticStep = 0;
  private nextLightWaveMeters = 20;
  private requestedLightWave = false;
  private previousFix?: { lat: number; lon: number };

  private tunnelBlend = 0;
  private giftsDelivered = 0;
  private starsCaught = 0;
  private crittersTapped = 0;
  private snowballsLanded = 0;
  private nextMilestoneScore = 5;
  private comboCount = 0;
  private comboTimer = 0;
  private convoyTime = 0;
  private hornFlashTimer = 0;
  private lightShowTimer = 0;
  private hoHoBannerUntil = 0;
  private sleighAlert = 0;
  private elonCycleIdx = 0;
  private lastChurchBellTime = -30;

  private statusText = '';
  private statusUntil = 0;
  private launchText = '';
  private time = 0;
  private eventHeading = 0;
  private lastHeading = 0;
  private lastCenter = new THREE.Vector3();
  private matchedStreet?: ReturnType<typeof streetAtCar>;
  private matchedAt = -Infinity;
  private snapshotVersion?: number;

  constructor(
    root: HTMLElement,
    world: HTMLElement,
    private readonly scene: THREE.Scene,
    private readonly sleigh: PixarSleighHandle,
    private readonly map: ChristmasMap
  ) {
    this.timeline = new DriveTimeline(root, scene);
    this.livingWorld = new MapLivingWorld(() => {
      this.map.villageLights.startWave(this.time, this.lastCenter, this.lastHeading);
    });
    scene.add(this.livingWorld.group);

    this.audio.setMixMode('muted');
    this.effects.add(this.sky.group, this.events.group);
    scene.add(this.effects);

    // 6-slot glossy wrapped Gift Cannon Pool
    const giftColors = ['#e01b3a', '#188a50', '#2b67d6'];
    const ribMat = new THREE.MeshStandardMaterial({ color: '#ffd166', metalness: 0.65, roughness: 0.24 });
    for (let i = 0; i < 6; i++) {
      const gg = new THREE.Group();
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.64, 0.64, 0.64),
        new THREE.MeshPhysicalMaterial({ color: giftColors[i % giftColors.length], roughness: 0.3, clearcoat: 0.6 })
      );
      const r1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.13), ribMat);
      const r2 = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.7, 0.7), ribMat);
      gg.add(box, r1, r2);
      gg.visible = false;
      scene.add(gg);
      this.giftPool.push({
        mesh: gg,
        active: false,
        t: 0,
        start: new THREE.Vector3(),
        end: new THREE.Vector3(),
        bonusGifts: 0,
      });
    }

    const softGlowTex = getSoftGlowTexture();
    // 4-slot Ice Snowball Pool
    const snowGeo = new THREE.SphereGeometry(0.36, 10, 10);
    const snowMat = new THREE.MeshPhysicalMaterial({
      color: '#e8f6ff',
      roughness: 0.45,
      clearcoat: 0.6,
      emissive: '#386496',
      emissiveIntensity: 0.35,
    });
    for (let i = 0; i < 4; i++) {
      const sb = new THREE.Mesh(snowGeo, snowMat);
      sb.visible = false;
      scene.add(sb);
      this.snowballPool.push({
        mesh: sb,
        active: false,
        t: 0,
        start: new THREE.Vector3(),
        end: new THREE.Vector3(),
      });
    }

    // 6-slot Collectible Floating Wish Stars (compact golden crystal + gentle halo, zero screen-blocking cross flares)
    const wishGeo = new THREE.OctahedronGeometry(0.46, 0);
    const wishMat = new THREE.MeshBasicMaterial({ color: '#ffe378', toneMapped: false });
    const wishHaloMat = new THREE.SpriteMaterial({
      map: softGlowTex,
      color: '#ffdf7e',
      transparent: true,
      opacity: 0.44,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const wishSlots = [
      { aheadOffset: 24, latOffset: -5.5, heightOffset: 2.4 },
      { aheadOffset: 42, latOffset: 6.2, heightOffset: 2.7 },
      { aheadOffset: 62, latOffset: -4.2, heightOffset: 2.9 },
      { aheadOffset: 82, latOffset: 5.0, heightOffset: 2.5 },
      { aheadOffset: 102, latOffset: -6.4, heightOffset: 3.0 },
      { aheadOffset: 122, latOffset: 4.0, heightOffset: 2.8 },
    ];
    wishSlots.forEach((slot, idx) => {
      const wg = new THREE.Group();
      const core = new THREE.Mesh(wishGeo, wishMat);
      const halo = new THREE.Sprite(wishHaloMat);
      halo.scale.set(1.75, 1.75, 1);
      wg.add(core, halo);
      wg.visible = false;
      scene.add(wg);
      this.wishStars.push({
        id: `wish-${idx}`,
        mesh: wg,
        active: true,
        placed: false,
        worldX: 0,
        worldZ: 0,
        respawnTimer: 0,
        ...slot,
      });
    });

    const pixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    // Soft-fade Chimney Sparks (ring-buffered custom ShaderMaterial)
    const chSizes = new Float32Array(CHIMNEY_SPARK_COUNT);
    const chColors = new Float32Array(CHIMNEY_SPARK_COUNT * 3);
    for (let i = 0; i < CHIMNEY_SPARK_COUNT; i++) {
      this.chimneyPos[i * 3 + 1] = -999;
      chSizes[i] = 0.34 + (i % 4) * 0.09;
      const warmGold = i % 3 !== 0;
      chColors[i * 3] = warmGold ? 1.0 : 1.0;
      chColors[i * 3 + 1] = warmGold ? 0.86 : 0.42;
      chColors[i * 3 + 2] = warmGold ? 0.38 : 0.32;
    }
    const chGeo = new THREE.BufferGeometry();
    this.chimneyPosAttr = new THREE.BufferAttribute(this.chimneyPos, 3);
    this.chimneyLifeAttr = new THREE.BufferAttribute(this.chimneyLife, 1);
    chGeo.setAttribute('position', this.chimneyPosAttr);
    chGeo.setAttribute('aLife', this.chimneyLifeAttr);
    chGeo.setAttribute('aSize', new THREE.BufferAttribute(chSizes, 1));
    chGeo.setAttribute('aColor', new THREE.BufferAttribute(chColors, 3));
    this.chimneyMat = new THREE.ShaderMaterial({
      vertexShader: FESTIVE_PARTICLE_VERT,
      fragmentShader: FESTIVE_PARTICLE_FRAG,
      uniforms: {
        uPixelRatio: { value: pixelRatio },
        uGrowOut: { value: 0.0 },
        uOpacity: { value: 0.92 },
        uStarMix: { value: 0.78 },
        uCoolTint: { value: new THREE.Color('#ff5436') },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    this.chimneyPts = new THREE.Points(chGeo, this.chimneyMat);
    this.chimneyPts.frustumCulled = false;
    this.chimneyPts.visible = false;
    scene.add(this.chimneyPts);

    // Soft-fade Golden Starburst Particles
    const burstSizes = new Float32Array(BURST_COUNT);
    const burstColors = new Float32Array(BURST_COUNT * 3);
    for (let i = 0; i < BURST_COUNT; i++) {
      this.burstPos[i * 3 + 1] = -999;
      burstSizes[i] = 0.32 + (i % 5) * 0.08;
      const kind = i % 3;
      burstColors[i * 3] = kind === 2 ? 0.55 : 1.0;
      burstColors[i * 3 + 1] = kind === 1 ? 0.34 : 0.90;
      burstColors[i * 3 + 2] = kind === 2 ? 1.0 : kind === 1 ? 0.42 : 0.45;
    }
    const burstGeo = new THREE.BufferGeometry();
    this.burstPosAttr = new THREE.BufferAttribute(this.burstPos, 3);
    this.burstLifeAttr = new THREE.BufferAttribute(this.burstLife, 1);
    burstGeo.setAttribute('position', this.burstPosAttr);
    burstGeo.setAttribute('aLife', this.burstLifeAttr);
    burstGeo.setAttribute('aSize', new THREE.BufferAttribute(burstSizes, 1));
    burstGeo.setAttribute('aColor', new THREE.BufferAttribute(burstColors, 3));
    this.burstMat = new THREE.ShaderMaterial({
      vertexShader: FESTIVE_PARTICLE_VERT,
      fragmentShader: FESTIVE_PARTICLE_FRAG,
      uniforms: {
        uPixelRatio: { value: pixelRatio },
        uGrowOut: { value: 0.0 },
        uOpacity: { value: 0.90 },
        uStarMix: { value: 0.80 },
        uCoolTint: { value: new THREE.Color('#ff6a4d') },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    this.burstPts = new THREE.Points(burstGeo, this.burstMat);
    this.burstPts.frustumCulled = false;
    this.burstPts.visible = false;
    scene.add(this.burstPts);

    // Soft-fade Cybertruck Snowplow Spray
    const plowSizes = new Float32Array(PLOW_SPRAY_COUNT);
    const plowColors = new Float32Array(PLOW_SPRAY_COUNT * 3);
    for (let i = 0; i < PLOW_SPRAY_COUNT; i++) {
      this.plowSprayPos[i * 3 + 1] = -999;
      plowSizes[i] = 0.52 + (i % 4) * 0.14;
      plowColors[i * 3] = 0.92;
      plowColors[i * 3 + 1] = 0.96;
      plowColors[i * 3 + 2] = 1.0;
    }
    const plowGeo = new THREE.BufferGeometry();
    this.plowSprayPosAttr = new THREE.BufferAttribute(this.plowSprayPos, 3);
    this.plowSprayLifeAttr = new THREE.BufferAttribute(this.plowSprayLife, 1);
    plowGeo.setAttribute('position', this.plowSprayPosAttr);
    plowGeo.setAttribute('aLife', this.plowSprayLifeAttr);
    plowGeo.setAttribute('aSize', new THREE.BufferAttribute(plowSizes, 1));
    plowGeo.setAttribute('aColor', new THREE.BufferAttribute(plowColors, 3));
    this.plowSprayMat = new THREE.ShaderMaterial({
      vertexShader: FESTIVE_PARTICLE_VERT,
      fragmentShader: FESTIVE_PARTICLE_FRAG,
      uniforms: {
        uPixelRatio: { value: pixelRatio },
        uGrowOut: { value: 1.0 },
        uOpacity: { value: 0.62 },
        uStarMix: { value: 0.0 },
        uCoolTint: { value: new THREE.Color('#b0d2f5') },
      },
      transparent: true,
      depthWrite: false,
    });
    this.plowSprayPts = new THREE.Points(plowGeo, this.plowSprayMat);
    this.plowSprayPts.frustumCulled = false;
    this.plowSprayPts.visible = false;
    scene.add(this.plowSprayPts);

    // Pre-pooled Expanding Star Rings (zero per-burst allocation/disposal)
    for (let i = 0; i < RING_POOL_COUNT; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: '#ffe588',
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(this.ringGeo, mat);
      mesh.visible = false;
      scene.add(mesh);
      this.rings.push({
        mesh,
        mat,
        active: false,
        age: 0,
        velocity: new THREE.Vector3(),
      });
    }

    for (const truck of this.convoy) {
      truck.handle.group.visible = false;
      scene.add(truck.handle.group);
    }

    this.redLightOptimus.group.scale.setScalar(1.32);
    this.redLightOptimus.group.visible = false;
    scene.add(this.redLightOptimus.group);

    this.redLightPlow.group.scale.setScalar(0.84);
    this.redLightPlow.group.visible = false;
    scene.add(this.redLightPlow.group);

    this.tunnelCanvas.className = 'drive-tunnel';
    this.tunnelCanvas.hidden = true;
    world.append(this.tunnelCanvas, this.frost.canvas);
    this.installFrostGestures(world);

    this.director.onEventStart(type => {
      this.eventHeading = this.lastHeading;
      this.sleighAlert = 1.0;
      this.sleigh.triggerReaction('landmark');
      this.announce(i18n.t().elonEvents[type].toast, 7);
    });
  }

  private installFrostGestures(world: HTMLElement): void {
    let dragging = -1;
    let lastSound = -Infinity;
    let previous: { x: number; y: number } | undefined;
    const wipe = (event: PointerEvent) => {
      const x = event.clientX, y = event.clientY;
      const start = previous ?? { x, y };
      const steps = Math.max(1, Math.ceil(Math.hypot(x - start.x, y - start.y) / 24));
      for (let i = 1; i <= steps; i++) {
        this.frost.wipeAt(THREE.MathUtils.lerp(start.x, x, i / steps), THREE.MathUtils.lerp(start.y, y, i / steps));
      }
      previous = { x, y };
      if (event.timeStamp - lastSound > 130 && this.audio.getMixMode() !== 'muted') {
        this.audio.playIceScrape();
        lastSound = event.timeStamp;
      }
    };
    world.addEventListener('pointerdown', event => {
      if (
        !event.isPrimary ||
        event.button !== 0 ||
        !(event.target instanceof HTMLCanvasElement) ||
        !this.environment.isFrostEnabled() ||
        parseFloat(this.frost.canvas.style.opacity) <= 0
      ) return;
      const { clientWidth: width, clientHeight: height } = world;
      const edge = Math.min(44, width * 0.065, height * 0.09);
      if (Math.min(event.clientX, event.clientY, width - event.clientX, height - event.clientY) > edge) return;
      dragging = event.pointerId;
      previous = undefined;
      world.setPointerCapture(event.pointerId);
      event.stopPropagation();
      wipe(event);
    }, true);
    world.addEventListener('pointermove', event => {
      if (event.pointerId !== dragging) return;
      event.stopPropagation();
      wipe(event);
    }, true);
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      world.addEventListener(type, event => {
        if (!(event instanceof PointerEvent) || event.pointerId !== dragging) return;
        dragging = -1;
        previous = undefined;
        event.stopPropagation();
      }, true);
    }
  }

  private announce(message: string, seconds = 4.2): void {
    this.statusText = message;
    this.statusUntil = this.time + seconds;
  }

  private spawnChimneySparks(x: number, y: number, z: number): void {
    const emitCount = 32;
    for (let n = 0; n < emitCount; n++) {
      const i = this.chimneyCursor;
      this.chimneyCursor = (this.chimneyCursor + 1) % CHIMNEY_SPARK_COUNT;
      this.chimneyPos[i * 3] = x;
      this.chimneyPos[i * 3 + 1] = y;
      this.chimneyPos[i * 3 + 2] = z;
      const a = Math.random() * Math.PI * 2;
      const spd = 2.8 + Math.random() * 6.5;
      this.chimneyVel[i * 3] = Math.cos(a) * spd;
      this.chimneyVel[i * 3 + 1] = 4.2 + Math.random() * 7.5;
      this.chimneyVel[i * 3 + 2] = Math.sin(a) * spd;
      this.chimneyLife[i] = 1.0;
    }
  }

  private emitPlowSpray(px: number, py: number, pz: number, plowHeading: number): void {
    const fwdX = Math.sin(plowHeading);
    const fwdZ = -Math.cos(plowHeading);
    const rightX = Math.cos(plowHeading);
    const rightZ = Math.sin(plowHeading);
    for (const side of [-1, 1]) {
      const i = this.plowSprayCursor;
      this.plowSprayCursor = (this.plowSprayCursor + 1) % PLOW_SPRAY_COUNT;
      // Front edge of V-plow blade
      this.plowSprayPos[i * 3] = px + fwdX * 2.55 + rightX * side * (1.1 + Math.random() * 0.35);
      this.plowSprayPos[i * 3 + 1] = py + 0.32 + Math.random() * 0.25;
      this.plowSprayPos[i * 3 + 2] = pz + fwdZ * 2.55 + rightZ * side * (1.1 + Math.random() * 0.35);
      const outSpd = 2.6 + Math.random() * 2.8;
      this.plowSprayVel[i * 3] = rightX * side * outSpd + fwdX * (1.4 + Math.random() * 1.4);
      this.plowSprayVel[i * 3 + 1] = 1.8 + Math.random() * 2.1;
      this.plowSprayVel[i * 3 + 2] = rightZ * side * outSpd + fwdZ * (1.4 + Math.random() * 1.4);
      this.plowSprayLife[i] = 1.0;
    }
  }

  private activateRing(
    col: string,
    x: number,
    y: number,
    z: number,
    rotY: number,
    scale: number,
    age: number,
    vx: number,
    vy: number,
    vz: number
  ): void {
    let slot = this.rings.find(r => !r.active);
    if (!slot) {
      slot = this.rings[0];
      for (let i = 1; i < this.rings.length; i++) {
        if (this.rings[i].age > slot.age) slot = this.rings[i];
      }
    }
    slot.active = true;
    slot.age = age;
    slot.mat.color.set(col);
    slot.mat.opacity = 0.95;
    slot.mesh.position.set(x, y, z);
    slot.mesh.rotation.y = rotY;
    slot.mesh.scale.setScalar(scale);
    slot.velocity.set(vx, vy, vz);
    slot.mesh.visible = true;
  }

  shift(offset: THREE.Vector3): void {
    for (const g of this.giftPool) {
      if (!g.active) continue;
      g.start.add(offset);
      g.end.add(offset);
    }
    for (const s of this.snowballPool) {
      if (!s.active) continue;
      s.start.add(offset);
      s.end.add(offset);
    }
    let shiftedCh = false;
    for (let i = 0; i < CHIMNEY_SPARK_COUNT; i++) {
      if (this.chimneyLife[i] > 0) {
        this.chimneyPos[i * 3] += offset.x;
        this.chimneyPos[i * 3 + 1] += offset.y;
        this.chimneyPos[i * 3 + 2] += offset.z;
        shiftedCh = true;
      }
    }
    if (shiftedCh) this.chimneyPosAttr.needsUpdate = true;

    let shiftedBurst = false;
    for (let i = 0; i < BURST_COUNT; i++) {
      if (this.burstLife[i] > 0) {
        this.burstPos[i * 3] += offset.x;
        this.burstPos[i * 3 + 1] += offset.y;
        this.burstPos[i * 3 + 2] += offset.z;
        shiftedBurst = true;
      }
    }
    if (shiftedBurst) this.burstPosAttr.needsUpdate = true;

    let shiftedPlow = false;
    for (let i = 0; i < PLOW_SPRAY_COUNT; i++) {
      if (this.plowSprayLife[i] > 0) {
        this.plowSprayPos[i * 3] += offset.x;
        this.plowSprayPos[i * 3 + 1] += offset.y;
        this.plowSprayPos[i * 3 + 2] += offset.z;
        shiftedPlow = true;
      }
    }
    if (shiftedPlow) this.plowSprayPosAttr.needsUpdate = true;

    for (const r of this.rings) {
      if (r.active) r.mesh.position.add(offset);
    }
    if (this.optimusAnchorPos) {
      this.optimusAnchorPos.add(offset);
    }
    for (const ws of this.wishStars) {
      if (ws.placed) {
        ws.worldX += offset.x;
        ws.worldZ += offset.z;
      }
    }
  }

  getStatus(): string {
    return this.statusText;
  }

  getLaunchText(): string {
    return this.launchText;
  }

  getGiftsDelivered(): number {
    return this.giftsDelivered;
  }

  getComboCount(): number {
    return this.comboCount;
  }

  getScoreSummary(): { gifts: number; stars: number; critters: number; snowballs: number; combo: number; hoHoBanner: boolean } {
    return {
      gifts: this.giftsDelivered,
      stars: this.starsCaught,
      critters: this.crittersTapped,
      snowballs: this.snowballsLanded,
      combo: this.comboCount,
      hoHoBanner: this.time < this.hoHoBannerUntil,
    };
  }

  private checkMilestoneFireworks(): void {
    const total = this.giftsDelivered + this.starsCaught + this.crittersTapped + this.snowballsLanded;
    if (total >= this.nextMilestoneScore) {
      while (this.nextMilestoneScore <= total) this.nextMilestoneScore += 5;
      this.sky.triggerCelebrationFireworks(5.2, this.time);
      this.map.villageLights.startWave(this.time, this.lastCenter, this.lastHeading);
      this.audio.playComboFanfare(4);
      this.announce('🎉 JULMAGI FULL! STORT FYRVERKERI!', 5.0);
    }
  }

  getStoppedSec(): number {
    return this.stoppedSec;
  }

  getBeatEnergy(): number {
    return this.audio.getBeatEnergy();
  }

  getSleighAlert(): number {
    return this.sleighAlert;
  }

  isAutomaticMagic(): boolean {
    return this.automatic;
  }

  setAutomaticMagic(enabled: boolean): void {
    this.automatic = enabled;
  }

  triggerEvent(type: ElonEventType): void {
    this.director.trigger(type);
  }

  triggerNextEvent(): void {
    const next = ELON_CYCLE[this.elonCycleIdx++ % ELON_CYCLE.length];
    this.director.trigger(next);
  }

  startConvoy(): void {
    this.convoyTime = 16;
    this.sleighAlert = 1.0;
    this.sleigh.triggerReaction('hohoho');
    this.audio.playConvoyHorn();
    this.announce('🚛 Coca-Cola & Tesla Julkaravan!', 6);
  }

  triggerConvoySalute(): void {
    if (!this.convoyTime) this.convoyTime = 14;
    this.hornFlashTimer = 2.2;
    this.sleighAlert = 1.0;
    this.sleigh.triggerReaction('hohoho');
    this.audio.playConvoyHorn();
    this.map.villageLights.startWave(this.time, this.lastCenter, this.lastHeading);
    this.announce(i18n.t().convoyHornToast, 4.5);
  }

  private spawnRingBurst(ringColors: string[], speedScale = 1): void {
    const east = Math.sin(this.lastHeading), north = Math.cos(this.lastHeading);
    const sleighY = this.sleigh.group.visible ? this.sleigh.group.position.y * 0.45 : 0;
    for (let idx = 0; idx < ringColors.length; idx++) {
      this.activateRing(
        ringColors[idx],
        this.lastCenter.x + east * (3.5 + idx * 1.4),
        this.lastCenter.y + 2.0 + sleighY,
        this.lastCenter.z - north * (3.5 + idx * 1.4),
        -this.lastHeading,
        0.8 + idx * 0.45,
        idx * 0.14,
        east * (11 + idx * 3) * speedScale,
        0.6,
        -north * (11 + idx * 3) * speedScale
      );
    }

    const bx = this.lastCenter.x + east * 4.5;
    const by = this.lastCenter.y + 2.4 + (this.sleigh.group.visible ? this.sleigh.group.position.y * 0.5 : 0);
    const bz = this.lastCenter.z - north * 4.5;
    for (let i = 0; i < BURST_COUNT; i++) {
      this.burstPos[i * 3] = bx;
      this.burstPos[i * 3 + 1] = by;
      this.burstPos[i * 3 + 2] = bz;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.25) * Math.PI * 0.9;
      const spd = (6.5 + Math.random() * 14.0) * speedScale;
      this.burstVel[i * 3] = Math.cos(theta) * Math.cos(phi) * spd + east * 4.5;
      this.burstVel[i * 3 + 1] = Math.sin(phi) * spd + 4.0;
      this.burstVel[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * spd - north * 4.5;
      this.burstLife[i] = 1.0;
    }
  }

  triggerHoHoHo(): void {
    this.sleighAlert = 1.0;
    this.hoHoBannerUntil = this.time + 2.6;
    this.sleigh.triggerReaction('hohoho');
    this.audio.playHoHoHo();
    this.map.villageLights.startWave(this.time, this.lastCenter, this.lastHeading);
    this.sky.triggerCelebrationFireworks(4.2, this.time);
    this.announce('🎅 HO! HO! HO! · GOD JUL!', 3.6);
    this.spawnRingBurst(['#ffe37a', '#ff3b5c', '#6ff0ff']);
  }

  triggerSnowball(normX = 0.5): void {
    this.sleighAlert = 1.0;
    this.sleigh.triggerReaction('gift');
    const slot = this.snowballPool.find(s => !s.active) ?? this.snowballPool[0];
    if (!slot) return;

    const east = Math.sin(this.lastHeading), north = Math.cos(this.lastHeading);
    const preferSide: -1 | 1 = normX < 0.5 ? -1 : 1;
    slot.active = true;
    slot.t = 0;
    slot.start.set(
      this.lastCenter.x,
      this.lastCenter.y + 1.8 + (this.sleigh.group.visible ? this.sleigh.group.position.y : 0.6),
      this.lastCenter.z
    );

    const targets = this.livingWorld.getInteractiveTargets(this.lastCenter, this.lastHeading);
    const hitTarget = targets.find(t => t.kind === 'snowman') ?? targets[0];
    if (hitTarget) {
      slot.end.set(hitTarget.x, hitTarget.y, hitTarget.z);
      slot.onLand = () => {
        hitTarget.lightUp();
        this.livingWorld.celebrateCritterNear(hitTarget.x, hitTarget.z, 18);
      };
    } else {
      const critters = this.livingWorld.getTappableCritters(this.lastCenter);
      const aheadCritter = critters.find(c => (c.x - this.lastCenter.x) * east - (c.z - this.lastCenter.z) * north > 6);
      if (aheadCritter) {
        slot.end.set(aheadCritter.x, aheadCritter.y, aheadCritter.z);
        slot.onLand = aheadCritter.onTap;
      } else {
        const tx = this.lastCenter.x + east * 26 + north * preferSide * 7.5;
        const tz = this.lastCenter.z - north * 26 + east * preferSide * 7.5;
        const gy = this.map.mapData.elevation?.(tx, tz) ?? this.lastCenter.y;
        slot.end.set(tx, gy + 0.8, tz);
        slot.onLand = () => {
          this.livingWorld.celebrateCritterNear(tx, tz, 16);
        };
      }
    }
    slot.mesh.position.copy(slot.start);
    slot.mesh.visible = true;
    this.audio.playGiftLaunch();
  }

  getTappableWishStars(): Array<{ id: string; x: number; y: number; z: number; onTap: () => void }> {
    const out: Array<{ id: string; x: number; y: number; z: number; onTap: () => void }> = [];
    for (const s of this.wishStars) {
      if (!s.active || !s.mesh.visible) continue;
      const p = s.mesh.position;
      if (Math.hypot(p.x - this.lastCenter.x, p.z - this.lastCenter.z) > 105) continue;
      out.push({
        id: s.id,
        x: p.x,
        y: p.y,
        z: p.z,
        onTap: () => this.catchWishStar(s),
      });
    }
    return out;
  }

  private catchWishStar(star: WishStarTarget): void {
    if (!star.active) return;
    star.active = false;
    star.respawnTimer = 6.5;
    star.mesh.visible = false;
    this.starsCaught += 1;
    this.comboCount = Math.min(9, this.comboCount + 1);
    this.comboTimer = 5.0;
    this.spawnChimneySparks(star.mesh.position.x, star.mesh.position.y, star.mesh.position.z);
    this.audio.playComboFanfare(this.comboCount + 1);
    this.announce(`⭐ Önskestjärna fångad! (${this.starsCaught} st)`, 3.6);
    this.checkMilestoneFireworks();
  }

  recordCritterTap(kind: 'rudolf' | 'reindeer' | 'elf', x: number, y: number, z: number): void {
    this.crittersTapped += 1;
    this.comboCount = Math.min(9, this.comboCount + 1);
    this.comboTimer = 5.0;
    this.spawnChimneySparks(x, y + 0.8, z);
    this.audio.playSparkleChime();
    const msg =
      kind === 'rudolf'
        ? '🔴 Du hälsade på Rudolf!'
        : kind === 'reindeer'
          ? '🦌 Renen hoppar av glädje!'
          : '🧝 Julelven vinkar God Jul!';
    this.announce(msg, 3.4);
    this.checkMilestoneFireworks();
  }

  getLightShowIntensity(): number {
    return this.lightShowTimer > 0 ? Math.min(1, this.lightShowTimer / 1.2) : 0;
  }

  requestLightWave(): void {
    this.lightShowTimer = 6.5;
    this.hornFlashTimer = 6.5;
    this.sleighAlert = 1.0;
    this.sleigh.triggerReaction('hohoho');
    this.map.villageLights.startWave(this.time, this.lastCenter, this.lastHeading);
    this.sky.triggerCelebrationFireworks(5.8, this.time);
    this.audio.playLightWaveChime();
    this.spawnRingBurst(['#ffd866', '#ff2e55', '#55f0ff'], 1.12);
    this.announce('✨ Tesla Jul-Ljusshow!', 4.8);
  }

  interact(normX = 0.5, _normY = 0.45): void {
    this.sleighAlert = 1.0;
    this.sleigh.triggerReaction('gift');

    if (this.sky.tryCatchShootingStar()) {
      this.giftsDelivered += 3;
      this.comboCount = Math.min(9, Math.max(1, this.comboCount + 1));
      this.comboTimer = 4.5;
      this.audio.playComboFanfare(this.comboCount + 1);
      this.announce(i18n.t().wishStarToast, 4.2);
    }

    const east = Math.sin(this.lastHeading), north = Math.cos(this.lastHeading);
    const preferSide: -1 | 1 = normX < 0.5 ? -1 : 1;

    // 1. Launch 3D parabolic gift projectile from 6-slot pool
    const slot = this.giftPool.find(g => !g.active) ?? this.giftPool[0];
    if (slot) {
      slot.active = true;
      slot.t = 0;
      slot.start.set(
        this.lastCenter.x,
        this.lastCenter.y + 1.8 + (this.sleigh.group.visible ? this.sleigh.group.position.y : 0.6),
        this.lastCenter.z
      );

      const livingTargets = this.livingWorld.getInteractiveTargets(this.lastCenter, this.lastHeading);
      const treeTarget = livingTargets.find(t => t.kind === 'town_tree');
      const snowTarget = livingTargets.find(t => t.kind === 'snowman');
      const livingChoice = treeTarget ?? snowTarget;

      if (livingChoice) {
        slot.end.set(livingChoice.x, livingChoice.y, livingChoice.z);
        slot.bonusGifts = livingChoice.bonusGifts;
        slot.bonusKind = livingChoice.kind;
        slot.onLand = livingChoice.lightUp;
      } else {
        const buildingTargets = this.map.getGiftTargets(this.lastCenter, this.lastHeading, preferSide);
        const target = buildingTargets[0];
        if (target) {
          slot.end.set(target.x, target.roofY, target.z);
          slot.bonusGifts = 0;
          slot.bonusKind = undefined;
          slot.onLand = () => {
            this.map.celebrateBuilding(target.id, target.x, target.roofY, target.z);
          };
        } else {
          const streetPt = this.matchedStreet && pointAlongStreet(this.matchedStreet, this.lastCenter, this.lastHeading, 32);
          const groundY = this.map.mapData.elevation;
          if (streetPt) {
            const lat = (this.matchedStreet!.widthM * 0.5 + 5.5) * preferSide;
            const tx = streetPt.x + Math.cos(streetPt.heading) * lat;
            const tz = streetPt.z + Math.sin(streetPt.heading) * lat;
            slot.end.set(tx, (groundY?.(tx, tz) ?? 0) + 0.6, tz);
          } else {
            const tx = this.lastCenter.x + east * 28 + north * preferSide * 10;
            const tz = this.lastCenter.z - north * 28 + east * preferSide * 10;
            slot.end.set(tx, (groundY?.(tx, tz) ?? this.lastCenter.y) + 0.6, tz);
          }
          slot.bonusGifts = 0;
          slot.bonusKind = undefined;
          slot.onLand = undefined;
        }
      }
      slot.mesh.position.copy(slot.start);
      slot.mesh.visible = true;
      this.audio.playGiftLaunch();
    }

    // 2. Pooled Expanding Star Ring ahead of sleigh
    this.activateRing(
      '#ffe588',
      this.lastCenter.x + east * 6.5,
      this.lastCenter.y + 2.2 + (this.sleigh.group.visible ? this.sleigh.group.position.y * 0.5 : 0),
      this.lastCenter.z - north * 6.5,
      -this.lastHeading,
      1.0,
      0,
      east * 12,
      0,
      -north * 12
    );

    // 3. 72-Particle Golden Starburst Explosion ahead
    const bx = this.lastCenter.x + east * 5.2;
    const by = this.lastCenter.y + 2.2 + (this.sleigh.group.visible ? this.sleigh.group.position.y * 0.5 : 0);
    const bz = this.lastCenter.z - north * 5.2;
    for (let i = 0; i < BURST_COUNT; i++) {
      this.burstPos[i * 3] = bx;
      this.burstPos[i * 3 + 1] = by;
      this.burstPos[i * 3 + 2] = bz;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.35) * Math.PI * 0.85;
      const spd = 4.5 + Math.random() * 10.5;
      this.burstVel[i * 3] = Math.cos(theta) * Math.cos(phi) * spd + east * 4;
      this.burstVel[i * 3 + 1] = Math.sin(phi) * spd + 2.5;
      this.burstVel[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * spd - north * 4;
      this.burstLife[i] = 1.0;
    }
  }

  resize(width: number, height: number): void {
    this.tunnelCanvas.width = width;
    this.tunnelCanvas.height = height;
    this.frost.resize(width, height);
  }

  update(
    dt: number,
    time: number,
    frame: TelemetryFrame,
    mapSnapshot: OsmMapSnapshot | undefined,
    osmState: Parameters<MapLivingWorld['update']>[3],
    center: THREE.Vector3,
    heading: number,
    live: LiveWorldState,
    hasActiveWorld: boolean,
    groundAt = (_x: number, _z: number) => 0
  ): EnvironmentState {
    this.time = time;
    this.lastHeading = heading;
    this.lastCenter.copy(center);
    this.sleighAlert = Math.max(0, this.sleighAlert - dt * 0.55);
    this.hornFlashTimer = Math.max(0, this.hornFlashTimer - dt);
    this.lightShowTimer = Math.max(0, this.lightShowTimer - dt);
    this.plowCooldown = Math.max(0, this.plowCooldown - dt);

    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.comboCount = 0;
    }
    if (this.statusUntil && time > this.statusUntil) {
      this.statusText = '';
      this.statusUntil = 0;
    }

    if (hasActiveWorld) {
      this.environment.maybeRefreshWeather(frame.latitude, frame.longitude);
    }
    const env = this.environment.getState();
    this.audio.setMusicStyle(env.theme);

    let traveled = 0;
    if (frame.gpsStatus === 'active') {
      if (this.previousFix && frame.isMoving) {
        const delta = geoDeltaMeters(this.previousFix.lat, this.previousFix.lon, frame.latitude, frame.longitude);
        const meters = Math.hypot(delta.x, delta.z);
        if (meters < 150) traveled = meters;
      }
      this.previousFix = { lat: frame.latitude, lon: frame.longitude };
    } else {
      this.previousFix = undefined;
    }

    // Stopped red-light / parked cameo tracking
    if (hasActiveWorld && frame.speedKmh < 3.0) {
      this.stoppedSec += dt;
    } else {
      this.stoppedSec = Math.max(0, this.stoppedSec - dt * 4.0);
    }
    this.sleigh.setStoppedMode(this.stoppedSec);
    this.sleigh.setTheme(env.theme);

    if (this.automatic) {
      this.nextMagicMeters -= traveled;
      this.nextLightWaveMeters -= traveled;
    }
    if (this.requestedLightWave || (this.automatic && this.nextLightWaveMeters <= 0 && frame.isMoving)) {
      this.requestedLightWave = false;
      const started = this.map.villageLights.startWave(time, center, heading);
      this.nextLightWaveMeters = started ? 92 : 24;
    }
    if (this.automatic && this.nextMagicMeters <= 0 && frame.isMoving && !this.director.getActiveEvent() && this.convoyTime <= 0) {
      this.nextMagicMeters = 165;
      const spectacle = ['starlink', 'convoy', 'starman', 'gift', 'starship'] as const;
      const next = spectacle[this.automaticStep++ % spectacle.length];
      if (next === 'convoy') {
        if (this.matchedStreet && pointAlongStreet(this.matchedStreet, center, heading, 42)) this.startConvoy();
        else this.director.trigger('starlink');
      } else if (next === 'gift') {
        if (mapSnapshot?.buildings.length) this.interact(0.5, 0.45);
        else this.director.trigger('starman');
      } else {
        this.director.trigger(next);
      }
    }

    const event = this.director.update(dt, false);
    this.audio.update(dt, frame, event?.type ?? null);

    this.effects.position.copy(center);
    this.effects.rotation.y = -(event ? this.eventHeading : heading);
    this.frost.update(dt, env);
    this.sky.update(dt, time, traveled, env, live, ZERO_ELEV, 0, false);
    this.launchText = live.spaceXLive ? `🚀 ${live.nextSpaceXName} · ${live.nextSpaceXCountdown}` : '';

    if (this.snapshotVersion !== mapSnapshot?.version || time - this.matchedAt > 0.25) {
      this.snapshotVersion = mapSnapshot?.version;
      this.matchedStreet = mapSnapshot && streetAtCar(mapSnapshot, frame);
      this.matchedAt = time;
    }
    const street = this.matchedStreet;

    // Update Living World (ice skaters on real lakes, woodland wildlife, town tree, crown snowmen, road signs)
    this.livingWorld.update(
      dt,
      time,
      frame,
      osmState,
      this.map.mapData,
      street,
      center,
      heading,
      env.quality,
      this.sleighAlert
    );

    // Church Bells when passing a real mapped church
    if (time - this.lastChurchBellTime > 24 && this.map.mapData.churches.length) {
      for (const ch of this.map.mapData.churches) {
        if (Math.hypot(ch.x - center.x, ch.z - center.z) < 34) {
          this.lastChurchBellTime = time;
          this.audio.playChurchBells();
          this.sleighAlert = 1.0;
          this.sleigh.triggerReaction('landmark');
          this.announce(ch.name ? `🔔 Kyrkklockor · ${ch.name}` : '🔔 Julklockor ringer!');
          break;
        }
      }
    }

    // Elon Timeline with real clearance & animated 3D dioramas
    this.timeline.update(
      dt,
      time,
      traveled,
      mapSnapshot,
      street,
      center,
      heading,
      groundAt,
      this.map.mapData.clearance
    );

    // Elon Roadside / Celestial Events (zero-GC scratch vectors + gated matrixWorld update)
    const charger = event?.type === 'supercharger' && mapSnapshot?.pois.find(p =>
      p.tesla && p.kind === 'charger' && Math.hypot(p.x - center.x, p.z - center.z) < 180);
    if (event?.type === 'supercharger' && event.elapsed <= dt && !charger) {
      this.announce('Ingen kartlagd Tesla Supercharger i närheten');
    }
    const plow = event?.type === 'cyberplow' && street && pointAlongStreet(street, center, heading, 100 - event.progress * 109);
    if (charger || plow) {
      this.effects.updateMatrixWorld();
    }
    const mappedSupercharger = charger
      ? this.effects.worldToLocal(this.tmpSupercharger.set(charger.x, groundAt(charger.x, charger.z), charger.z))
      : null;
    this.activePlowSpot = plow;
    this.activeGroundAt = groundAt;
    this.events.update(event, dt, time, {
      moonPos: this.starmanAnchor.copy(moonDirection).multiplyScalar(145).applyAxisAngle(this.vertical, this.eventHeading),
      starshipOrigin: this.starshipOrigin,
      starlinkZ: -145,
      mappedSupercharger,
      showRoadVehicles: !!plow,
      cybertruckYaw: plow ? Math.PI - plow.heading + this.eventHeading : 0,
      roadPointAt: this.eventRoadPointAt,
    });

    // 4-Truck Coca-Cola & Tesla Convoy on Real Mapped Lanes (pooled convoyPositions)
    this.convoyTime = Math.max(0, this.convoyTime - dt);
    this.convoyPositions.length = 0;
    const beat = this.audio.getBeatEnergy();
    const hornPulse = this.hornFlashTimer > 0 ? Math.max(0, Math.sin(this.hornFlashTimer * 12) * 0.4 + 0.85) : 0;
    const lightShowBoost = beat * 0.65 + (this.hornFlashTimer > 0 ? 0.85 : 0);
    for (let index = 0; index < this.convoy.length; index++) {
      const entry = this.convoy[index];
      const aheadMeters = entry.baseOffset - (16 - this.convoyTime) * 15;
      const slot = this.convoyTime > 0 && street && aheadMeters > -38 && pointAlongStreet(street, center, heading, aheadMeters);
      entry.handle.group.visible = !!slot;
      if (!slot) continue;
      const laneOffset = -Math.max(2.15, Math.min(2.6, street.widthM * 0.34));
      const tx = slot.x + Math.cos(slot.heading) * laneOffset;
      const tz = slot.z + Math.sin(slot.heading) * laneOffset;
      const ty = groundAt(tx, tz) + 0.05;
      const truckHeading = slot.heading + Math.PI;
      entry.handle.group.position.set(tx, ty, tz);
      entry.handle.group.scale.setScalar(0.76);
      entry.handle.group.rotation.y = -truckHeading;
      entry.handle.update(dt, time * frame.speedKmh * 0.1 + index, false, lightShowBoost, time, hornPulse);
      const pooledPos = this.convoyPosPool[index];
      pooledPos.x = tx;
      pooledPos.y = ty;
      pooledPos.z = tz;
      pooledPos.heading = truckHeading;
      this.convoyPositions.push(pooledPos);
    }

    // Red-Light Cameo: World-pinned waving Santa-Hat Optimus (never slides alongside the moving sleigh)
    if (frame.speedKmh < 2.0 && this.stoppedSec > 3.2 && street) {
      if (!this.optimusAnchorPos) {
        const optimusSpot = pointAlongStreet(street, center, heading, 11);
        if (optimusSpot) {
          const shoulder = street.widthM * 0.5 + 1.85;
          const ox = optimusSpot.x + Math.cos(optimusSpot.heading) * shoulder;
          const oz = optimusSpot.z + Math.sin(optimusSpot.heading) * shoulder;
          this.optimusAnchorPos = this.tmpOptimusPos.set(ox, groundAt(ox, oz), oz);
          this.optimusAnchorYaw = -optimusSpot.heading + Math.PI - 0.35;
        }
      }
    } else if (frame.speedKmh > 4.5) {
      this.optimusAnchorPos = null;
    }
    if (this.optimusAnchorPos && this.optimusAnchorPos.distanceTo(center) < 30) {
      this.redLightOptimus.group.visible = true;
      this.redLightOptimus.group.position.copy(this.optimusAnchorPos);
      this.redLightOptimus.group.rotation.y = this.optimusAnchorYaw;
      this.redLightOptimus.update(time);
    } else {
      this.redLightOptimus.group.visible = false;
    }

    if (this.stoppedSec > 3.8 && !this.plowActive && this.plowCooldown <= 0 && street) {
      const startD = [88, 64, 42, 26].find(d => pointAlongStreet(street, center, heading, d));
      if (startD !== undefined) {
        this.plowActive = true;
        this.plowProgress = startD;
        this.plowCooldown = 16;
      }
    }
    if (this.plowActive) {
      this.plowProgress -= 14 * dt;
      const plowSpot = street && pointAlongStreet(street, center, heading, this.plowProgress);
      if (plowSpot && street && this.plowProgress > -16) {
        const lane = -Math.min(2.05, street.widthM * 0.27);
        const px = plowSpot.x + Math.cos(plowSpot.heading) * lane;
        const pz = plowSpot.z + Math.sin(plowSpot.heading) * lane;
        const py = groundAt(px, pz) + 0.02;
        this.redLightPlow.group.visible = true;
        this.redLightPlow.group.position.set(px, py, pz);
        this.redLightPlow.group.rotation.y = -plowSpot.heading + Math.PI;
        this.redLightPlow.update(time * 12, time);
        this.emitPlowSpray(px, py, pz, plowSpot.heading + Math.PI);
      } else {
        this.plowActive = false;
        this.redLightPlow.group.visible = false;
      }
    } else {
      this.redLightPlow.group.visible = false;
    }

    // Update 6-Slot Gift Projectiles + Snowballs + Floating Wish Stars + Chimney Fireworks
    for (const g of this.giftPool) {
      if (!g.active) continue;
      g.t += dt * 0.78;
      if (g.t >= 1) {
        g.active = false;
        g.mesh.visible = false;
        g.onLand?.();
        this.spawnChimneySparks(g.end.x, g.end.y, g.end.z);
        this.comboTimer = 4.5;
        this.comboCount = Math.min(9, this.comboCount + 1);
        this.giftsDelivered += 1 + g.bonusGifts;
        const t = i18n.t();
        const bonusMsg =
          g.bonusKind === 'town_tree'
            ? t.townTreeLitToast
            : g.bonusKind === 'snowman'
              ? t.snowmanCrownToast
              : `${this.giftsDelivered} ${this.giftsDelivered === 1 ? 'levererad julklapp' : 'levererade julklappar'}${this.comboCount >= 2 ? ` · ${this.comboCount}× Combo!` : ''}`;
        this.announce(bonusMsg, 3.8);
        if (g.bonusKind || this.comboCount >= 3) {
          this.audio.playComboFanfare(this.comboCount);
        } else {
          this.audio.playChimneyPop();
        }
        this.checkMilestoneFireworks();
      } else {
        const p = g.t;
        g.mesh.position.lerpVectors(g.start, g.end, p);
        g.mesh.position.y += Math.sin(p * Math.PI) * 9.5;
        g.mesh.rotation.set(time * 5.2, time * 7.1, 0);
      }
    }

    for (const s of this.snowballPool) {
      if (!s.active) continue;
      s.t += dt * 1.15;
      if (s.t >= 1) {
        s.active = false;
        s.mesh.visible = false;
        s.onLand?.();
        this.snowballsLanded += 1;
        this.spawnChimneySparks(s.end.x, s.end.y, s.end.z);
        this.audio.playSnowballSplat();
        this.announce('❄ Träff i snön! (+1 Julmagi)', 3.2);
        this.checkMilestoneFireworks();
      } else {
        const p = s.t;
        s.mesh.position.lerpVectors(s.start, s.end, p);
        s.mesh.position.y += Math.sin(p * Math.PI) * 5.6;
        s.mesh.rotation.x += dt * 12;
      }
    }

    const fwdX = Math.sin(heading), fwdZ = -Math.cos(heading);
    const rightX = Math.cos(heading), rightZ = Math.sin(heading);
    for (const [idx, star] of this.wishStars.entries()) {
      if (!star.active) {
        star.respawnTimer -= dt;
        if (star.respawnTimer <= 0) {
          star.active = true;
          star.placed = false;
        }
      }
      if (!hasActiveWorld || !star.active) {
        star.mesh.visible = false;
        continue;
      }
      if (star.placed) {
        const dx = star.worldX - center.x;
        const dz = star.worldZ - center.z;
        const ahead = dx * fwdX + dz * fwdZ;
        if (ahead < -14 || Math.hypot(dx, dz) > 165) {
          star.placed = false;
        }
      }
      if (!star.placed) {
        const spawnAhead = 28 + ((star.aheadOffset + idx * 14) % 95);
        let wx = center.x + fwdX * spawnAhead + rightX * star.latOffset;
        let wz = center.z + fwdZ * spawnAhead + rightZ * star.latOffset;
        if (street) {
          const pt = pointAlongStreet(street, center, heading, spawnAhead);
          if (pt) {
            wx = pt.x + Math.cos(pt.heading) * star.latOffset;
            wz = pt.z + Math.sin(pt.heading) * star.latOffset;
          }
        }
        star.worldX = wx;
        star.worldZ = wz;
        star.placed = true;
      }
      star.mesh.visible = true;
      const gy = groundAt(star.worldX, star.worldZ);
      star.mesh.position.set(star.worldX, gy + star.heightOffset + Math.sin(time * 2.8 + idx) * 0.45, star.worldZ);
      star.mesh.rotation.y = time * 2.1 + idx;
    }

    let chActive = 0;
    for (let i = 0; i < CHIMNEY_SPARK_COUNT; i++) {
      if (this.chimneyLife[i] > 0) {
        this.chimneyLife[i] = Math.max(0, this.chimneyLife[i] - dt * 0.85);
        if (this.chimneyLife[i] > 0) {
          chActive++;
          this.chimneyPos[i * 3] += this.chimneyVel[i * 3] * dt;
          this.chimneyPos[i * 3 + 1] += this.chimneyVel[i * 3 + 1] * dt;
          this.chimneyPos[i * 3 + 2] += this.chimneyVel[i * 3 + 2] * dt;
          this.chimneyVel[i * 3 + 1] -= 6.5 * dt;
        }
      }
    }
    if (chActive > 0 || this.chimneyWasActive) {
      this.chimneyPosAttr.needsUpdate = true;
      this.chimneyLifeAttr.needsUpdate = true;
      this.chimneyWasActive = chActive > 0;
    }
    this.chimneyPts.visible = chActive > 0;

    let burstActive = 0;
    for (let i = 0; i < BURST_COUNT; i++) {
      if (this.burstLife[i] > 0) {
        this.burstLife[i] = Math.max(0, this.burstLife[i] - dt * 0.82);
        if (this.burstLife[i] > 0) {
          burstActive++;
          this.burstPos[i * 3] += this.burstVel[i * 3] * dt;
          this.burstPos[i * 3 + 1] += this.burstVel[i * 3 + 1] * dt;
          this.burstPos[i * 3 + 2] += this.burstVel[i * 3 + 2] * dt;
          this.burstVel[i * 3 + 1] -= 3.8 * dt;
        }
      }
    }
    if (burstActive > 0 || this.burstWasActive) {
      this.burstPosAttr.needsUpdate = true;
      this.burstLifeAttr.needsUpdate = true;
      this.burstWasActive = burstActive > 0;
    }
    this.burstPts.visible = burstActive > 0;

    let plowSprayActive = 0;
    for (let i = 0; i < PLOW_SPRAY_COUNT; i++) {
      if (this.plowSprayLife[i] > 0) {
        this.plowSprayLife[i] = Math.max(0, this.plowSprayLife[i] - dt * 1.35);
        if (this.plowSprayLife[i] > 0) {
          plowSprayActive++;
          this.plowSprayPos[i * 3] += this.plowSprayVel[i * 3] * dt;
          this.plowSprayPos[i * 3 + 1] += this.plowSprayVel[i * 3 + 1] * dt;
          this.plowSprayPos[i * 3 + 2] += this.plowSprayVel[i * 3 + 2] * dt;
          this.plowSprayVel[i * 3 + 1] -= 5.2 * dt;
        }
      }
    }
    if (plowSprayActive > 0 || this.plowSprayWasActive) {
      this.plowSprayPosAttr.needsUpdate = true;
      this.plowSprayLifeAttr.needsUpdate = true;
      this.plowSprayWasActive = plowSprayActive > 0;
    }
    this.plowSprayPts.visible = plowSprayActive > 0;

    for (let i = 0; i < this.rings.length; i++) {
      const r = this.rings[i];
      if (!r.active) continue;
      r.age += dt;
      if (r.age > 1.55) {
        r.active = false;
        r.mesh.visible = false;
        continue;
      }
      const sc = 1 + r.age * 4.4;
      r.mesh.scale.set(sc, sc, sc);
      r.mesh.position.addScaledVector(r.velocity, dt);
      r.mat.opacity = Math.max(0, 1 - r.age / 1.55);
    }

    const enteredTunnel = frame.forceTunnel || street?.tunnel;
    this.tunnelBlend = THREE.MathUtils.lerp(this.tunnelBlend, enteredTunnel ? 1 : 0, 1 - Math.exp(-dt * 3.5));
    this.tunnelCanvas.hidden = this.tunnelBlend <= 0.01;
    if (!this.tunnelCanvas.hidden) {
      const { width, height } = this.tunnelCanvas;
      this.tunnelContext.clearRect(0, 0, width, height);
      Object.assign(this.tunnelFrame, frame);
      this.tunnelFrame.tunnelBlend = this.tunnelBlend;
      this.tunnel.render(this.tunnelContext, width, height, dt, this.tunnelFrame);
    }

    return env;
  }

  dispose(): void {
    this.ringGeo.dispose();
    this.livingWorld.dispose();
    this.sky.dispose();
    this.chimneyPts.geometry.dispose();
    this.chimneyMat.dispose();
    this.burstPts.geometry.dispose();
    this.burstMat.dispose();
    this.plowSprayPts.geometry.dispose();
    this.plowSprayMat.dispose();
    for (const r of this.rings) {
      this.scene.remove(r.mesh);
      r.mat.dispose();
    }
    this.rings.length = 0;
    this.audio.dispose();
  }
}
