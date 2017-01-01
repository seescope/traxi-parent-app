import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import KidName from '../../App/Components/KidName';

describe('<KidName>', () => {
  it('renders a kid\'s name', () => {
    const TEST_TEXT = 'Test Text';
    const wrapper = shallow(<KidName>{TEST_TEXT}</KidName>);
    expect(wrapper.children().text()).to.equal(TEST_TEXT);
  });
});
