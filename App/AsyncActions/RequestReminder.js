// @flow
import Analytics from 'react-native-analytics';
import OneSignal from 'react-native-onesignal';

import type { SetupState } from '../Reducers/Setup';
import type { KidsState } from '../Reducers/Kids';
import type { ParentState } from '../Reducers/Parent';

type Dispatch = () => void;
type RootState = {
  kidsState: KidsState,
  parentState: ParentState,
  setupState: SetupState
};
type GetState = () => RootState;

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { parentState, setupState, kidsState } = getState();
    const { email, UUID } = parentState;
    const { kidUUID } = setupState;

    if (!email) return Promise.reject('No email specified!');
    if (!kidUUID) return Promise.reject('No kid UUID!');

    const { name } = kidsState[kidUUID];

    Analytics.track('Reminder requested', {
      kidName: name,
    });
    Analytics.identify(UUID, { kidName: name, email });
    OneSignal.sendTags({
      UUID,
      kidName: name,
      email,
    });

    return Promise.resolve({
      type: 'REMINDER_REQUESTED',
    });
  };
