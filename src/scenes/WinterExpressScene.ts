import * as THREE from 'three';
import { SceneId } from '../core/i18n';
import {
  BokehSnowField,
  createBokehSnowField,
  createPixarMoon,
  createPixarSkyDome,
  createSparklingSnowMaterial,
  getSoftGlowTexture,
  getStarSpriteTexture,
} from '../three/pixarMaterials';
import {
  createFrozenLakePlane,
  createHolidayRoadSign,
  createPixarCottage,
  createPixarPineTree,
  createPixarSantaSleigh,
  createPixarSnowman,
  createPixarStreetLamp,
  HolidayRoadSignHandle,
  PixarCottageHandle,
  PixarPineHandle,
  PixarSleighHandle,
  PixarStreetLampHandle,
} from '../three/pixarModels';
import { PixarElonRig } from '../three/pixarElonEvents';
import { createPixarStageOrFallback, PixarStage } from '../three/pixarRenderer';
import { createPixarForestAnimal, PixarAnimalHandle, WildlifeKind } from '../three/pixarWildlife';
import { HolidayScene, SceneFrameContext, SceneReactionKind } from './types';

interface ScrollProp {
  group: THREE.Group;
  xOffset: number;
  zPos: number;
  baseY: number;
  cottage?: PixarCottageHandle;
  lamp?: PixarStreetLampHandle;
  pine?: PixarPineHandle;
  animal?: PixarAnimalHandle;
}

interface ParachuteGift {
  group: THREE.Group;
  vy: number;
  vx: number;
  landed: boolean;
  age: number;
  burstDone: boolean;
}

export class WinterExpressScene implements HolidayScene {
  readonly id: SceneId = 'express';
  private stage: PixarStage | null = null;
  private fallbackEl: HTMLElement | null = null;

  private skyMat!: THREE.ShaderMaterial;
  private moon!: THREE.Group;
  private sleigh!: PixarSleighHandle;
  private snowField!: BokehSnowField;
  private elonRig!: PixarElonRig;
  private frozenLake!: THREE.Mesh;
  private roadSign!: HolidayRoadSignHandle;
  private signX = 24;
  private lakeBlend = 0;

  private props: ScrollProp[] = [];
  private mountains: { mesh: THREE.Mesh; x: number; z: number }[] = [];
  private gifts: ParachuteGift[] = [];

  private trailPts!: THREE.Points;
  private trailPos = new Float32Array(110 * 3);
  private trailVec = new THREE.Vector3();

  private burstPts!: THREE.Points;
  private burstPos = new Float32Array(60 * 3);
  private burstVel = new Float32Array(60 * 3);
  private burstLife = new Float32Array(60);

  private sleighAltitude = 3.6;
  private smoothTurn = 0;
  private animalAlert = 0;
  private osmSkyline!: THREE.Group;
  private osmChurchSpire!: THREE.Group;

  mount(container: HTMLElement): void {
    const res = createPixarStageOrFallback(container, {
      fov: 48,
      fogColor: '#091536',
      fogDensity: 0.0055,
      bloomStrength: 0.42,
      bloomRadius: 0.5,
      bloomThreshold: 0.8,
    });
    this.stage = res.stage;
    this.fallbackEl = res.fallbackEl;
    if (!this.stage) return;

    const { scene, camera } = this.stage;
    camera.position.set(1.5, 5.2, 16.5);
    camera.lookAt(2.2, 3.2, 0);

    // 1. Pixar Sky Dome & Glowing Moon
    const sky = createPixarSkyDome(300);
    this.skyMat = sky.material;
    scene.add(sky.mesh);

    this.moon = createPixarMoon(9.5);
    this.moon.position.set(28, 25, -88);
    scene.add(this.moon);

    // 2. Sparkling Snowy Valley Terrain + Winding Road Ribbon
    const snowMat = createSparklingSnowMaterial('#84a2cc');
    const valley = new THREE.Mesh(new THREE.PlaneGeometry(240, 180, 32, 16), snowMat);
    valley.rotation.x = -Math.PI * 0.5;
    valley.position.set(0, 0, -45);
    const posAttr = valley.geometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const hill = vy > 12 ? Math.sin(vx * 0.08) * 1.4 + (vy - 12) * 0.045 : 0;
      posAttr.setZ(i, hill);
    }
    valley.geometry.computeVertexNormals();
    scene.add(valley);

    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(240, 3.8),
      new THREE.MeshStandardMaterial({ color: '#243154', roughness: 0.72 })
    );
    road.rotation.x = -Math.PI * 0.5;
    road.position.set(0, 0.03, -5.2);
    scene.add(road);

    // 3. Distant Snow-Capped Alpine Mountain Ridges
    const mtnMat = createSparklingSnowMaterial('#5876a8');
    for (let i = 0; i < 12; i++) {
      const h = 16 + (i % 3) * 7;
      const r = 13 + (i % 4) * 3;
      const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 7), mtnMat);
      const mx = -75 + i * 14.5;
      const mz = -56 - (i % 2) * 12;
      cone.position.set(mx, h * 0.45, mz);
      scene.add(cone);
      this.mountains.push({ mesh: cone, x: mx, z: mz });
    }

    // 4. Recycled Storybook 3D Village Props (Cottages, Pixar Pines, Victorian Lamps, Snowmen)
    const span = 128;
    const slotCount = 16;
    for (let i = 0; i < slotCount; i++) {
      const x = -span * 0.5 + (i / slotCount) * span;
      if (i % 4 === 0) {
        const cot = createPixarCottage(i);
        cot.setLit(1);
        cot.group.position.set(x, 0, -10.5);
        scene.add(cot.group);
        this.props.push({ group: cot.group, xOffset: x, zPos: -10.5, baseY: 0, cottage: cot });

        const lamp = createPixarStreetLamp();
        lamp.setLit(1);
        lamp.group.position.set(x + 3.6, 0, -7.2);
        scene.add(lamp.group);
        this.props.push({ group: lamp.group, xOffset: x + 3.6, zPos: -7.2, baseY: 0, lamp });
      } else {
        const pine = createPixarPineTree(i % 2 === 0, i);
        const s = 0.85 + (i % 3) * 0.28;
        const pz = -9.5 - (i % 3) * 4.5;
        pine.group.scale.setScalar(s);
        pine.group.position.set(x, 0, pz);
        pine.setLit(1);
        scene.add(pine.group);
        this.props.push({ group: pine.group, xOffset: x, zPos: pz, baseY: 0, pine });

        if (i % 5 === 2) {
          const snowman = createPixarSnowman();
          snowman.position.set(x + 2.0, 0, -2.5);
          snowman.rotation.y = 0.3;
          scene.add(snowman);
          this.props.push({ group: snowman, xOffset: x + 2.0, zPos: -2.5, baseY: 0 });
        }
      }
    }

    // 4b. Animated Pixar Forest Wildlife roaming snowy clearings alongside highway
    const faunaOrder: WildlifeKind[] = ['stag', 'fox', 'owl', 'rabbit', 'stag'];
    faunaOrder.forEach((kind, fIdx) => {
      const anim = createPixarForestAnimal(kind, fIdx + 3);
      const ax = -span * 0.4 + fIdx * 24;
      const az = kind === 'rabbit' || kind === 'fox' ? -3.0 : -8.5;
      anim.group.scale.setScalar(kind === 'stag' ? 1.1 : 1.25);
      anim.group.position.set(ax, 0, az);
      anim.group.rotation.y = az < -5 ? 0.35 : -0.4;
      scene.add(anim.group);
      this.props.push({ group: anim.group, xOffset: ax, zPos: az, baseY: 0, animal: anim });
    });

    // 4c. Distant OSM Neighborhood & Church Spire Skyline Silhouette
    this.osmSkyline = new THREE.Group();
    const skyWallMat = new THREE.MeshStandardMaterial({
      color: '#202c4e',
      emissive: '#ffb85c',
      emissiveIntensity: 0.55,
      roughness: 0.6,
    });
    const spireRoofMat = new THREE.MeshStandardMaterial({ color: '#1b2844', roughness: 0.55 });
    for (let i = 0; i < 8; i++) {
      const bh = 5.5 + (i % 3) * 3.2;
      const blk = new THREE.Mesh(new THREE.BoxGeometry(5.2, bh, 4.5), skyWallMat);
      blk.position.set(-28 + i * 8, bh * 0.5, -36);
      this.osmSkyline.add(blk);
    }
    this.osmChurchSpire = new THREE.Group();
    const tower = new THREE.Mesh(new THREE.BoxGeometry(3.8, 12, 3.8), skyWallMat);
    tower.position.y = 6;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(2.4, 8.5, 6), spireRoofMat);
    cone.position.y = 16.2;
    this.osmChurchSpire.add(tower, cone);
    this.osmChurchSpire.position.set(10, 0, -34);
    this.osmSkyline.add(this.osmChurchSpire);
    scene.add(this.osmSkyline);

    // 5. Hero 3D Pixar Santa Sleigh + Articulated Reindeer flying left-to-right!
    this.sleigh = createPixarSantaSleigh();
    this.sleigh.group.rotation.y = -Math.PI * 0.56;
    this.sleigh.group.position.set(-1.5, 3.6, 1.5);
    scene.add(this.sleigh.group);

    // 6. Blooming 3D Golden Pixie-Dust Ribbon Trail behind Sleigh
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(this.trailPos, 3));
    const trailMat = new THREE.PointsMaterial({
      map: getStarSpriteTexture(),
      color: '#ffe078',
      size: 0.72,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.trailPts = new THREE.Points(trailGeo, trailMat);
    scene.add(this.trailPts);

    const burstGeo = new THREE.BufferGeometry();
    burstGeo.setAttribute('position', new THREE.BufferAttribute(this.burstPos, 3));
    const burstMat = new THREE.PointsMaterial({
      map: getSoftGlowTexture(),
      color: '#ffd978',
      size: 0.65,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.burstPts = new THREE.Points(burstGeo, burstMat);
    scene.add(this.burstPts);

    // 7. Dreamy Bokeh Snowfall
    this.snowField = createBokehSnowField(520, {
      minX: -32,
      maxX: 32,
      minY: 0,
      maxY: 22,
      minZ: -28,
      maxZ: 20,
    });
    scene.add(this.snowField.group);

    // 8. 3D Elon Easter Eggs
    this.elonRig = new PixarElonRig();
    scene.add(this.elonRig.group);

    // 9. OSM Dynamic Frozen Lake & Live 3D North Pole Road Signpost
    this.frozenLake = createFrozenLakePlane(220, 48);
    this.frozenLake.position.set(0, 0.04, -30);
    scene.add(this.frozenLake);

    this.roadSign = createHolidayRoadSign();
    this.roadSign.group.position.set(this.signX, 0, -2.8);
    this.roadSign.group.rotation.y = -0.25;
    scene.add(this.roadSign.group);
  }

  triggerReaction(kind: SceneReactionKind): void {
    this.animalAlert = 1.0;
    this.sleigh?.triggerReaction(kind);
  }

  resize(width: number, height: number): void {
    this.stage?.resize(width, height);
  }

  interact(): void {
    if (!this.stage) return;
    const giftGroup = new THREE.Group();

    const colors = ['#d91632', '#207a4c', '#e6a825'];
    const col = colors[this.gifts.length % colors.length];
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.65, 0.65),
      new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.3, clearcoat: 0.65 })
    );
    const rib = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.7, 0.14),
      new THREE.MeshStandardMaterial({ color: '#ffd166', metalness: 0.7, roughness: 0.25 })
    );
    const rib2 = rib.clone();
    rib2.rotation.y = Math.PI * 0.5;
    giftGroup.add(box, rib, rib2);

    const chute = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5),
      new THREE.MeshStandardMaterial({ color: '#fff8ec', side: THREE.DoubleSide, roughness: 0.6 })
    );
    chute.position.y = 1.05;
    giftGroup.add(chute);

    const giftGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: getSoftGlowTexture(),
        color: '#ffd670',
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    giftGlow.scale.set(2.8, 2.8, 1);
    giftGroup.add(giftGlow);

    giftGroup.position.copy(this.sleigh.group.position).add(new THREE.Vector3(-0.6, -0.3, 0));
    this.stage.scene.add(giftGroup);
    this.gifts.push({ group: giftGroup, vy: -1.8, vx: -1.2, landed: false, age: 0, burstDone: false });
    this.sleigh.triggerReaction('gift');
  }

  update(dt: number, frame: SceneFrameContext): void {
    if (!this.stage) return;
    const { telemetry, env, elonEvent, osm } = frame;
    const time = telemetry.elapsedSec;
    const speedNorm = Math.min(1, telemetry.speedKmh / 110);

    this.stage.setQuality(env.quality);
    this.smoothTurn += (telemetry.turnRate - this.smoothTurn) * Math.min(1, dt * 4);

    this.animalAlert = Math.max(0, this.animalAlert - dt * 0.55);
    const alert = Math.max(osm.landmarkPulse, this.animalAlert);

    // OSM biome & cityscape visual response
    const hasWater = osm.enabled && (osm.biome === 'water' || osm.waterCount > 0);
    const targetLake = hasWater ? 0.92 : 0;
    this.lakeBlend += (targetLake - this.lakeBlend) * Math.min(1, dt * 1.6);
    const lakeMat = this.frozenLake.material as THREE.MeshPhysicalMaterial;
    lakeMat.opacity = this.lakeBlend;
    this.frozenLake.visible = this.lakeBlend > 0.02;

    this.osmSkyline.visible = osm.enabled && osm.buildingCount > 0;
    if (this.osmSkyline.visible) {
      const hasChurch = osm.snapshot.buildings.some((b) => b.kind === 'church');
      this.osmChurchSpire.visible = hasChurch;
      this.osmSkyline.position.x = -((osm.demoTravelM * 0.25) % 24);
    }

    this.roadSign.group.visible = osm.enabled;
    this.roadSign.setText(
      `GOD JUL, ${osm.placeName.toUpperCase()}`,
      osm.nearbyLandmark || osm.nearbyChargerName || osm.roadName
    );

    const biomeAurora = osm.enabled
      ? osm.biome === 'forest'
        ? 0.35
        : osm.biome === 'water'
          ? 0.25
          : 0
      : 0;
    this.skyMat.uniforms.uTime.value = time;
    this.skyMat.uniforms.uAuroraBoost.value =
      (telemetry.isPlaidSpeed ? 1.65 : 1.0 + speedNorm * 0.3) + biomeAurora;
    this.skyMat.uniforms.uTopColor.value.set(env.skyTopColor);
    this.skyMat.uniforms.uMidColor.value.set(env.skyMidColor);
    this.skyMat.uniforms.uHorizonColor.value.set(env.skyHorizonColor);

    const worldSpeed = (telemetry.speedKmh / 3.6) * 0.72;
    this.signX -= worldSpeed * dt;
    if (this.signX < -58) this.signX = 58;
    this.roadSign.group.position.x = this.signX;

    const span = 128;
    for (const p of this.props) {
      p.xOffset -= worldSpeed * dt;
      if (p.xOffset < -span * 0.5) p.xOffset += span;
      p.group.position.x = p.xOffset;
      p.cottage?.update(dt, time);
      p.animal?.update(dt, time, alert);
      if (p.pine) {
        const forestBoost = osm.enabled && (osm.biome === 'forest' || osm.forestCount > 2) ? 1.24 : 1.0;
        p.pine.group.scale.y = THREE.MathUtils.lerp(p.pine.group.scale.y, forestBoost, Math.min(1, dt * 2));
      }
    }

    const mSpan = 174;
    for (const m of this.mountains) {
      m.x -= worldSpeed * 0.16 * dt;
      if (m.x < -mSpan * 0.5) m.x += mSpan;
      m.mesh.position.x = m.x;
    }

    const targetAlt = (telemetry.speedKmh < 3 ? 2.15 : 3.4 + speedNorm * 4.2) + Math.sin(time * 1.9) * 0.25;
    this.sleighAltitude += (targetAlt - this.sleighAltitude) * Math.min(1, dt * 3.5);
    this.sleigh.group.position.set(
      -1.2 + telemetry.acceleration * 0.18,
      this.sleighAltitude,
      1.2 - this.smoothTurn * 1.4
    );
    this.sleigh.group.rotation.y = -Math.PI * 0.56 - this.smoothTurn * 0.22;
    this.sleigh.group.rotation.z = telemetry.acceleration * 0.025;
    this.sleigh.update(dt, telemetry.speedKmh, this.smoothTurn, telemetry.acceleration, time);

    const camZ = 14.5 + speedNorm * 4.8;
    const camY = 4.2 + speedNorm * 2.8;
    this.stage.camera.position.x += (1.2 - this.smoothTurn * 2.2 - this.stage.camera.position.x) * Math.min(1, dt * 3);
    this.stage.camera.position.y += (camY - this.stage.camera.position.y) * Math.min(1, dt * 3);
    this.stage.camera.position.z += (camZ - this.stage.camera.position.z) * Math.min(1, dt * 3);
    this.stage.camera.lookAt(1.8, this.sleighAltitude - 0.5, -2.5);

    this.sleigh.getTrailOrigin(this.trailVec);
    for (let i = 109; i > 0; i--) {
      this.trailPos[i * 3] = this.trailPos[(i - 1) * 3] - (2.4 + worldSpeed * 0.9) * dt;
      this.trailPos[i * 3 + 1] = this.trailPos[(i - 1) * 3 + 1] + (Math.random() - 0.5) * 0.04;
      this.trailPos[i * 3 + 2] = this.trailPos[(i - 1) * 3 + 2];
    }
    this.trailPos[0] = this.trailVec.x + (Math.random() - 0.5) * 0.35;
    this.trailPos[1] = this.trailVec.y + (Math.random() - 0.5) * 0.25;
    this.trailPos[2] = this.trailVec.z + (Math.random() - 0.5) * 0.35;
    this.trailPts.geometry.attributes.position.needsUpdate = true;

    for (let i = this.gifts.length - 1; i >= 0; i--) {
      const g = this.gifts[i];
      g.age += dt;
      if (!g.landed) {
        g.group.position.x += (g.vx - worldSpeed * 0.4) * dt;
        g.group.position.y += g.vy * dt;
        g.group.rotation.z = Math.sin(g.age * 4) * 0.22;
        if (g.group.position.y <= 0.4) {
          g.group.position.y = 0.4;
          g.landed = true;
          if (g.group.children[3]) g.group.children[3].visible = false;
          if (!g.burstDone) {
            g.burstDone = true;
            for (let b = 0; b < 60; b++) {
              this.burstPos[b * 3] = g.group.position.x;
              this.burstPos[b * 3 + 1] = 0.5;
              this.burstPos[b * 3 + 2] = g.group.position.z;
              const ang = Math.random() * Math.PI * 2;
              const spd = 2 + Math.random() * 5;
              this.burstVel[b * 3] = Math.cos(ang) * spd;
              this.burstVel[b * 3 + 1] = 2.5 + Math.random() * 4.5;
              this.burstVel[b * 3 + 2] = Math.sin(ang) * spd;
              this.burstLife[b] = 1.0;
            }
          }
        }
      } else {
        g.group.position.x -= worldSpeed * dt;
      }
      if (g.group.position.x < -64 || g.age > 14) {
        this.stage.scene.remove(g.group);
        this.gifts.splice(i, 1);
      }
    }

    for (let b = 0; b < 60; b++) {
      if (this.burstLife[b] > 0) {
        this.burstLife[b] -= dt * 0.85;
        this.burstPos[b * 3] += (this.burstVel[b * 3] - worldSpeed * 0.5) * dt;
        this.burstPos[b * 3 + 1] += this.burstVel[b * 3 + 1] * dt;
        this.burstPos[b * 3 + 2] += this.burstVel[b * 3 + 2] * dt;
        this.burstVel[b * 3 + 1] -= 6.5 * dt;
        if (this.burstPos[b * 3 + 1] < 0) this.burstPos[b * 3 + 1] = -99;
      } else {
        this.burstPos[b * 3 + 1] = -99;
      }
    }
    this.burstPts.geometry.attributes.position.needsUpdate = true;

    this.snowField.update(dt, -(1.2 + speedNorm * 11), 0.3, 2.2 + speedNorm * 1.4);

    this.elonRig.update(elonEvent, dt, time, {
      moonPos: this.moon.position,
      starshipOrigin: new THREE.Vector3(22, 6, -42),
      starshipScale: 1.4,
      starlinkZ: -85,
      cybertruckYaw: -Math.PI * 0.5,
      roadPointAt: (p, _sideOffset, out) => out.set(-34 + p * 68, 0, -5.2),
    });

    this.stage.render();
  }

  dispose(): void {
    if (this.fallbackEl) {
      this.fallbackEl.remove();
      this.fallbackEl = null;
    }
    if (this.stage) {
      this.stage.dispose();
      this.stage = null;
    }
  }
}
