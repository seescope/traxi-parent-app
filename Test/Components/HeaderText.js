import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import HeaderText from '../../App/Components/HeaderText';

describe('<HeaderText>', () => {
  it('renders text with a Header style', () => {
    const TEST_TEXT = 'Test Text';
    const wrapper = shallow(<HeaderText>{TEST_TEXT}</HeaderText>);

    expect(wrapper.children().text()).to.equal(TEST_TEXT);
  });

  it('allows the style to be changed', () => {
    const TEST_TEXT = 'Test Text';
    const TEST_STYLE = { color: 'blue' };
    const wrapper = shallow(
      <HeaderText style={TEST_STYLE}>{TEST_TEXT}</HeaderText>,
    );

    const actual = wrapper.prop('style').color;
    expect(actual).to.equal(TEST_STYLE.color);
  });
});
