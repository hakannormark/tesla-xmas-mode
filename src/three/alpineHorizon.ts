import * as THREE from 'three';
import type { EnvironmentState } from '../core/environment';
import { getSoftGlowTexture } from './pixarMaterials';

export interface AlpineHorizonHandle {
  group: THREE.Group;
  update(time: number, env: EnvironmentState): void;
}

// A theatrical backdrop with no world features placed inside the map.
export function createAlpineHorizon(): AlpineHorizonHandle {
  const group = new THREE.Group();
  group.name = 'Alpine sky backdrop';
  const sectors = 256;
  const ridgeMats: THREE.MeshBasicMaterial[] = [];
  const layers = [
    { radius:655, low:16, high:103, seed:2.8, blue:'#465b84', snow:'#b5abce' },
    { radius:498, low:11, high:75, seed:0.7, blue:'#3a5678', snow:'#aaa9cf' },
    { radius:374, low:4, high:36, seed:4.2, blue:'#304a64', snow:'#7994b6' },
  ];
  for (const layer of layers) {
    const positions: number[] = [], colors: number[] = [], indices: number[] = [];
    const base = new THREE.Color(layer.blue), top = new THREE.Color(layer.snow);
    const rose = new THREE.Color('#f0aac0');
    const stride = 12;
    for (let i = 0; i <= sectors; i++) {
      const a = 2*Math.PI*i/sectors;
      const broad = 0.5+0.5*Math.sin(a*5+layer.seed);
      const jagged = 0.66+Math.sin(a*9+layer.seed)*0.18 + Math.cos(a*23-layer.seed)*0.12 +
        Math.sin(a*39+1.7)*0.055;
      const spine = 1-Math.abs(Math.sin(a*14+0.8*Math.sin(a*5)+layer.seed));
      const peak = layer.low + layer.high*(0.23+0.77*broad)*jagged*(0.68+0.53*spine);
      const crease = Math.cos(a*35 + layer.seed);
      for (let j = 0; j < stride; j++) {
        const t = j/(stride-1);
        const ravine = Math.cos(a*39+layer.seed+2.7*(1-t)*Math.sin(a*7));
        const radius = layer.radius - (1-t)*59 + ravine*9*Math.sin(Math.PI*t);
        const height = THREE.MathUtils.lerp(-3,peak,Math.pow(t,1.21));
        positions.push(Math.sin(a)*radius,height,Math.cos(a)*radius);
        const snowy = THREE.MathUtils.smoothstep(t+(ravine*0.17+0.09*Math.sin(a*71))*Math.sin(Math.PI*t),0.39,0.86);
        const tint = base.clone().lerp(top,snowy).lerp(rose,snowy*Math.max(0,Math.sin(a+1.1))*0.26);
        tint.multiplyScalar(0.76+0.20*ravine+0.11*crease+0.09*t);
        colors.push(tint.r,tint.g,tint.b);
        if (i > 0 && j > 0) {
          const k = i*stride+j;
          indices.push(k-stride-1,k-1,k,k-stride-1,k,k-stride);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    geometry.setIndex(indices);
    const mat = new THREE.MeshBasicMaterial({
      vertexColors:true, side:THREE.DoubleSide, fog:false, toneMapped:false,
      depthTest:false, depthWrite:false,
    });
    ridgeMats.push(mat);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.renderOrder = -2;
    group.add(mesh);
  }

  const glowTex = getSoftGlowTexture();
  const mistMats: THREE.SpriteMaterial[] = [];
  for (let m = 0; m < 16; m++) {
    const a = (m / 16) * Math.PI * 2;
    const mat = new THREE.SpriteMaterial({
      map: glowTex,
      color: m % 2 === 0 ? '#a9c7f0' : '#dec8dc',
      transparent: true,
      opacity: 0.14,
      depthTest: false,
      depthWrite: false,
      fog: false,
    });
    mistMats.push(mat);
    const mist = new THREE.Sprite(mat);
    mist.scale.set(165, 34, 1);
    mist.position.set(Math.sin(a) * 350, 9 + (m % 2) * 3, Math.cos(a) * 350);
    mist.renderOrder = -1;
    group.add(mist);
  }

  const chalets: Array<{ mat: THREE.SpriteMaterial; phase: number; baseOpacity: number }> = [];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2 + (i % 3) * 0.08;
    const mat = new THREE.SpriteMaterial({
      map: glowTex,
      color: i % 3 === 0 ? '#ffd886' : '#ffb85c',
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      fog: false,
    });
    const sp = new THREE.Sprite(mat);
    const sc = 7.5 + (i % 4) * 2.2;
    sp.scale.set(sc, sc * 0.78, 1);
    const r = 362 - (i % 3) * 8;
    sp.position.set(Math.sin(a) * r, 7 + (i % 5) * 2.4, Math.cos(a) * r);
    sp.renderOrder = -1;
    group.add(sp);
    chalets.push({ mat, phase: i * 1.15, baseOpacity: 0.56 + (i % 3) * 0.12 });
  }

  const tintTarget = new THREE.Color();
  return {
    group,
    update(time: number, env: EnvironmentState): void {
      const d = env.daylightFactor;
      const b = env.blueHourFactor;
      if (env.theme === 'cyber2099') {
        tintTarget.set('#9e8ce6').lerp(new THREE.Color('#c8bce8'), d);
      } else if (d > 0.6) {
        tintTarget.setRGB(1.18, 1.24, 1.32);
      } else if (b > 0.4) {
        tintTarget.setRGB(1.12, 0.98, 1.06);
      } else if (env.theme === 'nordic') {
        tintTarget.set('#8db4dc');
      } else {
        tintTarget.set('#ffffff');
      }
      for (const mat of ridgeMats) {
        mat.color.copy(tintTarget);
      }
      const mistOpacity = env.theme === 'cyber2099' ? 0.12 : 0.13 + d * 0.08;
      for (const [idx, m] of mistMats.entries()) {
        m.opacity = mistOpacity;
        if (env.theme === 'cyber2099') m.color.set(idx % 2 === 0 ? '#5c529a' : '#8a3e78');
        else m.color.set(idx % 2 === 0 ? '#a9c7f0' : d > 0.6 ? '#eef4fc' : '#dec8dc');
      }
      const nightVis = Math.max(0.08, 1 - d * 0.9);
      for (const ch of chalets) {
        const tw = 0.72 + 0.28 * Math.sin(time * 2.1 + ch.phase);
        ch.mat.opacity = ch.baseOpacity * tw * nightVis;
        if (env.theme === 'cyber2099') ch.mat.color.set('#5ceeff');
        else ch.mat.color.set(ch.phase % 3 < 1 ? '#ffd886' : '#ffb85c');
      }
    },
  };
}
