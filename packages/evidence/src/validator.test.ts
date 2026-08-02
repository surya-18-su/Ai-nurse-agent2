import { describe, it, expect } from 'vitest';
import { EvidenceValidator } from './validator.js';
import { Evidence, GeneratedOutputUnit } from './schema.js';

describe('EvidenceValidator', () => {
  const store = new Map<string, Evidence>();

  store.set('ev1', {
    id: 'ev1',
    kind: 'achievement',
    text: 'Increased revenue by 20% over 6 months by optimizing the database.',
    sourceFile: 'cv.md',
    sourceLine: 10,
    attributes: {},
    verified: true,
  });

  store.set('ev2', {
    id: 'ev2',
    kind: 'role',
    text: 'Contributed to the frontend React codebase.',
    sourceFile: 'cv.md',
    sourceLine: 12,
    attributes: { skills: ['React'] },
    verified: true,
  });

  const validator = new EvidenceValidator(store);

  it('accepts valid verbatim evidence', () => {
    const unit: GeneratedOutputUnit = {
      text: 'Increased revenue by 20% over 6 months.',
      evidenceIds: ['ev1'],
      transformation: 'rephrase',
    };
    const result = validator.validate([unit]);
    expect(result.success).toBe(true);
  });

  it('rejects if evidence ID is missing', () => {
    const unit: GeneratedOutputUnit = {
      text: 'Some output',
      evidenceIds: [],
      transformation: 'rephrase',
    };
    const result = validator.validate([unit]);
    expect(result.success).toBe(false);
    if (!result.success && result.error.length > 0) {
      expect(result.error[0]?.reason).toContain('Missing');
    }
  });

  it('rejects if evidence ID is not in store', () => {
    const unit: GeneratedOutputUnit = {
      text: 'Some output',
      evidenceIds: ['fake_id'],
      transformation: 'rephrase',
    };
    const result = validator.validate([unit]);
    expect(result.success).toBe(false);
    if (!result.success && result.error.length > 0) {
      expect(result.error[0]?.reason).toContain('not found in store');
    }
  });

  it('rejects hallucinated numbers', () => {
    const unit: GeneratedOutputUnit = {
      text: 'Increased revenue by 50% over 6 months.',
      evidenceIds: ['ev1'],
      transformation: 'rephrase',
    };
    const result = validator.validate([unit]);
    expect(result.success).toBe(false);
    if (!result.success && result.error.length > 0) {
      expect(result.error[0]?.reason).toContain('Number 50 not found');
    }
  });

  it('warns on seniority escalation', () => {
    const unit: GeneratedOutputUnit = {
      text: 'Led the frontend React codebase architecture.',
      evidenceIds: ['ev2'],
      transformation: 'rephrase',
    };

    const result = validator.validate([unit]);
    expect(result.success).toBe(true);
  });
});
