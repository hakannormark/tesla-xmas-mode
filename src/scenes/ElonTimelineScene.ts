import * as THREE from 'three';
import { ELON_MILESTONES, TimelineDioramaKind } from '../core/elonTimelineData';
import { i18n, SceneId } from '../core/i18n';
import {
  BokehSnowField,
  createBokehSnowField,
  createPixarMoon,
  createPixarSkyDome,
  createSparklingSnowMaterial,
  getSoftGlowTexture,
} from '../three/pixarMaterials';
import {
  createPixarCottage,
  createPixarPineTree,
  createPixarSantaSleigh,
  createPixarStreetLamp,
  PixarSleighHandle,
} from '../three/pixarModels';
import { createPixarStageOrFallback, PixarStage } from '../three/pixarRenderer';
import {
  createAccurateCybertruck,
  createAccurateOptimusGen2,
  createAccurateStarmanRoadster,
  createAccurateStarshipStack,
  createAccurateSuperchargerPlaza,
  createAccurateTeslaSemi,
} from '../three/teslaModels';
import { createPixarForestAnimal, PixarAnimalHandle, WildlifeKind } from '../three/pixarWildlife';
import { HolidayScene, SceneFrameContext, SceneReactionKind } from './types';

const EVENT_SPACING = 82;
const QUEUE_SIZE = 3;

let sharedGoldMat: THREE.MeshStandardMaterial | null = null;
let sharedSteelMat: THREE.MeshPhysicalMaterial | null = null;
let sharedBulbMat: THREE.MeshBasicMaterial | null = null;

function markShared<T extends THREE.Material>(m: T): T {
  m.userData.shared = true;
  return m;
}

function getTimelineMats() {
  if (!sharedGoldMat) {
    sharedGoldMat = markShared(
      new THREE.MeshStandardMaterial({ color: '#ffd166', metalness: 0.88, roughness: 0.2 })
    );
  }
  if (!sharedSteelMat) {
    sharedSteelMat = markShared(
      new THREE.MeshPhysicalMaterial({ color: '#dce6f5', metalness: 0.9, roughness: 0.2 })
    );
  }
  if (!sharedBulbMat) {
    sharedBulbMat = markShared(
      new THREE.MeshBasicMaterial({ color: '#fff3c4', toneMapped: false })
    );
  }
  return { gold: sharedGoldMat, steel: sharedSteelMat, bulb: sharedBulbMat };
}

function createTextPlane(
  text: string,
  bgHex: string,
  fgHex: string,
  w = 512,
  h = 160,
  worldWidth = 3.8
): THREE.Mesh {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = fgHex;
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, w - 16, h - 16);
  ctx.fillStyle = fgHex;
  ctx.font = `700 ${Math.round(h * 0.4)}px "Cinzel", Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, w * 0.5, h * 0.52, w - 44);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData.ownedByTimeline = true;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(worldWidth, (worldWidth * h) / w),
    new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      toneMapped: false,
      side: THREE.DoubleSide,
    })
  );
}

interface RoadsideMilestoneSlot {
  milestoneIndex: number;
  root: THREE.Group; // Positioned on highway center at zOffset (contains archway gate + anchored spectacle)
  spectacle: THREE.Group;
  side: -1 | 1;
  isOverhead: boolean;
  zOffset: number;
  announced: boolean;
  updater?: (time: number, dt: number, approachProgress: number) => void;
}

interface SceneryItem {
  group: THREE.Group;
  zOffset: number;
  side: -1 | 1;
  lat: number;
  animal?: PixarAnimalHandle;
}

export class ElonTimelineScene implements HolidayScene {
  readonly id: SceneId = 'timeline';
  private stage: PixarStage | null = null;
  private fallbackEl: HTMLElement | null = null;

  private skyMat!: THREE.ShaderMaterial;
  private sleigh!: PixarSleighHandle;
  private snowField!: BokehSnowField;

  private roadSlices: { mesh: THREE.Mesh; dash: THREE.Mesh; zOffset: number }[] = [];
  private scenery: SceneryItem[] = [];
  private slots: RoadsideMilestoneSlot[] = [];

  // Interactive Story Card & Timeline Bar DOM
  private overlayEl: HTMLElement | null = null;
  private cardYearEl!: HTMLElement;
  private cardStatusEl!: HTMLElement;
  private cardTitleEl!: HTMLElement;
  private cardTextEl!: HTMLElement;
  private counterEl!: HTMLElement;
  private playPauseBtn!: HTMLButtonElement;
  private dotButtons: HTMLButtonElement[] = [];

  private currentIndex = 0;
  private nextSpawnIndex = 0;
  private autoPlay = true;
  private smoothCurve = 0;
  private animalAlert = 0;
  private localeUnsub: (() => void) | null = null;

  mount(container: HTMLElement): void {
    const res = createPixarStageOrFallback(container, {
      fov: 52,
      fogColor: '#091536',
      fogDensity: 0.0055,
      bloomStrength: 0.44,
      bloomRadius: 0.5,
      bloomThreshold: 0.8,
    });
    this.stage = res.stage;
    this.fallbackEl = res.fallbackEl;

    if (this.stage) {
      const { scene, camera } = this.stage;
      camera.position.set(0, 4.3, 10.8);
      camera.lookAt(0, 2.2, -16);

      const sky = createPixarSkyDome(300);
      this.skyMat = sky.material;
      scene.add(sky.mesh);

      const moon = createPixarMoon(9.5);
      moon.position.set(-28, 34, -155);
      scene.add(moon);

      const snowMat = createSparklingSnowMaterial('#84a2cc');
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(420, 420), snowMat);
      ground.rotation.x = -Math.PI * 0.5;
      ground.position.y = -0.05;
      scene.add(ground);

      // Curving Snowy Time-Highway
      const segLen = 5;
      const roadGeo = new THREE.PlaneGeometry(7.8, segLen + 0.15);
      const roadMat = new THREE.MeshStandardMaterial({ color: '#1b2747', roughness: 0.72 });
      const dashGeo = new THREE.PlaneGeometry(0.24, segLen * 0.52);
      const dashMat = new THREE.MeshBasicMaterial({ color: '#ffd98a' });
      for (let i = 0; i < 38; i++) {
        const mesh = new THREE.Mesh(roadGeo, roadMat);
        mesh.rotation.x = -Math.PI * 0.5;
        mesh.position.y = 0.01;
        const dash = new THREE.Mesh(dashGeo, dashMat);
        dash.rotation.x = -Math.PI * 0.5;
        dash.position.y = 0.02;
        scene.add(mesh, dash);
        this.roadSlices.push({ mesh, dash, zOffset: 14 - i * segLen });
      }

      // Enchanted Forest Pines, Golden Lamps & Animated Forest Animals between highway milestones!
      const faunaCycle: WildlifeKind[] = ['stag', 'fox', 'owl', 'rabbit'];
      let faunaCursor = 0;
      for (let i = 0; i < 36; i++) {
        const side: -1 | 1 = i % 2 === 0 ? -1 : 1;
        const zOffset = 10 - i * 4.9;
        let grp: THREE.Group;
        let lat = 6.2 + (i % 3) * 2.4;
        let animal: PixarAnimalHandle | undefined;

        if (i % 5 === 0) {
          const lamp = createPixarStreetLamp();
          lamp.setLit(1);
          grp = lamp.group;
          lat = 4.6;
        } else if (i % 6 === 3) {
          const kind = faunaCycle[faunaCursor % faunaCycle.length];
          faunaCursor++;
          animal = createPixarForestAnimal(kind, faunaCursor + 2);
          animal.group.scale.setScalar(kind === 'stag' ? 1.15 : 1.28);
          animal.group.rotation.y = side > 0 ? -Math.PI * 0.55 : Math.PI * 0.55;
          grp = animal.group;
          lat = 6.8 + (faunaCursor % 2) * 2.2;
        } else {
          const pine = createPixarPineTree(i % 2 === 0, i);
          pine.setLit(1);
          pine.group.scale.setScalar(0.85 + (i % 3) * 0.25);
          grp = pine.group;
          lat = 11.5 + (i % 4) * 3.0;
        }
        scene.add(grp);
        this.scenery.push({ group: grp, zOffset, side, lat, animal });
      }

      // Guiding Blend-Shape Pixar Santa Sleigh leading along the Time-Highway
      this.sleigh = createPixarSantaSleigh();
      this.sleigh.group.scale.setScalar(0.76);
      this.sleigh.group.position.set(0, 1.0, -3.5);
      scene.add(this.sleigh.group);

      this.snowField = createBokehSnowField(520, {
        minX: -38,
        maxX: 38,
        minY: 0,
        maxY: 28,
        minZ: -115,
        maxZ: 18,
      });
      scene.add(this.snowField.group);
    }

    this.mountTimelineOverlay(container);
    this.jumpToMilestone(0, false);
    this.localeUnsub = i18n.onChange(() => this.updateStoryCard(true));
  }

  private mountTimelineOverlay(container: HTMLElement): void {
    const overlay = document.createElement('div');
    overlay.className = 'timeline-overlay';
    overlay.addEventListener('pointerdown', (e) => e.stopPropagation());

    const t = i18n.t();
    overlay.innerHTML = `
      <div class="timeline-story-card">
        <div class="timeline-card-top">
          <span class="timeline-year-badge" data-tl="year">2006</span>
          <span class="timeline-status-pill" data-tl="status">${t.timelineUpcomingLabel}</span>
          <span class="timeline-counter" data-tl="counter">1 / ${ELON_MILESTONES.length}</span>
        </div>
        <h2 class="timeline-title" data-tl="title"></h2>
        <p class="timeline-text" data-tl="text"></p>
      </div>
      <div class="timeline-bar">
        <button type="button" class="tl-nav-btn" data-tl-prev aria-label="${t.timelinePrev}">◀</button>
        <button type="button" class="tl-nav-btn" data-tl-play>${this.autoPlay ? '⏸' : '▶'}</button>
        <div class="tl-dots">
          ${ELON_MILESTONES.map(
            (m, i) =>
              `<button type="button" class="tl-dot" data-tl-idx="${i}" title="${m.year}: ${m[i18n.getLocale()].title}"><span>${m.id === 'funding_420' ? '2018 $420' : m.year}</span></button>`
          ).join('')}
        </div>
        <button type="button" class="tl-nav-btn" data-tl-next aria-label="${t.timelineNext}">▶</button>
      </div>
    `;

    container.appendChild(overlay);
    this.overlayEl = overlay;
    this.cardYearEl = overlay.querySelector('[data-tl="year"]')!;
    this.cardStatusEl = overlay.querySelector('[data-tl="status"]')!;
    this.cardTitleEl = overlay.querySelector('[data-tl="title"]')!;
    this.cardTextEl = overlay.querySelector('[data-tl="text"]')!;
    this.counterEl = overlay.querySelector('[data-tl="counter"]')!;
    this.playPauseBtn = overlay.querySelector('[data-tl-play]')!;
    this.dotButtons = Array.from(overlay.querySelectorAll<HTMLButtonElement>('[data-tl-idx]'));

    overlay.querySelector('[data-tl-prev]')?.addEventListener('click', () => {
      this.jumpToMilestone((this.currentIndex - 1 + ELON_MILESTONES.length) % ELON_MILESTONES.length);
    });
    overlay.querySelector('[data-tl-next]')?.addEventListener('click', () => {
      this.jumpToMilestone((this.currentIndex + 1) % ELON_MILESTONES.length);
    });
    this.playPauseBtn.addEventListener('click', () => {
      this.autoPlay = !this.autoPlay;
      this.playPauseBtn.textContent = this.autoPlay ? '⏸' : '▶';
    });
    this.dotButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.jumpToMilestone(Number(btn.dataset.tlIdx));
      });
    });
  }

  private disposeGroupResources(group: THREE.Group): void {
    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry && !mesh.geometry.userData?.shared) {
        mesh.geometry.dispose();
      }
      const mat = mesh.material;
      const disposeMat = (m: THREE.Material) => {
        if (m.userData?.shared) return;
        const std = m as THREE.MeshStandardMaterial;
        if (std.map?.userData?.ownedByTimeline) std.map.dispose();
        if (std.emissiveMap?.userData?.ownedByTimeline) std.emissiveMap.dispose();
        m.dispose();
      };
      if (Array.isArray(mat)) mat.forEach(disposeMat);
      else if (mat) disposeMat(mat);
    });
    group.clear();
  }

  private clearAllSlots(): void {
    for (const s of this.slots) {
      this.stage?.scene.remove(s.root);
      this.disposeGroupResources(s.root);
    }
    this.slots = [];
  }

  private createMilestoneSlot(milestoneIndex: number, zOffset: number): RoadsideMilestoneSlot {
    const m = ELON_MILESTONES[milestoneIndex];
    const side: -1 | 1 = milestoneIndex % 2 === 0 ? -1 : 1;
    const isOverhead = m.diorama === 'starman' || m.diorama === 'dragon_starlink';

    const root = new THREE.Group();
    const mats = getTimelineMats();

    // 1. Glowing Golden Milestone Time-Portal Archway across the highway
    const archGroup = new THREE.Group();
    const torus = new THREE.Mesh(new THREE.TorusGeometry(4.8, 0.16, 8, 28, Math.PI), mats.gold);
    torus.position.y = 1.6;
    archGroup.add(torus);
    for (const px of [-4.8, 4.8]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 1.8, 8), mats.gold);
      col.position.set(px, 0.9, 0);
      archGroup.add(col);
    }
    for (let b = 0; b <= 8; b++) {
      const ang = (b / 8) * Math.PI;
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.15, 6, 6), mats.bulb);
      bulb.position.set(Math.cos(ang) * 4.8, 1.6 + Math.sin(ang) * 4.8, 0.14);
      archGroup.add(bulb);
    }
    const headerSign = createTextPlane(
      `${m.year} · ${m[i18n.getLocale()].title.slice(0, 22)}`,
      '#280c1a',
      '#ffd87a',
      512,
      128,
      5.2
    );
    headerSign.position.set(0, 5.8, 0.15);
    archGroup.add(headerSign);
    root.add(archGroup);

    // 2. Full-Scale Roadside or Overhead 3D Spectacle for this Milestone
    const spec = new THREE.Group();
    let updater: ((time: number, dt: number, approachProgress: number) => void) | undefined;

    if (isOverhead) {
      spec.position.set(0, 0, -4);
    } else {
      spec.position.set(side * 9.8, 0, -4);
      spec.rotation.y = side > 0 ? -0.52 : 0.52;
    }

    // Subtle snow plaza apron under roadside event
    if (!isOverhead) {
      const pad = new THREE.Mesh(
        new THREE.CircleGeometry(4.8, 24),
        new THREE.MeshStandardMaterial({ color: '#1b2848', emissive: m.accentHex, emissiveIntensity: 0.18 })
      );
      pad.rotation.x = -Math.PI * 0.5;
      pad.position.y = 0.03;
      spec.add(pad);
    }

    const kind: TimelineDioramaKind = m.diorama;
    if (kind === 'masterplan') {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 3.2, 16), mats.gold);
      pillar.position.y = 1.6;
      const plaque = createTextPlane('SECRET MASTER PLAN', '#3d101c', '#ffd166', 512, 160, 4.4);
      plaque.position.set(0, 2.5, 0.75);
      const star = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.85, 0),
        new THREE.MeshBasicMaterial({ color: '#ffe588', toneMapped: false })
      );
      star.position.y = 4.2;
      spec.add(pillar, plaque, star);
      updater = (t) => {
        star.rotation.y = t * 1.8;
        star.position.y = 4.2 + Math.sin(t * 2.8) * 0.25;
      };
    } else if (kind === 'roadster_f1') {
      const roadster = createAccurateStarmanRoadster();
      roadster.scale.setScalar(1.05);
      roadster.position.set(-0.9, 0.02, 0.6);
      const f1Body = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 4.2, 12), mats.steel);
      f1Body.position.set(1.8, 2.1, -0.8);
      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.8, 12), mats.steel);
      nose.position.set(1.8, 4.6, -0.8);
      spec.add(roadster, f1Body, nose);
    } else if (kind === 'models_supercharger') {
      const sc = createAccurateSuperchargerPlaza();
      sc.group.scale.setScalar(1.0);
      spec.add(sc.group);
      updater = (t) => sc.update(t);
    } else if (kind === 'falcon_landing') {
      const lzPad = createTextPlane('LZ-1', '#1a2236', '#6edcff', 256, 128, 3.6);
      lzPad.rotation.x = -Math.PI * 0.5;
      lzPad.position.y = 0.05;
      const rocketGroup = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 5.2, 14), mats.steel);
      body.position.y = 2.6;
      const interstage = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 1.0, 14),
        new THREE.MeshStandardMaterial({ color: '#141720' })
      );
      interstage.position.y = 4.8;
      rocketGroup.add(body, interstage);
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.25, 0.18), new THREE.MeshStandardMaterial({ color: '#1b202e' }));
        leg.position.set(Math.cos(a) * 0.72, 0.45, Math.sin(a) * 0.72);
        leg.rotation.z = Math.cos(a) * -0.55;
        leg.rotation.x = Math.sin(a) * 0.55;
        rocketGroup.add(leg);
      }
      const burn = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 2.0, 12),
        new THREE.MeshBasicMaterial({ color: '#ffbd55', transparent: true, opacity: 0.85, toneMapped: false })
      );
      burn.rotation.x = Math.PI;
      burn.position.y = -0.9;
      rocketGroup.add(burn);
      spec.add(lzPad, rocketGroup);
      updater = (_t, _dt, approach) => {
        const remain = Math.max(0, 1 - approach * 1.15);
        rocketGroup.position.y = remain * remain * 9.5;
        burn.visible = remain > 0.06;
      };
    } else if (kind === 'boring') {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.6, 0.48, 12, 24),
        new THREE.MeshPhysicalMaterial({ color: '#d91632', clearcoat: 0.9 })
      );
      ring.position.y = 2.8;
      const cutter = new THREE.Group();
      cutter.position.y = 2.8;
      for (let i = 0; i < 6; i++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.32, 4.6, 0.24), mats.gold);
        blade.rotation.z = (i / 6) * Math.PI;
        cutter.add(blade);
      }
      spec.add(ring, cutter);
      updater = (t) => {
        cutter.rotation.z = t * 1.9;
      };
    } else if (kind === 'prod_hell') {
      const cot = createPixarCottage(7);
      cot.group.scale.setScalar(1.0);
      cot.setLit(1);
      spec.add(cot.group);
      updater = (t, dt) => cot.update(dt, t);
    } else if (kind === 'starman') {
      // Overhead highway spectacle: Starman arcing gracefully over the highway!
      const sm = createAccurateStarmanRoadster();
      sm.scale.setScalar(1.25);
      sm.position.set(0, 7.8, 0);
      spec.add(sm);
      updater = (t, _dt, approach) => {
        const arc = (approach - 0.5) * 18;
        sm.position.set(arc, 7.6 + Math.cos(approach * Math.PI - Math.PI * 0.5) * 2.2, 0);
        sm.rotation.z = 0.22;
        sm.rotation.y = Math.sin(t * 0.6) * 0.15;
      };
    } else if (kind === 'funding_420') {
      const sign = createTextPlane('$420 · FUNDING SECURED', '#0e3a28', '#48e59b', 512, 176, 4.8);
      sign.position.set(0, 3.6, 0);
      const bell = new THREE.Mesh(new THREE.SphereGeometry(0.95, 16, 16), mats.gold);
      bell.position.y = 1.3;
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: getSoftGlowTexture(),
          color: '#48e59b',
          transparent: true,
          opacity: 0.58,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      halo.scale.set(8.5, 6.2, 1);
      halo.position.y = 3.2;
      const chartPts = [
        new THREE.Vector3(-3.4, 0.7, 0.5),
        new THREE.Vector3(-1.7, 1.8, 0.5),
        new THREE.Vector3(0.0, 3.9, 0.5),
        new THREE.Vector3(1.7, 3.1, 0.5),
        new THREE.Vector3(3.4, 5.1, 0.5),
      ];
      const chartLine = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(chartPts), 24, 0.14, 8, false),
        new THREE.MeshBasicMaterial({ color: '#48e59b', toneMapped: false })
      );
      spec.add(sign, bell, halo, chartLine);
      updater = (t) => {
        bell.position.y = 1.3 + Math.sin(t * 4) * 0.2;
      };
    } else if (kind === 'armor_glass') {
      const ct = createAccurateCybertruck(false);
      ct.group.scale.setScalar(1.1);
      const steelBall = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), mats.steel);
      const crackStar = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.28, 0),
        new THREE.MeshBasicMaterial({ color: '#d8f4ff', wireframe: true, toneMapped: false })
      );
      crackStar.position.set(1.25, 1.65, -0.85);
      spec.add(ct.group, steelBall, crackStar);
      updater = (t) => {
        ct.update(t * 4, t);
        steelBall.position.set(1.75 + Math.abs(Math.sin(t * 3.5)) * 1.4, 1.65, -0.85);
      };
    } else if (kind === 'dragon_starlink') {
      // Overhead constellation train streaming directly above highway!
      const capsule = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.2, 16), mats.steel);
      capsule.position.set(-4.5, 7.5, 0);
      capsule.rotation.z = -0.35;
      const train = new THREE.Group();
      train.position.set(0, 9.2, 0);
      for (let i = 0; i < 16; i++) {
        const sat = new THREE.Mesh(
          new THREE.BoxGeometry(0.45, 0.1, 0.25),
          new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? '#ffe082' : '#9ee8ff', toneMapped: false })
        );
        sat.position.set(-9 + i * 1.25, Math.sin(i * 0.45) * 0.65, 0);
        train.add(sat);
      }
      spec.add(capsule, train);
      updater = (t) => {
        train.position.y = 9.0 + Math.sin(t * 1.4) * 0.35;
      };
    } else if (kind === 'semi_x') {
      const semi = createAccurateTeslaSemi();
      semi.group.scale.setScalar(0.62);
      semi.group.position.set(-0.4, 0, -0.4);
      const xMat = new THREE.MeshBasicMaterial({ color: '#eef6ff', toneMapped: false });
      const x1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 3.2, 0.32), xMat);
      x1.rotation.z = 0.72;
      const x2 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 3.2, 0.32), xMat);
      x2.rotation.z = -0.72;
      const xGroup = new THREE.Group();
      xGroup.add(x1, x2);
      xGroup.position.set(2.4, 4.2, 0);
      spec.add(semi.group, xGroup);
      updater = (t, dt) => {
        semi.update(dt, t * 8, false, 0, t);
        xGroup.rotation.y = t * 1.2;
      };
    } else if (kind === 'cyber_starship') {
      const ct = createAccurateCybertruck(true);
      ct.group.scale.setScalar(0.95);
      ct.group.position.set(-1.6, 0, 0.8);
      const ss = createAccurateStarshipStack();
      ss.scale.setScalar(0.4);
      ss.position.set(2.1, 4.2, -0.8);
      spec.add(ct.group, ss);
      updater = (t) => ct.update(t * 4, t);
    } else if (kind === 'mechazilla') {
      const towerMat = new THREE.MeshStandardMaterial({ color: '#2b3242', metalness: 0.7, roughness: 0.4 });
      const tower = new THREE.Mesh(new THREE.BoxGeometry(1.15, 7.6, 1.15), towerMat);
      tower.position.set(-1.9, 3.8, 0);
      const armL = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.24, 0.28), mats.gold);
      const armR = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.24, 0.28), mats.gold);
      armL.position.set(-0.3, 6.0, -0.58);
      armR.position.set(-0.3, 6.0, 0.58);
      const booster = createAccurateStarshipStack();
      booster.scale.setScalar(0.34);
      booster.position.set(0.5, 3.6, 0);
      spec.add(tower, armL, armR, booster);
      updater = (t, _dt, approach) => {
        const hover = Math.sin(t * 2.2) * 0.35 + (1 - Math.min(1, approach * 1.2)) * 2.6;
        booster.position.y = 3.6 + hover;
        const pinch = Math.sin(t * 1.6) * 0.16;
        armL.rotation.y = pinch;
        armR.rotation.y = -pinch;
      };
    } else {
      const opt = createAccurateOptimusGen2();
      opt.group.scale.setScalar(1.65);
      opt.group.position.set(-1.9, 0, 0.8);
      const cab = new THREE.Mesh(new THREE.CapsuleGeometry(0.88, 2.0, 6, 12), mats.gold);
      cab.rotation.z = Math.PI * 0.5;
      cab.scale.set(0.8, 1, 1.15);
      cab.position.set(0.9, 0.88, 0.6);
      const mars = new THREE.Mesh(
        new THREE.SphereGeometry(1.35, 18, 18),
        new THREE.MeshStandardMaterial({ color: '#d85432', emissive: '#942812', emissiveIntensity: 0.65 })
      );
      mars.position.set(1.5, 4.6, -1.6);
      spec.add(opt.group, cab, mars);
      updater = (t) => opt.update(t);
    }

    root.add(spec);
    root.position.set(this.getRoadX(zOffset), 0, zOffset);
    this.stage?.scene.add(root);

    return {
      milestoneIndex,
      root,
      spectacle: spec,
      side,
      isOverhead,
      zOffset,
      announced: false,
      updater,
    };
  }

  private jumpToMilestone(idx: number, react = true): void {
    this.currentIndex = idx;
    this.clearAllSlots();

    for (let k = 0; k < QUEUE_SIZE; k++) {
      const mIdx = (idx + k) % ELON_MILESTONES.length;
      const zOff = -46 - k * EVENT_SPACING;
      const slot = this.createMilestoneSlot(mIdx, zOff);
      if (k === 0) slot.announced = true;
      this.slots.push(slot);
      this.nextSpawnIndex = (mIdx + 1) % ELON_MILESTONES.length;
    }

    this.updateStoryCard(true);
    if (react) {
      this.animalAlert = 1.0;
      this.sleigh?.triggerReaction('landmark');
    }
  }

  private updateStoryCard(isActive: boolean): void {
    const m = ELON_MILESTONES[this.currentIndex];
    const loc = i18n.getLocale();
    const t = i18n.t();
    const copy = m[loc];
    this.cardYearEl.textContent = m.year;
    this.cardYearEl.style.borderColor = m.accentHex;
    this.cardStatusEl.textContent = isActive ? t.timelinePassingLabel : t.timelineUpcomingLabel;
    this.cardTitleEl.textContent = copy.title;
    this.cardTextEl.textContent = copy.text;
    this.counterEl.textContent = `${this.currentIndex + 1} / ${ELON_MILESTONES.length}`;
    this.dotButtons.forEach((b, i) => b.classList.toggle('active', i === this.currentIndex));
  }

  resize(width: number, height: number): void {
    this.stage?.resize(width, height);
  }

  interact(): void {
    this.jumpToMilestone((this.currentIndex + 1) % ELON_MILESTONES.length);
  }

  triggerReaction(kind: SceneReactionKind): void {
    this.animalAlert = 1.0;
    this.sleigh?.triggerReaction(kind);
  }

  private getRoadX(z: number): number {
    const d = Math.max(0, 10 - z);
    return this.smoothCurve * d * d * 0.0045;
  }

  update(dt: number, frame: SceneFrameContext): void {
    if (!this.stage) return;
    const { telemetry, env } = frame;
    const time = telemetry.elapsedSec;
    const effectiveKmh = telemetry.isMoving
      ? telemetry.speedKmh
      : this.autoPlay
        ? 38
        : 0;
    const speedMs = effectiveKmh / 3.6;
    const forwardStep = speedMs * dt * 1.45;
    const speedNorm = Math.min(1, effectiveKmh / 110);

    this.stage.setQuality(env.quality);
    this.smoothCurve += (telemetry.turnRate - this.smoothCurve) * Math.min(1, dt * 3.5);
    this.animalAlert = Math.max(0, this.animalAlert - dt * 0.55);

    this.skyMat.uniforms.uTime.value = time;
    this.skyMat.uniforms.uAuroraBoost.value = 1.15 + speedNorm * 0.4;
    this.skyMat.uniforms.uTopColor.value.set(env.skyTopColor);
    this.skyMat.uniforms.uMidColor.value.set(env.skyMidColor);
    this.skyMat.uniforms.uHorizonColor.value.set(env.skyHorizonColor);

    const roadSpan = 190;
    for (const s of this.roadSlices) {
      s.zOffset += forwardStep;
      if (s.zOffset > 16) s.zOffset -= roadSpan;
      const cx = this.getRoadX(s.zOffset);
      const nextCx = this.getRoadX(s.zOffset - 5);
      const yaw = Math.atan2(cx - nextCx, 5);
      s.mesh.position.set(cx, 0.01, s.zOffset);
      s.mesh.rotation.y = yaw;
      s.dash.position.set(cx, 0.02, s.zOffset);
      s.dash.rotation.y = yaw;
    }

    const scenerySpan = 176;
    for (const p of this.scenery) {
      p.zOffset += forwardStep;
      if (p.zOffset > 14) p.zOffset -= scenerySpan;
      p.group.position.set(this.getRoadX(p.zOffset) + p.side * p.lat, 0, p.zOffset);
      p.animal?.update(dt, time, this.animalAlert);
    }

    // Advance Drive-Through Roadside Elon Events!
    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i];
      slot.zOffset += forwardStep;
      slot.root.position.set(this.getRoadX(slot.zOffset), 0, slot.zOffset);

      // Angle spectacle slightly along road tangent as it rounds highway curves
      const nextX = this.getRoadX(slot.zOffset - 5);
      slot.root.rotation.y = Math.atan2(slot.root.position.x - nextX, 5);

      const approach = Math.max(0, Math.min(1, (slot.zOffset + 90) / 86));
      slot.updater?.(time, dt, approach);

      if (!slot.announced && slot.zOffset >= -56 && slot.zOffset <= 12) {
        slot.announced = true;
        this.currentIndex = slot.milestoneIndex;
        this.animalAlert = 1.0;
        this.sleigh?.triggerReaction('landmark');
        this.updateStoryCard(true);
      }
    }

    // Recycle milestone slots once driven completely past camera
    while (this.slots.length > 0 && this.slots[0].zOffset > 22) {
      const retired = this.slots.shift()!;
      this.stage.scene.remove(retired.root);
      this.disposeGroupResources(retired.root);

      const furthestZ = this.slots.length > 0 ? this.slots[this.slots.length - 1].zOffset : -60;
      const spawnZ = Math.min(-160, furthestZ - EVENT_SPACING);
      const nextSlot = this.createMilestoneSlot(this.nextSpawnIndex, spawnZ);
      this.nextSpawnIndex = (this.nextSpawnIndex + 1) % ELON_MILESTONES.length;
      this.slots.push(nextSlot);
    }

    // Update status badge dynamically as slot approaches vs passes
    const focusSlot = this.slots.find((s) => s.milestoneIndex === this.currentIndex);
    if (focusSlot) {
      const t = i18n.t();
      const isPassing = focusSlot.zOffset > -42 && focusSlot.zOffset < 10;
      this.cardStatusEl.textContent = isPassing ? t.timelinePassingLabel : t.timelineUpcomingLabel;
    }

    // Hero Guiding Santa Sleigh ahead on the Time-Highway
    this.sleigh.group.position.set(
      this.smoothCurve * 1.4,
      1.0 + Math.sin(time * 2.1) * 0.16,
      -4.2
    );
    this.sleigh.group.rotation.z = -this.smoothCurve * 0.24;
    this.sleigh.group.rotation.y = -this.smoothCurve * 0.15;
    this.sleigh.update(dt, Math.max(effectiveKmh, 12), this.smoothCurve, telemetry.acceleration, time);

    this.stage.camera.position.x += (this.sleigh.group.position.x * 0.5 - this.stage.camera.position.x) * Math.min(1, dt * 4);
    this.stage.camera.lookAt(this.sleigh.group.position.x + this.smoothCurve * 3, 2.3, -18);

    this.snowField.update(dt, -this.smoothCurve * 3.5, forwardStep * 0.8 + 1.8, 2.0 + speedNorm);
    this.stage.render();
  }

  dispose(): void {
    this.localeUnsub?.();
    this.localeUnsub = null;
    this.clearAllSlots();
    if (this.overlayEl) {
      this.overlayEl.remove();
      this.overlayEl = null;
    }
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
