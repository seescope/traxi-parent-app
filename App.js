import React from 'react';
import { AsyncStorage } from 'react-native';
import * as Firebase from 'firebase';
import I18n from 'react-native-i18n';
import codePush from 'react-native-code-push';

import ParentApp from './App/Containers/ParentApp';
import Translation from './App/Constants/Translation';
import Analytics from 'react-native-analytics';
import OneSignal from 'react-native-onesignal';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import RootReducer from './App/Reducers';
import { backButtonHandler, loggingMiddleware } from './App/Utils';
import bootApp from './App/AsyncActions/BootApp';
import trackingMiddleware from './App/Middleware/Tracking';
import firebaseTrackingMiddleware from './App/Middleware/FirebaseTracking';
import impersonateParent from './App/AsyncActions/ImpersonateParent'; // eslint-disable-line
// import actions from './parentAppActions.json';
// import replayActions from './App/Middleware/ReplayActions';

I18n.fallbacks = true;
I18n.translations = Translation;

const config = {
  apiKey: 'AIzaSyDEq9qfwendZJ6yiyDgtjGCjWSS9PSYWLU',
  authDomain: 'traxiapp.firebaseapp.com',
  databaseURL: 'https://traxiapp.firebaseio.com',
  projectId: 'project-946779331638130823',
  storageBucket: 'project-946779331638130823.appspot.com',
  messagingSenderId: '204102393429',
};

try {
  Firebase.initializeApp(config);
} catch (e) {
  console.warn('Error initialising Firebase', e);
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.store = createStore(
      RootReducer,
      undefined,
      compose(
        applyMiddleware(
          ReduxThunk,
          loggingMiddleware,
          trackingMiddleware,
          firebaseTrackingMiddleware
        ),
        autoRehydrate()
      )
    );

    // Boot normally. Comment this out if testing.
    persistStore(this.store, { storage: AsyncStorage }, () =>
      this.store.dispatch(bootApp()));

    // TEST_PARENT_UUID, useful for... testing.

    // const TEST_PARENT_UUID = 'ee716cfb-76dc-4e86-9e43-4577a378f255';

    // Uncomment to replay actions.
    // setTimeout(
    //   () =>
    //     replayActions(
    //       TEST_PARENT_UUID,
    //       actions,
    //       this.store.dispatch
    //     ),
    //   1000
    // );

    // Uncomment to impersonate a parent for testing.
    // this.store.dispatch(impersonateParent(TEST_PARENT_UUID));
    // console.warn('Impersonating parent', TEST_PARENT_UUID);
  }

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
  }

  onReceived() {
    Analytics.track('Notification received');
  }

  onOpened() {
    Analytics.track('Notification opened');
  }

  async codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.UPDATE_INSTALLED: {
        const updateMetadata = await codePush.getUpdateMetadata();
        if (updateMetadata) {
          Analytics.track('CodePush update installed', {
            label: updateMetadata.label,
          });
        }
        break;
      }
      default: {
        const updateMetadata = await codePush.getUpdateMetadata();
        console.log('CodePush status changed', updateMetadata); // eslint-disable-line
      }
    }
  }

  render() {
    return (
      <ParentApp
        store={this.store}
        backButtonHandler={() => backButtonHandler(this.store)}
      />
    );
  }
}
