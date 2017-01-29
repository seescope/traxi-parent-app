import React from 'react';
import renderer from 'react-test-renderer';
import { AsyncStorage } from 'react-native';
import { mockOnce } from 'firebase';

import App from '../App';

it('renders ReportHome when there is a profile that has kids in Firebase', () => {
  mockOnce.setData({
    name: 'Test',
    kids: [1, 2, 3],
    UUID: 'abc-123',
  });
  AsyncStorage.getItem = () => ({
    then: callback => callback(JSON.stringify({ UUID: 'abc-123' })),
  });
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(mockOnce).toHaveBeenCalled();
});

it('renders Intro when there is no profile', () => {
  AsyncStorage.getItem = () => ({
    then: callback => callback(null),
  });
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders AreYouReady when there is a profile that has a UUID, but no kids in Firebase', () => {
  mockOnce.setData({
    name: 'Test',
    UUID: 'abc-123',
  });
  AsyncStorage.getItem = () => ({
    then: callback => callback(JSON.stringify({ UUID: 'abc-123' })),
  });

  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
