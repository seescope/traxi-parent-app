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
const NUMBER_OF_STEPS = 8;

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
    paddingTop: 20,
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
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 3,
  7: 3,
  8: 4,
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

  if (step === 2) {
    return (
      <Prompt
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

  if (step === NUMBER_OF_STEPS) {
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
    <ProgressTrack stage={STAGE_MAP[step]} width={width - 64} />

    <View style={WALKTHROUGH_STYLES.instructionsContainer}>
      {getNextComponent(step, nextStep, kid, parentName)}
    </View>
  </Background>
);

Walkthrough.propTypes = {
  step: PropTypes.number.isRequired,
  kid: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  parentName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
