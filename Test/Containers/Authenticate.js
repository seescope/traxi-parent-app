import React from 'react';
import { View } from 'react-native';
import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const TEST_ACTIONS = sinon.spy(() => Promise.resolve());
const TEST_LOGIN = sinon.spy(() => Promise.resolve());
const TEST_CONTACTS = [];
const TEST_FETCH_CONTACTS = sinon.spy(() => Promise.resolve(TEST_CONTACTS));
const { AuthenticateComponent, mapDispatchToProps } = proxyquire.noCallThru()('../../App/Containers/Authenticate', {
  '../Components/SocialIcons': View,
  'react-native-router-flux': { Actions: { findKid: TEST_ACTIONS } },
  '../Actions/LoginWithMethod':  TEST_LOGIN,
  '../Actions/FetchContacts': TEST_FETCH_CONTACTS,
});


describe('<Authenticate>', () => {
  it('renders the Authenticate screen', () => {
    let wrapper = shallow(<AuthenticateComponent onPress={() => {}} />);
    expect(wrapper.children().length).to.equal(4);
  });

  it('maps dispatch to props', (done) => {
    const store = configureMockStore([ReduxThunk])();
    sinon.spy(store, 'dispatch');
    const props = mapDispatchToProps(store.dispatch);

    props.onPress('GOOGLE').then(() => {
      expect(store.dispatch.calledOnce).to.equal(true);
      expect(TEST_ACTIONS.calledOnce).to.equal(true);
      expect(TEST_LOGIN.calledWith('GOOGLE')).to.equal(true);

      done();
    })
    .catch(error => console.log(error); error());
  });
});
