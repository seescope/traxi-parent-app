import React, { PropTypes } from 'react';
import { View, Image, Text } from 'react-native';
import Svg, { Circle as SVGCircle } from 'react-native-svg';
import { isIOS } from '../Utils';

import {
  BAD,
  WHITE,
  NEUTRAL,
  TRANSPARENT,
  GOOD,
} from '../Constants/Colours';

const style = {
  outerCircle: {
    paddingTop: 6,
    width: 96,
    height: 96,
  },
  circle: {
    height: 84,
    width: 84,
    backgroundColor: WHITE,
    borderRadius: 42,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: GOOD,
    left: 6,
  },
  circleHeaderText: {
    backgroundColor: TRANSPARENT,
    fontWeight: 'bold',
    fontSize: isIOS ? 23 : 33,
  },
  circleSubHeaderText: {
    backgroundColor: TRANSPARENT,
    fontWeight: '200',
    fontSize: isIOS ? 12 : 9,
    color: NEUTRAL,
  },
  circleDonut: {
    transform: [{ rotate: '-90deg' }],
    top: -90,
    zIndex: 1,
  },
};

const getCircleHeaderStyle = status => ({
  ...style.circleHeaderText,
  color: status === 'good' ? GOOD : BAD,
});

const images = {
  'Late Night': require('../Images/late_night.png'),
  'Social Time': require('../Images/social.png'),
  'Device Time': require('../Images/device_time.png'),
};

const limits = {
  'Late Night': 1,
  'Social Time': 60,
  'Device Time': 120,
};

const getCircleStroke = (name, minutesUsed) => {
  if (name === 'Late Night' || minutesUsed === 0) return [151, 151];

  const limit = limits[name];
  const stroke = 151 * (minutesUsed / limit);
  return [stroke, 151];
};

const prettyTime = minutesUsed => {
  if (minutesUsed > 60) {
    const hours = Math.round(minutesUsed / 60);
    return `${hours}h`;
  }

  return `${minutesUsed}m`;
};

const Circle = ({ name, status, minutesUsed }) => (
  <View style={style.outerCircle} elevation={11}>
    <Image style={style.circle} source={images[name]}>
      <Text style={getCircleHeaderStyle(status)}>{prettyTime(minutesUsed)}</Text>
      <Text style={style.circleSubHeaderText}>{name}</Text>
    </Image>
    <Svg width={96} height={96} style={style.circleDonut}>
      <SVGCircle r="48" cx="48" cy="48" fill={NEUTRAL} />
      <SVGCircle
        r="24"
        cx="48"
        cy="48"
        strokeWidth={48}
        fill={NEUTRAL}
        stroke={status === 'good' ? GOOD : BAD}
        strokeDasharray={getCircleStroke(name, minutesUsed)}
      />
    </Svg>
  </View>
);

export const circleProps = {
  name: PropTypes.oneOf(['Late Night', 'Device Time', 'Social Time']),
  status: PropTypes.oneOf(['good', 'bad']),
  minutesUsed: PropTypes.number,
};

Circle.propTypes = circleProps;

export default Circle;
