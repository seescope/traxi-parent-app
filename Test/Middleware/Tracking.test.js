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
            today: [1, 2],
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
    expect(Analytics.track).toHaveBeenCalledWith('Received Valid Report');
  });

  test('Tracks when parents have not received a valid report', () => {
    const next = jest.fn();
    const action = {
      type: 'FETCHED_REPORTS',
      reports: {
        'abc-123': {
          topApps: {
            today: [],
            week: [1, 2],
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

  test('Tracks when parents upgrade their account', () => {
    const next = jest.fn();
    const action = {
      type: 'ACCOUNT_UPGRADED',
    };
    const store = {
      getState: () => {},
    };
    trackingMiddleware(store)(next)(action);
    expect(Analytics.track).toHaveBeenCalledWith('Account Upgraded', {
      revenue: 1.99,
    });
  });

  test('Tracks when a parent has completed setup and activated', () => {
    const next = jest.fn();
    const action = {
      type: 'ACTIVATED_PARENT',
    };
    const store = {
      getState: () => {},
    };
    trackingMiddleware(store)(next)(action);
    expect(Analytics.track).toHaveBeenCalledWith('Completed Setup');
  });

  test('Tracks when a parent has authenticated', () => {
    const next = jest.fn();
    const action = {
      type: 'ACCOUNT_CREATED',
      authenticationMethod: 'Facebook',
    };
    const store = {
      getState: () => {},
    };
    trackingMiddleware(store)(next)(action);
    expect(Analytics.track).toHaveBeenCalledWith('Signed Up', {
      authenticationMethod: 'Facebook',
    });
  });
});
