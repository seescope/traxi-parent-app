import React from 'react';
import { View, Text } from 'react-native';
import Intercom from 'react-native-intercom';

import HeaderText from './HeaderText';
import Spacing from './Spacing';
import Button from './Button';
import LoadingIndicator from './LoadingIndicator';
import { WHITE } from '../Constants/Colours';

const PINstyle = {
  fontSize: 64,
  color: WHITE,
  textAlign: 'center',
};

const buttonContainer = {
  flex: 1,
  alignItems: 'center',
};

const ShowPIN = ({ setupID, kidName }) => (
  <View>
    <HeaderText>
      On {kidName}'s device {'\n'}
      go to mytraxi.com {'\n'}
      and enter the code:
    </HeaderText>

    <Spacing height={64} />

    <Text style={PINstyle}>
      {setupID}
    </Text>

    <Spacing height={64} />

    <LoadingIndicator>Waiting for {kidName}'s device...</LoadingIndicator>

    <Spacing height={32} />

    <View style={buttonContainer}>
      <Button primary={false} onPress={() => Intercom.displayMessageComposer()}>
        I need help
      </Button>
    </View>
  </View>
);

ShowPIN.propTypes = {
  setupID: React.PropTypes.number.isRequired,
  kidName: React.PropTypes.string.isRequired,
};

export default ShowPIN;
