import React, { PropTypes } from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Intercom from 'react-native-intercom';
import I18n from 'react-native-i18n';

import Spacing from './Spacing';
import HeaderText from './HeaderText';
import Button from './Button';
import { isIOS } from '../Utils';
const { height, width } = Dimensions.get('window');

const iosInstructions = step => {
  const instructions = [
    '',
    '',
    '',
    '',
    '',
    I18n.t('instructions.ios0'),
    I18n.t('instructions.ios1'),
    I18n.t('instructions.ios2'),
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
    '',
    '',
    I18n.t('instructions.android0', { kidName }),
    I18n.t('instructions.android1', { kidName }),
    I18n.t('instructions.android2', { setupID }),
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

const instructionText = (step, kidName, deviceType, setupID) => {
  switch (deviceType) {
    case 'unknown':
      return I18n.t('instructions.goToMyTraxi', { kidName });
    case 'iPhone':
      return iosInstructions(step);
    case 'Android':
      return androidInstructions(step, kidName, setupID);
    case 'iPad':
      return iosInstructions(step);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width,
    height,
    marginTop: -(height / 2) + 32,
    top: height / 2,
  },
  buttonContainer: {
    flexDirection: isIOS ? 'column' : 'row',
    alignItems: 'center',
  },
});

const Instructions = ({ step, kidName, nextStep, deviceType, setupID }) => (
  <View style={styles.container}>
    <View style={styles.container}>
      <HeaderText>
        {instructionText(step, kidName, deviceType, setupID)}
      </HeaderText>

      <Spacing height={25} />

      <View style={styles.buttonContainer}>
        <Button primary onPress={nextStep}>
          {I18n.t('general.nextStep')}
        </Button>
        <Button onPress={() => Intercom.displayMessageComposer()}>
          {I18n.t('general.needHelp')}
        </Button>
      </View>
    </View>
    <View>
      <Animatable.Image
        resizeMode="contain"
        animation="bounceInUp"
        style={styles.image}
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
