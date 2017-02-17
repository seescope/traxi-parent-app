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
    general: {
      nextStep: 'Next step',
      thanks: 'Thanks',
      needHelp: 'I need help',
    },
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
    areYouReady: {
      header: 'Ready to see what your kids are looking at?',
      notReadyYet: 'Not right now',
      ready: 'I\'m ready!',
    },
    setName: {
      header: 'Let\'s get started!',
      kidsName: 'What is your kid\'s name?',
    },
    setImage: {
      setAPictureFor: 'Now, let\'s set a picture for',
      chooseAPicture: 'Choose a picture',
      dontWorry: 'Don\'t worry, only you can see it',
      notNow: 'Not right now',
    },
    prompt: {
      header: 'Looking good',
      doYouHave: 'Do you have {{kidName}}\'s phone or tablet?',
      no: 'No, I don\'t',
      yes: 'Yes, I do',
    },
    instructions: {
      ios0: `Tap the "Install"\n button in the top right`,
      ios1: `Tap the "Install"\n button again`,
      ios2: 'Tap "Done"',
      goToMyTraxi: 'Go to mytraxi.com on {{kidName}}’s device',
    },
    showPin: {
      header: "On {{kidName}}'s device \n go to mytraxi.com \n and enter the code:",
      waiting: "Waiting for {{kidName}}'s device...",
    },
  },
  ms: {
    general: {
      nextStep: 'Seterusnya',
      thanks: 'Terima kasih',
      needHelp: 'Tolong saya',
    },
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
    areYouReady: {
      header: 'Adakah anda bersedia?',
      notReadyYet: 'Belum lagi',
      ready: 'Ready!',
    },
    setName: {
      header: 'Mari mulakan!',
      kidsName: 'Apakah nama anak anda?',
    },
    setImage: {
      setAPictureFor: 'Pilih gambar untuk',
      chooseAPicture: 'Pilih gambar',
      dontWorry: 'Hanya anda boleh melihatnya',
      notNow: 'Bukan sekarang',
    },
    prompt: {
      header: 'Syabas',
      doYouHave: 'Adakah anda mempunyai telefon atau tablet {{kidName}}?',
      no: 'Saya tidak',
      yes: 'Ya, saya ada',
    },
    instructions: {
      ios0: 'Ketik butang "memasang"',
      ios1: 'Ketik "memasang" lagi',
      ios2: 'Ketik "dilakukan"',
      goToMyTraxi: 'Pergi ke mytraxi.com pada peranti {{kidName}}',
    },
    showPin: {
      header: 'Pada peranti {{kidName}} pergi ke mytraxi.com dan masukkan kod',
      waiting: 'Menunggu untuk peranti {{kidName}}',
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
