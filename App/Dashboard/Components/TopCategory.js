import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getNiceUsage } from '../../Utils';
import { GREY } from '../../Constants/Colours';
import Bar from './Bar';
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


const ICONS = {
  'Games': 'gamepad',
  'Tools': 'wrench',
	'Art & Design': 'paint-brush',
	'Auto & Vehicles': 'car',
	'Beauty': 'smile-o',
	'Books & Reference': 'book',
	'Business': 'briefcase',
	'Comics': 'book',
	'Communications': 'phone',
	'Dating': 'heart',
	'Education': 'graduation-cap',
	'Entertainment': 'star',
	'Events': 'star',
	'Finance': 'money',
	'Food & Drink': 'cutlery',
	'Health & Fitness': 'heart',
	'House & Home': 'home',
	'Libraries & Demo': 'magic',
	'Lifestyle': 'tree',
	'Maps & Navigation': 'map',
	'Medical': 'heart',
	'Music & Audio': 'music',
	'News & Magazines': 'newspaper-o',
	'Parenting': 'child',
	'Personalization': 'user',
	'Photography': 'camera',
	'Productivity': 'briefcase',
	'Shopping': 'shopping-bag',
	'Social': 'facebook',
	'Sports': 'futbol-o',
	'Travel & Local': 'plane',
	'Video Players & Editors': 'film',
	'Weather': 'sun-o',
	'Books': 'book',
	'Catalogs': 'newspaper-o',
	'Music': 'music',
	'Navigation': 'map',
	'News': 'newspaper-o',
	'Photo & Video': 'camera',
	'Reference': 'university',
	'Social Networking': 'facebook',
	'Travel': 'plane',
	'Utilities': 'wrench',
};

const TopApp = ({ category, usage, max }) =>
  <View style={rowStyle}>
    <Icon style={logoStyle} name={ICONS[category]} size={52} color={GREY} />

    <View>
      <Text style={innerHeaderTextStyle}>{category}</Text>
      <Bar val={usage} max={max} />
      <Text style={innerSubheaderTextStyle}>{getNiceUsage(usage)}</Text>
    </View>
  </View>

TopApp.propTypes = {
  category: React.PropTypes.string.isRequired,
  usage: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default TopApp;
