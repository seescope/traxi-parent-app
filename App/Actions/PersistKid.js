import * as Firebase from "firebase";

export default () =>
  (dispatch, getState) => {
    const { kidState, setupState } = getState();
    const { kidUUID } = setupState;
    const kid = kidState[kidUUID];

    return Firebase.database().ref(`kids/${kidUUID}`).set(kid);
  };
