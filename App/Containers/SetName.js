import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Keyboard, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { enterKidName } from '../Actions/Actions';
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
  innerContainer: {
    flex: 4,
  },
  buttonContainer: {
    alignItems: 'center',
  },
};

export const setKidName = kidName => dispatch => dispatch(enterKidName(kidName));

const nextStep = () => {
  Keyboard.dismiss();
  Actions.setImage();
};

const SetName = ({ onChangeText }) => (
  <View style={style.container}>
    <HeaderText>Let's get started!</HeaderText>

    <Spacing height={32} />

    <Text style={style.bodyText}>
      What is your kid's name?
    </Text>

    <Spacing height={16} />

    <TextInput
      refFunc={ref => { this.textInput = ref; }}
      onChangeText={onChangeText}
      onSubmitEditing={() => Actions.setImage()}
    />

    <Spacing />

    <View style={style.buttonContainer}>
      <Button onPress={() => nextStep()}>Next step</Button>
    </View>
  </View>
);

SetName.propTypes = {
  parentName: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  parentName: state.parentName,
});

const mapDispatchToProps = {
  onChangeText: setKidName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetName);
