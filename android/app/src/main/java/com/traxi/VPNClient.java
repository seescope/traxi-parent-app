package com.traxi;

import android.content.Context;
import android.app.Activity;
import android.content.Intent;
import android.net.VpnService;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ActivityEventListener;

import android.util.Log;

public class VPNClient extends ReactContextBaseJavaModule implements ActivityEventListener {
  private String mUUID = "";
  private static final String TAG = "VPNClient";
  private static Context mContext;
  public VPNClient(ReactApplicationContext reactContext) {
    super(reactContext);

    mContext = reactContext;
    reactContext.addActivityEventListener(this);
  }

  // React Native
  @Override
    public String getName() {
      return "VPNClient";
    }

  @Override
    public void onNewIntent(Intent intent) {
      // Do nothing.
    }

  @Override
    public void onActivityResult(Activity activity, int request, int result, Intent data) {
      if (result == Activity.RESULT_OK) {
        Intent intent = new Intent(activity, ToyVpnService.class);
        Bundle extras = new Bundle();
        extras.putString("uuid", mUUID);
        intent.putExtras(extras);
        activity.startService(intent);
      }
    }

  // JS Entry Point

  @ReactMethod
    public void startVPN(String UUID, Promise promise) {
      mUUID = UUID;
      Intent intent = VpnService.prepare(mContext);
      Activity currentActivity = getCurrentActivity();

      if (currentActivity == null) {
        promise.reject("[VPNClient] ACTIVITY DOES NOT EXIST!!");
      }

      if (intent != null) {
        currentActivity.startActivityForResult(intent, 0);
      } else {
        onActivityResult(currentActivity, 0, Activity.RESULT_OK, null);
      }

      promise.resolve(null);
    }
}
