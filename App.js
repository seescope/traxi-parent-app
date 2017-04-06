import React from 'react';
import Firebase from 'firebase-old';
import { AsyncStorage, Linking } from 'react-native';
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
  }
  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
  }

  componentDidMount() {
    AsyncStorage.getItem('profile').then(async profileJSON => {
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
        try {
          //const URL = await Linking.getInitialURL(); // Deeplinks
          const URL = `https://c7g74.app.goo.gl/?link=http://www.gettraxi.com/?data=YwS0vJ8OE8N6yenxHaV6PdMVLbG3_test@email.com&apn=com.traxi&ibi=com.traxi.app&isi=1195455850'`;
          if (!URL) this.setState({ loading: false });

          const data = URL.substring(
            URL.indexOf('data=') + 5,
            URL.indexOf('&apn=com.traxi'),
          );
          const UUID = data.substring(0, data.indexOf('_'));
          const email = data.substring(data.indexOf('_') + 1);

          const newUserFromDeeplink = {
            UUID,
            email,
          };
          this.setState({ newUserFromDeeplink, loading: false });
        } catch (error) {
          this.setState({ loading: false });
        }
      }
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

  render() {
    const { profile, newUserFromDeeplink, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <ParentApp profile={profile} newUserFromDeeplink={newUserFromDeeplink} />
    );
  }
}
