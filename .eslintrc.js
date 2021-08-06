module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort', 'unused-imports', 'prettier', 'react'],
    extends: [
        'prettier',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'prettier/prettier': 2,
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/array-type": ["error", { "default": "array-simple", "readonly": "array-simple" }],
        "@typescript-eslint/lines-between-class-members": "off",
        '@typescript-eslint/no-use-before-define': ['error'],

        'unused-imports/no-unused-imports': 2,
        // 'import/no-cycle': 2,

        'no-console': 1,
        'no-dupe-keys': 1,
        'no-use-before-define': "off",
        'no-restricted-globals': 1,
        'lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
        'padding-line-between-statements': [
            2,
            { blankLine: 'always', prev: 'function', next: '*' },
            { blankLine: 'always', prev: '*', next: 'function' },
            { blankLine: 'always', prev: 'export', next: '*' },
            { blankLine: 'always', prev: '*', next: 'export' },
            { blankLine: 'always', prev: 'multiline-const', next: '*' },
            { blankLine: 'always', prev: '*', next: 'return' },
        ],
        'simple-import-sort/imports': 'error',
        'no-unused-vars': [
            'error',
            {
                args: 'all',
                ignoreRestSiblings: true,
                caughtErrors: 'all',
                varsIgnorePattern: '^ignored|_+$',
                argsIgnorePattern: '^_|props+$',
            },
        ],
    },
};
