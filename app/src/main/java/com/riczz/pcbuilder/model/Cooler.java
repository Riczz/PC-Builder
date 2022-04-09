package com.riczz.pcbuilder.model;

import com.google.firebase.firestore.Exclude;

import java.io.Serializable;

public class Cooler extends Hardware implements Serializable {

    private boolean passive;

    public Cooler(int id, String name, int price, int iconId, boolean passive) {
        super(id, HardwareType.COOLER, name, price, 0, iconId);
        this.passive = passive;
    }

    public Cooler() {
    }

    @Exclude
    @Override
    public String getDescription() {
        return "CPU Cooler\n" + (isPassive() ? "Passive" : "Active");
    }

    public boolean isPassive() {
        return passive;
    }
}
