import reducer, { INITIAL_STATE } from '../index.js';
import * as Actions from '../parentActions';

const MOCK_UUID = 'non-random-uuid';

describe('Parent reducer', () => {
  describe('default', () => {
    it('returns the default state', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
  });

  describe('BEGIN_SETUP', () => {
    it('starts setting up the app with a randomly generated UUID', () => {
      const action = Actions.beginSetup();

      const { UUID, kids } = reducer(undefined, action);
      expect(kids[0]).toEqual(MOCK_UUID);
      expect(UUID).toEqual(MOCK_UUID);
    });

    it('starts setting up the app with a specified UUID', () => {
      const SPECIFIC_UUID = 'this is a very specific UUID';
      const action = Actions.beginSetup(SPECIFIC_UUID);

      const { UUID, kids } = reducer(undefined, action);
      expect(kids[0]).toEqual(MOCK_UUID);
      expect(UUID).toEqual(SPECIFIC_UUID);
    });
  });

  describe('BEGIN_DEEPLINK_SETUP', () => {
    it('starts setting up the app from a deeplink', () => {
      const TEST_PARENT = {
        email: 'Something',
        kids: ['abc-123'],
      };

      const action = Actions.beginDeeplinkSetup(TEST_PARENT);
      expect(reducer(undefined, action)).toEqual(TEST_PARENT);
    });
  });

  describe('SET_PARENT_NAME', () => {
    it('sets the parent\'s name', () => {
      const TEST_NAME = 'Test Name';
      const action = Actions.setName(TEST_NAME);

      const { name } = reducer(undefined, action);
      expect(name).toEqual(TEST_NAME);
    });
  });

  describe('SET_PASSWORD', () => {
    it('sets the parent\'s password', () => {
      const TEST_PASSWORD = 'test';
      const action = Actions.setPassword(TEST_PASSWORD);

      const { password } = reducer(undefined, action);
      expect(password).toEqual(TEST_PASSWORD);
    });
  });

  describe('SET_EMAIL', () => {
    it('sets the parent\'s password', () => {
      const TEST_EMAIL = 'Test Email';
      const action = Actions.setEmail(TEST_EMAIL);

      const { email } = reducer(undefined, action);
      expect(email).toEqual(TEST_EMAIL);
    });
  });

  describe('PROFILE_MIGRATED', () => {
    it('updates the parent state', () => {
      const TEST_PARENT = { name: 'Something' };
      const action = Actions.profileMigrated(TEST_PARENT);

      const { name } = reducer(undefined, action);
      expect(name).toEqual(TEST_PARENT.name);
    });
  });

  describe('ADDED_ADDITIONAL_CHILD', () => {
    it('adds an additional child', () => {
      const TEST_PARENT = { name: 'Something', kids: ['1'] };
      const action = Actions.addedAdditionalChild('abc-123', 1234);
      const parent = reducer(TEST_PARENT, action);
      expect(parent.kids).toEqual(['1', 'abc-123']);
    });
  });

  describe('UPGRADED_ACCOUNT', () => {
    it('updates the parent state', () => {
      const TEST_PARENT = { name: 'Something' };
      const action = { type: 'UPGRADED_ACCOUNT', upgradedAt: 'today' };
      const upgradedParent = reducer(TEST_PARENT, action);

      expect(upgradedParent.upgradedAt).toEqual('today');
    });
  });
});
