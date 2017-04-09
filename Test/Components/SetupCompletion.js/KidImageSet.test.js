import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {
  KidImageSet,
} from '../../../App/Components/SetupCompletion/KidImageSet';

const kidName = 'kid';
const parentName = 'parent';
const pickImage = jest.fn();
const setName = jest.fn();
const nextStep = jest.fn();

it('Renders correctly with image', () => {
  // const kidImage = {
  //   uri: 'URI',
  // };
  //
  // const tree = renderer.create(
  //   <KidImageSetup
  //     kidName={kidName}
  //     parentName={parentName}
  //     kidImage={kidImage}
  //     pickImage={pickImage}
  //     setName={setName}
  //     nextStep={nextStep}
  //   />,
  // );
  // expect(tree.toJSON()).toMatchSnapshot();
});
