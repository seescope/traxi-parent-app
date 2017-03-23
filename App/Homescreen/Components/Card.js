import React from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';

import { WHITE, LIGHT_GREY, GREY, TRAXI_BLUE } from '../../Constants/Colours';

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
	},
  flex: 1,
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


const timePickerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
};

const selectedTimeStyle = {
  fontSize: 15,
  fontWeight: '200',
  color: TRAXI_BLUE,
  textAlign: 'center',
  flex: 1,
};

const deselectedTimeStyle = {
  fontSize: 15,
  fontWeight: '200',
  textAlign: 'center',
  flex: 1,
};

export const getContainerStyle = expanded => ({
  height: !expanded && 72, // rowStyle.height + rowStyle.marginBottom
  overflow: 'hidden',
});


class Card extends React.Component {
  constructor() {
    super();

    this.expanded = false;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  render() {
    const { header, children } = this.props;
    return (
      <TouchableOpacity style={cardStyle} onPress={() => this.toggleExpand()}>
        <Text style={cardHeaderStyle}>{header}</Text>
        <View style={headerUnderlineStyle} />

        <View style={timePickerStyle}>
          <Text style={selectedTimeStyle}>Today</Text>
          <Text style={deselectedTimeStyle}>Last 7 Days</Text>
        </View>

        <View style={getContainerStyle(this.expanded)}>
          {children}
        </View>

        <View style={downArrowContainer}>
          <Image source={require('../../Images/down-arrow.png')} />
        </View>
      </TouchableOpacity>
    );
  }
}

Card.propTypes = {
  header: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

export default Card;
