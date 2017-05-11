import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { isSmallScreen } from '../Utils';

const heightModifier = isSmallScreen ? 0.5 : 1;

const getStyle = (height = 24) =>
  StyleSheet.create({
    spacing: {
      height: height * heightModifier,
    },
  });

const Spacing = ({ height }) => <View style={getStyle(height).spacing} />;

Spacing.propTypes = {
  height: PropTypes.number,
};

export default Spacing;
