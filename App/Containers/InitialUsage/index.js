// @flow

import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import md5 from 'md5';
import getInitialUsage from '../../AsyncActions/GetInitialUsage';
import Spacing from '../../Components/Spacing';
import Background from '../../Components/Background';
import HeaderText from '../../Components/HeaderText';
import BodyText from '../../Components/BodyText';
import { firstName } from '../../Utils';
import AppRow from './AppRow';
import LoadingIndicator from '../../Components/LoadingIndicator';
import { LIGHT_GREY, GREY, WHITE, SHADOW_COLOR } from '../../Constants/Colours';

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
  };

  componentDidMount() {
    this.updateUsage();
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
      return <AppRow name={'Application name'} progress={0} logo={null} />;
    }

    return apps.map(app => {
      const { name, progress, logo } = app;

      return (
        <AppRow key={md5(name)} name={name} progress={progress} logo={logo} />
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

const mapStateToProps = state => {
  const { apps, kidUUID, isFetchingApps } = state.setupState;
  const { name } = state.kidsState[kidUUID] || {};

  return {
    apps: apps.length ? apps : [],
    kidName: name ? firstName(name) : '',
    isFetchingApps,
  };
};

const mapDispatchToProps = dispatch => ({
  getApps: () => dispatch(getInitialUsage()),
});

const InitialUsage = connect(mapStateToProps, mapDispatchToProps)(
  InitialUsageComponent,
);

export default InitialUsage;
