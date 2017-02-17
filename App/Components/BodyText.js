import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import STYLES from '../Constants/Styles';

const getAlignmentStyle = align => {
  if (align === 'center') {
    return {
      textAlign: 'center',
    };
  }
  return undefined;
};

const BodyText = ({ children, align }) => (
  <Text style={[STYLES.TEXT, getAlignmentStyle(align)]}>{children}</Text>
);

BodyText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  align: PropTypes.string,
};

export default BodyText;
