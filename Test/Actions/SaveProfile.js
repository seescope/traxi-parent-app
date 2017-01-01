import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('saveProfile', () => {
  it('saves the profile to AsyncStorage', (done) => {
    const TEST_KID = { name: 'bob' };
    const TEST_USER_ID = 'arbostrisand';
    const TEST_PROFILE = { UUID: TEST_USER_ID };
    const TEST_TOKEN = '123abc';
    const TEST_ASYNC_STORAGE = {
      setItem: (key) => Promise.resolve(key),
    };
    const TEST_NOTIFICATION_MANAGER = {
      register: (uuid) => Promise.resolve(TEST_TOKEN),
    };
    const TEST_FIREBASE = {
      set: (key, value) => {},
    };

    const ASYNC_STORAGE_SPY = sinon.spy(TEST_ASYNC_STORAGE, 'setItem');
    const NOTIFICATION_MANAGER_SPY = sinon.spy(TEST_NOTIFICATION_MANAGER, 'register');
    const FIREBASE_SPY = sinon.stub(TEST_FIREBASE, 'set');

    FIREBASE_SPY.callsArgWith(1, null);

    const EXPECTED_PROFILE = {
      UUID: TEST_USER_ID,
      kids: [TEST_KID],
      token: TEST_TOKEN,
    };

    const saveProfile = proxyquire.noCallThru()('../../App/Actions/SaveProfile', {
      'react-native': {
        NativeModules: {
          NotificationManager: TEST_NOTIFICATION_MANAGER,
        },
        AsyncStorage: TEST_ASYNC_STORAGE,
      },
      'firebase': () => TEST_FIREBASE,
    }).default;

    saveProfile(TEST_PROFILE, TEST_KID).then(() => {
      const profile = ASYNC_STORAGE_SPY.getCall(0).args[1];
      expect(profile).to.eql(JSON.stringify(EXPECTED_PROFILE));

      const firebaseProfile = FIREBASE_SPY.getCall(0).args[0];
      expect(firebaseProfile).to.eql(EXPECTED_PROFILE);

      done();
    }).catch(e => done(e));
  });
});
