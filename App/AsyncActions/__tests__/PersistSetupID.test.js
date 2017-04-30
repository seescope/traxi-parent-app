import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import persistSetupID from '../PersistSetupID';
import { mockSet } from 'firebase';

const TEST_SETUP_STATE = {
  setupID: 1234,
  kidUUID: 'abc-123',
};

describe('PersistSetupID', () => {
  test('Fetches the SetupID from the store and persists it in Firebase', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      setupState: TEST_SETUP_STATE,
    });

    return store.dispatch(persistSetupID()).then(() => {
      expect(mockSet).toHaveBeenCalledWith(TEST_SETUP_STATE.kidUUID);
    });
  });
});
