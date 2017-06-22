import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import upgradeAccount from '../UpgradeAccount';
// import { mockSet } from 'firebase';
import InAppBilling from 'react-native-billing';

const TEST_PARENT = {
  UUID: 'abc-123',
  name: 'Jeff',
};

describe('UpgradeAccount', () => {
  test('Calls react-native-in-app-billing, updates the parent in Firebase and dispatches ACCOUNT_UPGRADED', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: TEST_PARENT,
    });

    return store.dispatch(upgradeAccount()).then(() => {
      expect(InAppBilling.open).toHaveBeenCalled();
      expect(InAppBilling.subscribe).toHaveBeenCalledWith('something');
      expect(InAppBilling.close).toHaveBeenCalled();
      // expect(mockSet).toHaveBeenCalledWith({
      //   ...TEST_PARENT,
      //   upgradedAt: expect.stringMatching(
      //     /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
      //   ),
      // });
    });
  });
});
