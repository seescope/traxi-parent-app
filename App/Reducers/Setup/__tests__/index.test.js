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

  describe('FETCHED_APPS', () => {
    it('Sets the apps property', () => {
      const action = {
        type: 'FETCHED_APPS',
        apps: [],
      };
      const { apps } = reducer(undefined, action);
      expect(apps).toEqual([]);
    });
  });

  describe('ADDED_ADDITIONAL_CHILD', () => {
    it('Resets everything', () => {
      const firstState = {
        step: 5,
        kidUUID: 'adasdasd',
        setupID: 5,
        deviceType: 'asdasd',
        apps: [1, 2, 3],
      };

      const action = {
        type: 'ADDED_ADDITIONAL_CHILD',
        UUID: 'abc-123',
        setupID: 4,
      };

      const newState = reducer(firstState, action);
      expect(newState.kidUUID).toEqual('abc-123');
      expect(newState.step).toEqual(0);
      expect(newState.setupID).toEqual(4);
      expect(newState.apps).toEqual(undefined);
    });
  });

  describe('REACT_NATIVE_ROUTER_FLUX_FOCUS', () => {
    it('Sets the current sceneName', () => {
      const TEST_SCENE_NAME = 'testscene';
      const action = {
        type: 'REACT_NATIVE_ROUTER_FLUX_FOCUS',
        scene: {
          name: TEST_SCENE_NAME,
        },
      };

      const { sceneName } = reducer(undefined, action);
      expect(sceneName).toEqual(TEST_SCENE_NAME);
    });
  });
});
