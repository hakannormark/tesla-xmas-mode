import * as THREE from 'three';
import { ELON_MILESTONES, ElonMilestone, TimelineDioramaKind } from '../core/elonTimelineData';
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
import { HolidayScene, SceneFrameContext, SceneReactionKind } from './types';

interface ArchPortal {
  group: THREE.Group;
  zOffset: number;
}

function createTextPlane(text: string, bgHex: string, fgHex: string, w = 512, h = 160): THREE.Mesh {
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
  ctx.font = `700 ${Math.round(h * 0.42)}px "Cinzel", Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, w * 0.5, h * 0.52, w - 44);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, (2.8 * h) / w),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, side: THREE.DoubleSide })
  );
}

export class ElonTimelineScene implements HolidayScene {
  readonly id: SceneId = 'timeline';
  private stage: PixarStage | null = null;
  private fallbackEl: HTMLElement | null = null;

  private skyMat!: THREE.ShaderMaterial;
  private sleigh!: PixarSleighHandle;
  private snowField!: BokehSnowField;

  private roadSlices: { mesh: THREE.Mesh; dash: THREE.Mesh; zOffset: number }[] = [];
  private arches: ArchPortal[] = [];
  private roadsideProps: { group: THREE.Group; zOffset: number; side: number; lat: number }[] = [];

  private pedestalRoot!: THREE.Group;
  private dioramaContainer!: THREE.Group;
  private activeDioramaUpdater: ((time: number, dt: number) => void) | null = null;

  // Interactive Story Card & Timeline Bar DOM
  private overlayEl: HTMLElement | null = null;
  private cardYearEl!: HTMLElement;
  private cardTitleEl!: HTMLElement;
  private cardTextEl!: HTMLElement;
  private counterEl!: HTMLElement;
  private playPauseBtn!: HTMLButtonElement;
  private dotButtons: HTMLButtonElement[] = [];

  private currentIndex = 0;
  private autoPlay = true;
  private autoProgress = 0;
  private smoothCurve = 0;
  private localeUnsub: (() => void) | null = null;

  mount(container: HTMLElement): void {
    const res = createPixarStageOrFallback(container, {
      fov: 50,
      fogColor: '#091536',
      fogDensity: 0.006,
      bloomStrength: 0.44,
      bloomRadius: 0.5,
      bloomThreshold: 0.8,
    });
    this.stage = res.stage;
    this.fallbackEl = res.fallbackEl;

    if (this.stage) {
      const { scene, camera } = this.stage;
      camera.position.set(-1.6, 4.2, 10.2);
      camera.lookAt(1.8, 2.2, -10);

      const sky = createPixarSkyDome(300);
      this.skyMat = sky.material;
      scene.add(sky.mesh);

      const moon = createPixarMoon(9);
      moon.position.set(-28, 34, -145);
      scene.add(moon);

      const snowMat = createSparklingSnowMaterial('#84a2cc');
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(360, 360), snowMat);
      ground.rotation.x = -Math.PI * 0.5;
      ground.position.y = -0.05;
      scene.add(ground);

      // Curving Snowy Time-Highway
      const segLen = 5;
      const roadGeo = new THREE.PlaneGeometry(7.6, segLen + 0.15);
      const roadMat = new THREE.MeshStandardMaterial({ color: '#1b2747', roughness: 0.72 });
      const dashGeo = new THREE.PlaneGeometry(0.24, segLen * 0.52);
      const dashMat = new THREE.MeshBasicMaterial({ color: '#ffd98a' });
      for (let i = 0; i < 32; i++) {
        const mesh = new THREE.Mesh(roadGeo, roadMat);
        mesh.rotation.x = -Math.PI * 0.5;
        mesh.position.y = 0.01;
        const dash = new THREE.Mesh(dashGeo, dashMat);
        dash.rotation.x = -Math.PI * 0.5;
        dash.position.y = 0.02;
        scene.add(mesh, dash);
        this.roadSlices.push({ mesh, dash, zOffset: 12 - i * segLen });
      }

      // Glowing Golden Time Archway Portals along highway!
      const archGold = new THREE.MeshStandardMaterial({ color: '#ffd166', metalness: 0.88, roughness: 0.2 });
      const archBulbMat = new THREE.MeshBasicMaterial({ color: '#fff3c4', toneMapped: false });
      for (let i = 0; i < 6; i++) {
        const ag = new THREE.Group();
        const torus = new THREE.Mesh(new THREE.TorusGeometry(4.6, 0.16, 8, 28, Math.PI), archGold);
        torus.position.y = 1.6;
        ag.add(torus);
        for (const px of [-4.6, 4.6]) {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 1.8, 8), archGold);
          col.position.set(px, 0.9, 0);
          ag.add(col);
        }
        for (let b = 0; b <= 8; b++) {
          const ang = (b / 8) * Math.PI;
          const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 6, 6), archBulbMat);
          bulb.position.set(Math.cos(ang) * 4.6, 1.6 + Math.sin(ang) * 4.6, 0.12);
          ag.add(bulb);
        }
        const zOffset = -8 - i * 26;
        ag.position.set(0, 0, zOffset);
        scene.add(ag);
        this.arches.push({ group: ag, zOffset });
      }

      // Roadside Pines & Volumetric Lamps
      for (let i = 0; i < 28; i++) {
        const side = i % 2 === 0 ? -1 : 1;
        const zOffset = 8 - i * 5.6;
        let grp: THREE.Group;
        let lat = 6.8 + (i % 3) * 2.5;
        if (i % 4 === 0) {
          const lamp = createPixarStreetLamp();
          lamp.setLit(1);
          grp = lamp.group;
          lat = 4.6;
        } else {
          const pine = createPixarPineTree(i % 2 === 0, i);
          pine.setLit(1);
          pine.group.scale.setScalar(0.85 + (i % 3) * 0.25);
          grp = pine.group;
        }
        scene.add(grp);
        this.roadsideProps.push({ group: grp, zOffset, side, lat });
      }

      // Guiding Blend-Shape Pixar Santa Sleigh leading ahead left-of-center!
      this.sleigh = createPixarSantaSleigh();
      this.sleigh.group.scale.setScalar(0.68);
      this.sleigh.group.position.set(-1.6, 1.4, -2.5);
      scene.add(this.sleigh.group);

      // Rotating Velvet & Brass Showcase Turntable Pedestal for the active Milestone Diorama!
      this.pedestalRoot = new THREE.Group();
      this.pedestalRoot.position.set(3.4, 0, -10.5);
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(3.4, 3.8, 0.55, 32),
        new THREE.MeshPhysicalMaterial({ color: '#8f0a20', roughness: 0.45, clearcoat: 0.85 })
      );
      base.position.y = 0.27;
      const brassRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.45, 0.1, 10, 36),
        new THREE.MeshStandardMaterial({ color: '#ffd166', metalness: 0.9, roughness: 0.18 })
      );
      brassRing.rotation.x = Math.PI * 0.5;
      brassRing.position.y = 0.56;
      const topGlow = new THREE.Mesh(
        new THREE.CircleGeometry(3.2, 28),
        new THREE.MeshStandardMaterial({ color: '#132248', emissive: '#38589e', emissiveIntensity: 0.45 })
      );
      topGlow.rotation.x = -Math.PI * 0.5;
      topGlow.position.y = 0.56;
      this.pedestalRoot.add(base, brassRing, topGlow);

      this.dioramaContainer = new THREE.Group();
      this.dioramaContainer.position.y = 0.58;
      this.pedestalRoot.add(this.dioramaContainer);
      scene.add(this.pedestalRoot);

      this.snowField = createBokehSnowField(480, {
        minX: -34,
        maxX: 34,
        minY: 0,
        maxY: 26,
        minZ: -95,
        maxZ: 16,
      });
      scene.add(this.snowField.group);
    }

    this.mountTimelineOverlay(container);
    this.selectMilestone(0, false);
    this.localeUnsub = i18n.onChange(() => this.updateStoryCard());
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
    this.cardTitleEl = overlay.querySelector('[data-tl="title"]')!;
    this.cardTextEl = overlay.querySelector('[data-tl="text"]')!;
    this.counterEl = overlay.querySelector('[data-tl="counter"]')!;
    this.playPauseBtn = overlay.querySelector('[data-tl-play]')!;
    this.dotButtons = Array.from(overlay.querySelectorAll<HTMLButtonElement>('[data-tl-idx]'));

    overlay.querySelector('[data-tl-prev]')?.addEventListener('click', () => {
      this.selectMilestone((this.currentIndex - 1 + ELON_MILESTONES.length) % ELON_MILESTONES.length);
    });
    overlay.querySelector('[data-tl-next]')?.addEventListener('click', () => {
      this.selectMilestone((this.currentIndex + 1) % ELON_MILESTONES.length);
    });
    this.playPauseBtn.addEventListener('click', () => {
      this.autoPlay = !this.autoPlay;
      this.playPauseBtn.textContent = this.autoPlay ? '⏸' : '▶';
    });
    this.dotButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.selectMilestone(Number(btn.dataset.tlIdx));
      });
    });
  }

  private selectMilestone(idx: number, react = true): void {
    this.currentIndex = idx;
    this.autoProgress = 0;
    this.updateStoryCard();
    this.buildDiorama(ELON_MILESTONES[idx]);
    if (react) {
      this.sleigh?.triggerReaction('landmark');
    }
  }

  private updateStoryCard(): void {
    const m = ELON_MILESTONES[this.currentIndex];
    const loc = i18n.getLocale();
    const copy = m[loc];
    this.cardYearEl.textContent = m.year;
    this.cardYearEl.style.borderColor = m.accentHex;
    this.cardTitleEl.textContent = copy.title;
    this.cardTextEl.textContent = copy.text;
    this.counterEl.textContent = `${this.currentIndex + 1} / ${ELON_MILESTONES.length}`;
    this.dotButtons.forEach((b, i) => b.classList.toggle('active', i === this.currentIndex));
  }

  private disposeContainerChildren(group: THREE.Group): void {
    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else if (mat) mat.dispose();
    });
    group.clear();
  }

  private buildDiorama(m: ElonMilestone): void {
    if (!this.dioramaContainer) return;
    this.disposeContainerChildren(this.dioramaContainer);
    this.activeDioramaUpdater = null;
    const root = this.dioramaContainer;
    const kind: TimelineDioramaKind = m.diorama;

    const goldMat = new THREE.MeshStandardMaterial({ color: '#ffd166', metalness: 0.9, roughness: 0.18 });
    const steelMat = new THREE.MeshPhysicalMaterial({ color: '#dce6f5', metalness: 0.9, roughness: 0.2 });

    if (kind === 'masterplan') {
      const scroll = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 2.8, 16),
        new THREE.MeshStandardMaterial({ color: '#fff3d6', roughness: 0.6 })
      );
      scroll.rotation.z = 0.35;
      scroll.position.y = 1.6;
      const star = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.55, 0),
        new THREE.MeshBasicMaterial({ color: '#ffe588', toneMapped: false })
      );
      star.position.y = 3.2;
      const plaque = createTextPlane('MASTER PLAN', '#3d101c', '#ffd166');
      plaque.position.set(0, 1.5, 0.8);
      root.add(scroll, star, plaque);
      this.activeDioramaUpdater = (t) => {
        star.rotation.y = t * 1.8;
        star.position.y = 3.2 + Math.sin(t * 3) * 0.18;
      };
    } else if (kind === 'roadster_f1') {
      const roadster = createAccurateStarmanRoadster();
      roadster.scale.setScalar(0.85);
      roadster.position.set(-0.6, 0.02, 0.4);
      const f1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 2.6, 12), steelMat);
      f1.position.set(1.5, 1.3, -0.5);
      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.55, 12), steelMat);
      nose.position.set(1.5, 2.88, -0.5);
      root.add(roadster, f1, nose);
    } else if (kind === 'models_supercharger') {
      const sc = createAccurateSuperchargerPlaza();
      sc.group.scale.setScalar(0.68);
      root.add(sc.group);
      this.activeDioramaUpdater = (t) => sc.update(t);
    } else if (kind === 'falcon_landing') {
      const pad = createTextPlane('LZ-1', '#1a2236', '#6edcff', 256, 128);
      pad.rotation.x = -Math.PI * 0.5;
      pad.position.y = 0.04;
      const rocketGroup = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 3.4, 14), steelMat);
      body.position.y = 1.7;
      const interstage = new THREE.Mesh(
        new THREE.CylinderGeometry(0.29, 0.29, 0.7, 14),
        new THREE.MeshStandardMaterial({ color: '#141720' })
      );
      interstage.position.y = 3.1;
      rocketGroup.add(body, interstage);
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 0.14), new THREE.MeshStandardMaterial({ color: '#1b202e' }));
        leg.position.set(Math.cos(a) * 0.55, 0.35, Math.sin(a) * 0.55);
        leg.rotation.z = Math.cos(a) * -0.55;
        leg.rotation.x = Math.sin(a) * 0.55;
        rocketGroup.add(leg);
      }
      const burn = new THREE.Mesh(
        new THREE.ConeGeometry(0.38, 1.4, 12),
        new THREE.MeshBasicMaterial({ color: '#ffbd55', transparent: true, opacity: 0.78, toneMapped: false })
      );
      burn.rotation.x = Math.PI;
      burn.position.y = -0.6;
      rocketGroup.add(burn);
      root.add(pad, rocketGroup);
      this.activeDioramaUpdater = (t) => {
        const cyc = (t * 0.35) % 1;
        const y = Math.pow(1 - cyc, 2) * 3.8;
        rocketGroup.position.y = y;
        burn.visible = cyc < 0.88;
      };
    } else if (kind === 'boring') {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.5, 0.32, 12, 24),
        new THREE.MeshPhysicalMaterial({ color: '#d91632', clearcoat: 0.9 })
      );
      ring.position.y = 1.85;
      const cutter = new THREE.Group();
      cutter.position.y = 1.85;
      for (let i = 0; i < 6; i++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.7, 0.18), goldMat);
        blade.rotation.z = (i / 6) * Math.PI;
        cutter.add(blade);
      }
      root.add(ring, cutter);
      this.activeDioramaUpdater = (t) => {
        cutter.rotation.z = t * 1.8;
      };
    } else if (kind === 'prod_hell') {
      const cot = createPixarCottage(7);
      cot.group.scale.setScalar(0.65);
      cot.setLit(1);
      root.add(cot.group);
      this.activeDioramaUpdater = (t, dt) => cot.update(dt, t);
    } else if (kind === 'starman') {
      const sm = createAccurateStarmanRoadster();
      sm.scale.setScalar(1.05);
      sm.position.y = 0.15;
      root.add(sm);
    } else if (kind === 'funding_420') {
      // Giant gleaming $420 golden ornament + emerald stock chart ribbon!
      const sign = createTextPlane('$420 · SECURED', '#0e3a28', '#48e59b', 512, 192);
      sign.position.set(0, 2.2, 0);
      const bell = new THREE.Mesh(new THREE.SphereGeometry(0.62, 16, 16), goldMat);
      bell.position.y = 0.8;
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: getSoftGlowTexture(),
          color: '#48e59b',
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      halo.scale.set(5.5, 4.2, 1);
      halo.position.y = 2.0;
      const chartPts = [
        new THREE.Vector3(-2.4, 0.5, 0.4),
        new THREE.Vector3(-1.2, 1.2, 0.4),
        new THREE.Vector3(0.0, 2.6, 0.4),
        new THREE.Vector3(1.2, 2.2, 0.4),
        new THREE.Vector3(2.4, 3.5, 0.4),
      ];
      const chartLine = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(chartPts), 24, 0.09, 8, false),
        new THREE.MeshBasicMaterial({ color: '#48e59b', toneMapped: false })
      );
      root.add(sign, bell, halo, chartLine);
      this.activeDioramaUpdater = (t) => {
        bell.position.y = 0.8 + Math.sin(t * 4) * 0.12;
      };
    } else if (kind === 'armor_glass') {
      const ct = createAccurateCybertruck(false);
      ct.group.scale.setScalar(0.88);
      const steelBall = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), steelMat);
      const crackStar = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.22, 0),
        new THREE.MeshBasicMaterial({ color: '#d8f4ff', wireframe: true, toneMapped: false })
      );
      crackStar.position.set(1.02, 1.32, -0.7);
      root.add(ct.group, steelBall, crackStar);
      this.activeDioramaUpdater = (t) => {
        ct.update(t * 4, t);
        steelBall.position.set(1.45 + Math.abs(Math.sin(t * 3.5)) * 1.0, 1.32, -0.7);
      };
    } else if (kind === 'dragon_starlink') {
      const capsule = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.6, 16), steelMat);
      capsule.position.y = 1.4;
      const ring = new THREE.Group();
      ring.position.y = 2.2;
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const sat = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.08, 0.16),
          new THREE.MeshBasicMaterial({ color: '#9ee8ff', toneMapped: false })
        );
        sat.position.set(Math.cos(a) * 2.4, Math.sin(a * 2) * 0.25, Math.sin(a) * 2.4);
        ring.add(sat);
      }
      root.add(capsule, ring);
      this.activeDioramaUpdater = (t) => {
        ring.rotation.y = t * 1.1;
      };
    } else if (kind === 'semi_x') {
      const semi = createAccurateTeslaSemi();
      semi.group.scale.setScalar(0.45);
      semi.group.position.set(-0.2, 0, -0.4);
      const xMat = new THREE.MeshBasicMaterial({ color: '#eef6ff', toneMapped: false });
      const x1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.2, 0.24), xMat);
      x1.rotation.z = 0.72;
      const x2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.2, 0.24), xMat);
      x2.rotation.z = -0.72;
      const xGroup = new THREE.Group();
      xGroup.add(x1, x2);
      xGroup.position.set(1.8, 2.8, 0);
      root.add(semi.group, xGroup);
      this.activeDioramaUpdater = (t, dt) => {
        semi.update(dt, t * 8, false, 0, t);
        xGroup.rotation.y = t * 1.2;
      };
    } else if (kind === 'cyber_starship') {
      const ct = createAccurateCybertruck(true);
      ct.group.scale.setScalar(0.75);
      ct.group.position.set(-1.1, 0, 0.5);
      const ss = createAccurateStarshipStack();
      ss.scale.setScalar(0.28);
      ss.position.set(1.5, 2.6, -0.5);
      root.add(ct.group, ss);
      this.activeDioramaUpdater = (t) => ct.update(t * 4, t);
    } else if (kind === 'mechazilla') {
      // Animated 3D Mechazilla Tower + Catching Chopsticks + Descending Super Heavy!
      const towerMat = new THREE.MeshStandardMaterial({ color: '#2b3242', metalness: 0.7, roughness: 0.4 });
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.85, 5.2, 0.85), towerMat);
      tower.position.set(-1.35, 2.6, 0);
      root.add(tower);

      const armL = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.18, 0.2), goldMat);
      const armR = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.18, 0.2), goldMat);
      armL.position.set(-0.2, 4.1, -0.42);
      armR.position.set(-0.2, 4.1, 0.42);
      root.add(armL, armR);

      const booster = createAccurateStarshipStack();
      booster.scale.setScalar(0.24);
      booster.position.set(0.35, 2.4, 0);
      root.add(booster);

      this.activeDioramaUpdater = (t) => {
        const hover = Math.sin(t * 2.2) * 0.25;
        booster.position.y = 2.45 + hover;
        const pinch = Math.sin(t * 1.6) * 0.15;
        armL.rotation.y = pinch;
        armR.rotation.y = -pinch;
      };
    } else {
      // cybercab_mars: Optimus Gen 2 + Golden Cybercab + Glowing Red Mars Orb!
      const opt = createAccurateOptimusGen2();
      opt.group.scale.setScalar(1.25);
      opt.group.position.set(-1.5, 0, 0.6);
      const cab = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.65, 1.5, 6, 12),
        goldMat
      );
      cab.rotation.z = Math.PI * 0.5;
      cab.scale.set(0.8, 1, 1.15);
      cab.position.set(0.6, 0.65, 0.5);
      const mars = new THREE.Mesh(
        new THREE.SphereGeometry(0.95, 18, 18),
        new THREE.MeshStandardMaterial({ color: '#d85432', emissive: '#942812', emissiveIntensity: 0.65 })
      );
      mars.position.set(1.2, 3.2, -1.2);
      root.add(opt.group, cab, mars);
      this.activeDioramaUpdater = (t) => opt.update(t);
    }
  }

  resize(width: number, height: number): void {
    this.stage?.resize(width, height);
  }

  interact(): void {
    this.selectMilestone((this.currentIndex + 1) % ELON_MILESTONES.length);
  }

  triggerReaction(kind: SceneReactionKind): void {
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
    const speedMs = telemetry.speedKmh / 3.6;
    const forwardStep = speedMs * dt * 1.35;
    const speedNorm = Math.min(1, telemetry.speedKmh / 110);

    this.stage.setQuality(env.quality);
    this.smoothCurve += (telemetry.turnRate - this.smoothCurve) * Math.min(1, dt * 3.5);

    // Auto-advance milestones cleanly when driving & playing!
    if (this.autoPlay && telemetry.isMoving) {
      this.autoProgress += dt * (0.065 + speedNorm * 0.075);
      if (this.autoProgress >= 1) {
        this.selectMilestone((this.currentIndex + 1) % ELON_MILESTONES.length);
      }
    }

    this.skyMat.uniforms.uTime.value = time;
    this.skyMat.uniforms.uAuroraBoost.value = 1.15 + speedNorm * 0.4;
    this.skyMat.uniforms.uTopColor.value.set(env.skyTopColor);
    this.skyMat.uniforms.uMidColor.value.set(env.skyMidColor);
    this.skyMat.uniforms.uHorizonColor.value.set(env.skyHorizonColor);

    const roadSpan = 160;
    for (const s of this.roadSlices) {
      s.zOffset += forwardStep;
      if (s.zOffset > 14) s.zOffset -= roadSpan;
      const cx = this.getRoadX(s.zOffset);
      const nextCx = this.getRoadX(s.zOffset - 5);
      const yaw = Math.atan2(cx - nextCx, 5);
      s.mesh.position.set(cx, 0.01, s.zOffset);
      s.mesh.rotation.y = yaw;
      s.dash.position.set(cx, 0.02, s.zOffset);
      s.dash.rotation.y = yaw;
    }

    for (const a of this.arches) {
      a.zOffset += forwardStep;
      if (a.zOffset > 14) a.zOffset -= 156;
      a.group.position.set(this.getRoadX(a.zOffset), 0, a.zOffset);
    }

    for (const p of this.roadsideProps) {
      p.zOffset += forwardStep;
      if (p.zOffset > 12) p.zOffset -= 156;
      p.group.position.set(this.getRoadX(p.zOffset) + p.side * p.lat, 0, p.zOffset);
    }

    // Sleigh guiding along left lane
    this.sleigh.group.position.set(
      -1.8 + this.smoothCurve * 1.1,
      1.1 + Math.sin(time * 2.1) * 0.16,
      -2.2
    );
    this.sleigh.group.rotation.z = -this.smoothCurve * 0.22;
    this.sleigh.update(dt, telemetry.speedKmh, this.smoothCurve, telemetry.acceleration, time);

    // Showcase turntable slowly rotates smoothly
    this.pedestalRoot.rotation.y = time * 0.48;
    this.activeDioramaUpdater?.(time, dt);

    this.snowField.update(dt, -this.smoothCurve * 3.5, forwardStep * 0.8 + 1.8, 2.0 + speedNorm);
    this.stage.render();
  }

  dispose(): void {
    this.localeUnsub?.();
    this.localeUnsub = null;
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
