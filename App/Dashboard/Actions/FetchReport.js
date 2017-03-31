/* eslint no-underscore-dangle: off */

const API_GATEWAY_URL = 'https://lpqdexxrvj.execute-api.ap-southeast-2.amazonaws.com/prod?UUIDs=';
import { logError } from '../../Utils';
import moment from 'moment';
import lodash from 'lodash';

export default UUIDs => dispatch => {
  const UUIDString = UUIDs.join(',');
  const offset = moment().utcOffset();
  const url = `${API_GATEWAY_URL}${UUIDString}&offset=${offset}`;
  dispatch({ type: 'FETCHING_REPORT' });

  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Error fetching report: ${res._bodyInit}`);
      return res.json();
    })
    .then(data => {
      const reports = lodash.zipObject(
        data.map(d => d.uuid),
        data
      );

      dispatch({
        type: 'FETCHED_REPORT',
        reports,
      });
    })
    .catch(error => {
      console.log(error);
      logError(error);

      dispatch({
        type: 'FETCHED_REPORT',
        reports: null,
      });
    });
}
