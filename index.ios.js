import React from 'react';
import { View, AppRegistry, StatusBar } from 'react-native';
// import codePush from 'react-native-code-push';
// import App from './App';
//
StatusBar.setHidden(true);
//
// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
// };
const App = View;
// AppRegistry.registerComponent('traxi', () => codePush(codePushOptions)(App));
AppRegistry.registerComponent('traxi', () => App);

import PushNotification, {
  configureNotificationEndpoint,
} from './Notifications';

const profile = {
  UUID: 'YwS0vJ8OE8N6yenxHaV6PdMVLbG3',
  kids: [
    {
      UUID: 'bbb0d8dc-1537-4748-a8d8-d68d1894cede',
      name: 'Alex',
    },
    {
      UUID: 'c3d3430e-690f-4606-9188-b54f7899d0d3',
      name: 'Chris',
    },
  ],
};

// const profile = {
//   UUID: 'AwS0vJ8OE8N6yenxHaV6PdMVLbG3',
//   kids: [
//     {
//       UUID: 'abb0d8dc-1537-4748-a8d8-d68d1894cede',
//       name: 'fred',
//     },
//   ],
// };

configureNotificationEndpoint(profile);
