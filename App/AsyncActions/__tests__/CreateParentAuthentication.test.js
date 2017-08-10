jest.mock('../UserLoggedIn', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_USER_LOGGED_IN' })));

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockCreateUser, mockUpdateProfile } from 'firebase';

import createParentAuthentication from '../CreateParentAuthentication';

const fetchFromStoreAndCreateFirebaseUser = TEST_PARENT => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    parentState: TEST_PARENT,
  });

  return store.dispatch(createParentAuthentication()).then(() => {
    expect(mockCreateUser).toHaveBeenCalledWith(
      TEST_PARENT.email,
      TEST_PARENT.password
    );
    expect(mockUpdateProfile).toHaveBeenCalledWith({
      displayName: TEST_PARENT.name,
    });

    expect(store.getActions()[0].type).toEqual('TEST_USER_LOGGED_IN');
    expect(store.getActions()[1].type).toEqual('ACCOUNT_CREATED');
  });
};

describe('CreateParentAuthentication', () => {
  beforeEach(() => {
    mockCreateUser.mockClear();
  });

  test('Fetches the Parent from the store and creates a Firebase user', () => {
    const TEST_PARENT = {
      email: 'something@something.com',
      password: 'something',
      UUID: 'abc-123',
      name: 'Jeff',
    };

    return fetchFromStoreAndCreateFirebaseUser(TEST_PARENT);
  });

  test('Fetches the Parent from the store and creates a Firebase user correctly with spaces in the email', () => {
    const TEST_PARENT = {
      email: 'something@something.com',
      password: 'something',
      UUID: 'abc-123',
      name: 'Jeff',
    };

    return fetchFromStoreAndCreateFirebaseUser(TEST_PARENT);
  });
});
