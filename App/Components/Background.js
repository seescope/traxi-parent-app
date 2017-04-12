import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { VERY_LIGHT_GREY } from '../Constants/Colours';

const backgroundStyle = {
  flex: 1,
  backgroundColor: VERY_LIGHT_GREY,
};

const Background = ({ children }) => (
  <View
    style={backgroundStyle}
  >
    {children}
  </View>
);

Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background;
