// @flow
import { Actions } from 'react-native-router-flux';
import Analytics from 'react-native-analytics';

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
    getUUIDFromDeeplink().then(UUIDFromDeeplink => {
      if (!UUIDFromDeeplink) {
        dispatch(beginSetup());
        dispatch(persistSetupID());

        const { parentState } = getState();
        const { UUID } = parentState;

        Analytics.identify(UUID);
        Actions.splashScreen({ type: 'replace' });

        return null;
      }

      Analytics.identify(UUIDFromDeeplink);

      return dispatch(beginDeeplinkSetup(UUIDFromDeeplink));
    });
