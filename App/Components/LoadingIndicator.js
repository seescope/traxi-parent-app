import React, { PropTypes } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { WHITE } from '../Constants/Colours';
import { TEXT } from '../Constants/Styles';

const spinnerStyle = {
  marginBottom: 16,
};

const LoadingIndicator = ({ children }) => (
  <View>
    <ActivityIndicator size={'large'} color={WHITE} style={spinnerStyle} />
    <Text style={[TEXT, { color: WHITE, textAlign: 'center'}]}>{children}</Text>
  </View>
);

LoadingIndicator.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default LoadingIndicator;
