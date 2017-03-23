import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import Svg, { Circle as SVGCircle } from 'react-native-svg';

import { WHITE, TRAXI_BLUE, TRANSPARENT } from '../../Constants/Colours';

const containerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const { width } = Dimensions.get('window');
const testKid = {
  "UUID" : "2628211b-0ce1-4593-ac3a-d2df35c10419",
  "avatarURL" : "https://avatars1.githubusercontent.com/u/2022375",
  "deviceType" : "Android",
  "name" : "Kane",
  "setupID" : 5406,
  "status" : "INSTALLED"
};

const circleSize = width - 16;

const circleStyle = {
  width: circleSize + 8,
  height: circleSize + 8,
  transform: [{ rotate: '-90deg' }],
};

const kidAvatarSize = width - 32;

const usageOverlayStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: kidAvatarSize,
  width: kidAvatarSize,
  top: -circleSize + 6,
  left: -2,
  marginBottom: -circleSize + 8,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  borderRadius: kidAvatarSize / 2,
};

const kidAvatar = {
  height: kidAvatarSize,
  width: kidAvatarSize,
  borderRadius: kidAvatarSize / 2,
  top: -circleSize + 6,
  left: -2,
  marginBottom: -kidAvatarSize,
};

const overlayTextHeaderStyle = {
  fontSize: 96,
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontWeight: '100',
};

const overlayTextSubheaderStyle = {
  fontSize: 19,
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontWeight: '200',
};

const MAX_TIME_ALLOWED = 120; // 2 Hours.

export const getStrokeOffset = (minutesUsed, circleCircumference) => {
  const percentage = minutesUsed / MAX_TIME_ALLOWED;
  return circleCircumference * percentage;
};

export const getNiceTimeUsed = (minutesUsed) =>
  (minutesUsed >= 60
    ? minutesUsed / 60
    : minutesUsed);

// Basic maths.
const circleRadius = circleSize / 2;

// Use this to determine the stroke around the circle. The offset will be used to control how much of the circle is filled in.
const circleCircumference = Math.PI * (circleRadius * 2);

// NOTE:
// Because the stroke extends the size of the circle, there's a bit of weirfness here.
// The height and width must be extended by 4 to allow room for the stroke.
// cx and cy are then incremented by 2 because of the change in the bounding box.

const KidCircle = ({ minutesUsed }) =>
  <View style={containerStyle}>
    <Svg width={circleSize + 4} height={circleSize + 4} style={circleStyle}>
      <SVGCircle
        r={circleRadius}
        cx={circleSize / 2 + 2}
        cy={circleSize / 2 + 2}
        fill={TRANSPARENT}
        strokeWidth={4}
        stroke={TRAXI_BLUE}
        strokeDasharray={[circleCircumference]}
        strokeDashoffset={getStrokeOffset(minutesUsed, circleCircumference)}
      />
    </Svg>

    <Image style={kidAvatar} source={{ uri: testKid.avatarURL }} />

    <View style={usageOverlayStyle}>
      <Text style={overlayTextHeaderStyle}>{getNiceTimeUsed(minutesUsed)}</Text>
      <Text style={overlayTextSubheaderStyle}>hours online today</Text>
    </View>
  </View>

KidCircle.propTypes = {
  minutesUsed: React.PropTypes.number.isRequired,
};

export default KidCircle;
