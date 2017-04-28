import reducer from '../index.js';
import { fetchedReports } from '../reportsActions';

describe('Reports reducer', () => {
  test('FETCHED_REPORTS', () => {
    const TEST_REPORTS = {
      'abc-123': {},
    };

    const action = fetchedReports(TEST_REPORTS);
    expect(reducer(undefined, action)).toEqual(TEST_REPORTS);
  });
});
