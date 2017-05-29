// @flow
import { Actions } from 'react-native-router-flux';
import { database } from 'firebase';
import {
  beginSetup,
  beginDeeplinkSetup,
} from '../Reducers/Parent/parentActions';
import type { ParentState } from '../Reducers/Parent';
import type { Kid } from '../Reducers/Kids';
import persistSetupID from './PersistSetupID';
import userLoggedIn from './UserLoggedIn';

type Dispatch = () => void;

const fetchParent = (UUID: string): Promise<?ParentState> =>
  database().ref(`parents/${UUID}`).once('value').then(data => data.val());

const fetchKid = (UUID: string): Promise<?Kid> =>
  database().ref(`kids/${UUID}`).once('value').then(data => data.val());

const beginFreshSetup = (UUID: string, dispatch: Dispatch): void => {
  dispatch(beginSetup(UUID));
  dispatch(persistSetupID());
  dispatch(userLoggedIn());

  Actions.splashScreen({ type: 'replace' });
};

export default (parentUUID: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const parent = await fetchParent(parentUUID);

    if (!parent) {
      beginFreshSetup(parentUUID, dispatch);
      return;
    }

    const kidUUID = parent.kids[0];
    const kid = await fetchKid(kidUUID);

    if (!kid) {
      beginFreshSetup(parentUUID, dispatch);
      return;
    }

    dispatch(beginDeeplinkSetup(parent, kid));
    dispatch(userLoggedIn());
    Actions.setKidImage({ type: 'replace' });
  };
