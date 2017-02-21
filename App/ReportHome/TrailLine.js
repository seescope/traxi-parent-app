import React, { PropTypes } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { DARK_GREY } from '../Constants/Colours';
import PILL_INDENTS from '../Constants/PillIndents';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  trailLine: {
    top: -8,
    marginBottom: -72,
    zIndex: 0,
  },
});

const TrailLine = ({ index }) => {
  const startIndentation = PILL_INDENTS[index % PILL_INDENTS.length];
  const endIndentation = PILL_INDENTS[(index + 1) % PILL_INDENTS.length];
  const d = `M${startIndentation + 136 / 2 - 8},0
             Q${startIndentation + 136 / 2 - 8},60 ${16 +
    endIndentation +
    136 / 2},60`;

  return (
    <Svg width={width} height={72} style={style.trailLine}>
      <Path
        strokeDasharray={[24, 16]}
        strokeWidth={6}
        d={d}
        stroke={DARK_GREY}
        fillOpacity={0}
      />
    </Svg>
  );
};

TrailLine.propTypes = {
  index: PropTypes.number.isRequired,
};

export default TrailLine;
