module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'import',
    'prettier',
    'sort-exports',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'react/display-name': 'off',
    'sort-imports': ['error', {ignoreCase: true, ignoreDeclarationSort: true}],
    'sort-exports/sort-exports': ['error', {sortDir: 'asc'}],
    'import/order': [
      'error',
      {
        groups: [['external', 'builtin'], 'internal', ['sibling']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/components/*',
            group: 'internal',
          },
          {
            pattern: '@/store/*',
            group: 'internal',
          },
          {
            pattern: '@/api/*',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
