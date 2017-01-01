import { View } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import SignUp, { beginSetup } from '../../App/Components/SignUp';

// Why? Why!?
global.Promise = require.requireActual('promise');

jest.mock('../Actions/LoginWithMethod', () => {
  return jest.fn(() => {
    return (dispatch) => {
      console.log('hola');
      return new Promise.resolve({ type: 'SOMETHIGN' });
    }
  });
});

const mockStore = configureStore([thunk]);
const testStore = mockStore({ some: 'state', price: 'test-price'});

const SignUpComponent = () => (
  <Provider store={testStore}>
    <SignUp />
  </Provider>
);

it('renders the <SignUp> component', () => {
  const tree = renderer.create(
    <SignUpComponent />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('does beginSetup', () => {
  const mockDispatch = jest.fn(() => Promise.resolve());
  return beginSetup('one-dollar')(mockDispatch);
});
