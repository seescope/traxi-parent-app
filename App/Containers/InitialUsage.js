// @flow

import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import _ from 'lodash';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import getInitialUsage from '../AsyncActions/GetInitialUsage';
import Spacing from '../Components/Spacing';
import Background from '../Components/Background';
import HeaderText from '../Components/HeaderText';
import BodyText from '../Components/BodyText';
import { firstName } from '../Utils';
import AppRow from '../Components/InitialUsage/AppRow';
import LoadingIndicator from '../Components/LoadingIndicator';
import { LIGHT_GREY, GREY, WHITE, SHADOW_COLOR } from '../Constants/Colours';
import { fetchingApps } from '../Reducers/Setup/setupActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  cardContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 8,
    backgroundColor: WHITE,
    margin: 10,
    padding: 8,
    marginBottom: 28,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.16,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  cardBody: {
    margin: 10,
  },
  cardHeaderStyle: {
    padding: 8,
    color: GREY,
    fontSize: 19,
  },
  headerContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerUnderlineStyle: {
    marginHorizontal: 9,
    height: 1,
    width: 60,
    backgroundColor: LIGHT_GREY,
  },
});

console.disableYellowBox = true;

const getHeaderLabel = (count, usageIsNotComplete) => {
  if (!usageIsNotComplete) return 'Completed';
  else if (count === 1) return `${count} app found`;
  else if (count > 1) return `${count} apps found`;
  return 'Searching for apps...';
};

const checkIfUsageIsComplete = apps => {
  if (apps.length < 3) return false;
  return apps.every(app => app.progress === 100);
};

const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

type App = {
  name: string,
  logo: string,
  progress: number,
};

class InitialUsageComponent extends React.Component {
  state = {
    usageIsNotComplete: true,
    progressHistory: {},
  };

  componentDidMount() {
    console.log('MOUUUUUNT');
    this.props.reset();
    this.updateUsage();

    //TO remove
    // setTimeout(
    //   () => {
    //     this.props.upd();
    //     setTimeout(
    //       () => {
    //         !this.props.upd();
    //       },
    //       2000,
    //     );
    //   },
    //   100,
    // );
  }

  componentWillReceiveProps() {
    const apps = this.props.apps;

    if (apps != null) {
      const progressHistory = apps.reduce(
        (previous, app) => ({
          ...previous,
          [app.name]: app.progress,
        }),
        {},
      );

      this.setState({ progressHistory });
    }
  }

  getPreviousProgress(name) {
    const progressHistory = this.state.progressHistory[name];
    if (progressHistory) return progressHistory;
    return 0;
  }

  updateUsage() {
    if (this.props.isFetchingApps) {
      sleep(500).then(() => this.updateUsage());
      return;
    }

    const usageIsComplete = checkIfUsageIsComplete(this.props.apps);

    if (!usageIsComplete) {
      this.props.getApps();
      sleep(2000).then(() => this.updateUsage());
      return;
    }

    sleep(1500).then(() => {
      Actions.setupCompletion();
      this.setState({
        usageIsNotComplete: false,
      });
    });
  }

  props: {
    kidName: string,
    apps: App[],
    isFetchingApps: boolean,
    getApps: () => void,
  };

  renderAppRows = apps => {
    if (!apps.length) {
      return <AppRow name={'Application name'} progress={0} logo={''} />;
    }

    return apps.map(app => {
      const { name, progress, logo } = app;

      const previousProgress = this.getPreviousProgress(name);

      return (
        <AppRow
          key={shortid.generate()}
          name={name}
          previousProgress={previousProgress}
          progress={progress}
          logo={logo}
        />
      );
    });
  };

  render() {
    const { kidName, apps } = this.props;

    const { usageIsNotComplete } = this.state;

    return (
      <Background>
        <View style={styles.container}>
          <ScrollView>
            <HeaderText>
              Let's see some usage!
            </HeaderText>

            <Spacing height={32} />

            <BodyText>
              {kidName}
              , Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod
              {'\n\n'}
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              {'\n\n'}
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non
            </BodyText>

            <Spacing height={16} />

            <View style={styles.cardContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.cardHeaderStyle}>
                  {getHeaderLabel(apps.length, usageIsNotComplete)}
                </Text>
                {this.state.usageIsNotComplete && <LoadingIndicator />}
              </View>
              <View style={styles.headerUnderlineStyle} />
              <View style={styles.cardBody}>
                {this.renderAppRows(apps)}
              </View>
            </View>
          </ScrollView>
        </View>
      </Background>
    );
  }
}

const getProgressValue = timeUsed => {
  if (timeUsed >= 60) return 100;
  const percentage = timeUsed / 60 * 100;
  return Math.round(percentage);
};

const getAppsInformations = apps =>
  apps.map(app => ({
    name: app.Name,
    logo: app.Logo,
    progress: getProgressValue(app.TimeUsed),
  }));

const mapStateToProps = state => {
  const { apps, kidUUID, isFetchingApps } = state.setupState;
  const { name } = state.kidsState[kidUUID] || {};

  // console.log(JSON.stringify(apps));
  let appsInformation;
  if (!apps) {
    appsInformation = [];
  } else {
    const filterShortTimeUsedApps = apps.filter(app => app.TimeUsed > 5);
    const groupedApps = _.reduce(
      filterShortTimeUsedApps,
      (previous, app) => {
        const index = _.findIndex(previous, ['Name', app.Name]);
        if (index !== -1) {
          const previousToModify = [...previous];
          previousToModify[index].TimeUsed =
            previousToModify[index].TimeUsed + app.TimeUsed;
          return previousToModify;
        }
        return [...previous, app];
      },
      [],
    );
    appsInformation = getAppsInformations(groupedApps);
  }

  return {
    apps: appsInformation,
    kidName: name ? firstName(name) : '',
    isFetchingApps,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //TO REMOVE
    reset: () => dispatch(fetchingApps(false)),
    getApps: () => dispatch(getInitialUsage()),
  };
};

const InitialUsage = connect(mapStateToProps, mapDispatchToProps)(
  InitialUsageComponent,
);

export default InitialUsage;
