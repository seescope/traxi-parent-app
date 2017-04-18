import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { GREY } from '../Constants/Colours';
import { isIOS } from '../Utils';

const headerStyle = style => {
  const defaultStyle = {
    fontFamily: 'Raleway-ExtraBold',
    color: GREY,
    textAlign: 'center',
    fontSize: isIOS ? 26 : 24,
    backgroundColor: 'transparent',
    paddingHorizontal: 55,
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
