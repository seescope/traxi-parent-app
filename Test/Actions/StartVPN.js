import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('startVPN', () => {
  it('calls the native VPNClient method, and saves the kid\'s profile', (done) => {
    const TEST_VPN_CLIENT = { startVPN: sinon.spy(() => Promise.resolve()) };
    const TEST_UUID = 'test';
    const TEST_ASYNC_STORAGE = {
      setItem: (key) => Promise.resolve(key),
    };

    const ASYNC_STORAGE_SPY = sinon.spy(TEST_ASYNC_STORAGE, 'setItem');
    const startVPN = proxyquire.noCallThru()('../../App/Actions/StartVPN', {
      'react-native': {
        AsyncStorage: TEST_ASYNC_STORAGE,
        NativeModules: {
          VPNClient: TEST_VPN_CLIENT,
        }
      },
    }).default;

    startVPN(TEST_UUID).then(() => {
      expect(TEST_VPN_CLIENT.startVPN.calledWith(TEST_UUID)).to.equal(true);
      const profile = ASYNC_STORAGE_SPY.getCall(0).args[1];
      expect(profile).to.eql('{"UUID":"test"}');
      done();
    }).catch(e => done(e));
  });
});
