import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import NotReadyYet from '../../App/Components/NotReadyYet';

it('renders the <NotReadyYet> component', () => {
  const tree = renderer.create(<NotReadyYet />).toJSON();

  expect(tree).toMatchSnapshot();
});
