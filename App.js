import React from "react";
// import { AsyncStorage } from 'react-native';
import * as Firebase from "firebase";
import I18n from "react-native-i18n";

import ParentApp from "./App/Containers/ParentApp";
import Translation from "./App/Constants/Translation";
import Analytics from "react-native-analytics";
import OneSignal from "react-native-onesignal";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import RootReducer from "./App/Reducers";
import { loggingMiddleware, trackingMiddleware } from "./App/Utils";
import { BackAndroid } from "react-native";
import { Actions } from "react-native-router-flux";

I18n.fallbacks = true;
I18n.translations = Translation;

const config = {
  apiKey: "AIzaSyDEq9qfwendZJ6yiyDgtjGCjWSS9PSYWLU",
  authDomain: "traxiapp.firebaseapp.com",
  databaseURL: "https://traxiapp.firebaseio.com",
  projectId: "project-946779331638130823",
  storageBucket: "project-946779331638130823.appspot.com",
  messagingSenderId: "204102393429"
};

Firebase.initializeApp(config);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.store = createStore(
      RootReducer,
      undefined,
      applyMiddleware(ReduxThunk, loggingMiddleware, trackingMiddleware)
    );
  }

  componentWillMount() {
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
  }

  onReceived() {
    Analytics.track("Notification received");
  }

  onOpened() {
    Analytics.track("Notification opened");
  }

  backButtonHandler() {
    const store = this.store;
    const { sceneName, step } = store.getState();

    if (sceneName === "walkthrough") {
      if (step === 0) Actions.pop();
      else store.dispatch({ type: "PREVIOUS_STEP" });

      return true;
    } else if (sceneName === "congratulations") {
      return true;
    }

    try {
      Actions.pop();
    } catch (error) {
      // The user is in the root scene - exit the app.
      BackAndroid.exitApp();
      return false;
    }

    // Default
    return true;
  }

  render() {
    return (
      <ParentApp
        store={this.store}
        backButtonHandler={() => this.backButtonHandler()}
      />
    );
  }
}
