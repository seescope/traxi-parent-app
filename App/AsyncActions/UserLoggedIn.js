// @flow
import Intercom from 'react-native-intercom';
import Analytics from 'react-native-analytics';
import OneSignal from 'react-native-onesignal';

import type { Dispatch, GetState } from '../Reducers';

const callAnalytics = (
  UUID: string,
  name: ?string,
  email: ?string,
  kidName: ?string
): Promise<void> =>
  Analytics.identify(UUID, {
    name,
    email,
    kidName,
  });

const callIntercom = (UUID: string): Promise<void> =>
  Intercom.registerIdentifiedUser({ userId: UUID });

const callOneSignal = (
  name: ?string,
  UUID: string,
  email: ?string,
  kidName: ?string
): Promise<void> =>
  OneSignal.sendTags({
    name,
    segmentio_id: UUID,
    UUID,
    email,
    kidName,
  });

export default () =>
  async (dispatch: Dispatch, getState: GetState): Promise<void> => {
    const { parentState, kidsState } = getState();
    const { UUID, name, email, kids } = parentState;

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
      return;
    }

    const kidUUID = kids[0];
    const kidName = kidsState[kidUUID].name;

    await Promise.all([
      callAnalytics(UUID, name, email, kidName),
      callIntercom(UUID, email),
      callOneSignal(name, UUID, email, kidName),
    ]);

    dispatch({
      type: 'USER_LOGGED_IN',
      parent: parentState,
    });
  };
