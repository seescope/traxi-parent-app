import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';

const ProgressTrack = proxyquire.noCallThru()('../../App/Components/ProgressTrack', {
  './KidAvatar': () => {},
}).default;

describe('<ProgressTrack>', () => {
  it('a progress track in the neutral state at 25% progress', () => {
    const TEST_PROGRESS = 0.25;
    const TEST_STATE = 'neutral';
    const TEST_WIDTH = 500;
    const TEST_URL = 'http://www4.pictures.gi.zimbio.com/Premiere+MGM+Rocky+Balboa+Arrivals+pczqT_rwQxcl.jpg';
    const wrapper = shallow(<ProgressTrack avatarURL={TEST_URL} width={TEST_WIDTH} progress={TEST_PROGRESS} state={TEST_STATE} />);

    expect(wrapper.children().first().props().style.backgroundColor).to.equal('#FF6600');
  });
});
