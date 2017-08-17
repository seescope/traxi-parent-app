import firebaseTracking from '../../App/Middleware/FirebaseTracking';
import { mockRef, mockPush, mockSet } from 'firebase';

beforeAll(() => {
  __DEV__ = false;
});

afterAll(() => {
  __DEV__ = true;
});

it('Logs all events to Firebase', () => {
  const next = jest.fn();
  const action = { type: 'NEXT_STEP' };
  const state = {
    parentState: {
      UUID: 'abc-123',
    },
    setupState: {
      step: 0,
    },
  };
  const store = {
    getState: () => state,
  };
  firebaseTracking(store)(next)(action);
  expect(mockRef).toHaveBeenCalledWith('parentAppActions/abc-123');
  expect(mockPush).toHaveBeenCalled();
  expect(mockSet).toHaveBeenCalledWith({
    action: JSON.stringify(action),
    currentState: JSON.stringify(state),
    timestamp: expect.stringMatching(
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
    ),
  });
});
