import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('LoginWithMethod', () => {
  it('logs the user in, saves the profile in AsyncStorage, then dispatches LOGGED_IN', (done) => {
    // Setup
    const TEST_DISPATCH = sinon.spy();
    const TEST_LOCK = sinon.mock();
    const TEST_PROFILE = { name: 'Test Name' };
    const TEST_METHOD = 'test';
    TEST_LOCK.callsArgWith(1, null, TEST_PROFILE);

    const loginWithMethod = proxyquire.noCallThru()('../../App/Actions/LoginWithMethod', {
      'react-native-lock': () => ({ show: TEST_LOCK  }),
    }).default;

    // Exercise
    const action = loginWithMethod(TEST_METHOD);
    const promise = action(TEST_DISPATCH);

    // Verify
    promise.then(() => {
      expect(TEST_LOCK.calledWith(
        { closable: true, connections: [TEST_METHOD] }, 
        sinon.match(sinon.match.func)
      )).to.equal(true);

      expect(TEST_DISPATCH.calledWithMatch({ type: 'LOGGED_IN', profile: TEST_PROFILE})).to.equal(true);

      done();
    }).catch(e => done(e));

  });
});

