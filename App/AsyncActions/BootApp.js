// @flow
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import lodash from 'lodash';

import type { RootState } from '../Reducers';
import type { KidsState } from '../Reducers/Kids';
import type { ParentState } from '../Reducers/Parent';
import migrateDataFromPreviousVersion from './MigrateDataFromPreviousVersion';
import userLoggedIn from './UserLoggedIn';
import fetchReports from './FetchReports';
import checkDeeplink from './CheckDeeplink';

type Dispatch = () => Promise<any>;
type GetState = () => RootState;

const finishedSetup = ({ name, email }: ParentState): boolean =>
  !lodash.isNil(name) && !lodash.isNil(email);

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

export default () => async (
  dispatch: Dispatch,
  getState: GetState,
): Promise<any> => {
  const { kidsState, parentState } = getState();

  // eslint-disable-next-line
  console.log('Booted! Initial state:', kidsState, parentState);

  const isInstalled = hasInstalledKids(kidsState);
  const completedSetup = finishedSetup(parentState);

  // The parent has configured at least one kid and completed setup
  if (isInstalled && completedSetup) {
    Actions.dashboard({ type: 'replace' });
    dispatch(userLoggedIn());
    return dispatch(fetchReports());
  }

  // The parent has configured at least one kid but not completed setup
  if (isInstalled && !completedSetup) {
    Actions.congratulations({ type: 'replace' });
    dispatch(userLoggedIn());
    return Promise.resolve();
  }

  const profileJSON = await AsyncStorage.getItem('profile');

  // The parent is migrating from an older version of the app.
  if (profileJSON) {
    const profile = JSON.parse(profileJSON);

    return dispatch(migrateDataFromPreviousVersion(profile)).then(() => {
      dispatch(fetchReports());
      dispatch(userLoggedIn());
      Actions.dashboard({ type: 'replace' });
    });
  }

  // Fresh state. Check to see if Deeplink has been set.
  return dispatch(checkDeeplink());
};
