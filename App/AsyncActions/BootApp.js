// @flow
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import lodash from 'lodash';

import migrateDataFromPreviousVersion from './MigrateDataFromPreviousVersion';
import userLoggedIn from './UserLoggedIn';
import fetchReports from './FetchReports';
import checkDeeplink from './CheckDeeplink';
import getInitalUsage from './GetInitialUsage';
import { resetSetupState } from '../Reducers/Setup/setupActions';
import { activatedParent } from '../Reducers/Parent/parentActions';

import type { KidsState } from '../Reducers/Kids';
import type { ParentState } from '../Reducers/Parent';
import type { Dispatch, GetState } from '../Reducers';

const hasStartedSetup = ({ name, email }: ParentState): boolean =>
  lodash.isString(name) && lodash.isString(email);

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
  async (dispatch: Dispatch, getState: GetState): Promise<void> => {
    const { kidsState, parentState } = getState();

    // eslint-disable-next-line
    console.log('Booted! Initial state:', kidsState, parentState);

    const isInstalled = hasInstalledKids(kidsState);
    const completedSetup = parentState.activatedAt;
    const isLegacyParent = !parentState.createdAt;
    const startedSetup = hasStartedSetup(parentState);

    // The parent has configured at least one kid and completed setup
    if (isInstalled && completedSetup) {
      dispatch(userLoggedIn());
      dispatch(fetchReports());
      Actions.dashboard({ type: 'replace' });
      return;
    }

    // The parent is upgrading from a version that is missing the activatedAt param
    if (isInstalled && isLegacyParent) {
      dispatch(activatedParent());
      dispatch(fetchReports());
      dispatch(userLoggedIn());
      Actions.dashboard({ type: 'replace' });
      return;
    }

    // The parent has signed up, but has not completed setting up their kid:
    if (!isInstalled && startedSetup) {
      dispatch(userLoggedIn());
      dispatch(resetSetupState());
      Actions.setName({ type: 'replace' });
      return;
    }

    // The parent has configured at least one kid but not completed setup
    if (isInstalled && !completedSetup) {
      dispatch(userLoggedIn());
      dispatch(getInitalUsage());
      Actions.initialUsage({ type: 'replace' });
      return;
    }

    const profileJSON = await AsyncStorage.getItem('profile');

    // The parent is migrating from an older version of the app.
    if (profileJSON) {
      const profile = JSON.parse(profileJSON);

      await dispatch(migrateDataFromPreviousVersion(profile));
      dispatch(fetchReports());
      dispatch(userLoggedIn());
      Actions.dashboard({ type: 'replace' });
      return;
    }

    // Fresh state. Check to see if Deeplink has been set.
    dispatch(checkDeeplink());
  };
