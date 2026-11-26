import './styles/christmasDrive.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LiveElevationManager } from './core/liveElevation';
import { LiveWorldDataManager, type LiveFlight } from './core/liveWorldData';
import { LocalDemoDrive } from './core/localDemo';
import { geoDeltaMeters, OsmWorldDirector, type OsmRoadRibbon } from './core/osmWorld';
import { TelemetryEngine, type TelemetryFrame } from './core/telemetry';
import { TerrainTrial, terrainBounds, terrainDatum, terrainFloor, terrainMap, trialHeight } from './core/terrainTrial';
import { i18n } from './core/i18n';
import { units } from './core/units';
import { createAlpineHorizon } from './three/alpineHorizon';
import { AmbientTraffic } from './three/AmbientTraffic';
import { ChristmasMap, updateChristmasMapAtmosphere } from './three/ChristmasMap';
import { DriveFestivities, type JulmagiState } from './three/DriveFestivities';
import { FsdHolidayPath } from './three/FsdHolidayPath';
import { projectOntoRoad } from './three/mappedRoads';
import { createBokehSnowField, createPixarSkyDome, getSoftGlowTexture } from './three/pixarMaterials';
import { createPixarSantaSleigh } from './three/pixarModels';
import { createPixarStageOrFallback } from './three/pixarRenderer';
import { normalizeSkyCinemaMode } from './three/SkyCinema';
import { SleighMagic } from './three/SleighMagic';
import { createAccurateCybertruck, createAccurateStarmanRoadster, createAccurateTeslaSemi } from './three/teslaModels';
import { VehicleLighting } from './three/VehicleLighting';
import { applyChristmasSkyEnv, createWinterGround, shapeChristmasSky, updateWinterGround } from './three/winterSurfaces';
import { DriveHud, type CameraMode, type VehicleKind } from './ui/DriveHud';
import { FlightStars } from './ui/FlightStars';

const root = document.querySelector<HTMLElement>('#app')!;
const stageHost = document.createElement('div');
stageHost.style.position = 'fixed';
stageHost.style.inset = '0';

const { stage, fallbackEl } = createPixarStageOrFallback(stageHost, {
  fov: 45,
  far: 850,
  fogColor: '#0b1630',
  fogDensity: 0.0036,
  bloomStrength: 0.44,
  bloomRadius: 0.55,
  bloomThreshold: 0.78,
  initialQuality: 'ultra',
  exposure: 1.04,
  fsdContrast: true,
});

if (!stage) {
  root.appendChild(stageHost);
  if (fallbackEl) root.appendChild(fallbackEl);
} else {
  const { scene, camera, renderer } = stage;

  const hud = new DriveHud(root);
  hud.worldEl.prepend(stageHost);

  const telemetry = new TelemetryEngine('gps');
  const map = new ChristmasMap();
  const sleigh = createPixarSantaSleigh();
  const festivities = new DriveFestivities(root, hud.worldEl, scene, sleigh, map);
  const magic = new SleighMagic();
  const applyEquippedCosmetics = (eq: JulmagiState['equipped']): void => {
    (magic as { setTrailStyle?: (s: 'classic' | 'aurora' | 'plaid' | 'candycane') => void }).setTrailStyle?.(eq.trailStyle);
    (magic as { setCompanionOwl?: (style: 'off' | 'snow' | 'cyber') => void }).setCompanionOwl?.(
      eq.companionOwl ? (eq.cyberOwl ? 'cyber' : 'snow') : 'off'
    );
    (sleigh as { setStyle?: (o: { goldenSleigh: boolean; cyberReindeer: boolean }) => void }).setStyle?.({
      goldenSleigh: eq.goldenSleigh,
      cyberReindeer: eq.cyberReindeer,
    });
  };
  festivities.onCosmeticsChange(applyEquippedCosmetics);
  applyEquippedCosmetics(festivities.getMagicState().equipped);
  const snowBaseColor = new THREE.Color('#f2f8ff');
  const snowAuroraMint = new THREE.Color('#8effd4');
  const snowAuroraViolet = new THREE.Color('#d8a8ff');
  const snowAuroraGold = new THREE.Color('#ffe494');
  const snowWorkColor = new THREE.Color();
  const fsdPath = new FsdHolidayPath();
  const vehicleLighting = new VehicleLighting();
  const ambientTraffic = new AmbientTraffic();
  const liveElevation = new LiveElevationManager();
  const director = new OsmWorldDirector(true);
  const live = new LiveWorldDataManager();

  let cameraMode: CameraMode = 'chase';
  let alignWithHeading = true;
  let heading = 0;
  let hasPosition = false;
  let priorMapOrigin: { lat: number; lon: number } | undefined;
  let demo: LocalDemoDrive | undefined;
  let demoSpeedKmh = 34;
  let demoPrevSpeedKmh = demoSpeedKmh;
  let demoBrakeHold = 0;
  let trial: TerrainTrial | undefined;
  let relief: THREE.Mesh | undefined;
  let liveElevationEnabled = true;
  let lastTerrainKey = '';
  let lastBrakeJingleAt = -10;
  let wasBraking = false;
  let cameraRoll = 0;
  let matchedRoad: OsmRoadRibbon | undefined;
  let previous = performance.now();
  let lastUi = -1000;
  let wheelPhase = 0;
  let flightSpeed = 0;
  let hoverPhase = 0;
  let roadSnapBlend = 0;
  let gpsLatBias = 0;
  let steerLaneSway = 0;
  let liveState = live.getState();
  let lastFlightStateSec = performance.now() / 1000;
  let activeFlights: LiveFlight[] = [];
  const flightTargetPos = new THREE.Vector3();
  let demoPrevHeading = 0;
  let demoHasInit = false;
  let horizonY = 0;

  const avatar = new THREE.Group();
  avatar.name = 'GPS vehicle';
  const semi = createAccurateTeslaSemi();
  const truck = createAccurateCybertruck(false);
  const roadster = createAccurateStarmanRoadster();
  roadster.rotation.y = Math.PI / 2;
  const vehicles: Record<VehicleKind, THREE.Group> = {
    sleigh: sleigh.group,
    semi: semi.group,
    cybertruck: truck.group,
    starman: roadster,
  };

  function enableVehicleShadows(rootObj: THREE.Object3D): void {
    rootObj.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const isTransparentOrFx = mats.some(
        (m) =>
          !m ||
          m.depthWrite === false ||
          m.blending === THREE.AdditiveBlending ||
          (m.transparent && m.opacity < 0.75)
      );
      if (!isTransparentOrFx) {
        mesh.castShadow = true;
      }
    });
  }
  for (const model of Object.values(vehicles)) {
    enableVehicleShadows(model);
  }
  avatar.add(...Object.values(vehicles), vehicleLighting.group);

  function selectVehicle(selected: VehicleKind): void {
    for (const [id, model] of Object.entries(vehicles)) {
      model.visible = id === selected;
    }
  }
  selectVehicle('sleigh');

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 20),
    new THREE.MeshBasicMaterial({
      map: getSoftGlowTexture(),
      color: '#394b69',
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0.093, -2);
  avatar.add(shadow);

  const groundMaterial = createWinterGround();
  groundMaterial.polygonOffset = true;
  groundMaterial.polygonOffsetFactor = 2;
  groundMaterial.polygonOffsetUnits = 2;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;

  const liveReliefGeo = new THREE.PlaneGeometry(1520, 1520, 128, 128).rotateX(-Math.PI / 2);
  const liveRelief = new THREE.Mesh(liveReliefGeo, groundMaterial);
  liveRelief.receiveShadow = true;
  liveRelief.visible = false;
  const outerSkirt = new THREE.Mesh(new THREE.RingGeometry(748, 1500, 48).rotateX(-Math.PI / 2), groundMaterial);
  outerSkirt.position.y = -0.14;
  outerSkirt.receiveShadow = true;
  outerSkirt.visible = false;

  function updateLiveTerrainMesh(sampler: (x: number, z: number) => number, key: string): void {
    if (key === lastTerrainKey) return;
    lastTerrainKey = key;
    const attr = liveReliefGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < attr.count; i++) {
      attr.setY(i, sampler(attr.getX(i), attr.getZ(i)) - 0.14);
    }
    attr.needsUpdate = true;
    liveReliefGeo.computeVertexNormals();
  }

  function createTrialTerrain(): THREE.Mesh {
    const { minX, minZ, maxX, maxZ } = terrainBounds;
    const terrainGeometry = new THREE.PlaneGeometry(
      maxX - minX,
      maxZ - minZ,
      Math.ceil((maxX - minX) / 4),
      Math.ceil((maxZ - minZ) / 4)
    )
      .rotateX(-Math.PI / 2)
      .translate((minX + maxX) / 2, 0, (minZ + maxZ) / 2);
    const terrainVertices = terrainGeometry.attributes.position;
    for (let i = 0; i < terrainVertices.count; i++) {
      terrainVertices.setY(i, trialHeight(terrainVertices.getX(i), terrainVertices.getZ(i)) - 0.077);
    }
    terrainGeometry.computeVertexNormals();
    const mesh = new THREE.Mesh(terrainGeometry, groundMaterial);
    mesh.name = 'JAXA height trial terrain';
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  }

  const sky = createPixarSkyDome(730);
  shapeChristmasSky(sky.material);
  sky.mesh.renderOrder = -3;

  const snowfall = createBokehSnowField(340, { minX: -45, maxX: 45, minY: 1, maxY: 38, minZ: -55, maxZ: 55 });
  const horizon = createAlpineHorizon();
  scene.add(
    ground,
    liveRelief,
    outerSkirt,
    sky.mesh,
    horizon.group,
    map.group,
    fsdPath.mesh,
    ambientTraffic.group,
    magic.group,
    avatar,
    snowfall.group
  );

  // Unified shadow-casting key light (collapses 4 global lights to 3 across the whole scene)
  stage.enableKeyShadow({
    mapSize: 1024,
    extent: 60,
    far: 165,
    normalBias: 0.08,
    bias: -0.0004,
  });

  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.13;
  orbit.minDistance = 8;
  orbit.maxDistance = 140;
  orbit.maxPolarAngle = Math.PI * 0.66;
  orbit.touches.ONE = THREE.TOUCH.ROTATE;
  orbit.touches.TWO = THREE.TOUCH.DOLLY_PAN;

  const cameraOffset = new THREE.Vector3();
  const currentOffset = new THREE.Vector3();
  const desiredTarget = new THREE.Vector3();
  const idleTarget = new THREE.Vector3();
  const idleOffset = new THREE.Vector3();
  const movement = new THREE.Vector3();
  const shadowOffset = new THREE.Vector3(-53, 40, 32);

  let idleStoppedSec = 0;
  let idleMovingSec = 0;
  let idleOrbitRamp = 0;
  let idleOrbitBlend = 0;
  let idleOrbitAngle = 0;
  let idleOrbitDismissed = false;
  let wasStoppedWithManualTakeover = false;

  function drivingView(
    time: number,
    speedNorm: number,
    flightFactor: number,
    groundAt?: (x: number, z: number) => number
  ): void {
    const east = Math.sin(heading);
    const north = Math.cos(heading);
    const rightX = north;
    const rightZ = east;
    const aheadSlope = groundAt ? groundAt(avatar.position.x + 12 * east, avatar.position.z - 12 * north) - avatar.position.y : 0;
    const sleighH = sleigh.group.visible ? sleigh.group.position.y : 0;

    if (cameraMode === 'map') {
      desiredTarget.set(avatar.position.x + 10 * east, avatar.position.y + 8 + aheadSlope * 0.38 + sleighH * 0.25, avatar.position.z - 10 * north);
      cameraOffset.set(-45 * east, -0.6, 45 * north);
      return;
    }

    let usedCinematicShot = false;
    if (cameraMode === 'cinematic') {
      const shot = Math.floor(time / 9.0) % 3;
      if (shot === 1) {
        desiredTarget.set(avatar.position.x + 14 * east, avatar.position.y + 2.4 + aheadSlope * 0.4 + sleighH * 0.35, avatar.position.z - 14 * north);
        cameraOffset.set(-22 * east - rightX * 6.5, 0.35 + sleighH * 0.2, 22 * north - rightZ * 6.5);
        usedCinematicShot = true;
      } else if (shot === 2) {
        desiredTarget.set(avatar.position.x + 16 * east, avatar.position.y + 2.2 + aheadSlope * 0.4 + sleighH * 0.35, avatar.position.z - 16 * north);
        cameraOffset.set(-40 * east + rightX * 10, 10.4 + sleighH * 0.2, 40 * north + rightZ * 10);
        usedCinematicShot = true;
      }
    }

    if (!usedCinematicShot) {
      // Tesla FSD Reality View Tele-Chase Framing
      const camBack = 14.5 + speedNorm * 2.0;
      const targetAhead = 18.0;
      const totalSpan = targetAhead + camBack;
      desiredTarget.set(
        avatar.position.x + targetAhead * east,
        avatar.position.y + 2.1 + aheadSlope * 0.45 + sleighH * 0.42,
        avatar.position.z - targetAhead * north
      );
      cameraOffset.set(
        -totalSpan * east,
        2.6 - flightFactor * 0.25 + aheadSlope * 0.25 + sleighH * 0.22,
        totalSpan * north
      );
    }

    if (idleOrbitBlend > 0.0001) {
      const orbitCos = Math.cos(idleOrbitAngle);
      const orbitSin = Math.sin(idleOrbitAngle);
      const orbitDirX = -east * orbitCos + rightX * orbitSin;
      const orbitDirZ = north * orbitCos + rightZ * orbitSin;
      const orbitRadius = 30.0 + Math.sin(idleOrbitAngle * 2) * 2.5;
      const orbitHeight = 13.5 + Math.sin(idleOrbitAngle) * 1.4;
      idleTarget.set(
        avatar.position.x + 3.0 * east,
        avatar.position.y + 2.3 + sleighH * 0.45,
        avatar.position.z - 3.0 * north
      );
      idleOffset.set(
        orbitDirX * orbitRadius,
        orbitHeight,
        orbitDirZ * orbitRadius
      );
      desiredTarget.lerp(idleTarget, idleOrbitBlend);
      cameraOffset.lerp(idleOffset, idleOrbitBlend);
    }
  }

  function resetTrackState(): void {
    hasPosition = false;
    priorMapOrigin = undefined;
    lastTerrainKey = '';
    roadSnapBlend = 0;
    gpsLatBias = 0;
    steerLaneSway = 0;
    demoHasInit = false;
    horizonY = 0;
    idleStoppedSec = 0;
    idleMovingSec = 0;
    idleOrbitRamp = 0;
    idleOrbitBlend = 0;
    idleOrbitAngle = 0;
    idleOrbitDismissed = false;
    wasStoppedWithManualTakeover = false;
    avatar.position.set(0, 0, 0);
    avatar.rotation.set(0, 0, 0);
    lastUi = -1000;
  }

  function follow(): void {
    idleOrbitDismissed = false;
    wasStoppedWithManualTakeover = false;
    idleOrbitRamp = 0;
    idleOrbitBlend = 0;
    idleOrbitAngle = 0;
    alignWithHeading = true;
    drivingView(performance.now() / 1000, 0, magic.getFlightFactor(), trial ? trialHeight : undefined);
    orbit.target.copy(desiredTarget);
    camera.position.copy(orbit.target).add(cameraOffset);
    orbit.update();
    hud.setFollowActive(true);
  }

  function setCameraMode(mode: CameraMode): void {
    cameraMode = mode;
    hud.setCameraMode(mode);
    follow();
  }

  function setDemo(enabled: boolean): void {
    if (enabled && trial) setTrial(false);
    demo = enabled ? new LocalDemoDrive() : undefined;
    hud.setDemoState(enabled, demoSpeedKmh);
    resetTrackState();
    follow();
  }

  function setTrial(enabled: boolean): void {
    if (enabled && demo) setDemo(false);
    trial = enabled ? new TerrainTrial() : undefined;
    hud.trialPanelEl.hidden = !enabled;
    if (enabled) relief ??= createTrialTerrain();
    if (relief) relief.visible = enabled;
    hud.trialPauseBtn.textContent = i18n.t().drive.trialPause;
    resetTrackState();
    follow();
  }

  hud.connect(festivities, telemetry, {
    onSelectVehicle: selectVehicle,
    onSelectCamera: setCameraMode,
    onCycleCamera: () => {
      const order: CameraMode[] = ['chase', 'map', 'cinematic'];
      setCameraMode(order[(order.indexOf(cameraMode) + 1) % order.length]);
    },
    onFollow: follow,
    onRetryGps: () => {
      telemetry.setSource('manual');
      telemetry.setSource('gps');
    },
    onStartTrial: () => setTrial(true),
    onToggleTrialPause: () => {
      if (trial?.complete) setTrial(true);
      else if (trial) {
        trial.paused = !trial.paused;
        const d = i18n.t().drive;
        hud.trialPauseBtn.textContent = trial.paused ? d.trialResume : d.trialPause;
      }
    },
    onExitTrial: () => setTrial(false),
    onToggleDemo: () => setDemo(!demo),
    onDemoSpeedChange: kmh => {
      demoSpeedKmh = kmh;
    },
    onExitDemo: () => setDemo(false),
    onToggleFsdPath: () => {
      const next = !fsdPath.isEnabled();
      fsdPath.setEnabled(next);
      return next;
    },
    onToggleTraffic: () => {
      const next = !ambientTraffic.isEnabled();
      ambientTraffic.setEnabled(next);
      return next;
    },
    onToggleLiveElevation: () => {
      liveElevationEnabled = !liveElevationEnabled;
      lastTerrainKey = '';
      return liveElevationEnabled;
    },
    getFsdOptions: () => ({
      fsdPath: fsdPath.isEnabled(),
      traffic: ambientTraffic.isEnabled(),
      elevation: liveElevationEnabled,
    }),
  });

  const flightStars = new FlightStars(hud.worldEl);
  const aircraftModels = new Map<string, THREE.Group>();
  const flightsRoot = new THREE.Group();
  scene.add(flightsRoot);
  const projection = new THREE.Vector3();

  const flightTemplate = createAccurateStarmanRoadster({ forSky: true });
  const flightBounds = new THREE.Box3().setFromObject(flightTemplate);
  const corners: THREE.Vector3[] = [];
  for (const x of [flightBounds.min.x, flightBounds.max.x]) {
    for (const y of [flightBounds.min.y, flightBounds.max.y]) {
      for (const z of [flightBounds.min.z, flightBounds.max.z]) corners.push(new THREE.Vector3(x, y, z));
    }
  }
  function projectToPx(wx: number, wy: number, wz: number): { sx: number; sy: number; visible: boolean } {
    projection.set(wx, wy, wz).project(camera);
    const visible = projection.z > -1 && projection.z < 1 && Math.abs(projection.x) <= 1.08 && Math.abs(projection.y) <= 1.08;
    return {
      sx: (1 + projection.x) * 0.5 * window.innerWidth,
      sy: (1 - projection.y) * 0.5 * window.innerHeight,
      visible,
    };
  }
  function projectFlight(flight: LiveFlight) {
    const model = aircraftModels.get(flight.hex || flight.callsign)!;
    projection.copy(model.position).project(camera);
    if (!(projection.z > -1 && projection.z < 1) || Math.abs(projection.x) > 1.4 || Math.abs(projection.y) > 1.4) {
      model.visible = false;
      return { x: 0, y: 0, width: 0, height: 0, visible: false };
    }
    model.updateMatrix();
    let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
    for (const corner of corners) {
      projection.copy(corner).applyMatrix4(model.matrix).project(camera);
      const x = (1 + projection.x) * 50, y = (1 - projection.y) * 50;
      left = Math.min(left, x); right = Math.max(right, x);
      top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
    model.visible = right > 0 && left < 100 && bottom > 0 && top < 100;
    return {
      x: (left + right) / 2,
      y: (top + bottom) / 2,
      width: Math.min(35, Math.max(7.5, right - left + 2.2)),
      height: Math.min(40, Math.max(6.2, bottom - top + 2.6)),
      visible: model.visible,
    };
  }

  const AUTO_RECENTER_MS = 5000;
  let lastManualOrbitMs = 0;

  function detachFollow(): void {
    lastManualOrbitMs = performance.now();
    idleOrbitDismissed = true;
    idleOrbitRamp = 0;
    idleOrbitBlend = 0;
    idleOrbitAngle = 0;
    if (idleStoppedSec > 0.5) {
      wasStoppedWithManualTakeover = true;
    } else if (idleMovingSec > 0) {
      wasStoppedWithManualTakeover = false;
    }
    if (!alignWithHeading) return;
    alignWithHeading = false;
    hud.setFollowActive(false);
  }

  // Tap-to-Interact vs Tap Plane / Wish Star / Reindeer vs Drag-to-Orbit on the 3D canvas
  let tapDown: { id: number; x: number; y: number; time: number } | undefined;
  const activePointers = new Map<number, { x: number; y: number }>();
  renderer.domElement.addEventListener('pointerdown', e => {
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (!alignWithHeading) lastManualOrbitMs = performance.now();
    if (activePointers.size >= 2) detachFollow();
    if (e.isPrimary && e.button === 0) {
      tapDown = { id: e.pointerId, x: e.clientX, y: e.clientY, time: e.timeStamp };
    }
  });
  renderer.domElement.addEventListener('pointermove', e => {
    if (!alignWithHeading && activePointers.has(e.pointerId)) {
      lastManualOrbitMs = performance.now();
    }
    const down = activePointers.get(e.pointerId);
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) >= 14) {
      detachFollow();
    }
  });
  renderer.domElement.addEventListener('wheel', () => detachFollow(), { passive: true });
  renderer.domElement.addEventListener('pointerup', e => {
    activePointers.delete(e.pointerId);
    if (!alignWithHeading) lastManualOrbitMs = performance.now();
    if (!tapDown || tapDown.id !== e.pointerId) return;
    const dist = Math.hypot(e.clientX - tapDown.x, e.clientY - tapDown.y);
    const elapsed = e.timeStamp - tapDown.time;
    tapDown = undefined;
    if (dist < 10 && elapsed < 360) {
      for (const f of activeFlights) {
        const id = f.hex || f.callsign;
        const model = aircraftModels.get(id);
        if (!model || !model.visible) continue;
        const p = projectToPx(model.position.x, model.position.y, model.position.z);
        if (p.visible && Math.hypot(p.sx - e.clientX, p.sy - e.clientY) < 54) {
          flightStars.openFlight(id);
          return;
        }
      }
      for (const star of festivities.getTappableWishStars()) {
        const p = projectToPx(star.x, star.y, star.z);
        if (p.visible && Math.hypot(p.sx - e.clientX, p.sy - e.clientY) < 58) {
          star.onTap();
          return;
        }
      }
      for (const c of [
        ...festivities.livingWorld.getTappableCritters(avatar.position),
        ...ambientTraffic.getTappableCritters(avatar.position),
      ]) {
        const p = projectToPx(c.x, c.y, c.z);
        if (p.visible && Math.hypot(p.sx - e.clientX, p.sy - e.clientY) < 56) {
          c.onTap();
          festivities.recordCritterTap(c.kind, c.x, c.y, c.z);
          return;
        }
      }
      festivities.interact(
        e.clientX / Math.max(1, window.innerWidth),
        e.clientY / Math.max(1, window.innerHeight)
      );
    }
  });
  renderer.domElement.addEventListener('pointercancel', e => {
    activePointers.delete(e.pointerId);
    tapDown = undefined;
  });

  window.addEventListener('keydown', e => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
    if (e.code === 'Space') {
      e.preventDefault();
      festivities.interact(0.5, 0.45);
    } else if (e.key === 'c' || e.key === 'C') {
      const order: CameraMode[] = ['chase', 'map', 'cinematic'];
      setCameraMode(order[(order.indexOf(cameraMode) + 1) % order.length]);
    } else if (e.key === 'h' || e.key === 'H') {
      festivities.audio.unlock();
      festivities.triggerConvoySalute();
    } else if (e.key === 't' || e.key === 'T') {
      telemetry.setForceTunnel(!telemetry.getForceTunnel());
      hud.syncSettings();
    } else if (e.key === 'e' || e.key === 'E') {
      festivities.triggerNextEvent();
    } else if (e.key === 'v' || e.key === 'V') {
      festivities.toggleSkyCinema();
    } else if (e.key === 'Escape') {
      if (hud.isMagicOpen()) hud.setMagicOpen(false);
      else if (hud.isDrawerOpen()) hud.setDrawerOpen(false);
      else if (festivities.skyCinema.isActive()) festivities.stopSkyCinema();
    }
  });

  // Optional ?demo=1 URL flag for instant browser preview without making demo a primary mode
  if (new URLSearchParams(window.location.search).get('demo') === '1') {
    setDemo(true);
  } else {
    follow();
  }
  const urlParams = new URLSearchParams(window.location.search);
  const cinemaSurfaceParam = urlParams.get('cinemaSurface');
  if (
    cinemaSurfaceParam === 'sky' ||
    cinemaSurfaceParam === 'giga' ||
    cinemaSurfaceParam === 'both'
  ) {
    festivities.setSkyCinemaSurface(cinemaSurfaceParam);
  }
  const cinemaModeParam = normalizeSkyCinemaMode(urlParams.get('cinemaMode'));
  if (cinemaModeParam) {
    festivities.setSkyCinemaMode(cinemaModeParam);
  }
  if (urlParams.get('cinema') === '1') {
    festivities.startSkyCinema(0, true);
  }

  function stepDemoFrame(base: TelemetryFrame, dt: number): TelemetryFrame {
    if (!demo) return base;
    if (demoSpeedKmh < demoPrevSpeedKmh - 0.4) {
      demoBrakeHold = 1.6;
    }
    demoPrevSpeedKmh = demoSpeedKmh;
    demoBrakeHold = Math.max(0, demoBrakeHold - dt);
    const isMoving = demoSpeedKmh > 1.8;
    const isBraking = demoBrakeHold > 0 || demoSpeedKmh < 1.8;
    const synth: TelemetryFrame = {
      ...base,
      source: 'demo',
      gpsStatus: 'active',
      speedKmh: demoSpeedKmh,
      rawSpeedKmh: demoSpeedKmh,
      headingDeg: demoHasInit ? demoPrevHeading : base.headingDeg,
      isMoving,
      isAccelerating: false,
      isBraking,
      isPlaidSpeed: demoSpeedKmh >= 85,
      reindeerGearKey: demoSpeedKmh < 2 ? 'park' : demoSpeedKmh < 22 ? 'trot' : demoSpeedKmh < 45 ? 'dash' : demoSpeedKmh < 68 ? 'prance' : demoSpeedKmh < 88 ? 'comet' : 'plaid',
    };
    demo.advance(synth, dt);
    demoPrevHeading = synth.headingDeg;
    demoHasInit = true;
    return synth;
  }

  function update(now: number): void {
    const dt = Math.min(0.05, Math.max(0, (now - previous) / 1000));
    previous = now;
    const time = now / 1000;

    const gpsFrame = telemetry.update(dt);
    const gpsFix = gpsFrame.gpsStatus === 'active';
    const frame = trial
      ? trial.update(dt, gpsFrame)
      : demo
        ? stepDemoFrame(gpsFrame, dt)
        : gpsFrame;

    if (trial) {
      units.setGeoLocation(frame.latitude, frame.longitude, 'de');
    } else if (demo) {
      units.setGeoLocation(frame.latitude, frame.longitude, 'se');
    }

    const osm = trial
      ? terrainMap
      : demo
        ? demo.map
        : director.update(
            dt,
            'gps',
            gpsFrame.latitude,
            gpsFrame.longitude,
            gpsFrame.isMoving,
            gpsFrame.speedKmh,
            gpsFix,
            gpsFrame.headingDeg
          );

    const fix = !!trial || !!demo || gpsFix;
    const hasActiveWorld = !!trial || !!demo || gpsFix || hasPosition;
    const snapshot = osm.isLiveOsm ? osm.snapshot : undefined;
    const elevActive = liveElevationEnabled && !trial && hasActiveWorld;
    liveElevation.update(frame.latitude, frame.longitude, elevActive);
    if (snapshot && elevActive) {
      liveElevation.update(snapshot.originLat, snapshot.originLon, true);
    }
    const liveSampler = !trial && liveElevationEnabled && snapshot
      ? liveElevation.getSampler(snapshot.originLat, snapshot.originLon)
      : undefined;
    const activeElevation = trial ? trialHeight : liveSampler;
    const elevVersion = trial ? -1 : liveElevation.getVersion();

    const rawPosition = snapshot
      ? geoDeltaMeters(snapshot.originLat, snapshot.originLon, frame.latitude, frame.longitude)
      : { x: 0, z: 0 };
    const roadProj = snapshot && !trial ? projectOntoRoad(snapshot, rawPosition, frame.headingDeg) : undefined;
    matchedRoad = roadProj?.road;

    let position = rawPosition;
    const direction = (frame.headingDeg * Math.PI) / 180;
    const turn = Math.atan2(Math.sin(direction - heading), Math.cos(direction - heading));
    heading += turn * (hasPosition ? Math.min(1, dt * 5) : 1);

    map.group.visible = !!snapshot;
    let originShifted = false;
    if (snapshot) {
      if (priorMapOrigin && (priorMapOrigin.lat !== snapshot.originLat || priorMapOrigin.lon !== snapshot.originLon)) {
        originShifted = true;
        const shift = geoDeltaMeters(snapshot.originLat, snapshot.originLon, priorMapOrigin.lat, priorMapOrigin.lon);
        const offset = new THREE.Vector3(shift.x, 0, shift.z);
        avatar.position.add(offset);
        camera.position.add(offset);
        orbit.target.add(offset);
        map.shiftActiveContent(offset);
        magic.shift(offset);
        festivities.shift(offset);
        lastTerrainKey = '';
      }
      priorMapOrigin = { lat: snapshot.originLat, lon: snapshot.originLon };
      map.update(snapshot, activeElevation, elevVersion);
    }

    if (roadProj) {
      const targetLane = roadProj.road.widthM >= 5.2 ? Math.min(2.05, roadProj.road.widthM * 0.24) : 0;
      const alignFactor = THREE.MathUtils.smoothstep(roadProj.alignment, 0.52, 0.84);
      const distFactor = 1 - THREE.MathUtils.smoothstep(
        roadProj.distance,
        roadProj.road.widthM * 0.5 + 3.5,
        roadProj.road.widthM * 0.5 + 11.0
      );
      const targetSnap = alignFactor * distFactor;
      const latErr = roadProj.signedLateral - targetLane;

      if (!hasPosition || originShifted) {
        roadSnapBlend = targetSnap;
        if (!demo && targetSnap > 0.5 && Math.abs(frame.turnRate) < 0.35) {
          gpsLatBias = latErr;
        }
      } else {
        roadSnapBlend = THREE.MathUtils.damp(roadSnapBlend, targetSnap, 4.2, dt);
      }

      let finalLat: number;
      if (demo) {
        steerLaneSway = THREE.MathUtils.damp(
          steerLaneSway,
          THREE.MathUtils.clamp(frame.turnRate * 0.42, -0.5, 0.5),
          6.5,
          dt
        );
        const demoMaxLat = Math.max(0.4, roadProj.road.widthM * 0.36);
        finalLat = THREE.MathUtils.clamp(targetLane + steerLaneSway, -demoMaxLat, demoMaxLat);
      } else {
        if (targetSnap > 0.5 && Math.abs(frame.turnRate) < 0.25) {
          gpsLatBias = THREE.MathUtils.damp(gpsLatBias, latErr, 0.55, dt);
        } else {
          gpsLatBias = THREE.MathUtils.damp(gpsLatBias, 0, 2.2, dt);
        }
        const fastLat = THREE.MathUtils.clamp(latErr - gpsLatBias, -1.1, 1.1);
        steerLaneSway = THREE.MathUtils.damp(
          steerLaneSway,
          THREE.MathUtils.clamp(frame.turnRate * 0.62, -0.72, 0.72),
          6.5,
          dt
        );
        const maxSafeLat = Math.max(0.4, roadProj.road.widthM * 0.5 - 0.95);
        finalLat = THREE.MathUtils.clamp(targetLane + fastLat * 0.65 + steerLaneSway, -maxSafeLat, maxSafeLat);
      }

      const snapX = roadProj.centerX + roadProj.rightX * finalLat;
      const snapZ = roadProj.centerZ + roadProj.rightZ * finalLat;
      position = {
        x: THREE.MathUtils.lerp(rawPosition.x, snapX, roadSnapBlend),
        z: THREE.MathUtils.lerp(rawPosition.z, snapZ, roadSnapBlend),
      };
    } else {
      roadSnapBlend = THREE.MathUtils.damp(roadSnapBlend, 0, 4.2, dt);
    }

    avatar.visible = hasActiveWorld;
    const dx = position.x - avatar.position.x, dz = position.z - avatar.position.z;
    const rebase = Math.hypot(dx, dz) > 90;
    if (snapshot && hasActiveWorld) {
      const ease = !hasPosition || rebase ? 1 : 1 - Math.exp(-dt * 8);
      const height = activeElevation ? activeElevation(avatar.position.x + dx * ease, avatar.position.z + dz * ease) : 0;
      movement.set(dx * ease, (height - avatar.position.y) * ease, dz * ease);
      avatar.position.add(movement);
      camera.position.add(movement);
      orbit.target.add(movement);
      if (!hasPosition && alignWithHeading) follow();
      hasPosition = true;
    }

    avatar.rotation.order = 'YXZ';
    avatar.rotation.y = -heading;
    if (activeElevation) {
      const x = avatar.position.x, z = avatar.position.z;
      const east = Math.sin(heading) * 5, north = Math.cos(heading) * 5;
      const pitch = Math.atan2(activeElevation(x + east, z - north) - activeElevation(x - east, z + north), 10);
      avatar.rotation.x = THREE.MathUtils.lerp(avatar.rotation.x, pitch, Math.min(1, dt * 6));
    } else {
      avatar.rotation.x = THREE.MathUtils.lerp(avatar.rotation.x, 0, Math.min(1, dt * 6));
    }

    const env = festivities.update(
      dt,
      time,
      frame,
      snapshot,
      osm,
      avatar.position,
      heading,
      liveState,
      hasActiveWorld,
      activeElevation
    );

    const beat = festivities.getBeatEnergy();
    const lightShow = festivities.getLightShowIntensity();
    stage!.setQuality(env.quality);
    stage!.setAtmosphere(env.daylightFactor, env.blueHourFactor, env.fogColor);

    const airspeed = frame.isMoving && fix ? frame.speedKmh : 0;
    flightSpeed = THREE.MathUtils.damp(flightSpeed, airspeed, 2.6, dt);
    const lift = THREE.MathUtils.smoothstep(flightSpeed, 0, 75);
    const flying = sleigh.group.visible;
    if (flying) {
      hoverPhase += dt * (1.25 + 0.65 * lift);
      const cruiseAlt = THREE.MathUtils.smoothstep(flightSpeed, 8, 82);
      const baseSleighY = 0.85 + 3.0 * cruiseAlt + Math.sin(hoverPhase) * (0.10 - 0.04 * lift);
      sleigh.group.position.y = baseSleighY;
      const pitch = THREE.MathUtils.clamp((airspeed - flightSpeed) * 0.009, -0.075, 0.075);
      sleigh.group.rotation.x = THREE.MathUtils.damp(sleigh.group.rotation.x, pitch, 3.5, dt);
      sleigh.update(dt, flightSpeed, frame.turnRate, frame.acceleration, time);
    }
    shadow.scale.setScalar(flying ? 1.08 + 0.28 * lift : 1);
    shadow.material.opacity = flying ? 0.28 - 0.12 * lift : 0.34;
    wheelPhase += frame.speedKmh * dt;
    if (semi.group.visible) semi.update(dt, wheelPhase, frame.isBraking, beat * 0.65, time);
    if (truck.group.visible) truck.update(wheelPhase, time);

    fsdPath.update(
      dt,
      time,
      frame,
      env,
      matchedRoad,
      avatar.position,
      heading,
      hasActiveWorld && !trial,
      activeElevation,
      lightShow
    );
    vehicleLighting.update(time, frame, env, hasActiveWorld, flying ? sleigh.group.position.y : 0, lightShow);
    if (snapshot) {
      ambientTraffic.update(
        dt,
        time,
        snapshot,
        map.mapData,
        avatar.position,
        heading,
        activeElevation,
        elevVersion,
        festivities.convoyPositions,
        festivities.getSleighAlert(),
        frame.speedKmh / 3.6
      );
    }
    ambientTraffic.group.visible = !!snapshot && ambientTraffic.isEnabled() && !trial;

    if (frame.isBraking && !wasBraking && time - lastBrakeJingleAt > 2.5 && hasActiveWorld) {
      festivities.audio.playBrakeJingle();
      lastBrakeJingleAt = time;
    }
    wasBraking = frame.isBraking;

    magic.update(
      dt,
      time,
      frame,
      env,
      beat,
      avatar.position,
      heading,
      sleigh,
      lift,
      hasActiveWorld,
      festivities.convoyPositions
    );

    const speedNorm = Math.min(1, frame.speedKmh / 110);
    const flightFactor = magic.getFlightFactor();

    if (!hasActiveWorld) {
      idleStoppedSec = 0;
      idleMovingSec = 0;
      idleOrbitRamp = 0;
      idleOrbitBlend = 0;
      idleOrbitAngle = 0;
      idleOrbitDismissed = false;
      wasStoppedWithManualTakeover = false;
    } else if (frame.speedKmh < 1.5) {
      idleStoppedSec += dt;
      idleMovingSec = 0;
      if (!alignWithHeading && idleOrbitDismissed && idleStoppedSec > 0.5) {
        wasStoppedWithManualTakeover = true;
      }
    } else {
      idleStoppedSec = 0;
      if (frame.speedKmh > 3.5) {
        idleMovingSec += dt;
      } else {
        idleMovingSec = 0;
      }
    }

    if (idleMovingSec >= 0.2) {
      idleOrbitDismissed = false;
      if (wasStoppedWithManualTakeover && activePointers.size === 0) {
        wasStoppedWithManualTakeover = false;
        if (!alignWithHeading) {
          alignWithHeading = true;
          hud.setFollowActive(true);
        }
      }
    }

    const idleModeAllowed = cameraMode === 'chase' || cameraMode === 'cinematic';
    const idleShowcaseActive =
      hasActiveWorld &&
      idleModeAllowed &&
      alignWithHeading &&
      !idleOrbitDismissed &&
      !festivities.skyCinema.isActive() &&
      idleStoppedSec > 2.8;

    if (idleShowcaseActive) {
      if (idleOrbitRamp === 0) {
        idleOrbitAngle = 0;
      }
      idleOrbitRamp = Math.min(1, idleOrbitRamp + dt / 3.6);
      idleOrbitBlend = THREE.MathUtils.smoothstep(idleOrbitRamp, 0, 1);
      idleOrbitAngle += dt * 0.155 * idleOrbitBlend;
      if (idleOrbitAngle >= Math.PI * 2) idleOrbitAngle -= Math.PI * 2;
    } else {
      idleOrbitBlend = THREE.MathUtils.damp(idleOrbitBlend, 0, 4.5, dt);
      if (idleOrbitBlend < 0.001) {
        idleOrbitBlend = 0;
        idleOrbitRamp = 0;
        idleOrbitAngle = 0;
      } else {
        idleOrbitRamp = idleOrbitBlend;
      }
    }

    const suppressAutoRecenter = (idleStoppedSec > 0.5 || wasStoppedWithManualTakeover) && idleOrbitDismissed;
    if (
      !alignWithHeading &&
      !suppressAutoRecenter &&
      activePointers.size === 0 &&
      now - lastManualOrbitMs >= AUTO_RECENTER_MS
    ) {
      alignWithHeading = true;
      idleOrbitDismissed = false;
      wasStoppedWithManualTakeover = false;
      hud.setFollowActive(true);
    }
    if (alignWithHeading) {
      currentOffset.copy(camera.position).sub(orbit.target);
      drivingView(time, speedNorm, flightFactor, activeElevation);
      currentOffset.lerp(cameraOffset, Math.min(1, dt * 2.8));
      orbit.target.lerp(desiredTarget, rebase ? 1 : Math.min(1, dt * 6));
      camera.position.copy(orbit.target).add(currentOffset);
    }
    orbit.update();
    camera.position.y = Math.max((activeElevation ? activeElevation(camera.position.x, camera.position.z) : 0) + 1.4, camera.position.y);
    camera.lookAt(orbit.target);
    if (alignWithHeading && cameraMode === 'chase') {
      cameraRoll = THREE.MathUtils.damp(
        cameraRoll,
        THREE.MathUtils.clamp(-frame.turnRate * 0.032, -0.045, 0.045) * (1 - idleOrbitBlend),
        5,
        dt
      );
      camera.rotateZ(cameraRoll);
    } else {
      cameraRoll = THREE.MathUtils.damp(cameraRoll, 0, 5, dt);
    }

    const targetFov = (cameraMode === 'map' ? 54 : 45) + speedNorm * 10 + flightFactor * 5 + idleOrbitBlend * 3.5;
    if (Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 3);
      camera.updateProjectionMatrix();
    }
    camera.updateMatrixWorld();

    if (!trial && activeElevation && snapshot) {
      ground.visible = false;
      liveRelief.visible = true;
      outerSkirt.visible = true;
      updateLiveTerrainMesh(activeElevation, `${snapshot.version}:${elevVersion}`);
    } else {
      liveRelief.visible = false;
      outerSkirt.visible = false;
      ground.visible = true;
      ground.position.set(avatar.position.x, trial ? terrainFloor - 0.15 : 0, avatar.position.z);
    }
    const headlightFactor = Math.max(0.08, 1 - env.daylightFactor * 0.85);
    const brakeFactor = frame.isBraking ? 1 : frame.speedKmh < 2.2 ? 0.55 : 0;
    updateWinterGround(groundMaterial, time, env.daylightFactor, avatar.position, heading, headlightFactor, env.theme);
    updateChristmasMapAtmosphere(time, env.daylightFactor, avatar.position, heading, brakeFactor, headlightFactor, env.theme, beat, lightShow);
    map.animate(time, avatar.position);
    stage!.updateKeyShadowFocus(orbit.target, shadowOffset);

    const superAurora = festivities.getSuperAuroraIntensity();
    const cinemaAurora = festivities.getSkyCinemaIntensity() * 0.48;
    const effectiveSuperAurora = Math.max(superAurora, cinemaAurora);
    (magic as { setSuperAuroraBoost?: (active: boolean) => void }).setSuperAuroraBoost?.(superAurora > 0.01);
    sky.mesh.position.copy(camera.position);
    sky.material.uniforms.uTime.value = time;
    applyChristmasSkyEnv(sky.material, env, liveState, beat, flightFactor, lightShow);
    if (sky.material.uniforms.uSuperAurora) {
      sky.material.uniforms.uSuperAurora.value = effectiveSuperAurora;
    }

    const targetHorizonY = trial ? terrainFloor : activeElevation ? avatar.position.y : 0;
    horizonY = !hasPosition || rebase ? targetHorizonY : THREE.MathUtils.damp(horizonY, targetHorizonY, 3.2, dt);
    horizon.group.position.set(camera.position.x, horizonY, camera.position.z);
    horizon.update(time, env);

    snowfall.group.position.copy(avatar.position);
    if (superAurora > 0.01) {
      const p = (time * 0.85) % 3;
      if (p < 1) snowWorkColor.copy(snowAuroraMint).lerp(snowAuroraViolet, p);
      else if (p < 2) snowWorkColor.copy(snowAuroraViolet).lerp(snowAuroraGold, p - 1);
      else snowWorkColor.copy(snowAuroraGold).lerp(snowAuroraMint, p - 2);
      snowWorkColor.lerp(snowBaseColor, 1 - superAurora * 0.72);
    } else {
      snowWorkColor.copy(snowBaseColor);
    }
    for (const child of snowfall.group.children) {
      const mat = (child as THREE.Points).material;
      if (mat && 'color' in mat && mat.color instanceof THREE.Color) {
        mat.color.copy(snowWorkColor);
      }
    }
    const slipstream = flying ? Math.min(13, flightSpeed / 3.6) * 0.75 : 0;
    const windRad = (env.windDirDeg * Math.PI) / 180;
    const windPush = Math.min(2.2, env.windSpeedKmh / 16);
    snowfall.update(
      dt,
      0.12 - Math.sin(heading) * slipstream + Math.sin(windRad) * windPush * 0.65,
      -0.16 + Math.cos(heading) * slipstream + Math.cos(windRad) * windPush * 0.65,
      1.25 + (env.isSnowingReal ? 1.1 : 0)
    );

    if (now - lastUi >= 200) {
      lastUi = now;
      live.update(frame.latitude, frame.longitude, !demo && !trial, fix);
      liveState = live.getState();
      lastFlightStateSec = time;
      activeFlights = trial ? [] : liveState.flights;
      if (trial) {
        const d = i18n.t().drive;
        const inclination = Math.round(100 * Math.tan(avatar.rotation.x));
        hud.trialElevationEl.textContent = `${units.formatElevation(avatar.position.y + terrainDatum)} ${d.trialMasl} · ${inclination}% ${d.trialGrade}`;
        if (trial.complete) hud.trialPauseBtn.textContent = d.trialReplay;
      }
      const ids = new Set(activeFlights.map(f => f.hex || f.callsign));
      for (const [id, model] of aircraftModels) {
        if (!ids.has(id)) {
          flightsRoot.remove(model);
          aircraftModels.delete(id);
        }
      }
      for (const id of ids) {
        if (aircraftModels.has(id)) continue;
        const model = flightTemplate.clone();
        aircraftModels.set(id, model);
        flightsRoot.add(model);
      }
      const d = i18n.t().drive;
      const ahead = matchedRoad && map.nextStreet(matchedRoad, position, direction);
      const streetLabel = matchedRoad?.name || (snapshot ? d.streetYourPos : gpsFix ? d.streetFetching : d.waitingGps);
      const viewHeading = Math.atan2(orbit.target.x - camera.position.x, camera.position.z - orbit.target.z);

      const elevationM = trial
        ? Math.round(avatar.position.y + terrainDatum)
        : liveElevationEnabled
          ? liveElevation.getAbsoluteElevationM(frame.latitude, frame.longitude)
          : undefined;
      const gradePct = activeElevation ? Math.round(100 * Math.tan(avatar.rotation.x)) : undefined;

      hud.updateReadout({
        frame,
        env,
        placeName: snapshot ? osm.placeName : '',
        streetLabel,
        aheadJunction: ahead,
        maxspeedKmh: matchedRoad?.maxspeed,
        fsdActive: fsdPath.isEnabled(),
        elevationM,
        gradePct,
        hasWorld: hasActiveWorld,
        viewHeading,
      });
    }

    const flightSubDt = Math.min(0.35, Math.max(0, time - lastFlightStateSec));
    for (const [fIdx, flight] of activeFlights.entries()) {
      const id = flight.hex || flight.callsign;
      const model = aircraftModels.get(id)!;
      // Smooth 60fps sub-poll dead-reckoning along true compass heading & groundspeed
      const baseAz = (flight.bearingDeg * Math.PI) / 180;
      const headRad = (flight.headingDeg * Math.PI) / 180;
      const stepKm = flight.groundspeedKts > 5 ? (flight.groundspeedKts * 0.514444 * flightSubDt) / 1000 : 0;
      const eastKm = Math.sin(baseAz) * flight.distanceKm + Math.sin(headRad) * stepKm;
      const northKm = Math.cos(baseAz) * flight.distanceKm + Math.cos(headRad) * stepKm;
      const liveDistKm = Math.max(2, Math.hypot(eastKm, northKm));
      const azimuth = Math.atan2(eastKm, northKm);
      const radius = THREE.MathUtils.clamp(liveDistKm * 5.8, 115, 185);

      // Stable per-aircraft elevation slot (keyed by ID hash, not list index, preventing vertical jumps)
      let idHash = 0;
      for (let c = 0; c < id.length; c++) idHash = (idHash * 31 + id.charCodeAt(c)) | 0;
      const slotOffset = (Math.abs(idHash) % 3) * 0.032;
      const elevation = THREE.MathUtils.clamp(
        0.19 + slotOffset + Math.atan2(flight.altitudeM, Math.max(8000, liveDistKm * 1000)) * 0.14,
        0.19,
        0.28
      );
      const relX = Math.sin(azimuth) * radius;
      const relY = Math.tan(elevation) * radius;
      const relZ = -Math.cos(azimuth) * radius;
      flightTargetPos.set(relX, relY, relZ);
      let relPos = model.userData.flightRel as THREE.Vector3 | undefined;
      if (!relPos || rebase || relPos.distanceToSquared(flightTargetPos) > 45 * 45) {
        if (!relPos) {
          relPos = new THREE.Vector3();
          model.userData.flightRel = relPos;
        }
        relPos.copy(flightTargetPos);
      } else {
        // Smoothly damp any 15s ADS-B poll track/wind correction in avatar-relative sky space
        relPos.lerp(flightTargetPos, 1 - Math.exp(-dt * 4.5));
      }
      model.position.set(
        avatar.position.x + relPos.x,
        avatar.position.y + relPos.y,
        avatar.position.z + relPos.z
      );
      model.rotation.order = 'YXZ';
      model.rotation.y = Math.PI / 2 - headRad;
      model.rotation.x = Math.sin(time * 0.9 + fIdx) * 0.06;
      model.scale.setScalar(1.95 + radius / 90);
    }

    flightStars.update(activeFlights, frame, projectFlight);
    stage!.render();
    requestAnimationFrame(update);
  }

  new ResizeObserver(() => {
    stage.resize(hud.worldEl.clientWidth, hud.worldEl.clientHeight);
    festivities.resize(hud.worldEl.clientWidth, hud.worldEl.clientHeight);
  }).observe(hud.worldEl);
  requestAnimationFrame(update);
}
