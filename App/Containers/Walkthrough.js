import React, { PropTypes } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import ProgressTrack from '../Components/ProgressTrack';
import LoadingIndicator from '../Components/LoadingIndicator';
import Instructions from '../Components/Instructions';
import { NEXT_STEP } from '../Actions/Actions';
import Background from '../Components/Background';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import { TRAXI_BLUE } from '../Constants/Colours';
import { firstName } from '../Utils';

const { width } = Dimensions.get('window');
const NUMBER_OF_STEPS = {
  unknown: 7,
  iPhone: 7,
  Android: 8,
  iPad: 7,
};

export const mapStateToProps = state => ({
  step: state.step,
  kid: state.selectedKid,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  nextStep: () => dispatch(NEXT_STEP),
});

const WALKTHROUGH_STYLES = {
  container: {
    backgroundColor: TRAXI_BLUE,
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  instructionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingindicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const getWrapperStyle = (step, deviceType) => {
  if (step === 0
    || (deviceType !== 'iPad' && step === 2)
    || step >= 5) {
    return WALKTHROUGH_STYLES.loadingindicatorContainer;
  }

  return WALKTHROUGH_STYLES.instructionsContainer;
};

const getNextComponent = (step, kidName, nextStep, deviceType, setupID) => {
  if (step === 0) {
    return <LoadingIndicator>Hold on one second...</LoadingIndicator>;
  }

  if (step === 2 && deviceType === 'iPad') {
    return (
      <View>
        <HeaderText>Enter the setup code {setupID}</HeaderText>
        <Spacing height={96} />
        <LoadingIndicator>Waiting for {kidName}'s iPad...</LoadingIndicator>
      </View>
    );
  }

  if (step === 2 && deviceType === 'unknown') {
    return <LoadingIndicator>Connecting to {kidName}'s device...</LoadingIndicator>;
  }

  const lastStep = NUMBER_OF_STEPS[deviceType];
  if (step === lastStep) {
    return (
      <LoadingIndicator>Waiting for traxi to start on {kidName}'s {deviceType}...</LoadingIndicator>
    );
  }

  return (
    <Instructions
      deviceType={deviceType}
      step={step}
      kidName={kidName}
      nextStep={nextStep}
      setupID={setupID}
    />
  );
};

const Walkthrough = ({ step, kid, nextStep }) => (
  <Background style={WALKTHROUGH_STYLES.container}>
    <ProgressTrack
      progress={step / NUMBER_OF_STEPS[kid.deviceType]}
      width={width - 80}
      state={step === NUMBER_OF_STEPS[kid.deviceType] ? 'good' : 'neutral'}
      avatarURL={kid.avatarURL}
    />

    <View style={getWrapperStyle(step, kid.deviceType)}>
      {getNextComponent(step, firstName(kid.name), nextStep, kid.deviceType, kid.setupID)}
    </View>
  </Background>
);

Walkthrough.propTypes = {
  step: PropTypes.number.isRequired,
  kid: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
