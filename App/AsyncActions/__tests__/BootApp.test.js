jest.mock("../CheckDeeplink", () =>
  () => dispatch => Promise.resolve(dispatch({ type: "TEST_CHECK_DEEPLINK" })));
jest.mock("../FetchReports", () =>
  () => dispatch => Promise.resolve(dispatch({ type: "TEST_FETCH_REPORTS" })));
import bootApp from "../BootApp";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Actions } from "react-native-router-flux";

describe("Boot App", () => {
  test("If there are installed kids in kidState, fetchReports and navigate to Dashboard", () => {
    const STATE_WITH_KIDS = {
      kidsState: {
        "123-abc": {
          installed: true
        }
      }
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(STATE_WITH_KIDS);

    return store.dispatch(bootApp()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual("TEST_FETCH_REPORTS");
      expect(Actions.dashboard).toHaveBeenCalled();
    });
  });

  test("If there are no installed kids in kidState, checkDeeplink", () => {
    const STATE_WITH_NO_KIDS = {
      kidsState: {
        "123-abc": {
          installed: false
        }
      }
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore(STATE_WITH_NO_KIDS);

    return store.dispatch(bootApp()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual("TEST_CHECK_DEEPLINK");
    });
  });
});
