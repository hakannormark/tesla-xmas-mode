import * as THREE from 'three';
import type { EnvironmentState } from '../core/environment';
import type { TelemetryFrame } from '../core/telemetry';
import { getSoftGlowTexture, getStarSpriteTexture } from './pixarMaterials';
import type { PixarSleighHandle } from './pixarModels';

const TRAIL_COUNT = 240;
const SPRAY_COUNT = 120;
const STREAK_COUNT = 48;
const CLOUD_COUNT = 14;

interface SpeedStreak {
  mesh: THREE.Mesh;
  angle: number;
  radius: number;
  ahead: number;
}

interface CloudPuff {
  group: THREE.Group;
  side: number;
  height: number;
  ahead: number;
}

export class SleighMagic {
  readonly group = new THREE.Group();

  private readonly sleighLight = new THREE.PointLight('#ffb860', 2.0, 28, 1.65);

  private readonly trailPoints: THREE.Points;
  private readonly trailMat: THREE.PointsMaterial;
  private readonly trailPos = new Float32Array(TRAIL_COUNT * 3);
  private readonly trailVel = new Float32Array(TRAIL_COUNT * 3);
  private readonly trailLife = new Float32Array(TRAIL_COUNT);
  private trailCursor = 0;

  private readonly sprayPoints: THREE.Points;
  private readonly sprayMat: THREE.PointsMaterial;
  private readonly sprayPos = new Float32Array(SPRAY_COUNT * 3);
  private readonly sprayVel = new Float32Array(SPRAY_COUNT * 3);
  private readonly sprayLife = new Float32Array(SPRAY_COUNT);
  private sprayCursor = 0;

  private readonly streaks: SpeedStreak[] = [];
  private readonly streakMat: THREE.MeshBasicMaterial;
  private readonly streakGeo = new THREE.BoxGeometry(0.045, 0.045, 4.4);

  private readonly cloudsGroup = new THREE.Group();
  private readonly cloudMat: THREE.MeshStandardMaterial;
  private readonly clouds: CloudPuff[] = [];

  private readonly trailOrigin = new THREE.Vector3();
  private flightFactor = 0;

  constructor() {
    this.group.add(this.sleighLight);

    const trailGeo = new THREE.BufferGeometry();
    const trailColors = new Float32Array(TRAIL_COUNT * 3);
    for (let i = 0; i < TRAIL_COUNT; i++) {
      this.trailPos[i * 3 + 1] = -999;
      const isCyan = i % 3 === 0;
      trailColors[i * 3] = isCyan ? 0.62 : 1.0;
      trailColors[i * 3 + 1] = isCyan ? 0.92 : 0.86;
      trailColors[i * 3 + 2] = isCyan ? 1.0 : 0.48;
    }
    trailGeo.setAttribute('position', new THREE.BufferAttribute(this.trailPos, 3));
    trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
    this.trailMat = new THREE.PointsMaterial({
      map: getStarSpriteTexture(),
      vertexColors: true,
      size: 0.78,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.trailPoints = new THREE.Points(trailGeo, this.trailMat);
    this.trailPoints.frustumCulled = false;
    this.group.add(this.trailPoints);

    const sprayGeo = new THREE.BufferGeometry();
    for (let i = 0; i < SPRAY_COUNT; i++) this.sprayPos[i * 3 + 1] = -999;
    sprayGeo.setAttribute('position', new THREE.BufferAttribute(this.sprayPos, 3));
    this.sprayMat = new THREE.PointsMaterial({
      map: getSoftGlowTexture(),
      color: '#e8f5ff',
      size: 0.92,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    });
    this.sprayPoints = new THREE.Points(sprayGeo, this.sprayMat);
    this.sprayPoints.frustumCulled = false;
    this.group.add(this.sprayPoints);

    this.streakMat = new THREE.MeshBasicMaterial({
      color: '#d8f2ff',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    for (let i = 0; i < STREAK_COUNT; i++) {
      const angle = (i / STREAK_COUNT) * Math.PI * 2 + (i % 3) * 0.17;
      const radius = 5.4 + (i % 5) * 1.9;
      const ahead = 8 + ((i * 2.4) % 98);
      const mesh = new THREE.Mesh(this.streakGeo, this.streakMat);
      mesh.visible = false;
      this.group.add(mesh);
      this.streaks.push({ mesh, angle, radius, ahead });
    }

    this.cloudMat = new THREE.MeshStandardMaterial({
      color: '#5c7bae',
      emissive: '#142654',
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0,
      roughness: 1,
      depthWrite: false,
    });
    const puffGeo = new THREE.SphereGeometry(2.6, 10, 8);
    for (let i = 0; i < CLOUD_COUNT; i++) {
      const cg = new THREE.Group();
      for (let b = 0; b < 3; b++) {
        const puff = new THREE.Mesh(puffGeo, this.cloudMat);
        puff.scale.set(1.85 + b * 0.15, 0.48, 1.35);
        puff.position.set((b - 1) * 3.2, (b % 2) * 0.42, 0);
        cg.add(puff);
      }
      const side = (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 6.5);
      const height = 5.2 + (i % 3) * 1.1;
      const ahead = 14 + i * 11;
      this.cloudsGroup.add(cg);
      this.clouds.push({ group: cg, side, height, ahead });
    }
    this.cloudsGroup.visible = false;
    this.group.add(this.cloudsGroup);
  }

  getFlightFactor(): number {
    return this.flightFactor;
  }

  shift(offset: THREE.Vector3): void {
    for (let i = 0; i < TRAIL_COUNT; i++) {
      if (this.trailLife[i] > 0) {
        this.trailPos[i * 3] += offset.x;
        this.trailPos[i * 3 + 1] += offset.y;
        this.trailPos[i * 3 + 2] += offset.z;
      }
    }
    for (let i = 0; i < SPRAY_COUNT; i++) {
      if (this.sprayLife[i] > 0) {
        this.sprayPos[i * 3] += offset.x;
        this.sprayPos[i * 3 + 1] += offset.y;
        this.sprayPos[i * 3 + 2] += offset.z;
      }
    }
  }

  private emitTrail(x: number, y: number, z: number, speedNorm: number, heading: number): void {
    const i = this.trailCursor;
    this.trailCursor = (this.trailCursor + 1) % TRAIL_COUNT;
    const spread = 0.35 + speedNorm * 0.95;
    const backX = -Math.sin(heading);
    const backZ = Math.cos(heading);
    this.trailPos[i * 3] = x + (Math.random() - 0.5) * spread;
    this.trailPos[i * 3 + 1] = y + (Math.random() - 0.5) * (0.2 + speedNorm * 0.45);
    this.trailPos[i * 3 + 2] = z + (Math.random() - 0.5) * spread;
    this.trailVel[i * 3] = backX * (1.2 + speedNorm * 2.8) + (Math.random() - 0.5) * 0.9;
    this.trailVel[i * 3 + 1] = 0.25 + Math.random() * 0.65;
    this.trailVel[i * 3 + 2] = backZ * (1.2 + speedNorm * 2.8) + (Math.random() - 0.5) * 0.9;
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

    // 1. Warm Sleigh/Vehicle PointLight
    this.sleighLight.visible = visible;
    this.sleighLight.position.set(avatarPos.x, avatarPos.y + 2.4 + sleighLift * 1.2, avatarPos.z);
    this.sleighLight.color.set(
      env.theme === 'cyber2099' ? '#4cecff' : env.theme === 'nordic' ? '#82e4ff' : '#ffb860'
    );
    this.sleighLight.intensity =
      (1.9 + beat * 1.4 + this.flightFactor * 0.9) * (1 - env.daylightFactor * 0.55);

    const east = Math.sin(heading);
    const north = Math.cos(heading);
    const rightX = north;
    const rightZ = east;

    // 2. Two-Tone Gold + Ice-Cyan Stardust Wake
    if (visible && (sleigh.group.visible || frame.speedKmh > 8)) {
      if (sleigh.group.visible) {
        sleigh.getTrailOrigin(this.trailOrigin);
      } else {
        this.trailOrigin.set(avatarPos.x - east * 2.2, avatarPos.y + 0.65, avatarPos.z + north * 2.2);
      }
      const emitCount = frame.speedKmh > 50 ? 4 : frame.speedKmh > 10 ? 2 : 1;
      for (let e = 0; e < emitCount; e++) {
        this.emitTrail(this.trailOrigin.x, this.trailOrigin.y, this.trailOrigin.z, speedNorm, heading);
      }
    }
    const decay = 0.62 + (1 - speedNorm) * 0.35;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      if (this.trailLife[i] > 0) {
        this.trailLife[i] -= dt * decay;
        if (this.trailLife[i] <= 0) {
          this.trailPos[i * 3 + 1] = -999;
        } else {
          this.trailPos[i * 3] += (this.trailVel[i * 3] + Math.sin(time * 4.5 + i * 0.4) * 0.35) * dt;
          this.trailPos[i * 3 + 1] += this.trailVel[i * 3 + 1] * dt;
          this.trailPos[i * 3 + 2] += (this.trailVel[i * 3 + 2] + Math.cos(time * 4.0 + i * 0.4) * 0.35) * dt;
        }
      }
    }
    this.trailPoints.geometry.attributes.position.needsUpdate = true;
    this.trailMat.size = 0.58 + speedNorm * 0.62 + this.flightFactor * 0.35 + beat * 0.22;
    this.trailMat.opacity = Math.min(1, 0.66 + speedNorm * 0.3 + beat * 0.14);

    // 3. Powder Snow Spray behind wheels & low sleigh runners + convoy trucks
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
    for (let i = 0; i < SPRAY_COUNT; i++) {
      if (this.sprayLife[i] > 0) {
        this.sprayLife[i] -= dt * 1.6;
        if (this.sprayLife[i] <= 0) {
          this.sprayPos[i * 3 + 1] = -999;
        } else {
          this.sprayPos[i * 3] += this.sprayVel[i * 3] * dt;
          this.sprayPos[i * 3 + 1] += this.sprayVel[i * 3 + 1] * dt;
          this.sprayPos[i * 3 + 2] += this.sprayVel[i * 3 + 2] * dt;
          this.sprayVel[i * 3 + 1] -= 4.2 * dt;
        }
      }
    }
    this.sprayPoints.geometry.attributes.position.needsUpdate = true;

    // 4. Peripheral Star-Warp Streaks (fade in smoothly above ~38 km/h)
    const streakAlpha = visible ? Math.max(0, (speedNorm - 0.34) / 0.66) * (0.38 + this.flightFactor * 0.45) : 0;
    this.streakMat.opacity = streakAlpha;
    const showStreaks = streakAlpha > 0.015;
    const stretch = 1.0 + speedNorm * 2.5 + this.flightFactor * 1.5;
    const streakVel = (24 + speedNorm * 66) * dt;
    const sleighY = avatarPos.y + (sleigh.group.visible ? sleigh.group.position.y : 1.0);
    for (const s of this.streaks) {
      s.mesh.visible = showStreaks;
      if (!showStreaks) continue;
      s.ahead -= streakVel;
      if (s.ahead < -12) s.ahead += 112;
      const lat = Math.cos(s.angle) * s.radius;
      const vert = Math.sin(s.angle) * s.radius * 0.55;
      s.mesh.position.set(
        avatarPos.x + east * s.ahead + rightX * lat,
        sleighY + 1.2 + vert,
        avatarPos.z - north * s.ahead + rightZ * lat
      );
      s.mesh.rotation.y = -heading;
      s.mesh.scale.z = stretch;
    }

    // 5. Luminous Plaid Altitude Clouds
    this.cloudsGroup.visible = visible && this.flightFactor > 0.06;
    if (this.cloudsGroup.visible) {
      this.cloudMat.opacity = Math.min(0.36, this.flightFactor * 0.38);
      const step = (frame.speedKmh / 3.6) * dt * 0.9;
      for (const c of this.clouds) {
        c.ahead -= step;
        if (c.ahead < -26) c.ahead += 156;
        c.group.position.set(
          avatarPos.x + east * c.ahead + rightX * c.side,
          avatarPos.y + c.height,
          avatarPos.z - north * c.ahead + rightZ * c.side
        );
        c.group.rotation.y = -heading;
      }
    }
  }

  dispose(): void {
    this.trailPoints.geometry.dispose();
    this.trailMat.dispose();
    this.sprayPoints.geometry.dispose();
    this.sprayMat.dispose();
    this.streakGeo.dispose();
    this.streakMat.dispose();
    this.cloudsGroup.traverse(obj => {
      if ((obj as THREE.Mesh).isMesh) (obj as THREE.Mesh).geometry.dispose();
    });
    this.cloudMat.dispose();
  }
}
