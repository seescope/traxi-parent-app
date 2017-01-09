/* eslint global-require: "off" */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../Components/Button';
import Spacing from '../Components/Spacing';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import loginWithMethod from '../Actions/LoginWithMethod';
import { logError } from '../Utils';

export const handleError = error => {
  logError(`Error signing up: ${error.message}`);
  return null;
};

export const beginSetup = () => dispatch =>
  dispatch(loginWithMethod('anonymous'))
  .then(() => Actions.selectDevice())
  .catch(handleError);

const logoStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 26,
  textAlign: 'center',
  fontFamily: 'Raleway-ExtraBold',
  marginBottom: 16,
};

const subHeaderStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 13,
  textAlign: 'center',
  fontFamily: 'Raleway-Regular',
  marginBottom: 24,
};

const containerStyle = {
  flex: 1,
  alignItems: 'center',
};

const SignUpComponent = ({ onPress }) =>
  <Image
    source={require('../Images/signup_background.png')}
    style={containerStyle}
    resizeMode="cover"
  >
    <View style={containerStyle} />
    <View style={containerStyle}>
      <Text style={logoStyle}>What are your children doing online?</Text>
      <Text style={subHeaderStyle}>Find out in less than 60 seconds.</Text>

      <Spacing />

      <Button primary onPress={() => onPress()}>Get started</Button>
    </View>
  </Image>;


const SignUp = connect(
  null,
  {
    onPress: beginSetup,
  }
)(SignUpComponent);

SignUpComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default SignUp;
