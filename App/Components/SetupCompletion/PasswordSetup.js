import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';

import Button from '../../Components/Button';
import HeaderText from '../../Components/HeaderText';
import TextInput from '../../Components/TextInput';
import Spacing from '../../Components/Spacing';
import LoadingIndicator from '../../Components/LoadingIndicator';
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

const PasswordSetup = (
  { name, email, loading, createUser, setEmail, setPassword },
) => (
  <View style={style.background}>
    <View style={style.container}>
      <HeaderText>Last step {name} !</HeaderText>

      <Spacing height={32} />

      <Text style={style.bodyText}>Your email</Text>
      <Spacing height={10} />
      <TextInput
        refFunc={ref => {
          this.textInput = ref;
        }}
        value={email}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      <Spacing height={32} />

      <Text style={style.bodyText}>Choose a password</Text>
      <Spacing height={10} />
      <TextInput
        refFunc={ref => {
          this.textInput = ref;
        }}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
    </View>
    <Spacing height={50} />

    {loading && <LoadingIndicator children="" />}

    <View style={style.buttonContainer}>
      <Button onPress={() => createUser()}>
        Go to Dashboard
      </Button>
    </View>
  </View>
);

PasswordSetup.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default PasswordSetup;
