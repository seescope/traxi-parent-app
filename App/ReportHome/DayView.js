import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import KidTile from './KidTile';
import Day from './Day';
import { relativeDate, isToday } from '../Utils';
import HeaderText from '../Components/HeaderText';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    width,
  },
});

const DayView = ({ kid, report, date }) => (
  <ScrollView style={style.container}>
    <KidTile kid={kid} onPress={() => Actions.pop()}>
      <Image source={require('../Images/chevron_left.png')} />
      <HeaderText>{relativeDate(date)}</HeaderText>
    </KidTile>
    {report && <Day
      day={date}
      isToday={isToday(date)}
      trail={report.trail}
      circles={report.circles}
    />}
  </ScrollView>
);

DayView.propTypes = {
  report: PropTypes.object.isRequired,
  kid: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  kid: state.selectedKid,
  report: state.reports[state.selectedKid.UUID][ownProps.date],
  date: ownProps.date,
});

export default connect(mapStateToProps)(DayView);
