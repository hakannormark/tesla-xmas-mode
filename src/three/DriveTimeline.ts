import * as THREE from 'three';
import { ELON_MILESTONES } from '../core/elonTimelineData';
import { geoDeltaMeters, type OsmMapSnapshot, type OsmRoadRibbon } from '../core/osmWorld';
import type { mapClearance } from './mapClearance';
import { createRoadsideMilestoneEvent, disposeTimelineGroup, type RoadsideMilestoneSlot } from './elonTimelineRoadside';
import { pointAlongStreet } from './mappedRoads';

export class DriveTimeline {
  private index = 0;
  private enabled = false;
  private nextDistance = 0;
  private nextTime = 0;
  private needsPortal = false;
  private anchor?: { latitude: number; longitude: number; heading: number };
  private slot?: RoadsideMilestoneSlot;
  private readonly card: HTMLElement;

  constructor(root: HTMLElement, private readonly scene: THREE.Scene) {
    this.card = root.querySelector('[data-timeline-card]')!;
    this.card.querySelector<HTMLButtonElement>('[data-timeline-next]')!.onclick = () => this.advance();
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.card.hidden = !this.enabled;
    if (this.enabled) this.show();
    else this.clearPortal();
  }

  private clearPortal(): void {
    if (this.slot) {
      this.scene.remove(this.slot.root);
      disposeTimelineGroup(this.slot.root);
    }
    this.slot = this.anchor = undefined;
    this.needsPortal = false;
  }

  private show(): void {
    const milestone = ELON_MILESTONES[this.index];
    this.card.querySelector('[data-timeline-step]')!.textContent = `${milestone.year} · ${this.index+1}/${ELON_MILESTONES.length}`;
    this.card.querySelector('[data-timeline-title]')!.textContent = milestone.sv.title;
    this.card.querySelector('[data-timeline-text]')!.textContent = milestone.sv.text;
    this.needsPortal = true;
    this.nextDistance = 230;
    this.nextTime = 14;
  }

  advance(): void {
    this.clearPortal();
    this.index = (this.index+1)%ELON_MILESTONES.length;
    this.show();
  }

  update(
    dt: number,
    time: number,
    moved: number,
    snapshot: OsmMapSnapshot | undefined,
    road: OsmRoadRibbon | undefined,
    center: THREE.Vector3,
    heading: number,
    groundAt: (x: number,z: number) => number,
    clearance?: ReturnType<typeof mapClearance>
  ): void {
    if (!this.enabled) return;
    this.nextDistance -= moved;
    this.nextTime -= dt;
    if (this.nextDistance <= 0 && this.nextTime <= 0) this.advance();
    if (this.needsPortal && snapshot && road) {
      const point = pointAlongStreet(road,center,heading,65) ?? pointAlongStreet(road,center,heading,32);
      if (point) {
        this.anchor = {
          latitude:snapshot.originLat - point.z/110540,
          longitude:snapshot.originLon + point.x/(111320*Math.cos(snapshot.originLat*Math.PI/180)),
          heading:point.heading,
        };
        const preferredSide: -1 | 1 = this.index % 2 === 0 ? -1 : 1;
        let chosenSide: -1 | 1 = preferredSide;
        let showStage = true;
        if (clearance) {
          const lateral = 11.5;
          const isClear = (s: -1 | 1) =>
            clearance.clear(
              { x: point.x + Math.cos(point.heading) * s * lateral, z: point.z + Math.sin(point.heading) * s * lateral },
              4.2
            );
          if (isClear(preferredSide)) {
            chosenSide = preferredSide;
          } else if (isClear(-preferredSide as -1 | 1)) {
            chosenSide = -preferredSide as -1 | 1;
          } else {
            showStage = false;
          }
        }
        this.slot = createRoadsideMilestoneEvent(this.index, 0, () => 0, 11.5, chosenSide);
        if (!this.slot.isOverhead && !showStage) {
          this.slot.spectacle.visible = false;
        }
        this.scene.add(this.slot.root);
        this.needsPortal = false;
      }
    }
    if (this.slot && this.anchor && snapshot) {
      const point = geoDeltaMeters(snapshot.originLat,snapshot.originLon,this.anchor.latitude,this.anchor.longitude);
      this.slot.root.position.set(point.x,groundAt(point.x,point.z),point.z);
      this.slot.root.rotation.y = -this.anchor.heading;
      const distance = Math.hypot(point.x-center.x,point.z-center.z);
      this.slot.root.visible = distance <= 155;
      if (this.slot.root.visible) {
        const approach = THREE.MathUtils.clamp(1 - distance / 130, 0, 1);
        this.slot.updater?.(time, dt, approach);
      }
      this.slot.root.scale.y = 1 + Math.sin(time*1.2)*0.015;
    }
  }
}
