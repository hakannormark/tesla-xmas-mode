import * as THREE from 'three';
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
  material.onBeforeCompile = shader => {
    shader.vertexShader = 'varying vec2 vSnowWorld;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\nvSnowWorld = (modelMatrix * vec4(position, 1.0)).xz;',
    );
    shader.fragmentShader = 'varying vec2 vSnowWorld;\n' + snowNoise + shader.fragmentShader.replace(
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
      `,
    );
  };
  return material;
}

export function createWinterRoad(): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({color:'#394761',roughness:0.7});
  material.defines = { USE_UV: 1 };
  material.onBeforeCompile = shader => {
    shader.vertexShader = 'varying vec2 vRoad;\nvarying vec2 vRoadWorld;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\nvRoad = uv;\nvRoadWorld = (modelMatrix * vec4(position,1.0)).xz;',
    );
    shader.fragmentShader = 'varying vec2 vRoad;\nvarying vec2 vRoadWorld;\n' + snowNoise + shader.fragmentShader.replace(
      '#include <color_fragment>', /* glsl */`
      #include <color_fragment>
      float across = abs(vRoad.x-0.5);
      float slush = winterNoise(vec2(vRoad.x*13.0,vRoad.y*0.35));
      float shoulder = smoothstep(0.34,0.51,across+0.12*slush);
      float ruts = exp(-pow((across-0.24)*16.0,2.0));
      float frost = 0.1*slush + 0.16*(1.0-ruts);
      float speckles = winterNoise(vRoadWorld*3.8);
      diffuseColor.rgb *= 0.86+0.16*speckles;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.32,0.41,0.53),frost);
      diffuseColor.rgb = mix(diffuseColor.rgb,vec3(0.56,0.68,0.80), shoulder*0.76);
      `,
    );
  };
  return material;
}

export const moonDirection = new THREE.Vector3(-0.29,0.22,-0.93).normalize();

export function shapeChristmasSky(material: THREE.ShaderMaterial): void {
  material.uniforms.uMoonDirection = { value: moonDirection };
  material.uniforms.uMoonMap = { value: createMoonSurfaceTexture() };
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
      col = mix(col,vec3(0.42,0.35,0.57),cloudLayer*0.34);
      float curtainBase = 0.15+0.06*sin(az*5.0-uTime*0.07)+0.035*sin(az*9.0+0.4);
      float fromRim = y-curtainBase;
      float curtain = smoothstep(-0.033,0.018,fromRim)*exp(-max(0.0,fromRim)*7.0);
      float folds = winterNoise(vec2(az*42.0+y*4.5+uTime*0.09,y*3.0));
      float threads = 0.55+0.45*sin(az*88.0+sin(y*11.0)*0.6+uTime*0.22);
      float band = smoothstep(0.33,0.74,folds)*threads*curtain;
      vec3 aurora = mix(vec3(0.07,0.81,0.63),vec3(0.84,0.26,0.64),
        smoothstep(-0.35,0.8,sin(az*2.7+0.8)+fromRim*2.0));
      col += aurora*(band*0.38+0.10*exp(-abs(fromRim)*39.0)*folds);
      vec3 moonRight = normalize(cross(uMoonDirection, vec3(0.0,1.0,0.0)));
      vec3 moonUp = cross(moonRight,uMoonDirection);
      vec2 lunar = vec2(dot(dir,moonRight),dot(dir,moonUp)) / 0.054;
      float lunarRadius = length(lunar);
      if (dot(dir,uMoonDirection) > 0.0 && lunarRadius < 3.0) {
        col += vec3(0.53,0.65,1.0) * exp(-lunarRadius*lunarRadius*0.85)*0.42;
        if (lunarRadius < 1.0) {
          vec3 normal = vec3(lunar,sqrt(max(0.0,1.0-dot(lunar,lunar))));
          vec2 uv = vec2(0.5+atan(normal.x,normal.z)/6.28318,0.5+asin(normal.y)/3.14159);
          vec3 craters = texture2D(uMoonMap,uv).rgb;
          float light = 0.73+0.27*max(0.0,dot(normal,normalize(vec3(-0.3,0.2,1.0))));
          vec3 disk = mix(vec3(0.59,0.65,0.8),vec3(1.0,0.95,0.86),craters.r)*light;
          col = mix(col,disk,1.0-smoothstep(0.966,1.0,lunarRadius));
        }
      }
      gl_FragColor = vec4(col, 1.0);
    `);
  material.fragmentShader = 'uniform vec3 uMoonDirection;\nuniform sampler2D uMoonMap;\n' + snowNoise + material.fragmentShader;
}
