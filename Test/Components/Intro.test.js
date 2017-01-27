jest.mock('../../App/Components/ProgressTrack', () => () => null);

import React from 'react';
import { AsyncStorage } from 'react-native';
import renderer from 'react-test-renderer';
import { Actions } from 'react-native-router-flux';
import Intro, { onPress } from '../../App/Components/Intro';

it('renders', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('saves the parent\'s state and transitions to the next screen', () => {
  AsyncStorage.setItem = jest.fn(() => Promise.resolve());

  return onPress().then(() => {
    expect(Actions.areYouReady).toHaveBeenCalled();
    expect(AsyncStorage.setItem.mock.calls).toMatchSnapshot();
  });
});
