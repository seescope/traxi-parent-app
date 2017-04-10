import * as Firebase from 'firebase';
import React, { PropTypes } from 'react';
import { Text, View, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Button from '../../Components/Button';
import HeaderText from '../../Components/HeaderText';
import TextInput from '../../Components/TextInput';
import Spacing from '../../Components/Spacing';
import LoadingIndicator from '../../Components/LoadingIndicator';
import { WHITE, TRAXI_BLUE } from '../../Constants/Colours';

const style = {
  background: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: TRAXI_BLUE,
  },
  container: {
    flex: 6,
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  bodyText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: WHITE,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
};

export const alertIfPasswordIsTooShort = password => {
  if (password.length < 6) {
    Alert.alert('Password should be at least 6 characters');
    return true;
  }
  return false;
};

export const updateFirebaseProfile = name => {
  Firebase.auth().currentUser.updateProfile({
    displayName: name,
  });
};

export const saveProfileToAsyncStorage = UUID => {
  AsyncStorage.setItem(
    'profile',
    JSON.stringify({
      UUID,
    }),
  );
};

export const goToDashboard = () => {
  Actions.dashboard({ type: 'replace' });
};

export const createFirebaseUser = (email, password) => {
  Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      updateFirebaseProfile();
      saveProfileToAsyncStorage();
      goToDashboard();
    })
    .catch(error => {
      Alert.alert(error.message); // Useful to show password problems
    });
};

export class PasswordSetup extends React.Component {
  constructor(props) {
    super(props);

    const { email } = props;

    this.state = {
      email,
      password: '',
      isLoading: false,
    };
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

  startLoadingIndicator() {
    this.setState({ isLoading: true });
  }

  stopLoadingIndicator() {
    this.setState({ isLoading: false });
  }

  createUser = () => {
    this.startLoadingIndicator();
    const alerted = alertIfPasswordIsTooShort(this.state.password);
    if (alerted) {
      this.stopLoadingIndicator();
      return;
    }

    createFirebaseUser(this.state.email, this.state.password, this.props.name);
  };

  render() {
    return (
      <View style={style.background}>
        <View style={style.container}>
          <HeaderText>Last step, {this.props.name} !</HeaderText>
          <Spacing height={32} />
          <Text style={style.bodyText}>Your email address:</Text>
          <Spacing height={10} />
          <TextInput
            refFunc={ref => {
              this.textInput = ref;
            }}
            value={this.state.email}
            keyboardType="email-address"
            onChangeText={text => this.setEmail(text)}
          />
          <Spacing height={32} />
          <Text style={style.bodyText}>Choose a password:</Text>
          <Spacing height={10} />
          <TextInput
            refFunc={ref => {
              this.textInput = ref;
            }}
            onChangeText={text => this.setPassword(text)}
            secureTextEntry
          />
          <Spacing height={40} />
          {this.state.isLoading && <LoadingIndicator children="" />}
        </View>
        <Spacing height={50} />
        <View style={style.buttonContainer}>
          <Button onPress={() => this.createUser()}>
            Finished
          </Button>
        </View>
      </View>
    );
  }
}

PasswordSetup.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  setEmailFn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  name: state.profile.name,
  email: state.profile.email,
});

export default connect(mapStateToProps)(PasswordSetup);
