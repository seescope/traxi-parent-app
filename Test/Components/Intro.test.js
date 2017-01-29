jest.mock('../../App/Components/ProgressTrack', () => () => null);

import React from 'react';
import renderer from 'react-test-renderer';
import Intro from '../../App/Components/Intro';

it('renders', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});
