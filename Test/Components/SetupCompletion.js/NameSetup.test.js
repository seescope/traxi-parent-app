import { Alert } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Actions } from 'react-native-router-flux';

import {
  NameSetup,
  nextStep,
  updateProfile,
} from '../../../App/Components/SetupCompletion/NameSetup';

Alert.alert = jest.fn();
Actions.setImage = jest.fn();

describe('NameSetup', () => {
  it('Renders correctly', () => {
    const setName = jest.fn();

    const tree = renderer.create(
      <NameSetup name={'Chris'} setNameFn={setName} />,
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
});
