// @flow
import { Actions } from "react-native-router-flux";
import { database } from "firebase";
import { beginDeeplinkSetup } from "../Reducers/Parent/parentActions";
import type { ParentState } from "../Reducers/Parent";
import type { Kid } from "../Reducers/Kids";

type Dispatch = () => void;

const fetchParent = (UUID: string): Promise<ParentState> =>
  database().ref(`parents/${UUID}`).once().then(data => data.val());

const fetchKid = (UUID: string): Promise<Kid> =>
  database().ref(`kids/${UUID}`).once().then(data => data.val());

export default (parentUUID: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const parent = await fetchParent(parentUUID);
    const kidUUID = parent.kids[0];
    const kid = await fetchKid(kidUUID);

    dispatch(beginDeeplinkSetup(parent, kid));
    Actions.setKidImage();
  };
