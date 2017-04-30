import React, {PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import Spacing from '../Components/Spacing';
import Background from '../Components/Background';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import BodyText from '../Components/BodyText';
import {firstName} from '../Utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
});

const CongratulationsComponent = ({kidName}) => (
  <Background>

    <View style={styles.container}>
      <HeaderText>
        {kidName} is being monitored!
      </HeaderText>

      <Spacing height={32} />

      <BodyText>
        Congratulations,
        {' '}
        {kidName}
        {' '}
        is being monitored by Traxi. You will soon be able to see what they are doing on their device.
        {'\n\n'}
        While we collect data from
        {' '}
        {kidName}
        's device, there's just two more things we need to do.
      </BodyText>

      <Spacing height={32} />

      <Button primary onPress={() => Actions.setKidImage({type: 'replace'})}>
        Next step
      </Button>

    </View>
  </Background>
);

CongratulationsComponent.propTypes = {
  kidName: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const {kidUUID} = state.setupState;
  const {name} = state.kidsState[kidUUID] || {};

  return {
    kidUUID,
    kidName: name ? firstName(name) : '',
  };
};

const Congratulations = connect(mapStateToProps)(CongratulationsComponent);
export default Congratulations;
