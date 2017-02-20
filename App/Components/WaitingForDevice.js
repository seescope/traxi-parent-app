import React from 'react';
import { Text, View, Dimensions, ActivityIndicator } from 'react-native';
import Intercom from 'react-native-intercom';
import I18n from 'react-native-i18n';

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
      {I18n.t('waitingForDevice.header', { kidName, deviceType })}
    </HeaderText>

    <Spacing height={32} />

    <KidAvatar size={166} avatarURL={avatarURL} state="neutral" />

    <Spacing height={32} />

    <ActivityIndicator size="large" color="white" />

    <Spacing height={32} />

    <Text style={style.bodyText}>
      {I18n.t('waitingForDevice.waiting')}
    </Text>

    <Spacing />

    <View style={style.buttonContainer}>
      <Button primary={false} onPress={() => Intercom.displayMessageComposer()}>
        {I18n.t('general.needHelp')}
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
