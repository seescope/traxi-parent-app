import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';

import Button from '../../Components/Button';
import HeaderText from '../../Components/HeaderText';
import TextInput from '../../Components/TextInput';
import Spacing from '../../Components/Spacing';
import { WHITE, TRAXI_BLUE } from '../../Constants/Colours';

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
    paddingBottom: 30,
    alignSelf: 'center',
  },
};

const NameSetup = ({ nextStep, setName }) => (
  <View style={style.background}>
    <View style={style.container}>
      <HeaderText>Welcome !</HeaderText>

      <Spacing height={32} />

      <Text style={style.bodyText}>What is your name</Text>
      <Spacing height={10} />
      <TextInput
        refFunc={ref => {
          this.textInput = ref;
        }}
        onChangeText={text => setName(text)}
      />

      <Spacing />
    </View>
    <View style={style.buttonContainer}>
      <Button onPress={() => nextStep()}>
        Next Step
      </Button>
    </View>
  </View>
);

NameSetup.propTypes = {
  nextStep: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
};

export default NameSetup;
