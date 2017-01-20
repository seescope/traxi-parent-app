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

const Thankyou = () =>
  <Image source={require('../Images/thankyou-background.png')}>
    <Text>Thanks!</Text>
    <Text>We'll send you a reminder tomorrow.</Text>
    <Text>Remember, you can come back to the app and start monitoring your kids at any time.</Text>
  </Image>


export default Thankyou;
