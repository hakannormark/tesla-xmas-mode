import * as THREE from 'three';
import { ELON_MILESTONES } from '../core/elonTimelineData';
import { i18n, SceneId } from '../core/i18n';
import {
  createRoadsideMilestoneEvent,
  disposeTimelineGroup,
  RoadsideMilestoneSlot,
} from '../three/elonTimelineRoadside';
import {
  BokehSnowField,
  createBokehSnowField,
  createPixarMoon,
  createPixarSkyDome,
} from '../three/pixarMaterials';
import {
  createPixarPineTree,
  createPixarSantaSleigh,
  createPixarStreetLamp,
  PixarSleighHandle,
} from '../three/pixarModels';
import {
  createPixarAlpineBackdrop,
  createPixarValleyTerrain,
  PixarSnowyRoad,
} from '../three/pixarRoad';
import { createPixarStageOrFallback, PixarStage } from '../three/pixarRenderer';
import { createPixarForestAnimal, PixarAnimalHandle, WildlifeKind } from '../three/pixarWildlife';
import { HolidayScene, SceneFrameContext, SceneReactionKind } from './types';

const EVENT_SPACING = 82;
const QUEUE_SIZE = 3;

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
  private snowyRoad!: PixarSnowyRoad;
  private sleigh!: PixarSleighHandle;
  private snowField!: BokehSnowField;

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
  private roadScroll = 0;
  private smoothCurve = 0;
  private animalAlert = 0;
  private localeUnsub: (() => void) | null = null;

  mount(container: HTMLElement): void {
    const res = createPixarStageOrFallback(container, {
      fov: 52,
      fogColor: '#0c1b42',
      fogDensity: 0.0052,
      bloomStrength: 0.48,
      bloomRadius: 0.56,
      bloomThreshold: 0.76,
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

      scene.add(createPixarAlpineBackdrop());
      scene.add(createPixarValleyTerrain());

      this.snowyRoad = new PixarSnowyRoad();
      scene.add(this.snowyRoad.mesh);

      // Enchanted Forest Pines, Golden Lamps & Animated Forest Animals between milestones!
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
          lat = 5.4;
        } else if (i % 6 === 3) {
          const kind = faunaCycle[faunaCursor % faunaCycle.length];
          faunaCursor++;
          animal = createPixarForestAnimal(kind, faunaCursor + 2);
          animal.group.scale.setScalar(kind === 'stag' ? 1.15 : 1.28);
          animal.group.rotation.y = side > 0 ? -Math.PI * 0.55 : Math.PI * 0.55;
          grp = animal.group;
          lat = 10.6 + (faunaCursor % 2) * 2.2;
        } else {
          const pine = createPixarPineTree(i % 2 === 0, i);
          pine.setLit(1);
          pine.group.scale.setScalar(0.85 + (i % 3) * 0.25);
          grp = pine.group;
          lat = 12.2 + (i % 4) * 3.0;
        }
        scene.add(grp);
        this.scenery.push({ group: grp, zOffset, side, lat, animal });
      }

      // Guiding Blend-Shape Pixar Santa Sleigh leading along the Time-Highway
      this.sleigh = createPixarSantaSleigh();
      this.sleigh.group.scale.setScalar(0.76);
      this.sleigh.group.position.set(0, 1.5, -3.5);
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

  private clearAllSlots(): void {
    for (const s of this.slots) {
      this.stage?.scene.remove(s.root);
      disposeTimelineGroup(s.root);
    }
    this.slots = [];
  }

  private jumpToMilestone(idx: number, react = true): void {
    this.currentIndex = idx;
    this.clearAllSlots();

    for (let k = 0; k < QUEUE_SIZE; k++) {
      const mIdx = (idx + k) % ELON_MILESTONES.length;
      const zOff = -46 - k * EVENT_SPACING;
      const slot = createRoadsideMilestoneEvent(mIdx, zOff, (z) => this.getRoadX(z));
      if (k === 0) slot.announced = true;
      this.stage?.scene.add(slot.root);
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

    this.roadScroll += forwardStep;
    this.snowyRoad.update(this.roadScroll, (z) => this.getRoadX(z));

    const scenerySpan = 176;
    for (const p of this.scenery) {
      p.zOffset += forwardStep;
      if (p.zOffset > 14) p.zOffset -= scenerySpan;
      p.group.position.set(this.getRoadX(p.zOffset) + p.side * p.lat, 0, p.zOffset);
      p.animal?.update(dt, time, this.animalAlert);
    }

    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i];
      slot.zOffset += forwardStep;
      slot.root.position.set(this.getRoadX(slot.zOffset), 0, slot.zOffset);

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

    while (this.slots.length > 0 && this.slots[0].zOffset > 22) {
      const retired = this.slots.shift()!;
      this.stage.scene.remove(retired.root);
      disposeTimelineGroup(retired.root);

      const furthestZ = this.slots.length > 0 ? this.slots[this.slots.length - 1].zOffset : -60;
      const spawnZ = Math.min(-160, furthestZ - EVENT_SPACING);
      const nextSlot = createRoadsideMilestoneEvent(this.nextSpawnIndex, spawnZ, (z) =>
        this.getRoadX(z)
      );
      this.stage.scene.add(nextSlot.root);
      this.nextSpawnIndex = (this.nextSpawnIndex + 1) % ELON_MILESTONES.length;
      this.slots.push(nextSlot);
    }

    const focusSlot = this.slots.find((s) => s.milestoneIndex === this.currentIndex);
    if (focusSlot) {
      const t = i18n.t();
      const isPassing = focusSlot.zOffset > -42 && focusSlot.zOffset < 10;
      this.cardStatusEl.textContent = isPassing ? t.timelinePassingLabel : t.timelineUpcomingLabel;
    }

    this.sleigh.group.position.set(
      this.smoothCurve * 1.4,
      1.5 + Math.sin(time * 2.1) * 0.16,
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
    this.snowyRoad?.dispose();
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
