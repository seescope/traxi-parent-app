import React, { PropTypes } from 'react';
import { NEUTRAL, WHITE, TRAXI_BLUE } from '../Constants/Colours';
import { MKButton } from 'react-native-material-kit';
import { View } from 'react-native';

const Button = ({ children, onPress, primary = true }) => {
  const BACKGROUND_COLOUR = primary ? TRAXI_BLUE : NEUTRAL;
  const TEXT_COLOUR = WHITE;

  const AndroidButton = MKButton.coloredButton()
      .withBackgroundColor(BACKGROUND_COLOUR)
      .withTextStyle({
        color: TEXT_COLOUR,
        fontWeight: 'normal',
      })
      .withText(children.toUpperCase())
      .withOnPress(onPress)
      .build();

  return (
    <View>
      <AndroidButton />
    </View>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

export default Button;
