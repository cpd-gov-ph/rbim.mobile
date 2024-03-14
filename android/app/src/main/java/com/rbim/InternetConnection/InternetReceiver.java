package com.rbim.InternetConnection;


import static io.invertase.firebase.app.ReactNativeFirebaseApp.getApplicationContext;

import android.app.ActivityManager;
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
import android.os.PowerManager;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.rbim.InternetService.InternetEventService;
import com.rbim.InternetService.InternetModule;
import com.rbim.InternetService.InternetSwitchService;
import com.rbim.MainActivity;
import com.rbim.R;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

public class InternetReceiver extends BroadcastReceiver {
    private OneTimeWorkRequest request;

    private static final int SERVICE_NOTIFICATION_ID = 786159;
    private static final String CHANNEL_ID = "RBIM";
    @Override
    public void onReceive(final Context context, final Intent intent) {
        /**
         This part will be called everytime network connection is changed
         e.g. Connected -> Not Connected
         **/

        boolean hasNetwork = isNetworkAvailable(context);
        WritableMap map = new WritableNativeMap();
        map.putString("Connectivity", hasNetwork ?"Internet On":"Internet Off");
        sendEvent("InternetBroadcastReceiver" ,map);
         // showNotification("RBIM Internet Receiver",hasNetwork ?"Internet On":"Internet Off",context);
        //
        Intent myIntent = new Intent(context, InternetSwitchService.class);

        Bundle bundle = new Bundle();

        bundle.putString("Internet", hasNetwork?"Internet On":"Internet Off");
        myIntent.putExtras(bundle);
        context.startService(myIntent);

        if(intent.getAction() == ConnectivityManager.CONNECTIVITY_ACTION){
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//                try{
//
//
////                PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
////                PowerManager.WakeLock wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "InternetSwitchService::lock");
////                wakelock.acquire();
//                //log("Starting the service in >=26 Mode from a BroadcastReceiver")
//                context.startForegroundService(myIntent);
//                return;
//                }catch (Exception e){
//                    System.out.println(e.toString());
//                }
//            }
            //log("Starting the service in < 26 Mode from a BroadcastReceiver")
        }

        //  context.startService(myIntent);

        InternetSwitchService.acquireWakeLockNow(context);

    }
    private void sendEvent(String eventName, WritableMap map) {
        try{
            ReactContext reactContext = InternetModule.reactContext;

            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, map);
        }
        catch(Exception e){
            Log.d("ReactNativeJS","Exception in sendEvent in ReferrerBroadcastReceiver is:"+e.toString());
        }

    }
    public void showNotification(String title,
                                 String message,Context ctx)
    {
        // Pass the intent to switch to the MainActivity
try {


        // Assign channel ID
        String channel_id = "notification_channel";
        // Here FLAG_ACTIVITY_CLEAR_TOP flag is set to clear
        // the activities present in the activity stack,
        // on the top of the Activity that is to be launched
       // intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        // Pass the intent to PendingIntent to start the
        // next Activity
        PendingIntent pendingIntent
                = PendingIntent.getActivity(
                getApplicationContext(), 0, new Intent(),
                PendingIntent.FLAG_IMMUTABLE);

        // Create a Builder object using NotificationCompat
        // class. This will allow control over all the flags
        NotificationCompat.Builder builder
                = new NotificationCompat
                .Builder(getApplicationContext(),
                channel_id)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setAutoCancel(true)
                .setVibrate(new long[] { 1000, 1000, 1000,
                        1000, 1000 })
                .setOnlyAlertOnce(true)
                .setContentIntent(pendingIntent);

        // A customized design for the notification can be
        // set only for Android versions 4.1 and above. Thus
        // condition for the same is checked here.

            builder = builder.setContentTitle(title)
                    .setContentText(message)
                    .setSmallIcon(R.mipmap.ic_launcher);

        // Create an object of NotificationManager class to
        // notify the
        // user of events that happen in the background.
        NotificationManager notificationManager
                = (NotificationManager)ctx.getSystemService(
                Context.NOTIFICATION_SERVICE);
        // Check if the Android Version is greater than Oreo
        if (Build.VERSION.SDK_INT
                >= Build.VERSION_CODES.O) {
            NotificationChannel notificationChannel
                    = new NotificationChannel(
                    channel_id, "web_app",
                    NotificationManager.IMPORTANCE_HIGH);
            notificationManager.createNotificationChannel(
                    notificationChannel);
        }

        notificationManager.notify(0, builder.build());
}catch (Exception e){
    System.out.println(e.toString());
}
    }



    private boolean isAppOnForeground(Context context) {
        /**
         We need to check if app is in foreground otherwise the app will crash.
         http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         **/
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses =
                activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance ==
                    ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isNetworkAvailable(Context context) {
        ConnectivityManager cm = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);

        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        return (netInfo != null && netInfo.isConnected());
    }


}