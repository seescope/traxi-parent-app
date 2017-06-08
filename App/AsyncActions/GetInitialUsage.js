// @flow

import { logError } from '../Utils';
import { fetchedApps } from '../Reducers/Setup/setupActions';

import type { RootState } from '../Reducers';
import type { SetupAction } from '../Reducers/Setup';

const DEV_API_GATEWAY_URL = 'https://fvfydckah0.execute-api.ap-southeast-2.amazonaws.com/dev?UUID=';
const PROD_API_GATEWAY_URL = 'https://fshfq7krz5.execute-api.ap-southeast-2.amazonaws.com/prod?UUID=';
const API_GATEWAY_URL = __DEV__ ? DEV_API_GATEWAY_URL : PROD_API_GATEWAY_URL;

type Dispatch = (action: SetupAction) => void;
type GetState = () => RootState;

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { UUID } = getState();

    const url = `${API_GATEWAY_URL}${UUID}`;

    return fetch(url)
      .then(response => {
        if (response.statusCode !== 200) {
          throw new Error(
            'Error fetching onboarding data',
            JSON.stringify(response),
          );
        }
        return response.json();
      })
      .then(data => {
        dispatch(fetchedApps(data));
      })
      .catch(error => {
        logError(error);
      });
  };
