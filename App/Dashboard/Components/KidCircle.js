import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import Svg, { Circle as SVGCircle } from 'react-native-svg';

import { WHITE, TRAXI_BLUE, TRANSPARENT } from '../../Constants/Colours';

const containerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const { width } = Dimensions.get('window');

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
  marginBottom: -circleSize + 16,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  borderRadius: kidAvatarSize / 2,
};

const kidAvatar = {
  height: kidAvatarSize,
  width: kidAvatarSize,
  borderRadius: kidAvatarSize / 2,
  top: -circleSize + 6,
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

const usageTextContainerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

// Basic maths.
const circleRadius = circleSize / 2;

// Use this to determine the stroke around the circle. The offset will be used to control how much of the circle is filled in.
const circleCircumference = Math.PI * (circleRadius * 2);

const MAX_TIME_ALLOWED = 120; // 2 Hours.

export const getStrokeOffset = usage => {
  if (usage >= MAX_TIME_ALLOWED) return 0;

  const percentage = usage / MAX_TIME_ALLOWED;

  // Mother. Fucking. Maths.
  return (1 - percentage) / 1 * circleCircumference;
};

export const getNiceTimeUsed = usage =>
  usage >= 60 ? (usage / 60).toFixed(1) : usage;

export const getNiceTimeUnit = usage => {
  if (usage === 1) return 'minute';
  else if (usage < 60) return 'minutes';
  else if (usage === 60) return 'hour';

  return 'hours';
};

// NOTE:
// Because the stroke extends the size of the circle, there's a bit of weirfness here.
// The height and width must be extended by 4 to allow room for the stroke.
// cx and cy are then incremented by 2 because of the change in the bounding box.
const UsageText = ({ usage }) => (
  <View style={usageTextContainerStyle}>
    <Text style={overlayTextHeaderStyle}>{getNiceTimeUsed(usage)}</Text>
    <Text style={overlayTextSubheaderStyle}>
      {getNiceTimeUnit(usage)} online today
    </Text>
  </View>
);

UsageText.propTypes = {
  usage: React.PropTypes.number.isRequired,
};

const KidCircle = ({ kid, usage, loading }) => (
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
        strokeDashoffset={getStrokeOffset(usage, circleCircumference)}
      />
    </Svg>

    <Image style={kidAvatar} source={{ uri: kid.avatarURL }} />

    <View style={usageOverlayStyle}>
      {loading
        ? <Text style={overlayTextSubheaderStyle}>Loading..</Text>
        : <UsageText usage={usage} />}
    </View>
  </View>
);

KidCircle.propTypes = {
  kid: React.PropTypes.object.isRequired,
  usage: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool.isRequired,
};

export default KidCircle;
