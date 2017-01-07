import React from 'react';
import renderer from 'react-test-renderer';
import { AsyncStorage } from 'react-native';
import { mockOnce } from 'firebase';

import App from '../App';

it('renders', () => {
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
