package com.riczz.pcbuilder.model;

import com.google.firebase.firestore.Exclude;

import java.io.Serializable;

public class Case extends Hardware implements Serializable {

    private String motherboardType;

    public Case(int id, String name, int price, int iconId, Motherboard.MotherboardType motherboardType) {
        super(id, HardwareType.CASE, name, price, 0, iconId);
        this.motherboardType = motherboardType.toString();
    }

    public Case() {
    }

    @Exclude
    @Override
    public String getDescription() {
        StringBuilder builder = new StringBuilder();
        return builder
                .append("Desktop case\nType: ")
                .append(motherboardType)
                .toString();
    }

    public String getMotherboardType() {
        return motherboardType;
    }
}
