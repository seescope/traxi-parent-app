import { beginSetup } from "../../Parent/parentActions";
import { setKidName } from "../kidsActions";
import reducer from "../index.js";

const TEST_UUID = "non-random-uuid";

describe("Kids reducer", () => {
  describe("BEGIN_SETUP", () => {
    it("Begins setting up", () => {
      const action = beginSetup();
      const kids = reducer(undefined, action);
      expect(kids[TEST_UUID]).toBeDefined();
    });
  });

  describe("SET_KID_NAME", () => {
    it("Sets the kid's name", () => {
      const TEST_NAME = "Test Name";

      const stateWithKid = reducer(undefined, beginSetup());

      const action = setKidName(TEST_NAME, TEST_UUID);
      const updatedState = reducer(stateWithKid, action);
      const kid = updatedState[TEST_UUID];
      expect(kid.name).toEqual(TEST_NAME);
    });
  });
});
