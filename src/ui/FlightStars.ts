import type { LiveFlight } from '../core/liveWorldData';
import type { TelemetryFrame } from '../core/telemetry';

interface Airport {
  municipality?: string;
  name?: string;
  iata_code?: string;
  icao_code?: string;
}
const shortAirport = (a?: Airport) =>
  a?.municipality || a?.name || a?.iata_code || a?.icao_code || 'Okänd';

const cleanRouteCity = (label: string) => label.split(' · ')[0].trim();

export class FlightStars {
  private root = document.createElement('div');
  private panel = document.createElement('section');
  private buttons = new Map<string, HTMLButtonElement>();
  private flights = new Map<string, LiveFlight>();
  private selected = '';
  private routes = new Map<string, { routeText: string; airline?: string }>();

  constructor(container: HTMLElement) {
    this.root.className = 'flight-stars';
    this.panel.className = 'flight-details';
    this.panel.hidden = true;
    this.panel.setAttribute('aria-live', 'polite');
    for (const event of ['pointerdown', 'pointerup', 'click']) {
      this.root.addEventListener(event, e => e.stopPropagation());
    }
    this.root.append(this.panel);
    container.append(this.root);
  }

  openFlight(id: string): void {
    void this.show(id);
  }

  private button(id: string, label: string): HTMLButtonElement {
    let button = this.buttons.get(id);
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'flight-star';
      button.textContent = id === 'pole' ? '✧ N' : `✈ ${label.replace(/^Visa flyg /, '')}`;
      button.addEventListener('pointerdown', e => {
        e.stopPropagation();
        e.preventDefault();
        void this.show(id);
      });
      button.onclick = e => {
        e.stopPropagation();
        void this.show(id);
      };
      this.root.append(button);
      this.buttons.set(id, button);
    }
    button.setAttribute('aria-label', label);
    button.title = label;
    return button;
  }

  private async show(id: string): Promise<void> {
    const flight = this.flights.get(id);
    if (!flight && id !== 'pole') return;
    this.selected = id;
    this.panel.hidden = false;

    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Stäng ×';
    close.onclick = () => {
      this.selected = '';
      this.panel.hidden = true;
      this.buttons.get(id)?.focus();
    };

    const title = document.createElement('strong');
    if (!flight) {
      title.textContent = '🧭 Nordpolen';
      const note = document.createElement('div');
      note.textContent = 'Geografisk nord · 90° N';
      this.panel.replaceChildren(close, title, note);
      return;
    }

    const cachedRoute = this.routes.get(flight.callsign);
    const airlineName = flight.airline || cachedRoute?.airline;
    title.textContent = `✈ ${airlineName || flight.callsign}`;

    const route = document.createElement('div');
    const trees = Math.max(50, Math.round(flight.altitudeM / 15));
    const height = document.createElement('div');
    height.className = 'flight-twist';
    height.textContent = `🎄 ${trees.toLocaleString('sv-SE')} julgranar högt`;
    this.panel.replaceChildren(close, title, route, height);

    const seededRoute =
      flight.originLabel && flight.destinationLabel
        ? `🛫 ${cleanRouteCity(flight.originLabel)} → ${cleanRouteCity(flight.destinationLabel)}`
        : undefined;

    if (cachedRoute) {
      route.textContent = cachedRoute.routeText;
      return;
    }

    if (seededRoute && flight.routeResolved) {
      route.textContent = seededRoute;
      return;
    }

    route.textContent = seededRoute || '🛫 Hämtar rutt…';

    try {
      const res = await fetch('https://api.adsbdb.com/v0/callsign/' + encodeURIComponent(flight.callsign), {
        signal: AbortSignal.timeout(6500),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()).response?.flightroute;
      if (!data) throw new Error();
      const text = `🛫 ${shortAirport(data.origin)} → ${shortAirport(data.destination)}`;
      const resolvedAirline = data.airline?.name as string | undefined;
      this.routes.set(flight.callsign, { routeText: text, airline: resolvedAirline });
      if (this.selected === id) {
        if (resolvedAirline) title.textContent = `✈ ${resolvedAirline}`;
        route.textContent = text;
      }
    } catch {
      if (this.selected === id && !seededRoute) {
        route.textContent = '🛫 Polcirkeln · Julrutt';
      }
    }
  }

  update(
    flights: LiveFlight[],
    car: TelemetryFrame,
    project?: (flight: LiveFlight) => { x: number; y: number; visible: boolean; width?: number; height?: number }
  ): void {
    this.flights.clear();
    const pole = this.button('pole', 'Visa Nordpolen');
    pole.classList.add('pole-star');
    pole.hidden = !!project;

    for (const f of flights) {
      const id = f.hex || f.callsign;
      this.flights.set(id, f);
      const button = this.button(id, `Visa flyg ${f.callsign}`);
      if (project) {
        button.classList.add('starman-marker');
        let label = button.querySelector('span');
        if (!label) {
          label = document.createElement('span');
          button.replaceChildren(label);
        }
        const badgeText = `🚀 ${f.callsign}`;
        if (label.textContent !== badgeText) label.textContent = badgeText;
        const p = project(f);
        button.hidden = !p.visible;
        button.style.left = Math.max(8, Math.min(92, p.x)) + '%';
        button.style.top = Math.max(11, Math.min(72, p.y)) + '%';
        if (p.width !== undefined) button.style.width = Math.max(7.5, p.width) + '%';
        if (p.height !== undefined) button.style.height = Math.max(6.2, p.height) + '%';
        continue;
      }
      const angle = f.isLive ? ((f.bearingDeg - car.headingDeg + 540) % 360) - 180 : ((f.bearingDeg + 180) % 360) - 180;
      button.hidden = Math.abs(angle) > 85;
      button.style.left = 50 + angle * 0.54 + '%';
      const elevation = Math.atan2(f.altitudeM, Math.max(1, f.distanceKm * 1000));
      button.style.top = Math.max(12, 35 - elevation * 30) + '%';
    }

    for (const [id, button] of this.buttons) {
      if (id === 'pole' || this.flights.has(id)) continue;
      button.remove();
      this.buttons.delete(id);
      if (this.selected === id) {
        this.panel.hidden = true;
        this.selected = '';
      }
    }
  }

  dispose(): void {
    this.root.remove();
  }
}
