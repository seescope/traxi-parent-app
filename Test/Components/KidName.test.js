import React from 'react';
import renderer from 'react-test-renderer';
import KidName from '../../App/Components/KidName';

describe('<KidName>', () => {
  it('renders a kid\'s name', () => {
    const TEST_NAME = 'First Last';
    const tree = renderer.create(<KidName>{TEST_NAME}</KidName>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles null last name', () => {
    const TEST_NAME = 'First null';
    const tree = renderer.create(<KidName>{TEST_NAME}</KidName>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
