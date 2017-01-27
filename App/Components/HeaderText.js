import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { WHITE, NEUTRAL_WITH_OPACITY } from '../Constants/Colours';
import { isIOS } from '../Utils';

const headerStyle = style => {
  const defaultStyle = {
    fontFamily: 'Raleway-ExtraBold',
    color: WHITE,
    textAlign: 'center',
    fontSize: isIOS ? 30 : 24,
    marginBottom: -2,
    backgroundColor: 'transparent',
    textShadowColor: NEUTRAL_WITH_OPACITY,
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 20,
  };

  return { ...defaultStyle, ...style };
};

const HeaderText = ({ children, style }) => (
  <Text style={headerStyle(style)}>{children}</Text>
);

HeaderText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  style: PropTypes.object,
};

export default HeaderText;
