import React from 'react';
import { View } from 'react-native';

import HeaderText from '../Components/HeaderText';
import KidAvatar from '../Components/KidAvatar';
import Spacing from '../Components/Spacing';

const Prompt = ({ step, parentName, kidName, nextStep, avatarURL }) => (
  <View>
    <HeaderText>Let's get started!</HeaderText>

    <Spacing height={32} />

    <KidAvatar
      size={204}
      avatarURL={avatarURL}
    />


  </View>
);

Prompt.propTypes = {
  step: React.PropTypes.number.isRequired,
  parentName: React.PropTypes.string.isRequired,
  kidName: React.PropTypes.string.isRequired,
  avatarURL: React.PropTypes.string.isRequired,
  nextStep: React.PropTypes.func.isRequired,
};

export default Prompt;
