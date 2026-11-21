import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type OptionalModelKey = 'semi' | 'cybertruck' | 'starship' | 'roadster' | 'supercharger' | 'optimus';

let manifestCache: Partial<Record<OptionalModelKey, string>> | null = null;
let manifestPromise: Promise<Partial<Record<OptionalModelKey, string>>> | null = null;
const loader = new GLTFLoader();

async function getManifest(): Promise<Partial<Record<OptionalModelKey, string>>> {
  if (manifestCache) return manifestCache;
  if (!manifestPromise) {
    manifestPromise = fetch('./models/manifest.json')
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        manifestCache = data && typeof data === 'object' ? data : {};
        return manifestCache!;
      })
      .catch(() => {
        manifestCache = {};
        return manifestCache;
      });
  }
  return manifestPromise;
}

/**
 * Checks `./models/manifest.json` (zero 404 console errors when no custom GLBs are installed)
 * and loads/normalizes any optional drop-in `.glb` model specified there.
 */
export function tryLoadOptionalGlb(
  key: OptionalModelKey,
  targetMaxSize: number,
  onLoaded: (model: THREE.Group) => void
): void {
  getManifest().then((manifest) => {
    const file = manifest[key];
    if (!file) return;
    loader.load(
      `./models/${file}`,
      (gltf) => {
        const root = gltf.scene;
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        const maxDim = Math.max(size.x, size.y, size.z, 0.001);
        const scale = targetMaxSize / maxDim;
        root.scale.setScalar(scale);
        root.position.sub(center.multiplyScalar(scale));
        root.position.y -= (box.min.y * scale);
        onLoaded(root);
      },
      undefined,
      () => {
        // Ignore load errors silently
      }
    );
  });
}
