import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { GREY, TRAXI_BLUE } from '../../Constants/Colours';
import Bar from './Bar';
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


const ICONS = {
  'Games': 'gamepad',
  'Tools': 'wrench',
};

const TopApp = ({ name, minutesUsed, max }) =>
  <View style={rowStyle}>
    <Icon style={logoStyle} name={ICONS[name]} size={52} color={GREY} />

    <View>
      <Text style={innerHeaderTextStyle}>{name}</Text>
      <Bar val={minutesUsed} max={max} />
      <Text style={innerSubheaderTextStyle}>{minutesUsed} minutes</Text>
    </View>
  </View>

TopApp.propTypes = {
  name: React.PropTypes.string.isRequired,
  minutesUsed: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default TopApp;
