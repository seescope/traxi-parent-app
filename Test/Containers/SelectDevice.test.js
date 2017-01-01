import { View } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import { connect, Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import SelectDevice from '../../App/Containers/SelectDevice';

// Why? Why!?
global.Promise = require.requireActual('promise');

jest.mock('../../App/Actions/LoginWithMethod', () => {
  return jest.fn(() => {
    return (dispatch) => {
      return new Promise.resolve({ type: 'SOMETHIGN' });
    }
  });
});

jest.mock('react-native-router-flux', () => {
  mockFindKid = jest.fn();
  return {
    Actions: {
      findKid: mockFindKid
    }
  };
});

jest.mock('../../App/Components/Background');

const mockStore = configureStore([thunk]);
const testStore = mockStore({ parentName: 'Name'});

const SelectDeviceComponent = () => (
  <Provider store={testStore}>
    <SelectDevice />
  </Provider>
);

it('renders the <SelectDevice> component', () => {
  const tree = renderer.create(
    <SelectDeviceComponent />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
