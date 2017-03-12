import React from 'react';
import { View } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const TEST_CREATE_STORE = sinon.spy();
const TEST_APPLY_MIDDLEWARE = sinon.spy();

const KidApp = proxyquire.noCallThru()('../../App/Containers/KidApp', {
  'react-native-router-flux': {
    Router: View,
    Scene: View,
  },
  'react-redux': {
    connect: () => a => a,
    Provider: View,
  },
  redux: {
    createStore: TEST_CREATE_STORE,
    applyMiddleware: TEST_APPLY_MIDDLEWARE,
  },
  './KidSetup': View,
  './KidReport': View,
}).default;

describe('<KidApp />', () => {
  it('renders the setup scene when installed', () => {
    const wrapper = shallow(<KidApp isInstalled UUID={'test'} />);
    expect(wrapper.children().children().length).to.equal(2);
    expect(wrapper.children().childAt(0).prop('initial')).to.equal(false);
    expect(wrapper.children().childAt(1).prop('initial')).to.equal(true);
  });

  it('renders the setup scene when not installed', () => {
    const wrapper = shallow(<KidApp isInstalled={false} UUID={'test'} />);
    expect(wrapper.children().children().length).to.equal(2);
    expect(wrapper.children().childAt(0).prop('initial')).to.equal(true);
    expect(wrapper.children().childAt(1).prop('initial')).to.equal(false);
  });

  it('passes through the phone number prop to the store', () => {
    const wrapper = shallow(<KidApp isInstalled={false} UUID={'test'} />);
    const initialState = TEST_CREATE_STORE.getCall(0).args[1];

    const EXPECTED_INITIAL_STATE = {};

    expect(initialState).to.eql(EXPECTED_INITIAL_STATE);
  });
});
