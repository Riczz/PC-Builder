package com.riczz.pcbuilder.model;

import com.google.firebase.firestore.Exclude;

import java.io.Serializable;

public class PSU extends Hardware implements Serializable {

    private String modularity;

    public PSU(int id, String name, int price, int wattage, int iconId, Modularity modularity) {
        super(id, HardwareType.PSU, name, price, wattage, iconId);
        this.modularity = modularity.name();
    }

    public PSU() {
    }

    public enum Modularity {
        NON_MODULAR,
        HALF_MODULAR,
        FULLY_MODULAR
    }

    @Exclude
    @Override
    public String getDescription() {
        return  "Power supply\n" + modularity;
    }

    public String getModularity() {
        return modularity;
    }
}
