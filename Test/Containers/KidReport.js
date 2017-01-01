import React from 'react';
import { View } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const KidReport = proxyquire.noCallThru()('../../App/Containers/KidReport', {
  'react-native-linear-gradient': View,
}).default;

describe('<KidReport />', () => {
  it('renders the KidReport component', () => {
    const wrapper = shallow(<KidReport />);
    expect(wrapper.children().length).to.equal(3);
  });
});
