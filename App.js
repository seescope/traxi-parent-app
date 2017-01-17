import React from 'react';
import Firebase from 'firebase';
import { AsyncStorage } from 'react-native';

import ParentApp from './App/Containers/ParentApp';
import LoadingIndicator from './App/Components/LoadingIndicator';
import Background from './App/Components/Background';
import { logError } from './App/Utils';

export default class extends React.Component {
  constructor(props) {
    super(props);

    // AsyncStorage.removeItem('profile');
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
