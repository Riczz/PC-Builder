package com.riczz.pcbuilder.model;

public enum HardwareType {
    CPU(CPU.class),
    GPU(GPU.class),
    MEMORY(Memory.class);

    private Class hardwareClass;

    HardwareType(Class hardwareClass) {
        this.hardwareClass = hardwareClass;
    }

    public Class getHardwareClass() {
        return hardwareClass;
    }
}
