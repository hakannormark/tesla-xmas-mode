import * as THREE from 'three';

/**
 * 1D Spring-Damper solver for organic Pixar inertia, overshoot, and settle.
 */
export class SpringDamper {
  value: number;
  velocity = 0;
  private stiffness: number;
  private damping: number;

  constructor(initial = 0, stiffness = 120, damping = 14) {
    this.value = initial;
    this.stiffness = stiffness;
    this.damping = damping;
  }

  impulse(dv: number): void {
    this.velocity += dv;
  }

  update(dt: number, target: number): number {
    const safeDt = Math.min(dt, 0.033);
    const force = (target - this.value) * this.stiffness;
    const dampForce = -this.velocity * this.damping;
    this.velocity += (force + dampForce) * safeDt;
    this.value += this.velocity * safeDt;
    return this.value;
  }
}

/**
 * Multi-node spring-verlet chain for realistic flowing cloth/scarf/hat-tail motion.
 */
export class WindChain {
  readonly points: THREE.Vector3[];
  private prevPoints: THREE.Vector3[];
  private segLen: number;
  private phase = 0;

  constructor(nodeCount: number, segLen: number, startPos: THREE.Vector3) {
    this.segLen = segLen;
    this.points = [];
    this.prevPoints = [];
    for (let i = 0; i < nodeCount; i++) {
      const p = startPos.clone().add(new THREE.Vector3(0, -i * segLen * 0.4, i * segLen * 0.9));
      this.points.push(p);
      this.prevPoints.push(p.clone());
    }
  }

  update(dt: number, anchor: THREE.Vector3, wind: THREE.Vector3, gravity = -3.8, time?: number): void {
    const safeDt = Math.min(dt, 0.033);
    const drag = 0.91;
    this.phase += safeDt;
    const t = (time !== undefined ? time : this.phase) * 11.0;
    const windFlutterAmp = 0.25 + wind.length() * 0.08;
    const dtSq14 = safeDt * safeDt * 14;
    const dtSq12 = safeDt * safeDt * 12;

    this.points[0].copy(anchor);
    this.prevPoints[0].copy(anchor);

    for (let i = 1; i < this.points.length; i++) {
      const cur = this.points[i];
      const prev = this.prevPoints[i];
      const vx = (cur.x - prev.x) * drag;
      const vy = (cur.y - prev.y) * drag;
      const vz = (cur.z - prev.z) * drag;
      prev.copy(cur);

      // Flutter turbulence increases along tail length
      const flutter = Math.sin(t + i * 1.4) * windFlutterAmp;
      cur.x += vx + (wind.x + flutter * 0.45) * dtSq14;
      cur.y += vy + (wind.y + gravity + flutter * 0.3) * dtSq12;
      cur.z += vz + wind.z * dtSq14;
    }

    // Distance constraints (3 relaxation iterations keeps chain silky & stretch-free)
    for (let iter = 0; iter < 3; iter++) {
      this.points[0].copy(anchor);
      for (let i = 1; i < this.points.length; i++) {
        const p0 = this.points[i - 1];
        const p1 = this.points[i];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const dz = p1.z - p0.z;
        const dist = Math.hypot(dx, dy, dz) || 0.0001;
        const diff = (dist - this.segLen) / dist;
        if (i === 1) {
          p1.x -= dx * diff;
          p1.y -= dy * diff;
          p1.z -= dz * diff;
        } else {
          p0.x += dx * diff * 0.28;
          p0.y += dy * diff * 0.28;
          p0.z += dz * diff * 0.28;
          p1.x -= dx * diff * 0.72;
          p1.y -= dy * diff * 0.72;
          p1.z -= dz * diff * 0.72;
        }
      }
    }
  }
}

export type MorphDisplacementFn = (x: number, y: number, z: number, out: THREE.Vector3) => void;

/**
 * Generates GPU Morph Targets (Blend Shapes) directly on any Three.js BufferGeometry.
 */
export function addMorphTargets(
  geometry: THREE.BufferGeometry,
  targets: Record<string, MorphDisplacementFn>
): string[] {
  const posAttr = geometry.attributes.position as THREE.BufferAttribute;
  const count = posAttr.count;
  const names = Object.keys(targets);
  const morphPositions: THREE.BufferAttribute[] = [];
  const tempOut = new THREE.Vector3();

  for (const name of names) {
    const fn = targets[name];
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      tempOut.set(x, y, z);
      fn(x, y, z, tempOut);
      array[i * 3] = tempOut.x;
      array[i * 3 + 1] = tempOut.y;
      array[i * 3 + 2] = tempOut.z;
    }
    const attr = new THREE.Float32BufferAttribute(array, 3);
    attr.name = name;
    morphPositions.push(attr);
  }

  geometry.morphAttributes.position = morphPositions;
  return names;
}

export interface ReindeerGaitPose {
  flUpper: number;
  flShin: number;
  frUpper: number;
  frShin: number;
  blUpper: number;
  blShin: number;
  brUpper: number;
  brShin: number;
  bodyY: number;
  bodyPitch: number;
  headPitch: number;
  spineArch: number;
  spineExtend: number;
}

/**
 * Realistic asymmetric 4-beat equine gallop/prance kinematics
 * interpolating smoothly from stationary idle -> prance -> canter -> bounding gallop!
 */
export function evaluateReindeerGait(phase: number, speedNorm: number): ReindeerGaitPose {
  const s = Math.max(0, Math.min(1, speedNorm));
  const moveAmp = 0.1 + s * 0.76;

  // Asymmetric 4-beat gallop offsets: trailing hind -> leading hind -> trailing fore -> leading fore
  const pBL = phase;
  const pBR = phase + 0.42;
  const pFL = phase + 2.35;
  const pFR = phase + 2.75;

  const legCurve = (p: number, amp: number) => {
    const swing = Math.sin(p) * amp;
    // Knee/hock folds sharply when lifting forward (cos > 0), straightens on pushback!
    const lift = Math.max(0, Math.sin(p + 0.9));
    return { upper: swing, shin: lift * (0.25 + s * 1.15) };
  };

  const fl = legCurve(pFL, moveAmp);
  const fr = legCurve(pFR, moveAmp);
  const bl = legCurve(pBL, moveAmp);
  const br = legCurve(pBR, moveAmp);

  // Airborne arc + pitching spine motion
  const gallopWave = Math.sin(phase);
  const gallopCos = Math.cos(phase);
  const bodyY = gallopWave * (0.03 + s * 0.28);
  const bodyPitch = gallopCos * (0.02 + s * 0.19);
  const headPitch = -gallopCos * (0.03 + s * 0.14);

  // Spine arch (gathered legs underneath) vs spine extension (airborne bound)
  const gatherFactor = Math.max(0, -gallopWave) * (0.15 + s * 0.85);
  const extendFactor = Math.max(0, gallopWave) * (0.12 + s * 0.88);

  return {
    flUpper: fl.upper,
    flShin: fl.shin,
    frUpper: fr.upper,
    frShin: fr.shin,
    blUpper: bl.upper,
    blShin: bl.shin,
    brUpper: br.upper,
    brShin: br.shin,
    bodyY,
    bodyPitch,
    headPitch,
    spineArch: gatherFactor,
    spineExtend: extendFactor,
  };
}
