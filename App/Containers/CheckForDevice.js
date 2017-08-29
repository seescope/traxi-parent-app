import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';

import Button from '../Components/Button';
import Background from '../Components/Background';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import { GREY } from '../Constants/Colours';
import { isSmallScreen } from '../Utils';

const style = {
  container: {
    paddingTop: 18,
    alignItems: 'center',
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
  labelText: {
    fontFamily: 'Raleway-Regular',
    fontSize: isSmallScreen ? 12 : 14,
    color: GREY,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  deviceImage: {
    height: 200,
    marginVertical: 8,
  },
};

const CheckForDevice = ({ kidName }) => (
  <Background>
    <Spacing height={16} />
    <View style={style.container}>
      <HeaderText>Get {kidName}'s device now</HeaderText>

      <Animatable.Image
        animation="bounceInLeft"
        resizeMode="contain"
        style={style.deviceImage}
        source={require('../Images/device_image.png')}
      />

      <View style={style.innerContainer}>
        <Text allowFontScaling={false} style={style.labelText}>
          To start monitoring
          {' '}
          {kidName}
          's Internet activity you're going to need to get their smartphone or tablet now.
          {' '}
        </Text>

        <Spacing height={16} />

        <Text allowFontScaling={false} style={style.labelText}>
          If you don't have it now, we can send you an email tomorrow to remind you to come back and start monitoring
          {' '}
          {kidName}
          's device.
        </Text>
      </View>

      <Spacing height={32} />

      <Animatable.View
        useNativeDriver
        style={style.buttonsContainer}
        animation="bounceIn"
        delay={500}
      >
        <Button onPress={() => Actions.sendReminder()}>
          Not ready yet
        </Button>
        <Button primary onPress={() => Actions.deviceSetup()}>
          I'm ready
        </Button>
      </Animatable.View>
    </View>
  </Background>
);

CheckForDevice.propTypes = {
  kidName: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const { kidUUID } = state.setupState;
  const { name } = state.kidsState[kidUUID] || {};

  return {
    kidName: name || '',
  };
};

export default connect(mapStateToProps)(CheckForDevice);
