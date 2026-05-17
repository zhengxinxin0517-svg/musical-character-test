import { dimensionKeys, type DimensionKey, type Persona, type QuizResult, type ScoreVector, type Trait, type UserScores } from '../types';

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

export function normalizeScore(similarity: number): number {
  return Math.round(((similarity + 1) / 2) * 100);
}

export function calculateResult(scores: UserScores, personas: Persona[]): QuizResult {
  if (personas.length < 2) {
    throw new Error('At least two personas are required to calculate a result.');
  }

  const matches = personas
    .map((persona) => {
      const similarity = cosineSimilarity(scores, persona.vector);
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
