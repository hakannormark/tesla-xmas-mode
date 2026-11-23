import * as THREE from 'three';
import { ELON_MILESTONES } from '../core/elonTimelineData';
import { geoDeltaMeters, type OsmMapSnapshot, type OsmRoadRibbon } from '../core/osmWorld';
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
    const toggle = root.querySelector<HTMLButtonElement>('[data-timeline]')!;
    toggle.onclick = () => {
      this.enabled = !this.enabled;
      toggle.setAttribute('aria-pressed',String(this.enabled));
      toggle.closest('details')!.open = false;
      this.card.hidden = !this.enabled;
      if (this.enabled) this.show();
      else this.clearPortal();
    };
    this.card.querySelector<HTMLButtonElement>('[data-timeline-next]')!.onclick = () => this.advance();
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

  private advance(): void {
    this.clearPortal();
    this.index = (this.index+1)%ELON_MILESTONES.length;
    this.show();
  }

  update(dt: number, time: number, moved: number, snapshot: OsmMapSnapshot | undefined,
    road: OsmRoadRibbon | undefined, center: THREE.Vector3, heading: number): void {
    if (!this.enabled) return;
    this.nextDistance -= moved;
    this.nextTime -= dt;
    if (this.nextDistance <= 0 && this.nextTime <= 0) this.advance();
    if (this.needsPortal && snapshot && road) {
      const point = pointAlongStreet(road,center,heading,65) ?? pointAlongStreet(road,center,heading,30);
      if (point) {
        this.anchor = {
          latitude:snapshot.originLat - point.z/110540,
          longitude:snapshot.originLon + point.x/(111320*Math.cos(snapshot.originLat*Math.PI/180)),
          heading:point.heading,
        };
        this.slot = createRoadsideMilestoneEvent(this.index,0,() => 0);
        // Keep the original golden portal and its marquee over the mapped street.
        // The historical dioramas are available in the classic timeline mode.
        this.slot.spectacle.visible = false;
        this.scene.add(this.slot.root);
        this.needsPortal = false;
      }
    }
    if (this.slot && this.anchor && snapshot) {
      const point = geoDeltaMeters(snapshot.originLat,snapshot.originLon,this.anchor.latitude,this.anchor.longitude);
      this.slot.root.position.set(point.x,0,point.z);
      this.slot.root.rotation.y = -this.anchor.heading;
      const distance = Math.hypot(point.x-center.x,point.z-center.z);
      this.slot.root.visible = distance <= 145;
      this.slot.root.scale.y = 1 + Math.sin(time*1.2)*0.015;
    }
  }
}
