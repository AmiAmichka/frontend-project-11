import js from '@eslint/js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  globalIgnores(['./dist/*']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      '@stylistic': stylistic,
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
])
