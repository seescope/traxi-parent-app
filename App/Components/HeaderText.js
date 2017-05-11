import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { GREY } from '../Constants/Colours';
import { isIOS, isSmallScreen } from '../Utils';

const fontSize = (() => {
  if (isIOS && !isSmallScreen) return 26;
  if (!isIOS && !isSmallScreen) return 24;

  return 20;
})();

const headerStyle = style => {
  const defaultStyle = {
    fontFamily: 'Raleway-ExtraBold',
    color: GREY,
    textAlign: 'center',
    fontSize,
    backgroundColor: 'transparent',
  };

  return { ...defaultStyle, ...style };
};

const HeaderText = ({ children, style }) => (
  <Text style={headerStyle(style)}>{children}</Text>
);

HeaderText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  style: PropTypes.object,
};

export default HeaderText;
