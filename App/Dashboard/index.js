import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import { ScrollView, } from 'react-native';

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
    ? (lodash.find(peakTimes.week, { name: 'Today'}) || {}).usage
    : 0);

const Dashboard = ({ topApps, topCategories, peakTimes, recentApps }) =>
  <ScrollView style={outerContainerStyle} contentContainerStyle={containerStyle}>
    <KidCircle usage={getTodayUsage(peakTimes)} />

    <Spacing height={32} />

    <Card header="Top Apps" Component={TopApp} data={topApps} />

    <Card header="Top Categories" Component={TopCategory} data={topCategories} />

    <Card header="Peak Times" Component={PeakTime} data={peakTimes} />

    <Card header="Recent Apps" Component={RecentApp} data={recentApps} />
  </ScrollView>

Dashboard.propTypes = {
  topApps: React.PropTypes.object.isRequired,
  topCategories: React.PropTypes.object.isRequired,
  peakTimes: React.PropTypes.object.isRequired,
  recentApps: React.PropTypes.array.isRequired,
};

const mapStateToProps = ({ reports, selectedKid }) => (reports || {})[selectedKid.UUID] || {};

export default connect(mapStateToProps)(Dashboard);
