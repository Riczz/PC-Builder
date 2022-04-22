package com.riczz.pcbuilder.notification;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.riczz.pcbuilder.MainActivity;
import com.riczz.pcbuilder.R;

import java.util.Random;

public final class NotificationHandler {
    private static final String CHANNEL_ID = "pc_builder";
    private static final int NOTIFICATION_ID = 0;

    private static final Random RANDOM = new Random();

    private NotificationManager manager;
    private Context context;

    public NotificationHandler(Context context) {
        this.context = context;
        this.manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createChannel();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void createChannel() {
        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Test notification",
                NotificationManager.IMPORTANCE_DEFAULT);

        channel.enableLights(true);
        channel.enableVibration(true);
        this.manager.createNotificationChannel(channel);
    }

    public void send() {
        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent
                .getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        int color = Color.argb(
                255,
                RANDOM.nextInt(256),
                RANDOM.nextInt(256),
                RANDOM.nextInt(256));

        Notification notification = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_computer)
                .setContentTitle("Test notification")
                .setContentText("It's time to create a build " + context.getString(R.string.emoji))
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setContentIntent(pendingIntent)
                .build();

        notification.defaults = 0;
        notification.flags |= Notification.FLAG_SHOW_LIGHTS;
        notification.ledARGB = color;

        this.manager.notify(NOTIFICATION_ID, notification);
    }

    public void cancel() {
        manager.cancel(NOTIFICATION_ID);
    }
}
