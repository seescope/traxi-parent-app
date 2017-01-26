import React, { PropTypes } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import ProgressTrack from '../Components/ProgressTrack';
import SetName from './SetName';
import SetImage from './SetImage';
import Prompt from '../Components/Prompt';
import ShowPIN from '../Components/ShowPIN';
import WaitingForDevice from '../Components/WaitingForDevice';
import Instructions from '../Components/Instructions';
import { NEXT_STEP } from '../Actions/Actions';
import Background from '../Components/Background';
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

const STAGE_MAP = {
  0: 0,
  1: 0,
  2: 1,
  3: 1,
  4: 1,
  5: 2,
  6: 2,
  7: 2,
  8: 3,
};

const getNextComponent = (step, nextStep, kid, parentName) => {
  const kidName = firstName(kid.name);
  const { deviceType, setupID, avatarURL } = kid;

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
        avatarURL={avatarURL}
      />
    );
  }

  if (step === 4) {
    return <ShowPIN setupID={setupID} kidName={kidName} />;
  }

  const lastStep = NUMBER_OF_STEPS[deviceType];
  if (step === lastStep) {
    return (
      <WaitingForDevice
        avatarURL={avatarURL}
        kidName={kidName}
        deviceType={deviceType}
      />
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
      stage={STAGE_MAP[step]}
      width={width - 64}
    />

    <View style={WALKTHROUGH_STYLES.instructionsContainer}>
      {getNextComponent(
        step,
        nextStep,
        kid,
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
