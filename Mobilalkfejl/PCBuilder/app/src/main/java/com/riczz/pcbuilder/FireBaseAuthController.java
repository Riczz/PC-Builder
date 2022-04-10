package com.riczz.pcbuilder;

import android.content.Context;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class FireBaseAuthController extends AppCompatActivity {

    private GoogleSignInOptions googleSignInOptions;
    private final FirebaseAuth firebaseAuth;
    private final FirebaseUser user;
    private final Context context;

    public FireBaseAuthController(Context context) {
        super();
        firebaseAuth = FirebaseAuth.getInstance();
        user = firebaseAuth.getCurrentUser();
        this.context = context;
    }

    public void logout(boolean showToast) {
        if (showToast) {
            Toast.makeText(context, "Logged out.", Toast.LENGTH_SHORT).show();
        }
        firebaseAuth.signOut();
    }

    public FirebaseUser getUser() {
        return user;
    }

    public GoogleSignInOptions getGoogleSignInOptions() {
        return googleSignInOptions;
    }

    public void setGoogleSignInOptions(GoogleSignInOptions googleSignInOptions) {
        this.googleSignInOptions = googleSignInOptions;
    }

}
