import * as THREE from 'three';
import { ELON_MILESTONES } from '../core/elonTimelineData';
import { i18n, SceneId } from '../core/i18n';
import {
  createRoadsideMilestoneEvent,
  disposeTimelineGroup,
  RoadsideMilestoneSlot,
} from '../three/elonTimelineRoadside';
import { OsmMapLayer } from '../three/osmMapRenderer';
import { PixarElonRig } from '../three/pixarElonEvents';
import {
  BokehSnowField,
  createBokehSnowField,
  createPixarMoon,
  createPixarSkyDome,
  getSoftGlowTexture,
  getStarSpriteTexture,
} from '../three/pixarMaterials';
import {
  createFrozenLakePlane,
  createHolidayRoadSign,
  createPixarCottage,
  createPixarPineTree,
  createPixarSantaSleigh,
  createPixarStreetLamp,
  createPixarTeslaSemi,
  HolidayRoadSignHandle,
  PixarCottageHandle,
  PixarSleighHandle,
  PixarTeslaSemiHandle,
} from '../three/pixarModels';
import {
  createPixarAlpineBackdrop,
  createPixarValleyTerrain,
  PixarSnowyRoad,
} from '../three/pixarRoad';
import { createPixarStageOrFallback, PixarStage } from '../three/pixarRenderer';
import { SemiLivery } from '../three/teslaModels';
import { HolidayScene, SceneFrameContext, SceneReactionKind } from './types';

interface RoadsideItem {
  group: THREE.Group;
  side: -1 | 1;
  lateralDist: number;
  zOffset: number;
  isLamp?: boolean;
  cottage?: PixarCottageHandle;
}

interface ExpandingRing {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  age: number;
}

interface CaravanSemiUnit {
  handle: PixarTeslaSemiHandle;
  laneX: number;
  zOffset: number;
  direction: -1 | 1; // -1 = same-dir ahead (-Z), +1 = oncoming toward viewer (+Z)
  speedMps: number;
  idx: number;
}

export class NorthPole3DScene implements HolidayScene {
  readonly id: SceneId = 'flight3d';
  private stage: PixarStage | null = null;
  private fallbackEl: HTMLElement | null = null;

  private skyMat!: THREE.ShaderMaterial;
  private moon!: THREE.Group;
  private alpineBackdrop!: THREE.Group;
  private snowyRoad!: PixarSnowyRoad;

  private roadsideItems: RoadsideItem[] = [];
  private caravanTrucks: CaravanSemiUnit[] = [];

  private sleigh!: PixarSleighHandle;
  private sleighTrailPoints!: THREE.Points;
  private sleighTrailPos = new Float32Array(110 * 3);
  private trailVec = new THREE.Vector3();

  private snowField!: BokehSnowField;
  private cloudsGroup!: THREE.Group;
  private elonRig!: PixarElonRig;
  private osmMap!: OsmMapLayer;
  private frozenLake!: THREE.Mesh;
  private roadSign!: HolidayRoadSignHandle;
  private signZ = -40;
  private lakeBlend = 0;
  private landmarkAlert = 0;

  // Roadside Elon Timeline Encounters embedded right along the highway
  private milestoneIndex = 0;
  private milestoneCooldownM = 28;
  private activeSlot: RoadsideMilestoneSlot | null = null;
  private milestoneCardEl: HTMLElement | null = null;
  private mYearEl!: HTMLElement;
  private mTitleEl!: HTMLElement;
  private mTextEl!: HTMLElement;
  private mCounterEl!: HTMLElement;
  private localeUnsub: (() => void) | null = null;

  private rings: ExpandingRing[] = [];
  private rippleTimer = -1;
  private wheelPhase = 0;
  private roadScroll = 0;
  private smoothCurve = 0;
  private flightFactor = 0;

  mount(container: HTMLElement): void {
    const res = createPixarStageOrFallback(container, {
      fov: 54,
      fogColor: '#0c1b42',
      fogDensity: 0.0046,
      bloomStrength: 0.5,
      bloomRadius: 0.58,
      bloomThreshold: 0.74,
    });
    this.stage = res.stage;
    this.fallbackEl = res.fallbackEl;

    if (this.stage) {
      const { scene, camera } = this.stage;
      camera.position.set(0, 6.2, 11.6);

      // 1. Pixar Sky Dome, Textured Moon & Sculpted Snowy Alpine Backdrop
      const sky = createPixarSkyDome(300);
      this.skyMat = sky.material;
      scene.add(sky.mesh);

      this.moon = createPixarMoon(9.5);
      this.moon.position.set(28, 40, -168);
      scene.add(this.moon);

      this.alpineBackdrop = createPixarAlpineBackdrop();
      scene.add(this.alpineBackdrop);

      // 2. Rolling Undulating Pixar Valley + Continuous Sculpted Snowbank Boulevard
      scene.add(createPixarValleyTerrain());

      this.snowyRoad = new PixarSnowyRoad();
      scene.add(this.snowyRoad.mesh);

      // 3. Recycled Roadside Lamps (with warm snow pools) + Ambient Fallback Scenery
      const totalSpan = 165;
      const count = 42;
      const glowTex = getSoftGlowTexture();
      for (let i = 0; i < count; i++) {
        const side: -1 | 1 = i % 2 === 0 ? -1 : 1;
        let group: THREE.Group;
        let lateralDist = 11.4 + Math.random() * 11;
        let cottage: PixarCottageHandle | undefined;
        let isLamp = false;

        if (i % 6 === 0) {
          const lamp = createPixarStreetLamp();
          lamp.setLit(1);
          // Warm amber glow pool illuminating the snowbank below each lamppost
          const pool = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: glowTex,
              color: '#ffbe62',
              transparent: true,
              opacity: 0.48,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            })
          );
          pool.scale.set(5.4, 3.6, 1);
          pool.position.set(0, 0.75, 0);
          lamp.group.add(pool);
          group = lamp.group;
          lateralDist = 5.45;
          isLamp = true;
        } else if (i % 12 === 2) {
          cottage = createPixarCottage(i);
          cottage.setLit(1);
          group = cottage.group;
          lateralDist = 13.5 + Math.random() * 3.5;
        } else {
          const pine = createPixarPineTree(i % 2 === 0, i);
          pine.setLit(1);
          pine.group.scale.setScalar(0.9 + Math.random() * 0.55);
          group = pine.group;
        }

        const zOffset = 10 - (i / count) * totalSpan;
        scene.add(group);
        this.roadsideItems.push({ group, side, lateralDist, zOffset, isLamp, cottage });
      }

      // 4. Cruising Coca-Cola & ICA Holiday Truck Caravan (3 oncoming + 3 same-dir lanes!)
      const truckSpecs: { livery: SemiLivery; laneX: number; z: number; dir: -1 | 1; spd: number }[] = [
        { livery: 'coca_cola', laneX: -2.45, z: -32, dir: 1, spd: 12.5 },
        { livery: 'ica', laneX: 2.45, z: -52, dir: -1, spd: 12.0 },
        { livery: 'ica', laneX: -2.45, z: -104, dir: 1, spd: 13.0 },
        { livery: 'coca_cola', laneX: 2.45, z: -124, dir: -1, spd: 11.5 },
        { livery: 'coca_cola', laneX: -2.45, z: -172, dir: 1, spd: 13.5 },
        { livery: 'ica', laneX: 2.45, z: -188, dir: -1, spd: 12.5 },
      ];
      truckSpecs.forEach((spec, idx) => {
        const handle = createPixarTeslaSemi(spec.livery);
        handle.group.scale.setScalar(0.68);
        scene.add(handle.group);
        this.caravanTrucks.push({
          handle,
          laneX: spec.laneX,
          zOffset: spec.z,
          direction: spec.dir,
          speedMps: spec.spd,
          idx,
        });
      });

      // 5. Hero Sculpted 3D Pixar Santa Sleigh hovering proudly above road & convoy!
      this.sleigh = createPixarSantaSleigh();
      this.sleigh.group.position.set(0, 3.15, 0);
      scene.add(this.sleigh.group);

      // 3D Golden Stardust Ribbon Trail
      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute('position', new THREE.BufferAttribute(this.sleighTrailPos, 3));
      const trailMat = new THREE.PointsMaterial({
        map: getStarSpriteTexture(),
        color: '#ffe078',
        size: 0.72,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      this.sleighTrailPoints = new THREE.Points(trailGeo, trailMat);
      scene.add(this.sleighTrailPoints);

      // 6. Luminous Clouds revealed above Plaid Altitude
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
        const sideX = (i % 2 === 0 ? 1 : -1) * (9 + (i % 3) * 8);
        c.position.set(sideX, 7.2 + (i % 3) * 0.9, -15 - i * 11);
        clouds.add(c);
      }
      clouds.visible = false;
      scene.add(clouds);
      this.cloudsGroup = clouds;

      // 7. Bokeh Snowfall & Elon Easter Eggs
      this.snowField = createBokehSnowField(620, {
        minX: -40,
        maxX: 40,
        minY: 0,
        maxY: 34,
        minZ: -102,
        maxZ: 18,
      });
      scene.add(this.snowField.group);

      this.elonRig = new PixarElonRig();
      scene.add(this.elonRig.group);

      // 8. Real-Geometry OpenStreetMap Forest-Town Layer (Buildings, Churches, Lakes, Wildlife!)
      this.frozenLake = createFrozenLakePlane(85, 220);
      this.frozenLake.position.set(58, 0.02, -55);
      scene.add(this.frozenLake);

      this.roadSign = createHolidayRoadSign();
      this.roadSign.group.position.set(6.4, 0, this.signZ);
      this.roadSign.group.rotation.y = -0.38;
      scene.add(this.roadSign.group);

      this.osmMap = new OsmMapLayer();
      scene.add(this.osmMap.group);
    }

    this.mountMilestoneCard(container);
    this.localeUnsub = i18n.onChange(() => this.syncMilestoneCard());
  }

  private mountMilestoneCard(container: HTMLElement): void {
    const card = document.createElement('div');
    card.className = 'flight-timeline-card';
    card.addEventListener('pointerdown', (e) => e.stopPropagation());
    card.innerHTML = `
      <div class="ftc-top">
        <span class="ftc-badge" data-ftc="year">2006</span>
        <span class="ftc-counter" data-ftc="counter">1 / ${ELON_MILESTONES.length}</span>
        <button type="button" class="ftc-next-btn" data-ftc-next title="Next Elon Milestone">⏭</button>
      </div>
      <div class="ftc-title" data-ftc="title"></div>
      <div class="ftc-text" data-ftc="text"></div>
    `;
    container.appendChild(card);

    this.milestoneCardEl = card;
    this.mYearEl = card.querySelector('[data-ftc="year"]')!;
    this.mTitleEl = card.querySelector('[data-ftc="title"]')!;
    this.mTextEl = card.querySelector('[data-ftc="text"]')!;
    this.mCounterEl = card.querySelector('[data-ftc="counter"]')!;

    card.querySelector('[data-ftc-next]')?.addEventListener('click', () => {
      this.spawnMilestoneAhead((this.milestoneIndex + 1) % ELON_MILESTONES.length);
    });
  }

  private syncMilestoneCard(): void {
    if (!this.milestoneCardEl) return;
    const idx = this.activeSlot ? this.activeSlot.milestoneIndex : this.milestoneIndex;
    const m = ELON_MILESTONES[idx];
    const copy = m[i18n.getLocale()];
    this.mYearEl.textContent = m.year;
    this.mYearEl.style.borderColor = m.accentHex;
    this.mTitleEl.textContent = copy.title;
    this.mTextEl.textContent = copy.text;
    this.mCounterEl.textContent = `${idx + 1} / ${ELON_MILESTONES.length}`;
  }

  private spawnMilestoneAhead(idx: number): void {
    if (!this.stage) return;
    if (this.activeSlot) {
      this.stage.scene.remove(this.activeSlot.root);
      disposeTimelineGroup(this.activeSlot.root);
      this.activeSlot = null;
    }
    this.milestoneIndex = idx;
    this.activeSlot = createRoadsideMilestoneEvent(
      idx,
      -64,
      (z) => this.getRoadCurveX(z),
      11.6
    );
    this.stage.scene.add(this.activeSlot.root);
    this.syncMilestoneCard();
  }

  triggerReaction(kind: SceneReactionKind): void {
    this.landmarkAlert = 1.0;
    this.sleigh?.triggerReaction(kind);
  }

  resize(width: number, height: number): void {
    this.stage?.resize(width, height);
  }

  interact(): void {
    if (!this.stage) return;
    // Fire golden star ring AND trigger golden holiday light wave across Coca-Cola & ICA Semis!
    this.rippleTimer = 0;
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
    const { telemetry, env, elonEvent, osm } = frame;
    const time = telemetry.elapsedSec;
    const speedMs = telemetry.speedKmh / 3.6;
    const forwardStep = speedMs * dt * 1.45;
    const speedNorm = Math.min(1, telemetry.speedKmh / 110);

    this.stage.setQuality(env.quality);
    this.smoothCurve += (telemetry.turnRate - this.smoothCurve) * Math.min(1, dt * 3.5);
    this.wheelPhase += Math.max(8, telemetry.speedKmh * 0.45) * dt;
    if (this.rippleTimer >= 0) {
      this.rippleTimer += dt;
      if (this.rippleTimer > 2.6) this.rippleTimer = -1;
    }

    this.landmarkAlert = Math.max(0, this.landmarkAlert - dt * 0.55);
    const sleighAlert = Math.max(osm.landmarkPulse, this.landmarkAlert);

    // 1. Update Continuous Sculpted Pixar Snowy Boulevard + Snowbanks
    this.roadScroll += forwardStep;
    this.snowyRoad.update(this.roadScroll, (z) => this.getRoadCurveX(z));

    // 2. Real-Geometry OSM Forest-Town Layer (Buildings, Churches, Lakes, Wildlife)
    this.osmMap.update(dt, telemetry, osm, env.quality, sleighAlert);
    const hasOsmWorld =
      osm.enabled && (osm.buildingCount > 0 || osm.waterCount > 0 || osm.forestCount > 0);

    const targetLake = osm.enabled && osm.biome === 'water' && osm.waterCount === 0 ? 0.92 : 0;
    this.lakeBlend += (targetLake - this.lakeBlend) * Math.min(1, dt * 1.6);
    (this.frozenLake.material as THREE.MeshPhysicalMaterial).opacity = this.lakeBlend;
    this.frozenLake.visible = this.lakeBlend > 0.02;

    this.roadSign.group.visible = osm.enabled;
    this.roadSign.setText(
      `GOD JUL, ${osm.placeName.toUpperCase()}`,
      osm.nearbyLandmark || osm.nearbyChargerName || osm.roadName
    );
    this.signZ += forwardStep;
    if (this.signZ > 12) this.signZ = -145;
    this.roadSign.group.position.set(this.getRoadCurveX(this.signZ) + 6.3, 0, this.signZ);

    // 3. Sky Dome & Aurora
    this.skyMat.uniforms.uTime.value = time;
    this.skyMat.uniforms.uAuroraBoost.value =
      1.0 + this.flightFactor * 0.75 + (osm.enabled && osm.biome === 'forest' ? 0.28 : 0);
    this.skyMat.uniforms.uTopColor.value.set(env.skyTopColor);
    this.skyMat.uniforms.uMidColor.value.set(env.skyMidColor);
    this.skyMat.uniforms.uHorizonColor.value.set(env.skyHorizonColor);

    const targetFlight = telemetry.isPlaidSpeed ? 1 : 0;
    this.flightFactor += (targetFlight - this.flightFactor) * Math.min(1, dt * 1.4);

    // 4. Roadside Lampposts & Fallback Props
    const propSpan = 165;
    for (const item of this.roadsideItems) {
      item.zOffset += forwardStep;
      if (item.zOffset > 14) item.zOffset -= propSpan;
      const cx = this.getRoadCurveX(item.zOffset);
      item.group.position.set(cx + item.side * item.lateralDist, 0, item.zOffset);
      item.group.visible = !hasOsmWorld || !!item.isLamp;
      if (item.group.visible) {
        item.cottage?.update(dt, time);
      }
    }

    // 5. Update 4 Cruising Coca-Cola & ICA Holiday Tesla Semis along Both Highway Lanes!
    const bounce = Math.sin(time * 15) * 0.025;
    for (const truck of this.caravanTrucks) {
      if (truck.direction === 1) {
        // Oncoming lane: moves steadily toward viewer (+Z)
        truck.zOffset += (speedMs + truck.speedMps) * dt;
        if (truck.zOffset > 24) truck.zOffset -= 219;
      } else {
        // Same direction lane: overtakes smoothly when sleigh speeds ahead, pulls ahead when parked
        const relStep = (speedMs * 1.45 - truck.speedMps) * dt;
        truck.zOffset += relStep;
        if (truck.zOffset > 24) truck.zOffset -= 219;
        if (truck.zOffset < -195) truck.zOffset += 219;
      }

      const cx = this.getRoadCurveX(truck.zOffset);
      const nextCx = this.getRoadCurveX(truck.zOffset - 4);
      const tangentYaw = Math.atan2(cx - nextCx, 4);

      truck.handle.group.position.set(cx + truck.laneX, bounce, truck.zOffset);
      truck.handle.group.rotation.y =
        truck.direction === 1 ? tangentYaw + Math.PI : tangentYaw;

      const rippleBoost =
        this.rippleTimer >= 0
          ? Math.max(0, 1 - Math.abs(this.rippleTimer - truck.idx * 0.35) * 2.1)
          : 0;
      truck.handle.update(dt, this.wheelPhase, telemetry.isBraking, rippleBoost, time);
    }

    // 6. Rolling Roadside Elon Timeline Milestone Encounters along the Boulevard!
    if (this.activeSlot) {
      const slot = this.activeSlot;
      slot.zOffset += forwardStep;
      slot.root.position.set(this.getRoadCurveX(slot.zOffset), 0, slot.zOffset);
      const nextX = this.getRoadCurveX(slot.zOffset - 5);
      slot.root.rotation.y = Math.atan2(slot.root.position.x - nextX, 5);

      const approach = Math.max(0, Math.min(1, (slot.zOffset + 90) / 86));
      slot.updater?.(time, dt, approach);

      if (!slot.announced && slot.zOffset >= -62) {
        slot.announced = true;
        this.landmarkAlert = 1.0;
        this.sleigh?.triggerReaction('landmark');
        this.syncMilestoneCard();
      }

      if (this.milestoneCardEl) {
        const showCard = slot.zOffset > -78 && slot.zOffset < 18;
        this.milestoneCardEl.classList.toggle('visible', showCard);
      }

      if (slot.zOffset > 24) {
        this.stage.scene.remove(slot.root);
        disposeTimelineGroup(slot.root);
        this.activeSlot = null;
        this.milestoneCardEl?.classList.remove('visible');
        this.milestoneIndex = (this.milestoneIndex + 1) % ELON_MILESTONES.length;
        this.milestoneCooldownM = 85;
      }
    } else {
      this.milestoneCooldownM -= forwardStep;
      if (this.milestoneCooldownM <= 0) {
        this.spawnMilestoneAhead(this.milestoneIndex);
      }
    }

    // 7. Sleigh Flight & Hero Hover Above Caravan Traffic + Clean Plaid Clearance Above Arch Banners
    const targetY =
      2.95 + this.flightFactor * 5.6 + Math.sin(time * 2.2) * (0.14 + speedNorm * 0.22);
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
      this.sleighTrailPos[i * 3 + 2] =
        this.sleighTrailPos[(i - 1) * 3 + 2] + forwardStep * 0.68 + 0.08;
    }
    this.sleighTrailPos[0] = this.trailVec.x + (Math.random() - 0.5) * 0.65;
    this.sleighTrailPos[1] = this.trailVec.y + (Math.random() - 0.5) * 0.3;
    this.sleighTrailPos[2] = this.trailVec.z;
    this.sleighTrailPoints.geometry.attributes.position.needsUpdate = true;

    // 8. Chase Camera + Plaid FOV
    const { camera } = this.stage;
    camera.position.x +=
      (this.sleigh.group.position.x * 0.65 - camera.position.x) * Math.min(1, dt * 4);
    camera.position.y +=
      (this.sleigh.group.position.y + 3.0 - this.flightFactor * 0.4 - camera.position.y) *
      Math.min(1, dt * 4);
    camera.lookAt(
      this.sleigh.group.position.x + this.smoothCurve * 4,
      this.sleigh.group.position.y - 0.25,
      -24
    );
    const targetFov = 54 + this.flightFactor * 13;
    if (Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 3);
      camera.updateProjectionMatrix();
    }

    // 9. Clouds, Bokeh Snowfall, Horizon Parallax & Elon Easter Eggs
    this.cloudsGroup.visible = this.flightFactor > 0.08;
    if (this.cloudsGroup.visible) {
      for (const c of this.cloudsGroup.children) {
        c.position.z += forwardStep * 0.9;
        if (c.position.z > 14) c.position.z -= 176;
      }
    }

    this.snowField.update(dt, -this.smoothCurve * 4, forwardStep * 0.8 + 2.0, 2.0 + speedNorm * 1.4);

    this.moon.position.x = 28 - this.smoothCurve * 24;
    this.alpineBackdrop.position.x = -this.smoothCurve * 16;

    this.elonRig.update(elonEvent, dt, time, {
      moonPos: this.moon.position,
      starshipOrigin: new THREE.Vector3(24, 6, -96),
      starshipScale: 1.8,
      starlinkZ: -125,
      roadPointAt: (p, side, out) => {
        const z = -90 + p * 98;
        return out.set(this.getRoadCurveX(z) + side, 0, z);
      },
    });

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
    this.localeUnsub?.();
    this.localeUnsub = null;
    if (this.activeSlot) {
      this.stage?.scene.remove(this.activeSlot.root);
      disposeTimelineGroup(this.activeSlot.root);
      this.activeSlot = null;
    }
    this.milestoneCardEl?.remove();
    this.milestoneCardEl = null;
    this.snowyRoad?.dispose();
    this.osmMap?.dispose();
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
