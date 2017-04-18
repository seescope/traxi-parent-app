// @flow
import * as Firebase from "firebase";
import type { KidsState } from "../Reducers/Kids";
import type { SetupState } from "../Reducers/Setup";

type Dispatch = () => void;
type GetState = () => {
  kidState: KidsState,
  setupState: SetupState
};

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { kidState, setupState } = getState();
    const { kidUUID } = setupState;
    if (!kidUUID) return Promise.reject();

    const kid = kidState[kidUUID];

    return Firebase.database().ref(`kids/${kidUUID}`).set(kid);
  };
