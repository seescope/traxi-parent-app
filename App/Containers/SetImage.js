import * as Firebase from 'firebase';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View, Alert, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import { selectKidImage, NEXT_STEP } from '../Actions/Actions';
import setupKid from '../Actions/SetupKid';
import watchDevice from '../Actions/WatchDevice';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import STYLES from '../Constants/Styles';
import { WHITE, TRANSPARENT, VERY_LIGHT_GREY, GREY } from '../Constants/Colours';
import { isIOS, logError, firstName } from '../Utils';

const { width } = Dimensions.get('window');

const getSource = response => {
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

export const getUpdatedSelectedKid = (selectedKid, URI) => ({
  ...selectedKid,
  avatarURL: URI,
});

export const getUpdatedKids = (kids, kidUUID, URI) =>
  kids.map(kid => {
    if (kid.UUID !== kidUUID) return kid;
    const item = kid;
    item.avatarURL = URI;
    return item;
  });

export const updateFirebaseKid = (UUID, selectedKid, kids) => {
  Promise.all([
    Firebase.database().ref(`kids/${selectedKid.UUID}`).update(selectedKid),
    Firebase.database().ref(`parents/${UUID}/kids`).update(kids),
  ])
    .then(() => {
      Firebase.database().goOffline();
    })
    .catch(error => {
      logError('Error updating kids image', error);
    });
};

export const selectImage = (pickImage, deeplink, selectedKid, kids, UUID) =>
  dispatch => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
      },
    };

    if (!pickImage && !deeplink) {
      dispatch(selectKidImage('http://i.imgur.com/ZrwsRFD.png'));
      dispatch(NEXT_STEP);

      return dispatch(setupKid()).then(() => {
        dispatch(watchDevice());
      });
    } else if (!pickImage && deeplink) {
      Actions.passwordSetup({ type: 'replace' });
      return null;
    }

    return ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        if (response.error === 'Photo library permissions not granted') {
          Alert.alert(
            'Unable to access your photos',
            'Please allow traxi to access your photos to continue.',
          );
        }

        logError(response.error);
        return;
      }

      const source = getSource(response);
      dispatch(selectKidImage(source.uri));

      if (!deeplink) {
        dispatch(NEXT_STEP);

        dispatch(setupKid()).then(() => {
          dispatch(watchDevice());
        });
      } else if (deeplink) {
        const updatedSelectedKid = getUpdatedSelectedKid(
          selectedKid,
          source.uri,
        );
        const updatedKids = getUpdatedKids(kids, selectedKid.UUID, source.uri);
        updateFirebaseKid(UUID, updatedSelectedKid, updatedKids);
        Actions.setupCompletion();
      }
    });
  };

const STYLE = {
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VERY_LIGHT_GREY,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: GREY,
  },
  buttonContainer: {
    flexDirection: isIOS ? 'column' : 'row',
    alignItems: 'center',
  },
  headerText: {
    color: GREY,
  },
  imageStyle: {
    width: 160,
    height: 180,
  },
};

const SetImage = (
  { kidName, onPress, deeplink, selectedKid, kids, UUID },
) => (
  <View style={STYLE.outerContainer}>
    <View style={STYLE.container}>
      <HeaderText style={STYLE.headerText}>Choose a picture for {kidName}</HeaderText>

      <Spacing height={32} />

      <View style={[STYLES.CARD, STYLE.container]} elevation={6}>
        <Image
          source={require('../Images/placeholder_avatar.png')}
          style={STYLE.avatarStyle}
        />

        <Spacing height={32} />

        <Text style={STYLE.bodyText}>
          Traxi shows a picture of {kidName} with their usage.
        </Text>

        <Spacing height={32} />

        <Text style={STYLE.bodyText}>
          Don't worry though, only you can see it.
        </Text>
      </View>

    </View>
    <View style={STYLE.buttonContainer}>
      <Button primary onPress={() => onPress(true, deeplink, selectedKid, kids, UUID)}>
        {I18n.t('setImage.chooseAPicture')}
      </Button>
      <Button
        primary={false}
        onPress={() => onPress(false, deeplink, selectedKid, kids, UUID)}
      >
        {I18n.t('setImage.notNow')}
      </Button>
    </View>
  </View>
);

SetImage.propTypes = {
  kidName: PropTypes.string.isRequired,
  parentName: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  deeplink: PropTypes.bool.isRequired,
  selectedKid: PropTypes.object.isRequired,
  kids: PropTypes.array.isRequired,
  UUID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  kidName: firstName(state.selectedKid.name),
  parentName: state.parentName,
  deeplink: state.deeplink,
  selectedKid: state.selectedKid,
  kids: state.kids,
  UUID: state.profile.UUID,
});

const mapDispatchToProps = {
  onPress: selectImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetImage);
