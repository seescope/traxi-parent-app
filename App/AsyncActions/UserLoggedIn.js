// @flow
import Intercom from 'react-native-intercom';
import Analytics from 'react-native-analytics';
import OneSignal from 'react-native-onesignal';

import type { Dispatch, GetState } from '../Reducers';

export default () =>
  async (dispatch: Dispatch, getState: GetState): Promise<void> => {
    const { parentState } = getState();
    const { UUID, name, email } = parentState;

    // This should not happen.
    if (!UUID) {
      throw new Error('Error logging user in - UUID not found!');
    }

    // No Analytics in __DEV__
    if (__DEV__) {
      dispatch({
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

    dispatch({
      type: 'USER_LOGGED_IN',
      parent: parentState,
    });
  };
