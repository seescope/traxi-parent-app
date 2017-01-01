import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';

const Spacing = proxyquire.noCallThru()('../../App/Components/Spacing', {
}).default;

describe('<Spacing>', () => {
  it('renders a space with the correct height', () => {
    const TEST_HEIGHT = 180;
    const wrapper = shallow(<Spacing height={TEST_HEIGHT} />);
    expect(wrapper.props().style.height).to.equal(TEST_HEIGHT);
  });
});
