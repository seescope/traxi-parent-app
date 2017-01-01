import React, { PropTypes } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { isIOS, getAppNiceName } from '../Utils';

import {
  TRANSPARENT,
  WHITE,
  NEUTRAL,
} from '../Constants/Colours';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
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
    width: 96,
    marginVertical: -2,
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
    fontSize: isIOS ? 21 : 18,
    fontWeight: isIOS ? '200' : '500',
    backgroundColor: TRANSPARENT,
    width: (width / 2) - 32,
    marginLeft: 16,
    color: WHITE,
  },
});

const TrailHeader = ({ segmentName, name, logo, timeStamp, minutesUsed }) => (
  <View style={style.pillRow}>
    {segmentName && <Text style={style.trailHeaderText}>{segmentName}</Text>}
    <View style={style.pill}>
      <Text style={style.appSubHeader}>{timeStamp.format('h:mmA')}</Text>
      <Text style={style.appHeader}>{getAppNiceName(name)}</Text>
      <Text style={style.appSubHeader}>{minutesUsed} minutes</Text>
    </View>
    <Image elevation={11} style={style.appIcon} source={{ uri: logo }} />
  </View>
);

TrailHeader.propTypes = {
  minutesUsed: PropTypes.number.isRequired,
  timeStamp: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  segmentName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default TrailHeader;
