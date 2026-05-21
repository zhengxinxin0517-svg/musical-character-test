import { describe, expect, it } from 'vitest';
import { personas } from './personas';
import { questions } from './questions';

describe('quiz content', () => {
  const allCopy = JSON.stringify({ personas, questions });

  it('contains 15 personas with names, teasing codes, and result copy', () => {
    expect(personas).toHaveLength(15);
    for (const persona of personas) {
      expect(persona.name.length).toBeGreaterThan(2);
      expect(persona.code.length).toBeGreaterThan(1);
      expect(persona.title.length).toBeGreaterThan(4);
      expect(persona.punchline.length).toBeGreaterThan(10);
      expect(persona.arc.length).toBeGreaterThan(20);
      expect(persona.modernLife.length).toBeGreaterThan(20);
      expect(persona.englishName.length).toBeGreaterThan(2);
      expect(persona.imagePath).toMatch(/^\/characters\/.+\.(webp|jpg|png)$/);
      expect(persona.characterMoment.length).toBeGreaterThan(95);
      expect(persona.characterMoment.length).toBeLessThan(260);
      expect(persona.strengths.length).toBeGreaterThanOrEqual(3);
      expect(persona.pitfalls.length).toBeGreaterThanOrEqual(2);
      expect(Object.keys(persona.vector).length).toBeGreaterThanOrEqual(4);
    }
  });

  it('contains 19 current-life scenario questions with four persona-mapped options each', () => {
    const personaIds = new Set(personas.map((persona) => persona.id));

    expect(questions).toHaveLength(19);
    for (const question of questions) {
      expect(question.prompt).not.toMatch(/音乐剧|舞台上的舞蹈|诗篇|最终章/);
      expect(question.options).toHaveLength(4);
      for (const option of question.options) {
        expect(option.text.length).toBeGreaterThan(4);
        expect(Object.keys(option.weights).length).toBeGreaterThanOrEqual(2);
        expect(option.personaScores).toBeDefined();
        expect(Object.keys(option.personaScores ?? {})).toHaveLength(1);
        expect(personaIds.has(Object.keys(option.personaScores ?? {})[0])).toBe(true);
      }
    }
  });

  it('does not contain common copy omissions or duplicated punctuation', () => {
    expect(allCopy).not.toMatch(/很你/);
    expect(allCopy).not.toMatch(/的的|了了|，，|。。|：：|？？|！！/);
  });
});
