/* eslint global-require: "off" */

import React from 'react';
import { Dimensions, Platform, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import Button from '../Components/Button';
import Spacing from '../Components/Spacing';
import { WHITE, TRANSPARENT } from '../Constants/Colours';

const { width } = Dimensions.get('window');

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
  flex: 1,
  width,
};

const innerContainerStyle = {
  paddingHorizontal: 32,
  flex: 3,
};

const buttonContainer = {
  paddingHorizontal: 32,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
};

export default () =>
  <Image
    resizeMode="cover"
    style={containerStyle}
    source={require('../Images/are-you-ready-background.png')}
  >
    <View style={paddingStyle} />
    <View style={innerContainerStyle}>
      <Text style={headerStyle}>{I18n.t('areYouReady.header')}</Text>

      <Spacing height={32} />

      <View style={buttonContainer}>
        <Button onPress={() => Actions.notReadyYet()} primary={false}>
          {I18n.t('areYouReady.notReadyYet')}
        </Button>
        <Button onPress={() => Actions.walkthrough()}>
          {I18n.t('areYouReady.ready')}
        </Button>
      </View>
    </View>
  </Image>;
