import React, { PropTypes } from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { GOOD, BAD, NEUTRAL, SHADOW_COLOR } from '../Constants/Colours';

const stateColours = {
  good: GOOD,
  bad: BAD,
  neutral: NEUTRAL,
};

const getKidAvatarStyle = (size, state) =>
  StyleSheet.create({
    image: {
      height: size,
      width: size,
      borderRadius: size / 2,
      shadowColor: SHADOW_COLOR,
      shadowOffset: { height: 2 },
      shadowRadius: 5,
      marginBottom: size / 10,
      borderColor: stateColours[state],
      borderWidth: size / 20,
    },
  });

const KidAvatar = ({ avatarURL, size, state, animation, duration, iterationCount }) => (
  <Animatable.Image
    animation={animation}
    iterationCount={iterationCount}
    duration={duration}
    style={getKidAvatarStyle(size, state).image}
    source={{ uri: avatarURL }}
  />
);

KidAvatar.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  state: PropTypes.oneOf(['good', 'bad', 'neutral']),
  animation: PropTypes.string,
  iterationCount: PropTypes.string,
  duration: PropTypes.number,
};

export default KidAvatar;
