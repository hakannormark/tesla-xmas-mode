export interface SkyCinemaClip {
  id: string;
  title: string;
  titleSv: string;
  source: string;
  year: string;
  durationSec: number;
  file: string;
  tags: string[];
}

export const SKY_CINEMA_TEST_CLIPS: readonly SkyCinemaClip[] = [
  {
    id: 'elon-004',
    title: 'Ask what would make the future inspiring',
    titleSv: 'Fråga vad som skulle göra framtiden inspirerande',
    source: 'TED',
    year: '2013',
    durationSec: 9,
    file: 'elon-004-ask-what-would-make-the-future-inspiring.mp4',
    tags: ['purpose', 'future'],
  },
  {
    id: 'elon-013',
    title: 'A spacefaring future takes deliberate effort',
    titleSv: 'En rymdfarande framtid kräver målmedveten ansträngning',
    source: 'TED',
    year: '2017',
    durationSec: 19,
    file: 'elon-013-a-spacefaring-future-takes-deliberate-effort.mp4',
    tags: ['space', 'agency'],
  },
  {
    id: 'elon-023',
    title: 'Consciousness as a small candle in a vast darkness',
    titleSv: 'Medvetandet som ett litet ljus i ett vidsträckt mörker',
    source: 'TED · Texas Gigafactory',
    year: '2022',
    durationSec: 24,
    file: 'elon-023-consciousness-as-a-small-candle-in-a-vast-darkness.mp4',
    tags: ['curiosity', 'long-term-thinking'],
  },
  {
    id: 'elon-028',
    title: 'Work for the future that excites you',
    titleSv: 'Arbeta för en framtid som gör dig entusiastisk',
    source: 'TED2022 Live',
    year: '2022',
    durationSec: 9,
    file: 'elon-028-work-for-the-future-that-excites-you.mp4',
    tags: ['agency', 'optimism'],
  },
  {
    id: 'pilot-02',
    title: 'Look forward to the future',
    titleSv: 'Se fram emot framtiden',
    source: 'TED · Texas Gigafactory',
    year: '2022',
    durationSec: 11,
    file: 'pilot-02-look-forward-to-the-future.mp4',
    tags: ['optimism', 'future'],
  },
];

export function resolveSkyCinemaUrl(file: string): string {
  return new URL(`elonverse/${file}`, document.baseURI).href;
}
