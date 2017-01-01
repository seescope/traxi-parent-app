package com.traxi;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

// Crashlytics
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

// Mixpanel
import com.mixpanel.android.mpmetrics.MixpanelAPI; 

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);

      MixpanelAPI mixpanel = MixpanelAPI.getInstance(this, "0c272301fd9218cbab8f7f681989c689");
      Fabric.with(this, new Crashlytics());
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "traxi";
    }
}
