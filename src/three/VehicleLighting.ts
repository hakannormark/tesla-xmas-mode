import * as THREE from 'three';
import type { EnvironmentState } from '../core/environment';
import type { TelemetryFrame } from '../core/telemetry';
import { createVolumetricBeamMaterial, getSoftGlowTexture } from './pixarMaterials';

export class VehicleLighting {
  readonly group = new THREE.Group();

  private readonly leftBeam: THREE.Mesh;
  private readonly rightBeam: THREE.Mesh;
  private readonly beamMat: THREE.ShaderMaterial;
  private readonly roadLight = new THREE.PointLight('#ffe8bd', 0, 34, 1.55);
  private readonly tailLeft: THREE.Sprite;
  private readonly tailRight: THREE.Sprite;
  private readonly tailMat: THREE.SpriteMaterial;
  private readonly blinkerLeft: THREE.Sprite;
  private readonly blinkerRight: THREE.Sprite;
  private readonly blinkerMatL: THREE.SpriteMaterial;
  private readonly blinkerMatR: THREE.SpriteMaterial;

  constructor() {
    this.beamMat = createVolumetricBeamMaterial('#fff1ce', 0.085);
    const beamGeo = new THREE.ConeGeometry(1.75, 16, 16, 1, true);
    beamGeo.translate(0, -8, 0);
    beamGeo.rotateX(Math.PI * 0.5);

    this.leftBeam = new THREE.Mesh(beamGeo, this.beamMat);
    this.leftBeam.position.set(-0.78, 0.86, -1.6);
    this.rightBeam = new THREE.Mesh(beamGeo, this.beamMat);
    this.rightBeam.position.set(0.78, 0.86, -1.6);
    this.group.add(this.leftBeam, this.rightBeam);

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
      0.085 * nightFactor + lightShow * (0.07 + 0.055 * showWave);
    if (lightShow > 0.05) {
      const showColors = ['#ffe27a', '#ff2e55', '#58f4ff', '#fff0cb'];
      this.beamMat.uniforms.uColor.value.set(showColors[Math.floor(time * 4.5) % showColors.length]);
    } else {
      this.beamMat.uniforms.uColor.value.set(
        env.theme === 'cyber2099' ? '#8aeaff' : '#fff0cb'
      );
    }

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
  }

  dispose(): void {
    this.leftBeam.geometry.dispose();
    this.beamMat.dispose();
    this.tailMat.dispose();
    this.blinkerMatL.dispose();
    this.blinkerMatR.dispose();
  }
}
