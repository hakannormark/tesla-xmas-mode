import * as THREE from 'three';
import type { EnvironmentState } from '../core/environment';
import type { TelemetryFrame } from '../core/telemetry';
import { getSoftGlowTexture } from './pixarMaterials';
import type { PixarSleighHandle } from './pixarModels';

const TRAIL_COUNT = 360;
const SPRAY_COUNT = 120;
const STREAK_COUNT = 48;
const CLOUD_COUNT = 14;
const CLOUD_PUFFS_PER_CLOUD = 3;

export type MagicTrailStyle = 'classic' | 'aurora' | 'plaid' | 'candycane';

const SOFT_PARTICLE_VERT = /* glsl */ `
  attribute float aLife;
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uSizeScale;
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
      mix(0.45, 1.18, sin(life * 3.14159265)),
      mix(1.45, 0.55, life),
      uGrowOut
    );
    float dist = max(1.5, -mvPosition.z);
    gl_PointSize = clamp((aSize * uSizeScale * curve * 260.0 * uPixelRatio) / dist, 1.5, 96.0);
  }
`;

const SOFT_PARTICLE_FRAG = /* glsl */ `
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
    float radial = pow(max(0.0, 1.0 - r), 1.9);
    float spikeX = exp(-abs(uv.y) * 20.0) * max(0.0, 1.0 - abs(uv.x) * 2.05);
    float spikeY = exp(-abs(uv.x) * 20.0) * max(0.0, 1.0 - abs(uv.y) * 2.05);
    float star = (spikeX + spikeY) * 0.65;
    float shape = mix(radial, max(radial, star), uStarMix);
    float life = clamp(vLife, 0.0, 1.0);
    float fadeIn = 1.0 - smoothstep(0.92, 1.0, life);
    float fadeOut = smoothstep(0.0, 0.28, life);
    float alpha = shape * fadeIn * fadeOut * uOpacity;
    if (alpha < 0.004) discard;
    // Preserve vivid saturated vColor across particle lifetime; add only a tiny center glint & gentle tail tint
    vec3 coreCol = mix(vColor, vec3(1.0, 0.99, 0.96), smoothstep(0.42, 0.0, r) * 0.20);
    vec3 col = mix(coreCol, uCoolTint, smoothstep(0.32, 0.0, life) * 0.35);
    gl_FragColor = vec4(col, alpha);
  }
`;

interface SpeedStreakData {
  angle: number;
  radius: number;
  ahead: number;
}

interface CloudPuffData {
  side: number;
  height: number;
  ahead: number;
}

const _tmpPos = new THREE.Vector3();
const _tmpQuat = new THREE.Quaternion();
const _tmpScale = new THREE.Vector3();
const _tmpMat = new THREE.Matrix4();
const _upAxis = new THREE.Vector3(0, 1, 0);
const _owlTargetPos = new THREE.Vector3();

function createOwlWingGeo(
  side: -1 | 1,
  span: number,
  rootLead: number,
  rootTrail: number,
  tipLead: number,
  tipTrail: number,
  thickness: number
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  if (side > 0) {
    shape.moveTo(0, -rootLead);
    shape.quadraticCurveTo(span * 0.55, -rootLead * 0.85, span, tipLead);
    shape.quadraticCurveTo(span * 1.04, (tipLead + tipTrail) * 0.5, span * 0.94, tipTrail);
    shape.quadraticCurveTo(span * 0.52, rootTrail * 1.08, 0, rootTrail);
    shape.closePath();
  } else {
    shape.moveTo(0, rootTrail);
    shape.quadraticCurveTo(-span * 0.52, rootTrail * 1.08, -span * 0.94, tipTrail);
    shape.quadraticCurveTo(-span * 1.04, (tipLead + tipTrail) * 0.5, -span, tipLead);
    shape.quadraticCurveTo(-span * 0.55, -rootLead * 0.85, 0, -rootLead);
    shape.closePath();
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: thickness * 0.45,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 8,
  });
  geo.rotateX(Math.PI * 0.5);
  return geo;
}

function createOwlTailGeo(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-0.075, 0);
  shape.quadraticCurveTo(-0.18, 0.22, -0.15, 0.34);
  shape.quadraticCurveTo(0, 0.40, 0.15, 0.34);
  shape.quadraticCurveTo(0.18, 0.22, 0.075, 0);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.016,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 1,
    curveSegments: 8,
  });
  geo.rotateX(Math.PI * 0.5);
  return geo;
}

function wrapAngleDelta(delta: number): number {
  let d = delta;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

export class SleighMagic {
  readonly group = new THREE.Group();

  // Lightweight warm/theme ground glow decal (replaces redundant 3rd PointLight)
  private readonly groundGlowMat: THREE.MeshBasicMaterial;
  private readonly groundGlowMesh: THREE.Mesh;

  private readonly trailPoints: THREE.Points;
  private readonly trailMat: THREE.ShaderMaterial;
  private readonly trailPos = new Float32Array(TRAIL_COUNT * 3);
  private readonly trailVel = new Float32Array(TRAIL_COUNT * 3);
  private readonly trailLife = new Float32Array(TRAIL_COUNT);
  private readonly trailSize = new Float32Array(TRAIL_COUNT);
  private readonly trailColors = new Float32Array(TRAIL_COUNT * 3);
  private readonly trailPosAttr: THREE.BufferAttribute;
  private readonly trailLifeAttr: THREE.BufferAttribute;
  private readonly trailColorAttr: THREE.BufferAttribute;
  private trailCursor = 0;
  private trailEmitSeq = 0;
  private trailWasActive = false;
  private trailColorDirty = false;
  private trailStyle: MagicTrailStyle = 'classic';
  private superAuroraBoost = false;

  private readonly sprayPoints: THREE.Points;
  private readonly sprayMat: THREE.ShaderMaterial;
  private readonly sprayPos = new Float32Array(SPRAY_COUNT * 3);
  private readonly sprayVel = new Float32Array(SPRAY_COUNT * 3);
  private readonly sprayLife = new Float32Array(SPRAY_COUNT);
  private readonly spraySize = new Float32Array(SPRAY_COUNT);
  private readonly sprayPosAttr: THREE.BufferAttribute;
  private readonly sprayLifeAttr: THREE.BufferAttribute;
  private sprayCursor = 0;
  private sprayWasActive = false;

  private readonly streaks: SpeedStreakData[] = [];
  private readonly streakGeo = new THREE.BoxGeometry(0.045, 0.045, 4.4);
  private readonly streakMat: THREE.MeshBasicMaterial;
  private readonly streakInst: THREE.InstancedMesh;

  private readonly cloudGeo = new THREE.SphereGeometry(2.6, 10, 8);
  private readonly cloudMat: THREE.MeshStandardMaterial;
  private readonly cloudInst: THREE.InstancedMesh;
  private readonly clouds: CloudPuffData[] = [];

  // Unlockable Gliding Companion Snowy Owl
  private readonly owlGroup = new THREE.Group();
  private readonly owlBodyGroup = new THREE.Group();
  private readonly owlHeadGroup = new THREE.Group();
  private readonly owlWingLeft = new THREE.Group();
  private readonly owlWingRight = new THREE.Group();
  private readonly owlWingTipLeft = new THREE.Group();
  private readonly owlWingTipRight = new THREE.Group();
  private readonly owlTailPivot = new THREE.Group();
  private readonly owlHaloSprite: THREE.Sprite;
  private readonly owlDisposables: Array<{ dispose(): void }> = [];
  private companionOwlEnabled = false;
  private owlInitialized = false;
  private readonly owlPos = new THREE.Vector3();
  private owlHeading = 0;
  private owlBank = 0;
  private owlFlapPhase = 0;
  private owlSparkleAccum = 0;
  private owlSparkleSide: -1 | 1 = 1;

  private readonly trailOrigin = new THREE.Vector3();
  private hasTrailOrigin = false;
  private lastTrailHeading = 0;
  private lastTrailTime = 0;
  private flightFactor = 0;

  constructor() {
    const pixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    // 1. Soft snow ground glow decal under sleigh/avatar (0 PointLights)
    this.groundGlowMat = new THREE.MeshBasicMaterial({
      map: getSoftGlowTexture(),
      color: '#ffb860',
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.groundGlowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(7.2, 8.8).rotateX(-Math.PI * 0.5),
      this.groundGlowMat
    );
    this.group.add(this.groundGlowMesh);

    // 2. Soft-fade Stardust Trail (custom ShaderMaterial with aLife & dynamic palettes)
    const trailGeo = new THREE.BufferGeometry();
    for (let i = 0; i < TRAIL_COUNT; i++) {
      this.trailPos[i * 3 + 1] = -999;
      this.trailSize[i] = 0.65 + (i % 5) * 0.14;
      this.writeTrailColor(i, 0, i, false);
    }
    this.trailPosAttr = new THREE.BufferAttribute(this.trailPos, 3);
    this.trailLifeAttr = new THREE.BufferAttribute(this.trailLife, 1);
    this.trailColorAttr = new THREE.BufferAttribute(this.trailColors, 3);
    trailGeo.setAttribute('position', this.trailPosAttr);
    trailGeo.setAttribute('aLife', this.trailLifeAttr);
    trailGeo.setAttribute('aSize', new THREE.BufferAttribute(this.trailSize, 1));
    trailGeo.setAttribute('aColor', this.trailColorAttr);
    this.trailMat = new THREE.ShaderMaterial({
      vertexShader: SOFT_PARTICLE_VERT,
      fragmentShader: SOFT_PARTICLE_FRAG,
      uniforms: {
        uSizeScale: { value: 0.45 },
        uPixelRatio: { value: pixelRatio },
        uGrowOut: { value: 0.0 },
        uOpacity: { value: 0.72 },
        uStarMix: { value: 0.72 },
        uCoolTint: { value: new THREE.Color('#4ca8ff') },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    this.trailPoints = new THREE.Points(trailGeo, this.trailMat);
    this.trailPoints.frustumCulled = false;
    this.group.add(this.trailPoints);

    // 3. Soft-fade Powder Snow Spray (custom ShaderMaterial with aLife)
    const sprayGeo = new THREE.BufferGeometry();
    const sprayColors = new Float32Array(SPRAY_COUNT * 3);
    for (let i = 0; i < SPRAY_COUNT; i++) {
      this.sprayPos[i * 3 + 1] = -999;
      this.spraySize[i] = 0.75 + (i % 4) * 0.16;
      sprayColors[i * 3] = 0.92;
      sprayColors[i * 3 + 1] = 0.96;
      sprayColors[i * 3 + 2] = 1.0;
    }
    this.sprayPosAttr = new THREE.BufferAttribute(this.sprayPos, 3);
    this.sprayLifeAttr = new THREE.BufferAttribute(this.sprayLife, 1);
    sprayGeo.setAttribute('position', this.sprayPosAttr);
    sprayGeo.setAttribute('aLife', this.sprayLifeAttr);
    sprayGeo.setAttribute('aSize', new THREE.BufferAttribute(this.spraySize, 1));
    sprayGeo.setAttribute('aColor', new THREE.BufferAttribute(sprayColors, 3));
    this.sprayMat = new THREE.ShaderMaterial({
      vertexShader: SOFT_PARTICLE_VERT,
      fragmentShader: SOFT_PARTICLE_FRAG,
      uniforms: {
        uSizeScale: { value: 0.72 },
        uPixelRatio: { value: pixelRatio },
        uGrowOut: { value: 1.0 },
        uOpacity: { value: 0.56 },
        uStarMix: { value: 0.0 },
        uCoolTint: { value: new THREE.Color('#b6d4f5') },
      },
      transparent: true,
      depthWrite: false,
    });
    this.sprayPoints = new THREE.Points(sprayGeo, this.sprayMat);
    this.sprayPoints.frustumCulled = false;
    this.group.add(this.sprayPoints);

    // 4. Instanced Peripheral Star-Warp Streaks (1 draw call for 48 streaks)
    this.streakMat = new THREE.MeshBasicMaterial({
      color: '#d8f2ff',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    this.streakInst = new THREE.InstancedMesh(this.streakGeo, this.streakMat, STREAK_COUNT);
    this.streakInst.frustumCulled = false;
    this.streakInst.visible = false;
    for (let i = 0; i < STREAK_COUNT; i++) {
      const angle = (i / STREAK_COUNT) * Math.PI * 2 + (i % 3) * 0.17;
      const radius = 5.4 + (i % 5) * 1.9;
      const ahead = 8 + ((i * 2.4) % 98);
      this.streaks.push({ angle, radius, ahead });
    }
    this.group.add(this.streakInst);

    // 5. Instanced Luminous Plaid Altitude Clouds (1 draw call for 42 puffs)
    this.cloudMat = new THREE.MeshStandardMaterial({
      color: '#5c7bae',
      emissive: '#142654',
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0,
      roughness: 1,
      depthWrite: false,
    });
    this.cloudInst = new THREE.InstancedMesh(
      this.cloudGeo,
      this.cloudMat,
      CLOUD_COUNT * CLOUD_PUFFS_PER_CLOUD
    );
    this.cloudInst.frustumCulled = false;
    this.cloudInst.visible = false;
    for (let i = 0; i < CLOUD_COUNT; i++) {
      const side = (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 6.5);
      const height = 5.2 + (i % 3) * 1.1;
      const ahead = 14 + i * 11;
      this.clouds.push({ side, height, ahead });
    }
    this.group.add(this.cloudInst);

    // 6. Unlockable Sculpted Gliding Companion Snowy Owl (local forward = -Z)
    this.owlHaloSprite = this.buildCompanionOwl();
    this.owlGroup.visible = false;
    this.group.add(this.owlGroup);
  }

  private trackOwlDisposable<T extends { dispose(): void }>(item: T): T {
    this.owlDisposables.push(item);
    return item;
  }

  private buildCompanionOwl(): THREE.Sprite {
    const plumageMat = this.trackOwlDisposable(
      new THREE.MeshPhysicalMaterial({
        color: '#f8fbff',
        roughness: 0.64,
        sheen: 0.78,
        sheenColor: new THREE.Color('#dbeeff'),
        emissive: '#1e2e48',
        emissiveIntensity: 0.22,
      })
    );
    const featherAccentMat = this.trackOwlDisposable(
      new THREE.MeshStandardMaterial({
        color: '#cdd8e8',
        roughness: 0.72,
        emissive: '#16243d',
        emissiveIntensity: 0.16,
      })
    );
    const eyeGoldMat = this.trackOwlDisposable(
      new THREE.MeshBasicMaterial({ color: '#ffd24a', toneMapped: false })
    );
    const darkMat = this.trackOwlDisposable(
      new THREE.MeshPhysicalMaterial({ color: '#14151c', roughness: 0.1, clearcoat: 0.9 })
    );
    const beakMat = this.trackOwlDisposable(
      new THREE.MeshStandardMaterial({ color: '#f2b63d', roughness: 0.35 })
    );
    const catchlightMat = this.trackOwlDisposable(new THREE.MeshBasicMaterial({ color: '#ffffff' }));

    this.owlGroup.add(this.owlBodyGroup);

    // Sleek gliding owl torso
    const torsoGeo = this.trackOwlDisposable(new THREE.SphereGeometry(0.22, 14, 12));
    const torso = new THREE.Mesh(torsoGeo, plumageMat);
    torso.scale.set(0.92, 0.80, 1.42);
    this.owlBodyGroup.add(torso);

    const chestGeo = this.trackOwlDisposable(new THREE.SphereGeometry(0.165, 10, 10));
    const chest = new THREE.Mesh(chestGeo, plumageMat);
    chest.position.set(0, -0.04, -0.20);
    this.owlBodyGroup.add(chest);

    // Tucked talons beneath belly
    const talonGeo = this.trackOwlDisposable(new THREE.SphereGeometry(0.042, 6, 6));
    for (const sx of [-0.075, 0.075]) {
      const talon = new THREE.Mesh(talonGeo, darkMat);
      talon.scale.set(0.8, 0.65, 1.4);
      talon.position.set(sx, -0.16, 0.10);
      this.owlBodyGroup.add(talon);
    }

    // Expressive snowy owl head with glowing golden eyes
    this.owlHeadGroup.position.set(0, 0.11, -0.29);
    const headGeo = this.trackOwlDisposable(new THREE.SphereGeometry(0.165, 14, 12));
    const headMesh = new THREE.Mesh(headGeo, plumageMat);
    headMesh.scale.set(1.04, 0.96, 1.0);
    this.owlHeadGroup.add(headMesh);

    const beakGeo = this.trackOwlDisposable(new THREE.ConeGeometry(0.036, 0.10, 6));
    const beak = new THREE.Mesh(beakGeo, beakMat);
    beak.rotation.x = -Math.PI * 0.54;
    beak.position.set(0, -0.025, -0.185);
    this.owlHeadGroup.add(beak);

    const eyeGeo = this.trackOwlDisposable(new THREE.SphereGeometry(0.048, 10, 10));
    const pupilGeo = this.trackOwlDisposable(new THREE.SphereGeometry(0.024, 8, 8));
    const glintGeo = this.trackOwlDisposable(new THREE.SphereGeometry(0.011, 6, 6));
    const tuftGeo = this.trackOwlDisposable(new THREE.ConeGeometry(0.038, 0.10, 5));
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(eyeGeo, eyeGoldMat);
      eye.position.set(side * 0.076, 0.028, -0.135);
      const pupil = new THREE.Mesh(pupilGeo, darkMat);
      pupil.position.set(0, 0, -0.034);
      const glint = new THREE.Mesh(glintGeo, catchlightMat);
      glint.position.set(side * 0.01, 0.012, -0.044);
      eye.add(pupil, glint);
      this.owlHeadGroup.add(eye);

      const tuft = new THREE.Mesh(tuftGeo, featherAccentMat);
      tuft.position.set(side * 0.105, 0.135, -0.01);
      tuft.rotation.z = -side * 0.52;
      tuft.rotation.x = 0.28;
      this.owlHeadGroup.add(tuft);
    }
    this.owlBodyGroup.add(this.owlHeadGroup);

    // Double-jointed articulated flapping wings (inner + swept outer primaries)
    const innerWingGeoL = this.trackOwlDisposable(createOwlWingGeo(-1, 0.32, 0.13, 0.18, -0.07, 0.15, 0.024));
    const innerWingGeoR = this.trackOwlDisposable(createOwlWingGeo(1, 0.32, 0.13, 0.18, -0.07, 0.15, 0.024));
    const outerWingGeoL = this.trackOwlDisposable(createOwlWingGeo(-1, 0.30, 0.09, 0.15, 0.04, 0.21, 0.018));
    const outerWingGeoR = this.trackOwlDisposable(createOwlWingGeo(1, 0.30, 0.09, 0.15, 0.04, 0.21, 0.018));
    const primaryTipGeo = this.trackOwlDisposable(new THREE.CapsuleGeometry(0.024, 0.14, 4, 6));

    this.owlWingLeft.position.set(-0.16, 0.05, -0.04);
    this.owlWingLeft.add(new THREE.Mesh(innerWingGeoL, plumageMat));
    this.owlWingTipLeft.position.set(-0.30, 0, 0.01);
    this.owlWingTipLeft.add(new THREE.Mesh(outerWingGeoL, plumageMat));
    for (let f = 0; f < 3; f++) {
      const feather = new THREE.Mesh(primaryTipGeo, featherAccentMat);
      feather.rotation.z = Math.PI * 0.5;
      feather.rotation.y = 0.22 + f * 0.14;
      feather.position.set(-0.27 - f * 0.02, -0.005, 0.04 + f * 0.055);
      this.owlWingTipLeft.add(feather);
    }
    this.owlWingLeft.add(this.owlWingTipLeft);

    this.owlWingRight.position.set(0.16, 0.05, -0.04);
    this.owlWingRight.add(new THREE.Mesh(innerWingGeoR, plumageMat));
    this.owlWingTipRight.position.set(0.30, 0, 0.01);
    this.owlWingTipRight.add(new THREE.Mesh(outerWingGeoR, plumageMat));
    for (let f = 0; f < 3; f++) {
      const feather = new THREE.Mesh(primaryTipGeo, featherAccentMat);
      feather.rotation.z = Math.PI * 0.5;
      feather.rotation.y = -(0.22 + f * 0.14);
      feather.position.set(0.27 + f * 0.02, -0.005, 0.04 + f * 0.055);
      this.owlWingTipRight.add(feather);
    }
    this.owlWingRight.add(this.owlWingTipRight);
    this.owlBodyGroup.add(this.owlWingLeft, this.owlWingRight);

    // Articulated fanned tail
    this.owlTailPivot.position.set(0, 0.01, 0.27);
    const tailGeo = this.trackOwlDisposable(createOwlTailGeo());
    this.owlTailPivot.add(new THREE.Mesh(tailGeo, plumageMat));
    const tailBarGeo = this.trackOwlDisposable(new THREE.BoxGeometry(0.22, 0.018, 0.05));
    const tailBar = new THREE.Mesh(tailBarGeo, featherAccentMat);
    tailBar.position.set(0, 0.002, 0.26);
    this.owlTailPivot.add(tailBar);
    this.owlBodyGroup.add(this.owlTailPivot);

    // Subtle magical moonlit aura behind owl
    const haloMat = this.trackOwlDisposable(
      new THREE.SpriteMaterial({
        map: getSoftGlowTexture(),
        color: '#d8f2ff',
        transparent: true,
        opacity: 0.34,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const halo = new THREE.Sprite(haloMat);
    halo.scale.set(1.55, 1.35, 1);
    halo.position.set(0, 0.04, 0.06);
    this.owlBodyGroup.add(halo);
    return halo;
  }

  private writeTrailColor(
    idx: number,
    time: number,
    seq: number,
    isOwlSparkle: boolean,
    sideSign: -1 | 1 = 1
  ): void {
    const o = idx * 3;
    if (isOwlSparkle) {
      if (seq % 2 === 0) {
        this.trailColors[o] = 0.88;
        this.trailColors[o + 1] = 0.96;
        this.trailColors[o + 2] = 1.0;
      } else {
        this.trailColors[o] = 1.0;
        this.trailColors[o + 1] = 0.92;
        this.trailColors[o + 2] = 0.68;
      }
      return;
    }

    if (this.superAuroraBoost && seq % 3 === 0) {
      const phase = ((time * 1.15 + seq * 0.17) % 3 + 3) % 3;
      if (phase < 1) {
        this.trailColors[o] = 0.08 + 0.12 * phase;
        this.trailColors[o + 1] = 0.98;
        this.trailColors[o + 2] = 0.54 + 0.46 * phase;
      } else if (phase < 2) {
        const u = phase - 1;
        this.trailColors[o] = 0.20 + 0.72 * u;
        this.trailColors[o + 1] = 0.98 - 0.70 * u;
        this.trailColors[o + 2] = 1.0 - 0.14 * u;
      } else {
        const u = phase - 2;
        this.trailColors[o] = 0.92 - 0.84 * u;
        this.trailColors[o + 1] = 0.28 + 0.70 * u;
        this.trailColors[o + 2] = 0.86 - 0.32 * u;
      }
      return;
    }

    if (this.trailStyle === 'aurora') {
      // Vivid shifting emerald -> arctic turquoise -> aurora orchid-violet
      const phase = ((time * 0.95 + seq * 0.12) % 3 + 3) % 3;
      if (phase < 1) {
        this.trailColors[o] = 0.08;
        this.trailColors[o + 1] = 1.0 - 0.12 * phase;
        this.trailColors[o + 2] = 0.56 + 0.44 * phase;
      } else if (phase < 2) {
        const u = phase - 1;
        this.trailColors[o] = 0.08 + 0.68 * u;
        this.trailColors[o + 1] = 0.88 - 0.64 * u;
        this.trailColors[o + 2] = 1.0;
      } else {
        const u = phase - 2;
        this.trailColors[o] = 0.76 - 0.68 * u;
        this.trailColors[o + 1] = 0.24 + 0.76 * u;
        this.trailColors[o + 2] = 1.0 - 0.44 * u;
      }
      return;
    }

    if (this.trailStyle === 'plaid') {
      // Electric Tesla Plaid violet -> neon magenta -> hyper-cyan plasma
      const phase = ((time * 1.55 + seq * 0.20) % 3 + 3) % 3;
      if (phase < 1) {
        this.trailColors[o] = 0.62 + 0.38 * phase;
        this.trailColors[o + 1] = 0.12 - 0.04 * phase;
        this.trailColors[o + 2] = 1.0 - 0.28 * phase;
      } else if (phase < 2) {
        const u = phase - 1;
        this.trailColors[o] = 1.0 - 0.95 * u;
        this.trailColors[o + 1] = 0.08 + 0.87 * u;
        this.trailColors[o + 2] = 0.72 + 0.28 * u;
      } else {
        const u = phase - 2;
        this.trailColors[o] = 0.05 + 0.57 * u;
        this.trailColors[o + 1] = 0.95 - 0.83 * u;
        this.trailColors[o + 2] = 1.0;
      }
      return;
    }

    if (this.trailStyle === 'candycane') {
      // Bold alternating candy-cane bands in time/distance so red & white never blend into pink
      const isCrimson = time > 0.01
        ? Math.floor(time * 4.5 + (sideSign > 0 ? 0.5 : 0)) % 2 === 0
        : Math.floor(seq / 10) % 2 === 0;
      this.trailColors[o] = 1.0;
      this.trailColors[o + 1] = isCrimson ? 0.05 : 0.99;
      this.trailColors[o + 2] = isCrimson ? 0.12 : 1.0;
      return;
    }

    // Classic warm gold + ice-cyan sparkles
    const isCyan = seq % 3 === 0;
    this.trailColors[o] = isCyan ? 0.52 : 1.0;
    this.trailColors[o + 1] = isCyan ? 0.88 : 0.82;
    this.trailColors[o + 2] = isCyan ? 1.0 : 0.30;
  }

  private applyTrailUniforms(): void {
    const tint = this.trailMat.uniforms.uCoolTint.value as THREE.Color;
    if (this.superAuroraBoost && this.trailStyle === 'classic') {
      tint.set('#38ffb8');
      this.trailMat.uniforms.uStarMix.value = 0.88;
      return;
    }
    if (this.trailStyle === 'aurora') {
      tint.set('#2dffaa');
      this.trailMat.uniforms.uStarMix.value = 0.86;
    } else if (this.trailStyle === 'plaid') {
      tint.set('#a438ff');
      this.trailMat.uniforms.uStarMix.value = 0.90;
    } else if (this.trailStyle === 'candycane') {
      tint.set('#ff1a35');
      this.trailMat.uniforms.uStarMix.value = 0.84;
    } else {
      tint.set('#4ca8ff');
      this.trailMat.uniforms.uStarMix.value = 0.72;
    }
  }

  setTrailStyle(style: MagicTrailStyle): void {
    if (style === this.trailStyle) return;
    this.trailStyle = style;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      this.writeTrailColor(i, this.lastTrailTime, i, false, i % 2 === 0 ? -1 : 1);
    }
    if (this.hasTrailOrigin) {
      // Celebratory burst behind sleigh so switching styles in Verkstaden is immediately unmistakable
      for (let b = 0; b < 28; b++) {
        const side: -1 | 1 = b % 2 === 0 ? -1 : 1;
        this.emitTrail(
          this.trailOrigin.x,
          this.trailOrigin.y + 0.15,
          this.trailOrigin.z,
          0.65,
          this.lastTrailHeading,
          side,
          this.lastTrailTime + b * 0.04
        );
      }
    }
    this.trailColorDirty = true;
    this.applyTrailUniforms();
  }

  setCompanionOwl(enabled: boolean): void {
    const next = !!enabled;
    if (next === this.companionOwlEnabled) return;
    this.companionOwlEnabled = next;
    this.owlGroup.visible = next;
    if (!next) {
      this.owlInitialized = false;
    }
  }

  setSuperAuroraBoost(active: boolean): void {
    const next = !!active;
    if (next === this.superAuroraBoost) return;
    this.superAuroraBoost = next;
    this.applyTrailUniforms();
  }

  getFlightFactor(): number {
    return this.flightFactor;
  }

  shift(offset: THREE.Vector3): void {
    let shiftedTrail = false;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      if (this.trailLife[i] > 0) {
        this.trailPos[i * 3] += offset.x;
        this.trailPos[i * 3 + 1] += offset.y;
        this.trailPos[i * 3 + 2] += offset.z;
        shiftedTrail = true;
      }
    }
    if (shiftedTrail) this.trailPosAttr.needsUpdate = true;

    let shiftedSpray = false;
    for (let i = 0; i < SPRAY_COUNT; i++) {
      if (this.sprayLife[i] > 0) {
        this.sprayPos[i * 3] += offset.x;
        this.sprayPos[i * 3 + 1] += offset.y;
        this.sprayPos[i * 3 + 2] += offset.z;
        shiftedSpray = true;
      }
    }
    if (shiftedSpray) this.sprayPosAttr.needsUpdate = true;

    if (this.owlInitialized) {
      this.owlPos.add(offset);
      this.owlGroup.position.copy(this.owlPos);
    }
  }

  private emitTrail(
    x: number,
    y: number,
    z: number,
    speedNorm: number,
    heading: number,
    sideSign: -1 | 1,
    time: number
  ): void {
    const i = this.trailCursor;
    this.trailCursor = (this.trailCursor + 1) % TRAIL_COUNT;
    const rightX = Math.cos(heading);
    const rightZ = Math.sin(heading);
    const backX = -Math.sin(heading);
    const backZ = Math.cos(heading);
    const runnerOffset = sideSign * 0.94;
    const spread = this.trailStyle === 'candycane' ? 0.09 + speedNorm * 0.14 : 0.16 + speedNorm * 0.26;
    this.trailPos[i * 3] = x + rightX * runnerOffset + (Math.random() - 0.5) * spread;
    this.trailPos[i * 3 + 1] = y - 0.14 + (Math.random() - 0.5) * 0.14;
    this.trailPos[i * 3 + 2] = z + rightZ * runnerOffset + (Math.random() - 0.5) * spread;
    const swirl = this.trailStyle === 'plaid' ? Math.sin(time * 9 + this.trailEmitSeq * 0.45) * 0.65 : 0;
    this.trailVel[i * 3] = backX * (1.0 + speedNorm * 2.0) + rightX * (sideSign * 0.34 + swirl);
    this.trailVel[i * 3 + 1] = 0.16 + Math.random() * 0.28;
    this.trailVel[i * 3 + 2] = backZ * (1.0 + speedNorm * 2.0) + rightZ * (sideSign * 0.34 + swirl);
    this.trailLife[i] = 1.0;
    this.writeTrailColor(i, time, this.trailEmitSeq++, false, sideSign);
    this.trailColorDirty = true;
  }

  private emitOwlSparkle(x: number, y: number, z: number, heading: number, time: number): void {
    const i = this.trailCursor;
    this.trailCursor = (this.trailCursor + 1) % TRAIL_COUNT;
    const backX = -Math.sin(heading);
    const backZ = Math.cos(heading);
    this.trailPos[i * 3] = x + (Math.random() - 0.5) * 0.18;
    this.trailPos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.12;
    this.trailPos[i * 3 + 2] = z + (Math.random() - 0.5) * 0.18;
    this.trailVel[i * 3] = backX * 0.75 + (Math.random() - 0.5) * 0.35;
    this.trailVel[i * 3 + 1] = -0.14 + Math.random() * 0.18;
    this.trailVel[i * 3 + 2] = backZ * 0.75 + (Math.random() - 0.5) * 0.35;
    this.trailLife[i] = 0.78;
    this.writeTrailColor(i, time, this.trailEmitSeq++, true);
    this.trailColorDirty = true;
  }

  private emitSpray(x: number, y: number, z: number, speedNorm: number, heading: number): void {
    const i = this.sprayCursor;
    this.sprayCursor = (this.sprayCursor + 1) % SPRAY_COUNT;
    const backX = -Math.sin(heading);
    const backZ = Math.cos(heading);
    this.sprayPos[i * 3] = x + (Math.random() - 0.5) * 0.45;
    this.sprayPos[i * 3 + 1] = y + Math.random() * 0.24;
    this.sprayPos[i * 3 + 2] = z + (Math.random() - 0.5) * 0.45;
    this.sprayVel[i * 3] = backX * (2.2 + speedNorm * 3.8) + (Math.random() - 0.5) * (1.6 + speedNorm * 1.4);
    this.sprayVel[i * 3 + 1] = 1.3 + Math.random() * (1.7 + speedNorm * 1.3);
    this.sprayVel[i * 3 + 2] = backZ * (2.2 + speedNorm * 3.8) + (Math.random() - 0.5) * (1.6 + speedNorm * 1.4);
    this.sprayLife[i] = 1.0;
  }

  update(
    dt: number,
    time: number,
    frame: TelemetryFrame,
    env: EnvironmentState,
    beat: number,
    avatarPos: THREE.Vector3,
    heading: number,
    sleigh: PixarSleighHandle,
    sleighLift: number,
    visible: boolean,
    convoyPositions: ReadonlyArray<{ x: number; y: number; z: number; heading: number }>
  ): void {
    const speedNorm = Math.min(1, frame.speedKmh / 110);
    const targetFlight = visible && frame.isPlaidSpeed ? 1 : 0;
    this.flightFactor += (targetFlight - this.flightFactor) * Math.min(1, dt * 1.4);

    // 1. Lightweight Warm/Theme Sleigh Ground Glow Decal (0 PointLights)
    this.groundGlowMesh.visible = visible;
    if (visible) {
      this.groundGlowMesh.position.set(avatarPos.x, avatarPos.y + 0.09, avatarPos.z);
      this.groundGlowMesh.rotation.y = -heading;
      if (this.trailStyle === 'candycane') {
        const bandMix = 0.5 + 0.5 * Math.sin(time * 9.0);
        this.groundGlowMat.color.setRGB(1.0, 0.20 + bandMix * 0.72, 0.25 + bandMix * 0.68);
      } else if (this.trailStyle === 'plaid') {
        const pMix = 0.5 + 0.5 * Math.sin(time * 4.5);
        this.groundGlowMat.color.setRGB(0.68 + pMix * 0.28, 0.22 + (1 - pMix) * 0.58, 1.0);
      } else if (this.trailStyle === 'aurora' || this.superAuroraBoost) {
        const aMix = 0.5 + 0.5 * Math.sin(time * 2.8);
        this.groundGlowMat.color.setRGB(0.18 + aMix * 0.42, 0.92 - aMix * 0.32, 0.68 + aMix * 0.32);
      } else {
        this.groundGlowMat.color.set(
          env.theme === 'cyber2099'
            ? '#4cecff'
            : env.theme === 'nordic'
              ? '#82e4ff'
              : '#ffb860'
        );
      }
      const liftFade = Math.max(0.15, 1 - sleighLift * 0.22);
      const auroraExtra = this.superAuroraBoost ? 0.10 : 0;
      this.groundGlowMat.opacity = Math.min(
        0.44,
        (0.24 + beat * 0.14 + this.flightFactor * 0.10 + auroraExtra) * liftFade * (1 - env.daylightFactor * 0.6)
      );
    }

    const east = Math.sin(heading);
    const north = Math.cos(heading);
    const rightX = north;
    const rightZ = east;
    this.lastTrailHeading = heading;
    this.lastTrailTime = time;

    // 2. Twin-Runner Magic Stardust Wake (classic / aurora / plaid / candycane + superAuroraBoost)
    if (visible) {
      if (sleigh.group.visible) {
        sleigh.getTrailOrigin(this.trailOrigin);
      } else {
        this.trailOrigin.set(avatarPos.x - east * 2.2, avatarPos.y + 0.55, avatarPos.z + north * 2.2);
      }
      this.hasTrailOrigin = true;
      const styled = this.trailStyle !== 'classic';
      if (sleigh.group.visible || frame.speedKmh > 6 || this.superAuroraBoost || styled) {
        const baseEmit = frame.speedKmh > 75 ? 5 : frame.speedKmh > 45 ? 4 : frame.speedKmh > 6 ? 3 : (styled || this.superAuroraBoost ? 1 : 0);
        const emitCount = baseEmit + (this.superAuroraBoost ? 2 : 0) + (styled && frame.speedKmh > 6 ? 1 : 0);
        for (let e = 0; e < emitCount; e++) {
          const side: -1 | 1 = this.trailCursor % 2 === 0 ? -1 : 1;
          this.emitTrail(this.trailOrigin.x, this.trailOrigin.y, this.trailOrigin.z, speedNorm, heading, side, time);
        }
      }
    }

    // 2b. Gliding Companion Snowy Owl (beside & slightly ahead/above vehicle, banking + flapping + sparkles)
    const showOwl = visible && this.companionOwlEnabled;
    this.owlGroup.visible = showOwl;
    if (showOwl) {
      const swayPhase = time * 0.68;
      const latOffset = 3.15 + Math.sin(swayPhase) * 0.85;
      const swayVel = Math.cos(swayPhase) * 0.85 * 0.68;
      const aheadOffset = 2.6 + Math.cos(time * 0.52) * 1.15;
      const bobY = Math.sin(time * 1.75) * 0.36;
      const targetY = avatarPos.y + sleighLift + 3.05 + bobY;

      _owlTargetPos.set(
        avatarPos.x + east * aheadOffset + rightX * latOffset,
        targetY,
        avatarPos.z - north * aheadOffset + rightZ * latOffset
      );

      if (!this.owlInitialized || this.owlPos.distanceToSquared(_owlTargetPos) > 40 * 40) {
        this.owlPos.copy(_owlTargetPos);
        this.owlHeading = heading;
        this.owlBank = 0;
        this.owlInitialized = true;
      } else {
        const followAlpha = 1 - Math.exp(-dt * 4.8);
        this.owlPos.lerp(_owlTargetPos, followAlpha);
        const targetHeading = heading + THREE.MathUtils.clamp(swayVel * 0.14, -0.22, 0.22);
        this.owlHeading += wrapAngleDelta(targetHeading - this.owlHeading) * (1 - Math.exp(-dt * 6.0));
      }

      this.owlGroup.position.copy(this.owlPos);
      this.owlGroup.rotation.y = -this.owlHeading;

      // Smooth aerodynamic bank into turns & soaring weave
      const targetBank = THREE.MathUtils.clamp(-frame.turnRate * 0.52 - swayVel * 0.24, -0.58, 0.58);
      this.owlBank += (targetBank - this.owlBank) * Math.min(1, dt * 6.5);
      this.owlBodyGroup.rotation.z = this.owlBank;

      // Alternating rhythmic snowy-owl wingbeats & outstretched soaring glides
      const glideCycle = (time * 0.42) % 1.0;
      const flapEnvelope = glideCycle < 0.56 ? Math.sin((glideCycle / 0.56) * Math.PI) : 0.1;
      const flapActivity = Math.min(1, flapEnvelope * (0.72 + speedNorm * 0.35 + (frame.isAccelerating ? 0.25 : 0)));
      const flapFreq = 7.4 + speedNorm * 3.8;
      this.owlFlapPhase += dt * flapFreq;

      const innerFlap = 0.08 + Math.sin(this.owlFlapPhase) * 0.54 * flapActivity;
      const outerFlex = -0.05 + Math.sin(this.owlFlapPhase - 0.85) * 0.42 * flapActivity;
      this.owlWingRight.rotation.z = innerFlap;
      this.owlWingLeft.rotation.z = -innerFlap;
      this.owlWingTipRight.rotation.z = outerFlex;
      this.owlWingTipLeft.rotation.z = -outerFlex;

      // Subtle body pitch, tail feather trim, head glance toward sleigh, and moonlit aura pulse
      this.owlBodyGroup.rotation.x = 0.04 + Math.cos(time * 1.75) * 0.08 - innerFlap * 0.06;
      this.owlTailPivot.rotation.x = -0.06 - Math.sin(this.owlFlapPhase) * 0.10 * flapActivity;
      this.owlHeadGroup.rotation.y =
        THREE.MathUtils.clamp(-frame.turnRate * 0.32, -0.35, 0.35) + Math.sin(time * 0.9) * 0.22 + 0.14;
      this.owlHeadGroup.rotation.x = -this.owlBodyGroup.rotation.x * 0.65;
      (this.owlHaloSprite.material as THREE.SpriteMaterial).opacity = 0.28 + 0.08 * Math.sin(time * 3.4);

      // Subtle soft icy-gold sparkles drifting from alternating wingtips (zero per-frame alloc)
      this.owlSparkleAccum += dt;
      if (this.owlSparkleAccum >= 0.075) {
        this.owlSparkleAccum = Math.min(this.owlSparkleAccum - 0.075, 0.075);
        this.owlSparkleSide = this.owlSparkleSide === 1 ? -1 : 1;
        const wingSpanOffset = this.owlSparkleSide * 0.56;
        const owlRightX = Math.cos(this.owlHeading);
        const owlRightZ = Math.sin(this.owlHeading);
        this.emitOwlSparkle(
          this.owlPos.x + owlRightX * wingSpanOffset,
          this.owlPos.y + innerFlap * 0.28,
          this.owlPos.z + owlRightZ * wingSpanOffset,
          this.owlHeading,
          time
        );
      }
    }

    const styledTrail = this.trailStyle !== 'classic';
    const decay = styledTrail ? 0.62 + (1 - speedNorm) * 0.22 : 0.82 + (1 - speedNorm) * 0.28;
    let trailActive = 0;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      if (this.trailLife[i] > 0) {
        this.trailLife[i] = Math.max(0, this.trailLife[i] - dt * decay);
        if (this.trailLife[i] > 0) {
          trailActive++;
          this.trailPos[i * 3] += (this.trailVel[i * 3] + Math.sin(time * 4.0 + i * 0.4) * 0.22) * dt;
          this.trailPos[i * 3 + 1] += this.trailVel[i * 3 + 1] * dt;
          this.trailPos[i * 3 + 2] += (this.trailVel[i * 3 + 2] + Math.cos(time * 3.6 + i * 0.4) * 0.22) * dt;
        }
      }
    }
    if (trailActive > 0 || this.trailWasActive) {
      this.trailPosAttr.needsUpdate = true;
      this.trailLifeAttr.needsUpdate = true;
      if (this.trailColorDirty) {
        this.trailColorAttr.needsUpdate = true;
        this.trailColorDirty = false;
      }
      this.trailWasActive = trailActive > 0;
    }
    this.trailPoints.visible = trailActive > 0;
    const styleSizeMult = styledTrail ? 1.32 : 1.0;
    this.trailMat.uniforms.uSizeScale.value =
      (0.46 + speedNorm * 0.26 + this.flightFactor * 0.14 + beat * 0.08 + (this.superAuroraBoost ? 0.12 : 0)) * styleSizeMult;
    this.trailMat.uniforms.uOpacity.value = Math.min(
      0.95,
      (styledTrail ? 0.78 : 0.54) + speedNorm * 0.22 + beat * 0.10 + (this.superAuroraBoost ? 0.10 : 0)
    );

    // 3. Soft-Fade Powder Snow Spray behind wheels & low sleigh runners + convoy trucks
    if (visible && frame.speedKmh > 12) {
      if (!sleigh.group.visible || sleighLift < 0.35) {
        for (const side of [-0.65, 0.65]) {
          this.emitSpray(
            avatarPos.x - east * 1.4 + rightX * side,
            avatarPos.y + 0.22,
            avatarPos.z + north * 1.4 + rightZ * side,
            speedNorm,
            heading
          );
        }
      }
      if (convoyPositions.length > 0) {
        const truck = convoyPositions[Math.floor(time * 12) % convoyPositions.length];
        const te = Math.sin(truck.heading), tn = Math.cos(truck.heading);
        for (const side of [-0.85, 0.85]) {
          this.emitSpray(
            truck.x - te * 3.4 + tn * side,
            truck.y + 0.22,
            truck.z + tn * 3.4 + te * side,
            0.45,
            truck.heading
          );
        }
      }
    }
    let sprayActive = 0;
    for (let i = 0; i < SPRAY_COUNT; i++) {
      if (this.sprayLife[i] > 0) {
        this.sprayLife[i] = Math.max(0, this.sprayLife[i] - dt * 1.45);
        if (this.sprayLife[i] > 0) {
          sprayActive++;
          this.sprayPos[i * 3] += this.sprayVel[i * 3] * dt;
          this.sprayPos[i * 3 + 1] += this.sprayVel[i * 3 + 1] * dt;
          this.sprayPos[i * 3 + 2] += this.sprayVel[i * 3 + 2] * dt;
          this.sprayVel[i * 3 + 1] -= 4.2 * dt;
        }
      }
    }
    if (sprayActive > 0 || this.sprayWasActive) {
      this.sprayPosAttr.needsUpdate = true;
      this.sprayLifeAttr.needsUpdate = true;
      this.sprayWasActive = sprayActive > 0;
    }
    this.sprayPoints.visible = sprayActive > 0;

    // 4. Instanced Peripheral Star-Warp Streaks (1 draw call, fade in above ~38 km/h)
    const streakAlpha = visible ? Math.max(0, (speedNorm - 0.34) / 0.66) * (0.38 + this.flightFactor * 0.45) : 0;
    this.streakMat.opacity = streakAlpha;
    const showStreaks = streakAlpha > 0.015;
    this.streakInst.visible = showStreaks;
    if (showStreaks) {
      const stretch = 1.0 + speedNorm * 2.5 + this.flightFactor * 1.5;
      const streakVel = (24 + speedNorm * 66) * dt;
      const sleighY = avatarPos.y + (sleigh.group.visible ? sleigh.group.position.y : 1.0);
      _tmpQuat.setFromAxisAngle(_upAxis, -heading);
      _tmpScale.set(1, 1, stretch);
      for (let i = 0; i < this.streaks.length; i++) {
        const s = this.streaks[i];
        s.ahead -= streakVel;
        if (s.ahead < -12) s.ahead += 112;
        const lat = Math.cos(s.angle) * s.radius;
        const vert = Math.sin(s.angle) * s.radius * 0.55;
        _tmpPos.set(
          avatarPos.x + east * s.ahead + rightX * lat,
          sleighY + 1.2 + vert,
          avatarPos.z - north * s.ahead + rightZ * lat
        );
        _tmpMat.compose(_tmpPos, _tmpQuat, _tmpScale);
        this.streakInst.setMatrixAt(i, _tmpMat);
      }
      this.streakInst.instanceMatrix.needsUpdate = true;
    }

    // 5. Instanced Luminous Plaid Altitude Clouds (1 draw call for 42 puffs)
    const showClouds = visible && this.flightFactor > 0.06;
    this.cloudInst.visible = showClouds;
    if (showClouds) {
      this.cloudMat.opacity = Math.min(0.36, this.flightFactor * 0.38);
      const step = (frame.speedKmh / 3.6) * dt * 0.9;
      _tmpQuat.setFromAxisAngle(_upAxis, -heading);
      let idx = 0;
      for (let i = 0; i < this.clouds.length; i++) {
        const c = this.clouds[i];
        c.ahead -= step;
        if (c.ahead < -26) c.ahead += 156;
        const cx = avatarPos.x + east * c.ahead + rightX * c.side;
        const cy = avatarPos.y + c.height;
        const cz = avatarPos.z - north * c.ahead + rightZ * c.side;
        for (let b = 0; b < CLOUD_PUFFS_PER_CLOUD; b++) {
          const localX = (b - 1) * 3.2;
          const localY = (b % 2) * 0.42;
          _tmpPos.set(
            cx + rightX * localX,
            cy + localY,
            cz + rightZ * localX
          );
          _tmpScale.set(1.85 + b * 0.15, 0.48, 1.35);
          _tmpMat.compose(_tmpPos, _tmpQuat, _tmpScale);
          this.cloudInst.setMatrixAt(idx++, _tmpMat);
        }
      }
      this.cloudInst.instanceMatrix.needsUpdate = true;
    }
  }

  dispose(): void {
    this.groundGlowMesh.geometry.dispose();
    this.groundGlowMat.dispose();
    this.trailPoints.geometry.dispose();
    this.trailMat.dispose();
    this.sprayPoints.geometry.dispose();
    this.sprayMat.dispose();
    this.streakInst.dispose();
    this.streakGeo.dispose();
    this.streakMat.dispose();
    this.cloudInst.dispose();
    this.cloudGeo.dispose();
    this.cloudMat.dispose();
    for (const item of this.owlDisposables) {
      item.dispose();
    }
  }
}
