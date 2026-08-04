import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DiskCache } from './cache.js';
import fs from 'node:fs/promises';

describe('DiskCache', () => {
  const testCacheDir = '.test-cache-llm';

  beforeEach(async () => {
    await fs.mkdir(testCacheDir, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(testCacheDir, { recursive: true, force: true });
  });

  it('can set and get values deterministically', async () => {
    const cache = new DiskCache(testCacheDir);
    const key = 'test-key';
    const val = { success: true, count: 42 };

    await cache.set(key, val);
    const retrieved = await cache.get<{ success: boolean; count: number }>(key);

    expect(retrieved).not.toBeNull();
    expect(retrieved?.count).toBe(42);
  });

  it('returns null for cache miss', async () => {
    const cache = new DiskCache(testCacheDir);
    const retrieved = await cache.get('non-existent-key');
    expect(retrieved).toBeNull();
  });
});
