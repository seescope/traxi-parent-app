import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Keyboard, Text, View } from 'react-native';
import I18n from 'react-native-i18n';

import { enterKidName, NEXT_STEP } from '../Actions/Actions';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
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

export const setKidName = kidName =>
  dispatch => dispatch(enterKidName(kidName));

export const nextStep = () => dispatch => {
  Keyboard.dismiss();
  dispatch(NEXT_STEP);
};

const SetName = ({ onChangeText, onPress }) => (
  <View>
    <HeaderText>{I18n.t('setName.header')}</HeaderText>

    <Spacing height={32} />

    <Text style={style.bodyText}>
      {I18n.t('setName.kidsName')}
    </Text>

    <Spacing height={16} />

    <TextInput
      refFunc={ref => {
        this.textInput = ref;
      }}
      onChangeText={onChangeText}
      onSubmitEditing={() => onPress()}
    />

    <Spacing />

    <View style={style.buttonContainer}>
      <Button onPress={() => onPress()}>{I18n.t('general.nextStep')}</Button>
    </View>
  </View>
);

SetName.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  parentName: state.parentName,
});

const mapDispatchToProps = {
  onChangeText: setKidName,
  onPress: nextStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetName);
