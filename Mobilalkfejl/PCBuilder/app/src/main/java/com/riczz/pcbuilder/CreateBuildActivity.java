package com.riczz.pcbuilder;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;

import com.riczz.pcbuilder.model.BuildItem;
import com.riczz.pcbuilder.model.Hardware;
import com.riczz.pcbuilder.model.PSU;
import com.riczz.pcbuilder.view.ComponentButton;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;

public class CreateBuildActivity extends AppCompatActivity {

    private String buildName;
    private HashMap<String, Hardware> selectedComponents;
    private int totalPrice, totalWattage, psuWattage;

    private ViewGroup componentsList;
    private ArrayList<ComponentButton> componentButtons;
    private TextView totalPriceTextView, totalWattageTextView;

    public static final int REQ_CODE = 21361783;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_build);

        componentsList = (ViewGroup) findViewById(R.id.componentsList);
        componentButtons = getComponentButtons();
        selectedComponents = new HashMap<>();

        buildName = getIntent().hasExtra("BUILD_NAME") ?
                getIntent().getStringExtra("BUILD_NAME") : "";

        totalPriceTextView = findViewById(R.id.totalPrice);
        totalWattageTextView = findViewById(R.id.totalWattage);

        this.totalPriceTextView.setText(getString(R.string.total_price_format, "0", getString(R.string.currency)));
        this.totalWattageTextView.setText(getString(R.string.wattage_format, 0));
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode != REQ_CODE) {
            finish();
        }

        selectedComponents = (HashMap<String, Hardware>) data.getSerializableExtra("COMPONENTS");
        buildName = data.getStringExtra("BUILD_NAME");

        for (ComponentButton button : componentButtons) {
            button.setSelectedHardware(selectedComponents);
        }

        setupView();
    }

    @Override
    protected void onResume() {
        super.onResume();

        for (ComponentButton button : componentButtons) {
            HashMap<String, Hardware> finalHardwares = selectedComponents;

            button.setOnClickListener(view -> {
                Intent intent = new Intent(this, SelectComponentActivity.class);
                intent.putExtra("BUILD_NAME", buildName);
                intent.putExtra("COMPONENTS", finalHardwares);
                intent.putExtra("HW_FILTER", ((ComponentButton) view).getHardwareType());
                startActivityForResult(intent, REQ_CODE);
            });
        }
    }

    @Override
    public void onBackPressed() {
        showSavePrompt(true);
    }

    private void setupView() {
        for (Hardware hardware : selectedComponents.values()) {
            totalPrice += hardware.getPrice();

            if (hardware instanceof PSU) {
                psuWattage = hardware.getWattage();
                continue;
            }

            totalWattage += hardware.getWattage();
        }

        NumberFormat formatter = NumberFormat.getCurrencyInstance(Locale.forLanguageTag("hu"));
        String priceString = formatter.format(totalPrice).split(",")[0];
        this.totalPriceTextView.setText(getString(R.string.total_price_format, priceString, getString(R.string.currency)));

        int wattageDiff = psuWattage - totalWattage, wattageColor;

        if (wattageDiff < 0) {
            wattageColor = R.color.red_500;
        } else if (wattageDiff <= 50) {
            wattageColor = R.color.orange_800;
        } else {
            wattageColor = R.color.green_400;
        }

        this.totalWattageTextView.setTextColor(ContextCompat.getColor(getBaseContext(), wattageColor));
        this.totalWattageTextView.setText(getString(R.string.wattage_format, totalWattage));
    }

    private void showSavePrompt(boolean finishOnCancel) {

        View nameInputView = LayoutInflater.from(this).inflate(R.layout.input_build_name, componentsList, false);
        EditText input = (EditText) nameInputView.findViewById(R.id.input_build_name);
        input.setText(buildName);
//        input.setText(buildName.toLowerCase(Locale.ROOT).trim());

        new AlertDialog.Builder(this)
                .setTitle("Save build")
                .setMessage("Save " + buildName.toLowerCase(Locale.ROOT) + "?")
                .setView(nameInputView)
                .setPositiveButton(android.R.string.yes, (dialog, i) -> {
                    dialog.dismiss();
                    Intent intent = new Intent();
                    BuildItem buildItem = createBuild();
                    intent.putExtra("BUILD_ITEM", buildItem);
                    setResult(0x82f3e, intent);
                    finish();
                })
                .setNegativeButton(android.R.string.no, (dialog, i) -> {
                    dialog.cancel();
                    if (finishOnCancel) {
                        finish();
                    }
                }).show();
    }

    private BuildItem createBuild() {
        return new BuildItem(buildName, totalPrice, totalWattage,
                new ArrayList<>(selectedComponents.values()));
    }

    private ArrayList<ComponentButton> getComponentButtons() {
        ArrayList<ComponentButton> buttons = new ArrayList<>();
        for (int i = 0; i < componentsList.getChildCount(); i++) {
            buttons.add((ComponentButton) componentsList.getChildAt(i));
        }
        return buttons;
    }

    private ArrayList<Hardware> getComponents() {
        ArrayList<Hardware> hardwares = new ArrayList<>();
        for (int i = 0; i < componentButtons.size(); i++) {
            hardwares.add(componentButtons.get(i).getSelectedHardware());
        }
        return hardwares;
    }
}