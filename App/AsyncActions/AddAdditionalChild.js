// @flow
import uuid from 'uuid';
import { Actions } from 'react-native-router-flux';

import persistParent from './PersistParent';
import persistKid from './PersistKid';
import upgradeAccount from './UpgradeAccount';
import { addedAdditionalChild } from '../Reducers/Parent/parentActions';

import type { RootState } from '../Reducers';
// import type { ParentAction } from '../Reducers/Parent';

type Dispatch = (any) => void;
type GetState = () => RootState;

export default () =>
  async (dispatch: Dispatch, getState: GetState): Promise<any> => {
    const { parentState } = getState();
    const { upgradedAt } = parentState;

    // TODO: Handle if parent did not want to upgrade account.
    if (!upgradedAt) await dispatch(upgradeAccount());

    // Create the new kid
    const UUID = uuid.v4();
    const setupID = Math.round(Math.random() * 10000);
    dispatch(addedAdditionalChild(UUID, setupID));

    // Persist the updated parent and new kid
    dispatch(persistParent());
    const { kidsState } = getState();
    const newKid = kidsState[UUID];
    dispatch(persistKid(newKid));

    Actions.deviceSetup();
  };
