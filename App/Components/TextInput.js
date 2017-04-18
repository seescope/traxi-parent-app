import React, { PropTypes } from 'react';
import {
  TextInput as RNTextInput,
  Dimensions,
  Platform,
  View,
} from 'react-native';

import {
  NEUTRAL,
  GREY,
  WHITE,
  NEUTRAL_WITH_OPACITY,
  TRAXI_BLUE,
  TRANSPARENT,
} from '../Constants/Colours';
import { isIOS } from '../Utils';

const { width } = Dimensions.get('window');

const androidInputStyle = {
  fontFamily: 'Raleway-Regular',
  color: GREY,
  height: 42,
  fontSize: 16,
  width: width - 64,
};

const iosInputStyle = {
  fontFamily: 'Raleway-Regular',
  color: NEUTRAL,
  paddingHorizontal: 8,
  backgroundColor: TRANSPARENT,
  height: 32,
  width: width - 64,
  borderRadius: 4,
  marginTop: 4,
};

// Border don't work on TextInput
const bottomBorder = {
  height: 2,
  backgroundColor: TRAXI_BLUE,
  marginBottom: 16,
};

const style = Platform.select({
  ios: iosInputStyle,
  android: androidInputStyle,
});

// Don't capitalise emails.
// eslint-disable-next-line
const shouldBeCapitalised = secureTextEntry =>
  secureTextEntry ? 'none' : 'words';

const TextInput = (
  {
    onChangeText,
    onSubmitEditing,
    refFunc,
    value,
    keyboardType,
    secureTextEntry,
  },
) => (
  <View>
    <RNTextInput
      ref={refFunc}
      autoCorrect={false}
      value={value}
      onSubmitEditing={onSubmitEditing}
      placeholderTextColor={isIOS ? NEUTRAL_WITH_OPACITY : WHITE}
      underlineColorAndroid={TRAXI_BLUE}
      autoCapitalize={shouldBeCapitalised(secureTextEntry)}
      style={style}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
    {isIOS && <View style={bottomBorder} />}
  </View>
);

TextInput.propTypes = {
  refFunc: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export default TextInput;
