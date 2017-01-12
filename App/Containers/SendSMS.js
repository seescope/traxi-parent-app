import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import HeaderText from '../Components/HeaderText';
import KidAvatar from '../Components/KidAvatar';
import BodyText from '../Components/BodyText';
import Button from '../Components/Button';
import sendSMS from '../Actions/SendSMS';
import watchDevice from '../Actions/WatchDevice';
import STYLES from '../Constants/Styles';
import Background from '../Components/Background';
import Spacing from '../Components/Spacing';

export const mergeProps = (stateProps, dispatchProps) => {
  const { dispatch } = dispatchProps;
  const { kid } = stateProps;

  return {
    ...stateProps,
    onPress: () => {
      Actions.walkthrough();
      dispatch(sendSMS(kid)).then(() =>
        dispatch(watchDevice())
      );
    },
  };
};

export const mapStateToProps = (state) => (
  {
    kid: state.selectedKid,
  }
);

export const SendSMSComponent = ({ kid, onPress }) => {
  const kidName = kid.name.split(' ')[0];

  return (
    <Background>
      <KidAvatar avatarURL={kid.avatarURL} size={150} state={'neutral'} />

      <HeaderText>Let's get {kidName} started!</HeaderText>

      <Spacing height={16} />

      <BodyText>
        To get traxi installed on {kidName}'s phone,
        we're going to send a <Text style={STYLES.BOLD}>message with a special link</Text>.
      </BodyText>

      <Spacing height={16} />

      <BodyText>
        When the message arrives, <Text style={STYLES.BOLD}>open it on their phone </Text>
        and follow the instructions.
      </BodyText>

      <Spacing height={16} />

      <BodyText>
        Don't worry - <Text style={STYLES.BOLD}>it's totally free</Text>.
      </BodyText>

      <Spacing height={32} />

      <Button onPress={onPress}>Next Step</Button>
    </Background>
  );
};

SendSMSComponent.propTypes = {
  kid: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

const SendSMS = connect(mapStateToProps, null, mergeProps)(SendSMSComponent);
export default SendSMS;
