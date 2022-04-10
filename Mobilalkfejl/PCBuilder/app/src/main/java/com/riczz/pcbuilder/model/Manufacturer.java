package com.riczz.pcbuilder.model;

import com.riczz.pcbuilder.R;

public enum Manufacturer {
    INTEL(R.drawable.ic_intel_logo),
    AMD(R.drawable.ic_amd_logo);

    private final int iconResourceId;

    Manufacturer(int iconResourceId) {
        this.iconResourceId = iconResourceId;
    }

    public int getIconResourceId() {
        return iconResourceId;
    }
}

