import React, { PropTypes } from 'react';
import { Text, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Button from '../../Components/Button';
import HeaderText from '../../Components/HeaderText';
import TextInput from '../../Components/TextInput';
import Spacing from '../../Components/Spacing';
import { WHITE, TRAXI_BLUE } from '../../Constants/Colours';

const style = {
  background: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: TRAXI_BLUE,
  },
  container: {
    flex: 6,
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  bodyText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: WHITE,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
};

export const nextStep = name => {
  //if (name) Actions.kidImageSetup({ type: 'replace' });
  if (name) Actions.passwordSetup({ type: 'replace' });
  else Alert.alert('Please enter your name');
};

const setName = name =>
  dispatch => {
    dispatch({ type: 'UPDATE_PROFILE_NAME', name });
  };

export const NameSetup = ({ name, setNameFn }) => (
  <View style={style.background}>
    <View style={style.container}>
      <HeaderText>Welcome !</HeaderText>
      <Spacing height={32} />
      <Text style={style.bodyText}>What is your name</Text>
      <Spacing height={10} />
      <TextInput
        refFunc={ref => {
          this.textInput = ref;
        }}
        onChangeText={text => setNameFn(text)}
      />
      <Spacing />
    </View>
    <View style={style.buttonContainer}>
      <Button onPress={() => nextStep(name)}>
        Next Step
      </Button>
    </View>
  </View>
);

NameSetup.propTypes = {
  name: PropTypes.string.isRequired,
  setNameFn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  name: state.profile.name,
});

const mapDispatchToProps = {
  setNameFn: setName,
};

export default connect(mapStateToProps, mapDispatchToProps)(NameSetup);
