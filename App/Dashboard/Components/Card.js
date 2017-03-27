import React from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import lodash from 'lodash';

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
  flex: 1,
  height: 16,
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
  height: 24,
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

export const getMax = (data = {}) =>
  lodash.chain(data)
    .map(d => d.minutesUsed)
    .max()
    .value();

const getTimeStyle = (currentTimePeriod, timePeriod) =>
  (currentTimePeriod === timePeriod
    ? selectedTimeStyle
    : deselectedTimeStyle);

const getArrowStyle = expanded =>
  expanded && { transform: [{ rotate: '-180deg' }] };

class Card extends React.Component {
  constructor({ data }) {
    super();

    this.state = {
      timePeriod: 'today',
      expanded: false,
      rows: getRows(data, false, 'today'),
    };
  }

  toggleExpand() {
    const { data } = this.props;
    const expanded = !this.state.expanded;
    const timePeriod = this.state.timePeriod;

    this.setState({
      expanded,
      rows: getRows(data, expanded, timePeriod),
    });
  }

  switchTimePeriod(timePeriod) {
    this.setState({
      timePeriod,
      rows: getRows(this.props.data, false, timePeriod),
    });
  }

  render() {
    const { header, Component, data } = this.props;
    const { rows, timePeriod } = this.state;
    const max = getMax(rows);

    const shouldShowTimeSelector = !Array.isArray(data);

    return (
      <View style={cardStyle}>
        <Text style={cardHeaderStyle}>{header}</Text>
        <View style={headerUnderlineStyle} />

        {shouldShowTimeSelector && <View style={timePickerStyle}>
          <TouchableOpacity style={timeButtonStyle} onPress={() => this.switchTimePeriod('today')}>
            <Text style={getTimeStyle('today', timePeriod)}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={timeButtonStyle} onPress={() => this.switchTimePeriod('week')}>
            <Text style={getTimeStyle('week', timePeriod)}>Last 7 Days</Text>
          </TouchableOpacity>
        </View>}

        <View>
          {rows.map((d, i) => <Component max={max} key={i} {...d} />)}
        </View>

        <TouchableOpacity onPress={() => this.toggleExpand()}>
          <View style={downArrowContainer}>
            <Image style={getArrowStyle(this.state.expanded)} source={require('../../Images/down-arrow.png')} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

Card.propTypes = {
  header: React.PropTypes.string.isRequired,
  Component: React.PropTypes.func.isRequired,
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired
};

export default Card;
