import { NativeModules } from 'react-native';

export default () => dispatch =>
  NativeModules.Authentication.authenticate()
  .then(profile => dispatch({ type: 'LOGGED_IN', profile }))
