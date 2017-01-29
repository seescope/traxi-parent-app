import loginWithMethod from '../../App/Actions/LoginWithMethod';
import { NativeModules } from 'react-native';

describe('LoginWithMethod', () => {
  it('logs the user in, saves the profile in AsyncStorage, then dispatches LOGGED_IN', (done) => {
    // Setup
    const TEST_METHOD = 'anonymous';
    const TEST_PROFILE = { name: 'TEST' };

    const mockDispatch = jest.fn();
    const mockAuthenticate = jest.fn(() => Promise.resolve(TEST_PROFILE));

    NativeModules.Authentication = {
      authenticate: mockAuthenticate,
    };

    // Exercise
    return loginWithMethod(TEST_METHOD)(mockDispatch).then(profile => {
      expect(mockAuthenticate).toHaveBeenCalled();
      expect(mockDispatch.mock.calls).toMatchSnapshot();
      expect(profile).toEqual(TEST_PROFILE);

      done();
    }).catch(e => {
      done.fail(e);
    });
  });
});

