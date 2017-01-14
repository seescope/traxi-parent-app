/* eslint-disable global-require */
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import React, { PropTypes } from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Spacing from './Spacing';
import HeaderText from './HeaderText';
import Button from './Button';

const { height, width } = Dimensions.get('window');

const IOS_INSTRUCTIONS = [
  '',
  '',
  '',
  `Tap the "Install" button in the top right`,
  `Tap the "Install" button again (don't worry, this is normal)`,
  `Tap "Install" for the last time (promise)`,
  `Tap "Done"`,
  '',
  '',
];

const unknownInstructions = (step, kidName, setupID) => {
  const instructions = [
    '',
    `Browse to gettraxi.com on ${kidName}'s device`,
    `Enter the code ${setupID}`,
    '',
    '',
    '',
    '',
    '',
  ];

  return instructions[step];
};


const androidInstructions = (step, kidName, setupID) => { 
  const instructions = [
    '',
    '',
    '',
    `Tap "Install App"`,
    `Tap "Install"`,
    `Tap "Open"`,
    `Enter the code ${setupID} again`,
    'Tap "OK"',
    '',
  ];

  return instructions[step];
};

const IOS_IMAGES = [
  {},
  {},
  {},
  require('../Images/iphone-step-3.png'),
  require('../Images/iphone-step-4.png'),
  require('../Images/iphone-step-5.png'),
  require('../Images/iphone-step-6.png'),
];

const ANDROID_IMAGES = [
  {},
  {},
  {},
  require('../Images/android-step-3.png'),
  require('../Images/android-step-4.png'),
  require('../Images/android-step-5.png'),
  require('../Images/android-step-6.png'),
  require('../Images/android-step-7.png'),
];


const instructionText = (step, kidName, deviceType, setupID) => {
  switch (deviceType) {
    case 'unknown':
      return unknownInstructions(step, kidName, setupID);
    case 'iPhone':
      return IOS_INSTRUCTIONS[step];
    case 'Android':
      return androidInstructions(step, kidName, setupID);
    case 'iPad':
      return IOS_INSTRUCTIONS[step];
    default:
      return 'Sorry, that device is not supported.';
  }
};

// ReactNative forces us to be explicit about image locations.
const imagePath = (step, deviceType) => {
  switch (deviceType) {
    case 'iPhone':
      return IOS_IMAGES[step];
    case 'Android':
      return ANDROID_IMAGES[step];
    case 'iPad':
      return IOS_IMAGES[step];
    default:
      return {};
  }
};

const INSTRUCTION_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width - 96,
    height,
    marginTop: -(height / 2),
    top: height / 2,
  },
});

const Instructions = ({ step, kidName, nextStep, deviceType, setupID }) => (
  <View style={INSTRUCTION_STYLES.container}>
    <View style={INSTRUCTION_STYLES.container}>
      <HeaderText>{instructionText(step, kidName, deviceType, setupID)}</HeaderText>
      <Spacing height={64} />
      <Button onPress={nextStep}>Next Step</Button>
    </View>
    <View>
      <Animatable.Image
        resizeMode="contain"
        animation="bounceInUp"
        style={INSTRUCTION_STYLES.image}
        source={imagePath(step, deviceType)}
      />
    </View>
  </View>
);

Instructions.propTypes = {
  step: PropTypes.number.isRequired,
  kidName: PropTypes.string.isRequired,
  nextStep: PropTypes.func.isRequired,
  deviceType: PropTypes.string.isRequired,
  setupID: PropTypes.number,
};

export default Instructions;
