import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import watchKid from "../WatchKid";
import { mockData } from "firebase";

const TEST_SETUP_STATE = {
  setupID: 1234,
  kidUUID: "abc-123"
};

describe("WatchKid", () => {
  test("Watches the kid in Firebase, then dispatches KID_UPDATED when it is received", () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      setupState: TEST_SETUP_STATE
    });
    const TEST_KID = {
      UUID: TEST_SETUP_STATE.kidUUID
    };

    mockData.data = TEST_KID;

    return store.dispatch(watchKid()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual("KID_UPDATED");
      expect(action.kid).toEqual(TEST_KID);
    });
  });
});
