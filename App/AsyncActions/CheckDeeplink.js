// @flow
import { Actions } from 'react-native-router-flux';
import Analytics from 'react-native-analytics';
import Intercom from 'react-native-intercom';

import beginDeeplinkSetup from './BeginDeeplinkSetup';
import { getUUIDFromDeeplink } from '../Utils';
import { beginSetup } from '../Reducers/Parent/parentActions';
import persistSetupID from './PersistSetupID';
import type { ParentState } from '../Reducers/Parent';
type RootState = {
  parentState: ParentState,
};

type Dispatch = () => void;
type GetState = () => RootState;

export default () =>
  (dispatch: Dispatch, getState: GetState) =>
    getUUIDFromDeeplink().then((UUIDFromDeeplink: string) => {
      if (!UUIDFromDeeplink) {
        dispatch(beginSetup());
        dispatch(persistSetupID());

        const { parentState } = getState();
        const { UUID } = parentState;

        Analytics.identify(UUID);
        Intercom.registerIdentifiedUser({
          userId: UUID,
        });
        Actions.splashScreen({ type: 'replace' });

        return null;
      }

      Analytics.identify(UUIDFromDeeplink);
      Intercom.registerIdentifiedUser({
        userId: UUIDFromDeeplink,
      });

      return dispatch(beginDeeplinkSetup(UUIDFromDeeplink));
    });
