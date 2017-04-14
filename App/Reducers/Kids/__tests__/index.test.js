import { beginSetup } from "../../Parent/parentActions";
import reducer from "../index.js";

const TEST_UUID = "non-random-uuid";

describe("Kids reducer", () => {
  describe("Begin Setup", () => {
    it("Begins setting up", () => {
      const action = beginSetup();
      const kids = reducer(undefined, action);
      expect(kids[TEST_UUID]).toBeDefined();
    });
  });
});
