import React, { PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';

import TrailHeader from './TrailHeader';
import TrailLine from './TrailLine';
import TrailItem from './TrailItem';

const style = StyleSheet.create({
  trailContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});

const TrailSegment = ({ trailItems, name, isToday }) => (
  <View style={style.trailContainer}>
    <TrailHeader segmentName={isToday ? `${name}` : name} {...trailItems[0]} />
    {trailItems
      .slice(1)
      .map((t, i) => [
        <TrailLine index={i} />,
        <TrailItem key={i} index={i} {...t} />,
      ])}
  </View>
);

TrailSegment.propTypes = {
  name: PropTypes.string.isRequired,
  isToday: PropTypes.bool.isRequired,
  trailItems: PropTypes.array.isRequired,
};

export default TrailSegment;
