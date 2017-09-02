/* eslint no-native-reassign:0 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchReports from '../FetchReports';

const TEST_KID = {
  UUID: '9995be6e-4454-4e5e-a24d-eb9e0841dc5a',
  name: 'Jeff',
};

describe('FetchReports', () => {
  test('Fetches reports for all kids in KidStore', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      kidsState: {
        [TEST_KID.UUID]: TEST_KID,
      },
    });

    fetch = () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ uuid: TEST_KID.UUID, something: true }]),
      });

    return store.dispatch(fetchReports()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual('FETCHING_REPORTS');
      expect(actions[1].type).toEqual('FETCHED_REPORTS');
      expect(Object.keys(actions[1].reports)).toContain(TEST_KID.UUID);
    });
  });
});
