import React from 'react';
import renderer from 'react-test-renderer';

import NotReadyYet from '../../App/Components/SplashScreen';

it('renders the <NotReadyYet> component', () => {
  const tree = renderer.create(
    <NotReadyYet />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
