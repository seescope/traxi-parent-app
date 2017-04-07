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

export default class extends React.Component {
  constructor(props) {
    super(props);

    AsyncStorage.removeItem('profile');
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
  }
  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
  }

  async componentDidMount() {
    try {
      const profileJSON = await AsyncStorage.getItem('profile');

      let UUID;
      if (profileJSON) {
        const profile = JSON.parse(profileJSON);
        if (profile !== null && profile.UUID) {
          UUID = profile.UUID;
        }
      } else {
        const URL = await Linking.getInitialURL(); // Deeplinks
        if (URL) {
          UUID = URL.substring(
            URL.indexOf('data=') + 5,
            URL.indexOf('&apn=com.traxi'),
          );

          this.setStateAsync({ deeplink: true });
        }
      }

      if (UUID) {
        const config = {
          apiKey: 'AIzaSyDEq9qfwendZJ6yiyDgtjGCjWSS9PSYWLU',
          authDomain: 'traxiapp.firebaseapp.com',
          databaseURL: 'https://traxiapp.firebaseio.com',
          projectId: 'project-946779331638130823',
          storageBucket: 'project-946779331638130823.appspot.com',
          messagingSenderId: '204102393429',
        };
        Firebase.initializeApp(config);
        const ref = Firebase.database().ref(`parents/${UUID}/`);

        const profile = await ref
          .once('value')
          .then(snapshot => snapshot.val());

        Firebase.database().goOffline();

        if (profile) {
          this.setStateAsync({
            profile,
            loading: false,
          });
        } else {
          logError(`No profile found for ${UUID}. Continuing as new user.`);
          this.setStateAsync({ loading: false, deeplink: false });
        }
      } else {
        this.setStateAsync({ loading: false, deeplink: false });
      }
    } catch (error) {
      Alert.alert('Error fetching data from traxi.');
      logError(`Error fetching profile: ${error.message}`);
      this.setStateAsync({ loading: false, deeplink: false });
    }
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
