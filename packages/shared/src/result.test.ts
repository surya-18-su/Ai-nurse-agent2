import { describe, it, expect } from 'vitest';
import { ok, err } from './result.js';

describe('Result', () => {
  it('creates a success result', () => {
    const result = ok(42);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe(42);
    }
  });

  it('creates an error result', () => {
    const result = err(new Error('Test error'));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('Test error');
    }
  });
});
