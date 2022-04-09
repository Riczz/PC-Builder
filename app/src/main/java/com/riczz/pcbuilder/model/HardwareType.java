package com.riczz.pcbuilder.model;

public enum HardwareType {
    CPU(CPU.class),
    COOLER(Cooler.class),
    MOTHERBOARD(Motherboard.class),
    GPU(GPU.class),
    MEMORY(Memory.class),
    PSU(PSU.class),
    CASE(Case.class);

    private final Class hardwareClass;

    HardwareType(Class hardwareClass) {
        this.hardwareClass = hardwareClass;
    }

    public Class getHardwareClass() {
        return hardwareClass;
    }

    public static Class getClass(String type) {
        return valueOf(type).hardwareClass;
    }
}
