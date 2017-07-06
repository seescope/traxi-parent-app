jest.mock('../PersistParent', () =>
  jest.fn(() => ({
    type: 'TEST_PERSIST_PARENT',
  })));
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import upgradeAccount from '../UpgradeAccount';
import InAppBilling from 'react-native-billing';
import mockPersistParent from '../PersistParent';
import { Platform, NativeModules } from 'react-native';

NativeModules.InAppUtils = {
  loadProducts: (_, cb) => cb(),
  purchaseProduct: (_, cb) =>
    cb(null, { transactionIdentifier: 'test-order-id' }),
};

const TEST_PARENT = {
  UUID: 'abc-123',
  name: 'Jeff',
};

describe('UpgradeAccount', () => {
  test('On Android, calls react-native-in-app-billing, persists the parent, saves a record in Firebase and dispatches ACCOUNT_UPGRADED', () => {
    Platform.OS = 'android';

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: TEST_PARENT,
    });

    return store.dispatch(upgradeAccount()).then(() => {
      expect(InAppBilling.open).toHaveBeenCalled();
      expect(InAppBilling.subscribe).toHaveBeenCalledWith(
        'traxi_for_families_199'
      );
      expect(InAppBilling.close).toHaveBeenCalled();

      const [action] = store.getActions();

      expect(action.type).toEqual('ACCOUNT_UPGRADED');
      expect(action.upgradedAt).toBeDefined();
      expect(action.orderId).toEqual('test-order-id');
      expect(mockPersistParent).toHaveBeenCalled();
    });
  });

  test('On iOS, calls react-native-in-app-utils, persists the parent, saves a record in Firebase and dispatches ACCOUNT_UPGRADED', () => {
    Platform.OS = 'ios';

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: TEST_PARENT,
    });

    return store.dispatch(upgradeAccount()).then(() => {
      expect(InAppBilling.open).toHaveBeenCalled();
      expect(InAppBilling.subscribe).toHaveBeenCalledWith(
        'traxi_for_families_199'
      );
      expect(InAppBilling.close).toHaveBeenCalled();

      const [action] = store.getActions();

      expect(action.type).toEqual('ACCOUNT_UPGRADED');
      expect(action.upgradedAt).toBeDefined();
      expect(action.orderId).toEqual('test-order-id');
      expect(mockPersistParent).toHaveBeenCalled();
    });
  });
});
