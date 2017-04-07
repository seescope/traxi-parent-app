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
    flex: 1,
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'center',
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
  },
};

const KidImageSetup = (
  { parentName, kidName, kidImage, pickImage, nextStep },
) => (
  <View style={style.background}>
    <View style={style.container}>
      {!kidImage.uri
        ? <HeaderText>
            {I18n.t('general.thanks')}, {parentName}!
          </HeaderText>
        : <HeaderText>
            Looking good {parentName}!
          </HeaderText>}

      <Spacing height={32} />

      <KidAvatar size={204} avatarURL={kidImage.uri} />

      {!kidImage.uri &&
        <View>
          <Text style={style.bodyText}>
            {I18n.t('setImage.setAPictureFor')} {kidName}.
          </Text>
          <Spacing height={32} />

          <Text style={style.bodyText}>
            {I18n.t('setImage.dontWorry')}.
          </Text>
        </View>}
    </View>
    {!kidImage.uri
      ? <View style={style.buttonContainer}>
          <Button
            style={style.button}
            primary={false}
            onPress={() => nextStep()}
          >
            {I18n.t('setImage.notNow')}
          </Button>
          <Button style={style.button} onPress={() => pickImage()}>
            {I18n.t('setImage.chooseAPicture')}
          </Button>
        </View>
      : <View style={style.buttonContainer}>
          <Button style={style.button} onPress={() => nextStep()}>
            Next Step
          </Button>
        </View>}

  </View>
);

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
