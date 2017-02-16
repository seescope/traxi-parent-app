/* eslint-disable global-require */ /* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import React, { PropTypes } from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Intercom from 'react-native-intercom';

import Spacing from './Spacing';
import HeaderText from './HeaderText';
import Button from './Button';

const { height, width } = Dimensions.get('window');

const buttonContainer = {
  width: width - 64,
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
};

const IOS_INSTRUCTIONS = [
  '',
  '',
  '',
  '',
  '',
  `Tap the "Install"\n button in the top right`,
  `Tap the "Install"\n button again`,
  `Tap "Done"`,
  '',
  '',
];

const androidInstructions = (step, kidName) => {
  const instructions = [
    '',
    '',
    '',
    '',
    '',
    `Install traxi Child App \n on ${kidName}'s phone`,
    `Open traxi Child App \n on ${kidName}'s phone`,
    'Tap "OK" on the next \n screen.',
  ];

  return instructions[step];
};

const IOS_IMAGES = [
  {},
  {},
  {},
  {},
  {},
  require('../Images/iphone-step-1.png'),
  require('../Images/iphone-step-2.png'),
  require('../Images/iphone-step-3.png'),
  {},
  {},
  {},
];

const ANDROID_IMAGES = [
  {},
  {},
  {},
  {},
  {},
  require('../Images/android-step-1.png'),
  require('../Images/android-step-2.png'),
  require('../Images/android-step-3.png'),
  {},
  {},
  {},
];


const instructionText = (step, kidName, deviceType) => {
  switch (deviceType) {
    case 'unknown':
      return `Go to mytraxi.com on ${kidName}’s device`;
    case 'iPhone':
      return IOS_INSTRUCTIONS[step];
    case 'Android':
      return androidInstructions(step, kidName);
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
      return require('../Images/web-step.png');
  }
};

const INSTRUCTION_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    width,
    height,
    left: -16,
    marginTop: -(height / 2) + 32,
    top: height / 2,
  },
});

const Instructions = ({ step, kidName, nextStep, deviceType, setupID }) => (
  <View style={INSTRUCTION_STYLES.container}>
    <View style={INSTRUCTION_STYLES.container}>
      <HeaderText>{instructionText(step, kidName, deviceType, setupID)}</HeaderText>

      <Spacing height={64} />

      <View style={buttonContainer}>
        <Button onPress={() => Intercom.displayMessageComposer()} primary={false}>I need help</Button>
        <Button onPress={nextStep}>Next step</Button>
      </View>
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
