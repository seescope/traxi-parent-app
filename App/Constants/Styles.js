import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { WHITE, TRANSPARENT, GREY } from '../Constants/Colours';
import { isIOS } from '../Utils';

const { width } = Dimensions.get('window');

export const SMALL_FONT_SIZE = isIOS && PixelRatio.get() >= 3 ? 15 : 12;

export default StyleSheet.create({
  CONTAINER: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BOLD: {
    fontWeight: 'bold',
  },
  SPACING: {
    height: 13,
  },
  TEXT: {
    fontFamily: 'Raleway-Regular',
    color: WHITE,
    textAlign: 'left',
    fontWeight: isIOS ? '200' : 'normal',
    fontSize: isIOS ? 18 : 13,
    backgroundColor: 'transparent',
  },
  BODY_TEXT: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: GREY,
    backgroundColor: TRANSPARENT,
    textAlign: 'left',
    paddingHorizontal: 22,
  },
  CARD: {
    borderRadius: 4,
    width: width - 16,
    backgroundColor: WHITE,
    margin: 8,
    padding: 8,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
});
