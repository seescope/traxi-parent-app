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

const IPHONE_INSTRUCTIONS = [
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

const iPadInstructions = (step, kidName, setupID) => {
  const instructions = [
    '',
    `Browse to traxiapp.firebaseapp.com on ${kidName}'s iPad`,
    `Enter the 4-digit code ${setupID}`,
    `Tap the "Install" button in the top right`,
    `Tap the "Install" button again (don't worry, this is normal)`,
    `Tap "Install" for the last time (promise)`,
    `Tap "Done"`,
    '',
    '',
  ];

  return instructions[step];
};

const ANDROID_INSTRUCTIONS = [
  '',
  '',
  '',
  `Swipe from the top and tap on "Download complete"`,
  `Tap "Settings" (don't worry, this is normal)`,
  `Tap "Unknown Sources", then tap "OK"`,
  `Tap "Install" in the bottom right`,
  `Tap "Open" in the bottom right`,
  '',
  '',
];

const IPHONE_IMAGES = [
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
  if (deviceType !== 'iPad' && step === 1) {
    return `Open the SMS on ${kidName}'s phone and tap the link`;
  }

  switch (deviceType) {
    case 'iPhone':
      return IPHONE_INSTRUCTIONS[step];
    case 'Android':
      return ANDROID_INSTRUCTIONS[step];
    case 'iPad':
      return iPadInstructions(step, kidName, setupID);
    default:
      return 'Sorry, that device is not supported.';
  }
};

// ReactNative forces us to be explicit about image locations.
const imagePath = (step, deviceType) => {
  if (step === 1 && deviceType === 'unknown') {
    return {};
  }

  switch (deviceType) {
    case 'iPhone':
      return IPHONE_IMAGES[step];
    case 'Android':
      return ANDROID_IMAGES[step];
    case 'iPad':
      return IPHONE_IMAGES[step];
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
