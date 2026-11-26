import * as THREE from 'three';
import type { EnvironmentState } from '../core/environment';
import { getSoftGlowTexture } from './pixarMaterials';

export interface AlpineHorizonHandle {
  group: THREE.Group;
  update(time: number, env: EnvironmentState): void;
}

const RIDGE_VERT = /* glsl */`
  attribute vec3 aColor;
  attribute float aNormH;
  varying vec3 vColor;
  varying float vNormH;
  varying float vHeight;
  varying float vAz;

  void main() {
    vColor = aColor;
    vNormH = aNormH;
    vHeight = position.y;
    vAz = atan(position.x, position.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const RIDGE_FRAG = /* glsl */`
  uniform vec3 uTint;
  uniform vec3 uFogColor;
  uniform vec3 uHorizonColor;
  uniform float uDaylight;
  uniform float uBlueHour;
  uniform float uLayerHaze;
  uniform float uCyberMode;

  varying vec3 vColor;
  varying float vNormH;
  varying float vHeight;
  varying float vAz;

  void main() {
    vec3 ridgeCol = vColor * uTint;

    // Subtle moonlit / twilight alpenglow crest highlight on upper snowfields
    float peakMask = smoothstep(0.46, 0.96, vNormH);
    float sideLight = 0.55 + 0.45 * sin(vAz + 1.05);
    vec3 crestGlow = uCyberMode > 0.5
      ? vec3(0.32, 0.52, 0.88)
      : mix(
          mix(vec3(0.46, 0.62, 0.92), vec3(0.96, 0.58, 0.62), uBlueHour),
          vec3(1.0, 0.96, 0.90),
          uDaylight
        );
    ridgeCol = mix(ridgeCol, ridgeCol + crestGlow * 0.22, peakMask * sideLight);

    // Distance-layered aerial perspective toward horizon haze
    vec3 skyHaze = mix(
      uFogColor,
      uHorizonColor,
      smoothstep(0.02, 0.78, vNormH) * (0.38 + uDaylight * 0.28 + uBlueHour * 0.24)
    );
    float aerial = clamp(uLayerHaze * (0.74 + (1.0 - vNormH) * 0.34), 0.0, 0.90);
    vec3 col = mix(ridgeCol, skyHaze, aerial);

    // Seamless ground-to-mountain base fade directly into scene FogExp2 color
    float baseFade = 1.0 - smoothstep(-3.0, 14.0 + uLayerHaze * 24.0, vHeight);
    col = mix(col, uFogColor, baseFade * 0.98);

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

// Atmospheric layered Alpine backdrop with height/distance haze blended into scene fog.
export function createAlpineHorizon(): AlpineHorizonHandle {
  const group = new THREE.Group();
  group.name = 'Alpine sky backdrop';
  const sectors = 256;
  const ridgeMats: THREE.ShaderMaterial[] = [];
  const layers = [
    { radius: 655, low: 16, high: 103, seed: 2.8, blue: '#465b84', snow: '#b5abce', haze: 0.66 },
    { radius: 498, low: 11, high: 75, seed: 0.7, blue: '#3a5678', snow: '#aaa9cf', haze: 0.44 },
    { radius: 374, low: 4, high: 36, seed: 4.2, blue: '#304a64', snow: '#7994b6', haze: 0.22 },
  ];
  const base = new THREE.Color();
  const top = new THREE.Color();
  const rose = new THREE.Color('#f0aac0');
  const tint = new THREE.Color();

  for (let layerIdx = 0; layerIdx < layers.length; layerIdx++) {
    const layer = layers[layerIdx];
    const positions: number[] = [];
    const colors: number[] = [];
    const normHs: number[] = [];
    const indices: number[] = [];
    base.set(layer.blue);
    top.set(layer.snow);
    const stride = 12;
    for (let i = 0; i <= sectors; i++) {
      const a = (2 * Math.PI * i) / sectors;
      const broad = 0.5 + 0.5 * Math.sin(a * 5 + layer.seed);
      const jagged =
        0.66 +
        Math.sin(a * 9 + layer.seed) * 0.18 +
        Math.cos(a * 23 - layer.seed) * 0.12 +
        Math.sin(a * 39 + 1.7) * 0.055;
      const spine = 1 - Math.abs(Math.sin(a * 14 + 0.8 * Math.sin(a * 5) + layer.seed));
      const peak = layer.low + layer.high * (0.23 + 0.77 * broad) * jagged * (0.68 + 0.53 * spine);
      const crease = Math.cos(a * 35 + layer.seed);
      for (let j = 0; j < stride; j++) {
        const t = j / (stride - 1);
        const ravine = Math.cos(a * 39 + layer.seed + 2.7 * (1 - t) * Math.sin(a * 7));
        const radius = layer.radius - (1 - t) * 59 + ravine * 9 * Math.sin(Math.PI * t);
        const height = THREE.MathUtils.lerp(-3, peak, Math.pow(t, 1.21));
        positions.push(Math.sin(a) * radius, height, Math.cos(a) * radius);
        normHs.push(t);
        const snowy = THREE.MathUtils.smoothstep(
          t + (ravine * 0.17 + 0.09 * Math.sin(a * 71)) * Math.sin(Math.PI * t),
          0.39,
          0.86
        );
        tint
          .copy(base)
          .lerp(top, snowy)
          .lerp(rose, snowy * Math.max(0, Math.sin(a + 1.1)) * 0.24);
        tint.multiplyScalar(0.76 + 0.2 * ravine + 0.11 * crease + 0.09 * t);
        colors.push(tint.r, tint.g, tint.b);
        if (i > 0 && j > 0) {
          const k = i * stride + j;
          indices.push(k - stride - 1, k - 1, k, k - stride - 1, k, k - stride);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('aNormH', new THREE.Float32BufferAttribute(normHs, 1));
    geometry.setIndex(indices);
    const mat = new THREE.ShaderMaterial({
      vertexShader: RIDGE_VERT,
      fragmentShader: RIDGE_FRAG,
      uniforms: {
        uTint: { value: new THREE.Color('#ffffff') },
        uFogColor: { value: new THREE.Color('#0b1630') },
        uHorizonColor: { value: new THREE.Color('#344572') },
        uDaylight: { value: 0 },
        uBlueHour: { value: 0 },
        uLayerHaze: { value: layer.haze },
        uCyberMode: { value: 0 },
      },
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      fog: false,
    });
    ridgeMats.push(mat);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.renderOrder = -4 + layerIdx; // outer 655m = -4, mid 498m = -3, inner 374m = -2
    group.add(mesh);
  }

  const glowTex = getSoftGlowTexture();
  const mistMats: THREE.SpriteMaterial[] = [];
  for (let m = 0; m < 16; m++) {
    const a = (m / 16) * Math.PI * 2;
    const mat = new THREE.SpriteMaterial({
      map: glowTex,
      color: m % 2 === 0 ? '#7d9ac4' : '#969ab8',
      transparent: true,
      opacity: 0.08,
      depthTest: false,
      depthWrite: false,
      fog: false,
    });
    mistMats.push(mat);
    const mist = new THREE.Sprite(mat);
    mist.scale.set(185, 28, 1);
    mist.position.set(Math.sin(a) * 355, 6 + (m % 2) * 2.5, Math.cos(a) * 355);
    mist.renderOrder = -1;
    group.add(mist);
  }

  const chalets: Array<{ mat: THREE.SpriteMaterial; phase: number; baseOpacity: number; warmAlt: boolean }> = [];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2 + (i % 3) * 0.08;
    const warmAlt = i % 3 === 0;
    const mat = new THREE.SpriteMaterial({
      map: glowTex,
      color: warmAlt ? '#ffd886' : '#ffb85c',
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      fog: false,
    });
    const sp = new THREE.Sprite(mat);
    const sc = 4.4 + (i % 4) * 1.1;
    sp.scale.set(sc, sc * 0.72, 1);
    const r = 362 - (i % 3) * 8;
    sp.position.set(Math.sin(a) * r, 6.5 + (i % 5) * 2.0, Math.cos(a) * r);
    sp.renderOrder = -1;
    group.add(sp);
    chalets.push({ mat, phase: i * 1.15, baseOpacity: 0.28 + (i % 3) * 0.08, warmAlt });
  }

  const tintTarget = new THREE.Color();
  const cyberDayColor = new THREE.Color('#c8bce8');
  const fogTarget = new THREE.Color('#0b1630');
  const fogSmoothed = new THREE.Color('#0b1630');
  const horizonTarget = new THREE.Color('#344572');
  const midnightHorizonTarget = new THREE.Color('#344572');
  const mistA = new THREE.Color();
  const mistB = new THREE.Color();
  const mistAccentDay = new THREE.Color('#e6eef8');
  const mistAccentNight = new THREE.Color('#b6b2cc');
  const mistCyberA = new THREE.Color('#5c529a');
  const mistCyberB = new THREE.Color('#8a3e78');
  let fogInitialized = false;

  return {
    group,
    update(time: number, env: EnvironmentState): void {
      const d = THREE.MathUtils.clamp(env.daylightFactor, 0, 1);
      const b = THREE.MathUtils.clamp(env.blueHourFactor, 0, 1);
      const isCyber = env.theme === 'cyber2099';

      if (isCyber) {
        tintTarget.set('#8f82d8').lerp(cyberDayColor, d);
      } else if (d > 0.6) {
        tintTarget.setRGB(1.06, 1.12, 1.2);
      } else if (b > 0.4) {
        tintTarget.setRGB(1.05, 0.94, 1.04);
      } else if (env.theme === 'nordic') {
        tintTarget.set('#86acd4');
      } else {
        tintTarget.set('#d8e2f4');
      }

      fogTarget.set(env.fogColor);
      if (!fogInitialized) {
        fogSmoothed.copy(fogTarget);
        fogInitialized = true;
      } else {
        // Match PixarStage.setAtmosphere's 0.12 fog lerp so horizon haze never lags or leads ground fog
        fogSmoothed.lerp(fogTarget, 0.12);
      }

      horizonTarget.set(env.skyHorizonColor);
      if (env.theme === 'classic' && env.effectiveSky === 'midnight') {
        horizonTarget.lerp(midnightHorizonTarget, 0.38);
      }

      for (const mat of ridgeMats) {
        mat.uniforms.uTint.value.copy(tintTarget);
        mat.uniforms.uFogColor.value.copy(fogSmoothed);
        mat.uniforms.uHorizonColor.value.copy(horizonTarget);
        mat.uniforms.uDaylight.value = d;
        mat.uniforms.uBlueHour.value = b;
        mat.uniforms.uCyberMode.value = isCyber ? 1.0 : 0.0;
      }

      // Soft atmospheric valley mist ribbon blended heavily toward active fog & horizon haze
      const mistOpacity = isCyber ? 0.06 : 0.055 + b * 0.025 + d * 0.04;
      if (isCyber) {
        mistA.copy(fogSmoothed).lerp(mistCyberA, 0.45);
        mistB.copy(fogSmoothed).lerp(mistCyberB, 0.42);
      } else {
        mistA.copy(fogSmoothed).lerp(horizonTarget, 0.48);
        mistB.copy(fogSmoothed).lerp(d > 0.55 ? mistAccentDay : mistAccentNight, 0.32);
      }
      for (let idx = 0; idx < mistMats.length; idx++) {
        const m = mistMats[idx];
        m.opacity = mistOpacity;
        m.color.copy(idx % 2 === 0 ? mistA : mistB);
      }

      // Distant hillside chalet lights fade gracefully out in daylight and haze
      const nightVis = THREE.MathUtils.clamp(1 - d * 1.18, 0.0, 1.0);
      const hazeAtten = 0.72 - b * 0.14;
      for (const ch of chalets) {
        const tw = 0.76 + 0.24 * Math.sin(time * 2.1 + ch.phase);
        ch.mat.opacity = ch.baseOpacity * tw * nightVis * hazeAtten;
        if (isCyber) ch.mat.color.set('#5ceeff');
        else ch.mat.color.set(ch.warmAlt ? '#ffd886' : '#ffb85c');
      }
    },
  };
}
