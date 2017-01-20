import React, { PropTypes } from 'react';
import { TextInput as RNTextInput, Dimensions, Platform } from 'react-native';

import { NEUTRAL, LIGHTEST_GREY,  WHITE } from '../Constants/Colours';
import { isIOS } from '../Utils';

const { width } = Dimensions.get('window');

const androidInputStyle = {
  color: WHITE,
  height: 42,
  width: width - 64,
};

const iosInputStyle = {
  color: NEUTRAL,
  paddingHorizontal: 8,
  height: 32,
  width: width - 64,
  backgroundColor: LIGHTEST_GREY,
  borderRadius: 4,
};

const style = Platform.select({
  ios: iosInputStyle,
  android: androidInputStyle,
});


const TextInput = ({ onChangeText }) => (
  <RNTextInput
    autoCorrect={false}
    placeholderTextColor={isIOS ? NEUTRAL_WITH_OPACITY : WHITE}
    underlineColorAndroid="rgba(255, 255, 255, 1)"
    autoCapitalize={'words'}
    style={style}
    onChangeText={onChangeText}
  />
);

TextInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
};

export default TextInput;
