import React from 'react';
import { Dimensions, View, Text } from 'react-native';

import { TRAXI_BLUE } from '../../Constants/Colours';
const { width } = Dimensions.get('window');

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

const barStyle = {
  width: width - 32 - 96 - 16, 
  height: 16,
  backgroundColor: TRAXI_BLUE,
  borderRadius: 4,
};

const timeTextStyle = {
  width: 80,
};

const PeakTime = ({ name, minutesUsed }) =>
  <View style={rowStyle}>
    <View style={timeTextStyle}>
      <Text style={innerHeaderTextStyle}>{name}</Text>
      <Text style={innerSubheaderTextStyle}>{minutesUsed} minutes</Text>
    </View>

    <View style={barStyle} />
  </View>

PeakTime.propTypes = {
  name: React.PropTypes.string.isRequired,
  minutesUsed: React.PropTypes.number.isRequired,
};

export default PeakTime;
