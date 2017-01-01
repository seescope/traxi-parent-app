import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import { isIOS } from '../Utils';

const KidNameStyle = StyleSheet.create({
  text: {
    color: WHITE,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: isIOS ? 19 : 14,
    backgroundColor: TRANSPARENT,
  },
});

const KidName = ({ children }) => (
  <Text style={KidNameStyle.text}>{children}</Text>
);

KidName.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default KidName;
