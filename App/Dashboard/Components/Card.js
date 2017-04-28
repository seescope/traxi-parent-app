// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import lodash from 'lodash';
import analytics from 'react-native-analytics';

import { LIGHT_GREY, GREY, TRAXI_BLUE } from '../../Constants/Colours';
import STYLES from '../../Constants/Styles';
import LoadingIndicator from '../../Components/LoadingIndicator';

import type { CardData, ReportItem } from '../../Reducers/Reports';

type TimePeriod = 'today' | 'week' | 'yesterday';

type Props = {
  header: string,
  Component: () => any,
  data: CardData,
  loading: boolean,
};

type State = {
  timePeriod: TimePeriod,
  expanded: boolean,
};

// $FlowFixMe
const DOWN_ARROW = require('../../Images/down-arrow.png');

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
  height: 32,
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
};

const timePickerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
};

const selectedTimeStyle = {
  fontSize: 15,
  fontWeight: '400',
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

export const getRows = (
  data: CardData,
  expanded: boolean,
  timePeriod: TimePeriod,
) => {
  let selectedData;

  // data might be an array, or an object of arrays.
  if (Array.isArray(data)) {
    selectedData = data;
  } else {
    selectedData = data[timePeriod] || [];
  }

  return expanded ? selectedData : selectedData.slice(0, 2);
};

export const getMax = (data: Array<ReportItem>): number =>
  lodash.chain(data).map(d => d.usage).max().value();

const getTimeStyle = (currentTimePeriod, timePeriod) =>
  currentTimePeriod === timePeriod ? selectedTimeStyle : deselectedTimeStyle;

const arrowStyle = {
  height: 16,
  width: 16,
};

const getArrowStyle = expanded =>
  expanded && { transform: [{ rotate: '-180deg' }] };

class Card extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      timePeriod: 'today',
      expanded: false,
    };
  }

  state: State;

  toggleExpand() {
    analytics.track('Card expanded');
    const expanded = !this.state.expanded;

    this.setState({
      expanded,
    });
  }

  switchTimePeriod(timePeriod: TimePeriod) {
    analytics.track('Switched time period', { timePeriod });

    this.setState({
      timePeriod,
    });
  }

  render() {
    const { header, Component, data, loading } = this.props;
    const { timePeriod, expanded } = this.state;
    const maxRows = getRows(data, true, timePeriod);
    const rows = getRows(data, expanded, timePeriod);
    const max = getMax(rows);

    const shouldShowTimeSelector = !Array.isArray(data);

    return (
      <View style={STYLES.CARD}>
        <Text style={cardHeaderStyle}>{header}</Text>
        <View style={headerUnderlineStyle} />

        {shouldShowTimeSelector &&
          <View style={timePickerStyle}>
            <TouchableOpacity
              style={timeButtonStyle}
              onPress={() => this.switchTimePeriod('today')}
            >
              <Text style={getTimeStyle('today', timePeriod)}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={timeButtonStyle}
              onPress={() => this.switchTimePeriod('yesterday')}
            >
              <Text style={getTimeStyle('yesterday', timePeriod)}>
                Yesterday
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={timeButtonStyle}
              onPress={() => this.switchTimePeriod('week')}
            >
              <Text style={getTimeStyle('week', timePeriod)}>Last 7 Days</Text>
            </TouchableOpacity>
          </View>}

        <View>
          {loading &&
            <LoadingIndicator color={GREY}>Loading...</LoadingIndicator>}
          {!loading &&
            (rows.length > 0
              ? rows.map((d, i) => <Component max={max} key={i} {...d} />)
              : <Text style={deselectedTimeStyle}>No data to display</Text>)}
        </View>

        <TouchableOpacity onPress={() => this.toggleExpand()}>
          <View style={downArrowContainer}>
            {maxRows.length > 2 &&
              <Image
                style={[arrowStyle, getArrowStyle(this.state.expanded)]}
                source={DOWN_ARROW}
              />}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Card;
