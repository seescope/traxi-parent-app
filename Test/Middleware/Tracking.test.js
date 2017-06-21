import Analytics from 'react-native-analytics';
import trackingMiddleware from '../../App/Middleware/Tracking';

describe('Tracking Middleware', () => {
  beforeEach(() => {
    __DEV__ = false;
    Analytics.track.mockClear();
  });

  it('Does not track in debug', () => {
    __DEV__ = true;
    const next = jest.fn();
    const action = { type: 'NEXT_STEP' };
    trackingMiddleware({})(next)(action);

    expect(Analytics.track).not.toHaveBeenCalled();
  });

  test('Tracks NEXT_STEP', () => {
    const next = jest.fn();
    const action = { type: 'NEXT_STEP' };
    const state = {
      setupState: {
        step: 0,
      },
    };
    const store = {
      getState: () => state,
    };
    trackingMiddleware(store)(next)(action);

    expect(
      Analytics.track
    ).toHaveBeenCalledWith('Advanced Through Walkthrough', { currentStep: 0 });
  });

  // TODO: Add the rest of Analytics calls

  test('Tracks when parents have seen a report', () => {
    const next = jest.fn();
    const action = {
      type: 'FETCHED_REPORTS',
      reports: {
        'abc-123': {
          topApps: {
            week: ['an app'],
          },
        },
      },
    };
    const state = {
      parentState: {
        kids: ['abc-123'],
      },
    };
    const store = {
      getState: () => state,
    };
    trackingMiddleware(store)(next)(action);
    expect(Analytics.track).toHaveBeenCalledWith('Received Valid Report', {
      weeklyItems: 1,
    });
  });

  test('Tracks when parents have not received a valid report', () => {
    const next = jest.fn();
    const action = {
      type: 'FETCHED_REPORTS',
      reports: {
        'abc-123': {
          topApps: {
            week: [],
          },
        },
      },
    };
    const state = {
      parentState: {
        kids: ['abc-123'],
      },
    };
    const store = {
      getState: () => state,
    };
    trackingMiddleware(store)(next)(action);
    expect(Analytics.track).toHaveBeenCalledWith('Received Empty Report');
  });

  test('Tracks when parents have received initial apps', () => {
    const next = jest.fn();
    const action = {
      type: 'FETCHED_APPS',
      apps: [1, 2, 3],
    };
    const store = {
      getState: () => {},
    };
    trackingMiddleware(store)(next)(action);
    expect(Analytics.track).toHaveBeenCalledWith('Received Initial Apps', 3);
  });
});
