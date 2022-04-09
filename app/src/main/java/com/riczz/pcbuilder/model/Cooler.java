package com.riczz.pcbuilder.model;

public class Cooler extends Hardware {

    private boolean passive;

    public Cooler(int id, String name, int price, int iconId, boolean passive) {
        super(id, HardwareType.COOLER, name, price, 0, iconId);
        this.passive = passive;
    }

    public Cooler() {
    }

    @Override
    public String getDescription() {
        return "CPU Cooler\n" + (isPassive() ? "Passive" : "Active");
    }

    public boolean isPassive() {
        return passive;
    }
}
