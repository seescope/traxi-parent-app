import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import STYLES from '../Constants/Styles';

const BodyText = ({ children }) => (
  <Text style={STYLES.TEXT}>{children}</Text>
);

BodyText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default BodyText;
