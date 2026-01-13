module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended'
    ],
    overrides: [
        {
            env: { node: true },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: { sourceType: 'script' }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'unused-imports',
        'import'
    ],
    rules: {
        indent: [2, 4],
        '@typescript-eslint/indent': ['error', 4],
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'max-len': [
            'error',
            {
                ignoreComments: true,
                code: 140
            }
        ],
        'react/prop-types': 'off',
        'react/button-has-type': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',

        'react/display-name': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'n/no-callback-literal': 'off',
        'react/jsx-max-props-per-line': [2, { maximum: 1 }],
        'object-curly-newline': ['error', {
            ObjectExpression: {
                multiline: true,
                minProperties: 3
            },
            ObjectPattern: {
                multiline: true,
                minProperties: 3
            },
            ImportDeclaration: {
                multiline: true,
                minProperties: 4
            },
            ExportDeclaration: {
                multiline: true,
                minProperties: 3
            }
        }],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_'
            }
        ],
        'sort-imports': [
            'error',
            {
                ignoreCase: true,
                ignoreDeclarationSort: true
            }
        ],
        'import/order': [
            'error',
            {
                groups: [
                    ['builtin', 'external'],
                    ['internal', 'sibling', 'parent', 'index'],
                    'unknown'
                ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'builtin',
                        position: 'before'
                    },
                    {
                        pattern: 'app/**', group: 'internal', position: 'before'
                    },
                    {
                        pattern: 'pages/**', group: 'internal', position: 'before'
                    },
                    {
                        pattern: 'modules/**', group: 'internal', position: 'before'
                    },
                    {
                        pattern: 'components/**', group: 'internal', position: 'before'
                    },
                    {
                        pattern: 'ui/**', group: 'internal', position: 'before'
                    },
                    {
                        pattern: 'core/**', group: 'internal', position: 'before'
                    },
                    {
                        pattern: './**.module.*',
                        group: 'unknown',
                        position: 'after'
                    }
                ],
                pathGroupsExcludedImportTypes: ['internal'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ]
    },

    ignorePatterns: ['global.d.ts'],
    globals: {
        __REACT_APP_API_ADDRESS__: true,
        __IS_DEV__: true
    }
}
