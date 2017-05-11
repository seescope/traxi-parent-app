import React, { PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { TRAXI_BLUE } from '../Constants/Colours';
import { isSmallScreen } from '../Utils';

const sizeModifier = isSmallScreen ? 0.7 : 1;

const Button = ({ children, onPress, primary = false }) => {
  const fontSize = (primary ? 20 : 14) * sizeModifier;

  const BUTTON_STYLE = {
    button: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    text: {
      fontFamily: 'Raleway-Regular',
      fontSize,
      color: TRAXI_BLUE,
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={BUTTON_STYLE.button}
      activeOpacity={0.6}
    >
      <Text style={BUTTON_STYLE.text}>{children} </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  primary: PropTypes.bool,
};

export default Button;
