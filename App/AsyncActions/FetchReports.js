// @flow
const DEV_API_GATEWAY_URL = 'https://nvf4alj6hl.execute-api.ap-southeast-2.amazonaws.com/dev?UUIDs=';
const PROD_API_GATEWAY_URL = 'https://23pzi40s6b.execute-api.ap-southeast-2.amazonaws.com/prod?UUIDs=';
const API_GATEWAY_URL = __DEV__ ? DEV_API_GATEWAY_URL : PROD_API_GATEWAY_URL;

import lodash from 'lodash';
import DeviceInfo from 'react-native-device-info';

import { logError } from '../Utils';
import { fetchedReports } from '../Reducers/Reports/reportsActions';

import type { Reports } from '../Reducers/Reports';
import type { Dispatch, GetState } from '../Reducers';

const EMPTY_REPORTS: Reports = {};

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { kidsState } = getState();
    const UUIDs = Object.keys(kidsState);
    const UUIDString = UUIDs.join(',');
    const timezone = DeviceInfo.getTimezone();
    const url = `${API_GATEWAY_URL}${UUIDString}&timezone=${timezone}`;

    return fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching report: ${JSON.stringify(res)}`);
        }
        return res.json();
      })
      .then(data => {
        const reports: Reports = lodash.zipObject(data.map(d => d.uuid), data);
        dispatch(fetchedReports(reports));
      })
      .catch(error => {
        logError(error);
        dispatch(fetchedReports(EMPTY_REPORTS));
      });
  };
