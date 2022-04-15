package com.riczz.pcbuilder.model;

import androidx.annotation.NonNull;

import com.google.firebase.firestore.Exclude;

import org.apache.commons.text.WordUtils;

import java.io.Serializable;
import java.util.Locale;

public class PSU extends Hardware implements Serializable {

    private String modularity;

    public PSU(int id, String name, int price, int wattage, int iconId, Modularity modularity) {
        super(id, HardwareType.PSU, name, price, wattage, iconId);
        this.modularity = modularity.toString();
    }

    public PSU() {
    }

    public enum Modularity {
        NON_MODULAR,
        HALF_MODULAR,
        FULLY_MODULAR;

        @NonNull
        @Override
        public String toString() {
            return WordUtils.capitalize(super.toString().replace('_', ' ').toLowerCase(Locale.ROOT));
        }
    }

    @Exclude
    @Override
    public String getDescription() {
        return "Power supply\n" + modularity;
    }

    public String getModularity() {
        return modularity;
    }
}
