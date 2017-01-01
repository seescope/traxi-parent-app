package com.traxi;

import android.content.Context;
import android.content.Intent;
import android.content.BroadcastReceiver;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;

import java.util.HashMap;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.DatabaseReference;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

public class TraxiCheckinReceiver extends BroadcastReceiver {
    private static final String TAG = "TraxiCheckinReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
      // Just in case it hasn't been initialised.
      Fabric.with(context, new Crashlytics());

      DatabaseReference mDatabase = FirebaseDatabase.getInstance().getReference();
      SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);

      String UUID = preferences.getString("uuid", "");
      String logFilePath = context.getFilesDir().getAbsolutePath();

      Crashlytics.log(Log.DEBUG, TAG, "TraxiCheckinReceiver called! UUID is" + UUID + " and logFilePath is " + logFilePath);

      if (UUID != "" || UUID != null || logFilePath != null) {
        String path = "kids/" + UUID + "/checkins";

        HashMap<String, Object> checkin = new HashMap<>();

        File[] files = new File(logFilePath).listFiles();
        for (File file : files) {
          if (file.isFile() && file.getName().contains(".log")) {
            Long logSize = new Long(file.length());
            String[] split = file.getName().split("\\.");

            Crashlytics.log(Log.DEBUG, TAG, "Split: " + split.length + "Name: " + file.getName());

            checkin.put(split[0], logSize);
          }
        }

        String currentTime = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").format(new Date());
        checkin.put("time", currentTime);

        Crashlytics.log(Log.DEBUG, TAG, "TraxiCheckinReceiver about to checkin with UIUD: " + UUID + " and data: " + checkin);

        mDatabase = mDatabase.child(path).push();
        mDatabase.setValue(checkin);

        Crashlytics.log(Log.DEBUG, TAG, "Checked in succesfully! Uploading log..");
        new ToyVpnService().uploadReport(logFilePath, UUID);
        Crashlytics.log(Log.DEBUG, TAG, "finished!");
      } else {
        Exception e = new Exception("TraxiCheckinReceiver called without UUID or LogLevel");
        Crashlytics.logException(e);
      }
    }
}
