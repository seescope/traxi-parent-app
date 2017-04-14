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
      expect(kids[0]).toMatch(MOCK_UUID);
      expect(UUID).toMatch(MOCK_UUID);
    });
  });

  describe("SET_NAME", () => {
    it("sets the parent's name", () => {
      const TEST_NAME = "Test Name";
      const action = Actions.setName(TEST_NAME);

      const { name } = reducer(undefined, action);
      expect(name).toEqual(TEST_NAME);
    });
  });

  describe("SET_PASSWORD", () => {
    it("sets the parent's password", () => {
      const action = {
        type: "SET_PASSWORD",
        password: "Password"
      };

      const { password } = reducer(undefined, action);
      expect(password).toEqual(action.password);
    });
  });

  describe("SET_EMAIL", () => {
    it("sets the parent's password", () => {
      const action = {
        type: "SET_EMAIL",
        email: "Parent Email"
      };

      const { email } = reducer(undefined, action);
      expect(email).toEqual(action.email);
    });
  });
});
