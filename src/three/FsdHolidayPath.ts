import * as THREE from 'three';
import type { EnvironmentState } from '../core/environment';
import type { OsmRoadRibbon } from '../core/osmWorld';
import type { TelemetryFrame } from '../core/telemetry';
import { pointAlongStreet } from './mappedRoads';

const SEGMENTS = 28;

export class FsdHolidayPath {
  readonly mesh: THREE.Mesh;
  private readonly geometry: THREE.BufferGeometry;
  private readonly posAttr: THREE.BufferAttribute;
  private readonly material: THREE.ShaderMaterial;
  private readonly centerPts: Array<{ x: number; y: number; z: number }> = Array.from(
    { length: SEGMENTS },
    () => ({ x: 0, y: 0, z: 0 })
  );
  private scroll = 0;
  private enabled = true;

  constructor() {
    const positions = new Float32Array(SEGMENTS * 2 * 3);
    const uvs = new Float32Array(SEGMENTS * 2 * 2);
    const indices: number[] = [];

    for (let i = 0; i < SEGMENTS; i++) {
      const v = i / (SEGMENTS - 1);
      uvs[i * 4] = 0;
      uvs[i * 4 + 1] = v;
      uvs[i * 4 + 2] = 1;
      uvs[i * 4 + 3] = v;
      if (i > 0) {
        const b = i * 2;
        indices.push(b - 2, b - 1, b, b - 1, b + 1, b);
      }
    }

    this.geometry = new THREE.BufferGeometry();
    this.posAttr = new THREE.BufferAttribute(positions, 3);
    this.posAttr.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('position', this.posAttr);
    this.geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    this.geometry.setIndex(indices);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uSpeedNorm: { value: 0 },
        uBraking: { value: 0 },
        uDaylight: { value: 0 },
        uEdgeColor: { value: new THREE.Color('#ffd978') },
        uCoreColor: { value: new THREE.Color('#5ee8ff') },
        uBrakeColor: { value: new THREE.Color('#ff3e55') },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform float uScroll;
        uniform float uSpeedNorm;
        uniform float uBraking;
        uniform float uDaylight;
        uniform vec3 uEdgeColor;
        uniform vec3 uCoreColor;
        uniform vec3 uBrakeColor;
        varying vec2 vUv;

        void main() {
          float across = abs(vUv.x - 0.5);
          float rail = exp(-pow((across - 0.42) * 18.0, 2.0));
          float carpet = (1.0 - smoothstep(0.18, 0.45, across)) * 0.42;

          float chevron = across * 2.0;
          float wave = pow(0.5 + 0.5 * sin((vUv.y * 18.0 - chevron * 2.4) - uScroll * 2.4), 4.0);
          float centerPulse = wave * (1.0 - smoothstep(0.05, 0.36, across));

          float endFade = smoothstep(0.0, 0.12, vUv.y) * (1.0 - smoothstep(0.45, 1.0, vUv.y));
          float brakeZone = (1.0 - smoothstep(0.0, 0.42, vUv.y)) * uBraking;

          vec3 col = mix(uCoreColor, uEdgeColor, smoothstep(0.22, 0.44, across));
          col = mix(col, uBrakeColor, brakeZone * 0.78);
          col += uEdgeColor * centerPulse * (0.45 + uSpeedNorm * 0.35);

          float dayScale = 1.0 - clamp(uDaylight * 0.38, 0.0, 0.38);
          float alpha = (rail * 0.68 + carpet * 0.36 + centerPulse * 0.42) * endFade * dayScale;
          gl_FragColor = vec4(col, alpha * 0.82);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      toneMapped: false,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.mesh.visible = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  update(
    dt: number,
    time: number,
    frame: TelemetryFrame,
    env: EnvironmentState,
    road: OsmRoadRibbon | undefined,
    center: THREE.Vector3,
    heading: number,
    visible: boolean,
    groundAt: (x: number, z: number) => number = () => 0,
    lightShow = 0
  ): void {
    if (!this.enabled || !visible) {
      this.mesh.visible = false;
      return;
    }
    this.mesh.visible = true;

    const speedNorm = Math.min(1, frame.speedKmh / 100);
    const pathLen = 22 + speedNorm * 36;
    const minAhead = 2.0;
    this.scroll += (1.8 + frame.speedKmh * 0.18 + lightShow * 7.5) * dt;

    let lastX = center.x;
    let lastZ = center.z;
    let lastHeading = heading;
    let prevDist = 0;

    for (let i = 0; i < SEGMENTS; i++) {
      const u = i / (SEGMENTS - 1);
      const dist = minAhead + u * pathLen;
      const mapped = road ? pointAlongStreet(road, center, heading, dist) : undefined;
      if (mapped) {
        const laneOff = road && road.widthM >= 5.2 ? Math.min(2.05, road.widthM * 0.24) : 0;
        lastX = mapped.x + Math.cos(mapped.heading) * laneOff;
        lastZ = mapped.z + Math.sin(mapped.heading) * laneOff;
        lastHeading = mapped.heading;
      } else {
        const step = dist - prevDist;
        lastHeading += frame.turnRate * 0.028 * step;
        lastX += Math.sin(lastHeading) * step;
        lastZ -= Math.cos(lastHeading) * step;
      }
      prevDist = dist;
      this.centerPts[i].x = lastX;
      this.centerPts[i].z = lastZ;
      this.centerPts[i].y = groundAt(lastX, lastZ) + 0.14;
    }

    const pos = this.posAttr.array as Float32Array;
    for (let i = 0; i < SEGMENTS; i++) {
      const u = i / (SEGMENTS - 1);
      const prev = this.centerPts[Math.max(0, i - 1)];
      const next = this.centerPts[Math.min(SEGMENTS - 1, i + 1)];
      const dx = next.x - prev.x;
      const dz = next.z - prev.z;
      const len = Math.hypot(dx, dz) || 1;
      const rightX = -dz / len;
      const rightZ = dx / len;
      const halfW = (1.06 - u * 0.2) * (frame.isPlaidSpeed ? 1.12 : 1.0);
      const p = this.centerPts[i];
      const idx = i * 6;
      pos[idx] = p.x - rightX * halfW;
      pos[idx + 1] = p.y;
      pos[idx + 2] = p.z - rightZ * halfW;
      pos[idx + 3] = p.x + rightX * halfW;
      pos[idx + 4] = p.y;
      pos[idx + 5] = p.z + rightZ * halfW;
    }
    this.posAttr.needsUpdate = true;

    const u = this.material.uniforms;
    u.uTime.value = time;
    u.uScroll.value = this.scroll;
    u.uSpeedNorm.value = speedNorm;
    u.uBraking.value = frame.isBraking ? 1 : frame.speedKmh < 2.2 ? 0.55 : 0;
    u.uDaylight.value = env.daylightFactor;

    if (lightShow > 0.05) {
      const phase = Math.sin(time * 8.5) * 0.5 + 0.5;
      u.uEdgeColor.value.set(phase > 0.5 ? '#ff335a' : '#ffe378');
      u.uCoreColor.value.set(phase > 0.5 ? '#ffe07d' : '#4df2ff');
    } else if (env.theme === 'cyber2099') {
      u.uEdgeColor.value.set('#ff55cc');
      u.uCoreColor.value.set('#3cf2ff');
    } else if (env.theme === 'nordic') {
      u.uEdgeColor.value.set('#e8f6ff');
      u.uCoreColor.value.set('#59ccff');
    } else if (frame.isPlaidSpeed) {
      u.uEdgeColor.value.set('#ffe488');
      u.uCoreColor.value.set('#44f0ff');
    } else {
      u.uEdgeColor.value.set('#ffd978');
      u.uCoreColor.value.set('#66e4ff');
    }
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
