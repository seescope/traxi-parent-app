// @flow

import React from 'react';
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
import * as ParentActions from '../Reducers/Parent/parentActions';

import type { ParentState } from '../Reducers/Parent';
import type { KidsState } from '../Reducers/Kids';
import type { SetupState } from '../Reducers/Setup';

type RootState = {
  parentState: ParentState,
  kidsState: KidsState,
  setupState: SetupState,
};

type Props = {
  kidName: string,
  email: ?string,
  onNameChanged: () => {},
  onPasswordChanged: () => {},
  onEmailChanged: () => {},
  onPress: () => {},
};

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

export const nextStep = (name: string) => {
  if (name) {
    Actions.setImage({ type: 'replace' });
  } else {
    Alert.alert('Please enter your name');
  }
};

const saveProfileToAsyncStorage = ({ UUID }) =>
  AsyncStorage.setItem(
    'profile',
    JSON.stringify({
      UUID,
    }),
  );

const createUser = ({ email, password }) =>
  Firebase.auth().createUserWithEmailAndPassword(email, password);

const updateFirebaseProfile = profile =>
  Firebase.auth().currentUser.updateProfile({ displayName: profile.name });

const updateParentInDatabase = profile =>
  Firebase.database().ref(`parents/${profile.UUID}`).set(profile);

const createParentInFirebase = profile =>
  createUser(profile)
    .then(updateFirebaseProfile.bind(undefined, profile))
    .then(updateParentInDatabase.bind(undefined, profile));

const goToDashboard = () => Actions.dashboard();

export const finishSetup = profile =>
  saveProfileToAsyncStorage(profile)
    .then(createParentInFirebase.bind(undefined, profile))
    .then(goToDashboard);

export const NameSetup = (
  {
    onNameChanged,
    onPasswordChanged,
    onEmailChanged,
    kidName,
    email,
    onPress,
  }: Props,
) => (
  <ScrollView
    style={style.background}
    contentContainerStyle={style.outerContainer}
  >
    <View style={style.container}>
      <HeaderText style={style.headerText}>Last step!</HeaderText>
      <Spacing height={16} />

      <View style={[STYLES.CARD, style.container]} elevation={6}>
        <View style={style.innerContainer}>
          <Text style={style.labelText}>Your email address:</Text>
          <TextInput
            value={email}
            onChangeText={onEmailChanged}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={style.labelText}>Your name:</Text>
          <TextInput onChangeText={onNameChanged} />

          <Text style={style.labelText}>Choose a password:</Text>
          <TextInput secureTextEntry onChangeText={onPasswordChanged} />
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

const mapStateToProps = (rootState: RootState) => {
  const { parentState, setupState, kidsState } = rootState;
  const { kidUUID } = setupState;

  if (!kidUUID) throw new Error('No kidUUID!');

  const selectedKid = kidsState[kidUUID];

  return {
    email: parentState.email,
    kidName: firstName(selectedKid.name),
  };
};

const mapDispatchToProps = dispatch => ({
  onNameChanged: name => dispatch(ParentActions.setName(name)),
  onEmailChanged: email => dispatch(ParentActions.setEmail(email)),
  onPasswordChanged: password => dispatch(ParentActions.setPassword(password)),
});

// $FlowFixMe: The type signature for connect is insane.
export default connect(mapStateToProps, mapDispatchToProps)(NameSetup);
