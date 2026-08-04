import { describe, it, expect } from 'vitest';
import {
  generateCanonicalKey,
  isDuplicate,
  jaccardSimilarity,
} from './dedupe.js';

describe('Deduplicator', () => {
  it('generates canonical key correctly', () => {
    expect(generateCanonicalKey('Stripe', 'Software Engineer', 'Remote')).toBe(
      'stripe|software engineer|remote'
    );
  });

  it('identifies duplicates by high jaccard similarity', () => {
    const text1 =
      'We are looking for a senior software engineer with React and Node experience.';
    const text2 =
      'We are looking for a senior software engineer with React and Node experience.';

    expect(isDuplicate(text1, text2)).toBe(true);
  });

  it('rejects different jobs', () => {
    const text1 = 'We need a product manager who understands agile.';
    const text2 = 'Looking for a backend developer proficient in Java.';

    expect(isDuplicate(text1, text2)).toBe(false);
  });

  it('handles empty strings for union check explicitly covering branch', () => {
    expect(jaccardSimilarity('', '')).toBe(1);
    expect(jaccardSimilarity('a', 'a')).toBe(1);
    expect(jaccardSimilarity('a', 'b')).toBe(0);
  });
});
