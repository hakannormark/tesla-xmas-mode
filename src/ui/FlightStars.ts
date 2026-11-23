import type { LiveFlight } from '../core/liveWorldData';
import type { TelemetryFrame } from '../core/telemetry';

interface Airport { municipality?: string; iata_code?: string; icao_code?: string }
const airport = (a?: Airport) => [a?.municipality, a?.iata_code || a?.icao_code].filter(Boolean).join(' · ') || 'Okänd';

export class FlightStars {
  private root = document.createElement('div');
  private panel = document.createElement('section');
  private buttons = new Map<string, HTMLButtonElement>();
  private flights = new Map<string, LiveFlight>();
  private poleKm = 0;
  private selected = '';
  private routes = new Map<string, string>();

  constructor(container: HTMLElement) {
    this.root.className = 'flight-stars';
    this.panel.className = 'flight-details';
    this.panel.hidden = true;
    this.panel.setAttribute('aria-live', 'polite');
    for (const event of ['pointerdown','pointerup','click']) {
      this.root.addEventListener(event, e => e.stopPropagation());
    }
    this.root.append(this.panel);
    container.append(this.root);
  }

  private button(id: string, label: string): HTMLButtonElement {
    let button = this.buttons.get(id);
    if (!button) {
      button = document.createElement('button');
      button.className = 'flight-star';
      button.textContent = id === 'pole' ? '✧ N' : '✦';
      button.onclick = () => { void this.show(id); };
      button.addEventListener('pointerdown',event => {
        if (event.button === 0 && event.isPrimary) (event.currentTarget as HTMLButtonElement).setPointerCapture(event.pointerId);
      });
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
    close.textContent = 'Stäng ×';
    close.onclick = () => { this.selected = ''; this.panel.hidden = true; this.buttons.get(id)?.focus(); };
    const title = document.createElement('strong');
    title.textContent = flight ? [flight.callsign, flight.aircraft, flight.registration].filter(Boolean).join(' · ') : 'Nordpolen';
    const details = document.createElement('div');
    details.textContent = flight ? `${flight.isLive ? 'ADS-B' : 'Demoflyg'} · ${flight.altitudeM} m · ${Math.round(flight.distanceKm)} km från dig` : 'Geografisk nord · 90° N';
    const pole = document.createElement('div');
    pole.textContent = `Från dig till Nordpolen: ${this.poleKm.toLocaleString('sv-SE')} km`;
    const route = document.createElement('div');
    this.panel.replaceChildren(close, title, details, route, pole);
    if (!flight) return;
    if (!flight.isLive) {
      route.textContent = id === 'SK142' ? 'Demorutt: Stockholm → Köpenhamn' : 'Demorutt: Oslo → Stockholm';
      return;
    }
    route.textContent = this.routes.get(flight.callsign) || 'Hämtar avreseort och destination…';
    if (this.routes.has(flight.callsign)) return;
    try {
      const res = await fetch('https://api.adsbdb.com/v0/callsign/' + encodeURIComponent(flight.callsign), {signal: AbortSignal.timeout(6500)});
      if (!res.ok) throw new Error();
      const data = (await res.json()).response?.flightroute;
      if (!data) throw new Error();
      const text = `Från ${airport(data.origin)} → ${airport(data.destination)}`;
      this.routes.set(flight.callsign, text);
      route.textContent = text;
    } catch {
      route.textContent = 'Avreseort och destination saknas i ruttregistret.';
    }
  }

  update(flights: LiveFlight[], car: TelemetryFrame, project?: (flight: LiveFlight) => {x: number; y: number; visible: boolean; width?: number; height?: number}): void {
    this.poleKm = Math.round(car.northPoleDistanceKm);
    this.flights.clear();
    const pole = this.button('pole', 'Visa Nordpolen');
    pole.classList.add('pole-star');
    pole.hidden = !!project;
    for (const f of flights) {
      const id = f.hex || f.callsign;
      this.flights.set(id, f);
      const button = this.button(id, 'Visa flyg ' + f.callsign);
      if (project) {
        button.classList.add('starman-marker');
        let label = button.querySelector('span');
        if (!label) {
          label = document.createElement('span');
          button.replaceChildren(label);
        }
        if (label.textContent !== f.callsign) label.textContent = f.callsign;
        const p = project(f);
        button.hidden = !p.visible;
        button.style.left = p.x + '%';
        button.style.top = p.y + '%';
        if (p.width !== undefined) button.style.width = p.width + '%';
        if (p.height !== undefined) button.style.height = p.height + '%';
        continue;
      }
      const angle = f.isLive ? ((f.bearingDeg - car.headingDeg + 540) % 360) - 180 : ((f.bearingDeg + 180) % 360) - 180;
      button.hidden = Math.abs(angle) > 85;
      button.style.left = (50 + angle * 0.54) + '%';
      const elevation = Math.atan2(f.altitudeM, Math.max(1, f.distanceKm * 1000));
      button.style.top = Math.max(12, 35 - elevation * 30) + '%';
    }
    for (const [id, button] of this.buttons) {
      if (id === 'pole' || this.flights.has(id)) continue;
      button.remove();
      this.buttons.delete(id);
      if (this.selected === id) { this.panel.hidden = true; this.selected = ''; }
    }
  }

  dispose(): void { this.root.remove(); }
}
