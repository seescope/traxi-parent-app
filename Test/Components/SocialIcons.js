import React from 'react';
import { View } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const SocialIcons = proxyquire.noCallThru()('../../App/Components/SocialIcons', {
  'react-native-vector-icons/FontAwesome': View,
}).default;

describe('<SocialIcons />', () => {
  it('triggers onPress with the appropriate params', () => {
    const onPress = sinon.spy();
    const wrapper = shallow(<SocialIcons onPress={onPress} />);

    wrapper.children().forEach(b => b.simulate('press'));

    expect(onPress.calledWith('google-oauth2')).to.equal(true);
    expect(onPress.calledWith('facebook')).to.equal(true);
    expect(onPress.calledWith('email')).to.equal(true);
  });
});
