/* eslint global-require: "off" */

import React from 'react';
import { Platform, View, Text, Image } from 'react-native';

import Button from '../Components/Button';
import Spacing from '../Components/Spacing';
import { WHITE, TRANSPARENT } from '../Constants/Colours';

const headerStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: Platform.select({
    ios: 26,
    android: 24,
  }),
  textAlign: 'center',
  fontFamily: 'Raleway-ExtraBold',
};

const paddingStyle = {
  flex: 7,
};

const containerStyle = {
  flex: 3,
  paddingHorizontal: 16,
};

const buttonContainer = {
  paddingHorizontal: 8,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
};

const AreYouReady = () =>
  <Image style={containerStyle} source={require('../Images/are-you-ready-background.png')}>
    <View style={paddingStyle} />
    <View style={containerStyle}>
      <Text style={headerStyle}>Ready to see what your kids are looking at?</Text>

      <Spacing height={32} />

      <View style={buttonContainer}>
        <Button onPress={() => {}} primary={false}>Not just yet</Button>
        <Button onPress={() => {}}>I'm ready!</Button>
      </View>
    </View>
  </Image>;


export default AreYouReady;
