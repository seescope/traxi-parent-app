import React from 'react';
import { TouchableOpacity, Dimensions, View, Text, Image } from 'react-native';
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
};

const imageStyle = {
  height: height / 2,
};

export default () => (
  <Background>
    <View style={containerStyle}>
      <Animatable.Text
        useNativeDriver
        animation="bounceIn"
        delay={1000}
        style={logoStyle}
      >
        Monitor your child with Traxi
      </Animatable.Text>

      <Spacing height={16} />

      <Animatable.Image
        useNativeDriver
        resizeMode="contain"
        style={imageStyle}
        animation="bounceInLeft"
        source={require('../Images/splash_image.png')}
      />

      <Spacing height={16} />

      <TouchableOpacity onPress={() => alert('facebook')}>
        <Animatable.Image
          useNativeDriver
          source={require('../Images/facebook_auth_button.png')}
          animation="bounceInUp"
          delay={2000}
        />
      </TouchableOpacity>

      <Animatable.View useNativeDriver animation="bounceInUp" delay={2200}>
        <Button primary onPress={() => Actions.signUp()}>
          Sign up with email
        </Button>
      </Animatable.View>
    </View>
  </Background>
);
