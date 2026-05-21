import { describe, expect, it } from 'vitest';
import { calculateResult, createEmptyScores, normalizeScore } from './scoring';
import type { Persona, UserScores } from '../types';

const personas: Persona[] = [
  {
    id: 'hamilton',
    name: '汉密尔顿型',
    englishName: 'Alexander Hamilton',
    code: 'sir',
    source: 'Hamilton',
    imagePath: '/characters/hamilton.webp',
    title: '',
    characterQuote: '',
    punchline: '',
    characterMoment: '',
    arc: '',
    modernLife: '',
    strengths: [],
    pitfalls: [],
    recommendation: '',
    shareText: '',
    accent: '#d7a84f',
    vector: { ambition: 10, performance: 8, responsibility: 7 }
  },
  {
    id: 'plant',
    name: '彩蛋人格：角落植物观察员',
    englishName: 'The Corner Plant',
    code: 'nobody',
    source: '剧场彩蛋',
    imagePath: '/characters/corner-plant.webp',
    title: '',
    characterQuote: '',
    punchline: '',
    characterMoment: '',
    arc: '',
    modernLife: '',
    strengths: [],
    pitfalls: [],
    recommendation: '',
    shareText: '',
    accent: '#7ab88a',
    vector: { observation: 10, empathy: 8, survival: 7, performance: -3 }
  },
  {
    id: 'javert',
    name: '沙威型',
    englishName: 'Javert',
    code: '按规矩来',
    source: 'Les Miserables',
    imagePath: '/characters/javert.webp',
    title: '',
    characterQuote: '',
    punchline: '',
    characterMoment: '',
    arc: '',
    modernLife: '',
    strengths: [],
    pitfalls: [],
    recommendation: '',
    shareText: '',
    accent: '#87909b',
    vector: { order: 10, control: 8, justice: 7, responsibility: 6, sensitivity: 2 }
  },
  {
    id: 'roxie',
    name: '洛克茜型',
    englishName: 'Roxie Hart',
    code: '热搜小白花',
    source: 'Chicago',
    imagePath: '/characters/roxie.webp',
    title: '',
    characterQuote: '',
    punchline: '',
    characterMoment: '',
    arc: '',
    modernLife: '',
    strengths: [],
    pitfalls: [],
    recommendation: '',
    shareText: '',
    accent: '#e15f63',
    vector: { selfPackaging: 10, performance: 9, socialPolish: 6, ambition: 6, survival: 4 }
  }
];

describe('scoring', () => {
  it('creates a complete zero score object', () => {
    expect(createEmptyScores()).toMatchObject({
      ambition: 0,
      justice: 0,
      order: 0,
      performance: 0,
      survival: 0,
      romance: 0,
      control: 0,
      sensitivity: 0,
      resentmentMemory: 0,
      socialPolish: 0,
      responsibility: 0,
      absurdResilience: 0,
      observation: 0,
      selfPackaging: 0,
      empathy: 0
    });
  });

  it('normalizes cosine similarity into a percentage range', () => {
    expect(normalizeScore(1)).toBe(100);
    expect(normalizeScore(0)).toBe(50);
    expect(normalizeScore(-1)).toBe(0);
  });

  it('matches the highest similarity persona and keeps runner up', () => {
    const scores: UserScores = {
      ...createEmptyScores(),
      ambition: 9,
      performance: 7,
      responsibility: 6
    };

    const result = calculateResult(scores, personas);

    expect(result.primary.persona.id).toBe('hamilton');
    expect(result.secondary.persona.id).not.toBe('hamilton');
    expect(result.topTraits.map((trait) => trait.key)).toEqual([
      'ambition',
      'performance',
      'responsibility'
    ]);
  });

  it('allows easter egg personas through real matching rather than random chance', () => {
    const scores: UserScores = {
      ...createEmptyScores(),
      observation: 10,
      empathy: 8,
      survival: 7,
      performance: -2
    };

    expect(calculateResult(scores, personas).primary.persona.id).toBe('plant');
  });

  it('uses direct option persona scores as the strongest matching signal', () => {
    const scores: UserScores = {
      ...createEmptyScores(),
      selfPackaging: 9,
      performance: 8,
      socialPolish: 5
    };

    expect(calculateResult(scores, personas, { roxie: 12 }).primary.persona.id).toBe('roxie');
  });

  it('keeps Javert from winning on order alone without enough direct Javert answers', () => {
    const scores: UserScores = {
      ...createEmptyScores(),
      order: 10,
      control: 8,
      justice: 7,
      selfPackaging: 7,
      performance: 6
    };

    expect(calculateResult(scores, personas, { roxie: 10, javert: 4 }).primary.persona.id).toBe('roxie');
  });

  it('still allows Javert to win when rule-first answers are repeated', () => {
    const scores: UserScores = {
      ...createEmptyScores(),
      order: 12,
      control: 10,
      justice: 8,
      responsibility: 4
    };

    expect(calculateResult(scores, personas, { javert: 12 }).primary.persona.id).toBe('javert');
  });
});
