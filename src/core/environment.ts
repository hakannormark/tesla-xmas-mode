export type SkyMood = 'midnight' | 'twilight' | 'auto';
export type GraphicsQuality = 'ultra' | 'eco';

export interface EnvironmentState {
  skyMood: SkyMood;
  effectiveSky: 'midnight' | 'twilight';
  quality: GraphicsQuality;
  temperatureC: number;
  isSnowingReal: boolean;
  frostEnabled: boolean;
  frostAmount: number; // 0..1
  skyTopColor: string;
  skyMidColor: string;
  skyHorizonColor: string;
  horizonWarmGlow: number; // 0..1
}

export class EnvironmentManager {
  private skyMood: SkyMood = 'midnight';
  private quality: GraphicsQuality = 'ultra';
  private frostEnabled = true;
  private temperatureC = -6;
  private isSnowingReal = true;
  private lastWeatherFetchMs = 0;
  private lastLat = 59.33;
  private lastLon = 18.07;

  constructor() {
    try {
      const savedMood = localStorage.getItem('tesla-xmas-sky');
      if (savedMood === 'midnight' || savedMood === 'twilight' || savedMood === 'auto') {
        this.skyMood = savedMood;
      }
      const savedQuality = localStorage.getItem('tesla-xmas-quality');
      if (savedQuality === 'ultra' || savedQuality === 'eco') {
        this.quality = savedQuality;
      }
      const savedFrost = localStorage.getItem('tesla-xmas-frost');
      if (savedFrost === '0') this.frostEnabled = false;
    } catch {
      // Ignore storage access errors
    }
  }

  getQuality(): GraphicsQuality {
    return this.quality;
  }

  setQuality(q: GraphicsQuality): void {
    this.quality = q;
    try {
      localStorage.setItem('tesla-xmas-quality', q);
    } catch {
      // Ignore
    }
  }

  getSkyMood(): SkyMood {
    return this.skyMood;
  }

  setSkyMood(mood: SkyMood): void {
    this.skyMood = mood;
    try {
      localStorage.setItem('tesla-xmas-sky', mood);
    } catch {
      // Ignore
    }
  }

  isFrostEnabled(): boolean {
    return this.frostEnabled;
  }

  setFrostEnabled(enabled: boolean): void {
    this.frostEnabled = enabled;
    try {
      localStorage.setItem('tesla-xmas-frost', enabled ? '1' : '0');
    } catch {
      // Ignore
    }
  }

  maybeRefreshWeather(lat: number, lon: number): void {
    const now = Date.now();
    const movedFar = Math.abs(lat - this.lastLat) > 0.25 || Math.abs(lon - this.lastLon) > 0.25;
    // Cache 15 minutes unless location shifted significantly
    if (this.lastWeatherFetchMs !== 0 && now - this.lastWeatherFetchMs < 15 * 60 * 1000 && !movedFar) {
      return;
    }
    this.lastWeatherFetchMs = now;
    this.lastLat = lat;
    this.lastLon = lon;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(3)}&longitude=${lon.toFixed(
      3
    )}&current=temperature_2m,snowfall,weather_code`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || !data.current) return;
        const temp = data.current.temperature_2m;
        const snowfall = data.current.snowfall;
        const code = data.current.weather_code;
        if (typeof temp === 'number' && Number.isFinite(temp)) {
          this.temperatureC = Math.round(temp);
        }
        const snowCodes = new Set([71, 73, 75, 77, 85, 86]);
        this.isSnowingReal = (typeof snowfall === 'number' && snowfall > 0) || snowCodes.has(code);
      })
      .catch(() => {
        // Offline / blocked: keep cozy fallback temperature (-6°C) silently
      });
  }

  getState(): EnvironmentState {
    let effectiveSky: 'midnight' | 'twilight' = 'midnight';
    if (this.skyMood === 'twilight') {
      effectiveSky = 'twilight';
    } else if (this.skyMood === 'auto') {
      const hour = new Date().getHours();
      if (hour >= 14 && hour <= 18) {
        effectiveSky = 'twilight';
      } else {
        effectiveSky = 'midnight';
      }
    }

    const tempFrost = this.temperatureC <= 0 ? Math.min(1, 0.45 + Math.abs(this.temperatureC) * 0.04) : 0.28;
    const frostAmount = this.frostEnabled ? tempFrost : 0;

    if (effectiveSky === 'twilight') {
      return {
        skyMood: this.skyMood,
        effectiveSky,
        quality: this.quality,
        temperatureC: this.temperatureC,
        isSnowingReal: this.isSnowingReal,
        frostEnabled: this.frostEnabled,
        frostAmount,
        skyTopColor: '#0b1942',
        skyMidColor: '#1f3668',
        skyHorizonColor: '#5c3f58',
        horizonWarmGlow: 0.9,
      };
    }

    return {
      skyMood: this.skyMood,
      effectiveSky,
      quality: this.quality,
      temperatureC: this.temperatureC,
      isSnowingReal: this.isSnowingReal,
      frostEnabled: this.frostEnabled,
      frostAmount,
      skyTopColor: '#040a1d',
      skyMidColor: '#0b1a42',
      skyHorizonColor: '#192d5c',
      horizonWarmGlow: 0.65,
    };
  }
}
