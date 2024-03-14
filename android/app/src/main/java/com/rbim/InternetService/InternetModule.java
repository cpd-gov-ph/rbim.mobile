package com.rbim.InternetService;


import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class InternetModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "Heartbeat";
    public static ReactApplicationContext reactContext;

    public InternetModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }
    private boolean isServiceRunning(Context ctx) {

        ActivityManager manager = (ActivityManager) ctx.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (InternetEventService.class.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }


    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService() {
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//                //log("Starting the service in >=26 Mode from a BroadcastReceiver")
//            this.reactContext.startForegroundService(new Intent(this.reactContext, InternetEventService.class));
//                return;
//            }
            //log("Starting the service in < 26 Mode from a BroadcastReceiver")

        if(!isServiceRunning(reactContext)){

            this.reactContext.startService(new Intent(this.reactContext, InternetEventService.class));

        }
//        else{
//           // Toast.makeText(reactContext,"Service Already Running"+isServiceRunning(reactContext),Toast.LENGTH_LONG).show();
//        }
       }



    @ReactMethod
    public void stopService() {

            this.reactContext.stopService(new Intent(this.reactContext, InternetEventService.class));

       // BroadcastReceiver internetReceiver = new InternetReceiver();

    }
}
