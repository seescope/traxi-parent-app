import React from 'react';
import renderer from 'react-test-renderer';

import Thankyou from '../../App/Components/Thankyou';

it('renders the <Thankyou> component', () => {
  const tree = renderer.create(<Thankyou />).toJSON();

  expect(tree).toMatchSnapshot();
});
