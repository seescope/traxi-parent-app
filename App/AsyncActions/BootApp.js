// @flow
import { Actions } from "react-native-router-flux";

import type { RootState } from "../Reducers";
import type { KidsState } from "../Reducers/Kids";
import fetchReports from "./FetchReports";
import checkDeeplink from "./CheckDeeplink";

type Dispatch = () => void;
type GetState = () => RootState;

const hasKids = (kidState: KidsState) => Object.keys(kidState || {}).length > 0;

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { kidsState } = getState();

    if (hasKids(kidsState)) {
      Actions.dashboard({ type: "replace" });
      return dispatch(fetchReports());
    }

    return dispatch(checkDeeplink());
  };
