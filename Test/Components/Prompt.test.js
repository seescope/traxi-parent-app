import React from 'react';
import renderer from 'react-test-renderer';
import Prompt from '../../App/Components/Prompt';

it('renders', () => {
  const tree = renderer
    .create(
      <Prompt
        parentName="Kane"
        kidName="Jeff"
        avatarURL=""
        nextStep={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
