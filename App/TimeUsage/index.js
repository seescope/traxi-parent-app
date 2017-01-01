/* eslint global-require: "off" */

import React, { PropTypes } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import Header from './Header';
import UsageItems from './UsageItems';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

const STYLE = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    alignItems: 'flex-start',
  },
});


export const TimeUsageComponent = ({ kid, date, report }) => (
  <Image source={require('../Images/background.jpg')} style={STYLE.container}>
    <Header date={date} kid={kid} />
    <UsageItems report={report} />
  </Image>
);

TimeUsageComponent.propTypes = {
  kid: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  report: PropTypes.array.isRequired,
};

export default connect((state, ownProps) => (
  {
    kid: state.selectedKid,
    date: ownProps.date,
    report: ownProps.report,
  }
))(TimeUsageComponent);
