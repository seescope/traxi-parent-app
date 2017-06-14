import React from 'react';
import _ from 'lodash';
import shortid from 'shortid';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
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

const getHeaderLabel = (count, usageIsNotComplete) => {
  if (!usageIsNotComplete) return 'Completed';
  else if (count === 1) return `${count} app found`;
  else if (count > 1) return `${count} apps found`;
  return 'Searching for apps...';
};

const renderAppRows = apps => {
  if (!apps.length) {
    return <AppRow name={'Application name'} progress={0} logo={''} />;
  }
  return apps.map(app => (
    <AppRow
      key={shortid.generate()}
      name={app.name}
      progress={app.progress}
      logo={app.logo}
    />
  ));
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
  constructor(props) {
    super(props);

    this.state = {
      usageIsComplete: true,
    };
  }
  componentDidMount() {
    this.updateUsage();
  }

  props: {
    kidName: string,
    apps: App[],
    getApps: () => void,
  };

  updateUsage() {
    sleep(2000).then(() => {
      const usageIsComplete = checkIfUsageIsComplete(this.props.apps);
      if (!usageIsComplete) {
        this.props.getApps();
        this.updateUsage();
      } else {
        sleep(1500).then(() => {
          Actions.setupCompletion();
          this.setState({ usageIsNotComplete: false });
        });
      }
    });
  }

  render() {
    return (
      <Background>
        <View style={styles.container}>
          <ScrollView>
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
                  {getHeaderLabel(
                    this.props.apps.length,
                    this.state.usageIsNotComplete,
                  )}
                </Text>
                {this.state.usageIsNotComplete && <LoadingIndicator />}
              </View>
              <View style={styles.headerUnderlineStyle} />
              <View style={styles.cardBody}>
                {renderAppRows(this.props.apps)}
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
  const { apps } = state.setupState;

  // const apps = [
  //   {
  //     Name: 'SoundCloud - Music & Audio',
  //     Logo: 'http://is1.mzstatic.com/image/thumb/Purple117/v4/40/6d/d1/406dd182-5713-9565-368e-67e2c769dfd2/source/512x512bb.jpg',
  //     Category: 'Music',
  //     TimeUsed: 72.672,
  //   },
  //   {
  //     Name: 'Bitmoji - Your Personal Emoji',
  //     Logo: 'http://is3.mzstatic.com/image/thumb/Purple122/v4/f3/e5/dd/f3e5dd33-840b-0d55-f10c-ba1852d4f9cf/source/512x512bb.jpg',
  //     Category: 'Utilities',
  //     TimeUsed: 4.347,
  //   },
  //   {
  //     Name: 'Instagram',
  //     Logo: 'http://is4.mzstatic.com/image/thumb/Purple127/v4/66/ea/f4/66eaf42f-79aa-d6c1-0b8e-accab7d4f7f5/source/512x512bb.jpg',
  //     Category: 'Photo & Video',
  //     TimeUsed: 18.832,
  //   },
  //   {
  //     Name: 'Citymapper - the Ultimate Transit App',
  //     Logo: 'http://is4.mzstatic.com/image/thumb/Purple117/v4/d9/f0/f2/d9f0f280-d379-e8a1-1f39-f1f28477cf77/source/512x512bb.jpg',
  //     Category: 'Navigation',
  //     TimeUsed: 3.291,
  //   },
  //   {
  //     Name: 'SoundCloud - Music & Audio',
  //     Logo: 'http://is1.mzstatic.com/image/thumb/Purple117/v4/40/6d/d1/406dd182-5713-9565-368e-67e2c769dfd2/source/512x512bb.jpg',
  //     Category: 'Music',
  //     TimeUsed: 71.362,
  //   },
  //   {
  //     Name: 'SwiftKey Keyboard',
  //     Logo: 'http://is3.mzstatic.com/image/thumb/Purple127/v4/b4/2c/9c/b42c9cc9-45c3-a6f7-7813-97ed1e42f983/source/512x512bb.jpg',
  //     Category: 'Utilities',
  //     TimeUsed: 58.952,
  //   },
  //   {
  //     Name: 'Safari',
  //     Logo: 'http://i.imgur.com/sE9S6oZ.png',
  //     Category: 'Tools',
  //     TimeUsed: 11.108,
  //   },
  //   {
  //     Name: 'Instagram',
  //     Logo: 'http://is4.mzstatic.com/image/thumb/Purple127/v4/66/ea/f4/66eaf42f-79aa-d6c1-0b8e-accab7d4f7f5/source/512x512bb.jpg',
  //     Category: 'Photo & Video',
  //     TimeUsed: 171.345,
  //   },
  //   {
  //     Name: 'FRAMED',
  //     Logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/6e/15/40/6e154016-5dbd-c837-30df-f0b326bb4e57/source/512x512bb.jpg',
  //     Category: 'Games',
  //     TimeUsed: 0,
  //   },
  //   {
  //     Name: 'FRAMED',
  //     Logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/6e/15/40/6e154016-5dbd-c837-30df-f0b326bb4e57/source/512x512bb.jpg',
  //     Category: 'Games',
  //     TimeUsed: 34.192,
  //   },
  //   {
  //     Name: 'Instagram',
  //     Logo: 'http://is4.mzstatic.com/image/thumb/Purple127/v4/66/ea/f4/66eaf42f-79aa-d6c1-0b8e-accab7d4f7f5/source/512x512bb.jpg',
  //     Category: 'Photo & Video',
  //     TimeUsed: 0.026,
  //   },
  // ];

  let appsInformation;

  if (!apps.length)
    appsInformation = [];
  else {
    const filterShortTimeUsedApps = apps.filter(app => app.TimeUsed > 5);
    const groupedApps = _.reduce(
      filterShortTimeUsedApps,
      (previous, app) => {
        const index = _.findIndex(previous, ['Name', app.Name]);
        if (index !== -1) {
          const previousToModify = [...previous];
          previousToModify[index].TimeUsed = previousToModify[index].TimeUsed +
            app.TimeUsed;
          return previousToModify;
        }
        return [...previous, app];
      },
      [],
    );
    const sortedApps = _.orderBy(groupedApps, ['TimeUsed'], ['desc']);
    appsInformation = getAppsInformations(sortedApps);
  }

  const { kidUUID } = state.setupState;
  const { name } = state.kidsState[kidUUID] || {};

  return {
    apps: appsInformation,
    kidName: name ? firstName(name) : '',
  };
};

const mapDispatchToProps = dispatch => ({
  getApps: () => dispatch(getInitialUsage()),
});

const InitialUsage = connect(mapStateToProps, mapDispatchToProps)(
  InitialUsageComponent,
);

export default InitialUsage;
