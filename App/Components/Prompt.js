import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Intercom from 'react-native-intercom';

import HeaderText from '../Components/HeaderText';
import KidAvatar from '../Components/KidAvatar';
import Spacing from '../Components/Spacing';
import Button from '../Components/Button';
import { WHITE, TRANSPARENT } from '../Constants/Colours';

const { width } = Dimensions.get('window');

const style = {
  container: {
    alignItems: 'center',
  },
  bodyText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: WHITE,
    textAlign: 'center',
    backgroundColor: TRANSPARENT,
  },
  buttonContainer: {
    width: width - 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

const getHeaderText = (step, parentName, kidName) => {
  const HEADER_TEXT = [
    `Looking good, ${parentName}!`,
    `Go to www.gettraxi.com on ${kidName}'s device`,
  ];

  return HEADER_TEXT[step];
};

const getSubHeaderText = (step, kidName) => {
  const SUBHEADER_TEXT = [
    `Do you have ${kidName}'s phone or tablet?`,
    `Open a web browser on ${kidName}'s phone or tablet and go to the website www.gettraxi.com`,
  ];

  return SUBHEADER_TEXT[step];
};

const getPrimaryButtonText = (step, kidName) => {
  const PRIMARY_BUTTON_TEXT = [
    `I have ${kidName}'s device`,
    'Next step',
  ];

  return PRIMARY_BUTTON_TEXT[step];
};

const SECONDARY_BUTTON_TEXT = [
  'No I don\'t',
  'I need help',
];

const getSecondaryButton = step => {
  if (step === 0) Actions.notReadyYet();
  else Intercom.displayMessageComposer();
};

const Prompt = ({ step, parentName, kidName, nextStep, avatarURL }) => (
  <View style={style.container}>
    <HeaderText>{getHeaderText(step, parentName, kidName)}</HeaderText>

    <Spacing height={32} />

    <KidAvatar
      size={204}
      avatarURL={avatarURL}
      state="neutral"
    />

    <Spacing height={32} />

    <Text style={style.bodyText}>
      {getSubHeaderText(step, kidName)}
    </Text>

    <Spacing />

    <View style={style.buttonContainer}>
      <Button primary={false} onPress={() => getSecondaryButton(step)}>
        {SECONDARY_BUTTON_TEXT[step]}
      </Button>
      <Button onPress={() => nextStep()}>
        {getPrimaryButtonText(step, kidName)}
      </Button>
    </View>
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
