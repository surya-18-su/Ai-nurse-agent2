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
    },
  },
});
