import React from 'react';
import * as Firebase from 'firebase';
import { AsyncStorage, Linking, Alert } from 'react-native';
import I18n from 'react-native-i18n';

import Loading from './App/Components/Loading';
import ParentApp from './App/Containers/ParentApp';
import Translation from './App/Constants/Translation';
import { logError } from './App/Utils';
import Analytics from 'react-native-analytics';
import OneSignal from 'react-native-onesignal';

I18n.fallbacks = true;
I18n.translations = Translation;

const getUUIDFromProfile = profileJSON => {
  if (!profileJSON) return null;

  const profile = JSON.parse(profileJSON);
  if (!profile || !profile.UUID) return null;
  const { UUID } = profile;

  return { UUID, deeplink: false };
};

const parseURL = URL => {
  if (!URL) return null;
  const UUID_REGEX = /([a-zA-Z0-9]){28}/;
  const match = URL.match(UUID_REGEX);

  if (!match) return null;

  return match[0];
};

const getUUIDFromDeeplink = () =>
  Linking.getInitialURL().then(URL => {
    const UUID = parseURL(URL);

    if (!UUID) return null;

    return { UUID, deeplink: true };
  });

export const getUUID = () =>
  AsyncStorage.getItem('profile').then(profileJSON => {
    const UUIDFromProfile = getUUIDFromProfile(profileJSON);

    if (UUIDFromProfile) {
      return UUIDFromProfile;
    }
    return getUUIDFromDeeplink();
  });

const getProfile = UUID => {
  const ref = Firebase.database().ref(`parents/${UUID}/`);

  return ref
    .once('value')
    .then(snapshot => {
      Firebase.database().goOffline();
      const profile = snapshot.val();
      return profile;
    })
    .catch(error => {
      logError(
        `Error while getting the profile from Firebase: ${error.message}`,
      );
      return null;
    });
};

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
    getUUID()
      .then(result => {
        if (result) {
          const { UUID, deeplink } = result;

          // Previous user or new user with deeplink
          getProfile(UUID).then(profile => {
            if (profile) {
              this.setStateAsync({
                profile,
                deeplink,
                loading: false,
              });
            } else {
              logError(`No profile found for ${UUID}. Continuing as new user.`);
              this.setStateAsync({ loading: false, deeplink: false });
            }
          });
        } else {
          // New user
          this.setStateAsync({ loading: false, deeplink: false });
        }
      })
      .catch(error => {
        Alert.alert('Error fetching data from traxi.');
        logError(`Error fetching profile: ${error.message}`);
        this.setStateAsync({ loading: false, deeplink: false });
      });
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
