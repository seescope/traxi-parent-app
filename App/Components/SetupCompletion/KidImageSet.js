import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

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

export const nextStep = () => {
  Actions.passwordSetup({ type: 'replace' });
};

const KidImageSet = ({ parentName, selectedKid }) => (
  <View style={style.background}>
    <View style={style.container}>
      <HeaderText>
        Looking good {parentName}!
      </HeaderText>

      <Spacing height={32} />

      <KidAvatar size={204} avatarURL={selectedKid.avatarURL} />
    </View>
    <View style={style.oneButtonContainer}>
      <Button style={style.button} onPress={() => nextStep()}>
        Next Step
      </Button>
    </View>
  </View>
);

KidImageSet.propTypes = {
  parentName: PropTypes.string.isRequired,
  selectedKid: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  parentName: firstName(state.profile.name),
  selectedKid: state.selectedKid,
});

export default connect(mapStateToProps)(KidImageSet);
