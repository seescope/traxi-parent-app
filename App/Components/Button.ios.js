import React, { PropTypes } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
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
      fontWeight: '200',
      fontSize: 28,
      color: colour,
    },
  };

  return (
    <TouchableOpacity onPress={onPress} style={BUTTON_STYLE.button} activeOpacity={0.6}>
      <Text style={BUTTON_STYLE.text}>{children} </Text>
      <Image source={require('../Images/chevron_right.png')} />
    </TouchableOpacity>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

export default Button;
