import * as THREE from 'three';

// Each crown has three overlapping boughs. Two instanced meshes draw the
// whole grove, including the separate moonlit caps, in both graphics modes.
export class WinterGrove {
  readonly group = new THREE.Group();
  private readonly crowns: THREE.InstancedMesh;
  private readonly caps: THREE.InstancedMesh;
  private readonly transform = new THREE.Object3D();
  private readonly trees = Array.from({ length: 54 }, (_, i) => ({
    side: i % 2 ? 1 : -1,
    offset: (i * 37) % 246,
    setback: 12 + (i * 17) % 23,
    height: 4 + (i * 7) % 9,
  }));

  constructor() {
    const crown = new THREE.ConeGeometry(1, 1, 9);
    const count = this.trees.length * 3;
    this.crowns = new THREE.InstancedMesh(crown, new THREE.MeshStandardMaterial({ color: '#174047', flatShading: true }), count);
    this.caps = new THREE.InstancedMesh(crown, new THREE.MeshStandardMaterial({ color: '#c4d6e6', roughness: 0.85 }), count);
    for (const mesh of [this.crowns, this.caps]) {
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.frustumCulled = false;
      this.group.add(mesh);
    }
  }

  update(distance: number, roadX: (z: number) => number): void {
    const t = this.transform;
    let index = 0;
    for (const tree of this.trees) {
      const z = ((distance + tree.offset) % 246) - 226;
      const x = roadX(z) + tree.side * tree.setback;
      for (let tier = 0; tier < 3; tier++) {
        const radius = tree.height * (0.24 - tier * 0.046);
        const height = tree.height * (0.54 - tier * 0.055);
        t.position.set(x, tree.height * (0.3 + tier * 0.23), z);
        t.scale.set(radius, height, radius);
        t.rotation.y = tree.offset + tier * 0.5;
        t.updateMatrix();
        this.crowns.setMatrixAt(index, t.matrix);
        t.position.y += height * 0.13;
        t.scale.multiplyScalar(0.81);
        t.updateMatrix();
        this.caps.setMatrixAt(index++, t.matrix);
      }
    }
    this.crowns.instanceMatrix.needsUpdate = this.caps.instanceMatrix.needsUpdate = true;
  }

  dispose(): void {
    this.crowns.dispose();
    this.caps.dispose();
  }
}
