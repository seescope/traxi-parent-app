// @flow
import type { ParentState } from '../Reducers/Parent';
import Intercom from 'react-native-intercom';
import Analytics from 'react-native-analytics';
import OneSignal from 'react-native-onesignal';

type GetState = () => {
  parentState: ParentState
};
type UserLoggedIn = {
  type: 'USER_LOGGED_IN',
  parent: ParentState
};
type Dispatch = () => UserLoggedIn;

export default () =>
  async (dispatch: Dispatch, getState: GetState): Promise<UserLoggedIn> => {
    const { parentState } = getState();
    const { UUID, name, email } = parentState;

    console.log(parentState);

    // No Analytics in __DEV__
    if (__DEV__) {
      return dispatch({
        type: 'USER_LOGGED_IN',
        parent: parentState,
      });
    }

    await Promise.all([
      Analytics.identify(UUID, {
        name,
        email,
      }),
      Intercom.registerIdentifiedUser({
        userId: UUID,
      }),
      OneSignal.sendTags({
        name,
        segmentio_id: UUID,
        UUID,
        email,
      }),
    ]);

    return dispatch({
      type: 'USER_LOGGED_IN',
      parent: parentState,
    });
  };
