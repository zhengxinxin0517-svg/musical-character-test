# Musical Persona Test Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first pure frontend musical-theatre persona quiz with 20 scenario questions, 15 outcomes, and deterministic vector matching.

**Architecture:** Use a React single-page app. Keep content in data modules, scoring in a pure logic module, and UI components focused on quiz flow, progress, option selection, and result rendering.

**Tech Stack:** React, TypeScript, Vite, Vitest, CSS.

---

### Task 1: Scoring Contract

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/logic/scoring.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, it } from 'vitest';
import { calculateResult, createEmptyScores, normalizeScore } from './scoring';
import type { Persona, UserScores } from '../types';

const personas: Persona[] = [
  {
    id: 'hamilton',
    name: '汉密尔顿型',
    code: 'sir',
    source: 'Hamilton',
    vector: { ambition: 10, performance: 8, responsibility: 7 },
    title: '',
    punchline: '',
    arc: '',
    modernLife: '',
    strengths: [],
    pitfalls: [],
    recommendation: '',
    shareText: '',
    accent: '#d7a84f'
  },
  {
    id: 'plant',
    name: '彩蛋人格：角落植物观察员',
    code: 'nobody',
    source: '剧场彩蛋',
    vector: { observation: 10, empathy: 8, survival: 7, performance: -3 },
    title: '',
    punchline: '',
    arc: '',
    modernLife: '',
    strengths: [],
    pitfalls: [],
    recommendation: '',
    shareText: '',
    accent: '#7ab88a'
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
    expect(result.secondary.persona.id).toBe('plant');
    expect(result.topTraits.map((trait) => trait.key)).toEqual(['ambition', 'performance', 'responsibility']);
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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/logic/scoring.test.ts`
Expected: FAIL because `src/logic/scoring.ts` and `src/types.ts` do not exist yet.

### Task 2: Data and Scoring

**Files:**
- Create: `src/types.ts`
- Create: `src/logic/scoring.ts`
- Create: `src/data/personas.ts`
- Create: `src/data/questions.ts`

- [ ] **Step 1: Implement typed dimensions, pure scoring, 15 personas, and 20 scenario questions**
- [ ] **Step 2: Run `npm test -- src/logic/scoring.test.ts`**
Expected: PASS.

### Task 3: Mobile UI

**Files:**
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Build Home, Quiz, Result, and retake flow**
- [ ] **Step 2: Keep layout mobile-first with stable card positions, clear progress, tappable options, and result poster**
- [ ] **Step 3: Run `npm run build`**
Expected: PASS.

### Task 4: Local Preview

**Files:**
- No new files.

- [ ] **Step 1: Start Vite dev server**
Run: `npm run dev -- --host 127.0.0.1`
Expected: local URL appears.

- [ ] **Step 2: Provide the URL to the user**
