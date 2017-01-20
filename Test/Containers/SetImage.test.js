import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';

import SetImage, { selectImage } from '../../App/Containers/SetImage';

// Why? Why!?
global.Promise = require.requireActual('promise');

const mockStore = configureStore([thunk]);
const testStore = mockStore({ parentName: 'Name' });

const SetImageComponent = () => (
  <Provider store={testStore}>
    <SetImage />
  </Provider>
);

it('renders the <SetImage> component', () => {
  const tree = renderer.create(
    <SetImageComponent />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('handles when the image is selected', () => {
  const dispatch = jest.fn(() => Promise.resolve());
  selectImage(dispatch);

  // Run our assertions on the next tick. Probably more elegant ways of doing this.
  return Promise.resolve().then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot();
    expect(Actions.walkthrough).toHaveBeenCalled();
  });
});
