package com.traxi;

import android.util.Log;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;
import io.intercom.android.sdk.push.IntercomPushClient;

public class TraxiFirebaseInstanceIDService extends FirebaseInstanceIdService {
    private static final String TAG = "TraxiFirebaseInstanceIDService";
    private final IntercomPushClient intercomPushClient = new IntercomPushClient();

    @Override
    public void onTokenRefresh() {
        // Get updated InstanceID token.
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, "Refreshed token: " + refreshedToken);

        // TODO: Implement this method to send any registration to your app's servers.
        sendRegistrationToServer(refreshedToken);
    }

    private void sendRegistrationToServer(String token) {
      String refreshedToken = FirebaseInstanceId.getInstance().getToken();
      intercomPushClient.sendTokenToIntercom(getApplication(), refreshedToken);
    }
}
