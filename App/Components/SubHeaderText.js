import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { WHITE } from '../Constants/Colours';
import { isIOS } from '../Utils';

const SubHeaderStyle = {
  text: {
    color: WHITE,
    textAlign: 'left',
    fontWeight: '300',
    fontSize: isIOS ? 20 : 15,
    margin: 0,
    backgroundColor: 'transparent',
  },
};

const SubHeaderText = ({ style, children }) => {
  const textStyle = { ...SubHeaderStyle.text, ...style };
  return <Text style={textStyle}>{children}</Text>;
};

SubHeaderText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  style: PropTypes.object,
};

export default SubHeaderText;
