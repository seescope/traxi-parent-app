import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { TEST_KID } from '../Mocks';

const { TimeUsageComponent } = proxyquire.noCallThru()('../../App/TimeUsage', {
  '../Images/background.jpg': {},
  './Header': () => {},
  './UsageItems': () => {},
});

describe('<TimeUsage>', () => {
  it('renders the component', () => {
    const wrapper = shallow(<TimeUsageComponent kid={TEST_KID} />);
    expect(wrapper.children()).to.have.length(2);
  });
});
