// @flow
import * as Firebase from "firebase";
import type { ParentState } from "../Reducers/Parent";

type Dispatch = () => void;
type GetState = () => {
  parentState: ParentState
};

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { parentState } = getState();
    const { UUID } = parentState;

    if (!UUID) return Promise.reject();

    return Firebase.database().ref(`parents/${UUID}`).set(parentState);
  };
