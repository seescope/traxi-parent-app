import React from 'react';
import { Image, View, Text } from 'react-native';
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

const logoStyle = {
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  height: 56,
  width: 56,
  marginRight: 24,
};

const TopApp = ({ name, logoURL, usage, max }) =>
  <View style={rowStyle}>
    <Image source={{ uri: logoURL }} style={logoStyle} />

    <View>
      <Text style={innerHeaderTextStyle}>{name}</Text>
      <Bar val={usage} max={max} />
      <Text style={innerSubheaderTextStyle}>{getNiceUsage(usage)}</Text>
    </View>
  </View>

TopApp.propTypes = {
  name: React.PropTypes.string.isRequired,
  logoURL: React.PropTypes.string.isRequired,
  usage: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default TopApp;
