// @flow
import { BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import type { RootState, Dispatch } from '../Reducers';

type Store = {
  getState: () => RootState,
  dispatch: Dispatch
};

export default (store: Store) => {
  const { setupState } = store.getState();
  const { sceneName, step } = setupState;

  // Special handling for deviceSetup
  if (sceneName === 'deviceSetup') {
    if (step === 0) Actions.pop();
    else store.dispatch({ type: 'PREVIOUS_STEP' });

    return true;
  }

  try {
    Actions.androidBack();
  } catch (error) {
    // The user is on the root scene. Exit the app.
    BackHandler.exitApp();
    return false;
  }

  // Default
  return true;
};
