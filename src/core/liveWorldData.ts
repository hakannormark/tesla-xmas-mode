export interface LiveFlight {
  callsign: string;
  hex?: string;
  aircraft?: string;
  registration?: string;
  altitudeM: number;
  headingDeg: number;
  groundspeedKts: number;
  bearingDeg: number;
  distanceKm: number;
  isLive: boolean;
}

export interface LiveWorldState {
  kpIndex: number;
  auroraLiveBoost: number;
  isAuroraAlert: boolean;
  kpLive: boolean;

  issLat: number;
  issLon: number;
  issDistanceKm: number;
  issBearingDeg: number;
  issVelocityKmh: number;
  issNearby: boolean;
  issLive: boolean;

  nextSpaceXName: string;
  nextSpaceXNetIso: string | null;
  nextSpaceXCountdown: string;
  nextSpaceXLaunchToday: boolean;
  spaceXLive: boolean;

  flights: LiveFlight[];
  flightsLive: boolean;
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function bearingDegBetween(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function formatCountdown(netIso: string | null): { label: string; isToday: boolean } {
  if (!netIso) return { label: 'T-12h 40m', isToday: false };
  const targetMs = Date.parse(netIso);
  if (!Number.isFinite(targetMs)) return { label: 'T-12h 40m', isToday: false };
  const diffSec = Math.round((targetMs - Date.now()) / 1000);
  const absH = Math.abs(diffSec) / 3600;
  const isToday = absH <= 18;
  if (diffSec <= 0) {
    const minsAgo = Math.round(Math.abs(diffSec) / 60);
    return {
      label: minsAgo < 90 ? `T+${minsAgo}m LIVE!` : 'LIFTOFF!',
      isToday,
    };
  }
  const days = Math.floor(diffSec / 86400);
  const hours = Math.floor((diffSec % 86400) / 3600);
  const mins = Math.floor((diffSec % 3600) / 60);
  if (days > 0) return { label: `T-${days}d ${hours}h`, isToday: false };
  return { label: `T-${hours}h ${String(mins).padStart(2, '0')}m`, isToday };
}

const FALLBACK_FLIGHTS: LiveFlight[] = [
  {
    callsign: 'SK142',
    altitudeM: 9400,
    headingDeg: 12,
    groundspeedKts: 445,
    bearingDeg: 325,
    distanceKm: 18,
    isLive: false,
  },
  {
    callsign: 'DY4012',
    altitudeM: 8100,
    headingDeg: 295,
    groundspeedKts: 410,
    bearingDeg: 42,
    distanceKm: 26,
    isLive: false,
  },
];

interface AircraftReport {
  hex: string;
  flight?: string;
  lat?: number;
  lon?: number;
  alt_baro?: number | string;
  gs?: number;
  track?: number;
  t?: string;
  r?: string;
  seen_pos?: number;
}

export class LiveWorldDataManager {
  private lastLat = 59.3322;
  private lastLon = 18.0815;

  private lastKpFetchMs = 0;
  private lastIssFetchMs = 0;
  private lastSpaceXFetchMs = 0;
  private lastFlightsFetchMs = 0;

  private kpIndex = 3.3;
  private kpLive = false;

  private issLat = 51.5;
  private issLon = 10.2;
  private issVelocityKmh = 27600;
  private issLive = false;

  private nextSpaceXName = 'Falcon 9 · Starlink Holiday';
  private nextSpaceXNetIso: string | null = null;
  private spaceXLive = false;

  private aircraft: AircraftReport[] = [];
  private gpsFlights = false;
  private flightRequest = 0;
  private flightsLive = false;

  private async fetchJson<T>(url: string, timeoutMs = 8000): Promise<T | null> {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) return null;
      return (await res.json()) as T;
    } catch {
      return null;
    } finally {
      window.clearTimeout(timer);
    }
  }

  private refreshKp(now: number): void {
    if (this.lastKpFetchMs !== 0 && now - this.lastKpFetchMs < 15 * 60 * 1000) return;
    this.lastKpFetchMs = now;

    void this.fetchJson<unknown>(
      'https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json',
      7000
    ).then((data) => {
      if (!Array.isArray(data) || data.length === 0) return;
      const last = data[data.length - 1];
      let parsed = NaN;
      if (last && typeof last === 'object' && !Array.isArray(last)) {
        const kpVal = (last as { Kp?: number | string }).Kp;
        parsed = Number(kpVal);
      } else if (Array.isArray(last) && last.length >= 2) {
        parsed = Number(last[1]);
      }
      if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 9.5) {
        this.kpIndex = Math.round(parsed * 10) / 10;
        this.kpLive = true;
      }
    });
  }

  private refreshIss(now: number): void {
    if (this.lastIssFetchMs !== 0 && now - this.lastIssFetchMs < 45 * 1000) return;
    this.lastIssFetchMs = now;

    void this.fetchJson<{ latitude?: number; longitude?: number; velocity?: number }>(
      'https://api.wheretheiss.at/v1/satellites/25544',
      6500
    ).then((data) => {
      if (!data) return;
      if (
        typeof data.latitude === 'number' &&
        typeof data.longitude === 'number' &&
        Number.isFinite(data.latitude) &&
        Number.isFinite(data.longitude)
      ) {
        this.issLat = data.latitude;
        this.issLon = data.longitude;
        if (typeof data.velocity === 'number' && Number.isFinite(data.velocity)) {
          this.issVelocityKmh = Math.round(data.velocity);
        }
        this.issLive = true;
      }
    });
  }

  private refreshSpaceX(now: number): void {
    if (this.lastSpaceXFetchMs !== 0 && now - this.lastSpaceXFetchMs < 30 * 60 * 1000) return;
    this.lastSpaceXFetchMs = now;

    void this.fetchJson<{ results?: Array<{ name?: string; net?: string }> }>(
      'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?search=SpaceX&limit=1',
      8000
    ).then((data) => {
      const first = data?.results?.[0];
      if (!first) return;
      if (typeof first.name === 'string' && first.name.trim()) {
        this.nextSpaceXName = first.name.trim().slice(0, 38);
      }
      if (typeof first.net === 'string') {
        this.nextSpaceXNetIso = first.net;
      }
      this.spaceXLive = true;
    });
  }

  private refreshFlights(now: number): void {
    if (now - this.lastFlightsFetchMs < 20000) return;
    this.lastFlightsFetchMs = now;
    const request = ++this.flightRequest;
    const url = `https://api.adsb.lol/v2/lat/${this.lastLat.toFixed(3)}/lon/${this.lastLon.toFixed(3)}/dist/60`;
    void this.fetchJson<{ ac?: AircraftReport[] }>(url).then(data => {
      if (request !== this.flightRequest) return;
      this.flightsLive = Array.isArray(data?.ac);
      this.aircraft = data?.ac ?? [];
    });
  }

  update(lat: number, lon: number, gps: boolean, hasFix: boolean): void {
    if (this.gpsFlights !== gps) {
      this.flightRequest++;
      this.lastFlightsFetchMs = 0;
      this.aircraft = [];
      this.flightsLive = false;
    }
    this.gpsFlights = gps;
    this.lastLat = lat;
    this.lastLon = lon;
    const now = Date.now();
    this.refreshKp(now);
    this.refreshIss(now);
    this.refreshSpaceX(now);
    if (gps && hasFix) this.refreshFlights(now);
  }

  getState(): LiveWorldState {
    const lat = this.lastLat;
    const lon = this.lastLon;

    const issDistanceKm = Math.round(haversineKm(lat, lon, this.issLat, this.issLon));
    const issBearingDeg = Math.round(bearingDegBetween(lat, lon, this.issLat, this.issLon));
    const issNearby = issDistanceKm <= 2600 || !this.issLive;

    const cd = formatCountdown(this.nextSpaceXNetIso);

    const nearby: LiveFlight[] = [];
    for (const p of this.aircraft) {
      if (!Number.isFinite(p.lat) || !Number.isFinite(p.lon) || typeof p.alt_baro !== 'number' ||
          !p.hex || (p.seen_pos ?? 0) > 60) continue;
      const distanceKm = haversineKm(lat, lon, p.lat!, p.lon!);
      if (distanceKm > 111.2) continue;
      nearby.push({ callsign: p.flight?.trim() || p.r || p.hex, hex: p.hex, aircraft: p.t,
        registration: p.r, altitudeM: Math.round(p.alt_baro * 0.3048), groundspeedKts: p.gs ?? 0,
        headingDeg: p.track ?? 0, bearingDeg: bearingDegBetween(lat, lon, p.lat!, p.lon!), distanceKm,
        isLive: true });
    }
    const flights = this.gpsFlights ? nearby.sort((a,b) => a.distanceKm - b.distanceKm) : FALLBACK_FLIGHTS;

    const isAuroraAlert = this.kpIndex >= 4.0;
    const auroraLiveBoost = Math.max(0.75, Math.min(2.15, 0.72 + this.kpIndex * 0.2));

    return {
      kpIndex: this.kpIndex,
      auroraLiveBoost,
      isAuroraAlert,
      kpLive: this.kpLive,
      issLat: this.issLat,
      issLon: this.issLon,
      issDistanceKm,
      issBearingDeg,
      issVelocityKmh: this.issVelocityKmh,
      issNearby,
      issLive: this.issLive,
      nextSpaceXName: this.nextSpaceXName,
      nextSpaceXNetIso: this.nextSpaceXNetIso,
      nextSpaceXCountdown: cd.label,
      nextSpaceXLaunchToday: cd.isToday,
      spaceXLive: this.spaceXLive,
      flights,
      flightsLive: this.flightsLive && nearby.length > 0,
    };
  }
}
