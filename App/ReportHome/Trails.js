import React, { PropTypes } from 'react';
import { View } from 'react-native';
import TrailSegment from './TrailSegment';
import InterTrailLine from './InterTrailLine';
import { getTrailColours } from './Utils';

/**
 * Render a list of TrailSegments.
 *
 * Of note is the fact that we render the first TrailSegment FIRST, before the rest of the trail.
 * This is because we need to render an InterTrailLine between each TrailSegment.
**/
const Trails = ({ trailSegments, isToday }) => (
  <View>
    <TrailSegment
      colours={getTrailColours(trailSegments, 0)}
      isToday={isToday}
      {...trailSegments[0]}
    />
    {trailSegments
      .slice(1)
      .map((trailSegment, i) => [
        <InterTrailLine lastItem={trailSegments[i].trailItems.length - 1} />,
        (
          <TrailSegment
            colours={getTrailColours(trailSegments, i + 1)}
            isToday={isToday}
            key={i}
            {...trailSegment}
          />
        ),
      ])}
  </View>
);

Trails.propTypes = {
  trailSegments: PropTypes.array.isRequired,
  isToday: PropTypes.bool.isRequired,
};

export default Trails;
