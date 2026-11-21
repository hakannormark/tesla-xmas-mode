import { ElonEventType } from './i18n';

export interface ActiveElonEvent {
  type: ElonEventType;
  progress: number; // 0..1
  duration: number;
  elapsed: number;
}

const EVENT_DURATIONS: Record<ElonEventType, number> = {
  starman: 12,
  starlink: 11,
  starship: 13,
  supercharger: 11,
  cyberplow: 11,
};

const ALL_EVENTS: ElonEventType[] = ['starman', 'starlink', 'starship', 'supercharger', 'cyberplow'];

export class ElonEventDirector {
  private active: ActiveElonEvent | null = null;
  private cooldownSec = 9; // First surprise arrives early when driving!
  private lastType: ElonEventType | null = null;
  private onStartCallbacks = new Set<(type: ElonEventType) => void>();

  onEventStart(cb: (type: ElonEventType) => void): () => void {
    this.onStartCallbacks.add(cb);
    return () => this.onStartCallbacks.delete(cb);
  }

  getActiveEvent(): ActiveElonEvent | null {
    return this.active;
  }

  trigger(type: ElonEventType): void {
    const duration = EVENT_DURATIONS[type];
    this.active = {
      type,
      duration,
      elapsed: 0,
      progress: 0,
    };
    this.lastType = type;
    this.cooldownSec = 28 + Math.random() * 16;
    for (const cb of this.onStartCallbacks) {
      cb(type);
    }
  }

  triggerNext(): ElonEventType {
    const idx = this.lastType ? (ALL_EVENTS.indexOf(this.lastType) + 1) % ALL_EVENTS.length : 0;
    const next = ALL_EVENTS[idx];
    this.trigger(next);
    return next;
  }

  update(dt: number, isMoving: boolean): ActiveElonEvent | null {
    if (this.active) {
      this.active.elapsed += dt;
      this.active.progress = Math.min(1, this.active.elapsed / this.active.duration);
      if (this.active.elapsed >= this.active.duration) {
        this.active = null;
      }
      return this.active;
    }

    if (isMoving) {
      this.cooldownSec -= dt;
      if (this.cooldownSec <= 0) {
        const candidates = ALL_EVENTS.filter((e) => e !== this.lastType);
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        this.trigger(pick);
      }
    }

    return null;
  }

  reset(): void {
    this.active = null;
    this.cooldownSec = 10;
  }
}
