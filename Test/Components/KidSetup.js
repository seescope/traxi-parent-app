import React from 'react';
import { View } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const TEST_KID_NAME = 'TEST';

// We can't use a real promise here due to timing issues.
// Instead, we return a pretend promise that simply calls the 'then' callback immediately.
const TEST_START_VPN = sinon.spy(() => ({
  then: (f) => {
    f();
    return { 
      catch: () =>  {},
    };
  }
}));

const TEST_KID_REPORTS = sinon.spy();

const KidSetup = proxyquire.noCallThru()('../../App/Components/KidSetup', {
  'react-native-router-flux': {
    Actions: { kidReports: TEST_KID_REPORTS },
  },
  'react-redux': {
    connect: () => ( a => a ),
    Provider: View,
  },
  '../Actions/StartVPN': TEST_START_VPN,
  '../Components/Button': () => {},
}).default;

describe('<KidSetup />', () => {
  it('calls completeSetup correctly', () => {
    const TEST_UUID = 'abc123';
    const wrapper = shallow(<KidSetup UUID={TEST_UUID} />);
    wrapper.childAt(4).simulate('press');

    expect(TEST_START_VPN.calledWith(TEST_UUID)).to.equal(true);
    expect(TEST_KID_REPORTS.calledOnce).to.equal(true);
  });
});
