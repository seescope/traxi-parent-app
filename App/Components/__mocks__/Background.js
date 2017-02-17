import React, { PropTypes } from 'react';
import { View } from 'react-native';

const Background = ({ children }) =>
  <View>{children}</View>;

Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background;
