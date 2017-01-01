import { NativeModules } from 'react-native';
import { logError } from '../Utils';

const loginWithMethod = () =>
  (dispatch) =>
    NativeModules.Authentication.authenticate()
    .then(profile => dispatch({ type: 'LOGGED_IN', profile }))
    .catch(error => {
      logError(error.message);
      throw error;
    });

export default loginWithMethod;
