// @flow
import * as Firebase from "firebase";
import { kidUpdated } from "../Reducers/Kids/kidsActions";
import type { Kid, KidsAction } from "../Reducers/Kids/index";
import type { SetupState } from "../Reducers/Setup/index";

type Dispatch = (action: KidsAction) => void;
type GetState = () => { setupState: SetupState }; // TODO: Add a root state type

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { setupState } = getState();
    const { kidUUID } = setupState;

    if (!kidUUID) return Promise.reject();

    // Callback that will be fired when the kid is updated in Firebase.
    const deviceUpdated = snapshot => {
      const kid: Kid = snapshot.val();
      const { UUID } = kid;
      if (UUID) {
        dispatch(kidUpdated(kid, UUID));
      }
    };

    // Watch the Kid in Firebase. When `traxi-setup` or `traxi-tunnel` modify
    // the kid, we will be notified and our callback will fire, moving the
    // parent through the setup process.
    return Firebase.database()
      .ref(`kids/${kidUUID}`)
      .on("value", deviceUpdated);
  };
