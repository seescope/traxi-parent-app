import React from 'react';
import renderer from 'react-test-renderer';
import KidAvatar from '../../App/Components/KidAvatar';

it('Renders an avatar when an image is supplied', () => {
  const IMAGE_URL = 'http://www4.pictures.gi.zimbio.com/Premiere+MGM+Rocky+Balboa+Arrivals+pczqT_rwQxcl.jpg';
  const TEST_SIZE = 100;
  const tree = renderer.create(<KidAvatar
    avatarURL={IMAGE_URL}
    size={TEST_SIZE}
    state={'neutral'}
  />);
  expect(tree.toJSON()).toMatchSnapshot();
});

it('Returns a default avatar when none is supplied', () => {
  const TEST_SIZE = 100;
  const tree = renderer.create(<KidAvatar
    avatarURL={''}
    size={TEST_SIZE}
    state={'neutral'}
  />);
  expect(tree.toJSON()).toMatchSnapshot();
});
