import React, { PropTypes } from 'react';
import { TextInput as RNTextInput, Dimensions } from 'react-native';

import { NEUTRAL, NEUTRAL_WITH_OPACITY, WHITE } from '../Constants/Colours';
import { isIOS } from '../Utils';

const { width } = Dimensions.get('window');

const style = {
  width: width - 32,
  color: isIOS ? NEUTRAL : WHITE,
  fontWeight: 'normal',
  fontSize: isIOS ? 16 : 13,
  backgroundColor: isIOS ? '#EEE' : 'transparent',
  borderRadius: isIOS ? 6 : 0,
  height: isIOS ? 32 : 44,
  padding: isIOS ? 6 : 0,
  marginBottom: 13,
  marginHorizontal: isIOS ? 0 : 4,
};


const TextInput = ({ onChangeText, placeholder }) => (
  <RNTextInput
    autoCorrect={false}
    onSubmitEditing={() => console.log('hola')}
    placeholderTextColor={isIOS ? NEUTRAL_WITH_OPACITY : WHITE}
    underlineColorAndroid="rgba(255, 255, 255, 1)"
    autoCapitalize={'words'}
    style={style}
    onChangeText={onChangeText}
    placeholder={placeholder}
  />
);

TextInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default TextInput;
