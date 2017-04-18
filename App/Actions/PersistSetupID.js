import * as Firebase from "firebase";

export default () =>
  (dispatch, getState) => {
    const { setupState } = getState();
    const { setupID, kidUUID } = setupState;

    return Firebase.database().ref(`setupIDs/${setupID}`).set(kidUUID);
  };
