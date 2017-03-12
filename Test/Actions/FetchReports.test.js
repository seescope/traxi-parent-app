import fetchReports, {
  parseReport,
  coalesceApps,
  isOverlapping,
} from '../../App/Actions/FetchReports';
import {TEST_KID} from '../Mocks';
import moment from 'moment';

const testTrailItems = [
  {
    name: 'App 1',
    category: 'Entertainment',
    timeStamp: moment('2016-01-01T00:00:00Z'),
    minutesUsed: 5,
  },
  {
    name: 'App 1',
    category: 'Entertainment',
    timeStamp: moment('2016-01-01T00:03:00Z'),
    minutesUsed: 5,
  },
  {
    name: 'App 2',
    category: 'Something',
    timeStamp: moment('2016-01-01T00:04:00Z'),
    minutesUsed: 5,
  },
  {
    name: 'App 1',
    category: 'Entertainment',
    timeStamp: moment('2016-01-01T00:10:00Z'),
    minutesUsed: 4,
  },
];

describe('fetchReports', () => {
  it('calls DynamoDB and gets the reports for the given user', () => {
    const TEST_DISPATCH = jest.fn();
    return fetchReports(TEST_KID)(TEST_DISPATCH).then(() => {
      const report = TEST_DISPATCH.mock.calls[1][0];
      expect(report).toMatchSnapshot();
    });
  });
});

describe('parseReport', () => {
  it('handles reports with missing data', () => {
    const testReportData = [];
    expect(() => {
      parseReport(testReportData);
    }).toThrow();
  });

  it('handles null data', () => {
    const testReportData = null;
    expect(() => {
      parseReport(testReportData);
    }).toThrow();
  });
});

describe('coalesceApps', () => {
  it('coalescesApps', () => {
    const coalesced = testTrailItems.reduce(coalesceApps, []);
    expect(coalesced[0].minutesUsed).toEqual(14);
  });
});

describe('isOverlapping', () => {
  it.only('finds overlapping apps', () => {
    const times = [
      {
        name: 'App A',
        timeStamp: moment('2016-12-14T13:40:56Z'),
        minutesUsed: 10,
      },
      {
        name: 'App A',
        timeStamp: moment('2016-12-17T10:37:16Z'),
        minutesUsed: 10,
      },
    ];
    expect(isOverlapping(times[0], times[1])).toBeFalsy();
    expect(isOverlapping(testTrailItems[1], testTrailItems[0])).toBeTruthy();
  });
});
