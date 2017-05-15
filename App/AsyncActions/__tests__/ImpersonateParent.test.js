/* eslint no-confusing-arrow:0 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import impersonateParent from '../ImpersonateParent';
jest.mock('../FetchReports', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'TEST_FETCH_REPORTS' })));

const mockKid = {
  name: 'Something',
  UUID: 'abc-123',
};

const mockParent = {
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

describe('Impersonate Parent', () => {
  test('Fetches parent and kid from Firebase, then dispatches IMPERSONATED_PARENT, then navigates to dashboard', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore();

    return store.dispatch(impersonateParent(mockParent.UUID)).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('IMPERSONATED_PARENT');
      expect(action.kids).toEqual({ 'abc-123': mockKid });
      expect(action.parent).toEqual(mockParent);
      expect(Actions.dashboard).toHaveBeenCalled();

      const fetchReportsAction = store.getActions()[1];
      expect(fetchReportsAction.type).toEqual('TEST_FETCH_REPORTS');
    });
  });
});
