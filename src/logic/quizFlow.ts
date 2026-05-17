import type { Question } from '../types';

type AnswerMap = Record<number, string>;

export function hasCompleteAnswers(questions: Question[], answers: AnswerMap): boolean {
  return getFirstUnansweredIndex(questions, answers) === -1;
}

export function getFirstUnansweredIndex(questions: Question[], answers: AnswerMap): number {
  return questions.findIndex((question) => !answers[question.id]);
}
