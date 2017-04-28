// @flow
import * as Firebase from 'firebase';
import type { ParentState } from '../Reducers/Parent';

type Dispatch = () => void;
type GetState = () => {
  parentState: ParentState,
};

const createUser = (email: string, password: string): Promise<any> =>
  Firebase.auth().createUserWithEmailAndPassword(email, password);

const setName = (name: string): Promise<any> =>
  Firebase.auth().currentUser.updateProfile({ displayName: name });

export default () =>
  (dispatch: Dispatch, getState: GetState): Promise<any> => {
    const { parentState } = getState();
    const { name, email, password } = parentState;

    if (!email) {
      return Promise.reject(new Error('Please enter your email'));
    }

    if (!name) {
      return Promise.reject(new Error('Please enter your name'));
    }

    if (!password) {
      return Promise.reject(new Error('Please enter a password'));
    }

    return createUser(email, password).then(() => setName(name));
  };
