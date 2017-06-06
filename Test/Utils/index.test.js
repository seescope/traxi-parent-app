import { TEST_KID_FIRST_NAME, TEST_KID_NAME } from '../Mocks';
import {
  firstName,
  relativeDate,
  timeRange,
  listOfNumbers,
  isIOS,
  getNiceUsage,
  backButtonHandler,
  cleanObjectForFirebase,
} from '../../App/Utils';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

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

describe('getNiceUsage', () => {
  it('Gets nice usage', () => {
    const testUsage = 124;
    const niceUsage = getNiceUsage(testUsage);

    expect(niceUsage).toEqual('2 hours');
  });
});

describe('backButtonHandler', () => {
  beforeEach(() => {
    Actions.pop.mockClear();
  });

  test('It handles back button on a normal scene', () => {
    const TEST_STATE = {
      setupState: {
        step: 1,
        sceneName: 'something',
      },
    };
    const testStore = { getState: () => TEST_STATE };

    backButtonHandler(testStore);
    expect(Actions.pop).toHaveBeenCalled();
  });

  test('It handles back button on step 0 of deviceSetup', () => {
    const TEST_STATE = {
      setupState: {
        step: 0,
        sceneName: 'deviceSetup',
      },
    };
    const testStore = { getState: () => TEST_STATE };

    backButtonHandler(testStore);
    expect(Actions.pop).toHaveBeenCalled();
  });

  test('It handles back button on step 1 of deviceSetup', () => {
    const TEST_STATE = {
      setupState: {
        step: 1,
        sceneName: 'deviceSetup',
      },
    };
    const MOCK_DISPATCH = jest.fn();
    const testStore = { dispatch: MOCK_DISPATCH, getState: () => TEST_STATE };

    backButtonHandler(testStore);
    expect(Actions.pop).not.toHaveBeenCalled();
    expect(MOCK_DISPATCH).toHaveBeenCalledWith({ type: 'PREVIOUS_STEP' });
  });
});

describe('cleanObjectForFirebase', () => {
  it('removes undefined or null keys', () => {
    const object = {
      something: undefined,
      somethingElse: 'defined',
    };

    expect(cleanObjectForFirebase(object)).toEqual({
      somethingElse: 'defined',
    });
  });
});
