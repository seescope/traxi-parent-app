import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

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
    padding: 32,
  },
};

const Prompt = ({ parentName, kidName, nextStep, avatarURL }) =>
  <View style={style.container}>
    <HeaderText>Thanks{ parentName && ', ' + parentName} !</HeaderText>

    <Spacing height={32} />

    <KidAvatar
      size={204}
      avatarURL={avatarURL}
      state="neutral"
    />

    <Spacing height={32} />

    <Text style={style.bodyText}>
      Do you have {kidName}'s phone or tablet?
    </Text>

    <Spacing />

    <View style={style.buttonContainer}>
      <Button primary={false} onPress={() => Actions.notReadyYet()}>
        No
      </Button>
      <Button onPress={() => nextStep()}>
        Yes
      </Button>
    </View>
  </View>;

Prompt.propTypes = {
  parentName: React.PropTypes.string,
  kidName: React.PropTypes.string.isRequired,
  avatarURL: React.PropTypes.string.isRequired,
  nextStep: React.PropTypes.func.isRequired,
};

export default Prompt;
