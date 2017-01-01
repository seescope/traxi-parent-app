import React, { PropTypes } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Circle from './Circle';
import HeaderText from '../Components/HeaderText';
import { relativeDate } from '../Utils';
const { width } = Dimensions.get('window');

const style = {
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
  },
  text: {
    textAlign: 'left',
  },
};

const DaySummary = ({ date, circles }) => (
  <TouchableOpacity onPress={() => Actions.dayView({ date })}>
    <View style={style.container}>
      <HeaderText style={style.text}>{relativeDate(date)}</HeaderText>
      <Circle {...circles[1]} />
    </View>
  </TouchableOpacity>
);

DaySummary.propTypes = {
  date: PropTypes.string.isRequired,
  circles: PropTypes.array.isRequired,
};

export default DaySummary;
