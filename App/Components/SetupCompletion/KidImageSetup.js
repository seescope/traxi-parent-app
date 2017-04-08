import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import I18n from 'react-native-i18n';

import Button from '../../Components/Button';
import HeaderText from '../../Components/HeaderText';
import Spacing from '../../Components/Spacing';
import KidAvatar from '../../Components/KidAvatar';
import { WHITE, TRAXI_BLUE } from '../../Constants/Colours';
import { firstName } from '../../Utils';

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
    alignItems: 'center',
  },
  bodyText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: WHITE,
  },
  oneButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  twoButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
};

const imageSetView = (parentName, kidImage, nextStep) => (
  <View style={style.background}>
    <View style={style.container}>
      <HeaderText>
        Looking good {parentName}!
      </HeaderText>

      <Spacing height={32} />

      <KidAvatar size={204} avatarURL={kidImage.uri} />
    </View>
    <View style={style.oneButtonContainer}>
      <Button style={style.button} onPress={() => nextStep()}>
        Next Step
      </Button>
    </View>
  </View>
);

const imageNotSetView = (
  parentName,
  kidName,
  kidImage,
  pickImage,
  nextStep,
) => (
  <View style={style.background}>
    <View style={style.container}>
      <HeaderText>
        {I18n.t('general.thanks')}, {parentName}!
      </HeaderText>

      <Spacing height={32} />

      <KidAvatar size={204} avatarURL={kidImage.uri} />

      <Text style={style.bodyText}>
        {I18n.t('setImage.setAPictureFor')} {kidName}.
      </Text>
      <Spacing height={32} />

      <Text style={style.bodyText}>
        {I18n.t('setImage.dontWorry')}.
      </Text>
    </View>
    <View style={style.twoButtonContainer}>
      <Button style={style.button} primary={false} onPress={() => nextStep()}>
        {I18n.t('setImage.notNow')}
      </Button>
      <Button style={style.button} onPress={() => pickImage()}>
        {I18n.t('setImage.chooseAPicture')}
      </Button>
    </View>
  </View>
);

export const KidImageSetup = (
  { parentName, kidName, kidImage, pickImage, nextStep },
) => {
  if (kidImage.uri) return imageSetView(parentName, kidImage, nextStep);
  return imageNotSetView(parentName, kidName, kidImage, pickImage, nextStep);
};

KidImageSetup.propTypes = {
  kidName: PropTypes.string.isRequired,
  kidImage: PropTypes.object,
  parentName: PropTypes.string,
  pickImage: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  kidName: firstName(state.selectedKid.name),
  parentName: firstName(state.profile.name),
});

export default connect(mapStateToProps)(KidImageSetup);
