import React from 'react';
import renderer from 'react-test-renderer';
import { AsyncStorage } from 'react-native';
import { mockOnce } from 'firebase';

import App from '../App';

it('renders when there is a profile', () => {
  mockOnce.setData({
    name: 'Test',
    kids: [1, 2, 3],
    UUID: 'abc-123',
  });
  const fakeThen = {
    then: callback => callback(JSON.stringify({ UUID: 'abc-123' })),
  };

  AsyncStorage.getItem = () => fakeThen;
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(mockOnce).toHaveBeenCalled();
});

it('renders when there is no profile', () => {
  AsyncStorage.getItem = () => ({
    then: callback => callback(null),
  });
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when there is a profile that has no kids, but introSeen is true', () => {
  AsyncStorage.getItem = () => ({
    then: callback => callback(JSON.stringify({ introSeen: true })),
  });
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
