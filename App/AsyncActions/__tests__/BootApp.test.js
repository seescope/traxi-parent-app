jest.mock('../CheckDeeplink', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_CHECK_DEEPLINK' })));
jest.mock('../FetchReports', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_FETCH_REPORTS' })));
jest.mock('../UserLoggedIn', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_USER_LOGGED_IN' })));
jest.mock('../MigrateDataFromPreviousVersion', () =>
  profile =>
    dispatch =>
      Promise.resolve(
        dispatch({ type: 'TEST_MIGRATE_DATA_FROM_PREVIOUS_VERSION', profile })
      ));
import { AsyncStorage } from 'react-native';
import bootApp from '../BootApp';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';

describe('Boot App', () => {
  beforeEach(() => {
    AsyncStorage.getItem = () => Promise.resolve();
  });

  test('If an old profile exists in AsyncStorage, migrate the user, fetchReports and navigate to Dashboard', () => {
    const EMPTY_STATE = {
      kidsState: {},
      parentState: {},
    };

    const LEGACY_PROFILE = {
      name: 'Something',
    };

    AsyncStorage.getItem = () =>
      Promise.resolve(JSON.stringify(LEGACY_PROFILE));

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(EMPTY_STATE);

    return store.dispatch(bootApp()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('TEST_MIGRATE_DATA_FROM_PREVIOUS_VERSION');
      expect(action.profile).toEqual(LEGACY_PROFILE);

      const secondAction = store.getActions()[1];
      expect(secondAction.type).toEqual('TEST_FETCH_REPORTS');

      const thirdAction = store.getActions()[2];
      expect(thirdAction.type).toEqual('TEST_USER_LOGGED_IN');

      expect(Actions.dashboard).toHaveBeenCalled();
    });
  });

  test('If there are installed kids in kidState, and parent name/email is set fetchReports and navigate to Dashboard', () => {
    const STATE_WITH_KIDS = {
      kidsState: {
        '123-abc': {
          installed: false,
          status: 'INSTALLED',
        },
      },
      parentState: {
        UUID: 'abc-123',
        name: 'Jeff',
        email: 'test@email.com',
      },
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(STATE_WITH_KIDS);

    return store.dispatch(bootApp()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('TEST_USER_LOGGED_IN');

      const secondAction = store.getActions()[1];
      expect(secondAction.type).toEqual('TEST_FETCH_REPORTS');

      expect(Actions.dashboard).toHaveBeenCalled();
    });
  });

  test('If there are no installed kids in kidState, checkDeeplink', () => {
    const STATE_WITH_NO_KIDS = {
      kidsState: {
        '123-abc': {
          installed: false,
        },
      },
      parentState: {},
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(STATE_WITH_NO_KIDS);

    return store.dispatch(bootApp()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('TEST_CHECK_DEEPLINK');
    });
  });

  test('If there are installed kids, but the parent is not configured, show Congratulations', () => {
    const STATE_WITH_INCOMPLETE_SETUP = {
      kidsState: {
        '123-abc': {
          installed: true,
        },
      },
      parentState: {
        UUID: 'abc-123',
      },
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(STATE_WITH_INCOMPLETE_SETUP);

    return store.dispatch(bootApp()).then(() => {
      expect(Actions.congratulations).toHaveBeenCalled();
      const action = store.getActions()[0];
      expect(action.type).toEqual('TEST_USER_LOGGED_IN');
    });
  });
});
