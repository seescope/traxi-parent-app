import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';

import CreateKid, { selectImage } from '../../App/Containers/CreateKid';

// Why? Why!?
global.Promise = require.requireActual('promise');

const mockStore = configureStore([thunk]);
const testStore = mockStore({ parentName: 'Name' });

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

it('handles when the image is selected', () => {
  const dispatch = jest.fn(() => Promise.resolve());
  selectImage(dispatch);

  // Run our assertions on the next tick. Probably more elegant ways of doing this.
  return Promise.resolve().then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot();
    expect(Actions.walkthrough).toHaveBeenCalled();
  });
});
