import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import persistParent from '../PersistParent';
import { mockSet } from 'firebase';

const TEST_PARENT = {
  UUID: 'abc-123',
  name: 'Jeff',
};

describe('PersistParent', () => {
  test('Fetches the Parent from the store and persists it in Firebase', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: TEST_PARENT,
    });

    return store.dispatch(persistParent()).then(() => {
      expect(mockSet).toHaveBeenCalledWith(TEST_PARENT);
    });
  });
});
