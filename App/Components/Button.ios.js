import React, { PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { WHITE, NEUTRAL } from '../Constants/Colours';

const Button = ({ children, onPress, primary }) => {
  const colour = primary ? NEUTRAL : WHITE;

  const BUTTON_STYLE = {
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    text: {
      fontFamily: 'Raleway-Regular',
      fontSize: 20,
      color: colour,
    },
  };

  return (
    <TouchableOpacity onPress={onPress} style={BUTTON_STYLE.button} activeOpacity={0.6}>
      <Text style={BUTTON_STYLE.text}>{children} </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

export default Button;
