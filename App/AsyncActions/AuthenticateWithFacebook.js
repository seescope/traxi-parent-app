// @flow
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { auth } from 'firebase';

import userLoggedIn from './UserLoggedIn';
import {
  accountCreated,
  setName,
  setEmail,
} from '../Reducers/Parent/parentActions';
import { logError } from '../Utils';

import type { Dispatch } from '../Reducers';

type FirebaseUser = {
  displayName: string,
  email: string,
  toJSON: () => string
};

export default () =>
  (dispatch: Dispatch): Promise<any> =>
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) throw new Error('Login was cancelled');

        // Get the access token
        return AccessToken.getCurrentAccessToken();
      })
      .then(data => {
        // Create a new Firebase credential with the token
        const credential = auth.FacebookAuthProvider.credential(
          data.accessToken
        );

        // Login with Credential
        return auth().signInWithCredential(credential);
      })
      .then((user: FirebaseUser) => {
        console.log('Authenticated with Facebook Successfully', user.toJSON());
        const { displayName, email } = user;
        dispatch(setName(displayName));
        dispatch(setEmail(email));

        dispatch(userLoggedIn());
        return dispatch(accountCreated('Facebook'));
      })
      .catch((e: Error) => {
        // Log, then re-throw.
        console.error('Error authenticating with Facebook', e.message);
        logError(e);
        throw e;
      });
