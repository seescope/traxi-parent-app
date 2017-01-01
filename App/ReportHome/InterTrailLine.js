import React, { PropTypes } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { DARK_GREY } from '../Constants/Colours';
import PILL_INDENTS from '../Constants/PillIndents';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  interTrailLine: {
    top: -16,
    marginBottom: -84,
    zIndex: -2,
  },
});

const InterTrailLine = ({ lastItem }) => {
  const startIndentation = PILL_INDENTS[lastItem % PILL_INDENTS.length];
  const d = `M${16 + startIndentation + (136 / 2)},0
             Q${16 + startIndentation + (136 / 2)},72 ${(width / 2) + (136 / 2)},72`;

  return (
    <Svg width={width} height={84} style={style.interTrailLine}>
      <Path
        strokeDasharray={[24, 16]}
        d={d}
        strokeWidth={6}
        stroke={DARK_GREY}
        fillOpacity={0}
      />
    </Svg>
  );
};

InterTrailLine.propTypes = {
  lastItem: PropTypes.number.isRequired,
};

export default InterTrailLine;
