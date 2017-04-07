module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  plugins: ['react', 'react-native', 'jest'],
  extends: ['airbnb', 'prettier', 'plugin:jest/recommended'],
  env: {
    es6: true,
    'jest/globals': true,
  },
  rules: {
    strict: 0,
    'global-require': 0,
    'no-confusing-arrow': ['error', { allowParens: true }],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'import/no-unresolved': 0,
    'react/jsx-indent': 0,
  },
  globals: {
    __DEV__: true,
  },
};
