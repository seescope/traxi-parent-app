import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import KidTile from './KidTile';
import DaySummaries from './DaySummaries';
import HeaderText from '../Components/HeaderText';
import BodyText from '../Components/BodyText';
import Spacing from '../Components/Spacing';
import Background from '../Components/Background';

const { height, width } = Dimensions.get('window');

const style = StyleSheet.create({
  innerContainer: {
    minHeight: height - (width / 2),
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

const WeekView = ({ kid, reports }) => (
  <ScrollView style={style.container}>
    <KidTile kid={kid} onPress={() => Actions.pop()}>
      <Image source={require('../Images/chevron_left.png')} />
      <HeaderText>This Week</HeaderText>
    </KidTile>
    <Background style={style.innerContainer}>
      {reports && <DaySummaries reports={reports} />
        || <View style={style.container}>
          <Spacing height={64} />
          <HeaderText>No activity just yet.</HeaderText>
          <Spacing height={32} />
          <BodyText align="center">Check back soon!</BodyText>
        </View>}
    </Background>
  </ScrollView>
);

WeekView.propTypes = {
  kid: PropTypes.object.isRequired,
  reports: PropTypes.object,
};

const mapStateToProps = state => ({
  kid: state.selectedKid,
  reports: state.reports[state.selectedKid.UUID],
});

export default connect(mapStateToProps)(WeekView);
