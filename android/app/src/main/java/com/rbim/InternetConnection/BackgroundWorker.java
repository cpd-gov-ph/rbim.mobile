package com.rbim.InternetConnection;
import androidx.work.Worker;
import androidx.work.WorkerParameters;
import android.content.Context;
import android.util.Log;
import androidx.annotation.NonNull;
import android.content.Intent;
import android.os.Bundle;

public class BackgroundWorker extends Worker {
    private Context mContext;

    public BackgroundWorker(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
        mContext = context;
    }

    @Override
    public Result doWork() {

        // Do the work here--in this case, upload the images.
        Log.d("TAG", "working...");

        Intent service = new Intent(this.mContext.getApplicationContext(), HeadlessAction.class);
        Bundle bundle = new Bundle();

        bundle.putString("foo", "bar");
        service.putExtras(bundle);

        this.mContext.getApplicationContext().startService(service);

        Log.d("TAG", "service code completed");

        // Indicate whether the work finished successfully with the Result
        return Result.success();
    }

}