import React, { PropTypes } from 'react';
import { Image, View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Intercom from 'react-native-intercom';
import I18n from 'react-native-i18n';
import * as Animatable from 'react-native-animatable';
import HeaderText from '../Components/HeaderText';
import Button from '../Components/Button';
import ProgressTrack from '../Components/ProgressTrack';
import Spacing from '../Components/Spacing';
import LoadingIndicator from '../Components/LoadingIndicator';
import { isIOS } from '../Utils';

const { height, width } = Dimensions.get('window');

const unknownInstructions = (step, kidName, setupID) => {
  const instructions = [
    `Go to mytraxi.com on ${kidName}’s device & enter the code ${setupID}`,
    `Waiting for ${kidName} to enter ${setupID}...`,
    '',
    '',
  ];
  return instructions[step];
};
const iosInstructions = (step, kidName, deviceType) => {
  const instructions = [
    'Tap the "Install"\n button in the top right',
    'Tap the "Install"\n button again',
    'Tap "Done"',
    `Connecting to ${kidName}'s ${deviceType}..`,
  ];
  return instructions[step];
};
const androidInstructions = (step, kidName, setupID) => {
  const instructions = [
    'Tap the "Next step" button',
    'Tap the "Install" button',
    'Tap the "Open" button',
    `Enter ${setupID}, then tap "OK"`,
  ];
  return instructions[step];
};
const IOS_IMAGES = [
  require('../Images/iphone-step-1.png'),
  require('../Images/iphone-step-2.png'),
  require('../Images/iphone-step-3.png'),
  require('../Images/iphone-step-4.png'),
];
const ANDROID_IMAGES = [
  require('../Images/android-step-1.png'),
  require('../Images/android-step-2.png'),
  require('../Images/android-step-3.png'),
  require('../Images/android-step-4.png'),
];
const instructionText = (step, kidName, deviceType, setupID) => {
  switch (deviceType) {
    case 'iPhone':
      return iosInstructions(step, kidName, deviceType);
    case 'Android':
      return androidInstructions(step, kidName, setupID);
    case 'iPad':
      return iosInstructions(step, kidName, deviceType);
    default:
      return unknownInstructions(step, kidName, setupID);
  }
};

// ReactNative forces us to be explicit about image locations.
const getInstructionImage = (step, deviceType) => {
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

const getBackground = deviceType => {
  if (deviceType === 'Android')
    return require('../Images/android-background.png');

  return require('../Images/iphone-background.png');
};

// iphone background: 289 x 588
// iphone image: 250 x 445
// scaling = (250/289)

// android background: 360 x 588
// android image: 320 x 570

const iPhoneHeight = height * (588 / height);
const iPhoneWidth = width * (289 / width);

const androidHeight = height * (588 / height);
const androidWidth = width * (286 / width);

const imageDimensions = {
  Android: {
    height: androidHeight,
    width: androidWidth,
  },
  unknown: {
    height: iPhoneHeight,
    width: iPhoneWidth,
  },
  iPhone: {
    height: iPhoneHeight,
    width: iPhoneWidth,
  },
  iPad: {
    height: iPhoneHeight,
    width: iPhoneWidth,
  },
};

const isWaitingForDevice = (step, deviceType) =>
  (step === 0 && deviceType === 'unknown') || step === 3;

const getOuterImageStyle = deviceType => {
  const { width: deviceWidth, height: deviceHeight } = imageDimensions[
    deviceType
  ];

  return {
    width: deviceWidth,
    height: deviceHeight,
    marginTop: -(deviceHeight * (1 / 3)),
    top: deviceHeight * (1 / 3),
    alignItems: 'center',
    justifyContent: 'center',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 32,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerImage: {
    left: -4 * (250 / width),
    width: width * (254 / width),
    height: height * (457 / height),
  },
  progressTrackContainer: {
    paddingBottom: 25,
  },
  contentContainer: {
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  instructionsContainer: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  loader: {
    marginHorizontal: 38,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: isIOS ? 'flex-end' : 'center',
    flexDirection: isIOS ? 'column' : 'row',
  },
});
const DeviceSetup = (
  {
    step,
    nextStep,
    kidName,
    deviceType,
    setupID,
  }
) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <View style={styles.progressTrackContainer}>
        <ProgressTrack stage={step} width={width - 64} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.instructionsContainer}>
          <HeaderText>
            {instructionText(step, kidName, deviceType, setupID)}
          </HeaderText>
        </View>

        <View style={styles.buttonsContainer}>
          <Spacing height={10} />

          {!isWaitingForDevice(step, deviceType) &&
            <Button primary onPress={nextStep}>
              {I18n.t('general.nextStep')}
            </Button>}

          {isWaitingForDevice(step, deviceType) &&
            <View style={styles.loader}>
              <Spacing height={10} />
              <LoadingIndicator />
            </View>}

          <Button onPress={() => Intercom.displayMessageComposer()}>
            {I18n.t('general.needHelp')}
          </Button>
        </View>
      </View>
    </View>

    <Animatable.Image
      key={step}
      useNativeDriver
      animation="pulse"
      style={getOuterImageStyle(deviceType)}
      source={getBackground(deviceType)}
    >
      <Image
        style={styles.innerImage}
        source={getInstructionImage(step, deviceType)}
      />
    </Animatable.Image>
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

const mapStateToProps = ({ setupState, kidsState }) => {
  const { kidUUID } = setupState;
  const { name, deviceType } = kidsState[kidUUID];
  return {
    ...setupState,
    deviceType,
    kidName: name,
  };
};
const mapDispatchToProps = dispatch => ({
  nextStep: () => dispatch({ type: 'NEXT_STEP' }),
  previousStep: () => dispatch({ type: 'PREVIOUS_STEP' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeviceSetup);
