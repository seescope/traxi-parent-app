import 'react-native';
import React from 'react';
import Button from '../../App/Components/Button.js';

import renderer from 'react-test-renderer';

it('renders ', () => {
  const onPress = () => {};
  const tree = renderer
    .create(<Button onPress={onPress}>Testing!</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
