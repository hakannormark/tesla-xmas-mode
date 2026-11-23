import * as THREE from 'three';
import { ActiveElonEvent } from '../core/elonEvents';
import { getSoftGlowTexture, getStarSpriteTexture } from './pixarMaterials';
import {
  AccurateCybertruckHandle,
  createAccurateCybertruck,
  createAccurateStarmanRoadster,
  createAccurateStarshipStack,
  createAccurateSuperchargerPlaza,
} from './teslaModels';

export interface ElonAnchorConfig {
  mappedSupercharger?: THREE.Vector3 | null;
  showRoadVehicles?: boolean;
  moonPos: THREE.Vector3;
  starshipOrigin: THREE.Vector3;
  starshipScale?: number;
  starlinkZ?: number;
  cybertruckYaw?: number;
  forwardStep?: number;
  getRoadCurveX?: (z: number) => number;
  superchargerSideOffset?: number;
  superchargerStartZ?: number;
  superchargerWrapZ?: number;
  roadPointAt(progress: number, sideOffset: number, out: THREE.Vector3): THREE.Vector3;
}

export class PixarElonRig {
  readonly group = new THREE.Group();

  private starmanGroup: THREE.Group;
  private starlinkGroup: THREE.Group;
  private starshipGroup: THREE.Group;
  private starshipStar: THREE.Sprite;
  private superchargerPlaza: { group: THREE.Group; update(time: number): void };
  private cybertruck: AccurateCybertruckHandle;

  private tempPos = new THREE.Vector3();
  private wheelPhase = 0;
  private lastEventType: string | null = null;
  private superchargerZ = -126;
  private cyberplowZ = -135;

  constructor() {
    // 1. Accurate Cherry-Red Tesla Roadster + SpaceX Starman + Santa Hat
    this.starmanGroup = createAccurateStarmanRoadster();
    this.starmanGroup.visible = false;
    this.group.add(this.starmanGroup);

    // 2. Starlink 18-satellite blooming fairy light train
    this.starlinkGroup = new THREE.Group();
    for (let i = 0; i < 18; i++) {
      const sat = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: getSoftGlowTexture(),
          color: i % 3 === 0 ? '#ffe082' : '#d2f0ff',
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      );
      sat.scale.set(2.4, 2.4, 1);
      sat.position.set(-i * 3.8, Math.sin(i * 0.4) * 1.1, 0);
      this.starlinkGroup.add(sat);
    }
    this.starlinkGroup.visible = false;
    this.group.add(this.starlinkGroup);

    // 3. Accurate SpaceX Starship + Super Heavy Booster + Christmas Star Apex
    this.starshipGroup = createAccurateStarshipStack();
    this.starshipStar = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: getStarSpriteTexture(),
        color: '#ffe696',
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );
    this.starshipStar.position.y = 8.2;
    this.starshipStar.scale.set(26, 26, 1);
    this.starshipGroup.add(this.starshipStar);
    this.starshipGroup.visible = false;
    this.group.add(this.starshipGroup);

    // 4. Accurate Tesla V4 Supercharger Plaza + Optimus Gen 2 Elf
    this.superchargerPlaza = createAccurateSuperchargerPlaza();
    this.superchargerPlaza.group.visible = false;
    this.group.add(this.superchargerPlaza.group);

    // 5. Accurate Faceted Stainless Cybertruck hauling illuminated Christmas tree + Snowplow blade
    this.cybertruck = createAccurateCybertruck(true, true);
    this.cybertruck.group.visible = false;
    this.group.add(this.cybertruck.group);
  }

  update(event: ActiveElonEvent | null, dt: number, time: number, anchors: ElonAnchorConfig): void {
    const type = event?.type ?? null;
    const p = event?.progress ?? 0;

    if (type !== this.lastEventType) {
      if (type === 'supercharger') this.superchargerZ = anchors.superchargerStartZ ?? -126;
      if (type === 'cyberplow') this.cyberplowZ = -135;
      this.lastEventType = type;
    }

    // 1. Starman crossing the full moon
    this.starmanGroup.visible = type === 'starman';
    if (this.starmanGroup.visible) {
      this.starmanGroup.position.set(
        anchors.moonPos.x - 36 + p * 72,
        anchors.moonPos.y + Math.sin(p * Math.PI) * 7,
        anchors.moonPos.z + 18
      );
      this.starmanGroup.rotation.z = 0.12;
      this.starmanGroup.scale.setScalar(1.85);
    }

    // 2. Starlink ribbon train
    this.starlinkGroup.visible = type === 'starlink';
    if (this.starlinkGroup.visible) {
      this.starlinkGroup.position.set(-75 + p * 165, 38, anchors.starlinkZ ?? -118);
      this.starlinkGroup.rotation.z = 0.08;
    }

    // 3. Starship + Super Heavy liftoff & Christmas star bloom
    this.starshipGroup.visible = type === 'starship';
    if (this.starshipGroup.visible) {
      const rise = Math.pow(Math.min(1, p / 0.78), 0.76);
      this.starshipGroup.scale.setScalar(anchors.starshipScale ?? 1.45);
      this.starshipGroup.position.set(
        anchors.starshipOrigin.x,
        anchors.starshipOrigin.y + rise * 48,
        anchors.starshipOrigin.z
      );
      this.starshipGroup.rotation.y = p * 0.4;
      if (p > 0.65) {
        const bp = (p - 0.65) / 0.35;
        this.starshipStar.material.opacity = Math.sin(bp * Math.PI) * 0.95;
        const sc = 18 + bp * 26;
        this.starshipStar.scale.set(sc, sc, 1);
      } else {
        this.starshipStar.material.opacity = 0;
      }
    }

    // 4. Tesla V4 Nordpolen Supercharger Oasis + waving Optimus Gen 2 Elf (planted at true road speed!)
    this.superchargerPlaza.group.visible = type === 'supercharger' && anchors.mappedSupercharger !== null;
    if (this.superchargerPlaza.group.visible) {
      if (anchors.mappedSupercharger) {
        this.superchargerPlaza.group.position.copy(anchors.mappedSupercharger);
        this.superchargerPlaza.group.rotation.y = 0;
      } else if (anchors.forwardStep !== undefined && anchors.getRoadCurveX) {
        this.superchargerZ += anchors.forwardStep;
        const wrapZ = anchors.superchargerWrapZ ?? 24;
        if (this.superchargerZ > wrapZ) this.superchargerZ = anchors.superchargerStartZ ?? -132;
        const rx = anchors.getRoadCurveX(this.superchargerZ);
        const nextRx = anchors.getRoadCurveX(this.superchargerZ - 5);
        const tangentYaw = Math.atan2(rx - nextRx, 5);
        const side = anchors.superchargerSideOffset ?? 12.6;
        this.superchargerPlaza.group.position.set(rx + side, 0, this.superchargerZ);
        this.superchargerPlaza.group.rotation.y = tangentYaw - Math.PI * 0.5;
      } else {
        anchors.roadPointAt(p, 11.8, this.tempPos);
        this.superchargerPlaza.group.position.copy(this.tempPos);
        this.superchargerPlaza.group.rotation.y = 0;
      }
      this.superchargerPlaza.update(time);
    }

    // 5. Cybertruck Snowplow hauling glowing tree in oncoming lane
    this.cybertruck.group.visible = type === 'cyberplow' && anchors.showRoadVehicles !== false;
    if (this.cybertruck.group.visible) {
      this.wheelPhase += dt * 16;
      if (anchors.forwardStep !== undefined && anchors.getRoadCurveX) {
        this.cyberplowZ += anchors.forwardStep + 14.5 * dt;
        if (this.cyberplowZ > 24) this.cyberplowZ = -140;
        const rx = anchors.getRoadCurveX(this.cyberplowZ);
        const nextRx = anchors.getRoadCurveX(this.cyberplowZ - 5);
        const tangentYaw = Math.atan2(rx - nextRx, 5);
        this.cybertruck.group.position.set(rx - 2.45, 0, this.cyberplowZ);
        this.cybertruck.group.rotation.y = tangentYaw + Math.PI;
      } else {
        anchors.roadPointAt(p, -2.4, this.tempPos);
        this.cybertruck.group.position.copy(this.tempPos);
        this.cybertruck.group.rotation.y = anchors.cybertruckYaw ?? 0;
      }
      this.cybertruck.update(this.wheelPhase, time);
    }
  }
}
