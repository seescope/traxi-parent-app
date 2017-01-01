package com.traxi;

import android.telephony.TelephonyManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.os.Bundle;
import android.net.VpnService;
import java.io.OutputStream;
import android.net.LocalSocket;
import android.net.LocalSocketAddress;

public class TraxiScreenStateReceiver extends BroadcastReceiver {
    private static final String TAG = "TraxiScreenStateReceiver";
    private static final int OFF = 0;
    private static final int ON = 1;

    public void sendScreenStatusNotification(int status, String socketPath) {
      LocalSocketAddress address = new LocalSocketAddress(socketPath, LocalSocketAddress.Namespace.FILESYSTEM);
      LocalSocket socket = new LocalSocket();
      try {
        Log.d(TAG, "Sending screen status of " + status);

        // Build the domain socket.
        socket.connect(address);

        // Write to it.
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write(status);

        Log.d(TAG, "Successfully sent screen status.");
      } catch (Exception e) {
        Log.e(TAG, "ERROR CONNECTING TO IPC SOCKET", e);
      } finally {
        try {
          // Close it.
          socket.close();
        } catch (Exception e) {
          Log.e(TAG, "ERROR CLOSING IPC SOCKET", e);
        }
      }

    }

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals(Intent.ACTION_SCREEN_OFF)) {
          String socketPath = context.getFilesDir().getAbsolutePath() + "/ipc";
          sendScreenStatusNotification(OFF, socketPath);
        } else if (intent.getAction().equals(Intent.ACTION_SCREEN_ON)){
          String socketPath = context.getFilesDir().getAbsolutePath() + "/ipc";
          sendScreenStatusNotification(ON, socketPath);
        } else {
          Log.e(TAG, "Received unknown intent: " + intent);
        }
    }
}
