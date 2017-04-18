// @flow
import * as Firebase from "firebase";
import type { SetupState } from "../Reducers/Setup";
type Dispatch = () => void;
type GetState = () => {
  setupState: SetupState
};

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { setupState } = getState();
    const { setupID, kidUUID } = setupState;

    if (!setupID || !kidUUID) return Promise.reject();
    return Firebase.database().ref(`setupIDs/${setupID}`).set(kidUUID);
  };
