import saveProfile from '../../App/Actions/SaveProfile';
import { NativeModules, AsyncStorage } from 'react-native';
import { mockSet } from 'firebase-old';

describe('saveProfile', () => {
  it('saves the profile to AsyncStorage', () => {
    const mockSetItem = jest.fn(() => Promise.resolve());
    const mockRegister = jest.fn(() => Promise.resolve('mock-token'));

    AsyncStorage.setItem = mockSetItem;
    NativeModules.NotificationManager = { register: mockRegister };

    const TEST_KID = { name: 'bob' };
    const TEST_USER_ID = 'arbostrisand';
    const TEST_PROFILE = { UUID: TEST_USER_ID };

    return saveProfile(TEST_PROFILE, TEST_KID).then(() => {
      expect(mockSetItem.mock.calls).toMatchSnapshot();
      expect(mockSet.mock.calls).toMatchSnapshot();
    });
  });
});
