package com.riczz.pcbuilder.model;

import androidx.annotation.NonNull;

import com.google.firebase.firestore.Exclude;

import org.apache.commons.text.WordUtils;

import java.io.Serializable;
import java.util.Locale;

public final class CPU extends Hardware implements Serializable {

    private int numberOfCores, numberOfThreads;
    private String architecture, socket, memoryType, frequency;
    private Manufacturer manufacturer;

    public CPU(int id, Manufacturer manufacturer, String name, int price,
               int wattage, int iconId, int numberOfCores, int numberOfThreads,
               Architecture architecture, Socket socket, Memory.MemoryType memoryType, String frequency) {

        super(id, HardwareType.CPU, name, price, wattage, iconId);
        this.manufacturer = manufacturer;
        this.numberOfCores = numberOfCores;
        this.numberOfThreads = numberOfThreads;
        this.architecture = architecture.toString();
        this.socket = socket.toString();
        this.memoryType = memoryType.toString();
        this.frequency = frequency;
    }

    public CPU() {
    }

    public enum Architecture {
        HASWELL,
        SKYLAKE,
        KABY_LAKE,
        AMBER_LAKE,
        COFFEE_LAKE,
        CASCADE_LAKE,
        COMET_LAKE,
        ZEN_2, ZEN_3, ZEN_4;

        @NonNull
        @Override
        public String toString() {
            return WordUtils.capitalize(super.toString().replace('_', ' ').toLowerCase(Locale.ROOT));
        }
    }

    public enum Socket {
        LGA_1150, AM_2,
        LGA_1151, AM_3,
        LGA_1200, AM_4,
        LGA_2011, FM_1,
        LGA_2066, FM_2,
        LGA_1700, TR_4;

        @NonNull
        @Override
        public String toString() {
            return super.toString().replace('_', ' ');
        }
    }

    @Exclude
    @Override
    public String getDescription() {
        StringBuilder builder = new StringBuilder();
        return builder
                .append("Desktop CPU\nManufacturer: ").append(manufacturer)
                .append("\nSocket type: ").append(socket)
                .append("\nNo. cores: ").append(numberOfCores)
                .append("\nNo. threads: ").append(numberOfThreads)
                .append("\nArchitecture: ").append(architecture)
                .toString();
    }

    public int getNumberOfCores() {
        return numberOfCores;
    }

    public int getNumberOfThreads() {
        return numberOfThreads;
    }

    public String getArchitecture() {
        return architecture;
    }

    public String getSocket() {
        return socket;
    }

    public String getMemoryType() {
        return memoryType;
    }

    public String getFrequency() {
        return frequency;
    }

    public Manufacturer getManufacturer() {
        return manufacturer;
    }
}
