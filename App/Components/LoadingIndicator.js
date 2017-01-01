import React, { PropTypes } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import HeaderText from './HeaderText';
import { WHITE } from '../Constants/Colours';

const spinnerStyle = {
  marginBottom: 16,
};

const LoadingIndicator = ({ children }) => (
  <View>
    <ActivityIndicator size={'large'} color={WHITE} style={spinnerStyle} />
    <HeaderText>{children}</HeaderText>
  </View>
);

LoadingIndicator.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default LoadingIndicator;
