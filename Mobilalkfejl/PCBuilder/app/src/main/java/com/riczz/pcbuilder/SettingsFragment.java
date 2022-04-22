package com.riczz.pcbuilder;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.riczz.pcbuilder.notification.NotificationHandler;

public final class SettingsFragment extends Fragment {

    private NotificationHandler notificationHandler;
    private Button notificationButton;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.notificationHandler = new NotificationHandler(requireContext());
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.settings_fragment, container, false);
        this.notificationButton = view.findViewById(R.id.testNotificationButton);
        this.notificationButton.setOnClickListener(button -> showNotification());
        return view;
    }

    private void showNotification() {
        this.notificationHandler.send();
    }
}