import * as Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import React, { PropTypes } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';

import { updateSelectedKid, updateKids } from '../Actions/Actions';
import PasswordSetup from '../Components/SetupCompletion/PasswordSetup';
import NameSetup from '../Components/SetupCompletion/NameSetup';
import KidImageSetup from '../Components/SetupCompletion/KidImageSetup';
import { isIOS, logError } from '../Utils';

const updateName = name =>
  dispatch => {
    dispatch({ type: 'UPDATE_PROFILE_NAME', name });
  };

const updateKidImage = (kidImage, selectedKid, kids) =>
  async dispatch => {
    let URI;
    if (!kidImage.uri) URI = 'http://i.imgur.com/52mRwuE.jpg';
    else URI = kidImage.uri;

    const updatedKid = { ...selectedKid, avatarURL: URI };
    const kidUUID = updatedKid.UUID;

    const updatedKids = kids.map(kid => {
      if (kid.UUID !== kidUUID) return kid;
      const item = kid;
      item.avatarURL = URI;
      return item;
    });

    dispatch(updateKids(updatedKids));
    dispatch(updateSelectedKid(updatedKid));

    try {
      await Firebase.database()
        .ref(`kids/${updatedKid.UUID}`)
        .update(updatedKid);
      await Firebase.database()
        .ref(`parents/${this.state.UUID}/kids`)
        .update(updatedKids);

      Firebase.database().goOffline();
    } catch (error) {
      logError('Error updating kids image');
    }
  };

class SetupCompletion extends React.Component {
  constructor(props) {
    super(props);

    const { email, selectedKid, kids, UUID } = props;

    this.state = {
      step: 'nameSetup',
      name: '',
      email,
      password: '',
      loading: false,
      kidImage: {},
      selectedKid,
      kids,
      UUID,
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

  setName = name => {
    this.props.updateNameFn(name);
    this.setState({
      name,
    });
  };

  getSource = response => {
    let source;

    if (response.data) {
      if (isIOS) {
        source = { uri: response.uri.replace('file://', ''), isStatic: true };
      } else {
        source = { uri: response.uri, isStatic: true };
      }
    }

    return source;
  };

  selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.error) {
        if (response.error === 'Photo library permissions not granted') {
          Alert.alert(
            'Unable to access your photos',
            'Please allow traxi to access your photos to continue.',
          );
        } else {
          logError(response.error);
        }
      } else {
        const source = this.getSource(response);
        this.setState({ kidImage: source });
      }
    });
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
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = Firebase.auth().currentUser;

          user
            .updateProfile({
              displayName: name,
            })
            .then(() => {
              AsyncStorage.setItem(
                'profile',
                JSON.stringify({
                  UUID: this.state.UUID,
                }),
              );
              Actions.dashboard({ type: 'replace' });
            })
            .catch(error => {
              logError('Error while creating a new user from deeplink', error);
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
    const { name, step } = this.state;

    if (step === 'nameSetup') {
      if (name) {
        this.setState({
          step: 'kidImageSetup',
        });
      } else {
        Alert.alert('Please enter your name');
      }
    } else if (step === 'kidImageSetup') {
      this.props.updateKidImageFn(
        this.state.kidImage,
        this.state.selectedKid,
        this.state.kids,
      );

      this.setState({
        step: 'passwordSetup',
      });
    }
  };

  render() {
    let current;
    if (this.state.step === 'nameSetup') {
      current = <NameSetup nextStep={this.nextStep} setName={this.setName} />;
    } else if (this.state.step === 'kidImageSetup') {
      current = (
        <KidImageSetup
          kidImage={this.state.kidImage}
          pickImage={this.selectImage}
          nextStep={this.nextStep}
        />
      );
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
  selectedKid: PropTypes.object.isRequired,
  kids: PropTypes.array.isRequired,
  UUID: PropTypes.string.isRequired,
  updateNameFn: PropTypes.func.isRequired,
  updateKidImageFn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  email: state.profile.email,
  selectedKid: state.selectedKid,
  kids: state.kids,
  UUID: state.profile.UUID,
});

const mapDispatchToProps = {
  updateKidImageFn: updateKidImage,
  updateNameFn: updateName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupCompletion);
