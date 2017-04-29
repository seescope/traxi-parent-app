import reducer from '../index';
import {
  nextStep,
  previousStep,
  startedLoading,
  stoppedLoading,
} from '../setupActions';
import { beginSetup, beginDeeplinkSetup } from '../../Parent/parentActions';

const TEST_UUID = 'non-random-uuid';

describe('Setup Reducer', () => {
  describe('BEGIN_SETUP', () => {
    it('Sets up', () => {
      const action = beginSetup();
      const { step, kidUUID, setupID } = reducer(undefined, action);
      expect(step).toEqual(0);
      expect(kidUUID).toEqual(TEST_UUID);
      expect(setupID).toBeLessThan(10001);
      expect(setupID).toBeGreaterThan(0);
    });
  });

  describe('BEGIN_DEEPLINK_SETUP', () => {
    it('starts setting up the app from a deeplink', () => {
      const TEST_KID = {
        email: 'Something',
        UUID: 'abc-123',
      };

      const action = beginDeeplinkSetup(null, TEST_KID);
      const nextState = reducer(undefined, action);
      expect(nextState.kidUUID).toEqual(TEST_KID.UUID);
    });
  });

  describe('NEXT_STEP', () => {
    it('Increments the step', () => {
      const { step } = reducer(undefined, nextStep());
      expect(step).toEqual(1);
    });
  });

  describe('PREVIOUS_STEP', () => {
    it('Decrements the step', () => {
      const { step } = reducer({ step: 1 }, previousStep());
      expect(step).toEqual(0);
    });
  });

  describe('STARTED_LOADING', () => {
    it('Sets loading to true', () => {
      const { loading } = reducer(undefined, startedLoading());
      expect(loading).toEqual(true);
    });
  });

  describe('STOPPED_LOADING', () => {
    it('Sets loading to false', () => {
      const { loading } = reducer(undefined, stoppedLoading());
      expect(loading).toEqual(false);
    });
  });
});
