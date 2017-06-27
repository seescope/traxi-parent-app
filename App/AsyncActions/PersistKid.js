// @flow
import * as Firebase from 'firebase';
import { cleanObjectForFirebase } from '../Utils';

import type { Kid } from '../Reducers/Kids';
import type { Dispatch, GetState } from '../Reducers';

const saveKidInFirebase = (kid: Kid): Promise<any> =>
  Firebase.database().ref(`kids/${kid.UUID}`).set(cleanObjectForFirebase(kid));

export default (kid: ?Kid) =>
  (dispatch: Dispatch, getState: GetState) => {
    if (kid) {
      return saveKidInFirebase(kid);
    }

    const { setupState, kidsState } = getState();
    const { kidUUID } = setupState;
    if (!kidUUID) return Promise.reject('No kid UUID!');

    const kidFromState = kidsState[kidUUID];
    return saveKidInFirebase(kidFromState);
  };
