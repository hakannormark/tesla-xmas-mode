import { streetAtCar } from '../three/mappedRoads';
import { geoDeltaMeters, type OsmPoint2D, type OsmRoadRibbon } from '../core/osmWorld';
import { WinterGrove } from '../three/winterGrove';
import * as THREE from 'three';
import { ELON_MILESTONES } from '../core/elonTimelineData';
import { HolidayAudioEngine } from '../core/audioEngine';
import { i18n, SceneId } from '../core/i18n';
import {
  createRoadsideMilestoneEvent,
  disposeTimelineGroup,
  RoadsideMilestoneSlot,
} from '../three/elonTimelineRoadside';
import { LiveSkyRig } from '../three/liveSkyRig';
import { LivingWorldRig } from '../three/livingWorldProps';
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
  createSwedishRoadSign,
  HolidayRoadSignHandle,
  PixarCottageHandle,
  PixarSleighHandle,
  PixarTeslaSemiHandle,
  SwedishRoadSignHandle,
} from '../three/pixarModels';
import {
  createPixarAlpineBackdrop,
  createPixarValleyTerrain,
  PixarSnowyRoad,
} from '../three/pixarRoad';
import { createPixarStageOrFallback, PixarStage } from '../three/pixarRenderer';
import {
  AccurateCybertruckHandle,
  AccurateOptimusHandle,
  createAccurateCybertruck,
  createAccurateOptimusGen2,
  SemiLivery,
} from '../three/teslaModels';
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

interface SpeedStreak {
  mesh: THREE.Mesh;
  angle: number;
  radius: number;
  z: number;
}

interface GiftProjectile {
  mesh: THREE.Group;
  active: boolean;
  t: number;
  start: THREE.Vector3;
  end: THREE.Vector3;
  onLand?: () => void;
  bonusGifts?: number;
  bonusKind?: 'town_tree' | 'snowman';
}

const TRAIL_COUNT = 240;
const BURST_COUNT = 72;
const CHIMNEY_SPARK_COUNT = 36;
const SPRAY_COUNT = 120;

export class NorthPole3DScene implements HolidayScene {
  readonly id: SceneId = 'flight3d';
  private stage: PixarStage | null = null;
  private fallbackEl: HTMLElement | null = null;

  private valley!: THREE.Mesh;
  private signCaption?: HTMLDivElement;
  private street?: OsmRoadRibbon;
  private localStreet: OsmPoint2D[] = [];
  private fixLat = NaN;
  private fixLon = NaN;
  private fixHeading = NaN;
  private mapVersion = -1;
  private grove?: WinterGrove;
  constructor(private readonly winterLight = false) {}

  private skyMat!: THREE.ShaderMaterial;
  private moon!: THREE.Group;
  private alpineBackdrop!: THREE.Group;
  private snowyRoad!: PixarSnowyRoad;

  private roadsideItems: RoadsideItem[] = [];
  private caravanTrucks: CaravanSemiUnit[] = [];

  private sleigh!: PixarSleighHandle;
  private sleighTrailPoints!: THREE.Points;
  private sleighTrailMat!: THREE.PointsMaterial;
  private sleighTrailPos = new Float32Array(TRAIL_COUNT * 3);
  private trailVec = new THREE.Vector3();

  // Interactive Tap Starburst Particle Pool
  private burstPts!: THREE.Points;
  private burstPos = new Float32Array(BURST_COUNT * 3);
  private burstVel = new Float32Array(BURST_COUNT * 3);
  private burstLife = new Float32Array(BURST_COUNT);

  // High-speed Peripheral Star-Warp Streaks
  private speedStreaks: SpeedStreak[] = [];
  private streakMat!: THREE.MeshBasicMaterial;

  private snowField!: BokehSnowField;
  private cloudsGroup!: THREE.Group;
  private elonRig!: PixarElonRig;
  private liveSkyRig!: LiveSkyRig;
  private osmMap!: OsmMapLayer;
  private livingWorld!: LivingWorldRig;
  private frozenLake!: THREE.Mesh;
  private roadSign!: HolidayRoadSignHandle;
  private swedishSign!: SwedishRoadSignHandle;
  private signZ = -40;
  private swedishSignZ = -92;
  private lakeBlend = 0;
  private landmarkAlert = 0;

  // Red-light Cameos & Gift Cannon State
  private stoppedSec = 0;
  private redLightPlow!: AccurateCybertruckHandle;
  private redLightPlowZ = -135;
  private redLightPlowActive = false;
  private redLightPlowCooldown = 0;
  private redLightOptimus!: AccurateOptimusHandle;

  private giftPool: GiftProjectile[] = [];
  private chimneyPts!: THREE.Points;
  private chimneyPos = new Float32Array(CHIMNEY_SPARK_COUNT * 3);
  private chimneyVel = new Float32Array(CHIMNEY_SPARK_COUNT * 3);
  private chimneyLife = new Float32Array(CHIMNEY_SPARK_COUNT);
  private sprayPts!: THREE.Points;
  private sprayPos = new Float32Array(SPRAY_COUNT * 3);
  private sprayVel = new Float32Array(SPRAY_COUNT * 3);
  private sprayLife = new Float32Array(SPRAY_COUNT);
  private sprayCursor = 0;
  private sleighLight!: THREE.PointLight;
  private giftsDelivered = 0;
  private comboCount = 0;
  private comboTimer = 0;
  private hornFlashTimer = 0;
  private lastAudio?: HolidayAudioEngine;
  private lastGiftCb?: (total: number, combo?: number, bonusMsg?: string) => void;

  // Smooth Cinematic Commercial Camera state
  private camShotTimer = 0;
  private camLookTarget = new THREE.Vector3(0, 3, -26);

  // Roadside Elon Timeline Encounters embedded right along the highway
  private milestoneIndex = 0;
  private milestoneCooldownM = 12;
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
      fov: 50,
      fogColor: '#0c1b42',
      fogDensity: 0.003,
      bloomStrength: 0.5,
      bloomRadius: 0.58,
      bloomThreshold: 0.74,
    });
    this.stage = res.stage;
    this.fallbackEl = res.fallbackEl;

    if (this.stage) {
      const { scene, camera } = this.stage;
      if (this.winterLight) {
        this.grove = new WinterGrove();
        scene.add(this.grove.group);
        const rim = new THREE.DirectionalLight('#a8cfff', 1.35);
        rim.position.set(-22, 14, -35);
        scene.add(rim);
      }
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
      this.valley = createPixarValleyTerrain();
      scene.add(this.valley);

      this.snowyRoad = new PixarSnowyRoad();
      scene.add(this.snowyRoad.mesh);

      // 3. Clean Well-Spaced Victorian Lamps along snowbank outer edges (plus subtle non-OSM fallback)
      const glowTex = getSoftGlowTexture();
      const lampCount = 12;
      const lampSpan = 180;
      for (let i = 0; i < lampCount; i++) {
        const side: -1 | 1 = i % 2 === 0 ? -1 : 1;
        const lamp = createPixarStreetLamp();
        lamp.setLit(1);
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

        const zOffset = 10 - (i / lampCount) * lampSpan;
        scene.add(lamp.group);
        this.roadsideItems.push({
          group: lamp.group,
          side,
          lateralDist: 5.55,
          zOffset,
          isLamp: true,
        });
      }

      // Only 6 subtle ambient fallback objects (shown ONLY when OSM is disabled by user!)
      for (let i = 0; i < 6; i++) {
        const side: -1 | 1 = i % 2 === 0 ? -1 : 1;
        let grp: THREE.Group;
        let cottage: PixarCottageHandle | undefined;
        let lateralDist = 14.5;
        if (i % 3 === 0) {
          cottage = createPixarCottage(i);
          cottage.setLit(1);
          grp = cottage.group;
          lateralDist = 15.5;
        } else {
          const pine = createPixarPineTree(i % 2 === 0, i);
          pine.setLit(1);
          pine.group.scale.setScalar(1.0 + (i % 2) * 0.25);
          grp = pine.group;
        }
        grp.visible = false;
        scene.add(grp);
        this.roadsideItems.push({
          group: grp,
          side,
          lateralDist,
          zOffset: -12 - i * 26,
          isLamp: false,
          cottage,
        });
      }

      // 4. Cruising Coca-Cola & Tesla Holiday Truck Caravan (3 oncoming + 3 same-dir lanes!)
      const truckSpecs: { livery: SemiLivery; laneX: number; z: number; dir: -1 | 1; spd: number }[] = [
        { livery: 'coca_cola', laneX: -2.45, z: -32, dir: 1, spd: 12.5 },
        { livery: 'tesla', laneX: 2.45, z: -52, dir: -1, spd: 12.0 },
        { livery: 'tesla', laneX: -2.45, z: -104, dir: 1, spd: 13.0 },
        { livery: 'coca_cola', laneX: 2.45, z: -124, dir: -1, spd: 11.5 },
        { livery: 'coca_cola', laneX: -2.45, z: -172, dir: 1, spd: 13.5 },
        { livery: 'tesla', laneX: 2.45, z: -188, dir: -1, spd: 12.5 },
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
      this.sleigh.group.position.set(0, 2.95, 0);
      scene.add(this.sleigh.group);

      // 240-Particle Two-Tone Gold + Ice-Cyan Stardust Wake Ribbon
      const trailGeo = new THREE.BufferGeometry();
      const trailColors = new Float32Array(TRAIL_COUNT * 3);
      for (let i = 0; i < TRAIL_COUNT; i++) {
        this.sleighTrailPos[i * 3 + 1] = -99;
        const isCyan = i % 3 === 0;
        trailColors[i * 3] = isCyan ? 0.62 : 1.0;
        trailColors[i * 3 + 1] = isCyan ? 0.92 : 0.86;
        trailColors[i * 3 + 2] = isCyan ? 1.0 : 0.48;
      }
      trailGeo.setAttribute('position', new THREE.BufferAttribute(this.sleighTrailPos, 3));
      trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
      this.sleighTrailMat = new THREE.PointsMaterial({
        map: getStarSpriteTexture(),
        vertexColors: true,
        size: 0.72,
        transparent: true,
        opacity: 0.94,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      this.sleighTrailPoints = new THREE.Points(trailGeo, this.sleighTrailMat);
      this.sleighTrailPoints.frustumCulled = false;
      scene.add(this.sleighTrailPoints);

      // 72-Particle Interactive Screen-Tap Starburst Pool
      const burstGeo = new THREE.BufferGeometry();
      for (let i = 0; i < BURST_COUNT; i++) {
        this.burstPos[i * 3 + 1] = -99;
      }
      burstGeo.setAttribute('position', new THREE.BufferAttribute(this.burstPos, 3));
      this.burstPts = new THREE.Points(
        burstGeo,
        new THREE.PointsMaterial({
          map: getStarSpriteTexture(),
          color: '#ffe47a',
          size: 1.05,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      this.burstPts.frustumCulled = false;
      scene.add(this.burstPts);

      // 48 Peripheral Radial Star-Warp Streaks for Dramatic High-Speed & Plaid Flight Feel!
      this.streakMat = new THREE.MeshBasicMaterial({
        color: '#d8f2ff',
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      });
      const streakGeo = new THREE.BoxGeometry(0.045, 0.045, 4.2);
      for (let i = 0; i < 48; i++) {
        const ang = (i / 48) * Math.PI * 2 + (i % 3) * 0.17;
        const rad = 5.5 + (i % 5) * 1.9;
        const z = -6 - (i * 2.8) % 110;
        const m = new THREE.Mesh(streakGeo, this.streakMat);
        m.position.set(Math.cos(ang) * rad, 4.5 + Math.sin(ang) * rad * 0.65, z);
        scene.add(m);
        this.speedStreaks.push({ mesh: m, angle: ang, radius: rad, z });
      }

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

      this.liveSkyRig = new LiveSkyRig();
      scene.add(this.liveSkyRig.group);

      // Red-light Cybertruck V-Snowplow + Waving Santa-hat Optimus Gen 2
      this.redLightPlow = createAccurateCybertruck(true, true);
      this.redLightPlow.group.scale.setScalar(0.84);
      this.redLightPlow.group.visible = false;
      scene.add(this.redLightPlow.group);

      this.redLightOptimus = createAccurateOptimusGen2();
      this.redLightOptimus.group.scale.setScalar(1.38);
      this.redLightOptimus.group.visible = false;
      scene.add(this.redLightOptimus.group);

      // 6-slot Interactive Gift Cannon Projectile Pool + Chimney Sparkles
      const giftColors = ['#e01b3a', '#188a50', '#2b67d6'];
      const ribMat = new THREE.MeshStandardMaterial({ color: '#ffd166', metalness: 0.6, roughness: 0.25 });
      for (let i = 0; i < 6; i++) {
        const gg = new THREE.Group();
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(0.68, 0.68, 0.68),
          new THREE.MeshPhysicalMaterial({
            color: giftColors[i % giftColors.length],
            roughness: 0.3,
            clearcoat: 0.6,
          })
        );
        const r1 = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.74, 0.14), ribMat);
        const r2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.74, 0.74), ribMat);
        gg.add(box, r1, r2);
        gg.visible = false;
        scene.add(gg);
        this.giftPool.push({
          mesh: gg,
          active: false,
          t: 0,
          start: new THREE.Vector3(),
          end: new THREE.Vector3(),
        });
      }
      const chGeo = new THREE.BufferGeometry();
      for (let i = 0; i < CHIMNEY_SPARK_COUNT; i++) this.chimneyPos[i * 3 + 1] = -99;
      chGeo.setAttribute('position', new THREE.BufferAttribute(this.chimneyPos, 3));
      this.chimneyPts = new THREE.Points(
        chGeo,
        new THREE.PointsMaterial({
          map: getStarSpriteTexture(),
          color: '#ffdf6b',
          size: 1.55,
          transparent: true,
          opacity: 0.96,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      this.chimneyPts.frustumCulled = false;
      scene.add(this.chimneyPts);

      // 8. Real-Geometry OpenStreetMap Forest/Open/Town World Layer + Swedish Highway Sign
      this.frozenLake = createFrozenLakePlane(85, 220);
      this.frozenLake.position.set(58, 0.02, -55);
      scene.add(this.frozenLake);

      this.roadSign = createHolidayRoadSign();
      this.roadSign.group.position.set(6.4, 0, this.signZ);
      this.roadSign.group.rotation.y = -0.38;
      scene.add(this.roadSign.group);

      this.swedishSign = createSwedishRoadSign();
      this.swedishSign.group.position.set(-7.6, 0, this.swedishSignZ);
      this.swedishSign.group.rotation.y = 0.24;
      scene.add(this.swedishSign.group);

      if (this.winterLight) {
        this.signCaption = document.createElement('div');
        this.signCaption.className = 'winter-road-caption';
        container.appendChild(this.signCaption);
        this.swedishSign.group.scale.setScalar(1.4);
        this.roadSign.group.scale.setScalar(1.35);
        trailGeo.setDrawRange(0, 38);
      }
      this.osmMap = new OsmMapLayer(this.winterLight);
      scene.add(this.osmMap.group);

      this.livingWorld = new LivingWorldRig(() => this.osmMap.lightUpNeighborhood());
      scene.add(this.livingWorld.group);

      // Colored sleigh & Rudolph snowbank light spill
      this.sleighLight = new THREE.PointLight('#ffb860', 2.2, 26, 1.65);
      this.sleighLight.position.set(0, 1.9, 0.4);
      this.sleigh.group.add(this.sleighLight);

      // 120-Particle Powder Snow Spray behind convoy tires & sleigh runners
      const sprayGeo = new THREE.BufferGeometry();
      for (let i = 0; i < SPRAY_COUNT; i++) this.sprayPos[i * 3 + 1] = -99;
      sprayGeo.setAttribute('position', new THREE.BufferAttribute(this.sprayPos, 3));
      this.sprayPts = new THREE.Points(
        sprayGeo,
        new THREE.PointsMaterial({
          map: getSoftGlowTexture(),
          color: '#e6f4ff',
          size: 0.92,
          transparent: true,
          opacity: 0.72,
          depthWrite: false,
        })
      );
      this.sprayPts.frustumCulled = false;
      scene.add(this.sprayPts);
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
      this.spawnMilestoneAhead((this.milestoneIndex + 1) % ELON_MILESTONES.length, -104);
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

  private spawnMilestoneAhead(idx: number, startZ = -162): void {
    if (!this.stage) return;
    if (this.activeSlot) {
      this.stage.scene.remove(this.activeSlot.root);
      disposeTimelineGroup(this.activeSlot.root);
      this.activeSlot = null;
    }
    this.milestoneIndex = idx;
    this.activeSlot = createRoadsideMilestoneEvent(
      idx,
      startZ,
      (z) => this.getRoadCurveX(z),
      13.4
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

  private spawnChimneySparks(x: number, y: number, z: number): void {
    for (let i = 0; i < CHIMNEY_SPARK_COUNT; i++) {
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

  triggerConvoySalute(): void {
    if (!this.stage) return;
    this.hornFlashTimer = 1.6;
    this.rippleTimer = 0;
    this.landmarkAlert = 1.0;
    this.sleigh?.triggerReaction('hohoho');
    this.lastAudio?.playConvoyHorn();
    const t = i18n.t();
    this.lastGiftCb?.(this.giftsDelivered, this.comboCount, t.convoyHornToast);
  }

  interact(normX = 0.5, _normY = 0.42): void {
    if (!this.stage) return;
    // 1. Trigger Light Show wave across Coca-Cola & Tesla Semis + Santa surprise bounce!
    this.rippleTimer = 0;
    this.landmarkAlert = 1.0;
    this.sleigh.triggerReaction('gift');

    // 1B. Check interactive Geminids Shooting Star catch!
    if (this.liveSkyRig.tryCatchShootingStar()) {
      this.giftsDelivered += 3;
      this.comboCount = Math.min(9, Math.max(1, this.comboCount + 1));
      this.comboTimer = 4.2;
      this.lastAudio?.playComboFanfare(this.comboCount + 1);
      this.lastGiftCb?.(this.giftsDelivered, this.comboCount, i18n.t().wishStarToast);
    }

    // 2. Launch 3D Parabolic Gift Projectile toward Town Tree, Snowman, or OSM building ahead
    const slot = this.giftPool.find((g) => !g.active) ?? this.giftPool[0];
    if (slot) {
      const wantLeft = normX < 0.5;
      const livingTargets = this.livingWorld?.getInteractiveTargets() ?? [];
      const treeTarget = livingTargets.find((c) => c.kind === 'town_tree');
      const snowTarget =
        livingTargets.find((c) => c.kind === 'snowman' && (wantLeft ? c.x < 0 : c.x >= 0)) ??
        livingTargets.find((c) => c.kind === 'snowman');
      const livingChoice = treeTarget ?? snowTarget;

      slot.active = true;
      slot.t = 0;
      slot.start.copy(this.sleigh.group.position).add(new THREE.Vector3(0, 1.45, -0.4));

      if (livingChoice) {
        slot.end.set(livingChoice.x, livingChoice.y, livingChoice.z);
        slot.onLand = livingChoice.lightUp;
        slot.bonusGifts = livingChoice.bonusGifts;
        slot.bonusKind = livingChoice.kind;
      } else {
        const candidates = this.osmMap.getGiftTargets();
        const chosen =
          candidates.find((c) => c.z < -12 && c.z > -95 && (wantLeft ? c.x < 0 : c.x >= 0)) ??
          candidates[0];
        if (chosen) {
          slot.end.set(chosen.x, chosen.y, chosen.z);
          slot.onLand = chosen.lightUp;
        } else {
          const dropZ = -28;
          const dropX = this.getRoadCurveX(dropZ) + (wantLeft ? -11 : 11);
          slot.end.set(dropX, 1.2, dropZ);
          slot.onLand = undefined;
        }
        slot.bonusGifts = 0;
        slot.bonusKind = undefined;
      }
      slot.mesh.position.copy(slot.start);
      slot.mesh.visible = true;
      this.lastAudio?.playGiftLaunch();
    }

    // 3. Spawn Expanding Star Ring ahead of sleigh
    const geo = new THREE.TorusGeometry(1.85, 0.14, 10, 32);
    const mat = new THREE.MeshBasicMaterial({
      color: '#ffe588',
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(this.sleigh.group.position).add(new THREE.Vector3(0, 1.3, -7.2));
    this.stage.scene.add(mesh);
    this.rings.push({ mesh, mat, age: 0 });

    // 4. Fire Dramatic 3D Golden Starburst Explosion ahead of Santa!
    const origin = this.sleigh.group.position;
    for (let i = 0; i < BURST_COUNT; i++) {
      this.burstPos[i * 3] = origin.x;
      this.burstPos[i * 3 + 1] = origin.y + 1.4;
      this.burstPos[i * 3 + 2] = origin.z - 5.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.35) * Math.PI * 0.85;
      const spd = 4.5 + Math.random() * 10.5;
      this.burstVel[i * 3] = Math.cos(theta) * Math.cos(phi) * spd;
      this.burstVel[i * 3 + 1] = Math.sin(phi) * spd + 2.5;
      this.burstVel[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * spd - 4.0;
      this.burstLife[i] = 1.0;
    }
  }

  private getRoadCurveX(z: number): number {
    if (this.street) {
      for (let i = 1; i < this.localStreet.length; i++) {
        const a = this.localStreet[i - 1], b = this.localStreet[i];
        if ((a.z - z) * (b.z - z) <= 0 && Math.abs(b.z - a.z) > 0.01) {
          return a.x + (z - a.z) * (b.x - a.x) / (b.z - a.z);
        }
      }
    }
    const distAhead = Math.max(0, 10 - z);
    return this.smoothCurve * distAhead * distAhead * 0.0034;
  }

  update(dt: number, frame: SceneFrameContext): void {
    if (!this.stage) return;
    const { telemetry, env, elonEvent, osm, live, audio, onGiftDelivered } = frame;
    this.lastAudio = audio;
    this.lastGiftCb = onGiftDelivered;
    const time = telemetry.elapsedSec;
    const speedMs = telemetry.speedKmh / 3.6;
    const forwardStep = speedMs * dt * 1.45;
    const speedNorm = Math.min(1, telemetry.speedKmh / 110);
    const beat = audio.getBeatEnergy();

    // Track continuous red-light / parked dwell time for Pixar Easter-Egg cameos
    if (telemetry.speedKmh < 3.0) {
      this.stoppedSec += dt;
    } else {
      this.stoppedSec = Math.max(0, this.stoppedSec - dt * 4.0);
    }
    this.redLightPlowCooldown = Math.max(0, this.redLightPlowCooldown - dt);

    const windRad = (env.windDirDeg * Math.PI) / 180;
    const windStrength = Math.min(2.6, env.windSpeedKmh / 14);
    const windX = Math.sin(windRad) * windStrength * 2.2 - this.smoothCurve * 4;

    this.stage.setQuality(env.quality);
    const daylight = this.winterLight ? 0.12 : env.daylightFactor;
    this.stage.setAtmosphere(daylight, this.winterLight ? 0.8 : env.blueHourFactor, this.winterLight ? '#525e80' : env.fogColor);
    this.hornFlashTimer = Math.max(0, this.hornFlashTimer - dt);
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.comboCount = 0;
    }
    this.smoothCurve += (telemetry.turnRate - this.smoothCurve) * Math.min(1, dt * 3.5);
    this.wheelPhase += Math.max(8, telemetry.speedKmh * 0.45) * dt;
    if (this.rippleTimer >= 0) {
      this.rippleTimer += dt;
      if (this.rippleTimer > 2.6) this.rippleTimer = -1;
    }

    this.landmarkAlert = Math.max(0, this.landmarkAlert - dt * 0.55);
    const sleighAlert = Math.max(osm.landmarkPulse, this.landmarkAlert);

    // 1. Update Continuous Sculpted Pixar Snowy Boulevard + Wet Reflections & Glitter
    this.roadScroll += forwardStep;
    const liveMap = this.winterLight && osm.enabled && osm.isLiveOsm && telemetry.source === 'gps' && telemetry.gpsStatus === 'active';
    if (!liveMap) {
      this.street = undefined;
      this.mapVersion = -1;
    } else if (this.mapVersion !== osm.snapshot.version || this.fixLat !== telemetry.latitude ||
               this.fixLon !== telemetry.longitude || this.fixHeading !== telemetry.headingDeg) {
      this.street = streetAtCar(osm.snapshot, telemetry);
      const pos = geoDeltaMeters(osm.snapshot.originLat, osm.snapshot.originLon, telemetry.latitude, telemetry.longitude);
      const angle = telemetry.headingDeg * Math.PI / 180;
      const c = Math.cos(angle), s = Math.sin(angle);
      this.localStreet = (this.street?.points ?? []).map(p => ({
        x: (p.x - pos.x) * c + (p.z - pos.z) * s,
        z: (p.z - pos.z) * c - (p.x - pos.x) * s,
      }));
      this.mapVersion = osm.snapshot.version;
      this.fixLat = telemetry.latitude;
      this.fixLon = telemetry.longitude;
      this.fixHeading = telemetry.headingDeg;
    }
    this.snowyRoad.mesh.visible = !this.street;
    this.valley.scale.y = this.street ? 0.001 : 1;
    if (this.signCaption) {
      this.signCaption.hidden = !osm.enabled || (telemetry.source === 'gps' && !this.street);
      const roadName = this.street ? this.street.name : osm.roadName;
      const caption = [roadName, osm.placeName].filter(Boolean).join(' · ');
      this.signCaption.classList.toggle('mapped', !!this.street);
      if (this.signCaption.textContent !== caption) this.signCaption.textContent = caption;
    }
    if (this.grove) this.grove.group.visible = !this.street;
    if (!this.street) this.grove?.update(this.roadScroll, (z) => this.getRoadCurveX(z));
    if (!this.street) this.snowyRoad.update(this.roadScroll, (z) => this.getRoadCurveX(z));
    const auroraHex =
      env.theme === 'cyber2099' ? '#3eeeff' : env.theme === 'nordic' ? '#7fd6ff' : '#3ce8b4';
    const auroraBoost = env.theme === 'cyber2099' ? 1.25 : 1.0 + live.auroraLiveBoost * 0.45;
    this.snowyRoad.setAtmosphere(time, daylight, auroraHex, auroraBoost);

    // 2. Curve-Locked OSM Forest / Open Countryside / Town Layer + Living Props & Church Bells
    this.osmMap.setVisualMood(beat, windX, env.theme);
    this.osmMap.update(dt, telemetry, osm, env.quality, sleighAlert, (z) =>
      this.getRoadCurveX(z)
    );
    if (this.osmMap.hasPassingChurch()) {
      audio.playChurchBells();
    }
    this.livingWorld.update(dt, time, forwardStep, osm, env.quality, (z) =>
      this.getRoadCurveX(z)
    );
    const hasOsmWorld =
      osm.enabled && (osm.buildingCount > 0 || osm.waterCount > 0 || osm.forestCount > 0);

    const targetLake = osm.enabled && osm.biome === 'water' && osm.waterCount === 0 ? 0.92 : 0;
    this.lakeBlend += (targetLake - this.lakeBlend) * Math.min(1, dt * 1.6);
    (this.frozenLake.material as THREE.MeshPhysicalMaterial).opacity = this.lakeBlend;
    this.frozenLake.visible = this.lakeBlend > 0.02;

    const showSigns = osm.enabled && (!this.winterLight || telemetry.source !== 'gps' || !!this.street);
    this.roadSign.group.visible = showSigns;
    this.roadSign.setText(
      `GOD JUL, ${osm.placeName.toUpperCase()}`,
      osm.nearbyLandmark || osm.nearbyChargerName || osm.roadName
    );
    this.signZ += forwardStep;
    if (this.signZ > 12) this.signZ = -165;
    const signRoadX = this.getRoadCurveX(this.signZ);
    const signNextX = this.getRoadCurveX(this.signZ - 5);
    this.roadSign.group.position.set(signRoadX + 6.3, 0, this.signZ);
    this.roadSign.group.rotation.y = -0.38 + Math.atan2(signRoadX - signNextX, 5);

    // Swedish Trafikverket Motorway Signboard with live OSM place & North Pole distance
    this.swedishSign.group.visible = showSigns;
    this.swedishSign.setDirections(
      telemetry.northPoleDistanceKm,
      osm.placeName,
      this.street?.name || osm.roadName
    );
    this.swedishSignZ += forwardStep;
    if (this.swedishSignZ > 14) this.swedishSignZ = -175;
    const swRx = this.getRoadCurveX(this.swedishSignZ);
    const swNext = this.getRoadCurveX(this.swedishSignZ - 5);
    this.swedishSign.group.position.set(swRx - 7.6, 0, this.swedishSignZ);
    this.swedishSign.group.rotation.y = 0.24 + Math.atan2(swRx - swNext, 5);

    // 3. Sky Dome, Theme Shader, Live NOAA Aurora & Astronomical Moon Phase
    this.skyMat.uniforms.uTime.value = time;
    this.skyMat.uniforms.uThemeMode.value =
      env.theme === 'cyber2099' ? 2.0 : env.theme === 'nordic' ? 1.0 : 0.0;
    this.skyMat.uniforms.uAuroraBoost.value =
      live.auroraLiveBoost +
      beat * 0.48 +
      this.flightFactor * 0.65 +
      (osm.enabled && osm.biome === 'forest' ? 0.24 : 0);
    this.skyMat.uniforms.uTopColor.value.set(this.winterLight ? '#101735' : env.skyTopColor);
    this.skyMat.uniforms.uMidColor.value.set(this.winterLight ? '#48577e' : env.skyMidColor);
    this.skyMat.uniforms.uHorizonColor.value.set(this.winterLight ? '#eba991' : env.skyHorizonColor);
    if (this.skyMat.uniforms.uDaylight) {
      this.skyMat.uniforms.uDaylight.value = daylight;
    }
    this.moon.userData.setMoonPhase?.(env.moonPhase);
    this.moon.userData.setDaylight?.(env.daylightFactor);

    const targetFlight = telemetry.isPlaidSpeed ? 1 : 0;
    this.flightFactor += (targetFlight - this.flightFactor) * Math.min(1, dt * 1.4);

    // 4. Roadside Lampposts (always hugging snowbanks) & Fallback Scenery
    const propSpan = 180;
    for (const item of this.roadsideItems) {
      item.zOffset += forwardStep;
      if (item.zOffset > 14) item.zOffset -= propSpan;
      const cx = this.getRoadCurveX(item.zOffset);
      const nextCx = this.getRoadCurveX(item.zOffset - 5);
      item.group.position.set(cx + item.side * item.lateralDist, 0, item.zOffset);
      item.group.rotation.y = Math.atan2(cx - nextCx, 5);
      item.group.visible = !!item.isLamp || !hasOsmWorld || (this.winterLight && !!item.cottage);
      if (item.group.visible) {
        item.cottage?.update(dt, time);
      }
    }

    // 5. Update 6 Cruising Coca-Cola & Tesla Holiday Semis along Both Highway Lanes!
    const bounce = Math.sin(time * 15) * 0.025;
    for (const truck of this.caravanTrucks) {
      if (truck.direction === 1) {
        truck.zOffset += (speedMs + truck.speedMps) * dt;
        if (truck.zOffset > 24) truck.zOffset -= 219;
      } else {
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
        (this.rippleTimer >= 0
          ? Math.max(0, 1 - Math.abs(this.rippleTimer - truck.idx * 0.35) * 2.1)
          : 0) +
        beat * 0.65;
      const hornWave =
        this.hornFlashTimer > 0
          ? Math.max(0, Math.sin(this.hornFlashTimer * 12) * 0.4 + 0.85)
          : 0;
      truck.handle.update(dt, this.wheelPhase, telemetry.isBraking, rippleBoost, time, hornWave);
    }

    // 5B. Red-Light Cameos: Waving Santa-Hat Optimus + Oncoming Cybertruck Snowplow
    if (this.stoppedSec > 3.5 && !this.redLightPlowActive && this.redLightPlowCooldown <= 0) {
      this.redLightPlowActive = true;
      this.redLightPlowZ = -112;
      this.redLightPlowCooldown = 14;
    }
    if (this.redLightPlowActive) {
      this.redLightPlowZ += forwardStep + 13.5 * dt;
      const px = this.getRoadCurveX(this.redLightPlowZ);
      const pNext = this.getRoadCurveX(this.redLightPlowZ - 5);
      this.redLightPlow.group.visible = true;
      this.redLightPlow.group.position.set(px - 2.45, 0.02, this.redLightPlowZ);
      this.redLightPlow.group.rotation.y = Math.atan2(px - pNext, 5) + Math.PI;
      this.redLightPlow.update(this.wheelPhase + time * 12, time);
      if (this.redLightPlowZ > 24) {
        this.redLightPlowActive = false;
        this.redLightPlow.group.visible = false;
      }
    }

    const showOptimus = this.stoppedSec > 3.0;
    this.redLightOptimus.group.visible = showOptimus;
    if (showOptimus) {
      const optZ = -11;
      const ox = this.getRoadCurveX(optZ) + 7.4;
      this.redLightOptimus.group.position.set(ox, 0, optZ);
      this.redLightOptimus.group.rotation.y = -0.65;
      this.redLightOptimus.update(time);
    }

    // 6. Early, Towering Roadside Elon Timeline Encounters along the Boulevard (toggleable)
    if (!env.elonTimelineEnabled) {
      if (this.activeSlot) {
        this.stage.scene.remove(this.activeSlot.root);
        disposeTimelineGroup(this.activeSlot.root);
        this.activeSlot = null;
      }
      this.milestoneCardEl?.classList.remove('visible');
      this.milestoneCooldownM = 12;
    } else if (this.activeSlot) {
      const slot = this.activeSlot;
      slot.zOffset += forwardStep;
      slot.root.position.set(this.getRoadCurveX(slot.zOffset), 0, slot.zOffset);
      const nextX = this.getRoadCurveX(slot.zOffset - 5);
      slot.root.rotation.y = Math.atan2(slot.root.position.x - nextX, 5);

      const approach = Math.max(0, Math.min(1, (slot.zOffset + 150) / 145));
      slot.updater?.(time, dt, approach);

      if (!slot.announced && slot.zOffset >= -135) {
        slot.announced = true;
        this.landmarkAlert = 1.0;
        this.sleigh?.triggerReaction('landmark');
        this.syncMilestoneCard();
      }

      if (this.milestoneCardEl) {
        const showCard = slot.zOffset > -145 && slot.zOffset < 18;
        this.milestoneCardEl.classList.toggle('visible', showCard);
      }

      if (slot.zOffset > 24) {
        this.stage.scene.remove(slot.root);
        disposeTimelineGroup(slot.root);
        this.activeSlot = null;
        this.milestoneCardEl?.classList.remove('visible');
        this.milestoneIndex = (this.milestoneIndex + 1) % ELON_MILESTONES.length;
        this.milestoneCooldownM = 62;
      }
    } else {
      this.milestoneCooldownM -= forwardStep;
      if (this.milestoneCooldownM <= 0) {
        this.spawnMilestoneAhead(this.milestoneIndex, -162);
      }
    }

    // 7. Sleigh Flight, Red-Light Glögg Wave, Cyber Theme & Multi-Tier Speed Glitter
    this.sleigh.setStoppedMode(this.stoppedSec);
    this.sleigh.setTheme(env.theme);
    const hornBounce = this.hornFlashTimer > 0 ? Math.sin(this.hornFlashTimer * 14) * 0.16 : 0;
    const targetY =
      2.95 +
      this.flightFactor * 5.6 +
      Math.sin(time * 2.2) * (0.14 + speedNorm * 0.22) +
      hornBounce;
    this.sleighLight.color.set(
      env.theme === 'cyber2099' ? '#4cecff' : env.theme === 'nordic' ? '#82e4ff' : '#ffb860'
    );
    this.sleighLight.intensity =
      (1.8 + beat * 1.4 + this.flightFactor * 0.9) * (1 - env.daylightFactor * 0.55);
    const targetX = this.smoothCurve * 1.5;
    this.sleigh.group.position.x += (targetX - this.sleigh.group.position.x) * Math.min(1, dt * 5);
    this.sleigh.group.position.y += (targetY - this.sleigh.group.position.y) * Math.min(1, dt * 4);
    this.sleigh.group.rotation.z = -this.smoothCurve * 0.28;
    this.sleigh.group.rotation.x = telemetry.acceleration * 0.02 + this.flightFactor * 0.08;
    this.sleigh.group.rotation.y = -this.smoothCurve * 0.18;
    this.sleigh.update(dt, telemetry.speedKmh, this.smoothCurve, telemetry.acceleration, time);

    // Update Gift Cannon Projectiles + Chimney Impact Fireworks!
    for (const g of this.giftPool) {
      if (!g.active) continue;
      g.t += dt * 1.45;
      if (g.t >= 1) {
        g.active = false;
        g.mesh.visible = false;
        g.onLand?.();
        this.spawnChimneySparks(g.end.x, g.end.y, g.end.z);
        this.comboTimer = 4.2;
        this.comboCount = Math.min(9, this.comboCount + 1);
        this.giftsDelivered += 1 + (g.bonusGifts ?? 0);
        const t = i18n.t();
        const bonusMsg =
          g.bonusKind === 'town_tree'
            ? t.townTreeLitToast
            : g.bonusKind === 'snowman'
              ? t.snowmanCrownToast
              : undefined;
        this.lastGiftCb?.(this.giftsDelivered, this.comboCount, bonusMsg);
        if (bonusMsg || this.comboCount >= 3) {
          this.lastAudio?.playComboFanfare(this.comboCount);
        } else {
          this.lastAudio?.playChimneyPop();
        }
      } else {
        const p = g.t;
        const arc = Math.sin(p * Math.PI) * 9.5;
        g.mesh.position.set(
          THREE.MathUtils.lerp(g.start.x, g.end.x, p),
          THREE.MathUtils.lerp(g.start.y, g.end.y, p) + arc,
          THREE.MathUtils.lerp(g.start.z, g.end.z, p)
        );
        g.mesh.rotation.x += dt * 7;
        g.mesh.rotation.y += dt * 9;
      }
    }
    for (let i = 0; i < CHIMNEY_SPARK_COUNT; i++) {
      if (this.chimneyLife[i] > 0) {
        this.chimneyLife[i] -= dt * 0.9;
        this.chimneyPos[i * 3] += this.chimneyVel[i * 3] * dt;
        this.chimneyPos[i * 3 + 1] += this.chimneyVel[i * 3 + 1] * dt;
        this.chimneyPos[i * 3 + 2] += (this.chimneyVel[i * 3 + 2] + forwardStep * 0.5) * dt;
        this.chimneyVel[i * 3 + 1] -= 6.5 * dt;
      } else {
        this.chimneyPos[i * 3 + 1] = -99;
      }
    }
    this.chimneyPts.geometry.attributes.position.needsUpdate = true;

    // 120-Particle Powder Snow Spray behind convoy tires & low sleigh runners
    if (telemetry.speedKmh > 12) {
      const emitSpray = (sx: number, sy: number, sz: number, spreadX: number) => {
        const i = this.sprayCursor;
        this.sprayCursor = (this.sprayCursor + 1) % SPRAY_COUNT;
        this.sprayPos[i * 3] = sx + (Math.random() - 0.5) * spreadX;
        this.sprayPos[i * 3 + 1] = sy + Math.random() * 0.28;
        this.sprayPos[i * 3 + 2] = sz;
        this.sprayVel[i * 3] = (Math.random() - 0.5) * (1.8 + speedNorm * 1.6);
        this.sprayVel[i * 3 + 1] = 1.4 + Math.random() * (1.8 + speedNorm * 1.4);
        this.sprayVel[i * 3 + 2] = 2.4 + speedNorm * 4.2 + Math.random() * 2.0;
        this.sprayLife[i] = 1.0;
      };
      const nearbyTrucks = this.caravanTrucks.filter(
        (tr) => tr.zOffset > -48 && tr.zOffset < 10
      );
      if (nearbyTrucks.length > 0) {
        const tr = nearbyTrucks[Math.floor(Math.random() * nearbyTrucks.length)];
        const tx = tr.handle.group.position.x;
        const tz = tr.handle.group.position.z + (tr.direction === 1 ? -3.4 : 3.4);
        emitSpray(tx - 0.72, 0.25, tz, 0.45);
        emitSpray(tx + 0.72, 0.25, tz, 0.45);
      }
      if (this.flightFactor < 0.35) {
        const sx = this.sleigh.group.position.x;
        const sz = this.sleigh.group.position.z + 1.1;
        emitSpray(sx - 0.55, 0.3, sz, 0.5);
        emitSpray(sx + 0.55, 0.3, sz, 0.5);
      }
    }
    for (let i = 0; i < SPRAY_COUNT; i++) {
      if (this.sprayLife[i] > 0) {
        this.sprayLife[i] -= dt * 1.55;
        this.sprayPos[i * 3] += this.sprayVel[i * 3] * dt;
        this.sprayPos[i * 3 + 1] = Math.max(0.05, this.sprayPos[i * 3 + 1] + this.sprayVel[i * 3 + 1] * dt);
        this.sprayPos[i * 3 + 2] += (this.sprayVel[i * 3 + 2] + forwardStep * 0.85) * dt;
        this.sprayVel[i * 3 + 1] -= 4.2 * dt;
      } else {
        this.sprayPos[i * 3 + 1] = -99;
      }
    }
    this.sprayPts.geometry.attributes.position.needsUpdate = true;

    // Update 240-Particle Swirling Stardust Wake (dramatically denser, wider & brighter with speed!)
    this.sleigh.getTrailOrigin(this.trailVec);
    const wakeSpeed = 1.6 + forwardStep * 0.85 + speedNorm * 8.5 * dt;
    for (let i = (this.winterLight ? 38 : TRAIL_COUNT) - 1; i > 0; i--) {
      const swirl = (0.04 + speedNorm * 0.18) * dt * 16;
      this.sleighTrailPos[i * 3] =
        this.sleighTrailPos[(i - 1) * 3] + Math.sin(time * 5 + i * 0.35) * swirl * 0.12;
      this.sleighTrailPos[i * 3 + 1] =
        this.sleighTrailPos[(i - 1) * 3 + 1] + (Math.cos(time * 4 + i * 0.4) * 0.025 + speedNorm * 0.015);
      this.sleighTrailPos[i * 3 + 2] = this.sleighTrailPos[(i - 1) * 3 + 2] + wakeSpeed * 0.08;
    }
    const scatterX = 0.45 + speedNorm * 1.45;
    const scatterY = 0.22 + speedNorm * 0.65;
    this.sleighTrailPos[0] = this.trailVec.x + (Math.random() - 0.5) * scatterX;
    this.sleighTrailPos[1] = this.trailVec.y + (Math.random() - 0.5) * scatterY;
    this.sleighTrailPos[2] = this.trailVec.z;
    this.sleighTrailPoints.geometry.attributes.position.needsUpdate = true;
    this.sleighTrailMat.size = 0.55 + speedNorm * 0.65 + this.flightFactor * 0.35 + beat * 0.22;
    this.sleighTrailMat.opacity = Math.min(1.0, 0.68 + speedNorm * 0.32 + beat * 0.15);

    if (this.winterLight) {
      this.sleighTrailMat.size *= 0.48;
      this.sleighTrailMat.opacity *= 0.32;
    }

    // Update Interactive Tap Starburst Explosion
    for (let i = 0; i < BURST_COUNT; i++) {
      if (this.burstLife[i] > 0) {
        this.burstLife[i] -= dt * 0.85;
        this.burstPos[i * 3] += this.burstVel[i * 3] * dt;
        this.burstPos[i * 3 + 1] += this.burstVel[i * 3 + 1] * dt;
        this.burstPos[i * 3 + 2] += (this.burstVel[i * 3 + 2] + forwardStep * 0.5) * dt;
        this.burstVel[i * 3 + 1] -= 3.8 * dt;
      } else {
        this.burstPos[i * 3 + 1] = -99;
      }
    }
    this.burstPts.geometry.attributes.position.needsUpdate = true;

    // Update 48 High-Speed Peripheral Star-Warp Streaks (fade in smoothly above ~38 km/h -> bright at Plaid!)
    const streakAlpha = Math.max(0, (speedNorm - 0.32) / 0.68) * (0.38 + this.flightFactor * 0.45);
    this.streakMat.opacity = streakAlpha;
    if (streakAlpha > 0.01) {
      const stretch = 1.0 + speedNorm * 2.6 + this.flightFactor * 1.5;
      const streakVel = (24 + speedNorm * 68) * dt;
      for (const s of this.speedStreaks) {
        s.z += streakVel;
        if (s.z > 14) s.z -= 114;
        s.mesh.position.set(
          Math.cos(s.angle) * s.radius,
          this.sleigh.group.position.y + 1.2 + Math.sin(s.angle) * s.radius * 0.55,
          s.z
        );
        s.mesh.scale.z = stretch;
      }
    }

    // 8. Chase Camera OR Pixar Cinematic Commercial Camera + Speed FOV
    const { camera } = this.stage;
    const sleighX = this.sleigh.group.position.x;
    const sleighY = this.sleigh.group.position.y;
    let wantCamX = sleighX * 0.65;
    let wantCamY = sleighY + 3.0 - this.flightFactor * 0.35;
    let wantCamZ = 11.2 + speedNorm * 1.4;
    let wantLookX = sleighX + this.smoothCurve * 4;
    let wantLookY = sleighY - 0.25;
    let wantLookZ = -26;

    if (this.winterLight) {
      // The composition follows the measured turn and speed even during a stop.
      wantCamX = sleighX - (env.cinematicCam ? 1.75 : 0) + this.smoothCurve * 0.8;
      wantCamY = sleighY + 2.05;
      wantCamZ = 12.8 + speedNorm;
      wantLookY = sleighY + 0.45;
      wantLookZ = -13;
    } else if (env.cinematicCam) {
      this.camShotTimer += dt;
      if (this.stoppedSec > 3.6) {
        // Warm front-3/4 close-up of Santa waving his steaming glögg mug & frosted reindeer!
        wantCamX = sleighX + 2.85;
        wantCamY = sleighY + 1.9;
        wantCamZ = -4.2;
        wantLookX = sleighX;
        wantLookY = sleighY + 1.35;
        wantLookZ = 0.4;
      } else {
        const shot = Math.floor(this.camShotTimer / 8.5) % 3;
        if (shot === 1) {
          // Low dramatic Coca-Cola commercial hero wheel angle
          wantCamX = sleighX - 4.3;
          wantCamY = 1.95;
          wantCamZ = 6.2;
          wantLookX = sleighX + this.smoothCurve * 2;
          wantLookY = 2.6;
          wantLookZ = -24;
        } else if (shot === 2) {
          // Sweeping alpine crane shot over convoy & mountains
          wantCamX = sleighX + 5.8 + this.smoothCurve * 5;
          wantCamY = 10.2;
          wantCamZ = 14.5;
          wantLookX = sleighX;
          wantLookY = 2.2;
          wantLookZ = -28;
        }
      }
    }

    const camLerp = Math.min(1, dt * (env.cinematicCam ? 2.1 : 4.0));
    camera.position.x += (wantCamX - camera.position.x) * camLerp;
    camera.position.y += (wantCamY - camera.position.y) * camLerp;
    camera.position.z += (wantCamZ - camera.position.z) * camLerp;
    this.camLookTarget.lerp(new THREE.Vector3(wantLookX, wantLookY, wantLookZ), Math.min(1, dt * 3.5));
    camera.lookAt(this.camLookTarget);

    const targetFov = 50 + speedNorm * 12 + this.flightFactor * 8;
    if (Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 3);
      camera.updateProjectionMatrix();
    }

    // 9. Clouds, Real Open-Meteo Wind Snowfall, Live Sky Rig & Planted Elon Rigs
    this.cloudsGroup.visible = this.flightFactor > 0.08;
    if (this.cloudsGroup.visible) {
      for (const c of this.cloudsGroup.children) {
        c.position.z += forwardStep * 0.9;
        if (c.position.z > 14) c.position.z -= 176;
      }
    }

    const snowZ =
      forwardStep * 0.8 +
      2.0 +
      Math.cos(windRad) * windStrength * 1.4 +
      (env.isSnowingReal ? 2.2 : 0);
    const fallY = 2.0 + speedNorm * 2.2 + (env.isSnowingReal ? 1.85 : 0);
    this.snowField.update(dt, windX, snowZ, fallY);

    this.moon.position.x = 28 - this.smoothCurve * 24;
    this.alpineBackdrop.position.x = -this.smoothCurve * 16;

    this.liveSkyRig.update(
      dt,
      time,
      forwardStep,
      telemetry,
      env,
      live,
      (z) => this.getRoadCurveX(z),
      this.smoothCurve
    );

    this.elonRig.update(elonEvent, dt, time, {
      moonPos: this.moon.position,
      starshipOrigin: new THREE.Vector3(24, 6, -96),
      starshipScale: 1.8,
      starlinkZ: -125,
      forwardStep,
      getRoadCurveX: (z) => this.getRoadCurveX(z),
      superchargerSideOffset: 12.6,
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
    this.signCaption?.remove();
    this.grove?.dispose();
    this.liveSkyRig?.dispose();
    this.livingWorld?.dispose();
    this.chimneyPts?.geometry.dispose();
    (this.chimneyPts?.material as THREE.Material)?.dispose();
    this.sprayPts?.geometry.dispose();
    (this.sprayPts?.material as THREE.Material)?.dispose();
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
