// @flow
import { Actions } from 'react-native-router-flux';
import Analytics from 'react-native-analytics';

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

        Actions.splashScreen({ type: 'replace' });

        return null;
      }

      Analytics.identify(UUID);

      return dispatch(beginDeeplinkSetup(UUID));
    });
