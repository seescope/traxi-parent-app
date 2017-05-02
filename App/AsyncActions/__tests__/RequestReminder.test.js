import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import requestReminder from '../RequestReminder';
import Analytics from 'react-native-analytics';

const TEST_STATE = {
  parentState: {
    UUID: 'abc-123',
    email: 'enakudesu@gmail.com',
  },
  kidsState: {
    'abc-123': {
      name: 'Test Kid',
    },
  },
  setupState: {
    setupID: 1234,
    kidUUID: 'abc-123',
  },
};

describe('Request Reminder', () => {
  test('Fetches the SetupID from the store and persists it in Firebase', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(TEST_STATE);

    return store.dispatch(requestReminder()).then(() => {
      expect(Analytics.track).toHaveBeenCalledWith('Reminder requested', {
        email: 'enakudesu@gmail.com',
        kidName: 'Test Kid',
      });
      expect(Analytics.identify).toHaveBeenCalledWith('abc-123', {
        kidName: 'Test Kid',
      });
    });
  });
});
