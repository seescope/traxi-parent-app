jest.mock('../UserLoggedIn', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_USER_LOGGED_IN' })));

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createParentAuthentication, {
  removeWhiteSpaceFromEmail,
} from '../CreateParentAuthentication';
import { mockCreateUser, mockUpdateProfile } from 'firebase';

const TEST_PARENT = {
  email: 'something@something.com',
  password: 'something',
  UUID: 'abc-123',
  name: 'Jeff',
};

describe('CreateParentAuthentication', () => {
  test('Fetches the Parent from the store and creates a Firebase user', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: TEST_PARENT,
    });

    return store.dispatch(createParentAuthentication()).then(() => {
      expect(mockCreateUser).toHaveBeenCalledWith(
        TEST_PARENT.email,
        TEST_PARENT.password,
      );
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        displayName: TEST_PARENT.name,
      });

      expect(store.getActions()[0].type).toEqual('TEST_USER_LOGGED_IN');
    });
  });

  test('Trims whitespace from email correctly', () => {
    const email = ' something@something.com ';
    const expected = 'something@something.com';
    expect(removeWhiteSpaceFromEmail(email)).toBe(expected);
  });
});
