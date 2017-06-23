// @flow
import type { ParentState } from '../Reducers/Parent';
import type { KidsState } from '../Reducers/Kids';

import Intercom from 'react-native-intercom';
import Analytics from 'react-native-analytics';
import OneSignal from 'react-native-onesignal';

type GetState = () => {
  parentState: ParentState,
  kidsState: KidsState,
};
type UserLoggedIn = {
  type: 'USER_LOGGED_IN',
  parent: ParentState,
};
type Dispatch = () => UserLoggedIn;

export default () =>
  async (dispatch: Dispatch, getState: GetState): Promise<UserLoggedIn> => {
    const { parentState, kidsState } = getState();
    const { UUID, name, email, kids } = parentState;

    // This should not happen.
    if (!UUID) {
      throw new Error('Error logging user in - UUID not found!');
    }

    // No Analytics in __DEV__
    if (__DEV__) {
      return dispatch({
        type: 'USER_LOGGED_IN',
        parent: parentState,
      });
    }

    const kidUUID = kids[0];

    const kidName = kidsState[kidUUID].name;

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
        kidName,
      }),
    ]);

    return dispatch({
      type: 'USER_LOGGED_IN',
      parent: parentState,
    });
  };
