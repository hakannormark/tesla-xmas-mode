import type { Locale } from './i18n';

export type UnitSystem = 'metric' | 'imperial';
export type UnitPreference = 'auto' | UnitSystem;
export type TempUnit = 'C' | 'F';
export type TempPreference = 'auto' | TempUnit;

const DIST_STORAGE_KEY = 'tesla-xmas-units-dist';
const TEMP_STORAGE_KEY = 'tesla-xmas-units-temp';

const IMPERIAL_DISTANCE_COUNTRIES = new Set([
  'us',
  'gb',
  'lr',
  'mm',
  'pr',
  'vi',
  'gu',
  'as',
  'mp',
]);

const FAHRENHEIT_COUNTRIES = new Set([
  'us',
  'bs',
  'ky',
  'lr',
  'pw',
  'fm',
  'mh',
]);

function inferCountryFromCoords(lat: number, lon: number): string | null {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  // Contiguous United States
  if (lat >= 24.4 && lat <= 49.4 && lon >= -125.0 && lon <= -66.9) return 'us';
  // Alaska
  if (lat >= 51.2 && lat <= 71.5 && lon >= -179.5 && lon <= -129.9) return 'us';
  // Hawaii
  if (lat >= 18.8 && lat <= 22.3 && lon >= -160.5 && lon <= -154.7) return 'us';
  // United Kingdom & Crown Dependencies
  if (lat >= 49.8 && lat <= 60.9 && lon >= -8.7 && lon <= 1.8) return 'gb';
  return null;
}

class UnitsStore {
  private distPref: UnitPreference = 'auto';
  private tempPref: TempPreference = 'auto';
  private detectedCountry: string | null = 'se';
  private listeners = new Set<() => void>();

  constructor() {
    try {
      const savedDist = localStorage.getItem(DIST_STORAGE_KEY);
      if (savedDist === 'auto' || savedDist === 'metric' || savedDist === 'imperial') {
        this.distPref = savedDist;
      }
      const savedTemp = localStorage.getItem(TEMP_STORAGE_KEY);
      if (savedTemp === 'auto' || savedTemp === 'C' || savedTemp === 'F') {
        this.tempPref = savedTemp;
      }
    } catch {
      // Ignore storage access errors in restricted browsers
    }
  }

  getDistancePref(): UnitPreference {
    return this.distPref;
  }

  setDistancePref(pref: UnitPreference): void {
    const prevSys = this.getDistanceSystem();
    const changedPref = this.distPref !== pref;
    this.distPref = pref;
    try {
      localStorage.setItem(DIST_STORAGE_KEY, pref);
    } catch {
      // Ignore
    }
    if (changedPref || prevSys !== this.getDistanceSystem()) {
      this.emit();
    }
  }

  getTempPref(): TempPreference {
    return this.tempPref;
  }

  setTempPref(pref: TempPreference): void {
    const prevUnit = this.getTempUnit();
    const changedPref = this.tempPref !== pref;
    this.tempPref = pref;
    try {
      localStorage.setItem(TEMP_STORAGE_KEY, pref);
    } catch {
      // Ignore
    }
    if (changedPref || prevUnit !== this.getTempUnit()) {
      this.emit();
    }
  }

  getDetectedCountry(): string | null {
    return this.detectedCountry;
  }

  setGeoLocation(lat: number, lon: number, countryCode?: string | null): void {
    const prevDist = this.getDistanceSystem();
    const prevTemp = this.getTempUnit();
    const prevCountry = this.detectedCountry;

    const normalized = countryCode?.trim().toLowerCase() || null;
    if (normalized) {
      this.detectedCountry = normalized;
    } else {
      const inferred = inferCountryFromCoords(lat, lon);
      this.detectedCountry = inferred ?? (this.detectedCountry === 'us' || this.detectedCountry === 'gb' ? null : this.detectedCountry);
    }

    if (
      prevCountry !== this.detectedCountry ||
      prevDist !== this.getDistanceSystem() ||
      prevTemp !== this.getTempUnit()
    ) {
      this.emit();
    }
  }

  getDistanceSystem(): UnitSystem {
    if (this.distPref !== 'auto') return this.distPref;
    return this.detectedCountry && IMPERIAL_DISTANCE_COUNTRIES.has(this.detectedCountry)
      ? 'imperial'
      : 'metric';
  }

  getTempUnit(): TempUnit {
    if (this.tempPref !== 'auto') return this.tempPref;
    return this.detectedCountry && FAHRENHEIT_COUNTRIES.has(this.detectedCountry)
      ? 'F'
      : 'C';
  }

  onChange(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private emit(): void {
    for (const cb of this.listeners) cb();
  }

  speedValue(kmh: number): number {
    return this.getDistanceSystem() === 'imperial' ? Math.round(kmh * 0.621371) : Math.round(kmh);
  }

  speedUnit(): 'km/h' | 'mph' {
    return this.getDistanceSystem() === 'imperial' ? 'mph' : 'km/h';
  }

  formatSpeed(kmh: number): string {
    return `${this.speedValue(kmh)} ${this.speedUnit()}`;
  }

  speedLimitValue(kmh: number): number {
    if (this.getDistanceSystem() === 'imperial') {
      return Math.max(5, Math.round((kmh * 0.621371) / 5) * 5);
    }
    return Math.round(kmh);
  }

  tempValue(tempC: number): number {
    return this.getTempUnit() === 'F' ? Math.round((tempC * 9) / 5 + 32) : Math.round(tempC);
  }

  formatTemp(tempC: number): string {
    return `${this.tempValue(tempC)}°${this.getTempUnit()}`;
  }

  formatShortDistance(meters: number): string {
    if (this.getDistanceSystem() === 'imperial') {
      const feet = meters * 3.28084;
      if (feet < 1000) {
        return `${Math.max(10, Math.round(feet / 10) * 10)} ft`;
      }
      const miles = meters / 1609.344;
      return `${miles >= 10 ? Math.round(miles) : miles.toFixed(1)} mi`;
    }
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${Math.round(meters)} m`;
  }

  formatLongDistance(km: number, locale: Locale): string {
    const locStr = locale === 'sv' ? 'sv-SE' : 'en-US';
    if (this.getDistanceSystem() === 'imperial') {
      const miles = Math.round(km * 0.621371);
      return `${miles.toLocaleString(locStr)} mi`;
    }
    return `${Math.round(km).toLocaleString(locStr)} km`;
  }

  formatElevation(meters: number): string {
    if (this.getDistanceSystem() === 'imperial') {
      return `${Math.round(meters * 3.28084)} ft`;
    }
    return `${Math.round(meters)} m`;
  }

  formatWindSpeed(kmh: number): string {
    return this.formatSpeed(kmh);
  }
}

export const units = new UnitsStore();
