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
jest.mock('../GetInitialUsage', () =>
  () =>
    dispatch => Promise.resolve(dispatch({ type: 'TEST_GET_INITIAL_USAGE' })));
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

  test('If there are installed kids in kidState, and activatedAt is set, fetch reports and navigate to dashboard', () => {
    const STATE_WITH_KIDS = {
      kidsState: {
        '123-abc': {
          installed: true,
        },
      },
      parentState: {
        UUID: 'abc-123',
        name: 'Jeff',
        email: 'test@email.com',
        password: 'password',
        createdAt: 'some date',
        activatedAt: 'some date',
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

  test('If there are no installed kids in kidState, and the parent has no name/email/password checkDeeplink', () => {
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

  test('If there are installed kids, but the parent does not have activatedAt, show initialUsage', () => {
    const STATE_WITH_INCOMPLETE_SETUP = {
      kidsState: {
        '123-abc': {
          installed: true,
        },
      },
      parentState: {
        UUID: 'abc-123',
        createdAt: 'some date',
      },
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(STATE_WITH_INCOMPLETE_SETUP);

    return store.dispatch(bootApp()).then(() => {
      expect(Actions.initialUsage).toHaveBeenCalled();
      const action = store.getActions()[0];
      expect(action.type).toEqual('TEST_USER_LOGGED_IN');
      const secondAction = store.getActions()[1];
      expect(secondAction.type).toEqual('TEST_GET_INITIAL_USAGE');
    });
  });

  test('If the parent has details but the kid does not, reset the setup state and go to setName', () => {
    const STATE_WITH_PARENT_AND_NO_KIDS = {
      kidsState: {
        '123-abc': {
          UUID: 'abc-123',
        },
      },
      parentState: {
        UUID: 'abc-123',
        name: 'Jeff',
        email: 'test@email.com',
        createdAt: 'some date',
      },
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(STATE_WITH_PARENT_AND_NO_KIDS);

    return store.dispatch(bootApp()).then(() => {
      expect(Actions.setName).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0].type).toEqual('TEST_USER_LOGGED_IN');
      expect(actions[1].type).toEqual('RESET_SETUP_STATE');
    });
  });

  test('If the parent is upgrading from a version that did not have the createdAt or activatedAt string, check to see if the kid was installed, then update the parent accordingly', () => {
    const STATE_WITH_OLD_PARENT_AND_INSTALLED_KIDS = {
      kidsState: {
        '123-abc': {
          UUID: 'abc-123',
          installed: true,
        },
      },
      parentState: {
        UUID: 'abc-123',
        name: 'Jeff',
        email: 'test@email.com',
      },
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(STATE_WITH_OLD_PARENT_AND_INSTALLED_KIDS);

    return store.dispatch(bootApp()).then(() => {
      const actions = store.getActions();

      expect(actions[0].type).toEqual('ACTIVATED_PARENT');
      expect(actions[1].type).toEqual('TEST_USER_LOGGED_IN');
      expect(actions[2].type).toEqual('TEST_FETCH_REPORTS');

      expect(Actions.dashboard).toHaveBeenCalled();
    });
  });
});
