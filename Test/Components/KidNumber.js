import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import KidNumber from '../../App/Components/KidNumber';

describe('<KidNumber>', () => {
  it('renders a kid\'s number', () => {
    const TEST_NUMBER = '+61412345678';
    const EXPECTED_NUMBER = '0412 345 678';
    const wrapper = shallow(<KidNumber>{TEST_NUMBER}</KidNumber>);
    expect(wrapper.children().text()).to.equal(EXPECTED_NUMBER);
  });
});
