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
    return loginWithMethod(TEST_METHOD)(mockDispatch).then(() => {
      expect(mockAuthenticate).toHaveBeenCalled();
      expect(mockDispatch.mock.calls).toMatchSnapshot();

      done();
    }).catch(e => done(e));
  });
});

