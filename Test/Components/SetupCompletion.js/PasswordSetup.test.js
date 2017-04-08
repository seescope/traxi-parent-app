import * as Firebase from 'firebase';
import { Alert } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {
  PasswordSetup,
  alertIfPasswordIsTooShort,
  updateFirebaseProfile,
  createFirebaseUser,
} from '../../../App/Components/SetupCompletion/PasswordSetup';

Alert.alert = jest.fn();

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
    //updateFirebaseProfile('Chris');
    // expect(Firebase.auth().currentUser.updateProfile).toHaveBeenCalled();
  });
  it('saveProfileToAsyncStorage()', () => {});
  it('createFirebaseUser()', () => {
    createFirebaseUser('test@email.com', 'password');
    expect(Firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalled();
  });
  it('goToDashboard()', () => {});
});
