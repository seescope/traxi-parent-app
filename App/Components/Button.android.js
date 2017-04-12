import React, { PropTypes } from 'react';
import { NEUTRAL, WHITE, TRAXI_BLUE } from '../Constants/Colours';
import { MKButton } from 'react-native-material-kit';
import { View } from 'react-native';

const buttonStyle = { marginHorizontal: 16 };

const Button = ({ children, onPress, primary }) => {
  const BACKGROUND_COLOUR = primary ? TRAXI_BLUE : NEUTRAL;
  const TEXT_COLOUR = WHITE;

  const AndroidButton = MKButton.coloredButton()
    .withBackgroundColor(BACKGROUND_COLOUR)
    .withTextStyle({
      fontFamily: 'Raleway-Bold',
      color: TEXT_COLOUR,
    })
    .withText(children)
    .withOnPress(onPress)
    .build();

  return (
    <View style={buttonStyle}>
      <AndroidButton />
    </View>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

export default Button;
