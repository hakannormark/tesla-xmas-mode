import * as THREE from 'three';
import type { EnvironmentState } from '../core/environment';
import type { TelemetryFrame } from '../core/telemetry';
import { getSoftGlowTexture } from './pixarMaterials';
import type { PixarSleighHandle } from './pixarModels';

const TRAIL_COUNT = 240;
const SPRAY_COUNT = 120;
const STREAK_COUNT = 48;
const CLOUD_COUNT = 14;
const CLOUD_PUFFS_PER_CLOUD = 3;

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
      mix(0.35, 1.15, sin(life * 3.14159265)),
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
    float radial = pow(max(0.0, 1.0 - r), 2.1);
    float spikeX = exp(-abs(uv.y) * 22.0) * max(0.0, 1.0 - abs(uv.x) * 2.1);
    float spikeY = exp(-abs(uv.x) * 22.0) * max(0.0, 1.0 - abs(uv.y) * 2.1);
    float star = (spikeX + spikeY) * 0.65;
    float shape = mix(radial, max(radial, star), uStarMix);
    float life = clamp(vLife, 0.0, 1.0);
    float fadeIn = 1.0 - smoothstep(0.90, 1.0, life);
    float fadeOut = smoothstep(0.0, 0.30, life);
    float alpha = shape * fadeIn * fadeOut * uOpacity;
    if (alpha < 0.004) discard;
    vec3 hot = mix(vColor, vec3(1.0, 0.99, 0.92), smoothstep(0.65, 1.0, life) * (0.45 * uStarMix + 0.15));
    vec3 col = mix(uCoolTint, hot, smoothstep(0.0, 0.72, life));
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
  private readonly trailPosAttr: THREE.BufferAttribute;
  private readonly trailLifeAttr: THREE.BufferAttribute;
  private trailCursor = 0;
  private trailWasActive = false;

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

  private readonly trailOrigin = new THREE.Vector3();
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

    // 2. Soft-fade Stardust Trail (custom ShaderMaterial with aLife)
    const trailGeo = new THREE.BufferGeometry();
    const trailColors = new Float32Array(TRAIL_COUNT * 3);
    for (let i = 0; i < TRAIL_COUNT; i++) {
      this.trailPos[i * 3 + 1] = -999;
      this.trailSize[i] = 0.65 + (i % 5) * 0.14;
      const isCyan = i % 3 === 0;
      trailColors[i * 3] = isCyan ? 0.56 : 1.0;
      trailColors[i * 3 + 1] = isCyan ? 0.90 : 0.84;
      trailColors[i * 3 + 2] = isCyan ? 1.0 : 0.44;
    }
    this.trailPosAttr = new THREE.BufferAttribute(this.trailPos, 3);
    this.trailLifeAttr = new THREE.BufferAttribute(this.trailLife, 1);
    trailGeo.setAttribute('position', this.trailPosAttr);
    trailGeo.setAttribute('aLife', this.trailLifeAttr);
    trailGeo.setAttribute('aSize', new THREE.BufferAttribute(this.trailSize, 1));
    trailGeo.setAttribute('aColor', new THREE.BufferAttribute(trailColors, 3));
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
  }

  private emitTrail(x: number, y: number, z: number, speedNorm: number, heading: number, sideSign: -1 | 1): void {
    const i = this.trailCursor;
    this.trailCursor = (this.trailCursor + 1) % TRAIL_COUNT;
    const rightX = Math.cos(heading);
    const rightZ = Math.sin(heading);
    const backX = -Math.sin(heading);
    const backZ = Math.cos(heading);
    const runnerOffset = sideSign * 0.88;
    const spread = 0.18 + speedNorm * 0.28;
    this.trailPos[i * 3] = x + rightX * runnerOffset + (Math.random() - 0.5) * spread;
    this.trailPos[i * 3 + 1] = y - 0.42 + (Math.random() - 0.5) * 0.14;
    this.trailPos[i * 3 + 2] = z + rightZ * runnerOffset + (Math.random() - 0.5) * spread;
    this.trailVel[i * 3] = backX * (0.9 + speedNorm * 1.9) + rightX * sideSign * 0.38;
    this.trailVel[i * 3 + 1] = 0.08 + Math.random() * 0.24;
    this.trailVel[i * 3 + 2] = backZ * (0.9 + speedNorm * 1.9) + rightZ * sideSign * 0.38;
    this.trailLife[i] = 1.0;
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
      this.groundGlowMat.color.set(
        env.theme === 'cyber2099' ? '#4cecff' : env.theme === 'nordic' ? '#82e4ff' : '#ffb860'
      );
      const liftFade = Math.max(0.15, 1 - sleighLift * 0.22);
      this.groundGlowMat.opacity =
        Math.min(0.55, (0.28 + beat * 0.18 + this.flightFactor * 0.12) * liftFade * (1 - env.daylightFactor * 0.6));
    }

    const east = Math.sin(heading);
    const north = Math.cos(heading);
    const rightX = north;
    const rightZ = east;

    // 2. Twin-Runner Gold + Ice-Cyan Soft-Fade Stardust Wake
    if (visible && (sleigh.group.visible || frame.speedKmh > 8)) {
      if (sleigh.group.visible) {
        sleigh.getTrailOrigin(this.trailOrigin);
      } else {
        this.trailOrigin.set(avatarPos.x - east * 2.2, avatarPos.y + 0.55, avatarPos.z + north * 2.2);
      }
      const emitCount = frame.speedKmh > 75 ? 3 : frame.speedKmh > 35 ? 2 : frame.speedKmh > 8 ? 1 : 0;
      for (let e = 0; e < emitCount; e++) {
        const side: -1 | 1 = this.trailCursor % 2 === 0 ? -1 : 1;
        this.emitTrail(this.trailOrigin.x, this.trailOrigin.y, this.trailOrigin.z, speedNorm, heading, side);
      }
    }
    const decay = 0.88 + (1 - speedNorm) * 0.32;
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
      this.trailWasActive = trailActive > 0;
    }
    this.trailPoints.visible = trailActive > 0;
    this.trailMat.uniforms.uSizeScale.value = 0.34 + speedNorm * 0.24 + this.flightFactor * 0.14 + beat * 0.08;
    this.trailMat.uniforms.uOpacity.value = Math.min(0.86, 0.46 + speedNorm * 0.28 + beat * 0.12);

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
  }
}
