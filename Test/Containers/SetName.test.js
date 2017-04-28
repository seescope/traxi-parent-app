import React from 'react';
import renderer from 'react-test-renderer';
import { Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
jest.mock('../../App/AsyncActions/PersistKid', () =>
  jest.fn(() => Promise.resolve({ type: 'Hey' })));
jest.mock('../../App/AsyncActions/WatchKid', () =>
  jest.fn(() => Promise.resolve({ type: 'Hey' })));
import mockPersistKid from '../../App/AsyncActions/PersistKid';
import mockWatchKid from '../../App/AsyncActions/WatchKid';

import SetName, { mergeProps, verifyName } from '../../App/Containers/SetName';

const mockStore = configureStore([thunk]);
const testStore = mockStore({
  kidsState: {
    'abc-123': {
      name: 'John Bobson',
    },
  },
  setupState: {
    kidUUID: 'abc-123',
  },
});

const SetNameComponent = () => (
  <Provider store={testStore}>
    <SetName />
  </Provider>
);

it('renders the <SetName> component', () => {
  const tree = renderer.create(<SetNameComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('handles setting the kid\'s name', () => {
  const mockDispatch = jest.fn();

  const { onNameChanged } = mergeProps(
    { kidUUID: 'abc-123' },
    { dispatch: mockDispatch },
  );
  onNameChanged('TEST_NAME');
  expect(mockDispatch).toHaveBeenCalledWith({
    name: 'TEST_NAME',
    UUID: 'abc-123',
    type: 'SET_KID_NAME',
  });
});

it('verifies the kid\'s name was input correctly', () => {
  Keyboard.dismiss = jest.fn();
  Alert.alert = jest.fn();

  verifyName('hey');
  expect(Keyboard.dismiss).toHaveBeenCalled();
  expect(Alert.alert).not.toHaveBeenCalled();

  Keyboard.dismiss.mockClear();
  Alert.alert.mockClear();

  verifyName(' ');

  expect(Keyboard.dismiss).toHaveBeenCalled();
  expect(Alert.alert).toHaveBeenCalled();
});

it('persists the kid and navigates to the next screen onPress', () => {
  const mockDispatch = jest.fn(v => v);
  const TEST_KID_NAME = 'Jim';

  const { onPress } = mergeProps(
    { kidName: TEST_KID_NAME },
    { dispatch: mockDispatch },
  );

  return onPress(TEST_KID_NAME).then(() => {
    expect(Actions.deviceSetup).toHaveBeenCalled();
    expect(mockPersistKid).toHaveBeenCalled();
    expect(mockWatchKid).toHaveBeenCalled();
  });
});
