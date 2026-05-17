import { describe, expect, it } from 'vitest';
import { getFirstUnansweredIndex, hasCompleteAnswers } from './quizFlow';
import type { Question } from '../types';

const questions = [
  { id: 1, prompt: 'q1', options: [] },
  { id: 2, prompt: 'q2', options: [] },
  { id: 3, prompt: 'q3', options: [] }
] satisfies Question[];

describe('quiz flow', () => {
  it('detects the first skipped question instead of treating the result as complete', () => {
    const answers = { 1: 'a', 3: 'b' };

    expect(hasCompleteAnswers(questions, answers)).toBe(false);
    expect(getFirstUnansweredIndex(questions, answers)).toBe(1);
  });

  it('reports completion only when every question id has an answer', () => {
    const answers = { 1: 'a', 2: 'c', 3: 'b' };

    expect(hasCompleteAnswers(questions, answers)).toBe(true);
    expect(getFirstUnansweredIndex(questions, answers)).toBe(-1);
  });
});
