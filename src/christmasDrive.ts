import { createAlpineHorizon } from './three/alpineHorizon';
import { DriveFestivities } from './three/DriveFestivities';
import './styles/christmasDrive.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LiveWorldDataManager, type LiveFlight } from './core/liveWorldData';
import { geoDeltaMeters, OsmWorldDirector } from './core/osmWorld';
import { TerrainTrial, terrainBounds, terrainDatum, terrainFloor, terrainMap, trialHeight } from './core/terrainTrial';
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
  <aside class="terrain-trial" data-trial-panel hidden>
    <strong>Höjdtest · Badhausstraße</strong>
    <span data-trial-elevation></span>
    <div><button data-trial-pause type="button">Pausa</button> <button data-trial-exit type="button">Till GPS</button></div>
    <a href="https://earth.jaxa.jp/en/data/policy/" target="_blank" rel="noopener">Höjddata © JAXA · AW3D30</a>
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
          <span data-live-launch hidden></span>
          <button type="button" data-event="starlink">Starlink</button>
          <button type="button" data-event="starship">Starship</button>
          <button type="button" data-event="starman">Starman</button>
          <button type="button" data-event="supercharger">Supercharger</button>
          <button type="button" data-event="cyberplow">Cybertruck-plog</button>
          <button type="button" data-auto-magic aria-pressed="true">Julmagi längs vägen</button>
          <button type="button" data-timeline aria-pressed="false">Elon-tidslinje</button>
          <button type="button" data-convoy>Julkaravan</button>
          <button type="button" data-light-wave>Julens ljusvåg</button>
          <button type="button" data-tunnel>Boring-tunneln</button>
          <button type="button" data-terrain>Testa höjdterräng</button>
          <button type="button" data-frost aria-pressed="true">Frost på skärmen</button>
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
  const groundMaterial = createWinterGround();
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1600,1600),groundMaterial);
  let relief: THREE.Mesh | undefined;
  function createTrialTerrain() {
    const {minX,minZ,maxX,maxZ} = terrainBounds;
    const terrainGeometry = new THREE.PlaneGeometry(maxX-minX,maxZ-minZ,
      Math.ceil((maxX-minX)/4),Math.ceil((maxZ-minZ)/4)).rotateX(-Math.PI/2)
      .translate((minX+maxX)/2,0,(minZ+maxZ)/2);
    const terrainVertices = terrainGeometry.attributes.position;
    for (let i = 0; i < terrainVertices.count; i++) {
      terrainVertices.setY(i,trialHeight(terrainVertices.getX(i),terrainVertices.getZ(i))-0.077);
    }
    terrainGeometry.computeVertexNormals();
    const relief = new THREE.Mesh(terrainGeometry,groundMaterial);
    relief.name = 'JAXA height trial terrain';
    relief.receiveShadow = true;
    scene.add(relief);
    return relief;
  }
  ground.rotation.x = -Math.PI / 2;
  const sky = createPixarSkyDome(730);
  shapeChristmasSky(sky.material);
  sky.mesh.renderOrder = -3;
  const snowfall = createBokehSnowField(310, {minX:-45,maxX:45,minY:1,maxY:38,minZ:-55,maxZ:55});
  const map = new ChristmasMap();
  const mountains = createAlpineHorizon();
  scene.add(ground, sky.mesh, mountains, map.group, avatar, snowfall.group);
  stage.setAtmosphere(0.04, 0.72, '#8a91af');
  const warm = new THREE.DirectionalLight('#ffd4ba', 1.18);
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
  const flightTemplate = createAccurateStarmanRoadster();
  const flightBounds = new THREE.Box3().setFromObject(flightTemplate);
  const corners: THREE.Vector3[] = [];
  for (const x of [flightBounds.min.x,flightBounds.max.x]) {
    for (const y of [flightBounds.min.y,flightBounds.max.y]) {
      for (const z of [flightBounds.min.z,flightBounds.max.z]) corners.push(new THREE.Vector3(x,y,z));
    }
  }
  function projectFlight(flight: LiveFlight) {
    const model = aircraftModels.get(flight.hex || flight.callsign)!;
    projection.copy(model.position).project(camera);
    if (!(projection.z > -1 && projection.z < 1) || Math.abs(projection.x) > 1.4 || Math.abs(projection.y) > 1.4) {
      model.visible = false;
      return {x:0,y:0,width:0,height:0,visible:false};
    }
    model.updateMatrix();
    let left = Infinity,right = -Infinity,top = Infinity,bottom = -Infinity;
    for (const corner of corners) {
      projection.copy(corner).applyMatrix4(model.matrix).project(camera);
      const x = (1+projection.x)*50,y = (1-projection.y)*50;
      left = Math.min(left,x); right = Math.max(right,x);
      top = Math.min(top,y); bottom = Math.max(bottom,y);
    }
    model.visible = right>0 && left<100 && bottom>0 && top<100;
    return {x:(left+right)/2,y:(top+bottom)/2,width:Math.min(35,right-left+1.4),
      height:Math.min(40,bottom-top+2),visible:model.visible};
  }
  const telemetry = new TelemetryEngine('gps');
  const festivities = new DriveFestivities(root, world, scene, sleigh, telemetry, map.villageLights);
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
  const shadowOffset = new THREE.Vector3(-53,40,32);
  let liveState = live.getState();
  let activeFlights: LiveFlight[] = [];
  let trial: TerrainTrial | undefined;
  const trialPanel = get('[data-trial-panel]');
  const trialPause = get<HTMLButtonElement>('[data-trial-pause]');
  const trialAltitude = get('[data-trial-elevation]');
  function setTrial(enabled: boolean) {
    trial = enabled ? new TerrainTrial() : undefined;
    trialPanel.hidden = !enabled;
    if (enabled) relief ??= createTrialTerrain();
    if (relief) relief.visible = enabled;
    trialPause.textContent = 'Pausa';
    hasPosition = false;
    priorMapOrigin = undefined;
    avatar.position.set(0,0,0);
    avatar.rotation.x = 0;
    lastUi = -1000;
    follow();
  }
  const terrainButton = get<HTMLButtonElement>('[data-terrain]');
  terrainButton.onclick = () => {
    terrainButton.closest('details')!.open = false;
    setTrial(true);
  };
  get<HTMLButtonElement>('[data-trial-exit]').onclick = () => setTrial(false);
  trialPause.onclick = () => {
    if (trial?.complete) setTrial(true);
    else if (trial) {
      trial.paused = !trial.paused;
      trialPause.textContent = trial.paused ? 'Fortsätt' : 'Pausa';
    }
  };
  let wheelPhase = 0;
  let flightSpeed = 0;
  let hoverPhase = 0;

  function drivingView() {
    const east = Math.sin(heading), north = Math.cos(heading);
        const ahead = trial ? trialHeight(avatar.position.x+10*east,avatar.position.z-10*north)-avatar.position.y : 0;
    desiredTarget.set(avatar.position.x+10*east,avatar.position.y+8+ahead*0.38,avatar.position.z-10*north);
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
    const gpsFrame = telemetry.update(dt);
    const fix = gpsFrame.gpsStatus === 'active';
    const gpsMap = director.update(dt,'gps',gpsFrame.latitude,gpsFrame.longitude,gpsFrame.isMoving,gpsFrame.speedKmh,fix);
    const frame = trial?.update(dt,gpsFrame) ?? gpsFrame;
    const osm = trial ? terrainMap : gpsMap;
    const snapshot = osm.isLiveOsm ? osm.snapshot : undefined;
    const position = snapshot ? geoDeltaMeters(snapshot.originLat, snapshot.originLon, frame.latitude, frame.longitude) : {x:0,z:0};
    const direction = frame.headingDeg*Math.PI/180;
    const turn = Math.atan2(Math.sin(direction-heading), Math.cos(direction-heading));
    heading += turn * (hasPosition ? Math.min(1,dt*5) : 1);
    map.group.visible = !!snapshot;
    if (snapshot) {
      if (priorMapOrigin && (priorMapOrigin.lat !== snapshot.originLat || priorMapOrigin.lon !== snapshot.originLon)) {
        const shift = geoDeltaMeters(snapshot.originLat, snapshot.originLon, priorMapOrigin.lat, priorMapOrigin.lon);
        const offset = new THREE.Vector3(shift.x,0,shift.z);
        avatar.position.add(offset);
        camera.position.add(offset);
        orbit.target.add(offset);
      }
      priorMapOrigin = {lat: snapshot.originLat, lon: snapshot.originLon};
      map.update(snapshot,trial ? trialHeight : undefined);
    }
    avatar.visible = !!trial || fix || hasPosition;
    const dx = position.x-avatar.position.x, dz = position.z-avatar.position.z;
    const rebase = Math.hypot(dx,dz) > 90;
    if (snapshot && (trial || fix || hasPosition)) {
      const ease = !hasPosition || rebase ? 1 : 1-Math.exp(-dt*8);
      // Translate both ends of the camera rig by exactly the smoothed GPS motion.
      // Drag, pan and pinch only change the offset from the car.
      const height = trial ? trialHeight(avatar.position.x+dx*ease,avatar.position.z+dz*ease) : 0;
      movement.set(dx*ease,(height-avatar.position.y)*ease,dz*ease);
      avatar.position.add(movement);
      camera.position.add(movement);
      orbit.target.add(movement);
      if (!hasPosition && alignWithHeading) follow();
      hasPosition = true;
    }
    avatar.rotation.order = 'YXZ';
    avatar.rotation.y = -heading;
    if (trial) {
      const x = avatar.position.x,z = avatar.position.z;
      const east = Math.sin(heading)*5,north = Math.cos(heading)*5;
      const pitch = Math.atan2(trialHeight(x+east,z-north)-trialHeight(x-east,z+north),10);
      avatar.rotation.x = THREE.MathUtils.lerp(avatar.rotation.x,pitch,Math.min(1,dt*6));
    }
    const airspeed = frame.isMoving && (trial || fix) ? frame.speedKmh : 0;
    flightSpeed = THREE.MathUtils.damp(flightSpeed,airspeed,2.6,dt);
    const lift = THREE.MathUtils.smoothstep(flightSpeed,0,75);
    const flying = sleigh.group.visible;
    if (flying) {
      hoverPhase += dt*(1.25+0.65*lift);
      sleigh.group.position.y = 1.35+1.75*lift+Math.sin(hoverPhase)*(0.13-0.06*lift);
      const pitch = THREE.MathUtils.clamp((airspeed-flightSpeed)*0.009,-0.075,0.075);
      sleigh.group.rotation.x = THREE.MathUtils.damp(sleigh.group.rotation.x,pitch,3.5,dt);
      sleigh.update(dt,flightSpeed,frame.turnRate,frame.acceleration,time);
    }
    shadow.scale.setScalar(flying ? 1.06+0.18*lift : 1);
    shadow.material.opacity = flying ? 0.47-0.12*lift : 0.52;
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
    camera.position.y = Math.max((trial ? trialHeight(camera.position.x,camera.position.z) : 0)+1.5,camera.position.y);
    camera.lookAt(orbit.target);
    camera.updateMatrixWorld();
    ground.position.set(avatar.position.x,trial ? terrainFloor-0.15 : 0,avatar.position.z);
    map.animate(time,avatar.position);
    warm.target.position.copy(orbit.target);
    warm.position.copy(warm.target.position).add(shadowOffset);
    sky.mesh.position.copy(camera.position);
    mountains.position.set(camera.position.x,trial ? avatar.position.y : 0,camera.position.z);
    sky.material.uniforms.uTime.value = time;
    snowfall.group.position.copy(avatar.position);
    // The snow field is car-relative. Let nearby flakes stream past in the direction of travel.
    const slipstream = flying ? Math.min(13,flightSpeed/3.6)*0.75 : 0;
    snowfall.update(dt,0.12-Math.sin(heading)*slipstream,-0.16+Math.cos(heading)*slipstream,1.2);

    if (now - lastUi >= 240) {
      lastUi = now;
      live.update(gpsFrame.latitude,gpsFrame.longitude,true,fix);
      liveState = live.getState();
      activeFlights = trial ? [] : liveState.flights;
      if (trial) {
        const inclination = Math.round(100*Math.tan(avatar.rotation.x));
        trialAltitude.textContent = `${Math.round(avatar.position.y+terrainDatum)} m ö.h. · ${inclination}% lutning`;
        if (trial.complete) trialPause.textContent = 'Kör igen';
      }
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
    }
    sky.material.uniforms.uAuroraBoost.value = THREE.MathUtils.clamp(liveState.auroraLiveBoost, 0.95, 1.7) * 1.14;
    festivities.update(dt,time,frame,snapshot,avatar.position,heading,liveState,trial ? trialHeight : undefined);
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
