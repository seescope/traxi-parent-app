// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import STYLES from '../Constants/Styles';
import Bar from '../Components/Bar';
import { GREY, LIGHT_GREY, VERY_LIGHT_GREY, GOOD } from '../Constants/Colours';
import addAdditionalChild from '../AsyncActions/AddAdditionalChild';

import type { ParentState } from '../Reducers/Parent';
import type { KidsState, Kid } from '../Reducers/Kids';
import type { RootState } from '../Reducers';

type StateProps = {
  parent: ParentState,
  kids: KidsState
};

type Props = StateProps & {
  onPress: () => void
};

type DispatchProps = {
  dispatch: (any) => any
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERY_LIGHT_GREY,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: VERY_LIGHT_GREY,
    paddingTop: 16,
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
  headerUnderlineStyle: {
    marginTop: -8,
    marginHorizontal: 9,
    height: 1 / PixelRatio.get(),
    width: 60,
    backgroundColor: LIGHT_GREY,
  },
  kidImage: {
    height: 40,
    width: 40,
    marginRight: 32,
    borderRadius: 20,
  },
  kidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  kidName: {
    fontFamily: 'Raleway-ExtraBold',
    fontSize: 15,
    color: GREY,
  },
  infoRowTitle: {
    fontFamily: 'Raleway-ExtraBold',
    fontSize: 15,
    color: GREY,
  },
  info: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    color: GREY,
  },
  infoRow: {
    marginBottom: 16,
  },
});

type InfoRowProps = {
  info: ?string,
  title: string
};

const InfoRow = ({ info, title }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoRowTitle}>{title}</Text>
    <Text style={styles.info}>{info}</Text>
  </View>
);

const KidRow = ({ name, avatarURL }: Kid) => (
  <View style={styles.kidRow}>
    <Image
      resizeMode="contain"
      style={styles.kidImage}
      source={{ uri: avatarURL }}
    />
    <Text style={styles.kidName}>{name}</Text>
  </View>
);

const Settings = ({ parent, kids, onPress }: Props) => (
  <View style={styles.container}>
    <Bar
      title="Settings"
      buttonIcon="chevron-left"
      onPress={() => Actions.pop()}
    />
    <ScrollView style={styles.innerContainer}>
      <View style={STYLES.CARD}>
        <View style={styles.headerContainer}>
          <Text style={styles.cardHeaderStyle}>
            Your Details
          </Text>
        </View>
        <View style={styles.headerUnderlineStyle} />
        <View style={styles.cardBody}>
          <InfoRow info={parent.name} title="Name:" />
          <InfoRow info={parent.email} title="Email:" />
        </View>
      </View>

      <View style={STYLES.CARD}>
        <View style={styles.headerContainer}>
          <Text style={styles.cardHeaderStyle}>
            Your Children
          </Text>
        </View>
        <View style={styles.headerUnderlineStyle} />
        <View style={styles.cardBody}>
          {Object.keys(kids).map(UUID => <KidRow key={UUID} {...kids[UUID]} />)}
          <TouchableOpacity style={styles.kidRow} onPress={() => onPress()}>
            <Icon
              color={GOOD}
              name="plus-circle"
              style={styles.kidImage}
              size={43}
            />
            <Text style={styles.kidName}>Add another child</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  </View>
);

const mapStateToProps = (
  { parentState, kidsState }: RootState
): StateProps => ({
  parent: parentState,
  kids: kidsState,
});

export const mergeProps = (
  { parent, kids }: StateProps,
  { dispatch }: DispatchProps
): Props => ({
  parent,
  kids,
  onPress: () => {
    if (parent.upgradedAt) {
      dispatch(addAdditionalChild());
      Actions.setName();
      return;
    }

    Actions.upgrade();
  },
});

// $FlowFixMe
export default connect(mapStateToProps, null, mergeProps)(Settings);
