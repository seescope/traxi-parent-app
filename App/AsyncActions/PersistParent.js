// @flow
import * as Firebase from 'firebase';
import { cleanObjectForFirebase } from '../Utils';

import type { Dispatch, GetState } from '../Reducers';

export default () =>
  (dispatch: Dispatch, getState: GetState): Promise<any> => {
    const { parentState } = getState();
    const { UUID } = parentState;

    if (!UUID) return Promise.reject(new Error('No UUID set for parent'));

    const safeParentState = cleanObjectForFirebase(parentState);
    return Firebase.database().ref(`parents/${UUID}`).set(safeParentState);
  };
