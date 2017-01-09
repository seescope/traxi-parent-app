/* eslint global-require: "off" */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

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
  <Animatable.Image
    animation="fadeIn"
    source={require('../Images/signup_background.png')}
    style={containerStyle}
    easing="ease-in"
    resizeMode="cover"
  >
    <View style={containerStyle} />
    <View style={containerStyle}>
      <Animatable.Text animation="fadeIn" delay={1000} style={logoStyle}>What are your children doing online?</Animatable.Text>
      <Animatable.Text animation="fadeIn" delay={1200} style={subHeaderStyle}>Find out in less than 60 seconds - it's easy!</Animatable.Text>

      <Spacing />

      <Animatable.View animation="bounceIn" delay={2000}>
        <Button primary onPress={() => onPress()}>Monitor your child's device</Button>
      </Animatable.View>
    </View>
  </Animatable.Image>;


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
