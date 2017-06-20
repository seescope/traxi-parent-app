module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  plugins: ['react', 'react-native', 'jest', 'prettier', 'flowtype'],
  extends: ['airbnb', 'prettier', 'plugin:jest/recommended'],
  env: {
    es6: true,
    'jest/globals': true
  },
  rules: {
    quotes: ['error', 'single'],
    strict: 0,
    'comma-dangle': ['error', 'always-multiline'],
    'global-require': 0,
    'no-confusing-arrow': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'import/no-unresolved': 1,
    'react/jsx-indent': 1,
    'jest/no-focused-tests': 2,
    'jest/no-identical-title': 2
  },
  globals: {
    __DEV__: true
  }
};
