import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import BodyText from '../Components/BodyText';
import STYLES from '../Constants/Styles';
import loginWithMethod from '../Actions/LoginWithMethod';
import SocialIcons from '../Components/SocialIcons';
import Background from '../Components/Background';

const loginThenFetchContacts = (method) =>
  (dispatch) =>
    dispatch(loginWithMethod(method))
    .then(() => Actions.findKid());


export const mapDispatchToProps = (dispatch) => (
  {
    onPress: method => dispatch(loginThenFetchContacts(method)),
  }
);

export const AuthenticateComponent = ({ onPress }) => (
  <Background>
    <BodyText>
      To get started, you can login with Facebook, gMail, or your email address.
    </BodyText>

    <BodyText>
      Just tap the icon you want.
    </BodyText>

    <View style={STYLES.SPACING} />

    <SocialIcons onPress={onPress} />
  </Background>
);

AuthenticateComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const Authenticate = connect(null, mapDispatchToProps)(AuthenticateComponent);

export default Authenticate;
