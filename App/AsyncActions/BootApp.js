// @flow
import {Actions} from 'react-native-router-flux';
import lodash from 'lodash';

import type {RootState} from '../Reducers';
import type {KidsState} from '../Reducers/Kids';
import type {ParentState} from '../Reducers/Parent';
import fetchReports from './FetchReports';
import checkDeeplink from './CheckDeeplink';

type Dispatch = () => Promise<any>;
type GetState = () => RootState;

const finishedSetup = ({name, email}: ParentState): boolean =>
  !!name && !!email;

const hasInstalledKids = (kidsState: KidsState): boolean => {
  const installed = lodash
    .chain(kidsState)
    .mapValues('installed')
    .values()
    .value();

  return installed.includes(true);
};

export default () =>
  (dispatch: Dispatch, getState: GetState): Promise<any> => {
    const {kidsState, parentState} = getState();

    const isInstalled = hasInstalledKids(kidsState);
    const completedSetup = finishedSetup(parentState);

    console.log('Booted', getState());

    // The parent has configured at least one kid and completed setup
    if (isInstalled && completedSetup) {
      Actions.dashboard({type: 'replace'});
      return dispatch(fetchReports());
    }

    // The parent has configured at least one kid but not completed setup
    if (isInstalled && !completedSetup) {
      Actions.congratulations();
      return Promise.resolve();
    }

    // Fresh state. Check to see if Deeplink has been set.
    return dispatch(checkDeeplink());
  };
