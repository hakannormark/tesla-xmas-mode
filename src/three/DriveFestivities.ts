import * as THREE from 'three';
import { HolidayAudioEngine } from '../core/audioEngine';
import { BoringTunnelRenderer } from '../core/boringTunnel';
import { ElonEventDirector } from '../core/elonEvents';
import { EnvironmentManager } from '../core/environment';
import { i18n, type ElonEventType } from '../core/i18n';
import type { LiveWorldState } from '../core/liveWorldData';
import type { OsmMapSnapshot } from '../core/osmWorld';
import type { TelemetryEngine, TelemetryFrame } from '../core/telemetry';
import { LiveSkyRig } from './liveSkyRig';
import { pointAlongStreet, streetAtCar } from './mappedRoads';
import { PixarElonRig } from './pixarElonEvents';
import { createPixarMoon, getStarSpriteTexture } from './pixarMaterials';
import type { PixarSleighHandle } from './pixarModels';
import { createAccurateTeslaSemi } from './teslaModels';

export class DriveFestivities {
  private readonly director = new ElonEventDirector();
  private readonly sky = new LiveSkyRig();
  private readonly events = new PixarElonRig();
  private readonly environment = new EnvironmentManager();
  private readonly audio = new HolidayAudioEngine();
  private readonly tunnel = new BoringTunnelRenderer();
  private readonly tunnelCanvas = document.createElement('canvas');
  private readonly tunnelContext = this.tunnelCanvas.getContext('2d')!;
  private readonly effects = new THREE.Group();
  private readonly convoy = [createAccurateTeslaSemi('coca_cola'),createAccurateTeslaSemi('tesla')];
  private readonly moon = createPixarMoon(7);
  private readonly gift = new THREE.Group();
  private readonly sparkle = new THREE.Sprite(new THREE.SpriteMaterial({
    map:getStarSpriteTexture(), color:'#ffe099', transparent:true, depthWrite:false, opacity:0,
  }));
  private readonly status: HTMLOutputElement;
  private readonly origin = new THREE.Vector3();
  private readonly destination = new THREE.Vector3();
  private giftAge = -1;
  private tunnelBlend = 0;
  private requestedGift = false;
  private count = 0;
  private convoyTime = 0;
  private statusUntil = 0;
  private time = 0;
  private eventHeading = 0;
  private lastHeading = 0;
  private matchedStreet?: ReturnType<typeof streetAtCar>;
  private matchedAt = -Infinity;
  private snapshotVersion?: number;

  constructor(root: HTMLElement, world: HTMLElement, scene: THREE.Scene, private readonly sleigh: PixarSleighHandle,
    telemetry: TelemetryEngine) {
    this.status = root.querySelector('[data-festive-status]')!;
    this.audio.setMixMode('muted');
    this.effects.add(this.sky.group,this.events.group,this.moon);
    this.moon.position.set(-38,26,-143);
    scene.add(this.effects,this.gift,this.sparkle);
    this.gift.visible = this.sparkle.visible = false;
    this.gift.add(new THREE.Mesh(new THREE.BoxGeometry(0.64,0.64,0.64),new THREE.MeshStandardMaterial({color:'#c6234b',roughness:0.55})));
    const ribbon = new THREE.MeshStandardMaterial({color:'#f9cc72',metalness:0.3,roughness:0.42});
    this.gift.add(new THREE.Mesh(new THREE.BoxGeometry(0.69,0.665,0.12),ribbon),
      new THREE.Mesh(new THREE.BoxGeometry(0.12,0.665,0.69),ribbon));
    for (const truck of this.convoy) {
      truck.group.visible = false;
      scene.add(truck.group);
    }
    this.tunnelCanvas.className = 'drive-tunnel';
    this.tunnelCanvas.hidden = true;
    world.append(this.tunnelCanvas);
    this.director.onEventStart(type => {
      this.eventHeading = this.lastHeading;
      this.announce(i18n.t().elonEvents[type].label, 11);
    });
    const menu = root.querySelector<HTMLDetailsElement>('.drive-festivities details')!;
    root.querySelectorAll<HTMLButtonElement>('[data-event]').forEach(button => {
      button.onclick = () => {
        this.director.trigger(button.dataset.event as ElonEventType);
        menu.open = false;
      };
    });
    root.querySelector<HTMLButtonElement>('[data-convoy]')!.onclick = () => {
      this.convoyTime = 16;
      this.audio.playConvoyHorn();
      this.sleigh.triggerReaction('hohoho');
      this.announce('Julkaravan', 12);
      menu.open = false;
    };
    root.querySelector<HTMLButtonElement>('[data-tunnel]')!.onclick = () => {
      telemetry.setForceTunnel(!telemetry.getForceTunnel());
      menu.open = false;
    };
    root.querySelector<HTMLButtonElement>('[data-gift]')!.onclick = () => { this.requestedGift = true; };
    const sound = root.querySelector<HTMLButtonElement>('[data-sound]')!;
    sound.onclick = () => {
      const enabled = sound.getAttribute('aria-pressed') !== 'true';
      sound.setAttribute('aria-pressed',String(enabled));
      sound.textContent = enabled ? 'Stäng av ljud' : 'Slå på ljud';
      if (enabled) this.audio.unlock();
      this.audio.setMixMode(enabled ? 'full' : 'muted');
    };
  }

  private announce(message: string, seconds = 4): void {
    this.status.textContent = message;
    this.statusUntil = this.time + seconds;
  }

  resize(width: number, height: number): void {
    this.tunnelCanvas.width = width;
    this.tunnelCanvas.height = height;
  }

  update(dt: number, time: number, frame: TelemetryFrame, map: OsmMapSnapshot | undefined,
    center: THREE.Vector3, heading: number, live: LiveWorldState): void {
    this.time = time;
    this.lastHeading = heading;
    if (this.statusUntil && time > this.statusUntil) {
      this.status.textContent = '';
      this.statusUntil = 0;
    }
    const event = this.director.update(dt,!!map && frame.isMoving);
    this.audio.update(dt,frame,event?.type ?? null);
    this.effects.position.copy(center);
    this.effects.rotation.y = -(event ? this.eventHeading : heading);
    const env = this.environment.getState();
    this.sky.update(dt,time,0,env,live,() => 0,0,false);
    if (this.snapshotVersion !== map?.version || time - this.matchedAt > 0.25) {
      this.snapshotVersion = map?.version;
      this.matchedStreet = map && streetAtCar(map,frame);
      this.matchedAt = time;
    }
    const street = this.matchedStreet;
    const charger = event?.type === 'supercharger' && map?.pois.find(p =>
      p.tesla && p.kind === 'charger' && Math.hypot(p.x-center.x,p.z-center.z) < 180);
    this.effects.updateMatrixWorld();
    if (event?.type === 'supercharger' && event.elapsed <= dt && !charger) this.announce('Ingen kartlagd Tesla Supercharger i närheten');
    const mappedSupercharger = charger ? this.effects.worldToLocal(new THREE.Vector3(charger.x,0,charger.z)) : null;
    const plow = event?.type === 'cyberplow' && street && pointAlongStreet(street,center,heading,100-event.progress*109);
    this.events.update(event,dt,time,{
      moonPos:this.moon.position,
      starshipOrigin:new THREE.Vector3(33,27,-130),
      starlinkZ:-145,
      mappedSupercharger,
      showRoadVehicles:!!plow,
      cybertruckYaw:plow ? Math.PI-plow.heading+this.eventHeading : 0,
      roadPointAt:(_progress,side,out) => {
        if (!plow) return out.set(0,0,0);
        out.set(plow.x+Math.cos(plow.heading)*side,0,plow.z+Math.sin(plow.heading)*side);
        return this.effects.worldToLocal(out);
      },
    });

    this.convoyTime = Math.max(0,this.convoyTime-dt);
    this.convoy.forEach((truck,index) => {
      const slot = this.convoyTime > 0 && street && pointAlongStreet(street,center,heading,20+index*18);
      truck.group.visible = !!slot;
      if (!slot) return;
      truck.group.position.set(slot.x+Math.cos(slot.heading)*1.28,0.05,slot.z+Math.sin(slot.heading)*1.28);
      truck.group.rotation.y = -slot.heading;
      truck.update(dt,time*frame.speedKmh*0.1,frame.isBraking,this.convoyTime, time);
    });

    if (this.requestedGift) {
      this.requestedGift = false;
      if (this.giftAge === -1) {
        let closest = 85;
        let roof = 3;
        let hasTarget = false;
        for (const building of map?.buildings ?? []) {
          const dx = building.centerX-center.x, dz = building.centerZ-center.z;
          const ahead = dx*Math.sin(heading)-dz*Math.cos(heading);
          const distance = Math.hypot(dx,dz);
          if (ahead < 5 || distance >= closest) continue;
          closest = distance;
          roof = THREE.MathUtils.clamp(building.heightM*0.65,3,16);
          this.destination.set(building.centerX,roof,building.centerZ);
          hasTarget = true;
        }
        if (hasTarget) {
          this.origin.copy(center).add(new THREE.Vector3(0,2,0));
          this.giftAge = 0;
          this.sleigh.triggerReaction('gift');
          this.audio.playGiftLaunch();
        } else {
          this.sleigh.triggerReaction('hohoho');
          this.announce('Tomten vinkar');
        }
      }
    }
    if (this.giftAge >= 0) {
      this.giftAge += dt;
      const progress = Math.min(1,this.giftAge/1.4);
      this.gift.visible = progress < 1;
      this.gift.position.lerpVectors(this.origin,this.destination,progress);
      this.gift.position.y += Math.sin(progress*Math.PI)*10;
      this.gift.rotation.set(time*5,time*3,0);
      if (this.giftAge >= 1.4 && this.giftAge-dt < 1.4) {
        this.audio.playChimneyPop();
        this.announce(`${++this.count} levererade julklappar`);
      }
      this.sparkle.visible = progress === 1;
      this.sparkle.position.copy(this.destination).y += 1.5;
      this.sparkle.scale.setScalar(3+Math.max(0,this.giftAge-1.4)*6);
      this.sparkle.material.opacity = Math.max(0,2.3-this.giftAge)*0.65;
      if (this.giftAge > 2.3) {
        this.giftAge = -1;
        this.sparkle.visible = false;
      }
    }
    const enteredTunnel = frame.forceTunnel || street?.tunnel;
    this.tunnelBlend = THREE.MathUtils.lerp(this.tunnelBlend, enteredTunnel ? 1 : 0, 1-Math.exp(-dt*3.5));
    this.tunnelCanvas.hidden = this.tunnelBlend <= 0.01;
    if (!this.tunnelCanvas.hidden) {
      const {width,height} = this.tunnelCanvas;
      this.tunnelContext.clearRect(0,0,width,height);
      this.tunnel.render(this.tunnelContext,width,height,dt,{...frame,tunnelBlend:this.tunnelBlend});
    }
  }
}
