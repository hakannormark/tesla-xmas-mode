import * as THREE from 'three';
import { EnvironmentState } from '../core/environment';
import { LiveWorldState } from '../core/liveWorldData';
import { getSoftGlowTexture, getStarSpriteTexture } from './pixarMaterials';

interface AdventCandleNode {
  root: THREE.Group;
  flame: THREE.Mesh;
  halo: THREE.Sprite;
}

interface FireworkBurst {
  points: THREE.Points;
  pos: Float32Array;
  vel: Float32Array;
  age: number;
  maxAge: number;
  cx: number;
  cy: number;
  cz: number;
}

function drawBadgeTexture(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  topLine: string,
  subLine: string,
  accentHex: string
): void {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(10, 18, 42, 0.86)';
  ctx.beginPath();
  ctx.roundRect(4, 4, w - 8, h - 8, 16);
  ctx.fill();
  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#fff9eb';
  ctx.font = '700 24px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(topLine.slice(0, 26), w * 0.5, h * 0.36, w - 24);

  ctx.fillStyle = accentHex;
  ctx.font = '600 18px Inter, sans-serif';
  ctx.fillText(subLine.slice(0, 32), w * 0.5, h * 0.7, w - 24);
}

export class LiveSkyRig {
  readonly group = new THREE.Group();

  private issGroup: THREE.Group;
  private issTagTex: THREE.CanvasTexture;
  private issTagCtx: CanvasRenderingContext2D;
  private issLastTag = '';

  private adventGroup = new THREE.Group();
  private candles: AdventCandleNode[] = [];

  private luciaGroup = new THREE.Group();
  private luciaZ = -58;

  private spaceXGantry = new THREE.Group();
  private spaceXGantryZ = -118;
  private spaceXTex: THREE.CanvasTexture;
  private spaceXCtx: CanvasRenderingContext2D;
  private spaceXLastText = '';
  private spaceXMiniRocket: THREE.Group;

  private fireworkBursts: FireworkBurst[] = [];
  private fireworksGroup = new THREE.Group();

  private meteors: Array<{
    group: THREE.Group;
    wishRing: THREE.Sprite;
    age: number;
    cooldown: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    wishBurstAge: number;
  }> = [];

  constructor() {
    // 1. Live Overhead Flight Patrol Slots (up to 3)
    const glowTex = getSoftGlowTexture();
    const starTex = getStarSpriteTexture();
    // 2. Live ISS with Red Santa Hat!
    this.issGroup = new THREE.Group();
    const goldSolarMat = new THREE.MeshStandardMaterial({
      color: '#e5a93c',
      metalness: 0.72,
      roughness: 0.28,
      emissive: '#4d3206',
      emissiveIntensity: 0.6,
      fog: false,
    });
    const trussMat = new THREE.MeshStandardMaterial({
      color: '#dce6f5',
      metalness: 0.75,
      roughness: 0.3,
      fog: false,
    });
    const truss = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.22, 0.22), trussMat);
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 2.4, 10), trussMat);
    core.rotation.x = Math.PI * 0.5;
    this.issGroup.add(truss, core);

    for (const wx of [-2.5, -1.65, 1.65, 2.5]) {
      for (const side of [-1, 1]) {
        const panel = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.05, 2.2), goldSolarMat);
        panel.position.set(wx, 0, side * 1.45);
        this.issGroup.add(panel);
      }
    }
    // Red Santa hat sitting on ISS core module!
    const hatMat = new THREE.MeshBasicMaterial({ color: '#e61938', toneMapped: false, fog: false });
    const whiteMat = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false, fog: false });
    const issHat = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.95, 10), hatMat);
    issHat.position.set(0, 0.9, 0);
    issHat.rotation.z = -0.2;
    const issTrim = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.1, 6, 12), whiteMat);
    issTrim.rotation.x = Math.PI * 0.5;
    issTrim.position.set(0, 0.48, 0);
    this.issGroup.add(issHat, issTrim);

    const ic = document.createElement('canvas');
    ic.width = 384;
    ic.height = 96;
    this.issTagCtx = ic.getContext('2d')!;
    this.issTagTex = new THREE.CanvasTexture(ic);
    this.issTagTex.colorSpace = THREE.SRGBColorSpace;
    const issTag = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.issTagTex,
        transparent: true,
        fog: false,
        depthWrite: false,
      })
    );
    issTag.scale.set(12.5, 3.1, 1);
    issTag.position.set(0, 2.9, 0);
    this.issGroup.add(issTag);
    this.issGroup.visible = false;
    this.group.add(this.issGroup);

    // 3. 4 Towering Alpine Advent Candles along distant mountain skyline
    const waxMat = new THREE.MeshStandardMaterial({
      color: '#fff5df',
      roughness: 0.45,
      emissive: '#381e06',
      emissiveIntensity: 0.35,
      fog: false,
    });
    const collarMat = new THREE.MeshStandardMaterial({ color: '#8f1224', roughness: 0.5, fog: false });
    const flameMat = new THREE.MeshBasicMaterial({ color: '#ffcf5c', toneMapped: false, fog: false });

    const candleXs = [-48, -19, 19, 48];
    for (let i = 0; i < 4; i++) {
      const root = new THREE.Group();
      root.position.set(candleXs[i], 14, -160);
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.25, 14, 12), waxMat);
      pillar.position.y = 7;
      const band = new THREE.Mesh(new THREE.CylinderGeometry(1.28, 1.28, 2.2, 12), collarMat);
      band.position.y = 1.6;
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.85, 3.4, 10), flameMat);
      flame.position.y = 16.0;
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: '#ffd26a',
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      );
      halo.scale.set(16, 16, 1);
      halo.position.y = 16.0;
      root.add(pillar, band, flame, halo);
      this.adventGroup.add(root);
      this.candles.push({ root, flame, halo });
    }
    this.adventGroup.visible = false;
    this.group.add(this.adventGroup);

    // 4. Dec 13 3D Luciatåg Procession (Lucia + 4 attendants holding candle wands)
    const robeMat = new THREE.MeshStandardMaterial({ color: '#f7faff', roughness: 0.65 });
    const sashMat = new THREE.MeshStandardMaterial({ color: '#cf1530', roughness: 0.5 });
    const goldCrownMat = new THREE.MeshBasicMaterial({ color: '#ffd866', toneMapped: false });
    const skinMat = new THREE.MeshStandardMaterial({ color: '#ffd9be', roughness: 0.65 });

    for (let i = 0; i < 5; i++) {
      const fig = new THREE.Group();
      fig.position.set((i % 2 === 0 ? -0.4 : 0.4), 0, i * 1.9);
      const robe = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.55, 10), robeMat);
      robe.position.y = 0.78;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), skinMat);
      head.position.y = 1.72;
      fig.add(robe, head);

      if (i === 0) {
        // Lucia crimson waist ribbon & 5-candle golden crown!
        const sash = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.29, 0.18, 10), sashMat);
        sash.position.y = 0.98;
        const crown = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 6, 12), goldCrownMat);
        crown.rotation.x = Math.PI * 0.5;
        crown.position.y = 1.92;
        fig.add(sash, crown);
        for (let f = 0; f < 5; f++) {
          const a = (f / 5) * Math.PI * 2;
          const candle = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 6), flameMat);
          candle.position.set(Math.cos(a) * 0.21, 2.04, Math.sin(a) * 0.21);
          fig.add(candle);
        }
      } else {
        // Hand-held star candle wand
        const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.36, 6), whiteMat);
        candle.position.set(0.26, 1.25, -0.24);
        const spark = new THREE.Mesh(new THREE.SphereGeometry(0.075, 6, 6), flameMat);
        spark.position.set(0.26, 1.46, -0.24);
        fig.add(candle, spark);
      }

      const softLight = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: '#ffdb8a',
          transparent: true,
          opacity: 0.45,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      softLight.scale.set(2.4, 2.4, 1);
      softLight.position.y = 1.7;
      fig.add(softLight);
      this.luciaGroup.add(fig);
    }
    this.luciaGroup.visible = false;
    this.group.add(this.luciaGroup);

    // 5. Dec 24 Julafton Alpine Fireworks Pool (3 colorful bursts)
    const fwColors = ['#ffd966', '#ff4769', '#56f5b8'];
    for (let b = 0; b < 3; b++) {
      const count = 42;
      const pos = new Float32Array(count * 3);
      const vel = new Float32Array(count * 3);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(
        geo,
        new THREE.PointsMaterial({
          map: starTex,
          color: fwColors[b],
          size: 2.6,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      );
      pts.frustumCulled = false;
      this.fireworksGroup.add(pts);
      const burst: FireworkBurst = {
        points: pts,
        pos,
        vel,
        age: -b * 0.85,
        maxAge: 2.2,
        cx: (b - 1) * 32,
        cy: 30 + (b % 2) * 8,
        cz: -135,
      };
      this.resetFirework(burst);
      this.fireworkBursts.push(burst);
    }
    this.fireworksGroup.visible = false;
    this.group.add(this.fireworksGroup);

    // 5B. 2 Catchable Geminids Shooting Stars Streaking Across the Winter Night Sky
    const tailMat = new THREE.MeshBasicMaterial({
      color: '#ffe9a8',
      transparent: true,
      opacity: 0.9,
      toneMapped: false,
      fog: false,
    });
    for (let m = 0; m < 2; m++) {
      const mg = new THREE.Group();
      const head = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: starTex,
          color: '#fff6cf',
          transparent: true,
          opacity: 0.96,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      );
      head.scale.set(5.2, 5.2, 1);
      const streak = new THREE.Mesh(new THREE.BoxGeometry(16, 0.25, 0.25), tailMat);
      streak.position.set(-7.5, 2.2, 0);
      streak.rotation.z = -0.32;

      const wishRing = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: '#ffe066',
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      );
      wishRing.scale.set(16, 16, 1);
      mg.add(head, streak, wishRing);
      mg.visible = false;
      this.group.add(mg);
      this.meteors.push({
        group: mg,
        wishRing,
        age: 0,
        cooldown: 3.5 + m * 5.2,
        startX: -55 + m * 30,
        startY: 48,
        endX: 25 + m * 25,
        endY: 22,
        wishBurstAge: -1,
      });
    }

    // 6. SpaceX Live Launch Countdown Roadside Gantry
    const postMat = new THREE.MeshStandardMaterial({ color: '#1b2234', metalness: 0.7, roughness: 0.35 });
    for (const px of [-2.4, 2.4]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 6.2, 8), postMat);
      p.position.set(px, 3.1, 0);
      this.spaceXGantry.add(p);
    }
    const sc = document.createElement('canvas');
    sc.width = 512;
    sc.height = 160;
    this.spaceXCtx = sc.getContext('2d')!;
    this.spaceXTex = new THREE.CanvasTexture(sc);
    this.spaceXTex.colorSpace = THREE.SRGBColorSpace;
    const board = new THREE.Mesh(
      new THREE.PlaneGeometry(5.6, 1.75),
      new THREE.MeshBasicMaterial({ map: this.spaceXTex, toneMapped: false, side: THREE.DoubleSide })
    );
    board.position.set(0, 5.1, 0);
    this.spaceXGantry.add(board);

    // Mini SpaceX rocket beside gantry (illuminated when launch is today)
    this.spaceXMiniRocket = new THREE.Group();
    const rBody = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 3.6, 12), trussMat);
    rBody.position.y = 1.8;
    const rNose = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.9, 12), trussMat);
    rNose.position.y = 4.05;
    const rGlow = new THREE.Mesh(
      new THREE.ConeGeometry(0.45, 1.2, 10),
      new THREE.MeshBasicMaterial({ color: '#ffb84d', toneMapped: false })
    );
    rGlow.rotation.x = Math.PI;
    rGlow.position.y = -0.4;
    this.spaceXMiniRocket.add(rBody, rNose, rGlow);
    this.spaceXMiniRocket.position.set(3.2, 0.2, 0.4);
    this.spaceXGantry.add(this.spaceXMiniRocket);

    this.spaceXGantry.rotation.y = -0.35;
    this.spaceXGantry.name = 'SpaceX roadside countdown';
    this.group.add(this.spaceXGantry);
  }

  private resetFirework(b: FireworkBurst): void {
    b.cx = -42 + Math.random() * 84;
    b.cy = 24 + Math.random() * 14;
    b.cz = -132 - Math.random() * 20;
    const count = b.pos.length / 3;
    for (let i = 0; i < count; i++) {
      b.pos[i * 3] = b.cx;
      b.pos[i * 3 + 1] = b.cy;
      b.pos[i * 3 + 2] = b.cz;
      const th = Math.random() * Math.PI * 2;
      const ph = (Math.random() - 0.5) * Math.PI;
      const spd = 6 + Math.random() * 10;
      b.vel[i * 3] = Math.cos(th) * Math.cos(ph) * spd;
      b.vel[i * 3 + 1] = Math.sin(ph) * spd + 3;
      b.vel[i * 3 + 2] = Math.sin(th) * Math.cos(ph) * spd * 0.4;
    }
  }

  update(
    dt: number,
    time: number,
    forwardStep: number,
    env: EnvironmentState,
    live: LiveWorldState,
    getRoadCurveX: (z: number) => number,
    smoothCurve: number,
    showRoadside = true
  ): void {
    // 2. Festive Live ISS Gliding Across Upper Orbit
    this.issGroup.visible = live.issNearby;
    if (this.issGroup.visible) {
      const sweep = ((time * 0.045) % 1) * 150 - 75;
      const altitudeArch = 48 + Math.sin(((sweep + 75) / 150) * Math.PI) * 10;
      this.issGroup.position.set(sweep, altitudeArch, -138);
      this.issGroup.rotation.y = 0.25 + Math.sin(time * 0.4) * 0.1;
      const distText = `🛰 ISS · ${live.issDistanceKm.toLocaleString()} km`;
      const subText = `${live.issVelocityKmh.toLocaleString()} km/h`;
      const key = `${distText}|${subText}`;
      if (this.issLastTag !== key) {
        this.issLastTag = key;
        drawBadgeTexture(this.issTagCtx, 384, 96, distText, subText, '#ffd878');
        this.issTagTex.needsUpdate = true;
      }
    }

    // 3. Advent Candles on Alpine Skyline (1..4)
    const nCandles = env.holidayCalendar.adventCandles;
    this.adventGroup.visible = nCandles > 0;
    if (this.adventGroup.visible) {
      this.adventGroup.position.x = -smoothCurve * 16;
      for (let i = 0; i < 4; i++) {
        const c = this.candles[i];
        const lit = i < nCandles;
        c.flame.visible = lit;
        c.halo.visible = lit;
        if (lit) {
          const flick = 0.92 + Math.sin(time * 9 + i * 1.7) * 0.14;
          c.flame.scale.set(1, flick, 1);
          c.halo.scale.set(14 * flick, 14 * flick, 1);
        }
      }
    }

    // 4. Dec 13 3D Luciatåg along left curve-locked snowbank
    this.luciaGroup.visible = showRoadside && env.holidayCalendar.isLucia;
    if (this.luciaGroup.visible) {
      this.luciaZ += forwardStep * 0.55;
      if (this.luciaZ > 16) this.luciaZ = -138;
      const rx = getRoadCurveX(this.luciaZ);
      const nextRx = getRoadCurveX(this.luciaZ - 5);
      const yaw = Math.atan2(rx - nextRx, 5);
      this.luciaGroup.position.set(rx - 8.6, 0.05, this.luciaZ);
      this.luciaGroup.rotation.y = yaw;
      this.luciaGroup.children.forEach((child, idx) => {
        child.position.y = Math.abs(Math.sin(time * 4.5 + idx * 0.9)) * 0.08;
      });
    }

    // 5. Dec 24 Julafton Fireworks over Mountains
    this.fireworksGroup.visible = env.holidayCalendar.isXmasEve;
    if (this.fireworksGroup.visible) {
      for (const b of this.fireworkBursts) {
        b.age += dt;
        if (b.age > b.maxAge) {
          b.age = 0;
          this.resetFirework(b);
        }
        if (b.age >= 0) {
          b.points.visible = true;
          const cnt = b.pos.length / 3;
          for (let i = 0; i < cnt; i++) {
            b.pos[i * 3] += b.vel[i * 3] * dt;
            b.pos[i * 3 + 1] += b.vel[i * 3 + 1] * dt;
            b.pos[i * 3 + 2] += b.vel[i * 3 + 2] * dt;
            b.vel[i * 3 + 1] -= 4.2 * dt;
          }
          b.points.geometry.attributes.position.needsUpdate = true;
          (b.points.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - b.age / b.maxAge);
        } else {
          b.points.visible = false;
        }
      }
    }

    this.spaceXGantry.visible = showRoadside;
    if (showRoadside) {
      // 6. SpaceX Roadside Launch Countdown Gantry (curve-locked!)
      this.spaceXGantryZ += forwardStep;
      if (this.spaceXGantryZ > 22) this.spaceXGantryZ -= 165;
      const gx = getRoadCurveX(this.spaceXGantryZ);
      const gNext = getRoadCurveX(this.spaceXGantryZ - 5);
      this.spaceXGantry.position.set(gx + 13.5, 0, this.spaceXGantryZ);
      this.spaceXGantry.rotation.y = Math.atan2(gx - gNext, 5) - 0.35;

      this.spaceXMiniRocket.visible = live.nextSpaceXLaunchToday;
      if (this.spaceXMiniRocket.visible) {
        this.spaceXMiniRocket.position.y = 0.25 + Math.abs(Math.sin(time * 2)) * 0.35;
      }

      const sKey = `${live.nextSpaceXCountdown}|${live.nextSpaceXName}`;
      if (this.spaceXLastText !== sKey) {
        this.spaceXLastText = sKey;
        const ctx = this.spaceXCtx;
        ctx.clearRect(0, 0, 512, 160);
        const grad = ctx.createLinearGradient(0, 0, 512, 160);
        grad.addColorStop(0, '#0d193a');
        grad.addColorStop(1, '#290f32');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(6, 6, 500, 148, 18);
        ctx.fill();
        ctx.strokeStyle = '#70e2ff';
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.fillStyle = '#70e2ff';
        ctx.font = '700 22px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`🚀 SPACEX · ${live.nextSpaceXCountdown}`, 256, 52, 470);

        ctx.fillStyle = '#fff8ea';
        ctx.font = '600 24px "Cinzel", Georgia, serif';
        ctx.fillText(live.nextSpaceXName.slice(0, 28), 256, 108, 470);
        this.spaceXTex.needsUpdate = true;
      }

    }

    // 7. Catchable Geminids Shooting Stars (visible in night & dusk)
    const canShowMeteors = env.daylightFactor < 0.65;
    for (const m of this.meteors) {
      if (m.wishBurstAge >= 0) {
        m.wishBurstAge += dt;
        m.group.visible = true;
        const sc = 16 + m.wishBurstAge * 44;
        m.wishRing.scale.set(sc, sc, 1);
        (m.wishRing.material as THREE.SpriteMaterial).opacity = Math.max(0, 1 - m.wishBurstAge / 0.85);
        if (m.wishBurstAge > 0.85) {
          m.wishBurstAge = -1;
          m.group.visible = false;
          m.cooldown = 7.5 + Math.random() * 4.5;
        }
        continue;
      }
      if (!canShowMeteors) {
        m.group.visible = false;
        continue;
      }
      if (m.cooldown > 0) {
        m.cooldown -= dt;
        m.group.visible = false;
        if (m.cooldown <= 0) {
          m.age = 0;
          const dir = Math.random() > 0.5 ? 1 : -1;
          m.startX = -dir * (38 + Math.random() * 26);
          m.startY = 44 + Math.random() * 14;
          m.endX = dir * (28 + Math.random() * 28);
          m.endY = 20 + Math.random() * 10;
        }
      } else {
        m.age += dt;
        const dur = 2.4;
        if (m.age >= dur) {
          m.cooldown = 7.0 + Math.random() * 5.0;
          m.group.visible = false;
        } else {
          const p = m.age / dur;
          m.group.visible = true;
          (m.wishRing.material as THREE.SpriteMaterial).opacity = 0;
          m.group.position.set(
            THREE.MathUtils.lerp(m.startX, m.endX, p),
            THREE.MathUtils.lerp(m.startY, m.endY, p),
            -136
          );
          m.group.scale.y = m.endX > m.startX ? 1 : -1;
        }
      }
    }
  }

  tryCatchShootingStar(): boolean {
    const active = this.meteors.find((m) => m.cooldown <= 0 && m.wishBurstAge < 0 && m.group.visible);
    if (!active) return false;
    active.wishBurstAge = 0;
    return true;
  }

  dispose(): void {
    this.issTagTex.dispose();
    this.spaceXTex.dispose();
    for (const b of this.fireworkBursts) {
      b.points.geometry.dispose();
      (b.points.material as THREE.Material).dispose();
    }
    this.group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        m.geometry?.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mm) => mm.dispose());
        else m.material?.dispose();
      }
    });
  }
}
