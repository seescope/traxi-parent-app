/* eslint no-native-reassign: 0 */
import fetchReport from '../../../App/Dashboard/Actions/FetchReport';

const TEST_UUID = '2f566920-f598-46d2-8bf2-7bcae115bf0a';

global.Promise = require.requireActual('promise');

const TEST_REPORT = {"2f566920-f598-46d2-8bf2-7bcae115bf0a": {"topApps":{"week":[{"name":"YouTube","logoURL":"http://is5.mzstatic.com/image/thumb/Purple71/v4/60/c6/3b/60c63b7a-368b-067c-3e72-928f1170f64e/source/512x512bb.jpg","usage":50,"count":14},{"name":"One Finger Death Punch!","logoURL":"http://is1.mzstatic.com/image/thumb/Purple49/v4/7a/05/24/7a052432-864f-ab26-cc9e-e4defdf01913/source/512x512bb.jpg","usage":1,"count":1}],"yesterday":[],"today":[]},"topCategories":{"week":[{"category":"Entertainment","usage":50},{"category":"Games","usage":1}],"yesterday":[],"today":[]},"peakTimes":{"week":[],"yesterday":[{"usage":23,"day":"Sunday"},{"usage":15,"day":"Wednesday"},{"usage":7,"day":"Thursday"},{"usage":6,"day":"Friday"}],"today":[]},"recentApps":[]}}; 

fetch = () => Promise.resolve({ 
	ok: true,
	json: () => Promise.resolve(TEST_REPORT)
});

describe('#FetchReport', () => {
  it('fetches a report', done => {

    const action = fetchReport(TEST_UUID);
    const dispatch = ({ type, report }) => {
      if (type === 'FETCHING_REPORT') return null;

      expect(type).toBeTruthy();
      expect(report).toBeTruthy();
      done();

      return undefined;
    };

    action(dispatch);
  });
});
