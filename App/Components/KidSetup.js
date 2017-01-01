import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../Components/Button';
import Background from '../Components/Background';
import HeaderText from '../Components/HeaderText';
import BodyText from '../Components/BodyText';
import startVPN from '../Actions/StartVPN';
import STYLES from '../Constants/Styles';
import { WHITE } from '../Constants/Colours';

const onPress = (UUID) => startVPN(UUID)
      .then(() => Actions.kidReports())
      .catch(e => console.error(e));

const headerStyle = {
  color: WHITE,
  marginBottom: 16,
};

const KidSetup = ({ UUID }) => (
  <Background>
    <HeaderText style={headerStyle}>Welcome to traxi!</HeaderText>

    <BodyText>
      traxi will now monitor your phone’s activity and
      report it back to your parents.
    </BodyText>

    <BodyText>
      By the way - just in case you accidentally uninstall
      the app, we’ll notify you and your parents to let
      them know the app was removed so it can be set
      up again.
    </BodyText>

    <View style={STYLES.SPACING} />

    <Button onPress={() => onPress(UUID)}>OK, Got it</Button>
  </Background>
);

KidSetup.propTypes = {
  UUID: PropTypes.string.isRequired,
};

export default KidSetup;
