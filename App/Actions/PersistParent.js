import * as Firebase from "firebase";

export default () =>
  (dispatch, getState) => {
    const { parentState } = getState();

    return Firebase.database()
      .ref(`parents/${parentState.UUID}`)
      .set(parentState);
  };
