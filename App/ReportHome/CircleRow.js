import React, { PropTypes } from 'react';
import { View } from 'react-native';
import Circle, { circleProps } from './Circle';

const style = {
  circleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topCircleContainer: {
    top: -48,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
};

const CircleRow = ({ top, circles }) => (
  <View style={top ? style.topCircleContainer : style.circleContainer}>
    {circles.map(c => <Circle {...c} key={c.name} />)}
  </View>
);

CircleRow.propTypes = {
  top: PropTypes.bool,
  circles: PropTypes.arrayOf(PropTypes.shape(circleProps)).isRequired,
};

export default CircleRow;
