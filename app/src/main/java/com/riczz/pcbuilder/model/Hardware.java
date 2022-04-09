package com.riczz.pcbuilder.model;

import com.google.firebase.firestore.Exclude;

import java.io.Serializable;

public abstract class Hardware implements Serializable {
    private HardwareType type;
    private String name, typeName;
    private int id, price, wattage, iconId;

    public Hardware(int id, HardwareType type, String name, int price, int wattage, int iconId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.wattage = wattage;
        this.iconId = iconId;
        this.type = type;
        this.typeName = type.name();
    }

    public Hardware(int id, String name, int price, int wattage, int iconId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.wattage = wattage;
        this.iconId = iconId;
        this.type = HardwareType.CPU;
    }

    public Hardware() {
    }

    @Exclude
    public abstract String getDescription();

    public int getId() {
        return id;
    }

    @Exclude public HardwareType getType() { return type; }
    public String getTypeName() { return type.name(); }
    public String getName() { return name; }
    public int getPrice() { return price; }
    public int getWattage() { return wattage; }
    public int getIconId() { return iconId; }
}
