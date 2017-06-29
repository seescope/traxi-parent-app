// @flow
/* eslint react/no-multi-comp: 0 */
import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import { View, ScrollView, RefreshControl } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

import Spacing from '../Components/Spacing';
import { VERY_LIGHT_GREY } from '../Constants/Colours';
import KidCircle from './Components/KidCircle';
import Card from './Components/Card';
import TopAppComponent from './Components/TopApp';
import TopCategoryComponent from './Components/TopCategory';
import PeakTimeComponent from './Components/PeakTime';
import RecentAppComponent from './Components/RecentApp';
import Bar from '../Components/Bar';
import { firstName } from '../Utils';

import fetchReportsAction from '../AsyncActions/FetchReports';

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
  reportsState: ReportsState
};

type DashboardProps = {
  reports: ReportsState,
  kids: KidsState,
  loading: boolean,
  fetchReports: () => Promise<any>
};

type DashboardScreenProps = {
  loading: boolean,
  kid: Kid,
  topApps: ?CardWithDate<TopApp>,
  topCategories: ?CardWithDate<TopCategory>,
  peakTimes: ?CardWithDate<PeakTime>,
  recentApps: ?Array<RecentApp>,
  fetchReports: () => Promise<any>
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

const getTodayUsage = (peakTimes: ?CardWithDate<PeakTime>) =>
  peakTimes && peakTimes.week
    ? (lodash.find(peakTimes.week, { name: 'Today' }) || { usage: 0 }).usage
    : 0;

class DashboardScreen extends React.Component {
  state = {
    refreshing: false,
  };
  props: DashboardScreenProps;

  refreshData() {
    this.setState({ refreshing: true });
    this.props.fetchReports().then(() => this.setState({ refreshing: false }));
  }

  render() {
    const { refreshing } = this.state;
    const {
      loading,
      kid,
      topApps,
      topCategories,
      peakTimes,
      recentApps,
    } = this.props;
    return (
      <ScrollView
        style={outerContainerStyle}
        contentContainerStyle={containerStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => this.refreshData()}
          />
        }
      >
        <Animatable.View delay={500} useNativeDriver animation="bounceIn">
          <KidCircle
            loading={loading}
            kid={kid}
            usage={getTodayUsage(peakTimes)}
          />
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
  }
}

const mapStateToProps = ({ reportsState, kidsState }: RootState) => ({
  kids: kidsState,
  reports: reportsState,
  loading: reportsState.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchReports: () => dispatch(fetchReportsAction()),
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const { kids } = props;
    const { name } = kids[Object.keys(props.kids)[0]];

    this.state = {
      title: firstName(name),
    };
  }

  state: {
    title: string
  };

  onIndexChanged(index: number) {
    const { kids } = this.props;
    const kidUUID = Object.keys(kids)[index];
    const { name } = kids[kidUUID];
    this.setState({
      title: firstName(name),
    });
  }

  props: DashboardProps;

  render() {
    const { reports, kids, loading, fetchReports } = this.props;

    return (
      <View>
        <Bar
          title={this.state.title}
          buttonIcon="bars"
          onPress={() => Actions.settings()}
        />
        <Swiper
          showsPagination
          bounces
          showsButtons
          loop={false}
          onIndexChanged={index => this.onIndexChanged(index)}
        >
          {Object.keys(kids).map(UUID => (
            <DashboardScreen
              key={UUID}
              loading={loading}
              kid={kids[UUID]}
              fetchReports={fetchReports}
              {...reports[UUID]}
            />
          ))}
        </Swiper>
      </View>
    );
  }
}

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
