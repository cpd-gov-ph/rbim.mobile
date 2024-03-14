package com.rbim.InternetConnection;


import com.facebook.react.bridge.NativeModule;
        import com.facebook.react.bridge.ReactApplicationContext;
        import com.facebook.react.bridge.ReactContext;
        import com.facebook.react.bridge.ReactContextBaseJavaModule;
        import com.facebook.react.bridge.ReactMethod;
        import java.util.Map;
        import java.util.HashMap;
        import android.util.Log;
        import android.content.Context;
        import android.content.Intent;
        import android.os.Bundle;
        import android.content.BroadcastReceiver;
        import android.content.IntentFilter;
        import android.net.ConnectivityManager;
        import  android.net.wifi.WifiManager;

public class BackgroundModule extends ReactContextBaseJavaModule {
    private Context mContext;

    BackgroundModule(ReactApplicationContext context) {
        super(context);
        this.mContext = context;
    }

    @Override
    public String getName() {
        return "BackgroundModule";
    }

    @ReactMethod
    public void startBackgroundService() {
        Log.d("TAG", "Start background service");
        // Intent service = new Intent(this.mContext, BackgroundService.class);


        BroadcastReceiver internetReceiver = new InternetReceiver();
        //change below according to you Intent filter
        IntentFilter filter = new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION);
        filter.addAction(WifiManager.SUPPLICANT_CONNECTION_CHANGE_ACTION);
        this.mContext.registerReceiver(internetReceiver, filter);
    }
}