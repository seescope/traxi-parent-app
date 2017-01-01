import React from 'react';
import Background from '../Components/Background';

import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import BodyText from '../Components/BodyText';
import { WHITE } from '../Constants/Colours';

const headerStyle = {
  color: WHITE,
  marginBottom: 16,
};


const KidReport = () => (
  <Background>
    <HeaderText style={headerStyle}>traxi is now running</HeaderText>

    <BodyText>Your device is being monitored for inappropriate content.</BodyText>

    <Spacing />

    <BodyText>You can now close the app.</BodyText>
  </Background>
);

export default KidReport;
