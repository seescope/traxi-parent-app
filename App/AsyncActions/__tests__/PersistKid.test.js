import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import persistKid from "../PersistKid";
import { mockSet } from "firebase";

const TEST_KID = {
  UUID: "abc-123",
  name: "Jeff"
};

const TEST_SETUP_STATE = {
  kidUUID: TEST_KID.UUID
};

describe("PersistKid", () => {
  test("Fetches the SetupID and Kid from the store and persists it in Firebase", () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      kidState: {
        [TEST_KID.UUID]: TEST_KID
      },
      setupState: TEST_SETUP_STATE
    });

    return store.dispatch(persistKid()).then(() => {
      expect(mockSet).toHaveBeenCalledWith(TEST_KID);
    });
  });
});
