/* eslint global-require: "off" */

import React from 'react';
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
  .then(() => Actions.createKid())
  .catch(handleError);

const logoStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 26,
  textAlign: 'center',
  fontFamily: 'Raleway-ExtraBold',
  marginHorizontal: 16,
  marginBottom: 16,
};

const subHeaderStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 16,
  textAlign: 'center',
  fontFamily: 'Raleway-Bold',
  marginBottom: 24,
};

const paddingStyle = {
  flex: 0.5,
};

const containerStyle = {
  flex: 1,
  alignItems: 'center',
};

const SplashScreen = () =>
  <Animatable.Image
    animation="fadeIn"
    source={require('../Images/signup_background.png')}
    style={containerStyle}
    easing="ease-in"
    resizeMode="cover"
  >
    <View style={paddingStyle} />
    <View style={containerStyle}>
      <Animatable.Text
        animation="fadeIn"
        delay={1000}
        style={logoStyle}
      >
        Find out what your kids are doing right now
      </Animatable.Text>

      <Animatable.Text
        animation="fadeIn"
        delay={1500}
        style={subHeaderStyle}
      >
        Get started in less than 60 seconds.
      </Animatable.Text>

      <Spacing />

      <Animatable.View animation="bounceIn" delay={2500}>
        <Button primary onPress={() => onPress()}>Monitor your kid's device</Button>
      </Animatable.View>
    </View>
  </Animatable.Image>;


export default SplashScreen;
