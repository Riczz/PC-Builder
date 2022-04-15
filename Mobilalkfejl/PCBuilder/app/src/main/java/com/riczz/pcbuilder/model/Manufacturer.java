package com.riczz.pcbuilder.model;

import androidx.annotation.NonNull;

import com.riczz.pcbuilder.R;

public enum Manufacturer {
    INTEL(R.drawable.ic_intel_logo, "Intel"),
    AMD(R.drawable.ic_amd_logo, "AMD");

    private final int iconResourceId;
    private final String name;

    Manufacturer(int iconResourceId, String name) {
        this.iconResourceId = iconResourceId;
        this.name = name;
    }

    public int getIconResourceId() {
        return iconResourceId;
    }


    @NonNull
    @Override
    public String toString() {
        return name;
    }
}

