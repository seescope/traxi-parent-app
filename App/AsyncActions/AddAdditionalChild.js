// @flow
import uuid from 'uuid';

import persistParent from './PersistParent';
import persistKid from './PersistKid';
import persistSetupID from './PersistSetupID';
import { addedAdditionalChild } from '../Reducers/Parent/parentActions';

import type { Dispatch, GetState } from '../Reducers';

export default () =>
  async (dispatch: Dispatch, getState: GetState): Promise<any> => {
    const { parentState } = getState();
    const { upgradedAt } = parentState;

    if (!upgradedAt) throw new Error('Parent is not upgraded.');

    // Create the new kid
    const UUID = uuid.v4();
    const setupID = Math.round(Math.random() * 10000);
    dispatch(addedAdditionalChild(UUID, setupID));

    // Persist the updated parent, setupID and new kid
    dispatch(persistParent());
    dispatch(persistSetupID());

    const { kidsState } = getState();
    const newKid = kidsState[UUID];
    dispatch(persistKid(newKid));
  };
