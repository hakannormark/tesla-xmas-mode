export type DriveSource = 'gps' | 'demo' | 'manual';
export type GpsStatus = 'off' | 'searching' | 'active' | 'error';

export interface TelemetryFrame {
  source: DriveSource;
  gpsStatus: GpsStatus;
  speedKmh: number;
  rawSpeedKmh: number;
  acceleration: number; // m/s^2
  turnRate: number; // -1 (hard left) .. +1 (hard right)
  headingDeg: number; // 0..360 (0 = North)
  latitude: number;
  longitude: number;
  accuracyMeters: number | null;
  northPoleDistanceKm: number;
  northPoleRelativeBearingDeg: number;
  isMoving: boolean;
  isAccelerating: boolean;
  isBraking: boolean;
  isPlaidSpeed: boolean;
  tripKm: number;
  tunnelBlend: number; // 0..1
  inTunnel: boolean;
  forceTunnel: boolean;
  reindeerGearKey: 'park' | 'trot' | 'dash' | 'prance' | 'comet' | 'blitzen' | 'plaid';
  elapsedSec: number;
}

const DEFAULT_LAT = 59.3293; // Stockholm fallback until GPS fix
const DEFAULT_LON = 18.0686;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Computes shortest signed angle delta (-180..+180) safe across 359° <-> 1°.
 */
function wrapAngleDelta(newDeg: number, oldDeg: number): number {
  return ((newDeg - oldDeg + 540) % 360) - 180;
}

/**
 * Great-circle-ish / spherical distance to geographic North Pole (90° N) in km.
 */
function distanceToNorthPoleKm(latDeg: number): number {
  return Math.max(0, (90 - latDeg) * 111.32);
}

export class TelemetryEngine {
  private source: DriveSource = 'demo';
  private gpsStatus: GpsStatus = 'off';
  private watchId: number | null = null;

  private rawSpeedKmh = 0;
  private smoothedSpeedKmh = 0;
  private prevSmoothedSpeedMs = 0;
  private smoothedAccel = 0;

  private rawTurnRate = 0;
  private smoothedTurnRate = 0;

  private headingDeg = 18;
  private prevGpsHeadingDeg: number | null = null;
  private prevGpsTimeMs: number | null = null;
  private lastGpsFixMs = 0;
  private wasMovingBeforeGpsLoss = false;
  private gpsUnavailableError = false;

  private latitude = DEFAULT_LAT;
  private longitude = DEFAULT_LON;
  private accuracyMeters: number | null = null;

  private manualSpeedKmh = 58;
  private manualTurnRate = 0;

  private demoElapsed = 0;
  private totalElapsed = 0;
  private tripKm = 0;

  private forceTunnel = false;
  private tunnelBlend = 0;

  constructor(initialSource: DriveSource = 'demo') {
    this.setSource(initialSource);
  }

  getSource(): DriveSource {
    return this.source;
  }

  setSource(source: DriveSource): void {
    if (this.source === source && (source !== 'gps' || this.watchId !== null)) {
      return;
    }
    this.source = source;
    if (source === 'gps') {
      this.startGpsWatch();
    } else {
      this.stopGpsWatch();
      this.gpsUnavailableError = false;
    }
  }

  setManualSpeed(kmh: number): void {
    this.manualSpeedKmh = clamp(kmh, 0, 160);
  }

  getManualSpeed(): number {
    return this.manualSpeedKmh;
  }

  setManualTurn(turn: number): void {
    this.manualTurnRate = clamp(turn, -1, 1);
  }

  getManualTurn(): number {
    return this.manualTurnRate;
  }

  setForceTunnel(force: boolean): void {
    this.forceTunnel = force;
  }

  getForceTunnel(): boolean {
    return this.forceTunnel;
  }

  private startGpsWatch(): void {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      this.gpsStatus = 'error';
      return;
    }
    if (this.watchId !== null) return;

    this.gpsStatus = 'searching';
    this.lastGpsFixMs = performance.now();
    this.gpsUnavailableError = false;

    this.watchId = navigator.geolocation.watchPosition(
      (pos) => this.handleGpsPosition(pos),
      (err) => this.handleGpsError(err),
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 8000,
      }
    );
  }

  private stopGpsWatch(): void {
    if (this.watchId !== null && typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(this.watchId);
    }
    this.watchId = null;
    this.gpsStatus = 'off';
  }

  private handleGpsPosition(pos: GeolocationPosition): void {
    const now = performance.now();
    const { latitude, longitude, speed, heading, accuracy } = pos.coords;

    this.latitude = latitude;
    this.longitude = longitude;
    this.accuracyMeters = Number.isFinite(accuracy) ? accuracy : null;
    this.gpsStatus = 'active';
    this.gpsUnavailableError = false;

    const speedKmh = speed !== null && Number.isFinite(speed) && speed >= 0 ? speed * 3.6 : 0;
    this.rawSpeedKmh = speedKmh;
    if (speedKmh > 15) {
      this.wasMovingBeforeGpsLoss = true;
    } else if (speedKmh < 3) {
      this.wasMovingBeforeGpsLoss = false;
    }

    if (heading !== null && Number.isFinite(heading) && speedKmh > 3) {
      if (this.prevGpsHeadingDeg !== null && this.prevGpsTimeMs !== null) {
        const dtSec = Math.max(0.2, (now - this.prevGpsTimeMs) / 1000);
        const delta = wrapAngleDelta(heading, this.prevGpsHeadingDeg);
        const degPerSec = delta / dtSec;
        // ~18 deg/s maps to full turn signal (-1..1)
        this.rawTurnRate = clamp(degPerSec / 18, -1, 1);
      }
      this.prevGpsHeadingDeg = heading;
      this.prevGpsTimeMs = now;
      this.headingDeg = ((heading % 360) + 360) % 360;
    } else {
      this.rawTurnRate = 0;
    }

    this.lastGpsFixMs = now;
  }

  private handleGpsError(err: GeolocationPositionError): void {
    if (err.code === err.PERMISSION_DENIED) {
      this.gpsStatus = 'error';
      this.gpsUnavailableError = false;
    } else {
      // POSITION_UNAVAILABLE or TIMEOUT
      this.gpsStatus = this.wasMovingBeforeGpsLoss ? 'searching' : 'error';
      if (this.wasMovingBeforeGpsLoss) {
        this.gpsUnavailableError = true;
      }
    }
  }

  /**
   * 90-second cinematic demo loop:
   * 0-6s: cozy village stop (0 km/h)
   * 6-24s: gentle acceleration to 45 km/h with gentle S-curves
   * 24-46s: country cruise ~74 km/h with scenic sweeps
   * 46-70s: highway Plaid sprint up to 112 km/h (triggers Plaid Flight!)
   * 70-84s: smooth deceleration down to 0 km/h
   * 84-90s: gentle village stop
   */
  private sampleDemoDrive(elapsedSec: number): { speedKmh: number; turnRate: number } {
    const t = elapsedSec % 90;
    let speedKmh = 0;
    let turnRate = 0;

    if (t < 6) {
      speedKmh = 0;
      turnRate = 0;
    } else if (t < 24) {
      const p = smoothstep(6, 16, t);
      speedKmh = lerp(0, 46, p) + Math.sin(t * 0.9) * 2.5;
      turnRate = Math.sin((t - 6) * 0.55) * 0.52;
    } else if (t < 46) {
      const p = smoothstep(24, 34, t);
      speedKmh = lerp(46, 75, p) + Math.sin(t * 0.6) * 3;
      turnRate = Math.sin((t - 18) * 0.36) * 0.44;
    } else if (t < 70) {
      const up = smoothstep(46, 54, t);
      speedKmh = lerp(75, 112, up) + Math.sin(t * 0.45) * 3.5;
      turnRate = Math.sin((t - 40) * 0.25) * 0.28;
    } else if (t < 84) {
      const down = smoothstep(70, 82, t);
      speedKmh = lerp(112, 0, down);
      turnRate = (1 - down) * Math.sin(t * 0.5) * 0.3;
    } else {
      speedKmh = 0;
      turnRate = 0;
    }

    return { speedKmh: Math.max(0, speedKmh), turnRate };
  }

  update(dt: number): TelemetryFrame {
    const safeDt = Math.min(Math.max(dt, 0.001), 0.05);
    this.totalElapsed += safeDt;

    if (this.source === 'demo') {
      this.demoElapsed += safeDt;
      const demo = this.sampleDemoDrive(this.demoElapsed);
      this.rawSpeedKmh = demo.speedKmh;
      this.rawTurnRate = demo.turnRate;
      this.headingDeg = ((this.headingDeg + demo.turnRate * 14 * safeDt) % 360 + 360) % 360;
    } else if (this.source === 'manual') {
      this.rawSpeedKmh = this.manualSpeedKmh;
      this.rawTurnRate = this.manualTurnRate;
      this.headingDeg = ((this.headingDeg + this.manualTurnRate * 22 * safeDt) % 360 + 360) % 360;
    } else if (this.source === 'gps') {
      // Gently decay turn rate when no new GPS sample arrives for a moment
      const msSinceFix = performance.now() - this.lastGpsFixMs;
      if (msSinceFix > 2200) {
        this.rawTurnRate = lerp(this.rawTurnRate, 0, safeDt * 1.5);
      }
    }

    // Exponential smoothing for buttery animations
    const speedAlpha = 1 - Math.exp(-safeDt * 4.5);
    const turnAlpha = 1 - Math.exp(-safeDt * 5.0);
    this.smoothedSpeedKmh = lerp(this.smoothedSpeedKmh, this.rawSpeedKmh, speedAlpha);
    this.smoothedTurnRate = lerp(this.smoothedTurnRate, this.rawTurnRate, turnAlpha);

    // Derive smoothed acceleration (m/s^2)
    const speedMs = this.smoothedSpeedKmh / 3.6;
    const instantAccel = (speedMs - this.prevSmoothedSpeedMs) / safeDt;
    this.prevSmoothedSpeedMs = speedMs;
    const accelAlpha = 1 - Math.exp(-safeDt * 5.5);
    this.smoothedAccel = lerp(this.smoothedAccel, clamp(instantAccel, -8, 8), accelAlpha);

    // Integrate trip odometer
    this.tripKm += (this.smoothedSpeedKmh / 3600) * safeDt;

    // Tunnel detection: manual override OR GPS stall while previously moving (> 15 km/h)
    let autoTunnel = false;
    if (this.source === 'gps' && this.wasMovingBeforeGpsLoss) {
      const msSinceFix = performance.now() - this.lastGpsFixMs;
      if (msSinceFix > 4500 || this.gpsUnavailableError) {
        autoTunnel = true;
      }
    }
    const targetTunnel = this.forceTunnel || autoTunnel ? 1 : 0;
    const tunnelAlpha = 1 - Math.exp(-safeDt * 2.4);
    this.tunnelBlend = lerp(this.tunnelBlend, targetTunnel, tunnelAlpha);
    if (this.tunnelBlend < 0.002 && targetTunnel === 0) this.tunnelBlend = 0;

    // Real North Pole relative bearing: 0° = straight ahead toward North Pole
    const northPoleDistanceKm = distanceToNorthPoleKm(this.latitude);
    const northPoleRelativeBearingDeg = (((0 - this.headingDeg) % 360) + 360) % 360;

    const gearKey = this.computeReindeerGear(this.smoothedSpeedKmh);

    return {
      source: this.source,
      gpsStatus: this.gpsStatus,
      speedKmh: this.smoothedSpeedKmh,
      rawSpeedKmh: this.rawSpeedKmh,
      acceleration: this.smoothedAccel,
      turnRate: this.smoothedTurnRate,
      headingDeg: this.headingDeg,
      latitude: this.latitude,
      longitude: this.longitude,
      accuracyMeters: this.accuracyMeters,
      northPoleDistanceKm,
      northPoleRelativeBearingDeg,
      isMoving: this.smoothedSpeedKmh > 1.8,
      isAccelerating: this.smoothedAccel > 0.65,
      isBraking: this.smoothedAccel < -0.75,
      isPlaidSpeed: this.smoothedSpeedKmh >= 85,
      tripKm: this.tripKm,
      tunnelBlend: this.tunnelBlend,
      inTunnel: this.tunnelBlend > 0.35,
      forceTunnel: this.forceTunnel,
      reindeerGearKey: gearKey,
      elapsedSec: this.totalElapsed,
    };
  }

  private computeReindeerGear(kmh: number): TelemetryFrame['reindeerGearKey'] {
    if (kmh < 2) return 'park';
    if (kmh < 22) return 'trot';
    if (kmh < 45) return 'dash';
    if (kmh < 68) return 'prance';
    if (kmh < 88) return 'comet';
    if (kmh < 110) return 'blitzen';
    return 'plaid';
  }

  dispose(): void {
    this.stopGpsWatch();
  }
}
