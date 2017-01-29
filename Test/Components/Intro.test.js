jest.mock('../../App/Components/ProgressTrack', () => () => null);

import React from 'react';
import renderer from 'react-test-renderer';
import { Actions } from 'react-native-router-flux';
import Analytics from 'react-native-analytics';

import Intro, { onPress } from '../../App/Components/Intro';

it('renders', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('sends tracking to Segment that intro was seen', () => {
  onPress();

  expect(Analytics.track.mock.calls).toMatchSnapshot();
  expect(Actions.areYouReady).toHaveBeenCalled();
});
