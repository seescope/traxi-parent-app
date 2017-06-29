// @flow
import * as Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import getInitalUsage from './GetInitialUsage';
import { kidUpdated } from '../Reducers/Kids/kidsActions';

import type { Kid } from '../Reducers/Kids/index';
import type { Dispatch, GetState } from '../Reducers';

type FirebaseKid = {
  UUID: string,
  status: string,
  deviceType: 'iPhone' | 'iPad' | 'Android',
  name: string,
  avatarURL: string,
  installed: boolean
};

// HACK: This is awful, and ugly. Necessary because Traxi updates the
// wrong field on the kid in Firebase.
const convertKid = (firebaseKid: FirebaseKid): Kid => ({
  name: firebaseKid.name,
  deviceType: firebaseKid.deviceType,
  UUID: firebaseKid.UUID,
  installed: firebaseKid.installed || firebaseKid.status === 'INSTALLED',
  avatarURL: firebaseKid.avatarURL,
});

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { setupState } = getState();
    const { kidUUID } = setupState;

    if (!kidUUID) return Promise.reject();

    // Callback that will be fired when the kid is updated in Firebase.
    const deviceUpdated = snapshot => {
      const firebaseKid: FirebaseKid = snapshot.val();
      const updatedKid = convertKid(firebaseKid);

      const { UUID, installed } = updatedKid;

      if (UUID) {
        dispatch(kidUpdated(updatedKid, UUID));
      }

      if (installed) {
        dispatch(getInitalUsage());
        Actions.initialUsage({ type: 'reset' });
        Firebase.database().ref(`kids/${kidUUID}`).off();
      }
    };

    // Watch the Kid in Firebase. When `traxi-setup` or `traxi-tunnel` modify
    // the kid, we will be notified and our callback will fire, moving the
    // parent through the setup process.
    return Firebase.database()
      .ref(`kids/${kidUUID}`)
      .on('value', deviceUpdated);
  };
