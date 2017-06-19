jest.mock('../GetInitialUsage', () =>
  () =>
    dispatch => Promise.resolve(dispatch({ type: 'TEST_GET_INITIAL_USAGE' })));

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import { mockData } from 'firebase';

import watchKid from '../WatchKid';

const TEST_SETUP_STATE = {
  setupID: 1234,
  kidUUID: 'abc-123',
};

describe('WatchKid', () => {
  test('Watches the kid in Firebase, then dispatches KID_UPDATED when it is received', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      setupState: TEST_SETUP_STATE,
    });
    const KID_IN_FIREBASE = {
      name: 'Some Name',
      deviceType: 'Android',
      avatarURL: '',
      UUID: TEST_SETUP_STATE.kidUUID,
      status: 'INSTALLED',
    };

    mockData.data = KID_IN_FIREBASE;

    const EXPECTED_KID = {
      name: KID_IN_FIREBASE.name,
      deviceType: 'Android',
      avatarURL: '',
      UUID: TEST_SETUP_STATE.kidUUID,
      installed: true,
    };

    return store.dispatch(watchKid()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('KID_UPDATED');
      expect(action.kid).toEqual(EXPECTED_KID);
      expect(Actions.initialUsage).toHaveBeenCalled();
    });
  });

  test('Handle bizarre edge case where Firebase event is fired prematurely', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      setupState: TEST_SETUP_STATE,
    });
    const KID_IN_FIREBASE = {
      name: 'Some Name',
      deviceType: 'Android',
      avatarURL: '',
      UUID: TEST_SETUP_STATE.kidUUID,
      installed: true,
    };

    mockData.data = KID_IN_FIREBASE;

    const EXPECTED_KID = {
      name: KID_IN_FIREBASE.name,
      deviceType: 'Android',
      avatarURL: '',
      UUID: TEST_SETUP_STATE.kidUUID,
      installed: true,
    };

    return store.dispatch(watchKid()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('KID_UPDATED');
      expect(action.kid).toEqual(EXPECTED_KID);
      const { type } = store.getActions()[1];
      expect(type).toEqual('TEST_GET_INITIAL_USAGE');
      expect(Actions.initialUsage).toHaveBeenCalled();
    });
  });
});
