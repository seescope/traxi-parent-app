// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, Image, Text, View, StyleSheet } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';

import { TRAXI_BLUE, GOOD, WHITE, GREY } from '../Constants/Colours';
import upgradeAccountAction from '../AsyncActions/UpgradeAccount';
import addAdditionalChild from '../AsyncActions/AddAdditionalChild';
import { isSmallScreen } from '../Utils';

import type { ParentAction } from '../Reducers/Parent';

type Props = {
  onPress: () => Promise<any>
};

type Dispatch = () => Promise<ParentAction>;

// $FlowFixMe
const LOGO = require('../Images/traxi_for_families.png');
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: TRAXI_BLUE,
    paddingVertical: isSmallScreen ? 32 : 64,
    paddingHorizontal: isSmallScreen ? 16 : 32,
  },
  logo: {
    marginVertical: isSmallScreen ? 16 : 32,
    height: height / 2,
  },
  button: {
    marginHorizontal: 16,
  },
  buttonsContainer: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  header: {
    fontFamily: 'Raleway-ExtraBold',
    fontSize: 35,
    color: WHITE,
    textAlign: 'center',
  },
  subHeader: {
    fontFamily: 'Raleway-Regular',
    fontSize: 19,
    color: WHITE,
    textAlign: 'center',
  },
});

type ButtonProps = {
  backgroundColour: string,
  textColour: string,
  onPress: () => {},
  text: string
};

const Button = (
  { backgroundColour, textColour, text, onPress }: ButtonProps
) => {
  const Component = MKButton.coloredButton()
    .withBackgroundColor(backgroundColour)
    .withTextStyle({
      fontFamily: 'Raleway-Bold',
      color: textColour,
    })
    .withText(text)
    .withOnPress(onPress)
    .build();

  return <View style={styles.button}><Component /></View>;
};

const Upgrade = ({ onPress }: Props) => (
  <View style={styles.container}>
    <Text style={styles.header}>Traxi for Families</Text>
    <Image resizeMode="contain" style={styles.logo} source={LOGO} />
    <Text style={styles.subHeader}>
      Monitor your family for just{'\n'} $1.99 per month.
    </Text>
    <View style={styles.buttonsContainer}>
      <Button
        backgroundColour={WHITE}
        textColour={GREY}
        onPress={() => Actions.pop()}
        text="Not yet"
      />
      <Button
        backgroundColour={GOOD}
        textColour={WHITE}
        onPress={onPress}
        text="Upgrade now"
      />
    </View>
  </View>
);

export const mapDispatchToProps = (dispatch: Dispatch): Props => ({
  onPress: async () => {
    await dispatch(upgradeAccountAction());
    await dispatch(addAdditionalChild());

    Actions.setName();
  },
});

export default connect(null, mapDispatchToProps, null)(Upgrade);
