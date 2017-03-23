import React from 'react';
import { Image, View, Text } from 'react-native';

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

const RecentApp = ({ name, minutesAgo, logo }) =>
  <View style={rowStyle}>
    <Image source={{ uri: logo }} style={logoStyle} />
    <View>
      <Text style={innerHeaderTextStyle}>{name}</Text>
      <Text style={innerSubheaderTextStyle}>{minutesAgo} minutes ago</Text>
    </View>
  </View>

RecentApp.propTypes = {
  name: React.PropTypes.string.isRequired,
  logo: React.PropTypes.string.isRequired,
  minutesAgo: React.PropTypes.number.isRequired,
};

export default RecentApp;
