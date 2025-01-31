// @flow
/* eslint flowtype/require-return-type: [2, "always", { "excludeArrowFunctions": "expressionsOnly"}] */
/* eslint no-duplicate-imports: 0 */

import React from 'react';
import { PixelRatio, Text, StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Intercom from 'react-native-intercom';
import I18n from 'react-native-i18n';

import Spacing from '../Components/Spacing';
import Background from '../Components/Background';
import HeaderText from '../Components/HeaderText';
import BodyText from '../Components/BodyText';
import InstructionText from './InstructionText';
import { firstName } from '../Utils';
import AppRow from './AppRow';
import LoadingIndicator from '../Components/LoadingIndicator';
import { LIGHT_GREY, GREY } from '../Constants/Colours';
import STYLES from '../Constants/Styles';
import Button from '../Components/Button';

import type { RootState } from '../Reducers';
import type { Props as AppRowProps } from './AppRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
  },
  cardBody: {
    margin: 10,
  },
  cardHeaderStyle: {
    fontFamily: 'Raleway-ExtraBold',
    padding: 8,
    color: GREY,
    fontSize: 17,
    paddingBottom: 0,
  },
  headerContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  message: {
    fontWeight: 'bold',
  },
  headerUnderlineStyle: {
    marginTop: -8,
    marginHorizontal: 9,
    height: 1 / PixelRatio.get(),
    width: 60,
    backgroundColor: LIGHT_GREY,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});

const getHeaderLabel = (count: number): string => {
  if (count === 1) return 'Found 1 app';
  if (count > 1) return `Found ${count} apps`;
  return 'Searching for apps...';
};

type App = {
  name: string,
  logo: string,
  progress: number
};

type Props = {
  kidName: string,
  apps: App[]
};

const getAppRows = (apps: App[]): React.Element<AppRowProps>[] => {
  if (!apps.length) {
    return [
      <AppRow key={'dummy'} name={'Loading...'} progress={0} logo={null} />,
    ];
  }

  return apps.map(app => <AppRow key={app.name} {...app} />);
};

const getMessage = (apps: App[], kidName: string): string => {
  if (!apps.length) return `Use an app on ${kidName}'s device`;

  return `Keep using ${kidName}'s device until the bar turns green`;
};

const InitialUsageComponent = ({ kidName, apps }: Props) => (
  <Background>
    <View style={styles.container}>
      <ScrollView>
        <HeaderText>
          Let's see some apps!
        </HeaderText>

        <Spacing height={32} />

        {apps.length < 2 && <InstructionText kidName={kidName} />}

        <Animatable.View
          animation="bounceInUp"
          useNativeDriver
          duration={1000}
          style={STYLES.CARD}
        >
          <View style={styles.headerContainer}>
            <Text allowFontScaling={false} style={styles.cardHeaderStyle}>
              {getHeaderLabel(apps.length)}
            </Text>
            <LoadingIndicator />
          </View>
          <View style={styles.headerUnderlineStyle} />
          <View style={styles.cardBody}>
            {getAppRows(apps)}
          </View>
        </Animatable.View>
        <Animatable.View
          useNativeDriver
          delay={1000}
          duration={1000}
          key={getMessage(apps, kidName)}
          animation="bounceInUp"
        >
          <BodyText align="center">
            <Text allowFontScaling={false} style={styles.message}>
              {getMessage(apps, kidName)}
            </Text>

          </BodyText>
          <View style={styles.buttonContainer}>
            <Button onPress={() => Intercom.displayMessageComposer()}>
              {I18n.t('general.needHelp')}
            </Button>
          </View>
        </Animatable.View>
      </ScrollView>

    </View>
  </Background>
);

const mapStateToProps = (state: RootState): Props => {
  const { apps, kidUUID } = state.setupState;
  if (!kidUUID) throw new Error('No Kid UUID found!');

  const { name } = state.kidsState[kidUUID] || {};

  return {
    apps: apps || [],
    kidName: name ? firstName(name) : '',
  };
};

const InitialUsage = connect(mapStateToProps)(InitialUsageComponent);

export default InitialUsage;
