import { createAlpineHorizon } from './three/alpineHorizon';
import { DriveFestivities } from './three/DriveFestivities';
import './styles/christmasDrive.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LiveWorldDataManager, type LiveFlight } from './core/liveWorldData';
import { geoDeltaMeters, OsmWorldDirector } from './core/osmWorld';
import { TelemetryEngine } from './core/telemetry';
import { ChristmasMap } from './three/ChristmasMap';
import { createWinterGround, shapeChristmasSky } from './three/winterSurfaces';
import { streetAtCar } from './three/mappedRoads';
import { createBokehSnowField, createPixarSkyDome, getSoftGlowTexture } from './three/pixarMaterials';
import { createPixarSantaSleigh } from './three/pixarModels';
import { createAccurateCybertruck, createAccurateStarmanRoadster, createAccurateTeslaSemi } from './three/teslaModels';
import { createPixarStageOrFallback } from './three/pixarRenderer';
import { FlightStars } from './ui/FlightStars';

const root = document.querySelector<HTMLElement>('#app')!;
root.innerHTML = `
  <main class="drive-world" aria-label="Interaktiv julvärld"></main>
  <header class="drive-header">
    <div class="drive-brand"><span aria-hidden="true">✦</span> Vintervärlden</div>
    <div class="drive-actions">
      <a href="./klassisk.html">Klassiska lägen</a>
      <button data-follow type="button">Följ släden</button>
    </div>
  </header>
  <aside class="street-board" aria-live="polite">
    <span class="street-meta" data-place></span>
    <strong data-street>Väntar på GPS</strong>
    <span data-junction hidden></span>
    <button data-gps type="button" hidden>Försök igen</button>
  </aside>
  <aside class="drive-timeline" data-timeline-card hidden>
    <div class="timeline-kicker">Elon-tidslinje <span data-timeline-step></span></div>
    <strong data-timeline-title></strong>
    <span data-timeline-text></span>
    <button data-timeline-next type="button">Nästa</button>
  </aside>
  <footer class="drive-footer">
    <div class="drive-instruments"><strong data-speed>0</strong> <span>km/h</span>
      <span class="pole-distance" data-north hidden><b data-north-arrow aria-hidden="true">↑</b> Nordpolen <span data-distance></span></span>
    </div>
    <div class="drive-festivities">
      <output data-festive-status aria-live="polite"></output>
      <button type="button" data-gift>🎁 Julklapp</button>
      <details>
        <summary>Julmagi</summary>
        <div class="festivity-menu">
          <button type="button" data-event="starlink">Starlink</button>
          <button type="button" data-event="starship">Starship</button>
          <button type="button" data-event="starman">Starman</button>
          <button type="button" data-event="supercharger">Supercharger</button>
          <button type="button" data-event="cyberplow">Cybertruck-plog</button>
          <button type="button" data-auto-magic aria-pressed="true">Julmagi längs vägen</button>
          <button type="button" data-timeline aria-pressed="false">Elon-tidslinje</button>
          <button type="button" data-convoy>Julkaravan</button>
          <button type="button" data-tunnel>Boring-tunneln</button>
          <button type="button" data-sound aria-pressed="false">Slå på ljud</button>
        </div>
      </details>
    </div>
    <label class="vehicle-picker"><span>Fordon</span>
      <select aria-label="Fordon"><option value="sleigh">Tomtens släde</option><option value="semi">Tesla Semi</option><option value="cybertruck">Cybertruck</option><option value="starman">Starman</option></select>
    </label>
  </footer>
  <a class="osm-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap contributors</a>`;

const get = <T extends HTMLElement = HTMLElement>(selector: string) => root.querySelector<T>(selector)!;
const world = get('.drive-world');
const { stage } = createPixarStageOrFallback(world, {
  fov: 58, far: 850, fogColor: '#677e99', fogDensity: 0.0024,
  bloomStrength: 0.27, bloomThreshold: 0.84, initialQuality: 'eco', exposure: 1.05,
});

if (stage) {
  const { scene, camera, renderer } = stage;
  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.13;
  orbit.minDistance = 11;
  orbit.maxDistance = 140;
  orbit.maxPolarAngle = Math.PI * 0.66;
  orbit.touches.ONE = THREE.TOUCH.ROTATE;
  orbit.touches.TWO = THREE.TOUCH.DOLLY_PAN;
  const avatar = new THREE.Group();
  avatar.name = "GPS vehicle";
  const sleigh = createPixarSantaSleigh();
  const semi = createAccurateTeslaSemi();
  const truck = createAccurateCybertruck(false);
  const roadster = createAccurateStarmanRoadster();
  roadster.rotation.y = Math.PI / 2;
  const vehicles = {sleigh: sleigh.group, semi: semi.group, cybertruck: truck.group, starman: roadster};
  avatar.add(...Object.values(vehicles));
  const selector = get<HTMLSelectElement>('select');
  function selectVehicle() {
    for (const [id, model] of Object.entries(vehicles)) model.visible = id === selector.value;
  }
  selector.addEventListener('change', selectVehicle);
  selectVehicle();

  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(7, 20), new THREE.MeshBasicMaterial({
    map: getSoftGlowTexture(), color: '#394b69', transparent: true, opacity: 0.52, depthWrite: false,
  }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0.093, -2);
  avatar.add(shadow);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1600,1600), createWinterGround());
  ground.rotation.x = -Math.PI / 2;
  const sky = createPixarSkyDome(730);
  shapeChristmasSky(sky.material);
  const snowfall = createBokehSnowField(310, {minX:-45,maxX:45,minY:1,maxY:38,minZ:-55,maxZ:55});
  const map = new ChristmasMap();
  const mountains = createAlpineHorizon();
  scene.add(ground, sky.mesh, mountains, map.group, avatar, snowfall.group);
  stage.setAtmosphere(0.04, 0.72, '#8a91af');
  const warm = new THREE.DirectionalLight('#ffd4ba', 0.95);
  warm.castShadow = true;
  warm.shadow.mapSize.set(1024,1024);
  warm.shadow.camera.left = warm.shadow.camera.bottom = -60;
  warm.shadow.camera.right = warm.shadow.camera.top = 60;
  warm.shadow.camera.far = 165;
  warm.shadow.normalBias = 0.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  scene.add(warm,warm.target);
  ground.receiveShadow = true;

  const flightStars = new FlightStars(world);
  const aircraftModels = new Map<string, THREE.Group>();
  const flightsRoot = new THREE.Group();
  scene.add(flightsRoot);
  const projection = new THREE.Vector3();
  function projectFlight(flight: LiveFlight) {
    const model = aircraftModels.get(flight.hex || flight.callsign)!;
    projection.copy(model.position).project(camera);
    return { x: (projection.x + 1)*50, y: (1 - projection.y)*50,
      visible: projection.z > -1 && projection.z < 1 && Math.abs(projection.x) < 0.95 && Math.abs(projection.y) < 0.89 };
  }
  const flightTemplate = createAccurateStarmanRoadster();
  const telemetry = new TelemetryEngine('gps');
  const festivities = new DriveFestivities(root, world, scene, sleigh, telemetry);
  const director = new OsmWorldDirector(true);
  const live = new LiveWorldDataManager();
  const speed = get('[data-speed]');
  const place = get('[data-place]');
  const street = get('[data-street]');
  const junction = get('[data-junction]');
  const gps = get<HTMLButtonElement>('[data-gps]');
  const north = get('[data-north]');
  const arrow = get('[data-north-arrow]');
  const distance = get('[data-distance]');
  const followButton = get<HTMLButtonElement>('[data-follow]');
  let alignWithHeading = true;
  let heading = 0;
  let hasPosition = false;
  let previous = performance.now();
  let priorMapOrigin: {lat: number; lon: number} | undefined;
  let lastUi = -1000;
  const cameraOffset = new THREE.Vector3();
  const currentOffset = new THREE.Vector3();
  const desiredTarget = new THREE.Vector3();
  const movement = new THREE.Vector3();
  const shadowOffset = new THREE.Vector3(-52,54,32);
  let liveState = live.getState();
  let activeFlights: LiveFlight[] = [];
  let wheelPhase = 0;

  function drivingView() {
    const east = Math.sin(heading), north = Math.cos(heading);
    desiredTarget.set(avatar.position.x + 10*east, 8, avatar.position.z - 10*north);
    cameraOffset.set(-45*east, -0.6, 45*north);
  }

  function follow() {
    alignWithHeading = true;
    drivingView();
    orbit.target.copy(desiredTarget);
    camera.position.copy(orbit.target).add(cameraOffset);
    orbit.update();
    followButton.setAttribute('aria-pressed','true');
  }
  orbit.addEventListener('start', () => {
    alignWithHeading = false;
    followButton.setAttribute('aria-pressed','false');
  });
  followButton.addEventListener('click', follow);
  gps.addEventListener('click', () => {
    telemetry.setSource('manual');
    telemetry.setSource('gps');
  });
  follow();

  function update(now: number) {
    const dt = Math.min(0.05, Math.max(0, (now - previous)/1000));
    previous = now;
    const time = now / 1000;
    const frame = telemetry.update(dt);
    const fix = frame.gpsStatus === 'active';
    const osm = director.update(dt, 'gps', frame.latitude, frame.longitude, frame.isMoving, frame.speedKmh, fix);
    const snapshot = osm.isLiveOsm ? osm.snapshot : undefined;
    const position = snapshot ? geoDeltaMeters(snapshot.originLat, snapshot.originLon, frame.latitude, frame.longitude) : {x:0,z:0};
    const direction = frame.headingDeg*Math.PI/180;
    const turn = Math.atan2(Math.sin(direction-heading), Math.cos(direction-heading));
    heading += turn * (hasPosition ? Math.min(1,dt*5) : 1);
    if (snapshot) {
      if (priorMapOrigin && (priorMapOrigin.lat !== snapshot.originLat || priorMapOrigin.lon !== snapshot.originLon)) {
        const shift = geoDeltaMeters(snapshot.originLat, snapshot.originLon, priorMapOrigin.lat, priorMapOrigin.lon);
        const offset = new THREE.Vector3(shift.x,0,shift.z);
        avatar.position.add(offset);
        camera.position.add(offset);
        orbit.target.add(offset);
      }
      priorMapOrigin = {lat: snapshot.originLat, lon: snapshot.originLon};
      map.update(snapshot);
    }
    avatar.visible = fix || hasPosition;
    const dx = position.x-avatar.position.x, dz = position.z-avatar.position.z;
    const rebase = Math.hypot(dx,dz) > 90;
    if (snapshot && (fix || hasPosition)) {
      const ease = !hasPosition || rebase ? 1 : 1-Math.exp(-dt*8);
      // Translate both ends of the camera rig by exactly the smoothed GPS motion.
      // Drag, pan and pinch only change the offset from the car.
      movement.set(dx*ease, 0, dz*ease);
      avatar.position.add(movement);
      camera.position.add(movement);
      orbit.target.add(movement);
      if (!hasPosition && alignWithHeading) follow();
      hasPosition = true;
    }
    avatar.rotation.y = -heading;
    sleigh.group.position.y = 0.5 + Math.sin(time*1.8)*0.12;
    if (sleigh.group.visible) sleigh.update(dt,frame.speedKmh,frame.turnRate,frame.acceleration,time);
    wheelPhase += frame.speedKmh * dt;
    if (semi.group.visible) semi.update(dt,wheelPhase,frame.isBraking,0,time);
    if (truck.group.visible) truck.update(wheelPhase,time);
    if (alignWithHeading) {
      currentOffset.copy(camera.position).sub(orbit.target);
      drivingView();
      currentOffset.lerp(cameraOffset,Math.min(1,dt*2.4));
      orbit.target.lerp(desiredTarget,rebase ? 1 : Math.min(1,dt*6));
      camera.position.copy(orbit.target).add(currentOffset);
    }
    orbit.update();
    camera.position.y = Math.max(1.5, camera.position.y);
    camera.lookAt(orbit.target);
    camera.updateMatrixWorld();
    ground.position.set(avatar.position.x,0,avatar.position.z);
    warm.target.position.copy(orbit.target);
    warm.position.copy(warm.target.position).add(shadowOffset);
    sky.mesh.position.copy(camera.position);
    mountains.position.set(camera.position.x,0,camera.position.z);
    sky.material.uniforms.uTime.value = time;
    snowfall.group.position.copy(avatar.position);
    snowfall.update(dt,0.12,-0.16,1.2);

    if (now - lastUi >= 240) {
      lastUi = now;
      live.update(frame.latitude,frame.longitude,true,fix);
      liveState = live.getState();
      activeFlights = liveState.flights;
      const ids = new Set(activeFlights.map(f => f.hex || f.callsign));
      for (const [id, model] of aircraftModels) {
        if (!ids.has(id)) { flightsRoot.remove(model); aircraftModels.delete(id); }
      }
      for (const id of ids) {
        if (aircraftModels.has(id)) continue;
        const model = flightTemplate.clone();
        aircraftModels.set(id, model);
        flightsRoot.add(model);
      }
      const matched = snapshot && streetAtCar(snapshot,frame);
      const ahead = matched && map.nextStreet(matched,position,direction);
      speed.textContent = String(Math.round(frame.speedKmh));
      place.textContent = snapshot ? osm.placeName : '';
      const streetLabel = matched?.name || (snapshot ? 'Din position' : fix ? 'Hämtar omgivningen' : 'Väntar på GPS');
      if (street.textContent !== streetLabel) street.textContent = streetLabel;
      junction.hidden = !ahead;
      junction.textContent = ahead ? `${ahead.name} · ${ahead.meters} m framåt` : '';
      gps.hidden = frame.gpsStatus !== 'error';
      north.hidden = !fix && !hasPosition;
      distance.textContent = Math.round(frame.northPoleDistanceKm).toLocaleString('sv-SE') + ' km';
      const viewHeading = Math.atan2(orbit.target.x-camera.position.x, camera.position.z-orbit.target.z);
      arrow.style.transform = `rotate(${-viewHeading}rad)`;
    }
    for (const flight of activeFlights) {
      const model = aircraftModels.get(flight.hex || flight.callsign)!;
      const azimuth = flight.bearingDeg*Math.PI/180;
      const radius = THREE.MathUtils.clamp(flight.distanceKm*3.2, 48, 280);
      const elevation = THREE.MathUtils.clamp(Math.atan2(flight.altitudeM,flight.distanceKm*1000),0.12,1.02);
      model.position.set(avatar.position.x+Math.sin(azimuth)*radius, Math.tan(elevation)*radius,avatar.position.z-Math.cos(azimuth)*radius);
      model.rotation.y = Math.PI/2-flight.headingDeg*Math.PI/180;
      model.scale.setScalar(1.6+radius/65);
      model.visible = projectFlight(flight).visible;
    }
    sky.material.uniforms.uAuroraBoost.value = THREE.MathUtils.clamp(liveState.auroraLiveBoost, 0.95, 1.7) * 1.14;
    festivities.update(dt, time, frame, snapshot, avatar.position, heading, liveState);
    flightStars.update(activeFlights,frame,projectFlight);
    stage!.render();
    requestAnimationFrame(update);
  }
  new ResizeObserver(() => {
    stage.resize(world.clientWidth,world.clientHeight);
    festivities.resize(world.clientWidth,world.clientHeight);
  }).observe(world);
  requestAnimationFrame(update);
}
