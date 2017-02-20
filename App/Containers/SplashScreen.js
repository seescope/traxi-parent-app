import React from 'react';
import { Dimensions, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import Background from '../Components/Background';
import Button from '../Components/Button';
import Spacing from '../Components/Spacing';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import loginWithMethod from '../Actions/LoginWithMethod';
import saveProfile from '../Actions/SaveProfile';
import { logError } from '../Utils';

const { height } = Dimensions.get('window');
const handleError = error => {
  logError(`Error logging in: ${error}`);
};

const logoStyle = {
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontSize: 28,
  textAlign: 'center',
  fontFamily: 'Raleway-ExtraBold',
  marginBottom: 16,
};

const containerStyle = {
  flex: 1,
  alignItems: 'center',
  paddingHorizontal: 32,
};

const imageStyle = {
  height: height / 2,
};

const SplashScreen = ({ getStarted }) => (
  <Background style={containerStyle}>
    <Animatable.Image
      useNativeDriver
      resizeMode="contain"
      style={imageStyle}
      animation="bounceInDown"
      source={require('../Images/trail_preview.png')}
    />

    <Spacing height={32} />

    <Animatable.Text
      useNativeDriver
      animation="bounceIn"
      delay={1000}
      style={logoStyle}
    >
      What are your children doing online?
    </Animatable.Text>

    <Spacing height={32} />

    <Animatable.View useNativeDriver animation="bounceInUp" delay={2000}>
      <Button onPress={getStarted}>Find out now</Button>
    </Animatable.View>
  </Background>
);

SplashScreen.propTypes = {
  getStarted: React.PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  getStarted: () => dispatch(loginWithMethod())
    .then(profile => {
      // We'll just let this run whenever, no point holding up the user.
      saveProfile(profile);
      return Actions.intro();
    })
    .catch(handleError),
});

export default connect(null, mapDispatchToProps)(SplashScreen);
