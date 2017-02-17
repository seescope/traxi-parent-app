import { TEST_KID_FIRST_NAME, TEST_KID_NAME } from '../Mocks';
import {
  sendPhoneNumberToSlack,
  firstName,
  relativeDate,
  timeRange,
  listOfNumbers,
  isIOS,
  experimentViewed,
} from '../../App/Utils';
import moment from 'moment';
import mockAnalytics from 'react-native-analytics';

describe('firstName', () => {
  it('renders the correct firstName', () => {
    const expected = TEST_KID_FIRST_NAME;
    const actual = firstName(TEST_KID_NAME);
    expect(actual).toEqual(expected);
  });
});

describe('relativeDate', () => {
  it('arbitrary date', () => {
    const date = '2016-01-01';
    const actual = relativeDate(date);
    const expected = 'Friday';
    expect(actual).toEqual(expected);
  });

  it('yesterday', () => {
    const lastNight = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const actual = relativeDate(lastNight);
    const expected = 'Yesterday';
    expect(actual).toEqual(expected);
  });
});

describe('timeRange', () => {
  it('returns the current hour plus the next', () => {
    const actual = timeRange('12AM');
    const expected = '12AM to 1AM';
    expect(actual).toEqual(expected);
  });
});

describe('isIOS', () => {
  it('returns true for iOS', () => {
    expect(isIOS).toEqual(true);
  });
});

describe('listOfNumbers', () => {
  it('returns an array of numbers counting up to a given length', () => {
    const expected = [0, 1, 2, 3];
    const actual = listOfNumbers(expected.length);
    expect(actual).toEqual(expected);
  });
});

describe('experimentViewed', () => {
  it('sends an Experiment Viewed tracking event to Segment', () => {
    experimentViewed('test-experiment', 'test-variant');

    const event = mockAnalytics.track.mock.calls[0];
    expect(event).toMatchSnapshot();
  });
});

describe('sendPhoneNumberToSlack', () => {
  it('sends a phone number to Slack', () => {
    const phoneNumber = '+61401633346';

    const mockDispatch = jest.fn();
    const fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('ok'),
    }));

    return sendPhoneNumberToSlack(phoneNumber).then(() => {
      expect(mockDispatch.mock.calls).toMatchSnapshot();
      expect(fetch.mock.calls).toMatchSnapshot();
    });
  });
});
