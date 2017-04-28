// @flow
import { Actions } from 'react-native-router-flux';

import beginDeeplinkSetup from './BeginDeeplinkSetup';
import { getUUIDFromDeeplink } from '../Utils';
import { beginSetup } from '../Reducers/Parent/parentActions';
import persistSetupID from './PersistSetupID';

type Dispatch = () => void;

export default () =>
  (dispatch: Dispatch) =>
    getUUIDFromDeeplink().then(UUID => {
      if (!UUID) {
        dispatch(beginSetup());
        dispatch(persistSetupID());

        Actions.splashScreen();

        return null;
      }

      return dispatch(beginDeeplinkSetup(UUID));
    });
