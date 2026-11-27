export type SkyCinemaContext = 'manual' | 'stopped' | 'space' | 'giga' | 'cruise';

export interface SkyCinemaClip {
  id: string;
  title: string;
  titleSv?: string;
  source: string;
  sourceId: string;
  year: string;
  durationSec: number;
  file: string;
  category: string;
  tags: string[];
  score: number;
}

export const SKY_CINEMA_TEST_CLIPS: readonly SkyCinemaClip[] = [
  {
    id: 'elon-004',
    title: 'Ask what would make the future inspiring',
    titleSv: 'Fråga vad som skulle göra framtiden inspirerande',
    source: 'TED',
    sourceId: 'ted2013-ted',
    year: '2013',
    durationSec: 9.8,
    file: 'elon-004-ask-what-would-make-the-future-inspiring.mp4',
    category: 'purpose_and_impact',
    tags: ['purpose', 'future'],
    score: 4,
  },
  {
    id: 'elon-013',
    title: 'A spacefaring future takes deliberate effort',
    titleSv: 'En rymdfarande framtid kräver målmedveten ansträngning',
    source: 'TED',
    sourceId: 'ted2017-future',
    year: '2017',
    durationSec: 19.0,
    file: 'elon-013-a-spacefaring-future-takes-deliberate-effort.mp4',
    category: 'optimism_and_vision',
    tags: ['space', 'agency'],
    score: 4,
  },
  {
    id: 'elon-023',
    title: 'Consciousness as a small candle in a vast darkness',
    titleSv: 'Medvetandet som ett litet ljus i ett vidsträckt mörker',
    source: 'TED',
    sourceId: 'ted2022-ted',
    year: '2022',
    durationSec: 23.6,
    file: 'elon-023-consciousness-as-a-small-candle-in-a-vast-darkness.mp4',
    category: 'perspective_and_humanity',
    tags: ['curiosity', 'long-term-thinking'],
    score: 4,
  },
  {
    id: 'elon-028',
    title: 'Work for the future that excites you',
    titleSv: 'Arbeta för en framtid som gör dig entusiastisk',
    source: 'TED',
    sourceId: 'ted2022-ted',
    year: '2022',
    durationSec: 9.5,
    file: 'elon-028-work-for-the-future-that-excites-you.mp4',
    category: 'optimism_and_vision',
    tags: ['agency', 'optimism'],
    score: 5,
  },
  {
    id: 'pilot-02',
    title: 'Look forward to the future',
    titleSv: 'Se fram emot framtiden',
    source: 'TED',
    sourceId: 'ted2022-ted',
    year: '2022',
    durationSec: 11.4,
    file: 'pilot-02-look-forward-to-the-future.mp4',
    category: 'optimism_and_vision',
    tags: ['optimism', 'future'],
    score: 5,
  },
];

export function resolveSkyCinemaUrl(file: string): string {
  return new URL(`elonverse/${file}`, document.baseURI).href;
}

const HISTORY_STORAGE_KEY = 'tesla-xmas-cinema-history-v1';
const MAX_HISTORY_IDS = 120;

let cachedLibrary: readonly SkyCinemaClip[] = SKY_CINEMA_TEST_CLIPS;
let loadPromise: Promise<readonly SkyCinemaClip[]> | null = null;
const recentSources: string[] = [];

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function saveHistory(ids: string[]): void {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(ids.slice(-MAX_HISTORY_IDS)));
  } catch {
    // Ignore storage errors
  }
}

export function loadSkyCinemaLibrary(): Promise<readonly SkyCinemaClip[]> {
  if (loadPromise) return loadPromise;
  loadPromise = fetch(resolveSkyCinemaUrl('manifest.json'))
    .then(async res => {
      if (!res.ok) throw new Error('manifest fetch failed');
      const raw = await res.json();
      if (!Array.isArray(raw) || raw.length === 0) throw new Error('empty manifest');
      const valid = raw.filter(
        (c): c is SkyCinemaClip =>
          Boolean(c && typeof c.id === 'string' && typeof c.file === 'string' && typeof c.title === 'string')
      );
      if (valid.length > 0) {
        cachedLibrary = valid;
      }
      return cachedLibrary;
    })
    .catch(() => cachedLibrary);
  return loadPromise;
}

export function getSkyCinemaLibrary(): readonly SkyCinemaClip[] {
  return cachedLibrary;
}

export function recordSkyCinemaPlayed(clip: SkyCinemaClip): void {
  const hist = loadHistory().filter(id => id !== clip.id);
  hist.push(clip.id);
  saveHistory(hist);

  if (clip.sourceId) {
    const idx = recentSources.indexOf(clip.sourceId);
    if (idx !== -1) recentSources.splice(idx, 1);
    recentSources.push(clip.sourceId);
    if (recentSources.length > 3) recentSources.shift();
  }
}

const STOPPED_CATS = new Set(['optimism_and_vision', 'courage_and_risk', 'purpose_and_impact', 'personal_growth']);
const SPACE_CATS = new Set(['optimism_and_vision', 'perspective_and_humanity']);
const SPACE_TAGS = new Set(['space', 'future', 'imagination']);
const GIGA_CATS = new Set(['innovation_and_problem_solving', 'work_and_discipline', 'leadership_and_teamwork']);
const GIGA_TAGS = new Set(['engineering', 'product-design', 'entrepreneurship', 'first-principles']);
const CRUISE_CATS = new Set([
  'optimism_and_vision',
  'purpose_and_impact',
  'perspective_and_humanity',
  'resilience',
  'learning_and_curiosity',
]);

export function pickNextSkyCinemaClip(
  context: SkyCinemaContext,
  excludeId?: string
): { clip: SkyCinemaClip; index: number; total: number } {
  const lib = cachedLibrary.length > 0 ? cachedLibrary : SKY_CINEMA_TEST_CLIPS;
  const total = lib.length;
  const history = new Set(loadHistory());

  let candidates = lib
    .map((clip, index) => ({ clip, index }))
    .filter(item => item.clip.id !== excludeId && !history.has(item.clip.id));

  if (candidates.length < 10 && lib.length > 12) {
    saveHistory(excludeId ? [excludeId] : []);
    candidates = lib.map((clip, index) => ({ clip, index })).filter(item => item.clip.id !== excludeId);
  }
  if (candidates.length === 0) {
    candidates = lib.map((clip, index) => ({ clip, index }));
  }

  const weights = candidates.map(item => {
    const c = item.clip;
    const dur = Number.isFinite(c.durationSec) ? c.durationSec : 14;
    const tags = Array.isArray(c.tags) ? c.tags : [];
    let w = 1.0;

    // Soft preference for score-5 highlights without locking out the 210 score-4 clips
    if (c.score >= 5) {
      w *= context === 'manual' ? 1.8 : 2.2;
    }

    // Strongly discourage repeating the same interview source back-to-back
    if (c.sourceId && recentSources.includes(c.sourceId)) {
      w *= 0.15;
    }

    // Favor fuller, substantive clips (12–32s) and down-weight very brief <10s snippets
    if (context === 'stopped') {
      if (dur < 8) w *= 0.25;
      else if (dur < 12) w *= 0.7;
      else if (dur <= 24) w *= 1.6;
      else w *= 1.25;
    } else {
      if (dur < 8) w *= 0.2;
      else if (dur < 12) w *= 0.6;
      else if (dur < 18) w *= 1.35;
      else w *= 2.2;
    }

    // Context thematic relevance
    if (context === 'stopped') {
      if (STOPPED_CATS.has(c.category)) w *= 2.0;
    } else if (context === 'space') {
      if (SPACE_CATS.has(c.category)) w *= 2.4;
      if (tags.some(t => SPACE_TAGS.has(t))) w *= 2.2;
    } else if (context === 'giga') {
      if (GIGA_CATS.has(c.category)) w *= 2.4;
      if (tags.some(t => GIGA_TAGS.has(t))) w *= 1.8;
    } else if (context === 'cruise') {
      if (CRUISE_CATS.has(c.category)) w *= 1.6;
    }

    return w;
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let chosen = candidates[0];
  if (totalWeight > 0) {
    let r = Math.random() * totalWeight;
    for (let i = 0; i < candidates.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        chosen = candidates[i];
        break;
      }
    }
  } else {
    chosen = candidates[Math.floor(Math.random() * candidates.length)];
  }

  recordSkyCinemaPlayed(chosen.clip);
  return { clip: chosen.clip, index: chosen.index, total };
}
