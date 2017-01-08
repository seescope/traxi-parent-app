import React from 'react';
import renderer from 'react-test-renderer';

import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import SignUp, { beginSetup } from '../../App/Components/SignUp';

const mockStore = configureStore([thunk]);
const testStore = mockStore({ some: 'state', price: 'test-price' });

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

it('does beginSetup with a free transaction', () => {
  const mockDispatch = jest.fn(() => Promise.resolve());
  return beginSetup()(mockDispatch).then(() => {
    expect(mockDispatch.mock.calls).toMatchSnapshot();
    expect(Actions.selectDevice).toHaveBeenCalled();
  });
});
