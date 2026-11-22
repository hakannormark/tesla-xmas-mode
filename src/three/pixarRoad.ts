import * as THREE from 'three';
import { createSparklingSnowMaterial, getSoftGlowTexture } from './pixarMaterials';

let cachedRoadTextures: { map: THREE.CanvasTexture; roughnessMap: THREE.CanvasTexture } | null = null;

export function createPixarRoadTexture(): {
  map: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
} {
  if (cachedRoadTextures) return cachedRoadTextures;

  const w = 512;
  const h = 512;

  const cCanvas = document.createElement('canvas');
  cCanvas.width = w;
  cCanvas.height = h;
  const ctx = cCanvas.getContext('2d')!;

  const rCanvas = document.createElement('canvas');
  rCanvas.width = w;
  rCanvas.height = h;
  const rCtx = rCanvas.getContext('2d')!;

  // Base winter twilight road surface with feathered snowy shoulders on outer U edges
  const baseGrad = ctx.createLinearGradient(0, 0, w, 0);
  baseGrad.addColorStop(0.0, '#7a98c4');
  baseGrad.addColorStop(0.09, '#465c87');
  baseGrad.addColorStop(0.18, '#233155');
  baseGrad.addColorStop(0.5, '#2b3a63');
  baseGrad.addColorStop(0.82, '#233155');
  baseGrad.addColorStop(0.91, '#465c87');
  baseGrad.addColorStop(1.0, '#7a98c4');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, w, h);

  // Roughness base: soft frosted matte asphalt everywhere, slick icy glints in tire tracks
  rCtx.fillStyle = '#cfcfcf';
  rCtx.fillRect(0, 0, w, h);

  // Dual smooth tire-track sheen ribbons for both lanes (u ≈ 0.28..0.38 and 0.62..0.72)
  const trackCenters = [w * 0.26, w * 0.38, w * 0.62, w * 0.74];
  for (const tx of trackCenters) {
    const g = ctx.createLinearGradient(tx - 20, 0, tx + 20, 0);
    g.addColorStop(0, 'rgba(20, 30, 56, 0)');
    g.addColorStop(0.5, 'rgba(18, 28, 52, 0.58)');
    g.addColorStop(1, 'rgba(20, 30, 56, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(tx - 20, 0, 40, h);

    const rg = rCtx.createLinearGradient(tx - 18, 0, tx + 18, 0);
    rg.addColorStop(0, 'rgba(55, 55, 55, 0)');
    rg.addColorStop(0.5, 'rgba(42, 42, 42, 0.92)');
    rg.addColorStop(1, 'rgba(55, 55, 55, 0)');
    rCtx.fillStyle = rg;
    rCtx.fillRect(tx - 18, 0, 36, h);
  }

  // Organic windblown snow patches & subtle frost grain so asphalt reads lush & painterly
  for (let i = 0; i < 420; i++) {
    const px = Math.random() * w;
    const py = Math.random() * h;
    const edgeBias = Math.abs(px / w - 0.5) * 2;
    if (edgeBias > 0.68 || Math.random() < 0.25) {
      const r = 4 + Math.random() * (edgeBias > 0.7 ? 20 : 9);
      const sg = ctx.createRadialGradient(px, py, 1, px, py, r);
      const alpha = edgeBias > 0.7 ? 0.24 : 0.08;
      sg.addColorStop(0, `rgba(185, 214, 248, ${alpha})`);
      sg.addColorStop(1, 'rgba(185, 214, 248, 0)');
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Soft golden feathered center holiday lane dashes (repeated seamlessly 2x per tile height)
  for (let i = 0; i < 2; i++) {
    const dy = i * (h * 0.5) + h * 0.08;
    const dh = h * 0.28;
    const dg = ctx.createLinearGradient(w * 0.5 - 8, 0, w * 0.5 + 8, 0);
    dg.addColorStop(0, 'rgba(255, 214, 130, 0)');
    dg.addColorStop(0.28, 'rgba(255, 218, 136, 0.85)');
    dg.addColorStop(0.5, 'rgba(255, 236, 178, 0.96)');
    dg.addColorStop(0.72, 'rgba(255, 218, 136, 0.85)');
    dg.addColorStop(1, 'rgba(255, 214, 130, 0)');
    ctx.fillStyle = dg;
    ctx.beginPath();
    ctx.roundRect(w * 0.5 - 7, dy, 14, dh, 6);
    ctx.fill();
  }

  const map = new THREE.CanvasTexture(cCanvas);
  map.wrapS = THREE.ClampToEdgeWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;

  const roughnessMap = new THREE.CanvasTexture(rCanvas);
  roughnessMap.wrapS = THREE.ClampToEdgeWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;

  cachedRoadTextures = { map, roughnessMap };
  return cachedRoadTextures;
}

const COLS_PER_ROW = 11; // 0..2 left bank, 3..7 road, 8..10 right bank
const ROWS = 90; // 91 cross-sections from +18 to -198
const PROFILE_X = [-10.8, -8.2, -5.8, -4.4, -2.2, 0, 2.2, 4.4, 5.8, 8.2, 10.8];

export class PixarSnowyRoad {
  readonly mesh: THREE.Mesh;
  private geometry: THREE.BufferGeometry;
  private posAttr: THREE.BufferAttribute;
  private uvAttr: THREE.BufferAttribute;
  private zSamples = new Float32Array(ROWS + 1);
  private roadMat: THREE.MeshPhysicalMaterial;
  private bankMat: THREE.MeshPhysicalMaterial;
  private shaderUniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uDaylight: { value: 0 },
    uReflectBoost: { value: 1.0 },
    uAuroraTint: { value: new THREE.Color('#3ce8b4') },
  };

  constructor() {
    const vertCount = (ROWS + 1) * COLS_PER_ROW;
    const positions = new Float32Array(vertCount * 3);
    const colors = new Float32Array(vertCount * 3);
    const uvs = new Float32Array(vertCount * 2);

    const zStart = 18;
    const zEnd = -198;

    for (let r = 0; r <= ROWS; r++) {
      const z = zStart + (zEnd - zStart) * (r / ROWS);
      this.zSamples[r] = z;

      for (let c = 0; c < COLS_PER_ROW; c++) {
        const idx = r * COLS_PER_ROW + c;
        positions[idx * 3] = PROFILE_X[c];
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;

        // Soft painterly vertex shading: cool twilight troughs -> sunlit cream crests
        let cr = 1.0;
        let cg = 1.0;
        let cb = 1.0;
        if (c === 0 || c === 10) {
          cr = 0.72;
          cg = 0.82;
          cb = 0.98;
        } else if (c === 1 || c === 9 || c === 2 || c === 8) {
          cr = 0.96;
          cg = 0.98;
          cb = 1.0;
        } else if (c === 3 || c === 7) {
          cr = 0.88;
          cg = 0.93;
          cb = 1.0;
        }
        colors[idx * 3] = cr;
        colors[idx * 3 + 1] = cg;
        colors[idx * 3 + 2] = cb;

        if (c >= 3 && c <= 7) {
          uvs[idx * 2] = (c - 3) / 4;
        } else {
          uvs[idx * 2] = (PROFILE_X[c] + 10.8) * 0.08;
        }
        uvs[idx * 2 + 1] = 0;
      }
    }

    const roadIndices: number[] = [];
    const snowIndices: number[] = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS_PER_ROW - 1; c++) {
        const v00 = r * COLS_PER_ROW + c;
        const v01 = v00 + 1;
        const v10 = (r + 1) * COLS_PER_ROW + c;
        const v11 = v10 + 1;

        const target = c >= 3 && c <= 6 ? roadIndices : snowIndices;
        target.push(v00, v01, v10);
        target.push(v01, v11, v10);
      }
    }

    const geo = new THREE.BufferGeometry();
    this.posAttr = new THREE.BufferAttribute(positions, 3);
    this.uvAttr = new THREE.BufferAttribute(uvs, 2);
    geo.setAttribute('position', this.posAttr);
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('uv', this.uvAttr);
    geo.setIndex([...roadIndices, ...snowIndices]);
    geo.addGroup(0, roadIndices.length, 0);
    geo.addGroup(roadIndices.length, snowIndices.length, 1);
    this.geometry = geo;

    const { map, roughnessMap } = createPixarRoadTexture();
    this.roadMat = new THREE.MeshPhysicalMaterial({
      map,
      roughnessMap,
      roughness: 0.42,
      metalness: 0.14,
      clearcoat: 0.72,
      clearcoatRoughness: 0.14,
      vertexColors: true,
    });
    this.roadMat.customProgramCacheKey = () => 'pixar-wet-asphalt-v1';
    this.roadMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.shaderUniforms.uTime;
      shader.uniforms.uScroll = this.shaderUniforms.uScroll;
      shader.uniforms.uDaylight = this.shaderUniforms.uDaylight;
      shader.uniforms.uReflectBoost = this.shaderUniforms.uReflectBoost;
      shader.uniforms.uAuroraTint = this.shaderUniforms.uAuroraTint;

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          '#include <common>\nvarying vec3 vWetWorldPos;\nvarying vec2 vWetRoadUv;'
        )
        .replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\nvWetWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvWetRoadUv = uv;'
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
uniform float uTime;
uniform float uScroll;
uniform float uDaylight;
uniform float uReflectBoost;
uniform vec3 uAuroraTint;
varying vec3 vWetWorldPos;
varying vec2 vWetRoadUv;`
        )
        .replace(
          '#include <dithering_fragment>',
          `
          float roadEdgeMask = 1.0 - smoothstep(0.42, 0.50, abs(vWetRoadUv.x - 0.5));
          float tr1 = exp(-pow((vWetRoadUv.x - 0.27) * 14.0, 2.0));
          float tr2 = exp(-pow((vWetRoadUv.x - 0.38) * 14.0, 2.0));
          float tr3 = exp(-pow((vWetRoadUv.x - 0.62) * 14.0, 2.0));
          float tr4 = exp(-pow((vWetRoadUv.x - 0.73) * 14.0, 2.0));
          float trackSheen = min(1.0, tr1 + tr2 + tr3 + tr4);

          float wz = vWetWorldPos.z - uScroll;
          float shimmer = 0.72 + 0.28 * sin(wz * 2.4 + uTime * 3.2 + vWetRoadUv.x * 18.0);
          float lampReflect = pow(0.5 + 0.5 * sin(wz * 0.418), 7.0) * smoothstep(0.12, 0.44, abs(vWetRoadUv.x - 0.5));
          float nightWeight = 1.0 - clamp(uDaylight * 0.75, 0.0, 0.75);

          vec3 goldRefl = vec3(0.95, 0.68, 0.28) * lampReflect * (0.28 + trackSheen * 0.42) * shimmer;
          vec3 auroraRefl = uAuroraTint * (0.06 + trackSheen * 0.11) * (0.55 + 0.45 * sin(wz * 0.22 + uTime * 1.4));
          float sleighTail = exp(-pow((vWetWorldPos.z - 2.6) * 0.16, 2.0)) * (1.0 - smoothstep(0.08, 0.35, abs(vWetRoadUv.x - 0.5)));
          vec3 tailRefl = vec3(0.85, 0.16, 0.22) * sleighTail * 0.18;

          gl_FragColor.rgb += (goldRefl + auroraRefl + tailRefl) * roadEdgeMask * nightWeight * uReflectBoost;
          #include <dithering_fragment>`
        );
    };

    this.bankMat = createSparklingSnowMaterial('#a6c2e8');
    this.bankMat.vertexColors = true;
    this.bankMat.bumpScale = 0.22;
    this.bankMat.customProgramCacheKey = () => 'pixar-snow-microglitter-v1';
    this.bankMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.shaderUniforms.uTime;
      shader.uniforms.uScroll = this.shaderUniforms.uScroll;
      shader.uniforms.uDaylight = this.shaderUniforms.uDaylight;

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          '#include <common>\nvarying vec3 vBankWorldPos;'
        )
        .replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\nvBankWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;'
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
uniform float uTime;
uniform float uScroll;
uniform float uDaylight;
varying vec3 vBankWorldPos;
float bankSparkHash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}`
        )
        .replace(
          '#include <dithering_fragment>',
          `
          vec2 sgCell = floor(vec2(vBankWorldPos.x, vBankWorldPos.z - uScroll) * 6.5);
          float sRnd = bankSparkHash(sgCell);
          if (sRnd > 0.964) {
            float glint = pow(0.5 + 0.5 * sin(uTime * 4.2 + sRnd * 55.0 + vBankWorldPos.z * 0.35), 4.0);
            float nearFade = 1.0 - smoothstep(-15.0, -95.0, vBankWorldPos.z);
            vec3 crystalCol = sRnd > 0.986 ? vec3(1.15, 0.96, 0.68) : vec3(0.86, 0.96, 1.15);
            gl_FragColor.rgb += crystalCol * glint * nearFade * (0.28 + uDaylight * 0.22);
          }
          #include <dithering_fragment>`
        );
    };

    this.mesh = new THREE.Mesh(this.geometry, [this.roadMat, this.bankMat]);
    this.mesh.frustumCulled = false;
    this.update(0, () => 0);
  }

  setAtmosphere(time: number, daylight: number, auroraHex: string, boost = 1.0): void {
    this.shaderUniforms.uTime.value = time;
    this.shaderUniforms.uDaylight.value = daylight;
    this.shaderUniforms.uAuroraTint.value.set(auroraHex);
    this.shaderUniforms.uReflectBoost.value = boost;
  }

  update(scrollDistance: number, curveFn: (z: number) => number): void {
    this.shaderUniforms.uScroll.value = scrollDistance;
    const pos = this.posAttr.array as Float32Array;
    const uvs = this.uvAttr.array as Float32Array;

    for (let r = 0; r <= ROWS; r++) {
      const z = this.zSamples[r];
      const cx = curveFn(z);
      const worldZ = z - scrollDistance;

      // Sculpted organic wind-drifted snowbanks flanking both shoulders
      const waveL =
        0.74 + 0.26 * Math.sin(worldZ * 0.13 + 0.8) + 0.14 * Math.cos(worldZ * 0.27);
      const waveR =
        0.74 + 0.26 * Math.sin(worldZ * 0.11 + 3.1) + 0.14 * Math.cos(worldZ * 0.23 + 1.2);
      const wiggleL = Math.sin(worldZ * 0.16) * 0.42;
      const wiggleR = Math.cos(worldZ * 0.15 + 1.1) * 0.42;

      const vCoord = worldZ * 0.045;

      for (let c = 0; c < COLS_PER_ROW; c++) {
        const idx = r * COLS_PER_ROW + c;
        let xOff = PROFILE_X[c];
        let y = 0.04;

        if (c === 0 || c === 10) {
          y = -0.04;
        } else if (c === 1) {
          xOff += wiggleL * 0.6;
          y = 0.56 * waveL;
        } else if (c === 2) {
          xOff += wiggleL;
          y = 0.84 * waveL;
        } else if (c === 3 || c === 7) {
          y = 0.03;
        } else if (c === 4 || c === 6) {
          y = 0.07;
        } else if (c === 5) {
          y = 0.11;
        } else if (c === 8) {
          xOff += wiggleR;
          y = 0.84 * waveR;
        } else if (c === 9) {
          xOff += wiggleR * 0.6;
          y = 0.56 * waveR;
        }

        pos[idx * 3] = cx + xOff;
        pos[idx * 3 + 1] = y;
        uvs[idx * 2 + 1] = vCoord;
      }
    }

    this.posAttr.needsUpdate = true;
    this.uvAttr.needsUpdate = true;
    this.geometry.computeVertexNormals();
  }

  dispose(): void {
    this.geometry.dispose();
    this.roadMat.dispose();
    this.bankMat.dispose();
  }
}

/**
 * Rolling softly sculpted Pixar snow valley floor staying recessed under the central highway corridor.
 */
export function createPixarValleyTerrain(): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(440, 440, 56, 56);
  geo.rotateX(-Math.PI * 0.5);

  const pos = geo.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const distFromCenter = Math.max(0, Math.abs(x) - 10.5);
    const blend = Math.min(1, distFromCenter / 24);
    const hills =
      (Math.sin(x * 0.055) * Math.cos(z * 0.05) + 1) * 2.4 +
      Math.sin(x * 0.12 + z * 0.09) * 0.9;
    const y = -0.1 + blend * Math.max(0.05, hills);
    pos.setY(i, y);

    const crestMix = Math.min(1, Math.max(0, y / 6));
    colors[i * 3] = 0.64 + crestMix * 0.34;
    colors[i * 3 + 1] = 0.76 + crestMix * 0.22;
    colors[i * 3 + 2] = 0.94 + crestMix * 0.06;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = createSparklingSnowMaterial('#93b1dc');
  mat.vertexColors = true;
  return new THREE.Mesh(geo, mat);
}

function buildMountainRidge(
  width: number,
  depth: number,
  centerZ: number,
  maxH: number,
  seed: number
): THREE.Mesh {
  const segX = 84;
  const segZ = 18;
  const geo = new THREE.PlaneGeometry(width, depth, segX, segZ);
  geo.rotateX(-Math.PI * 0.5);

  const pos = geo.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    // z runs [-depth/2 .. +depth/2]; bell curve peaks softly near spine of ridge
    const normZ = z / (depth * 0.5);
    const spine = Math.pow(Math.max(0, 1 - normZ * normZ), 1.45);

    const wave =
      0.52 +
      0.24 * Math.sin(x * 0.028 + seed) +
      0.16 * Math.cos(x * 0.065 + seed * 1.9) +
      0.11 * Math.sin(x * 0.13 + z * 0.06 + seed);

    // Keep slight dip right behind the horizon center so distant road vanishes organically
    const y = Math.max(-1.2, -0.8 + spine * maxH * wave);
    pos.setY(i, y);

    // Smooth vertical gradient from deep twilight alpine pine blue -> pastel lavender -> frosted sunlit crest
    const snowRatio = Math.min(1, Math.max(0, (y - maxH * 0.28) / (maxH * 0.52)));
    const s = snowRatio * snowRatio * (3 - 2 * snowRatio);
    colors[i * 3] = 0.24 + s * 0.68;
    colors[i * 3 + 1] = 0.34 + s * 0.6;
    colors[i * 3 + 2] = 0.58 + s * 0.42;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = createSparklingSnowMaterial('#9fbbe4');
  mat.vertexColors = true;
  mat.roughness = 0.88;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0, centerZ);
  return mesh;
}

/**
 * Multi-layered soft sculpted Disney/Pixar Alpine mountain ridges & twinkling valley chalets.
 */
export function createPixarAlpineBackdrop(): THREE.Group {
  const group = new THREE.Group();

  // Back monumental ridge + nearer softer foothill ridge (zero harsh geometric cones!)
  group.add(buildMountainRidge(520, 95, -205, 58, 0.7));
  group.add(buildMountainRidge(460, 72, -162, 32, 2.4));

  // Cozy twinkling hillside village chalets nestled gently along foothills
  const glowTex = getSoftGlowTexture();
  for (let i = 0; i < 18; i++) {
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: i % 3 === 0 ? '#ffd078' : '#ffb85c',
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const vx = -102 + i * 12.0;
    const vz = -146 - (i % 3) * 7;
    const sc = 3.2 + (i % 3) * 1.4;
    sp.scale.set(sc, sc * 0.75, 1);
    sp.position.set(vx, 2.4 + (i % 4) * 1.2, vz);
    group.add(sp);
  }

  // Layered Soft Valley Mist Curtain separating foothills from winter snow plains
  for (let m = 0; m < 7; m++) {
    const mist = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: m % 2 === 0 ? '#a9c7f0' : '#ebd4c2',
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      })
    );
    mist.scale.set(68, 13, 1);
    mist.position.set((m - 3) * 34, 4.8 + (m % 2) * 1.6, -132 - (m % 2) * 8);
    group.add(mist);
  }

  return group;
}
