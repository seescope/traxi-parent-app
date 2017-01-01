import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { WHITE } from '../Constants/Colours';
import { isIOS } from '../Utils';

const headerStyle = style => {
  const defaultStyle = {
    color: WHITE,
    textAlign: 'center',
    fontWeight: isIOS ? '200' : '500',
    fontSize: isIOS ? 30 : 23,
    marginBottom: -2,
    backgroundColor: 'transparent',
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
