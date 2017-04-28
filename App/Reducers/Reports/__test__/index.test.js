import reducer from '../index.js';
import { fetchedReports, fetchingReports } from '../reportsActions';

describe('Reports reducer', () => {
  test('FETCHED_REPORTS', () => {
    const TEST_REPORTS = {
      'abc-123': {},
    };

    const action = fetchedReports(TEST_REPORTS);
    const { loading, ...reports } = reducer(undefined, action);

    expect(reports).toEqual(TEST_REPORTS);
    expect(loading).toEqual(false);
  });

  test('FETCHING_REPORTS', () => {
    const action = fetchingReports();
    const { loading } = reducer(undefined, action);
    expect(loading).toEqual(true);
  });
});
