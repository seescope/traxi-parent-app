import React, { PropTypes } from 'react';
import { View, Dimensions } from 'react-native';
import CircleRow from './CircleRow';
import Trails from './Trails';
import Background from '../Components/Background';

const { height, width } = Dimensions.get('window');

const style = {
  header: {
    padding: 16,
  },
  container: {
    minHeight: height - (width / 2),
  },
};

const Header = ({ circles }) => (
  <View style={style.header}>
    <CircleRow circles={circles} />
  </View>
);

Header.propTypes = {
  circles: PropTypes.array.isRequired,
};

const Day = ({ isToday, circles, trail }) => (
  <Background style={style.container}>
    <Header circles={circles} />
    <Trails isToday={isToday} trailSegments={trail} />
  </Background>
);

Day.propTypes = {
  day: PropTypes.string.isRequired,
  trail: PropTypes.array.isRequired,
  isToday: PropTypes.bool,
  circles: PropTypes.array.isRequired,
};

export default Day;
