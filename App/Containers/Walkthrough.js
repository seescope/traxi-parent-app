import React, { PropTypes } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import ProgressTrack from '../Components/ProgressTrack';
import SetName from './SetName';
import SetImage from './SetImage';
import Prompt from '../Components/Prompt';
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
  parentName: state.parentName,
});

const mapDispatchToProps = dispatch => ({
  nextStep: () => dispatch(NEXT_STEP),
});

const WALKTHROUGH_STYLES = {
  container: {
    backgroundColor: TRAXI_BLUE,
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  instructionsContainer: {
    flex: 1,
    paddingTop: 64,
  },
  loadingindicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const getStage = (step, deviceType) => {
  const stageMap = {
    Android: {
      0: 0,
      1: 0,
      2: 1,
      3: 1,
      4: 1,
      5: 2,
      6: 2,
      7: 2,
      8: 3,
    },
    iPhone: {
      0: 0,
      1: 0,
      2: 0,
      3: 1,
      4: 1,
      5: 2,
      6: 2,
      7: 2,
      8: 3,
    },
    iPad: {
      0: 0,
      1: 0,
      2: 0,
      3: 1,
      4: 1,
      5: 2,
      6: 2,
      7: 2,
      8: 3,
    },
  };

  return stageMap[deviceType]
    && stageMap[deviceType][step]
    || 0;
};

const getWrapperStyle = (step) => {
  if (step === 2
    || step >= 5) {
    return WALKTHROUGH_STYLES.loadingindicatorContainer;
  }

  return WALKTHROUGH_STYLES.instructionsContainer;
};

const getNextComponent = (step, kidName, nextStep, deviceType, setupID, parentName) => {
  if (step === 0) {
    return <SetName />;
  }

  if (step === 1) {
    return <SetImage />;
  }

  if (step === 2 || step === 3) {
    return (
      <Prompt
        step={step - 2}
        kidName={kidName}
        parentName={parentName}
        nextStep={nextStep}
      />
    );
  }

  if (step === 4) {
    return (
      <View>
        <HeaderText>Enter the setup code {setupID}</HeaderText>
        <Spacing height={96} />
        <LoadingIndicator>Waiting for {kidName}'s device...</LoadingIndicator>
      </View>
    );
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

const Walkthrough = ({ step, kid, nextStep, parentName }) => (
  <Background style={WALKTHROUGH_STYLES.container}>
    <ProgressTrack
      stage={getStage(step, kid.deviceType)}
      width={width - 64}
    />

    <View style={getWrapperStyle(step)}>
      {getNextComponent(
        step,
        firstName(kid.name),
        nextStep,
        kid.deviceType,
        kid.setupID,
        parentName
      )}
    </View>
  </Background>
);

Walkthrough.propTypes = {
  step: PropTypes.number.isRequired,
  kid: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  parentName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
