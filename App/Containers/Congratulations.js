import React, { PropTypes } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import Spacing from "../Components/Spacing";
import Background from "../Components/Background";
import Button from "../Components/Button";
import HeaderText from "../Components/HeaderText";
import BodyText from "../Components/BodyText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40
  }
});

const CongratulationsComponent = ({ kidName, parentName, deviceType }) => (
  <Background>

    <View style={styles.container}>
      <HeaderText>
        {kidName} is being monitored!
      </HeaderText>

      <Spacing height={32} />

      <BodyText>
        Great work,{" "}
        {parentName}
        !{" "}
        {kidName}
        's{" "}
        {deviceType}
        {" "}is now being monitored by traxi.
        You will soon be able to see what they are doing on their {deviceType}.
        {"\n"}
        {"\n"}
        It will take a couple minutes for{" "}
        {kidName}
        's usage to be sent to traxi, so you might
        want to come back to the app a little later.
      </BodyText>

      <Spacing height={32} />

      <Button onPress={() => Actions.setImage({ type: "replace" })}>
        Next step
      </Button>

    </View>
  </Background>
);

CongratulationsComponent.propTypes = {
  parentName: PropTypes.string,
  kidName: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  deviceType: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const firstName = kid => kid.name.split(" ")[0];

const mapStateToProps = state => ({
  parentName: state.parentName,
  kidName: firstName(state.selectedKid),
  deviceType: state.selectedKid.deviceType
});

const Congratulations = connect(mapStateToProps)(CongratulationsComponent);
export default Congratulations;
