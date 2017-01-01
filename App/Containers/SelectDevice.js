import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Background from '../Components/Background';
import HeaderText from '../Components/HeaderText';
import Spacing from '../Components/Spacing';
import BodyText from '../Components/BodyText';
import { TRAXI_BLUE } from '../Constants/Colours';
import { selectDevice } from '../Actions/Actions';

const style = {
  container: {
    backgroundColor: TRAXI_BLUE,
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  devicesContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  deviceContainer: {
    marginHorizontal: 8,
  },
};

const SelectDevice = ({ parentName, onPress }) => (
  <Background style={style.container}>
    <HeaderText>What kind of device, {parentName}?</HeaderText>

    <Spacing />

    <BodyText>
      Tap one of the devices below to choose what kind of device your child is using.
    </BodyText>

    <Spacing height={36} />

    <View style={style.devicesContainer}>
      <TouchableOpacity onPress={() => onPress('phone')} style={style.deviceContainer}>
        <Image source={require('../Images/phone.png')} />
        <HeaderText>Phone</HeaderText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('iPad')} style={style.deviceContainer}>
        <Image source={require('../Images/tablet.png')} />
        <HeaderText>Tablet</HeaderText>
      </TouchableOpacity>
    </View>
  </Background>
);

SelectDevice.propTypes = {
  parentName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  parentName: state.parentName,
});

const mapDispatchToProps = dispatch => ({
  onPress: deviceType => {
    if (deviceType === 'iPad') {
      dispatch(selectDevice('iPad'));
      Actions.createKid();
      return;
    }

    dispatch(selectDevice('unknown'));
    Actions.findKid();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDevice);
