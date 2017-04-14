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
        email: undefined
      });
    });
  });
});
