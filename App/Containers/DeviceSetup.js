import React, { PropTypes } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// OLD IMPORTS
import SetImage from './SetImage';
import Prompt from '../Components/Prompt';
import ShowPIN from '../Components/ShowPIN';
import WaitingForDevice from '../Components/WaitingForDevice';
import Instructions from '../Components/Instructions';
import { NEXT_STEP } from '../Actions/Actions';
import Background from '../Components/Background';
// OLD IMPORTS

import Intercom from 'react-native-intercom';
import I18n from 'react-native-i18n';
import * as Animatable from 'react-native-animatable';
import HeaderText from '../Components/HeaderText';
import Button from '../Components/Button';
import ProgressTrack from '../Components/ProgressTrack';
import Spacing from '../Components/Spacing';
import LoadingIndicator from '../Components/LoadingIndicator';

const { height, width } = Dimensions.get('window');

const unknownInstructions = (step, kidName, setupID) => {
  const instructions = [
    `Go to mytraxi.com on ${kidName}’s device and enter the code ${setupID}`,
    `Waiting for ${kidName}'s device..`,
    '',
    '',
    '',
  ];
  return instructions[step];
};
const iosInstructions = (step, kidName) => {
  const instructions = [
    '',
    'Tap the "Install"\n button in the top right',
    'Tap the "Install"\n button again',
    'Tap "Done"',
    `Waiting for ${kidName}'s device..`,
  ];
  return instructions[step];
};
const androidInstructions = (step, kidName, setupID) => {
  const instructions = [
    '',
    `Install traxi Child App \n on ${kidName}'s Android device`,
    `Open traxi Child App \n on ${kidName}'s Android device`,
    `Insert the code ${setupID} if needed, then tap "OK"`,
    `Waiting for ${kidName}'s Android device..`,
  ];
  return instructions[step];
};
const IOS_IMAGES = [
  {},
  require('../Images/iphone-step-1.png'),
  require('../Images/iphone-step-2.png'),
  require('../Images/iphone-step-3.png'),
];
const ANDROID_IMAGES = [
  {},
  require('../Images/android-step-1.png'),
  require('../Images/android-step-2.png'),
  require('../Images/android-step-3.png'),
];
const instructionText = (step, kidName, deviceType, setupID) => {
  switch (deviceType) {
    case 'iPhone':
      return iosInstructions(step);
    case 'Android':
      return androidInstructions(step, kidName, setupID);
    case 'iPad':
      return iosInstructions(step);
    default:
      return unknownInstructions(step, kidName, setupID);
  }
}; // ReactNative forces us to be explicit about image locations.
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
const isWaitingForDevice = (step, deviceType) =>
  (step === 1 && deviceType === 'unknown') || step === 4;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width,
    height,
    marginTop: -(height / 2) + 32,
    top: height / 2,
  },
  progressTrackContainer: {
    paddingBottom: 25,
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 2,
  },
});
const DeviceSetup = (
  {
    step,
    nextStep,
    previousStep, // FIXME It's never used tell Kane
    kidName,
    deviceType,
    setupID,
  },
) => (
  <View style={styles.container}>
    <View style={styles.progressTrackContainer}>
      <ProgressTrack stage={step} width={width - 64} />
    </View>

    <View style={styles.contentContainer}>
      <HeaderText className="InstructionHeader">
        {instructionText(step, kidName, deviceType, setupID)}
      </HeaderText>

      {!isWaitingForDevice(step, deviceType) &&
        <View>
          <Spacing height={10} />
          <Button primary onPress={nextStep}>
            {I18n.t('general.nextStep')}
          </Button>
        </View>}

      {isWaitingForDevice(step, deviceType) &&
        <View>
          <Spacing height={20} />
          <LoadingIndicator />
        </View>}
    </View>

    <View style={styles.imageContainer}>
      <Button onPress={() => Intercom.displayMessageComposer()}>
        {I18n.t('general.needHelp')}
      </Button>

      <Animatable.Image
        resizeMode="contain"
        animation="bounceInUp"
        style={styles.image}
        source={imagePath(step, deviceType)}
      />
    </View>
  </View>
);
DeviceSetup.propTypes = {
  step: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  kidName: PropTypes.string.isRequired,
  deviceType: PropTypes.string.isRequired,
  setupID: PropTypes.number.isRequired,
};
const mapStateToProps = ({ step, kidName, deviceType, setupID }) => ({
  deviceType: 'unknown',
  kidName: 'Chris',
  step,
  setupID: 1111,
});
const mapDispatchToProps = dispatch => ({
  nextStep: () => dispatch({ type: 'NEXT_STEP' }),
  previousStep: () => dispatch({ type: 'PREVIOUS_STEP' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeviceSetup);
