package com.riczz.pcbuilder.model;

import com.google.firebase.firestore.Exclude;

import java.io.Serializable;

public class GPU extends Hardware implements Serializable {

    private int memory;
    private String frequency;

    public GPU(int id, String name, int price, int wattage, int iconId, int memory, String frequency) {
        super(id, HardwareType.GPU, name, price, wattage, iconId);
        this.memory = memory;
        this.frequency = frequency;
    }

    public GPU() {
    }

    @Exclude
    @Override
    public String getDescription() {
        StringBuilder builder = new StringBuilder();
        return builder
                .append("Desktop GPU\nVRAM: ").append(memory)
                .append("\nFrequency: ").append(frequency)
                .toString();
    }

    public int getMemory() {
        return memory;
    }

    public String getFrequency() {
        return frequency;
    }
}
