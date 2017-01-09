import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

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
    justifyContent: 'center',
  },
  devicesContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  deviceContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  deviceImage: {
    justifyContent: 'flex-end',
    marginHorizontal: 16,
  },
};

const SelectDevice = ({ onPress }) => (
  <Background style={style.container}>
    <View style={style.devicesContainer}>
      <TouchableOpacity onPress={() => onPress('phone')} style={style.deviceContainer}>
        <Animatable.Image
          animation={'bounceInLeft'}
          style={style.deviceImage}
          source={require('../Images/phone.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('iPad')} style={style.deviceContainer}>
        <Animatable.Image
          animation={'bounceInRight'}
          style={style.deviceImage}
          source={require('../Images/tablet.png')}
        />
      </TouchableOpacity>
    </View>

    <Spacing height={32} />

    <HeaderText>What kind of device?</HeaderText>

    <Spacing height={8} />

    <BodyText>
      Tap one of the devices above to start monitoring.
    </BodyText>
  </Background>
);

SelectDevice.propTypes = {
  onPress: PropTypes.func.isRequired,
};

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

export default connect(null, mapDispatchToProps)(SelectDevice);
