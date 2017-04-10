import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import I18n from 'react-native-i18n';

import { selectKidImage, NEXT_STEP } from '../Actions/Actions';
import setupKid from '../Actions/SetupKid';
import watchDevice from '../Actions/WatchDevice';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import KidAvatar from '../Components/KidAvatar';
import { WHITE, TRANSPARENT } from '../Constants/Colours';
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

export const selectImage = pickImage =>
  dispatch => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
      },
    };

    if (!pickImage) {
      dispatch(selectKidImage('http://i.imgur.com/ZrwsRFD.png'));
      dispatch(NEXT_STEP);

      return dispatch(setupKid()).then(() => {
        dispatch(watchDevice());
      });
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
      dispatch(NEXT_STEP);

      dispatch(setupKid()).then(() => {
        dispatch(watchDevice());
      });
    });
  };

const style = {
  outerContainer: {},
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bodyText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: WHITE,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: TRANSPARENT,
  },
  buttonContainer: {
    width: width - 64,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
};

const SetImage = ({ parentName, kidName, onPress }) => (
  <View style={style.outerContainer}>
    <View style={style.container}>
      <HeaderText>{I18n.t('general.thanks')}, {parentName}!</HeaderText>

      <Spacing height={32} />

      <KidAvatar size={204} avatarURL="" />

      <Text style={style.bodyText}>
        {I18n.t('setImage.setAPictureFor')} {kidName}.
      </Text>

      <Spacing height={32} />

      <Text style={style.bodyText}>
        {I18n.t('setImage.dontWorry')}.
      </Text>

      <Spacing />

      <Spacing height={32} />
    </View>
    <View style={style.buttonContainer}>
      <Button primary={false} onPress={() => onPress(false)}>
        {I18n.t('setImage.notNow')}
      </Button>
      <Button onPress={() => onPress(true)}>
        {I18n.t('setImage.chooseAPicture')}
      </Button>
    </View>
  </View>
);

SetImage.propTypes = {
  kidName: PropTypes.string.isRequired,
  parentName: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  kidName: firstName(state.selectedKid.name),
  parentName: state.parentName,
});

const mapDispatchToProps = {
  onPress: selectImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetImage);
