jest.mock('../UpgradeAccount', () =>
  jest.fn(() => ({
    type: 'TEST_UPGRADE_ACCOUNT',
  })));
jest.mock('../PersistParent', () =>
  jest.fn(() => ({
    type: 'TEST_PERSIST_PARENT',
  })));
jest.mock('../PersistKid', () =>
  jest.fn(() => ({
    type: 'TEST_PERSIST_KID',
  })));

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';

import addAdditionalChild from '../AddAdditionalChild';
import mockUpgradeAccount from '../UpgradeAccount';
import mockPersistParent from '../PersistParent';
import mockPersistKid from '../PersistKid';

const TEST_PARENT = {
  UUID: 'abc-123',
  name: 'Jeff',
};

const TEST_UUID = 'non-random-uuid';

const TEST_NEW_KID = {
  UUID: TEST_UUID,
};

describe('AddAdditionalChild', () => {
  test('Handles when a parent is already upgraded', () => {
    const upgradedParent = {
      ...TEST_PARENT,
      upgradedAt: 'SOME_TIME',
    };
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: upgradedParent,
      kidsState: {
        [TEST_UUID]: TEST_NEW_KID,
      },
    });

    return store.dispatch(addAdditionalChild()).then(() => {
      expect(mockUpgradeAccount).not.toHaveBeenCalled();

      const [action] = store.getActions();
      expect(action.type).toEqual('ADDED_ADDITIONAL_CHILD');
      expect(action.UUID).toEqual(TEST_UUID);

      expect(mockPersistParent).toHaveBeenCalled();
      expect(mockPersistKid).toHaveBeenCalledWith(TEST_NEW_KID);
    });
  });

  test('Throws error if parent is not already upgraded', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: TEST_PARENT,
      kidsState: {
        [TEST_UUID]: TEST_NEW_KID,
      },
    });

    return store.dispatch(addAdditionalChild()).catch(error => {
      expect(error).toBeDefined();
    });
  });
});
