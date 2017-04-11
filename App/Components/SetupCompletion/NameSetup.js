import React, { PropTypes } from 'react';
import { Text, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { firstName } from '../../Utils';
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

export const updateProfile = (field, value) =>
  dispatch => {
    dispatch({
      type: 'UPDATE_PROFILE',
      field,
      value,
    });
  };

export const NameSetup = ({ onNameChanged, onPasswordChanged, onEmailChanged, kidName, email }) => (
  <View style={style.background}>
    <View style={style.container}>
      <HeaderText style={style.headerText}>Last step!</HeaderText>
      <Spacing height={16} />

      <View style={STYLES.CARD} elevation={6}>
        <Text style={style.labelText}>Your email address:</Text>
        <TextInput
          value={email}
          onChangeText={onEmailChanged}
          keyboardType="email-address"
        />

        <Text style={style.labelText}>Your name:</Text>
        <TextInput
          onChangeText={onNameChanged}
        />

        <Text style={style.labelText}>Choose a password:</Text>
        <TextInput
          secureTextEntry
          onChangeText={onPasswordChanged}
        />
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
  kidName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onNameChanged: PropTypes.func.isRequired,
  onPasswordChanged: PropTypes.func.isRequired,
  onEmailChanged: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onNameChanged: name => updateProfile('name', name),
  onPasswordChanged: password => updateProfile('password', password),
  onEmailChanged: email => updateProfile('email', email),
};

const mapStateToProps = ({ profile, selectedKid }) => ({
  email: profile.email,
  kidName: firstName(selectedKid.name),
});

export default connect(mapStateToProps, mapDispatchToProps)(NameSetup);
