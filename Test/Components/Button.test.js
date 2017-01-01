import 'react-native';
import React from 'react';
import AndroidButton from '../../App/Components/Button.android.js';

import renderer from 'react-test-renderer';

jest.mock('react-native-material-kit');

it('renders on Android correctly', () => {
  const onPress = () => {};
  const tree = renderer.create(
    <AndroidButton onPress={onPress}>Testing!</AndroidButton>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
