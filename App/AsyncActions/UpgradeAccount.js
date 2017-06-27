// @flow
/* eslint no-console: 0 */
import { Alert } from 'react-native';
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

const makeInAppPurchase = async (): Promise<?TransactionDetails> => {
  try {
    await InAppBilling.open();
    return InAppBilling.subscribe('traxi_for_families_199');
  } catch (err) {
    logError(err);
    Alert.alert(
      'There was an error completing your purchase. Please try again.'
    );
    return null;
  } finally {
    InAppBilling.close();
  }
};

const timestamp = () => new Date().toISOString();

export default () =>
  async (dispatch: Dispatch): Promise<void> => {
    const details = await makeInAppPurchase();

    if (!details) {
      return;
    }

    const { orderId } = details;
    dispatch(accountUpgraded(timestamp(), orderId));
    dispatch(persistParent());
  };
