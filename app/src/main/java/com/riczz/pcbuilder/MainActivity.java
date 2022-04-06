package com.riczz.pcbuilder;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationView;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getName();
    private static final int RC_SIGN_IN = 0x14de32;

    private NavigationView navigationView;

    private GoogleSignInClient googleSignInClient;
    private FirebaseAuth firebaseAuth;
    private FirebaseUser user;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        GoogleSignInOptions options = new GoogleSignInOptions
                .Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();
        googleSignInClient = GoogleSignIn.getClient(this, options);

        firebaseAuth = FirebaseAuth.getInstance();
        user = firebaseAuth.getCurrentUser();

        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNav);
        DrawerLayout drawer = findViewById(R.id.drawer);
        MaterialToolbar topAppbar = findViewById(R.id.topAppBar);
        navigationView = findViewById(R.id.navigationView);

        findViewById(R.id.spacer).setEnabled(false);
        updateDrawerMenu();

        topAppbar.setNavigationOnClickListener(view -> drawer.open());
        bottomNavigationView.setBackground(null);
        navigationView.setNavigationItemSelectedListener(item -> {
            item.setChecked(true);
            drawer.close();

            switch (item.getItemId()) {
                case R.id.anonymous: {
                    signInAnonymously();
                    break;
                }
                case R.id.email: {
                    signInWithEmail();
                    break;
                }
                case R.id.google: {
                    signInWithGoogle();
                    break;
                }
                case R.id.signout: {
                    logout(true);
                    break;
                }
                default: {
                    break;
                }
            }
            return true;
        });

    }

    private void signInWithEmail() {
        startActivity(new Intent(this, RegisterLoginActivity.class));
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);

            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                Log.d(TAG, "Successfully signed in.");

                AuthCredential credential = GoogleAuthProvider
                        .getCredential(account.getIdToken(), null);

                firebaseAuth.signInWithCredential(credential).addOnCompleteListener(result -> {
                    Toast toast = Toast.makeText(this, "", Toast.LENGTH_SHORT);

                    if (task.isSuccessful()) {
                        toast.setText(
                                String.format("Successfully signed in!\n%s",
                                        task.getResult().getEmail()));
                    } else {
                        toast.setText("Could not sign in!\nAn error occurred.");
                    }

                    toast.show();
                    reloadActivity();
                });

            } catch (ApiException e) {
                Log.w(TAG, "Could not sign in!", e);
            }
        }
    }

    private void updateDrawerMenu() {
        navigationView.getMenu().clear();
        if (user != null) {
            navigationView.inflateHeaderView(R.layout.drawer_menu_header_signed_in);
            navigationView.inflateMenu(R.menu.drawer_menu_profile);
            String username = user.getDisplayName();
            TextView usernameText = navigationView
                    .getHeaderView(0)
                    .findViewById(R.id.headerUsernameText);
            usernameText.setText(username == null ? "Guest" : username);
        } else {
            navigationView.inflateHeaderView(R.layout.drawer_menu_header);
            navigationView.inflateMenu(R.menu.drawer_menu_login);
        }
    }

    private void signInAnonymously() {
        firebaseAuth.signInAnonymously().addOnCompleteListener(this, result -> {
            if (result.isSuccessful()) {
                Toast.makeText(this, "Logged in as guest.", Toast.LENGTH_SHORT).show();
                reloadActivity();
            } else {
                Toast.makeText(this, "Could not sign in!\nAn error occurred.", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void signInWithGoogle() {
        Intent intent = googleSignInClient.getSignInIntent();
        startActivityForResult(intent, RC_SIGN_IN);
    }

    private void logout(boolean showToast) {
        if (showToast) {
            Toast.makeText(this, "Logged out.", Toast.LENGTH_SHORT).show();
        }
        firebaseAuth.signOut();
        reloadActivity();
    }

    private void reloadActivity() {
        finish();
        startActivity(getIntent());
    }
}