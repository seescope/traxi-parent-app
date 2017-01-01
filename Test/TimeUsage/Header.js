import React from 'react';
import { View } from 'react-native';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(chaiEnzyme());
chai.use(sinonChai);
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { TEST_KID, TEST_KID_FIRST_NAME } from '../Mocks';

const ACTIONS_SPY = sinon.spy();

const { Header } = proxyquire.noCallThru()('../../App/TimeUsage/Header', {
  'react-native-vector-icons/MaterialIcons': View,
  'react-native-router-flux': { Actions: { pop: ACTIONS_SPY } },
  '../Components/KidAvatar': () => {},
});

const wrapper = shallow(<Header kid={TEST_KID} date={'2016-01-01'} />);

describe('<Header>', () => {
  it('renders the component', () => {
    expect(wrapper.children()).to.have.length(3);
  });

  it('moves to the previous page when the back button is tapped', () => {
    wrapper.childAt(0).simulate('press');
    expect(ACTIONS_SPY.calledOnce).to.equal(true);
  });

  it('has the correct header text', () => {
    const EXPECTED_HEADER_TEXT = 'Friday, 1 January';
    expect(wrapper.childAt(1).childAt(0).prop('children')).to.eql(EXPECTED_HEADER_TEXT);
  });

  it('has the correct subheader text', () => {
    const EXPECTED_SUBHEADER_TEXT = [TEST_KID_FIRST_NAME, `'s night time usage`];
    expect(wrapper.childAt(1).childAt(1).prop('children')).to.eql(EXPECTED_SUBHEADER_TEXT);
  });

  it('has the correct header text when dealing with time ranges', () => {
    const EXPECTED_HEADER_TEXT = '10PM to 11PM';
    const wrapper = shallow(<Header kid={TEST_KID} date={'10PM'} />);
    expect(wrapper.childAt(1).childAt(0).prop('children')).to.eql(EXPECTED_HEADER_TEXT);
  });
});
