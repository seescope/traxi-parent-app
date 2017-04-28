// @flow
import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';

import Spacing from '../Components/Spacing';
import { VERY_LIGHT_GREY } from '../Constants/Colours';
import KidCircle from './Components/KidCircle';
import Card from './Components/Card';
import TopAppComponent from './Components/TopApp';
import TopCategoryComponent from './Components/TopCategory';
import PeakTimeComponent from './Components/PeakTime';
import RecentAppComponent from './Components/RecentApp';

import type { KidsState, Kid } from '../Reducers/Kids';
import type {
  ReportsState,
  TopApp,
  TopCategory,
  PeakTime,
  RecentApp,
  CardWithDate,
} from '../Reducers/Reports';

type RootState = {
  kidsState: KidsState,
  reportsState: ReportsState,
};

type DashboardProps = {
  reports: ReportsState,
  kids: KidsState,
  loading: boolean,
};

type DashboardScreenProps = {
  loading: boolean,
  kid: Kid,
  topApps: CardWithDate<TopApp>,
  topCategories: CardWithDate<TopCategory>,
  peakTimes: CardWithDate<PeakTime>,
  recentApps: Array<RecentApp>,
};

const containerStyle = {
  alignItems: 'center',
  paddingVertical: 36,
  paddingHorizontal: 8,
  backgroundColor: VERY_LIGHT_GREY,
};

const outerContainerStyle = {
  backgroundColor: VERY_LIGHT_GREY,
};

const getTodayUsage = (peakTimes: CardWithDate<PeakTime>) =>
  peakTimes && peakTimes.week
    ? (lodash.find(peakTimes.week, { name: 'Today' }) || { usage: 0 }).usage
    : 0;

const DashboardScreen = (
  {
    loading,
    kid,
    topApps,
    topCategories,
    peakTimes,
    recentApps,
  }: DashboardScreenProps,
) => (
  <ScrollView
    style={outerContainerStyle}
    contentContainerStyle={containerStyle}
  >
    <Animatable.View delay={500} useNativeDriver animation="bounceIn">
      <KidCircle loading={loading} kid={kid} usage={getTodayUsage(peakTimes)} />
    </Animatable.View>

    <Spacing height={32} />

    <Card
      loading={loading}
      header="Top Apps"
      Component={TopAppComponent}
      data={topApps}
    />

    <Card
      loading={loading}
      header="Top Categories"
      Component={TopCategoryComponent}
      data={topCategories}
    />

    <Card
      loading={loading}
      header="Peak Times"
      Component={PeakTimeComponent}
      data={peakTimes}
    />

    <Card
      loading={loading}
      header="Recent Apps"
      Component={RecentAppComponent}
      data={recentApps}
    />
  </ScrollView>
);

const mapStateToProps = (
  { reportsState, kidsState }: RootState,
): DashboardProps => ({
  kids: kidsState,
  reports: reportsState,
  loading: reportsState.loading,
});

const Dashboard = ({ reports, kids, loading }: DashboardProps) => (
  <Swiper>
    {Object.keys(kids).map(UUID => (
      <DashboardScreen
        key={UUID}
        loading={loading}
        kid={kids[UUID]}
        {...reports[UUID]}
      />
    ))}
  </Swiper>
);

export default connect(mapStateToProps)(Dashboard);
