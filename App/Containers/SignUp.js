// @flow

/* eslint-disable react/jsx-indent */

import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { logError } from '../Utils';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import TextInput from '../Components/TextInput';
import { VERY_LIGHT_GREY, GREY } from '../Constants/Colours';
import STYLES from '../Constants/Styles';
import LoadingIndicator from '../Components/LoadingIndicator';
import Spacing from '../Components/Spacing';

import { startedLoading, stoppedLoading } from '../Reducers/Setup/setupActions';
import * as ParentActions from '../Reducers/Parent/parentActions';
import * as KidsActions from '../Reducers/Kids/kidsActions';

import persistParent from '../AsyncActions/PersistParent';
import createParentAuthentication
  from '../AsyncActions/CreateParentAuthentication';

import type { Dispatch } from '../Reducers';
import type { ParentState } from '../Reducers/Parent';
import type { KidsState } from '../Reducers/Kids';
import type { SetupState } from '../Reducers/Setup';

type DispatchProps = {
  dispatch: Dispatch
};

type RootState = {
  parentState: ParentState,
  kidsState: KidsState,
  setupState: SetupState
};

type Props = {
  name: ?string,
  password: ?string,
  email: ?string,
  onKidNameChanged: (name: string) => {},
  onNameChanged: (name: string) => {},
  onPasswordChanged: (password: string) => {},
  onEmailChanged: (email: string) => {},
  onCompleteSetup: () => {},
  loading: boolean
};

type StateProps = {
  name: ?string,
  password: ?string,
  kidUUID: string,
  loading: boolean,
  email: ?string
};

type Fields = {
  name: string,
  email: string,
  password: string
};

const style = {
  background: {
    backgroundColor: VERY_LIGHT_GREY,
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
  },
  container: {
    alignItems: 'center',
  },
  labelText: {
    fontFamily: 'Raleway-ExtraBold',
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

// A little dodgy..
const Form = (
  {
    name,
    password,
    email,
    onEmailChanged,
    onNameChanged,
    onPasswordChanged,
  }: Props
) => (
  <View style={style.innerContainer}>
    <Text style={style.labelText}>Your name:</Text>
    <TextInput value={name} onChangeText={onNameChanged} />

    <Text style={style.labelText}>Your email address:</Text>
    <TextInput
      value={email}
      onChangeText={onEmailChanged}
      autoCapitalize="none"
      keyboardType="email-address"
    />

    <Text style={style.labelText}>Choose a password:</Text>
    <TextInput
      value={password}
      secureTextEntry
      onChangeText={onPasswordChanged}
    />
  </View>
);

export const validateFields = ({ name, email, password }: Fields): boolean =>
  !!name &&
  !!email &&
  !!password &&
  name.length > 1 &&
  email.length > 1 &&
  password.length > 1;

export const SignUp = (props: Props) => (
  <ScrollView
    style={style.background}
    contentContainerStyle={style.outerContainer}
  >
    <View style={style.container}>
      <HeaderText style={style.headerText}>Let's get started!</HeaderText>

      <Spacing height={32} />

      <View style={[STYLES.CARD, style.container]} elevation={6}>
        <Form {...props} />
      </View>

    </View>
    <View style={style.buttonContainer}>
      {props.loading
        ? <LoadingIndicator />
        : <Button primary onPress={props.onCompleteSetup}>
            Next step
          </Button>}
    </View>
  </ScrollView>
);

const mapStateToProps = (rootState: RootState): StateProps => {
  const { parentState, setupState } = rootState;
  const { loading, kidUUID } = setupState;
  const { name, email, password } = parentState;

  if (!kidUUID) throw new Error('NO KID UUID!');

  return {
    name,
    password,
    loading,
    email,
    kidUUID,
  };
};

export const mergeProps = (
  { kidUUID, loading, name, password, email }: StateProps,
  { dispatch }: DispatchProps
): Props => ({
  // Props from state
  name,
  password,
  loading,
  email,
  kidUUID,

  // Update functions
  onKidNameChanged: (updatedName: string) =>
    dispatch(KidsActions.setKidName(updatedName, kidUUID)),
  onNameChanged: (updatedName: string) =>
    dispatch(ParentActions.setName(updatedName)),
  onEmailChanged: (updatedEmail: string) =>
    dispatch(ParentActions.setEmail(updatedEmail)),
  onPasswordChanged: (newPassword: string) =>
    dispatch(ParentActions.setPassword(newPassword)),
  onCompleteSetup: () => {
    dispatch(startedLoading());
    return dispatch(createParentAuthentication())
      .then(() => dispatch(persistParent()))
      .then(() => dispatch(stoppedLoading()))
      .then(() => {
        Actions.setName({ type: 'reset' });
      })
      .catch(e => {
        dispatch(stoppedLoading());
        logError(e);
        Alert.alert(e.message);
      });
  },
});

// $FlowFixMe
export default connect(mapStateToProps, null, mergeProps)(SignUp);
