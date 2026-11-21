import * as THREE from 'three';
import { i18n, SceneId } from '../core/i18n';
import {
  createPixarSkyDome,
  createSparklingSnowMaterial,
  getSnowflakeTexture,
  getSoftGlowTexture,
} from '../three/pixarMaterials';
import {
  createPixarCottage,
  createPixarPineTree,
  createPixarSantaSleigh,
  PixarCottageHandle,
  PixarSleighHandle,
} from '../three/pixarModels';
import { createPixarStageOrFallback, PixarStage } from '../three/pixarRenderer';
import { HolidayScene, SceneFrameContext } from './types';

interface GlobeFlake3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  settled: boolean;
}

const FLAKE_COUNT = 620;
const DOME_RADIUS = 2.65;
const DOME_CENTER_Y = 1.35;
const INNER_LIMIT = 2.42;

function createPlaqueTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#20150d';
  ctx.fillRect(0, 0, 512, 128);
  ctx.strokeStyle = '#f6cf78';
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 496, 112);

  ctx.fillStyle = '#ffe099';
  ctx.font = '700 36px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 66);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class SnowglobeScene implements HolidayScene {
  readonly id: SceneId = 'snowglobe';
  private stage: PixarStage | null = null;
  private fallbackEl: HTMLElement | null = null;

  private hudCanvas: HTMLCanvasElement | null = null;
  private hudCtx: CanvasRenderingContext2D | null = null;
  private width = 1280;
  private height = 720;

  private skyMat!: THREE.ShaderMaterial;
  private globeRoot!: THREE.Group;
  private miniSleigh!: PixarSleighHandle;
  private miniCottages: PixarCottageHandle[] = [];
  private miniStarship!: THREE.Group;
  private miniRoadster!: THREE.Group;

  private flakes: GlobeFlake3D[] = [];
  private snowPts!: THREE.Points;
  private snowPos = new Float32Array(FLAKE_COUNT * 3);
  private goldPts!: THREE.Points;
  private goldPos = new Float32Array(120 * 3);

  private shakeEnergy = 0.25;
  private orbitPhase = 0;
  private smoothNeedleSpeed = 0;
  private smoothCompassAngle = 0;
  private smoothTurn = 0;

  mount(container: HTMLElement): void {
    const res = createPixarStageOrFallback(container, {
      fov: 38,
      bloomStrength: 0.4,
      bloomRadius: 0.48,
      bloomThreshold: 0.8,
    });
    this.stage = res.stage;
    this.fallbackEl = res.fallbackEl;

    if (this.stage) {
      const { scene, camera } = this.stage;
      camera.position.set(0, 1.3, 10.6);
      camera.lookAt(0, 0.95, 0);

      // Calm Pixar Sky Backdrop
      const sky = createPixarSkyDome(180);
      this.skyMat = sky.material;
      scene.add(sky.mesh);

      // Root group for gentle parallax rotation
      this.globeRoot = new THREE.Group();
      scene.add(this.globeRoot);

      this.buildPedestal();
      this.buildDiorama();
      this.buildSnowParticles();
      this.buildGlassSphere();
    }

    // Transparent 2D overlay canvas for the symmetrical vintage Speed & North Pole Compass gauges
    const overlay = document.createElement('canvas');
    overlay.className = 'scene-canvas';
    overlay.style.pointerEvents = 'none';
    container.appendChild(overlay);
    this.hudCanvas = overlay;
    this.hudCtx = overlay.getContext('2d');
    this.resize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
  }

  private buildPedestal(): void {
    const crimsonVelvet = new THREE.MeshPhysicalMaterial({
      color: '#8f0a20',
      roughness: 0.42,
      metalness: 0.2,
      clearcoat: 0.85,
      sheen: 0.7,
      sheenColor: new THREE.Color('#ff5e73'),
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: '#f5cc6c',
      metalness: 0.9,
      roughness: 0.18,
    });

    // Ornate Lathe-sculpted velvet base profile
    const profile = [
      new THREE.Vector2(2.65, -2.5),
      new THREE.Vector2(2.55, -2.25),
      new THREE.Vector2(2.25, -1.9),
      new THREE.Vector2(2.02, -1.45),
      new THREE.Vector2(1.96, -1.1),
      new THREE.Vector2(2.05, -0.95),
    ];
    const base = new THREE.Mesh(new THREE.LatheGeometry(profile, 36), crimsonVelvet);
    this.globeRoot.add(base);

    // Brushed gold collar & bottom trim rings
    const topCollar = new THREE.Mesh(new THREE.TorusGeometry(2.04, 0.11, 14, 42), brassMat);
    topCollar.rotation.x = Math.PI * 0.5;
    topCollar.position.y = -0.94;
    this.globeRoot.add(topCollar);

    const botCollar = new THREE.Mesh(new THREE.TorusGeometry(2.63, 0.09, 12, 42), brassMat);
    botCollar.rotation.x = Math.PI * 0.5;
    botCollar.position.y = -2.48;
    this.globeRoot.add(botCollar);

    // Engraved Gold Plaque "TESLA XMAS EDITION"
    const plaqueMat = new THREE.MeshStandardMaterial({
      map: createPlaqueTexture(i18n.t().snowglobeTitle),
      roughness: 0.3,
      metalness: 0.5,
    });
    const plaque = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 0.58), plaqueMat);
    plaque.position.set(0, -1.72, 2.22);
    plaque.rotation.x = -0.22;
    this.globeRoot.add(plaque);
  }

  private buildDiorama(): void {
    const diorama = new THREE.Group();
    diorama.position.y = DOME_CENTER_Y;
    this.globeRoot.add(diorama);

    // Snowy sculpted Alpine base hill inside the bottom of the crystal sphere
    const snowMat = createSparklingSnowMaterial('#e6f2ff');
    const hill = new THREE.Mesh(new THREE.SphereGeometry(2.55, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.42), snowMat);
    hill.scale.set(1, 0.42, 1);
    hill.position.y = -2.05;
    diorama.add(hill);

    const floorY = -1.12;

    // 2 Miniature Glowing Pixar Cottages
    const cot1 = createPixarCottage(1);
    cot1.group.scale.setScalar(0.24);
    cot1.group.position.set(-0.92, floorY, 0.35);
    cot1.group.rotation.y = 0.45;
    cot1.setLit(1);
    diorama.add(cot1.group);
    this.miniCottages.push(cot1);

    const cot2 = createPixarCottage(4);
    cot2.group.scale.setScalar(0.22);
    cot2.group.position.set(0.95, floorY, -0.25);
    cot2.group.rotation.y = -0.55;
    cot2.setLit(1);
    diorama.add(cot2.group);
    this.miniCottages.push(cot2);

    // Centerpiece Glowing Pixar Christmas Tree
    const centerTree = createPixarPineTree(true, 2.5);
    centerTree.group.scale.setScalar(0.28);
    centerTree.group.position.set(0, floorY, -0.2);
    centerTree.setLit(1);
    diorama.add(centerTree.group);

    // Side mini pines
    const pineOffsets: [number, number, number][] = [
      [-1.55, -0.45, 0.16],
      [1.52, 0.45, 0.17],
      [-0.45, -1.25, 0.18],
      [0.45, 1.15, 0.15],
    ];
    pineOffsets.forEach(([px, pz, sc], idx) => {
      const p = createPixarPineTree(idx % 2 === 0, idx);
      p.group.scale.setScalar(sc);
      p.group.position.set(px, floorY, pz);
      p.setLit(1);
      diorama.add(p.group);
    });

    // Tiny Glowing Red-and-White Supercharger Stalls
    const scMat = new THREE.MeshPhysicalMaterial({ color: '#d91632', clearcoat: 0.8 });
    const glowMat = new THREE.MeshBasicMaterial({ color: '#fff3f3', toneMapped: false });
    for (const sx of [0.35, 0.56]) {
      const stall = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.28, 0.06), scMat);
      stall.position.set(sx, floorY + 0.14, 0.72);
      const inner = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.07), glowMat);
      inner.position.set(sx, floorY + 0.15, 0.72);
      diorama.add(stall, inner);
    }

    // Mini Starship Launchpad (animates during starship Elon event!)
    this.miniStarship = new THREE.Group();
    const rocket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 0.45, 10),
      new THREE.MeshStandardMaterial({ color: '#dce6f5', metalness: 0.8, roughness: 0.2 })
    );
    const plume = new THREE.Mesh(
      new THREE.ConeGeometry(0.11, 0.35, 8),
      new THREE.MeshBasicMaterial({ color: '#ffbd55', toneMapped: false })
    );
    plume.rotation.x = Math.PI;
    plume.position.y = -0.38;
    this.miniStarship.add(rocket, plume);
    this.miniStarship.visible = false;
    diorama.add(this.miniStarship);

    // Mini Starman Roadster (animates during starman Elon event!)
    this.miniRoadster = new THREE.Group();
    const rd = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.06, 0.18, 4, 8),
      new THREE.MeshPhysicalMaterial({ color: '#d91632', clearcoat: 1 })
    );
    rd.rotation.z = Math.PI * 0.5;
    this.miniRoadster.add(rd);
    this.miniRoadster.visible = false;
    diorama.add(this.miniRoadster);

    // Miniature Orbiting 3D Pixar Santa Sleigh!
    this.miniSleigh = createPixarSantaSleigh();
    this.miniSleigh.group.scale.setScalar(0.155);
    diorama.add(this.miniSleigh.group);
  }

  private buildSnowParticles(): void {
    for (let i = 0; i < FLAKE_COUNT; i++) {
      // Uniform inside 3D sphere of radius INNER_LIMIT
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      const r = Math.cbrt(Math.random()) * INNER_LIMIT * 0.92;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      this.flakes.push({ x, y, z, vx: 0, vy: -0.2, vz: 0, settled: false });
      this.snowPos[i * 3] = x;
      this.snowPos[i * 3 + 1] = y + DOME_CENTER_Y;
      this.snowPos[i * 3 + 2] = z;
    }

    const snowGeo = new THREE.BufferGeometry();
    snowGeo.setAttribute('position', new THREE.BufferAttribute(this.snowPos, 3));
    const snowMat = new THREE.PointsMaterial({
      map: getSnowflakeTexture(),
      color: '#f2f8ff',
      size: 0.12,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.snowPts = new THREE.Points(snowGeo, snowMat);
    this.globeRoot.add(this.snowPts);

    // Golden Glitter Motes subset (120 shimmering flakes)
    const goldGeo = new THREE.BufferGeometry();
    goldGeo.setAttribute('position', new THREE.BufferAttribute(this.goldPos, 3));
    const goldMat = new THREE.PointsMaterial({
      map: getSoftGlowTexture(),
      color: '#ffe078',
      size: 0.16,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.goldPts = new THREE.Points(goldGeo, goldMat);
    this.globeRoot.add(this.goldPts);
  }

  private buildGlassSphere(): void {
    // True Physical Crystal Glass Dome with PMREM Reflections!
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#e6f3ff',
      transparent: true,
      opacity: 0.2,
      roughness: 0.04,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      ior: 1.48,
      reflectivity: 0.96,
      depthWrite: false,
    });
    const glassSphere = new THREE.Mesh(new THREE.SphereGeometry(DOME_RADIUS, 40, 32), glassMat);
    glassSphere.position.y = DOME_CENTER_Y;
    this.globeRoot.add(glassSphere);

    // Subtle Rim Glow Halo Sprite around crystal dome
    const rimHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: getSoftGlowTexture(),
        color: '#9ecbff',
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    rimHalo.scale.set(DOME_RADIUS * 2.8, DOME_RADIUS * 2.8, 1);
    rimHalo.position.y = DOME_CENTER_Y;
    this.globeRoot.add(rimHalo);
  }

  resize(width: number, height: number): void {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    this.stage?.resize(this.width, this.height);

    if (this.hudCanvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.hudCanvas.width = Math.floor(this.width * dpr);
      this.hudCanvas.height = Math.floor(this.height * dpr);
      this.hudCtx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  interact(): void {
    // Joyful "Shake the Snowglobe!" 3D orbital vortex impulse
    this.shakeEnergy = 2.6;
    for (const f of this.flakes) {
      f.settled = false;
      const ang = Math.atan2(f.z, f.x) + Math.PI * 0.5;
      const push = 1.4 + Math.random() * 1.8;
      f.vx += Math.cos(ang) * push + (Math.random() - 0.5) * 0.9;
      f.vz += Math.sin(ang) * push + (Math.random() - 0.5) * 0.9;
      f.vy += 1.2 + Math.random() * 1.8;
    }
  }

  update(dt: number, frame: SceneFrameContext): void {
    const { telemetry, env, elonEvent } = frame;
    const t = i18n.t();
    const time = telemetry.elapsedSec;
    const speedNorm = Math.min(1, telemetry.speedKmh / 120);

    if (this.stage) {
      this.stage.setQuality(env.quality);
      this.skyMat.uniforms.uTime.value = time;
      this.skyMat.uniforms.uAuroraBoost.value = 0.85;
      this.skyMat.uniforms.uTopColor.value.set(env.skyTopColor);
      this.skyMat.uniforms.uMidColor.value.set(env.skyMidColor);
      this.skyMat.uniforms.uHorizonColor.value.set(env.skyHorizonColor);

      const isNarrow = this.width < 820;
      this.smoothTurn += (telemetry.turnRate - this.smoothTurn) * Math.min(1, dt * 4);
      this.globeRoot.position.y = isNarrow ? 1.15 : 0;
      const globeScale = isNarrow ? 0.76 : 1.0;
      this.globeRoot.scale.setScalar(globeScale);
      this.globeRoot.rotation.y = this.smoothTurn * 0.24 + Math.sin(time * 0.25) * 0.06;
      this.globeRoot.rotation.z = -this.smoothTurn * 0.06;

      // Update mini diorama cottages & orbiting Santa sleigh
      for (const c of this.miniCottages) c.update(dt, time);

      this.orbitPhase += (0.7 + speedNorm * 2.1) * dt;
      const orbitR = 1.18;
      const orbitY = -0.15 + speedNorm * 0.65 + Math.sin(this.orbitPhase * 2) * 0.12;
      this.miniSleigh.group.position.set(
        Math.cos(this.orbitPhase) * orbitR,
        orbitY,
        Math.sin(this.orbitPhase) * orbitR
      );
      this.miniSleigh.group.rotation.y = -this.orbitPhase;
      this.miniSleigh.group.rotation.z = -0.14 - speedNorm * 0.15;
      this.miniSleigh.update(dt, telemetry.speedKmh, telemetry.turnRate, telemetry.acceleration, time);

      // Mini Elon surprises inside dome!
      this.miniStarship.visible = elonEvent?.type === 'starship';
      if (this.miniStarship.visible && elonEvent) {
        this.miniStarship.position.set(-0.62, -0.95 + elonEvent.progress * 2.2, -0.55);
      }
      this.miniRoadster.visible = elonEvent?.type === 'starman';
      if (this.miniRoadster.visible && elonEvent) {
        const ra = elonEvent.progress * Math.PI * 2;
        this.miniRoadster.position.set(Math.cos(ra) * 1.4, 0.72, Math.sin(ra) * 1.4);
        this.miniRoadster.rotation.y = -ra;
      }

      // 3D Spherical Inertial Physics for Snowflakes inside Crystal Dome!
      this.shakeEnergy = Math.max(0, this.shakeEnergy - dt * 0.85);
      const swirl = telemetry.turnRate * 2.2 + this.shakeEnergy * 2.8;
      const gX = -telemetry.turnRate * 1.6;
      const gZ = telemetry.acceleration * 0.35;

      for (let i = 0; i < FLAKE_COUNT; i++) {
        const f = this.flakes[i];
        const canSettle =
          speedNorm < 0.08 && this.shakeEnergy < 0.12 && Math.abs(telemetry.turnRate) < 0.12;

        if (f.settled && canSettle) {
          if (Math.random() < dt * 0.04) f.settled = false;
        } else {
          f.settled = false;
          const radial = Math.hypot(f.x, f.z) + 0.001;
          const tx = -f.z / radial;
          const tz = f.x / radial;

          f.vx += (gX + tx * swirl * 1.1) * dt;
          f.vz += (gZ + tz * swirl * 1.1) * dt;
          f.vy += (-0.52 + speedNorm * 0.24 + this.shakeEnergy * 0.45) * dt;

          const damp = Math.exp(-dt * 1.3);
          f.vx *= damp;
          f.vy *= damp;
          f.vz *= damp;

          f.x += f.vx * dt;
          f.y += f.vy * dt;
          f.z += f.vz * dt;

          // Floor snow mound collision
          const floorY = -1.06 + Math.cos(f.x * 1.1) * 0.08;
          if (f.y < floorY) {
            if (canSettle) {
              f.y = floorY;
              f.vx = f.vy = f.vz = 0;
              f.settled = true;
            } else {
              f.y = floorY + 0.02;
              f.vy = Math.abs(f.vy) * 0.45 + speedNorm * 0.55;
            }
          }

          // Spherical glass boundary reflection
          const rad = Math.hypot(f.x, f.y, f.z);
          if (rad > INNER_LIMIT) {
            const nx = f.x / rad;
            const ny = f.y / rad;
            const nz = f.z / rad;
            f.x = nx * (INNER_LIMIT - 0.02);
            f.y = ny * (INNER_LIMIT - 0.02);
            f.z = nz * (INNER_LIMIT - 0.02);
            const dot = f.vx * nx + f.vy * ny + f.vz * nz;
            if (dot > 0) {
              f.vx -= 1.45 * dot * nx;
              f.vy -= 1.45 * dot * ny;
              f.vz -= 1.45 * dot * nz;
            }
          }
        }

        this.snowPos[i * 3] = f.x;
        this.snowPos[i * 3 + 1] = f.y + DOME_CENTER_Y;
        this.snowPos[i * 3 + 2] = f.z;
        if (i < 120) {
          this.goldPos[i * 3] = f.x;
          this.goldPos[i * 3 + 1] = f.y + DOME_CENTER_Y;
          this.goldPos[i * 3 + 2] = f.z;
        }
      }

      this.snowPts.geometry.attributes.position.needsUpdate = true;
      this.goldPts.geometry.attributes.position.needsUpdate = true;
      this.stage.render();
    }

    // --- 2D HUD Gauges Overlay (flanking the 3D Snowglobe cleanly!) ---
    if (!this.hudCtx) return;
    const ctx = this.hudCtx;
    const w = this.width;
    const h = this.height;
    ctx.clearRect(0, 0, w, h);

    const isNarrow = w < 820;
    // Matches projected 3D sphere visual footprint so bezels have generous clearance in both wide and narrow views!
    const globeVisualR = isNarrow ? Math.min(w * 0.28, h * 0.2) : Math.min(w * 0.185, h * 0.32);
    const globeCx = w * 0.5;
    const sideSpace = globeCx - globeVisualR;
    const maxLandscapeGaugeR = Math.max(48, (sideSpace - 44) * 0.45);
    const gaugeR = isNarrow
      ? Math.min(w * 0.145, h * 0.095)
      : Math.min(w * 0.13, h * 0.22, maxLandscapeGaugeR);

    const leftGaugeX = isNarrow ? w * 0.21 : globeCx - globeVisualR - (sideSpace - gaugeR * 0.15) * 0.52;
    const rightGaugeX = isNarrow ? w * 0.79 : globeCx + globeVisualR + (sideSpace - gaugeR * 0.15) * 0.52;
    const gaugeY = isNarrow ? h * 0.785 : h * 0.52;

    this.smoothNeedleSpeed += (telemetry.speedKmh - this.smoothNeedleSpeed) * Math.min(1, dt * 8);
    const targetComp = (telemetry.northPoleRelativeBearingDeg * Math.PI) / 180;
    let diff = targetComp - this.smoothCompassAngle;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    this.smoothCompassAngle += diff * Math.min(1, dt * 6);

    this.drawSpeedGauge(
      ctx,
      leftGaugeX,
      gaugeY,
      gaugeR,
      this.smoothNeedleSpeed,
      t.snowglobeSpeedLabel,
      t.reindeerGears[telemetry.reindeerGearKey]
    );
    this.drawCompassGauge(
      ctx,
      rightGaugeX,
      gaugeY,
      gaugeR,
      this.smoothCompassAngle,
      (telemetry.headingDeg * Math.PI) / 180,
      telemetry.northPoleDistanceKm,
      env.temperatureC,
      t.snowglobeCompassLabel,
      t.snowglobeNorthPoleKm,
      elonEvent !== null
    );
  }

  private drawGaugeFrame(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
    const bezel = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    bezel.addColorStop(0, '#f4d17a');
    bezel.addColorStop(0.35, '#8c6528');
    bezel.addColorStop(0.7, '#e7be62');
    bezel.addColorStop(1, '#5d4219');
    ctx.fillStyle = bezel;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 5, 0, Math.PI * 2);
    ctx.fill();

    const dial = ctx.createRadialGradient(cx, cy - r * 0.25, 8, cx, cy, r);
    dial.addColorStop(0, 'rgba(24, 36, 72, 0.94)');
    dial.addColorStop(0.7, 'rgba(11, 18, 41, 0.96)');
    dial.addColorStop(1, 'rgba(6, 10, 24, 0.98)');
    ctx.fillStyle = dial;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(248, 206, 114, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.92, 0, Math.PI * 2);
    ctx.stroke();
  }

  private drawSpeedGauge(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    speedKmh: number,
    label: string,
    gearLabel: string
  ): void {
    ctx.save();
    this.drawGaugeFrame(ctx, cx, cy, r);

    const startAngle = Math.PI * 0.75;
    const sweepAngle = Math.PI * 1.5;
    const maxKmh = 180;

    for (let v = 0; v <= maxKmh; v += 10) {
      const frac = v / maxKmh;
      const ang = startAngle + frac * sweepAngle;
      const isMajor = v % 20 === 0;
      const isPlaidZone = v >= 100;

      const r1 = r * (isMajor ? 0.76 : 0.82);
      const r2 = r * 0.89;
      ctx.strokeStyle = isPlaidZone ? '#ff4757' : isMajor ? '#ffe099' : 'rgba(255, 232, 180, 0.55)';
      ctx.lineWidth = isMajor ? 2.4 : 1.4;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
      ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
      ctx.stroke();

      if (isMajor && r > 68) {
        const tx = cx + Math.cos(ang) * (r * 0.61);
        const ty = cy + Math.sin(ang) * (r * 0.61);
        ctx.fillStyle = isPlaidZone ? '#ff8590' : '#f5e7c8';
        ctx.font = `600 ${Math.max(8, Math.round(r * 0.11))}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(v), tx, ty);
      }
    }

    ctx.fillStyle = 'rgba(255, 224, 150, 0.78)';
    ctx.font = `600 ${Math.max(8, Math.round(r * 0.1))}px "Cinzel", serif`;
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy - r * 0.25);

    ctx.fillStyle = '#fff6e0';
    ctx.font = `700 ${Math.max(18, Math.round(r * 0.29))}px Inter, sans-serif`;
    ctx.fillText(String(Math.round(speedKmh)), cx, cy + r * 0.34);

    ctx.fillStyle = '#e01b3a';
    const badgeW = r * 0.68;
    const badgeH = Math.max(16, r * 0.19);
    ctx.beginPath();
    ctx.roundRect(cx - badgeW * 0.5, cy + r * 0.5, badgeW, badgeH, 6);
    ctx.fill();
    ctx.fillStyle = '#fff5e6';
    ctx.font = `700 ${Math.max(8, Math.round(badgeH * 0.58))}px Inter, sans-serif`;
    ctx.fillText(gearLabel, cx, cy + r * 0.5 + badgeH * 0.54);

    const clamped = Math.min(maxKmh, Math.max(0, speedKmh));
    const needleAng = startAngle + (clamped / maxKmh) * sweepAngle;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(needleAng);
    ctx.fillStyle = '#ff384c';
    ctx.shadowColor = 'rgba(255, 56, 76, 0.85)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(-r * 0.12, -3);
    ctx.lineTo(r * 0.84, 0);
    ctx.lineTo(-r * 0.12, 3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#f8d278';
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(5, r * 0.08), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private drawCompassGauge(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    northPoleRelRad: number,
    headingRad: number,
    northPoleDistKm: number,
    tempC: number,
    label: string,
    kmUnitLabel: string,
    hasElonEvent: boolean
  ): void {
    ctx.save();
    this.drawGaugeFrame(ctx, cx, cy, r);

    const dirs = ['N', 'E', 'S', 'W'];
    for (let i = 0; i < 4; i++) {
      const ang = -Math.PI * 0.5 + i * (Math.PI * 0.5) - headingRad;
      const lx = cx + Math.cos(ang) * (r * 0.74);
      const ly = cy + Math.sin(ang) * (r * 0.74);
      ctx.fillStyle = i === 0 ? '#ff4b5c' : 'rgba(245, 232, 200, 0.78)';
      ctx.font = `700 ${Math.max(9, Math.round(r * 0.13))}px "Cinzel", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(dirs[i], lx, ly);
    }

    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2 - headingRad;
      ctx.strokeStyle = i % 6 === 0 ? '#ffd166' : 'rgba(255, 224, 150, 0.3)';
      ctx.lineWidth = i % 6 === 0 ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * (r * 0.84), cy + Math.sin(ang) * (r * 0.84));
      ctx.lineTo(cx + Math.cos(ang) * (r * 0.9), cy + Math.sin(ang) * (r * 0.9));
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(northPoleRelRad);
    ctx.fillStyle = '#ffd166';
    ctx.shadowColor = 'rgba(255, 210, 100, 0.8)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.58);
    ctx.lineTo(r * 0.08, 0);
    ctx.lineTo(-r * 0.08, 0);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#a8182e';
    ctx.beginPath();
    ctx.moveTo(0, r * 0.42);
    ctx.lineTo(r * 0.07, 0);
    ctx.lineTo(-r * 0.07, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#f8d278';
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(5, r * 0.08), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 224, 150, 0.8)';
    ctx.font = `600 ${Math.max(8, Math.round(r * 0.095))}px "Cinzel", serif`;
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy - r * 0.34);

    ctx.fillStyle = '#fff5dc';
    ctx.font = `700 ${Math.max(12, Math.round(r * 0.16))}px Inter, sans-serif`;
    ctx.fillText(`${Math.round(northPoleDistKm)} km`, cx, cy + r * 0.38);

    ctx.fillStyle = 'rgba(218, 232, 255, 0.72)';
    ctx.font = `500 ${Math.max(8, Math.round(r * 0.095))}px Inter, sans-serif`;
    ctx.fillText(`${kmUnitLabel} · ${tempC}°C`, cx, cy + r * 0.56);

    if (hasElonEvent) {
      ctx.fillStyle = '#ffd166';
      ctx.beginPath();
      ctx.arc(cx, cy - r * 0.48, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  dispose(): void {
    if (this.hudCanvas) {
      this.hudCanvas.remove();
      this.hudCanvas = null;
      this.hudCtx = null;
    }
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
