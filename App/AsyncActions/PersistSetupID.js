// @flow
import * as Firebase from 'firebase';
import type { Dispatch, GetState } from '../Reducers';

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { setupState } = getState();
    const { setupID, kidUUID } = setupState;

    if (!setupID || !kidUUID) return Promise.reject();
    return Firebase.database().ref(`setupIDs/${setupID}`).set(kidUUID);
  };
