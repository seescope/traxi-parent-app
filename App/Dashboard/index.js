import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import { ScrollView, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';

import Spacing from '../Components/Spacing';
import { VERY_LIGHT_GREY } from '../Constants/Colours';
import KidCircle from './Components/KidCircle';
import Card from './Components/Card';
import TopApp from './Components/TopApp';
import TopCategory from './Components/TopCategory';
import PeakTime from './Components/PeakTime';
import RecentApp from './Components/RecentApp';

const containerStyle = {
  alignItems: 'center',
  paddingVertical: 36,
  paddingHorizontal: 8,
  backgroundColor: VERY_LIGHT_GREY,
};

const outerContainerStyle = {
  backgroundColor: VERY_LIGHT_GREY,
};

const getTodayUsage = peakTimes => ((peakTimes && peakTimes.week)
    ? (lodash.find(peakTimes.week, { name: 'Today'}) || { usage: 0}).usage
    : 0);

const DashboardScreen = ({ loading, kid, topApps, topCategories, peakTimes, recentApps }) =>
  <ScrollView style={outerContainerStyle} contentContainerStyle={containerStyle}>
    <Animatable.View
      useNativeDriver
      animation="bounceIn"
    >
      <KidCircle loading={loading} kid={kid} usage={getTodayUsage(peakTimes)} />
    </Animatable.View>

    <Spacing height={32} />

    <Card loading={loading} header="Top Apps" Component={TopApp} data={topApps} />

    <Card loading={loading} header="Top Categories" Component={TopCategory} data={topCategories} />

    <Card loading={loading} header="Peak Times" Component={PeakTime} data={peakTimes} />

    <Card loading={loading} header="Recent Apps" Component={RecentApp} data={recentApps} />
  </ScrollView>

DashboardScreen.propTypes = {
  topApps: React.PropTypes.object,
  topCategories: React.PropTypes.object,
  peakTimes: React.PropTypes.object,
  kid: React.PropTypes.object,
  recentApps: React.PropTypes.array,
  loading: React.PropTypes.bool.isRequired,
};

const mapStateToProps = ({ reports, kids, loading }) => ({
  kids,
  reports,
  loading,
});

const Dashboard = ({ reports, kids, loading }) =>
  <Swiper>
    {kids.map(kid => <DashboardScreen key={kid.UUID} loading={loading} kid={kid} {...reports[kid.UUID]} />)}
  </Swiper>

Dashboard.propTypes = {
  reports: React.PropTypes.object.isRequired,
  kids: React.PropTypes.array.isRequired,
  loading: React.PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Dashboard);
