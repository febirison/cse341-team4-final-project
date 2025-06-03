import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  js.configs.recommended,
  prettierRecommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'prettier/prettier': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'prefer-arrow-callback': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',
      'no-console': 'off',
      'no-return-await': 'error',
      'require-await': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'cjs-import',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: 'cjs-import',
          next: 'cjs-import',
        },
      ],
    },
  },
];
