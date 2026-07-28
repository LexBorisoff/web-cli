import lexjs from '@lexjs/eslint-plugin';
import { useIgnoreFile } from '@lexjs/eslint-plugin/utils';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  useIgnoreFile('.gitignore', import.meta, { gitignoreResolution: true }),
  lexjs.configs.recommended,
  lexjs.configs.typescript,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        projectService: {
          allowDefaultProject: ['*.js'],
        },
      },
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
  },
);
