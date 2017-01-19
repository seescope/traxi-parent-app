/* eslint global-require: "off" */

import React from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

import Background from '../Components/Background';
import Button from '../Components/Button';
import Spacing from '../Components/Spacing';
import { WHITE, TRANSPARENT } from '../Constants/Colours';

const logoStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 32,
  textAlign: 'center',
  fontFamily: 'Raleway-ExtraBold',
  marginHorizontal: 16,
  marginBottom: 16,
};

const containerStyle = {
  flex: 1,
  alignItems: 'center',
  paddingHorizontal: 32,
};

const SplashScreen = () =>
  <Background style={containerStyle}>
    <Animatable.Image
      animation="bounceInDown"
      source={require('../Images/trail_preview.png')}
    />

    <Spacing height={32} />

    <Animatable.Text
      animation="bounceIn"
      delay={1000}
      style={logoStyle}
    >
      Start seeing what your kids are doing.
    </Animatable.Text>

    <Spacing height={32} />

    <Animatable.View
      animation="bounceInUp"
      delay={2000}
    >
      <Button onPress={() => Actions.intro()}>Show me how</Button>
    </Animatable.View>
  </Background>;


export default SplashScreen;
