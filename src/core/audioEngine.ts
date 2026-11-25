import { TelemetryFrame } from './telemetry';

export type AudioMixMode = 'full' | 'sfx' | 'muted';
export type AudioRouting = 'direct' | 'media';

export interface AudioDiagnostics {
  state: AudioContextState | 'uninitialized';
  sampleRate: number;
  routing: AudioRouting;
  outputDb: number;
}

interface PadVoice {
  oscs: OscillatorNode[];
  gains: GainNode[];
}

interface MelodyStep {
  lead: number; // MIDI note (e.g. 72 = C5)
  beats: number;
  bass?: number; // MIDI bass note played at step onset
  chord?: number[]; // MIDI chord for string pad & harp fill
}

interface HolidaySong {
  bpm: number;
  steps: MelodyStep[];
}

function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

const C_MAJ = [60, 64, 67, 71, 74];
const F_MAJ = [65, 69, 72, 76, 79];
const G_DOM = [62, 67, 71, 74, 77];
const A_MIN = [60, 64, 69, 72, 76];
const D_MIN = [62, 65, 69, 72, 76];
const D_DOM = [62, 66, 69, 72, 76];
const E_MIN = [64, 67, 71, 74, 79];

const HOLIDAY_MEDLEY: HolidaySong[] = [
  // 1. Jingle Bells (Joyful C Major)
  {
    bpm: 132,
    steps: [
      { lead: 76, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 76, beats: 1 },
      { lead: 76, beats: 2, bass: 43 },
      { lead: 76, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 76, beats: 1 },
      { lead: 76, beats: 2, bass: 43 },
      { lead: 76, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 79, beats: 1 },
      { lead: 72, beats: 1.5, bass: 43 },
      { lead: 74, beats: 0.5 },
      { lead: 76, beats: 4, bass: 48, chord: C_MAJ },

      { lead: 77, beats: 1, bass: 41, chord: F_MAJ },
      { lead: 77, beats: 1 },
      { lead: 77, beats: 1.5, bass: 48 },
      { lead: 77, beats: 0.5 },
      { lead: 77, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 76, beats: 1 },
      { lead: 76, beats: 1, bass: 43 },
      { lead: 76, beats: 0.5 },
      { lead: 76, beats: 0.5 },
      { lead: 76, beats: 1, bass: 38, chord: D_DOM },
      { lead: 74, beats: 1 },
      { lead: 74, beats: 1, bass: 45 },
      { lead: 76, beats: 1 },
      { lead: 74, beats: 2, bass: 43, chord: G_DOM },
      { lead: 79, beats: 2, bass: 50 },

      { lead: 76, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 76, beats: 1 },
      { lead: 76, beats: 2, bass: 43 },
      { lead: 76, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 76, beats: 1 },
      { lead: 76, beats: 2, bass: 43 },
      { lead: 76, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 79, beats: 1 },
      { lead: 72, beats: 1.5, bass: 43 },
      { lead: 74, beats: 0.5 },
      { lead: 76, beats: 4, bass: 48, chord: C_MAJ },

      { lead: 77, beats: 1, bass: 41, chord: F_MAJ },
      { lead: 77, beats: 1 },
      { lead: 77, beats: 1.5, bass: 48 },
      { lead: 77, beats: 0.5 },
      { lead: 77, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 76, beats: 1 },
      { lead: 76, beats: 1, bass: 43 },
      { lead: 76, beats: 0.5 },
      { lead: 76, beats: 0.5 },
      { lead: 79, beats: 1, bass: 43, chord: G_DOM },
      { lead: 79, beats: 1 },
      { lead: 77, beats: 1, bass: 50 },
      { lead: 74, beats: 1 },
      { lead: 72, beats: 4, bass: 48, chord: C_MAJ },
    ],
  },
  // 2. We Wish You a Merry Christmas (3/4 Waltz in G Major)
  {
    bpm: 138,
    steps: [
      { lead: 62, beats: 1, bass: 43, chord: G_DOM },
      { lead: 67, beats: 1, bass: 43, chord: G_DOM },
      { lead: 67, beats: 0.5 },
      { lead: 69, beats: 0.5 },
      { lead: 67, beats: 0.5 },
      { lead: 66, beats: 0.5 },
      { lead: 64, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 64, beats: 1 },
      { lead: 64, beats: 1 },
      { lead: 69, beats: 1, bass: 45, chord: A_MIN },
      { lead: 69, beats: 0.5 },
      { lead: 71, beats: 0.5 },
      { lead: 69, beats: 0.5 },
      { lead: 67, beats: 0.5 },
      { lead: 66, beats: 1, bass: 38, chord: D_DOM },
      { lead: 62, beats: 1 },
      { lead: 62, beats: 1 },
      { lead: 71, beats: 1, bass: 47, chord: E_MIN },
      { lead: 71, beats: 0.5 },
      { lead: 72, beats: 0.5 },
      { lead: 71, beats: 0.5 },
      { lead: 69, beats: 0.5 },
      { lead: 67, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 64, beats: 1 },
      { lead: 62, beats: 0.5 },
      { lead: 62, beats: 0.5 },
      { lead: 64, beats: 1, bass: 38, chord: D_DOM },
      { lead: 69, beats: 1 },
      { lead: 66, beats: 1 },
      { lead: 67, beats: 3, bass: 43, chord: G_DOM },
    ],
  },
  // 3. Deck the Halls (Festive C Major)
  {
    bpm: 124,
    steps: [
      { lead: 79, beats: 1.5, bass: 48, chord: C_MAJ },
      { lead: 77, beats: 0.5 },
      { lead: 76, beats: 1, bass: 43 },
      { lead: 74, beats: 1 },
      { lead: 72, beats: 1, bass: 48, chord: A_MIN },
      { lead: 74, beats: 1 },
      { lead: 76, beats: 1, bass: 45 },
      { lead: 72, beats: 1 },
      { lead: 74, beats: 0.5, bass: 41, chord: F_MAJ },
      { lead: 76, beats: 0.5 },
      { lead: 77, beats: 0.5 },
      { lead: 74, beats: 0.5 },
      { lead: 76, beats: 1.5, bass: 43, chord: G_DOM },
      { lead: 74, beats: 0.5 },
      { lead: 72, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 71, beats: 1 },
      { lead: 72, beats: 2, bass: 48 },

      { lead: 79, beats: 1.5, bass: 48, chord: C_MAJ },
      { lead: 77, beats: 0.5 },
      { lead: 76, beats: 1, bass: 43 },
      { lead: 74, beats: 1 },
      { lead: 72, beats: 1, bass: 48, chord: A_MIN },
      { lead: 74, beats: 1 },
      { lead: 76, beats: 1, bass: 45 },
      { lead: 72, beats: 1 },
      { lead: 74, beats: 0.5, bass: 41, chord: D_MIN },
      { lead: 76, beats: 0.5 },
      { lead: 77, beats: 0.5 },
      { lead: 74, beats: 0.5 },
      { lead: 76, beats: 1.5, bass: 43, chord: G_DOM },
      { lead: 74, beats: 0.5 },
      { lead: 72, beats: 1, bass: 48, chord: C_MAJ },
      { lead: 71, beats: 1 },
      { lead: 72, beats: 2, bass: 48 },
    ],
  },
  // 4. Stilla Natt / Silent Night (Dreamy Music-Box Lullaby in C Major)
  {
    bpm: 96,
    steps: [
      { lead: 67, beats: 1.5, bass: 48, chord: C_MAJ },
      { lead: 69, beats: 0.5 },
      { lead: 67, beats: 1 },
      { lead: 64, beats: 3, bass: 48, chord: C_MAJ },
      { lead: 67, beats: 1.5, bass: 48 },
      { lead: 69, beats: 0.5 },
      { lead: 67, beats: 1 },
      { lead: 64, beats: 3, bass: 48, chord: C_MAJ },
      { lead: 74, beats: 2, bass: 43, chord: G_DOM },
      { lead: 74, beats: 1 },
      { lead: 71, beats: 3, bass: 43 },
      { lead: 72, beats: 2, bass: 48, chord: C_MAJ },
      { lead: 72, beats: 1 },
      { lead: 67, beats: 3, bass: 48 },
      { lead: 69, beats: 2, bass: 41, chord: F_MAJ },
      { lead: 69, beats: 1 },
      { lead: 72, beats: 1.5, bass: 45 },
      { lead: 71, beats: 0.5 },
      { lead: 69, beats: 1 },
      { lead: 67, beats: 1.5, bass: 48, chord: C_MAJ },
      { lead: 69, beats: 0.5 },
      { lead: 67, beats: 1 },
      { lead: 64, beats: 3, bass: 48 },
      { lead: 74, beats: 2, bass: 43, chord: G_DOM },
      { lead: 74, beats: 1 },
      { lead: 77, beats: 1.5, bass: 43 },
      { lead: 74, beats: 0.5 },
      { lead: 71, beats: 1 },
      { lead: 72, beats: 3, bass: 48, chord: C_MAJ },
      { lead: 76, beats: 3, bass: 48 },
      { lead: 72, beats: 1.5, bass: 43, chord: G_DOM },
      { lead: 67, beats: 0.5 },
      { lead: 64, beats: 1 },
      { lead: 67, beats: 1.5, bass: 43 },
      { lead: 65, beats: 0.5 },
      { lead: 62, beats: 1 },
      { lead: 60, beats: 4, bass: 48, chord: C_MAJ },
    ],
  },
];

const DEFAULT_PAD_CHORD = C_MAJ.map(midiToHz);

function createNoiseBuffer(ctx: AudioContext, durationSec: number, pink = false): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * durationSec);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  if (!pink) {
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
    b6 = white * 0.115926;
  }
  return buffer;
}

function createHallImpulse(ctx: AudioContext, durationSec = 1.9): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * durationSec);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < length; i++) {
      const t = i / length;
      const env = Math.pow(1 - t, 2.7);
      const raw = (Math.random() * 2 - 1) * env;
      lp = lp * 0.72 + raw * 0.28;
      data[i] = lp * 0.75;
    }
  }
  return buffer;
}

function buildHolidayChimeWavDataUri(): string {
  const sampleRate = 22050;
  const duration = 0.75;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  const freqs = [1046.5, 1318.51, 1567.98, 2093.0];
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;
    for (let fIdx = 0; fIdx < freqs.length; fIdx++) {
      const delay = fIdx * 0.055;
      if (t >= delay) {
        const lt = t - delay;
        const env = Math.exp(-lt * 5.2) * Math.min(1, lt * 120);
        sample += Math.sin(2 * Math.PI * freqs[fIdx] * lt) * env * 0.22;
        sample += Math.sin(2 * Math.PI * freqs[fIdx] * 2 * lt) * env * 0.06;
      }
    }
    const clamped = Math.max(-0.95, Math.min(0.95, sample));
    view.setInt16(44 + i * 2, clamped * 32767, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:audio/wav;base64,${btoa(binary)}`;
}

export class HolidayAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private dryBus: GainNode | null = null;
  private reverbBus: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private analyserBuf: Float32Array<ArrayBuffer> | null = null;

  private mediaDest: MediaStreamAudioDestinationNode | null = null;
  private mediaAudioEl: HTMLAudioElement | null = null;

  private musicBus: GainNode | null = null;
  private padFilter: BiquadFilterNode | null = null;
  private padVoice: PadVoice | null = null;

  private windGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private whiteNoiseBuf: AudioBuffer | null = null;

  private mixMode: AudioMixMode = 'full';
  private routing: AudioRouting = 'direct';
  private musicStyle: 'classic' | 'nordic' | 'cyber2099' = 'classic';
  private volume = 0.72;

  private songIdx = 0;
  private stepIdx = 0;
  private stepWaitSec = 0.25;
  private bellTimer = 0;
  private prevBraking = false;
  private lastEventTriggered: string | null = null;

  private beatPulse = 0;
  private smoothMicEnergy = 0;
  private micState: 'off' | 'active' | 'denied' = 'off';
  private micStream: MediaStream | null = null;
  private micAnalyser: AnalyserNode | null = null;
  private micData: Uint8Array<ArrayBuffer> | null = null;
  private lastScrapeMs = 0;
  private lastChurchBellMs = 0;

  private wavDataUri: string | null = null;
  private santaVoiceBuf: AudioBuffer | null = null;
  private santaVoiceLoading = false;

  constructor() {
    try {
      const savedMix = localStorage.getItem('tesla-xmas-mix');
      if (savedMix === 'full' || savedMix === 'sfx' || savedMix === 'muted') {
        this.mixMode = savedMix;
      }
      const savedRoute = localStorage.getItem('tesla-xmas-route');
      if (savedRoute === 'direct' || savedRoute === 'media') {
        this.routing = savedRoute;
      }
      const savedVol = localStorage.getItem('tesla-xmas-vol');
      if (savedVol !== null) {
        const parsed = Number(savedVol);
        if (Number.isFinite(parsed)) this.volume = Math.max(0, Math.min(1, parsed));
      }
    } catch {
      // Ignore storage failures
    }
  }

  getMixMode(): AudioMixMode {
    return this.mixMode;
  }

  setMixMode(mode: AudioMixMode): void {
    this.mixMode = mode;
    try {
      localStorage.setItem('tesla-xmas-mix', mode);
    } catch {
      // Ignore
    }
    this.applyGainStates();
  }

  getRouting(): AudioRouting {
    return this.routing;
  }

  setRouting(route: AudioRouting): void {
    this.routing = route;
    try {
      localStorage.setItem('tesla-xmas-route', route);
    } catch {
      // Ignore
    }
    if (this.ctx) {
      this.reconnectOutput();
    }
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem('tesla-xmas-vol', this.volume.toFixed(2));
    } catch {
      // Ignore
    }
    this.applyGainStates();
  }

  setMusicStyle(style: 'classic' | 'nordic' | 'cyber2099'): void {
    this.musicStyle = style;
  }

  getMicState(): 'off' | 'active' | 'denied' {
    return this.micState;
  }

  async setMicReactive(enabled: boolean): Promise<'off' | 'active' | 'denied'> {
    if (!enabled) {
      if (this.micStream) {
        this.micStream.getTracks().forEach((tr) => tr.stop());
        this.micStream = null;
      }
      this.micAnalyser = null;
      this.micData = null;
      this.smoothMicEnergy = 0;
      this.micState = 'off';
      return 'off';
    }
    this.unlock();
    if (!this.ctx || !navigator.mediaDevices?.getUserMedia) {
      this.micState = 'denied';
      return 'denied';
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const src = this.ctx.createMediaStreamSource(stream);
      const analyser = this.ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.72;
      src.connect(analyser); // Not connected to destination -> zero audio feedback!
      this.micStream = stream;
      this.micAnalyser = analyser;
      this.micData = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
      this.micState = 'active';
      return 'active';
    } catch {
      this.micState = 'denied';
      return 'denied';
    }
  }

  getBeatEnergy(): number {
    if (this.micState === 'active') {
      return Math.min(1, this.smoothMicEnergy);
    }
    return Math.min(1, this.beatPulse);
  }

  unlock(): void {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;

      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.value = -16;
      compressor.knee.value = 18;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.01;
      compressor.release.value = 0.25;

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyserBuf = new Float32Array(new ArrayBuffer(this.analyser.fftSize * 4));

      this.dryBus = this.ctx.createGain();
      this.dryBus.gain.value = 0.85;

      const convolver = this.ctx.createConvolver();
      convolver.buffer = createHallImpulse(this.ctx, 1.9);

      this.reverbBus = this.ctx.createGain();
      this.reverbBus.gain.value = 0.34;

      this.dryBus.connect(compressor);
      this.reverbBus.connect(convolver);
      convolver.connect(compressor);

      compressor.connect(this.masterGain);
      this.masterGain.connect(this.analyser);

      this.whiteNoiseBuf = createNoiseBuffer(this.ctx, 2.0, false);
      this.setupMusicPad();
      this.setupWindBed();
      this.reconnectOutput();
      this.applyGainStates();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.routing === 'media' && this.mediaAudioEl) {
      this.mediaAudioEl.play().catch(() => {});
    }
    this.preloadSantaVoice();
  }

  private santaAudioUrl(): string {
    return new URL('audio/santa-hohoho.mp3?v=2', document.baseURI).href;
  }

  private preloadSantaVoice(): void {
    if (this.santaVoiceBuf || this.santaVoiceLoading || !this.ctx) return;
    this.santaVoiceLoading = true;
    fetch(this.santaAudioUrl())
      .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject(new Error('Santa audio unavailable'))))
      .then((arr) => (this.ctx ? this.ctx.decodeAudioData(arr) : Promise.reject(new Error('No audio ctx'))))
      .then((decoded) => {
        this.santaVoiceBuf = decoded;
      })
      .catch(() => {
        // Fallback path in playHoHoHo handles offline or slow decode
      })
      .finally(() => {
        this.santaVoiceLoading = false;
      });
  }

  private reconnectOutput(): void {
    if (!this.ctx || !this.masterGain) return;
    try {
      this.masterGain.disconnect();
    } catch {
      // Ignore if not connected
    }
    if (this.analyser) {
      this.masterGain.connect(this.analyser);
    }

    if (this.routing === 'direct') {
      this.masterGain.connect(this.ctx.destination);
      if (this.mediaAudioEl) {
        this.mediaAudioEl.pause();
      }
    } else {
      if (!this.mediaDest && typeof this.ctx.createMediaStreamDestination === 'function') {
        this.mediaDest = this.ctx.createMediaStreamDestination();
        const el = document.createElement('audio');
        el.autoplay = true;
        el.setAttribute('playsinline', '');
        el.style.display = 'none';
        el.srcObject = this.mediaDest.stream;
        document.body.appendChild(el);
        this.mediaAudioEl = el;
      }
      if (this.mediaDest) {
        this.masterGain.connect(this.mediaDest);
        this.mediaAudioEl?.play().catch(() => {});
      } else {
        // Fallback if browser lacks MediaStreamAudioDestinationNode
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  private setupMusicPad(): void {
    if (!this.ctx || !this.dryBus || !this.reverbBus) return;
    this.musicBus = this.ctx.createGain();
    this.musicBus.gain.value = this.mixMode === 'full' ? 0.34 : 0;

    this.padFilter = this.ctx.createBiquadFilter();
    this.padFilter.type = 'lowpass';
    this.padFilter.frequency.value = 520;
    this.padFilter.Q.value = 0.7;

    this.padFilter.connect(this.musicBus);
    this.musicBus.connect(this.dryBus);
    this.musicBus.connect(this.reverbBus);

    const chord = DEFAULT_PAD_CHORD;
    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    for (let i = 0; i < chord.length; i++) {
      const osc = this.ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.value = chord[i];
      osc.detune.value = (i - 2) * 3.5;

      const g = this.ctx.createGain();
      g.gain.value = 0.065;
      osc.connect(g);
      g.connect(this.padFilter);
      osc.start();
      oscs.push(osc);
      gains.push(g);
    }

    this.padVoice = { oscs, gains };
  }

  private setupWindBed(): void {
    if (!this.ctx || !this.dryBus || !this.reverbBus) return;
    const pinkBuf = createNoiseBuffer(this.ctx, 4.0, true);
    const src = this.ctx.createBufferSource();
    src.buffer = pinkBuf;
    src.loop = true;

    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.value = 260;
    this.windFilter.Q.value = 1.6;

    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.015;

    src.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.dryBus);
    this.windGain.connect(this.reverbBus);
    src.start();
  }

  private applyGainStates(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (this.masterGain) {
      const target = this.mixMode === 'muted' ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, now, 0.08);
    }
    if (this.musicBus) {
      const targetMusic = this.mixMode === 'full' ? 0.36 : 0;
      this.musicBus.gain.setTargetAtTime(targetMusic, now, 0.15);
    }
  }

  update(dt: number, telemetry: TelemetryFrame, activeEventType: string | null): void {
    this.beatPulse = Math.max(0, this.beatPulse - dt * 2.8);

    if (this.micState === 'active' && this.micAnalyser && this.micData) {
      this.micAnalyser.getByteFrequencyData(this.micData);
      let sum = 0;
      const bins = Math.min(16, this.micData.length);
      for (let i = 0; i < bins; i++) sum += this.micData[i];
      const norm = Math.min(1, (sum / (bins * 255)) * 1.9);
      this.smoothMicEnergy += (norm - this.smoothMicEnergy) * Math.min(1, dt * 12);
    } else {
      this.smoothMicEnergy = Math.max(0, this.smoothMicEnergy - dt * 4);
    }

    if (!this.ctx || this.ctx.state !== 'running') return;
    if (this.mixMode === 'muted') return;

    const now = this.ctx.currentTime;
    const speedRatio = Math.min(1, telemetry.speedKmh / 120);

    // 1. Dynamic Orchestral Holiday Medley: Harmony Pad + Melody Celesta + Plucked Bass + Harp (Full Mix)
    if (this.mixMode === 'full' && this.padVoice && this.padFilter) {
      const targetCutoff = 480 + speedRatio * 780 + (telemetry.inTunnel ? -120 : 0);
      this.padFilter.frequency.setTargetAtTime(Math.max(260, targetCutoff), now, 0.25);

      this.stepWaitSec -= dt;
      if (this.stepWaitSec <= 0) {
        const song = HOLIDAY_MEDLEY[this.songIdx];
        const step = song.steps[this.stepIdx];
        const tempoScale = telemetry.speedKmh < 3 ? 0.92 : 1.0 + speedRatio * 0.16;
        const secPerBeat = 60 / (song.bpm * tempoScale);
        const durSec = step.beats * secPerBeat;
        this.stepWaitSec = durSec;
        this.beatPulse = Math.max(this.beatPulse, step.bass ? 0.95 : 0.62);

        if (step.chord) {
          const chordHz = step.chord.map(midiToHz);
          this.padVoice.oscs.forEach((osc, idx) => {
            osc.frequency.setTargetAtTime(chordHz[idx % chordHz.length], now, 0.18);
          });
        }

        if (step.bass) {
          this.playBassNote(midiToHz(step.bass), 0.14, Math.min(1.4, durSec * 1.1));
        }

        // Celesta lead melody note with sparkling harmonic shimmer
        this.playCelestaNote(midiToHz(step.lead), 0.11 + speedRatio * 0.025, Math.max(0.32, durSec * 1.15));

        // Gentle off-beat harp twinkle inside sustained melody notes
        if (step.beats >= 1.5 && step.chord) {
          const midNote = midiToHz(step.chord[2] + 12);
          const halfMs = Math.round(durSec * 500);
          setTimeout(() => {
            if (this.ctx && this.ctx.state === 'running' && this.mixMode === 'full') {
              this.playCelestaNote(midNote, 0.055, 0.55);
            }
          }, halfMs);
        }

        this.stepIdx++;
        if (this.stepIdx >= song.steps.length) {
          this.stepIdx = 0;
          this.songIdx = (this.songIdx + 1) % HOLIDAY_MEDLEY.length;
        }
      }
    }

    // 2. Dynamic Winter Wind
    if (this.windFilter && this.windGain) {
      const turnExtra = Math.abs(telemetry.turnRate) * 140;
      const tunnelBoost = telemetry.tunnelBlend * 180;
      const freq = 240 + speedRatio * 650 + turnExtra + tunnelBoost;
      const gain = 0.012 + speedRatio * 0.095 + telemetry.tunnelBlend * 0.035;
      this.windFilter.frequency.setTargetAtTime(freq, now, 0.15);
      this.windGain.gain.setTargetAtTime(gain, now, 0.15);
    }

    // 3. Rhythmic Sleigh Bells synced to speed
    this.bellTimer += dt;
    const bellInterval =
      telemetry.speedKmh < 2.5
        ? 1.9
        : telemetry.speedKmh < 35
          ? 0.62 - (telemetry.speedKmh / 35) * 0.24
          : Math.max(0.16, 0.38 - ((telemetry.speedKmh - 35) / 95) * 0.21);

    if (this.bellTimer >= bellInterval) {
      this.bellTimer = 0;
      const intensity = telemetry.speedKmh < 2.5 ? 0.16 : 0.28 + speedRatio * 0.55;
      this.triggerSleighBell(intensity, telemetry.turnRate * 0.35);
    }

    // 4. Braking bell jingle transition
    if (telemetry.isBraking && !this.prevBraking && telemetry.speedKmh > 12) {
      this.playBrakeJingle();
    }
    this.prevBraking = telemetry.isBraking;

    // 5. Elon event entrance audio cues
    if (activeEventType && activeEventType !== this.lastEventTriggered) {
      this.lastEventTriggered = activeEventType;
      if (activeEventType === 'starship') {
        this.playRocketRumble();
      } else {
        this.playSparkleChime();
      }
    } else if (!activeEventType) {
      this.lastEventTriggered = null;
    }
  }

  private playCelestaNote(freq: number, level: number, duration: number, destOverride?: AudioNode): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const harm = this.ctx.createOscillator();
    const isCyber = this.musicStyle === 'cyber2099' && !destOverride;
    osc.type = isCyber ? 'sawtooth' : 'sine';
    harm.type = isCyber ? 'square' : 'triangle';
    osc.frequency.value = freq;
    harm.frequency.value = isCyber ? freq * 0.5 : freq * 2;

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = isCyber ? 2400 : 8000;

    const harmGain = this.ctx.createGain();
    harmGain.gain.value = isCyber ? 0.16 : 0.18;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(isCyber ? level * 0.65 : level, now + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(lp);
    harm.connect(harmGain);
    harmGain.connect(lp);
    lp.connect(env);

    if (destOverride) {
      env.connect(destOverride);
    } else {
      if (this.dryBus) env.connect(this.dryBus);
      if (this.reverbBus) env.connect(this.reverbBus);
    }

    osc.start(now);
    harm.start(now);
    osc.stop(now + duration + 0.05);
    harm.stop(now + duration + 0.05);
  }

  private playBassNote(freq: number, level: number, duration: number): void {
    if (!this.ctx || !this.musicBus) return;
    const now = this.ctx.currentTime;
    const isCyber = this.musicStyle === 'cyber2099';
    const osc = this.ctx.createOscillator();
    osc.type = isCyber ? 'sawtooth' : 'triangle';
    osc.frequency.value = freq;

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(isCyber ? 860 : 520, now);
    lp.frequency.exponentialRampToValueAtTime(160, now + duration);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(level, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(lp);
    lp.connect(g);
    g.connect(this.musicBus);
    osc.start(now);
    osc.stop(now + duration + 0.04);
  }

  private triggerSleighBell(intensity: number, pan = 0, destOverride?: AudioNode): void {
    if (!this.ctx || !this.whiteNoiseBuf) return;
    const now = this.ctx.currentTime;

    const src = this.ctx.createBufferSource();
    src.buffer = this.whiteNoiseBuf;

    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 3800;

    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 5400 + Math.random() * 1100;
    bp.Q.value = 2.6;

    const env = this.ctx.createGain();
    const peak = Math.min(0.24, intensity * 0.22);
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(peak, now + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    // Subtle metallic harmonic pings
    const pingFreqs = [3520, 4978, 6645];
    for (const pf of pingFreqs) {
      const pOsc = this.ctx.createOscillator();
      pOsc.type = 'sine';
      pOsc.frequency.value = pf * (0.97 + Math.random() * 0.06);
      const pGain = this.ctx.createGain();
      pGain.gain.setValueAtTime(0.0001, now);
      pGain.gain.linearRampToValueAtTime(peak * 0.14, now + 0.005);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);
      pOsc.connect(pGain);
      if (destOverride) {
        pGain.connect(destOverride);
      } else if (this.dryBus) {
        pGain.connect(this.dryBus);
      }
      pOsc.start(now);
      pOsc.stop(now + 0.19);
    }

    src.connect(hp);
    hp.connect(bp);
    bp.connect(env);

    let tail: AudioNode = env;
    if (typeof this.ctx.createStereoPanner === 'function') {
      const panner = this.ctx.createStereoPanner();
      panner.pan.value = Math.max(-0.7, Math.min(0.7, pan));
      env.connect(panner);
      tail = panner;
    }

    if (destOverride) {
      tail.connect(destOverride);
    } else {
      if (this.dryBus) tail.connect(this.dryBus);
      if (this.reverbBus) tail.connect(this.reverbBus);
    }

    src.start(now, Math.random() * 0.8, 0.18);
  }

  playSparkleChime(): void {
    this.unlock();
    if (!this.ctx || this.mixMode === 'muted') return;
    const notes = [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running') {
          this.playCelestaNote(n, 0.095, 0.9);
        }
      }, idx * 65);
    });
  }

  playLightWaveChime(): void {
    this.unlock();
    if (!this.ctx || this.mixMode === 'muted') return;
    // Cascading 10-note Tesla Holiday Light Show arpeggio + syncopated sleigh bells
    const notes = [392.0, 493.88, 587.33, 739.99, 783.99, 987.77, 1174.66, 1479.98, 1567.98, 1975.53];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running' && this.mixMode !== 'muted') {
          this.playCelestaNote(n, 0.11, 1.15);
        }
      }, idx * 85);
    });
    [0, 170, 340, 510, 680, 920].forEach((ms, idx) => {
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running' && this.mixMode !== 'muted') {
          this.triggerSleighBell(0.75, (idx % 2 === 0 ? -1 : 1) * 0.45);
        }
      }, ms);
    });
  }

  playGlobeShake(): void {
    this.unlock();
    if (!this.ctx || this.mixMode === 'muted') return;
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        this.triggerSleighBell(0.75 - i * 0.12, (i % 2 === 0 ? -1 : 1) * 0.4);
      }, i * 85);
    }
    this.playSparkleChime();
  }

  playBrakeJingle(): void {
    if (!this.ctx || this.mixMode === 'muted') return;
    this.triggerSleighBell(0.6, -0.3);
    setTimeout(() => this.triggerSleighBell(0.45, 0.3), 90);
  }

  private speakHoHoHoFallback(): void {
    const fallbackEl = new Audio(this.santaAudioUrl());
    fallbackEl.volume = Math.max(0.55, this.volume);
    fallbackEl.play().catch(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance('Ho! Ho! Ho!');
          utter.pitch = 0.55;
          utter.rate = 0.85;
          utter.volume = Math.max(0.55, this.volume);
          window.speechSynthesis.speak(utter);
        } catch {
          // Ignore speech synthesis errors
        }
      }
    });
  }

  playHoHoHo(): void {
    this.unlock();
    this.preloadSantaVoice();
    if (this.mixMode === 'muted') return;

    if (this.ctx && this.santaVoiceBuf && (this.dryBus || this.reverbBus)) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.santaVoiceBuf;
      const g = this.ctx.createGain();
      g.gain.value = 1.25;
      src.connect(g);
      if (this.dryBus) g.connect(this.dryBus);
      if (this.reverbBus) g.connect(this.reverbBus);
      src.start();
    } else {
      this.speakHoHoHoFallback();
    }

    // Rhythmic sleigh-bell jingles & sparkling C-major holiday celesta chord underneath Santa's booming voice
    [0, 260, 520, 780].forEach((ms, idx) => {
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running' && this.mixMode !== 'muted') {
          this.triggerSleighBell(0.76, (idx % 2 === 0 ? -1 : 1) * 0.35);
        }
      }, ms);
    });
    const holidayChord = [523.25, 659.25, 783.99, 1046.5];
    holidayChord.forEach((freq, idx) => {
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running' && this.mixMode !== 'muted') {
          this.playCelestaNote(freq, 0.085, 1.15);
        }
      }, 120 + idx * 45);
    });
  }

  playSnowballSplat(): void {
    this.unlock();
    if (!this.ctx || !this.whiteNoiseBuf || this.mixMode === 'muted') return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.whiteNoiseBuf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(1400, now);
    bp.frequency.exponentialRampToValueAtTime(340, now + 0.14);
    bp.Q.value = 1.6;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.24, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    src.connect(bp);
    bp.connect(g);
    if (this.dryBus) g.connect(this.dryBus);
    src.start(now);
    src.stop(now + 0.18);
  }

  playRocketRumble(): void {
    if (!this.ctx || !this.whiteNoiseBuf || this.mixMode === 'muted') return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.whiteNoiseBuf;
    src.loop = true;

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(160, now);
    lp.frequency.exponentialRampToValueAtTime(520, now + 2.4);
    lp.frequency.exponentialRampToValueAtTime(120, now + 5.0);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.18, now + 1.1);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 5.2);

    src.connect(lp);
    lp.connect(g);
    if (this.dryBus) g.connect(this.dryBus);
    if (this.reverbBus) g.connect(this.reverbBus);
    src.start(now);
    src.stop(now + 5.3);
  }

  playGiftLaunch(): void {
    this.unlock();
    if (!this.ctx || this.ctx.state !== 'running' || this.mixMode === 'muted') return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.16);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.11, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(g);
    if (this.dryBus) g.connect(this.dryBus);
    if (this.reverbBus) g.connect(this.reverbBus);
    osc.start(now);
    osc.stop(now + 0.24);
  }

  playChimneyPop(): void {
    this.unlock();
    if (!this.ctx || this.ctx.state !== 'running' || this.mixMode === 'muted') return;
    [523.25, 659.25, 783.99, 1046.5].forEach((hz, i) => {
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running') {
          this.playCelestaNote(hz, 0.1, 0.42);
        }
      }, i * 35);
    });
    this.triggerSleighBell(0.7, 0.2);
  }

  playIceScrape(): void {
    if (!this.ctx || !this.whiteNoiseBuf || this.ctx.state !== 'running' || this.mixMode === 'muted') return;
    const nowMs = performance.now();
    if (nowMs - this.lastScrapeMs < 140) return;
    this.lastScrapeMs = nowMs;

    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.whiteNoiseBuf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 3400 + Math.random() * 900;
    bp.Q.value = 2.0;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.055, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    src.connect(bp);
    bp.connect(g);
    if (this.dryBus) g.connect(this.dryBus);
    src.start(now, Math.random() * 0.5, 0.11);
  }

  /** Deep dual-blast brass truck horn chord for the Coca-Cola & Tesla Semi convoy */
  playConvoyHorn(): void {
    if (!this.ctx || this.ctx.state !== 'running' || this.mixMode === 'muted') return;
    const bus = this.dryBus ?? this.ctx.destination;
    const now = this.ctx.currentTime;
    const blasts = [
      { start: 0.0, dur: 0.34, gain: 0.22 },
      { start: 0.42, dur: 0.72, gain: 0.26 },
    ];
    const chordHz = [146.83, 185.0, 220.0]; // D3-F#3-A3 warm air-horn triad

    for (const blast of blasts) {
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.Q.value = 1.9;
      lp.frequency.setValueAtTime(520, now + blast.start);
      lp.frequency.exponentialRampToValueAtTime(1180, now + blast.start + 0.09);
      lp.frequency.exponentialRampToValueAtTime(640, now + blast.start + blast.dur);

      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0.0001, now + blast.start);
      env.gain.linearRampToValueAtTime(blast.gain, now + blast.start + 0.045);
      env.gain.setValueAtTime(blast.gain * 0.88, now + blast.start + blast.dur * 0.72);
      env.gain.exponentialRampToValueAtTime(0.0001, now + blast.start + blast.dur + 0.14);

      lp.connect(env);
      env.connect(bus);

      for (const hz of chordHz) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(hz, now + blast.start);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 9, now + blast.start);
        osc.connect(lp);
        osc.start(now + blast.start);
        osc.stop(now + blast.start + blast.dur + 0.16);
      }
    }
  }

  /** Soft festive Swedish church bell toll when driving past an OSM church (26s cooldown) */
  playChurchBells(): void {
    if (!this.ctx || this.ctx.state !== 'running' || this.mixMode === 'muted') return;
    const nowMs = performance.now();
    if (nowMs - this.lastChurchBellMs < 26000) return;
    this.lastChurchBellMs = nowMs;

    const bus = this.dryBus ?? this.ctx.destination;
    const now = this.ctx.currentTime;
    const bells = [329.63, 392.0, 293.66, 261.63]; // E4 - G4 - D4 - C4 carillon

    bells.forEach((baseHz, idx) => {
      if (!this.ctx) return;
      const t = now + idx * 0.52;
      const partials = [
        { mult: 1.0, amp: 0.11, decay: 2.1 },
        { mult: 2.0, amp: 0.045, decay: 1.4 },
        { mult: 2.756, amp: 0.025, decay: 0.85 },
      ];
      for (const p of partials) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseHz * p.mult, t);
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(p.amp, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + p.decay);
        osc.connect(g);
        g.connect(bus);
        osc.start(t);
        osc.stop(t + p.decay + 0.05);
      }
    });
  }

  /** Ascending celebratory celesta arpeggio for Gift Cannon combos & town tree/star bonuses */
  playComboFanfare(combo: number): void {
    if (!this.ctx || this.ctx.state !== 'running' || this.mixMode === 'muted') return;
    const pitchScale = 1 + Math.min(4, Math.max(0, combo - 2)) * 0.06;
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((hz, idx) => {
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running') {
          this.playCelestaNote(hz * pitchScale, 0.13, 0.45);
        }
      }, idx * 45);
    });
    this.triggerSleighBell(0.82, 0.18);
  }

  // --- Tesla 3-Button Sound Check ---
  testDirect(): void {
    this.unlock();
    if (!this.ctx) return;
    const dest = this.ctx.destination;
    [523.25, 659.25, 783.99, 1046.5].forEach((n, idx) => {
      setTimeout(() => {
        if (this.ctx) this.playCelestaNote(n, 0.16, 0.7, dest);
      }, idx * 80);
    });
    this.triggerSleighBell(0.85, 0, dest);
  }

  testMedia(): void {
    this.unlock();
    if (!this.ctx) return;
    if (!this.mediaDest && typeof this.ctx.createMediaStreamDestination === 'function') {
      this.mediaDest = this.ctx.createMediaStreamDestination();
      const el = document.createElement('audio');
      el.autoplay = true;
      el.setAttribute('playsinline', '');
      el.style.display = 'none';
      el.srcObject = this.mediaDest.stream;
      document.body.appendChild(el);
      this.mediaAudioEl = el;
    }
    this.mediaAudioEl?.play().catch(() => {});
    const dest = this.mediaDest ?? this.ctx.destination;
    [587.33, 739.99, 880.0, 1174.66].forEach((n, idx) => {
      setTimeout(() => {
        if (this.ctx) this.playCelestaNote(n, 0.16, 0.7, dest);
      }, idx * 80);
    });
    this.triggerSleighBell(0.85, 0, dest);
  }

  testAudioFile(): void {
    if (!this.wavDataUri) {
      this.wavDataUri = buildHolidayChimeWavDataUri();
    }
    const audio = new Audio(this.wavDataUri);
    audio.volume = Math.max(0.5, this.volume);
    audio.play().catch(() => {});
  }

  getDiagnostics(): AudioDiagnostics {
    let outputDb = -100;
    if (this.ctx && this.analyser && this.analyserBuf && this.ctx.state === 'running') {
      this.analyser.getFloatTimeDomainData(this.analyserBuf);
      let sum = 0;
      for (let i = 0; i < this.analyserBuf.length; i++) {
        sum += this.analyserBuf[i] * this.analyserBuf[i];
      }
      const rms = Math.sqrt(sum / this.analyserBuf.length);
      if (rms > 1e-5) {
        outputDb = Math.max(-100, Math.round(20 * Math.log10(rms)));
      }
    }
    return {
      state: this.ctx ? this.ctx.state : 'uninitialized',
      sampleRate: this.ctx ? this.ctx.sampleRate : 0,
      routing: this.routing,
      outputDb,
    };
  }

  dispose(): void {
    if (this.micStream) {
      this.micStream.getTracks().forEach((tr) => tr.stop());
      this.micStream = null;
    }
    if (this.mediaAudioEl) {
      this.mediaAudioEl.pause();
      this.mediaAudioEl.remove();
      this.mediaAudioEl = null;
    }
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}
