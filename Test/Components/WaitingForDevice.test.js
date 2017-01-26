import React from 'react';
import renderer from 'react-test-renderer';
import WaitingForDevice from '../../App/Components/WaitingForDevice';

it('renders', () => {
  const tree = renderer.create(<WaitingForDevice
    kidName="Jeff"
    avatarURL="yep"
    deviceType="Android"
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
