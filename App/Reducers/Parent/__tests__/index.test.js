import reducer, { INITIAL_STATE } from "../index.js";

describe("Parent reducer", () => {
  describe("default", () => {
    it("returns the default state", () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
  });

  describe("BEGIN_SETUP", () => {
    it("starts setting up the app", () => {
      const action = {
        type: "BEGIN_SETUP",
        parentUUID: "Parent UUID",
        kidUUID: "Kid UUID"
      };

      expect(reducer(undefined, action)).toEqual({
        name: undefined,
        UUID: action.parentUUID,
        kids: [action.kidUUID],
        email: undefined,
        password: undefined
      });
    });
  });

  describe("SET_NAME", () => {
    it("sets the parent's name", () => {
      const action = {
        type: "SET_NAME",
        name: "Parent Name"
      };

      const { name } = reducer(undefined, action);
      expect(name).toEqual(action.name);
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
