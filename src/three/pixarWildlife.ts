import * as THREE from 'three';

export type WildlifeKind = 'stag' | 'fox' | 'owl' | 'rabbit';

export interface PixarAnimalHandle {
  group: THREE.Group;
  kind: WildlifeKind;
  update(dt: number, time: number, sleighAlert: number): void;
}

interface WildlifeMaterials {
  stagFur: THREE.MeshPhysicalMaterial;
  stagBelly: THREE.MeshPhysicalMaterial;
  foxFur: THREE.MeshPhysicalMaterial;
  owlBody: THREE.MeshPhysicalMaterial;
  owlWing: THREE.MeshStandardMaterial;
  rabbitFur: THREE.MeshPhysicalMaterial;
  whiteTuft: THREE.MeshStandardMaterial;
  antler: THREE.MeshStandardMaterial;
  woodStump: THREE.MeshStandardMaterial;
  snowCap: THREE.MeshStandardMaterial;
  darkDetail: THREE.MeshPhysicalMaterial;
  amberGold: THREE.MeshStandardMaterial;
  pinkNose: THREE.MeshStandardMaterial;
  catchlight: THREE.MeshBasicMaterial;
}

let cachedMats: WildlifeMaterials | null = null;

function markShared<T extends THREE.Material>(m: T): T {
  m.userData.shared = true;
  return m;
}

function getMats(): WildlifeMaterials {
  if (cachedMats) return cachedMats;
  cachedMats = {
    stagFur: markShared(
      new THREE.MeshPhysicalMaterial({
        color: '#8f5836',
        roughness: 0.72,
        sheen: 0.65,
        sheenColor: new THREE.Color('#cfa07a'),
      })
    ),
    stagBelly: markShared(
      new THREE.MeshPhysicalMaterial({
        color: '#dfcbb2',
        roughness: 0.78,
        sheen: 0.4,
      })
    ),
    foxFur: markShared(
      new THREE.MeshPhysicalMaterial({
        color: '#d95b26',
        roughness: 0.68,
        sheen: 0.7,
        sheenColor: new THREE.Color('#ffaa75'),
      })
    ),
    owlBody: markShared(
      new THREE.MeshPhysicalMaterial({
        color: '#f2f5fa',
        roughness: 0.72,
        sheen: 0.6,
        sheenColor: new THREE.Color('#dbe8ff'),
      })
    ),
    owlWing: markShared(new THREE.MeshStandardMaterial({ color: '#c4cddb', roughness: 0.76 })),
    rabbitFur: markShared(
      new THREE.MeshPhysicalMaterial({
        color: '#f4f0e8',
        roughness: 0.76,
        sheen: 0.65,
      })
    ),
    whiteTuft: markShared(new THREE.MeshStandardMaterial({ color: '#f7f8fc', roughness: 0.75 })),
    antler: markShared(new THREE.MeshStandardMaterial({ color: '#e6d0ad', roughness: 0.52 })),
    woodStump: markShared(new THREE.MeshStandardMaterial({ color: '#4f3324', roughness: 0.9 })),
    snowCap: markShared(new THREE.MeshStandardMaterial({ color: '#d7e6f7', roughness: 0.65 })),
    darkDetail: markShared(new THREE.MeshPhysicalMaterial({ color: '#14151c', roughness: 0.12, clearcoat: 0.9 })),
    amberGold: markShared(new THREE.MeshStandardMaterial({ color: '#ffbe44', roughness: 0.35 })),
    pinkNose: markShared(new THREE.MeshStandardMaterial({ color: '#f08c96', roughness: 0.48 })),
    catchlight: markShared(new THREE.MeshBasicMaterial({ color: '#ffffff' })),
  };
  return cachedMats;
}

function makePixarEye(mats: WildlifeMaterials, radius: number, irisMat?: THREE.Material): THREE.Mesh {
  const eye = new THREE.Mesh(new THREE.SphereGeometry(radius, 8, 8), irisMat ?? mats.darkDetail);
  const glint = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.36, 6, 6), mats.catchlight);
  glint.position.set(radius * 0.28, radius * 0.32, radius * 0.76);
  eye.add(glint);
  return eye;
}

export function createPixarForestAnimal(kind: WildlifeKind, seed = 0): PixarAnimalHandle {
  const mats = getMats();
  const root = new THREE.Group();

  if (kind === 'stag') {
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.74, 8, 12), mats.stagFur);
    torso.rotation.x = Math.PI * 0.5;
    torso.position.y = 0.88;
    root.add(torso);

    const chest = new THREE.Mesh(new THREE.SphereGeometry(0.27, 10, 10), mats.stagBelly);
    chest.position.set(0, 0.84, 0.38);
    root.add(chest);

    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.24, 7), mats.whiteTuft);
    tail.rotation.x = -0.8;
    tail.position.set(0, 1.0, -0.52);
    root.add(tail);

    const legCoords: [number, number][] = [
      [-0.16, 0.34],
      [0.16, 0.34],
      [-0.16, -0.34],
      [0.16, -0.34],
    ];
    const legUpperFl = new THREE.Group();
    legCoords.forEach(([lx, lz], idx) => {
      const leg = idx === 0 ? legUpperFl : new THREE.Group();
      leg.position.set(lx, 0.72, lz);
      const shaft = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.54, 4, 8), mats.stagFur);
      shaft.position.y = -0.32;
      const hoof = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.062, 0.08, 7), mats.darkDetail);
      hoof.position.y = -0.66;
      leg.add(shaft, hoof);
      root.add(leg);
    });

    const headPivot = new THREE.Group();
    headPivot.position.set(0, 1.02, 0.42);
    const neck = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.36, 6, 10), mats.stagFur);
    neck.rotation.x = 0.42;
    neck.position.set(0, 0.18, 0.1);
    headPivot.add(neck);

    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 10), mats.stagFur);
    cranium.position.set(0, 0.42, 0.22);
    headPivot.add(cranium);

    const snout = new THREE.Mesh(new THREE.CapsuleGeometry(0.105, 0.16, 6, 8), mats.stagBelly);
    snout.rotation.x = Math.PI * 0.5;
    snout.position.set(0, 0.37, 0.38);
    headPivot.add(snout);

    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), mats.darkDetail);
    nose.position.set(0, 0.4, 0.49);
    headPivot.add(nose);

    const ears: THREE.Mesh[] = [];
    const eyes: THREE.Mesh[] = [];
    for (const s of [-1, 1]) {
      const eye = makePixarEye(mats, 0.042);
      eye.position.set(s * 0.125, 0.46, 0.33);
      eye.rotation.y = s * 0.35;
      headPivot.add(eye);
      eyes.push(eye);

      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 6), mats.stagFur);
      ear.rotation.z = s * 1.15;
      ear.position.set(s * 0.19, 0.5, 0.15);
      headPivot.add(ear);
      ears.push(ear);

      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.032, 0.56, 6), mats.antler);
      beam.position.set(s * 0.18, 0.78, 0.14);
      beam.rotation.z = -s * 0.42;
      beam.rotation.x = -0.22;
      const tine1 = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.024, 0.28, 6), mats.antler);
      tine1.position.set(s * 0.16, 0.74, 0.28);
      tine1.rotation.x = 0.7;
      const tine2 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.02, 0.24, 6), mats.antler);
      tine2.position.set(s * 0.29, 0.92, 0.1);
      tine2.rotation.z = -s * 0.8;
      headPivot.add(beam, tine1, tine2);
    }
    root.add(headPivot);

    let blinkT = 1.4 + (seed % 3);
    let blinkVal = 0;

    return {
      group: root,
      kind,
      update(dt: number, time: number, sleighAlert: number): void {
        const alert = Math.max(0, Math.min(1, sleighAlert));
        const graze = Math.sin(time * 0.85 + seed) * 0.5 + 0.5;
        headPivot.rotation.x = (1 - alert) * (0.18 + graze * 0.38) - alert * 0.12;
        headPivot.rotation.y = Math.sin(time * 0.55 + seed) * 0.22 * (0.4 + alert * 0.6);
        legUpperFl.rotation.x = alert > 0.35 ? Math.max(0, Math.sin(time * 4.5 + seed)) * 0.32 : 0;
        ears.forEach((ear, i) => {
          const s = i === 0 ? -1 : 1;
          ear.rotation.z = s * (1.15 - alert * 0.35);
        });

        blinkT -= dt;
        if (blinkT <= 0) {
          blinkT = 2.5 + ((seed * 1.7 + time) % 3);
          blinkVal = 1;
        }
        blinkVal = Math.max(0, blinkVal - dt * 8);
        for (const e of eyes) e.scale.y = Math.max(0.14, 1 - blinkVal * 0.86);
      },
    };
  }

  if (kind === 'fox') {
    const bodyPivot = new THREE.Group();
    root.add(bodyPivot);

    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.44, 8, 12), mats.foxFur);
    torso.rotation.x = Math.PI * 0.5;
    torso.position.y = 0.42;
    bodyPivot.add(torso);

    const bib = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), mats.whiteTuft);
    bib.position.set(0, 0.44, 0.22);
    bodyPivot.add(bib);

    const fLegs: [number, number][] = [
      [-0.1, 0.18],
      [0.1, 0.18],
      [-0.1, -0.2],
      [0.1, -0.2],
    ];
    for (const [lx, lz] of fLegs) {
      const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.042, 0.22, 4, 6), mats.foxFur);
      upper.position.set(lx, 0.24, lz);
      const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.044, 0.16, 6), mats.darkDetail);
      sock.position.set(lx, 0.08, lz);
      bodyPivot.add(upper, sock);
    }

    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.56, 0.24);
    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.165, 10, 10), mats.foxFur);
    cranium.scale.set(1.06, 0.94, 1.0);
    const snout = new THREE.Mesh(new THREE.ConeGeometry(0.095, 0.22, 8), mats.whiteTuft);
    snout.rotation.x = Math.PI * 0.5;
    snout.position.set(0, -0.02, 0.19);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.032, 6, 6), mats.darkDetail);
    nose.position.set(0, -0.01, 0.3);
    headPivot.add(cranium, snout, nose);

    for (const s of [-1, 1]) {
      const eye = makePixarEye(mats, 0.032);
      eye.position.set(s * 0.09, 0.04, 0.13);
      headPivot.add(eye);

      const earBase = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.16, 6), mats.foxFur);
      earBase.position.set(s * 0.11, 0.17, -0.02);
      earBase.rotation.z = -s * 0.22;
      const earTip = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.07, 6), mats.darkDetail);
      earTip.position.set(s * 0.125, 0.24, -0.02);
      earTip.rotation.z = -s * 0.22;
      headPivot.add(earBase, earTip);
    }
    bodyPivot.add(headPivot);

    const tailPivot = new THREE.Group();
    tailPivot.position.set(0, 0.44, -0.24);
    const brush = new THREE.Mesh(new THREE.CapsuleGeometry(0.095, 0.34, 6, 10), mats.foxFur);
    brush.rotation.x = -0.95;
    brush.position.set(0, 0.08, -0.2);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.16, 8), mats.whiteTuft);
    tip.rotation.x = -0.95;
    tip.position.set(0, 0.18, -0.37);
    tailPivot.add(brush, tip);
    bodyPivot.add(tailPivot);

    return {
      group: root,
      kind,
      update(_dt: number, time: number, sleighAlert: number): void {
        const wagSpeed = 4.2 + sleighAlert * 4.0;
        tailPivot.rotation.y = Math.sin(time * wagSpeed + seed) * (0.4 + sleighAlert * 0.25);
        tailPivot.rotation.x = Math.sin(time * 2.2 + seed) * 0.12;
        headPivot.rotation.z = Math.sin(time * 1.4 + seed) * 0.24;
        headPivot.rotation.y = Math.sin(time * 0.9 + seed) * 0.32;
        bodyPivot.position.y = Math.abs(Math.sin(time * 3.1 + seed)) * (0.04 + sleighAlert * 0.08);
      },
    };
  }

  if (kind === 'owl') {
    const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 1.05, 9), mats.woodStump);
    stump.position.y = 0.52;
    const stumpSnow = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.25, 0.1, 9), mats.snowCap);
    stumpSnow.position.y = 1.04;
    root.add(stump, stumpSnow);

    const owlBody = new THREE.Group();
    owlBody.position.y = 1.09;
    root.add(owlBody);

    const torso = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), mats.owlBody);
    torso.scale.set(0.95, 1.25, 0.92);
    torso.position.y = 0.25;
    owlBody.add(torso);

    const wingL = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.24, 6, 8), mats.owlWing);
    wingL.position.set(-0.2, 0.28, -0.02);
    wingL.rotation.z = 0.22;
    const wingR = wingL.clone();
    wingR.position.x = 0.2;
    wingR.rotation.z = -0.22;
    owlBody.add(wingL, wingR);

    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.52, 0.02);
    const headSphere = new THREE.Mesh(new THREE.SphereGeometry(0.175, 12, 10), mats.owlBody);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.036, 0.09, 6), mats.amberGold);
    beak.rotation.x = Math.PI * 0.55;
    beak.position.set(0, -0.02, 0.19);
    headPivot.add(headSphere, beak);

    const eyes: THREE.Mesh[] = [];
    for (const s of [-1, 1]) {
      const eye = makePixarEye(mats, 0.045, mats.amberGold);
      eye.position.set(s * 0.075, 0.03, 0.145);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.024, 6, 6), mats.darkDetail);
      pupil.position.z = 0.028;
      eye.add(pupil);
      headPivot.add(eye);
      eyes.push(eye);

      const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 5), mats.owlWing);
      tuft.position.set(s * 0.11, 0.15, 0.04);
      tuft.rotation.z = -s * 0.45;
      headPivot.add(tuft);
    }
    owlBody.add(headPivot);

    let blinkT = 2.0 + (seed % 2.4);
    let blinkVal = 0;

    return {
      group: root,
      kind,
      update(dt: number, time: number, sleighAlert: number): void {
        headPivot.rotation.y = Math.sin(time * 0.9 + seed) * 0.65;
        const flap = Math.abs(Math.sin(time * 6.5 + seed)) * sleighAlert * 0.55;
        wingL.rotation.z = 0.22 + flap;
        wingR.rotation.z = -0.22 - flap;

        blinkT -= dt;
        if (blinkT <= 0) {
          blinkT = 2.2 + ((seed + time) % 2.6);
          blinkVal = 1;
        }
        blinkVal = Math.max(0, blinkVal - dt * 9);
        for (const e of eyes) e.scale.y = Math.max(0.14, 1 - blinkVal * 0.86);
      },
    };
  }

  // Rabbit
  const bunnyPivot = new THREE.Group();
  root.add(bunnyPivot);

  const bBody = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), mats.rabbitFur);
  bBody.scale.set(0.88, 0.95, 1.18);
  bBody.position.y = 0.17;
  const puffTail = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), mats.whiteTuft);
  puffTail.position.set(0, 0.16, -0.21);
  bunnyPivot.add(bBody, puffTail);

  const bHead = new THREE.Group();
  bHead.position.set(0, 0.34, 0.14);
  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.135, 10, 10), mats.rabbitFur);
  const noseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), mats.pinkNose);
  noseMesh.position.set(0, -0.02, 0.13);
  bHead.add(headMesh, noseMesh);

  const rEars: THREE.Mesh[] = [];
  for (const s of [-1, 1]) {
    const eye = makePixarEye(mats, 0.028);
    eye.position.set(s * 0.08, 0.03, 0.095);
    bHead.add(eye);

    const ear = new THREE.Mesh(new THREE.CapsuleGeometry(0.034, 0.2, 4, 8), mats.rabbitFur);
    ear.position.set(s * 0.055, 0.21, -0.02);
    ear.rotation.z = -s * 0.14;
    ear.rotation.x = -0.18;
    bHead.add(ear);
    rEars.push(ear);
  }
  bunnyPivot.add(bHead);

  return {
    group: root,
    kind,
    update(_dt: number, time: number, sleighAlert: number): void {
      const cycle = (time * (1.35 + sleighAlert * 0.5) + seed * 0.4) % 1;
      const hopPhase = cycle < 0.45 ? Math.sin((cycle / 0.45) * Math.PI) : 0;
      const squash = cycle >= 0.45 && cycle < 0.62 ? Math.sin(((cycle - 0.45) / 0.17) * Math.PI) : 0;

      bunnyPivot.position.y = hopPhase * 0.34;
      bunnyPivot.scale.set(1 + squash * 0.16, 1 - squash * 0.2 + hopPhase * 0.1, 1 + squash * 0.16);
      bHead.rotation.x = -hopPhase * 0.22 + squash * 0.15;
      rEars.forEach((ear, i) => {
        ear.rotation.x = -0.18 - hopPhase * 0.28 + Math.sin(time * 5 + i + seed) * 0.08;
      });
    },
  };
}
