import React from 'react';
import renderer from 'react-test-renderer';
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
jest.mock('../../App/AsyncActions/AddAdditionalChild', () =>
  jest.fn(() => ({
    type: 'TEST_ADD_ADDITIONAL_CHILD',
  })));

import Settings, { mergeProps } from '../../App/Containers/Settings';

const mockStore = configureStore([thunk]);
const testStore = mockStore({
  parentState: {
    name: 'Name',
    email: 'Email',
    kids: ['abc-123'],
  },
  kidsState: {
    'abc-123': {
      name: 'John Bobson',
    },
  },
  setupState: {
    kidUUID: 'abc-123',
  },
});

const SettingsComponent = () => (
  <Provider store={testStore}>
    <Settings />
  </Provider>
);

it('renders the <Settings> component', () => {
  const tree = renderer.create(<SettingsComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('onPress', () => {
  describe('When an account has already been upgraded', () => {
    test('Dispatches addAdditional child and navigates to DeviceSetup', () => {
      const MOCK_DISPATCH = jest.fn();
      const { onPress } = mergeProps(
        {
          parent: {
            upgradedAt: 'some time',
          },
        },
        { dispatch: MOCK_DISPATCH }
      );

      onPress();

      expect(MOCK_DISPATCH).toHaveBeenCalledWith({
        type: 'TEST_ADD_ADDITIONAL_CHILD',
      });
      expect(Actions.deviceSetup).toHaveBeenCalled();
    });
  });

  describe('When an account has not been upgraded', () => {
    test('Navigates to your Upgrade', () => {
      const MOCK_DISPATCH = jest.fn();
      const { onPress } = mergeProps(
        {
          parent: {
            upgradedAt: undefined,
          },
        },
        { dispatch: MOCK_DISPATCH }
      );

      onPress();

      expect(Actions.upgrade).toHaveBeenCalled();
    });
  });
});
