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
  osmBiomes: Record<'village' | 'forest' | 'water' | 'highway', string>;
  timelinePrev: string;
  timelineNext: string;
  timelinePassingLabel: string;
  timelineUpcomingLabel: string;
  osmBuildingsLabel: string;
  osmWaterLabel: string;
  osmWildlifeLabel: string;
  osmLiveGpsTag: string;
  osmDemoTourTag: string;
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
  controlsBtn: '⚙ Kontroller',
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
  skyTwilight: 'Skymning',
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
        'Flagship Pixar 3D-vinterväg med snövallar, Coca-Cola & ICA-julkaravaner, OpenStreetMap-kvarter med skogsdjur samt Elon-händelser längs vägen!',
      badge: 'Disney/Pixar All-in-One ★',
      actionLabel: '🌟 Stjärnring & Ljusvåg',
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
      toast: 'Pepparkaks-Supercharger · Optimus-nissen vinkar!',
    },
    cyberplow: {
      label: '🎄 Cybertruck',
      toast: 'Frostig Cybertruck med lysande julgran på flaket',
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
  controlsBtn: '⚙ Controls',
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
  skyTwilight: 'Twilight',
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
        'Flagship Disney/Pixar winter boulevard fusing Coca-Cola & ICA holiday trucks, OSM wildlife towns, and roadside Elon timeline events!',
      badge: 'Disney/Pixar All-in-One ★',
      actionLabel: '🌟 Star Ring & Light Wave',
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
      toast: 'Gingerbread Supercharger · Optimus elf waves hello!',
    },
    cyberplow: {
      label: '🎄 Cybertruck',
      toast: 'Frosted Cybertruck hauling a glowing Christmas tree',
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
      }
    } catch {
      // Ignore storage access errors in restricted browsers
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
