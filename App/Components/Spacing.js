import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

const getStyle = (height = 24) =>
  StyleSheet.create({
    spacing: {
      height,
    },
  });


const Spacing = ({ height }) =>
  <View style={getStyle(height).spacing} />;

Spacing.propTypes = {
  height: PropTypes.number,
};

export default Spacing;
