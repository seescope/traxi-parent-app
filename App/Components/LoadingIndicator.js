import React, {PropTypes} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import { TRAXI_BLUE, GREY } from '../Constants/Colours';
import { TEXT } from '../Constants/Styles';

const spinnerStyle = {
  marginBottom: 16,
};

const spinnerTextStyle = {
  color: GREY,
  textAlign: 'center',
  backgroundColor: 'transparent'
};

const LoadingIndicator = ({ children }) => (
  <View>
    <ActivityIndicator size={'large'} color={TRAXI_BLUE} style={spinnerStyle} />
    <Text style={[TEXT, spinnerTextStyle]}>
      {children}
    </Text>
  </View>
);

LoadingIndicator.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default LoadingIndicator;
