// @flow
import * as Firebase from 'firebase';
import type { KidsState, Kid } from '../Reducers/Kids';
import type { SetupState } from '../Reducers/Setup';
import { cleanObjectForFirebase } from '../Utils';

// NOTE: Importing RootState from '../Reducers' does not seem to work?
type RootState = {
  kidsState: KidsState,
  setupState: SetupState,
};

type Dispatch = () => void;
type GetState = () => RootState;

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
