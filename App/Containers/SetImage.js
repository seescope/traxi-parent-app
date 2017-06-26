import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View } from 'react-native';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import selectImage from '../AsyncActions/SelectImage';
import persistKid from '../AsyncActions/PersistKid';
import fetchReports from '../AsyncActions/FetchReports';

import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import STYLES from '../Constants/Styles';
import { VERY_LIGHT_GREY, GREY } from '../Constants/Colours';
import { isIOS, firstName } from '../Utils';

const STYLE = {
  outerContainer: {
    paddingTop: 32,
    flex: 1,
    alignItems: 'center',
    backgroundColor: VERY_LIGHT_GREY,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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

const SetImage = ({ kidName, onPress, isInstalled }) => (
  <View style={STYLE.outerContainer}>
    <View style={STYLE.container}>
      <HeaderText style={STYLE.headerText}>
        Choose a picture for {kidName}
      </HeaderText>

      <Spacing height={32} />

      <View style={[STYLES.CARD, STYLE.innerContainer]} elevation={6}>
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
      <Button primary onPress={() => onPress(true, isInstalled)}>
        {I18n.t('setKidImage.chooseAPicture')}
      </Button>
      <Button onPress={() => onPress(false, isInstalled)}>
        {I18n.t('setKidImage.notNow')}
      </Button>
    </View>
  </View>
);

SetImage.propTypes = {
  kidName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isInstalled: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => {
  const { kidUUID } = state.setupState;
  const { name: kidName } = state.kidsState[kidUUID] || {};
  const { name, email, password } = state.parentState;

  return {
    kidName: firstName(kidName),
    isInstalled: !!(name && email && password),
  };
};

export const mapDispatchToProps = dispatch => ({
  onPress: (didSelectImage, isInstalled) =>
    dispatch(selectImage(didSelectImage))
      .then(() => dispatch(persistKid()))
      .then(() => {
        if (isInstalled) {
          dispatch(fetchReports());
          Actions.dashboard();
          return;
        }

        Actions.setupCompletion();
      }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetImage);
