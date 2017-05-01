import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import migrateDataFromPreviousVersion from '../MigrateDataFromPreviousVersion';
import { mockSet } from 'firebase';

const TEST_KID = {
  UUID: 'abc-123',
  name: 'Jeff',
};

const TEST_SETUP_STATE = {
  kidUUID: TEST_KID.UUID,
};

describe('MigrateDataFromPreviousVersion', () => {
  test('Fetches the SetupID and Kid from the store and persists it in Firebase', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});

    const TEST_PROFILE = {
      UUID: 'abc-123',
    };

    return store
      .dispatch(migrateDataFromPreviousVersion(TEST_PROFILE))
      .then(() => {
        const action = store.getActions()[0];
        expect(action.type).toEqual('MIGRATE_DATA_FROM_PREVIOUS_VERSION');
        expect(action.parent).toEqual({
          UUID: 'abc-123',
          name: 'Test Parent',
          kids: ['abc-123'],
        });
        expect(action.kid).toEqual({
          UUID: 'abc-123',
          name: 'Test Kid',
        });
      });
  });
});
