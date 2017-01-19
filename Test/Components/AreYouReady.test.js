import React from 'react';
import renderer from 'react-test-renderer';

import AreYouReady from '../../App/Components/SplashScreen';

it('renders the <AreYouReady> component', () => {
  const tree = renderer.create(
    <AreYouReady />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
