// @flow
import { Platform, NativeModules } from 'react-native';
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

const purchaseSuccessful = (orderId, dispatch: Dispatch): void => {
  dispatch(accountUpgraded(timestamp(), orderId));
  dispatch(persistParent());
};

const handleAndroid = (dispatch: Dispatch): Promise<void> =>
  InAppBilling.open()
    .then(() => InAppBilling.subscribe('traxi_for_families_199'))
    .then((details: TransactionDetails) => {
      const { orderId } = details;
      purchaseSuccessful(orderId, dispatch);

      return InAppBilling.close();
    })
    .catch(err => {
      InAppBilling.close();
      throw err;
    });

const handleIOS = (dispatch: Dispatch): Promise<void> =>
  new Promise((resolve, reject) => {
    const product = 'traxi_for_families';
    const { InAppUtils } = NativeModules;

    InAppUtils.loadProducts([product], (error, products) => {
      console.log(products);
      if (error) {
        reject(error);
        return;
      }

      InAppUtils.purchaseProduct(product, (purchaseError, response) => {
        console.log(response);
        if (purchaseError) {
          reject(purchaseError);
          return;
        }

        const { transactionIdentifier: orderId } = response;
        purchaseSuccessful(orderId, dispatch);

        resolve();
      });
    });
  });

export default () =>
  (dispatch: Dispatch): Promise<void> => {
    const promise = Platform.OS === 'ios'
      ? handleIOS(dispatch)
      : handleAndroid(dispatch);
    return promise.catch(e => logError(e));
  };
