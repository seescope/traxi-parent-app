// @flow
import { Actions } from "react-native-router-flux";
import lodash from "lodash";

import type { RootState } from "../Reducers";
import type { KidsState } from "../Reducers/Kids";
import fetchReports from "./FetchReports";
import checkDeeplink from "./CheckDeeplink";

type Dispatch = () => void;
type GetState = () => RootState;

const hasInstalledKids = (kidsState: KidsState) => {
  const installed = lodash
    .chain(kidsState)
    .mapValues("installed")
    .values()
    .value();
  return installed.includes(true);
};

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { kidsState } = getState();

    if (hasInstalledKids(kidsState)) {
      Actions.dashboard({ type: "replace" });
      return dispatch(fetchReports());
    }

    return dispatch(checkDeeplink());
  };
