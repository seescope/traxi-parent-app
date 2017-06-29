import React from 'react';
import renderer from 'react-test-renderer';
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
jest.mock('../../App/AsyncActions/UpgradeAccount', () =>
  jest.fn(() =>
    Promise.resolve({
      type: 'TEST_UPGRADE_ACCOUNT',
    })));
jest.mock('../../App/AsyncActions/AddAdditionalChild', () =>
  jest.fn(() =>
    Promise.resolve({
      type: 'TEST_ADD_ADDITIONAL_CHILD',
    })));

import Upgrade, { mapDispatchToProps } from '../../App/Containers/Upgrade';

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

const UpgradeComponent = () => (
  <Provider store={testStore}>
    <Upgrade />
  </Provider>
);

it('renders the <Upgrade> component', () => {
  const tree = renderer.create(<UpgradeComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('onPress', () => {
  test('Dispatches upgradeAccount, then addAdditionalChild and navigates to DeviceSetup', async () => {
    const MOCK_DISPATCH = jest.fn();
    const { onPress } = mapDispatchToProps(MOCK_DISPATCH);

    await onPress();

    expect(MOCK_DISPATCH).toHaveBeenCalledWith(
      expect.objectContaining({
        _65: {
          type: 'TEST_UPGRADE_ACCOUNT',
        },
      })
    );
    expect(MOCK_DISPATCH).toHaveBeenCalledWith(
      expect.objectContaining({
        _65: {
          type: 'TEST_ADD_ADDITIONAL_CHILD',
        },
      })
    );
    expect(Actions.setName).toHaveBeenCalled();
  });
});
