import React from 'react';
import { Dimensions, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

import Background from '../Components/Background';
import Button from '../Components/Button';
import Spacing from '../Components/Spacing';
import { GREY, TRANSPARENT } from '../Constants/Colours';

const { height } = Dimensions.get('window');

const logoStyle = {
  backgroundColor: TRANSPARENT,
  color: GREY,
  fontSize: 22,
  textAlign: 'center',
  fontFamily: 'Raleway-ExtraBold',
};

const containerStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 32,
};

const imageStyle = {
  height: height / 2,
};

export default () => (
  <Background>
    <View style={containerStyle}>
      <Animatable.Image
        useNativeDriver
        resizeMode="contain"
        style={imageStyle}
        animation="bounceInLeft"
        source={require('../Images/splash_image.png')}
      />

      <Spacing height={32} />

      <Animatable.Text
        useNativeDriver
        animation="bounceIn"
        delay={1000}
        style={logoStyle}
      >
        What is your child doing online?
      </Animatable.Text>

      <Spacing height={32} />

      <Animatable.View useNativeDriver animation="bounceInUp" delay={2000}>
        <Button primary onPress={() => Actions.setName()}>
          Start monitoring with Traxi
        </Button>
      </Animatable.View>
    </View>
  </Background>
);
