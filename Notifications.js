/* eslint-disable no-console, no-unused-vars, new-cap */

import PushNotification from 'react-native-push-notification';
import { AWSCognitoCredentials } from 'aws-sdk-react-native-core';
import { AWSSNS } from 'aws-sdk-react-native-sns';

const COGNITO_REGION = 'ap-southeast-2';
const IDENTITY_POOL_ID = 'ap-southeast-2:a9998d71-cdf3-474f-a337-9c12289c833c';

const SNS_REGION = 'ap-southeast-2';
const PLATFORM_ARN = 'arn:aws:sns:ap-southeast-2:387118107985:app/APNS_SANDBOX/traxi';

const TOKEN = 'ccf44ab68a27caa05603517e4a8a6e1ca884383254321d57b9f6a69fe5632a5e';
const ARN = 'arn:aws:sns:ap-southeast-2:387118107985:DailyUsage';
const edp = 'arn:aws:sns:ap-southeast-2:387118107985:endpoint/APNS_SANDBOX/traxi/8cc59243-2a5e-335b-aebb-fbac49e5f44e';

export const configureEndpoint = () => {
  Promise
    .resolve(
      AWSCognitoCredentials.initWithOptions({
        region: COGNITO_REGION,
        identity_pool_id: IDENTITY_POOL_ID,
      }),
    )
    .then(() => {
      AWSSNS.initWithOptions({ region: SNS_REGION });

      const params = {
        PlatformApplicationArn: PLATFORM_ARN,
        Token: edp,
      };

      Promise.resolve(AWSSNS.CreatePlatformEndpoint(params))
        .then(() => console.log(params))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
};

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister(token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification(notification) {
    // console.log('NOTIFICATION:', notification);
  },

  // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: 'YOUR GCM SENDER ID',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
  requestPermissions: true,
});

export default PushNotification;

// retrieve the latest device token from the mobile operating system
// if (the platform endpoint ARN is not stored)
//   # this is a first-time registration
//   call create platform endpoint
//   store the returned platform endpoint ARN
// endif
//
// call get endpoint attributes on the platform endpoint ARN
//
// if (while getting the attributes a not-found exception is thrown)
//   # the platform endpoint was deleted
//   call create platform endpoint with the latest device token
//   store the returned platform endpoint ARN
// else
//   if (the device token in the endpoint does not match the latest one) or
//       (get endpoint attributes shows the endpoint as disabled)
//     call set endpoint attributes to set the latest device token and then enable the platform endpoint
//   endif
// endif

// class RegistrationExample {
//
//   AmazonSNSClient client = new AmazonSNSClient(); //provide credentials here
//
//   private void registerWithSNS() {
//
//     String endpointArn = retrieveEndpointArn();
//     String token = "Retrieved from the mobile operating system";
//
//     boolean updateNeeded = false;
//     boolean createNeeded = (null == endpointArn);
//
//     if (createNeeded) {
//       // No platform endpoint ARN is stored; need to call createEndpoint.
//       endpointArn = createEndpoint();
//       createNeeded = false;
//     }
//
//     System.out.println("Retrieving platform endpoint data...");
//     // Look up the platform endpoint and make sure the data in it is current, even if
//     // it was just created.
//     try {
//       GetEndpointAttributesRequest geaReq =
//           new GetEndpointAttributesRequest()
//         .withEndpointArn(endpointArn);
//       GetEndpointAttributesResult geaRes =
//         client.getEndpointAttributes(geaReq);
//
//       updateNeeded = !geaRes.getAttributes().get("Token").equals(token)
//         || !geaRes.getAttributes().get("Enabled").equalsIgnoreCase("true");
//
//     } catch (NotFoundException nfe) {
//       // We had a stored ARN, but the platform endpoint associated with it
//       // disappeared. Recreate it.
//         createNeeded = true;
//     }
//
//     if (createNeeded) {
//       createEndpoint();
//     }
//
//     System.out.println("updateNeeded = " + updateNeeded
//
//     if (updateNeeded) {
//       // The platform endpoint is out of sync with the current data;
//       // update the token and enable it.
//       System.out.println("Updating platform endpoint " + endpointArn);
//       Map attribs = new HashMap();
//       attribs.put("Token", token);
//       attribs.put("Enabled", "true");
//       SetEndpointAttributesRequest saeReq =
//           new SetEndpointAttributesRequest()
//         .withEndpointArn(endpointArn)
//         .withAttributes(attribs);
//       client.setEndpointAttributes(saeReq);
//     }
//   }
//
//   /**
//   * @return never null
//   * */
//   private String createEndpoint() {
//
//     String endpointArn = null;
//     try {
//       System.out.println("Creating platform endpoint with token " + token);
//       CreatePlatformEndpointRequest cpeReq =
//           new CreatePlatformEndpointRequest()
//         .withPlatformApplicationArn(applicationArn)
//         .withToken(token);
//       CreatePlatformEndpointResult cpeRes = client
//         .createPlatformEndpoint(cpeReq);
//       endpointArn = cpeRes.getEndpointArn();
//     } catch (InvalidParameterException ipe) {
//       String message = ipe.getErrorMessage();
//       System.out.println("Exception message: " + message);
//       Pattern p = Pattern
//         .compile(".*Endpoint (arn:aws:sns[^ ]+) already exists " +
//                  "with the same token.*");
//       Matcher m = p.matcher(message);
//       if (m.matches()) {
//         // The platform endpoint already exists for this token, but with
//         // additional custom data that
//         // createEndpoint doesn't want to overwrite. Just use the
//         // existing platform endpoint.
//         endpointArn = m.group(1);
//       } else {
//         // Rethrow the exception, the input is actually bad.
//         throw ipe;
//       }
//     }
//     storeEndpointArn(endpointArn);
//     return endpointArn;
//   }
//
//   /**
//   * @return the ARN the app was registered under previously, or null if no
//   *         platform endpoint ARN is stored.
//   */
//   private String retrieveEndpointArn() {
//     // Retrieve the platform endpoint ARN from permanent storage,
//     // or return null if null is stored.
//     return arnStorage;
//   }
//
//   /**
//   * Stores the platform endpoint ARN in permanent storage for lookup next time.
//   * */
//   private void storeEndpointArn(String endpointArn) {
//     // Write the platform endpoint ARN to permanent storage.
//     arnStorage = endpointArn;
//   }
// }
