import React, { PropTypes } from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import KidAvatar from './KidAvatar';
import KidName from './KidName';
import KidNumber from './KidNumber';

const { width } = Dimensions.get('window');

const KidSuggestionStyles = StyleSheet.create({
  container: {
    width: width - 32,
    flex: 1,
    alignItems: 'flex-start',
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  details: {
    marginLeft: 10,
    height: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

const KidSuggestion = ({ kid, onPress }) => (
  <TouchableOpacity onPress={onPress} style={KidSuggestionStyles.suggestion}>
    <KidAvatar avatarURL={kid.avatarURL} size={42} state={'neutral'} />
    <View style={KidSuggestionStyles.details}>
      <KidName>{kid.name}</KidName>
      <KidNumber>{kid.phoneNumber}</KidNumber>
    </View>
  </TouchableOpacity>
);

KidSuggestion.propTypes = {
  kid: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

const KidSuggestions = ({ kidSuggestions, onPress }) => (
  <ScrollView contentContainerStyle={KidSuggestionStyles.container}>
    {kidSuggestions.map((k, i) => <KidSuggestion key={i} kid={k} onPress={() => onPress(k)} />)}
  </ScrollView>
);

KidSuggestions.propTypes = {
  kidSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default KidSuggestions;
