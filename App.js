import React from 'react';
import * as Firebase from 'firebase';
import { Alert } from 'react-native';
import I18n from 'react-native-i18n';

import Loading from './App/Components/Loading';
import ParentApp from './App/Containers/ParentApp';
import Translation from './App/Constants/Translation';
import { logError, getUUID, getProfile } from './App/Utils';
import Analytics from 'react-native-analytics';
import OneSignal from 'react-native-onesignal';

I18n.fallbacks = true;
I18n.translations = Translation;

const checkResult = result => {
  // A UUID was found, but no profile was in Firebase. This is very odd, so we'll just continue as a new user.
  if (!result.profile) {
    logError(`No profile found for ${result.UUID}. Continuing as new user.`);
    return null;
  }

  return result;
};


export const getInitialState = () => getUUID()
  .then((result) => {
    // No UUID found. This is a new user.
    if (!result) return null;

    const { UUID, deeplink } = result;

    // Get the user's profile and return it.
    return getProfile(result.UUID).then(profile => ({
      profile,
      UUID,
      deeplink,
    }))
    .then(checkResult) 
  })
  .catch(error => {
    Alert.alert('Error fetching data from traxi.');
    logError(`Error fetching profile: ${error.message}`);
    return null;
  });

export default class extends React.Component {
  constructor(props) {
    super(props);

    // AsyncStorage.removeItem('profile');
    // AsyncStorage.setItem(
    //   'profile',
    //   JSON.stringify({
    //     UUID: 'YwS0vJ8OE8N6yenxHaV6PdMVLbG3',
    //   }),
    // );

    this.state = {
      profile: {},
      loading: true,
    };

    const config = {
      apiKey: 'AIzaSyDEq9qfwendZJ6yiyDgtjGCjWSS9PSYWLU',
      authDomain: 'traxiapp.firebaseapp.com',
      databaseURL: 'https://traxiapp.firebaseio.com',
      projectId: 'project-946779331638130823',
      storageBucket: 'project-946779331638130823.appspot.com',
      messagingSenderId: '204102393429',
    };

    Firebase.initializeApp(config);
  }

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
  }

  componentDidMount() {
    getInitialState()
      .then(initialState => this.setState({
        ...initialState,
        loading: false,
      }))
      .then(Firebase.database().goOffline());
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

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  render() {
    const { profile, deeplink, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return <ParentApp profile={profile} deeplink={deeplink} />;
  }
}
