import React from 'react';
import { Dimensions, View, Text, Image } from 'react-native';

import { WHITE, LIGHT_GREY, GREY } from '../../Constants/Colours';

const { width } = Dimensions.get('window');

const cardStyle = {
  borderRadius: 4,
  width: width - 16,
  backgroundColor: WHITE,
  padding: 16,
  marginBottom: 24,
	shadowColor: "#000000",
	shadowOpacity: 0.16,
	shadowRadius: 3,
	shadowOffset: {
		height: 3,
		width: 3,
	}
};

const cardHeaderStyle = {
  color: GREY,
  fontSize: 19,
};

const headerUnderlineStyle = {
  marginTop: 8,
  height: 1,
  width: 56,
  backgroundColor: LIGHT_GREY,
  marginBottom: 24,
};

const downArrowContainer = {
  alignItems: 'flex-end',
};



const Card = ({ header, children }) =>
  <View style={cardStyle}>
    <Text style={cardHeaderStyle}>{header}</Text>
    <View style={headerUnderlineStyle} />

    {children}

    <View style={downArrowContainer}>
      <Image source={require('../../Images/down-arrow.png')} />
    </View>
  </View>

Card.propTypes = {
  header: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

export default Card;
