/* eslint no-native-reassign: 0 */
import fetchReport from '../../../App/Dashboard/Actions/FetchReport';

const TEST_UUIDS = ['dd1fed1a-0be8-460c-8fc2-fbe13359fc9d', 'ab033f06-cff9-4025-af12-46419441ac9b'];

global.Promise = require.requireActual('promise');

const TEST_REPORTS = [{"uuid":"dd1fed1a-0be8-460c-8fc2-fbe13359fc9d","topApps":{"week":[{"name":"Family Locator - GPS Tracker","logoURL":"http://lh3.googleusercontent.com/6e7UuLA7RATt1aXF3t4dYgul0M2K9YjXKJl9tjmySbduH2t3wMcf8uPsQnQR-AVHlkK1=w300","usage":14,"count":4},{"name":"icq video calls & chat","logoURL":"http://lh3.googleusercontent.com/_U-7RFULK-aIX0DDIZSDX7a5Up5Jq8Kf4LKnpZ1gawe9jDXgTLrdY6hKv94GwpJox0I=w300","usage":2,"count":1},{"name":"Sprint Spot","logoURL":"http://lh3.googleusercontent.com/nCnvARo9yCTrB9vMSNU80BzhM7PUhGoKPmkvg2oOGgKTZ8VQYYBaz2EArz00Ndv0eg=w300","usage":2,"count":1},{"name":"imo free video calls and chat","logoURL":"http://lh3.googleusercontent.com/tm_N1osJGfifuRlMfEip4kZFD5QCtd42CYYEhUsxABzIoEn6Nb9UXjRVmjoeKvMFUCzF=w300","usage":2,"count":2},{"name":"Gmail","logoURL":"http://lh6.ggpht.com/8-N_qLXgV-eNDQINqTR-Pzu5Y8DuH0Xjz53zoWq_IcBNpcxDL_gK4uS_MvXH00yN6nd4=w300","usage":1,"count":1}],"yesterday":[],"today":[]},"topCategories":{"week":[{"category":"Lifestyle","usage":14},{"category":"Communication","usage":5},{"category":"Entertainment","usage":2}],"yesterday":[],"today":[]},"peakTimes":{"week":[{"usage":20,"name":"Wednesday"},{"usage":1,"name":"Sunday"}],"yesterday":[],"today":[]},"recentApps":[]},{"uuid":"ab033f06-cff9-4025-af12-46419441ac9b","topApps":{"week":[{"name":"Plants vs. Zombies FREE","logoURL":"http://lh6.ggpht.com/D-A2Zl3TqK1nMUwefCyIvzIQ02nzgXoSv3Z4F5wniSOUDF0iCCd3PhwwYo1YCg0R2l8=w300","usage":1,"count":1}],"yesterday":[],"today":[]},"topCategories":{"week":[{"category":"Strategy","usage":1}],"yesterday":[],"today":[]},"peakTimes":{"week":[{"usage":1,"name":"Sunday"}],"yesterday":[],"today":[]},"recentApps":[]}];

fetch = () => Promise.resolve({ 
  ok: true,
  json: () => Promise.resolve(TEST_REPORTS)
});

describe('#FetchReport', () => {
  it('fetches a report', done => {

    const action = fetchReport(TEST_UUIDS);
    const dispatch = ({ type, reports }) => {
      if (type === 'FETCHING_REPORT') return null;

      expect(type).toBeTruthy();
      expect(reports).toMatchSnapshot();
      done();

      return undefined;
    };

    action(dispatch);
  });
});
