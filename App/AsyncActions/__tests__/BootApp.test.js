jest.mock('../CheckDeeplink', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_CHECK_DEEPLINK' })));
jest.mock('../FetchReports', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_FETCH_REPORTS' })));
jest.mock('../MigrateDataFromPreviousVersion', () =>
  profile =>
    dispatch =>
      Promise.resolve(
        dispatch({ type: 'TEST_MIGRATE_DATA_FROM_PREVIOUS_VERSION', profile }),
      ));
import { AsyncStorage } from 'react-native';
import bootApp from '../BootApp';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import Analytics from 'react-native-analytics';
import Intercom from 'react-native-intercom';

describe('Boot App', () => {
  beforeEach(() => {
    Analytics.identify.mockClear();
    Intercom.registerIdentifiedUser.mockClear();
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

      // These must be undefined since our action can't mutate the state of the store
      expect(Analytics.identify).toHaveBeenCalledWith(undefined, {
        name: undefined,
        email: undefined,
      });
      expect(Intercom.registerIdentifiedUser).toHaveBeenCalledWith({
        userId: undefined,
      });

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
      expect(Analytics.identify).toHaveBeenCalledWith('abc-123', {
        name: 'Jeff',
        email: 'test@email.com',
      });
      expect(Intercom.registerIdentifiedUser).toHaveBeenCalledWith({
        userId: 'abc-123',
      });

      expect(action.type).toEqual('TEST_FETCH_REPORTS');
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
      expect(Intercom.registerIdentifiedUser).toHaveBeenCalledWith({
        userId: 'abc-123',
      });
      expect(Analytics.identify).toHaveBeenCalledWith('abc-123', {
        name: undefined,
        email: undefined,
      });
    });
  });
});
