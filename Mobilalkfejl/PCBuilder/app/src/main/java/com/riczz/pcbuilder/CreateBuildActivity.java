package com.riczz.pcbuilder;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.riczz.pcbuilder.dao.BuildItemDAO;
import com.riczz.pcbuilder.model.BuildItem;
import com.riczz.pcbuilder.model.Hardware;
import com.riczz.pcbuilder.model.HardwareType;
import com.riczz.pcbuilder.model.PSU;
import com.riczz.pcbuilder.view.ComponentButton;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;

public final class CreateBuildActivity extends AppCompatActivity {

    private String buildName, buildId;
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

        componentsList = findViewById(R.id.componentsList);
        componentButtons = getComponentButtons();
        selectedComponents = new HashMap<>();

        totalPriceTextView = findViewById(R.id.totalPrice);
        totalWattageTextView = findViewById(R.id.totalWattage);

        this.totalPriceTextView.setText(getString(R.string.total_price_format, "0", getString(R.string.currency)));
        this.totalWattageTextView.setText(getString(R.string.wattage_format, 0));

        Intent intent = getIntent();

        buildName = intent.hasExtra("BUILD_NAME") ?
                intent.getStringExtra("BUILD_NAME") : "";

        if (intent.hasExtra("BUILD_ID") && intent.hasExtra("COMPONENTS")) {
            selectedComponents = (HashMap<String, Hardware>) intent.getSerializableExtra("COMPONENTS");
            buildId = intent.getStringExtra("BUILD_ID");
            setupView();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode != REQ_CODE) {
            finish();
        }

        selectedComponents = (HashMap<String, Hardware>) data.getSerializableExtra("COMPONENTS");
        buildName = data.getStringExtra("BUILD_NAME");
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
                intent.putExtra("BUILD_ID", buildId);
                intent.putExtra("COMPONENTS", finalHardwares);
                intent.putExtra("HW_FILTER", ((ComponentButton) view).getHardwareType());
                startActivityForResult(intent, REQ_CODE);
            });

            button.setOnLongClickListener(view -> {
                if (((ComponentButton) view).getSelectedHardware() == null) {
                    return true;
                }
                new AlertDialog.Builder(this)
                        .setTitle("Remove component")
                        .setMessage("Remove this component from build?")
                        .setPositiveButton(android.R.string.yes, (dialog, i) -> {
                            dialog.dismiss();
                            ((ComponentButton) view).removeComponent();
                            selectedComponents.remove(((ComponentButton) view).getHardwareType().name());
                            setupView();
                        })
                        .setNegativeButton(android.R.string.no, (dialog, i) -> {
                            dialog.cancel();
                        }).show();
                return true;
            });
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.create_build_menu, menu);
        return true;
    }

    @Override
    public void onBackPressed() {
        showSavePrompt(true);
    }

    private void setupView() {
        for (ComponentButton button : componentButtons) {
            button.setSelectedHardware(selectedComponents);
        }

        totalPrice = psuWattage = totalWattage = 0;

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

        if (totalWattage != 0 || selectedComponents.containsKey(HardwareType.PSU.name())) {
            if (wattageDiff < 0) {
                wattageColor = R.color.red_500;
            } else if (wattageDiff <= 50) {
                wattageColor = R.color.orange_800;
            } else {
                wattageColor = R.color.green_400;
            }
            this.totalWattageTextView.setTextColor(ContextCompat.getColor(getBaseContext(), wattageColor));
        }

        this.totalWattageTextView.setText(getString(R.string.wattage_format, totalWattage));
    }

    private void showSavePrompt(boolean finishOnCancel) {

        if (noComponentsSelected()) {
            if (finishOnCancel) {
                finish();
                return;
            }
            Toast.makeText(this, "Please select a component.", Toast.LENGTH_SHORT).show();
            return;
        }

        View nameInputView = LayoutInflater.from(this).inflate(R.layout.input_build_name, componentsList, false);
        EditText input = nameInputView.findViewById(R.id.input_build_name);
        input.setText(buildName.toLowerCase(Locale.ROOT).trim());

        new AlertDialog.Builder(this)
                .setTitle("Save build")
                .setMessage("Save " + buildName.toLowerCase(Locale.ROOT) + "?")
                .setView(nameInputView)
                .setPositiveButton(android.R.string.yes, (dialog, i) -> {
                    dialog.dismiss();
                    buildName = input.getText().toString().toLowerCase(Locale.ROOT).trim();
                    BuildItem buildItem = createBuild();

                    if (isModify()) {
                        new BuildItemDAO().modifyBuildItem(buildId, createBuild()).addOnSuccessListener(runnable -> {
                            finish();
                        });
                    } else {
                        new BuildItemDAO().saveBuildItem(buildItem).addOnSuccessListener(documentReference -> {
                            buildItem.setId(documentReference.getId());
                            finish();
                        });
                    }
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

    public void saveBuild(MenuItem item) {
        showSavePrompt(false);
    }

    private boolean noComponentsSelected() {
        return selectedComponents.values().isEmpty();
    }

    private boolean isModify() {
        if (buildId != null) {
            return !buildId.isEmpty();
        }
        return false;
    }
}