package com.riczz.pcbuilder.model;

public class GPU extends Hardware {

    private int memory;
    private String frequency;

    public GPU(int id, String name, int price, int wattage, int iconId, int memory, String frequency) {
        super(id, HardwareType.GPU, name, price, wattage, iconId);
        this.memory = memory;
        this.frequency = frequency;
    }

    public GPU() {
    }

    public int getMemory() {
        return memory;
    }

    public String getFrequency() {
        return frequency;
    }
}
