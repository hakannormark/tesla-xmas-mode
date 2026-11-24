export interface LiveFlight {
  callsign: string;
  hex?: string;
  aircraft?: string;
  registration?: string;
  airline?: string;
  originLabel?: string;
  destinationLabel?: string;
  routeResolved?: boolean;
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

interface AdsbDbAirport {
  municipality?: string;
  name?: string;
  iata_code?: string;
  icao_code?: string;
  latitude?: number;
  longitude?: number;
}

interface AdsbDbFlightRoute {
  callsign?: string;
  callsign_iata?: string;
  airline?: { name?: string };
  origin?: AdsbDbAirport;
  destination?: AdsbDbAirport;
}

interface RegionalFlightSeed {
  callsign: string;
  airline: string;
  aircraft: string;
  originLabel: string;
  destinationLabel: string;
  altitudeM: number;
  groundspeedKts: number;
  baseBearing: number;
  headingDeg: number;
  distanceKm: number;
  resolved: boolean;
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

function formatAirport(a?: AdsbDbAirport): string {
  if (!a) return 'Okänd';
  const city = a.municipality || a.name;
  const code = a.iata_code || a.icao_code;
  return [city, code].filter(Boolean).join(' · ') || 'Okänd';
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

function pickRegionalSeeds(lat: number, lon: number): RegionalFlightSeed[] {
  if (lat > 54 && lon > 4 && lon < 32) {
    return [
      { callsign: 'SAS403', airline: 'SAS', aircraft: 'A320neo', originLabel: 'Stockholm · ARN', destinationLabel: 'Köpenhamn · CPH', altitudeM: 9600, groundspeedKts: 448, baseBearing: 342, headingDeg: 205, distanceKm: 16, resolved: false },
      { callsign: 'SAS142', airline: 'SAS', aircraft: 'A320neo', originLabel: 'Oslo · OSL', destinationLabel: 'Stockholm · ARN', altitudeM: 10200, groundspeedKts: 462, baseBearing: 28, headingDeg: 95, distanceKm: 21, resolved: false },
      { callsign: 'FIN801', airline: 'Finnair', aircraft: 'A350', originLabel: 'Helsingfors · HEL', destinationLabel: 'London · LHR', altitudeM: 10900, groundspeedKts: 485, baseBearing: 312, headingDeg: 245, distanceKm: 24, resolved: false },
      { callsign: 'DLH801', airline: 'Lufthansa', aircraft: 'A321', originLabel: 'Stockholm · ARN', destinationLabel: 'Frankfurt · FRA', altitudeM: 8800, groundspeedKts: 430, baseBearing: 56, headingDeg: 192, distanceKm: 19, resolved: false },
    ];
  }
  if (lon > -15 && lon < 40 && lat > 34) {
    return [
      { callsign: 'BAW781', airline: 'British Airways', aircraft: 'A320', originLabel: 'Stockholm · ARN', destinationLabel: 'London · LHR', altitudeM: 10100, groundspeedKts: 455, baseBearing: 344, headingDeg: 235, distanceKm: 18, resolved: false },
      { callsign: 'KLM1109', airline: 'KLM', aircraft: 'B737-800', originLabel: 'Amsterdam · AMS', destinationLabel: 'Stockholm · ARN', altitudeM: 9400, groundspeedKts: 442, baseBearing: 24, headingDeg: 45, distanceKm: 22, resolved: false },
      { callsign: 'AFR1062', airline: 'Air France', aircraft: 'A220', originLabel: 'Paris · CDG', destinationLabel: 'Stockholm · ARN', altitudeM: 10600, groundspeedKts: 450, baseBearing: 316, headingDeg: 35, distanceKm: 24, resolved: false },
      { callsign: 'DLH400', airline: 'Lufthansa', aircraft: 'B747-8', originLabel: 'Frankfurt · FRA', destinationLabel: 'New York · JFK', altitudeM: 11200, groundspeedKts: 492, baseBearing: 52, headingDeg: 295, distanceKm: 20, resolved: false },
    ];
  }
  if (lon < -35) {
    return [
      { callsign: 'UAL1', airline: 'United Airlines', aircraft: 'B787-9', originLabel: 'San Francisco · SFO', destinationLabel: 'Singapore · SIN', altitudeM: 10900, groundspeedKts: 495, baseBearing: 340, headingDeg: 290, distanceKm: 18, resolved: false },
      { callsign: 'DAL40', airline: 'Delta Air Lines', aircraft: 'A350', originLabel: 'Los Angeles · LAX', destinationLabel: 'Sydney · SYD', altitudeM: 10400, groundspeedKts: 488, baseBearing: 26, headingDeg: 235, distanceKm: 22, resolved: false },
      { callsign: 'AAL100', airline: 'American Airlines', aircraft: 'B777', originLabel: 'New York · JFK', destinationLabel: 'London · LHR', altitudeM: 11100, groundspeedKts: 505, baseBearing: 315, headingDeg: 55, distanceKm: 24, resolved: false },
      { callsign: 'ACA872', airline: 'Air Canada', aircraft: 'B787', originLabel: 'Toronto · YYZ', destinationLabel: 'Frankfurt · FRA', altitudeM: 10600, groundspeedKts: 480, baseBearing: 48, headingDeg: 50, distanceKm: 20, resolved: false },
    ];
  }
  return [
    { callsign: 'UAE1', airline: 'Emirates', aircraft: 'A380', originLabel: 'Dubai · DXB', destinationLabel: 'London · LHR', altitudeM: 11200, groundspeedKts: 502, baseBearing: 340, headingDeg: 305, distanceKm: 19, resolved: false },
    { callsign: 'SIA308', airline: 'Singapore Airlines', aircraft: 'A350', originLabel: 'Singapore · SIN', destinationLabel: 'London · LHR', altitudeM: 10800, groundspeedKts: 490, baseBearing: 28, headingDeg: 315, distanceKm: 23, resolved: false },
    { callsign: 'ANA211', airline: 'ANA', aircraft: 'B777', originLabel: 'Tokyo · HND', destinationLabel: 'London · LHR', altitudeM: 10900, groundspeedKts: 486, baseBearing: 314, headingDeg: 335, distanceKm: 22, resolved: false },
    { callsign: 'QFA1', airline: 'Qantas', aircraft: 'A380', originLabel: 'Sydney · SYD', destinationLabel: 'London · LHR', altitudeM: 11500, groundspeedKts: 498, baseBearing: 52, headingDeg: 310, distanceKm: 20, resolved: false },
  ];
}

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
  private lastLat = 59.3992;
  private lastLon = 18.0894;

  private lastKpFetchMs = 0;
  private lastIssFetchMs = 0;
  private lastSpaceXFetchMs = 0;
  private lastFlightsFetchMs = 0;
  private lastRouteSeedMs = 0;
  private regionKey = '';
  private regionalSeeds: RegionalFlightSeed[] = pickRegionalSeeds(59.3992, 18.0894);

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

  private refreshRegionalRoutes(now: number): void {
    const newRegionKey = `${Math.round(this.lastLat / 15)}:${Math.round(this.lastLon / 25)}`;
    if (newRegionKey !== this.regionKey) {
      this.regionKey = newRegionKey;
      this.regionalSeeds = pickRegionalSeeds(this.lastLat, this.lastLon);
      this.lastRouteSeedMs = 0;
    }
    if (this.lastRouteSeedMs !== 0 && now - this.lastRouteSeedMs < 10 * 60 * 1000) return;
    this.lastRouteSeedMs = now;

    this.regionalSeeds.forEach((seed) => {
      if (seed.resolved) return;
      void this.fetchJson<{ response?: { flightroute?: AdsbDbFlightRoute } }>(
        `https://api.adsbdb.com/v0/callsign/${encodeURIComponent(seed.callsign)}`,
        6000
      ).then((data) => {
        const route = data?.response?.flightroute;
        if (!route) return;
        if (route.airline?.name) seed.airline = route.airline.name;
        if (route.origin) seed.originLabel = formatAirport(route.origin);
        if (route.destination) seed.destinationLabel = formatAirport(route.destination);
        if (
          Number.isFinite(route.origin?.latitude) &&
          Number.isFinite(route.origin?.longitude) &&
          Number.isFinite(route.destination?.latitude) &&
          Number.isFinite(route.destination?.longitude)
        ) {
          seed.headingDeg = Math.round(
            bearingDegBetween(
              route.origin!.latitude!,
              route.origin!.longitude!,
              route.destination!.latitude!,
              route.destination!.longitude!
            )
          );
        }
        seed.resolved = true;
      });
    });
  }

  private refreshFlights(now: number): void {
    if (now - this.lastFlightsFetchMs < 20000) return;
    this.lastFlightsFetchMs = now;
    const request = ++this.flightRequest;
    const url = `https://api.adsb.lol/v2/lat/${this.lastLat.toFixed(3)}/lon/${this.lastLon.toFixed(3)}/dist/60`;
    void this.fetchJson<{ ac?: AircraftReport[] }>(url, 5000).then(data => {
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
    this.refreshRegionalRoutes(now);
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
      nearby.push({
        callsign: p.flight?.trim() || p.r || p.hex,
        hex: p.hex,
        aircraft: p.t,
        registration: p.r,
        altitudeM: Math.round(p.alt_baro * 0.3048),
        groundspeedKts: p.gs ?? 0,
        headingDeg: p.track ?? 0,
        bearingDeg: bearingDegBetween(lat, lon, p.lat!, p.lon!),
        distanceKm,
        isLive: true,
      });
    }

    const t = Date.now() / 1000;
    const regionalFlights: LiveFlight[] = this.regionalSeeds.map((s, idx) => {
      const drift = Math.sin(t * 0.045 + idx * 1.6) * 26;
      return {
        callsign: s.callsign,
        aircraft: s.aircraft,
        airline: s.airline,
        originLabel: s.originLabel,
        destinationLabel: s.destinationLabel,
        routeResolved: s.resolved,
        altitudeM: s.altitudeM,
        groundspeedKts: s.groundspeedKts,
        headingDeg: s.headingDeg,
        bearingDeg: (s.baseBearing + drift + 360) % 360,
        distanceKm: s.distanceKm,
        isLive: s.resolved,
      };
    });

    const flights = this.gpsFlights && nearby.length > 0
      ? nearby.sort((a, b) => a.distanceKm - b.distanceKm)
      : regionalFlights;

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
      flightsLive: (this.flightsLive && nearby.length > 0) || this.regionalSeeds.some(s => s.resolved),
    };
  }
}
