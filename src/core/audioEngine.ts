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

const CHORD_PROGRESSION: number[][] = [
  [261.63, 329.63, 392.0, 493.88, 587.33], // Cmaj9
  [174.61, 261.63, 349.23, 440.0, 523.25], // Fmaj7
  [220.0, 261.63, 329.63, 392.0, 493.88], // Am9
  [196.0, 293.66, 349.23, 440.0, 523.25], // G13sus4
  [155.56, 233.08, 311.13, 392.0, 466.16], // Ebmaj7
  [207.65, 261.63, 311.13, 392.0, 466.16], // Abmaj7
  [196.0, 261.63, 329.63, 392.0, 493.88], // G13 -> C
  [196.0, 293.66, 349.23, 493.88, 587.33], // G9sus4
];

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
  private volume = 0.72;

  private chordIdx = 0;
  private chordTimer = 0;
  private bellTimer = 0;
  private arpTimer = 0;
  private arpStep = 0;
  private prevBraking = false;
  private lastEventTriggered: string | null = null;

  private wavDataUri: string | null = null;

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

    const chord = CHORD_PROGRESSION[0];
    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    for (let i = 0; i < chord.length; i++) {
      const osc = this.ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.value = chord[i];
      osc.detune.value = (i - 2) * 3.5;

      const g = this.ctx.createGain();
      g.gain.value = 0.08;
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
    if (!this.ctx || this.ctx.state !== 'running') return;
    if (this.mixMode === 'muted') return;

    const now = this.ctx.currentTime;
    const speedRatio = Math.min(1, telemetry.speedKmh / 120);

    // 1. Dynamic Pad Filter & Chord Progression (Full Mix)
    if (this.mixMode === 'full' && this.padVoice && this.padFilter) {
      const targetCutoff = 440 + speedRatio * 780 + (telemetry.inTunnel ? -120 : 0);
      this.padFilter.frequency.setTargetAtTime(Math.max(260, targetCutoff), now, 0.25);

      this.chordTimer += dt;
      const chordDuration = telemetry.isPlaidSpeed ? 4.2 : 5.6;
      if (this.chordTimer >= chordDuration) {
        this.chordTimer = 0;
        this.chordIdx = (this.chordIdx + 1) % CHORD_PROGRESSION.length;
        const nextChord = CHORD_PROGRESSION[this.chordIdx];
        this.padVoice.oscs.forEach((osc, idx) => {
          const f = nextChord[idx % nextChord.length];
          osc.frequency.setTargetAtTime(f, now, 0.45);
        });
      }

      // Celesta arpeggio sparkling faster as speed increases
      this.arpTimer += dt;
      const arpInterval = telemetry.speedKmh < 3 ? 1.45 : Math.max(0.24, 0.85 - speedRatio * 0.56);
      if (this.arpTimer >= arpInterval) {
        this.arpTimer = 0;
        const chord = CHORD_PROGRESSION[this.chordIdx];
        const note = chord[this.arpStep % chord.length] * (this.arpStep % 2 === 0 ? 2 : 4);
        this.arpStep++;
        this.playCelestaNote(note, 0.055 + speedRatio * 0.04, 1.15);
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
    osc.type = 'sine';
    harm.type = 'triangle';
    osc.frequency.value = freq;
    harm.frequency.value = freq * 2;

    const harmGain = this.ctx.createGain();
    harmGain.gain.value = 0.18;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(level, now + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(env);
    harm.connect(harmGain);
    harmGain.connect(env);

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
    const notes = [392.0, 493.88, 587.33, 739.99, 987.77, 1174.66];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running') {
          this.playCelestaNote(n, 0.1, 1.05);
        }
      }, idx * 75);
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

  playHoHoHo(): void {
    this.unlock();
    if (!this.ctx || this.mixMode === 'muted') return;
    // Cheerful warm festive 3-pulse sleigh & brass-bell "Ho-Ho-Ho!" fanfare
    const rootNotes = [196.0, 246.94, 293.66];
    rootNotes.forEach((f, idx) => {
      setTimeout(() => {
        if (!this.ctx || this.ctx.state !== 'running') return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const sub = this.ctx.createOscillator();
        osc.type = 'triangle';
        sub.type = 'sine';
        osc.frequency.setValueAtTime(f * 0.92, now);
        osc.frequency.exponentialRampToValueAtTime(f, now + 0.08);
        sub.frequency.value = f * 0.5;

        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 950;

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.18, now + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

        osc.connect(lp);
        sub.connect(lp);
        lp.connect(g);
        if (this.dryBus) g.connect(this.dryBus);
        if (this.reverbBus) g.connect(this.reverbBus);

        osc.start(now);
        sub.start(now);
        osc.stop(now + 0.35);
        sub.stop(now + 0.35);
        this.triggerSleighBell(0.75, (idx - 1) * 0.3);
      }, idx * 230);
    });
    setTimeout(() => this.playSparkleChime(), 580);
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
