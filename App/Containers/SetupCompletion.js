import * as Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import React, { PropTypes } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import PasswordSetup from '../Components/SetupCompletion/PasswordSetup';
import NameSetup from '../Components/SetupCompletion/NameSetup';
import fetchReportsAction from '../Dashboard/Actions/FetchReport';

const config = {
  apiKey: 'AIzaSyDEq9qfwendZJ6yiyDgtjGCjWSS9PSYWLU',
  authDomain: 'traxiapp.firebaseapp.com',
  databaseURL: 'https://traxiapp.firebaseio.com',
  projectId: 'project-946779331638130823',
  storageBucket: 'project-946779331638130823.appspot.com',
  messagingSenderId: '204102393429',
};
const app = Firebase.initializeApp(config);

class SetupCompletion extends React.Component {
  constructor(props) {
    super(props);

    const { email, UUID } = props;

    this.state = {
      UUID,
      //step: 'passwordSetup',
      step: 'nameSetup',
      //name: '',
      name: 'Chris',
      email,
      //password: '',
      password: 'azertyuiop',
      loading: false,
    };

    this.fetchReports();
  }

  setPassword = password => {
    this.setState({
      password,
    });
  };

  setEmail = email => {
    this.setState({
      email,
    });
  };

  setName = name => {
    this.setState({
      name,
    });
  };

  fetchReports = async () => {
    const ref = Firebase.database().ref(`parents/${this.state.UUID}/`);

    try {
      const profile = await ref.once('value').then(snapshot => snapshot.val());
      Firebase.database().goOffline();

      const kids = profile.kids;

      const UUIDs = kids.map(k => k.UUID);
      const action = fetchReportsAction(UUIDs);
      this.store.dispatch(action);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  createFirebaseUser = async () => {
    this.setState({ loading: true });
    const { email, password, name } = this.state;

    if (password.length < 6) {
      this.setState({
        loading: false,
      });
      Alert.alert('Password should be at least 6 characters');
    } else {
      app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = Firebase.auth().currentUser;

          user
            .updateProfile({
              displayName: name,
            })
            .then(Actions.dashboard({ type: 'replace' }))
            .catch(error => {
              console.log(error); // eslint-disable-line
            });
        })
        .catch(error => {
          this.setState({
            loading: false,
          });
          Alert.alert(error.message);
        });
    }
  };

  nextStep = () => {
    const { name } = this.state;

    if (name) {
      this.setState({
        step: 'passwordSetup',
      });
    } else {
      Alert.alert('Please enter your name');
    }
  };

  render() {
    let current;
    if (this.state.step === 'nameSetup') {
      current = <NameSetup nextStep={this.nextStep} setName={this.setName} />;
    } else {
      current = (
        <PasswordSetup
          name={this.state.name}
          email={this.state.email}
          loading={this.state.loading}
          createUser={this.createFirebaseUser}
          setPassword={this.setPassword}
          setEmail={this.setEmail}
        />
      );
    }

    return current;
  }
}

SetupCompletion.propTypes = {
  email: PropTypes.string.isRequired,
  UUID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  UUID: state.newUserFromDeeplink.UUID,
  email: state.newUserFromDeeplink.email,
});

export default connect(mapStateToProps)(SetupCompletion);
