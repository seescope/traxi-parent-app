/* eslint no-native-reassign: 0 */
import fetchReport from '../../../App/Dashboard/Actions/FetchReport';

const TEST_UUID = '2f566920-f598-46d2-8bf2-7bcae115bf0a';

global.Promise = require.requireActual('promise');

fetch = () => Promise.resolve({ 
  json: () => Promise.resolve({})
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
