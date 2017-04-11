import React, { PropTypes } from 'react';
import { Text, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Button from '../../Components/Button';
import HeaderText from '../../Components/HeaderText';
import TextInput from '../../Components/TextInput';
import Spacing from '../../Components/Spacing';
import { VERY_LIGHT_GREY, GREY } from '../../Constants/Colours';
import STYLES from '../../Constants/Styles';

const style = {
  background: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: VERY_LIGHT_GREY,
  },
  container: {
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  labelText: {
    fontFamily: 'Raleway-Regular',
    fontWeight: '400',
    fontSize: 14,
    color: GREY,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerText: {
    color: GREY,
  }
};

export const nextStep = name => {
  if (name) {
    Actions.setImage({ type: 'replace' });
  } else {
    Alert.alert('Please enter your name');
  }
};

const setName = name =>
  dispatch => {
    dispatch({ type: 'UPDATE_PROFILE_NAME', name });
  };

export const NameSetup = ({ name, onNameChanged, kidName }) => (
  <View style={style.background}>
    <View style={style.container}>
      <HeaderText style={style.headerText}>Last step!</HeaderText>
      <Spacing height={16} />

      <View style={STYLES.CARD}>
        <Text style={style.labelText}>Your email address:</Text>

        <TextInput />

        <Text style={style.labelText}>Your name:</Text>

        <TextInput
          keyboardType="email-address"
        />

        <Text style={style.labelText}>Choose a password:</Text>
        <TextInput secureTextEntry />
      </View>
    </View>
    <View style={style.buttonContainer}>
      <Button onPress={() => nextStep(name)}>
        See {kidName}'s usage
      </Button>
    </View>
  </View>
);

NameSetup.propTypes = {
  name: PropTypes.string,
  kidName: PropTypes.string,
  onNameChanged: PropTypes.func,
};

const mapDispatchToProps = {
  onNameChanged: setName,
};

export default connect(null, mapDispatchToProps)(NameSetup);
