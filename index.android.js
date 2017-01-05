import React from 'react';
import { AppRegistry, AsyncStorage, NativeModules } from 'react-native';
import SMS from 'react-native-sms-android';
import { setTheme } from 'react-native-material-kit';
import Firebase from 'firebase';
import codePush from 'react-native-code-push';

import ParentApp from './App/Containers/ParentApp';
import KidApp from './App/Containers/KidApp';
import LoadingIndicator from './App/Components/LoadingIndicator';
import Background from './App/Components/Background';
import { TRAXI_BLUE, NEUTRAL } from './App/Constants/Colours';

const getUUIDFromSMS = (smsList = []) => {
  const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
  if (smsList.length < 1) { return null; }

  const UUID_SMS = smsList.filter(f => f.body.match(UUID_REGEX))[0];

  if (typeof(UUID_SMS) === 'undefined') { return null; }

  return UUID_SMS.body.match(UUID_REGEX)[0];
};

class traxi extends React.Component {
  constructor() {
    super();
    // AsyncStorage.removeItem('profile');

    AsyncStorage.setItem('profile', JSON.stringify({
      kids: [],
      UUID: 'R1r9IfVPDVa15PUCJLKhgNnIgnu1',
    }));
    this.state = {
      profile: {},
      loading: true,
      isKid: false,
    };

    const theme = {
      primaryColor: NEUTRAL,
      accentColor: TRAXI_BLUE,
    };

    setTheme(theme);
  }

  componentDidMount() {
    this.getDeviceState();
  }

  getDeviceState() {
    AsyncStorage.getItem('profile').then(profileJSON => {
      if (profileJSON === null) {
        this.deviceNotInstalled();
        return;
      }

      const profile = JSON.parse(profileJSON);

      // Are we a parent?
      if (profile.kids) {
        const URI = `https://traxiapp.firebaseio.com/parents/${profile.UUID}`;

        new Firebase(URI).once('value',
          data => {
            this.setState({
              profile: data.val(),
              loading: false,
            });
          },
          error => {
            console.error(error);
            alert('Error fetching data from traxi.');
            this.setState({ loading: false });
          }
        );
      } else {
        this.setState({ isKid: true, loading: false, UUID: profile.UUID });
        NativeModules.VPNClient.startVPN(profile.UUID);
      }
    });
  }

  deviceNotInstalled() {
    const SMS_CONFIG = JSON.stringify({ box: 'inbox', address: 'traxi', read: 1 });
    SMS.list((SMS_CONFIG), error => { console.error(error); }, (count, smsList) => {
      const SMS_LIST = JSON.parse(smsList);

      const UUID = getUUIDFromSMS(SMS_LIST);

      // We haven't got a special traxi SMS: continue as parent setting for the first time.
      if (UUID === null) {
        this.setState({ isKid: false, loading: false });
        return;
      }

      const firebase = new Firebase(`https://traxiapp.firebaseio.com/kids/${UUID}/status`);
      firebase.on('value', (data) => {
        if (data.val() !== null) {
          // This UUID is awaiting setup.
          this.setState({ isKid: true, UUID });
        } else {
          // This UUID is not awaiting setup. This is weird.
          this.setState({ isKid: false });
          console.error('Found UUID without setup', UUID);
        }

        this.setState({ loading: false });
      });
    });
  }

  render() {
    const { loading, isKid, profile, UUID } = this.state;

    if (loading) {
      return (
        <Background>
          <LoadingIndicator>Loading..</LoadingIndicator>
        </Background>
      );
    }

    console.log('Index: ', profile);

    if (isKid) {
      return <KidApp isInstalled={!!profile.UUID} UUID={UUID} />;
    }

    return (
      <ParentApp profile={profile} />
    );
  }
}

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
AppRegistry.registerComponent('traxi', () => codePush(codePushOptions)(traxi));
