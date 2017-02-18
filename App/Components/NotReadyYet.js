import React from 'react';
import { TouchableOpacity, Image, Text, Platform, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Analytics from 'react-native-analytics';
import I18n from 'react-native-i18n';

import { WHITE, NEUTRAL, TRANSPARENT } from '../Constants/Colours';
import Spacing from '../Components/Spacing';
import Button from '../Components/Button';
import { isIOS } from '../Utils';

const containerStyle = {
  backgroundColor: NEUTRAL,
  flex: 1,
  paddingHorizontal: 32,
  paddingTop: 32,
};

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

const bodyStyle = {
  paddingBottom: 16,
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: Platform.select({
    ios: 16,
    android: 14,
  }),
  textAlign: 'left',
  fontFamily: 'Raleway-Regular',
};

const buttonContainer = {
  alignItems: 'center',
};

const topContainerStyle = {
  justifyContent: 'space-between',
  flexDirection: 'row',
};

export default () => {
  const showThankYou = () => {
    Analytics.track('Reminder Requested');
    Actions.thankyou();
  };

  return (
    <View style={containerStyle}>
      <View style={topContainerStyle}>
        {isIOS ?
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Image source={require('../Images/chevron_left.png')} />
          </TouchableOpacity> :
          <View />}
        <Text style={headerStyle}>
          {I18n.t('notReadyYet.header')}
        </Text>
        <View />
      </View>

      <Spacing height={32} />

      <Text style={bodyStyle}>
        {I18n.t('notReadyYet.body1')}
      </Text>

      <Text style={bodyStyle}>
        {I18n.t('notReadyYet.body2')}
      </Text>

      <Text style={bodyStyle}>
        {I18n.t('notReadyYet.body3')}
      </Text>

      <Spacing height={16} />

      <View style={buttonContainer}>
        <Button onPress={showThankYou}>
          {I18n.t('notReadyYet.button')}
        </Button>
      </View>
    </View>
  );
};
