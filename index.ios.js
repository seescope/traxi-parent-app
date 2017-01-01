import React from 'react';
import Firebase from 'firebase';
import { AsyncStorage, AppRegistry, StatusBar } from 'react-native';

import ParentApp from './App/Containers/ParentApp';
import LoadingIndicator from './App/Components/LoadingIndicator';
import Background from './App/Components/Background';
import { logError } from './App/Utils';
import codePush from 'react-native-code-push';

StatusBar.setHidden(true);

class traxi extends React.Component {
  constructor(props) {
    super(props);

    // AsyncStorage.setItem('profile', JSON.stringify({
    //   UUID: "R1r9IfVPDVa15PUCJLKhgNnIgnu1",
    // }));
    //
    //

    this.state = {
      profile: {},
      loading: true,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('profile').then(profileJSON => {
      if (profileJSON !== null) {
        const profile = JSON.parse(profileJSON);
        console.log('UUID', profile.UUID);
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
            console.error(error);
            alert('Error fetching data from traxi.');
            this.setState({ loading: false });
          }
        );
      } else {
        this.setState({ loading: false });
      }

      // this.setState({
      //   profile: {
      //     name: 'Yeah Man',
      //     kids: [
      //       {
      //         UUID: '886b79ea-3572-4b4a-9c25-59b14639ac3d',
      //         name: 'Paul Winstone',
      //         avatarURL: 'http://i.imgur.com/8VZ4ZMP.jpg',
      //       },
      //       {
      //         UUID: 'b258af06-76d6-43e8-aca2-aabaa1fc3f11',
      //         name: 'James Winstone',
      //         avatarURL: 'http://weneedfun.com/wp-content/uploads/2015/10/Steve-Jobs-young-Time-Photos-14.jpg',
      //       }
      //     ],
      //   },
      // });
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

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
AppRegistry.registerComponent('traxi', () => codePush(codePushOptions)(traxi));
