package com.riczz.pcbuilder.model;

import com.google.firebase.firestore.Exclude;

public abstract class Hardware {
    private HardwareType type;
    private String name;
    private int id, price, wattage, iconId;

    public Hardware(int id, HardwareType type, String name, int price, int wattage, int iconId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.wattage = wattage;
        this.iconId = iconId;
        this.type = type;
    }

    public Hardware(int id, String name, int price, int wattage, int iconId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.wattage = wattage;
        this.iconId = iconId;
        this.type = HardwareType.CPU; //TODO
    }

    public Hardware() {
    }

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
