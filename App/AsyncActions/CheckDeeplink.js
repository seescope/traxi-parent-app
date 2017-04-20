// @flow
import { Actions } from "react-native-router-flux";

import beginDeeplinkSetup from "./BeginDeeplinkSetup";
import { getUUIDFromDeeplink } from "../Utils";
import { beginSetup } from "../Reducers/Parent/parentActions";
type Dispatch = () => void;

export default () =>
  (dispatch: Dispatch) =>
    getUUIDFromDeeplink().then(UUID => {
      if (!UUID) {
        dispatch(beginSetup());
        Actions.splashScreen();
      }

      return dispatch(beginDeeplinkSetup(UUID));
    });
