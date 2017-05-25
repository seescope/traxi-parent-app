// @flow
import { Actions } from 'react-native-router-flux';

import beginDeeplinkSetup from './BeginDeeplinkSetup';
import { getUUIDFromDeeplink } from '../Utils';
import { beginSetup } from '../Reducers/Parent/parentActions';
import persistSetupID from './PersistSetupID';
import userLoggedIn from './UserLoggedIn';

type Dispatch = () => void;

export default () =>
  (dispatch: Dispatch) =>
    getUUIDFromDeeplink().then((UUIDFromDeeplink: string) => {
      if (!UUIDFromDeeplink) {
        dispatch(beginSetup());
        dispatch(persistSetupID());
        dispatch(userLoggedIn());

        Actions.splashScreen({ type: 'replace' });
        return null;
      }

      dispatch(userLoggedIn());
      return dispatch(beginDeeplinkSetup(UUIDFromDeeplink));
    });
