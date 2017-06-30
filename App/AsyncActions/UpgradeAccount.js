// @flow
/* eslint no-console: 0 */
import { Platform } from 'react-native';
import InAppBilling from 'react-native-billing';

import persistParent from './PersistParent';
import { accountUpgraded } from '../Reducers/Parent/parentActions';
import { logError } from '../Utils';

import type { Dispatch } from '../Reducers';

type TransactionDetails = {
  productId: string,
  orderId: string,
  purchaseToken: string,
  purchaseTime: string,
  purchaseState:
    | 'PurchasedSuccessfully'
    | 'Canceled'
    | 'Refunded'
    | 'SubscriptionExpired',
  receiptSignature: string,
  receiptData: string,
  developerPayload: string
};

const timestamp = () => new Date().toISOString();

const handleAndroid = (dispatch: Dispatch): Promise<void> =>
  InAppBilling.open()
    .then(() => InAppBilling.subscribe('traxi_for_families_199'))
    .then((details: TransactionDetails) => {
      console.log('InAppBilling successful', details);

      const { orderId } = details;
      dispatch(accountUpgraded(timestamp(), orderId));
      dispatch(persistParent());

      return InAppBilling.close();
    })
    .catch(err => {
      console.log(err);
      logError(err);
      InAppBilling.close();
    });

const handleIOS = (dispatch: Dispatch): Promise<void> => Promise.resolve();

export default () =>
  (dispatch: Dispatch): Promise<void> =>
    Platform.OS === 'ios' ? handleIOS(dispatch) : handleAndroid(dispatch);
