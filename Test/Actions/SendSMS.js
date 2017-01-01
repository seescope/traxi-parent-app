import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('sendSMS', () => {
  it('dispatches a SENDING_SMS action, calls fetch, then dispatches SMS_SENT', (done) => {
    const TEST_KID = { name: 'Test Name', phoneNumber: '+61401633346' };
    const TEST_FETCH = sinon.mock();
    const TEST_DISPATCH = sinon.spy();
    const TEST_APPEND = sinon.spy();
    const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    const TEST_FIREBASE = { set: sinon.mock() };

    // Mock out dependencies
    global.fetch = TEST_FETCH;
    global.FormData = () => ({ append: TEST_APPEND });
    TEST_FIREBASE.set.callsArgWith(1, null);

    const sendSMS = proxyquire.noCallThru()('../../App/Actions/SendSMS', {
      'firebase': () => TEST_FIREBASE,
    }).default;

    // Exercise
    const action = sendSMS(TEST_KID);
    const promise = action(TEST_DISPATCH);

    const EXPECTED_KID = {
      ...TEST_KID,
      status: 'DOWNLOADING',
    };

    promise.then(() => {
      expect(TEST_DISPATCH.calledWith({ type: 'SENDING_SMS'})).to.equal(true);
      expect(TEST_FETCH.calledOnce).to.equal(true);
      expect(TEST_APPEND.getCall(2).args[1]).to.match(UUID_REGEX);
      expect(TEST_FIREBASE.set.calledWith(EXPECTED_KID)).to.equal(true);

      const action = TEST_DISPATCH.getCall(1).args[0];
      expect(action.type).to.equal('SMS_SENT');
      expect(action.UUID).to.match(UUID_REGEX);

      done();
    }).catch(e => done(e));
  });
});
