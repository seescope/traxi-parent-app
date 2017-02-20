import React, { PropTypes } from 'react';
import { Dimensions, Text, View, Image } from 'react-native';

import { WHITE, NEUTRAL, NEUTRAL_WITH_OPACITY } from '../Constants/Colours';
import PILL_INDENTS from '../Constants/PillIndents';
import { isIOS, getAppNiceName } from '../Utils';

const { width } = Dimensions.get('window');
const style = {
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    width,
    marginVertical: 8,
    zIndex: 2,
  },
  pill: {
    paddingLeft: 8,
    justifyContent: 'center',
    height: 72,
    width: 136,
    backgroundColor: NEUTRAL,
    borderRadius: 4,
    zIndex: 5,
    elevation: 8,
  },
  appHeader: {
    color: WHITE,
    marginVertical: -2,
    width: 96,
    fontSize: isIOS ? 14 : 12,
  },
  appSubHeader: {
    color: WHITE,
    opacity: 0.6,
    fontSize: isIOS ? 12 : 9,
  },
  appIcon: {
    left: -36,
    zIndex: 100,
    height: 64,
    width: 64,
    borderRadius: 8,
  },
  trailHeaderText: {
    width: width / 2 - 32,
    marginLeft: 16,
    color: NEUTRAL_WITH_OPACITY,
  },
};

const getPillStyle = index => ({
  ...style.pill,
  marginLeft: PILL_INDENTS[(index + 1) % PILL_INDENTS.length],
});

const TrailItem = ({ index, name, logo, timeStamp, minutesUsed }) => (
  <View style={style.pillRow}>
    <View style={getPillStyle(index)}>
      <Text style={style.appSubHeader}>{timeStamp.format('h:mmA')}</Text>
      <Text style={style.appHeader}>{getAppNiceName(name)}</Text>
      <Text style={style.appSubHeader}>{minutesUsed} minutes</Text>
    </View>
    <Image elevation={11} style={style.appIcon} source={{ uri: logo }} />
  </View>
);

TrailItem.propTypes = {
  timeStamp: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  minutesUsed: PropTypes.number.isRequired,
};

export default TrailItem;
