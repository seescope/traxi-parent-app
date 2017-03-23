import React from 'react';
import { View, Dimensions } from 'react-native';

import { TRAXI_BLUE } from '../../Constants/Colours';

export const getBarWidth = (max, val, maxWidth) =>
  maxWidth * (val / max);

const { width } = Dimensions.get('window');
const maxWidth = width - 32 - 96 - 16; 

const getBarStyle = (val, max) => ({
  width: getBarWidth(max, val, maxWidth),
  height: 16,
  backgroundColor: TRAXI_BLUE,
  borderRadius: 4,
});

const Bar = ({ val, max }) =>
  <View style={getBarStyle(val, max)} />;

Bar.propTypes = {
  val: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default Bar;
