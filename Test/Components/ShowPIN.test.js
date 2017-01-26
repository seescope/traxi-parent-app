import React from 'react';
import renderer from 'react-test-renderer';
import ShowPIN from '../../App/Components/ShowPIN';

it('renders', () => {
  const tree = renderer.create(<ShowPIN setupID={1234} kidName="Test" />).toJSON();
  expect(tree).toMatchSnapshot();
});
