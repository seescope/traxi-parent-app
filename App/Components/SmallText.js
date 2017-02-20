import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { isIOS } from '../Utils';
import { WHITE, TRANSPARENT } from '../Constants/Colours';

const style = StyleSheet.create({
  text: {
    color: WHITE,
    textAlign: 'center',
    fontWeight: isIOS ? '400' : 'normal',
    fontSize: isIOS ? 14 : 10,
    backgroundColor: TRANSPARENT,
  },
});

const SmallText = ({ children }) => <Text style={style.text}>{children}</Text>;

SmallText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default SmallText;
