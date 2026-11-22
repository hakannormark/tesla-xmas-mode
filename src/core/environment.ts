export type SkyMood = 'midnight' | 'twilight' | 'auto';
export type GraphicsQuality = 'ultra' | 'eco';
export type HolidayThemeId = 'classic' | 'nordic' | 'cyber2099';
export type CalendarPreviewMode =
  | 'auto'
  | 'advent1'
  | 'advent2'
  | 'advent3'
  | 'advent4'
  | 'lucia'
  | 'xmas_eve';

export interface HolidayCalendarInfo {
  adventCandles: 0 | 1 | 2 | 3 | 4;
  isLucia: boolean;
  isXmasEve: boolean;
  daysToXmas: number;
  badgeSv: string | null;
  badgeEn: string | null;
}

export interface EnvironmentState {
  skyMood: SkyMood;
  effectiveSky: 'midnight' | 'twilight';
  quality: GraphicsQuality;
  temperatureC: number;
  windSpeedKmh: number;
  windDirDeg: number;
  precipMm: number;
  moonPhase: number; // 0 = new, 0.5 = full, 1 = new
  isSnowingReal: boolean;
  frostEnabled: boolean;
  frostAmount: number; // 0..1
  theme: HolidayThemeId;
  calendarMode: CalendarPreviewMode;
  holidayCalendar: HolidayCalendarInfo;
  cinematicCam: boolean;
  elonTimelineEnabled: boolean;
  skyTopColor: string;
  skyMidColor: string;
  skyHorizonColor: string;
  horizonWarmGlow: number; // 0..1
}

function computeMoonPhase(date: Date): number {
  // Known new moon epoch: 2000-01-06T18:14:00Z, synodic period 29.53058867 days
  const synodicMs = 29.53058867 * 86400 * 1000;
  const epochMs = Date.UTC(2000, 0, 6, 18, 14, 0);
  const diff = (((date.getTime() - epochMs) % synodicMs) + synodicMs) % synodicMs;
  return diff / synodicMs;
}

function computeHolidayCalendar(now: Date, mode: CalendarPreviewMode): HolidayCalendarInfo {
  const year = now.getFullYear();
  const xmasEve = new Date(year, 11, 24, 15, 0, 0);
  if (now.getTime() > new Date(year, 11, 26).getTime()) {
    xmasEve.setFullYear(year + 1);
  }
  const daysToXmas = Math.max(0, Math.ceil((xmasEve.getTime() - now.getTime()) / 86400000));

  if (mode === 'lucia') {
    return {
      adventCandles: 2,
      isLucia: true,
      isXmasEve: false,
      daysToXmas,
      badgeSv: '🕯 Luciatåg längs snövallen!',
      badgeEn: '🕯 St. Lucia Procession!',
    };
  }
  if (mode === 'xmas_eve') {
    const target15 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0, 0);
    const hrs = Math.max(0, Math.floor((target15.getTime() - now.getTime()) / 3600000));
    const mins = Math.max(0, Math.floor(((target15.getTime() - now.getTime()) % 3600000) / 60000));
    return {
      adventCandles: 4,
      isLucia: false,
      isXmasEve: true,
      daysToXmas: 0,
      badgeSv:
        now.getHours() < 15
          ? `🎆 Julafton! Kalle Anka om ${hrs}h ${mins}m`
          : '🎆 Julafton · Fyrverkerier över bergen!',
      badgeEn: '🎆 Christmas Eve Fireworks!',
    };
  }
  if (mode.startsWith('advent')) {
    const n = Number(mode.replace('advent', '')) as 1 | 2 | 3 | 4;
    return {
      adventCandles: n,
      isLucia: false,
      isXmasEve: false,
      daysToXmas,
      badgeSv: `🕯 ${n}:a–4:e Advent (${n}/4 ljus tända)`,
      badgeEn: `🕯 Advent Candle ${n}/4 Lit`,
    };
  }

  // Automatic real-date calendar (Sweden Advent Sundays, Dec 13 Lucia, Dec 24 Julafton)
  const dec24 = new Date(year, 11, 24);
  const dow24 = dec24.getDay(); // 0=Sun..6=Sat
  const advent4Date = 24 - (dow24 === 0 ? 0 : dow24);
  const advent4 = new Date(year, 11, advent4Date, 0, 0, 0);
  const advent1 = new Date(advent4.getTime() - 21 * 86400000);

  let adventCandles: 0 | 1 | 2 | 3 | 4 = 0;
  if (now >= advent1) {
    const weeks = Math.floor((now.getTime() - advent1.getTime()) / (7 * 86400000)) + 1;
    adventCandles = Math.min(4, Math.max(1, weeks)) as 1 | 2 | 3 | 4;
  }
  const isLucia = now.getMonth() === 11 && now.getDate() === 13;
  const isXmasEve = now.getMonth() === 11 && (now.getDate() === 24 || now.getDate() === 25);

  let badgeSv: string | null = null;
  let badgeEn: string | null = null;
  if (isXmasEve) {
    badgeSv = '🎆 God Jul & Gott Nytt!';
    badgeEn = '🎆 Merry Christmas Eve!';
  } else if (isLucia) {
    badgeSv = '🕯 Glad Lucia (13 dec)';
    badgeEn = '🕯 Happy St. Lucia Day!';
  } else if (adventCandles > 0) {
    badgeSv = `🕯 ${adventCandles} adventljus · ${daysToXmas} dgr till jul`;
    badgeEn = `🕯 Advent ${adventCandles}/4 · ${daysToXmas}d to Xmas`;
  }

  return { adventCandles, isLucia, isXmasEve, daysToXmas, badgeSv, badgeEn };
}

export class EnvironmentManager {
  private skyMood: SkyMood = 'midnight';
  private quality: GraphicsQuality = 'ultra';
  private frostEnabled = true;
  private theme: HolidayThemeId = 'classic';
  private calendarMode: CalendarPreviewMode = 'auto';
  private cinematicCam = false;
  private elonTimelineEnabled = true;
  private temperatureC = -6;
  private windSpeedKmh = 14;
  private windDirDeg = 250;
  private precipMm = 0.4;
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

      const savedTheme = localStorage.getItem('tesla-xmas-theme');
      if (savedTheme === 'classic' || savedTheme === 'nordic' || savedTheme === 'cyber2099') {
        this.theme = savedTheme;
      }
      const savedCal = localStorage.getItem('tesla-xmas-cal');
      if (
        savedCal === 'auto' ||
        savedCal === 'advent1' ||
        savedCal === 'advent2' ||
        savedCal === 'advent3' ||
        savedCal === 'advent4' ||
        savedCal === 'lucia' ||
        savedCal === 'xmas_eve'
      ) {
        this.calendarMode = savedCal;
      }
      const savedCine = localStorage.getItem('tesla-xmas-cinecam');
      if (savedCine === '1') this.cinematicCam = true;
      const savedElonTl = localStorage.getItem('tesla-xmas-elon-timeline');
      if (savedElonTl === '0') this.elonTimelineEnabled = false;
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

  isElonTimelineEnabled(): boolean {
    return this.elonTimelineEnabled;
  }

  setElonTimelineEnabled(enabled: boolean): void {
    this.elonTimelineEnabled = enabled;
    try {
      localStorage.setItem('tesla-xmas-elon-timeline', enabled ? '1' : '0');
    } catch {
      // Ignore
    }
  }

  getTheme(): HolidayThemeId {
    return this.theme;
  }

  setTheme(theme: HolidayThemeId): void {
    this.theme = theme;
    try {
      localStorage.setItem('tesla-xmas-theme', theme);
    } catch {
      // Ignore
    }
  }

  getCalendarMode(): CalendarPreviewMode {
    return this.calendarMode;
  }

  setCalendarMode(mode: CalendarPreviewMode): void {
    this.calendarMode = mode;
    try {
      localStorage.setItem('tesla-xmas-cal', mode);
    } catch {
      // Ignore
    }
  }

  isCinematicCam(): boolean {
    return this.cinematicCam;
  }

  setCinematicCam(enabled: boolean): void {
    this.cinematicCam = enabled;
    try {
      localStorage.setItem('tesla-xmas-cinecam', enabled ? '1' : '0');
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
    )}&current=temperature_2m,snowfall,precipitation,weather_code,wind_speed_10m,wind_direction_10m`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || !data.current) return;
        const temp = data.current.temperature_2m;
        const snowfall = data.current.snowfall;
        const precip = data.current.precipitation;
        const code = data.current.weather_code;
        const wspd = data.current.wind_speed_10m;
        const wdir = data.current.wind_direction_10m;
        if (typeof temp === 'number' && Number.isFinite(temp)) {
          this.temperatureC = Math.round(temp);
        }
        if (typeof wspd === 'number' && Number.isFinite(wspd)) {
          this.windSpeedKmh = Math.max(0, Math.round(wspd));
        }
        if (typeof wdir === 'number' && Number.isFinite(wdir)) {
          this.windDirDeg = ((wdir % 360) + 360) % 360;
        }
        if (typeof precip === 'number' && Number.isFinite(precip)) {
          this.precipMm = Math.max(0, precip);
        }
        const snowCodes = new Set([71, 73, 75, 77, 85, 86]);
        this.isSnowingReal =
          (typeof snowfall === 'number' && snowfall > 0) ||
          (typeof precip === 'number' && precip > 0.2) ||
          snowCodes.has(code);
      })
      .catch(() => {
        // Offline / blocked: keep cozy fallback temperature (-6°C) silently
      });
  }

  getState(): EnvironmentState {
    const now = new Date();
    let effectiveSky: 'midnight' | 'twilight' = 'midnight';
    if (this.skyMood === 'twilight') {
      effectiveSky = 'twilight';
    } else if (this.skyMood === 'auto') {
      const hour = now.getHours();
      if (hour >= 14 && hour <= 18) {
        effectiveSky = 'twilight';
      } else {
        effectiveSky = 'midnight';
      }
    }

    const tempFrost =
      this.temperatureC <= 0 ? Math.min(1, 0.45 + Math.abs(this.temperatureC) * 0.04) : 0.28;
    const stormFrost = this.isSnowingReal ? 0.14 : 0;
    const frostAmount = this.frostEnabled ? Math.min(1, tempFrost + stormFrost) : 0;
    const moonPhase = computeMoonPhase(now);
    const holidayCalendar = computeHolidayCalendar(now, this.calendarMode);

    let skyTopColor = '#040a1d';
    let skyMidColor = '#0b1a42';
    let skyHorizonColor = '#192d5c';
    let horizonWarmGlow = 0.65;

    if (this.theme === 'cyber2099') {
      skyTopColor = '#060318';
      skyMidColor = '#16093b';
      skyHorizonColor = '#311259';
      horizonWarmGlow = 0.85;
    } else if (this.theme === 'nordic') {
      skyTopColor = '#04122e';
      skyMidColor = '#0e2959';
      skyHorizonColor = effectiveSky === 'twilight' ? '#4d4166' : '#234472';
      horizonWarmGlow = 0.78;
    } else if (effectiveSky === 'twilight') {
      skyTopColor = '#0b1942';
      skyMidColor = '#1f3668';
      skyHorizonColor = '#5c3f58';
      horizonWarmGlow = 0.9;
    }

    return {
      skyMood: this.skyMood,
      effectiveSky,
      quality: this.quality,
      temperatureC: this.temperatureC,
      windSpeedKmh: this.windSpeedKmh,
      windDirDeg: this.windDirDeg,
      precipMm: this.precipMm,
      moonPhase,
      isSnowingReal: this.isSnowingReal,
      frostEnabled: this.frostEnabled,
      frostAmount,
      theme: this.theme,
      calendarMode: this.calendarMode,
      holidayCalendar,
      cinematicCam: this.cinematicCam,
      elonTimelineEnabled: this.elonTimelineEnabled,
      skyTopColor,
      skyMidColor,
      skyHorizonColor,
      horizonWarmGlow,
    };
  }
}
