import React from 'react';
import { View, Dimensions } from 'react-native';


export const getBarWidth = (max, val, maxWidth) =>
  maxWidth * (val / max);

const MINIMUM_SATURATION = 50;
const MAXIMUM_SATURATION = 100;

const getSaturation = (max, val) =>
  (MAXIMUM_SATURATION - MINIMUM_SATURATION) * (val / max);

export const getBarColour = (max, val) =>
  `hsl(218, ${getSaturation(max, val)}%, 63.5%)`;

const { width } = Dimensions.get('window');
const maxWidth = width - 32 - 96 - 16; 

const getBarStyle = (val, max) => ({
  width: getBarWidth(max, val, maxWidth),
  height: 16,
  backgroundColor: getBarColour(max, val),
  borderRadius: 4,
});

const Bar = ({ val, max }) =>
  <View style={getBarStyle(val, max)} />;

Bar.propTypes = {
  val: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default Bar;
