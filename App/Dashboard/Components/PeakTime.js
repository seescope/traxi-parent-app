import React from 'react';
import { View, Text } from 'react-native';

import Bar from './Bar';

const rowStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  height: 56,
};

const innerHeaderTextStyle = {
  fontSize: 15,
  fontWeight: '400',
};

const innerSubheaderTextStyle = {
  fontSize: 15,
  fontWeight: '200',
};

const timeTextStyle = {
  width: 80,
};

const PeakTime = ({ name, usage, max }) =>
  <View style={rowStyle}>
    <View style={timeTextStyle}>
      <Text style={innerHeaderTextStyle}>{name}</Text>
      <Text style={innerSubheaderTextStyle}>{usage} minutes</Text>
    </View>

    <Bar val={usage} max={max} />
  </View>

PeakTime.propTypes = {
  name: React.PropTypes.string.isRequired,
  usage: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default PeakTime;
