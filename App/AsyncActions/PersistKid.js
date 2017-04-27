// @flow
import * as Firebase from "firebase";
import type { KidsState } from "../Reducers/Kids";
import type { SetupState } from "../Reducers/Setup";

// NOTE: Importing RootState from '../Reducers' does not seem to work?
type RootState = {
  kidsState: KidsState,
  setupState: SetupState
};

type Dispatch = () => void;
type GetState = () => RootState;

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { setupState, kidsState } = getState();

    const { kidUUID } = setupState;
    if (!kidUUID) return Promise.reject();

    const kid = kidsState[kidUUID];

    return Firebase.database().ref(`kids/${kidUUID}`).set(kid);
  };
