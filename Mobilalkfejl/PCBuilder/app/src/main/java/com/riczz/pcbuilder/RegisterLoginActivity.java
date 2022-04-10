package com.riczz.pcbuilder;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ViewFlipper;

import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.auth.FirebaseAuth;

import java.util.Objects;

public class RegisterLoginActivity extends AppCompatActivity {

    private static final String TAG = RegisterLoginActivity.class.getName();
    private static final FirebaseAuth AUTH = FirebaseAuth.getInstance();

    private ViewFlipper viewFlipper;
    private EditText emailEditTextR, passwordEditTextR, passwordConfirmEditTextR;
    private EditText emailEditTextL, passwordEditTextL;
    private Button registerButton, loginButton;

    private TextView switchFormTextView;
    private Button switchFormButton;

    private boolean isLoginForm = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.authentication_form);

        emailEditTextR = findViewById(R.id.editTextEmailR);
        passwordEditTextR = findViewById(R.id.editTextPasswordR);
        passwordConfirmEditTextR = findViewById(R.id.editTextPasswordConfirmR);
        registerButton = findViewById(R.id.registerButton);

        emailEditTextL = findViewById(R.id.editTextEmailL);
        passwordEditTextL = findViewById(R.id.editTextPasswordL);
        loginButton = findViewById(R.id.loginButton);

        viewFlipper = findViewById(R.id.viewFlipper);
        switchFormTextView = findViewById(R.id.switchFormTextView);
        switchFormButton = findViewById(R.id.switchFormButton);

        registerButton.setOnClickListener(button -> {

            String email = emailEditTextR.getText().toString();
            String password = passwordEditTextR.getText().toString();
            String passwordConfirm = passwordConfirmEditTextR.getText().toString();

            if (email.isEmpty() || password.isEmpty() || passwordConfirm.isEmpty()) {
                return;
            }

            if (!(password.equals(passwordConfirm))) {
                Toast.makeText(this,
                        "Passwords don't match!", Toast.LENGTH_SHORT).show();
                return;
            }

            AUTH.createUserWithEmailAndPassword(email, password).addOnCompleteListener(result -> {
                if (result.isSuccessful()) {
                    Toast.makeText(this,
                            "Successfully Registered.", Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    Toast.makeText(this,
                            "Registration failed!", Toast.LENGTH_SHORT).show();
                }
            });
        });

        loginButton.setOnClickListener(button -> {
            String email = emailEditTextL.getText().toString();
            String password = passwordEditTextL.getText().toString();

            if (email.isEmpty() || password.isEmpty()) {
                return;
            }

            AUTH.signInWithEmailAndPassword(email, password).addOnCompleteListener(task -> {
                if (task.isSuccessful()) {
                    Toast.makeText(this, String.format("Successfully signed in!\n%s",
                            Objects.requireNonNull(task.getResult().getUser()).getEmail()),
                            Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    Toast.makeText(this,
                            "Could not sign in.\nAn error occurred.", Toast.LENGTH_SHORT).show();
                }
            });
        });

        switchFormButton.setOnClickListener(button -> {
            if (isLoginForm) {
                switchFormTextView.setText(getString(R.string.already_registered));
                switchFormButton.setText(getString(R.string.login));
            } else {
                switchFormTextView.setText(getString(R.string.not_yet_registered));
                switchFormButton.setText(getString(R.string.register));
            }
            isLoginForm = !isLoginForm;
            viewFlipper.showNext();
        });
    }
}
