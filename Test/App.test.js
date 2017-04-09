import { AsyncStorage, Linking, NativeModules } from 'react-native';
import { getUUID } from '../App.js';

const TEST_UUID = 'af398e76-0de9-4980-b5ca-2f254be164fd';
const TEST_PROFILE_JSON = JSON.stringify({ UUID: TEST_UUID });
const TEST_URL = `https://c7g74.app.goo.gl/?link=http://www.gettraxi.com/?data=${TEST_UUID}&apn=com.traxi&ibi=com.traxi.app&isi=1195455850`;

describe('App', () => {
  it('getUUID() finds the UUID when it is available from AsyncStorage', done => {
    AsyncStorage.getItem = () => Promise.resolve(TEST_PROFILE_JSON);

    getUUID()
      .then(result => {
        expect(result).toEqual({ UUID: TEST_UUID, deeplink: false });
        done();
      })
      .catch(done.fail);
  });

  it('getUUID() finds the UUID from deeplink when it is not present in AsyncStorage', done => {
    AsyncStorage.getItem = () => Promise.resolve();

    // This module is initialised strangely.
    NativeModules.LinkingManager = {
      getInitialURL: () => Promise.resolve(TEST_URL),
    };
    Linking.getInitialURL = () => Promise.resolve(TEST_URL);

    getUUID()
      .then(result => {
        expect(result).toEqual({ UUID: TEST_UUID, deeplink: true });
        done();
      })
      .catch(done.fail);
  });

  it('getUUID() returns null if there is no profile in AsyncStorage and the deeplink is invalid', done => {
    AsyncStorage.getItem = () => Promise.resolve();

    // This module is initialised strangely.
    NativeModules.LinkingManager = {
      getInitialURL: () => Promise.resolve('nonsenseurl'),
    };
    Linking.getInitialURL = () => Promise.resolve('nonsenseurl');

    getUUID()
      .then(result => {
        expect(result).toEqual(null);
        done();
      })
      .catch(done.fail);
  });

  it('getUUID() returns null if there is no profile in AsyncStorage and there is no deeplink', done => {
    AsyncStorage.getItem = () => Promise.resolve();

    // This module is initialised strangely.
    NativeModules.LinkingManager = { getInitialURL: () => Promise.resolve() };
    Linking.getInitialURL = () => Promise.resolve();

    getUUID()
      .then(result => {
        expect(result).toEqual(null);
        done();
      })
      .catch(done.fail);
  });
});
