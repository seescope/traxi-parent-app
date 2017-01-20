import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import SetName, { selectImage } from '../../App/Containers/SetName';

// Why? Why!?
global.Promise = require.requireActual('promise');

const mockStore = configureStore([thunk]);
const testStore = mockStore({ parentName: 'Name', selectedKid: { name: 'Jeff Goldstein' } });

const SetNameComponent = () => (
  <Provider store={testStore}>
    <SetName />
  </Provider>
);

it('renders the <SetName> component', () => {
  const tree = renderer.create(
    <SetNameComponent />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls ImagePicker if pickImage is true', () => {
  const dispatch = jest.fn(() => Promise.resolve());
  selectImage(true)(dispatch);

  // Run our assertions on the next tick. Probably more elegant ways of doing this.
  return Promise.resolve().then(() => {
    expect(ImagePicker.launchImageLibrary).toHaveBeenCalled();
    expect(dispatch.mock.calls).toMatchSnapshot();
    expect(Actions.walkthrough).toHaveBeenCalled();
  });
});

it('uses a default image of pickImage is false', () => {
  const dispatch = jest.fn(() => Promise.resolve());
  ImagePicker.launchImageLibrary.mockClear();
  selectImage(false)(dispatch);

  // Run our assertions on the next tick. Probably more elegant ways of doing this.
  return Promise.resolve().then(() => {
    expect(ImagePicker.launchImageLibrary).not.toHaveBeenCalled();
    expect(dispatch.mock.calls).toMatchSnapshot();
    expect(Actions.walkthrough).toHaveBeenCalled();
  });
});
