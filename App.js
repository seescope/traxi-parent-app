import React from 'react';
import Firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import I18n from 'react-native-i18n';

import ParentApp from './App/Containers/ParentApp';
import LoadingIndicator from './App/Components/LoadingIndicator';
import Background from './App/Components/Background';
import { logError } from './App/Utils';

I18n.fallbacks = true;
I18n.translations = {
  en: {
    splashScreen: {
      mainHeader: 'What is your child doing online?',
      button: 'Find out now',
    },
    intro: {
      header0: 'First, get your kid\'s device',
      header1: 'Go to mytraxi.com',
      header2: 'Then enter a code',
      header3: 'Follow the instructions',
      header4: 'Then you\'re done!',
      subheader0: 'Don\'t worry, you can do this later',
      subheader1: 'Use the web browser on your child’s device',
      subheader2: 'We\'ll tell you what it is soon',
      subheader3: 'It only takes a couple of seconds',
      subheader4: 'Doesn\'t that look easy?',
      button: 'Got it!',
    },
  },
  ms: {
    splashScreen: {
      mainHeader: 'Apa yang anak anda lakukan dalam talian?',
      button: 'Cari sekarang',
    },
    intro: {
      header0: 'Pertama, mendapatkan peranti anak anda',
      header1: 'Pergi ke mytraxi.com',
      header2: 'Kemudian masukkan kod',
      header3: 'Ikut arahan',
      header4: 'Anda Selesai!',
      subheader0: 'Anda boleh melakukan ini kemudian',
      subheader1: 'Gunakan web browser anak anda',
      subheader2: 'Kami akan memberitahu anda kod di',
      subheader3: 'Ia sangat cepat',
      subheader4: 'Bukankah itu mudah?',
      button: 'Faham!',
    },
  },
};

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

        new Firebase(URI).once('value',
          data => {
            if (data.val() !== null) {
              this.setState({
                profile: data.val(),
                loading: false,
              });
            } else {
              logError(`No profile found for ${profile.UUID}. Continuing as new user.`);
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

    return (
      <ParentApp profile={profile} />
    );
  }
}
