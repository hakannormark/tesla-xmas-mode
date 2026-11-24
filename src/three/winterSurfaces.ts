import * as THREE from 'three';
import type { EnvironmentState, HolidayThemeId } from '../core/environment';
import type { LiveWorldState } from '../core/liveWorldData';
import { createMoonSurfaceTexture } from './pixarMaterials';

const snowNoise = /* glsl */`
float winterHash(vec2 p) {
  p = fract(p * vec2(127.31, 311.73));
  p += dot(p, p.yx + 19.17);
  return fract(p.x * p.y);
}
float winterNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(winterHash(cell), winterHash(cell+vec2(1,0)),f.x),
             mix(winterHash(cell+vec2(0,1)), winterHash(cell+vec2(1,1)),f.x),f.y);
}
`;

export function createWinterGround(): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({color:'#b4c7e4', roughness:0.92});
  const uniforms = {
    uTime: { value: 0 },
    uDaylight: { value: 0 },
    uVehiclePos: { value: new THREE.Vector3() },
    uGroundTint: { value: new THREE.Color('#ffffff') },
  };
  material.userData.winterUniforms = uniforms;
  material.customProgramCacheKey = () => 'winter-ground-v2';
  material.onBeforeCompile = shader => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uDaylight = uniforms.uDaylight;
    shader.uniforms.uVehiclePos = uniforms.uVehiclePos;
    shader.uniforms.uGroundTint = uniforms.uGroundTint;
    shader.vertexShader = 'varying vec2 vSnowWorld;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\nvSnowWorld = (modelMatrix * vec4(position, 1.0)).xz;',
    );
    shader.fragmentShader =
      'uniform float uTime;\nuniform float uDaylight;\nuniform vec3 uVehiclePos;\nuniform vec3 uGroundTint;\nvarying vec2 vSnowWorld;\n' +
      snowNoise +
      shader.fragmentShader.replace(
        '#include <color_fragment>', /* glsl */`
        #include <color_fragment>
        float sweep = vSnowWorld.x*0.36+vSnowWorld.y*0.22+
          winterNoise(vSnowWorld*0.065)*3.0;
        float drifts = 0.5+0.5*cos(sweep);
        float broad = winterNoise(vSnowWorld*0.075);
        float powder = winterNoise(vSnowWorld*3.2);
        vec3 cool = vec3(0.69,0.79,0.98);
        vec3 warm = vec3(1.19,1.14,1.09);
        diffuseColor.rgb *= mix(cool,warm,broad*0.68+drifts*0.27);
        diffuseColor.rgb *= (0.85+0.22*smoothstep(0.15,0.9,broad*0.64+drifts*0.36)) * (0.93+0.13*powder);
        diffuseColor.rgb *= uGroundTint;
        `,
      ).replace('#include <normal_fragment_maps>', /* glsl */`
        #include <normal_fragment_maps>
        float driftSlope = sin(sweep)*0.095 + sin(sweep*2.6+broad*5.0)*0.032;
        vec3 windNormal = mat3(viewMatrix)*vec3(0.82,0.0,0.57);
        normal = normalize(normal+windNormal*driftSlope);
      `).replace('#include <dithering_fragment>', /* glsl */`
        vec2 sgCell = floor(vSnowWorld * 4.8);
        float sRnd = winterHash(sgCell);
        if (sRnd > 0.964) {
          float glint = pow(0.5 + 0.5 * sin(uTime * 4.2 + sRnd * 55.0 + vSnowWorld.y * 0.35), 4.0);
          float distSq = dot(vSnowWorld - uVehiclePos.xz, vSnowWorld - uVehiclePos.xz);
          float nearFade = 1.0 - smoothstep(1400.0, 9200.0, distSq);
          vec3 crystalCol = sRnd > 0.986 ? vec3(1.12, 0.94, 0.66) : vec3(0.86, 0.96, 1.15);
          gl_FragColor.rgb += crystalCol * glint * nearFade * (0.26 + uDaylight * 0.20);
        }
        #include <dithering_fragment>
      `);
  };
  return material;
}

export function updateWinterGround(
  material: THREE.MeshStandardMaterial,
  time: number,
  daylight: number,
  vehiclePos: THREE.Vector3,
  theme: HolidayThemeId
): void {
  const u = material.userData.winterUniforms;
  if (!u) return;
  u.uTime.value = time;
  u.uDaylight.value = daylight;
  u.uVehiclePos.value.copy(vehiclePos);
  u.uGroundTint.value.set(
    theme === 'cyber2099' ? '#cbd0ff' : theme === 'nordic' ? '#eef7ff' : '#ffffff'
  );
}

export function createWinterRoad(): THREE.MeshPhysicalMaterial {
  const material = new THREE.MeshPhysicalMaterial({
    color: '#32415d',
    roughness: 0.58,
    metalness: 0.12,
    clearcoat: 0.72,
    clearcoatRoughness: 0.16,
  });
  material.defines = { USE_UV: 1 };
  const uniforms = {
    uTime: { value: 0 },
    uDaylight: { value: 0 },
    uAuroraTint: { value: new THREE.Color('#3ce8b4') },
    uVehiclePos: { value: new THREE.Vector3() },
    uBeat: { value: 0 },
  };
  material.userData.winterUniforms = uniforms;
  material.customProgramCacheKey = () => 'winter-road-wet-v2';
  material.onBeforeCompile = shader => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uDaylight = uniforms.uDaylight;
    shader.uniforms.uAuroraTint = uniforms.uAuroraTint;
    shader.uniforms.uVehiclePos = uniforms.uVehiclePos;
    shader.uniforms.uBeat = uniforms.uBeat;
    shader.vertexShader = 'attribute float junctionBlend; varying float vJunction; varying vec2 vRoad;\nvarying vec2 vRoadWorld;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\nvJunction = junctionBlend; vRoad = uv;\nvRoadWorld = (modelMatrix * vec4(position,1.0)).xz;',
    );
    shader.fragmentShader =
      'uniform float uTime;\nuniform float uDaylight;\nuniform vec3 uAuroraTint;\nuniform vec3 uVehiclePos;\nuniform float uBeat;\nvarying float vJunction;\nvarying vec2 vRoad;\nvarying vec2 vRoadWorld;\n' +
      snowNoise +
      shader.fragmentShader.replace(
        '#include <color_fragment>', /* glsl */`
        #include <color_fragment>
        float across = abs(vRoad.x-0.5);
        float slush = winterNoise(vec2(vRoad.x*13.0,vRoad.y*0.35));
        float shoulder = smoothstep(0.34,0.51,across+0.12*slush);
        float track = (abs(across-0.245)-0.091)*27.0;
        float ruts = exp(-track*track);
        float frost = 0.12*slush + 0.26*(1.0-ruts);
        float speckles = winterNoise(vRoadWorld*3.8);
        diffuseColor.rgb *= 0.86+0.16*speckles;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.32,0.41,0.53),frost);
        diffuseColor.rgb = mix(diffuseColor.rgb,vec3(0.56,0.68,0.80), shoulder*0.76);
        vec3 packed = mix(vec3(0.095,0.12,0.16),vec3(0.17,0.21,0.27),winterNoise(vRoadWorld*0.78));
        diffuseColor.rgb = mix(diffuseColor.rgb,packed*(0.88+0.18*speckles),vJunction);
        `,
      ).replace('#include <roughnessmap_fragment>', /* glsl */`
        #include <roughnessmap_fragment>
        float rutSheen = mix(ruts * (1.0 - shoulder * 0.8), 0.42, vJunction);
        roughnessFactor = mix(roughnessFactor, 0.24, rutSheen * 0.72);
      `).replace('#include <dithering_fragment>', /* glsl */`
        float roadMask = mix(1.0 - smoothstep(0.38, 0.50, across), 0.74, vJunction);
        float rutMask = mix(ruts, 0.45, vJunction);
        float nightWeight = 1.0 - clamp(uDaylight * 0.78, 0.0, 0.78);
        float shimmer = 0.72 + 0.28 * sin(vRoadWorld.x * 1.4 + vRoadWorld.y * 2.1 + uTime * 3.0);
        float lampPools = pow(0.5 + 0.5 * sin(vRoad.y * 0.34), 6.0) * smoothstep(0.08, 0.42, across) * (1.0 - vJunction * 0.68);
        vec3 goldRefl = vec3(0.95, 0.68, 0.28) * lampPools * (0.22 + rutMask * 0.40) * shimmer;
        vec3 auroraRefl = uAuroraTint * (0.045 + rutMask * 0.11 + uBeat * 0.04) * (0.55 + 0.45 * sin((vRoadWorld.x + vRoadWorld.y) * 0.16 + uTime * 1.3));
        float vehDistSq = dot(vRoadWorld - uVehiclePos.xz, vRoadWorld - uVehiclePos.xz);
        float sleighTail = exp(-vehDistSq * 0.032) * (0.52 + 0.48 * rutMask);
        vec3 tailRefl = vec3(0.88, 0.22, 0.28) * sleighTail * 0.20;
        gl_FragColor.rgb += (goldRefl + auroraRefl + tailRefl) * roadMask * nightWeight;
        #include <dithering_fragment>
      `);
  };
  return material;
}

export function updateWinterRoad(
  material: THREE.MeshPhysicalMaterial,
  time: number,
  daylight: number,
  vehiclePos: THREE.Vector3,
  theme: HolidayThemeId,
  beat: number
): void {
  const u = material.userData.winterUniforms;
  if (!u) return;
  u.uTime.value = time;
  u.uDaylight.value = daylight;
  u.uVehiclePos.value.copy(vehiclePos);
  u.uBeat.value = beat;
  u.uAuroraTint.value.set(
    theme === 'cyber2099' ? '#3eeeff' : theme === 'nordic' ? '#7fd6ff' : '#3ce8b4'
  );
}

export const moonDirection = new THREE.Vector3(-0.29,0.22,-0.93).normalize();

export function shapeChristmasSky(material: THREE.ShaderMaterial): void {
  material.uniforms.uMoonDirection = { value: moonDirection };
  material.uniforms.uMoonMap = { value: createMoonSurfaceTexture() };
  material.uniforms.uMoonPhase = { value: 0.5 };
  material.uniforms.uTopColor.value.set('#10173c');
  material.uniforms.uMidColor.value.set('#234c7c');
  material.uniforms.uHorizonColor.value.set('#5c638d');
  material.fragmentShader = material.fragmentShader
    .replace('float band1 = exp(-pow((y - (0.31 + w1)) * 7.8, 2.0));',
      'float band1 = exp(-pow((y - (0.16 + w1 * 0.7)) * 10.0, 2.0));')
    .replace('float band2 = exp(-pow((y - (0.43 + w2)) * 9.0, 2.0));',
      'float band2 = exp(-pow((y - (0.32 + w2 * 0.64)) * 11.0, 2.0));')
    .replace('gl_FragColor = vec4(col, 1.0);', /* glsl */`
      vec2 wisps = vec2(az*3.0 + uTime*0.014, y*19.0);
      float cloud = winterNoise(wisps) * 0.72 + winterNoise(wisps*2.8) * 0.28;
      float cloudLayer = smoothstep(0.57,0.79,cloud) * exp(-pow((y-0.075)*15.0,2.0));
      col = mix(col, mix(vec3(0.42,0.35,0.57), vec3(0.84,0.89,0.98), uDaylight), cloudLayer*0.34);
      float curtainBase = 0.15+0.06*sin(az*5.0-uTime*0.07)+0.035*sin(az*9.0+0.4);
      float fromRim = y-curtainBase;
      float curtain = smoothstep(-0.033,0.018,fromRim)*exp(-max(0.0,fromRim)*7.0);
      float folds = winterNoise(vec2(az*42.0+y*4.5+uTime*0.09,y*3.0));
      float threads = 0.55+0.45*sin(az*88.0+sin(y*11.0)*0.6+uTime*0.22);
      float band = smoothstep(0.33,0.74,folds)*threads*curtain;
      vec3 auroraA = uThemeMode > 1.5
        ? vec3(0.10, 0.92, 1.0)
        : (uThemeMode > 0.5 ? vec3(0.32, 0.90, 1.0) : vec3(0.07, 0.81, 0.63));
      vec3 auroraB = uThemeMode > 1.5
        ? vec3(0.95, 0.20, 0.78)
        : (uThemeMode > 0.5 ? vec3(0.24, 0.78, 0.86) : vec3(0.84, 0.26, 0.64));
      vec3 aurora = mix(auroraA, auroraB, smoothstep(-0.35,0.8,sin(az*2.7+0.8)+fromRim*2.0));
      col += aurora*(band*0.38+0.10*exp(-abs(fromRim)*39.0)*folds)*nightVis*(0.55+0.45*uAuroraBoost);
      vec3 moonRight = normalize(cross(uMoonDirection, vec3(0.0,1.0,0.0)));
      vec3 moonUp = cross(moonRight,uMoonDirection);
      vec2 lunar = vec2(dot(dir,moonRight),dot(dir,moonUp)) / 0.054;
      float lunarRadius = length(lunar);
      if (dot(dir,uMoonDirection) > 0.0 && lunarRadius < 3.0) {
        float fullness = 0.5 - 0.5 * cos(uMoonPhase * 6.28318);
        float moonVis = (0.38 + 0.62 * fullness) * (0.28 + 0.72 * nightVis);
        col += vec3(0.53,0.65,1.0) * exp(-lunarRadius*lunarRadius*0.85) * 0.44 * moonVis;
        if (lunarRadius < 1.0) {
          vec3 normal = vec3(lunar,sqrt(max(0.0,1.0-dot(lunar,lunar))));
          vec2 uv = vec2(0.5+atan(normal.x,normal.z)/6.28318,0.5+asin(normal.y)/3.14159);
          vec3 craters = texture2D(uMoonMap,uv).rgb;
          float phaseAngle = (0.5 - uMoonPhase) * 6.28318;
          vec3 moonSun = normalize(vec3(sin(phaseAngle), 0.16, cos(phaseAngle)));
          float light = mix(0.24, 1.0, smoothstep(-0.22, 0.26, dot(normal, moonSun)));
          vec3 disk = mix(vec3(0.59,0.65,0.8),vec3(1.0,0.95,0.86),craters.r)*light;
          float diskMask = (1.0-smoothstep(0.966,1.0,lunarRadius)) * (0.45 + 0.55 * nightVis);
          col = mix(col,disk,diskMask);
        }
      }
      gl_FragColor = vec4(col, 1.0);
    `);
  material.fragmentShader = 'uniform vec3 uMoonDirection;\nuniform sampler2D uMoonMap;\nuniform float uMoonPhase;\n' + snowNoise + material.fragmentShader;
}

const midnightHorizonTarget = new THREE.Color('#344572');
const workSkyColor = new THREE.Color();

export function applyChristmasSkyEnv(
  material: THREE.ShaderMaterial,
  env: EnvironmentState,
  live: LiveWorldState,
  beat: number,
  flightFactor: number
): void {
  const u = material.uniforms;
  u.uThemeMode.value = env.theme === 'cyber2099' ? 2.0 : env.theme === 'nordic' ? 1.0 : 0.0;
  u.uDaylight.value = env.daylightFactor;
  if (u.uMoonPhase) u.uMoonPhase.value = env.moonPhase;
  u.uAuroraBoost.value =
    THREE.MathUtils.clamp(live.auroraLiveBoost, 0.9, 1.7) * 1.12 +
    beat * 0.45 +
    flightFactor * 0.55;
  u.uTopColor.value.set(env.skyTopColor);
  u.uMidColor.value.set(env.skyMidColor);
  workSkyColor.set(env.skyHorizonColor);
  if (env.theme === 'classic' && env.effectiveSky === 'midnight') {
    workSkyColor.lerp(midnightHorizonTarget, 0.38);
  }
  u.uHorizonColor.value.copy(workSkyColor);
}
