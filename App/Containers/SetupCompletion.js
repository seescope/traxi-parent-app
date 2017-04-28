// @flow

import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { logError, firstName } from '../Utils';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import TextInput from '../Components/TextInput';
import { VERY_LIGHT_GREY, GREY } from '../Constants/Colours';
import STYLES from '../Constants/Styles';

import * as ParentActions from '../Reducers/Parent/parentActions';

import persistParent from '../AsyncActions/PersistParent';
import fetchReports from '../AsyncActions/FetchReports';
import createParentAuthentication
  from '../AsyncActions/CreateParentAuthentication';

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

type Fields = {
  name: string,
  email: string,
  password: string,
};

type Dispatch = () => Promise<any>;

const style = {
  background: {
    backgroundColor: VERY_LIGHT_GREY,
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 64,
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

export const validateFields = ({ name, email, password }: Fields): boolean =>
  !!name &&
  !!email &&
  !!password &&
  name.length > 1 &&
  email.length > 1 &&
  password.length > 1;

export const SetupCompletion = (
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

const mapStateToProps = (rootState: RootState): Object => {
  const { parentState, setupState, kidsState } = rootState;
  const { kidUUID } = setupState;

  if (!kidUUID) throw new Error('No kidUUID!');

  const selectedKid = kidsState[kidUUID];

  return {
    email: parentState.email,
    kidName: firstName(selectedKid.name),
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): Object => ({
  onNameChanged: (name: string) => dispatch(ParentActions.setName(name)),
  onEmailChanged: (email: string) => dispatch(ParentActions.setEmail(email)),
  onPasswordChanged: (password: string) =>
    dispatch(ParentActions.setPassword(password)),
  onPress: () =>
    dispatch(createParentAuthentication())
      .then(() => dispatch(persistParent()))
      .then(() => dispatch(fetchReports()))
      .then(() => Actions.dashboard())
      .catch(e => {
        logError(e);
        Alert.alert(e.message);
      }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupCompletion);
