package com.traxi;
import android.app.PendingIntent;
import android.app.Service;
import android.app.AlarmManager;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.pm.ApplicationInfo;
import android.net.VpnService;
import android.os.Handler;
import android.os.Message;
import android.os.ParcelFileDescriptor;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.telephony.TelephonyManager;
import android.widget.Toast;
import android.preference.PreferenceManager;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.DatagramChannel;
import java.net.NetworkInterface;
import java.net.InetAddress;
import java.util.Enumeration;
import java.util.ArrayList;
import java.util.List;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.net.SocketException;

// Crashlytics
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

public class ToyVpnService extends VpnService implements Handler.Callback, Runnable {
  private static final String TAG = "ToyVpnService";
  private Thread mThread;
  private ParcelFileDescriptor mInterface;

  public native int start(int fd, String path, String user_id);
  public native void uploadReport(String path, String user_id);

  static {
    System.loadLibrary("traxi");
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    // Just in case it hasn't been initialised.
    Fabric.with(this, new Crashlytics());

    // We can only run one thread at once.
    if (mThread != null) {
      Crashlytics.log(Log.ERROR, TAG, "Can't start traxi service: already running.");
      return START_STICKY;
    }

    // Get User ID from intent on first boot.
    if (intent != null && intent.getExtras() != null) {
      Log.i(TAG, "Extras " + intent.getExtras());
      String UUID = intent.getExtras().getString("uuid");
      SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
      preferences.edit().putString("uuid", UUID).commit();
      Log.i(TAG, "Saved UUID: " + UUID);
    }

    // Start a new session by creating a new thread.
    mThread = new Thread(this, "ToyVpnThread");
    mThread.start();

    // Register the broadcast receiver for screen events.
    IntentFilter intentFilter = new IntentFilter();
    intentFilter.addAction(Intent.ACTION_SCREEN_ON);
    intentFilter.addAction(Intent.ACTION_SCREEN_OFF);
    registerReceiver(new TraxiScreenStateReceiver(), intentFilter);

    // Start the Checkin Receiver.
    AlarmManager alarmManager = (AlarmManager)getSystemService(Context.ALARM_SERVICE);

    Intent checkinIntent = new Intent(this, TraxiCheckinReceiver.class);
    Crashlytics.log(Log.DEBUG, TAG, "Built TraxiCheckinReceiver. Godspeed");

    PendingIntent checkinAlarmIntent = PendingIntent.getBroadcast(this, 0, checkinIntent, Intent.FILL_IN_DATA);

    // Cancel any other pending intents (this shouldn't be necessary, but paranoia is a thing).
    alarmManager.cancel(checkinAlarmIntent);

    // Fire off every 15 minutes.
    alarmManager.setInexactRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP,
        AlarmManager.INTERVAL_FIFTEEN_MINUTES,
        AlarmManager.INTERVAL_FIFTEEN_MINUTES, checkinAlarmIntent);

    return START_STICKY;
  }


  @Override
  public void onDestroy() {
    if (mThread != null) {
      mThread.interrupt();
    }
  }

  @Override
  public boolean handleMessage(Message message) {
    if (message != null) {
      Toast.makeText(this, message.what, Toast.LENGTH_SHORT).show();
    }
    return true;
  }

  @Override
  public synchronized void run() {
    Crashlytics.log(Log.INFO, TAG,"running vpnService");
    try {
      runVpnConnection();
    } catch (Exception e) {
      Crashlytics.logException(e);
    } finally {
      try {
        mInterface.close();
      } catch (Exception e) {
        // ignore
      }
      mInterface = null;
      mThread = null;
      Crashlytics.log(Log.ERROR, TAG, "Exiting");
      Exception e = new Exception("VPN Exited for reasons unknown.");
      Crashlytics.logException(e);
    }
  }

  private void runVpnConnection() throws Exception {
    configure();
    int fileDescriptor = mInterface.detachFd();
    String filesDir = getFilesDir().getAbsolutePath();
    SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
    String UUID = preferences.getString("uuid", "");
    Crashlytics.log(Log.INFO, TAG, "Starting TraxiService. filesDir: " + filesDir + " UUID: " + UUID);

    int result = start(fileDescriptor, filesDir, UUID);
  }

  private void configure() throws Exception {
    // If the old interface has exactly the same parameters, use it!
    if (mInterface != null) {
      Crashlytics.log(Log.INFO, TAG, "Using the previous interface");
      return;
    }

    // Configure a builder while parsing the parameters.
    Builder builder = new Builder();
    builder.addRoute("0.0.0.0", 0);
    builder.addAddress("10.1.10.1", 32);
    builder.setMtu(1500);
    builder.addDisallowedApplication("com.traxi");
    try {
      mInterface.close();
    } catch (Exception e) {
      // ignore
    }

    mInterface = builder.establish();
  }

  public String getApplicationName(int uid) {
    // By default, just use the uid.
    String packageName = Integer.toString(uid);
    if (uid == 0)
      packageName = "root";
    else if (uid == 1013)
      packageName = "mediaserver";
    else if (uid == 9999)
      packageName = "nobody";
    else {
      PackageManager pm = getPackageManager();
      String[] pkgs = pm.getPackagesForUid(uid);
      if (pkgs != null)
        packageName = pkgs[0];
    }

    return packageName;
  }

  public void reportError(String message) {
    Exception exception = new Exception(message);
    Crashlytics.logException(exception);
  }

}
