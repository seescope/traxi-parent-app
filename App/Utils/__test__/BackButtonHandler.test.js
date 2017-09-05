import { Actions } from 'react-native-router-flux';
import backButtonHandler from '../BackButtonHandler';

describe('backButtonHandler', () => {
  beforeEach(() => {
    Actions.pop.mockClear();
    Actions.androidBack.mockClear();
  });

  test('It handles back button on a normal scene', () => {
    const TEST_STATE = {
      setupState: {
        step: 1,
        sceneName: 'something',
      },
    };
    const testStore = { getState: () => TEST_STATE };

    backButtonHandler(testStore);
    expect(Actions.androidBack).toHaveBeenCalled();
  });

  test('It handles back button on step 0 of deviceSetup', () => {
    const TEST_STATE = {
      setupState: {
        step: 0,
        sceneName: 'deviceSetup',
      },
    };
    const testStore = { getState: () => TEST_STATE };

    backButtonHandler(testStore);
    expect(Actions.pop).toHaveBeenCalled();
  });

  test('It handles back button on step 1 of deviceSetup', () => {
    const TEST_STATE = {
      setupState: {
        step: 1,
        sceneName: 'deviceSetup',
      },
    };
    const MOCK_DISPATCH = jest.fn();
    const testStore = { dispatch: MOCK_DISPATCH, getState: () => TEST_STATE };

    backButtonHandler(testStore);
    expect(Actions.pop).not.toHaveBeenCalled();
    expect(MOCK_DISPATCH).toHaveBeenCalledWith({ type: 'PREVIOUS_STEP' });
  });
});
