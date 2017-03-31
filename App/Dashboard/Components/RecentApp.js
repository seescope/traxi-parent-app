import React from 'react';
import { Image, View, Text } from 'react-native';

import { SMALL_FONT_SIZE } from '../../Constants/Styles';

const rowStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  height: 56,
};

const innerHeaderTextStyle = {
  fontSize: SMALL_FONT_SIZE,
  fontWeight: 'bold',
};

const innerSubheaderTextStyle = {
  fontSize: SMALL_FONT_SIZE,
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

const RecentApp = ({ name, time, logoURL }) =>
  <View style={rowStyle}>
    <Image source={{ uri: logoURL }} style={logoStyle} />
    <View>
      <Text style={innerHeaderTextStyle}>{name}</Text>
      <Text style={innerSubheaderTextStyle}>{time}</Text>
    </View>
  </View>

RecentApp.propTypes = {
  name: React.PropTypes.string.isRequired,
  logoURL: React.PropTypes.string.isRequired,
  time: React.PropTypes.string.isRequired,
};

export default RecentApp;
