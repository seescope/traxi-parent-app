// @flow
import { Actions } from 'react-native-router-flux';

import beginDeeplinkSetup from './BeginDeeplinkSetup';
import { getUUIDFromDeeplink } from '../Utils';
import { beginSetup } from '../Reducers/Parent/parentActions';
import persistSetupID from './PersistSetupID';
import userLoggedIn from './UserLoggedIn';

import type { Dispatch, GetState } from '../Reducers';

export default () =>
  (dispatch: Dispatch, getState: GetState) =>
    getUUIDFromDeeplink().then((UUIDFromDeeplink: string) => {
      if (!UUIDFromDeeplink) {
        const { parentState } = getState();
        const { UUID } = parentState;

        dispatch(beginSetup(UUID));
        dispatch(persistSetupID());
        dispatch(userLoggedIn());

        Actions.splashScreen({ type: 'replace' });
        return null;
      }

      return dispatch(beginDeeplinkSetup(UUIDFromDeeplink));
    });
