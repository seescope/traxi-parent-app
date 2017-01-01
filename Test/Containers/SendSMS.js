import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const TEST_SMS = sinon.spy();
const TEST_ROUTER_FLUX = { Actions: { walkthrough: sinon.spy() } };
const { SendSMSComponent, mergeProps, mapStateToProps } = proxyquire.noCallThru()('../../App/Containers/SendSMS', {
  '../Actions/SendSMS': TEST_SMS,
  '../Components/KidAvatar': () => {},
  '../Components/Button': () => {},
  'react-native-router-flux': TEST_ROUTER_FLUX,
});

const TEST_PROPS = {
  kid: { name: 'Brett Bastian', number: '+61401633346', avatarURL: 'https://www.wired.com/wp-content/uploads/archive/images/slideshow/magazine/1505/FF_raves_heroes1_f.jpg' },
  onPress: sinon.spy(),
};
const wrapper = shallow(<SendSMSComponent {...TEST_PROPS} />);

describe('<SendSMS />', () => {
  it('renders the SendSMS component', () => {
    expect(wrapper.children().length).to.equal(6);
    expect(wrapper.childAt(1).prop('children')[1]).to.equal('Brett');
    expect(wrapper.childAt(2).prop('children')[1]).to.equal('Brett');
  });

  it('triggers the onPress prop when pressed', () => {
    wrapper.children().last().simulate('press');
    const pressed = TEST_PROPS.onPress.calledOnce;
    expect(pressed).to.equal(true);
  });

  it('merges props', () => {
    const DISPATCH_PROPS = { dispatch: sinon.spy() };
    const props = mergeProps(TEST_PROPS, DISPATCH_PROPS);

    props.onPress();
    expect(TEST_SMS.calledWith(TEST_PROPS.kid)).to.equal(true);
    expect(TEST_ROUTER_FLUX.Actions.walkthrough.calledOnce).to.equal(true);
  });

  it('passes state to props', () => {
    const TEST_STATE = { selectedKid: TEST_PROPS.kid };
    const stateProps = mapStateToProps(TEST_STATE);
    expect(stateProps.kid).to.eql(TEST_PROPS.kid);
  });
});
