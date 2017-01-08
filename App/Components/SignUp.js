/* eslint global-require: "off" */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, Image } from 'react-native';
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
  fontWeight: 'bold',
  fontFamily: 'raleway',
  marginBottom: 16,
};

const subHeaderStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 13,
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'raleway',
  marginBottom: 24,
};

const containerStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const SignUpComponent = ({ onPress }) =>
  <Image
    source={require('../Images/signup_background.png')}
    style={containerStyle}
    resizeMode="cover"
  >
    <Text style={logoStyle}>Keep your children safe.</Text>
    <Text style={subHeaderStyle}>Monitor unlimited devices free of charge.</Text>

    <Spacing />

    <Button primary onPress={() => onPress()}>Start Monitoring</Button>
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
