import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

import SetImage, { selectImage } from '../../App/Containers/SetImage';

const TEST_KID = {
  UUID: 'Test UUID',
  name: 'Emanuel Goldstein',
};
const TEST_KIDS = [ TEST_KID ];
const mockStore = configureStore([thunk]);
const testStoreWithoutDeeplink = mockStore({
  parentName: 'Name',
  selectedKid: TEST_KID,
  deeplink: false,
  kids: TEST_KIDS,
  profile: {
    UUID: 'Parent-UUID',
  },
});

const testStoreWithDeeplink = mockStore({
  parentName: 'Name',
  selectedKid: TEST_KID,
  deeplink: true,
  kids: TEST_KIDS,
  profile: {
    UUID: 'Parent-UUID',
  },
});

const SetImageComponentWithDeeplink = () => (
  <Provider store={testStoreWithDeeplink}>
    <SetImage />
  </Provider>
);

const SetImageComponentWithoutDeeplink = () => (
  <Provider store={testStoreWithoutDeeplink}>
    <SetImage />
  </Provider>
);

it('renders the <SetImage> component correctly without deeplink', () => {
  const tree = renderer.create(<SetImageComponentWithoutDeeplink />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the <SetImage> component correctly with deeplink', () => {
  const tree = renderer.create(<SetImageComponentWithDeeplink />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls ImagePicker if pickImage is true', () => {
  const dispatch = jest.fn(() => Promise.resolve());
  selectImage(true, true, TEST_KID, TEST_KIDS)(dispatch);

  // Run our assertions on the next tick. Probably more elegant ways of doing this.
  return Promise.resolve().then(() => {
    expect(ImagePicker.launchImageLibrary).toHaveBeenCalled();
    expect(Actions.setupCompletion).toHaveBeenCalled();
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
