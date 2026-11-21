import { DriveSource } from './telemetry';

export type OsmBiome = 'village' | 'forest' | 'water' | 'highway';

export interface OsmWorldState {
  enabled: boolean;
  isLiveOsm: boolean;
  placeName: string;
  roadName: string;
  biome: OsmBiome;
  nearbyLandmark: string | null;
  nearbyChargerName: string | null;
  isNearRealTunnel: boolean;
  landmarkPulse: number; // 0..1 decays smoothly after place/landmark discovery
}

interface DemoStop {
  placeName: string;
  roadName: string;
  biome: OsmBiome;
  nearbyLandmark: string | null;
  nearbyChargerName: string | null;
}

const SWEDISH_WINTER_TOUR: DemoStop[] = [
  {
    placeName: 'Stockholm',
    roadName: 'Strandvägen',
    biome: 'village',
    nearbyLandmark: 'Kungliga Slottet',
    nearbyChargerName: null,
  },
  {
    placeName: 'Mälaren',
    roadName: 'Riddarfjärden',
    biome: 'water',
    nearbyLandmark: 'Spegelblank Vintervik',
    nearbyChargerName: null,
  },
  {
    placeName: 'Roslagen',
    roadName: 'Nordskogen',
    biome: 'forest',
    nearbyLandmark: 'Glittrande Granskog',
    nearbyChargerName: null,
  },
  {
    placeName: 'Upplands Väsby',
    roadName: 'E4 Norr',
    biome: 'highway',
    nearbyLandmark: null,
    nearbyChargerName: 'Supercharger InfraCity',
  },
  {
    placeName: 'Sigtuna',
    roadName: 'Stora Gatan',
    biome: 'village',
    nearbyLandmark: 'Sigtuna Julmarknad',
    nearbyChargerName: null,
  },
  {
    placeName: 'Uppsala',
    roadName: 'Fyrisån',
    biome: 'water',
    nearbyLandmark: 'Uppsala Domkyrka',
    nearbyChargerName: null,
  },
];

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export class OsmWorldDirector {
  private enabled = true;
  private isLiveOsm = false;
  private placeName = SWEDISH_WINTER_TOUR[0].placeName;
  private roadName = SWEDISH_WINTER_TOUR[0].roadName;
  private biome: OsmBiome = SWEDISH_WINTER_TOUR[0].biome;
  private nearbyLandmark: string | null = SWEDISH_WINTER_TOUR[0].nearbyLandmark;
  private nearbyChargerName: string | null = SWEDISH_WINTER_TOUR[0].nearbyChargerName;
  private isNearRealTunnel = false;
  private landmarkPulse = 0.7;

  private demoIdx = 0;
  private demoTimer = 0;

  private lastFetchMs = 0;
  private lastFetchLat = 0;
  private lastFetchLon = 0;
  private inflightAbort: AbortController | null = null;
  private placeListeners = new Set<(state: OsmWorldState) => void>();

  constructor() {
    try {
      const saved = localStorage.getItem('tesla-xmas-osm');
      if (saved === '0') this.enabled = false;
    } catch {
      // Ignore storage access errors
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    try {
      localStorage.setItem('tesla-xmas-osm', enabled ? '1' : '0');
    } catch {
      // Ignore
    }
  }

  onPlaceChange(cb: (state: OsmWorldState) => void): () => void {
    this.placeListeners.add(cb);
    return () => this.placeListeners.delete(cb);
  }

  private emitPlaceChange(): void {
    const snap = this.getState();
    for (const cb of this.placeListeners) {
      cb(snap);
    }
  }

  nextDemoStop(): void {
    this.demoIdx = (this.demoIdx + 1) % SWEDISH_WINTER_TOUR.length;
    this.demoTimer = 0;
    const stop = SWEDISH_WINTER_TOUR[this.demoIdx];
    this.isLiveOsm = false;
    this.placeName = stop.placeName;
    this.roadName = stop.roadName;
    this.biome = stop.biome;
    this.nearbyLandmark = stop.nearbyLandmark;
    this.nearbyChargerName = stop.nearbyChargerName;
    this.isNearRealTunnel = false;
    this.landmarkPulse = 1.0;
    this.emitPlaceChange();
  }

  update(dt: number, source: DriveSource, lat: number, lon: number, isMoving: boolean): OsmWorldState {
    if (this.landmarkPulse > 0) {
      this.landmarkPulse = Math.max(0, this.landmarkPulse - dt * 0.25);
    }

    if (!this.enabled) {
      return this.getState();
    }

    if (source === 'gps') {
      const now = Date.now();
      const movedM =
        this.lastFetchMs === 0 ? 9999 : haversineMeters(this.lastFetchLat, this.lastFetchLon, lat, lon);

      if (now - this.lastFetchMs >= 45000 && movedM >= 350) {
        this.lastFetchMs = now;
        this.lastFetchLat = lat;
        this.lastFetchLon = lon;
        void this.fetchLiveOsm(lat, lon);
      }
    } else {
      // Curated Swedish Winter Demo Tour (zero external network traffic in Demo/Manual!)
      if (isMoving) {
        this.demoTimer += dt;
        if (this.demoTimer >= 18) {
          this.nextDemoStop();
        }
      }
    }

    return this.getState();
  }

  private async fetchLiveOsm(lat: number, lon: number): Promise<void> {
    this.inflightAbort?.abort();
    const ctrl = new AbortController();
    this.inflightAbort = ctrl;
    const timer = setTimeout(() => ctrl.abort(), 6000);

    try {
      const nomUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat.toFixed(
        5
      )}&lon=${lon.toFixed(5)}&zoom=14&addressdetails=1`;

      const overpassQuery = `[out:json][timeout:5];(way(around:650,${lat.toFixed(4)},${lon.toFixed(
        4
      )})["natural"~"water|wood"];way(around:650,${lat.toFixed(4)},${lon.toFixed(
        4
      )})["landuse"~"forest|residential"];way(around:120,${lat.toFixed(4)},${lon.toFixed(
        4
      )})["tunnel"="yes"];node(around:750,${lat.toFixed(4)},${lon.toFixed(
        4
      )})["amenity"~"charging_station|place_of_worship"];node(around:750,${lat.toFixed(4)},${lon.toFixed(
        4
      )})["tourism"="attraction"];node(around:750,${lat.toFixed(4)},${lon.toFixed(
        4
      )})["historic"];);out tags 25;`;

      const [nomRes, ovRes] = await Promise.all([
        fetch(nomUrl, { signal: ctrl.signal }),
        fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: `data=${encodeURIComponent(overpassQuery)}`,
          signal: ctrl.signal,
        }),
      ]);

      let nextPlace = this.placeName;
      let nextRoad = this.roadName;
      if (nomRes.ok) {
        const nomData = await nomRes.json();
        const addr = nomData?.address ?? {};
        nextPlace = addr.city || addr.town || addr.village || addr.suburb || addr.municipality || nextPlace;
        nextRoad = addr.road || addr.neighbourhood || nextPlace;
      }

      let nextBiome: OsmBiome = 'village';
      let nextLandmark: string | null = null;
      let nextCharger: string | null = null;
      let nextTunnel = false;

      if (ovRes.ok) {
        const ovData = await ovRes.json();
        const els: Array<{ tags?: Record<string, string> }> = ovData?.elements ?? [];
        let hasWater = false;
        let hasForest = false;
        let hasResidential = false;

        for (const el of els) {
          const tags = el.tags;
          if (!tags) continue;
          if (tags.natural === 'water') hasWater = true;
          if (tags.natural === 'wood' || tags.landuse === 'forest') hasForest = true;
          if (tags.landuse === 'residential') hasResidential = true;
          if (tags.tunnel === 'yes') nextTunnel = true;
          if (tags.amenity === 'charging_station' && !nextCharger) {
            nextCharger = tags.name || tags.operator || 'Tesla Supercharger';
          }
          if ((tags.tourism === 'attraction' || tags.historic || tags.amenity === 'place_of_worship') && tags.name && !nextLandmark) {
            nextLandmark = tags.name;
          }
        }

        if (hasWater) nextBiome = 'water';
        else if (hasForest && !hasResidential) nextBiome = 'forest';
        else if (hasResidential) nextBiome = 'village';
        else nextBiome = 'highway';
      }

      const changed = nextPlace !== this.placeName || nextBiome !== this.biome || nextLandmark !== this.nearbyLandmark;
      this.isLiveOsm = true;
      this.placeName = nextPlace;
      this.roadName = nextRoad;
      this.biome = nextBiome;
      this.nearbyLandmark = nextLandmark;
      this.nearbyChargerName = nextCharger;
      this.isNearRealTunnel = nextTunnel;

      if (changed) {
        this.landmarkPulse = 1.0;
        this.emitPlaceChange();
      }
    } catch {
      // Offline / rate-limited / blocked: fail silently keeping last cozy location
    } finally {
      clearTimeout(timer);
    }
  }

  getState(): OsmWorldState {
    return {
      enabled: this.enabled,
      isLiveOsm: this.isLiveOsm,
      placeName: this.placeName,
      roadName: this.roadName,
      biome: this.biome,
      nearbyLandmark: this.nearbyLandmark,
      nearbyChargerName: this.nearbyChargerName,
      isNearRealTunnel: this.isNearRealTunnel,
      landmarkPulse: this.landmarkPulse,
    };
  }
}
