import React from 'react';
import Firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import I18n from 'react-native-i18n';

import ParentApp from './App/Containers/ParentApp';
import LoadingIndicator from './App/Components/LoadingIndicator';
import Background from './App/Components/Background';
import Translation from './App/Constants/Translation';
import { logError } from './App/Utils';
import { configureNotificationEndpoint } from './App/Utils/Notifications';

I18n.fallbacks = true;
I18n.translations = Translation;

export default class extends React.Component {
  constructor(props) {
    super(props);

    // AsyncStorage.removeItem('profile');
    // AsyncStorage.setItem('profile', JSON.stringify({
    //   UUID: "YwS0vJ8OE8N6yenxHaV6PdMVLbG3",
    // }));

    this.state = {
      profile: {},
      loading: true,
    };
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
              configureNotificationEndpoint(data.val());
            } else {
              logError(
                `No profile found for ${profile.UUID}. Continuing as new user.`
              );
              this.setState({ loading: false });
            }
          },
          error => {
            logError(`Error fetching profile: ${error.message}`);
            alert('Error fetching data from traxi.');
            this.setState({ loading: false });
          }
        );
      } else {
        this.setState({ loading: false });
      }
    });
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
