let mockUUID = undefined;
jest.mock('../BeginDeeplinkSetup', () =>
  () =>
    dispatch =>
      Promise.resolve(dispatch({ type: 'TEST_BEGIN_DEEPLINK_SETUP' })));
jest.mock('../PersistSetupID', () =>
  () =>
    dispatch => Promise.resolve(dispatch({ type: 'TEST_PERSIST_SETUP_ID' })));
jest.mock('../PersistKid', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_PERSIST_KID' })));
jest.mock('../../Utils', () => ({
  getUUIDFromDeeplink: () => Promise.resolve(mockUUID),
}));
jest.mock('../UserLoggedIn', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_USER_LOGGED_IN' })));

import { Actions } from 'react-native-router-flux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import checkDeeplink from '../CheckDeeplink';

describe('CheckDeeplink', () => {
  test('If there is an initialURL, beginDeeplinkSetup', () => {
    mockUUID = 'abc-123';

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(undefined);

    return store.dispatch(checkDeeplink()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('TEST_USER_LOGGED_IN');

      const secondAction = store.getActions()[1];
      expect(secondAction.type).toEqual('TEST_BEGIN_DEEPLINK_SETUP');
    });
  });

  test('If there is no initialURL, dispatch BEGIN_SETUP and navigate to Splash Screen', () => {
    mockUUID = null;

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: {
        UUID: 'abc-123',
      },
      setupState: {
        setupID: 1234,
        kidUUID: 'abc-123',
      },
    });

    return store.dispatch(checkDeeplink()).then(() => {
      expect(store.getActions()[0].type).toEqual('BEGIN_SETUP');
      expect(store.getActions()[1].type).toEqual('TEST_PERSIST_SETUP_ID');
      expect(store.getActions()[2].type).toEqual('TEST_USER_LOGGED_IN');
      expect(Actions.splashScreen).toHaveBeenCalled();
    });
  });
});
