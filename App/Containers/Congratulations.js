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

const mapStateToProps = state => ({ kid: state.selectedKid });
const mapDispatchToProps = dispatch => ({
  onPress: () => {
    dispatch(RESET_STATE);
    Actions.reports();
  },
});

// TODO: Extract
const firstName = (kid) => kid.name.split(' ')[0];
const headerTextStyle = { marginBottom: 16, color: WHITE };

const congratulationsStyle = {
  backgroundColor: TRAXI_BLUE,
  flex: 1,
  paddingTop: 32,
  padding: 16,
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const CongratulationsComponent = ({ kid, onPress }) => (
  <Background style={congratulationsStyle}>
    <KidAvatar animation="tada" size={210} state="good" avatarURL={kid.avatarURL} />

    <HeaderText style={headerTextStyle}>Congratulations!</HeaderText>

    <BodyText>
      {firstName(kid)}'s device is now being monitored by traxi.
    </BodyText>

    <Spacing />

    <BodyText>
      We'll start collecting data about how {firstName(kid)} is using the Internet,
      then send you a notification at 9AM tomorrow to tell you what happened.
    </BodyText>

    <Spacing height={32} />

    <Button onPress={() => onPress()}>Done</Button>
  </Background>
);

CongratulationsComponent.propTypes = {
  kid: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

const Congratulations = connect(mapStateToProps, mapDispatchToProps)(CongratulationsComponent);
export default Congratulations;
