// @flow
import { Actions } from "react-native-router-flux";

import beginDeeplinkSetup from "./BeginDeeplinkSetup";
import { getUUIDFromDeeplink } from "../Utils";
type Dispatch = () => void;

export default () =>
  (dispatch: Dispatch) =>
    getUUIDFromDeeplink().then(UUID => {
      if (!UUID) return Actions.splashScreen();

      return dispatch(beginDeeplinkSetup());
    });
