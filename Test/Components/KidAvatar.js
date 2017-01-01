import React from 'react';
import { Image } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';

const KidAvatar = proxyquire.noCallThru()( '../../App/Components/KidAvatar', {
  'react-native-animatable': { Image }
}).default;

describe('<KidAvatar>', () => {
  it('Renders an avatar', () => {
    const IMAGE_URL = 'http://www4.pictures.gi.zimbio.com/Premiere+MGM+Rocky+Balboa+Arrivals+pczqT_rwQxcl.jpg';
    const TEST_SIZE = 100;
    const wrapper = shallow(<KidAvatar avatarURL={IMAGE_URL} size={TEST_SIZE} state={'neutral'} />);

    expect(wrapper.props().style.height).to.equal(TEST_SIZE);
    expect(wrapper.props().style.width).to.equal(TEST_SIZE);
    expect(wrapper.props().style.borderRadius).to.equal(TEST_SIZE / 2);
    expect(wrapper.props().style.borderColor).to.equal('#FF6600');
  });
});
