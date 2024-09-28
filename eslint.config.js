/* eslint-disable @typescript-eslint/no-require-imports */
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const perfectionist = require('eslint-plugin-perfectionist');
const tailwind = require('eslint-plugin-tailwindcss');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslint = require('@eslint/js');

module.exports = tseslint.config(
  {
    processor: angular.processInlineTemplates,

    files: ['**/*.ts', '**/*.js'],
    extends: [
      perfectionist.configs['recommended-line-length'],
      ...tailwind.configs['flat/recommended'],
      eslintPluginPrettierRecommended,
      eslint.configs.recommended,
      ...angular.configs.tsRecommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
    ],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          style: 'camelCase',
          type: 'attribute',
          prefix: 'app',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          style: 'kebab-case',
          type: 'element',
          prefix: 'app',
        },
      ],

      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        { overrides: { constructors: 'no-public' } },
      ],

      'perfectionist/sort-named-imports': 'warn',
      'perfectionist/sort-named-exports': 'warn',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-exports': 'warn',
      'perfectionist/sort-imports': 'warn',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-enums': 'warn',

      'prettier/prettier': 'warn',

      'spaced-comment': ['error', 'always', { exceptions: ['*'] }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-extra-boolean-cast': 'off',
      'prefer-const': 'warn',
      'no-eq-null': 'warn',
      'no-var': 'warn',
      eqeqeq: 'warn',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateAccessibility,
      ...angular.configs.templateRecommended,
      ...tailwind.configs['flat/recommended'],
    ],
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  },
);
