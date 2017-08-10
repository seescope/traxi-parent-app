// @flow
import * as Firebase from 'firebase';

import userLoggedIn from './UserLoggedIn';
import { accountCreated } from '../Reducers/Parent/parentActions';

import type { Dispatch, GetState } from '../Reducers';

const createUser = (email: string, password: string): Promise<any> =>
  Firebase.auth().createUserWithEmailAndPassword(email, password);

const setName = (name: string): Promise<any> =>
  Firebase.auth().currentUser.updateProfile({ displayName: name });

const removeWhiteSpaceFromEmail = (email: string): string => email.trim();

export default () =>
  async (dispatch: Dispatch, getState: GetState): Promise<any> => {
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

    await createUser(removeWhiteSpaceFromEmail(email), password);
    await setName(name);

    await dispatch(userLoggedIn());

    return dispatch(accountCreated());
  };
