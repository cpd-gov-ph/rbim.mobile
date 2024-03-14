//package com.rbim.InternetConnection
//
//import android.app.*
//import android.content.Context
//import android.content.Intent
//import android.graphics.Color
//import android.os.Build
//import android.os.IBinder
//import android.os.PowerManager
//import android.os.SystemClock
//import android.provider.Settings
//import android.widget.Toast
//import java.text.SimpleDateFormat
//import java.util.*
//
//import com.microsoft.codepush.react.CodePushUtils.log
//import com.rbim.MainActivity
//import com.rbim.R
//import kotlinx.coroutines.*
//
//
//class EndlessService : Service() {
//
//    private var wakeLock: PowerManager.WakeLock? = null
//    private var isServiceStarted = false
//
//    override fun onBind(intent: Intent): IBinder? {
//        // We don't provide binding, so return null
//        return null
//    }
//
//    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
//        if (intent != null) {
//            val action = intent.action
//            when (action) {
//
//                else -> log("This should never happen. No action in the received intent")
//            }
//        } else {
//            log(
//                "with a null intent. It has been probably restarted by the system."
//            )
//        }
//        // by returning this we make sure the service is restarted if the system kills the service
//        return START_STICKY
//    }
//
//    override fun onCreate() {
//        super.onCreate()
//        log("The service has been created".toUpperCase())
//        val notification = createNotification()
//        startForeground(1, notification)
//    }
//
//    override fun onDestroy() {
//        super.onDestroy()
//        log("The service has been destroyed".toUpperCase())
//        Toast.makeText(this, "Service destroyed", Toast.LENGTH_SHORT).show()
//    }
//
//    override fun onTaskRemoved(rootIntent: Intent) {
//        val restartServiceIntent = Intent(applicationContext, EndlessService::class.java).also {
//            it.setPackage(packageName)
//        };
//        val restartServicePendingIntent: PendingIntent = PendingIntent.getService(this, 1, restartServiceIntent, PendingIntent.FLAG_ONE_SHOT);
//        applicationContext.getSystemService(Context.ALARM_SERVICE);
//        val alarmService: AlarmManager = applicationContext.getSystemService(Context.ALARM_SERVICE) as AlarmManager;
//        alarmService.set(AlarmManager.ELAPSED_REALTIME, SystemClock.elapsedRealtime() + 1000, restartServicePendingIntent);
//    }
//
//    private fun startService() {
//        if (isServiceStarted) return
//        log("Starting the foreground service task")
//        Toast.makeText(this, "Service starting its task", Toast.LENGTH_SHORT).show()
//        isServiceStarted = true
//
//        // we need this lock so our service gets not affected by Doze Mode
//        wakeLock =
//            (getSystemService(Context.POWER_SERVICE) as PowerManager).run {
//                newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "EndlessService::lock").apply {
//                    acquire()
//                }
//            }
//
//        // we're starting a loop in a coroutine
//        GlobalScope.launch(Dispatchers.IO) {
//            while (isServiceStarted) {
//                launch(Dispatchers.IO) {
//                    pingFakeServer()
//                }
//                delay(1 * 60 * 1000)
//            }
//            log("End of the loop for the service")
//        }
//    }
//
//    private fun stopService() {
//        log("Stopping the foreground service")
//        Toast.makeText(this, "Service stopping", Toast.LENGTH_SHORT).show()
//        try {
//            wakeLock?.let {
//                if (it.isHeld) {
//                    it.release()
//                }
//            }
//            stopForeground(true)
//            stopSelf()
//        } catch (e: Exception) {
//            log("Service stopped without being started: ${e.message}")
//        }
//        isServiceStarted = false
//    }
//
//    private fun pingFakeServer() {
//        val df = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.mmmZ")
//        val gmtTime = df.format(Date())
//
//        val deviceId = Settings.Secure.getString(applicationContext.contentResolver, Settings.Secure.ANDROID_ID)
//
//        val json =
//            """
//                {
//                    "deviceId": "$deviceId",
//                    "createdAt": "$gmtTime"
//                }
//            """
//        try {
//
//        } catch (e: Exception) {
//            log("Error making the request: ${e.message}")
//        }
//    }
//
//    private fun createNotification(): Notification {
//        val notificationChannelId = "ENDLESS SERVICE CHANNEL"
//
//        // depending on the Android API that we're dealing with we will have
//        // to use a specific method to create the notification
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
//            val channel = NotificationChannel(
//                notificationChannelId,
//                "Endless Service notifications channel",
//                NotificationManager.IMPORTANCE_HIGH
//            ).let {
//                it.description = "Endless Service channel"
//                it.enableLights(true)
//                it.lightColor = Color.RED
//                it.enableVibration(true)
//                it.vibrationPattern = longArrayOf(100, 200, 300, 400, 500, 400, 300, 200, 400)
//                it
//            }
//            notificationManager.createNotificationChannel(channel)
//        }
//
//
//
//
//    }
//}
