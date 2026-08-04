import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginBoundaries from 'eslint-plugin-boundaries';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      boundaries: eslintPluginBoundaries,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='catch'][arguments.length=0]",
          message: 'Empty catch blocks are not allowed.',
        },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'apps', allow: ['core', 'shared', 'llm', 'evidence', 'sources', 'pdf', 'db'] },
            { from: 'core', allow: ['shared', 'db', 'llm', 'evidence', 'sources', 'pdf'] },
            { from: 'sources', allow: ['shared', 'db', 'llm', 'evidence'] },
            { from: 'pdf', allow: ['shared', 'db', 'llm', 'evidence'] },
            { from: 'db', allow: ['shared'] },
            { from: 'llm', allow: ['shared'] },
            { from: 'evidence', allow: ['shared'] },
            { from: 'shared', allow: [] },
          ],
        },
      ],
    },
    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: 'packages/shared/**/*' },
        { type: 'db', pattern: 'packages/db/**/*' },
        { type: 'llm', pattern: 'packages/llm/**/*' },
        { type: 'evidence', pattern: 'packages/evidence/**/*' },
        { type: 'sources', pattern: 'packages/sources/**/*' },
        { type: 'pdf', pattern: 'packages/pdf/**/*' },
        { type: 'core', pattern: 'packages/core/**/*' },
        { type: 'apps', pattern: 'apps/**/*' },
      ],
    },
  }
);
