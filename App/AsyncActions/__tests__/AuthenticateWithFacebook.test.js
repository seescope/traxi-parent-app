jest.mock('../UserLoggedIn', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_USER_LOGGED_IN' })));

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockSignInWithCredential } from 'firebase';

import authenticateWithFacebook from '../AuthenticateWithFacebook';

test('Fetches the Parent from the store and creates a Firebase user', () => {
  const TEST_PARENT = {
    UUID: 'abc-123',
  };

  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    parentState: TEST_PARENT,
  });

  return store.dispatch(authenticateWithFacebook()).then(() => {
    expect(mockSignInWithCredential).toHaveBeenCalledWith('MOCK_CREDENTIAL');

    expect(store.getActions()[0].type).toEqual('SET_PARENT_NAME');
    expect(store.getActions()[0].name).toEqual('MOCK_NAME');
    expect(store.getActions()[1].type).toEqual('SET_EMAIL');
    expect(store.getActions()[1].email).toEqual('MOCK_EMAIL');
    expect(store.getActions()[2].type).toEqual('TEST_USER_LOGGED_IN');
    expect(store.getActions()[3].type).toEqual('ACCOUNT_CREATED');
    expect(store.getActions()[3].authenticationMethod).toEqual('Facebook');
  });
});
