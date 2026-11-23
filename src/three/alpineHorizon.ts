import * as THREE from 'three';

// A theatrical backdrop with no world features placed inside the map.
export function createAlpineHorizon(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Alpine sky backdrop';
  const sectors = 256;
  const layers = [
    { radius:655, low:16, high:103, seed:2.8, blue:'#465b84', snow:'#b5abce' },
    { radius:498, low:11, high:75, seed:0.7, blue:'#3a5678', snow:'#aaa9cf' },
    { radius:374, low:4, high:36, seed:4.2, blue:'#304a64', snow:'#7994b6' },
  ];
  for (const layer of layers) {
    const positions: number[] = [], colors: number[] = [], indices: number[] = [];
    const base = new THREE.Color(layer.blue), top = new THREE.Color(layer.snow);
    const rose = new THREE.Color('#f0aac0');
    const stride = 6;
    for (let i = 0; i <= sectors; i++) {
      const a = 2*Math.PI*i/sectors;
      const broad = 0.5+0.5*Math.sin(a*5+layer.seed);
      const jagged = 0.66+Math.sin(a*9+layer.seed)*0.18 + Math.cos(a*23-layer.seed)*0.12 +
        Math.sin(a*39+1.7)*0.055;
      const peak = layer.low + layer.high*Math.pow(broad,0.82)*jagged;
      const crease = Math.cos(a*35 + layer.seed);
      for (let j = 0; j < stride; j++) {
        const t = j/(stride-1);
        const radius = layer.radius - (1-t)*59 + crease*2.5;
        const height = THREE.MathUtils.lerp(-3,peak,Math.pow(t,1.21));
        positions.push(Math.sin(a)*radius,height,Math.cos(a)*radius);
        const snowy = THREE.MathUtils.smoothstep(t+crease*0.045,0.42,1);
        const tint = base.clone().lerp(top,snowy).lerp(rose,snowy*Math.max(0,Math.sin(a+1.1))*0.26);
        tint.multiplyScalar(0.82+0.17*crease+0.09*t);
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
    const mesh = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({
      vertexColors:true, side:THREE.DoubleSide, fog:false, toneMapped:false,
      depthTest:false, depthWrite:false,
    }));
    mesh.renderOrder = -2;
    group.add(mesh);
  }
  return group;
}
