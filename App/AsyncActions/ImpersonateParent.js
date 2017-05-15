// @flow
import { Actions } from 'react-native-router-flux';
import { database } from 'firebase';
import { impersonatedParent } from '../Reducers/Parent/parentActions';
import fetchReports from './FetchReports';
import type { ParentState } from '../Reducers/Parent';
import type { Kid } from '../Reducers/Kids';

type Dispatch = () => void;

const fetchParent = (UUID: string): Promise<ParentState> =>
  database().ref(`parents/${UUID}`).once('value').then(data => data.val());

const fetchKid = (UUID: string): Promise<Kid> =>
  database().ref(`kids/${UUID}`).once('value').then(data => data.val());

export default (parentUUID: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    const parent = await fetchParent(parentUUID);
    const kidUUID = parent.kids[0];
    const kid = await fetchKid(kidUUID);
    const kids = {
      [kidUUID]: kid,
    };

    dispatch(impersonatedParent(parent, kids));
    dispatch(fetchReports());
    Actions.dashboard({ type: 'replace' });
  };
