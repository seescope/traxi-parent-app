import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import { enterKidName } from '../Actions/Actions';
import Button from '../Components/Button';
import Background from '../Components/Background';
import TextInput from '../Components/TextInput';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import { GREY } from '../Constants/Colours';
import STYLES from '../Constants/Styles';

const style = {
  container: {
    marginTop: 32,
    paddingTop: 18,
    alignItems: 'center',
  },
  labelText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: GREY,
  },
  buttonContainer: {
    alignItems: 'center',
  },
};

export const setKidName = kidName =>
  dispatch => dispatch(enterKidName(kidName));

export const nextStep = kidName => {
  if (kidName) {
    Actions.deviceSetup({ type: 'replace' });
  } else {
    Alert.alert("Please enter your kid's name");
  }
};

class SetName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kidName: '',
    };
  }

  onChangeText(kidName) {
    this.setState({ kidName });
    this.props.setKidNameFn(kidName);
  }

  render() {
    return (
      <Background>
        <View style={style.container}>
          <HeaderText>{I18n.t('setName.header')}</HeaderText>

          <Spacing height={16} />

          <View style={[STYLES.CARD, style.container]} elevation={6}>
            <View style={style.innerContainer}>
              <Text style={style.labelText}>
                {I18n.t('setName.kidsName')}
              </Text>

              <TextInput
                refFunc={ref => {
                  this.textInput = ref;
                }}
                onChangeText={text => this.onChangeText(text)}
                onSubmitEditing={() => nextStep(this.state.kidName)}
              />
            </View>
          </View>

          <View style={style.buttonContainer}>
            <Button primary onPress={() => nextStep(this.state.kidName)}>
              {I18n.t('general.nextStep')}
            </Button>
          </View>
        </View>
      </Background>
    );
  }
}

SetName.propTypes = {
  setKidNameFn: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setKidNameFn: setKidName,
  onPress: nextStep,
};

export default connect(null, mapDispatchToProps)(SetName);
