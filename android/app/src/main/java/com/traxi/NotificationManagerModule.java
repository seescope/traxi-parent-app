package com.traxi;

import android.util.Log;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.iid.FirebaseInstanceId;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class NotificationManagerModule extends ReactContextBaseJavaModule {
  ReactApplicationContext context;
  private final String TAG = "NotificationManagerModule";

  public NotificationManagerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    context = reactContext;
  }

  @Override
    public String getName() {
      return "NotificationManager";
    }

  @ReactMethod
    public void register(Promise promise) {
      String deviceToken = FirebaseInstanceId.getInstance().getToken();
      promise.resolve(deviceToken);
    }
}
