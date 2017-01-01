package com.traxi;

import android.net.ConnectivityManager;
import android.telephony.TelephonyManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.os.Bundle;
import android.os.Build;
import android.net.VpnService;
import android.preference.PreferenceManager;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

public class TraxiBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = "TraxiBroadcastReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        // Just in case it hasn't been initialised.
        Fabric.with(context, new Crashlytics());

        Log.d(TAG, "Received intent: " + intent);
        Intent vpnServiceIntent = VpnService.prepare(context);

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
        String UUID = preferences.getString("uuid", "");

        if (vpnServiceIntent == null && UUID != null && UUID != "") {
          Log.d(TAG, "Starting service..");
          Intent startServiceIntent = new Intent(context, ToyVpnService.class);
          context.stopService(startServiceIntent);
          context.startService(startServiceIntent);
        } else {
          Log.e(TAG, "Intent is not null, or no UUID present.");
        }
    }
}
