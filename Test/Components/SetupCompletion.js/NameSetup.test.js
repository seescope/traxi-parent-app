import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NameSetup from '../../../App/Components/SetupCompletion/NameSetup';

it('Renders correctly', () => {
  const nextStep = jest.fn();
  const setName = jest.fn();

  const tree = renderer.create(
    <NameSetup nextStep={nextStep} setName={setName} />,
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
