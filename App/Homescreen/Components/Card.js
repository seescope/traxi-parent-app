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

const timeButtonStyle = {
  flex: 1,
  height: 36,
};

export const getRows = (data = [], expanded, timePeriod) => {
  let selectedData;

  // data might be an array, or an object of arrays.
  if (Array.isArray(data)) {
    selectedData = data;
  } else {
    selectedData = data[timePeriod] || [];
  }

  return expanded ? selectedData : selectedData.slice(0, 2);
}


class Card extends React.Component {
  constructor({ data }) {
    super();

    this.state = {
      expanded: false,
      rows: getRows(data, false),
    };
  }

  toggleExpand() {
    const { data } = this.props;
    const expanded = !this.state.expanded;
    this.setState({
      expanded,
      rows: getRows(data, expanded),
    });
  }

  render() {
    const { header, Component } = this.props;
    const { rows } = this.state;

    return (
      <TouchableOpacity activeOpacity={0.8} style={cardStyle} onPress={() => this.toggleExpand()}>
        <Text style={cardHeaderStyle}>{header}</Text>
        <View style={headerUnderlineStyle} />

        <View style={timePickerStyle}>
          <TouchableOpacity style={timeButtonStyle}>
            <Text style={selectedTimeStyle}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={timeButtonStyle}>
            <Text style={deselectedTimeStyle}>Last 7 Days</Text>
          </TouchableOpacity>
        </View>

        <View>
          {rows.map((d, i) => <Component key={i} {...d} />)}
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
  Component: React.PropTypes.func.isRequired,
  data: React.PropTypes.array.isRequired,
};

export default Card;
