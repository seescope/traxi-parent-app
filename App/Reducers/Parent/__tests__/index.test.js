import reducer, { INITIAL_STATE } from "../index.js";
import * as Actions from "../parentActions";

const MOCK_UUID = "non-random-uuid";

describe("Parent reducer", () => {
  describe("default", () => {
    it("returns the default state", () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
  });

  describe("BEGIN_SETUP", () => {
    it("starts setting up the app", () => {
      const action = Actions.beginSetup();

      const { UUID, kids } = reducer(undefined, action);
      expect(kids[0]).toEqual(MOCK_UUID);
      expect(UUID).toEqual(MOCK_UUID);
    });
  });

  describe("SET_PARENT_NAME", () => {
    it("sets the parent's name", () => {
      const TEST_NAME = "Test Name";
      const action = Actions.setName(TEST_NAME);

      const { name } = reducer(undefined, action);
      expect(name).toEqual(TEST_NAME);
    });
  });

  describe("SET_PASSWORD", () => {
    it("sets the parent's password", () => {
      const TEST_PASSWORD = "test";
      const action = Actions.setPassword(TEST_PASSWORD);

      const { password } = reducer(undefined, action);
      expect(password).toEqual(TEST_PASSWORD);
    });
  });

  describe("SET_EMAIL", () => {
    it("sets the parent's password", () => {
      const TEST_EMAIL = "Test Email";
      const action = Actions.setEmail(TEST_EMAIL);

      const { email } = reducer(undefined, action);
      expect(email).toEqual(TEST_EMAIL);
    });
  });
});
