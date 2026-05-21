import {
  dimensionKeys,
  type DimensionKey,
  type Persona,
  type PersonaScoreVector,
  type QuizResult,
  type ScoreVector,
  type Trait,
  type UserScores
} from '../types';

export const traitLabels: Record<DimensionKey, string> = {
  ambition: '想赢但嘴硬',
  justice: '看不惯就要管',
  order: '精神考勤表',
  performance: '出场意识',
  survival: '先活着再说',
  romance: '相信还能修',
  control: '灯光我来调',
  sensitivity: '标点鉴赏家',
  resentmentMemory: '旧账云备份',
  socialPolish: '体面补光灯',
  responsibility: '我来背锅',
  absurdResilience: '废墟重启力',
  observation: '角落监控感',
  selfPackaging: '人设急救包',
  empathy: '情绪接线员'
};

export function createEmptyScores(): UserScores {
  return dimensionKeys.reduce((scores, key) => {
    scores[key] = 0;
    return scores;
  }, {} as UserScores);
}

export function addWeights(scores: UserScores, weights: ScoreVector): UserScores {
  const next = { ...scores };
  for (const key of dimensionKeys) {
    next[key] += weights[key] ?? 0;
  }
  return next;
}

export function createEmptyPersonaScores(): PersonaScoreVector {
  return {};
}

export function addPersonaScores(scores: PersonaScoreVector, personaScores: PersonaScoreVector = {}): PersonaScoreVector {
  const next = { ...scores };
  for (const [personaId, value] of Object.entries(personaScores)) {
    next[personaId] = (next[personaId] ?? 0) + value;
  }
  return next;
}

export function normalizeScore(similarity: number): number {
  return Math.round(((similarity + 1) / 2) * 100);
}

export function calculateResult(
  scores: UserScores,
  personas: Persona[],
  personaScores: PersonaScoreVector = {}
): QuizResult {
  if (personas.length < 2) {
    throw new Error('At least two personas are required to calculate a result.');
  }

  const matches = personas
    .map((persona) => {
      const similarity = calculatePersonaMatch(scores, persona.vector, persona.id, personaScores);
      return {
        persona,
        similarity,
        percentage: normalizeScore(similarity)
      };
    })
    .sort((a, b) => b.similarity - a.similarity);

  return {
    primary: matches[0],
    secondary: matches[1],
    topTraits: getTopTraits(scores),
    weakTrait: getWeakTrait(scores)
  };
}

export function getTopTraits(scores: UserScores): Trait[] {
  return dimensionKeys
    .map((key) => ({ key, label: traitLabels[key], value: scores[key] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);
}

function getWeakTrait(scores: UserScores): Trait {
  return dimensionKeys
    .map((key) => ({ key, label: traitLabels[key], value: scores[key] }))
    .sort((a, b) => a.value - b.value)[0];
}

function calculatePersonaMatch(
  scores: UserScores,
  vector: ScoreVector,
  personaId: string,
  personaScores: PersonaScoreVector
): number {
  const dimensionSimilarity = cosineSimilarity(scores, vector);
  const personaScore = personaScores[personaId] ?? 0;
  const maxPersonaScore = Math.max(...Object.values(personaScores), 0);
  const directSignal = maxPersonaScore > 0 ? personaScore / maxPersonaScore : 0;
  const keySignal = signatureAlignment(scores, vector);
  const directSimilarity = directSignal * 2 - 1;
  const keySimilarity = keySignal * 2 - 1;
  const javertPenalty = personaId === 'javert' && personaScore < 8 ? 0.32 : 0;

  return clampSimilarity(
    directSimilarity * 0.6 +
    dimensionSimilarity * 0.3 +
    keySimilarity * 0.1 -
    javertPenalty
  );
}

function cosineSimilarity(scores: UserScores, vector: ScoreVector): number {
  let dot = 0;
  let scoreMagnitude = 0;
  let personaMagnitude = 0;

  for (const key of dimensionKeys) {
    const scoreValue = scores[key];
    const vectorValue = vector[key] ?? 0;
    dot += scoreValue * vectorValue;
    scoreMagnitude += scoreValue * scoreValue;
    personaMagnitude += vectorValue * vectorValue;
  }

  if (scoreMagnitude === 0 || personaMagnitude === 0) {
    return 0;
  }

  return dot / (Math.sqrt(scoreMagnitude) * Math.sqrt(personaMagnitude));
}

function signatureAlignment(scores: UserScores, vector: ScoreVector): number {
  const userTopKeys = getTopPositiveKeys(scores, 5);
  const personaSignature = getTopPositiveKeys(vector, 5);

  if (userTopKeys.length === 0 || personaSignature.length === 0) {
    return 0.5;
  }

  const overlap = personaSignature.filter((key) => userTopKeys.includes(key)).length;
  return overlap / personaSignature.length;
}

function getTopPositiveKeys(vector: ScoreVector, count: number): DimensionKey[] {
  return dimensionKeys
    .filter((key) => (vector[key] ?? 0) > 0)
    .sort((a, b) => (vector[b] ?? 0) - (vector[a] ?? 0))
    .slice(0, count);
}

function clampSimilarity(value: number): number {
  return Math.max(-1, Math.min(1, value));
}
