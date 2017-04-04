import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
import { Text, View } from 'react-native';
// import I18n from 'react-native-i18n';

import { WHITE, TRANSPARENT } from '../Constants/Colours';

const style = {
  bodyText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: WHITE,
    backgroundColor: TRANSPARENT,
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'center',
  },
};

const SetupCompletion = () => (
  <View>
    <Text style={style.bodyText}>
      SetupCompletion
    </Text>
  </View>
);

export default SetupCompletion;
