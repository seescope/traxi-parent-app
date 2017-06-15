'use strict';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  plugins: ['react', 'react-native', 'jest', 'prettier'],
  extends: ['airbnb', 'prettier', 'plugin:jest/recommended'],
  env: {
    es6: true,
    'jest/globals': true,
  },
  rules: {
    quotes: ['error', 'single'],
    strict: OFF,
    'comma-dangle': ['error', 'always-multiline'],
    'global-require': OFF,
    'no-confusing-arrow': OFF,
    'react-native/no-unused-styles': ERROR,
    'react-native/split-platform-components': ERROR,
    'react-native/no-inline-styles': ERROR,
    'react-native/no-color-literals': ERROR,
    'import/no-unresolved': WARNING,
    'react/jsx-indent': WARNING,
    'jest/no-focused-tests': ERROR,
    'jest/no-identical-title': ERROR,
  },
  globals: {
    __DEV__: true,
  },
};
