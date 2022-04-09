package com.riczz.pcbuilder;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.ViewGroup;

import com.riczz.pcbuilder.model.Hardware;
import com.riczz.pcbuilder.view.ComponentButton;

import java.util.ArrayList;

public class CreateBuildActivity extends AppCompatActivity {

    private ViewGroup componentsList;
    private ArrayList<ComponentButton> componentButtons;
    private ArrayList<Hardware> selectedComponents;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_build);

        componentsList = (ViewGroup) findViewById(R.id.componentsList);
        componentButtons = getComponentButtons();

        ArrayList<Hardware> hardwares = (ArrayList<Hardware>)getIntent().getSerializableExtra("COMPONENTS");

        if (hardwares != null) {
            for (int i = 0; i < hardwares.size(); i++) {
                componentButtons.get(i).setSelectedHardware(hardwares.get(i));
            }
        } else {
            hardwares = new ArrayList<>();
        }

        for (ComponentButton button : componentButtons) {
            ArrayList<Hardware> finalHardwares = hardwares;

            button.setOnClickListener(view -> {
                Intent intent = new Intent(this, SelectComponentActivity.class);
                intent.putExtra("COMPONENTS", finalHardwares);
                intent.putExtra("HW_FILTER", ((ComponentButton) view).getHardwareType());
                startActivity(intent);
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
//        return (ArrayList<Hardware>) componentButtons
//                .stream()
//                .map(ComponentButton::getSelectedHardware)
//                .collect(Collectors.toList());
    }
}