import React, { PropTypes } from 'react';
import { AsyncStorage, ScrollView, Text, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as Firebase from 'firebase';

import { firstName } from '../Utils';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import TextInput from '../Components/TextInput';
import Spacing from '../Components/Spacing';
import { VERY_LIGHT_GREY, GREY } from '../Constants/Colours';
import STYLES from '../Constants/Styles';

const style = {
  background: {
    backgroundColor: VERY_LIGHT_GREY,
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  innerContainer: {
    marginVertical: 16,
    alignItems: 'flex-start',
  },
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

const saveProfileToAsyncStorage = ({ UUID }) =>
  AsyncStorage.setItem(
    'profile',
    JSON.stringify({
      UUID,
    }),
  );

const createUser = ({ email, password }) => Firebase
  .auth()
  .createUserWithEmailAndPassword(email, password);

const updateFirebaseProfile = profile => Firebase
  .auth()
  .currentUser
  .updateProfile({ displayName: profile.name });

const updateParentInDatabase = profile => Firebase
  .database()
  .ref(`parents/${profile.UUID}`)
  .set(profile);

const createParentInFirebase = profile => 
  createUser(profile)
  .then(updateFirebaseProfile.bind(undefined, profile))
  .then(updateParentInDatabase.bind(undefined, profile));

const goToDashboard = () => Actions.dashboard();

export const finishSetup = profile =>
  saveProfileToAsyncStorage(profile)
    .then(createParentInFirebase.bind(undefined, profile))
    .then(goToDashboard);

export const NameSetup = ({ onNameChanged, onPasswordChanged, onEmailChanged, kidName, email, onPress }) => (
  <ScrollView style={style.background} contentContainerStyle={style.outerContainer}>
    <View style={style.container}>
      <HeaderText style={style.headerText}>Last step!</HeaderText>
      <Spacing height={16} />

      <View style={[STYLES.CARD, style.container]} elevation={6}>
        <View style={style.innerContainer}>
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
    </View>
    <View style={style.buttonContainer}>
      <Button primary onPress={onPress}>
        See {kidName}'s usage
      </Button>
    </View>
  </ScrollView>
);

NameSetup.propTypes = {
  kidName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onNameChanged: PropTypes.func.isRequired,
  onPasswordChanged: PropTypes.func.isRequired,
  onEmailChanged: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onNameChanged: name => updateProfile('name', name),
  onPasswordChanged: password => updateProfile('password', password),
  onEmailChanged: email => updateProfile('email', email),
};

const mapStateToProps = ({ profile, selectedKid }) => ({
  email: profile.email,
  kidName: firstName(selectedKid.name),
  onPress: finishSetup.bind(undefined, profile),
});

export default connect(mapStateToProps, mapDispatchToProps)(NameSetup);
