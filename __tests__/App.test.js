import React from 'react';
import renderer from 'react-test-renderer';
import ReactNative from 'react-native';
ReactNative.StatusBar = {
  setHidden: jest.fn(),
};

import App from '../App';


it('renders', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
