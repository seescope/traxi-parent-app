// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

import Background from '../Components/Background';
import Button from '../Components/Button';
import Spacing from '../Components/Spacing';
import authenticateWithFacebook from '../AsyncActions/AuthenticateWithFacebook';
import { GREY, TRANSPARENT } from '../Constants/Colours';

import type { ParentAction } from '../Reducers/Parent';
import type { Dispatch } from '../Reducers';

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

type Props = {
  facebookAuth: () => Promise<ParentAction>
};

const handleError = () =>
  Alert.alert('Error', 'Unable to login using Facebook. Please try again.');

const SplashScreen = ({ facebookAuth }: Props) => (
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

      <TouchableOpacity onPress={facebookAuth}>
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

export const mapDispatchToProps = (dispatch: Dispatch): Props => ({
  facebookAuth: () =>
    dispatch(authenticateWithFacebook())
      .then(() => Actions.setName({ type: 'replace' }))
      .catch(handleError),
});

export default connect(null, mapDispatchToProps)(SplashScreen);
