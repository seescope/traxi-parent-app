/* eslint no-confusing-arrow:0 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import beginDeeplinkSetup from '../BeginDeeplinkSetup';
jest.mock('../UserLoggedIn', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_USER_LOGGED_IN' })));
jest.mock('../PersistSetupID', () =>
  () =>
    dispatch => Promise.resolve(dispatch({ type: 'TEST_PERSIST_SETUP_ID' })));

const mockKid = {
  name: 'Something',
  UUID: 'abc-123',
};

let mockParent = {
  email: 'something',
  kids: ['abc-123'],
  UUID: 'def-456',
};

jest.mock('firebase', () => ({
  database: () => ({
    ref: path => ({
      once: () =>
        Promise.resolve({
          val: () => path.includes('parents') ? mockParent : mockKid,
        }),
    }),
  }),
}));

describe('Begin Deeplink Setup', () => {
  test('Fetches parent and kid from Firebase, then dispatches BEGIN_DEEPLINK_SETUP, then navigates to setKidImage', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore();

    return store.dispatch(beginDeeplinkSetup('abc-123')).then(() => {
      let action = store.getActions()[0];
      expect(action.type).toEqual('BEGIN_DEEPLINK_SETUP');
      expect(action.kid).toEqual(mockKid);
      expect(action.parent).toEqual(mockParent);
      expect(Actions.setKidImage).toHaveBeenCalled();

      action = store.getActions()[1];
      expect(action.type).toEqual('TEST_USER_LOGGED_IN');
    });
  });

  test('Handles condition where parent is not in DB', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore();
    mockParent = undefined;

    return store.dispatch(beginDeeplinkSetup('abc-123')).then(() => {
      const action = store.getActions()[0];
      expect(store.getActions()[0].type).toEqual('BEGIN_SETUP');
      expect(store.getActions()[0].parentUUID).toEqual('abc-123');
      expect(store.getActions()[1].type).toEqual('TEST_PERSIST_SETUP_ID');
      expect(store.getActions()[2].type).toEqual('TEST_USER_LOGGED_IN');
      expect(Actions.splashScreen).toHaveBeenCalled();
    });
  });
});
