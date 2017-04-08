import { Alert } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Actions } from 'react-native-router-flux';

import {
  NameSetup,
  nextStep,
} from '../../../App/Components/SetupCompletion/NameSetup';

Alert.alert = jest.fn();
Actions.kidImageSetup = jest.fn();

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
    expect(Actions.kidImageSetup).toHaveBeenCalled();
  });
});
