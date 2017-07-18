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
import persistKid from '../AsyncActions/PersistKid';
import watchKid from '../AsyncActions/WatchKid';
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
  email: ?string,
  onKidNameChanged: (name: string) => {},
  onNameChanged: (name: string) => {},
  onPasswordChanged: (password: string) => {},
  onEmailChanged: (email: string) => {},
  onCompleteSetup: () => {},
  loading: boolean
};

type StateProps = {
  kidUUID: string,
  loading: boolean,
  email: ?string
};

type State = {
  step: number
};

type FormProps = Props & State;

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
    email,
    onEmailChanged,
    onNameChanged,
    onKidNameChanged,
    onPasswordChanged,
    step,
  }: FormProps
) =>
  step === 0
    ? <View key={0} style={style.innerContainer}>
        <Text style={style.labelText}>Your email address:</Text>
        <TextInput
          value={email}
          onChangeText={onEmailChanged}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={style.labelText}>Choose a password:</Text>
        <TextInput secureTextEntry onChangeText={onPasswordChanged} />
      </View>
    : <View key={1} style={style.innerContainer}>
        <Text style={style.labelText}>Your name:</Text>
        <TextInput onChangeText={onNameChanged} />

        <Text style={style.labelText}>Your child's name:</Text>
        <TextInput onChangeText={onKidNameChanged} />
      </View>;

export const validateFields = ({ name, email, password }: Fields): boolean =>
  !!name &&
  !!email &&
  !!password &&
  name.length > 1 &&
  email.length > 1 &&
  password.length > 1;

export class SignUp extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  state: State;

  onPress() {
    const { step } = this.state;
    const { onCompleteSetup } = this.props;

    if (step === 0) this.setState({ step: 1 });
    else onCompleteSetup();
  }

  props: Props;

  render() {
    const { loading } = this.props;
    const { step } = this.state;

    return (
      <ScrollView
        style={style.background}
        contentContainerStyle={style.outerContainer}
      >
        <View style={style.container}>
          <HeaderText style={style.headerText}>Let's get started!</HeaderText>

          <Spacing height={32} />

          <View style={[STYLES.CARD, style.container]} elevation={6}>
            <Form step={step} {...this.props} />
          </View>

        </View>
        <View style={style.buttonContainer}>
          {loading
            ? <LoadingIndicator />
            : <Button primary onPress={() => this.onPress()}>
                Next step
              </Button>}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (rootState: RootState): StateProps => {
  const { parentState, setupState } = rootState;
  const { loading, kidUUID } = setupState;

  if (!kidUUID) throw new Error('NO KID UUID!');

  return {
    loading,
    email: parentState.email,
    kidUUID,
  };
};

export const mergeProps = (
  { kidUUID, loading, email }: StateProps,
  { dispatch }: DispatchProps
): Props => ({
  // Props from state
  loading,
  email,
  kidUUID,

  // Update functions
  onKidNameChanged: (name: string) =>
    dispatch(KidsActions.setKidName(name, kidUUID)),
  onNameChanged: (name: string) => dispatch(ParentActions.setName(name)),
  onEmailChanged: (updatedEmail: string) =>
    dispatch(ParentActions.setEmail(updatedEmail)),
  onPasswordChanged: (password: string) =>
    dispatch(ParentActions.setPassword(password)),
  onCompleteSetup: () => {
    dispatch(startedLoading());
    return dispatch(createParentAuthentication())
      .then(() => dispatch(persistKid()))
      .then(() => dispatch(watchKid()))
      .then(() => dispatch(persistParent()))
      .then(() => dispatch(stoppedLoading()))
      .then(() => {
        Actions.checkForDevice({ type: 'reset' });
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
