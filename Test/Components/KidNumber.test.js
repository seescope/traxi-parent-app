import React from 'react';
import renderer from 'react-test-renderer';
import KidNumber from '../../App/Components/KidNumber';

describe('<KidNumber>', () => {
  it('renders a kid\'s number', () => {
    const TEST_NUMBER = '+61412345678';
    const tree = renderer.create(<KidNumber>{TEST_NUMBER}</KidNumber>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
