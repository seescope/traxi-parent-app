/* eslint global-require: "off" */

import React from 'react';
import { Dimensions, Platform, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Button from '../Components/Button';
import Spacing from '../Components/Spacing';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import loginWithMethod from '../Actions/LoginWithMethod';
import { logError } from '../Utils';

const { width } = Dimensions.get('window');
const handleError = error => {
  logError(`Error logging in: ${error}`);
  alert('There was an error logging you in. Please try again.');
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

const AreYouReady = ({ getStarted }) =>
  <Image
    resizeMode="cover"
    style={containerStyle}
    source={require('../Images/are-you-ready-background.png')}
  >
    <View style={paddingStyle} />
    <View style={innerContainerStyle}>
      <Text style={headerStyle}>Ready to see what your kids are looking at?</Text>

      <Spacing height={32} />

      <View style={buttonContainer}>
        <Button onPress={() => Actions.notReadyYet()} primary={false}>Not just yet</Button>
        <Button onPress={getStarted}>I'm ready!</Button>
      </View>
    </View>
  </Image>;

AreYouReady.propTypes = {
  getStarted: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getStarted: () => dispatch(loginWithMethod())
    .then(() => Actions.createKid())
    .catch(handleError),
});

export default connect(null, mapDispatchToProps)(AreYouReady);
