import { AsyncStorage, Linking } from 'react-native';
jest.mock('Linking', () => ({
  getInitialURL: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
}));
import { getUUID, getProfile } from '../App';

describe('App.js', () => {
  it('getUUID() works with previous user having a profile in AsyncStorage', async () => {
    AsyncStorage.getItem = () =>
      Promise.resolve(JSON.stringify({ UUID: 'YwS0vJ8OE8N6yenxHaV6PdMVLbG3' }));

    const result = await getUUID();
    expect(result).toEqual({
      UUID: 'YwS0vJ8OE8N6yenxHaV6PdMVLbG3',
      deeplink: false,
    });
  });

  it('getUUID() works with new user coming from a deeplink', async () => {
    AsyncStorage.getItem = () => Promise.resolve();
    Linking.getInitialURL = () =>
      Promise.resolve(
        'https://c7g74.app.goo.gl/?link=http://www.gettraxi.com/?data=YwS0vJ8OE8N6yenxHaV6PdMVLbG3&apn=com.traxi&ibi=com.traxi.app&isi=1195455850',
      );

    const result = await getUUID();
    expect(result).toEqual({
      UUID: 'YwS0vJ8OE8N6yenxHaV6PdMVLbG3',
      deeplink: true,
    });
  });

  it('getUUID() send back null for new users', async () => {
    AsyncStorage.getItem = () => Promise.resolve();
    Linking.getInitialURL = () => Promise.resolve();

    const result = await getUUID();
    expect(result).toBe(null);
  });

  it('getProfile()', async () => {
    const profile = await getProfile('UUID');
    expect(profile).toMatchSnapshot();
  });
});
