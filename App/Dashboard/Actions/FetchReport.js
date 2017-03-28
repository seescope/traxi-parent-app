const API_GATEWAY_URL = 'https://lpqdexxrvj.execute-api.ap-southeast-2.amazonaws.com/prod?UUIDs=';
import { logError } from '../../Utils';

export default UUID => dispatch => {
  const url = `${API_GATEWAY_URL}${UUID}`;
  dispatch({ type: 'FETCHING_REPORT' });
  const headers = {
    'x-api-key': 'YIfGuIXxMU27pM476EdBV2YBziCKzaec1jKkn5mI',
  };

  return fetch(url, { headers })
    .then(res => {
      if (!res.ok) throw new Error(`Error fetching report: ${res.statusText}`);
      return res.json();
    })
    .then(report => {
      dispatch({
        type: 'FETCHED_REPORT',
        report,
        UUID
      });
    })
    .catch(error => {
      logError(error);

      dispatch({
        type: 'FETCHED_REPORT',
        report: {},
        UUID
      });
    });
}
