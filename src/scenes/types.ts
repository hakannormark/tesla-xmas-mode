import { HolidayAudioEngine } from '../core/audioEngine';
import { ActiveElonEvent } from '../core/elonEvents';
import { EnvironmentState } from '../core/environment';
import { SceneId } from '../core/i18n';
import { LiveWorldState } from '../core/liveWorldData';
import { OsmWorldState } from '../core/osmWorld';
import { TelemetryFrame } from '../core/telemetry';

export type SceneReactionKind = 'hohoho' | 'landmark' | 'gift';

export interface SceneFrameContext {
  telemetry: TelemetryFrame;
  env: EnvironmentState;
  elonEvent: ActiveElonEvent | null;
  osm: OsmWorldState;
  live: LiveWorldState;
  audio: HolidayAudioEngine;
  onGiftDelivered?: (totalGifts: number) => void;
}

export interface HolidayScene {
  readonly id: SceneId;
  mount(container: HTMLElement): void;
  update(dt: number, frame: SceneFrameContext): void;
  resize(width: number, height: number): void;
  interact(normX?: number, normY?: number): void;
  triggerReaction?(kind: SceneReactionKind): void;
  dispose(): void;
}
