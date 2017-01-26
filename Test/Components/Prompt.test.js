import React from 'react';
import renderer from 'react-test-renderer';
import Prompt from '../../App/Components/Prompt';

it('renders', () => {
  const tree = renderer.create(<Prompt
    step={1}
    parentName="Kane"
    kidName="Jeff"
    nextStep={() => {}}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
