import * as THREE from 'three';
import { SceneId } from '../core/i18n';
import {
  BokehSnowField,
  createBokehSnowField,
  createPixarMoon,
  createPixarSkyDome,
  createSparklingSnowMaterial,
} from '../three/pixarMaterials';
import {
  createFrozenLakePlane,
  createHolidayRoadSign,
  createPixarCottage,
  createPixarCybertruck,
  createPixarOptimusElf,
  createPixarPineTree,
  createPixarSantaSleigh,
  createPixarSnowman,
  createPixarStreetLamp,
  createPixarTeslaSemi,
  HolidayRoadSignHandle,
  PixarCottageHandle,
  PixarCybertruckHandle,
  PixarOptimusHandle,
  PixarPineHandle,
  PixarSleighHandle,
  PixarStreetLampHandle,
  PixarTeslaSemiHandle,
} from '../three/pixarModels';
import { PixarElonRig } from '../three/pixarElonEvents';
import { createPixarStageOrFallback, PixarStage } from '../three/pixarRenderer';
import { createPixarForestAnimal, PixarAnimalHandle, WildlifeKind } from '../three/pixarWildlife';
import { HolidayScene, SceneFrameContext, SceneReactionKind } from './types';

interface CaravanProp {
  group: THREE.Group;
  side: -1 | 1;
  lateral: number;
  zPos: number;
  litAmount: number;
  cottage?: PixarCottageHandle;
  pine?: PixarPineHandle;
  lamp?: PixarStreetLampHandle;
  animal?: PixarAnimalHandle;
}

interface RoadSlice {
  mesh: THREE.Mesh;
  dash: THREE.Mesh;
  zPos: number;
}

export class ElectricCaravanScene implements HolidayScene {
  readonly id: SceneId = 'caravan';
  private stage: PixarStage | null = null;
  private fallbackEl: HTMLElement | null = null;

  private skyMat!: THREE.ShaderMaterial;
  private moon!: THREE.Group;
  private snowField!: BokehSnowField;
  private elonRig!: PixarElonRig;
  private frozenLake!: THREE.Mesh;
  private roadSign!: HolidayRoadSignHandle;
  private signZ = -20;
  private lakeBlend = 0;
  private animalAlert = 0;

  private semis: { handle: PixarTeslaSemiHandle; zPos: number; idx: number }[] = [];
  private cyberEscort!: PixarCybertruckHandle;
  private overheadSleigh!: PixarSleighHandle;
  private optimusGreeter!: PixarOptimusHandle;
  private greeterGroup!: THREE.Group;

  private roadSlices: RoadSlice[] = [];
  private props: CaravanProp[] = [];

  private smoothCurve = 0;
  private wheelPhase = 0;
  private rippleTimer = -1;

  mount(container: HTMLElement): void {
    const res = createPixarStageOrFallback(container, {
      fov: 48,
      fogColor: '#091536',
      fogDensity: 0.0045,
      bloomStrength: 0.42,
      bloomRadius: 0.5,
      bloomThreshold: 0.8,
    });
    this.stage = res.stage;
    this.fallbackEl = res.fallbackEl;
    if (!this.stage) return;

    const { scene, camera } = this.stage;
    camera.position.set(-12.2, 4.3, -24.5);
    camera.lookAt(0, 2.3, 0);

    const sky = createPixarSkyDome(300);
    this.skyMat = sky.material;
    scene.add(sky.mesh);

    this.moon = createPixarMoon(9.0);
    this.moon.position.set(22, 32, 85);
    scene.add(this.moon);

    const snowMat = createSparklingSnowMaterial('#84a2cc');
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(360, 360), snowMat);
    ground.rotation.x = -Math.PI * 0.5;
    ground.position.y = -0.02;
    scene.add(ground);

    const sliceCount = 34;
    const sliceLen = 5.0;
    const roadGeo = new THREE.PlaneGeometry(8.2, sliceLen + 0.15);
    const roadMat = new THREE.MeshStandardMaterial({ color: '#1e2845', roughness: 0.68 });
    const dashGeo = new THREE.PlaneGeometry(0.25, sliceLen * 0.5);
    const dashMat = new THREE.MeshBasicMaterial({ color: '#ffdf9a' });

    for (let i = 0; i < sliceCount; i++) {
      const mesh = new THREE.Mesh(roadGeo, roadMat);
      mesh.rotation.x = -Math.PI * 0.5;
      mesh.position.y = 0.01;
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.rotation.x = -Math.PI * 0.5;
      dash.position.y = 0.02;
      scene.add(mesh, dash);
      this.roadSlices.push({ mesh, dash, zPos: -46 + i * sliceLen });
    }

    const convoyZ = [-8, 12, 32];
    convoyZ.forEach((zPos, idx) => {
      const semi = createPixarTeslaSemi();
      semi.group.position.set(0, 0, zPos);
      scene.add(semi.group);
      this.semis.push({ handle: semi, zPos, idx });
    });

    this.cyberEscort = createPixarCybertruck();
    this.cyberEscort.group.position.set(0, 0, 48);
    scene.add(this.cyberEscort.group);

    this.overheadSleigh = createPixarSantaSleigh();
    this.overheadSleigh.group.scale.setScalar(0.85);
    this.overheadSleigh.group.position.set(6.5, 11.5, 6);
    scene.add(this.overheadSleigh.group);

    this.greeterGroup = new THREE.Group();
    const snowman = createPixarSnowman();
    this.optimusGreeter = createPixarOptimusElf();
    this.optimusGreeter.group.position.set(1.8, 0, 0.5);
    this.greeterGroup.add(snowman, this.optimusGreeter.group);
    this.greeterGroup.position.set(-6.2, 0, -16);
    this.greeterGroup.rotation.y = Math.PI * 0.75;
    scene.add(this.greeterGroup);

    const span = 160;
    const count = 30;
    for (let i = 0; i < count; i++) {
      const zPos = -48 + (i / count) * span;
      // Put cottages & tall pines on the far right bank (+1) so camera (-14.5) has 100% unobstructed view of convoy!
      // Left shoulder (-1) features crisp Victorian streetlamps & distant background trees only.
      if (i % 5 === 0) {
        const cot = createPixarCottage(i);
        cot.setLit(0.06);
        scene.add(cot.group);
        this.props.push({ group: cot.group, side: 1, lateral: 10.5, zPos, litAmount: 0.06, cottage: cot });
      } else if (i % 4 === 1) {
        const lamp = createPixarStreetLamp();
        lamp.setLit(0.06);
        scene.add(lamp.group);
        const lampSide: -1 | 1 = i % 8 === 1 ? -1 : 1;
        this.props.push({ group: lamp.group, side: lampSide, lateral: 5.4, zPos, litAmount: 0.06, lamp });
      } else {
        const pine = createPixarPineTree(true, i);
        const s = 0.85 + (i % 3) * 0.24;
        pine.group.scale.setScalar(s);
        pine.setLit(0.06);
        scene.add(pine.group);
        this.props.push({
          group: pine.group,
          side: 1,
          lateral: 7.4 + (i % 4) * 2.4,
          zPos,
          litAmount: 0.06,
          pine,
        });
      }
    }

    const faunaKinds: WildlifeKind[] = ['stag', 'fox', 'owl', 'rabbit', 'stag'];
    faunaKinds.forEach((kind, fIdx) => {
      const anim = createPixarForestAnimal(kind, fIdx + 7);
      const zPos = -32 + fIdx * 28;
      anim.group.scale.setScalar(kind === 'stag' ? 1.1 : 1.25);
      anim.group.rotation.y = -Math.PI * 0.48;
      scene.add(anim.group);
      this.props.push({
        group: anim.group,
        side: 1,
        lateral: 7.2 + (fIdx % 2) * 2.2,
        zPos,
        litAmount: 0.2,
        animal: anim,
      });
    });

    this.snowField = createBokehSnowField(560, {
      minX: -36,
      maxX: 36,
      minY: 0,
      maxY: 22,
      minZ: -50,
      maxZ: 60,
    });
    scene.add(this.snowField.group);

    this.elonRig = new PixarElonRig();
    scene.add(this.elonRig.group);

    this.frozenLake = createFrozenLakePlane(80, 180);
    this.frozenLake.position.set(52, 0.03, 28);
    scene.add(this.frozenLake);

    this.roadSign = createHolidayRoadSign();
    this.roadSign.group.position.set(5.6, 0, this.signZ);
    this.roadSign.group.rotation.y = Math.PI * 0.72;
    scene.add(this.roadSign.group);
  }

  triggerReaction(kind: SceneReactionKind): void {
    this.animalAlert = 1.0;
    this.overheadSleigh?.triggerReaction(kind);
  }

  resize(width: number, height: number): void {
    this.stage?.resize(width, height);
  }

  interact(): void {
    this.rippleTimer = 0;
  }

  private getRoadX(z: number): number {
    return this.smoothCurve * z * z * 0.0022;
  }

  update(dt: number, frame: SceneFrameContext): void {
    if (!this.stage) return;
    const { telemetry, env, elonEvent, osm } = frame;
    const time = telemetry.elapsedSec;
    const speedNorm = Math.min(1, telemetry.speedKmh / 110);
    const travel = (telemetry.speedKmh / 3.6) * dt * 1.15;

    this.stage.setQuality(env.quality);
    this.smoothCurve += (telemetry.turnRate - this.smoothCurve) * Math.min(1, dt * 3.5);
    this.wheelPhase += telemetry.speedKmh * 0.42 * dt;

    this.animalAlert = Math.max(0, this.animalAlert - dt * 0.55);
    const alert = Math.max(osm.landmarkPulse, this.animalAlert);

    const hasWater = osm.enabled && (osm.biome === 'water' || osm.waterCount > 0);
    const targetLake = hasWater ? 0.92 : 0;
    this.lakeBlend += (targetLake - this.lakeBlend) * Math.min(1, dt * 1.6);
    (this.frozenLake.material as THREE.MeshPhysicalMaterial).opacity = this.lakeBlend;
    this.frozenLake.visible = this.lakeBlend > 0.02;

    this.roadSign.group.visible = osm.enabled;
    this.roadSign.setText(
      `GOD JUL, ${osm.placeName.toUpperCase()}`,
      osm.nearbyLandmark || osm.nearbyChargerName || osm.roadName
    );
    this.signZ += travel;
    if (this.signZ > 85) this.signZ = -48;
    this.roadSign.group.position.set(this.getRoadX(this.signZ) + 5.8, 0, this.signZ);

    if (this.rippleTimer >= 0) {
      this.rippleTimer += dt;
      if (this.rippleTimer > 2.8) this.rippleTimer = -1;
    }

    this.skyMat.uniforms.uTime.value = time;
    this.skyMat.uniforms.uAuroraBoost.value = telemetry.isPlaidSpeed ? 1.55 : 1.05 + speedNorm * 0.3;
    this.skyMat.uniforms.uTopColor.value.set(env.skyTopColor);
    this.skyMat.uniforms.uMidColor.value.set(env.skyMidColor);
    this.skyMat.uniforms.uHorizonColor.value.set(env.skyHorizonColor);

    const sliceSpan = 170;
    for (const s of this.roadSlices) {
      s.zPos += travel;
      if (s.zPos > 120) s.zPos -= sliceSpan;
      const cx = this.getRoadX(s.zPos);
      const nextCx = this.getRoadX(s.zPos - 5);
      const yaw = Math.atan2(cx - nextCx, 5);
      s.mesh.position.set(cx, 0.01, s.zPos);
      s.mesh.rotation.y = yaw;
      s.dash.position.set(cx, 0.02, s.zPos);
      s.dash.rotation.y = yaw;
    }

    const bounce = telemetry.isMoving ? Math.sin(time * 16) * 0.04 : 0;
    for (const s of this.semis) {
      const cx = this.getRoadX(s.zPos);
      const nextCx = this.getRoadX(s.zPos - 4);
      s.handle.group.position.set(cx, bounce, s.zPos);
      s.handle.group.rotation.y = Math.atan2(cx - nextCx, 4);
      const rippleBoost =
        this.rippleTimer >= 0
          ? Math.max(0, 1 - Math.abs(this.rippleTimer - s.idx * 0.42) * 2.2)
          : 0;
      s.handle.update(dt, this.wheelPhase, telemetry.isBraking, rippleBoost, time);
    }

    const cyberZ = 48;
    const cyberX = this.getRoadX(cyberZ);
    const cyberNextX = this.getRoadX(cyberZ - 4);
    this.cyberEscort.group.position.set(cyberX, bounce, cyberZ);
    this.cyberEscort.group.rotation.y = Math.atan2(cyberX - cyberNextX, 4);
    this.cyberEscort.update(this.wheelPhase, time);

    this.overheadSleigh.group.position.set(
      7.2 + Math.sin(time * 0.5) * 2.5,
      11.5 + Math.cos(time * 1.4) * 0.4,
      8 + Math.sin(time * 0.4) * 3
    );
    this.overheadSleigh.group.rotation.z = -this.smoothCurve * 0.25;
    this.overheadSleigh.update(dt, telemetry.speedKmh, this.smoothCurve, telemetry.acceleration, time);

    const propSpan = 160;
    for (const p of this.props) {
      p.zPos += travel;
      if (p.zPos > 112) {
        p.zPos -= propSpan;
        p.litAmount = 0.06;
      }
      const cx = this.getRoadX(p.zPos);
      p.group.position.set(cx + p.side * p.lateral, 0, p.zPos);
      p.cottage?.update(dt, time);
      p.animal?.update(dt, time, alert);

      const targetLit = p.zPos > -25 ? 1.0 : 0.06;
      const rate = 2.8 + speedNorm * 4.5;
      p.litAmount += (targetLit - p.litAmount) * Math.min(1, dt * rate);
      p.cottage?.setLit(p.litAmount);
      p.pine?.setLit(p.litAmount);
      p.lamp?.setLit(p.litAmount);
    }

    this.greeterGroup.visible = telemetry.speedKmh < 12;
    if (this.greeterGroup.visible) {
      this.optimusGreeter.update(time);
    }

    this.stage.camera.position.x = -12.2 - this.smoothCurve * 3.5;
    this.stage.camera.lookAt(this.getRoadX(2), 2.3, 2);

    this.snowField.update(dt, -this.smoothCurve * 3, 2.2 + travel * 2, 2.4);

    this.elonRig.update(elonEvent, dt, time, {
      moonPos: this.moon.position,
      starshipOrigin: new THREE.Vector3(24, 6, 80),
      starshipScale: 1.65,
      starlinkZ: 96,
      roadPointAt: (p, side, out) => {
        const z = -34 + p * 84;
        return out.set(this.getRoadX(z) + side, 0, z);
      },
    });

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
