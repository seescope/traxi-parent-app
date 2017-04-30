import { beginSetup, beginDeeplinkSetup } from '../../Parent/parentActions';
import { setKidName, kidUpdated, setKidImage } from '../kidsActions';
import reducer from '../index.js';

const TEST_UUID = 'non-random-uuid';

describe('Kids reducer', () => {
  describe('BEGIN_SETUP', () => {
    it('Begins setting up', () => {
      const action = beginSetup();
      const kids = reducer(undefined, action);
      expect(kids[TEST_UUID]).toBeDefined();
    });
  });

  describe('BEGIN_DEEPLINK_SETUP', () => {
    it('starts setting up the app from a deeplink', () => {
      const TEST_KID = {
        UUID: 'abc-123',
        name: 'Test Kid',
        email: 'Something',
      };

      const EXPECTED_STATE = {
        'abc-123': TEST_KID,
      };

      const action = beginDeeplinkSetup(null, TEST_KID);
      expect(reducer(undefined, action)).toEqual(EXPECTED_STATE);
    });
  });

  describe('SET_KID_NAME', () => {
    it('Sets the kid\'s name', () => {
      const TEST_NAME = 'Test Name';

      const stateWithKid = reducer(undefined, beginSetup());

      const action = setKidName(TEST_NAME, TEST_UUID);
      const updatedState = reducer(stateWithKid, action);
      const kid = updatedState[TEST_UUID];
      expect(kid.name).toEqual(TEST_NAME);
    });
  });

  describe('KID_UPDATED', () => {
    test('It updates the kid in the store', () => {
      const TEST_KID = {
        UUID: 'abc-123',
        name: 'Jeff',
      };

      const action = kidUpdated(TEST_KID, TEST_KID.UUID);
      const updatedState = reducer(undefined, action);
      const kid = updatedState[TEST_KID.UUID];
      expect(kid.name).toEqual(TEST_KID.name);
    });
  });

  describe('SET_KID_IMAGE', () => {
    test('It updates the kid\'s image in the store', () => {
      const TEST_STATE = {
        'abc-123': {
          name: 'Jim Bob',
        },
      };

      const action = setKidImage('some URL', 'abc-123');
      const updatedState = reducer(TEST_STATE, action);
      const kid = updatedState['abc-123'];
      expect(kid.avatarURL).toEqual('some URL');
    });
  });
});
