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
  <Text style={[STYLES.BODY_TEXT, getAlignmentStyle(align)]}>{children}</Text>
);

BodyText.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
};

export default BodyText;
