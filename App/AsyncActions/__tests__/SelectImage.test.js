import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import selectImage from '../SelectImage';

const TEST_SETUP_STATE = {
  setupID: 1234,
  kidUUID: 'abc-123',
};

const TEST_KIDS_STATE = {
  'abc-123': {
    name: 'John Bobson',
  },
};

describe('SelectImage', () => {
  test('Launches the ImagePicker library when didSelectImage is true, dispatches the correct action', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      kidsState: TEST_KIDS_STATE,
      setupState: TEST_SETUP_STATE,
    });

    return store.dispatch(selectImage(true)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual('SET_KID_IMAGE');
    });
  });

  test('Uses a default image when didSelectImage is false, dispatches the correct action', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      kidsState: TEST_KIDS_STATE,
      setupState: TEST_SETUP_STATE,
    });

    const DEFAULT_IMAGE = 'http://i.imgur.com/lQVXriC.png';

    return store.dispatch(selectImage(false)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual('SET_KID_IMAGE');
      expect(actions[0].avatarURL).toEqual(DEFAULT_IMAGE);
    });
  });
});
