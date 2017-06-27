// @flow
/* eslint no-console: 0 */
import { Alert } from 'react-native';
import InAppBilling from 'react-native-billing';
import persistParent from './PersistParent';
import { accountUpgraded } from '../Reducers/Parent/parentActions';
import { logError } from '../Utils';

type Dispatch = (any) => void;

const makeInAppPurchase = () =>
  InAppBilling.open()
    .then(() => InAppBilling.subscribe('traxi_for_families_199'))
    .then(details => {
      console.log('InAppBilling purchase', details);
      return InAppBilling.close();
    })
    .catch(err => {
      logError(err);
      Alert.alert(
        'There was an error completing your purchase. Please try again.'
      );
      return InAppBilling.close();
    });

const timestamp = () => new Date().toISOString();

export default () =>
  async (dispatch: Dispatch): Promise<void> => {
    await makeInAppPurchase();
    dispatch(accountUpgraded(timestamp()));
    dispatch(persistParent());
  };
