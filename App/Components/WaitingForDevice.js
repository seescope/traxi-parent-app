import React from 'react';
import { Text, View, Dimensions, ActivityIndicator } from 'react-native';

import HeaderText from '../Components/HeaderText';
import KidAvatar from '../Components/KidAvatar';
import Spacing from '../Components/Spacing';
import Button from '../Components/Button';
import { WHITE, TRANSPARENT } from '../Constants/Colours';

const { width } = Dimensions.get('window');

const style = {
  container: {
    alignItems: 'center',
  },
  bodyText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: WHITE,
    textAlign: 'center',
    backgroundColor: TRANSPARENT,
  },
  buttonContainer: {
    width: width - 64,
    alignItems: 'center',
  },
};

const WaitingForDevice = ({ kidName, avatarURL, deviceType }) => (
  <View style={style.container}>
    <HeaderText>
      Waiting for traxi to {'\n'}
      start on {kidName}'s {deviceType}
    </HeaderText>

    <Spacing height={32} />

    <KidAvatar
      size={166}
      avatarURL={avatarURL}
      state="neutral"
    />

    <Spacing height={32} />

    <ActivityIndicator size="large" />

    <Spacing height={32} />

    <Text style={style.bodyText}>
      Waiting...
    </Text>

    <Spacing />

    <View style={style.buttonContainer}>
      <Button primary={false} onPress={() => {}}>
        I need help
      </Button>
    </View>
  </View>
);

WaitingForDevice.propTypes = {
  kidName: React.PropTypes.string.isRequired,
  avatarURL: React.PropTypes.string.isRequired,
  deviceType: React.PropTypes.string.isRequired,
};

export default WaitingForDevice;
