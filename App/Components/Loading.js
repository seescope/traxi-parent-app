import React from 'react';
import { View } from 'react-native';
import LoadingIndicator from './LoadingIndicator';
import Background from './Background';
import STYLES from '../Constants/Styles';

export default () =>
  <Background>
    <View style={STYLES.CONTAINER}>
      <LoadingIndicator>Loading...</LoadingIndicator>
    </View>
  </Background>
