import * as THREE from 'three';
import { SceneId } from '../core/i18n';
import {
  BokehSnowField,
  createBokehSnowField,
  createPixarMoon,
  createPixarSkyDome,
  createSparklingSnowMaterial,
  getStarSpriteTexture,
} from '../three/pixarMaterials';
import {
  createPixarCottage,
  createPixarPineTree,
  createPixarSantaSleigh,
  createPixarStreetLamp,
  PixarCottageHandle,
  PixarSleighHandle,
} from '../three/pixarModels';
import { PixarElonRig } from '../three/pixarElonEvents';
import { createPixarStageOrFallback, PixarStage } from '../three/pixarRenderer';
import { HolidayScene, SceneFrameContext } from './types';

interface RoadSlice {
  mesh: THREE.Mesh;
  centerLine: THREE.Mesh;
  zOffset: number;
}

interface RoadsideItem {
  group: THREE.Group;
  side: -1 | 1;
  lateralDist: number;
  zOffset: number;
  cottage?: PixarCottageHandle;
}

interface ExpandingRing {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  age: number;
}

export class NorthPole3DScene implements HolidayScene {
  readonly id: SceneId = 'flight3d';
  private stage: PixarStage | null = null;
  private fallbackEl: HTMLElement | null = null;

  private skyMat!: THREE.ShaderMaterial;
  private moon!: THREE.Group;
  private gigaSkyline!: THREE.Group;

  private roadSlices: RoadSlice[] = [];
  private roadsideItems: RoadsideItem[] = [];

  private sleigh!: PixarSleighHandle;
  private sleighTrailPoints!: THREE.Points;
  private sleighTrailPos = new Float32Array(110 * 3);
  private trailVec = new THREE.Vector3();

  private snowField!: BokehSnowField;
  private cloudsGroup!: THREE.Group;
  private elonRig!: PixarElonRig;

  private rings: ExpandingRing[] = [];
  private smoothCurve = 0;
  private flightFactor = 0;

  mount(container: HTMLElement): void {
    const res = createPixarStageOrFallback(container, {
      fov: 54,
      fogColor: '#091536',
      fogDensity: 0.0055,
      bloomStrength: 0.42,
      bloomRadius: 0.5,
      bloomThreshold: 0.8,
    });
    this.stage = res.stage;
    this.fallbackEl = res.fallbackEl;
    if (!this.stage) return;

    const { scene, camera } = this.stage;
    camera.position.set(0, 4.4, 11.2);

    // 1. Pixar Sky Dome & Textured Moon
    const sky = createPixarSkyDome(300);
    this.skyMat = sky.material;
    scene.add(sky.mesh);

    this.moon = createPixarMoon(9.5);
    this.moon.position.set(28, 38, -165);
    scene.add(this.moon);

    // 2. Distant Illuminated Giga North Pole Skyline
    const giga = new THREE.Group();
    const bMat = new THREE.MeshStandardMaterial({
      color: '#182442',
      emissive: '#ffb85c',
      emissiveIntensity: 0.65,
      roughness: 0.55,
    });
    const widths = [12, 22, 16, 10];
    const heights = [6, 9, 7, 13];
    widths.forEach((bw, idx) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(bw, heights[idx], 8), bMat);
      m.position.set(-22 + idx * 14, heights[idx] * 0.5, 0);
      giga.add(m);
    });
    const beacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 10, 10),
      new THREE.MeshBasicMaterial({ color: '#ff3b4e', toneMapped: false, fog: false })
    );
    beacon.position.set(20, 14, 0);
    giga.add(beacon);
    giga.position.set(-28, 0, -145);
    scene.add(giga);
    this.gigaSkyline = giga;

    // 3. Sparkling Snow Terrain & Curving 3D Road Slices
    const snowMat = createSparklingSnowMaterial('#84a2cc');
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(420, 420), snowMat);
    ground.rotation.x = -Math.PI * 0.5;
    ground.position.y = -0.05;
    scene.add(ground);

    const segLen = 5;
    const roadGeo = new THREE.PlaneGeometry(7.6, segLen + 0.15);
    const roadMat = new THREE.MeshStandardMaterial({ color: '#1f2b4b', roughness: 0.72 });
    const dashGeo = new THREE.PlaneGeometry(0.24, segLen * 0.52);
    const dashMat = new THREE.MeshBasicMaterial({ color: '#ffd98a' });

    for (let i = 0; i < 34; i++) {
      const mesh = new THREE.Mesh(roadGeo, roadMat);
      mesh.rotation.x = -Math.PI * 0.5;
      mesh.position.y = 0.01;
      const centerLine = new THREE.Mesh(dashGeo, dashMat);
      centerLine.rotation.x = -Math.PI * 0.5;
      centerLine.position.y = 0.02;
      scene.add(mesh, centerLine);
      this.roadSlices.push({ mesh, centerLine, zOffset: 12 - i * segLen });
    }

    // 4. Recycled Pixar Cottages, Fairy-Lit Pines & Volumetric Streetlamps
    const totalSpan = 165;
    const count = 42;
    for (let i = 0; i < count; i++) {
      const side: -1 | 1 = i % 2 === 0 ? -1 : 1;
      let group: THREE.Group;
      let lateralDist = 6.2 + Math.random() * 14;
      let cottage: PixarCottageHandle | undefined;

      if (i % 7 === 0) {
        const lamp = createPixarStreetLamp();
        lamp.setLit(1);
        group = lamp.group;
        lateralDist = 4.6;
      } else if (i % 11 === 0) {
        cottage = createPixarCottage(i);
        cottage.setLit(1);
        group = cottage.group;
        lateralDist = 9.4 + Math.random() * 2.8;
      } else {
        const pine = createPixarPineTree(i % 2 === 0, i);
        pine.setLit(1);
        const s = 0.8 + Math.random() * 0.6;
        pine.group.scale.setScalar(s);
        group = pine.group;
      }

      const zOffset = 10 - (i / count) * totalSpan;
      scene.add(group);
      this.roadsideItems.push({ group, side, lateralDist, zOffset, cottage });
    }

    // 5. Hero Sculpted 3D Pixar Santa Sleigh & Articulated Reindeer
    this.sleigh = createPixarSantaSleigh();
    this.sleigh.group.position.set(0, 1.2, 0);
    scene.add(this.sleigh.group);

    // 3D Golden Stardust Ribbon Trail
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(this.sleighTrailPos, 3));
    const trailMat = new THREE.PointsMaterial({
      map: getStarSpriteTexture(),
      color: '#ffe078',
      size: 0.65,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.sleighTrailPoints = new THREE.Points(trailGeo, trailMat);
    scene.add(this.sleighTrailPoints);

    // 6. Airy Moonlit Clouds below soaring Plaid flight altitude (never blocking camera!)
    const clouds = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({
      color: '#4e6c9e',
      emissive: '#102048',
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.34,
      roughness: 1,
      depthWrite: false,
    });
    for (let i = 0; i < 16; i++) {
      const c = new THREE.Group();
      for (let b = 0; b < 3; b++) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(2.4 + b * 0.5, 10, 10), cloudMat);
        puff.scale.set(1.85, 0.48, 1.3);
        puff.position.set((b - 1) * 3.1, (b % 2) * 0.4, 0);
        c.add(puff);
      }
      const sideX = (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 8);
      c.position.set(sideX, 5.8 + (i % 3) * 0.9, -15 - i * 11);
      clouds.add(c);
    }
    clouds.visible = false;
    scene.add(clouds);
    this.cloudsGroup = clouds;

    // 7. Bokeh 3D Snowfall
    this.snowField = createBokehSnowField(620, {
      minX: -40,
      maxX: 40,
      minY: 0,
      maxY: 34,
      minZ: -102,
      maxZ: 18,
    });
    scene.add(this.snowField.group);

    // 8. Elon 3D Easter Eggs
    this.elonRig = new PixarElonRig();
    scene.add(this.elonRig.group);
  }

  resize(width: number, height: number): void {
    this.stage?.resize(width, height);
  }

  interact(): void {
    if (!this.stage) return;
    const geo = new THREE.TorusGeometry(1.75, 0.12, 10, 32);
    const mat = new THREE.MeshBasicMaterial({
      color: '#ffe588',
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(this.sleigh.group.position).add(new THREE.Vector3(0, 1.4, -7.5));
    this.stage.scene.add(mesh);
    this.rings.push({ mesh, mat, age: 0 });
  }

  private getRoadCurveX(z: number): number {
    const distAhead = Math.max(0, 10 - z);
    return this.smoothCurve * distAhead * distAhead * 0.0052;
  }

  update(dt: number, frame: SceneFrameContext): void {
    if (!this.stage) return;
    const { telemetry, env, elonEvent } = frame;
    const time = telemetry.elapsedSec;
    const speedMs = telemetry.speedKmh / 3.6;
    const forwardStep = speedMs * dt * 1.45;
    const speedNorm = Math.min(1, telemetry.speedKmh / 110);

    this.stage.setQuality(env.quality);
    this.smoothCurve += (telemetry.turnRate - this.smoothCurve) * Math.min(1, dt * 3.5);

    const targetFlight = telemetry.isPlaidSpeed ? 1 : 0;
    this.flightFactor += (targetFlight - this.flightFactor) * Math.min(1, dt * 1.4);

    // Update sky dome
    this.skyMat.uniforms.uTime.value = time;
    this.skyMat.uniforms.uAuroraBoost.value = 1.0 + this.flightFactor * 0.75;
    this.skyMat.uniforms.uTopColor.value.set(env.skyTopColor);
    this.skyMat.uniforms.uMidColor.value.set(env.skyMidColor);
    this.skyMat.uniforms.uHorizonColor.value.set(env.skyHorizonColor);

    const roadSpan = 170;
    for (const s of this.roadSlices) {
      s.zOffset += forwardStep;
      if (s.zOffset > 14) s.zOffset -= roadSpan;
      const cx = this.getRoadCurveX(s.zOffset);
      const nextCx = this.getRoadCurveX(s.zOffset - 5);
      const yaw = Math.atan2(cx - nextCx, 5);
      s.mesh.position.set(cx, 0.01, s.zOffset);
      s.mesh.rotation.y = yaw;
      s.centerLine.position.set(cx, 0.02, s.zOffset);
      s.centerLine.rotation.y = yaw;
    }

    const propSpan = 165;
    for (const item of this.roadsideItems) {
      item.zOffset += forwardStep;
      if (item.zOffset > 14) item.zOffset -= propSpan;
      const cx = this.getRoadCurveX(item.zOffset);
      item.group.position.set(cx + item.side * item.lateralDist, 0, item.zOffset);
      item.cottage?.update(dt, time);
    }

    // Sleigh Flight & Plaid Ascent
    const targetY = 0.55 + this.flightFactor * 12.2 + Math.sin(time * 2.2) * (0.14 + speedNorm * 0.22);
    const targetX = this.smoothCurve * 1.5;
    this.sleigh.group.position.x += (targetX - this.sleigh.group.position.x) * Math.min(1, dt * 5);
    this.sleigh.group.position.y += (targetY - this.sleigh.group.position.y) * Math.min(1, dt * 4);
    this.sleigh.group.rotation.z = -this.smoothCurve * 0.28;
    this.sleigh.group.rotation.x = telemetry.acceleration * 0.02 + this.flightFactor * 0.08;
    this.sleigh.group.rotation.y = -this.smoothCurve * 0.18;
    this.sleigh.update(dt, telemetry.speedKmh, this.smoothCurve, telemetry.acceleration, time);

    // Update Stardust Trail
    this.sleigh.getTrailOrigin(this.trailVec);
    for (let i = 109; i > 0; i--) {
      this.sleighTrailPos[i * 3] = this.sleighTrailPos[(i - 1) * 3];
      this.sleighTrailPos[i * 3 + 1] = this.sleighTrailPos[(i - 1) * 3 + 1];
      this.sleighTrailPos[i * 3 + 2] = this.sleighTrailPos[(i - 1) * 3 + 2] + forwardStep * 0.68 + 0.08;
    }
    this.sleighTrailPos[0] = this.trailVec.x + (Math.random() - 0.5) * 0.65;
    this.sleighTrailPos[1] = this.trailVec.y + (Math.random() - 0.5) * 0.3;
    this.sleighTrailPos[2] = this.trailVec.z;
    this.sleighTrailPoints.geometry.attributes.position.needsUpdate = true;

    // Chase Camera + Plaid FOV
    const { camera } = this.stage;
    camera.position.x += (this.sleigh.group.position.x * 0.65 - camera.position.x) * Math.min(1, dt * 4);
    camera.position.y += (this.sleigh.group.position.y + 3.2 - this.flightFactor * 0.4 - camera.position.y) * Math.min(1, dt * 4);
    camera.lookAt(
      this.sleigh.group.position.x + this.smoothCurve * 4,
      this.sleigh.group.position.y + 1.0,
      -18
    );
    const targetFov = 54 + this.flightFactor * 13;
    if (Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 3);
      camera.updateProjectionMatrix();
    }

    // Luminous clouds
    this.cloudsGroup.visible = this.flightFactor > 0.08;
    if (this.cloudsGroup.visible) {
      for (const c of this.cloudsGroup.children) {
        c.position.z += forwardStep * 0.9;
        if (c.position.z > 14) c.position.z -= 176;
      }
    }

    // Snowfall
    this.snowField.update(dt, -this.smoothCurve * 4, forwardStep * 0.8 + 2.0, 2.0 + speedNorm * 1.4);

    // Moon & Skyline parallax
    this.moon.position.x = 28 - this.smoothCurve * 24;
    this.gigaSkyline.position.x = -28 + this.smoothCurve * 18;

    // Elon 3D Easter Eggs
    this.elonRig.update(elonEvent, dt, time, {
      moonPos: this.moon.position,
      starshipOrigin: new THREE.Vector3(22, 6, -92),
      starshipScale: 1.8,
      starlinkZ: -125,
      roadPointAt: (p, side, out) => {
        const z = -90 + p * 98;
        return out.set(this.getRoadCurveX(z) + side, 0, z);
      },
    });

    // Expanding star rings
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.age += dt;
      if (r.age > 1.6) {
        this.stage.scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        r.mat.dispose();
        this.rings.splice(i, 1);
        continue;
      }
      const sc = 1 + r.age * 4.5;
      r.mesh.scale.set(sc, sc, sc);
      r.mesh.position.z -= (12 + forwardStep) * dt;
      r.mat.opacity = Math.max(0, 1 - r.age / 1.6);
    }

    this.stage.render();
  }

  dispose(): void {
    if (this.fallbackEl) {
      this.fallbackEl.remove();
      this.fallbackEl = null;
    }
    if (this.stage) {
      this.stage.dispose();
      this.stage = null;
    }
  }
}
