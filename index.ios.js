import { AppRegistry, StatusBar } from 'react-native';
import codePush from 'react-native-code-push';
import App from './App';

StatusBar.setHidden(true);

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};
AppRegistry.registerComponent('traxi', () => codePush(codePushOptions)(App));

// import { configureEndpoint } from './Notifications';
//
// configureEndpoint();
