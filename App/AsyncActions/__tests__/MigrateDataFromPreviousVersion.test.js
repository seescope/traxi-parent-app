jest.mock('../PersistKid', () =>
  kid => dispatch => Promise.resolve(dispatch({ type: 'KID_PERSISTED', kid })));
jest.mock('../PersistParent', () =>
  () => dispatch => Promise.resolve(dispatch({ type: 'PARENT_PERSISTED' })));
import configureMockStore from 'redux-mock-store';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import migrateDataFromPreviousVersion from '../MigrateDataFromPreviousVersion';

const EXPECTED_PARENT = {
  UUID: 'YwS0vJ8OE8N6yenxHaV6PdMVLbG3',
  email: 'enakudesu@gmail.com',
  kids: [
    '2f566920-f598-46d2-8bf2-7bcae115bf0a',
    '886b79ea-3572-4b4a-9c25-59b14639ac3d',
  ],
  name: 'Kane Rogers',
  password: undefined,
};

const EXPECTED_KIDS = {
  '2f566920-f598-46d2-8bf2-7bcae115bf0a': {
    UUID: '2f566920-f598-46d2-8bf2-7bcae115bf0a',
    avatarURL: 'http://i.imgur.com/52mRwuE.jpg',
    deviceType: 'Android',
    installed: true,
    name: 'Sam',
  },
  '886b79ea-3572-4b4a-9c25-59b14639ac3d': {
    UUID: '886b79ea-3572-4b4a-9c25-59b14639ac3d',
    avatarURL: 'https://tiestoclublife.files.wordpress.com/2008/08/dj-tiesto-club-life.jpeg',
    deviceType: undefined,
    installed: false,
    name: 'DJ',
  },
};

describe('MigrateDataFromPreviousVersion', () => {
  test('Fetches the SetupID and Kid from the store and persists it in Firebase', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});

    const TEST_PROFILE = {
      UUID: 'abc-123',
    };

    AsyncStorage.removeItem = jest.fn();

    return store
      .dispatch(migrateDataFromPreviousVersion(TEST_PROFILE))
      .then(() => {
        const migratedAction = store.getActions()[0];
        expect(migratedAction.type).toEqual('PROFILE_MIGRATED');
        expect(migratedAction.parent).toEqual(EXPECTED_PARENT);
        expect(migratedAction.kids).toEqual(EXPECTED_KIDS);

        const persistedAction = store.getActions()[1];
        expect(persistedAction.type).toEqual('KID_PERSISTED');
        expect(persistedAction.kid).toEqual(
          EXPECTED_KIDS['2f566920-f598-46d2-8bf2-7bcae115bf0a'],
        );

        const persistedAction2 = store.getActions()[2];
        expect(persistedAction2.type).toEqual('KID_PERSISTED');
        expect(persistedAction2.kid).toEqual(
          EXPECTED_KIDS['886b79ea-3572-4b4a-9c25-59b14639ac3d'],
        );

        const persistedAction3 = store.getActions()[3];
        expect(persistedAction3.type).toEqual('PARENT_PERSISTED');

        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('profile');
      });
  });
});
