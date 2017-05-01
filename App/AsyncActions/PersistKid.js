// @flow
import * as Firebase from 'firebase';
import type { KidsState, Kid } from '../Reducers/Kids';
import type { SetupState } from '../Reducers/Setup';

// NOTE: Importing RootState from '../Reducers' does not seem to work?
type RootState = {
  kidsState: KidsState,
  setupState: SetupState,
};

type Dispatch = () => void;
type GetState = () => RootState;

export default (kid: ?Kid) =>
  (dispatch: Dispatch, getState: GetState) => {
    if (kid) {
      const { UUID } = kid;
      return Firebase.database().ref(`kids/${UUID}`).set(kid);
    }

    const { setupState, kidsState } = getState();
    const { kidUUID } = setupState;
    if (!kidUUID) return Promise.reject('No kid UUID!');

    const kidFromState = kidsState[kidUUID];
    return Firebase.database().ref(`kids/${kidUUID}`).set(kidFromState);
  };
