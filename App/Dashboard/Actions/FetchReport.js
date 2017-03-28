/* eslint no-underscore-dangle: off */

const API_GATEWAY_URL = 'https://lpqdexxrvj.execute-api.ap-southeast-2.amazonaws.com/prod?UUIDs=';
import { logError } from '../../Utils';

const TEST_REPORT = {"topApps":{"week":[{"name":"YouTube","logoURL":"http://is5.mzstatic.com/image/thumb/Purple71/v4/60/c6/3b/60c63b7a-368b-067c-3e72-928f1170f64e/source/512x512bb.jpg","usage":50,"count":14},{"name":"One Finger Death Punch!","logoURL":"http://is1.mzstatic.com/image/thumb/Purple49/v4/7a/05/24/7a052432-864f-ab26-cc9e-e4defdf01913/source/512x512bb.jpg","usage":1,"count":1}],"yesterday":[],"today":[]},"topCategories":{"week":[{"category":"Entertainment","usage":50},{"category":"Games","usage":1}],"yesterday":[],"today":[]},"peakTimes":{"week":[],"yesterday":[{"usage":23,"day":"Sunday"},{"usage":15,"day":"Wednesday"},{"usage":7,"day":"Thursday"},{"usage":6,"day":"Friday"}],"today":[]},"recentApps":[]}; 

export default UUID => dispatch => {
  const url = `${API_GATEWAY_URL}${UUID}`;
  dispatch({ type: 'FETCHING_REPORT' });

  dispatch({
    type: 'FETCHED_REPORT',
    report: TEST_REPORT,
    UUID,
  });

  // return fetch(url, { headers })
  //   .then(res => {
  //     if (!res.ok) throw new Error(`Error fetching report: ${res._bodyInit}`);
  //     return res.json();
  //   })
  //   .then(report => {
  //     dispatch({
  //       type: 'FETCHED_REPORT',
  //       report: TEST_REPORT,
  //       UUID
  //     });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     logError(error);

  //     dispatch({
  //       type: 'FETCHED_REPORT',
  //       report: {},
  //       UUID
  //     });
  //   });
}
