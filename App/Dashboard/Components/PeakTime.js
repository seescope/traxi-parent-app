import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import { getNiceUsage } from '../../Utils';
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

export const getNiceName = name => {
  if (isNaN(parseInt(name, 10))) return name;

  const startTime = moment();
  startTime.hours(name);
  const startTimeString = startTime.format('hA');

  const endTime = startTime.clone();
  endTime.add(1, 'hour');
  const endTimeString = endTime.format('hA');

  return `${startTimeString} - ${endTimeString}`;
};

const PeakTime = ({ name, usage, max }) =>
  <View style={rowStyle}>
    <View style={timeTextStyle}>
      <Text style={innerHeaderTextStyle}>{getNiceName(name)}</Text>
      <Text style={innerSubheaderTextStyle}>{getNiceUsage(usage)}</Text>
    </View>

    <Bar val={usage} max={max} />
  </View>

PeakTime.propTypes = {
  name: React.PropTypes.string.isRequired,
  usage: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default PeakTime;
