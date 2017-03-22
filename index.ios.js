import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import App from './App';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};
AppRegistry.registerComponent('traxi', () => codePush(codePushOptions)(App));
AppRegistry.registerComponent('traxi', () => App);
