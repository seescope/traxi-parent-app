import React from 'react';
import { Dimensions, Image, View, Text } from 'react-native';

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

const logoStyle = {
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  height: 56,
  width: 56,
  marginRight: 24,
};

const barStyle = {
  width: width - 32 - 96 - 16, 
  height: 16,
  backgroundColor: TRAXI_BLUE,
  borderRadius: 4,
};

const TopApp = ({ name, logo, minutesUsed }) =>
  <View style={rowStyle}>
    <Image source={{ uri: logo }} style={logoStyle} />

    <View>
      <Text style={innerHeaderTextStyle}>{name}</Text>
      <View style={barStyle} />
      <Text style={innerSubheaderTextStyle}>{minutesUsed} minutes</Text>
    </View>
  </View>

TopApp.propTypes = {
  name: React.PropTypes.string.isRequired,
  logo: React.PropTypes.string.isRequired,
  minutesUsed: React.PropTypes.number.isRequired,
};

export default TopApp;
