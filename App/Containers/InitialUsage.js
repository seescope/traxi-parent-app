import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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

const getHeaderLabel = count => {
  if (count === 1) return `${count} app found`;
  else if (count > 1) return `${count} apps found`;
  return 'Searching for apps...';
};

const renderAppRows = apps => {
  if (!apps.length) {
    return <AppRow name={'Application name'} progress={0} logo={''} />;
  }
  return apps.map(app => (
    <AppRow name={app.name} progress={app.progress} logo={app.logo} />
  ));
};

type App = {
  name: string,
  logo: string,
  progress: number,
  getApps: () => {},
};

class InitialUsageComponent extends React.Component {
  componentWillMount() {
    // this.props.getApps();
  }

  props: {
    kidName: string,
    apps: App[],
  };

  render() {
    return (
      <Background>
        <View style={styles.container}>
          <HeaderText>
            Let's see some usage!
          </HeaderText>

          <Spacing height={32} />

          <BodyText>
            {this.props.kidName}
            , Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            {'\n\n'}
            Ut enim ad minim veniam, quis nostrud exercitation ullamco
            {'\n\n'}
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          </BodyText>

          <Spacing height={16} />

          <View style={styles.cardContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.cardHeaderStyle}>
                {getHeaderLabel(this.props.apps.length)}
              </Text>
              <LoadingIndicator />
            </View>
            <View style={styles.headerUnderlineStyle} />
            <View style={styles.cardBody}>
              {renderAppRows(this.props.apps)}
            </View>
          </View>
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
  // const { apps } = state.setupState;

  const apps = [
    {
      Name: 'Offroad 4x4 Car Driving Simulator: Mountain Truck',
      Logo: 'http://is4.mzstatic.com/image/thumb/Purple122/v4/b7/66/db/b766db85-ab29-a265-ef18-1f7a2529e2f0/source/512x512bb.jpg',
      Category: '',
      TimeUsed: 35,
    },
    {
      Name: 'Yahoo Mail - Keeps You Organized!',
      Logo: 'http://is2.mzstatic.com/image/thumb/Purple117/v4/30/4e/82/304e826e-78aa-5829-ed4a-cf6c40def3fd/source/512x512bb.jpg',
      Category: '',
      TimeUsed: 109,
    },
    {
      Name: 'ESPN: Get scores, news, alerts & watch live sports',
      Logo: 'http://is5.mzstatic.com/image/thumb/Purple117/v4/fc/6f/da/fc6fda8f-c3e2-b10e-4488-94c3801be205/source/512x512bb.jpg',
      Category: '',
      TimeUsed: 29,
    },
  ];

  let appsInformation;
  if (!apps.length) appsInformation = [];
  else appsInformation = getAppsInformations(apps);

  const { kidUUID } = state.setupState;
  const { name } = state.kidsState[kidUUID] || {};

  return {
    apps: appsInformation,
    kidName: name ? firstName(name) : 'Christopher',
  };
};

const mapDispatchToProps = dispatch => ({
  getApps: () => dispatch(getInitialUsage()),
});

const InitialUsage = connect(mapStateToProps, mapDispatchToProps)(
  InitialUsageComponent,
);
export default InitialUsage;
