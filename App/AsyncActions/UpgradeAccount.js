// @flow
import { accountUpgraded } from '../Reducers/Parent/parentActions';
import type { ParentAction } from '../Reducers/Parent';

type Dispatch = (ParentAction) => void;

export default () =>
  async (dispatch: Dispatch): Promise<ParentAction> =>
    Promise.resolve(dispatch(accountUpgraded()));
