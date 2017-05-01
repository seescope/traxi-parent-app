import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import persistKid from '../PersistKid';
import { mockSet } from 'firebase';

const TEST_KID = {
  UUID: 'abc-123',
  name: 'Jeff',
};

const TEST_SETUP_STATE = {
  kidUUID: TEST_KID.UUID,
};

describe('PersistKid', () => {
  test('If no kid specified, it fetches the SetupID and Kid from the store and persists it in Firebase', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      kidsState: {
        [TEST_KID.UUID]: TEST_KID,
      },
      setupState: TEST_SETUP_STATE,
    });

    return store.dispatch(persistKid()).then(() => {
      expect(mockSet).toHaveBeenCalledWith(TEST_KID);
    });
  });

  test('Persists a kid if one is specified', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});

    return store.dispatch(persistKid(TEST_KID)).then(() => {
      expect(mockSet).toHaveBeenCalledWith(TEST_KID);
    });
  });
});
