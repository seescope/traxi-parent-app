import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Text, View, Alert, Keyboard } from "react-native";
import { Actions } from "react-native-router-flux";
import I18n from "react-native-i18n";

import { setKidName } from "../Reducers/Kids/kidsActions";
import Button from "../Components/Button";
import Background from "../Components/Background";
import TextInput from "../Components/TextInput";
import HeaderText from "../Components/HeaderText";
import Spacing from "../Components/Spacing";
import { GREY } from "../Constants/Colours";
import STYLES from "../Constants/Styles";

const style = {
  container: {
    marginTop: 32,
    paddingTop: 18,
    alignItems: "center"
  },
  labelText: {
    fontFamily: "Raleway-Regular",
    fontSize: 14,
    color: GREY
  },
  buttonContainer: {
    alignItems: "center"
  }
};

export const nextStep = kidName => {
  Keyboard.dismiss();
  if (kidName) {
    Actions.deviceSetup();
  } else {
    Alert.alert("Please enter your kid's name");
  }
};

const SetName = ({ kidName, onNameChanged }) => (
  <Background>
    <View style={style.container}>
      <HeaderText>{I18n.t("setName.header")}</HeaderText>

      <Spacing height={16} />

      <View style={[STYLES.CARD, style.container]} elevation={6}>
        <View style={style.innerContainer}>
          <Text style={style.labelText}>
            {I18n.t("setName.kidsName")}
          </Text>

          <TextInput
            refFunc={ref => {
              this.textInput = ref;
            }}
            onChangeText={text => onNameChanged(text)}
            onSubmitEditing={() => nextStep(kidName)}
          />
        </View>
      </View>

      <View style={style.buttonContainer}>
        <Button primary onPress={() => nextStep(kidName)}>
          {I18n.t("general.nextStep")}
        </Button>
      </View>
    </View>
  </Background>
);

SetName.propTypes = {
  onNameChanged: PropTypes.func.isRequired,
  kidName: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { kidUUID } = state.setupState;
  const { name } = state.kidsState[kidUUID] || {};

  return {
    kidUUID,
    kidName: name || ""
  };
};

export const mergeProps = ({ kidName, kidUUID }, { dispatch }) => ({
  kidName,
  onNameChanged: name => dispatch(setKidName(name, kidUUID))
});

export default connect(mapStateToProps, null, mergeProps)(SetName);
