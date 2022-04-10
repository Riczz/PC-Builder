package com.riczz.pcbuilder.model;

import com.google.firebase.firestore.Exclude;

import java.io.Serializable;

public enum HardwareType implements Serializable {
    CPU(CPU.class),
    COOLER(Cooler.class),
    MOTHERBOARD(Motherboard.class),
    GPU(GPU.class),
    MEMORY(Memory.class),
    PSU(PSU.class),
    CASE(Case.class);

    @Exclude private Class hardwareClass;

    HardwareType(Class hardwareClass) {
        this.hardwareClass = hardwareClass;
    }

    HardwareType() {}

    @Exclude public Class getHardwareClass() {
        return hardwareClass;
    }

    @Exclude public static Class getClass(String type) {
        return valueOf(type).hardwareClass;
    }
}
