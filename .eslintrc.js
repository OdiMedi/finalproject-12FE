module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    // 'import/no-unresolved': 'off',
    'react/prop-types': 0,
    'no-extra-semi': 'error',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-vars': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }],
    'react/self-closing-comp': [
      'warn',
      {
        component: false,
        html: false,
      },
    ],
    'react/function-component-definition': [
      1,
      { namedComponents: ['arrow-function'] },
    ],
    'no-param-reassign': 'off',
    'react/no-unknown-property': 0,
  },
};
