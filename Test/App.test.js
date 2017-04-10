import { AsyncStorage, Linking, NativeModules } from 'react-native';
import { getInitialState } from '../App.js';

const TEST_UUID = 'af398e76-0de9-4980-b5ca-2f254be164fd';
const TEST_PROFILE_JSON = JSON.stringify({ UUID: TEST_UUID });
const TEST_URL = `https://c7g74.app.goo.gl/?link=http://www.gettraxi.com/?data=${TEST_UUID}&apn=com.traxi&ibi=com.traxi.app&isi=1195455850`;

describe('App', () => {
  it('getInitialState() finds the UUID when it is available from AsyncStorage', () => {
    AsyncStorage.getItem = () => Promise.resolve(TEST_PROFILE_JSON);

    return getInitialState().then(initialState => {
      expect(initialState.UUID).toEqual(TEST_UUID);
      expect(initialState.profile).toBeDefined();
      expect(initialState.profile).toMatchSnapshot();
      expect(initialState.deeplink).toBe(false);
    });
  });

  it('getInitialState() finds the UUID from deeplink when it is not present in AsyncStorage', () => {
    AsyncStorage.getItem = () => Promise.resolve();

    // This module is initialised strangely.
    NativeModules.LinkingManager = {
      getInitialURL: () => Promise.resolve(TEST_URL),
    };
    Linking.getInitialURL = () => Promise.resolve(TEST_URL);

    return getInitialState().then(initialState => {
      expect(initialState.UUID).toEqual(TEST_UUID);
      expect(initialState.deeplink).toBe(true);
      expect(initialState.profile).toBeDefined();
      expect(initialState.profile).toMatchSnapshot();
    });
  });

  it('getInitialState() returns null if there is no profile in AsyncStorage and the deeplink is invalid', () => {
    AsyncStorage.getItem = () => Promise.resolve();

    // This module is initialised strangely.
    NativeModules.LinkingManager = {
      getInitialURL: () => Promise.resolve('nonsenseurl'),
    };
    Linking.getInitialURL = () => Promise.resolve('nonsenseurl');

    return getInitialState().then(initialState => {
      expect(initialState).toEqual(null);
    });
  });

  it('getInitialState() returns null if there is no profile in AsyncStorage and there is no deeplink', () => {
    AsyncStorage.getItem = () => Promise.resolve();

    // This module is initialised strangely.
    NativeModules.LinkingManager = { getInitialURL: () => Promise.resolve() };
    Linking.getInitialURL = () => Promise.resolve();

    return getInitialState().then(initialState => {
      expect(initialState).toEqual(null);
    });
  });
});
