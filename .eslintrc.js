module.exports = {
    "parserOptions": {
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
      },
    },
    "extends": "airbnb",
    "plugins": [
        "react",
        "react-native"
    ],
    "env": {
      "es6": true,
      "jest": true,
    },
    "rules": {
      "global-require": 0,
      "no-confusing-arrow": ["error", {"allowParens": true}],
      "react-native/no-unused-styles": 2,
      "react-native/split-platform-components": 2,
      "react-native/no-inline-styles": 2,
      "react-native/no-color-literals": 2,
    },
    "globals": {
      "__DEV__": true,
    },
};
