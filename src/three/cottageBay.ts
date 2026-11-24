import * as THREE from 'three';

// Courses of a three-sided oriel. The rear edge sits flush with the wall.
export function buildCottageBay(): THREE.BufferGeometry {
  const positions: number[] = [], colors: number[] = [];
  const ring = [[-0.90,0],[-0.55,0.46],[0.55,0.46],[0.90,0]];
  const courses: [number, number, string][] = [
    [0.39,0.67,'#634538'],[0.61,0.96,'#91654c'],[0.67,1.04,'#efd3a0'],
    [0.78,0.96,'#784234'],[1.96,0.96,'#854634'],[2.03,1.04,'#f1d6a2'],
    [2.10,1.13,'#506563'],[2.16,1.14,'#dae2ec'],[2.48,0.59,'#f0eced'],
    [2.51,0.01,'#fff1e3'],
  ];
  for (let row = 1; row < courses.length; row++) {
    const [bottom,lo,color] = courses[row-1], [top,hi] = courses[row];
    const tint = new THREE.Color(color);
    for (let face = 0; face < 3; face++) {
      const [ax,az] = ring[face], [bx,bz] = ring[face+1];
      for (const [x,y,z] of [[ax*lo,bottom,az*lo],[bx*lo,bottom,bz*lo],[bx*hi,top,bz*hi],
        [ax*lo,bottom,az*lo],[bx*hi,top,bz*hi],[ax*hi,top,az*hi]]) {
        positions.push(x,y,z);
        colors.push(tint.r,tint.g,tint.b);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  geometry.computeVertexNormals();
  return geometry;
}
