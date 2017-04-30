/* eslint no-confusing-arrow:0 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import beginDeeplinkSetup from '../BeginDeeplinkSetup';

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

describe('Begin Deeplink Setup', () => {
  test('Fetches parent and kid from Firebase, then dispatches BEGIN_DEEPLINK_SETUP, then navigates to setKidImage', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore();

    return store.dispatch(beginDeeplinkSetup()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('BEGIN_DEEPLINK_SETUP');
      expect(action.kid).toEqual(mockKid);
      expect(action.parent).toEqual(mockParent);
      expect(Actions.setKidImage).toHaveBeenCalled();
    });
  });
});
