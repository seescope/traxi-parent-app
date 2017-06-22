jest.mock('../PersistParent', () =>
  jest.fn(() => ({
    type: 'TEST_PERSIST_PARENT',
  })));
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import upgradeAccount from '../UpgradeAccount';
import InAppBilling from 'react-native-billing';
import mockPersistParent from '../PersistParent';

const TEST_PARENT = {
  UUID: 'abc-123',
  name: 'Jeff',
};

describe('UpgradeAccount', () => {
  test('Calls react-native-in-app-billing, persists the parent and dispatches ACCOUNT_UPGRADED', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: TEST_PARENT,
    });

    return store.dispatch(upgradeAccount()).then(() => {
      expect(InAppBilling.open).toHaveBeenCalled();
      expect(InAppBilling.subscribe).toHaveBeenCalledWith('something');
      expect(InAppBilling.close).toHaveBeenCalled();
      const [action] = store.getActions();
      expect(action.type).toEqual('ACCOUNT_UPGRADED');
      expect(mockPersistParent).toHaveBeenCalled();
    });
  });
});
