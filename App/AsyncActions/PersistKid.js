// @flow
import * as Firebase from "firebase";
import type { RootState } from "../Reducers";

type Dispatch = () => void;
type GetState = () => RootState;

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { kidsState, setupState } = getState();
    const { kidUUID } = setupState;
    if (!kidUUID) return Promise.reject();

    const kid = kidsState[kidUUID];

    return Firebase.database().ref(`kids/${kidUUID}`).set(kid);
  };
