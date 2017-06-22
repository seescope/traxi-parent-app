// @flow
import InAppBilling from 'react-native-billing';
import { accountUpgraded } from '../Reducers/Parent/parentActions';
import type { ParentAction } from '../Reducers/Parent';

type Dispatch = (ParentAction) => void;

const makeInAppPurchase = () =>
  InAppBilling.open()
    .then(() => InAppBilling.subscribe('something'))
    .then(details => {
      console.log('You purchased: ', details);
      return InAppBilling.close();
    })
    .catch(err => {
      console.log(err);
    });

export default () =>
  async (dispatch: Dispatch): Promise<ParentAction> => {
    const purchased = await makeInAppPurchase();
  };
