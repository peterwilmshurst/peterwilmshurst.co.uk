const js = require('@eslint/js')
const tseslint = require('typescript-eslint')
const vuePlugin = require('eslint-plugin-vue')
const vueParser = require('vue-eslint-parser')
const stylistic = require('@stylistic/eslint-plugin')

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', '.eslintrc.cjs'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vuePlugin.configs['flat/recommended'],
  stylistic.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        MouseEvent: 'readonly',
        SVGElement: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{js,mjs,jsx,ts,tsx,mts}'],
    languageOptions: {
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        MouseEvent: 'readonly',
        SVGElement: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{cjs,cts}'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    files: ['postcss.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
      },
    },
  },
  {
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
]
