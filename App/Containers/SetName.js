import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Keyboard, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { enterKidName } from '../Actions/Actions';
import Background from '../Components/Background';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import { WHITE, TRAXI_BLUE, TRANSPARENT } from '../Constants/Colours';

const style = {
  container: {
    backgroundColor: TRAXI_BLUE,
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  padding: {
    flex: 1,
  },
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

const SetName = ({ parentName, onChangeText }) => (
  <Background style={style.container}>
    <View style={style.padding} />
    <View style={style.innerContainer}>
      <HeaderText>Let's get started {parentName}!</HeaderText>

      <Spacing />

      <Text style={style.bodyText}>
        What is your kid's name?
      </Text>

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
  </Background>
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
