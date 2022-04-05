package com.riczz.pcbuilder;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.os.Bundle;

import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNav);
        DrawerLayout drawer = findViewById(R.id.drawer);
        MaterialToolbar topAppbar = findViewById(R.id.topAppBar);
        NavigationView navigationView = findViewById(R.id.navigationView);

        findViewById(R.id.spacer).setEnabled(false);

        topAppbar.setNavigationOnClickListener(view -> drawer.open());
        bottomNavigationView.setBackground(null);

        navigationView.setNavigationItemSelectedListener(item -> {
            item.setChecked(true);
//            drawer.close();
            return true;
        });

    }
}