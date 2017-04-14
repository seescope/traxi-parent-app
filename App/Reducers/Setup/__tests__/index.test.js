import reducer from "../index";
import { nextStep } from "../setupActions";
import { beginSetup } from "../../Parent/parentActions";

const TEST_UUID = "non-random-uuid";

describe("Setup Reducer", () => {
  describe("BEGIN_SETUP", () => {
    it("Sets up", () => {
      const action = beginSetup();
      const { step, kidUUID, setupID } = reducer(undefined, action);
      expect(step).toEqual(0);
      expect(kidUUID).toEqual(TEST_UUID);
      expect(setupID).toBeLessThan(10000);
      expect(setupID).toBeGreaterThan(0);
    });
  });

  describe("NEXT_STEP", () => {
    it("Increments the step", () => {
      const { step } = reducer(undefined, nextStep());
      expect(step).toEqual(1);
    });
  });
});
