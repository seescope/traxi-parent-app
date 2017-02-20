import React from 'react';
import { View, Text } from 'react-native';
import Intercom from 'react-native-intercom';
import I18n from 'react-native-i18n';

import HeaderText from './HeaderText';
import Spacing from './Spacing';
import Button from './Button';
import LoadingIndicator from './LoadingIndicator';
import { WHITE } from '../Constants/Colours';

const PINstyle = {
  fontSize: 64,
  color: WHITE,
  textAlign: 'center',
  backgroundColor: 'transparent',
};

const buttonContainer = {
  flex: 1,
  alignItems: 'center',
};

const ShowPIN = ({ setupID, kidName }) => (
  <View>
    <HeaderText>
      {I18n.t('showPin.header', { kidName })}
    </HeaderText>

    <Spacing height={64} />

    <Text style={PINstyle}>
      {setupID}
    </Text>

    <Spacing height={64} />

    <LoadingIndicator>{I18n.t('showPin.waiting', { kidName })}</LoadingIndicator>

    <Spacing height={32} />

    <View style={buttonContainer}>
      <Button primary={false} onPress={() => Intercom.displayMessageComposer()}>
        {I18n.t('general.needHelp')}
      </Button>
    </View>
  </View>
);

ShowPIN.propTypes = {
  setupID: React.PropTypes.number.isRequired,
  kidName: React.PropTypes.string.isRequired,
};

export default ShowPIN;
