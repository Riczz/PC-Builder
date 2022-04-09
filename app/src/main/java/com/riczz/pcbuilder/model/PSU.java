package com.riczz.pcbuilder.model;

public class PSU extends Hardware {

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

    @Override
    public String getDescription() {
        return  "Power supply\n" + modularity;
    }

    public String getModularity() {
        return modularity;
    }
}
