jest.mock('../CheckDeeplink', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_CHECK_DEEPLINK' })));
jest.mock('../FetchReports', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_FETCH_REPORTS' })));
import bootApp from '../BootApp';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import Analytics from 'react-native-analytics';

describe('Boot App', () => {
  test('If there are installed kids in kidState, and parent name/email is set fetchReports and navigate to Dashboard', () => {
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

  test('If there installed kids, but the parent is not configured, show Congratulations', () => {
    const STATE_WITH_INCOMPLETE_SETUP = {
      kidsState: {
        '123-abc': {
          installed: true,
        },
      },
      parentState: {},
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(STATE_WITH_INCOMPLETE_SETUP);

    return store.dispatch(bootApp()).then(() => {
      expect(Actions.congratulations).toHaveBeenCalled();
    });
  });
});
