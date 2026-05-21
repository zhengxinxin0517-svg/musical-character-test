export const dimensionKeys = [
  'ambition',
  'justice',
  'order',
  'performance',
  'survival',
  'romance',
  'control',
  'sensitivity',
  'resentmentMemory',
  'socialPolish',
  'responsibility',
  'absurdResilience',
  'observation',
  'selfPackaging',
  'empathy'
] as const;

export type DimensionKey = (typeof dimensionKeys)[number];

export type UserScores = Record<DimensionKey, number>;

export type ScoreVector = Partial<UserScores>;

export type PersonaScoreVector = Record<string, number>;

export type Persona = {
  id: string;
  name: string;
  englishName: string;
  code: string;
  source: string;
  imagePath: string;
  posterPath?: string;
  stillPath?: string;
  showStillPath?: string;
  posterTitle?: string;
  posterTitleCn?: string;
  stillTitle?: string;
  stillTitleCn?: string;
  stillAnalysis?: string;
  momentMediaPath?: string;
  momentEmbedUrl?: string;
  momentMediaAlt?: string;
  title: string;
  characterQuote: string;
  punchline: string;
  characterMoment: string;
  arc: string;
  modernLife: string;
  strengths: string[];
  pitfalls: string[];
  recommendation: string;
  shareText: string;
  accent: string;
  vector: ScoreVector;
};

export type QuizOption = {
  id: string;
  text: string;
  weights: ScoreVector;
  personaScores?: PersonaScoreVector;
};

export type Question = {
  id: number;
  prompt: string;
  sourceNote?: string;
  options: QuizOption[];
};

export type Trait = {
  key: DimensionKey;
  label: string;
  value: number;
};

export type PersonaMatch = {
  persona: Persona;
  similarity: number;
  percentage: number;
};

export type QuizResult = {
  primary: PersonaMatch;
  secondary: PersonaMatch;
  topTraits: Trait[];
  weakTrait: Trait;
};
