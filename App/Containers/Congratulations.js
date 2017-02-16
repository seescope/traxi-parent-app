import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { RESET_STATE } from '../Actions/Actions';
import Spacing from '../Components/Spacing';
import Background from '../Components/Background';
import KidAvatar from '../Components/KidAvatar';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import BodyText from '../Components/BodyText';
import { TRAXI_BLUE, WHITE } from '../Constants/Colours';

const firstName = (kid) => kid.name.split(' ')[0];

const mapStateToProps = state => ({
  parentName: state.parentName,
  kidName: firstName(state.selectedKid),
  deviceType: state.selectedKid.deviceType,
  avatarURL: state.selectedKid.avatarURL,
});
const mapDispatchToProps = dispatch => ({
  onPress: () => {
    dispatch(RESET_STATE);
    Actions.reports();
  },
});

// TODO: Extract
const headerTextStyle = { marginBottom: 16, color: WHITE };

const congratulationsStyle = {
  backgroundColor: TRAXI_BLUE,
  flex: 1,
  paddingTop: 10,
  padding: 28,
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const CongratulationsComponent = ({ kidName, parentName, onPress, avatarURL, deviceType }) => (
  <Background style={congratulationsStyle}>
    <KidAvatar animation="tada" size={210} state="good" avatarURL={avatarURL} />

    <HeaderText style={headerTextStyle}>
      {kidName} is being monitored!
    </HeaderText>

    <BodyText>
      Great work, {parentName}! {kidName}'s {deviceType} is now being monitored by traxi.
      You will soon be able to see what they are doing on their {deviceType}.
      {'\n'}
      {'\n'}
      It will take a couple minutes for {kidName}'s usage to be sent to traxi, so you might
      want to come back to the app a little later.
    </BodyText>

    <Spacing height={32} />

    <Button onPress={() => onPress()}>Finished!</Button>
  </Background>
);

CongratulationsComponent.propTypes = {
  parentName: PropTypes.string,
  kidName: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  deviceType: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const Congratulations = connect(mapStateToProps, mapDispatchToProps)(CongratulationsComponent);
export default Congratulations;
