// @flow
import { Actions } from 'react-native-router-flux';
import lodash from 'lodash';

import type { RootState } from '../Reducers';
import type { KidsState } from '../Reducers/Kids';
import type { ParentState } from '../Reducers/Parent';
import fetchReports from './FetchReports';
import checkDeeplink from './CheckDeeplink';
import Analytics from 'react-native-analytics';
import Intercom from 'react-native-intercom';

type Dispatch = () => Promise<any>;
type GetState = () => RootState;

const finishedSetup = ({ name, email }: ParentState): boolean =>
  !!name && !!email;

const hasInstalledKids = (kidsState: KidsState): boolean => {
  const installed = lodash
    .chain(kidsState)
    .mapValues('installed')
    .values()
    .value();

  // LEGACY:
  // Old versions of Traxi set this parameter instead of "installed".
  const statusProp = lodash
    .chain(kidsState)
    .mapValues('status')
    .values()
    .value();

  return installed.includes(true) || statusProp.includes('INSTALLED');
};

export default () =>
  (dispatch: Dispatch, getState: GetState): Promise<any> => {
    const { kidsState, parentState } = getState();

    console.log('Booted! Initial state:', kidsState, parentState);

    const isInstalled = hasInstalledKids(kidsState);
    const completedSetup = finishedSetup(parentState);

    // The parent has configured at least one kid and completed setup
    if (isInstalled && completedSetup) {
      Actions.dashboard({ type: 'replace' });
      const { UUID, name, email } = parentState;

      Analytics.identify(UUID, {
        name,
        email,
      });
      Intercom.registerIdentifiedUser({
        userId: UUID,
      });

      return dispatch(fetchReports());
    }

    // The parent has configured at least one kid but not completed setup
    if (isInstalled && !completedSetup) {
      Actions.congratulations({ type: 'replace' });

      const { UUID } = parentState;
      Analytics.identify(UUID);
      Intercom.registerIdentifiedUser({
        userId: UUID,
      });

      return Promise.resolve();
    }

    // Fresh state. Check to see if Deeplink has been set.
    return dispatch(checkDeeplink());
  };
