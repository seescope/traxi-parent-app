import React from 'react';
import renderer from 'react-test-renderer';

import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import InAppBilling from 'react-native-billing';
import { Crashlytics } from 'react-native-fabric';

import SignUp, { beginSetup, handleError } from '../../App/Components/SignUp';

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

it('does beginSetup with a one-dollar transaction', () => {
  const mockDispatch = jest.fn(() => Promise.resolve());
  return beginSetup('one-dollar')(mockDispatch).then(() => {
    expect(InAppBilling.subscribe.mock.calls).toMatchSnapshot();
    expect(mockDispatch.mock.calls).toMatchSnapshot();
    expect(Actions.selectDevice).toHaveBeenCalled();

    InAppBilling.subscribe.mockClear();
    Actions.selectDevice.mockClear();
  });
});

it('does beginSetup with a free transaction', () => {
  const mockDispatch = jest.fn(() => Promise.resolve());
  return beginSetup('free')(mockDispatch).then(() => {
    expect(InAppBilling.subscribe).not.toHaveBeenCalled();
    expect(mockDispatch.mock.calls).toMatchSnapshot();
    expect(Actions.selectDevice).toHaveBeenCalled();
  });
});

it('handles InAppBilling errors correctly', () => {
  __DEV__ = false;
  const testError = new Error('testing');
  handleError(testError);
  expect(Crashlytics.recordError.mock.calls).toMatchSnapshot();
});
