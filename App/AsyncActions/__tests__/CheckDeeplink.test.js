let mockUUID = undefined;
jest.mock("../BeginDeeplinkSetup", () =>
  () =>
    dispatch =>
      Promise.resolve(dispatch({ type: "TEST_BEGIN_DEEPLINK_SETUP" })));
jest.mock("../../Utils", () => ({
  getUUIDFromDeeplink: () => Promise.resolve(mockUUID)
}));
import { Actions } from "react-native-router-flux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import checkDeeplink from "../CheckDeeplink";

describe("CheckDeeplink", () => {
  test("If there is an initialURL, beginDeeplinkSetup", () => {
    mockUUID = "abc-123";

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(undefined);

    return store.dispatch(checkDeeplink()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual("TEST_BEGIN_DEEPLINK_SETUP");
    });
  });

  test("If there is no initialURL, navigate to Splash Screen", () => {
    mockUUID = null;

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(undefined);

    return store.dispatch(checkDeeplink()).then(() => {
      expect(Actions.splashScreen).toHaveBeenCalled();
    });
  });
});
