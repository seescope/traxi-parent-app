import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NEUTRAL, TRANSPARENT } from '../Constants/Colours';
import { isIOS } from '../Utils';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingLeft: 16,
    height: 72,
    backgroundColor: TRANSPARENT,
  },
  text: {
    backgroundColor: TRANSPARENT,
    color: NEUTRAL,
    fontWeight: isIOS ? '300' : 'normal',
    fontSize: isIOS ? 24 : 17,
  },
});

const SubHeader = ({ children }) => (
  <View style={style.container}>
    <Text style={style.text}>{children}</Text>
  </View>
);

SubHeader.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SubHeader;
