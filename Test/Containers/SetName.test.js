import React from 'react';
import renderer from 'react-test-renderer';
import { Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import SetName, { setKidName, nextStep } from '../../App/Containers/SetName';

const mockStore = configureStore([thunk]);
const testStore = mockStore({ parentName: 'Name' });

const SetNameComponent = () => (
  <Provider store={testStore}>
    <SetName />
  </Provider>
);

it('renders the <SetName> component', () => {
  const tree = renderer.create(<SetNameComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("handles setting the kid's name", () => {
  const mockDispatch = jest.fn();
  setKidName('Test')(mockDispatch);
  expect(mockDispatch.mock.calls).toMatchSnapshot();
});

it('handles going to the nextStep', () => {
  const mockDispatch = jest.fn();
  Keyboard.dismiss = jest.fn();
  nextStep()(mockDispatch);

  expect(Keyboard.dismiss).toHaveBeenCalled();
  expect(mockDispatch.mock.calls).toMatchSnapshot();
});
