export type Locale = 'sv' | 'en';

export type SceneId = 'express' | 'caravan' | 'flight3d' | 'snowglobe' | 'timeline';
export type ElonEventType = 'starman' | 'starlink' | 'starship' | 'supercharger' | 'cyberplow';

export interface ModeMeta {
  id: SceneId;
  title: string;
  subtitle: string;
  badge: string;
  actionLabel: string;
}

export interface TranslationDict {
  appTitle: string;
  appSubtitle: string;
  safetyTitle: string;
  safetyRules: [string, string, string];
  safetyDisclaimer: string;
  safetyAccept: string;
  soundTestBtn: string;
  menuDriveLabel: string;
  menuAudioLabel: string;
  driveGps: string;
  driveDemo: string;
  driveManual: string;
  audioFull: string;
  audioSfx: string;
  audioMuted: string;
  backToMenu: string;
  controlsBtn: string;
  hoHoHoBtn: string;
  northPoleShort: string;
  gpsActive: string;
  gpsWaiting: string;
  gpsError: string;
  demoActive: string;
  manualActive: string;
  tunnelActive: string;
  plaidBadge: string;
  drawerTitle: string;
  drawerSwitchMode: string;
  drawerDriveSection: string;
  drawerSpeedLabel: string;
  drawerTurnLabel: string;
  drawerTurnLeft: string;
  drawerTurnCenter: string;
  drawerTurnRight: string;
  drawerTunnelToggle: string;
  drawerElonSection: string;
  drawerAudioSection: string;
  drawerVolume: string;
  drawerRouting: string;
  drawerRoutingDirect: string;
  drawerRoutingMedia: string;
  drawerSoundCheckTitle: string;
  drawerSoundCheckHint: string;
  soundCheckDirect: string;
  soundCheckMedia: string;
  soundCheckWav: string;
  drawerEnvSection: string;
  skyMidnight: string;
  skyTwilight: string;
  skyDaylight: string;
  skyAuto: string;
  qualityLabel: string;
  qualityUltra: string;
  qualityEco: string;
  frostLabel: string;
  languageLabel: string;
  closeDrawer: string;
  soundCheckModalTitle: string;
  modes: Record<SceneId, ModeMeta>;
  elonEvents: Record<ElonEventType, { label: string; toast: string }>;
  reindeerGears: {
    park: string;
    trot: string;
    dash: string;
    prance: string;
    comet: string;
    blitzen: string;
    plaid: string;
  };
  snowglobeTitle: string;
  snowglobeSpeedLabel: string;
  snowglobeCompassLabel: string;
  snowglobeGearLabel: string;
  snowglobeNorthPoleKm: string;
  tunnelBanner: string;
  webglFallbackTitle: string;
  webglFallbackText: string;
  osmSectionLabel: string;
  osmEnableLabel: string;
  osmNextStopBtn: string;
  osmGreetingPrefix: string;
  osmBiomes: Record<'village' | 'forest' | 'water' | 'highway' | 'open', string>;
  timelinePrev: string;
  timelineNext: string;
  timelinePassingLabel: string;
  timelineUpcomingLabel: string;
  osmBuildingsLabel: string;
  osmWaterLabel: string;
  osmWildlifeLabel: string;
  osmLiveGpsTag: string;
  osmDemoTourTag: string;
  cinematicCamBtn: string;
  cinematicCamLabel: string;
  themeLabel: string;
  themeClassic: string;
  themeNordic: string;
  themeCyber: string;
  calendarLabel: string;
  calAuto: string;
  calAdvent: string;
  calLucia: string;
  calXmasEve: string;
  micLabel: string;
  micOff: string;
  micActive: string;
  micDenied: string;
  liveSectionLabel: string;
  frostWipeHint: string;
  giftsLabel: string;
  elonTimelineToggleLabel: string;
  convoyHornBtn: string;
  townTreeLitToast: string;
  snowmanCrownToast: string;
  wishStarToast: string;
  convoyHornToast: string;
  unitsDistanceLabel: string;
  unitsTempLabel: string;
  unitsAuto: string;
  unitsMetric: string;
  unitsImperial: string;
  unitsCelsius: string;
  unitsFahrenheit: string;
  drive: {
    pageTitle: string;
    worldAria: string;
    cinemaPill: string;
    cinemaPillTitle: string;
    cameraTitle: string;
    camChase: string;
    camMap: string;
    camCinematic: string;
    camMapShort: string;
    camCinematicShort: string;
    followBtn: string;
    soundTitle: string;
    settingsAria: string;
    cinemaSoundBtn: string;
    cinemaNextBtn: string;
    cinemaNextTitle: string;
    cinemaCloseAria: string;
    cinemaSurfaceAria: string;
    cinemaModeAria: string;
    waitingGps: string;
    retryGps: string;
    timelineKicker: string;
    timelineNext: string;
    trialTitle: string;
    trialPause: string;
    trialResume: string;
    trialReplay: string;
    trialToGps: string;
    trialCredit: string;
    trialMasl: string;
    trialGrade: string;
    demoTitle: string;
    speedPrefix: string;
    dockGift: string;
    dockSnowball: string;
    dockSalute: string;
    dockHoHoHo: string;
    dockLights: string;
    dockMagicPrefix: string;
    hohoBanner: string;
    magicDialogAria: string;
    magicTitle: string;
    magicTabPowers: string;
    magicTabWorkshop: string;
    magicFoot: string;
    magicPtsUnit: string;
    drawerTitle: string;
    drawerAria: string;
    vehicleLabel: string;
    vehicleSleigh: string;
    vehicleSemi: string;
    vehicleCybertruck: string;
    vehicleStarman: string;
    cameraLabel: string;
    graphicsMoodLabel: string;
    themeClassic: string;
    themeNordic: string;
    themeCyber: string;
    skyAuto: string;
    skyMidnight: string;
    skyBlue: string;
    skyDay: string;
    calendarLabel: string;
    calAuto: string;
    calAdv1: string;
    calAdv2: string;
    calAdv3: string;
    calAdv4: string;
    calLucia: string;
    calXmasEve: string;
    fsdPathChip: string;
    trafficChip: string;
    frostChip: string;
    elevationChip: string;
    audioLabel: string;
    mixFull: string;
    mixSfx: string;
    mixMuted: string;
    volLabel: string;
    routeDirect: string;
    routeMedia: string;
    micBtn: string;
    micOnBtn: string;
    micDeniedBtn: string;
    soundTestChip: string;
    magicEventsLabel: string;
    eventCyberplow: string;
    eventConvoy: string;
    eventTunnel: string;
    eventCinema: string;
    eventGigaCinema: string;
    surfaceLabel: string;
    cinemaModeLabel: string;
    cinemaAutoLabel: string;
    cinemaIntervalToast: string;
    cinemaExpandTitle: string;
    demoChangeRouteBtn: string;
    demoModalTitle: string;
    demoTabPresets: string;
    demoTabAddress: string;
    demoTabMap: string;
    demoAddrHint: string;
    demoAddrFromLabel: string;
    demoAddrToLabel: string;
    demoAddrFromPlaceholder: string;
    demoAddrToPlaceholder: string;
    demoStartRouteBtn: string;
    demoRouteLoading: string;
    demoRouteGeocoding: string;
    demoRouteNeedBothAddr: string;
    demoRouteNotFound: string;
    demoRouteCustomMapName: string;
    demoMapPickA: string;
    demoMapPickB: string;
    demoMapClearBtn: string;
    autoMagicChip: string;
    timelineChip: string;
    langUnitsLabel: string;
    testMoreLabel: string;
    testDemoBtn: string;
    testTerrainBtn: string;
    classicModesLink: string;
    streetYourPos: string;
    streetFetching: string;
    powerUnlockedToast: string;
    powerActiveToast: string;
    needMagicToast: string;
    trailLabel: string;
    megaSnowballState: string;
    sleighStyleLabel: string;
    owlLabel: string;
    cinemaStartedToast: string;
    cinemaStoppedToast: string;
    cinemaSurfaceToast: string;
    gigaActiveToast: string;
    cinemaModeToast: string;
    convoyStartedToast: string;
    lightShowToast: string;
    hohoToast: string;
    wishStarEarnedToast: string;
    wishStarShortToast: string;
    rudolfShort: string;
    reindeerShort: string;
    elfShort: string;
    giftSingle: string;
    giftPlural: string;
    giftDeliveredSingle: string;
    giftDeliveredPlural: string;
    snowballMegaHit: string;
    snowballHit: string;
    churchBellNamed: string;
    churchBellAnon: string;
    noSuperchargerToast: string;
    magicFullToast: string;
    onState: string;
    offState: string;
  };
}

const SV: TranslationDict = {
  appTitle: 'TESLA XMAS MODE',
  appSubtitle: 'Coca-Cola Holiday Edition · Välj din julvärld',
  safetyTitle: 'Innan du rullar ut i julnatten',
  safetyRules: [
    '1 · Du är föraren. Du ansvarar alltid för körningen och att följa trafikreglerna.',
    '2 · Håll ljudvolymen på en nivå där du alltid hör trafik, sirener och tutningar.',
    '3 · Välj läge och gör inställningar medan bilen står stilla — skärmen tonar ner automatiskt under färd.',
  ],
  safetyDisclaimer:
    'Skapad för magisk passagerar- och bilstämning via webbläsarens GPS & Web Audio. Används på eget ansvar.',
  safetyAccept: 'Starta Julmagin',
  soundTestBtn: 'Ljudtest',
  menuDriveLabel: 'Körkälla',
  menuAudioLabel: 'Ljudmix',
  driveGps: 'GPS (Bil)',
  driveDemo: 'Demo Drive',
  driveManual: 'Manuell',
  audioFull: 'Full Jul',
  audioSfx: 'Bara SFX (Spotify)',
  audioMuted: 'Tyst',
  backToMenu: '← Meny',
  controlsBtn: 'Kontroller',
  hoHoHoBtn: '🎅 Ho-Ho-Ho',
  northPoleShort: 'Nordpolen',
  gpsActive: 'GPS Aktiv',
  gpsWaiting: 'Söker GPS…',
  gpsError: 'GPS Saknas',
  demoActive: 'Demo Drive',
  manualActive: 'Manuell',
  tunnelActive: 'Boring-tunnel',
  plaidBadge: 'PLAID SLEIGH',
  drawerTitle: 'Julkontroller & Test',
  drawerSwitchMode: 'Byt läge direkt',
  drawerDriveSection: 'Körning & Telemetri',
  drawerSpeedLabel: 'Hastighet',
  drawerTurnLabel: 'Sväng / Kurva',
  drawerTurnLeft: 'Vänster',
  drawerTurnCenter: 'Rakt',
  drawerTurnRight: 'Höger',
  drawerTunnelToggle: 'Testa Boring-tunnel',
  drawerElonSection: 'Trigga Elon-händelse',
  drawerAudioSection: 'Ljud & Tesla-högtalare',
  drawerVolume: 'Volym',
  drawerRouting: 'Ljudutgång',
  drawerRoutingDirect: 'Direct',
  drawerRoutingMedia: 'Media Player',
  drawerSoundCheckTitle: 'Inget ljud? Tesla Ljudtest',
  drawerSoundCheckHint:
    'Skruva upp bilens rattvolym och testa knapparna en i taget. Välj sedan den utgång som hörs i högtalarna.',
  soundCheckDirect: '1 · Bjällra (Direct)',
  soundCheckMedia: '2 · Bjällra (Media Player)',
  soundCheckWav: '3 · Julklocka (Audio WAV)',
  drawerEnvSection: 'Himmel, Frost & Språk',
  skyMidnight: 'Julnatt',
  skyTwilight: 'Blå timmen',
  skyDaylight: 'Vinterdag',
  skyAuto: 'Auto-tid',
  qualityLabel: '3D-Grafik',
  qualityUltra: 'Pixar Ultra',
  qualityEco: 'Eco (MCU2)',
  frostLabel: 'Isfrost i hörnen',
  languageLabel: 'Språk',
  closeDrawer: 'Stäng',
  soundCheckModalTitle: 'Tesla Högtalartest',
  modes: {
    express: {
      id: 'express',
      title: 'Coca-Cola Winter Express',
      subtitle:
        '3D Pixar-panorama med skulpterad Tomte & renar som galopperar längs gnistrande alptoppar, norrsken och varma julstugor.',
      badge: '3D Pixar Panorama',
      actionLabel: '🎁 Släpp julklapp',
    },
    caravan: {
      id: 'caravan',
      title: 'Holidays Are Coming: Caravan',
      subtitle:
        'Glödande 3D-konvoj av julbelysta Tesla Semis & Cybertruck som tänder en gyllene ljusvåg längs den snöiga dalen.',
      badge: '3D Coca-Cola Caravan',
      actionLabel: '✨ Ljusvåg',
    },
    flight3d: {
      id: 'flight3d',
      title: 'North Pole Flight Deck',
      subtitle:
        'Flagship Pixar 3D-vinterväg med Coca-Cola & Tesla-karavaner, realtidsflyg, norrsken, hus från OpenStreetMap & Julklappskanon!',
      badge: 'Disney/Pixar All-in-One ★',
      actionLabel: '🎁 Tänd byn & Starlink',
    },
    snowglobe: {
      id: 'snowglobe',
      title: 'The Enchanted Snowglobe',
      subtitle:
        'Äkta 3D-kristallglob med miniatyrby & kretsande släde där snön virvlar av bilens G-krafter, plus riktig Nordpolen-kompass.',
      badge: '3D Crystal Snowglobe',
      actionLabel: '❄️ Skaka globen',
    },
    timeline: {
      id: 'timeline',
      title: 'Elon Holiday Timeline (2006–2026)',
      subtitle:
        'Kör förbi 14 fullskaliga Elon-händelser längs vintervägen — från Secret Master Plan & $420 till Starman, Mechazilla & Cybercab!',
      badge: '3D Väghändelser · 14 År',
      actionLabel: '⏭ Nästa längs vägen',
    },
  },
  elonEvents: {
    starman: {
      label: '🚗 Starman',
      toast: 'Starman med tomteluva passerar framför fullmånen!',
    },
    starlink: {
      label: '🛰 Starlink',
      toast: 'Starlink-julbelysning glider över stjärnhimlen',
    },
    starship: {
      label: '🚀 Starship',
      toast: 'Starship lyfter mot Nordpolens norrsken!',
    },
    supercharger: {
      label: '⚡ Supercharger',
      toast: 'Nordpolens Supercharger-Oas · Glöggbod & Optimus!',
    },
    cyberplow: {
      label: '🎄 Cybertruck',
      toast: 'Cybertruck-snöplog med lysande julgran på flaket!',
    },
  },
  reindeerGears: {
    park: 'PARK',
    trot: 'TROT',
    dash: 'DASH',
    prance: 'PRANCE',
    comet: 'COMET',
    blitzen: 'BLITZEN',
    plaid: 'PLAID',
  },
  snowglobeTitle: 'TESLA XMAS EDITION',
  snowglobeSpeedLabel: 'SLÄDFART',
  snowglobeCompassLabel: 'NORDPOLEN',
  snowglobeGearLabel: 'RENVÄXEL',
  snowglobeNorthPoleKm: 'km till Tomten',
  tunnelBanner: 'THE BORING CO. · NORTH POLE EXPRESS',
  webglFallbackTitle: 'WebGL kunde inte startas',
  webglFallbackText:
    'Din webbläsare nekade 3D-kontext just nu. Prova något av de andra tre lägena i menyn!',
  osmSectionLabel: 'Plats & OpenStreetMap',
  osmEnableLabel: 'Använd OpenStreetMap (GPS-miljö)',
  osmNextStopBtn: '📍 Nästa demo-plats',
  osmGreetingPrefix: 'God Jul,',
  osmBiomes: {
    village: 'Julstad',
    forest: 'Vinterskog',
    water: 'Frusen sjö',
    highway: 'Vinterväg',
    open: 'Öppet landskap',
  },
  timelinePrev: 'Föregående',
  timelineNext: 'Nästa',
  timelinePassingLabel: 'Passerar nu!',
  timelineUpcomingLabel: 'Längre fram längs vägen',
  osmBuildingsLabel: 'byggnader',
  osmWaterLabel: 'vatten',
  osmWildlifeLabel: '🦌 Skogsdjur',
  osmLiveGpsTag: 'Live OSM',
  osmDemoTourTag: 'Demo-rutt',
  cinematicCamBtn: '🎥 Bio',
  cinematicCamLabel: 'Cinematic Bio-kamera',
  themeLabel: 'Jul-tema / Skinn',
  themeClassic: 'Coca-Cola',
  themeNordic: 'Sagovinter',
  themeCyber: 'Cyber 2099',
  calendarLabel: 'Advents- & Julkalender',
  calAuto: 'Auto (Idag)',
  calAdvent: '4:e Advent',
  calLucia: 'Lucia (13 dec)',
  calXmasEve: 'Julafton (24 dec)',
  micLabel: '🎤 Lyssna på bilens musik',
  micOff: 'Av',
  micActive: 'Aktiv',
  micDenied: 'Ej tillåten',
  liveSectionLabel: 'Live Rymd, Väder & Flyg',
  frostWipeHint: 'Dra fingret på kanterna för att skrapa frost',
  giftsLabel: '🎁',
  elonTimelineToggleLabel: 'Visa Elon-tidslinje längs vägen',
  convoyHornBtn: '📯 Tuta',
  townTreeLitToast: '🎄 Torggranen tänd! +5 🎁 Hela kvarteret strålar!',
  snowmanCrownToast: '⛄ Snögubben jublar med guldkrona! +2 🎁',
  wishStarToast: '🌠 Fångade ett stjärnfall! +3 Önskebonus 🎁',
  convoyHornToast: '📯 Konvojen tutar julhälsning · Strålkastarvåg!',
  unitsDistanceLabel: 'Hastighet & Avstånd',
  unitsTempLabel: 'Temperatur',
  unitsAuto: 'Auto',
  unitsMetric: 'km/h · km',
  unitsImperial: 'mph · mi',
  unitsCelsius: '°C',
  unitsFahrenheit: '°F',
  drive: {
    pageTitle: 'Vintervärlden · Julkarta i 3D',
    worldAria: 'Interaktiv julvärld',
    cinemaPill: '🎬 Rymdbio',
    cinemaPillTitle: 'Rymdbio i himlen (V)',
    cameraTitle: 'Växla kamera (C)',
    camChase: 'FSD Vy',
    camMap: 'Kartvy',
    camCinematic: 'Filmisk',
    camMapShort: 'Kartvy',
    camCinematicShort: 'Filmisk',
    followBtn: 'Följ släden',
    soundTitle: 'Ljud på/av',
    settingsAria: 'Inställningar',
    cinemaSoundBtn: '🔊 Ljud',
    cinemaNextBtn: 'Nästa',
    cinemaNextTitle: 'Nästa klipp',
    cinemaCloseAria: 'Stäng Rymdbio',
    cinemaSurfaceAria: 'Visningsyta',
    cinemaModeAria: 'Rymdbio-läge',
    waitingGps: 'Väntar på GPS',
    retryGps: 'Försök igen GPS',
    timelineKicker: 'Elon-tidslinje',
    timelineNext: 'Nästa',
    trialTitle: 'Höjdtest · Badhausstraße',
    trialPause: 'Pausa',
    trialResume: 'Fortsätt',
    trialReplay: 'Kör igen',
    trialToGps: 'Till GPS',
    trialCredit: 'Höjddata © JAXA · AW3D30',
    trialMasl: 'ö.h.',
    trialGrade: 'lutning',
    demoTitle: 'Demorutt · Lokevägen',
    speedPrefix: 'Fart',
    dockGift: '🎁 Julklapp',
    dockSnowball: '❄ Snöboll',
    dockSalute: '🎺 Tut',
    dockHoHoHo: '🎅 Ho-Ho',
    dockLights: '✨ Ljus',
    dockMagicPrefix: '✨ MAGI',
    hohoBanner: '🎅 HO! HO! HO! · GOD JUL! ✨',
    magicDialogAria: 'Julmagi',
    magicTitle: '✨ Julmagi',
    magicTabPowers: '⚡ Fyra av nu',
    magicTabWorkshop: '🎁 Verkstad',
    magicFoot: 'Tjäna Julmagi: ⭐ +25 · 🦌 +20 · 🧝 +15 · 🎁 +10 (Combo upp till x4)',
    magicPtsUnit: 'p',
    drawerTitle: 'Vintervärlden',
    drawerAria: 'Kontrollpanel',
    vehicleLabel: 'Fordon',
    vehicleSleigh: '🎅 Släde',
    vehicleSemi: '🚛 Semi',
    vehicleCybertruck: '📐 Cybertruck',
    vehicleStarman: '🚀 Starman',
    cameraLabel: 'Kamera',
    graphicsMoodLabel: 'Grafik & Stämning',
    themeClassic: 'Klassisk',
    themeNordic: 'Nordisk',
    themeCyber: 'Cyber 2099',
    skyAuto: 'Auto',
    skyMidnight: 'Midnatt',
    skyBlue: 'Blå',
    skyDay: 'Dag',
    calendarLabel: 'Julkalender',
    calAuto: 'Automatisk (Riktigt datum)',
    calAdv1: '1:a Advent',
    calAdv2: '2:a Advent',
    calAdv3: '3:e Advent',
    calAdv4: '4:e Advent',
    calLucia: '13 dec · Lucia',
    calXmasEve: '24 dec · Julafton',
    fsdPathChip: '❄ FSD Julbana',
    trafficChip: '🚛 Jul- & Teslatrafik',
    frostChip: '🌨 Frost på skärmen',
    elevationChip: '⛰ Riktig höjddata',
    audioLabel: 'Ljud & Bilstereo',
    mixFull: 'Full',
    mixSfx: 'Effekter',
    mixMuted: 'Tyst',
    volLabel: 'Volym',
    routeDirect: 'Direkt',
    routeMedia: 'Media Player',
    micBtn: '🎙 Kupémikrofon',
    micOnBtn: '🎙 Mikrofon PÅ',
    micDeniedBtn: '🎙 Nekad',
    soundTestChip: '🔊 Ljudtest',
    magicEventsLabel: 'Julmagi & Händelser',
    eventCyberplow: 'Cybertruck-plog',
    eventConvoy: 'Julkaravan',
    eventTunnel: 'Boring-tunneln',
    eventCinema: '🎬 Rymdbio',
    eventGigaCinema: '🏢 Giga-bio',
    surfaceLabel: 'Visningsyta',
    cinemaModeLabel: 'Rymdbio-läge',
    cinemaAutoLabel: 'Auto Rymdbio',
    cinemaIntervalToast: 'Auto Rymdbio',
    cinemaExpandTitle: 'Visa eller dölj visningsval',
    demoChangeRouteBtn: 'Byt rutt',
    demoModalTitle: 'Välj demorutt (A → B)',
    demoTabPresets: 'Kända rutter',
    demoTabAddress: 'Adresser (A → B)',
    demoTabMap: 'Välj på karta',
    demoAddrHint: 'Skriv valfri start- och måladress var som helst i världen.',
    demoAddrFromLabel: 'Startadress (A)',
    demoAddrToLabel: 'Måladress (B)',
    demoAddrFromPlaceholder: 't.ex. Strandvägen 1, Stockholm',
    demoAddrToPlaceholder: 't.ex. Kungsgatan 10, Stockholm',
    demoStartRouteBtn: 'Starta demorutt',
    demoRouteLoading: 'Hämtar körväg',
    demoRouteGeocoding: 'Söker adresser',
    demoRouteNeedBothAddr: 'Fyll i både start- och måladress.',
    demoRouteNotFound: 'Kunde inte hitta en eller båda adresserna.',
    demoRouteCustomMapName: 'Egen kartrutt (A → B)',
    demoMapPickA: 'Klicka på kartan för startpunkt A',
    demoMapPickB: 'Klicka på kartan för mål B',
    demoMapClearBtn: 'Rensa',
    autoMagicChip: '✨ Automatisk julmagi',
    timelineChip: '📜 Elon-tidslinje',
    langUnitsLabel: 'Språk & Enheter',
    testMoreLabel: 'Test & Övrigt',
    testDemoBtn: '🧪 Testa demorutt',
    testTerrainBtn: '⛰ Test höjdterräng',
    classicModesLink: 'Klassiska lägen →',
    streetYourPos: 'Din position',
    streetFetching: 'Hämtar omgivningen',
    powerUnlockedToast: 'upplåst & aktiverad!',
    powerActiveToast: 'aktiverat!',
    needMagicToast: 'Behöver',
    trailLabel: 'Magispår',
    megaSnowballState: 'Mega-snöboll',
    sleighStyleLabel: 'Släde',
    owlLabel: 'Följe-uggla',
    cinemaStartedToast: 'Rymdbio',
    cinemaStoppedToast: 'Rymdbio tonas ut',
    cinemaSurfaceToast: 'Visningsyta',
    gigaActiveToast: 'Giga-fasadbio aktiv',
    cinemaModeToast: 'Rymdbio-läge',
    convoyStartedToast: 'Coca-Cola & Tesla Julkaravan!',
    lightShowToast: 'Tesla Jul-Ljusshow!',
    hohoToast: 'HO! HO! HO! · GOD JUL!',
    wishStarEarnedToast: 'Julmagi',
    wishStarShortToast: 'Önskestjärna!',
    rudolfShort: 'Rudolf!',
    reindeerShort: 'Ren!',
    elfShort: 'Julelv!',
    giftSingle: 'klapp',
    giftPlural: 'klappar',
    giftDeliveredSingle: 'levererad julklapp',
    giftDeliveredPlural: 'levererade julklappar',
    snowballMegaHit: 'Mega-snöbollssalva träffade!',
    snowballHit: 'Träff i snön!',
    churchBellNamed: 'Kyrkklockor',
    churchBellAnon: 'Julklockor ringer!',
    noSuperchargerToast: 'Ingen kartlagd Tesla Supercharger i närheten',
    magicFullToast: 'JULMAGI FULL! STORT FYRVERKERI!',
    onState: 'På ✓',
    offState: 'Av',
  },
};

const EN: TranslationDict = {
  appTitle: 'TESLA XMAS MODE',
  appSubtitle: 'Coca-Cola Holiday Edition · Choose your holiday world',
  safetyTitle: 'Before you roll into the winter night',
  safetyRules: [
    '1 · You are the driver. You are always responsible for driving safely and obeying traffic laws.',
    '2 · Keep volume at a level where you can clearly hear traffic, sirens, and horns.',
    '3 · Choose modes and adjust settings while parked — the HUD gently dims automatically while driving.',
  ],
  safetyDisclaimer:
    'Built for festive cabin ambience via browser GPS & Web Audio. Use at your own risk.',
  safetyAccept: 'Ignite Holiday Magic',
  soundTestBtn: 'Sound Check',
  menuDriveLabel: 'Drive Source',
  menuAudioLabel: 'Audio Mix',
  driveGps: 'GPS (Car)',
  driveDemo: 'Demo Drive',
  driveManual: 'Manual',
  audioFull: 'Full Holiday',
  audioSfx: 'SFX Only (Spotify)',
  audioMuted: 'Muted',
  backToMenu: '← Menu',
  controlsBtn: 'Controls',
  hoHoHoBtn: '🎅 Ho-Ho-Ho',
  northPoleShort: 'North Pole',
  gpsActive: 'GPS Live',
  gpsWaiting: 'Acquiring GPS…',
  gpsError: 'No GPS',
  demoActive: 'Demo Drive',
  manualActive: 'Manual',
  tunnelActive: 'Boring Tunnel',
  plaidBadge: 'PLAID SLEIGH',
  drawerTitle: 'Holiday Controls & Test',
  drawerSwitchMode: 'Switch mode',
  drawerDriveSection: 'Driving & Telemetry',
  drawerSpeedLabel: 'Speed',
  drawerTurnLabel: 'Steering / Curve',
  drawerTurnLeft: 'Left',
  drawerTurnCenter: 'Straight',
  drawerTurnRight: 'Right',
  drawerTunnelToggle: 'Test Boring Tunnel',
  drawerElonSection: 'Trigger Elon Easter Egg',
  drawerAudioSection: 'Audio & Tesla Speakers',
  drawerVolume: 'Volume',
  drawerRouting: 'Audio Output',
  drawerRoutingDirect: 'Direct',
  drawerRoutingMedia: 'Media Player',
  drawerSoundCheckTitle: 'No sound? Tesla Sound Check',
  drawerSoundCheckHint:
    'Turn up the car volume on the steering wheel and test the buttons one by one. Select the route you hear.',
  soundCheckDirect: '1 · Sleigh Bell (Direct)',
  soundCheckMedia: '2 · Sleigh Bell (Media Player)',
  soundCheckWav: '3 · Holiday Chime (Audio WAV)',
  drawerEnvSection: 'Sky, Frost & Language',
  skyMidnight: 'Holiday Night',
  skyTwilight: 'Blue Hour',
  skyDaylight: 'Winter Day',
  skyAuto: 'Auto Time',
  qualityLabel: '3D Graphics',
  qualityUltra: 'Pixar Ultra',
  qualityEco: 'Eco (MCU2)',
  frostLabel: 'Corner Ice Frost',
  languageLabel: 'Language',
  closeDrawer: 'Close',
  soundCheckModalTitle: 'Tesla Speaker Check',
  modes: {
    express: {
      id: 'express',
      title: 'Coca-Cola Winter Express',
      subtitle:
        '3D Pixar side-tracking cinema shot with sculpted Santa & galloping reindeer soaring over alpine peaks, aurora, and glowing cottages.',
      badge: '3D Pixar Panorama',
      actionLabel: '🎁 Drop Gift',
    },
    caravan: {
      id: 'caravan',
      title: 'Holidays Are Coming: Caravan',
      subtitle:
        'Illuminated 3D convoy of Coca-Cola-crimson Tesla Semis & Cybertruck sparking a golden wave of lights down the snowy valley.',
      badge: '3D Coca-Cola Caravan',
      actionLabel: '✨ Light Wave',
    },
    flight3d: {
      id: 'flight3d',
      title: 'North Pole Flight Deck',
      subtitle:
        'Flagship Pixar 3D winter boulevard fusing Coca-Cola & Tesla Semis, live sky data, OSM cottages & Gigafactories, plus a Gift Cannon!',
      badge: 'Disney/Pixar All-in-One ★',
      actionLabel: '🎁 Light Up & Starlink',
    },
    snowglobe: {
      id: 'snowglobe',
      title: 'The Enchanted Snowglobe',
      subtitle:
        'True 3D crystal snowglobe with orbiting sleigh & miniature village swirling with G-forces, plus a live North Pole compass.',
      badge: '3D Crystal Snowglobe',
      actionLabel: '❄️ Shake Globe',
    },
    timeline: {
      id: 'timeline',
      title: 'Elon Holiday Timeline (2006–2026)',
      subtitle:
        'Drive past 14 full-scale Elon spectacles erupting along the winter highway — from Secret Master Plan & $420 to Starman & Mechazilla!',
      badge: '3D Road Events · 14 Years',
      actionLabel: '⏭ Next Roadside Event',
    },
  },
  elonEvents: {
    starman: {
      label: '🚗 Starman',
      toast: 'Santa-hat Starman glides across the full moon!',
    },
    starlink: {
      label: '🛰 Starlink',
      toast: 'Starlink holiday train sparkles across the night sky',
    },
    starship: {
      label: '🚀 Starship',
      toast: 'Starship launches into the northern lights!',
    },
    supercharger: {
      label: '⚡ Supercharger',
      toast: 'North Pole Supercharger Oasis · Glögg & Optimus!',
    },
    cyberplow: {
      label: '🎄 Cybertruck',
      toast: 'Cybertruck Snowplow hauling a glowing Christmas tree!',
    },
  },
  reindeerGears: {
    park: 'PARK',
    trot: 'TROT',
    dash: 'DASH',
    prance: 'PRANCE',
    comet: 'COMET',
    blitzen: 'BLITZEN',
    plaid: 'PLAID',
  },
  snowglobeTitle: 'TESLA XMAS EDITION',
  snowglobeSpeedLabel: 'SLEIGH SPEED',
  snowglobeCompassLabel: 'NORTH POLE',
  snowglobeGearLabel: 'REINDEER GEAR',
  snowglobeNorthPoleKm: 'km to Santa',
  tunnelBanner: 'THE BORING CO. · NORTH POLE EXPRESS',
  webglFallbackTitle: 'WebGL unavailable',
  webglFallbackText:
    'Your browser declined a 3D WebGL context. Try any of the other holiday modes from the menu!',
  osmSectionLabel: 'Location & OpenStreetMap',
  osmEnableLabel: 'Enable OpenStreetMap World',
  osmNextStopBtn: '📍 Next Demo Location',
  osmGreetingPrefix: 'Merry Christmas,',
  osmBiomes: {
    village: 'Winter Town',
    forest: 'Snowy Forest',
    water: 'Frozen Lake',
    highway: 'Winter Highway',
    open: 'Open Countryside',
  },
  timelinePrev: 'Previous',
  timelineNext: 'Next',
  timelinePassingLabel: 'Passing now!',
  timelineUpcomingLabel: 'Ahead down the road',
  osmBuildingsLabel: 'buildings',
  osmWaterLabel: 'water',
  osmWildlifeLabel: '🦌 Forest wildlife',
  osmLiveGpsTag: 'Live OSM',
  osmDemoTourTag: 'Demo Tour',
  cinematicCamBtn: '🎥 Cinema',
  cinematicCamLabel: 'Cinematic Commercial Cam',
  themeLabel: 'Holiday Theme',
  themeClassic: 'Coca-Cola',
  themeNordic: 'Nordic Tale',
  themeCyber: 'Cyber 2099',
  calendarLabel: 'Advent & Holiday Calendar',
  calAuto: 'Auto (Today)',
  calAdvent: '4th Advent',
  calLucia: 'Lucia (Dec 13)',
  calXmasEve: 'Xmas Eve (Dec 24)',
  micLabel: '🎤 Cabin Music Light Show',
  micOff: 'Off',
  micActive: 'Active',
  micDenied: 'Blocked',
  liveSectionLabel: 'Live Space, Wind & Flights',
  frostWipeHint: 'Drag edges to wipe windshield frost',
  giftsLabel: '🎁',
  elonTimelineToggleLabel: 'Show Elon Timeline along road',
  convoyHornBtn: '📯 Horn',
  townTreeLitToast: '🎄 Town Square Tree Ignited! +5 🎁 Full Block Glowing!',
  snowmanCrownToast: '⛄ Snowman Crowned with Gold! +2 🎁',
  wishStarToast: '🌠 Shooting Star Caught! +3 Wish Bonus 🎁',
  convoyHornToast: '📯 Convoy Horn Salute · Synchronized Light Flash!',
  unitsDistanceLabel: 'Speed & Distance',
  unitsTempLabel: 'Temperature',
  unitsAuto: 'Auto',
  unitsMetric: 'km/h · km',
  unitsImperial: 'mph · mi',
  unitsCelsius: '°C',
  unitsFahrenheit: '°F',
  drive: {
    pageTitle: 'Winter World · 3D Holiday Map',
    worldAria: 'Interactive Holiday World',
    cinemaPill: '🎬 Sky Cinema',
    cinemaPillTitle: 'Sky Cinema projection (V)',
    cameraTitle: 'Switch camera (C)',
    camChase: 'FSD View',
    camMap: 'Map View',
    camCinematic: 'Cinematic',
    camMapShort: 'Map',
    camCinematicShort: 'Cinematic',
    followBtn: 'Follow Sleigh',
    soundTitle: 'Sound on/off',
    settingsAria: 'Settings',
    cinemaSoundBtn: '🔊 Sound',
    cinemaNextBtn: 'Next',
    cinemaNextTitle: 'Next clip',
    cinemaCloseAria: 'Close Sky Cinema',
    cinemaSurfaceAria: 'Display surface',
    cinemaModeAria: 'Sky Cinema mode',
    waitingGps: 'Waiting for GPS',
    retryGps: 'Retry GPS',
    timelineKicker: 'Elon Timeline',
    timelineNext: 'Next',
    trialTitle: 'Elevation Trial · Badhausstraße',
    trialPause: 'Pause',
    trialResume: 'Resume',
    trialReplay: 'Replay',
    trialToGps: 'To GPS',
    trialCredit: 'Elevation © JAXA · AW3D30',
    trialMasl: 'elev.',
    trialGrade: 'grade',
    demoTitle: 'Demo Route · Lokevägen',
    speedPrefix: 'Speed',
    dockGift: '🎁 Gift',
    dockSnowball: '❄ Snowball',
    dockSalute: '🎺 Horn',
    dockHoHoHo: '🎅 Ho-Ho',
    dockLights: '✨ Lights',
    dockMagicPrefix: '✨ MAGIC',
    hohoBanner: '🎅 HO! HO! HO! · MERRY CHRISTMAS! ✨',
    magicDialogAria: 'Holiday Magic',
    magicTitle: '✨ Holiday Magic',
    magicTabPowers: '⚡ Power-Ups',
    magicTabWorkshop: '🎁 Workshop',
    magicFoot: 'Earn Magic: ⭐ +25 · 🦌 +20 · 🧝 +15 · 🎁 +10 (Combo up to x4)',
    magicPtsUnit: 'pts',
    drawerTitle: 'Winter World',
    drawerAria: 'Control Panel',
    vehicleLabel: 'Vehicle',
    vehicleSleigh: '🎅 Sleigh',
    vehicleSemi: '🚛 Semi',
    vehicleCybertruck: '📐 Cybertruck',
    vehicleStarman: '🚀 Starman',
    cameraLabel: 'Camera',
    graphicsMoodLabel: 'Graphics & Mood',
    themeClassic: 'Classic',
    themeNordic: 'Nordic',
    themeCyber: 'Cyber 2099',
    skyAuto: 'Auto',
    skyMidnight: 'Midnight',
    skyBlue: 'Dusk',
    skyDay: 'Day',
    calendarLabel: 'Holiday Calendar',
    calAuto: 'Auto (Today)',
    calAdv1: '1st Advent',
    calAdv2: '2nd Advent',
    calAdv3: '3rd Advent',
    calAdv4: '4th Advent',
    calLucia: 'Dec 13 · Lucia',
    calXmasEve: 'Dec 24 · Xmas Eve',
    fsdPathChip: '❄ FSD Holiday Path',
    trafficChip: '🚛 Holiday & Tesla Traffic',
    frostChip: '🌨 Screen Frost',
    elevationChip: '⛰ Real Elevation',
    audioLabel: 'Audio & Cabin Sound',
    mixFull: 'Full',
    mixSfx: 'SFX Only',
    mixMuted: 'Muted',
    volLabel: 'Volume',
    routeDirect: 'Direct',
    routeMedia: 'Media Player',
    micBtn: '🎙 Cabin Mic',
    micOnBtn: '🎙 Mic ON',
    micDeniedBtn: '🎙 Denied',
    soundTestChip: '🔊 Sound Check',
    magicEventsLabel: 'Holiday Magic & Events',
    eventCyberplow: 'Cybertruck Plow',
    eventConvoy: 'Holiday Convoy',
    eventTunnel: 'Boring Tunnel',
    eventCinema: '🎬 Sky Cinema',
    eventGigaCinema: '🏢 Giga Cinema',
    surfaceLabel: 'Projection Surface',
    cinemaModeLabel: 'Sky Cinema Mode',
    cinemaAutoLabel: 'Auto Sky Cinema',
    cinemaIntervalToast: 'Auto Sky Cinema',
    cinemaExpandTitle: 'Show or hide projection options',
    demoChangeRouteBtn: 'Route',
    demoModalTitle: 'Choose Demo Route (A → B)',
    demoTabPresets: 'Famous Routes',
    demoTabAddress: 'Addresses (A → B)',
    demoTabMap: 'Pick on Map',
    demoAddrHint: 'Enter any start and destination address anywhere in the world.',
    demoAddrFromLabel: 'Start Address (A)',
    demoAddrToLabel: 'Destination (B)',
    demoAddrFromPlaceholder: 'e.g. Golden Gate Bridge, San Francisco',
    demoAddrToPlaceholder: 'e.g. Sausalito, CA',
    demoStartRouteBtn: 'Start Demo Route',
    demoRouteLoading: 'Fetching driving route',
    demoRouteGeocoding: 'Looking up addresses',
    demoRouteNeedBothAddr: 'Please enter both a start and destination address.',
    demoRouteNotFound: 'Could not find one or both addresses.',
    demoRouteCustomMapName: 'Custom Map Route (A → B)',
    demoMapPickA: 'Click on the map to set start point A',
    demoMapPickB: 'Click on the map to set destination B',
    demoMapClearBtn: 'Clear',
    autoMagicChip: '✨ Automatic Magic',
    timelineChip: '📜 Elon Timeline',
    langUnitsLabel: 'Language & Units',
    testMoreLabel: 'Test & More',
    testDemoBtn: '🧪 Test Demo Route',
    testTerrainBtn: '⛰ Elevation Trial',
    classicModesLink: 'Classic Modes →',
    streetYourPos: 'Your location',
    streetFetching: 'Loading surroundings',
    powerUnlockedToast: 'unlocked & active!',
    powerActiveToast: 'activated!',
    needMagicToast: 'Need',
    trailLabel: 'Magic Trail',
    megaSnowballState: 'Mega Snowball',
    sleighStyleLabel: 'Sleigh',
    owlLabel: 'Companion Owl',
    cinemaStartedToast: 'Sky Cinema',
    cinemaStoppedToast: 'Sky Cinema fading out',
    cinemaSurfaceToast: 'Display surface',
    gigaActiveToast: 'Gigafactory Facade Cinema active',
    cinemaModeToast: 'Sky Cinema mode',
    convoyStartedToast: 'Coca-Cola & Tesla Holiday Convoy!',
    lightShowToast: 'Tesla Holiday Light Show!',
    hohoToast: 'HO! HO! HO! · MERRY CHRISTMAS!',
    wishStarEarnedToast: 'Holiday Magic',
    wishStarShortToast: 'Wishing Star!',
    rudolfShort: 'Rudolph!',
    reindeerShort: 'Reindeer!',
    elfShort: 'Holiday Elf!',
    giftSingle: 'gift',
    giftPlural: 'gifts',
    giftDeliveredSingle: 'gift delivered',
    giftDeliveredPlural: 'gifts delivered',
    snowballMegaHit: 'Mega Snowball volley landed!',
    snowballHit: 'Snowball hit!',
    churchBellNamed: 'Church bells',
    churchBellAnon: 'Holiday bells chiming!',
    noSuperchargerToast: 'No mapped Tesla Supercharger nearby',
    magicFullToast: 'MAGIC FULL! GRAND FIREWORKS!',
    onState: 'On ✓',
    offState: 'Off',
  },
};

const DICTS: Record<Locale, TranslationDict> = { sv: SV, en: EN };

class I18nStore {
  private locale: Locale = 'sv';
  private listeners = new Set<(locale: Locale) => void>();

  constructor() {
    try {
      const saved = localStorage.getItem('tesla-xmas-locale');
      if (saved === 'sv' || saved === 'en') {
        this.locale = saved;
      } else if (typeof navigator !== 'undefined' && !navigator.language.toLowerCase().startsWith('sv')) {
        this.locale = 'en';
      }
    } catch {
      if (typeof navigator !== 'undefined' && !navigator.language.toLowerCase().startsWith('sv')) {
        this.locale = 'en';
      }
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.locale;
    }
  }

  getLocale(): Locale {
    return this.locale;
  }

  setLocale(locale: Locale): void {
    if (this.locale === locale) return;
    this.locale = locale;
    try {
      localStorage.setItem('tesla-xmas-locale', locale);
    } catch {
      // Ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
    for (const cb of this.listeners) cb(locale);
  }

  t(): TranslationDict {
    return DICTS[this.locale];
  }

  onChange(cb: (locale: Locale) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
}

export const i18n = new I18nStore();
