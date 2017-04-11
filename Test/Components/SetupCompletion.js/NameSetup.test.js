import { Alert, AsyncStorage } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Actions } from 'react-native-router-flux';
import { mockSet, mockCreateUser, mockUpdateProfile } from 'firebase';

import {
  NameSetup,
  nextStep,
  updateProfile,
  finishSetup,
} from '../../../App/Components/SetupCompletion/NameSetup';

Alert.alert = jest.fn();
Actions.setImage = jest.fn();
AsyncStorage.setItem = jest.fn(() => Promise.resolve());

const TEST_PROFILE = {
  UUID: 'Test UUID',
  name: 'Test Name',
  email: 'Test Email',
  password: 'Test Password',
};

describe('NameSetup', () => {

  it('Renders correctly', () => {
    const tree = renderer.create(
      <NameSetup
        kidName="Chris"
        email="test@test.com"
        onNameChanged={() => {}}
        onEmailChanged={() => {}}
        onPasswordChanged={() => {}}
        onPress={() => {}}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('nextStep() alerts when no name was entered', () => {
    nextStep();
    expect(Alert.alert).toHaveBeenCalledWith('Please enter your name');
  });

  it('nextStep() goes to kidImageSetup when there is a name ', () => {
    nextStep('Chris');
    expect(Actions.setImage).toHaveBeenCalled();
  });

  describe('updateProfile', () => {
    it('calls dispatch when a field has been updated', done => {
      const TEST_NAME = 'test name';
      const TEST_FIELD = 'test field';
      const EXPECTED_ACTION = {
        field: TEST_FIELD,
        value: TEST_NAME,
        type: 'UPDATE_PROFILE',
      };

      const mockDispatch = action => {
        expect(action).toEqual(EXPECTED_ACTION);
        done();
      };

      updateProfile(TEST_FIELD, TEST_NAME)(mockDispatch);
    });
  });

  describe('finishSetup()', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('saves the UUID to AsyncStorage', () => {
      finishSetup(TEST_PROFILE);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'profile',
        JSON.stringify({
          UUID: TEST_PROFILE.UUID,
        }),
      );
    });

    it('creates the user in Firebase', () => finishSetup(TEST_PROFILE).then(() => {
      expect(mockCreateUser).toHaveBeenCalledWith(
        TEST_PROFILE.email,
        TEST_PROFILE.password,
      );
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        displayName: TEST_PROFILE.name,
      });
      expect(mockSet).toHaveBeenCalledWith(
        TEST_PROFILE,
      );
    }));

    it('navigates to the Dashboard', () => finishSetup(TEST_PROFILE).then(() => {
      expect(Actions.dashboard).toHaveBeenCalled();
    }));
  });
});
