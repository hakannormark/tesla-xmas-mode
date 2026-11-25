import * as THREE from 'three';
import type { EnvironmentState } from '../core/environment';
import type { TelemetryFrame } from '../core/telemetry';
import { createVolumetricBeamMaterial, getSoftGlowTexture } from './pixarMaterials';

function createHeadlightPoolMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color('#fff0cc') },
      uOpacity: { value: 0.48 },
      uSteer: { value: 0.0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uSteer;
      varying vec2 vUv;
      void main() {
        // vUv.y = 0 at rear (near bumper), 1 at far forward edge
        float z = vUv.y;
        float x = (vUv.x - 0.5) * 2.0;
        // Gently sweep beam throw laterally into curves as distance increases
        float bend = uSteer * z * z * 0.48;
        float sx = x - bend;

        // Dual overlapping headlamp throw lobes widening softly with distance
        float spread = mix(0.14, 0.54, z);
        float sep = mix(0.13, 0.22, z);
        float leftLobe = exp(-pow((sx + sep) / spread, 2.0));
        float rightLobe = exp(-pow((sx - sep) / spread, 2.0));
        float centerFill = exp(-pow(sx / (spread * 1.45), 2.0)) * 0.48;
        float lateral = clamp((leftLobe + rightLobe) * 0.62 + centerFill, 0.0, 1.15);

        // Soft emitter ramp near bumper + natural inverse-like forward decay
        float nearFade = smoothstep(0.0, 0.14, z);
        float farFade = pow(1.0 - smoothstep(0.12, 1.0, z), 1.65);
        float hotCore = exp(-pow((z - 0.18) / 0.22, 2.0)) * 0.35;
        float edgeClamp = smoothstep(1.0, 0.78, abs(x));

        float mask = lateral * nearFade * (farFade + hotCore * farFade) * edgeClamp;
        vec3 col = mix(uColor, vec3(1.0, 0.98, 0.92), clamp(hotCore * lateral, 0.0, 0.5));
        gl_FragColor = vec4(col, mask * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    toneMapped: false,
  });
}

function createTaillightPoolMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color('#ff223a') },
      uOpacity: { value: 0.36 },
      uBlinkL: { value: 0.0 },
      uBlinkR: { value: 0.0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uBlinkL;
      uniform float uBlinkR;
      varying vec2 vUv;
      void main() {
        // vUv.y = 1 near rear bumper, 0 further behind vehicle
        float z = 1.0 - vUv.y;
        float x = (vUv.x - 0.5) * 2.0;
        float spread = mix(0.20, 0.62, z);
        float sep = mix(0.24, 0.30, z);
        float leftLobe = exp(-pow((x + sep) / spread, 2.0));
        float rightLobe = exp(-pow((x - sep) / spread, 2.0));
        float nearFade = smoothstep(0.0, 0.16, z);
        float farFade = pow(1.0 - smoothstep(0.08, 1.0, z), 1.85);
        float edgeClamp = smoothstep(1.0, 0.76, abs(x));

        float redMask = (leftLobe + rightLobe) * 0.65 * nearFade * farFade * edgeClamp * uOpacity;
        vec3 amber = vec3(1.0, 0.62, 0.12);
        float blinkMaskL = leftLobe * nearFade * farFade * edgeClamp * uBlinkL * 0.38;
        float blinkMaskR = rightLobe * nearFade * farFade * edgeClamp * uBlinkR * 0.38;

        vec3 col = uColor * redMask + amber * (blinkMaskL + blinkMaskR);
        float alpha = clamp(redMask + blinkMaskL + blinkMaskR, 0.0, 1.0);
        gl_FragColor = vec4(col / max(alpha, 0.0001), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    toneMapped: false,
  });
}

export class VehicleLighting {
  readonly group = new THREE.Group();

  private readonly leftBeam: THREE.Mesh;
  private readonly rightBeam: THREE.Mesh;
  private readonly beamMat: THREE.ShaderMaterial;
  private readonly headlightPool: THREE.Mesh;
  private readonly headlightPoolMat: THREE.ShaderMaterial;
  private readonly taillightPool: THREE.Mesh;
  private readonly taillightPoolMat: THREE.ShaderMaterial;
  private readonly roadLight = new THREE.PointLight('#ffe8bd', 0, 34, 1.55);
  private readonly tailLeft: THREE.Sprite;
  private readonly tailRight: THREE.Sprite;
  private readonly tailMat: THREE.SpriteMaterial;
  private readonly blinkerLeft: THREE.Sprite;
  private readonly blinkerRight: THREE.Sprite;
  private readonly blinkerMatL: THREE.SpriteMaterial;
  private readonly blinkerMatR: THREE.SpriteMaterial;

  constructor() {
    this.beamMat = createVolumetricBeamMaterial('#fff1ce', 0.09);
    const beamGeo = new THREE.ConeGeometry(1.75, 16, 16, 1, true);
    beamGeo.translate(0, -8, 0);
    beamGeo.rotateX(Math.PI * 0.5);

    this.leftBeam = new THREE.Mesh(beamGeo, this.beamMat);
    this.leftBeam.position.set(-0.78, 0.86, -1.6);
    this.rightBeam = new THREE.Mesh(beamGeo, this.beamMat);
    this.rightBeam.position.set(0.78, 0.86, -1.6);
    this.group.add(this.leftBeam, this.rightBeam);

    // Additive ground-projected headlight pool on snow/asphalt ahead of vehicle
    this.headlightPoolMat = createHeadlightPoolMaterial();
    const headPoolGeo = new THREE.PlaneGeometry(11.5, 28);
    headPoolGeo.rotateX(-Math.PI * 0.5);
    this.headlightPool = new THREE.Mesh(headPoolGeo, this.headlightPoolMat);
    this.headlightPool.position.set(0, 0.09, -15.6);
    this.headlightPool.renderOrder = 2;

    // Additive rear crimson taillight + amber blinker spill onto snow/asphalt behind vehicle
    this.taillightPoolMat = createTaillightPoolMaterial();
    const tailPoolGeo = new THREE.PlaneGeometry(6.4, 7.2);
    tailPoolGeo.rotateX(-Math.PI * 0.5);
    this.taillightPool = new THREE.Mesh(tailPoolGeo, this.taillightPoolMat);
    this.taillightPool.position.set(0, 0.09, 5.2);
    this.taillightPool.renderOrder = 2;
    this.group.add(this.headlightPool, this.taillightPool);

    this.roadLight.position.set(0, 2.3, -13.5);
    this.group.add(this.roadLight);

    const glowTex = getSoftGlowTexture();
    this.tailMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: '#ff2b44',
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    this.tailLeft = new THREE.Sprite(this.tailMat);
    this.tailLeft.scale.set(2.2, 1.5, 1);
    this.tailLeft.position.set(-0.78, 0.92, 2.15);
    this.tailRight = new THREE.Sprite(this.tailMat);
    this.tailRight.scale.set(2.2, 1.5, 1);
    this.tailRight.position.set(0.78, 0.92, 2.15);
    this.group.add(this.tailLeft, this.tailRight);

    this.blinkerMatL = new THREE.SpriteMaterial({
      map: glowTex,
      color: '#ffaa22',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    this.blinkerMatR = this.blinkerMatL.clone();
    this.blinkerLeft = new THREE.Sprite(this.blinkerMatL);
    this.blinkerLeft.scale.set(1.6, 1.6, 1);
    this.blinkerLeft.position.set(-1.05, 0.96, 1.95);
    this.blinkerRight = new THREE.Sprite(this.blinkerMatR);
    this.blinkerRight.scale.set(1.6, 1.6, 1);
    this.blinkerRight.position.set(1.05, 0.96, 1.95);
    this.group.add(this.blinkerLeft, this.blinkerRight);
  }

  update(
    time: number,
    frame: TelemetryFrame,
    env: EnvironmentState,
    visible: boolean,
    sleighLiftHeight: number,
    lightShow = 0
  ): void {
    this.group.visible = visible;
    if (!visible) return;

    const nightFactor = Math.max(0.08, 1 - env.daylightFactor * 0.88);
    const beamY = 0.85 + sleighLiftHeight * 0.55;
    const steerYaw = -THREE.MathUtils.clamp(frame.turnRate * 0.24, -0.24, 0.24);
    this.leftBeam.position.y = beamY;
    this.rightBeam.position.y = beamY;
    this.leftBeam.rotation.y = steerYaw;
    this.rightBeam.rotation.y = steerYaw;

    const showWave = lightShow > 0.02 ? 0.5 + 0.5 * Math.sin(time * 9.0) : 0;
    this.beamMat.uniforms.uOpacity.value =
      0.09 * nightFactor + lightShow * (0.075 + 0.055 * showWave);
    if (lightShow > 0.05) {
      const showColors = ['#ffe27a', '#ff2e55', '#58f4ff', '#fff0cb'];
      const activeShowCol = showColors[Math.floor(time * 4.5) % showColors.length];
      this.beamMat.uniforms.uColor.value.set(activeShowCol);
      this.headlightPoolMat.uniforms.uColor.value.set(activeShowCol);
    } else {
      const headCol = env.theme === 'cyber2099' ? '#8aeaff' : '#fff0cb';
      this.beamMat.uniforms.uColor.value.set(headCol);
      this.headlightPoolMat.uniforms.uColor.value.set(headCol);
    }

    const groundLiftAtten = Math.max(0.28, 1 - sleighLiftHeight * 0.14);
    const poolVis = env.daylightFactor < 0.82 || lightShow > 0.05;
    this.headlightPool.visible = poolVis;
    this.headlightPool.scale.set(1 + sleighLiftHeight * 0.08, 1, 1 + sleighLiftHeight * 0.04);
    this.headlightPoolMat.uniforms.uSteer.value = THREE.MathUtils.clamp(frame.turnRate, -1, 1);
    this.headlightPoolMat.uniforms.uOpacity.value =
      (0.54 * nightFactor + lightShow * (0.28 + 0.2 * showWave)) * groundLiftAtten;

    this.roadLight.visible = env.quality === 'ultra' && (env.daylightFactor < 0.72 || lightShow > 0.05);
    this.roadLight.intensity = 6.5 * nightFactor + lightShow * (8.5 + 4.5 * Math.sin(time * 12));
    this.roadLight.position.set(Math.sin(-steerYaw) * 12, 2.2 + sleighLiftHeight * 0.4, -13.5);

    const brakeBoost = frame.isBraking ? 1 : frame.speedKmh < 2.2 ? 0.55 : 0;
    const showFlip = Math.sin(time * 14.0) > 0;
    const tailScale = 1.9 + brakeBoost * 1.45 + lightShow * 1.05;
    this.tailLeft.position.y = this.tailRight.position.y = 0.85 + sleighLiftHeight * 0.65;
    this.tailLeft.scale.set(tailScale, tailScale * 0.72, 1);
    this.tailRight.scale.set(tailScale, tailScale * 0.72, 1);
    const baseTail = (0.34 + brakeBoost * 0.52) * Math.max(0.35, nightFactor);
    this.tailMat.opacity = Math.min(1, Math.max(baseTail, lightShow * (showFlip ? 0.95 : 0.45)));

    const blinkPulse = (Math.sin(time * 11.0) > 0 ? 1 : 0) * 0.82;
    if (lightShow > 0.05) {
      this.blinkerMatL.opacity = (showFlip ? 0.94 : 0.16) * lightShow;
      this.blinkerMatR.opacity = (!showFlip ? 0.94 : 0.16) * lightShow;
    } else {
      this.blinkerMatL.opacity = frame.turnRate < -0.18 ? blinkPulse : 0;
      this.blinkerMatR.opacity = frame.turnRate > 0.18 ? blinkPulse : 0;
    }

    this.taillightPool.visible = poolVis;
    this.taillightPoolMat.uniforms.uOpacity.value =
      Math.min(0.92, (0.30 + brakeBoost * 0.44) * nightFactor + lightShow * (showFlip ? 0.55 : 0.18)) *
      groundLiftAtten;
    this.taillightPoolMat.uniforms.uBlinkL.value = this.blinkerMatL.opacity * groundLiftAtten;
    this.taillightPoolMat.uniforms.uBlinkR.value = this.blinkerMatR.opacity * groundLiftAtten;
  }

  dispose(): void {
    this.leftBeam.geometry.dispose();
    this.beamMat.dispose();
    this.headlightPool.geometry.dispose();
    this.headlightPoolMat.dispose();
    this.taillightPool.geometry.dispose();
    this.taillightPoolMat.dispose();
    this.tailMat.dispose();
    this.blinkerMatL.dispose();
    this.blinkerMatR.dispose();
  }
}
