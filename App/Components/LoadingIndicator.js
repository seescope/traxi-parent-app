import React, {PropTypes} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {WHITE} from '../Constants/Colours';
import {TEXT} from '../Constants/Styles';

const spinnerStyle = {
  marginBottom: 16,
};

const LoadingIndicator = ({children, color = WHITE}) => (
  <View>
    <ActivityIndicator size={'large'} color={color} style={spinnerStyle} />
    <Text
      style={// eslint-disable-next-line
      [TEXT, {color: color, textAlign: 'center', backgroundColor: 'transparent'}]}
    >
      {children}
    </Text>
  </View>
);

LoadingIndicator.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default LoadingIndicator;
