// @flow
import * as Firebase from 'firebase';
import type { RootState } from '../Reducers';

type Dispatch = () => void;
type GetState = () => RootState;

export default () =>
  (dispatch: Dispatch, getState: GetState): Promise<any> => {
    const { parentState } = getState();
    const { UUID } = parentState;

    if (!UUID) return Promise.reject(new Error('No UUID set for parent'));

    return Firebase.database().ref(`parents/${UUID}`).set(parentState);
  };
