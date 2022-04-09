package com.riczz.pcbuilder;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.content.Intent;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.TextView;

import com.riczz.pcbuilder.model.Hardware;
import com.riczz.pcbuilder.model.PSU;
import com.riczz.pcbuilder.view.ComponentButton;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;

public class CreateBuildActivity extends AppCompatActivity {

    private ViewGroup componentsList;
    private ArrayList<ComponentButton> componentButtons;
    private HashMap<String, Hardware> selectedComponents;

    private TextView totalPrice, totalWattage;

    public static final int REQ_CODE = 21361783;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_build);

        componentsList = (ViewGroup) findViewById(R.id.componentsList);
        componentButtons = getComponentButtons();
        selectedComponents = new HashMap<>();

        totalPrice = findViewById(R.id.totalPrice);
        totalWattage = findViewById(R.id.totalWattage);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        selectedComponents = (HashMap<String, Hardware>) data.getSerializableExtra("COMPONENTS");

        if (requestCode != REQ_CODE || selectedComponents == null)
            return;

        for (ComponentButton button : componentButtons) {
            button.setSelectedHardware(selectedComponents);
        }

        int totalPrice = 0, totalWattage = 0, psuWattage = 0;

        for (Hardware hardware : selectedComponents.values()) {
            totalPrice += hardware.getPrice();

            if (hardware instanceof PSU) {
                psuWattage = hardware.getWattage();
                continue;
            }

            totalWattage += hardware.getWattage();
        }

        NumberFormat formatter = NumberFormat.getCurrencyInstance(Locale.forLanguageTag("hu"));
        String priceString = "TOTAL PRICE: " + formatter.format(totalPrice) + " HUF";
        this.totalPrice.setText(priceString);

        int wattageDiff = psuWattage - totalWattage, wattageColor;

        if (wattageDiff < 0) {
            wattageColor = R.color.red_500;
        } else if (wattageDiff <= 50) {
            wattageColor = R.color.orange_800;
        } else {
            wattageColor = R.color.green_400;
        }

        this.totalWattage.setTextColor(ContextCompat.getColor(getBaseContext(), wattageColor));
        this.totalWattage.setText(totalWattage + "W");

    }

    @Override
    protected void onResume() {
        super.onResume();

        for (ComponentButton button : componentButtons) {
            HashMap<String, Hardware> finalHardwares = selectedComponents;

            button.setOnClickListener(view -> {
                Intent intent = new Intent(this, SelectComponentActivity.class);
                intent.putExtra("COMPONENTS", finalHardwares);
                intent.putExtra("HW_FILTER", ((ComponentButton) view).getHardwareType());
                startActivityForResult(intent, REQ_CODE);
            });
        }
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