package com.rbim.InternetService;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.PowerManager;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.rbim.InternetConnection.InternetReceiver;
import com.rbim.MainActivity;
import com.rbim.R;

public class InternetEventService extends HeadlessJsTaskService {

    private static final int SERVICE_NOTIFICATION_ID = 12345;
    private static final String CHANNEL_ID = "rbim-id";

    private Handler handler = new Handler();
    BroadcastReceiver internetReceiver = new InternetReceiver();
    private PowerManager.WakeLock wl;

    private Runnable runnableCode = new Runnable() {
        @SuppressLint("InvalidWakeLockTag")
        @Override
        public void run() {
            Context context = getApplicationContext();

            Intent myIntent = new Intent(context, InternetEventService.class);
            //change below according to you Intent filter
            IntentFilter filter = new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION);
            filter.addAction(WifiManager.SUPPLICANT_CONNECTION_CHANGE_ACTION);
            context.registerReceiver(internetReceiver, filter);
            PowerManager pm = (PowerManager)getSystemService(Context.POWER_SERVICE);
            wl = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK , "InternetEventService::lock");
            wl.acquire();
//            Bundle bundle = new Bundle();
//
//            bundle.putString("Internet", isNetworkAvailable(getApplicationContext())?"Internet On":"Internet Off");
//            myIntent.putExtras(bundle);
//            context.startService(myIntent);
//            HeadlessJsTaskService.acquireWakeLockNow(context);
            //   handler.postDelayed(this, 0);
        }
    };
    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "rbim channel", importance);
            channel.setDescription("");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        Context context = getApplicationContext();
        context.unregisterReceiver(internetReceiver);
        wl.release();

        this.handler.removeCallbacks(this.runnableCode);

    }
    public static boolean isNetworkAvailable(Context context) {
        ConnectivityManager cm = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        return (netInfo != null && netInfo.isConnected());
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        this.handler.post(this.runnableCode);
      //  createNotificationChannel();
        Intent notificationIntent = new Intent(this, MainActivity.class);
        isNetworkAvailable(getApplicationContext());
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_MUTABLE);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("RBIM")
                .setContentText("Connected")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(contentIntent)
                .setOngoing(true)
                .build();

        startForeground(SERVICE_NOTIFICATION_ID, notification);
        return START_STICKY;
    }
}