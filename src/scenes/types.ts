import { HolidayAudioEngine } from '../core/audioEngine';
import { ActiveElonEvent } from '../core/elonEvents';
import { EnvironmentState } from '../core/environment';
import { SceneId } from '../core/i18n';
import { TelemetryFrame } from '../core/telemetry';

export interface SceneFrameContext {
  telemetry: TelemetryFrame;
  env: EnvironmentState;
  elonEvent: ActiveElonEvent | null;
  audio: HolidayAudioEngine;
}

export interface HolidayScene {
  readonly id: SceneId;
  mount(container: HTMLElement): void;
  update(dt: number, frame: SceneFrameContext): void;
  resize(width: number, height: number): void;
  interact(normX?: number, normY?: number): void;
  dispose(): void;
}
