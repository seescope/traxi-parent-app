import React from 'react';
import Firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import I18n from 'react-native-i18n';

import ParentApp from './App/Containers/ParentApp';
import LoadingIndicator from './App/Components/LoadingIndicator';
import Background from './App/Components/Background';
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
    AsyncStorage.setItem(
      'profile',
      JSON.stringify({
        UUID: 'YwS0vJ8OE8N6yenxHaV6PdMVLbG3',
      }),
    );

    this.state = {
      profile: {},
      loading: true,
    };
  }
  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentDidMount() {
    AsyncStorage.getItem('profile').then(profileJSON => {
      const profile = JSON.parse(profileJSON);
      if (profile !== null && profile.UUID) {
        const URI = `https://traxiapp.firebaseio.com/parents/${profile.UUID}`;

        new Firebase(URI).once(
          'value',
          data => {
            if (data.val() !== null) {
              this.setState({
                profile: data.val(),
                loading: false,
              });
            } else {
              logError(
                `No profile found for ${profile.UUID}. Continuing as new user.`,
              );
              this.setState({ loading: false });
            }
          },
          error => {
            logError(`Error fetching profile: ${error.message}`);
            alert('Error fetching data from traxi.'); // eslint-disable-line
            this.setState({ loading: false });
          },
        );
      } else {
        this.setState({ loading: false });
      }
    });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  // eslint-disable-next-line
  onReceived(notification) {
    Analytics.track('Notification received');

    // console.log('Notification received: ', notification);
  }

  // eslint-disable-next-line
  onOpened(openResult) {
    Analytics.track('Notification opened');

    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
  }

  // eslint-disable-next-line
  onRegistered(notifData) {
    // console.log(
    //   'Device had been registered for push notifications!',
    //   notifData,
    // );
  }

  // eslint-disable-next-line
  onIds(device) {
    // console.log('Device info: ', device);
  }

  render() {
    const { profile, loading } = this.state;

    if (loading) {
      return (
        <Background>
          <LoadingIndicator>Loading...</LoadingIndicator>
        </Background>
      );
    }

    return <ParentApp profile={profile} />;
  }
}
