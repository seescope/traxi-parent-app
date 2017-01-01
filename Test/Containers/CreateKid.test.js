import { View } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import { connect, Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import CreateKid from '../../App/Containers/CreateKid';

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

const CreateKidComponent = () => (
  <Provider store={testStore}>
    <CreateKid />
  </Provider>
);

it('renders the <CreateKid> component', () => {
  const tree = renderer.create(
    <CreateKidComponent />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
