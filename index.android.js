import { AppRegistry } from 'react-native';
import { setTheme } from 'react-native-material-kit';
import { TRAXI_BLUE, NEUTRAL } from './App/Constants/Colours';
import codePush from 'react-native-code-push';
import App from './App';

const theme = {
  primaryColor: NEUTRAL,
  accentColor: TRAXI_BLUE,
};

setTheme(theme);

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
AppRegistry.registerComponent('traxi', () => codePush(codePushOptions)(App));
