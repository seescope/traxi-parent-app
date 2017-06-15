// @flow

import { logError } from '../Utils';
import { fetchedApps, fetchingApps } from '../Reducers/Setup/setupActions';
import _ from 'lodash';

import type { RootState } from '../Reducers';
import type { SetupAction } from '../Reducers/Setup';

const DEV_API_GATEWAY_URL =
  'https://fvfydckah0.execute-api.ap-southeast-2.amazonaws.com/dev?UUID=';
const PROD_API_GATEWAY_URL =
  'https://fshfq7krz5.execute-api.ap-southeast-2.amazonaws.com/prod?UUID=';
const API_GATEWAY_URL = __DEV__ ? DEV_API_GATEWAY_URL : PROD_API_GATEWAY_URL;

type Dispatch = (action: SetupAction) => void;
type GetState = () => RootState;

export default () => (dispatch: Dispatch, getState: GetState) => {
  console.log('FEEETCHING');
  dispatch(fetchingApps(true));

  const state = getState();
  const UUID = state.parentState.kids[0];

  if (!UUID) throw new Error('No UUID for parent while getting InitialUsage');

  const url = `${API_GATEWAY_URL}${UUID}`;

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      if (json.statusCode !== 200) {
        throw new Error(
          `Error fetching onboarding data ${JSON.stringify(json)}`,
        );
      }
      return JSON.parse(json.body);
    })
    .then(apps => {
      dispatch(fetchedApps(apps));
      dispatch(fetchingApps(false));
    })
    .catch(error => {
      logError(error);
    });
};
