import React from 'react';
import { Dimensions, Platform, Text, Image } from 'react-native';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import Spacing from '../Components/Spacing';

const { width } = Dimensions.get('window');

const containerStyle = {
  paddingTop: 32,
  paddingHorizontal: 32,
  flex: 1,
  width,
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

export default () =>
  <Image
    style={containerStyle}
    source={require('../Images/thankyou-background.png')}
  >
    <Text style={headerStyle}>Thanks!</Text>

    <Spacing height={36} />

    <Text style={bodyStyle}>
      We'll send you a reminder tomorrow.
    </Text>

    <Text style={bodyStyle}>
      Remember, you can come back to the app and start monitoring your kids at any time.
    </Text>
  </Image>;
