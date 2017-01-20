import React from 'react';
import renderer from 'react-test-renderer';

import NotReadyYet, { postNumberToSlack } from '../../App/Components/SplashScreen';

it('renders the <NotReadyYet> component', () => {
  const tree = renderer.create(
    <NotReadyYet />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('posts a number to Slack', () => {
  const mockDispatch = jest.fn();
  postNumberToSlack(mockDispatch)('0401633346');
  expect(mockDispatch.mock.calls).toMatchSnapshot();
});
