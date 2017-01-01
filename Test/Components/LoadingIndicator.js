import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LoadingIndicator from '../../App/Components/LoadingIndicator';

describe('<LoadingIndicator>', () => {
  it('renders some loading text', () => {
    const TEST_TEXT = 'TESTING';
    const wrapper = shallow(<LoadingIndicator>{TEST_TEXT}</LoadingIndicator>);
    expect(wrapper.children()).to.have.length(2);
    expect(wrapper.children().last().children().text()).to.equal(TEST_TEXT);
  });
});
