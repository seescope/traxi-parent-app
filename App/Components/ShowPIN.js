import React from 'react';
import { View, Text } from 'react-native';

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
      Enter the PIN {setupID}{'\n'}
      on {kidName}'s device
    </HeaderText>

    <Spacing height={96} />

    <Text style={PINstyle}>
      {setupID}
    </Text>

    <Spacing height={96} />

    <LoadingIndicator>Waiting...</LoadingIndicator>

    <Spacing height={32} />

    <View style={buttonContainer}>
      <Button onPress={() => {}} primary={false}>I need help</Button>
    </View>
  </View>
);

ShowPIN.propTypes = {
  setupID: React.PropTypes.number.isRequired,
  kidName: React.PropTypes.string.isRequired,
};

export default ShowPIN;
