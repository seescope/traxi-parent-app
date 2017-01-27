import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import SetImage, { selectImage } from '../../App/Containers/SetImage';

const mockStore = configureStore([thunk]);
const testStore = mockStore({ parentName: 'Name', selectedKid: { name: 'Jeff Goldstein' } });

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

it('calls ImagePicker if pickImage is true', () => {
  const dispatch = jest.fn(() => Promise.resolve());
  selectImage(true)(dispatch);

  // Run our assertions on the next tick. Probably more elegant ways of doing this.
  return Promise.resolve().then(() => {
    expect(ImagePicker.launchImageLibrary).toHaveBeenCalled();
    expect(dispatch.mock.calls).toMatchSnapshot();
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
  });
});
