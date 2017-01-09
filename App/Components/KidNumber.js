import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import { isIOS } from '../Utils';

const KidNumberStyle = StyleSheet.create({
  text: {
    color: WHITE,
    textAlign: 'center',
    fontFamily: 'Raleway-Light',
    fontSize: isIOS ? 17 : 12,
    backgroundColor: TRANSPARENT,
  },
});

const KidNumber = ({ children }) => (
  <Text style={KidNumberStyle.text}>{children}</Text>
);

KidNumber.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default KidNumber;
