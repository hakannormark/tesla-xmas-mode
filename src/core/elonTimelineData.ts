export type TimelineDioramaKind =
  | 'masterplan'
  | 'roadster_f1'
  | 'models_supercharger'
  | 'falcon_landing'
  | 'boring'
  | 'prod_hell'
  | 'starman'
  | 'funding_420'
  | 'armor_glass'
  | 'dragon_starlink'
  | 'semi_x'
  | 'cyber_starship'
  | 'mechazilla'
  | 'cybercab_mars';

export interface ElonMilestone {
  id: string;
  year: string;
  accentHex: string;
  diorama: TimelineDioramaKind;
  sv: { title: string; text: string };
  en: { title: string; text: string };
}

export const ELON_MILESTONES: ElonMilestone[] = [
  {
    id: 'masterplan',
    year: '2006',
    accentHex: '#ffd166',
    diorama: 'masterplan',
    sv: {
      title: 'The Secret Master Plan',
      text: 'Elon publicerar planen som ingen tror på: bygg en sportbil, använd vinsten till billigare elbilar och ställ om världens energi.',
    },
    en: {
      title: 'The Secret Master Plan',
      text: 'Elon publishes the audacious blueprint: build a sports car, fund an affordable EV lineup, and accelerate sustainable energy.',
    },
  },
  {
    id: 'roadster_f1',
    year: '2008',
    accentHex: '#ff4d5a',
    diorama: 'roadster_f1',
    sv: {
      title: 'Roadster & Falcon 1 i omloppsbana',
      text: 'På julveckan 2008 räddas båda bolagen i elfte timmen — Tesla levererar Roadster och Falcon 1 når rymden på fjärde försöket.',
    },
    en: {
      title: 'Roadster & Falcon 1 Reach Orbit',
      text: 'In late 2008 both companies survive on the brink — Tesla ships the Roadster while Falcon 1 becomes the first private liquid rocket in orbit.',
    },
  },
  {
    id: 'models_sc',
    year: '2012',
    accentHex: '#ff6678',
    diorama: 'models_supercharger',
    sv: {
      title: 'Model S & De Första Superchargers',
      text: 'Model S utses till årets bil och Tesla börjar bygga det globala nätverket av snabbladdare för elbilslångresor.',
    },
    en: {
      title: 'Model S & First Superchargers',
      text: 'Model S redefines electric sedans and Tesla sparks the first Supercharger stations to make long-distance EV road trips effortless.',
    },
  },
  {
    id: 'falcon_landing',
    year: '2015',
    accentHex: '#6edcff',
    diorama: 'falcon_landing',
    sv: {
      title: 'Falcon 9 Landar Historiskt (Dec 2015)',
      text: 'En orbital raket landar stående på Landing Zone 1 precis före jul — rymdresor blir plötsligt återanvändbara.',
    },
    en: {
      title: 'Falcon 9 Historic Landing (Dec 2015)',
      text: 'Days before Christmas, an orbital rocket booster touches down upright at LZ-1, transforming spaceflight forever.',
    },
  },
  {
    id: 'boring',
    year: '2016',
    accentHex: '#ff9266',
    diorama: 'boring',
    sv: {
      title: 'The Boring Company',
      text: '"Trafiken gör mig galen. Jag ska bygga en tunnelborrmaskin och börja gräva." — En julig polkagristunnel tar form!',
    },
    en: {
      title: 'The Boring Company',
      text: '"Traffic is driving me nuts. Am going to build a tunnel boring machine and just start digging." — Candy-cane tunnels begin!',
    },
  },
  {
    id: 'prod_hell',
    year: '2017',
    accentHex: '#ffb85c',
    diorama: 'prod_hell',
    sv: {
      title: 'Model 3 & "Production Hell"',
      text: 'Elon sover på golvet i Fremont-fabriken för att skala upp folk-Teslan från hantverk till massproduktion.',
    },
    en: {
      title: 'Model 3 & "Production Hell"',
      text: 'Sleeping on the Fremont factory floor, the team turns Model 3 from a stressful bottleneck into a global EV phenomenon.',
    },
  },
  {
    id: 'starman',
    year: '2018',
    accentHex: '#ff384c',
    diorama: 'starman',
    sv: {
      title: 'Starman & Falcon Heavy',
      text: 'En körsbärsröd Roadster skjuts upp i solomloppsbana med Starman bakom ratten — med "Don’t Panic!" på skärmen.',
    },
    en: {
      title: 'Starman & Falcon Heavy',
      text: 'A cherry-red Tesla Roadster blasts into heliocentric orbit with Starman at the wheel and "Don’t Panic!" on the dash.',
    },
  },
  {
    id: 'funding_420',
    year: '2018',
    accentHex: '#48e59b',
    diorama: 'funding_420',
    sv: {
      title: 'Tesla Private at $420 — Funding Secured',
      text: 'Tweeten som skakade Wall Street i augusti 2018 ("Am considering taking Tesla private at $420. Funding secured.") — odödlig meme-historia!',
    },
    en: {
      title: 'Tesla Private at $420 — Funding Secured',
      text: 'The unforgettable August 2018 tweet ("Am considering taking Tesla private at $420. Funding secured.") — forever etched in tech folklore.',
    },
  },
  {
    id: 'armor_glass',
    year: '2019',
    accentHex: '#b8cde8',
    diorama: 'armor_glass',
    sv: {
      title: 'Cybertruck & Armor Glass-kraschen',
      text: 'Origami i rostfritt stål rullar in på scenen — och stålkulan spräcker "okrossbara" sidorutan inför miljoner tittare.',
    },
    en: {
      title: 'Cybertruck & The Armor Glass Smash',
      text: 'Faceted stainless origami rolls onstage — and a steel ball shatters the "unbreakable" glass live in front of the world.',
    },
  },
  {
    id: 'dragon_starlink',
    year: '2020',
    accentHex: '#7ed8ff',
    diorama: 'dragon_starlink',
    sv: {
      title: 'Crew Dragon, Starlink & S&P 500',
      text: 'SpaceX flyger astronauter till ISS, Starlink-julbelysning tänds på natthimlen och Tesla gör entré i S&P 500.',
    },
    en: {
      title: 'Crew Dragon, Starlink & S&P 500',
      text: 'SpaceX returns astronauts to orbit, Starlink satellites trace twinkling lines in the sky, and Tesla joins the S&P 500.',
    },
  },
  {
    id: 'semi_x',
    year: '2022',
    accentHex: '#e6223a',
    diorama: 'semi_x',
    sv: {
      title: 'Tesla Semi Leverans & Twitter blir X',
      text: 'Den aerodynamiska el-lastbilen Tesla Semi levereras med 800 km räckvidd — samma år som Twitter blir X.',
    },
    en: {
      title: 'Tesla Semi Delivery & Twitter → X',
      text: 'The bullet-nosed Tesla Semi hits highways hauling 82,000 lbs silently — the same whirlwind year Twitter becomes X.',
    },
  },
  {
    id: 'cyber_starship',
    year: '2023',
    accentHex: '#ffd166',
    diorama: 'cyber_starship',
    sv: {
      title: 'Cybertruck på Vägarna & Starship Lyfter',
      text: 'De första kund-Cybertrucksen rullar ut i trafiken medan världens största raket Starship lyfter från Starbase.',
    },
    en: {
      title: 'Cybertruck Deliveries & Starship Liftoff',
      text: 'Customer Cybertrucks hit public roads while the towering 121-meter Starship blasts off from Starbase Texas.',
    },
  },
  {
    id: 'mechazilla',
    year: '2024',
    accentHex: '#6ec4ff',
    diorama: 'mechazilla',
    sv: {
      title: 'Mechazilla Fångar Super Heavy!',
      text: 'Oktober 2024: Ett 20-våningars raketsteg flyger tillbaka från rymden och fångas mitt i luften av tornets jättelika "chopsticks"!',
    },
    en: {
      title: 'Mechazilla Catches Super Heavy!',
      text: 'October 2024: A 20-story Super Heavy booster plunges back from space and hovers cleanly into the launch tower’s giant chopsticks!',
    },
  },
  {
    id: 'cybercab_mars',
    year: '2025–2026',
    accentHex: '#ff964f',
    diorama: 'cybercab_mars',
    sv: {
      title: 'Optimus Gen 2, Cybercab & Resan mot Mars',
      text: 'Självkörande guldtaxis utan ratt, humanoida Optimus-robotar och Starships nästa språng mot månen och Mars. God Jul!',
    },
    en: {
      title: 'Optimus Gen 2, Cybercab & Road to Mars',
      text: 'Steering-wheel-free golden Cybercabs, helpful Optimus humanoids, and Starship’s leap toward the Moon and Mars. Merry Christmas!',
    },
  },
];
