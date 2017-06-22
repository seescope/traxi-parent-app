// @flow
import { Actions } from 'react-native-router-flux';
import { database } from 'firebase';
import _ from 'lodash';

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
    try {
      const parent = await fetchParent(parentUUID);
      const allKids = await Promise.all(
        parent.kids.map(UUID => fetchKid(UUID))
      );

      const kids = _.keyBy(allKids, 'UUID');

      dispatch(impersonatedParent(parent, kids));
      dispatch(fetchReports());
      Actions.dashboard({ type: 'replace' });
    } catch (e) {
      console.error(e);
    }
  };
