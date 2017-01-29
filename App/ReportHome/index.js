import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Analytics from 'react-native-analytics';
import moment from 'moment';

import Circle from './Circle';
import KidTile from './KidTile';
import {
  WHITE,
} from '../Constants/Colours';
import { firstName } from '../Utils';
import Button from '../Components/Button';
import HeaderText from '../Components/HeaderText';
import Background from '../Components/Background';
import { selectKid as selectKidAction } from '../Actions/Actions';

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
  outerContainer: {
    width,
  },
  bottomContainer: {
    alignItems: 'center',
    width,
    flex: 1,
  },
  container: {
    minHeight: height,
    alignItems: 'center',
  },
  buttonContainer: {
    height: width / 2,
    justifyContent: 'center',
  },
});


export const buildProps = (kid, reports) => {
  let report;
  let loading;

  const kidReport = reports[kid.UUID];

  if (!kidReport) {
    loading = true;
    report = {};
  } else {
    // Real values.
    loading = false;
    report = reports[kid.UUID];
  }

  return {
    loading,
    report,
    kid,
  };
};

const getCircle = (kid, reports) => {
  const today = moment().format('YYYY-MM-DD');
  return reports[kid.UUID]
    && reports[kid.UUID][today]
    && reports[kid.UUID][today].circles[1];
};

const ReportHome = ({ kids, reports, loading, selectKid }) => (
  <ScrollView contentContainerStyle={style.container} style={style.outerContainer}>
    {kids.map(kid => <KidTile key={kid.UUID} kid={kid} onPress={() => selectKid(kid)}>
      <HeaderText>{firstName(kid.name)}</HeaderText>
      {getCircle(kid, reports) && <Circle {...getCircle(kid, reports)} />}
      {!getCircle(kid, reports) && loading && <ActivityIndicator size="large" color={WHITE} />}
    </KidTile>)}

    <Background style={style.bottomContainer}>
      <View style={style.buttonContainer}>
        <Button primary={false} onPress={() => Actions.walkthrough()}>Add another child</Button>
      </View>
    </Background>
  </ScrollView>
);

ReportHome.propTypes = {
  reports: PropTypes.object.isRequired,
  kids: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  selectKid: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  loading: state.loading,
  reports: state.reports,
  kids: state.profile.kids,
});

export const mapDispatchToProps = dispatch => ({
  selectKid: (kid) => {
    dispatch(selectKidAction(kid));
    Analytics.track('Viewed Report', {
      UUID: kid.UUID,
    });
    Actions.weekView();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportHome);
