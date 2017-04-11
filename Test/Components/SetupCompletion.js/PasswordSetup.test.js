import * as Firebase from 'firebase';
import { Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import React from 'react';
import renderer from 'react-test-renderer';
import {
  PasswordSetup,
  alertIfPasswordIsTooShort,
  updateFirebaseProfile,
  createFirebaseUser,
  saveProfileToAsyncStorage,
  goToDashboard,
} from '../../../App/Components/SetupCompletion/PasswordSetup';

Alert.alert = jest.fn();
Actions.dashboard = jest.fn();

describe('NameSetup', () => {

  it('Renders correctly', () => {
    const setEmailFn = jest.fn();
    const name = 'Chris';
    const email = 'test@email.com';

    const tree = renderer.create(
      <PasswordSetup name={name} email={email} setEmailFn={setEmailFn} />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('alertIfPasswordIsTooShort()', () => {
    expect(alertIfPasswordIsTooShort('password')).toBeFalsy();
    expect(Alert.alert).not.toHaveBeenCalled();
    expect(alertIfPasswordIsTooShort('short')).toBeTruthy();
    expect(Alert.alert).toHaveBeenCalledWith(
      'Password should be at least 6 characters',
    );
  });

  it('updateFirebaseProfile()', () => {
    //TODO
  });

  it('saveProfileToAsyncStorage()', () => {
    saveProfileToAsyncStorage('UUID');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'profile',
      JSON.stringify({
        UUID: 'UUID',
      }),
    );
  });

  it('createFirebaseUser()', () => {
    //TODO
  });

  it('goToDashboard()', () => {
    goToDashboard();
    expect(Actions.dashboard).toHaveBeenCalled();
  });
});
