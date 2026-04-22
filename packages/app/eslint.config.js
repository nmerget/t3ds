import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['.intlayer/', '.output/', '.tanstack/']),
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslintPluginBetterTailwindcss.configs.recommended],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      '@typescript-eslint': typescriptPlugin,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/index.css',
        detectComponentClasses: true,
      },
      react: {
        version: 'detect',
      },
    },
  },
]);
