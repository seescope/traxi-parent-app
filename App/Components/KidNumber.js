import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
import { isIOS } from '../Utils';

const KidNumberStyle = StyleSheet.create({
  text: {
    color: WHITE,
    textAlign: 'center',
    fontWeight: '300',
    fontSize: isIOS ? 17 : 12,
    backgroundColor: TRANSPARENT,
  },
});

const formatNumber = (number) =>
    `0${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9, 12)}`;

const KidNumber = ({ children }) => (
  <Text style={KidNumberStyle.text}>{formatNumber(children)}</Text>
);

KidNumber.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default KidNumber;
