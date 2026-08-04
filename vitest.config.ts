import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    alias: {
      '@careerops/shared': '/app/packages/shared/src/index.ts',
      '@careerops/db': '/app/packages/db/src/index.ts',
      '@careerops/llm': '/app/packages/llm/src/index.ts',
      '@careerops/evidence': '/app/packages/evidence/src/index.ts',
      '@careerops/core': '/app/packages/core/src/index.ts',
      '@careerops/sources': '/app/packages/sources/src/index.ts',
      '@careerops/pdf': '/app/packages/pdf/src/index.ts',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'packages/core/src/dedupe.ts',
        'packages/core/src/fraud.ts',
        'packages/core/src/triage.ts',
        'packages/evidence/src/validator.ts',
        'packages/llm/src/cache.ts',
        'packages/shared/src/result.ts',
      ],
      exclude: ['**/*.d.ts', '**/*.test.ts'],
    },
  },
});
